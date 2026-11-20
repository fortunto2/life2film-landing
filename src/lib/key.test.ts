import { describe, expect, it } from 'vitest';
import { camelot, chromagram, detectKey, keyName } from './key';

const RATE = 22050;

/** Sum of sines for the given MIDI notes, `seconds` long. */
function chord(midis: number[], seconds: number): Float32Array {
  const out = new Float32Array(Math.round(seconds * RATE));
  for (const m of midis) {
    const f = 440 * 2 ** ((m - 69) / 12);
    for (let i = 0; i < out.length; i++) out[i] += Math.sin((2 * Math.PI * f * i) / RATE) / midis.length;
  }
  return out;
}

function progression(chords: number[][], each = 2): Float32Array {
  const parts = chords.map((c) => chord(c, each));
  const all = new Float32Array(parts.reduce((s, p) => s + p.length, 0));
  let o = 0;
  for (const p of parts) { all.set(p, o); o += p.length; }
  return all;
}

describe('camelot', () => {
  it('matches the wheel at known points', () => {
    expect(camelot({ tonic: 0, mode: 'major' })).toBe('8B'); // C
    expect(camelot({ tonic: 9, mode: 'minor' })).toBe('8A'); // Am
    expect(camelot({ tonic: 7, mode: 'major' })).toBe('9B'); // G
    expect(camelot({ tonic: 5, mode: 'major' })).toBe('7B'); // F
    expect(camelot({ tonic: 11, mode: 'major' })).toBe('1B'); // B
    expect(camelot({ tonic: 0, mode: 'minor' })).toBe('5A'); // Cm
    expect(camelot({ tonic: 4, mode: 'minor' })).toBe('9A'); // Em
  });
});

describe('detectKey', () => {
  it('hears I–IV–V–I in C as C major', () => {
    // C E G | F A C | G B D | C E G, with the root doubled an octave down.
    const audio = progression([[48, 60, 64, 67], [53, 65, 69, 72], [55, 67, 71, 74], [48, 60, 64, 67]]);
    const k = detectKey(chromagram(audio, RATE)).best;
    expect(keyName(k)).toBe('C major');
  });

  it('hears i–iv–V–i in A minor as A minor', () => {
    // Am | Dm | E (with G♯) | Am
    const audio = progression([[45, 57, 60, 64], [50, 62, 65, 69], [52, 64, 68, 71], [45, 57, 60, 64]]);
    const k = detectKey(chromagram(audio, RATE)).best;
    expect(keyName(k)).toBe('A minor');
  });

  it('follows a transposition: the same progression up a tone is D major', () => {
    const audio = progression([[50, 62, 66, 69], [55, 67, 71, 74], [57, 69, 73, 76], [50, 62, 66, 69]]);
    expect(keyName(detectKey(chromagram(audio, RATE)).best)).toBe('D major');
  });

  it('ignores silence instead of reading it as a key', () => {
    const chroma = chromagram(new Float32Array(RATE * 3), RATE);
    expect(Array.from(chroma).every((v) => v === 0)).toBe(true);
  });
});
