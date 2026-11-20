/**
 * The video editor's timeline as plain data: an ordered list of shots, each a stretch [start, end)
 * of one clip. Every edit returns a new list; nothing here touches the DOM or a decoder, so the
 * editor's page and its export read the same numbers.
 */
export const MIN_SHOT = 0.3;

export interface TimelineShot {
  /** Stable key for the page (a split gives the right half a new one). */
  id: number;
  /** 0-based index into the clips. */
  clip: number;
  start: number;
  end: number;
}

const len = (s: TimelineShot) => s.end - s.start;
const nextId = (shots: TimelineShot[]) => shots.reduce((m, s) => Math.max(m, s.id), -1) + 1;

/** Append whole clips (their durations, clip indices from `firstClip`) to the end. */
export function addClips(shots: TimelineShot[], durations: number[], firstClip: number): TimelineShot[] {
  let id = nextId(shots);
  return [...shots, ...durations.flatMap((d, i) => (d >= MIN_SHOT ? [{ id: id++, clip: firstClip + i, start: 0, end: d }] : []))];
}

export function totalLength(shots: TimelineShot[]): number {
  return shots.reduce((t, s) => t + len(s), 0);
}

/** Where each shot starts in the film. */
export function offsets(shots: TimelineShot[]): number[] {
  const out: number[] = [];
  let t = 0;
  for (const s of shots) { out.push(t); t += len(s); }
  return out;
}

/** Move the shot at `from` so it sits at index `to` (clamped). */
export function move(shots: TimelineShot[], from: number, to: number): TimelineShot[] {
  if (from < 0 || from >= shots.length) return shots;
  const out = shots.slice();
  const [s] = out.splice(from, 1);
  out.splice(Math.max(0, Math.min(out.length, to)), 0, s);
  return out;
}

/**
 * Set one edge of shot `i` to `t` seconds of its clip, kept inside [0, clipDuration] and at least
 * MIN_SHOT long.
 */
export function trim(shots: TimelineShot[], i: number, edge: 'start' | 'end', t: number, clipDuration: number): TimelineShot[] {
  const s = shots[i];
  if (!s) return shots;
  const next = edge === 'start'
    ? { ...s, start: Math.max(0, Math.min(t, s.end - MIN_SHOT)) }
    : { ...s, end: Math.min(clipDuration, Math.max(t, s.start + MIN_SHOT)) };
  return shots.map((x, k) => (k === i ? next : x));
}

/** Which shot plays at film time `t`, and the moment of its clip. Null past the end or when empty. */
export function locate(shots: TimelineShot[], t: number): { index: number; clipTime: number } | null {
  if (t < 0) return null;
  let at = 0;
  for (const [index, s] of shots.entries()) {
    if (t < at + len(s)) return { index, clipTime: s.start + (t - at) };
    at += len(s);
  }
  return null;
}

/**
 * Cut the shot under film time `t` in two. Nothing happens when either half would be shorter than
 * MIN_SHOT (that includes a cut on a boundary between shots).
 */
export function split(shots: TimelineShot[], t: number): TimelineShot[] {
  const hit = locate(shots, t);
  if (!hit) return shots;
  const s = shots[hit.index];
  if (hit.clipTime - s.start < MIN_SHOT || s.end - hit.clipTime < MIN_SHOT) return shots;
  const out = shots.slice();
  out.splice(hit.index, 1, { ...s, end: hit.clipTime }, { ...s, id: nextId(shots), start: hit.clipTime });
  return out;
}

export function remove(shots: TimelineShot[], i: number): TimelineShot[] {
  return i >= 0 && i < shots.length ? shots.filter((_, k) => k !== i) : shots;
}
