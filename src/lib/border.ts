/** A plain coloured border around a video, the picture scaled inside it. */
import { redrawVideo } from './redraw';

/** Border thickness as a share of the short edge, from the size names on the page. */
export const BORDER: Record<'thin' | 'medium' | 'thick', number> = { thin: 0.02, medium: 0.05, thick: 0.09 };

export function addBorder(file: File, size: keyof typeof BORDER, color: string, onProgress?: (f: number) => void) {
  return redrawVideo(file, { inset: BORDER[size], background: color }, onProgress);
}
