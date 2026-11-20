/** Fade a video in from black and out to black, the sound following the picture. */
import { redrawVideo } from './redraw';

export { fadeGain } from './redraw';

export function fadeVideo(file: File, fin: number, fout: number, onProgress?: (f: number) => void) {
  return redrawVideo(file, { fin, fout }, onProgress);
}
