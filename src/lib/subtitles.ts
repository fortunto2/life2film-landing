/**
 * Burn subtitles (SRT or WebVTT) into a video: every frame is drawn to a canvas, the cue showing at
 * that moment is drawn on top (white, black outline, wrapped to 90% of the width), and the result
 * is encoded once. The sound is copied as it is.
 */
import { PieceSink } from './sink';
import { loadMediabunny, encodableCodec } from './encode';

export interface Cue {
  start: number;
  end: number;
  text: string;
}

const TIME = /(?:(\d+):)?(\d{1,2}):(\d{2})[.,](\d{1,3})/;

function seconds(stamp: string): number | null {
  const m = TIME.exec(stamp);
  if (!m) return null;
  return Number(m[1] ?? 0) * 3600 + Number(m[2]) * 60 + Number(m[3]) + Number(m[4].padEnd(3, '0')) / 1000;
}

/** Parse SRT or WebVTT. Tags (<i>, <b>, {\an8}) are dropped; cues come back sorted by start. */
export function parseCues(text: string): Cue[] {
  const cues: Cue[] = [];
  const blocks = text.replace(/^﻿/, '').replace(/\r\n?/g, '\n').split(/\n{2,}/);
  for (const block of blocks) {
    const lines = block.split('\n');
    const at = lines.findIndex((l) => l.includes('-->'));
    if (at < 0) continue;
    const [a, b] = lines[at].split('-->');
    const start = seconds(a);
    const end = seconds(b);
    if (start === null || end === null || end <= start) continue;
    const body = lines
      .slice(at + 1)
      .map((l) => l.replace(/<[^>]*>/g, '').replace(/\{\\[^}]*\}/g, '').trim())
      .filter(Boolean)
      .join('\n');
    if (body) cues.push({ start, end, text: body });
  }
  return cues.sort((x, y) => x.start - y.start);
}

/** The cue on screen at `t`, if any (binary search over starts, then a short walk back for overlaps). */
export function cueAt(cues: Cue[], t: number): Cue | null {
  let lo = 0;
  let hi = cues.length - 1;
  let last = -1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (cues[mid].start <= t) { last = mid; lo = mid + 1; } else hi = mid - 1;
  }
  for (let i = last; i >= 0 && i > last - 8; i--) if (t < cues[i].end) return cues[i];
  return null;
}

/** Break a cue into lines no wider than `max`, keeping the cue's own line breaks. */
export function wrap(text: string, max: number, measure: (s: string) => number): string[] {
  const out: string[] = [];
  for (const para of text.split('\n')) {
    let line = '';
    for (const word of para.split(/\s+/)) {
      const next = line ? `${line} ${word}` : word;
      if (line && measure(next) > max) { out.push(line); line = word; } else line = next;
    }
    if (line) out.push(line);
  }
  return out;
}

export interface BurnOptions {
  size: 's' | 'm' | 'l';
  position: 'bottom' | 'top' | 'middle';
  /** Font weight; 600 by default, 800 for the bold short-caption look. */
  weight?: number;
  onProgress?: (fraction: number) => void;
}

const even = (n: number) => Math.max(2, Math.round(n / 2) * 2);

export async function burnSubtitles(file: File, cues: Cue[], o: BurnOptions): Promise<{ blob: Blob; shown: number }> {
  if (!cues.length) throw new Error('No subtitles found in that file. SRT and VTT are supported.');
  const { Input, BlobSource, ALL_FORMATS, Output, StreamTarget, Mp4OutputFormat, Conversion, QUALITY_HIGH } = await loadMediabunny();
  const input = new Input({ source: new BlobSource(file), formats: ALL_FORMATS });
  const video = await input.getPrimaryVideoTrack();
  if (!video) throw new Error('That file has no picture.');
  if (!(await video.canDecode())) throw new Error('This browser cannot decode that video. Chrome or Edge usually can.');

  const scale = Math.min(1, 1920 / Math.max(video.displayWidth, video.displayHeight));
  const width = even(video.displayWidth * scale);
  const height = even(video.displayHeight * scale);
  const codec = await encodableCodec('mp4', { width, height });
  if (!codec) throw new Error('This browser cannot encode MP4 video. Chrome or Edge usually can.');

  const canvas = new OffscreenCanvas(width, height);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is unavailable in this browser.');
  const px = Math.round(Math.min(width, height) * { s: 0.045, m: 0.06, l: 0.08 }[o.size]);
  ctx.font = `${o.weight ?? 600} ${px}px system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  const shownCues = new Set<Cue>();

  const sink = new PieceSink();
  const output = new Output({ format: new Mp4OutputFormat(), target: new StreamTarget(sink.stream(), { chunked: true }) });
  const conversion = await Conversion.init({
    input,
    output,
    video: {
      codec,
      bitrate: QUALITY_HIGH,
      processedWidth: width,
      processedHeight: height,
      process: (sample) => {
        sample.drawWithFit(ctx, { fit: 'fill' });
        const cue = cueAt(cues, sample.timestamp);
        if (cue) {
          shownCues.add(cue);
          const lines = wrap(cue.text, width * 0.9, (s) => ctx.measureText(s).width);
          const lh = px * 1.25;
          const block = lh * lines.length;
          const top = o.position === 'bottom' ? height - height * 0.07 - block : o.position === 'middle' ? (height - block) / 2 : height * 0.07;
          lines.forEach((line, i) => {
            const y = top + lh * (i + 0.5);
            ctx.lineWidth = px * 0.18;
            ctx.strokeStyle = 'rgba(0,0,0,0.9)';
            ctx.strokeText(line, width / 2, y);
            ctx.fillStyle = '#fff';
            ctx.fillText(line, width / 2, y);
          });
        }
        return canvas;
      },
    },
  });
  if (!conversion.isValid) throw new Error('This file cannot be rewritten in this browser.');
  conversion.onProgress = (p) => o.onProgress?.(p);
  await conversion.execute();
  if (!sink.size) throw new Error('Nothing was written.');
  return { blob: sink.blob('video/mp4'), shown: shownCues.size };
}
