/**
 * A boomerang: the clip forward, then backward, repeated, silent, optionally sped up. In the browser.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';

const FPS = 30;
/** Longest stretch of the source used: a boomerang is a moment. */
export const MAX_SOURCE = 6;

/**
 * Source timestamps for each output frame: forward over [0, len), back again, `loops` times, at
 * `speed`. The turnaround frames are not doubled (no stall at either end).
 */
export function boomerangTimes(len: number, loops: number, speed: number): number[] {
  const step = speed / FPS;
  const fwd: number[] = [];
  for (let t = 0; t < len - 1e-9; t += step) fwd.push(Math.round(t * 1000) / 1000);
  const back = fwd.slice(1, -1).reverse();
  const one = [...fwd, ...back];
  return Array.from({ length: loops }, () => one).flat();
}

export async function boomerang(file: File, loops: number, speed: number, onProgress?: (f: number) => void): Promise<{ blob: Blob; duration: number }> {
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, CanvasSink, CanvasSource, QUALITY_HIGH } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const video = await input.getPrimaryVideoTrack();
  if (!video) throw new Error('That file has no picture.');
  if (!(await video.canDecode())) throw new Error('This browser cannot decode that video. Chrome or Edge usually can.');
  const len = Math.min(MAX_SOURCE, await input.computeDuration());
  const width = video.displayWidth - (video.displayWidth % 2), height = video.displayHeight - (video.displayHeight % 2);
  const vcodec = await encodableCodec('mp4', { width, height });
  if (!vcodec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');
  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable in this browser.');
  const sink = new PieceSink();
  const output = new Output({ format: new Mp4OutputFormat(), target: new StreamTarget(sink.stream(), { chunked: true }) });
  const vsource = new CanvasSource(canvas, { codec: vcodec, bitrate: QUALITY_HIGH, keyFrameInterval: 2 });
  output.addVideoTrack(vsource, { frameRate: FPS });
  await output.start();

  // Decoded afresh on every loop: caching a cycle's frames would hold ~8 MB per 1080p frame.
  const cycle = boomerangTimes(len, 1, speed);
  const total = cycle.length * loops;
  let k = 0;
  for (let l = 0; l < loops; l++) {
    for await (const wrapped of new CanvasSink(video, { width, height, fit: 'fill', poolSize: 2 }).canvasesAtTimestamps(cycle)) {
      if (wrapped) ctx.drawImage(wrapped.canvas as OffscreenCanvas, 0, 0, width, height);
      await vsource.add(k / FPS, 1 / FPS);
      if (k % 15 === 0) onProgress?.(Math.min(0.95, k / total));
      k++;
    }
  }
  vsource.close();
  await output.finalize();
  onProgress?.(1);
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob('video/mp4'), duration: total / FPS };
}
