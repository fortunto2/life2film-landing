import type { APIRoute } from 'astro';
import { TOOLS } from '../lib/tools';
import { SKILL } from '../lib/skill';

/**
 * Everything an agent might want, in one request.
 *
 * `llms.txt` is an index; this is the corpus. An agent asked to build something with these tools
 * would otherwise fetch eight documents to assemble what fits in one — and the convention exists
 * precisely so it does not have to.
 */
export const GET: APIRoute = () => {
  const body = `# Life2Film — full reference for agents

On-device video montage. Seven browser tools and the analysis engine behind them, all running
client-side through WebCodecs and WebAssembly: no upload, no account, no size limit imposed by a
plan, no watermark.

Index: https://life2film.com/llms.txt
Tools: https://life2film.com/tools/
Engine: https://life2film.com/engine/

${TOOLS.map(
  (tool) => `
---

# ${tool.name}

${tool.summary}

Page: https://life2film.com/tools/${tool.slug}/
Markdown: https://life2film.com/tools/${tool.slug}.md
Searched for as: ${tool.searchPhrase}

## What matters

${tool.facts.map((fact) => `- ${fact}`).join('\n')}
${tool.code ? `\n## From code\n\n\`\`\`js\n${tool.code}\n\`\`\`\n` : ''}${
    tool.prompt ? `\n## Prompt for a coding agent\n\n${tool.prompt}\n` : ''
  }
## Questions

${tool.faq.map(({ q, a }) => `**${q}**\n\n${a}`).join('\n\n')}
`,
).join('\n')}

---

# The engine, as a package

${SKILL}
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
