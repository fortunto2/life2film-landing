import { describe, expect, test } from 'vitest';
import { adaptiveRatio, adaptiveRatioAt, boundariesOf, contentThreshold, featureK, mergeBoundaries } from './shots';

describe('merging two detectors', () => {
  test('agreeing boundaries become one, at their mean', () => {
    expect(mergeBoundaries([[3.0, 6.0], [3.1, 6.0]])).toEqual([3.05, 6.0]);
  });

  test('with one vote required, a boundary only one detector saw is kept', () => {
    expect(mergeBoundaries([[3.0, 9.0], [3.0]])).toEqual([3.0, 9.0]);
  });

  test('with agreement required, a boundary only one detector saw is dropped', () => {
    // The measured case: the column detector's 3.8 was motion inside a shot, not a cut.
    expect(mergeBoundaries([[3.0, 3.8, 6.0], [3.0, 6.1]], 0.5, 2)).toEqual([3.0, 6.05]);
  });

  test('boundaries further apart than the tolerance stay separate', () => {
    expect(mergeBoundaries([[3.0], [3.6]], 0.5)).toEqual([3.0, 3.6]);
  });

  test('zero and garbage are not boundaries', () => {
    expect(mergeBoundaries([[0, NaN, 2.0]])).toEqual([2.0]);
  });

  test('boundariesOf drops the first scene start', () => {
    expect(boundariesOf([[0, 3], [3, 6], [6, 9]])).toEqual([3, 6]);
    expect(boundariesOf(undefined)).toEqual([]);
  });
});


describe('sensitivity scales', () => {
  test('content: the core threshold at the cautious end, the measured optimum in the middle', () => {
    expect(contentThreshold(0)).toBeCloseTo(40);
    expect(contentThreshold(0.5)).toBeCloseTo(13);
    expect(contentThreshold(1)).toBeCloseTo(6);
    expect(contentThreshold(0.75)).toBeLessThan(13);
  });

  test('adaptive and strict keep their shipped values at 0.5', () => {
    expect(adaptiveRatio(0.5)).toBeCloseTo(3);
    expect(featureK(0.5)).toBeCloseTo(1.5);
  });

  test('more sensitivity never means a stricter detector', () => {
    for (let s = 0; s < 1; s += 0.1) {
      expect(contentThreshold(s + 0.1)).toBeLessThan(contentThreshold(s));
      expect(adaptiveRatio(s + 0.1)).toBeLessThan(adaptiveRatio(s));
    }
  });

  test('adaptive: sparser sampling lowers the bar, 4 a second and denser keep it', () => {
    expect(adaptiveRatioAt(0.5, 4)).toBeCloseTo(3);
    expect(adaptiveRatioAt(0.5, 10)).toBeCloseTo(3);
    // 1.9 a second (a 36-minute file): near the measured optimum of 1.85, not the 3.0 that found 39 of 403.
    expect(adaptiveRatioAt(0.5, 1.9)).toBeGreaterThan(1.8);
    expect(adaptiveRatioAt(0.5, 1.9)).toBeLessThan(2.2);
    expect(adaptiveRatioAt(0.5, Number.NaN)).toBeCloseTo(3);
  });

  test('treats a missing or odd value as the middle, not as zero', () => {
    expect(contentThreshold(Number.NaN)).toBeCloseTo(13);
  });
});
