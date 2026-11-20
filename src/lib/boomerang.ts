/**
 * A boomerang: the clip forward, then backward, repeated, silent, optionally sped up. In the browser.
 */
import { loadMediabunny } from './encode';
import { FPS, canvasMp4, openVideo } from './canvas-out';
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
  const { CanvasSink } = await loadMediabunny();
  const { video, duration, width, height } = await openVideo(file);
  const len = Math.min(MAX_SOURCE, duration);
  const out = await canvasMp4(width, height, false);
  const { ctx, vsource } = out;

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
  const blob = await out.finish();
  onProgress?.(1);
  return { blob, duration: total / FPS };
}
