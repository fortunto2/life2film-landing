import { describe, expect, test } from 'vitest';
import {
  budgetFor,
  bytesFor,
  correctBitrate,
  encodeToTargetSize,
  parseTarget,
  sourceBitrate,
  reasonableBitrate,
  MIN_VIDEO_BITRATE,
} from './bitrate';

const MB = 1024 * 1024;

describe('budgeting a target size', () => {
  test('the budgeted bitrate produces the target size', () => {
    // The round trip is the whole contract: whatever bitrate comes out, encoding a video of that
    // duration at that bitrate must weigh what was asked for.
    for (const [targetMB, duration] of [
      [10, 60],
      [25, 300],
      [8, 12],
      [50, 1800],
    ] as const) {
      const audioBitrate = 128_000;
      const { videoBitrate } = budgetFor({ targetBytes: targetMB * MB, duration, audioBitrate });
      const predicted = bytesFor(videoBitrate + audioBitrate, duration);

      // Within a percent — the only slack is integer rounding of the bitrate.
      expect(Math.abs(predicted - targetMB * MB) / (targetMB * MB)).toBeLessThan(0.01);
    }
  });

  test('audio is taken off the top, not ignored', () => {
    const withSound = budgetFor({ targetBytes: 10 * MB, duration: 60, audioBitrate: 192_000 });
    const silent = budgetFor({ targetBytes: 10 * MB, duration: 60, audioBitrate: 0 });
    expect(silent.videoBitrate - withSound.videoBitrate).toBeCloseTo(192_000, -3);
  });

  test('an impossible target is reported rather than silently missed', () => {
    // Ten minutes into one megabyte cannot be done at a watchable bitrate. Saying so beats
    // returning a number that will not be honoured.
    const budget = budgetFor({ targetBytes: 1 * MB, duration: 600, audioBitrate: 128_000 });
    expect(budget.achievable).toBe(false);
    expect(budget.videoBitrate).toBe(MIN_VIDEO_BITRATE);
    expect(budget.floorBytes).toBeGreaterThan(1 * MB);
  });

  test('a generous target is achievable and does not clamp', () => {
    const budget = budgetFor({ targetBytes: 500 * MB, duration: 60, audioBitrate: 128_000 });
    expect(budget.achievable).toBe(true);
    expect(budget.videoBitrate).toBeGreaterThan(10_000_000);
  });

  test('zero duration does not divide by zero', () => {
    const budget = budgetFor({ targetBytes: 10 * MB, duration: 0, audioBitrate: 128_000 });
    expect(Number.isFinite(budget.videoBitrate)).toBe(true);
    expect(budget.achievable).toBe(false);
  });
});

describe('correcting after a miss', () => {
  test('an overshoot lowers the bitrate, an undershoot raises it', () => {
    const target = 10 * MB;
    expect(correctBitrate(2_000_000, 12 * MB, target)).toBeLessThan(2_000_000);
    expect(correctBitrate(2_000_000, 7 * MB, target)).toBeGreaterThan(2_000_000);
  });

  test('a correction converges towards the target rather than overshooting the other way', () => {
    // Simulate an encoder that consistently runs 20% over what it is asked for.
    const target = 10 * MB;
    const duration = 60;
    let bitrate = budgetFor({ targetBytes: target, duration, audioBitrate: 0 }).videoBitrate;

    let actual = bytesFor(bitrate, duration) * 1.2;
    expect(actual).toBeGreaterThan(target);

    bitrate = correctBitrate(bitrate, actual, target);
    actual = bytesFor(bitrate, duration) * 1.2;

    // Second pass must be under the target — that is the point of correcting.
    expect(actual).toBeLessThanOrEqual(target);
  });

  test('a wild measurement cannot send the bitrate to an extreme in one step', () => {
    expect(correctBitrate(1_000_000, 100 * MB, 1 * MB)).toBeGreaterThanOrEqual(MIN_VIDEO_BITRATE);
    expect(correctBitrate(1_000_000, 100 * MB, 1 * MB)).toBeGreaterThanOrEqual(490_000);
    expect(correctBitrate(1_000_000, 1 * MB, 100 * MB)).toBeLessThanOrEqual(2_000_000);
  });

  test('the floor is never breached', () => {
    expect(correctBitrate(MIN_VIDEO_BITRATE, 100 * MB, 1)).toBe(MIN_VIDEO_BITRATE);
  });
});

