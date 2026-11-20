/** Make a recording as loud as it can be without clipping, or bring it to a common loudness. */
import { loadMediabunny } from './encode';
import { cutAudio } from './audio-cut';

export type NormalizeMode = 'peak' | 'loud';
const PEAK_CEILING = 10 ** (-1 / 20); // -1 dBFS
const LOUD_TARGET = 10 ** (-16 / 20); // -16 dBFS RMS, roughly where podcasts and voice notes sit

/**
 * Gain for a signal with this peak and RMS (both linear). 'peak' lifts the peak to -1 dBFS; 'loud'
 * aims the RMS at -16 dBFS but never past the peak ceiling, so nothing clips.
 */
export function normalizeGain(peak: number, rms: number, mode: NormalizeMode): number {
  if (!(peak > 0)) return 1;
  const ceiling = PEAK_CEILING / peak;
  if (mode === 'peak') return ceiling;
  return rms > 0 ? Math.min(LOUD_TARGET / rms, ceiling) : ceiling;
}

export const toDb = (x: number) => 20 * Math.log10(x);

export async function measure(file: File): Promise<{ peak: number; rms: number; duration: number }> {
  const { Input, BlobSource, ALL_FORMATS, AudioBufferSink } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const track = await input.getPrimaryAudioTrack();
  if (!track) throw new Error('That file has no sound.');
  if (!(await track.canDecode())) throw new Error('This browser cannot decode that audio. Try MP3, M4A or WAV.');
  let peak = 0, sum = 0, n = 0;
  for await (const { buffer } of new AudioBufferSink(track).buffers()) {
    for (let c = 0; c < buffer.numberOfChannels; c++) {
      const d = buffer.getChannelData(c);
      for (let i = 0; i < d.length; i++) { const v = Math.abs(d[i]); if (v > peak) peak = v; sum += v * v; }
      n += d.length;
    }
  }
  return { peak, rms: n ? Math.sqrt(sum / n) : 0, duration: await input.computeDuration() };
}

export async function normalize(file: File, mode: NormalizeMode, format: 'mp3' | 'wav', onProgress?: (f: number) => void) {
  const m = await measure(file);
  const gain = normalizeGain(m.peak, m.rms, mode);
  const out = await cutAudio(file, { start: 0, end: m.duration, fade: 0, format, gain, onProgress });
  return { ...out, gainDb: toDb(gain), before: m };
}
