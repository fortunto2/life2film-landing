import { describe, expect, it } from 'vitest';
import { slideAt, zoomAt } from './slideshow';

describe('slideAt', () => {
  it('holds each photo for its slot and crossfades over the last half second', () => {
    expect(slideAt(0, 3, 3)).toEqual({ index: 0, local: 0, next: -1, alpha: 0 });
    expect(slideAt(2.4, 3, 3).next).toBe(-1);
    const mid = slideAt(2.75, 3, 3);
    expect(mid.index).toBe(0);
    expect(mid.next).toBe(1);
    expect(mid.alpha).toBeCloseTo(0.5);
    expect(slideAt(3, 3, 3).index).toBe(1);
  });
  it('does not fade past the last photo and never indexes beyond it', () => {
    expect(slideAt(8.9, 3, 3)).toMatchObject({ index: 2, next: -1 });
    expect(slideAt(9, 3, 3).index).toBe(2);
  });
  it('handles a single photo', () => {
    expect(slideAt(1.9, 2, 1)).toMatchObject({ index: 0, next: -1 });
  });
});

describe('zoomAt', () => {
  it('rises from 1 to 1.08 and clamps outside the slot', () => {
    expect(zoomAt(0)).toBe(1);
    expect(zoomAt(1)).toBeCloseTo(1.08);
    expect(zoomAt(2)).toBeCloseTo(1.08);
    expect(zoomAt(-1)).toBe(1);
  });
});
