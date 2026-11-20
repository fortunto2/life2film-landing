import { describe, expect, it } from 'vitest';
import { keepRanges, windowRms, fromDb, WINDOW } from './silence';

const level = (pattern: string) => Float32Array.from(pattern, (c) => (c === '#' ? 0.5 : 0.001));

describe('keepRanges', () => {
  it('drops a long pause and keeps padding around speech', () => {
    // 10 loud windows, 50 quiet (1 s), 10 loud.
    const r = keepRanges(level('#'.repeat(10) + '.'.repeat(50) + '#'.repeat(10)), 70 * WINDOW, 0.01, 0.5, 0.1);
    expect(r.length).toBe(2);
    expect(r[0][0]).toBe(0);
    expect(r[0][1]).toBeCloseTo(0.3);
    expect(r[1][0]).toBeCloseTo(1.1);
    expect(r[1][1]).toBeCloseTo(1.4);
  });
  it('keeps a short pause inside speech', () => {
    const r = keepRanges(level('#'.repeat(10) + '.'.repeat(10) + '#'.repeat(10)), 30 * WINDOW, 0.01, 0.5, 0);
    expect(r).toEqual([[0, 30 * WINDOW]]);
  });
  it('merges ranges whose padding overlaps, and clamps to the clip', () => {
    const r = keepRanges(level('#' + '.'.repeat(30) + '#'), 32 * WINDOW, 0.01, 0.5, 0.4);
    expect(r).toEqual([[0, 32 * WINDOW]]);
  });
  it('silence everywhere keeps nothing', () => {
    expect(keepRanges(level('.'.repeat(20)), 0.4, 0.01)).toEqual([]);
  });
});

describe('windowRms / fromDb', () => {
  it('measures a constant signal', () => {
    const rms = windowRms(new Float32Array(4800).fill(0.25), 48000);
    expect(rms.length).toBe(5);
    expect(rms[2]).toBeCloseTo(0.25);
  });
  it('-40 dB is 0.01', () => expect(fromDb(-40)).toBeCloseTo(0.01));
});
