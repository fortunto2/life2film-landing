import type { Lang } from '../i18n';
import type { FaqEntry, Tool } from './tools';

/**
 * Tool pages in other languages.
 *
 * Only the words change: the markup, the scripts and the engine are identical, so a translation is
 * data rather than another page. What is worth translating is what a search engine reads and what a
 * visitor sees before deciding to stay — the title, the promise, the feature list and the questions.
 *
 * A locale may translate some tools and not others. Anything missing falls back to English rather
 * than blocking the rest, and `hreflang` is emitted only for the locales that actually have the
 * page — claiming a translation that does not exist is what sent crawlers to 404s before.
 */
export interface ToolTranslation {
  /** How this tool is searched for in this language — the phrase belongs in the title. */
  searchPhrase: string;
  title: string;
  description: string;
  heading: string;
  accent: string;
  lede: string;
  blurb: string;
  featureList: string[];
  faq: FaqEntry[];
}

export type ToolTranslations = Partial<Record<string, ToolTranslation>>;

/** Strings shared by every tool's interface, so a page is not half-translated. */
export interface ToolChrome {
  allTools: string;
  chooseFile: string;
  chooseVideo: string;
  dragHint: string;
  download: string;
  otherTools: string;
  privacyNote: string;
  questions: string;
  buildIntoProject: string;
  copy: string;
  copied: string;
  promptTab: string;
  codeTab: string;
}

export const CHROME: Record<Lang, ToolChrome> = {
  en: {
    allTools: '← All tools',
    chooseFile: 'Choose a file',
    chooseVideo: 'Choose a video file',
    dragHint: 'or drag it here',
    download: 'Download',
    otherTools: 'The other tools',
    privacyNote:
      'Your file is read and re-encoded by your own browser. No request carries it anywhere — this page has no upload endpoint to send it to.',
    questions: 'Questions',
    buildIntoProject: 'Build this into your own project',
    copy: 'Copy',
    copied: 'Copied',
    promptTab: 'Prompt for an agent',
    codeTab: 'Code',
  },
  es: {
    allTools: '← Todas las herramientas',
    chooseFile: 'Elige un archivo',
    chooseVideo: 'Elige un vídeo',
    dragHint: 'o arrástralo aquí',
    download: 'Descargar',
    otherTools: 'Las demás herramientas',
    privacyNote:
      'Tu navegador lee y recodifica el archivo. Ninguna petición lo envía a ninguna parte: esta página no tiene servidor al que subirlo.',
    questions: 'Preguntas',
    buildIntoProject: 'Añádelo a tu propio proyecto',
    copy: 'Copiar',
    copied: 'Copiado',
    promptTab: 'Instrucción para un agente',
    codeTab: 'Código',
  },
  pt: {
    allTools: '← Todas as ferramentas',
    chooseFile: 'Escolha um ficheiro',
    chooseVideo: 'Escolha um vídeo',
    dragHint: 'ou arraste-o para aqui',
    download: 'Descarregar',
    otherTools: 'As outras ferramentas',
    privacyNote:
      'O seu navegador lê e recodifica o ficheiro. Nenhum pedido o envia para lado nenhum — esta página não tem servidor para onde o enviar.',
    questions: 'Perguntas',
    buildIntoProject: 'Integre isto no seu projeto',
    copy: 'Copiar',
    copied: 'Copiado',
    promptTab: 'Instrução para um agente',
    codeTab: 'Código',
  },
  id: {
    allTools: '← Semua alat',
    chooseFile: 'Pilih berkas',
    chooseVideo: 'Pilih berkas video',
    dragHint: 'atau seret ke sini',
    download: 'Unduh',
    otherTools: 'Alat lainnya',
    privacyNote:
      'Peramban Anda yang membaca dan mengodekan ulang berkas. Tidak ada permintaan yang mengirimnya ke mana pun — halaman ini tidak punya server tujuan unggah.',
    questions: 'Pertanyaan',
    buildIntoProject: 'Pasang ini di proyek Anda sendiri',
    copy: 'Salin',
    copied: 'Tersalin',
    promptTab: 'Perintah untuk agen',
    codeTab: 'Kode',
  },
  ar: {
    allTools: '← كل الأدوات',
    chooseFile: 'اختر ملفًا',
    chooseVideo: 'اختر ملف فيديو',
    dragHint: 'أو اسحبه إلى هنا',
    download: 'تنزيل',
    otherTools: 'الأدوات الأخرى',
    privacyNote:
      'متصفحك هو الذي يقرأ الملف ويعيد ترميزه. لا يُرسَل في أي طلب إلى أي مكان — فهذه الصفحة لا تملك خادمًا يُرفع إليه.',
    questions: 'أسئلة',
    buildIntoProject: 'أضف هذا إلى مشروعك',
    copy: 'نسخ',
    copied: 'تم النسخ',
    promptTab: 'تعليمات لوكيل برمجي',
    codeTab: 'الشيفرة',
  },
  ru: {
    allTools: '← Все инструменты',
    chooseFile: 'Выберите файл',
    chooseVideo: 'Выберите видеофайл',
    dragHint: 'или перетащите сюда',
    download: 'Скачать',
    otherTools: 'Другие инструменты',
    privacyNote:
      'Файл читает и перекодирует ваш собственный браузер. Ни один запрос никуда его не отправляет — у этой страницы просто нет сервера, куда его загружать.',
    questions: 'Вопросы',
    buildIntoProject: 'Встроить в свой проект',
    copy: 'Копировать',
    copied: 'Скопировано',
    promptTab: 'Промпт для агента',
    codeTab: 'Код',
  },
  tr: {
    allTools: '← Tüm araçlar',
    chooseFile: 'Bir dosya seçin',
    chooseVideo: 'Bir video dosyası seçin',
    dragHint: 'ya da buraya sürükleyin',
    download: 'İndir',
    otherTools: 'Diğer araçlar',
    privacyNote:
      'Dosyayı sizin tarayıcınız okur ve yeniden kodlar. Hiçbir istek onu bir yere göndermez — bu sayfanın yükleme yapacağı bir sunucu yok.',
    questions: 'Sorular',
    buildIntoProject: 'Kendi projenize ekleyin',
    copy: 'Kopyala',
    copied: 'Kopyalandı',
    promptTab: 'Bir ajan için komut',
    codeTab: 'Kod',
  },
};

/** The English original, in the shape a translation has. */
export const asTranslation = (tool: Tool): ToolTranslation => ({
  searchPhrase: tool.searchPhrase,
  title: tool.title,
  description: tool.description,
  heading: tool.heading,
  accent: tool.accent,
  lede: tool.lede,
  blurb: tool.blurb,
  featureList: tool.featureList,
  faq: tool.faq,
});
