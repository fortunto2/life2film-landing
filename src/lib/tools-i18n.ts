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

/** The hub page, in each language. */
export interface HubWords {
  title: string;
  description: string;
  heading: string;
  lede: string;
  open: string;
  groups: Record<'everyday' | 'engine', { name: string; note: string }>;
  whyTitle: string;
  whyBody: string;
  engineTitle: string;
  engineBody: string;
  licenceNote: string;
  markdownNote: string;
}

export const HUB: Record<Lang, HubWords> = {
  en: {
    title: 'Free video tools that run in your browser — no upload, no watermark',
    description:
      'Trim, compress, convert and split video without uploading it. Everything runs in your browser through WebCodecs — no size limit, no watermark, no sign-up.',
    heading: 'Tools',
    lede: 'Video tools that run on your own machine, in a browser tab. Nothing uploads — which is also why they are free, have no size limit and add no watermark.',
    open: 'Open →',
    groups: {
      everyday: { name: 'Everyday', note: 'The things footage usually needs before anything else.' },
      engine: {
        name: 'Made with the engine',
        note: 'These read what is in the video, which is the part other tools skip.',
      },
    },
    whyTitle: 'Why these exist',
    whyBody:
      '<p><a href="/">Life2Film</a> analyses footage and assembles it into a montage. That engine is a set of separable parts — one finds the beat in music, another finds the cuts in a video, another decides which moments are worth keeping.</p><p>Each part is useful on its own, and each is small enough to run in a browser tab. So rather than describe what the engine does, these pages let you run it.</p><p>The whole thing works without a server. Your file is read into memory, analysed by WebAssembly compiled from the same Rust the app uses, and forgotten when you close the tab.</p>',
    engineTitle: 'Use the engine yourself',
    engineBody:
      'The analysis behind the last three tools is published as a package. It finds the beat in music, the cuts in a video, and scores frames for picture quality — in a browser tab or in Node, with no server and no API key.',
    licenceNote:
      'Free for personal projects, study, research, charities and public institutions (<a href="https://www.npmjs.com/package/life2film-engine">PolyForm Noncommercial</a>). Commercial use needs a licence — write to <a href="mailto:info@life2film.com">info@life2film.com</a> and you will probably get one.',
    markdownNote:
      'Every page here is also available as markdown: append <code>.md</code> to its address, or request it with <code>Accept: text/markdown</code>. The <a href="/llms.txt">site overview for agents</a> lists everything in one file.',
  },
  es: {
    title: 'Herramientas de vídeo gratis en tu navegador — sin subir nada',
    description:
      'Corta, comprime, convierte y divide vídeo sin subirlo. Todo funciona en tu navegador con WebCodecs: sin límite de tamaño, sin marca de agua y sin registro.',
    heading: 'Herramientas',
    lede: 'Herramientas de vídeo que se ejecutan en tu propio equipo, en una pestaña. No se sube nada — por eso son gratis, no tienen límite de tamaño y no ponen marca de agua.',
    open: 'Abrir →',
    groups: {
      everyday: { name: 'Cada día', note: 'Lo que el material suele necesitar antes que nada.' },
      engine: {
        name: 'Hechas con el motor',
        note: 'Estas leen lo que hay dentro del vídeo, que es la parte que otras herramientas se saltan.',
      },
    },
    whyTitle: 'Por qué existen',
    whyBody:
      '<p><a href="/es/">Life2Film</a> analiza el material y lo monta. Ese motor son piezas separables: una encuentra el pulso de la música, otra los cortes de un vídeo, otra decide qué momentos merecen quedarse.</p><p>Cada pieza es útil por sí sola y cabe en una pestaña del navegador. Así que, en lugar de describir lo que hace el motor, estas páginas te dejan usarlo.</p><p>Todo funciona sin servidor. Tu archivo se lee en memoria, lo analiza WebAssembly compilado del mismo Rust que usa la app, y se olvida al cerrar la pestaña.</p>',
    engineTitle: 'Usa el motor tú mismo',
    engineBody:
      'El análisis que hay detrás de las últimas tres herramientas se publica como paquete. Encuentra el pulso de la música, los cortes de un vídeo y puntúa la calidad de imagen — en el navegador o en Node, sin servidor y sin clave de API.',
    licenceNote:
      'Gratis para proyectos personales, estudio, investigación, entidades benéficas e instituciones públicas (<a href="https://www.npmjs.com/package/life2film-engine">PolyForm Noncommercial</a>). El uso comercial necesita licencia — escribe a <a href="mailto:info@life2film.com">info@life2film.com</a> y es muy probable que la obtengas.',
    markdownNote:
      'Todas estas páginas están también en markdown: añade <code>.md</code> a la dirección, o pídelo con <code>Accept: text/markdown</code>. El <a href="/llms.txt">resumen del sitio para agentes</a> lo lista todo en un archivo.',
  },
  pt: {
    title: 'Ferramentas de vídeo grátis no navegador — sem enviar nada',
    description:
      'Corte, comprima, converta e divida vídeo sem o enviar. Tudo corre no seu navegador com WebCodecs: sem limite de tamanho, sem marca de água e sem registo.',
    heading: 'Ferramentas',
    lede: 'Ferramentas de vídeo que correm na sua própria máquina, num separador. Nada é enviado — é também por isso que são gratuitas, não têm limite de tamanho e não põem marca de água.',
    open: 'Abrir →',
    groups: {
      everyday: { name: 'Do dia a dia', note: 'O que o material costuma precisar antes de tudo o resto.' },
      engine: {
        name: 'Feitas com o motor',
        note: 'Estas leem o que está dentro do vídeo, que é a parte que as outras ferramentas saltam.',
      },
    },
    whyTitle: 'Porque existem',
    whyBody:
      '<p>O <a href="/pt/">Life2Film</a> analisa o material e monta-o. Esse motor é um conjunto de peças separáveis: uma encontra a batida da música, outra os cortes de um vídeo, outra decide que momentos vale a pena guardar.</p><p>Cada peça é útil por si só e cabe num separador do navegador. Por isso, em vez de descrever o que o motor faz, estas páginas deixam-no usá-lo.</p><p>Tudo funciona sem servidor. O seu ficheiro é lido para memória, analisado por WebAssembly compilado do mesmo Rust que a app usa, e esquecido quando fecha o separador.</p>',
    engineTitle: 'Use o motor você mesmo',
    engineBody:
      'A análise por trás das últimas três ferramentas está publicada como pacote. Encontra a batida na música, os cortes num vídeo e pontua a qualidade de imagem — no navegador ou em Node, sem servidor e sem chave de API.',
    licenceNote:
      'Grátis para projetos pessoais, estudo, investigação, instituições de solidariedade e organismos públicos (<a href="https://www.npmjs.com/package/life2film-engine">PolyForm Noncommercial</a>). O uso comercial precisa de licença — escreva para <a href="mailto:info@life2film.com">info@life2film.com</a> e é muito provável que a receba.',
    markdownNote:
      'Todas estas páginas existem também em markdown: acrescente <code>.md</code> ao endereço, ou peça-o com <code>Accept: text/markdown</code>. O <a href="/llms.txt">resumo do site para agentes</a> lista tudo num só ficheiro.',
  },
  id: {
    title: 'Alat video gratis di peramban — tanpa unggah, tanpa watermark',
    description:
      'Potong, kompres, konversi, dan bagi video tanpa mengunggahnya. Semua berjalan di peramban Anda lewat WebCodecs: tanpa batas ukuran, tanpa watermark, tanpa pendaftaran.',
    heading: 'Alat',
    lede: 'Alat video yang berjalan di mesin Anda sendiri, di dalam satu tab. Tidak ada yang diunggah — itu pula sebabnya semuanya gratis, tanpa batas ukuran, dan tanpa watermark.',
    open: 'Buka →',
    groups: {
      everyday: { name: 'Sehari-hari', note: 'Hal yang biasanya dibutuhkan rekaman sebelum apa pun.' },
      engine: {
        name: 'Dibuat dengan mesin analisis',
        note: 'Yang ini membaca isi videonya — bagian yang dilewati alat lain.',
      },
    },
    whyTitle: 'Mengapa ini ada',
    whyBody:
      '<p><a href="/id/">Life2Film</a> menganalisis rekaman dan menyusunnya menjadi montase. Mesin itu terdiri dari bagian-bagian yang bisa dipisah: satu mencari ketukan musik, satu mencari potongan dalam video, satu lagi menentukan momen mana yang layak disimpan.</p><p>Setiap bagian berguna sendiri, dan cukup ringan untuk berjalan di satu tab peramban. Jadi alih-alih menjelaskan apa yang mesin itu lakukan, halaman-halaman ini membiarkan Anda menjalankannya.</p><p>Semuanya bekerja tanpa server. Berkas Anda dibaca ke memori, dianalisis oleh WebAssembly hasil kompilasi Rust yang sama dengan aplikasinya, lalu dilupakan saat tab ditutup.</p>',
    engineTitle: 'Gunakan mesinnya sendiri',
    engineBody:
      'Analisis di balik tiga alat terakhir diterbitkan sebagai paket. Ia menemukan ketukan musik, potongan dalam video, dan menilai kualitas gambar — di peramban atau di Node, tanpa server dan tanpa kunci API.',
    licenceNote:
      'Gratis untuk proyek pribadi, studi, penelitian, lembaga amal, dan institusi publik (<a href="https://www.npmjs.com/package/life2film-engine">PolyForm Noncommercial</a>). Penggunaan komersial perlu lisensi — tulis ke <a href="mailto:info@life2film.com">info@life2film.com</a> dan besar kemungkinan Anda mendapatkannya.',
    markdownNote:
      'Setiap halaman di sini juga tersedia sebagai markdown: tambahkan <code>.md</code> pada alamatnya, atau minta dengan <code>Accept: text/markdown</code>. <a href="/llms.txt">Ringkasan situs untuk agen</a> memuat semuanya dalam satu berkas.',
  },
  ar: {
    title: 'أدوات فيديو مجانية داخل المتصفح — بلا رفع وبلا علامة مائية',
    description:
      'قصّ الفيديو واضغطه وحوّله وقسّمه دون رفعه. كل شيء يعمل في متصفحك عبر WebCodecs: بلا حدّ للحجم، وبلا علامة مائية، وبلا تسجيل.',
    heading: 'الأدوات',
    lede: 'أدوات فيديو تعمل على جهازك أنت، داخل تبويب واحد. لا يُرفع أي شيء — ولهذا أيضًا هي مجانية، وبلا حدّ للحجم، وبلا علامة مائية.',
    open: 'افتح →',
    groups: {
      everyday: { name: 'كل يوم', note: 'ما تحتاجه اللقطات عادةً قبل أي شيء آخر.' },
      engine: {
        name: 'مبنية على المحرّك',
        note: 'هذه تقرأ ما داخل الفيديو، وهو الجزء الذي تتجاوزه الأدوات الأخرى.',
      },
    },
    whyTitle: 'لماذا وُجدت',
    whyBody:
      '<p><a href="/ar/">Life2Film</a> يحلّل اللقطات ويجمعها في مونتاج. وهذا المحرّك مكوّن من أجزاء منفصلة: جزء يجد إيقاع الموسيقى، وآخر يجد القطعات في الفيديو، وثالث يقرّر أي اللحظات تستحق البقاء.</p><p>كل جزء مفيد بذاته، وصغير بما يكفي ليعمل في تبويب متصفح. لذا بدل وصف ما يفعله المحرّك، تتيح لك هذه الصفحات تشغيله.</p><p>كل ذلك يعمل بلا خادم. يُقرأ ملفك إلى الذاكرة، ويحلّله WebAssembly مُترجَم من نفس شيفرة Rust التي يستخدمها التطبيق، ثم يُنسى حين تغلق التبويب.</p>',
    engineTitle: 'استخدم المحرّك بنفسك',
    engineBody:
      'التحليل الذي تقوم عليه الأدوات الثلاث الأخيرة منشور كحزمة. يجد إيقاع الموسيقى، والقطعات في الفيديو، ويقيّم جودة الصورة — في المتصفح أو في Node، بلا خادم وبلا مفتاح API.',
    licenceNote:
      'مجاني للمشاريع الشخصية والدراسة والبحث والجمعيات الخيرية والمؤسسات العامة (<a href="https://www.npmjs.com/package/life2film-engine">PolyForm Noncommercial</a>). الاستخدام التجاري يحتاج ترخيصًا — راسل <a href="mailto:info@life2film.com">info@life2film.com</a> وستحصل عليه على الأرجح.',
    markdownNote:
      'كل صفحة هنا متاحة أيضًا بصيغة markdown: أضف <code>.md</code> إلى عنوانها، أو اطلبها بترويسة <code>Accept: text/markdown</code>. و<a href="/llms.txt">ملخّص الموقع للوكلاء</a> يسرد كل شيء في ملف واحد.',
  },
  ru: {
    title: 'Бесплатные видеоинструменты в браузере — без загрузки и водяных знаков',
    description:
      'Обрезайте, сжимайте, конвертируйте и разделяйте видео, не загружая его никуда. Всё работает в браузере через WebCodecs: без ограничений по размеру, без водяных знаков и регистрации.',
    heading: 'Инструменты',
    lede: 'Видеоинструменты, которые работают на вашей собственной машине, во вкладке браузера. Ничего не загружается — потому они и бесплатны, без лимита размера и без водяных знаков.',
    open: 'Открыть →',
    groups: {
      everyday: { name: 'Каждый день', note: 'То, что материалу обычно нужно раньше всего остального.' },
      engine: {
        name: 'Сделано на движке',
        note: 'Эти читают, что внутри видео, — ту часть, которую другие инструменты пропускают.',
      },
    },
    whyTitle: 'Зачем они',
    whyBody:
      '<p><a href="/ru/">Life2Film</a> анализирует материал и собирает из него монтаж. Этот движок — набор отделимых частей: одна находит бит в музыке, другая — склейки в видео, третья решает, какие моменты стоит оставить.</p><p>Каждая часть полезна сама по себе и достаточно мала, чтобы работать во вкладке браузера. Поэтому вместо описания того, что умеет движок, эти страницы дают его запустить.</p><p>Всё это работает без сервера. Ваш файл читается в память, анализируется WebAssembly, скомпилированным из того же Rust, что и приложение, и забывается, когда вы закрываете вкладку.</p>',
    engineTitle: 'Использовать движок самому',
    engineBody:
      'Анализ, на котором стоят последние три инструмента, опубликован как пакет. Он находит бит в музыке, склейки в видео и оценивает качество кадров — в браузере или в Node, без сервера и без ключа API.',
    licenceNote:
      'Бесплатно для личных проектов, учёбы, исследований, благотворительных и государственных организаций (<a href="https://www.npmjs.com/package/life2film-engine">PolyForm Noncommercial</a>). Для коммерческого использования нужна лицензия — напишите на <a href="mailto:info@life2film.com">info@life2film.com</a>, и вы её, скорее всего, получите.',
    markdownNote:
      'Каждая страница здесь доступна и в markdown: добавьте <code>.md</code> к адресу или запросите с заголовком <code>Accept: text/markdown</code>. <a href="/llms.txt">Обзор сайта для агентов</a> перечисляет всё в одном файле.',
  },
  tr: {
    title: 'Tarayıcıda çalışan ücretsiz video araçları — yükleme yok, filigran yok',
    description:
      'Videoyu yüklemeden kırpın, sıkıştırın, dönüştürün ve bölün. Her şey WebCodecs ile tarayıcınızda çalışır: boyut sınırı yok, filigran yok, kayıt yok.',
    heading: 'Araçlar',
    lede: 'Kendi makinenizde, bir sekmede çalışan video araçları. Hiçbir şey yüklenmiyor — ücretsiz olmalarının, boyut sınırı taşımamalarının ve filigran eklememelerinin sebebi de bu.',
    open: 'Aç →',
    groups: {
      everyday: { name: 'Her gün', note: 'Çekimlerin genellikle her şeyden önce ihtiyaç duyduğu işler.' },
      engine: {
        name: 'Motorla yapıldı',
        note: 'Bunlar videonun içindekini okur — diğer araçların atladığı kısım.',
      },
    },
    whyTitle: 'Neden varlar',
    whyBody:
      '<p><a href="/tr/">Life2Film</a> çekimleri analiz eder ve bir kurguya dönüştürür. O motor ayrılabilir parçalardan oluşur: biri müzikteki vuruşu bulur, biri videodaki kesmeleri, bir diğeri hangi anların saklanmaya değer olduğuna karar verir.</p><p>Her parça tek başına işe yarar ve bir tarayıcı sekmesinde çalışacak kadar küçüktür. Bu yüzden motorun ne yaptığını anlatmak yerine, bu sayfalar onu çalıştırmanıza izin veriyor.</p><p>Tümü sunucusuz çalışır. Dosyanız belleğe okunur, uygulamanın kullandığı Rust kodundan derlenen WebAssembly tarafından analiz edilir ve sekmeyi kapattığınızda unutulur.</p>',
    engineTitle: 'Motoru kendiniz kullanın',
    engineBody:
      'Son üç aracın arkasındaki analiz bir paket olarak yayımlandı. Müzikteki vuruşu, videodaki kesmeleri bulur ve kareleri görüntü kalitesine göre puanlar — tarayıcıda ya da Node içinde, sunucusuz ve API anahtarsız.',
    licenceNote:
      'Kişisel projeler, çalışma, araştırma, hayır kurumları ve kamu kurumları için ücretsiz (<a href="https://www.npmjs.com/package/life2film-engine">PolyForm Noncommercial</a>). Ticari kullanım lisans gerektirir — <a href="mailto:info@life2film.com">info@life2film.com</a> adresine yazın, büyük olasılıkla alırsınız.',
    markdownNote:
      'Buradaki her sayfa markdown olarak da var: adresin sonuna <code>.md</code> ekleyin ya da <code>Accept: text/markdown</code> başlığıyla isteyin. <a href="/llms.txt">Ajanlar için site özeti</a> her şeyi tek dosyada listeler.',
  },
};

