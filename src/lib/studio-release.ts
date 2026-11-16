// The latest Life2Film Studio release, read from GitHub when the site is built, so no page names a version by
// hand: a `desktop-v*` release published on this repository is on the site at its next build (the deploy
// workflow runs on a published release).

export interface StudioNote {
  title: string;
  text: string;
}

export interface StudioRelease {
  version: string;
  /** The day it was published, `YYYY-MM-DD`. */
  date: string;
  url: string;
  /** The bullets of its notes written as `- **Title**: text`, in order. */
  notes: StudioNote[];
}

const LISTING = 'https://api.github.com/repos/fortunto2/life2film-landing/releases?per_page=30';
const TAG = 'desktop-v';

/** The bullets of release notes that open with a bold title; any other line is left out. */
export function notesOf(body: string): StudioNote[] {
  const notes: StudioNote[] = [];
  for (const line of body.split(/\r?\n/)) {
    const bullet = /^[-*]\s+\*\*(.+?)\*\*:?\s*(.*)$/.exec(line.trim());
    if (bullet) notes.push({ title: bullet[1].trim(), text: bullet[2].replace(/\*\*|`/g, '').trim() });
  }
  return notes;
}

interface Listed {
  tag_name?: unknown;
  published_at?: unknown;
  html_url?: unknown;
  body?: unknown;
  draft?: unknown;
  prerelease?: unknown;
}

/** The newest published desktop release in GitHub's listing of releases, or null when there is none. */
export function latestDesktop(listing: unknown): StudioRelease | null {
  if (!Array.isArray(listing)) return null;
  const desktop = (listing as Listed[]).filter(
    (r): r is Listed & { tag_name: string; published_at: string; html_url: string } =>
      typeof r?.tag_name === 'string' && r.tag_name.startsWith(TAG) && r.tag_name.length > TAG.length &&
      typeof r.published_at === 'string' && !Number.isNaN(Date.parse(r.published_at)) &&
      typeof r.html_url === 'string' && !r.draft && !r.prerelease,
  );
  const newest = desktop.sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at))[0];
  if (!newest) return null;
  return {
    version: newest.tag_name.slice(TAG.length),
    date: newest.published_at.slice(0, 10),
    url: newest.html_url,
    notes: notesOf(typeof newest.body === 'string' ? newest.body : ''),
  };
}

/** `16 Nov 2026` in the page's language. */
export function releaseDay(date: string, lang: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString(lang === 'en' ? 'en-GB' : lang, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

let asked: Promise<StudioRelease | null> | undefined;

/** Read once per build. Where GitHub cannot be reached the page goes out without a version, with a warning;
 *  under `STUDIO_RELEASE_REQUIRED` (the deploy) that is a failed build instead. */
export function studioRelease(): Promise<StudioRelease | null> {
  asked ??= (async () => {
    try {
      const headers: Record<string, string> = { Accept: 'application/vnd.github+json', 'User-Agent': 'life2film-site-build' };
      if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
      const answer = await fetch(LISTING, { headers, signal: AbortSignal.timeout(15_000) });
      if (!answer.ok) throw new Error(`GitHub answered ${answer.status}`);
      const found = latestDesktop(await answer.json());
      if (!found) throw new Error(`no published ${TAG}* release in the listing`);
      return found;
    } catch (error) {
      const why = `the Studio release could not be read: ${error instanceof Error ? error.message : error}`;
      if (process.env.STUDIO_RELEASE_REQUIRED) throw new Error(why);
      console.warn(`[studio-release] ${why}; the page goes out without a version`);
      return null;
    }
  })();
  return asked;
}
