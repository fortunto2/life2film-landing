/**
 * Sound in and out of the canvas renderers: one decode of a track to 48 kHz stereo, and one way to
 * hand stereo samples to the encoder. Shared by redraw, ranges and split-screen.
 */
import type { AudioBufferSource, InputAudioTrack } from 'mediabunny';
import { loadMediabunny } from './encode';

export const RATE = 48_000;

/**
 * A track's sound from 0 to `duration`, resampled to 48 kHz stereo, through an optional node chain
 * (`chain` gets the context and returns the node the sources connect to). Null when it cannot decode.
 */
export async function trackStereo(
  track: InputAudioTrack | null,
  duration: number,
  chain?: (ctx: OfflineAudioContext) => AudioNode,
): Promise<[Float32Array, Float32Array] | null> {
  if (!track || !(await track.canDecode().catch(() => false))) return null;
  const { AudioBufferSink } = await loadMediabunny();
  const off = new OfflineAudioContext(2, Math.max(1, Math.round(duration * RATE)), RATE);
  const into = chain ? chain(off) : off.destination;
  let at = 0, any = false;
  for await (const { buffer } of new AudioBufferSink(track).buffers(0, duration)) {
    const s = off.createBufferSource();
    s.buffer = buffer;
    s.connect(into);
    s.start(at);
    at += buffer.duration;
    any = true;
  }
  if (!any) return null;
  const r = await off.startRendering();
  return [r.getChannelData(0), r.getChannelData(1)];
}

/** Give stereo samples to the encoder in one-second AudioBuffers, then close it. */
export async function pushStereo(source: AudioBufferSource, L: Float32Array, R: Float32Array): Promise<void> {
  for (let o = 0; o < L.length; o += RATE) {
    const len = Math.min(RATE, L.length - o);
    const b = new AudioBuffer({ length: len, numberOfChannels: 2, sampleRate: RATE });
    b.getChannelData(0).set(L.subarray(o, o + len));
    b.getChannelData(1).set(R.subarray(o, o + len));
    await source.add(b);
  }
  source.close();
}
