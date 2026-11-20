import { describe, expect, it } from 'vitest';
import { normalizeGain, toDb } from './normalize';

describe('normalizeGain', () => {
  it('peak mode lifts the peak to -1 dBFS', () => {
    expect(toDb(0.25 * normalizeGain(0.25, 0.05, 'peak'))).toBeCloseTo(-1);
  });
  it('loud mode aims the RMS at -16 dBFS when the peak allows it', () => {
    const g = normalizeGain(0.1, 0.02, 'loud');
    expect(toDb(0.02 * g)).toBeCloseTo(-16);
    expect(0.1 * g).toBeLessThan(10 ** (-1 / 20) + 1e-9);
  });
  it('loud mode stops at the peak ceiling instead of clipping', () => {
    const g = normalizeGain(0.9, 0.05, 'loud');
    expect(toDb(0.9 * g)).toBeCloseTo(-1);
  });
  it('silence is left alone', () => expect(normalizeGain(0, 0, 'loud')).toBe(1));
});