describe('reading the source', () => {
  test('source bitrate matches the file it describes', () => {
    // 12 MB over 10 s is 9.6 Mbps.
    expect(sourceBitrate(12_000_000, 10)).toBeCloseTo(9_600_000, -4);
    expect(sourceBitrate(1000, 0)).toBe(0);
  });

  test('reasonable bitrate rises with resolution', () => {
    const widths = [640, 854, 1280, 1920, 2560, 3840];
    const values = widths.map(reasonableBitrate);
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThan(values[i - 1]);
    }
  });
});

describe('two-pass size targeting', () => {
  /** A fake encoder that misses the requested bitrate by a fixed factor, like a real one does. */
  const encoder = (drift: number, duration: number) => {
    const calls: number[] = [];
    return {
      calls,
      run: async (videoBitrate: number) => {
        calls.push(videoBitrate);
        return { size: bytesFor(videoBitrate, duration) * drift } as Blob;
      },
    };
  };

  test('a first pass that lands close enough is kept, without a second encode', async () => {
    const { run, calls } = encoder(1, 60);
    const blob = await encodeToTargetSize({
      targetBytes: 10 * MB, duration: 60, audioBitrate: 0, run,
    });
    expect(calls).toHaveLength(1);
    expect(blob.size).toBeLessThanOrEqual(10 * MB);
  });

  test('an overshoot is corrected and the result comes in under the limit', async () => {
    // This is the case the whole function exists for: rate control ran 25% hot.
    const { run, calls } = encoder(1.25, 60);
    const blob = await encodeToTargetSize({
      targetBytes: 10 * MB, duration: 60, audioBitrate: 0, run,
    });
    expect(calls).toHaveLength(2);
    expect(calls[1]).toBeLessThan(calls[0]);
    expect(blob.size).toBeLessThanOrEqual(10 * MB);
  });

  test('never more than two passes, however badly the encoder behaves', async () => {
    const { run, calls } = encoder(3, 60);
    await encodeToTargetSize({ targetBytes: 10 * MB, duration: 60, audioBitrate: 0, run });
    expect(calls.length).toBeLessThanOrEqual(2);
  });

  test('audio is charged against the budget, leaving less for video', async () => {
    const silent = encoder(1, 60);
    const noisy = encoder(1, 60);
    await encodeToTargetSize({ targetBytes: 10 * MB, duration: 60, audioBitrate: 0, run: silent.run });
    await encodeToTargetSize({ targetBytes: 10 * MB, duration: 60, audioBitrate: 192_000, run: noisy.run });
    expect(noisy.calls[0]).toBeLessThan(silent.calls[0]);
  });

  test('progress is reported through both passes without going backwards', async () => {
    const seen: number[] = [];
    const { run } = encoder(1.25, 60);
    await encodeToTargetSize({
      targetBytes: 10 * MB, duration: 60, audioBitrate: 0, run,
      onStatus: (event) => seen.push(event.fraction),
    });
    expect(seen.length).toBeGreaterThan(1);
    expect(seen).toEqual([...seen].sort((a, b) => a - b));
    expect(Math.max(...seen)).toBeLessThanOrEqual(1);
  });

  test('progress reports facts, never a sentence', async () => {
    // The library must not choose words: a Russian page reported 'Encoding at 6314 kbps…' when it
    // did. Every field here is a number or a known token.
    const events: unknown[] = [];
    const { run } = encoder(1.25, 60);
    await encodeToTargetSize({
      targetBytes: 10 * MB, duration: 60, audioBitrate: 0, run,
      onStatus: (event) => events.push(event),
    });

    for (const event of events as Array<Record<string, unknown>>) {
      expect(['first', 'second']).toContain(event.pass);
      for (const [key, value] of Object.entries(event)) {
        if (key === 'pass') continue;
        expect(typeof value).toBe('number');
      }
    }
    expect(events.some((e) => (e as { pass: string }).pass === 'second')).toBe(true);
  });
});

describe('reading a target from the controls', () => {
  test('a preset value passes through', () => {
    expect(parseTarget(String(25 * MB), '')).toBe(25 * MB);
  });

  test('custom megabytes are parsed, including a comma decimal', () => {
    expect(parseTarget('custom', '7.5')).toBeCloseTo(7.5 * MB, 0);
    expect(parseTarget('custom', '7,5')).toBeCloseTo(7.5 * MB, 0);
  });

  test('nonsense in the custom field falls back rather than producing NaN', () => {
    for (const text of ['', 'abc', '-3', '0']) {
      expect(parseTarget('custom', text)).toBe(10 * MB);
    }
  });
});
