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

type Rgb = { r: number; g: number; b: number };

/**
 * Both detectors over the same samples, merged. Returns scenes as `[start, end]` pairs covering
 * the whole duration, the shape the tools already consume. The feature detector is skipped when
 * the vectors are missing (an older engine build), so the tool still answers.
 */
export function detectShots(
  engine: Engine,
  input: { pixels: Rgb[]; vectors: number[][]; timestamps: number[]; duration: number },
): Array<[number, number]> {
  const { pixels, vectors, timestamps, duration } = input;
  const slick = JSON.parse(
    engine.detect_scenes_slick(JSON.stringify({ pixels, timestamps, duration, algo: 'adjacent_diffs' })),
  ) as { scenes?: Array<[number, number]>; error?: string };
  if (slick.error) throw new Error(slick.error);

  const signals = [boundariesOf(slick.scenes)];
  const complete = vectors.length === timestamps.length && vectors.every((v) => v.length > 0);
  if (complete && typeof engine.detect_scenes_features === 'function') {
    const features = JSON.parse(
      engine.detect_scenes_features(
        JSON.stringify({ features: vectors, timestamps, duration, method: 'feature_cosine', threshold_k: 1.5, min_gap: 0.6 }),
      ),
    ) as { scenes?: Array<[number, number]>; error?: string };
    if (!features.error) signals.push(boundariesOf(features.scenes));
  }

  // Agreement when both detectors ran; the one detector's word when only one could.
  const boundaries = mergeBoundaries(signals, 0.5, signals.length).filter((t) => t < duration);
  const starts = [0, ...boundaries];
  return starts.map((start, i) => [start, i + 1 < starts.length ? starts[i + 1] : duration]);
}
