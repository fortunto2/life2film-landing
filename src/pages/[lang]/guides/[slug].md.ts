import type { APIRoute, GetStaticPaths } from 'astro';
import { guidesFor } from '../../../lib/guides';
import { languages, defaultLang, type Lang } from '../../../i18n';

/** Markdown twins of the localised guides. */
export const getStaticPaths: GetStaticPaths = async () => {
  const langs = (Object.keys(languages) as Lang[]).filter((l) => l !== defaultLang);
  const out: any[] = [];
  for (const lang of langs)
    for (const guide of await guidesFor(lang))
      out.push({ params: { lang, slug: guide.id.split('/')[1] }, props: { guide } });
  return out;
};

export const GET: APIRoute = ({ props }) => {
  const { guide } = props as { guide: Awaited<ReturnType<typeof guidesFor>>[number] };
  return new Response(`# ${guide.data.title}\n\n${guide.data.description}\n\n${guide.body}\n`, {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
