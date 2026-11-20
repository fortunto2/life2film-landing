import { describe, expect, it } from 'vitest';
import { cueAt, parseCues, wrap } from './subtitles';

const SRT = `1
00:00:01,000 --> 00:00:02,500
Hello <i>there</i>

2
00:00:03,000 --> 00:00:04,000
{\\an8}Second line
two
`;

const VTT = `WEBVTT

00:01.000 --> 00:02.500 align:start
Hello

NOTE a comment

1:00:00.000 --> 1:00:01.000
An hour in
`;

describe('parseCues', () => {
  it('reads SRT with commas, strips tags, keeps line breaks', () => {
    expect(parseCues(SRT)).toEqual([
      { start: 1, end: 2.5, text: 'Hello there' },
      { start: 3, end: 4, text: 'Second line\ntwo' },
    ]);
  });
  it('reads WebVTT with dots, short stamps, settings and hours; skips notes', () => {
    expect(parseCues(VTT)).toEqual([
      { start: 1, end: 2.5, text: 'Hello' },
      { start: 3600, end: 3601, text: 'An hour in' },
    ]);
  });
  it('tolerates CRLF and a BOM', () => {
    expect(parseCues('﻿1\r\n00:00:00,500 --> 00:00:01,000\r\nHi\r\n')).toEqual([{ start: 0.5, end: 1, text: 'Hi' }]);
  });
  it('drops cues whose end is not after the start', () => {
    expect(parseCues('00:00:02,000 --> 00:00:01,000\nBackwards')).toEqual([]);
  });
});

describe('cueAt', () => {
  const cues = parseCues(SRT);
  it('finds the cue on screen and nothing in the gaps', () => {
    expect(cueAt(cues, 0.5)).toBeNull();
    expect(cueAt(cues, 1)?.text).toBe('Hello there');
    expect(cueAt(cues, 2.49)?.text).toBe('Hello there');
    expect(cueAt(cues, 2.6)).toBeNull();
    expect(cueAt(cues, 3.5)?.text).toBe('Second line\ntwo');
    expect(cueAt(cues, 4)).toBeNull();
  });
});

describe('wrap', () => {
  const measure = (s: string) => s.length;
  it('breaks on words at the width and keeps explicit breaks', () => {
    expect(wrap('one two three four', 9, measure)).toEqual(['one two', 'three', 'four']);
    expect(wrap('a\nb c', 10, measure)).toEqual(['a', 'b c']);
  });
  it('never loses a word longer than the width', () => {
    expect(wrap('supercalifragilistic', 5, measure)).toEqual(['supercalifragilistic']);
  });
});
