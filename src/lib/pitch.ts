/**
 * Change a song's key without changing its tempo: stretch the sound in time by the pitch ratio with
 * WSOLA (overlap-add of windowed grains, each placed where it best matches what is already written,
 * so the waveform stays continuous), then resample back to the original length. Pure functions on
 * Float32Array, so the arithmetic is tested without a browser.
 */

/** Semitones to a frequency ratio: +12 is 2, −12 is 0.5. */
export const ratioOf = (semitones: number) => 2 ** (semitones / 12);

/**
 * Time-stretch `x` so the result is `factor` times as long, at the same pitch.
 * `win` is the grain length in samples (~50 ms), `seek` how far a grain may slide to match.
 */
export function wsola(x: Float32Array, factor: number, win = 2048, seek = 512): Float32Array {
  const hopOut = win / 2;
  const hopIn = hopOut / factor;
  const outLen = Math.round(x.length * factor);
  const y = new Float32Array(outLen + win);
  const norm = new Float32Array(outLen + win);
  const w = new Float32Array(win);
  for (let i = 0; i < win; i++) w[i] = 0.5 - 0.5 * Math.cos((2 * Math.PI * i) / win);
  let prev = 0;
  for (let k = 0, out = 0; out < outLen; k++, out += hopOut) {
    const nominal = Math.round(k * hopIn);
    let best = nominal;
    if (k > 0) {
      // The grain that continues the previous one most smoothly: its natural follower is prev + hopOut.
      const target = prev + hopOut;
      let bestScore = -Infinity;
      const len = Math.min(win / 2, 512);
      for (let d = -seek; d <= seek; d += 4) {
        const s = nominal + d;
        if (s < 0 || s + win > x.length || target + len > x.length) continue;
        let score = 0;
        for (let i = 0; i < len; i += 2) score += x[s + i] * x[target + i];
        if (score > bestScore) { bestScore = score; best = s; }
      }
    }
    best = Math.max(0, Math.min(best, x.length - 1));
    for (let i = 0; i < win && best + i < x.length; i++) {
      y[out + i] += x[best + i] * w[i];
      norm[out + i] += w[i];
    }
    prev = best;
  }
  for (let i = 0; i < outLen; i++) if (norm[i] > 1e-3) y[i] /= norm[i];
  return y.subarray(0, outLen);
}

/** Linear resampling to `length` samples. */
export function resample(x: Float32Array, length: number): Float32Array {
  const y = new Float32Array(length);
  const step = (x.length - 1) / Math.max(1, length - 1);
  for (let i = 0; i < length; i++) {
    const p = i * step;
    const j = Math.floor(p);
    const f = p - j;
    y[i] = x[j] * (1 - f) + (x[Math.min(j + 1, x.length - 1)] ?? 0) * f;
  }
  return y;
}

/** Shift pitch by `semitones`, same length. */
export function shiftPitch(x: Float32Array, semitones: number): Float32Array {
  if (semitones === 0) return x.slice();
  const r = ratioOf(semitones);
  return resample(wsola(x, r), x.length);
}

/** Decode a song, shift every channel, encode MP3 or WAV. Browser only. */
export async function changeKey(file: File, semitones: number, format: 'mp3' | 'wav', onProgress?: (f: number) => void): Promise<{ blob: Blob; duration: number }> {
  const { PieceSink } = await import('./sink');
  const { loadMediabunny } = await import('./encode');
  const { Output, StreamTarget, Mp3OutputFormat, WavOutputFormat, AudioBufferSource } = await loadMediabunny();
  if (format === 'mp3') (await import('@mediabunny/mp3-encoder')).registerMp3Encoder();
  const ctx = new AudioContext();
  let raw: AudioBuffer;
  try {
    raw = await ctx.decodeAudioData(await file.arrayBuffer());
  } catch {
    throw new Error('This browser cannot decode that file. MP3, M4A, WAV and most videos work.');
  } finally {
    void ctx.close();
  }
  const channels = Math.min(2, raw.numberOfChannels);
  const out: Float32Array[] = [];
  for (let c = 0; c < channels; c++) {
    await new Promise((r) => setTimeout(r, 0)); // let the progress bar paint between channels
    out.push(shiftPitch(raw.getChannelData(c), semitones));
    onProgress?.(((c + 1) / channels) * 0.8);
  }
  const sink = new PieceSink();
  const output = new Output({ format: format === 'mp3' ? new Mp3OutputFormat() : new WavOutputFormat(), target: new StreamTarget(sink.stream(), { chunked: true }) });
  const source = new AudioBufferSource(format === 'mp3' ? { codec: 'mp3', bitrate: 192_000 } : { codec: 'pcm-s16' });
  output.addAudioTrack(source);
  await output.start();
  const sr = raw.sampleRate;
  for (let off = 0; off < raw.length; off += sr) {
    const n = Math.min(sr, raw.length - off);
    const b = new AudioBuffer({ length: n, numberOfChannels: channels, sampleRate: sr });
    for (let c = 0; c < channels; c++) b.getChannelData(c).set(out[c].subarray(off, off + n));
    await source.add(b);
    onProgress?.(0.8 + (0.2 * off) / raw.length);
  }
  source.close();
  await output.finalize();
  return { blob: sink.blob(format === 'mp3' ? 'audio/mpeg' : 'audio/wav'), duration: raw.duration };
}
