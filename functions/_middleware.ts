/**
 * Markdown for agents. `Accept: text/markdown` on a guide, blog post or tool page returns its .md
 * twin in place; on the home page it returns llms.txt, the site's markdown form. A browser sending
 * text/html gets the page, with `Vary: Accept`. The logic is superduper-site-kit/agent-edge.
 *
 * public/_routes.json limits this to the paths that have a twin, so the rest of the static site
 * costs no Function invocation. Replaces functions/tools/[[route]].js, which covered /tools/ only
 * and also answered text/plain.
 */
import { markdownNegotiation } from 'superduper-site-kit/agent-edge';
import { sectionTwins } from 'superduper-site-kit/agent';

export const onRequest = markdownNegotiation({
  mode: 'rewrite',
  home: '/llms.txt',
  twinPath: sectionTwins(["guides", "blog", "tools"], ['es', 'pt', 'id', 'ar', 'ru', 'tr']),
});
