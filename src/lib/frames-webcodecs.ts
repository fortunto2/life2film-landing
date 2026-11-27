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
import { isFileLost, loadMediabunny } from './encode';

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

/**
 * What kind of file a refusal was about, never its name: MIME type, extension, size in MB.
 * 21 Nov 2026: «found no video track it knows» was the commonest tool failure left (Android and
 * Windows Chrome, video-to-frames and video-splitter) and the event said nothing about the file,
 * so the cause could not be told apart from a container mediabunny does not read.
 */
export function fileShape(file: { name: string; type: string; size: number }): string {
  const dot = file.name.lastIndexOf('.');
  const ext = dot > 0 ? file.name.slice(dot + 1).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8) : '';
  return `type=${file.type || '?'} ext=${ext || '?'} mb=${Math.round(file.size / 1e6)}`;
}

/**
 * What the file's first bytes are, never its content: the MP4 `ftyp` brand, a known container
 * magic, or the first four bytes in hex. `unreadable:<ErrorName>` when the bytes cannot be read.
 * 27 Nov 2026: 22 of 27 «found no video track it knows» in 7 days were `.mp4` on Android Chrome
 * with `format=unread` — mediabunny could not read the container at all, and the swallowed error
 * left open whether the file was unreadable (a cloud copy) or not an MP4 inside.
 */
export function headSignature(bytes: Uint8Array): string {
  if (bytes.length === 0) return 'empty';
  const ascii = (from: number, to: number) =>
    String.fromCharCode(...bytes.slice(from, to)).replace(/[^ -~]/g, '.');
  if (bytes.length >= 12 && ascii(4, 8) === 'ftyp') return `ftyp:${ascii(8, 12).trim()}`;
  if (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return 'ebml';
  if (ascii(0, 4) === 'RIFF') return `riff:${ascii(8, 12)}`;
  if (bytes.length >= 8 && ['moov', 'mdat', 'wide', 'free', 'skip'].includes(ascii(4, 8))) return `box:${ascii(4, 8)}`;
  if (ascii(0, 5).toLowerCase() === '<!doc' || ascii(0, 5).toLowerCase() === '<html') return 'html';
  return `hex:${Array.from(bytes.slice(0, 4), (b) => b.toString(16).padStart(2, '0')).join('')}`;
}

async function readHead(file: Blob): Promise<{ head: string; lost: boolean }> {
  try {
    return { head: headSignature(new Uint8Array(await file.slice(0, 16).arrayBuffer())), lost: false };
  } catch (error) {
    const name = error instanceof Error ? error.name : 'Error';
    return { head: `unreadable:${name}`, lost: isFileLost(error) || name === 'TypeError' };
  }
}

/** Shown when the browser cannot read the file's bytes at all — on a phone, mostly a cloud copy. */
export const FILE_UNREADABLE_MESSAGE =
  'The browser could not read that file at all. On a phone this is usually a video that is still in the cloud (Google Photos, Drive): download it to the phone and choose it again.';

export async function openVideoWebCodecs(file: File): Promise<VideoSource> {
  const { Input, BlobSource, ALL_FORMATS, CanvasSink } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const format = await input
    .getFormat()
    .then((f) => f.name)
    .catch((e: unknown) => `unread:${e instanceof Error ? e.name : 'Error'}`);
  const track = await input.getPrimaryVideoTrack().catch(() => null);
  if (!track) {
    const { head, lost } = await readHead(file);
    // `context` is what `toolFailed` sends as `cfg`.
    const context = `${fileShape(file)} format=${format} head=${head}`;
    const message = lost
      ? FILE_UNREADABLE_MESSAGE
      : head === 'empty'
        ? 'That file is empty (0 bytes).'
        : head === 'html'
          ? 'That file is a web page saved with a video name, not a video. Download the video itself and choose it again.'
          : undecodableMessage(null);
    throw Object.assign(new Error(message), { context });
  }
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
