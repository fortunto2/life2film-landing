import { describe, expect, it } from 'vitest';
import { FRAME, denoiseChannel, type FrameDenoiser } from './denoise';

/** A fake with RNNoise's timing: it returns the frame from two calls ago, scaled by `gain`. */
function delayed(gain: number): FrameDenoiser & { calls: number; maxIn: number } {
  const queue = [new Float32Array(FRAME), new Float32Array(FRAME)];
  const s = {
    calls: 0,
    maxIn: 0,
    processFrame(f: Float32Array) {
      s.calls++;
      for (const v of f) s.maxIn = Math.max(s.maxIn, Math.abs(v));
      const out = queue.shift()!;
      queue.push(f.slice());
      f.set(out.map((v) => v * gain));
      return 0.5;
    },
  };
  return s;
}

const ramp = (n: number) => Float32Array.from({ length: n }, (_, i) => Math.sin(i / 7) * 0.5);

describe('denoiseChannel', () => {
  it('compensates the two-frame latency, so output lines up with input', () => {
    const x = ramp(FRAME * 5 + 123);
    const y = denoiseChannel(x, delayed(1), 1);
    expect(y.length).toBe(x.length);
    for (let i = 0; i < x.length; i += 97) expect(y[i]).toBeCloseTo(x[i], 4);
  });
  it('feeds RNNoise 16-bit scale and processes the tail frame', () => {
    const x = ramp(FRAME * 2 + 10);
    const st = delayed(1);
    denoiseChannel(x, st, 1);
    expect(st.maxIn).toBeGreaterThan(16_000);
    expect(st.calls).toBe(5); // ceil((970 + 960) / 480)
  });
  it('mixes clean and original by strength', () => {
    const x = ramp(FRAME * 4);
    const y = denoiseChannel(x, delayed(0), 0.75); // a «denoiser» that silences everything
    for (let i = 0; i < x.length; i += 53) expect(y[i]).toBeCloseTo(0.25 * x[i], 4);
  });
});
