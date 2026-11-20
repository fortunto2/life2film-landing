import { describe, expect, it } from 'vitest';
import { cover, fitInside } from './blur-fill';

describe('fitInside', () => {
  it('a 16:9 clip in a 9:16 frame spans the width, centred vertically', () => {
    const r = fitInside(1920, 1080, 1080, 1920);
    expect(r.w).toBeCloseTo(1080);
    expect(r.h).toBeCloseTo(607.5);
    expect(r.x).toBeCloseTo(0);
    expect(r.y + r.h / 2).toBeCloseTo(960);
  });
  it('never exceeds the target', () => {
    for (const [sw, sh] of [[100, 900], [900, 100], [500, 500]]) {
      const r = fitInside(sw, sh, 1080, 1350);
      expect(r.w).toBeLessThanOrEqual(1080 + 1e-9);
      expect(r.h).toBeLessThanOrEqual(1350 + 1e-9);
    }
  });
});

describe('cover', () => {
  it('fills the target completely', () => {
    const r = cover(1920, 1080, 1080, 1920);
    expect(r.h).toBeCloseTo(1920);
    expect(r.w).toBeGreaterThanOrEqual(1080);
    expect(r.x).toBeLessThanOrEqual(0);
  });
});
