import { describe, expect, it } from 'vitest';
import { crossfadeJoin } from './audio-join';

describe('crossfadeJoin', () => {
  it('butts the two together when there is no overlap', () => {
    const out = crossfadeJoin(new Float32Array([1, 1]), new Float32Array([2, 2, 2]), 0);
    expect(Array.from(out)).toEqual([1, 1, 2, 2, 2]);
  });
  it('shortens the result by the overlap and keeps both ends untouched', () => {
    const a = new Float32Array(100).fill(1);
    const b = new Float32Array(100).fill(1);
    const out = crossfadeJoin(a, b, 40);
    expect(out.length).toBe(160);
    expect(out[0]).toBe(1);
    expect(out[159]).toBe(1);
  });
  it('keeps equal power through the overlap: no dip for uncorrelated-level material', () => {
    const out = crossfadeJoin(new Float32Array(100).fill(1), new Float32Array(100).fill(1), 40);
    // cos + sin of the same signal peaks at √2 in the middle and never drops below 1.
    for (let i = 60; i < 100; i++) expect(out[i]).toBeGreaterThanOrEqual(0.999);
  });
  it('never overlaps more than the shorter piece', () => {
    expect(crossfadeJoin(new Float32Array(10), new Float32Array(5), 50).length).toBe(10);
  });
});
