import { describe, expect, it } from 'vitest';
import { fadeGain } from './fade';

describe('fadeGain', () => {
  it('rises over the fade-in and falls over the fade-out', () => {
    expect(fadeGain(0, 10, 1, 2)).toBe(0);
    expect(fadeGain(0.5, 10, 1, 2)).toBeCloseTo(0.5);
    expect(fadeGain(5, 10, 1, 2)).toBe(1);
    expect(fadeGain(9, 10, 1, 2)).toBeCloseTo(0.5);
    expect(fadeGain(10, 10, 1, 2)).toBe(0);
  });
  it('a zero length means no fade on that end', () => {
    expect(fadeGain(0, 10, 0, 0)).toBe(1);
    expect(fadeGain(10, 10, 0, 0)).toBe(1);
  });
  it('overlapping fades on a short clip take the darker of the two', () => {
    expect(fadeGain(1, 2, 2, 2)).toBeCloseTo(0.5);
  });
});
