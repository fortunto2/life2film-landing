/**
 * Remove steady background noise (fan, hum, wind, room tone, street) from speech with RNNoise, the
 * recurrent network Xiph trained for voice calls, compiled to WebAssembly. It works on 480-sample
 * frames at 48 kHz in 16-bit scale, so the sound is resampled to 48 kHz, scaled, cleaned frame by
 * frame per channel, and mixed with the original by `strength`. A video gets its cleaned sound put
 * back under the untouched picture.
 */

export interface FrameDenoiser {
  processFrame(frame: Float32Array): number;
}

export const FRAME = 480;
/**
 * RNNoise answers two frames late: measured 960 samples by cross-correlating noisy speech with its
 * output (20 Nov 2026). Mixing without this would comb-filter the voice against itself.
 */
export const LATENCY = 2 * FRAME;

/**
 * Clean one channel. `x` in −1..1 at 48 kHz. Returns the same length, aligned with the input, as
 * `strength` × clean + (1 − strength) × original.
 */
export function denoiseChannel(x: Float32Array, st: FrameDenoiser, strength = 1, latency = LATENCY): Float32Array {
  const frames = Math.ceil((x.length + latency) / FRAME);
  const wet = new Float32Array(frames * FRAME);
  const buf = new Float32Array(FRAME);
  for (let k = 0; k < frames; k++) {
    buf.fill(0);
    const from = k * FRAME;
    for (let i = 0; i < FRAME && from + i < x.length; i++) buf[i] = x[from + i] * 32768;
    st.processFrame(buf);
    for (let i = 0; i < FRAME; i++) wet[from + i] = buf[i] / 32768;
  }
  const out = new Float32Array(x.length);
  for (let i = 0; i < x.length; i++) out[i] = strength * wet[i + latency] + (1 - strength) * x[i];
  return out;
}

export interface DenoiseOptions {
  strength: number;
  format: 'mp3' | 'wav';
  onProgress?: (f: number) => void;
}

/** Clean a recording; returns WAV or MP3 for audio, MP4/WebM for a video. */
export async function denoise(file: File, o: DenoiseOptions): Promise<{ blob: Blob; extension: string; duration: number; voice: number }> {
  const ctx = new AudioContext();
  let raw: AudioBuffer;
  try {
    raw = await ctx.decodeAudioData(await file.arrayBuffer());
  } catch {
    throw new Error('This browser cannot decode the sound of that file. MP3, M4A, WAV, MP4 and MOV usually work.');
  } finally {
    void ctx.close();
  }
  const channels = Math.min(2, raw.numberOfChannels);
  const off = new OfflineAudioContext(channels, Math.max(1, Math.round(raw.duration * 48_000)), 48_000);
  const node = off.createBufferSource();
  node.buffer = raw;
  node.connect(off.destination);
  node.start();
  const at48 = await off.startRendering();
  o.onProgress?.(0.1);

  const { Rnnoise } = await import('@shiguredo/rnnoise-wasm');
  const rn = await Rnnoise.load();
  const clean: Float32Array[] = [];
  let vad = 0;
  let vadN = 0;
  for (let c = 0; c < channels; c++) {
    await new Promise((r) => setTimeout(r, 0));
    const st = rn.createDenoiseState();
    const probe: FrameDenoiser = { processFrame: (f) => { const v = st.processFrame(f); vad += v; vadN++; return v; } };
    clean.push(denoiseChannel(at48.getChannelData(c), probe, o.strength));
    st.destroy();
    o.onProgress?.(0.1 + ((c + 1) / channels) * 0.6);
  }

  const { PieceSink } = await import('./sink');
  const { loadMediabunny } = await import('./encode');
  const { Output, StreamTarget, Mp3OutputFormat, WavOutputFormat, AudioBufferSource } = await loadMediabunny();
  const isVideo = file.type.startsWith('video/') || /\.(mp4|mov|m4v|webm|mkv)$/i.test(file.name);
  const format = isVideo ? 'wav' : o.format;
  if (format === 'mp3') (await import('@mediabunny/mp3-encoder')).registerMp3Encoder();
  const sink = new PieceSink();
  const output = new Output({ format: format === 'mp3' ? new Mp3OutputFormat() : new WavOutputFormat(), target: new StreamTarget(sink.stream(), { chunked: true }) });
  const source = new AudioBufferSource(format === 'mp3' ? { codec: 'mp3', bitrate: 192_000 } : { codec: 'pcm-s16' });
  output.addAudioTrack(source);
  await output.start();
  const n = clean[0].length;
  for (let i = 0; i < n; i += 48_000) {
    const len = Math.min(48_000, n - i);
    const b = new AudioBuffer({ length: len, numberOfChannels: channels, sampleRate: 48_000 });
    for (let c = 0; c < channels; c++) b.getChannelData(c).set(clean[c].subarray(i, i + len));
    await source.add(b);
  }
  source.close();
  await output.finalize();
  const audio = sink.blob(format === 'mp3' ? 'audio/mpeg' : 'audio/wav');
  const voice = vadN ? vad / vadN : 0;
  if (!isVideo) return { blob: audio, extension: format, duration: raw.duration, voice };

  o.onProgress?.(0.75);
  const { addMusic } = await import('./add-music');
  const r = await addMusic(file, new File([audio], 'clean.wav', { type: 'audio/wav' }), {
    musicStart: 0,
    fadeOut: 0,
    onProgress: (f) => o.onProgress?.(0.75 + f * 0.25),
  });
  return { blob: r.blob, extension: r.extension, duration: r.duration, voice };
}
