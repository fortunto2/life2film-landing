import { describe, expect, it } from 'vitest';
import { contentWidth, hsvDelta, rgbToHsvCv, toHsv } from './content-delta';

describe('rgbToHsvCv (port of va_scene::content::rgb_to_hsv_cv)', () => {
  it('matches OpenCV uint8 HSV on the primaries and grey', () => {
    expect(rgbToHsvCv(255, 0, 0)).toEqual([0, 255, 255]);
    expect(rgbToHsvCv(0, 255, 0)).toEqual([60, 255, 255]);
    expect(rgbToHsvCv(0, 0, 255)).toEqual([120, 255, 255]);
    expect(rgbToHsvCv(128, 128, 128)).toEqual([0, 0, 128]);
    expect(rgbToHsvCv(0, 0, 0)).toEqual([0, 0, 0]);
  });

  it('wraps a negative hue and rounds like the core', () => {
    // magenta-ish: cmax = r, g < b -> negative degrees + 360
    expect(rgbToHsvCv(255, 0, 128)).toEqual([165, 255, 255]);
    expect(rgbToHsvCv(200, 150, 100)).toEqual([15, 128, 200]);
  });

  it('agrees with the Rust core on odd colours (printed by va_scene 27 Nov 2026)', () => {
    expect(rgbToHsvCv(13, 77, 201)).toEqual([110, 239, 201]);
    expect(rgbToHsvCv(250, 251, 3)).toEqual([30, 252, 251]);
    expect(rgbToHsvCv(1, 2, 3)).toEqual([105, 170, 3]);
  });
});

describe('hsvDelta', () => {
  it('is the mean absolute difference per channel', () => {
    const a = toHsv(new Uint8Array([255, 0, 0, 0, 0, 0]));
    const b = toHsv(new Uint8Array([0, 0, 255, 0, 0, 0]));
    expect(hsvDelta(a, b, 1.5)).toEqual({ timestamp: 1.5, delta_hue: 60, delta_sat: 0, delta_lum: 0 });
  });

  it('refuses frames of different sizes rather than comparing unrelated pixels', () => {
    expect(hsvDelta(new Uint8Array(6), new Uint8Array(9), 0)).toBeNull();
  });

  it('asks for a 120 px short side either way round', () => {
    expect(contentWidth(1920, 1080)).toBe(213);
    expect(contentWidth(1080, 1920)).toBe(120);
  });
});
