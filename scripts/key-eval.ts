/**
 * Runs src/lib/key.ts (the code the page ships) over decoded tracks listed by key_eval_prep.py and
 * prints one JSON line per track: our best guess, runner-up and margin.
 * Usage: npx -y tsx scripts/key-eval.ts <manifest.json>
 */
import { readFileSync } from 'node:fs';
import { chromagram, detectKey } from '../src/lib/key';

const items = JSON.parse(readFileSync(process.argv[2], 'utf8')) as { id: string; pcm: string }[];
for (const it of items) {
  const buf = readFileSync(it.pcm);
  const samples = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
  const r = detectKey(chromagram(samples, 22050));
  console.log(JSON.stringify({ id: it.id, best: [r.best.tonic, r.best.mode], alt: [r.runnerUp.tonic, r.runnerUp.mode], margin: r.margin }));
}
