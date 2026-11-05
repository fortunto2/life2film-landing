/**
 * The machine-facing description of life2film.com: agents.txt, the A2A card, the ARD manifest, the
 * RFC 9727 API catalog and the MCP server card. The generators are superduper-site-kit/agent; this
 * file is the site's config for them, in one place so the files cannot disagree.
 *
 * What is true here, and so what is published: a read-only MCP server over the guides, the blog and
 * the list of browser tools (functions/mcp.ts). What is not: accounts, OAuth, payments, uploads, any
 * write. The browser tools themselves run in the visitor's browser; an agent cannot call them
 * through MCP and nothing a person processes with them ever reaches a server.
 */
import { SKILL_MD_TYPE, a2aSkill, agentCard as kitCard, agentPolicyText as kitPolicy, apiCatalog as kitApi, ardCoreEntries, ardManifest as kitArd, mcpServerCard as kitMcpCard } from 'superduper-site-kit/agent';
import { COMPANY } from 'superduper-site-kit/company';

export const DOMAIN = 'life2film.com';
export const BASE = `https://${DOMAIN}`;
export const EMAIL = 'info@life2film.com';

export const URLS = {
  llms: `${BASE}/llms.txt`,
  llmsFull: `${BASE}/llms-full.txt`,
  sitemap: `${BASE}/sitemap-index.xml`,
  mcp: `${BASE}/mcp`,
  mcpCard: `${BASE}/.well-known/mcp/server-card.json`,
  agentCard: `${BASE}/.well-known/agent-card.json`,
  apiCatalog: `${BASE}/.well-known/api-catalog`,
  ard: `${BASE}/.well-known/ard.json`,
  agentsTxt: `${BASE}/agents.txt`,
  index: `${BASE}/agent-index.json`,
  engineSkill: `${BASE}/engine/skill.md`,
} as const;

/** The three MCP tools, described once for the card, the A2A skills and the ARD entry. */
export const MCP_TOOLS = [
  {
    id: 'search_guides',
    name: 'Search the guides',
    description:
      'Full-text search over the Life2Film guides on editing video with an AI assistant (Claude Code, ChatGPT desktop with Codex), ' +
      'in en, es, pt, id, ar, ru and tr; optionally the blog too. Returns titles, descriptions, excerpts and URLs.',
    tags: ['search', 'guides', 'video-editing'],
    examples: ['edit video with claude code', 'cut video to the beat', 'can chatgpt edit video'],
    out: 'text/markdown',
  },
  {
    id: 'get_guide',
    name: 'Get a guide as markdown',
    description: 'The whole text of one guide (or blog post) as markdown, by slug and language. Falls back to English when the language has no translation.',
    tags: ['read', 'guides', 'markdown'],
    examples: ['edit-video-with-claude-code', 'edit-video-with-ai-agents in ru'],
    out: 'text/markdown',
  },
  {
    id: 'list_tools',
    name: 'List the browser tools',
    description:
      'The free tools on life2film.com: video compressor, converter, trimmer, splitter, video to MP3, video to frames, BPM detector, scene detector. ' +
      'They run in the visitor\'s browser through WebCodecs and WebAssembly and nothing is uploaded, so an agent cannot run them through this server; ' +
      'it returns what each does, its facts and its page. Read-only.',
    tags: ['tools', 'video', 'browser'],
    examples: ['which tool compresses a video to a size', 'what can detect the beats of a song'],
    out: 'application/json',
  },
] as const;

