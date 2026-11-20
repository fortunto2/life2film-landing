import { describe, expect, it } from 'vitest';
import { parseClock, withoutSection } from './cut-section';

describe('parseClock', () => {
  it('reads seconds, m:ss and h:mm:ss', () => {
    expect(parseClock('75')).toBe(75);
    expect(parseClock('1:15')).toBe(75);
    expect(parseClock('1:15,5')).toBe(75.5);
    expect(parseClock('0:01:15')).toBe(75);
  });
  it('refuses what is not a time', () => {
    expect(parseClock('')).toBeNull();
    expect(parseClock('abc')).toBeNull();
    expect(parseClock('1::2')).toBeNull();
  });
});

describe('withoutSection', () => {
  it('keeps what is before and after', () => expect(withoutSection(10, 3, 5)).toEqual([[0, 3], [5, 10]]));
  it('accepts the ends swapped and clamps to the clip', () => expect(withoutSection(10, 12, 8)).toEqual([[0, 8]]));
  it('cutting from the start leaves only the tail', () => expect(withoutSection(10, 0, 4)).toEqual([[4, 10]]));
});
