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

describe('what to try after an encode fails', async () => {
  const { nextAttempt } = await import('./encode');
  const hardware = { acceleration: 'prefer-hardware' as const, nudgeStart: false };

  // The exact sentence production logged 30 times in four weeks (Oct 2026).
  const refused = new Error(
    'This specific encoder configuration (avc1.640028, quantizer 22 / 6111000 bps, 1920x1080, ' +
      'hardware acceleration: prefer-hardware) is not supported by this browser',
  );

  test('a refused hardware configuration is retried in software', () => {
    expect(nextAttempt(refused, hardware)).toEqual({ acceleration: 'no-preference', nudgeStart: false });
  });

  test('software refusing too is final, not a loop', () => {
    expect(nextAttempt(refused, { acceleration: 'no-preference', nudgeStart: false })).toBeNull();
  });

  test('a sample rounded below zero starts the file a millisecond in, once', () => {
    const negative = new Error('Timestamps must be non-negative (got -0.0000022675736961463855s).');
    expect(nextAttempt(negative, hardware)).toEqual({ acceleration: 'prefer-hardware', nudgeStart: true });
    expect(nextAttempt(negative, { ...hardware, nudgeStart: true })).toBeNull();
  });

  test('anything else is not retried', () => {
    expect(nextAttempt(new Error('The browser could not decode that video.'), hardware)).toBeNull();
  });
});

describe('the size the capability check asks about', async () => {
  const { outputSize } = await import('./encode');
  test('no box: the source size, made even', () => {
    expect(outputSize({ width: 1920, height: 1081 }, {})).toEqual({ width: 1920, height: 1082 });
  });
  test('a width keeps the aspect', () => {
    expect(outputSize({ width: 1920, height: 1080 }, { width: 1280 })).toEqual({ width: 1280, height: 720 });
  });
  test('a portrait source sized by height', () => {
    expect(outputSize({ width: 1080, height: 1920 }, { height: 1280 })).toEqual({ width: 720, height: 1280 });
  });
  test('no source size, no claim', () => {
    expect(outputSize({ width: 0, height: 0 }, { width: 1280 })).toBeUndefined();
  });
});