export function agentPolicyText(): string {
  return kitPolicy({
    domain: DOMAIN,
    about: [
      'Life2Film: on-device AI video montage (iPhone app, macOS Studio beta), free browser video tools,',
      'and guides on editing video by talking to an AI assistant. Static, public, read-only.',
      'Nothing here needs an account. robots.txt carries the same policy as a Content-Signal;',
      'this file says it in words.',
    ],
    may: [
      'read, index and link to every page                      (search=yes)',
      'quote it when answering someone, with a link to the page (ai-input=yes)',
      `call the MCP server at ${URLS.mcp}, no key needed (tools: search_guides, get_guide,\nlist_tools); read-only, 120 requests a minute`,
    ],
    mustNot: ['fold the content into a training corpus                  (ai-train=no)'],
    notOffered: [
      `accounts, sign-in or OAuth: nothing on ${DOMAIN} is protected`,
      'running the browser tools for a person: they work in the visitor\'s own browser and nothing is\nuploaded, so there is no endpoint that takes a video',
      'payments through this site, or write access of any kind',
    ],
    start: [
      ['Site map for models', URLS.llms],
      ['Every page, one file', URLS.llmsFull],
      ['Sitemap', URLS.sitemap],
      ['MCP server', URLS.mcp],
      ['MCP server card', URLS.mcpCard],
      ['Agent card', URLS.agentCard],
      ['Resource catalogue', URLS.ard],
      ['API catalogue', URLS.apiCatalog],
      ['Engine skill', URLS.engineSkill],
      ['Markdown', 'send "Accept: text/markdown" to any /guides, /blog or /tools\npage (and the home page), or append .md to its path'],
    ],
    contact: EMAIL,
  });
}

export function agentCard() {
  return kitCard({
    domain: DOMAIN,
    description:
      'Life2Film: guides on editing video with an AI assistant, a blog, and free video tools that run in the visitor\'s browser ' +
      '(nothing is uploaded). Read-only: search and read the guides and blog, and list the tools. Not a conversational agent and no ' +
      'A2A task endpoint: the callable interface is an MCP server (streamable HTTP, stateless, no authentication), ' +
      `described at ${URLS.mcpCard}.`,
    mcpUrl: URLS.mcp,
    provider: { organization: COMPANY.us.name, url: `${BASE}/about` },
    iconUrl: `${BASE}/img/og.png`,
    documentationUrl: URLS.llms,
    skills: MCP_TOOLS.map((t) => a2aSkill({ id: t.id, name: t.name, description: t.description, tags: [...t.tags], examples: [...t.examples], out: t.out })),
  });
}

export function mcpServerCard() {
  return kitMcpCard({
    domain: DOMAIN,
    title: 'Life2Film: guides and browser video tools',
    description: 'Search and read the Life2Film guides on editing video with an AI assistant (seven languages) and the blog, and list the free browser video tools. Read-only; no key, nothing stored.',
    websiteUrl: BASE,
    mcpUrl: URLS.mcp,
    tools: MCP_TOOLS.map((t) => ({ name: t.id, description: t.description })),
  });
}

export function apiCatalog() {
  return kitApi(URLS.apiCatalog, [
    {
      href: URLS.mcp,
      'service-desc': [{ href: URLS.mcpCard, type: 'application/json' }],
      'service-doc': [{ href: URLS.agentsTxt, type: 'text/plain' }, { href: URLS.llms, type: 'text/plain' }],
    },
    { href: URLS.index, 'service-doc': [{ href: URLS.llms, type: 'text/plain' }] },
  ]);
}

export function ardManifest() {
  return kitArd(DOMAIN, [
    ...ardCoreEntries({
      domain: DOMAIN, mcpCardUrl: URLS.mcpCard, agentCardUrl: URLS.agentCard,
      mcpDescription: 'Search and read the guides on editing video with an AI assistant and the blog, and list the free browser video tools. Streamable HTTP, no authentication, read-only.',
      mcpQueries: ['how to edit video with Claude Code', 'cut video to the beat guide', 'free browser tool to compress a video'],
      capabilities: ['search', 'read'], tags: ['mcp', 'video', 'read-only'],
      cardDescription: 'What an agent can get here and through which interface (MCP; there is no A2A task endpoint).',
      cardQueries: ['what can an agent do on life2film.com'],
    }),
    {
      id: 'skills:life2film-engine', displayName: 'life2film-engine: beat, scene and frame analysis', type: SKILL_MD_TYPE, url: URLS.engineSkill,
      description: 'The skill shipped with the life2film-engine npm package: how to call detect_beats, detect_scenes_slick and score_frame from WebAssembly, with the measured limits.',
      extra: { tags: ['skill', 'video', 'wasm'], metadata: { source: 'https://www.npmjs.com/package/life2film-engine' } },
    },
  ]);
}
