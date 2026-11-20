import { describe, expect, it } from 'vitest';
import { maskAlpha, outputSize } from './video-background';

describe('maskAlpha', () => {
  it('hard below lo and above hi, soft between', () => {
    const out = new Uint8ClampedArray(12);
    maskAlpha(new Float32Array([0.1, 0.5, 0.9]), new Float32Array(3), out, 0);
    expect([out[3], out[7], out[11]]).toEqual([0, 128, 255]);
  });
  it('keeps part of the last frame, so a one-frame flicker does not punch a hole', () => {
    const prev = new Float32Array([1]);
    const out = new Uint8ClampedArray(4);
    maskAlpha(new Float32Array([0]), prev, out, 0.4);
    expect(prev[0]).toBeCloseTo(0.4);
    expect(out[3]).toBe(64);
  });
});

describe('outputSize', () => {
  it('caps the long side at 1280 and keeps even numbers', () => {
    expect(outputSize(1920, 1080)).toEqual([1280, 720]);
    expect(outputSize(1080, 1920)).toEqual([720, 1280]);
    expect(outputSize(641, 361)).toEqual([642, 362]);
  });
});
