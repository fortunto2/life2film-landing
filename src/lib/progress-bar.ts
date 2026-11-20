/** A bar that fills as the video plays: geometry here, drawing through redrawVideo. */
import { redrawVideo, type Decorate } from './fade';

export type BarPosition = 'top' | 'bottom';

/** The bar's rectangle at time t: full width at the end, thickness ~0.8% of the short edge. */
export function barRect(t: number, duration: number, width: number, height: number, position: BarPosition) {
  const h = Math.max(4, Math.round(Math.min(width, height) * 0.008));
  const w = Math.round(width * Math.min(1, Math.max(0, duration > 0 ? t / duration : 0)));
  return { x: 0, y: position === 'top' ? 0 : height - h, w, h };
}

export function addProgressBar(file: File, color: string, position: BarPosition, onProgress?: (f: number) => void) {
  const decorate: Decorate = (ctx, t, duration, width, height) => {
    const r = barRect(t + 1 / 30, duration, width, height, position);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, r.y, width, r.h);
    ctx.fillStyle = color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
  };
  return redrawVideo(file, { decorate }, onProgress);
}
