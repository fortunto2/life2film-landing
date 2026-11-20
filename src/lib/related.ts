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
  key: string;
  changeKey: string;
  speed: string;
  autoSubs: string;
  tiktok: string;
  burn: string;
  trim: string;
  cutPart: string;
  silence: string;
  normalize: string;
  denoise: string;
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
    key: 'Find the key of a song (and its Camelot code)',
    changeKey: 'Change the key of a song without changing its tempo',
    speed: 'Make a sped up or slowed + reverb version',
    autoSubs: 'Make an editable SRT from the speech (auto subtitles)',
    tiktok: 'Big word-by-word captions in the middle, TikTok style',
    burn: 'Burn an SRT or VTT into the video',
    trim: 'Keep one part and drop both ends (trim)',
    cutPart: 'Take one section out of the middle',
    silence: 'Cut every pause out of a talking video automatically',
    normalize: 'Bring the recording to a standard loudness (normalize)',
    denoise: 'Remove background noise from the recording',
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
    key: 'Определить тональность песни (и код Camelot)',
    changeKey: 'Изменить тональность песни без изменения темпа',
    speed: 'Ускорить песню (sped up) или замедлить с ревербом',
    autoSubs: 'Сделать SRT из речи, чтобы поправить текст (автоматические субтитры)',
    tiktok: 'Крупные титры по словам в центре кадра, как в TikTok',
    burn: 'Вшить SRT или VTT в видео',
    trim: 'Оставить одну часть и убрать оба конца (обрезка)',
    cutPart: 'Вырезать кусок из середины',
    silence: 'Автоматически вырезать все паузы из видео с речью',
    normalize: 'Довести запись до стандартной громкости (нормализация)',
    denoise: 'Убрать фоновый шум из записи',
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
    // 20 Nov 2026: the page with the most impressions (БПМ queries) points at the music tools it
    // naturally leads to; read their impressions on 4 Dec.
    'bpm-detector': [
      { href: toolPath(lang, 'key-finder'), text: c.key },
      { href: toolPath(lang, 'change-key'), text: c.changeKey },
      { href: toolPath(lang, 'sped-up-slowed-reverb'), text: c.speed },
      { ...guide, text: c.guideMusic },
    ],
    // 20 Nov 2026: the three subtitle tools lead into each other (make -> fix -> burn, or one step).
    'auto-subtitles': [
      { href: toolPath(lang, 'burn-subtitles'), text: c.burn },
      { href: toolPath(lang, 'tiktok-captions'), text: c.tiktok },
    ],
    'tiktok-captions': [
      { href: toolPath(lang, 'auto-subtitles'), text: c.autoSubs },
      { href: toolPath(lang, 'burn-subtitles'), text: c.burn },
    ],
    'burn-subtitles': [
      { href: toolPath(lang, 'auto-subtitles'), text: c.autoSubs },
      { href: toolPath(lang, 'tiktok-captions'), text: c.tiktok },
    ],
    // 20 Nov 2026: three ways to cut — keep a part, drop a part, drop every pause.
    'video-trimmer': [
      { href: toolPath(lang, 'cut-part-of-video'), text: c.cutPart },
      { href: toolPath(lang, 'remove-silence-from-video'), text: c.silence },
    ],
    'cut-part-of-video': [
      { href: toolPath(lang, 'video-trimmer'), text: c.trim },
      { href: toolPath(lang, 'remove-silence-from-video'), text: c.silence },
    ],
    'remove-silence-from-video': [
      { href: toolPath(lang, 'cut-part-of-video'), text: c.cutPart },
      { href: toolPath(lang, 'video-trimmer'), text: c.trim },
    ],
    // 20 Nov 2026: a voice recording's usual path — record, clean, level.
    'voice-recorder': [
      { href: toolPath(lang, 'remove-background-noise'), text: c.denoise },
      { href: toolPath(lang, 'normalize-audio'), text: c.normalize },
    ],
    'remove-background-noise': [{ href: toolPath(lang, 'normalize-audio'), text: c.normalize }],
    'normalize-audio': [{ href: toolPath(lang, 'remove-background-noise'), text: c.denoise }],
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
