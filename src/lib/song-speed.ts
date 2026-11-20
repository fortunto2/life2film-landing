/**
 * Speed a song up or slow it down. Two ways, as people mean them: «sped up / slowed» on TikTok is a
 * plain resample (tempo and pitch move together, like a turntable), «keep pitch» is a time-stretch
 * (WSOLA) at the same pitch. Optional reverb for the «slowed + reverb» sound: a generated decaying
 * noise impulse through a ConvolverNode, mixed under the dry signal.
 */
import { resample, wsola } from './pitch';

export type SpeedMode = 'turntable' | 'keep-pitch';

/** The new channel data for `speed` (1.25 = 25% faster), in either mode. */
export function changeSpeed(x: Float32Array, speed: number, mode: SpeedMode): Float32Array {
  if (speed === 1) return x.slice();
  const length = Math.max(1, Math.round(x.length / speed));
  return mode === 'turntable' ? resample(x, length) : wsola(x, 1 / speed);
}

/** A stereo impulse response: exponentially decaying noise, `seconds` long. Deterministic seed. */
export function impulse(sampleRate: number, seconds: number, channels = 2): Float32Array[] {
  const n = Math.round(sampleRate * seconds);
  let seed = 12345;
  const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 2 ** 32) * 2 - 1;
  return Array.from({ length: channels }, () => Float32Array.from({ length: n }, (_, i) => rnd() * Math.pow(1 - i / n, 3)));
}

export interface SongSpeedOptions {
  speed: number;
  mode: SpeedMode;
  /** 0 = dry, up to 0.6 wet. */
  reverb: number;
  format: 'mp3' | 'wav';
  onProgress?: (f: number) => void;
}

export async function songSpeed(file: File, o: SongSpeedOptions): Promise<{ blob: Blob; duration: number }> {
  const { PieceSink } = await import('./sink');
  const { loadMediabunny } = await import('./encode');
  const { Output, StreamTarget, Mp3OutputFormat, WavOutputFormat, AudioBufferSource } = await loadMediabunny();
  if (o.format === 'mp3') (await import('@mediabunny/mp3-encoder')).registerMp3Encoder();
  const ctx = new AudioContext();
  let raw: AudioBuffer;
  try {
    raw = await ctx.decodeAudioData(await file.arrayBuffer());
  } catch {
    throw new Error('This browser cannot decode that file. MP3, M4A, WAV and most videos work.');
  } finally {
    void ctx.close();
  }
  const sr = raw.sampleRate;
  const channels = Math.min(2, raw.numberOfChannels);
  const moved: Float32Array[] = [];
  for (let c = 0; c < channels; c++) {
    await new Promise((r) => setTimeout(r, 0));
    moved.push(changeSpeed(raw.getChannelData(c), o.speed, o.mode));
    o.onProgress?.(((c + 1) / channels) * 0.6);
  }
  const length = moved[0].length;
  let data = moved;
  if (o.reverb > 0) {
    const tail = Math.round(sr * 2.5);
    const off = new OfflineAudioContext(2, length + tail, sr);
    const src = off.createBufferSource();
    const b = off.createBuffer(2, length, sr);
    for (let c = 0; c < 2; c++) b.getChannelData(c).set(moved[Math.min(c, channels - 1)]);
    src.buffer = b;
    const conv = off.createConvolver();
    const ir = off.createBuffer(2, Math.round(sr * 2.5), sr);
    impulse(sr, 2.5).forEach((ch, c) => ir.getChannelData(c).set(ch));
    conv.buffer = ir;
    const wet = off.createGain();
    wet.gain.value = o.reverb;
    const dry = off.createGain();
    dry.gain.value = 1 - o.reverb * 0.5;
    src.connect(dry).connect(off.destination);
    src.connect(conv).connect(wet).connect(off.destination);
    src.start();
    const r = await off.startRendering();
    data = [r.getChannelData(0), r.getChannelData(1)];
    // keep the peak under full scale: reverb adds energy
    let peak = 0;
    for (const ch of data) for (let i = 0; i < ch.length; i += 7) peak = Math.max(peak, Math.abs(ch[i]));
    if (peak > 0.98) for (const ch of data) for (let i = 0; i < ch.length; i++) ch[i] *= 0.98 / peak;
  }
  o.onProgress?.(0.75);
  const outCh = data.length;
  const total = data[0].length;
  const sink = new PieceSink();
  const output = new Output({ format: o.format === 'mp3' ? new Mp3OutputFormat() : new WavOutputFormat(), target: new StreamTarget(sink.stream(), { chunked: true }) });
  const source = new AudioBufferSource(o.format === 'mp3' ? { codec: 'mp3', bitrate: 192_000 } : { codec: 'pcm-s16' });
  output.addAudioTrack(source);
  await output.start();
  for (let i = 0; i < total; i += sr) {
    const n = Math.min(sr, total - i);
    const b = new AudioBuffer({ length: n, numberOfChannels: outCh, sampleRate: sr });
    for (let c = 0; c < outCh; c++) b.getChannelData(c).set(data[c].subarray(i, i + n));
    await source.add(b);
    o.onProgress?.(0.75 + (0.25 * i) / total);
  }
  source.close();
  await output.finalize();
  return { blob: sink.blob(o.format === 'mp3' ? 'audio/mpeg' : 'audio/wav'), duration: total / sr };
}
