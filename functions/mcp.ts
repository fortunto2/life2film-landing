/**
 * POST /mcp: a read-only MCP server over what the site publishes. Three tools, no user data, no
 * writes, nothing stored: search_guides and get_guide read the guides and blog from the build's own
 * output (/agent-index.json and the .md twins), list_tools describes the browser tools. The browser
 * tools run in the visitor's browser and cannot be called from here. Protocol: superduper-site-kit/agent-mcp.
 */
import { createMcpHandler, loadJson, loadMarkdown, scoreDoc, type McpTool } from 'superduper-site-kit/agent-mcp';

type Env = { ASSETS: { fetch(r: Request): Promise<Response> } };
type Doc = { kind: 'guide' | 'blog'; lang: string; slug: string; title: string; description: string; url: string; markdown: string; excerpt: string };
type ToolRow = { slug: string; name: string; group: string; blurb: string; summary: string; facts: string[]; url: string; markdown: string; languages: string[]; runs: string };
type Index = { documents: Doc[]; tools: ToolRow[] };

const READ_ONLY = { readOnlyHint: true, openWorldHint: false };
const LANGS = ['en', 'es', 'pt', 'id', 'ar', 'ru', 'tr'];

const tools: McpTool<Env>[] = [
  {
    name: 'search_guides',
    title: 'Search the Life2Film guides',
    description:
      'Full-text search over the guides on editing video with an AI assistant (Claude Code, ChatGPT desktop with Codex) in en, es, pt, id, ar, ru and tr. ' +
      'Set include_blog to search the blog too. Returns titles, descriptions, excerpts and URLs; call get_guide for the whole text.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Words to look for, e.g. "cut video to the beat".' },
        lang: { type: 'string', enum: LANGS, description: 'Only guides in this language (blog posts are English).' },
        include_blog: { type: 'boolean', description: 'Also search the blog. Default false.' },
        limit: { type: 'integer', minimum: 1, maximum: 20, description: 'How many results (default 5).' },
      },
      required: ['query'],
    },
    annotations: READ_ONLY,
    async run(args, { env, origin }) {
      const terms = String(args.query ?? '').toLowerCase().split(/\s+/).filter(Boolean);
      if (terms.length === 0) return { text: 'Give me something to search for.', isError: true };
      const lang = args.lang ? String(args.lang) : null;
      const limit = Math.min(Math.max(Number(args.limit ?? 5) || 5, 1), 20);
      const { documents } = await loadJson<Index>(env, origin, '/agent-index.json');
      const hits = documents
        .filter((d) => (d.kind === 'guide' || args.include_blog === true) && (lang === null || d.lang === lang))
        .map((d) => ({ d, score: scoreDoc({ title: d.title, description: d.description, body: d.excerpt }, terms) }))
        .filter((h) => h.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
      if (hits.length === 0) return { text: `Nothing matched "${args.query}". Try a broader word; list_tools covers the browser tools.` };
      return {
        text: hits.map(({ d }) => `## ${d.title}\n${d.url}  ·  markdown: ${d.markdown}  ·  ${d.kind}, ${d.lang}\n\n${d.description}\n\n${d.excerpt.slice(0, 280)}…`).join('\n\n---\n\n'),
      };
    },
  },
  {
    name: 'get_guide',
    title: 'Get a guide or blog post',
    description: 'The whole text of one guide (or blog post) as markdown, by slug (from search_guides) and language. Falls back to English when the language has no translation.',
    inputSchema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'e.g. edit-video-with-claude-code, or a page URL.' },
        lang: { type: 'string', enum: LANGS, description: 'Default en.' },
        section: { type: 'string', enum: ['guides', 'blog'], description: 'Default guides.' },
      },
      required: ['slug'],
    },
    annotations: READ_ONLY,
    async run(args, { env, origin }) {
      const slug = String(args.slug ?? '').trim().replace(/\/+$/, '').split('/').pop()?.replace(/\.md$/, '') ?? '';
      if (!/^[a-z0-9-]+$/.test(slug)) return { text: `Not a slug: ${String(args.slug)}. Use search_guides to find one.`, isError: true };
      const section = args.section === 'blog' ? 'blog' : 'guides';
      const lang = LANGS.includes(String(args.lang)) ? String(args.lang) : 'en';
      const tries = section === 'blog' ? [`/blog/${slug}.md`] : [...new Set([lang, 'en'])].map((l) => (l === 'en' ? `/guides/${slug}.md` : `/${l}/guides/${slug}.md`));
      for (const path of tries) {
        const md = await loadMarkdown(env, origin, path);
        if (md) return { text: `Source: ${origin}${path.replace(/\.md$/, '/')}\n\n${md}` };
      }
      return { text: `No ${section} entry "${slug}". Use search_guides to find one.`, isError: true };
    },
  },
  {
    name: 'list_tools',
    title: 'List the browser video tools',
    description:
      'The free tools on life2film.com (compress, convert, trim, split, video to MP3, video to frames, BPM and scene detection). They run in the ' +
      'visitor\'s own browser and nothing is uploaded, so they cannot be run through this server; it returns what each does, its measured facts, its page and its markdown twin.',
    inputSchema: { type: 'object', properties: { group: { type: 'string', enum: ['everyday', 'engine'], description: 'everyday = utilities, engine = beat/scene/frame analysis.' } } },
    annotations: READ_ONLY,
    async run(args, { env, origin }) {
      const { tools: rows } = await loadJson<Index>(env, origin, '/agent-index.json');
      const list = rows.filter((t) => !args.group || t.group === args.group);
      return {
        text: list.map((t) => `## ${t.name}\n${t.url}  ·  markdown: ${t.markdown}\n\n${t.summary}\n\nRuns ${t.runs}. Languages: ${t.languages.join(', ')}.\n${t.facts.map((f) => `- ${f}`).join('\n')}`).join('\n\n---\n\n'),
      };
    },
  },
];

export const onRequest = createMcpHandler<Env>({
  server: { name: 'life2film.com', title: 'Life2Film: guides and browser video tools', version: '1.0.0' },
  instructions:
    'Guides on editing video with an AI assistant, a blog, and the free video tools of life2film.com. Read-only: ' +
    'search_guides, then get_guide for the text; list_tools describes the browser tools, which run in the visitor\'s browser and are not callable here. ' +
    'Public content, may be quoted with a link back.',
  tools,
  docsUrl: 'https://life2film.com/llms.txt',
});
