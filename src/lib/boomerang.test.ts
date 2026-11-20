import { describe, expect, it } from 'vitest';
import { boomerangTimes } from './boomerang';

describe('boomerangTimes', () => {
  it('goes forward then back without repeating the turnaround frames', () => {
    const t = boomerangTimes(0.1, 1, 1); // 3 forward frames at 30 fps: 0, 0.033, 0.067
    expect(t).toEqual([0, 0.033, 0.067, 0.033]);
  });
  it('loops seamlessly: the cycle ends one frame after the start', () => {
    const t = boomerangTimes(1, 3, 1);
    const cycle = t.length / 3;
    expect(t[cycle]).toBe(0);
    expect(t[cycle - 1]).toBeCloseTo(1 / 30, 3);
  });
  it('speed 2 takes every other frame', () => {
    expect(boomerangTimes(1, 1, 2).length).toBe(15 + 13);
  });
});
