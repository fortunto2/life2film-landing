/**
 * Musical key of a track: a chromagram (energy per pitch class, 55–2000 Hz) from FFT frames, each
 * frame normalised so loud passages do not outvote quiet ones, then correlated with the
 * Albrecht–Shanahan major and minor profiles in all 12 rotations. The best of 24 is the answer; the
 * gap to the runner-up is the confidence. Against djay Pro on 120 real tracks: 63% exact, 81% when
 * the runner-up counts; misses split between a fifth away and the parallel major/minor.
 */

export const NOTE_NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'] as const;

// Albrecht & Shanahan (2013) corpus profiles. Measured 20 Nov 2026 against djay Pro's keys on 120
// tracks from the founder's library (scripts/key-eval.ts, key_eval_score.py), split in two halves:
// exact agreement A/B — Krumhansl–Kessler 37/33, Temperley 36/29, Sha'ath 40/33, Albrecht–Shanahan
// 39/37, the only one ahead of KK on both halves. Overall 76/120 exact, 97/120 within the two shown.
const MAJOR = [0.238, 0.006, 0.111, 0.006, 0.137, 0.094, 0.016, 0.214, 0.009, 0.08, 0.008, 0.081];
const MINOR = [0.22, 0.006, 0.104, 0.123, 0.019, 0.103, 0.012, 0.214, 0.062, 0.022, 0.061, 0.052];

export interface KeyGuess {
  tonic: number; // pitch class, 0 = C
  mode: 'major' | 'minor';
  score: number; // Pearson correlation with the rotated profile
}

export interface KeyResult {
  best: KeyGuess;
  runnerUp: KeyGuess;
  /** best.score − runnerUp.score: below ~0.05 the two are a coin toss. */
  margin: number;
}

function pearson(a: ArrayLike<number>, b: ArrayLike<number>): number {
  const n = a.length;
  let ma = 0;
  let mb = 0;
  for (let i = 0; i < n; i++) { ma += a[i]; mb += b[i]; }
  ma /= n;
  mb /= n;
  let num = 0;
  let da = 0;
  let db = 0;
  for (let i = 0; i < n; i++) {
    const x = a[i] - ma;
    const y = b[i] - mb;
    num += x * y;
    da += x * x;
    db += y * y;
  }
  return da && db ? num / Math.sqrt(da * db) : 0;
}

/** All 24 keys, best first. */
export function rankKeys(chroma: ArrayLike<number>): KeyGuess[] {
  const out: KeyGuess[] = [];
  for (let tonic = 0; tonic < 12; tonic++) {
    // Rotate the chroma so the candidate tonic sits at index 0, then compare with the C profiles.
    const rotated = Array.from({ length: 12 }, (_, i) => chroma[(i + tonic) % 12]);
    out.push({ tonic, mode: 'major', score: pearson(rotated, MAJOR) });
    out.push({ tonic, mode: 'minor', score: pearson(rotated, MINOR) });
  }
  return out.sort((x, y) => y.score - x.score);
}

export function detectKey(chroma: ArrayLike<number>): KeyResult {
  const [best, runnerUp] = rankKeys(chroma);
  return { best, runnerUp, margin: best.score - runnerUp.score };
}

/** Camelot wheel code (8B = C major, 8A = A minor), the notation DJ software uses. */
export function camelot(k: { tonic: number; mode: 'major' | 'minor' }): string {
  const major = k.mode === 'major' ? k.tonic : (k.tonic + 3) % 12;
  return `${((major * 7 + 7) % 12) + 1}${k.mode === 'major' ? 'B' : 'A'}`;
}

export function keyName(k: { tonic: number; mode: 'major' | 'minor' }): string {
  return `${NOTE_NAMES[k.tonic]} ${k.mode}`;
}

/** In-place iterative radix-2 FFT; `re.length` must be a power of two. */
function fft(re: Float64Array, im: Float64Array) {
  const n = re.length;
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = (-2 * Math.PI) / len;
    const wr = Math.cos(ang);
    const wi = Math.sin(ang);
    for (let i = 0; i < n; i += len) {
      let cr = 1;
      let ci = 0;
      for (let k = 0; k < len / 2; k++) {
        const a = i + k;
        const b = a + len / 2;
        const tr = re[b] * cr - im[b] * ci;
        const ti = re[b] * ci + im[b] * cr;
        re[b] = re[a] - tr;
        im[b] = im[a] - ti;
        re[a] += tr;
        im[a] += ti;
        const nr = cr * wr - ci * wi;
        ci = cr * wi + ci * wr;
        cr = nr;
      }
    }
  }
}

/** Chromagram of mono samples: per-frame normalised pitch-class energy, summed. */
export function chromagram(samples: Float32Array, rate: number, size = 16384, hop = 8192): Float64Array {
  const chroma = new Float64Array(12);
  const window = new Float64Array(size);
  for (let i = 0; i < size; i++) window[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (size - 1));
  // Pitch class of every bin in range, computed once.
  const lo = Math.ceil((55 * size) / rate);
  const hi = Math.min(size / 2 - 1, Math.floor((2000 * size) / rate));
  const pc = new Int8Array(hi + 1);
  for (let k = lo; k <= hi; k++) {
    const midi = 69 + 12 * Math.log2((k * rate) / size / 440);
    pc[k] = ((Math.round(midi) % 12) + 12) % 12;
  }
  const re = new Float64Array(size);
  const im = new Float64Array(size);
  const frame = new Float64Array(12);
  for (let start = 0; start + size <= samples.length; start += hop) {
    for (let i = 0; i < size; i++) { re[i] = samples[start + i] * window[i]; im[i] = 0; }
    fft(re, im);
    frame.fill(0);
    for (let k = lo; k <= hi; k++) frame[pc[k]] += Math.hypot(re[k], im[k]);
    let max = 0;
    for (let c = 0; c < 12; c++) if (frame[c] > max) max = frame[c];
    if (max < 1e-6) continue; // silence says nothing about the key
    for (let c = 0; c < 12; c++) chroma[c] += frame[c] / max;
  }
  return chroma;
}
