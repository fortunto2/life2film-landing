import type { APIRoute } from 'astro';
import { GROUPS, TOOLS, byGroup } from '../lib/tools';
import { TRANSLATIONS } from '../lib/tools/index';
import { ENGINE_VERSION } from '../lib/skill';

/**
 * The site, for agents.
 *
 * Generated rather than hand-written, because the hand-written version fell behind: /engine/ was
 * missing three commits after it shipped, the locale list named two languages out of seven, and the
 * tool count was a word someone had to remember to change. The prose about the products is still
 * written by hand — only the parts that restate the registry are built from it.
 */

const HEAD = `# Life2Film

> AI video montage that runs on the device. Point it at videos already in your camera roll and it
> finds the moments worth keeping, cuts them to the beat of a track, and never uploads the footage.

Two products, one engine:

- **Life2Film** — iPhone app. Analysis runs on the phone using Apple's Vision framework, a compact
  neural model for grouping faces, and a native engine that assembles the timeline. No account, no
  upload, works in airplane mode.
- **Life2Film Studio** — macOS desktop app, public beta. Built for large archives: 30 measurements
  per frame, ensemble scene segmentation, montage assembly, and direct import from the Apple Photos
  library. Free while in beta.

What makes it different from other video editors:

- The analysis is local. Original video and photos never leave the device; there is no server they
  could be sent to. The only thing that can leave, and only if the user configures an LLM provider
  with their own API key, is a text description of clips — timings and short scene labels.
- Cuts land on the beat. Tempo and downbeats are detected, and edits are placed where the music
  turns rather than at fixed intervals.
- The calendar wheel replaces the endless scroll: spin to any month or day and see what was actually
  filmed then.

## Pages

- [Home](https://life2film.com/): what the app does, in three steps
- [About](https://life2film.com/about): why it exists, the film-made-of-films idea
- [Studio](https://life2film.com/studio): the desktop analyser — features it measures, install
- [Privacy](https://life2film.com/privacy): what stays on device, what can leave, and when
- [Engine](https://life2film.com/engine/): the analysis engine as an npm package, with a skill for
  coding agents
- [Support](https://life2film.com/support): contact and common questions
- [Blog](https://life2film.com/blog): notes on the topics below

The site is also available in Spanish, Portuguese, Indonesian, Arabic, Russian and Turkish (/es, /pt, /id, /ar, /ru, /tr); ${['en', ...Object.keys(TRANSLATIONS)].join(', ')} for the tools; the engine page is English only. Blog posts are English only.

## Articles

- [Where your footage actually goes when you edit on your phone](https://life2film.com/blog/where-your-footage-goes/)
  Which mobile editors upload clips to a server and which do not, why "we delete it after
  processing" is a weaker guarantee than local processing, and two ways a reader can verify any
  app's claim (airplane mode; the shape of the delay).
- [How to cut video to the beat, by hand and automatically](https://life2film.com/blog/cut-video-to-the-beat/)
  Why cuts landing off the downbeat read as amateur, a manual method using waveform markers, what
  beat-detection computes (onset envelope, periodicity, downbeat selection), and the three ways
  tools apply it: snap-to-grid, snap-on-edit, analyse-then-place.
- [The automatic montage tools that came and went](https://life2film.com/blog/automatic-montage-tools/)
  History of automatic video montage: Magisto (2011, cloud service, bought by Vimeo in 2019,
  integration discontinued Dec 2024), GoPro Quik, Google Photos Memories. Why the premise held up
  while the products did not, and what changed when phones became able to run the analysis.`;

const TAIL = `## Install

- iPhone: App Store (submitted, pending review)
- macOS: \`brew install --cask fortunto2/tap/life2film-studio\`, or the DMG from
  https://github.com/fortunto2/life2film-landing/releases — Apple Silicon, macOS 13+, signed and
  notarised.

## Maker

SuperDuperAi, Corp. — Delaware, USA. info@life2film.com`;

const toolLines = (group: (typeof GROUPS)[number]) =>
  byGroup(group.id)
    .map((tool) => `- [${tool.name}](https://life2film.com/tools/${tool.slug}/): ${tool.blurb}`)
    .join('\n');

export const GET: APIRoute = () => {
  const body = `${HEAD}

## Free tools (browser, no upload)

${TOOLS.length} tools that run entirely in the visitor's browser through WebCodecs and WebAssembly.
No server is involved: no upload, no size limit imposed by a plan, no queue, no watermark, no
sign-up. Each page is also available as markdown by appending \`.md\` to its address — e.g.
https://life2film.com/tools/video-compressor.md — or by requesting it with
\`Accept: text/markdown\`.

${GROUPS.map((group) => `${group.note}\n\n${toolLines(group)}`).join('\n\n')}

## Engine, for building on

The analysis behind the last three tools is Rust compiled to WebAssembly, published as an npm
package (currently ${ENGINE_VERSION}):

\`\`\`
npm i life2film-engine
\`\`\`

Nineteen exports: \`detect_beats\`, \`analyze_audio\`, \`beat_sync_timeline\`, three scene-detection
families, \`score_frame\` (31 per-frame measurements), \`select_segments\`, \`compose_montage\`,
OpenTimelineIO in and out. It analyses; it does not decode or encode — pair it with
[mediabunny](https://mediabunny.dev) (MIT) for that, which is what these tool pages do.

Everything below, plus the full skill, in one document: https://life2film.com/llms-full.txt\n\nThe package ships a skill for coding agents at \`node_modules/life2film-engine/SKILL.md\`, also
readable at https://life2film.com/engine/skill.md and explained at https://life2film.com/engine/

Licence: PolyForm Noncommercial. Free for personal projects, study, research, charities and public
institutions. Commercial use needs a separate licence — write to info@life2film.com and you will
probably get one.

## What each tool knows

Details worth carrying if you are building something similar. These are measured, not estimated.

${TOOLS.map(
  (tool) => `### ${tool.name}\nhttps://life2film.com/tools/${tool.slug}.md\n\n${tool.facts
    .map((fact) => `- ${fact}`)
    .join('\n')}`,
).join('\n\n')}

${TAIL}
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
