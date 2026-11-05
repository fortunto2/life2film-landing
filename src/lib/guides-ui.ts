import type { Lang } from '../i18n';

/** Chrome around the guides, per locale. The articles themselves are markdown. */
export const GUIDES_UI: Record<
  Lang,
  { nav: string; hubTitle: string; hubDesc: string; lede: string; home: string; technical: string }
> = {
  en: {
    nav: 'Guides',
    hubTitle: 'Guides: edit video with AI assistants — Life2Film',
    hubDesc: 'Plain-language guides to editing video with Claude Code, ChatGPT and Codex: what to install and what to say.',
    lede: 'Plain-language guides to cutting your own footage with an AI assistant. What to install, what to say, step by step.',
    home: 'Home',
    technical: 'Technical details on rustman.org',
  },
  es: {
    nav: 'Guías',
    hubTitle: 'Guías: editar video con asistentes de IA — Life2Film',
    hubDesc: 'Guías claras para montar video con Claude Code, ChatGPT y Codex: qué instalar y qué decirle.',
    lede: 'Guías sin tecnicismos para montar tus propios videos con un asistente de IA. Qué instalar y qué pedir, paso a paso.',
    home: 'Inicio',
    technical: 'Detalles técnicos en rustman.org',
  },
  pt: {
    nav: 'Guias',
    hubTitle: 'Guias: editar vídeo com assistentes de IA — Life2Film',
    hubDesc: 'Guias simples para editar vídeo com Claude Code, ChatGPT e Codex: o que instalar e o que pedir.',
    lede: 'Guias em linguagem simples para editar suas próprias filmagens com um assistente de IA. O que instalar e o que pedir, passo a passo.',
    home: 'Início',
    technical: 'Detalhes técnicos no rustman.org',
  },
  id: {
    nav: 'Panduan',
    hubTitle: 'Panduan: edit video dengan asisten AI — Life2Film',
    hubDesc: 'Panduan sederhana edit video dengan Claude Code, ChatGPT, dan Codex: apa yang dipasang dan apa yang diminta.',
    lede: 'Panduan bahasa sederhana untuk mengedit rekaman sendiri dengan asisten AI. Apa yang dipasang dan apa yang diminta, langkah demi langkah.',
    home: 'Beranda',
    technical: 'Detail teknis di rustman.org',
  },
  ar: {
    nav: 'أدلة',
    hubTitle: 'أدلة: مونتاج الفيديو بالذكاء الاصطناعي — Life2Film',
    hubDesc: 'أدلة بسيطة لمونتاج الفيديو بالذكاء الاصطناعي عبر Claude Code وChatGPT وCodex: ماذا تثبّت وماذا تطلب.',
    lede: 'أدلة بلغة بسيطة لمونتاج لقطاتك بمساعد ذكاء اصطناعي. ماذا تثبّت وماذا تقول، خطوة بخطوة.',
    home: 'الرئيسية',
    technical: 'التفاصيل التقنية على rustman.org',
  },
  ru: {
    nav: 'Гайды',
    hubTitle: 'Гайды: монтаж видео нейросетью и ИИ-агентами — Life2Film',
    hubDesc: 'Простые гайды по монтажу видео с Claude Code, ChatGPT и Codex: что установить и что сказать ассистенту.',
    lede: 'Простые гайды: как смонтировать своё видео с помощью ИИ-ассистента. Что установить и что сказать, шаг за шагом.',
    home: 'Главная',
    technical: 'Технические подробности на rustman.org',
  },
  tr: {
    nav: 'Rehberler',
    hubTitle: 'Rehberler: yapay zeka ile video düzenleme — Life2Film',
    hubDesc: 'Claude Code, ChatGPT ve Codex ile video düzenleme için sade rehberler: ne kurulur, ne söylenir.',
    lede: 'Kendi görüntülerinizi yapay zeka asistanıyla düzenlemek için sade rehberler. Ne kurulur, ne söylenir, adım adım.',
    home: 'Ana sayfa',
    technical: 'rustman.org üzerinde teknik ayrıntılar',
  },
};
