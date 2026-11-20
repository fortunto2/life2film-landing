/**
 * Tempo from taps: the median gap between the last taps (robust to one late or early tap), a pause
 * longer than `reset` seconds starts over. Pure; the page feeds it performance.now() seconds.
 */
export function tapBpm(times: number[], reset = 2, window = 12): number | null {
  let start = 0;
  for (let i = 1; i < times.length; i++) if (times[i] - times[i - 1] > reset) start = i;
  const run = times.slice(Math.max(start, times.length - window));
  if (run.length < 3) return null;
  const gaps = run.slice(1).map((t, i) => t - run[i]).sort((a, b) => a - b);
  const mid = gaps.length >> 1;
  const gap = gaps.length % 2 ? gaps[mid] : (gaps[mid - 1] + gaps[mid]) / 2;
  return gap > 0 ? 60 / gap : null;
}
