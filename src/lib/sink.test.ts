import { describe, expect, it } from 'vitest';
import { PieceSink } from './sink';

const bytes = async (b: Blob) => new Uint8Array(await b.arrayBuffer());

describe('PieceSink', () => {
  it('lays sequential writes end to end', async () => {
    const s = new PieceSink();
    s.write({ data: new Uint8Array([1, 2]), position: 0 });
    s.write({ data: new Uint8Array([3]), position: 2 });
    expect([...(await bytes(s.blob('x')))]).toEqual([1, 2, 3]);
  });

  it('patches bytes written earlier, as a muxer does with a size field', async () => {
    const s = new PieceSink();
    s.write({ data: new Uint8Array([0, 0, 0, 0]), position: 0 });
    s.write({ data: new Uint8Array([9, 9, 9, 9]), position: 4 });
    s.write({ data: new Uint8Array([7, 7]), position: 3 }); // straddles two pieces
    expect([...(await bytes(s.blob('x')))]).toEqual([0, 0, 0, 7, 7, 9, 9, 9]);
  });

  it('extends past the end and fills a gap with zeros', async () => {
    const s = new PieceSink();
    s.write({ data: new Uint8Array([1, 1]), position: 0 });
    s.write({ data: new Uint8Array([5, 6, 7]), position: 1 }); // half patch, half new
    s.write({ data: new Uint8Array([8]), position: 6 });
    expect([...(await bytes(s.blob('x')))]).toEqual([1, 5, 6, 7, 0, 0, 8]);
    expect(s.size).toBe(7);
  });

  it('copies data, so a reused muxer buffer cannot change what was written', async () => {
    const s = new PieceSink();
    const buf = new Uint8Array([1, 2]);
    s.write({ data: buf, position: 0 });
    buf[0] = 99;
    expect([...(await bytes(s.blob('x')))]).toEqual([1, 2]);
  });
});
