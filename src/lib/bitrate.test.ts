import { describe, expect, test } from 'vitest';
import {
  budgetFor,
  bytesFor,
  correctBitrate,
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