/**
 * Strings the tools say while they work.
 *
 * These live in the client scripts, so they reach the browser through a data attribute rather than
 * an import — see `strings.ts`. Without them a page reads in the right language until you press the
 * button, and then switches to English, which is worse than not translating it at all.
 *
 * `{n}`, `{size}` and `{time}` are substituted at runtime.
 */
export interface ToolStatus {
  reading: string;
  decoding: string;
  loadingAnalyser: string;
  working: string;
  encoding: string;
  secondPass: string;
  saved: string;
  smaller: string;
  larger: string;
  sameSize: string;
  failed: string;
  cannotRead: string;
  noAudio: string;
  fits: string;
  stillOver: string;
  tryLower: string;
}

export const STATUS: Record<Lang, ToolStatus> = {
  en: {
    reading: 'Reading file…',
    decoding: 'Decoding audio…',
    loadingAnalyser: 'Loading analyser…',
    working: 'Working — {n}%',
    encoding: 'Encoding — {n}%',
    secondPass: 'Second pass — {n}%',
    saved: 'Saved — {size}.',
    smaller: '{n}% smaller',
    larger: '{n}% larger — this file was already well compressed',
    sameSize: 'about the same size',
    failed: 'Failed — {reason}',
    cannotRead: 'Could not read that file — {reason}',
    noAudio: 'That file has no audio track, so there is nothing to extract.',
    fits: 'Fits {size} with {spare} to spare.',
    stillOver: 'Still {over} over {size} — try a lower resolution.',
    tryLower: 'Try a lower resolution, or keep the original.',
  },
  es: {
    reading: 'Leyendo el archivo…',
    decoding: 'Decodificando el audio…',
    loadingAnalyser: 'Cargando el analizador…',
    working: 'Trabajando: {n}%',
    encoding: 'Codificando: {n}%',
    secondPass: 'Segunda pasada: {n}%',
    saved: 'Guardado: {size}.',
    smaller: '{n}% más pequeño',
    larger: '{n}% más grande: este archivo ya estaba bien comprimido',
    sameSize: 'prácticamente el mismo tamaño',
    failed: 'Falló: {reason}',
    cannotRead: 'No se pudo leer el archivo: {reason}',
    noAudio: 'Ese archivo no tiene pista de audio, así que no hay nada que extraer.',
    fits: 'Cabe en {size} con {spare} de margen.',
    stillOver: 'Todavía {over} por encima de {size}: prueba una resolución menor.',
    tryLower: 'Prueba una resolución menor, o quédate con el original.',
  },
  pt: {
    reading: 'Lendo o arquivo…',
    decoding: 'Decodificando o áudio…',
    loadingAnalyser: 'Carregando o analisador…',
    working: 'Trabalhando: {n}%',
    encoding: 'Codificando: {n}%',
    secondPass: 'Segunda passagem: {n}%',
    saved: 'Salvo: {size}.',
    smaller: '{n}% menor',
    larger: '{n}% maior: este arquivo já estava bem comprimido',
    sameSize: 'praticamente o mesmo tamanho',
    failed: 'Falhou: {reason}',
    cannotRead: 'Não foi possível ler o arquivo: {reason}',
    noAudio: 'Esse arquivo não tem faixa de áudio, então não há o que extrair.',
    fits: 'Cabe em {size} com {spare} de folga.',
    stillOver: 'Ainda {over} acima de {size}: tente uma resolução menor.',
    tryLower: 'Tente uma resolução menor, ou fique com o original.',
  },
  id: {
    reading: 'Membaca berkas…',
    decoding: 'Mendekode audio…',
    loadingAnalyser: 'Memuat penganalisis…',
    working: 'Memproses: {n}%',
    encoding: 'Mengodekan: {n}%',
    secondPass: 'Lintasan kedua: {n}%',
    saved: 'Tersimpan: {size}.',
    smaller: '{n}% lebih kecil',
    larger: '{n}% lebih besar: berkas ini memang sudah terkompres dengan baik',
    sameSize: 'kira-kira sama besarnya',
    failed: 'Gagal: {reason}',
    cannotRead: 'Tidak bisa membaca berkas itu: {reason}',
    noAudio: 'Berkas itu tidak punya jalur audio, jadi tidak ada yang bisa diambil.',
    fits: 'Muat dalam {size} dengan sisa {spare}.',
    stillOver: 'Masih {over} di atas {size}: coba resolusi lebih rendah.',
    tryLower: 'Coba resolusi lebih rendah, atau pakai yang asli.',
  },
  ar: {
    reading: 'جارٍ قراءة الملف…',
    decoding: 'جارٍ فك ترميز الصوت…',
    loadingAnalyser: 'جارٍ تحميل المحلّل…',
    working: 'جارٍ العمل: {n}%',
    encoding: 'جارٍ الترميز: {n}%',
    secondPass: 'التمريرة الثانية: {n}%',
    saved: 'حُفظ: {size}.',
    smaller: 'أصغر بنسبة {n}%',
    larger: 'أكبر بنسبة {n}%: هذا الملف كان مضغوطًا جيدًا أصلًا',
    sameSize: 'الحجم نفسه تقريبًا',
    failed: 'أخفق: {reason}',
    cannotRead: 'تعذّرت قراءة هذا الملف: {reason}',
    noAudio: 'لا يحتوي هذا الملف على مسار صوتي، فلا شيء لاستخراجه.',
    fits: 'يسع في {size} مع فائض {spare}.',
    stillOver: 'ما زال يتجاوز {size} بمقدار {over}: جرّب دقة أقل.',
    tryLower: 'جرّب دقة أقل، أو أبقِ الملف الأصلي.',
  },
  ru: {
    reading: 'Читаем файл…',
    decoding: 'Декодируем звук…',
    loadingAnalyser: 'Загружаем анализатор…',
    working: 'Работаем: {n}%',
    encoding: 'Кодируем: {n}%',
    secondPass: 'Второй проход: {n}%',
    saved: 'Сохранено: {size}.',
    smaller: 'на {n}% меньше',
    larger: 'на {n}% больше: этот файл уже был хорошо сжат',
    sameSize: 'примерно тот же размер',
    failed: 'Не получилось: {reason}',
    cannotRead: 'Не удалось прочитать файл: {reason}',
    noAudio: 'В этом файле нет звуковой дорожки, извлекать нечего.',
    fits: 'Помещается в {size}, запас {spare}.',
    stillOver: 'Всё ещё на {over} больше {size}: попробуйте меньшее разрешение.',
    tryLower: 'Попробуйте меньшее разрешение или оставьте оригинал.',
  },
  tr: {
    reading: 'Dosya okunuyor…',
    decoding: 'Ses çözülüyor…',
    loadingAnalyser: 'Çözümleyici yükleniyor…',
    working: 'Çalışıyor: %{n}',
    encoding: 'Kodlanıyor: %{n}',
    secondPass: 'İkinci geçiş: %{n}',
    saved: 'Kaydedildi: {size}.',
    smaller: '%{n} daha küçük',
    larger: '%{n} daha büyük: bu dosya zaten iyi sıkıştırılmıştı',
    sameSize: 'aşağı yukarı aynı boyut',
    failed: 'Başarısız: {reason}',
    cannotRead: 'Bu dosya okunamadı: {reason}',
    noAudio: 'Bu dosyada ses kanalı yok, çıkarılacak bir şey de yok.',
    fits: '{size} içine {spare} boşlukla sığıyor.',
    stillOver: '{size} sınırını hâlâ {over} aşıyor: daha düşük bir çözünürlük deneyin.',
    tryLower: 'Daha düşük bir çözünürlük deneyin ya da özgün dosyayı saklayın.',
  },
};
