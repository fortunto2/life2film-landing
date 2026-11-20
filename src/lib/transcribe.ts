/**
 * Speech to subtitles in the browser: the sound is decoded to 16 kHz mono here, and Whisper
 * (transformers.js, ONNX) runs on the GPU through WebGPU where the browser has it, on the CPU through
 * WebAssembly otherwise. The model files come from the Hugging Face CDN once and are cached by the
 * browser; the audio itself never leaves the machine.
 *
 * transformers.js is loaded at run time from jsDelivr, pinned, not bundled: its onnxruntime wasm is
 * 26.9 MB, over Cloudflare Pages' 25 MiB per-file limit, and only people who press the button need it.
 */
import type * as Transformers from '@huggingface/transformers';

const TRANSFORMERS_URL = 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2/dist/transformers.min.js';

export interface Chunk {
  start: number;
  end: number;
  text: string;
}

export type ModelSize = 'base' | 'small';
const MODELS: Record<ModelSize, string> = {
  base: 'onnx-community/whisper-base',
  small: 'onnx-community/whisper-small',
};

const stamp = (t: number) => {
  const ms = Math.max(0, Math.round(t * 1000));
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  const pad = (n: number, w = 2) => String(n).padStart(w, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms % 1000, 3)}`;
};

/**
 * Cues no longer than `maxChars` (split on words, time shared by length) and no shorter than they
 * can be read; an open end (Whisper leaves the last one null) runs to `fallbackEnd`.
 */
export function toCues(chunks: { timestamp: [number, number | null]; text: string }[], fallbackEnd: number, maxChars = 84): Chunk[] {
  const out: Chunk[] = [];
  chunks.forEach((c, i) => {
    const text = c.text.trim();
    if (!text) return;
    const start = c.timestamp[0];
    const end = c.timestamp[1] ?? chunks[i + 1]?.timestamp[0] ?? fallbackEnd;
    if (!(end > start)) return;
    const words = text.split(/\s+/);
    // As many pieces as the length needs, each aimed at an equal share, so no word is left alone.
    const parts = Math.max(1, Math.ceil(text.length / maxChars));
    const aim = text.length / parts;
    const pieces: string[] = [];
    let line = '';
    for (const w of words) {
      const next = line ? `${line} ${w}` : w;
      if (line && pieces.length < parts - 1 && (next.length > maxChars || next.length > aim + w.length / 2)) { pieces.push(line); line = w; } else line = next;
    }
    if (line) pieces.push(line);
    const total = pieces.reduce((s, p) => s + p.length, 0);
    let t = start;
    for (const p of pieces) {
      const d = ((end - start) * p.length) / total;
      out.push({ start: t, end: t + d, text: p });
      t += d;
    }
  });
  return out;
}

export function toSrt(cues: Chunk[]): string {
  return cues.map((c, i) => `${i + 1}\n${stamp(c.start)} --> ${stamp(c.end)}\n${c.text}\n`).join('\n');
}

export function toVtt(cues: Chunk[]): string {
  return `WEBVTT\n\n${cues.map((c) => `${stamp(c.start).replace(',', '.')} --> ${stamp(c.end).replace(',', '.')}\n${c.text}\n`).join('\n')}`;
}

async function pcm16k(file: File): Promise<Float32Array> {
  const ctx = new AudioContext();
  try {
    const raw = await ctx.decodeAudioData(await file.arrayBuffer());
    const off = new OfflineAudioContext(1, Math.max(1, Math.round(raw.duration * 16_000)), 16_000);
    const node = off.createBufferSource();
    node.buffer = raw;
    node.connect(off.destination);
    node.start();
    return (await off.startRendering()).getChannelData(0);
  } catch {
    throw new Error('This browser cannot decode the sound of that file. MP4, MOV, MP3, M4A and WAV usually work.');
  } finally {
    void ctx.close();
  }
}

export interface TranscribeOptions {
  model: ModelSize;
  /** ISO code ('en', 'ru'…) or null to let Whisper detect it. */
  language: string | null;
  onStage?: (stage: 'audio' | 'model' | 'listening', fraction?: number) => void;
}

export async function transcribe(file: File, o: TranscribeOptions): Promise<{ cues: Chunk[]; duration: number; device: string }> {
  o.onStage?.('audio');
  const audio = await pcm16k(file);
  const duration = audio.length / 16_000;
  const { pipeline } = (await import(/* @vite-ignore */ TRANSFORMERS_URL)) as typeof Transformers;
  const gpu = typeof navigator !== 'undefined' && 'gpu' in navigator && !!(await (navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown> } }).gpu?.requestAdapter().catch(() => null));
  const files = new Map<string, number>();
  o.onStage?.('model', 0);
  const asr = await pipeline('automatic-speech-recognition', MODELS[o.model], {
    device: gpu ? 'webgpu' : 'wasm',
    dtype: gpu ? { encoder_model: 'fp32', decoder_model_merged: 'q4' } : 'q8',
    progress_callback: (p: { status: string; file?: string; loaded?: number; total?: number }) => {
      if (p.status === 'progress' && p.file && p.total) {
        files.set(p.file, (p.loaded ?? 0) / p.total);
        const all = [...files.values()];
        o.onStage?.('model', all.reduce((s, v) => s + v, 0) / all.length);
      }
    },
  });
  o.onStage?.('listening');
  const result = (await asr(audio, {
    return_timestamps: true,
    chunk_length_s: 30,
    stride_length_s: 5,
    task: 'transcribe',
    ...(o.language ? { language: o.language } : {}),
  })) as { chunks?: { timestamp: [number, number | null]; text: string }[]; text: string };
  await asr.dispose?.();
  const chunks = result.chunks?.length ? result.chunks : [{ timestamp: [0, duration] as [number, number], text: result.text }];
  return { cues: toCues(chunks, duration), duration, device: gpu ? 'webgpu' : 'wasm' };
}
