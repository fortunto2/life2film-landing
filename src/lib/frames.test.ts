import { describe, expect, test } from 'vitest';
import { locateCut } from './frames';

/** A video as a function: flat colour per shot, cuts at the given instants. */
function shots(cuts: number[], colours: number[]) {
  return async (t: number) => {
    const i = cuts.filter((c) => t >= c).length;
    const v = colours[i % colours.length];
    return { r: v, g: v, b: v };
  };
}

describe('locateCut', () => {
  test('finds the cut when the coarse guess is several steps late or early', async () => {
    // Measured on a synthetic video: the engine smooths the diff signal over 25 samples, and the
    // peak it reports lands up to half a second from the real cut. A ±1-step refine cannot
    // recover that; the clip then opens on the tail of the previous shot.
    const video = shots([6], [20, 200]);
    for (const guess of [5.6, 6.4, 5.95]) {
      const at = await locateCut(video, guess, 0.1, { lo: 0, hi: 18 });
      expect(Math.abs(at - 6)).toBeLessThanOrEqual(0.011);
    }
  });

  test('never crosses into the next cut', async () => {
    // Two cuts 0.3s apart: the stronger jump at 6.3 must not steal the boundary guessed at 5.9.
    const video = shots([6, 6.3], [20, 60, 250]);
    const at = await locateCut(video, 5.9, 0.1, { lo: 0, hi: 6.15 });
    expect(Math.abs(at - 6)).toBeLessThanOrEqual(0.011);
  });

  test('stays inside the video', async () => {
    const video = shots([0.05], [20, 200]);
    const at = await locateCut(video, 0.3, 0.1, { lo: 0, hi: 3 });
    expect(at).toBeGreaterThanOrEqual(0);
    expect(Math.abs(at - 0.05)).toBeLessThanOrEqual(0.011);
  });
});
