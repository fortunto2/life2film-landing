import { describe, expect, test } from 'vitest';
import { isFileLost } from './encode';

const err = (name: string, message: string) => Object.assign(new Error(message), { name });

describe('isFileLost', () => {
  test('names the three ways browsers say a chosen file went away', () => {
    expect(isFileLost(new TypeError('network error'))).toBe(true);
    expect(isFileLost(err('NotReadableError', 'The I/O read operation failed.'))).toBe(true);
    expect(isFileLost(err('NotFoundError', 'A requested file or directory could not be found'))).toBe(true);
  });
  test('leaves real failures alone', () => {
    expect(isFileLost(new TypeError('Failed to fetch dynamically imported module: x'))).toBe(false);
    expect(isFileLost(new RangeError('startSample out of range.'))).toBe(false);
    expect(isFileLost('network error')).toBe(false);
  });
});
