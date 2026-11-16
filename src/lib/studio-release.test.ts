import { describe, expect, test } from 'vitest';
import { latestDesktop, notesOf, releaseDay } from './studio-release';

const release = (tag: string, at: string, extra: Record<string, unknown> = {}) => ({
  tag_name: tag,
  published_at: at,
  html_url: `https://github.com/fortunto2/life2film-landing/releases/tag/${tag}`,
  body: '',
  draft: false,
  prerelease: false,
  ...extra,
});

describe('latestDesktop', () => {
  test('the newest published desktop release wins, whatever the listing order', () => {
    const found = latestDesktop([
      release('desktop-v0.4.0', '2026-11-14T12:13:00Z'),
      release('v2.1.0', '2026-11-20T00:00:00Z'),
      release('desktop-v0.4.1', '2026-11-16T06:10:58Z'),
      release('desktop-v0.5.0', '2026-11-18T00:00:00Z', { draft: true }),
      release('desktop-v0.6.0-beta', '2026-11-19T00:00:00Z', { prerelease: true }),
    ]);
    expect(found?.version).toBe('0.4.1');
    expect(found?.date).toBe('2026-11-16');
    expect(found?.url).toMatch(/desktop-v0\.4\.1$/);
  });

  test('a listing with no desktop release, or not a listing at all, is nothing', () => {
    expect(latestDesktop([release('v1.0.0', '2026-11-14T12:13:00Z'), release('desktop-v', '2026-11-15T00:00:00Z')])).toBeNull();
    expect(latestDesktop({ message: 'API rate limit exceeded' })).toBeNull();
    expect(latestDesktop([release('desktop-v1.0', 'soon')])).toBeNull();
  });
});

describe('notesOf', () => {
  test('bulleted lines with a bold title are the notes; the rest of the body is left out', () => {
    const body = [
      'New in 0.4.1:',
      '',
      '- **Siri, Spotlight and Shortcuts**: four actions of the system’s own.',
      '* **Fixes** ⌘Z in a field undoes the typing, `not` the **film**.',
      '- a bullet with no title',
      '',
      '    brew upgrade --cask life2film-studio',
    ].join('\r\n');
    expect(notesOf(body)).toEqual([
      { title: 'Siri, Spotlight and Shortcuts', text: 'four actions of the system’s own.' },
      { title: 'Fixes', text: '⌘Z in a field undoes the typing, not the film.' },
    ]);
  });
});

test('the day is said in the page’s language and does not slip across time zones', () => {
  expect(releaseDay('2026-11-16', 'en')).toBe('16 Nov 2026');
  expect(releaseDay('2026-11-16', 'ru')).toMatch(/^16 нояб/);
});
