/**
 * Make a video (or audio file) louder or quieter. The picture is copied packet for packet; only the
 * sound is decoded, multiplied, and re-encoded. Above full scale a soft limiter bends the peaks
 * instead of clipping them, so "4x" on a quiet phone clip does not crackle.
 */
import { PieceSink } from './sink';
import { loadMediabunny } from './encode';

/** `auto` raises the loudest peak to just under full scale (at most 8x). */
export type Gain = number | 'auto';

/** Soft knee at 0.8: linear below, tanh-shaped above, never past 1. */
export function limit(x: number): number {
  const a = Math.abs(x);
  if (a <= 0.8) return x;
  return Math.sign(x) * (0.8 + 0.2 * Math.tanh((a - 0.8) / 0.2));
}

export async function changeVolume(
  file: File,
  gain: Gain,
  onProgress?: (fraction: number) => void,
): Promise<{ blob: Blob; ext: string; factor: number }> {
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, WebMOutputFormat, Conversion, AudioSample, AudioBufferSink } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const audio = await input.getPrimaryAudioTrack();
  if (!audio) throw new Error('That file has no sound to make louder.');
  if (!(await audio.canDecode())) throw new Error('This browser cannot decode that sound. Chrome or Edge usually can.');

  let factor = typeof gain === 'number' ? gain : 1;
  if (gain === 'auto') {
    let peak = 0;
    for await (const { buffer } of new AudioBufferSink(audio).buffers()) {
      for (let c = 0; c < buffer.numberOfChannels; c++) {
        const d = buffer.getChannelData(c);
        for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > peak) peak = v; }
      }
    }
    factor = peak > 0 ? Math.min(8, 0.97 / peak) : 1;
    onProgress?.(0.3);
  }

  const webm = /webm$/i.test(file.name) || (await input.getMimeType()).includes('webm');
  const sink = new PieceSink();
  const output = new Output({
    format: webm ? new WebMOutputFormat() : new Mp4OutputFormat(),
    target: new StreamTarget(sink.stream(), { chunked: true }),
  });
  const conversion = await Conversion.init({
    input,
    output,
    audio: {
      process: (sample) => {
        const n = sample.numberOfFrames;
        const ch = sample.numberOfChannels;
        const data = new Float32Array(n * ch);
        for (let c = 0; c < ch; c++) {
          const plane = data.subarray(c * n, (c + 1) * n);
          sample.copyTo(plane, { planeIndex: c, format: 'f32-planar' });
          for (let i = 0; i < n; i++) plane[i] = limit(plane[i] * factor);
        }
        return new AudioSample({ data, format: 'f32-planar', numberOfChannels: ch, sampleRate: sample.sampleRate, timestamp: sample.timestamp });
      },
    },
  });
  if (!conversion.isValid) throw new Error('This file cannot be rewritten in this browser.');
  const base = gain === 'auto' ? 0.3 : 0;
  conversion.onProgress = (p) => onProgress?.(base + p * (1 - base));
  await conversion.execute();
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob(webm ? 'video/webm' : 'video/mp4'), ext: webm ? 'webm' : 'mp4', factor };
}
