import { toolPath } from './tools/index';
import { guidePath } from './guides';
import { localePath, type Lang } from '../i18n';

/**
 * Contextual links placed in the body of pages Google already indexes and clicks, pointing at pages
 * it has only discovered: video-to-frames, the guides, the tools hub. Written per language on
 * purpose (an English anchor on a Russian page is a weaker signal); a locale without copy gets no
 * block rather than a translated-by-fallback one.
 */
export interface RelatedLink {
  href: string;
  text: string;
}

interface Copy {
  heading: string;
  frames: string;
  splitter: string;
  guide: string;
  guideMusic: string;
  hub: string;
  homeNote: (hub: string, frames: string, guides: string) => string;
  hubNote: (frames: string, guides: string) => string;
}

const COPY: Partial<Record<Lang, Copy>> = {
  en: {
    heading: 'Related',
    frames: 'Save a video’s frames as images (video to frames)',
    splitter: 'Split a video into parts or at its shot changes',
    guide: 'Edit video by talking to an AI agent: a step-by-step guide',
    guideMusic: 'Cut a video to music with an AI agent: a step-by-step guide',
    hub: 'All free video tools',
    homeNote: (hub, frames, guides) =>
      `Free in the browser: <a href="${hub}">video tools</a> such as <a href="${frames}">splitting a video into frames</a>, and <a href="${guides}">guides to editing video with an AI agent</a>.`,
    hubNote: (frames, guides) =>
      `Need stills rather than clips? <a href="${frames}">Split a video into frames</a>. Prefer to describe the edit in words? Read the <a href="${guides}">guides to editing video with an AI agent</a>.`,
  },
  ru: {
    heading: 'Смотрите также',
    frames: 'Разбить видео на кадры онлайн и сохранить их картинками',
    splitter: 'Разделить видео на части или по сменам плана',
    guide: 'Монтаж видео с ИИ-агентом: пошаговое руководство',
    guideMusic: 'Монтаж видео под музыку с ИИ-агентом: пошаговое руководство',
    hub: 'Все бесплатные видеоинструменты',
    homeNote: (hub, frames, guides) =>
      `Бесплатно в браузере: <a href="${hub}">видеоинструменты</a>, например <a href="${frames}">разбить видео на кадры</a>, и <a href="${guides}">руководства по монтажу видео с ИИ-агентом</a>.`,
    hubNote: (frames, guides) =>
      `Нужны кадры, а не клипы? <a href="${frames}">Разбейте видео на кадры</a>. Хотите описать монтаж словами? Читайте <a href="${guides}">руководства по монтажу видео с ИИ-агентом</a>.`,
  },
};

const GUIDE = 'edit-video-with-ai-agents';

/** The "Related" list for a tool page, or [] when the locale has no copy or the tool has no entry. */
export function relatedForTool(slug: string, lang: Lang): { heading: string; links: RelatedLink[] } | null {
  const c = COPY[lang];
  if (!c) return null;
  const frames = { href: toolPath(lang, 'video-to-frames'), text: c.frames };
  const splitter = { href: toolPath(lang, 'video-splitter'), text: c.splitter };
  const guide = { href: guidePath(lang, GUIDE), text: c.guide };
  const byTool: Record<string, RelatedLink[]> = {
    'bpm-detector': [{ ...guide, text: c.guideMusic }],
    'video-splitter': [frames, guide],
    'video-to-frames': [splitter, guide],
    'scene-detector': [frames],
  };
  const links = byTool[slug];
  return links ? { heading: c.heading, links } : null;
}

/** One sentence for the tools hub and the home page, as HTML, or null for a locale without copy. */
export function homeNote(lang: Lang, onHub = false): string | null {
  const c = COPY[lang];
  if (!c) return null;
  if (onHub) return c.hubNote(toolPath(lang, 'video-to-frames'), localePath(lang, '/guides/'));
  return c.homeNote(localePath(lang, '/tools/'), toolPath(lang, 'video-to-frames'), localePath(lang, '/guides/'));
}
