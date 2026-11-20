import { describe, expect, it } from 'vitest';
import { placeBuffer } from './audio-io';

describe('placeBuffer', () => {
  it('a buffer that starts before the render start is cut at its head', () => {
    expect(placeBuffer(9.9, 10)).toEqual({ when: 0, offset: expect.closeTo(0.1) as unknown as number });
  });
  it('a later buffer goes at its own time, relative to the start', () => {
    expect(placeBuffer(10.5, 10)).toEqual({ when: 0.5, offset: 0 });
    expect(placeBuffer(0, 0)).toEqual({ when: 0, offset: 0 });
  });
});
