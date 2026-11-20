import { describe, expect, it } from 'vitest';
import { barRect } from './progress-bar';

describe('barRect', () => {
  it('grows from nothing to the full width', () => {
    expect(barRect(0, 10, 1080, 1920, 'bottom').w).toBe(0);
    expect(barRect(5, 10, 1080, 1920, 'bottom').w).toBe(540);
    expect(barRect(12, 10, 1080, 1920, 'bottom').w).toBe(1080);
  });
  it('sits at the bottom or the top edge, a few pixels thick', () => {
    const b = barRect(1, 10, 1080, 1920, 'bottom');
    expect(b.h).toBe(9);
    expect(b.y + b.h).toBe(1920);
    expect(barRect(1, 10, 1080, 1920, 'top').y).toBe(0);
  });
});
