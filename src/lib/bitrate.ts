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
}

const MB = 1024 * 1024;

/** Where the common hard limits actually are. */
export const SIZE_PRESETS: Preset[] = [
  { label: '10 MB — Discord', bytes: 10 * MB },
  { label: '16 MB — WhatsApp', bytes: 16 * MB },
  { label: '25 MB — email', bytes: 25 * MB },
  { label: '50 MB — Discord Nitro Basic', bytes: 50 * MB },
  { label: '100 MB', bytes: 100 * MB },
];

/** What a typical AAC track costs, charged against every size budget. */
export const AUDIO_BITRATE = 128_000;

/** The preset `<select>` markup, so two pages cannot offer different limits. */
export const presetOptions = () =>
  SIZE_PRESETS.map((p, i) => `<option value="${p.bytes}"${i === 0 ? ' selected' : ''}>${p.label}</option>`).join('') +
  '<option value="custom">Custom…</option>';

/** Read a target out of the preset select plus the custom megabytes field. */
export function parseTarget(selected: string, customText: string): number {
  if (selected !== 'custom') return Number(selected);
  // Commas are how half the world writes a decimal point.
  const mb = parseFloat(customText.replace(',', '.'));
  return Number.isFinite(mb) && mb > 0 ? mb * MB : 10 * MB;
}

/**
 * Encode at a bitrate chosen to hit a size, then correct once if the encoder missed.
 *
 * Two passes is the ceiling: a third rarely improves on the second and doubles the wait again.
 * Anything within 4% counts as hit — inside the noise of rate control, and the aim is already set
 * below the real limit.
 *
 * `run` is injected because the two callers encode different things (a whole file, a trimmed range)
 * but decide identically. Keeping the decision here means the constants live in one place and the
 * loop is reachable from tests, which it was not while it sat inside two `<script>` blocks.
 */
export async function encodeToTargetSize(options: {
  targetBytes: number;
  duration: number;
  audioBitrate: number;
  run: (videoBitrate: number, onProgress: (fraction: number) => void) => Promise<Blob>;
  onStatus?: (message: string, fraction: number) => void;
}): Promise<Blob> {
  const { targetBytes, duration, audioBitrate, run, onStatus } = options;

  // Aim under the wall: a file of exactly 10.00 MB is still refused by a 10 MB limit.
  const aim = targetBytes * 0.96;
  const budget = budgetFor({ targetBytes: aim, duration, audioBitrate });

  onStatus?.(`Encoding at ${Math.round(budget.videoBitrate / 1000)} kbps…`, 0);
  const first = await run(budget.videoBitrate, (p) => onStatus?.(`Encoding — ${Math.round(p * 100)}%`, p * 0.5));

  const missedBy = Math.abs(first.size - aim) / aim;
  if (first.size <= targetBytes && missedBy <= 0.04) return first;

  const corrected = correctBitrate(budget.videoBitrate, first.size, aim);

  // No point re-encoding at a bitrate we are already at, or below the floor.
  const worthRetrying =
    Math.abs(corrected - budget.videoBitrate) / budget.videoBitrate > 0.02 && corrected > MIN_VIDEO_BITRATE;
  if (!worthRetrying) return first;

  onStatus?.(
    `First pass came out ${Math.round(first.size / MB * 10) / 10} MB — retrying at ${Math.round(corrected / 1000)} kbps…`,
    0.5,
  );
  const second = await run(corrected, (p) => onStatus?.(`Second pass — ${Math.round(p * 100)}%`, 0.5 + p * 0.5));

  // Keep whichever satisfies the limit; when both do, prefer the larger, since bigger means better
  // picture.
  return second.size <= targetBytes && (first.size > targetBytes || second.size > first.size) ? second : first;
}
