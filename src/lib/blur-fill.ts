/**
 * Fit a video into another shape without cutting anything off: the whole frame sits in the middle and
 * the empty bands are filled with a blurred, darkened, enlarged copy of the same frame, the way phones
 * show a horizontal clip in a vertical feed. Sound is copied. In the browser.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';

export type Shape = '9:16' | '1:1' | '4:5' | '16:9';
export const SHAPES: Record<Shape, [number, number]> = { '9:16': [1080, 1920], '1:1': [1080, 1080], '4:5': [1080, 1350], '16:9': [1920, 1080] };

export interface Rect { x: number; y: number; w: number; h: number }

/** The source scaled to fit entirely inside the target, centred. */
export function fitInside(sw: number, sh: number, tw: number, th: number): Rect {
  const s = Math.min(tw / sw, th / sh);
  return { x: (tw - sw * s) / 2, y: (th - sh * s) / 2, w: sw * s, h: sh * s };
}

/** The source scaled to cover the whole target, centred (overflow is cut). */
export function cover(sw: number, sh: number, tw: number, th: number): Rect {
  const s = Math.max(tw / sw, th / sh);
  return { x: (tw - sw * s) / 2, y: (th - sh * s) / 2, w: sw * s, h: sh * s };
}

export async function blurFill(file: File, shape: Shape, onProgress?: (f: number) => void): Promise<Blob> {
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, Conversion, QUALITY_HIGH } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const track = await input.getPrimaryVideoTrack();
  if (!track) throw new Error('That file has no picture.');
  if (!(await track.canDecode())) throw new Error('This browser cannot decode that video. Chrome or Edge usually can.');
  const [w, h] = SHAPES[shape];
  const codec = await encodableCodec('mp4', { width: w, height: h });
  if (!codec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const sw = track.displayWidth;
  const sh = track.displayHeight;
  // The source frame at its own size (rotation applied by drawWithFit), then composed onto the target.
  const src = new OffscreenCanvas(sw, sh);
  const sctx = src.getContext('2d');
  // The background is drawn small and scaled up: a blur on a 1/8 canvas costs 64x less.
  const small = new OffscreenCanvas(Math.max(2, Math.round(w / 8)), Math.max(2, Math.round(h / 8)));
  const bctx = small.getContext('2d');
  const out = new OffscreenCanvas(w, h);
  const ctx = out.getContext('2d');
  if (!sctx || !bctx || !ctx) throw new Error('Canvas is unavailable in this browser.');
  const bg = cover(sw, sh, small.width, small.height);
  const fg = fitInside(sw, sh, w, h);
  bctx.filter = 'blur(4px) brightness(0.6)';
  ctx.imageSmoothingQuality = 'high';

  const sink = new PieceSink();
  const output = new Output({ format: new Mp4OutputFormat(), target: new StreamTarget(sink.stream(), { chunked: true }) });
  const conversion = await Conversion.init({
    input,
    output,
    video: {
      codec,
      bitrate: QUALITY_HIGH,
      processedWidth: w,
      processedHeight: h,
      process: (sample) => {
        sample.drawWithFit(sctx, { fit: 'fill' });
        bctx.drawImage(src, bg.x, bg.y, bg.w, bg.h);
        ctx.drawImage(small, -w * 0.05, -h * 0.05, w * 1.1, h * 1.1);
        ctx.drawImage(src, fg.x, fg.y, fg.w, fg.h);
        return out;
      },
    },
  });
  if (!conversion.isValid) throw new Error('This file cannot be rewritten in this browser.');
  conversion.onProgress = (p) => onProgress?.(p);
  await conversion.execute();
  if (!sink.size) throw new Error('Nothing was written.');
  return sink.blob('video/mp4');
}
