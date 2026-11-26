import { describe, expect, it } from 'vitest';
import { clipOf, frameSchedule, toSegments } from './auto-montage';

describe('toSegments', () => {
  it('2-second windows scored by the mean of their frames, best frame kept, dark ones marked garbage', () => {
    const frames = [0.25, 0.75, 1.25, 1.75, 2.25, 2.75].map((t, i) => ({ t, score: [0.9, 0.7, 0.5, 0.9, 0.1, 0.2][i] }));
    const s = toSegments(frames, 3, 1, 10);
    expect(s.map((x) => [x.segment_id, x.source_id, x.source_file, x.start, x.end])).toEqual([[10, 2, 'clip-2', 0, 2], [11, 2, 'clip-2', 2, 3]]);
    expect(s[0].score).toBeCloseTo(0.75);
    expect(s[0].best_frame_ts).toBe(0.25);
    expect(s[1].is_garbage).toBe(true);
  });
});

describe('frameSchedule', () => {
  it('one output frame per 1/30 s of each shot, from its own clip, in order', () => {
    const f = frameSchedule([
      { trim_start: 5, trim_end: 5.5, output_start: 0, speed: 1, segment_id: 0, source_id: 3 },
      { trim_start: 1, trim_end: 2, output_start: 0.5, speed: 1, segment_id: 1, source_id: 1 },
    ], 30);
    expect(f).toHaveLength(45);
    expect(f[0]).toEqual({ source: 2, t: 5 });
    expect(f[15]).toEqual({ source: 0, t: 1 });
    expect(f[44].t).toBeCloseTo(1 + 29 / 30);
  });
});

describe('clipOf', () => {
  it('reads the clip from source_file: one clip comes back from the planner as source_id 0', () => {
    expect(clipOf({ source_id: 0, source_file: 'clip-1' }, 1)).toBe(1);
    expect(clipOf({ source_id: 0 }, 1)).toBe(1);
    expect(clipOf({ source_id: 2, source_file: 'clip-3' }, 3)).toBe(3);
    expect(clipOf({ source_id: 2 }, 3)).toBe(2);
  });
  it('refuses a clip that was not added instead of rendering from nothing', () => {
    expect(() => clipOf({ source_id: 0 }, 2)).toThrow(/not one of the 2/);
    expect(() => clipOf({ source_id: 1, source_file: 'clip-4' }, 3)).toThrow(/clip-4/);
  });
});
