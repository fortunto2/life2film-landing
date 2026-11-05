import type { APIRoute, GetStaticPaths } from 'astro';
import { guidesFor } from '../../lib/guides';

/** Markdown twin of each English guide, for agents: the same text without the page around it. */
export const getStaticPaths: GetStaticPaths = async () =>
  (await guidesFor('en')).map((guide) => ({ params: { slug: guide.id.split('/')[1] }, props: { guide } }));

export const GET: APIRoute = ({ props }) => {
  const { guide } = props as { guide: Awaited<ReturnType<typeof guidesFor>>[number] };
  return new Response(`# ${guide.data.title}\n\n${guide.data.description}\n\n${guide.body}\n`, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
