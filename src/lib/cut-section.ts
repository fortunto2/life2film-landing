/** Remove one section from the middle of a video: the part before and the part after are joined. */
import { renderRanges } from './silence';

/** «75», «1:15», «1:15.5», «0:01:15» → seconds; null when it is not a time. */
export function parseClock(s: string): number | null {
  const t = s.trim().replace(',', '.');
  if (!/^\d+(:\d{1,2}){0,2}(\.\d+)?$/.test(t)) return null;
  return t.split(':').reduce((acc, part) => acc * 60 + Number(part), 0);
}

/** The ranges that remain when [from, to] is taken out of a clip of `duration`. */
export function withoutSection(duration: number, from: number, to: number): [number, number][] {
  const a = Math.max(0, Math.min(from, to)), b = Math.min(duration, Math.max(from, to));
  return ([[0, a], [b, duration]] as [number, number][]).filter(([x, y]) => y - x > 0.01);
}

export function cutSection(file: File, from: number, to: number, duration: number, onProgress?: (f: number) => void) {
  return renderRanges(file, withoutSection(duration, from, to), onProgress);
}
