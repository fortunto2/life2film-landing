import { describe, expect, test } from 'vitest';
import { boundariesOf, mergeBoundaries } from './shots';

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
