/**
 * Redraw every frame of a video on a canvas and keep its sound, optionally faded with the picture.
 * Fade, progress bar and border are each a few options on this one loop. In the browser.
 */
import { loadMediabunny } from './encode';
import { pushStereo, trackStereo } from './audio-io';
import { FPS, canvasMp4, openVideo } from './canvas-out';

export { FPS };

/** Opacity of the picture at time t: 0→1 over `fin`, 1→0 over the last `fout` seconds. */
export function fadeGain(t: number, duration: number, fin: number, fout: number): number {
  const a = fin > 0 ? Math.min(1, Math.max(0, t / fin)) : 1;
  const b = fout > 0 ? Math.min(1, Math.max(0, (duration - t) / fout)) : 1;
  return Math.min(a, b);
}

export type Decorate = (ctx: OffscreenCanvasRenderingContext2D, t: number, duration: number, width: number, height: number) => void;

export async function redrawVideo(file: File, o: { fin?: number; fout?: number; decorate?: Decorate; inset?: number; background?: string }, onProgress?: (f: number) => void): Promise<{ blob: Blob; duration: number }> {
  const fin = o.fin ?? 0, fout = o.fout ?? 0;
  const { CanvasSink } = await loadMediabunny();
  const { video, audio, duration, width, height } = await openVideo(file);
  const out = await canvasMp4(width, height, !!audio);
  const { ctx, vsource, asource } = out;

  const count = Math.max(1, Math.floor(duration * FPS));
  const times = Array.from({ length: count }, (_, i) => i / FPS);
  let i = 0;
  for await (const wrapped of new CanvasSink(video, { width, height, fit: 'fill', poolSize: 2 }).canvasesAtTimestamps(times)) {
    const t = i / FPS;
    ctx.fillStyle = o.background ?? '#000';
    ctx.fillRect(0, 0, width, height);
    if (wrapped) {
      ctx.globalAlpha = fadeGain(t, duration, fin, fout);
      const m = Math.round(Math.min(width, height) * (o.inset ?? 0));
      ctx.drawImage(wrapped.canvas as OffscreenCanvas, m, m, width - 2 * m, height - 2 * m);
      ctx.globalAlpha = 1;
    }
    o.decorate?.(ctx, t, duration, width, height);
    await vsource.add(t, 1 / FPS);
    if (i % 15 === 0) onProgress?.(Math.min(0.9, (i / count) * 0.9));
    i++;
  }
  vsource.close();

  if (asource) {
    const pcm = await trackStereo(audio, duration, (off) => {
      const gain = off.createGain();
      gain.gain.setValueAtTime(fin > 0 ? 0 : 1, 0);
      if (fin > 0) gain.gain.linearRampToValueAtTime(1, fin);
      if (fout > 0) { gain.gain.setValueAtTime(1, Math.max(fin, duration - fout)); gain.gain.linearRampToValueAtTime(0, duration); }
      gain.connect(off.destination);
      return gain;
    });
    if (pcm) await pushStereo(asource, pcm[0], pcm[1]);
    else asource.close();
  }
  const blob = await out.finish();
  onProgress?.(1);
  return { blob, duration };
}
