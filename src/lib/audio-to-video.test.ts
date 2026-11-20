import { describe, expect, it } from 'vitest';
import { barsAt, peakFrameRms } from './audio-to-video';

const SR = 48_000;
/** 1 s of silence, then 1 s of a 0.5-amplitude tone. */
const x = Float32Array.from({ length: SR * 2 }, (_, i) => (i < SR ? 0 : 0.5 * Math.sin(i / 5)));

describe('bars', () => {
  it('peak frame RMS is the tone’s RMS', () => {
    expect(peakFrameRms(x, SR)).toBeCloseTo(0.5 / Math.SQRT2, 2);
  });
  it('are flat in silence and near 1 in the loudest part', () => {
    const peak = peakFrameRms(x, SR);
    expect(Math.max(...barsAt(x, SR, 0.5, 16, peak))).toBe(0);
    const loud = barsAt(x, SR, 1.5, 16, peak);
    expect(loud).toHaveLength(16);
    expect(Math.min(...loud)).toBeGreaterThan(0.85);
    expect(Math.max(...loud)).toBeLessThanOrEqual(1);
  });
  it('reads zeros past the end instead of failing', () => {
    expect(barsAt(x, SR, 5, 8, 0.3).every((v) => v === 0)).toBe(true);
  });
});
