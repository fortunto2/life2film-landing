import { describe, expect, it } from 'vitest';
import { PRESETS, filterOf } from './video-filter';

describe('filterOf', () => {
  it('neutral look is identity values only', () => {
    expect(filterOf(PRESETS.none)).toBe('brightness(1) contrast(1) saturate(1)');
  });
  it('black and white zeroes saturation', () => {
    expect(filterOf(PRESETS.bw)).toContain('saturate(0)');
  });
  it('warm adds sepia, cool rotates hue, neither does the other', () => {
    expect(filterOf(PRESETS.warm)).toMatch(/sepia\(0\.210\)/);
    expect(filterOf(PRESETS.warm)).not.toContain('hue-rotate');
    expect(filterOf(PRESETS.cool)).toContain('hue-rotate(12deg)');
    expect(filterOf(PRESETS.cool)).not.toContain('sepia');
  });
});
