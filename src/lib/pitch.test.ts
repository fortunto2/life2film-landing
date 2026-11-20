import { describe, expect, it } from 'vitest';
import { ratioOf, shiftPitch, wsola } from './pitch';

const SR = 44_100;
const sine = (f: number, s: number) => Float32Array.from({ length: Math.round(SR * s) }, (_, i) => Math.sin((2 * Math.PI * f * i) / SR));

/** Dominant frequency by zero crossings of a clean sine, averaged over the middle. */
function freq(x: Float32Array): number {
  const a = Math.floor(x.length * 0.2), b = Math.floor(x.length * 0.8);
  let n = 0;
  for (let i = a + 1; i < b; i++) if (x[i - 1] < 0 && x[i] >= 0) n++;
  return (n * SR) / (b - a);
}

describe('pitch', () => {
  it('ratioOf: an octave doubles, a semitone is 2^(1/12)', () => {
    expect(ratioOf(12)).toBe(2);
    expect(ratioOf(-12)).toBe(0.5);
    expect(ratioOf(1)).toBeCloseTo(1.0595, 4);
  });
  it('wsola stretches length but keeps the pitch', () => {
    const y = wsola(sine(440, 1), 1.5);
    expect(y.length).toBe(Math.round(SR * 1.5));
    expect(freq(y)).toBeGreaterThan(430);
    expect(freq(y)).toBeLessThan(450);
  });
  it('shiftPitch moves 440 Hz by the asked semitones and keeps the length', () => {
    const x = sine(440, 1);
    for (const [st, want] of [[12, 880], [-12, 220], [2, 493.9], [-3, 370]] as const) {
      const y = shiftPitch(x, st);
      expect(y.length).toBe(x.length);
      expect(Math.abs(freq(y) - want) / want).toBeLessThan(0.02);
    }
  });
  it('does not blow up the level', () => {
    const y = shiftPitch(sine(300, 1), 5);
    expect(Math.max(...y.subarray(4000, 40000).map(Math.abs))).toBeLessThan(1.05);
  });
});
