/**
 * The video editor's export: the timeline (src/lib/timeline.ts) rendered frame-exact through the
 * same shot renderer as the auto montage, 720p, cover-fit, with an optional song and the clips' own
 * sound. The page's preview is plain <video> elements; only this is exact.
 */
import { openVideo, type OpenedVideo } from './canvas-out';
import { renderShots, type Shot } from './render-shots';
import { offsets, type TimelineShot } from './timeline';

export type EditorShape = 'auto' | '9:16' | '16:9';

/** Timeline shots as renderer shots (source_id from 1, speed 1). */
export function toRenderShots(shots: TimelineShot[]): Shot[] {
  const at = offsets(shots);
  return shots.map((s, i) => ({ trim_start: s.start, trim_end: s.end, output_start: at[i], speed: 1, segment_id: s.id, source_id: s.clip + 1 }));
}

/** 720p frame size: the majority of the clips used, ties portrait (the app's rule), or the picked shape. */
export function frameSize(shape: EditorShape, sizes: { width: number; height: number }[]): [number, number] {
  const portrait = shape === '9:16' || (shape === 'auto' && sizes.filter((c) => c.height > c.width).length * 2 >= sizes.length);
  return portrait ? [720, 1280] : [1280, 720];
}

export interface EditorExport { blob: Blob; duration: number; shots: number; clipsUsed: number }

export async function exportFilm(
  clips: File[], shots: TimelineShot[], o: { shape: EditorShape; song?: File | null; keepClipSound: boolean; onProgress?: (f: number) => void },
): Promise<EditorExport> {
  if (!shots.length) throw new Error('The timeline is empty.');
  const used = [...new Set(shots.map((s) => s.clip))];
  const opened: (OpenedVideo | null)[] = clips.map(() => null);
  for (const i of used) opened[i] = await openVideo(clips[i], true);
  const [W, H] = frameSize(o.shape, used.map((i) => opened[i]!));
  const r = await renderShots(opened as OpenedVideo[], toRenderShots(shots), { W, H, song: o.song, keepClipSound: o.keepClipSound, onProgress: o.onProgress });
  return { ...r, shots: shots.length, clipsUsed: used.length };
}
