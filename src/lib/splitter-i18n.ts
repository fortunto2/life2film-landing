import type { Lang } from '../i18n';

/**
 * The splitter's own controls, in every language the page exists in.
 *
 * They were English on all seven pages — a Russian visitor, the tool's biggest audience, landed
 * from «разделить видео на 2 части» on a page that said "Clip length". `{n}` is substituted.
 */
export interface SplitterChrome {
  hint: string;
  splitBy: string;
  byScenes: string;
  byParts: string;
  byEvery: string;
  clipLength: string;
  parts: string;
  every: string;
  seconds: string;
  minutes: string;
  crop: string;
  downloadSelected: string;
  download: string;
  /** Shown when a long video arrives in scene mode and the tool switches to cutting on the clock. */
  tooLong: string;
  summaryParts: string;
}

export const SPLITTER: Record<Lang, SplitterChrome> = {
  en: {
    hint: 'MP4, MOV (H.264), WebM · scene mode up to 10 minutes, equal parts any length',
    splitBy: 'Split',
    byScenes: 'at scene changes',
    byParts: 'into equal parts',
    byEvery: 'every N seconds',
    clipLength: 'Clip length',
    parts: '{n} parts',
    every: 'every',
    seconds: 's',
    minutes: 'min',
    crop: 'Crop to 9:16',
    downloadSelected: 'Download selected',
    download: 'Download',
    tooLong: 'Longer than 10 minutes, so it is cut on the clock instead of at the scene changes — pick the part length below.',
    summaryParts: '<b>{n}</b> parts · {length} of video',
  },
  es: {
    hint: 'MP4, MOV (H.264), WebM · por escenas hasta 10 minutos, en partes iguales sin límite',
    splitBy: 'Dividir',
    byScenes: 'por cambios de escena',
    byParts: 'en partes iguales',
    byEvery: 'cada N segundos',
    clipLength: 'Duración del clip',
    parts: '{n} partes',
    every: 'cada',
    seconds: 's',
    minutes: 'min',
    crop: 'Recortar a 9:16',
    downloadSelected: 'Descargar seleccionados',
    download: 'Descargar',
    tooLong: 'Dura más de 10 minutos, así que se corta por tiempo en lugar de por escenas: elige abajo la duración de cada parte.',
    summaryParts: '<b>{n}</b> partes · {length} de vídeo',
  },
  pt: {
    hint: 'MP4, MOV (H.264), WebM · por cenas até 10 minutos, em partes iguais sem limite',
    splitBy: 'Dividir',
    byScenes: 'nas mudanças de cena',
    byParts: 'em partes iguais',
    byEvery: 'a cada N segundos',
    clipLength: 'Duração do clipe',
    parts: '{n} partes',
    every: 'a cada',
    seconds: 's',
    minutes: 'min',
    crop: 'Recortar para 9:16',
    downloadSelected: 'Descarregar selecionados',
    download: 'Descarregar',
    tooLong: 'Tem mais de 10 minutos, por isso é cortado por tempo e não por cenas: escolha abaixo a duração de cada parte.',
    summaryParts: '<b>{n}</b> partes · {length} de vídeo',
  },
  id: {
    hint: 'MP4, MOV (H.264), WebM · per adegan hingga 10 menit, bagian sama rata tanpa batas',
    splitBy: 'Bagi',
    byScenes: 'di pergantian adegan',
    byParts: 'menjadi bagian sama rata',
    byEvery: 'setiap N detik',
    clipLength: 'Panjang klip',
    parts: '{n} bagian',
    every: 'setiap',
    seconds: 'dtk',
    minutes: 'mnt',
    crop: 'Potong ke 9:16',
    downloadSelected: 'Unduh yang dipilih',
    download: 'Unduh',
    tooLong: 'Lebih dari 10 menit, jadi dipotong berdasarkan waktu, bukan adegan — pilih panjang tiap bagian di bawah.',
    summaryParts: '<b>{n}</b> bagian · video {length}',
  },
  ar: {
    hint: 'MP4 وMOV (H.264) وWebM · حسب المشاهد حتى 10 دقائق، وبأجزاء متساوية بلا حد',
    splitBy: 'قسّم',
    byScenes: 'عند تغيّر المشهد',
    byParts: 'إلى أجزاء متساوية',
    byEvery: 'كل N ثانية',
    clipLength: 'طول المقطع',
    parts: '{n} أجزاء',
    every: 'كل',
    seconds: 'ث',
    minutes: 'د',
    crop: 'قص إلى 9:16',
    downloadSelected: 'تنزيل المحدد',
    download: 'تنزيل',
    tooLong: 'الفيديو أطول من 10 دقائق، لذا يُقسَّم حسب الوقت بدل المشاهد — اختر طول الجزء في الأسفل.',
    summaryParts: '<b>{n}</b> أجزاء · فيديو مدته {length}',
  },
  ru: {
    hint: 'MP4, MOV (H.264), WebM · по сменам плана до 10 минут, на равные части — любой длины',
    splitBy: 'Разделить',
    byScenes: 'по сменам плана',
    byParts: 'на равные части',
    byEvery: 'каждые N секунд',
    clipLength: 'Длина клипа',
    parts: 'на {n}',
    every: 'каждые',
    seconds: 'с',
    minutes: 'мин',
    crop: 'Обрезать до 9:16',
    downloadSelected: 'Скачать выбранные',
    download: 'Скачать',
    tooLong: 'Видео длиннее 10 минут, поэтому оно режется по времени, а не по сменам плана. Выберите длину части ниже.',
    summaryParts: 'Частей: <b>{n}</b> · {length} видео',
  },
  tr: {
    hint: 'MP4, MOV (H.264), WebM · sahneye göre 10 dakikaya kadar, eşit parçalar sınırsız',
    splitBy: 'Böl',
    byScenes: 'sahne geçişlerinden',
    byParts: 'eşit parçalara',
    byEvery: 'her N saniyede',
    clipLength: 'Klip uzunluğu',
    parts: '{n} parça',
    every: 'her',
    seconds: 'sn',
    minutes: 'dk',
    crop: '9:16 kırp',
    downloadSelected: 'Seçilenleri indir',
    download: 'İndir',
    tooLong: 'Video 10 dakikadan uzun, bu yüzden sahnelere göre değil süreye göre bölünüyor — parça uzunluğunu aşağıdan seçin.',
    summaryParts: '<b>{n}</b> parça · {length} video',
  },
};
