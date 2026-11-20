/**
 * Put a logo (PNG with transparency, JPG, SVG) on every frame of a video, in a corner or the centre,
 * at a size relative to the frame and an opacity. Sound is copied. Decoded and encoded in the browser.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';

export type Corner = 'tl' | 'tr' | 'bl' | 'br' | 'c';

export interface WatermarkOptions {
  corner: Corner;
  /** Logo width as a share of the frame's shorter side. */
  size: number;
  opacity: number;
  onProgress?: (fraction: number) => void;
}

const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);

/** Where the logo goes: a margin of 4% of the shorter side from the chosen edges. */
export function placeLogo(frameW: number, frameH: number, logoW: number, logoH: number, size: number, corner: Corner): { x: number; y: number; w: number; h: number } {
  const short = Math.min(frameW, frameH);
  const w = short * size;
  const h = (w * logoH) / logoW;
  const m = short * 0.04;
  const x = corner === 'c' ? (frameW - w) / 2 : corner.endsWith('l') ? m : frameW - m - w;
  const y = corner === 'c' ? (frameH - h) / 2 : corner.startsWith('t') ? m : frameH - m - h;
  return { x, y, w, h };
}

export async function addWatermark(video: File, logo: File, o: WatermarkOptions): Promise<Blob> {
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, Conversion, QUALITY_HIGH } = await loadMediabunny();
  const bitmap = await createImageBitmap(logo).catch(() => {
    throw new Error(`${logo.name}: this browser cannot open that image. PNG, JPG, WebP and SVG work.`);
  });
  const input = new Input({ source: new BlobSource(video), formats: ALL_FORMATS });
  const track = await input.getPrimaryVideoTrack();
  if (!track) throw new Error('That file has no picture.');
  if (!(await track.canDecode())) throw new Error('This browser cannot decode that video. Chrome or Edge usually can.');
  const scale = Math.min(1, 1920 / Math.max(track.displayWidth, track.displayHeight));
  const width = even(track.displayWidth * scale);
  const height = even(track.displayHeight * scale);
  const codec = await encodableCodec('mp4', { width, height });
  if (!codec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable in this browser.');
  const at = placeLogo(width, height, bitmap.width, bitmap.height, o.size, o.corner);

  const sink = new PieceSink();
  const output = new Output({ format: new Mp4OutputFormat(), target: new StreamTarget(sink.stream(), { chunked: true }) });
  const conversion = await Conversion.init({
    input,
    output,
    video: {
      codec,
      bitrate: QUALITY_HIGH,
      processedWidth: width,
      processedHeight: height,
      process: (sample) => {
        sample.drawWithFit(ctx, { fit: 'fill' });
        ctx.globalAlpha = o.opacity;
        ctx.drawImage(bitmap, at.x, at.y, at.w, at.h);
        ctx.globalAlpha = 1;
        return canvas;
      },
    },
  });
  if (!conversion.isValid) throw new Error('This file cannot be rewritten in this browser.');
  conversion.onProgress = (p) => o.onProgress?.(p);
  await conversion.execute();
  bitmap.close();
  if (!sink.size) throw new Error('Nothing was written.');
  return sink.blob('video/mp4');
}
