import { describe, expect, it } from 'vitest';
import { groupWords, toCues, toSrt, toVtt } from './transcribe';
import { parseCues } from './subtitles';

describe('toCues', () => {
  it('closes an open last chunk at the end of the audio and drops empty text', () => {
    const cues = toCues([
      { timestamp: [0, 2.5], text: ' Hello there.' },
      { timestamp: [2.5, 3], text: '  ' },
      { timestamp: [3, null], text: ' Bye.' },
    ], 7);
    expect(cues).toEqual([
      { start: 0, end: 2.5, text: 'Hello there.' },
      { start: 3, end: 7, text: 'Bye.' },
    ]);
  });
  it('splits a long chunk on words and shares its time by length', () => {
    const text = 'one two three four five six seven eight nine ten';
    const cues = toCues([{ timestamp: [10, 20], text }], 30, 20);
    expect(cues.map((c) => c.text).join(' ')).toBe(text);
    expect(cues.every((c) => c.text.length <= 20)).toBe(true);
    expect(cues[0].start).toBe(10);
    expect(cues.at(-1)!.end).toBeCloseTo(20);
    for (let i = 1; i < cues.length; i++) expect(cues[i].start).toBeCloseTo(cues[i - 1].end);
  });
});

describe('toCues balance', () => {
  it('does not leave the last word alone on its own cue', () => {
    const text = 'The quick brown fox jumps over the lazy dog, then it runs into the forest and disappears.';
    const cues = toCues([{ timestamp: [0, 5], text }], 5);
    expect(cues.length).toBe(2);
    expect(Math.min(...cues.map((c) => c.text.length))).toBeGreaterThan(30);
  });
});

describe('toSrt / toVtt', () => {
  const cues = [{ start: 0.5, end: 2, text: 'Привет' }, { start: 3661.25, end: 3662, text: 'An hour in' }];
  it('round-trips through the subtitle parser the burner uses', () => {
    expect(parseCues(toSrt(cues))).toEqual(cues);
    expect(parseCues(toVtt(cues))).toEqual(cues);
  });
  it('writes SRT stamps with commas and hours', () => {
    expect(toSrt(cues)).toContain('01:01:01,250 --> 01:01:02,000');
  });
});

describe('groupWords', () => {
  const w = (start: number, end: number, text: string) => ({ timestamp: [start, end] as [number, number], text: ` ${text}` });
  it('groups up to N words and breaks after a sentence end', () => {
    const cues = groupWords([w(0, 0.3, 'one'), w(0.3, 0.6, 'two'), w(0.6, 0.9, 'three'), w(0.9, 1.2, 'four.'), w(1.3, 1.6, 'Five')], 3, 3);
    expect(cues.map((c) => c.text)).toEqual(['one two three', 'four.', 'Five']);
  });
  it('breaks on a pause and holds a caption until the next one, at most 1.5 s past its last word', () => {
    const cues = groupWords([w(0, 0.4, 'hello'), w(0.5, 0.9, 'there'), w(3, 3.3, 'again'), w(10, 10.2, 'late')], 11, 3);
    expect(cues.map((c) => c.text)).toEqual(['hello there', 'again', 'late']);
    expect(cues[0].end).toBeCloseTo(2.4);
    expect(cues[1].end).toBeCloseTo(4.8);
  });
  it('never overlaps the next caption', () => {
    const cues = groupWords([w(0, 1, 'a'), w(1.05, 2, 'b'), w(2.05, 3, 'c'), w(3.05, 4, 'd')], 5, 1);
    for (let i = 1; i < cues.length; i++) expect(cues[i - 1].end).toBeLessThanOrEqual(cues[i].start);
  });
});
