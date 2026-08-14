import type { APIRoute, GetStaticPaths } from 'astro';
import { TOOLS, TOOL } from '../../lib/tools';

/**
 * Markdown twins of the tool pages.
 *
 * An agent handed a link to one of these tools should not have to parse HTML and guess which text
 * was navigation and which was the answer. `…/video-compressor.md` returns the same page as plain
 * markdown: what it does, how to call it from code, and the constraints that matter.
 *
 * Everything here comes from the registry, so a fact cannot be true on the page and stale in the
 * copy no human ever reads — which is exactly what happened when this file kept its own DOCS object.
 */

export const getStaticPaths: GetStaticPaths = () =>
  TOOLS.map((tool) => ({ params: { tool: tool.slug } }));

export const GET: APIRoute = ({ params }) => {
  const tool = TOOL[params.tool as string];
  if (!tool) return new Response('Not found', { status: 404 });

  const body = `# ${tool.name}

${tool.summary}

Runs entirely in the browser through WebCodecs and WebAssembly. No upload, no account, no size limit
imposed by a plan, no watermark — because there is no server involved.

Page: https://life2film.com/tools/${tool.slug}/

## What matters

${tool.facts.map((fact) => `- ${fact}`).join('\n')}
${
  tool.code
    ? `
## From code

\`\`\`js
${tool.code}
\`\`\`
`
    : ''
}
## Questions

${tool.faq.map(({ q, a }) => `**${q}**\n\n${a}`).join('\n\n')}

## Related

${TOOLS.filter((other) => other.slug !== tool.slug)
  .map((other) => `- [${other.name}](https://life2film.com/tools/${other.slug}/): ${other.blurb}`)
  .join('\n')}

- The engine as a package: https://life2film.com/engine/
- Site overview for agents: https://life2film.com/llms.txt
- Every tool page is available as markdown by appending \`.md\` to its address, or by requesting it
  with \`Accept: text/markdown\`.

---
Life2Film — on-device video montage. https://life2film.com/
`;

  return new Response(body, {
    headers: {
      'content-type': 'text/markdown; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
