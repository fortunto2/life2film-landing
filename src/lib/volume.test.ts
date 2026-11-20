import { describe, expect, it } from 'vitest';
import { limit } from './volume';

describe('limit', () => {
  it('is linear below the knee', () => {
    expect(limit(0.5)).toBe(0.5);
    expect(limit(-0.8)).toBe(-0.8);
  });
  it('never goes past full scale, however hard it is pushed', () => {
    for (const x of [0.9, 1, 2, 8, 100]) {
      expect(limit(x)).toBeLessThanOrEqual(1);
      expect(limit(-x)).toBeGreaterThanOrEqual(-1);
    }
  });
  it('keeps order: louder in is louder out', () => {
    expect(limit(1.2)).toBeGreaterThan(limit(1));
  });
});
