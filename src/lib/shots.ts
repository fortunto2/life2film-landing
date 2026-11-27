/**
 * Shot boundaries from more than one signal, merged.
 *
 * The centre-column detector (`adjacent_diffs`) sees one column of pixels and fires on motion
 * inside a shot; the feature detector (`feature_cosine`) compares 37 whole-frame measurements and
 * does not, but can miss a cut between two visually similar shots. Boundaries within `tolerance`
 * of each other become one at their mean, and a boundary needs `minVotes` signals behind it.
 *
 * The phone's ensemble takes one vote (ensemble.rs: weights 0.3, threshold 0.2). The site asks
 * for agreement, measured on 2026-10-17: over 70 s of a synthetic video with six real cuts the
 * column detector reported 23 boundaries and the feature detector 11; the six they agreed on were
 * the six real ones. The price is a cut only one of them sees (one of five on the other test
 * video). For a splitter that promises never to cut inside a shot, a missed cut is a longer clip
 * and a false one is a broken promise, so agreement is the right trade here.
 */
export function mergeBoundaries(signals: number[][], tolerance = 0.5, minVotes = 1): number[] {
  const all = signals.flat().filter((t) => Number.isFinite(t) && t > 0).sort((a, b) => a - b);
  const merged: { t: number; n: number }[] = [];
  for (const t of all) {
    const last = merged[merged.length - 1];
    if (last && t - last.t <= tolerance) {
      last.t = (last.t * last.n + t) / (last.n + 1);
      last.n += 1;
    } else {
      merged.push({ t, n: 1 });
    }
  }
  return merged.filter((m) => m.n >= minVotes).map((m) => m.t);
}

/** The scene list `[[start, end], …]` as the boundaries between scenes, i.e. every start but 0. */
export function boundariesOf(scenes: Array<[number, number]> | undefined): number[] {
  return (scenes ?? []).slice(1).map(([start]) => start);
}

import type { Engine } from './engine';
import type { ContentDelta } from './content-delta';

type Rgb = { r: number; g: number; b: number };

/**
 * Both detectors over the same samples, merged. Returns scenes as `[start, end]` pairs covering
 * the whole duration, the shape the tools already consume. The feature detector is skipped when
 * the vectors are missing (an older engine build), so the tool still answers.
 */
/**
 * Which detector a person asked for.
 *
 * - `strict`: both site detectors must agree (centre column + feature vectors). Fewest false cuts;
 *   the splitter's promise never to cut inside a shot needs it.
 * - `camera`: `content`, the Life2Film CLI's default (PySceneDetect's ContentDetector on HSV
 *   deltas, threshold 40): best measured on phone days (twotier F1 0.441).
 * - `edited`: `adaptive` (AdaptiveDetector): a cut must stand out from its neighbourhood. Leads the
 *   SHOT benchmark of edited video (F1 0.614) and cannot fire on continuous handheld takes.
 *
 * The scene detector's default is `edited`. On 9 minutes of real footage with 100 known cuts, at 4
 * samples a second, unrefined (27 Nov 2026): edited 0.5 F1 0.80 (70 right, 4 false), camera 0.4
 * 0.79, camera 0.5 0.72, strict 0.5 0.16. The splitter keeps `strict` (DEFAULT_SHOT_OPTIONS).
 */
export type ShotMethod = 'strict' | 'camera' | 'edited';

export interface ShotOptions {
  method: ShotMethod;
  /** 0..1, 0.5 is each detector's shipped setting; higher finds more cuts. */
  sensitivity: number;
  /** Shortest shot in seconds; a cut closer than this to the previous one is dropped. */
  minShot: number;
}

export const DEFAULT_SHOT_OPTIONS: ShotOptions = { method: 'strict', sensitivity: 0.5, minShot: 0.6 };

/**
 * `content` threshold, geometric: 40 (the core's CONTENT_THRESHOLD) at 0, 13 at 0.5, 6 at 1.
 *
 * Measured 27 Nov 2026 with the core's own CLI on 9 minutes of real footage with 100 known cuts,
 * decoded at 5 frames a second (`--scene-algos=content --dump-signals`): the score at a cut has a
 * median of 16.3 and inside a shot 3.9; F1 is 0.08 at 40, 0.73 at 15, 0.82 at 12, 0.80 at 10. The
 * core's 40 was tuned on phone days at a sparser decode, so it is the slider's cautious end.
 */
