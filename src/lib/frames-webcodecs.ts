/**
 * The second way to read frames, for files `<video>` refuses.
 *
 * `<video>` decodes only what the browser's media pipeline was built to play. WebCodecs reaches the
 * platform decoders directly and mediabunny reads more containers than `<video>` does, so a file
 * that "could not be decoded" often decodes fine this way (HEVC on Windows and Android with a
 * hardware decoder, MOV/MKV wrappers). 19 Nov 2026: ~45 «could not decode» failures in 14 days,
 * the commonest single tool error.
 *
 * When this fails too the error names the codec, which is what a person can act on.
 */
import type { Frame, VideoSource } from './frames';
import { loadMediabunny } from './encode';

const CODEC_NAMES: Record<string, string> = {
  hevc: 'HEVC (H.265)',
  avc: 'H.264',
  vp9: 'VP9',
  vp8: 'VP8',
  av1: 'AV1',
};

export function undecodableMessage(codec: string | null): string {
  if (!codec) return 'The browser could not decode that video, and found no video track it knows. Try MP4 (H.264) or WebM.';
  const name = CODEC_NAMES[codec] ?? codec;
  return `This video is ${name}, and this browser has no decoder for it. Chrome or Edge on a computer usually do; or export it from your phone as H.264 ("Most Compatible").`;
}

function toRGB24(rgba: Uint8ClampedArray): Uint8Array {
  const rgb = new Uint8Array((rgba.length / 4) * 3);
  for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) {
    rgb[j] = rgba[i];
    rgb[j + 1] = rgba[i + 1];
    rgb[j + 2] = rgba[i + 2];
  }
  return rgb;
}

export async function openVideoWebCodecs(file: File): Promise<VideoSource> {
  const { Input, BlobSource, ALL_FORMATS, CanvasSink } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const track = await input.getPrimaryVideoTrack().catch(() => null);
  if (!track) throw new Error(undecodableMessage(null));
  if (!(await track.canDecode().catch(() => false))) throw new Error(undecodableMessage(track.codec));

  const duration = await input.computeDuration();
  const width = track.displayWidth;
  const height = track.displayHeight;
  if (!width || !height) throw new Error('That file has no video track.');
  if (!Number.isFinite(duration) || duration <= 0) throw new Error('That video has no duration the browser can read.');

  // One sink per output width: a sink scales every frame it hands out to its own size.
  const sinks = new Map<number, InstanceType<typeof CanvasSink>>();
  const sinkFor = (w: number) => {
    let sink = sinks.get(w);
    if (!sink) {
      sink = new CanvasSink(track, { width: w, height: Math.max(1, Math.round((height * w) / width)), fit: 'fill', poolSize: 2 });
      sinks.set(w, sink);
    }
    return sink;
  };
  const out = document.createElement('canvas');
  const context = out.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('Canvas is unavailable in this browser.');

  const drawScaled = async (seconds: number, targetWidth: number) => {
    const t = Math.max(0, Math.min(seconds, duration - 0.001));
    const wrapped = (await sinkFor(targetWidth).getCanvas(t)) ?? (await sinkFor(targetWidth).getCanvas(0));
    if (!wrapped) throw new Error(`no frame at ${t.toFixed(2)}s`);
    out.width = wrapped.canvas.width;
    out.height = wrapped.canvas.height;
    context.drawImage(wrapped.canvas as CanvasImageSource, 0, 0);
    return out;
  };

  return {
    duration,
    width,
    height,
    async frameAt(seconds, size): Promise<Frame> {
      const drawn = await drawScaled(seconds, size);
      const { data } = context.getImageData(0, 0, drawn.width, drawn.height);
      return { timestamp: seconds, width: drawn.width, height: drawn.height, rgb24: toRGB24(data) };
    },
    async thumbnailAt(seconds, thumbWidth) {
      return (await drawScaled(seconds, thumbWidth)).toDataURL('image/jpeg', 0.72);
    },
    async imageAt(seconds, imageWidth, type, quality = 0.92) {
      const drawn = await drawScaled(seconds, imageWidth || width);
      return new Promise<Blob>((done, failed) =>
        drawn.toBlob((b) => (b ? done(b) : failed(new Error('The browser could not encode the frame.'))), type, quality),
      );
    },
    release() {
      sinks.clear();
      input.dispose?.();
    },
  };
}
