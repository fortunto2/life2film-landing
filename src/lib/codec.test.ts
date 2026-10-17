import { describe, expect, test } from 'vitest';
import { codecPreference } from './encode';

describe('which video codec a container should get', () => {
  // Measured on production, 16 Oct 2026: WebM in, "MP4" out, and the MP4 held VP9. Chrome can
  // encode VP9 and mediabunny takes the first codec the browser offers, so the file played in
  // Chrome and nowhere else: not in QuickTime, not in Photos on the iPhone it was made for.
  test('mp4 and mov ask for H.264 first', () => {
    expect(codecPreference('mp4')[0]).toBe('avc');
    expect(codecPreference('mov')[0]).toBe('avc');
  });

  test('webm asks for VP9 first and never H.264', () => {
    expect(codecPreference('webm')[0]).toBe('vp9');
    expect(codecPreference('webm')).not.toContain('avc');
  });

  test('audio containers want no video codec at all', () => {
    expect(codecPreference('mp3')).toEqual([]);
    expect(codecPreference('wav')).toEqual([]);
  });
});

describe('what may be copied without re-encoding', async () => {
  const { copyableCodecs } = await import('./encode');
  test('MP4 copies H.264 and HEVC only; VP9 must be transcoded', () => {
    expect(copyableCodecs('mp4')).toEqual(['avc', 'hevc']);
    expect(copyableCodecs('mp4')).not.toContain('vp9');
  });
  test('WebM copies the WebM codecs and never H.264', () => {
    expect(copyableCodecs('webm')).not.toContain('avc');
    expect(copyableCodecs('webm')).toContain('vp9');
  });
});
