/**
 * Sound in and out of the canvas renderers: one decode of a track to 48 kHz stereo, and one way to
 * hand stereo samples to the encoder. Shared by redraw, ranges and split-screen.
 */
import type { AudioBufferSource, InputAudioTrack } from 'mediabunny';
import { loadMediabunny } from './encode';

export const RATE = 48_000;

/**
 * Where a decoded buffer that starts at `timestamp` (seconds of the track) goes when the render
 * starts at `from`: `when` into the render, skipping `offset` of the buffer's own head.
 */
export function placeBuffer(timestamp: number, from: number): { when: number; offset: number } {
  return timestamp >= from ? { when: timestamp - from, offset: 0 } : { when: 0, offset: from - timestamp };
}

/**
 * A track's sound from `from` (default 0) for `duration`, resampled to 48 kHz stereo, through an optional node chain
 * (`chain` gets the context and returns the node the sources connect to). Null when it cannot decode.
 */
export async function trackStereo(
  track: InputAudioTrack | null,
  duration: number,
  chain?: (ctx: OfflineAudioContext) => AudioNode,
  from = 0,
): Promise<[Float32Array, Float32Array] | null> {
  if (!track || !(await track.canDecode().catch(() => false))) return null;
  const { AudioBufferSink } = await loadMediabunny();
  const off = new OfflineAudioContext(2, Math.max(1, Math.round(duration * RATE)), RATE);
  const into = chain ? chain(off) : off.destination;
  let at = 0, any = false;
  for await (const { buffer, timestamp } of new AudioBufferSink(track).buffers(from, from + duration)) {
    const s = off.createBufferSource();
    s.buffer = buffer;
    s.connect(into);
    // From 0, buffers are laid end to end (as every renderer here always did); from a later point,
    // by their timestamps, since the first one decoded usually starts before `from`.
    if (from > 0) {
      const p = placeBuffer(timestamp, from);
      if (p.offset < buffer.duration) s.start(p.when, p.offset);
    } else s.start(at);
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
