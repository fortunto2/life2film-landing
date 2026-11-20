import { describe, expect, it } from 'vitest';
import { tapBpm } from './tap-tempo';

const taps = (bpm: number, n: number, from = 0) => Array.from({ length: n }, (_, i) => from + (i * 60) / bpm);

describe('tapBpm', () => {
  it('needs three taps', () => {
    expect(tapBpm([0, 0.5])).toBeNull();
    expect(tapBpm(taps(120, 3))).toBeCloseTo(120);
  });
  it('ignores one sloppy tap (median, not mean)', () => {
    const t = taps(100, 8);
    t[7] += 0.15; // the last tap late: a mean of the gaps would move, the median does not
    expect(tapBpm(t)!).toBeCloseTo(100, 0);
  });
  it('a long pause starts over at the new tempo', () => {
    expect(tapBpm([...taps(90, 6), ...taps(140, 5, 10)])!).toBeCloseTo(140, 0);
  });
});
