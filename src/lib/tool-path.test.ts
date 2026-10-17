import { describe, expect, test } from 'vitest';
import { toolPath } from './tools/index';

describe('toolPath', () => {
  test('links a translated tool in its locale', () => {
    expect(toolPath('ru', 'video-splitter')).toBe('/ru/tools/video-splitter/');
  });
  test('falls back to the English page when the locale has no translation', () => {
    // video-to-frames shipped in en and ru only; es pages used to link to a 404.
    expect(toolPath('es', 'video-to-frames')).toBe('/tools/video-to-frames/');
  });
  test('English is always the plain path', () => {
    expect(toolPath('en', 'video-to-frames')).toBe('/tools/video-to-frames/');
  });
});