export const contentThreshold = (sensitivity: number) => {
  const s = clamp01(sensitivity);
  return s <= 0.5 ? 40 * (13 / 40) ** (2 * s) : 13 * (6 / 13) ** (2 * (s - 0.5));
};
/** `adaptive` ratio: 6 at 0, the core's 3.0 at 0.5 (F1 0.62 on the same test), 1.5 at 1. */
export const adaptiveRatio = (sensitivity: number) => 3 * 2 ** ((0.5 - clamp01(sensitivity)) * 2);
/**
 * The adaptive ratio at a sampling rate below 4 a second: x sqrt(rate / 4).
 *
 * The score at a cut does not depend on the rate, but inside a shot it grows with the gap between
 * samples, so the cut stands out less from its neighbours. Measured 27 Nov 2026 on 36 minutes (the
 * 9-minute test above four times, 403 known cuts) at 1.9 samples a second: the unscaled 3.0 found
 * 39 cuts (F1 0.16); the best ratio was 1.85 (F1 0.81), where 4 a second wants about 2.8.
 */
export const adaptiveRatioAt = (sensitivity: number, samplesPerSecond: number) =>
  adaptiveRatio(sensitivity) * Math.sqrt(Math.min(1, Math.max(0.25, samplesPerSecond / 4) || 1));
/** `feature_cosine` k: 2.5 at 0, the site's 1.5 at 0.5, 0.5 at 1. */
export const featureK = (sensitivity: number) => 2.5 - 2 * clamp01(sensitivity);
const clamp01 = (x: number) => Math.min(1, Math.max(0, Number.isFinite(x) ? x : 0.5));

export interface ShotInput {
  /** Centre pixel, feature vector and time of each sample the strict pair reads (sparser than `deltas`). */
  pixels: Rgb[];
  vectors: number[][];
  timestamps: number[];
  duration: number;
  /** HSV deltas between consecutive samples (`content-delta.ts`), for `camera` and `edited`. */
  deltas?: ContentDelta[];
}

export function detectShots(
  engine: Engine,
  input: ShotInput,
  options: ShotOptions = DEFAULT_SHOT_OPTIONS,
): Array<[number, number]> {
  const { pixels, vectors, timestamps, duration } = input;
  if (options.method !== 'strict') {
    if (typeof engine.detect_scenes_content !== 'function') throw new Error('This detector needs the full engine.');
    if (!input.deltas?.length) throw new Error('No colour deltas were measured for this video.');
    const out = JSON.parse(
      engine.detect_scenes_content(
        JSON.stringify({
          deltas: input.deltas,
          duration,
          method: options.method === 'camera' ? 'content' : 'adaptive',
          threshold: contentThreshold(options.sensitivity),
          adaptive_ratio: adaptiveRatioAt(options.sensitivity, input.deltas.length / Math.max(duration, 1e-9)),
          min_content_val: 15,
          // The CLI's `adaptive_window` (200 samples), which is what the 0.62 above was measured at.
          window: 200,
          min_scene_len: options.minShot,
        }),
      ),
    ) as { scenes?: Array<[number, number]>; error?: string };
    if (out.error) throw new Error(out.error);
    return out.scenes?.length ? out.scenes : [[0, duration]];
  }
  const slick = JSON.parse(
    engine.detect_scenes_slick(JSON.stringify({ pixels, timestamps, duration, algo: 'adjacent_diffs' })),
  ) as { scenes?: Array<[number, number]>; error?: string };
  if (slick.error) throw new Error(slick.error);

  const signals = [boundariesOf(slick.scenes)];
  const complete = vectors.length === timestamps.length && vectors.every((v) => v.length > 0);
  if (complete && typeof engine.detect_scenes_features === 'function') {
    const features = JSON.parse(
      engine.detect_scenes_features(
        JSON.stringify({ features: vectors, timestamps, duration, method: 'feature_cosine', threshold_k: featureK(options.sensitivity), min_gap: options.minShot }),
      ),
    ) as { scenes?: Array<[number, number]>; error?: string };
    if (!features.error) signals.push(boundariesOf(features.scenes));
  }

  // Agreement when both detectors ran; the one detector's word when only one could.
  // AI-NOTE: the tolerance follows the sampling step. A fixed 0.5 s was set on a 70 s video sampled
  // every 0.14 s; past ~50 s the step is wider (`samplePlan` caps at 500 samples), two detectors
  // naming neighbouring samples could not agree. On a 9-minute real-footage test (100 cuts) it moved
  // the agreed cuts 11 -> 12 with no new false one; the detectors themselves see 31 and 18 (27 Nov 2026).
  const step = timestamps.length > 1 ? duration / timestamps.length : 0;
  const merged = mergeBoundaries(signals, Math.max(0.5, 1.5 * step), signals.length).filter((t) => t < duration);
  const boundaries: number[] = [];
  for (const t of merged) if (t - (boundaries[boundaries.length - 1] ?? 0) >= options.minShot) boundaries.push(t);
  const starts = [0, ...boundaries];
  return starts.map((start, i) => [start, i + 1 < starts.length ? starts[i + 1] : duration]);
}
