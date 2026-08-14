/**
 * Turning a shot list into clips worth posting.
 *
 * Every other splitter cuts every N seconds, which lands the cut wherever it lands — mid-sentence,
 * mid-gesture, mid-shot. The engine already knows where the picture changes, so the cuts can go
 * where the video itself changes and each clip can start on a new shot.
 */

export interface Shot {
  start: number;
  end: number;
  /** Median per-frame quality of the shot, from the engine's scorer. */
  score: number;
}

export interface Clip {
  start: number;
  end: number;
  /** How many shots ended up in this clip. */
  shots: number;
  /** Duration-weighted mean of the shot scores — what the ranking uses. */
  score: number;
}

export interface ClipOptions {
  /** What a clip should be close to, in seconds. */
  target: number;
  /**
   * How far past `target` a clip may run to avoid orphaning a short shot.
   * A clip that would leave a four-second tail is better off absorbing it.
   */
  tolerance?: number;
  /** Anything shorter than this is not worth posting on its own. */
  minimum?: number;
}

const duration = (shot: Shot) => shot.end - shot.start;

/**
 * Group shots into clips of roughly `target` seconds, never cutting inside a shot.
 *
 * Shots are taken in order and accumulated until adding the next one would overshoot the target by
 * more than the tolerance. A shot longer than the target on its own becomes its own clip — cutting
 * it would defeat the point, and a single long take is usually the good part anyway.
 */
export function groupIntoClips(shots: Shot[], options: ClipOptions): Clip[] {
  const { target, tolerance = target * 0.4, minimum = Math.min(3, target / 2) } = options;
  if (!shots.length) return [];

  const clips: Clip[] = [];
  let batch: Shot[] = [];

  const flush = () => {
    if (!batch.length) return;
    const start = batch[0].start;
    const end = batch[batch.length - 1].end;
    const span = end - start;

    clips.push({
      start,
      end,
      shots: batch.length,
      // Weighted by duration: a five-second shot should count for more than a half-second one.
      score: span > 0 ? batch.reduce((sum, s) => sum + s.score * duration(s), 0) / span : 0,
    });
    batch = [];
  };

  for (const shot of shots) {
    const current = batch.length ? batch[batch.length - 1].end - batch[0].start : 0;

    // Adding this shot would overshoot — close the clip first, unless it is still too short to post.
    if (batch.length && current + duration(shot) > target + tolerance && current >= minimum) {
      flush();
    }

    batch.push(shot);

    // Long enough on its own: a shot at or past the target does not need company.
    if (batch[batch.length - 1].end - batch[0].start >= target) {
      flush();
    }
  }

  flush();

  // A final scrap too short to stand alone belongs to the clip before it.
  if (clips.length > 1) {
    const last = clips[clips.length - 1];
    if (last.end - last.start < minimum) {
      const previous = clips[clips.length - 2];
      const span = last.end - previous.start;
      clips[clips.length - 2] = {
        start: previous.start,
        end: last.end,
        shots: previous.shots + last.shots,
        score:
          (previous.score * (previous.end - previous.start) + last.score * (last.end - last.start)) /
          (span || 1),
      };
      clips.pop();
    }
  }

  return clips;
}

/** Indices of the clips ordered best-first, without disturbing timeline order in the UI. */
export function rankByScore(clips: Clip[]): number[] {
  return clips
    .map((clip, index) => ({ index, score: clip.score }))
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.index);
}

/** Stars out of five, relative to the best clip in this video rather than an absolute scale. */
export function stars(clip: Clip, best: number): number {
  if (best <= 0) return 3;
  return Math.max(1, Math.min(5, Math.round((clip.score / best) * 5)));
}
