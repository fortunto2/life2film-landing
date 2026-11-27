import { describe, expect, it } from 'vitest';
import { fileShape, headSignature } from './frames-webcodecs';

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

describe('headSignature', () => {
  const bytes = (s: string, prefix: number[] = []) => new Uint8Array([...prefix, ...Array.from(s, (c) => c.charCodeAt(0))]);

  it('names the MP4 brand', () => {
    expect(headSignature(bytes('ftypisom\0\0\0\0', [0, 0, 0, 0x20]))).toBe('ftyp:isom');
    expect(headSignature(bytes('ftyp3gp4', [0, 0, 0, 0x18]))).toBe('ftyp:3gp4');
  });

  it('knows Matroska/WebM, AVI and a bare moov', () => {
    expect(headSignature(new Uint8Array([0x1a, 0x45, 0xdf, 0xa3, 1]))).toBe('ebml');
    expect(headSignature(bytes('RIFF\0\0\0\0AVI '))).toBe('riff:AVI ');
    expect(headSignature(bytes('moov', [0, 0, 1, 0]))).toBe('box:moov');
  });

  it('tells an HTML page saved as .mp4 and an empty file apart from a codec', () => {
    expect(headSignature(bytes('<!DOCTYPE html>'))).toBe('html');
    expect(headSignature(new Uint8Array())).toBe('empty');
    expect(headSignature(new Uint8Array([0xde, 0xad, 0xbe, 0xef, 0]))).toBe('hex:deadbeef');
  });
});
