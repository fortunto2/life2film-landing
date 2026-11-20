import { describe, expect, it } from 'vitest';
import { placeLogo } from './watermark';

describe('placeLogo', () => {
  it('sizes by the shorter side and keeps the logo aspect', () => {
    const p = placeLogo(1920, 1080, 400, 200, 0.2, 'br');
    expect(p.w).toBeCloseTo(216);
    expect(p.h).toBeCloseTo(108);
  });
  it('puts each corner a 4% margin from its edges', () => {
    const m = 1080 * 0.04;
    expect(placeLogo(1920, 1080, 100, 100, 0.1, 'tl')).toMatchObject({ x: m, y: m });
    const br = placeLogo(1920, 1080, 100, 100, 0.1, 'br');
    expect(br.x + br.w).toBeCloseTo(1920 - m);
    expect(br.y + br.h).toBeCloseTo(1080 - m);
    const tr = placeLogo(1080, 1920, 100, 100, 0.1, 'tr');
    expect(tr.x + tr.w).toBeCloseTo(1080 - m);
    expect(tr.y).toBeCloseTo(m);
  });
  it('centres', () => {
    const c = placeLogo(1000, 600, 100, 50, 0.5, 'c');
    expect(c.x + c.w / 2).toBeCloseTo(500);
    expect(c.y + c.h / 2).toBeCloseTo(300);
  });
});
