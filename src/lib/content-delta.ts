/**
 * The HSV content delta between two frames, exactly as the Life2Film core computes it
 * (`va_scene::content::{rgb_to_hsv_cv, hsv_delta_rgb24}`): OpenCV's uint8 HSV, mean absolute
 * difference per channel. `detect_scenes_content` (the CLI's default detector, PySceneDetect's
 * ContentDetector) thresholds the mean of the three.
 *
 * The core box-averages each frame to a 120 px short side first (`CONTENT_SHORT_SIDE`); the
 * browser scales with `drawImage`, so ask `frameAt` for a frame whose short side is 120.
 */

export const CONTENT_SHORT_SIDE = 120;

/** RGB -> HSV in OpenCV's uint8 convention: H 0..179, S 0..255, V 0..255. Port of `rgb_to_hsv_cv`. */
export function rgbToHsvCv(r: number, g: number, b: number): [number, number, number] {
  const cmax = Math.max(r, g, b);
  const cmin = Math.min(r, g, b);
  const delta = cmax - cmin;
  const v = cmax;
  // Rust's `as u8` truncates toward zero and saturates; the values here stay in range.
  const s = cmax < 0.5 ? 0 : Math.trunc((delta / cmax) * 255 + 0.5);
  if (delta < 0.5) return [0, s, v];
  let deg: number;
  if (cmax - r < 0.5) {
    deg = (60 * (g - b)) / delta;
    if (deg < 0) deg += 360;
  } else if (cmax - g < 0.5) {
    deg = (60 * (b - r)) / delta + 120;
  } else {
    deg = (60 * (r - g)) / delta + 240;
  }
  return [Math.min(255, Math.trunc(deg * 0.5 + 0.5)), s, v];
}

export interface ContentDelta {
  timestamp: number;
  delta_hue: number;
  delta_sat: number;
  delta_lum: number;
}

/** Packed RGB24 of one frame as three HSV planes, so each frame is converted once, not twice. */
export function toHsv(rgb24: Uint8Array): Uint8Array {
  const out = new Uint8Array(rgb24.length);
  for (let i = 0; i < rgb24.length; i += 3) {
    const [h, s, v] = rgbToHsvCv(rgb24[i], rgb24[i + 1], rgb24[i + 2]);
    out[i] = h;
    out[i + 1] = s;
    out[i + 2] = v;
  }
  return out;
}

/** Mean absolute H, S and V difference of two HSV buffers of one size; null when sizes differ. */
export function hsvDelta(prev: Uint8Array, curr: Uint8Array, timestamp: number): ContentDelta | null {
  if (prev.length !== curr.length || prev.length === 0) return null;
  let h = 0;
  let s = 0;
  let v = 0;
  for (let i = 0; i < prev.length; i += 3) {
    h += Math.abs(prev[i] - curr[i]);
    s += Math.abs(prev[i + 1] - curr[i + 1]);
    v += Math.abs(prev[i + 2] - curr[i + 2]);
  }
  const n = prev.length / 3;
  return { timestamp, delta_hue: h / n, delta_sat: s / n, delta_lum: v / n };
}

/** The frame width that gives a 120 px short side. */
export function contentWidth(width: number, height: number): number {
  return width >= height ? Math.max(1, Math.round((CONTENT_SHORT_SIDE * width) / height)) : CONTENT_SHORT_SIDE;
}
