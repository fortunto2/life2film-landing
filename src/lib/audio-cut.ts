/**
 * Cut a stretch out of a song (or a video's sound) and save it as MP3 or WAV, with an optional short
 * fade at both ends so the cut does not click. Decoded and encoded in the browser.
 */
import { PieceSink } from './sink';
import { loadMediabunny } from './encode';

export interface CutOptions {
  start: number;
  end: number;
  /** Seconds of fade at each end; 0 for a hard cut. */
  fade: number;
  format: 'mp3' | 'wav';
  /** Linear gain applied to every sample, clamped to ±1 (used by normalize). */
  gain?: number;
  onProgress?: (fraction: number) => void;
}

export async function cutAudio(file: File, o: CutOptions): Promise<{ blob: Blob; duration: number }> {
  const mb = await loadMediabunny();
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp3OutputFormat, WavOutputFormat, AudioBufferSink, AudioBufferSource } = mb;
  if (o.format === 'mp3') {
    const { registerMp3Encoder } = await import('@mediabunny/mp3-encoder');
    registerMp3Encoder();
  }

  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const track = await input.getPrimaryAudioTrack();
  if (!track) throw new Error('That file has no sound.');
  if (!(await track.canDecode())) throw new Error('This browser cannot decode that audio. Try MP3, M4A or WAV.');
  const total = await input.computeDuration();
  const start = Math.max(0, Math.min(o.start, total));
  const end = Math.min(o.end, total);
  const length = end - start;
  if (length <= 0) throw new Error('The cut is outside the file.');

  const sink = new PieceSink();
  const format = o.format === 'mp3' ? new Mp3OutputFormat() : new WavOutputFormat();
  const output = new Output({ format, target: new StreamTarget(sink.stream(), { chunked: true }) });
  const source = new AudioBufferSource(o.format === 'mp3' ? { codec: 'mp3', bitrate: 192_000 } : { codec: 'pcm-s16' });
  output.addAudioTrack(source);
  await output.start();

  for await (const { buffer, timestamp } of new AudioBufferSink(track).buffers(start, end)) {
    // Keep only the part of this buffer that lies inside [start, end).
    const rate = buffer.sampleRate;
    const from = Math.max(0, Math.round((start - timestamp) * rate));
    const to = Math.min(buffer.length, Math.round((end - timestamp) * rate));
    if (to <= from) continue;
    const out = new AudioBuffer({ length: to - from, numberOfChannels: buffer.numberOfChannels, sampleRate: rate });
    const t0 = timestamp + from / rate - start;
    for (let c = 0; c < buffer.numberOfChannels; c++) {
      const d = out.getChannelData(c);
      d.set(buffer.getChannelData(c).subarray(from, to));
      if (o.gain !== undefined && o.gain !== 1) for (let i = 0; i < d.length; i++) d[i] = Math.max(-1, Math.min(1, d[i] * o.gain));
      if (o.fade > 0) {
        for (let i = 0; i < d.length; i++) {
          const t = t0 + i / rate;
          const g = Math.min(1, t / o.fade, (length - t) / o.fade);
          if (g < 1) d[i] *= Math.max(0, g);
        }
      }
    }
    await source.add(out);
    o.onProgress?.(Math.min(0.99, (t0 + out.duration) / length));
  }
  source.close();
  await output.finalize();
  o.onProgress?.(1);
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob(o.format === 'mp3' ? 'audio/mpeg' : 'audio/wav'), duration: length };
}
