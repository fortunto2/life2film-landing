/**
 * Brightness, contrast, saturation, warmth and black-and-white for a whole video, as one canvas
 * filter applied to every frame. Sound is copied. In the browser.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';

export interface Look {
  /** 1 = unchanged. */
  brightness: number;
  contrast: number;
  saturation: number;
  /** −1 cool … 0 … 1 warm. */
  warmth: number;
}

export const PRESETS: Record<string, Look> = {
  none: { brightness: 1, contrast: 1, saturation: 1, warmth: 0 },
  brighten: { brightness: 1.3, contrast: 1.05, saturation: 1.05, warmth: 0 },
  bw: { brightness: 1, contrast: 1.15, saturation: 0, warmth: 0 },
  vivid: { brightness: 1.03, contrast: 1.12, saturation: 1.35, warmth: 0.1 },
  warm: { brightness: 1.02, contrast: 1.02, saturation: 1.05, warmth: 0.6 },
  cool: { brightness: 1, contrast: 1.03, saturation: 0.95, warmth: -0.6 },
  vintage: { brightness: 1.05, contrast: 0.9, saturation: 0.7, warmth: 0.7 },
};

/** The CSS filter string for a look. Warmth is a sepia wash plus a hue nudge back toward neutral. */
export function filterOf(l: Look): string {
  const parts = [`brightness(${l.brightness})`, `contrast(${l.contrast})`, `saturate(${l.saturation})`];
  if (l.warmth > 0) parts.push(`sepia(${(0.35 * l.warmth).toFixed(3)})`);
  if (l.warmth < 0) parts.push(`hue-rotate(${Math.round(-20 * l.warmth)}deg)`, `saturate(${(1 + 0.15 * -l.warmth).toFixed(3)})`);
  return parts.join(' ');
}

export async function filterVideo(file: File, look: Look, onProgress?: (f: number) => void): Promise<Blob> {
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, Conversion, QUALITY_HIGH } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const track = await input.getPrimaryVideoTrack();
  if (!track) throw new Error('That file has no picture.');
  if (!(await track.canDecode())) throw new Error('This browser cannot decode that video. Chrome or Edge usually can.');
  const scale = Math.min(1, 1920 / Math.max(track.displayWidth, track.displayHeight));
  const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);
  const w = even(track.displayWidth * scale);
  const h = even(track.displayHeight * scale);
  const codec = await encodableCodec('mp4', { width: w, height: h });
  if (!codec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const raw = new OffscreenCanvas(w, h);
  const rctx = raw.getContext('2d');
  const out = new OffscreenCanvas(w, h);
  const ctx = out.getContext('2d');
  if (!rctx || !ctx) throw new Error('Canvas is unavailable in this browser.');
  ctx.filter = filterOf(look);
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
        sample.drawWithFit(rctx, { fit: 'fill' });
        ctx.drawImage(raw, 0, 0);
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
