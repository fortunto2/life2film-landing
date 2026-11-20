import { describe, expect, it } from 'vitest';
import { frameSize, toRenderShots } from './video-editor';
import { frameSchedule } from './render-shots';
import { addClips, split, totalLength, trim } from './timeline';

describe('video editor export', () => {
  it('the rendered frames cover the timeline: same length, each shot from its own clip and trim', () => {
    let s = addClips([], [4, 2], 0);
    s = trim(s, 0, 'start', 1, 4);
    s = split(s, 1.5);
    const r = toRenderShots(s);
    expect(r.map((x) => [x.source_id, x.trim_start, x.trim_end, x.output_start])).toEqual([[1, 1, 2.5, 0], [1, 2.5, 4, 1.5], [2, 0, 2, 3]]);
    const f = frameSchedule(r, 30);
    expect(f.length / 30).toBeCloseTo(totalLength(s), 1);
    expect(f[45]).toEqual({ source: 0, t: 2.5 });
    expect(f[90]).toEqual({ source: 1, t: 0 });
  });
  it('shape: majority of clips, ties portrait, or the one picked', () => {
    const p = { width: 1080, height: 1920 }, l = { width: 1920, height: 1080 };
    expect(frameSize('auto', [p, l])).toEqual([720, 1280]);
    expect(frameSize('auto', [l, l, p])).toEqual([1280, 720]);
    expect(frameSize('16:9', [p])).toEqual([1280, 720]);
  });
});
