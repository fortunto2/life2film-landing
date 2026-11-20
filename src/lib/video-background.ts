/**
 * Remove or replace the background of a video in the browser: MediaPipe's selfie segmenter (250 KB,
 * served from /models/) finds the person on a 256 px copy of each frame; the mask is smoothed over
 * time, scaled up, and the person is drawn over a blurred copy, a colour or a picture. Nothing is
 * uploaded. The WASM runtime is copied from node_modules into /mediapipe/ by `npm run vendor`.
 */
import type { ImageSegmenter } from '@mediapipe/tasks-vision';
import { FPS, canvasMp4, openVideo } from './canvas-out';
import { pushStereo, trackStereo } from './audio-io';
import { loadMediabunny } from './encode';
import { cover } from './blur-fill';

export type Backdrop = { kind: 'blur'; radius: number } | { kind: 'color'; color: string } | { kind: 'image'; image: ImageBitmap };

/** Longest output side and longest clip: segmentation runs per frame, so a long 4K file would take an hour. */
export const MAX_SIDE = 1280;
export const MAX_SECONDS = 120;
const MASK = 256;

let segmenter: Promise<ImageSegmenter> | null = null;
function loadSegmenter(): Promise<ImageSegmenter> {
  segmenter ??= (async () => {
    const { FilesetResolver, ImageSegmenter } = await import('@mediapipe/tasks-vision');
    const files = await FilesetResolver.forVisionTasks('/mediapipe');
    return ImageSegmenter.createFromOptions(files, {
      baseOptions: { modelAssetPath: '/models/selfie_segmenter.tflite', delegate: 'CPU' },
      runningMode: 'VIDEO',
      outputConfidenceMasks: true,
      outputCategoryMask: false,
    });
  })().catch((e: unknown) => { segmenter = null; throw e; });
  return segmenter;
}

/**
 * Person confidence (0..1) into mask alpha, in place in `out` (RGBA, alpha channel only).
 * `prev` holds the last frame's smoothed confidence and is updated: `keep` of it is kept, so a
 * flickering edge settles instead of shimmering. Below `lo` is background, above `hi` is person,
 * between is a soft edge.
 */
export function maskAlpha(conf: Float32Array, prev: Float32Array, out: Uint8ClampedArray, keep = 0.4, lo = 0.3, hi = 0.7): void {
  for (let i = 0; i < conf.length; i++) {
    const c = prev[i] * keep + conf[i] * (1 - keep);
    prev[i] = c;
    const a = c <= lo ? 0 : c >= hi ? 1 : (c - lo) / (hi - lo);
    out[i * 4 + 3] = Math.round(a * 255);
  }
}

/** Output size: the source's, long side capped at MAX_SIDE, even numbers. */
export function outputSize(w: number, h: number): [number, number] {
  const s = Math.min(1, MAX_SIDE / Math.max(w, h));
  const even = (x: number) => Math.max(2, Math.round((x * s) / 2) * 2);
  return [even(w), even(h)];
}

export async function replaceBackground(file: File, backdrop: Backdrop, onProgress?: (stage: 'model' | 'render', f: number) => void): Promise<{ blob: Blob; duration: number }> {
  onProgress?.('model', 0);
  const seg = await loadSegmenter();
  const { CanvasSink } = await loadMediabunny();
  const src = await openVideo(file);
  const duration = Math.min(MAX_SECONDS, src.duration);
  const [W, H] = outputSize(src.width, src.height);
  const mh = Math.max(2, Math.round((MASK * H) / W));
  const out = await canvasMp4(W, H, !!src.audio);
  const { ctx, vsource, asource } = out;

  const small = new OffscreenCanvas(MASK, mh);
  const sctx = small.getContext('2d', { willReadFrequently: true })!;
  const mask = new OffscreenCanvas(MASK, mh);
  const mctx = mask.getContext('2d')!;
  const maskImg = mctx.createImageData(MASK, mh);
  const prev = new Float32Array(MASK * mh);
  const person = new OffscreenCanvas(W, H);
  const pctx = person.getContext('2d')!;

  const times: number[] = [];
  for (let t = 0; t < duration - 1e-6; t += 1 / FPS) times.push(t);
  let k = 0;
  for await (const wrapped of new CanvasSink(src.video, { width: W, height: H, fit: 'fill', poolSize: 2 }).canvasesAtTimestamps(times)) {
    const frame = wrapped?.canvas as OffscreenCanvas | undefined;
    if (frame) {
      sctx.drawImage(frame, 0, 0, MASK, mh);
      const result = seg.segmentForVideo(sctx.getImageData(0, 0, MASK, mh), Math.round(times[k] * 1000) + 1);
      const conf = result.confidenceMasks?.[0]?.getAsFloat32Array();
      if (conf) maskAlpha(conf, prev, maskImg.data, k === 0 ? 0 : 0.4);
      result.close();
      mctx.putImageData(maskImg, 0, 0);

      // Background.
      if (backdrop.kind === 'blur') {
        ctx.filter = `blur(${backdrop.radius}px)`;
        ctx.drawImage(frame, 0, 0, W, H);
        ctx.filter = 'none';
      } else if (backdrop.kind === 'color') {
        ctx.fillStyle = backdrop.color;
        ctx.fillRect(0, 0, W, H);
      } else {
        const r = cover(backdrop.image.width, backdrop.image.height, W, H);
        ctx.drawImage(backdrop.image, r.x, r.y, r.w, r.h);
      }
      // Person: the frame, kept where the scaled-up mask is opaque.
      pctx.globalCompositeOperation = 'copy';
      pctx.drawImage(frame, 0, 0);
      pctx.globalCompositeOperation = 'destination-in';
      pctx.imageSmoothingQuality = 'high';
      pctx.drawImage(mask, 0, 0, W, H);
      ctx.drawImage(person, 0, 0);
    }
    await vsource.add(k / FPS, 1 / FPS);
    if (k % 10 === 0) onProgress?.('render', k / times.length);
    k++;
  }
  vsource.close();
  if (asource && src.audio) {
    const pcm = await trackStereo(src.audio, k / FPS);
    if (pcm) await pushStereo(asource, pcm[0], pcm[1]);
    else asource.close();
  }
  const blob = await out.finish();
  onProgress?.('render', 1);
  return { blob, duration: k / FPS };
}
