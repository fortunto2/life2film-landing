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

describe('a codec that passes the probe and fails on the first frame', async () => {
  const { nextAttempt, canCopyTrim, describeAttempt, isCodecRefusal } = await import('./encode');
  // The exact reason production logged 109 times in 28 days (two people, /ru/tools/video-splitter/).
  const refused = new DOMException('Unsupported configuration. Check isConfigSupported() prior to calling configure().', 'OperationError');
  const hardware = { acceleration: 'prefer-hardware' as const, nudgeStart: false };
  const software = { acceleration: 'no-preference' as const, nudgeStart: false };

  test('the order is hardware, software, copy, then give up', () => {
    const second = nextAttempt(refused, hardware, true);
    expect(second).toEqual(software);
    const third = nextAttempt(refused, second!, true);
    expect(third).toEqual({ ...software, copy: true });
    expect(nextAttempt(refused, third!, true)).toBeNull();
  });

  test('without a copy that fits (resize, bitrate) software is the last try', () => {
    expect(nextAttempt(refused, software, false)).toBeNull();
  });

  test('a decoder dying mid-stream skips the encoder retry and goes to copy', () => {
    const dying = new DOMException('Decoding error.', 'EncodingError');
    expect(nextAttempt(dying, hardware, true)).toEqual({ ...hardware, copy: true });
  });

  test('"Failed to initialize video encode accelerator" is a hardware refusal like the older sentence', () => {
    const accel = new Error('Encoding error. (Failed to initialize video encode accelerator.)');
    expect(nextAttempt(accel, hardware, true)).toEqual(software);
  });

  test('a network error is not a codec problem', () => {
    expect(nextAttempt(new TypeError('network error'), hardware, true)).toBeNull();
    expect(isCodecRefusal(new TypeError('network error'))).toBe(false);
    expect(isCodecRefusal(refused)).toBe(true);
  });

  const aac = (c: string) => c === 'aac';
  const copyable = { videoCodec: 'avc', audioCodec: 'aac', audioSupported: aac };
  test('a plain trim of H.264 + AAC into MP4 can be copied', () => {
    expect(canCopyTrim({ container: 'mp4' }, copyable)).toBe(true);
  });
  test('anything that changes the picture cannot', () => {
    expect(canCopyTrim({ container: 'mp4', width: 1080, height: 1920, fit: 'cover' }, copyable)).toBe(false);
    expect(canCopyTrim({ container: 'mp4', videoBitrate: 1e6 }, copyable)).toBe(false);
    expect(canCopyTrim({ container: 'mp4', mono: true }, copyable)).toBe(false);
  });
  test('VP9 into MP4, or audio the container refuses, cannot', () => {
    expect(canCopyTrim({ container: 'mp4' }, { ...copyable, videoCodec: 'vp9' })).toBe(false);
    expect(canCopyTrim({ container: 'mp4' }, { ...copyable, audioCodec: 'ac3' })).toBe(false);
    expect(canCopyTrim({ container: 'mp4' }, { ...copyable, audioCodec: null })).toBe(true);
  });
  test('audio containers never copy video', () => {
    expect(canCopyTrim({ container: 'mp3' }, copyable)).toBe(false);
  });

  test('the event line names the attempt and the codecs, nothing else', () => {
    expect(describeAttempt({ ...software, copy: true }, { src: 'hvc1.1.6.L120 3840x2160 a=aac', out: 'avc 3840x2160' })).toBe(
      'copy src=hvc1.1.6.L120 3840x2160 a=aac out=avc 3840x2160',
    );
    expect(describeAttempt(hardware, {})).toBe('enc/hw');
  });
});
