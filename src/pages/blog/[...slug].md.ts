import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

/** Markdown twin of each blog post, for agents: the same text without the page around it. */
export const getStaticPaths: GetStaticPaths = async () =>
  (await getCollection('blog', ({ data }: CollectionEntry<'blog'>) => !data.draft)).map((post: CollectionEntry<'blog'>) => ({
    params: { slug: post.id },
    props: { post },
  }));

export const GET: APIRoute = ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blog'> };
  return new Response(`# ${post.data.title}\n\n${post.data.description}\n\n${post.body ?? ''}\n`, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
