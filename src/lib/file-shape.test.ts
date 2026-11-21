import { describe, expect, it } from 'vitest';
import { fileShape } from './frames-webcodecs';

describe('fileShape', () => {
  it('names the kind of file, never the file', () => {
    const shape = fileShape({ name: 'Свадьба Маши 2024.MKV', type: 'video/x-matroska', size: 734_000_000 });
    expect(shape).toBe('type=video/x-matroska ext=mkv mb=734');
    expect(shape).not.toContain('Маши');
  });

  it('says it does not know rather than leaving a field empty', () => {
    expect(fileShape({ name: 'clip', type: '', size: 400_000 })).toBe('type=? ext=? mb=0');
  });
});
