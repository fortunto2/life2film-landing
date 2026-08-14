import { describe, expect, test } from 'vitest';
import { groupIntoClips, rankByScore, stars, type Shot } from './clips';

/** Shots back to back, each `length` long, all scoring the same unless given otherwise. */
function run(lengths: number[], scores?: number[]): Shot[] {
  let at = 0;
  return lengths.map((length, i) => {
    const shot = { start: at, end: at + length, score: scores?.[i] ?? 0.5 };
    at += length;
    return shot;
  });
}

describe('grouping shots into clips', () => {
  test('a clip never starts or ends inside a shot', () => {
    // This is the whole premise of the tool: every boundary it emits must be one the video already
    // had. Cutting mid-shot is what the competition does.
    const shots = run([4, 7, 3, 9, 5, 6, 8]);
    const clips = groupIntoClips(shots, { target: 15 });

    const boundaries = new Set(shots.flatMap((s) => [s.start, s.end]));
    for (const clip of clips) {
      expect(boundaries.has(clip.start)).toBe(true);
      expect(boundaries.has(clip.end)).toBe(true);
    }
  });

  test('clips land near the target length', () => {
    const clips = groupIntoClips(run(Array(20).fill(4)), { target: 15 });
    for (const clip of clips) {
      const span = clip.end - clip.start;
      expect(span).toBeGreaterThanOrEqual(8);
      expect(span).toBeLessThanOrEqual(15 * 1.4 + 0.001);
    }
  });

  test('every second of the source lands in exactly one clip', () => {
    // Nothing may be silently dropped: a splitter that loses footage is worse than useless.
    const shots = run([3, 5, 2, 8, 4, 6]);
    const clips = groupIntoClips(shots, { target: 12 });

    expect(clips[0].start).toBe(0);
    expect(clips[clips.length - 1].end).toBe(28);
    for (let i = 1; i < clips.length; i++) {
      expect(clips[i].start).toBe(clips[i - 1].end);
    }
  });

  test('a shot longer than the target becomes its own clip', () => {
    // Splitting it would put a cut where the video has none — exactly what we are avoiding.
    const clips = groupIntoClips(run([5, 40, 5]), { target: 15 });
    const long = clips.find((c) => c.end - c.start >= 40);
    expect(long).toBeDefined();
    expect(long!.shots).toBe(1);
  });

  test('a short tail is absorbed rather than left as a clip nobody can post', () => {
    const clips = groupIntoClips(run([14, 14, 1]), { target: 15 });
    expect(clips.every((c) => c.end - c.start >= 3)).toBe(true);
    expect(clips[clips.length - 1].end).toBe(29);
  });

  test('scoring weights by duration, not by shot count', () => {
    // One long good take beats a flurry of short bad ones, which is how a person would judge it.
    const [clip] = groupIntoClips(run([1, 1, 18], [0, 0, 1]), { target: 40 });
    expect(clip.score).toBeGreaterThan(0.85);
  });

  test('an empty shot list produces no clips rather than an empty clip', () => {
    expect(groupIntoClips([], { target: 30 })).toEqual([]);
  });

  test('a single short video still yields one clip', () => {
    const clips = groupIntoClips(run([6]), { target: 30 });
    expect(clips).toHaveLength(1);
    expect(clips[0]).toMatchObject({ start: 0, end: 6, shots: 1 });
  });
});

describe('ranking', () => {
  test('best first, and the indices still point at the right clips', () => {
    const clips = groupIntoClips(run([10, 10, 10], [0.2, 0.9, 0.5]), { target: 10 });
    const order = rankByScore(clips);
    expect(clips[order[0]].score).toBeGreaterThan(clips[order[order.length - 1]].score);
    expect([...order].sort()).toEqual(clips.map((_, i) => i));
  });

  test('stars are relative to the best clip in this video', () => {
    const clips = groupIntoClips(run([10, 10], [1, 0.2]), { target: 10 });
    const best = Math.max(...clips.map((c) => c.score));
    expect(stars(clips[0], best)).toBe(5);
    expect(stars(clips[1], best)).toBeLessThan(3);
  });

  test('stars never fall off the scale, even at zero', () => {
    const clips = groupIntoClips(run([10]), { target: 10 });
    expect(stars(clips[0], 0)).toBeGreaterThanOrEqual(1);
    expect(stars({ ...clips[0], score: 0 }, 1)).toBeGreaterThanOrEqual(1);
  });
});
