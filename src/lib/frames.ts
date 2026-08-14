/**
 * Pulling frames out of a video file, in the browser, without uploading it.
 *
 * The Node side of this codebase shells out to ffmpeg. A browser has no ffmpeg, but it does have a
 * video decoder already — `<video>` plus a canvas gets the same RGB24 buffers the engine expects,
 * and works everywhere rather than only where WebCodecs does.
 */

export interface Frame {
  timestamp: number;
  width: number;
  height: number;
  rgb24: Uint8Array;
}

export interface VideoSource {
  element: HTMLVideoElement;
  duration: number;
  width: number;
  height: number;
  /** Grab one frame at `seconds`, scaled so the long edge is `size`. */
  frameAt(seconds: number, size: number): Promise<Frame>;
  /** Same instant as a data URL, for showing the user what was found. */
  thumbnailAt(seconds: number, width: number): Promise<string>;
  release(): void;
}

/** The engine wants RGB24; a canvas gives RGBA. Dropping alpha is the whole conversion. */
function toRGB24(rgba: Uint8ClampedArray): Uint8Array {
  const rgb = new Uint8Array((rgba.length / 4) * 3);
  for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) {
    rgb[j] = rgba[i];
    rgb[j + 1] = rgba[i + 1];
    rgb[j + 2] = rgba[i + 2];
  }
  return rgb;
}

function seek(video: HTMLVideoElement, seconds: number): Promise<void> {
  return new Promise((resolve, reject) => {
    // A seek past the last frame never fires `seeked` on some browsers, so it is clamped.
    const target = Math.max(0, Math.min(seconds, video.duration - 0.02));

    if (Math.abs(video.currentTime - target) < 0.001) {
      resolve();
      return;
    }

    const done = () => {
      video.removeEventListener('seeked', done);
      video.removeEventListener('error', failed);
      resolve();
    };
    const failed = () => {
      video.removeEventListener('seeked', done);
      video.removeEventListener('error', failed);
      reject(new Error(`seek to ${target.toFixed(2)}s failed`));
    };

    video.addEventListener('seeked', done);
    video.addEventListener('error', failed);
    video.currentTime = target;
  });
}

export function openVideo(file: File): Promise<VideoSource> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement('video');
    video.preload = 'auto';
    video.muted = true;
    // Required before a canvas may read the pixels back, and harmless for a local blob.
    video.crossOrigin = 'anonymous';
    video.playsInline = true;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d', { willReadFrequently: true });

    const fail = (message: string) => {
      URL.revokeObjectURL(url);
      reject(new Error(message));
    };

    video.addEventListener('error', () =>
      fail('The browser could not decode that video. Try MP4 (H.264) or WebM.'),
    );

    video.addEventListener('loadedmetadata', () => {
      const { videoWidth: width, videoHeight: height, duration } = video;

      if (!context) return fail('Canvas is unavailable in this browser.');
      if (!width || !height) return fail('That file has no video track.');
      if (!Number.isFinite(duration) || duration <= 0) {
        return fail('That video has no duration the browser can read.');
      }

      const drawScaled = async (seconds: number, targetWidth: number) => {
        await seek(video, seconds);
        const scale = targetWidth / width;
        canvas.width = targetWidth;
        canvas.height = Math.max(1, Math.round(height * scale));
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas;
      };

      resolve({
        element: video,
        duration,
        width,
        height,

        async frameAt(seconds, size) {
          const drawn = await drawScaled(seconds, size);
          const { data } = context.getImageData(0, 0, drawn.width, drawn.height);
          return {
            timestamp: seconds,
            width: drawn.width,
            height: drawn.height,
            rgb24: toRGB24(data),
          };
        },

        async thumbnailAt(seconds, thumbWidth) {
          const drawn = await drawScaled(seconds, thumbWidth);
          return drawn.toDataURL('image/jpeg', 0.72);
        },

        release() {
          video.pause();
          video.removeAttribute('src');
          video.load();
          URL.revokeObjectURL(url);
        },
      });
    });

    video.src = url;
  });
}

/**
 * How many samples to take, and how far apart.
 *
 * Sampling rate turned out to matter far more than the choice of detection algorithm. Measured
 * against a video with cuts at known times, two samples per second put the reported boundaries
 * one to three seconds out; ten per second put them within a tenth. The detector was never the
 * problem — a boundary cannot be located more precisely than the gap between the samples
 * either side of it.
 *
 * Seeking costs tens of milliseconds each, so this is a budget: as fine as possible without
 * making someone wait minutes. The refinement pass below is what recovers the precision that
 * the budget spends.
 */
export function samplePlan(duration: number, maxSamples = 500): number[] {
  const ideal = Math.ceil(duration * 10);
  const count = Math.max(2, Math.min(ideal, maxSamples));
  const step = duration / count;
  return Array.from({ length: count }, (_, i) => i * step);
}

/**
 * Sample points packed tightly around a candidate boundary.
 *
 * The coarse pass says "the cut is somewhere in this half-second"; this asks the same question
 * again at ten times the resolution, but only where it matters. Twenty extra seeks per cut beats
 * ten times the seeks across the whole video.
 */
export function refinePlan(around: number, spread: number, step: number, duration: number): number[] {
  const first = Math.max(0, around - spread);
  const last = Math.min(duration, around + spread);
  const points: number[] = [];
  for (let t = first; t <= last; t += step) points.push(t);
  return points;
}

/** Mean RGB of the centre column — what `detect_scenes_slick` compares between frames. */
export function centerPixel(frame: Frame): { r: number; g: number; b: number } {
  const x = Math.floor(frame.width / 2);
  let r = 0;
  let g = 0;
  let b = 0;

  for (let y = 0; y < frame.height; y++) {
    const i = (y * frame.width + x) * 3;
    r += frame.rgb24[i];
    g += frame.rgb24[i + 1];
    b += frame.rgb24[i + 2];
  }

  return {
    r: Math.round(r / frame.height),
    g: Math.round(g / frame.height),
    b: Math.round(b / frame.height),
  };
}

/**
 * Where exactly did the picture change?
 *
 * Walks a tight window around a candidate boundary and returns the instant of the largest
 * frame-to-frame jump in the centre pixel. No engine call: at this resolution the question is
 * simply which of twenty adjacent frames differs most from the one before it.
 *
 * Both the scene detector and the splitter refine their cuts, and they must agree — the same video
 * through either tool should report the same boundaries. It lived in both files until one copy
 * drifted a comment away from the other.
 */
export async function refineBoundary(
  source: VideoSource,
  boundary: number,
  coarseStep: number,
  width: number,
): Promise<number> {
  const points = refinePlan(boundary, coarseStep, coarseStep / 10, source.duration);
  if (points.length < 2) return boundary;

  let previous: { r: number; g: number; b: number } | null = null;
  let best = boundary;
  let biggest = -1;

  for (const at of points) {
    const pixel = centerPixel(await source.frameAt(at, width));
    if (previous) {
      const delta =
        Math.abs(pixel.r - previous.r) + Math.abs(pixel.g - previous.g) + Math.abs(pixel.b - previous.b);
      if (delta > biggest) {
        biggest = delta;
        best = at;
      }
    }
    previous = pixel;
  }

  return best;
}
