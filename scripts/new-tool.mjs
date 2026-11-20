// Scaffold a new browser tool: `npm run new-tool -- <slug> <Component> <group>`
//   group: everyday | create | audio | engine
// Writes the English page, the locale page (built only for languages that get a translation), a
// component on superduper-tools' mountTool, and a TEXT_TOOLS entry marked TODO. Then:
//   1. write the core in src/lib/<slug>.ts with a test, and call it from the component's run();
//   2. fill the TODOs in src/lib/tool-text.ts (title from Google Autocomplete phrasing, FAQ, facts);
//   3. translations: add '<slug>' to src/lib/tools/<lang>-text.ts and words to the component;
//   4. REGISTRY_WRITE=1 npx vitest run src/lib/registry.test.ts, commit superduper-tools, bump it here
//      (`npm run bump-tools`) and on superduperai-site (the shared hubs list it from the registry).
// src/lib/tool-structure.test.ts fails until every piece exists and no TODO is left.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const [slug, Comp, group] = process.argv.slice(2);
const groups = ['everyday', 'create', 'audio', 'engine'];
if (!/^[a-z0-9-]+$/.test(slug ?? '') || !/^[A-Z][A-Za-z0-9]+$/.test(Comp ?? '') || !groups.includes(group)) {
  console.error('usage: npm run new-tool -- <slug> <Component> <everyday|create|audio|engine>');
  process.exit(2);
}
const files = {
  [`src/pages/tools/${slug}.astro`]: `---
import ToolPage from '../../components/ToolPage.astro';
import Tool from '../../components/tools/${Comp}.astro';
---

<ToolPage slug="${slug}">
  <Tool slot="tool" />
</ToolPage>
`,
  [`src/pages/[lang]/tools/${slug}.astro`]: readFileSync('src/pages/[lang]/tools/add-border-to-video.astro', 'utf8')
    .replaceAll('AddBorder', Comp).replaceAll('add-border-to-video', slug),
  [`src/components/tools/${Comp}.astro`]: `---
import { CHROME, STATUS } from '../../lib/tools-i18n';
import type { Lang } from '../../i18n';

interface Props { lang?: Lang }
const { lang = 'en' } = Astro.props;
const chrome = CHROME[lang];
const status = STATUS[lang];

// One line per language that has this tool translated (see src/lib/tools/<lang>-text.ts).
const WORDS: Partial<Record<Lang, Record<string, string>>> = {
  en: { run: 'TODO run', working: 'Working… {n}%', saved: 'Saved — {size}, {len}.', failed: 'Could not do it — {msg}' },
};
const words = WORDS[lang] ?? WORDS.en!;
---

<div class="tool" slot="tool">
  <span id="i18n" data-strings={JSON.stringify(status)} hidden></span>
  <span id="words" data-words={JSON.stringify(words)} hidden></span>
  <label class="drop" id="drop" for="file">
    <input type="file" id="file" accept="video/*" hidden />
    <strong>{chrome.chooseFile}</strong>
    <span class="muted">{chrome.dragHint} — MP4, MOV, WebM</span>
  </label>
  <div class="controls">
    <span class="spacer"></span>
    <button id="run" type="button" class="ghost primary" data-sda-event="tool_run" data-sda-placement="controls">{words.run}</button>
  </div>
  <div id="status" class="status" hidden>
    <div class="bar"><span id="fill"></span></div>
    <div class="statustext" id="statusText"></div>
  </div>
</div>

<script>
  import { mountTool, messageOf } from 'superduper-tools/shell';
  import { fileChosen, toolFailed, track } from '../../lib/track';
  import { saveBlob, formatBytes, preciseClock } from '../../lib/encode';

  const el = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
  const w = JSON.parse(el('words').dataset.words ?? '{}') as Record<string, string>;

  mountTool({
    onFiles: ([f], via, status) => { fileChosen(f, via); status(f.name); },
    onError: (error, [f]) => { toolFailed('run', error, f); return w.failed.replace('{msg}', messageOf(error)); },
    run: async ({ file, status }) => {
      // TODO: call the core from src/lib/${slug}.ts
      const blob: Blob = file;
      const duration = 0;
      status(w.working.replace('{n}', '100'), 1);
      saveBlob(blob, file.name);
      track('result_saved', { placement: 'result' }, { seconds: Math.round(duration) });
      status(w.saved.replace('{size}', formatBytes(blob.size)).replace('{len}', preciseClock(duration)), 1);
    },
  });
</script>
`,
};
for (const [p, text] of Object.entries(files)) {
  if (existsSync(p)) { console.error(`exists: ${p}`); process.exit(1); }
}
const reg = 'src/lib/tool-text.ts';
let src = readFileSync(reg, 'utf8');
if (src.includes(`slug: '${slug}'`)) { console.error(`${slug} is already in ${reg}`); process.exit(1); }
const entry = `  {
    slug: '${slug}',
    group: '${group}',
    name: 'TODO name',
    appName: 'TODO app name',
    blurb: 'TODO one line for the hub card.',

    searchPhrase: 'TODO how people search, from Google Autocomplete',
    title: 'TODO Title Online Free | what it does, no upload',
    description: 'TODO 140-160 characters: the search phrase first, then what it does; runs in your browser, nothing uploaded.',
    heading: 'TODO heading',
    accent: 'TODO accent',
    lede: 'TODO one sentence. The video stays on your device.',
    featureList: ['TODO'],
    faq: [{ q: 'Is the video uploaded?', a: 'No. Your browser does the work.' }],

    summary: 'TODO one measured sentence for llms.txt.',
    facts: ['TODO a measured fact with its number'],
    agentJob: 'TODO',
  },
];`;
const end = src.lastIndexOf('];');
src = src.slice(0, end) + entry.slice(0, -3) + '\n' + src.slice(end);
for (const [p, text] of Object.entries(files)) writeFileSync(p, text);
writeFileSync(reg, src);
console.log(`created ${Object.keys(files).join(', ')} and a TODO entry in ${reg}`);
