import { describe, expect, it } from 'vitest';
import { cells, mixStereo } from './split-screen';

describe('cells', () => {
  it('side by side: two equal halves of 1920x1080 with the gap between', () => {
    const c = cells('side', 8);
    expect([c.width, c.height]).toEqual([1920, 1080]);
    expect(c.a.w).toBe(956);
    expect(c.b.x).toBe(964);
    expect(c.b.x + c.b.w).toBe(1920);
  });
  it('stacked: two equal halves of 1080x1920', () => {
    const c = cells('stack', 8);
    expect([c.width, c.height]).toEqual([1080, 1920]);
    expect(c.a.h).toBe(956);
    expect(c.b.y + c.b.h).toBe(1920);
  });
});

describe('cells pip', () => {
  it('first fills the frame, second is a corner inset inside it', () => {
    const c = cells('pip');
    expect(c.a).toEqual({ x: 0, y: 0, w: 1920, h: 1080 });
    expect(c.b.x + c.b.w).toBeLessThan(1920);
    expect(c.b.y + c.b.h).toBeLessThan(1080);
  });
});

describe('mixStereo', () => {
  it('one source passes through, mono becomes both channels', () => {
    const [L, R] = mixStereo([Float32Array.of(0.5, -0.5)], null, 2);
    expect(Array.from(L)).toEqual([0.5, -0.5]);
    expect(Array.from(R)).toEqual([0.5, -0.5]);
  });
  it('two sources mix at 0.7 each and clamp', () => {
    const [L] = mixStereo([Float32Array.of(1, 0.2)], [Float32Array.of(1, 0.2)], 2);
    expect(L[0]).toBe(1);
    expect(L[1]).toBeCloseTo(0.28);
  });
  it('pads a short source with silence', () => {
    const [L] = mixStereo([Float32Array.of(0.3)], null, 3);
    expect(Array.from(L).map((v) => Math.round(v * 10) / 10)).toEqual([0.3, 0, 0]);
  });
});
