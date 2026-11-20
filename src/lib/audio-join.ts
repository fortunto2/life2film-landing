/**
 * Join several audio files into one MP3 or WAV, in the order given, optionally with a short
 * crossfade between neighbours. Every file is decoded and resampled to the first file's rate in
 * stereo, so mixed sources (a 48 kHz voice memo and a 44.1 kHz song) line up.
 */
import { PieceSink } from './sink';
import { loadMediabunny } from './encode';

export interface JoinOptions {
  /** Seconds of crossfade at each join; 0 butts the files together. */
  crossfade: number;
  format: 'mp3' | 'wav';
  onProgress?: (fraction: number) => void;
}

/** Decode a whole file to stereo at `rate` (null rate = keep the file's own). */
async function decode(file: File, rate: number | null): Promise<AudioBuffer> {
  const ctx = new AudioContext();
  try {
    const raw = await ctx.decodeAudioData(await file.arrayBuffer());
    const target = rate ?? raw.sampleRate;
    const off = new OfflineAudioContext(2, Math.max(1, Math.round(raw.duration * target)), target);
    const node = off.createBufferSource();
    node.buffer = raw;
    node.connect(off.destination);
    node.start();
    return await off.startRendering();
  } catch {
    throw new Error(`${file.name}: this browser cannot decode it. Try MP3, M4A or WAV.`);
  } finally {
    void ctx.close();
  }
}

/** Overlap `a`'s tail with `b`'s head over `n` samples with equal-power curves; returns the joined channel. */
export function crossfadeJoin(a: Float32Array, b: Float32Array, n: number): Float32Array {
  const k = Math.max(0, Math.min(n, a.length, b.length));
  const out = new Float32Array(a.length + b.length - k);
  out.set(a.subarray(0, a.length - k));
  for (let i = 0; i < k; i++) {
    const t = (i + 0.5) / k;
    out[a.length - k + i] = a[a.length - k + i] * Math.cos((t * Math.PI) / 2) + b[i] * Math.sin((t * Math.PI) / 2);
  }
  out.set(b.subarray(k), a.length);
  return out;
}

export async function joinAudio(files: File[], o: JoinOptions): Promise<{ blob: Blob; duration: number }> {
  if (files.length < 2) throw new Error('Add at least two files.');
  const { Output, StreamTarget, Mp3OutputFormat, WavOutputFormat, AudioBufferSource } = await loadMediabunny();
  if (o.format === 'mp3') {
    const { registerMp3Encoder } = await import('@mediabunny/mp3-encoder');
    registerMp3Encoder();
  }

  const first = await decode(files[0], null);
  const rate = first.sampleRate;
  let L: Float32Array = first.getChannelData(0).slice();
  let R: Float32Array = first.getChannelData(1).slice();
  o.onProgress?.(1 / (files.length + 1));
  for (let i = 1; i < files.length; i++) {
    const next = await decode(files[i], rate);
    const n = Math.round(o.crossfade * rate);
    L = crossfadeJoin(L, next.getChannelData(0), n);
    R = crossfadeJoin(R, next.getChannelData(1), n);
    o.onProgress?.((i + 1) / (files.length + 1));
  }

  const sink = new PieceSink();
  const output = new Output({
    format: o.format === 'mp3' ? new Mp3OutputFormat() : new WavOutputFormat(),
    target: new StreamTarget(sink.stream(), { chunked: true }),
  });
  const source = new AudioBufferSource(o.format === 'mp3' ? { codec: 'mp3', bitrate: 192_000 } : { codec: 'pcm-s16' });
  output.addAudioTrack(source);
  await output.start();
  for (let off = 0; off < L.length; off += rate) {
    const n = Math.min(rate, L.length - off);
    const b = new AudioBuffer({ length: n, numberOfChannels: 2, sampleRate: rate });
    b.getChannelData(0).set(L.subarray(off, off + n));
    b.getChannelData(1).set(R.subarray(off, off + n));
    await source.add(b);
  }
  source.close();
  await output.finalize();
  o.onProgress?.(1);
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob(o.format === 'mp3' ? 'audio/mpeg' : 'audio/wav'), duration: L.length / rate };
}
