import { describe, expect, it } from 'vitest';
import { SONG_UNDER, mixInto } from './render-shots';

describe('render-shots mixing', () => {
  it('adds a shot’s sound at its place and stops at the film’s end', () => {
    const d = new Float32Array(5);
    mixInto(d, new Float32Array([1, 1, 1]), 3);
    mixInto(d, new Float32Array([0.5]), 3);
    expect([...d]).toEqual([0, 0, 0, 1.5, 1]);
  });
  it('the song under kept clip sound is -12 dB', () => {
    expect(20 * Math.log10(SONG_UNDER)).toBeCloseTo(-12);
  });
});
