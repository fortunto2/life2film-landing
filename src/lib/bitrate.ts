/**
 * Hitting a file size on purpose.
 *
 * People rarely want "smaller" — they want under ten megabytes because Discord refuses anything
 * larger, or under twenty-five because that is what the mail server takes. That is an arithmetic
 * problem, not a slider: a file's size is its bitrate times its duration, so the bitrate needed to
 * land on a size is fixed once you know how long the video is.
 */

/** Container overhead — MP4 headers, index, and per-frame packaging. Measured around 2–4%. */
const OVERHEAD = 0.04;

/** Below this, video stops being watchable at any resolution, so the answer becomes "you can't". */
export const MIN_VIDEO_BITRATE = 90_000;

export interface BudgetInput {
  targetBytes: number;
  duration: number;
  /** Audio is a fixed cost taken off the top; zero when it is being discarded. */
  audioBitrate: number;
}

export interface Budget {
  /** Bits per second for the video track. */
  videoBitrate: number;
  /** False when even the floor bitrate cannot fit — the target is impossible for this duration. */
  achievable: boolean;
  /** Size the floor bitrate would produce, so the UI can say what IS possible. */
  floorBytes: number;
}

export function budgetFor({ targetBytes, duration, audioBitrate }: BudgetInput): Budget {
  const floorBytes = bytesFor(MIN_VIDEO_BITRATE + audioBitrate, duration);

  if (duration <= 0) {
    return { videoBitrate: MIN_VIDEO_BITRATE, achievable: false, floorBytes };
  }

  const usableBits = targetBytes * 8 * (1 - OVERHEAD);
  const videoBits = usableBits - audioBitrate * duration;
  const videoBitrate = videoBits / duration;

  return {
    videoBitrate: Math.max(MIN_VIDEO_BITRATE, Math.round(videoBitrate)),
    achievable: videoBitrate >= MIN_VIDEO_BITRATE,
    floorBytes,
  };
}

/** The inverse — what a given bitrate will weigh. Used for the estimate shown before encoding. */
export function bytesFor(totalBitrate: number, duration: number): number {
  return Math.round((totalBitrate * duration) / 8 / (1 - OVERHEAD));
}

/**
 * Correct the bitrate after a miss.
 *
 * Encoders do not hit a requested bitrate exactly — rate control drifts with the material, and a
 * static shot undershoots while a noisy handheld one overshoots. Rather than guess a safety margin
 * up front and always come in small, the first pass is measured and the second is scaled by how far
 * off it landed.
 */
export function correctBitrate(previousBitrate: number, actualBytes: number, targetBytes: number): number {
  const ratio = targetBytes / actualBytes;
  // Never chase more than a halving or a doubling in one step: a wild correction on a bad
  // measurement is worse than converging over two.
  const damped = Math.max(0.5, Math.min(2, ratio));
  return Math.max(MIN_VIDEO_BITRATE, Math.round(previousBitrate * damped * 0.98));
}

/** Bits per second the source is already using — the number that says whether compressing is worth it. */
export function sourceBitrate(sizeBytes: number, duration: number): number {
  return duration > 0 ? (sizeBytes * 8) / duration : 0;
}

/**
 * Roughly what this resolution needs to look acceptable, in bits per second.
 *
 * Used to warn before wasting a minute: a 480p file already at 800 kbps has nothing left to give,
 * and re-encoding it will make it larger, not smaller. Figures are the low end of common streaming
 * ladders — deliberately conservative, since the goal is to catch the obviously-pointless case.
 */
export function reasonableBitrate(width: number): number {
  if (width >= 3800) return 20_000_000;
  if (width >= 2500) return 10_000_000;
  if (width >= 1900) return 5_000_000;
  if (width >= 1200) return 2_500_000;
  if (width >= 800) return 1_200_000;
  return 700_000;
}

export interface Preset {
  label: string;
  bytes: number;
  note: string;
}

/** Where the common hard limits actually are. */
export const SIZE_PRESETS: Preset[] = [
  { label: '10 MB — Discord', bytes: 10 * 1024 * 1024, note: 'Free Discord upload limit' },
  { label: '16 MB — WhatsApp', bytes: 16 * 1024 * 1024, note: 'WhatsApp video limit' },
  { label: '25 MB — email', bytes: 25 * 1024 * 1024, note: 'Gmail and most mail servers' },
  { label: '50 MB — Discord Nitro Basic', bytes: 50 * 1024 * 1024, note: 'Nitro Basic upload limit' },
  { label: '100 MB', bytes: 100 * 1024 * 1024, note: '' },
];
