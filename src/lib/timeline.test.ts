import { describe, expect, it } from 'vitest';
import { MIN_SHOT, addClips, locate, move, offsets, remove, split, totalLength, trim } from './timeline';

const three = () => addClips([], [4, 2, 3], 0);

describe('timeline', () => {
  it('clips become whole shots in order; too-short clips are skipped', () => {
    const s = addClips(three(), [0.1, 5], 3);
    expect(s.map((x) => [x.clip, x.start, x.end])).toEqual([[0, 0, 4], [1, 0, 2], [2, 0, 3], [4, 0, 5]]);
    expect(new Set(s.map((x) => x.id)).size).toBe(4);
    expect(totalLength(s)).toBe(14);
    expect(offsets(s)).toEqual([0, 4, 6, 9]);
  });

  it('zero shots: length 0, nothing to locate, edits are no-ops', () => {
    expect(totalLength([])).toBe(0);
    expect(locate([], 0)).toBeNull();
    expect(split([], 1)).toEqual([]);
    expect(remove([], 0)).toEqual([]);
    expect(move([], 0, 1)).toEqual([]);
  });

  it('move reorders and clamps the target', () => {
    expect(move(three(), 0, 2).map((s) => s.clip)).toEqual([1, 2, 0]);
    expect(move(three(), 2, -5).map((s) => s.clip)).toEqual([2, 0, 1]);
  });

  it('trim stays inside the file and keeps MIN_SHOT', () => {
    let s = trim(three(), 1, 'end', 9, 2);
    expect(s[1].end).toBe(2);
    s = trim(s, 1, 'start', -1, 2);
    expect(s[1].start).toBe(0);
    s = trim(s, 1, 'start', 1.95, 2);
    expect(s[1].start).toBeCloseTo(2 - MIN_SHOT);
    s = trim(three(), 0, 'end', 0.1, 4);
    expect(s[0].end).toBeCloseTo(MIN_SHOT);
    expect(totalLength(s)).toBeCloseTo(MIN_SHOT + 5);
  });

  it('locate maps film time to a shot and a clip moment', () => {
    const s = trim(three(), 1, 'start', 0.5, 2);
    expect(locate(s, 4.25)).toEqual({ index: 1, clipTime: 0.75 });
    expect(locate(s, 5.5)).toEqual({ index: 2, clipTime: 0 });
    expect(locate(s, 8.5)).toBeNull();
  });

  it('split cuts one shot in two; on a boundary or near an edge it does nothing', () => {
    const s = split(three(), 5);
    expect(s.map((x) => [x.clip, x.start, x.end])).toEqual([[0, 0, 4], [1, 0, 1], [1, 1, 2], [2, 0, 3]]);
    expect(new Set(s.map((x) => x.id)).size).toBe(4);
    expect(totalLength(s)).toBe(9);
    expect(split(three(), 4)).toEqual(three());
    expect(split(three(), 6.1)).toEqual(three());
  });

  it('delete the last shot, and an index out of range', () => {
    const s = remove(three(), 2);
    expect(s.map((x) => x.clip)).toEqual([0, 1]);
    expect(remove(s, 5)).toEqual(s);
    expect(remove(remove(s, 1), 0)).toEqual([]);
  });
});
