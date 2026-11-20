import { describe, expect, it } from 'vitest';
import { changeSpeed, impulse } from './song-speed';

const SR = 44_100;
const sine = (f: number, s: number) => Float32Array.from({ length: Math.round(SR * s) }, (_, i) => Math.sin((2 * Math.PI * f * i) / SR));
function freq(x: Float32Array): number {
  const a = Math.floor(x.length * 0.2), b = Math.floor(x.length * 0.8);
  let n = 0;
  for (let i = a + 1; i < b; i++) if (x[i - 1] < 0 && x[i] >= 0) n++;
  return (n * SR) / (b - a);
}

describe('changeSpeed', () => {
  it('turntable: 1.25x is shorter by 1/1.25 and higher by 1.25', () => {
    const y = changeSpeed(sine(400, 2), 1.25, 'turntable');
    expect(y.length).toBe(Math.round((SR * 2) / 1.25));
    expect(Math.abs(freq(y) - 500) / 500).toBeLessThan(0.01);
  });
  it('keep-pitch: 0.8x is longer by 1/0.8 at the same pitch', () => {
    const y = changeSpeed(sine(400, 2), 0.8, 'keep-pitch');
    expect(y.length).toBe(Math.round((SR * 2) / 0.8));
    expect(Math.abs(freq(y) - 400) / 400).toBeLessThan(0.02);
  });
  it('1x is a copy', () => {
    const x = sine(400, 0.1);
    const y = changeSpeed(x, 1, 'turntable');
    expect(y).toEqual(x);
    expect(y).not.toBe(x);
  });
});

describe('impulse', () => {
  it('decays to silence and is the same every time', () => {
    const [l] = impulse(SR, 1);
    const head = Math.max(...l.subarray(0, 2000).map(Math.abs));
    const end = Math.max(...l.subarray(l.length - 2000).map(Math.abs));
    expect(head).toBeGreaterThan(0.5);
    expect(end).toBeLessThan(0.001);
    expect(impulse(SR, 1)[0]).toEqual(l);
  });
});
