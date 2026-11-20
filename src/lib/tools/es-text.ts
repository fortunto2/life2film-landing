import type { ToolTranslations } from '../tools-i18n';

/** Speech, text, recording and sound tools (20 Nov 2026), apart so es.ts stays under 1000 lines. */
export const esText: ToolTranslations = {
  'auto-subtitles': {
    searchPhrase: 'Generador de subtítulos automáticos online',
    title: 'Subtítulos automáticos online gratis — video a SRT con Whisper, sin subir',
    description:
      'Crea subtítulos de un video automáticamente, online y gratis: Whisper funciona en tu navegador y escribe SRT o VTT con tiempos, en 99 idiomas. El video no se sube; el modelo se descarga una vez.',
    heading: 'Subtítulos',
    accent: 'automáticos',
    lede: 'Convierte la voz en subtítulos con tiempos sin enviar el video a ninguna parte.',
    blurb: 'Voz a SRT o VTT en el navegador con Whisper, y luego incrustarlos con un clic.',
    featureList: [
      'Whisper base (rápido) o small (más preciso) en la pestaña',
      'Idioma detectado o elegido',
      'SRT y WebVTT con tiempos y líneas legibles',
      'El video no se sube; el modelo se descarga una vez',
    ],
    faq: [
      {
        q: '¿Qué tan preciso es?',
        a: 'Es Whisper en tamaños pequeños: la voz clara sale casi limpia; ruido, voces superpuestas y nombres necesitan revisión.',
      },
      {
        q: '¿Se sube mi video?',
        a: 'No. Solo los archivos del modelo vienen de internet (Hugging Face); el sonido se transcribe en tu equipo.',
      },
    ],
  },
  'add-text-to-video': {
    searchPhrase: 'Añadir texto a un video online',
    title: 'Añadir texto a un video online gratis — rótulo, sin subir',
    description:
      'Añade texto a un video online gratis: escribe el rótulo, elige tamaño y arriba o abajo, y obtén un MP4 con el texto en la imagen, blanco con borde oscuro. En tu navegador, sin subir nada.',
    heading: 'Añadir texto al',
    accent: 'video',
    lede: 'Escribe un rótulo y aparecerá en la imagen. El video se queda en tu dispositivo.',
    blurb: 'Un rótulo en el video, arriba o abajo, legible sobre cualquier fondo.',
    featureList: [
      'Un rótulo para todo el video, hasta 200 caracteres',
      'Blanco con borde oscuro, legible en cualquier fondo',
      'Tres tamaños, arriba o abajo',
      'Todo en el navegador: sin subidas',
    ],
    faq: [
      {
        q: '¿Se sube mi video?',
        a: 'No. Tu navegador dibuja cada fotograma y codifica el resultado.',
      },
    ],
  },
  'voice-recorder': {
    searchPhrase: 'Grabadora de voz online',
    title: 'Grabadora de voz online gratis — graba audio en MP3 sin registro',
    description:
      'Graba tu voz online gratis: pulsa grabar, habla, detén y el navegador guarda un MP3 o WAV. Sin registro ni límite de tiempo; nada se sube.',
    heading: 'Grabadora de voz',
    accent: 'online',
    lede: 'Pulsa grabar, habla y obtén un MP3. El sonido no sale de tu equipo.',
    blurb: 'Graba tu voz del micrófono y guárdala en MP3 o WAV.',
    featureList: [
      'MP3 (192 kbps) o WAV',
      'Medidor de nivel, rojo si satura',
      'Sonido sin supresión de ruido ni ganancia automática',
      'Sin registro, sin límite, sin subidas',
    ],
    faq: [
      {
        q: '¿Se sube la grabación?',
        a: 'No. El navegador graba el micrófono y codifica el MP3; el archivo va directo a tus descargas.',
      },
      {
        q: 'El navegador no obtiene el micrófono.',
        a: 'Haz clic en el icono del candado en la barra de direcciones y permite el micrófono para este sitio.',
      },
    ],
  },
  'webcam-recorder': {
    searchPhrase: 'Grabar con la webcam online',
    title: 'Grabar video con la webcam online gratis — sin subir ni marca de agua',
    description:
      'Graba video con tu webcam online gratis: enciende la cámara, pulsa grabar, detén y el navegador guarda el video con sonido (MP4 o WebM). Sin registro, marca de agua ni límite; nada se sube.',
    heading: 'Grabar con la',
    accent: 'webcam',
    lede: 'Te ves, pulsas grabar y guardas el archivo. Nada sale de tu equipo.',
    blurb: 'Grábate con la webcam y guarda el video con sonido.',
    featureList: [
      'Cámara y micrófono, 480p, 720p o 1080p',
      'MP4 en Safari y Chrome reciente, WebM en otros',
      'Vista previa en espejo; el archivo se guarda sin espejo',
      'Sin registro, sin marca de agua, sin subidas',
    ],
    faq: [
      {
        q: '¿Se sube el video?',
        a: 'No. El navegador graba la cámara en memoria y guarda el archivo en tus descargas.',
      },
    ],
  },
  'change-key': {
    searchPhrase: 'Cambiar el tono de una canción online',
    title: 'Cambiar el tono de una canción online gratis — sin cambiar el tempo',
    description:
      'Cambia el tono de una canción online y gratis: súbelo o bájalo hasta 12 semitonos sin cambiar el tempo y guarda MP3 o WAV. Para cantar en tu registro o tocar encima. En tu navegador, sin subir el archivo.',
    heading: 'Cambiar el tono de',
    accent: 'una canción',
    lede: 'Arriba o abajo por semitonos, mismo tempo. La canción se queda en tu dispositivo.',
    blurb: 'Sube o baja una canción por semitonos sin cambiar el tempo.',
    featureList: [
      'De −12 a +12 semitonos',
      'Tempo y duración sin cambios',
      'MP3 o WAV, escucha en la página',
      'Nada se sube',
    ],
    faq: [
      {
        q: '¿Cuántos semitonos necesito?',
        a: 'Un semitono por paso: de Do a Re es +2. Encuentra el tono actual con el Detector de tonalidad (/es/tools/key-finder/).',
      },
      {
        q: '¿Se sube el archivo?',
        a: 'No. Tu navegador decodifica, cambia y codifica la canción.',
      },
    ],
  },
  'add-logo-to-video': {
    searchPhrase: 'Añadir logo a un video online',
    title: 'Añadir logo o marca de agua a un video online gratis — sin subir',
    description:
      'Añade tu logo o una marca de agua a un video online y gratis: elige un PNG (con transparencia), JPG o SVG, una esquina, tamaño y opacidad, y obtén un MP4. En tu navegador, sin subir nada.',
    heading: 'Añadir logo al',
    accent: 'video',
    lede: 'Tu logo en la esquina de cada fotograma. El video se queda en tu dispositivo.',
    blurb: 'Tu logo o marca de agua en una esquina del video.',
    featureList: [
      'PNG con transparencia, JPG, WebP o SVG',
      'Cuatro esquinas o el centro',
      'Tamaño y opacidad ajustables',
      'Sin subidas ni marca de agua nuestra',
    ],
    faq: [
      {
        q: '¿Se verá el fondo de mi logo?',
        a: 'No si es PNG o SVG con transparencia. Un JPG no tiene transparencia.',
      },
      {
        q: '¿Se sube el video?',
        a: 'No. El navegador dibuja el logo en cada fotograma.',
      },
    ],
  },
  'sped-up-slowed-reverb': {
    searchPhrase: 'Canción sped up y slowed + reverb online',
    title: 'Sped up y slowed + reverb online gratis — acelerar o ralentizar canciones sin subir',
    description:
      'Crea la versión sped up o slowed + reverb de una canción online y gratis: presets de un clic, velocidad de 0,5× a 2×, reverb y opción de mantener el tono. MP3 o WAV. En tu navegador, sin subir la canción.',
    heading: 'Sped up y',
    accent: 'slowed + reverb',
    lede: 'Las versiones de TikTok de una canción, hechas en tu dispositivo.',
    blurb: 'Versión sped up o slowed + reverb de una canción.',
    featureList: [
      'Presets: sped up 1,25×, slowed 0,8× con reverb',
      'Cualquier velocidad de 0,5× a 2×',
      'Como un tocadiscos o manteniendo el tono',
      'MP3 o WAV, sin subidas',
    ],
    faq: [
      {
        q: '¿Por qué suena más agudo?',
        a: 'Así suena el sped up: el tono sube con el tempo. Marca «Mantener el tono» para cambiar solo el tempo.',
      },
      {
        q: '¿Se sube la canción?',
        a: 'No. Tu navegador la procesa.',
      },
    ],
  },
  'remove-background-noise': {
    searchPhrase: 'Quitar ruido de fondo del audio online',
    title: 'Quitar ruido de fondo de audio y video online gratis — sin subir',
    description:
      'Quita el ruido de fondo de una grabación de voz o un video online y gratis: ventilador, zumbido, viento y tráfico se limpian de la voz con RNNoise, una red neuronal para voz que funciona en tu navegador. El video conserva la imagen; nada se sube.',
    heading: 'Quitar el ruido',
    accent: 'de fondo',
    lede: 'Limpia el ruido de la voz. El archivo se queda en tu dispositivo.',
    blurb: 'Quita zumbidos, viento y ruido de sala de la voz.',
    featureList: [
      'RNNoise (Xiph), supresor de ruido neuronal para voz',
      'Funciona con videos y grabaciones',
      'Control de intensidad',
      'Nada se sube',
    ],
    faq: [
      {
        q: '¿Qué ruido quita?',
        a: 'Ruido constante alrededor de la voz: ventiladores, aire acondicionado, zumbido, viento, tráfico. No es para música.',
      },
      {
        q: '¿Se sube mi archivo?',
        a: 'No. La red funciona en tu navegador con WebAssembly.',
      },
    ],
  },
  'audio-to-video': {
    searchPhrase: 'Convertir audio a video online',
    title: 'Audio a video online gratis — MP3 a MP4 con imagen para YouTube',
    description:
      'Convierte audio en video online y gratis: un MP3, M4A o WAV más una portada se convierten en un MP4 para YouTube, Shorts o Reels, con barras de nivel opcionales. En tu navegador, sin subir nada.',
    heading: 'Audio a',
    accent: 'video',
    lede: 'Una canción, un podcast o una nota de voz, listos para YouTube.',
    blurb: 'MP3 a MP4 para YouTube: portada, tu sonido y barras que se mueven con él.',
    featureList: [
      'Portada sobre una copia desenfocada, o fondo oscuro',
      'Barras de nivel animadas (opcional)',
      '16:9, 1:1 o 9:16',
      'Nada se sube',
    ],
    faq: [
      {
        q: '¿Por qué no puedo subir un MP3 a YouTube?',
        a: 'YouTube solo acepta video. Esto envuelve el sonido en un MP4 con imagen.',
      },
      {
        q: '¿Se sube mi archivo?',
        a: 'No. Tu navegador crea el video.',
      },
    ],
  },
  'blur-background-video': {
    searchPhrase: 'Video vertical con fondo desenfocado',
    title: 'Hacer un video vertical con fondo desenfocado online gratis — 9:16 sin recortar',
    description:
      'Convierte un video horizontal en 9:16 para Reels, TikTok y Shorts (o 4:5, 1:1) sin recortar: todo el encuadre queda en el centro y una copia desenfocada llena las bandas. Online, gratis, en tu navegador; sin subir nada.',
    heading: 'Video vertical con',
    accent: 'fondo desenfocado',
    lede: 'Nada recortado, sin barras negras.',
    blurb: 'Pasa un video horizontal a vertical sin recortar: un fondo desenfocado llena el resto.',
    featureList: [
      '9:16, 4:5, 1:1 o 16:9',
      'Todo el encuadre, centrado',
      'Bandas con una copia desenfocada',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿En qué se diferencia de recortar?',
        a: 'Recortar corta los lados. Esto conserva todo y llena el espacio con desenfoque.',
      },
      {
        q: '¿Se sube el video?',
        a: 'No. Tu navegador lo procesa.',
      },
    ],
  },
  'video-filters': {
    searchPhrase: 'Filtros de video online',
    title: 'Filtros de video online gratis — aclarar un video oscuro, blanco y negro, sin subir',
    description:
      'Aplica filtros a un video online y gratis: aclara un video oscuro, pásalo a blanco y negro, vivo, cálido, frío o vintage, o ajusta brillo, contraste, saturación y calidez con vista previa en vivo. En tu navegador, sin subir nada.',
    heading: 'Filtros de',
    accent: 'video',
    lede: 'Mira el resultado en tu clip antes de guardar.',
    blurb: 'Aclarar un video oscuro, blanco y negro, más cálido o vivo, con vista previa.',
    featureList: [
      'Presets: aclarar, blanco y negro, vivo, cálido, frío, vintage',
      'Brillo, contraste, saturación y calidez',
      'Vista previa en vivo',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Cómo aclaro un video muy oscuro?',
        a: 'Pulsa «Aclarar» y sube el brillo hasta que se vean las caras.',
      },
      {
        q: '¿Se sube el video?',
        a: 'No. Tu navegador aplica el filtro.',
      },
    ],
  },
  'split-screen-video': {
    searchPhrase: 'Dos videos en una pantalla online',
    title: 'Pantalla dividida online gratis — dos videos lado a lado, sin subir',
    description:
      'Pon dos videos en un mismo cuadro online y gratis: lado a lado (16:9) o uno sobre otro (9:16 para Reels y TikTok), sincronizados, con el sonido de uno o ambos. En tu navegador, sin subir nada.',
    heading: 'Pantalla',
    accent: 'dividida',
    lede: 'Dos clips, un cuadro, sincronizados.',
    blurb: 'Dos videos lado a lado o uno sobre otro, a la vez.',
    featureList: [
      'Lado a lado (1920x1080) o apilados (1080x1920)',
      'Cada clip llena su mitad sin deformarse',
      'Sonido del primero, el segundo o ambos',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Y si tienen distinta duración?',
        a: 'El resultado dura lo que el más corto.',
      },
      {
        q: '¿Se suben los videos?',
        a: 'No. Tu navegador los procesa.',
      },
    ],
  },
  'tiktok-captions': {
    searchPhrase: 'Subtítulos estilo TikTok',
    title: 'Subtítulos estilo TikTok online gratis — subtítulos grandes palabra a palabra, sin subir',
    description:
      'Añade subtítulos estilo TikTok y Reels a un video automáticamente, online y gratis: Whisper escucha la voz en tu navegador e incrusta subtítulos grandes en negrita, de 1 a 4 palabras, en el centro. Sin subir, sin marca de agua.',
    heading: 'Subtítulos',
    accent: 'estilo TikTok',
    lede: 'De la voz a subtítulos grandes en un paso.',
    blurb: 'Subtítulos grandes de pocas palabras en el centro, desde la voz.',
    featureList: [
      'Tiempos por palabra con Whisper, 1–4 palabras',
      'Blanco en negrita con contorno, centrado',
      '99 idiomas',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Puedo corregir una palabra?',
        a: 'Aquí no. Para controlar, crea un SRT con Subtítulos automáticos, corrígelo y grábalo con Añadir subtítulos al video.',
      },
      {
        q: '¿Se sube el video?',
        a: 'No. Todo funciona en tu navegador.',
      },
    ],
  },
  'fade-video': {
    searchPhrase: 'Fundido de entrada y salida online',
    title: 'Fundido de video online gratis — aparecer y desvanecer a negro, sin subir',
    description:
      'Añade un fundido desde negro y a negro a un video online y gratis, con el sonido. De 0,5 a 3 s en cada extremo. En tu navegador, sin subir.',
    heading: 'Fundido de entrada y salida',
    accent: 'de video',
    lede: 'Un inicio suave y un final limpio.',
    blurb: 'Fundido desde negro y a negro, con el sonido.',
    featureList: [
      'Fundido de 0,5 a 3 s en cada extremo',
      'El sonido se desvanece con la imagen',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿El sonido también?',
        a: 'Sí, en los mismos segundos.',
      },
      {
        q: '¿Se sube el video?',
        a: 'No. Tu navegador lo procesa.',
      },
    ],
  },
  'resize-video': {
    searchPhrase: 'Cambiar la resolución de un video online',
    title: 'Cambiar tamaño de video online gratis — 4K a 1080p, 720p, sin subir',
    description:
      'Cambia la resolución de un video online y gratis: 4K a 1080p, 1080p a 720p, 480p o 360p, vertical u horizontal, con su forma. En tu navegador, sin subir.',
    heading: 'Cambiar tamaño',
    accent: 'de video',
    lede: 'Menor resolución en un paso.',
    blurb: 'Cambia la resolución: 4K a 1080p, 1080p a 720p…',
    featureList: [
      'De 2160p a 360p',
      'Vertical u horizontal, forma conservada',
      'Nunca amplía',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Qué es 720p en vertical?',
        a: '720x1280: se elige el lado largo.',
      },
      {
        q: '¿Se sube el video?',
        a: 'No. Tu navegador lo procesa.',
      },
    ],
  },
  'remove-silence-from-video': {
    searchPhrase: 'Quitar silencios de un video online',
    title: 'Quitar silencios de video online gratis — jump cuts automáticos, sin subir',
    description:
      'Corta las pausas de un video hablado automáticamente, online y gratis: elige qué es silencio y qué pausa cortar, y obtén un MP4 más ágil. En tu navegador, sin subir.',
    heading: 'Quitar silencios',
    accent: 'del video',
    lede: 'Jump cuts automáticos para videos hablados.',
    blurb: 'Corta las pausas de un video hablado (jump cut).',
    featureList: [
      'Umbral de -50 a -30 dB',
      'Corta pausas de más de 0,3–1,2 s',
      'Uniones sin clics',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: 'Corta mis palabras.',
        a: 'Baja el umbral a -45 o -50 dB.',
      },
      {
        q: '¿Se sube el video?',
        a: 'No. Todo ocurre en tu navegador.',
      },
    ],
  },
  'boomerang-video': {
    searchPhrase: 'Boomerang con un video online',
    title: 'Crear boomerang online gratis — de cualquier video, sin subir',
    description:
      'Crea un boomerang de cualquier video online y gratis: los primeros segundos hacia adelante y atrás, de 1 a 5 veces, a 1x–2x. En tu navegador, sin subir.',
    heading: 'Crear',
    accent: 'boomerang',
    lede: 'Adelante, atrás, otra vez.',
    blurb: 'Convierte un clip corto en boomerang.',
    featureList: [
      'Adelante y atrás sin pausa',
      '1 a 5 repeticiones, 1x a 2x',
      'Primeros 6 segundos',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Por qué sin sonido?',
        a: 'El sonido al revés es ruido; los boomerangs son mudos.',
      },
      {
        q: '¿Se sube el video?',
        a: 'No.',
      },
    ],
  },
  'video-progress-bar': {
    searchPhrase: 'Barra de progreso en un video online',
    title: 'Añadir barra de progreso a un video online gratis — para Shorts, Reels y TikTok, sin subir',
    description:
      'Añade una barra de progreso a un video online y gratis: una barra fina arriba o abajo que se llena mientras se reproduce, en cinco colores. En tu navegador, sin subir.',
    heading: 'Barra de progreso',
    accent: 'para video',
    lede: 'Muestra cuánto falta.',
    blurb: 'Una barra fina en el borde que se llena con el video.',
    featureList: [
      'Se llena de izquierda a derecha',
      'Arriba o abajo, cinco colores',
      'Sonido y tamaño conservados',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Se sube el video?',
        a: 'No. Tu navegador lo procesa.',
      },
    ],
  },
  'cut-part-of-video': {
    searchPhrase: 'Quitar una parte de un video online',
    title: 'Quitar una parte de un video online gratis — cortar el medio, sin subir',
    description:
      'Corta una sección del medio de un video online y gratis: marca inicio y fin mientras lo ves, y lo de antes y después se une. En tu navegador, sin subir.',
    heading: 'Quitar una parte',
    accent: 'del video',
    lede: 'Marca lo que sobra; el resto se une.',
    blurb: 'Quita una sección del medio de un video.',
    featureList: [
      'Marca inicio y fin mientras miras',
      'Unión precisa al fotograma',
      'Sonido cortado con la imagen',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Diferencia con recortar?',
        a: 'Recortar conserva una parte; esto quita una parte y conserva los extremos.',
      },
      {
        q: '¿Se sube el video?',
        a: 'No.',
      },
    ],
  },
  'video-collage': {
    searchPhrase: 'Collage de videos online',
    title: 'Collage de videos online gratis — 2 a 4 videos en un cuadro, sin subir',
    description:
      'Crea un collage de videos online y gratis: de dos a cuatro clips en un cuadro 16:9, en cuadrícula, a la vez, con el sonido del primero. En tu navegador, sin subir.',
    heading: 'Collage',
    accent: 'de videos',
    lede: 'Varios momentos en un cuadro.',
    blurb: 'De dos a cuatro videos en cuadrícula, a la vez.',
    featureList: [
      '2, 3 o 4 clips en 1920x1080',
      'Cada clip llena su celda sin deformarse',
      'Sonido del primero',
      'Sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Se suben los videos?',
        a: 'No. Tu navegador los procesa.',
      },
    ],
  },
};
