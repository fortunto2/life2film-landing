import type { ToolTranslations } from '../tools-i18n';

/**
 * Spanish. Search wording follows the same rule as English: people type "online" and "gratis", so
 * the title says that rather than the more accurate "en tu navegador".
 */
export const es: ToolTranslations = {
  'video-compressor': {
    searchPhrase: 'Comprimir vídeo online',
    title: 'Comprimir Vídeo Online Gratis — a 10MB para Discord, 25MB para email',
    description:
      'Compresor de vídeo online y gratuito que alcanza un tamaño exacto: 10 MB para Discord, 16 MB para WhatsApp, 25 MB para email. Funciona en tu navegador: sin subir nada, sin límite de tamaño, sin marca de agua ni registro.',
    heading: 'Comprimir',
    accent: 'Vídeo',
    lede: 'Apunta a un tamaño — 10 MB para Discord, 25 MB para email — o simplemente baja la calidad. Se ejecuta en tu máquina, así que no hay límite de tamaño ni colas.',
    blurb: 'Reduce el peso de un archivo y mira exactamente lo que costó. Sin límite, porque no hay servidor.',
    featureList: [
      'Apunta a un tamaño de archivo exacto',
      'Ajustes para los límites de Discord, WhatsApp y email',
      'Estimación del tamaño antes de codificar',
      'Una segunda pasada corrige cualquier desvío',
      'Todo en el navegador — sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Puede alcanzar un tamaño exacto?',
        a: 'Para eso está el modo «ajustar a un tamaño». El peso de un archivo es su bitrate multiplicado por su duración, así que, conocida la duración, el bitrate necesario es pura aritmética. Los codificadores no obedecen un bitrate al pie de la letra —el control de tasa varía según el material—, de modo que si la primera pasada falla por más de un pequeño margen, se mide el error y se vuelve a codificar una vez con la cifra corregida. En la práctica queda a un par de puntos porcentuales del objetivo.',
      },
      {
        q: '¿Por qué 10 MB, 16 MB, 25 MB?',
        a: 'Son los muros con los que la gente choca: 10 MB es el límite gratuito de Discord, 16 MB el de WhatsApp, 25 MB el de Gmail y la mayoría de servidores de correo, y 50 MB el de Discord Nitro Basic. La herramienta apunta justo por debajo del límite y no exactamente a él, porque un archivo de 10,0 MB sigue siendo rechazado por un límite de 10 MB.',
      },
      {
        q: '¿Y si el objetivo es imposible?',
        a: 'Lo dice antes de empezar, e indica el tamaño mínimo honesto para ese vídeo. Meter una hora de metraje en 10 MB exigiría un bitrate que ninguna resolución sobrevive: una herramienta que produjera un archivo invisible y lo llamara éxito sería peor que una que se niega.',
      },
      {
        q: '¿Cuánto se reducirá mi archivo?',
        a: 'La estimación aparece antes de pulsar nada, a partir de los ajustes y la duración. El material recién salido de un móvil o una cámara suele grabarse muy por encima de lo que necesita, y reducciones del 60–90 % son habituales. Lo que ya se comprimió una vez tiene poco que dar, y la herramienta compara tu archivo con lo que su resolución necesita razonablemente y avisa cuando recodificar solo lo haría más grande.',
      },
      {
        q: '¿Qué hace pequeño a un vídeo?',
        a: 'Menos píxeles y menos bits por píxel. La resolución es la palanca contundente y fiable: pasar de 4K a 1080p elimina tres cuartas partes de los píxeles antes siquiera de hablar de calidad. El bitrate decide después cuánto detalle sobrevive. Quitar el audio ayuda poco: rara vez supera un pequeño porcentaje de un archivo de vídeo.',
      },
      {
        q: '¿Se sube a algún sitio?',
        a: 'No. Funciona con WebCodecs en tu navegador, que es lo que lo hace práctico: subir un gigabyte para que un servidor devuelva 200 MB es más lento que hacerlo localmente, y de paso deja tu material en el disco de otra persona. Sin límite de tamaño, sin cola y sin marca de agua, porque no hay servidor que los imponga.',
      },
    ],
  },

  'video-trimmer': {
    searchPhrase: 'Cortar vídeo online',
    title: 'Cortar Vídeo Online Gratis — sin recodificar, sin perder calidad',
    description:
      'Recortador de vídeo online y gratuito que conserva la calidad original: la imagen se copia, no se recodifica. Funciona en tu navegador — sin subir nada, sin marca de agua ni registro.',
    heading: 'Cortar',
    accent: 'Vídeo',
    lede: 'Arrastra los tiradores hasta la parte que quieres y guárdala — con la imagen copiada intacta, sin pérdida alguna. Tu archivo nunca sale de tu equipo.',
    blurb: 'Arrastra los tiradores hasta la parte que quieres, previsualízala y guárdala. El audio queda sincronizado.',
    featureList: [
      'Corte sin pérdidas: copia el vídeo sin recodificarlo',
      'Recodificación exacta al fotograma cuando el punto de corte importa',
      'Cortar ajustándose a un tamaño de archivo',
      'Vista previa en vivo de la selección',
      'Todo en el navegador — sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Se pierde calidad al cortar?',
        a: 'No en el modo por defecto. «Misma calidad — sin recodificar» deja pasar la imagen intacta, así que no hay pérdida de generación y termina varias veces más rápido: 0,20 s frente a 0,60 s al recodificar los mismos tres segundos. El precio es el tamaño: el vídeo se comprime en grupos que empiezan en un fotograma clave, de modo que si tu punto de entrada cae a mitad de grupo, el archivo arrastra los fotogramas hasta el anterior. La reproducción empieza exactamente donde lo marcaste, pero el archivo puede pesar más que una recodificación del mismo tramo.',
      },
      {
        q: '¿Cuándo conviene recodificar?',
        a: 'Cuando quieras el archivo más pequeño posible, o un formato distinto. Al recodificar solo se escriben los fotogramas seleccionados, así que un corte a mitad de grupo sale bastante más ligero: en pruebas, 4,1 MB frente a 6,7 MB para los mismos tres segundos. Cuesta una generación de compresión, que a la calidad usada aquí no se aprecia.',
      },
      {
        q: '¿Puede cortar ajustándose a un tamaño?',
        a: 'Sí: elige «ajustar a un tamaño» y un límite, por ejemplo 10 MB para Discord o 25 MB para email. El bitrate necesario se deduce de la duración de tu selección, así que una selección más corta admite más calidad dentro del mismo límite. Si la primera pasada falla, se corrige y se recodifica una vez.',
      },
      {
        q: '¿Se conserva el audio?',
        a: 'Sí, sincronizado y recortado al mismo tramo. Puedes quitarlo a propósito con la casilla «quitar audio», útil cuando el clip va a un sitio donde el sonido sobra, y además reduce el archivo.',
      },
      {
        q: '¿Qué archivos funcionan?',
        a: 'MP4 y MOV con H.264, y WebM: lo que tu navegador pueda decodificar y codificar. Los formatos nativos de cámara como ProRes o raw normalmente no los abre un navegador; transcodifica antes una copia de trabajo.',
      },
    ],
  },

  'video-to-mp3': {
    searchPhrase: 'Convertidor de vídeo a MP3',
    title: 'Vídeo a MP3 — convertidor online gratis, sin subir nada',
    description:
      'Convertidor de vídeo a MP3 online y gratuito. Extrae el audio de MP4, MOV o WebM como MP3, WAV u OGG enteramente en tu navegador: sin subidas, sin límite de tamaño, sin marca de agua ni registro.',
    heading: 'Vídeo a',
    accent: 'MP3',
    lede: 'Saca el sonido de un vídeo y guárdalo como MP3, WAV u OGG. No se sube nada: la conversión ocurre en tu equipo.',
    blurb: 'Extrae el audio de un vídeo y consérvalo como MP3, WAV u OGG.',
    featureList: [
      'Extrae audio de MP4, MOV y WebM',
      'Salida en MP3, WAV y OGG',
      'Elige bitrate y mono',
      'Todo en el navegador — sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Se sube mi vídeo?',
        a: 'No. El navegador decodifica el archivo y codifica el audio localmente, así que nada sale de tu equipo. Aquí importa más que en otras conversiones: el motivo para extraer el audio de un vídeo suele ser que el vídeo es personal —una clase, una entrevista, una grabación tuya— y no tiene por qué pasar por el servidor de nadie para responder algo que tu portátil responde solo.',
      },
      {
        q: '¿Qué formato elijo?',
        a: 'MP3 si va a cualquier sitio: lo reproduce todo, y a 192 kbps es transparente para voz y casi para música. WAV si el audio va a un editor o a una herramienta de transcripción, porque no está comprimido y no pierde nada. OGG (Vorbis) pesa menos que MP3 a igual calidad, pero está menos aceptado fuera de navegadores y Android.',
      },
      {
        q: '¿Qué bitrate necesito?',
        a: 'Para voz, 96–128 kbps sobran y reducen el archivo a la mitad frente al valor por defecto. Para música, 192 kbps es el punto habitual y 320 es el máximo de MP3. Pedir más de lo que se grabó no aporta nada: convertir un pódcast de 128 kbps a 320 kbps produce un archivo dos veces y media mayor que suena idéntico.',
      },
      {
        q: '¿Por qué pesa tanto mi WAV?',
        a: 'Porque no está comprimido: unos 10 MB por minuto en estéreo a 44,1 kHz, sea cual sea el contenido. Ese es justamente su propósito: no se descarta nada. Si el tamaño es un problema y el audio no va a un editor, MP3 ocupa una veinteava parte y no notarás la diferencia.',
      },
      {
        q: '¿Puedo convertir solo una parte del vídeo?',
        a: 'En esta página no: convierte el archivo entero. Recorta antes el vídeo con el recortador y convierte el resultado, o convierte todo y corta el audio en la herramienta a la que lo lleves.',
      },
    ],
  },

  'remove-audio-from-video': {
    searchPhrase: 'Quitar audio de un video online',
    title: 'Quitar el audio de un video online gratis — sin recodificar',
    description:
      'Quita el sonido de un video online y gratis: se elimina la pista de audio y la imagen se copia sin recodificar, con la misma calidad. Todo en tu navegador, sin subir nada ni marcas de agua.',
    heading: 'Quitar audio',
    accent: 'del video',
    lede: 'Elimina la pista de sonido y deja la imagen intacta. No se sube nada ni se recodifica.',
    blurb: 'Video sin sonido: se quita la pista y la imagen se copia sin perder calidad.',
    featureList: [
      'Quita el audio de MP4, MOV y WebM',
      'Copia la imagen sin recodificar: misma calidad, en segundos',
      'Todo en el navegador: sin subidas, sin marcas de agua, sin límite de tamaño',
    ],
    faq: [
      {
        q: '¿Pierde calidad el video?',
        a: 'No. La imagen pasa al nuevo archivo fotograma a fotograma; solo falta la pista de sonido. Si tu navegador no puede copiar ese códec en el contenedor, la herramienta recodifica la imagen y lo dice.',
      },
      {
        q: '¿Se sube mi video?',
        a: 'No. Tu navegador lee y escribe el archivo con WebCodecs; nada sale de tu dispositivo. Por eso no hay límite de tamaño más allá de la memoria del navegador.',
      },
      {
        q: '¿Puedo guardar el audio aparte?',
        a: 'Sí, con la herramienta de video a MP3 de este sitio: hace lo contrario, conserva el sonido y quita la imagen.',
      },
    ],
  },
  'rotate-video': {
    searchPhrase: 'Rotar video online',
    title: 'Rotar video online gratis — girar 90° o voltear, sin recodificar',
    description:
      'Gira un video 90°, 180° o 270°, o voltéalo, online y gratis. El giro se guarda en el archivo sin recodificar, con la misma calidad; o dibújalo en los fotogramas para reproductores que ignoran la rotación. En tu navegador, sin subir nada.',
    heading: 'Rotar',
    accent: 'video',
    lede: 'Endereza un video grabado de lado en segundos. No se sube nada y, por defecto, no se recodifica.',
    blurb: 'Gira un video grabado de lado o voltéalo, sin recodificar.',
    featureList: [
      'Gira 90° a la derecha, 90° a la izquierda o 180°, y voltea en horizontal',
      'Sin pérdidas por defecto: el giro se guarda en el archivo y los fotogramas se copian',
      'Opcional: dibujar el giro en los fotogramas para reproductores que lo ignoran',
    ],
    faq: [
      {
        q: '¿Pierde calidad al rotar?',
        a: 'Por defecto no. El archivo lleva una marca de rotación que leen los reproductores: la herramienta la fija y copia los fotogramas tal cual. Si marcas «dibujar el giro en los fotogramas», la imagen se recodifica y pierde un poco de calidad una vez.',
      },
      {
        q: '¿Por qué en alguna app sigue de lado?',
        a: 'Algunos reproductores y formularios de subida ignoran la marca de rotación. Para ellos, rota de nuevo con «dibujar el giro en los fotogramas» marcado.',
      },
      {
        q: '¿Se sube mi video?',
        a: 'No. Tu navegador lee y escribe el archivo con WebCodecs; nada sale de tu dispositivo.',
      },
    ],
  },
  'video-info': {
    searchPhrase: 'Ver bitrate de video online',
    title: 'Ver el bitrate de video y audio online gratis — códec, FPS, resolución',
    description:
      'Consulta el bitrate, el códec, los fotogramas por segundo, la resolución, el HDR y la frecuencia de muestreo de un video o audio, online y gratis. Se lee en tu navegador: el archivo no se sube.',
    heading: 'Información',
    accent: 'del video',
    lede: 'Suelta un archivo y mira qué hay dentro: bitrate, códec, FPS, resolución, audio. No se sube nada.',
    blurb: 'Bitrate, códec, FPS, resolución y datos de audio de cualquier archivo.',
    featureList: [
      'Bitrate total, de video y de audio',
      'Códec, resolución, FPS, rotación y HDR',
      'Canales y frecuencia de muestreo del audio',
      'Todo en el navegador: sin subidas',
    ],
    faq: [
      {
        q: '¿Cómo se mide el bitrate?',
        a: 'Desde el propio archivo: el tamaño de los paquetes de cada pista entre su duración, con hasta 600 paquetes. El bitrate total es el tamaño del archivo entre su duración e incluye el contenedor.',
      },
      {
        q: '¿Se sube mi archivo?',
        a: 'No. Tu navegador lee solo las partes que necesita; nada sale de tu dispositivo.',
      },
    ],
  },
  'crop-video': {
    searchPhrase: 'Recortar video online',
    title: 'Recortar video online gratis — 9:16 para Reels y TikTok, 1:1, 4:5',
    description:
      'Recorta un video a 9:16 para Reels, TikTok y Shorts, o a 1:1, 4:5 o 16:9, online y gratis. Desliza el marco para conservar lo importante. En tu navegador, sin subir nada ni marcas de agua.',
    heading: 'Recortar',
    accent: 'video',
    lede: 'Convierte un clip horizontal en vertical o cuadrado y elige qué parte queda. No se sube nada.',
    blurb: 'Recorta un video horizontal a 9:16 para Reels, TikTok y Shorts, o a cuadrado.',
    featureList: [
      'Formatos 9:16, 1:1, 4:5 y 16:9',
      'Desliza el marco para mantener al protagonista',
      'Conserva la resolución original de la zona recortada',
      'Todo en el navegador: sin subidas ni marcas de agua',
    ],
    faq: [
      {
        q: '¿Cómo pongo vertical un video horizontal para Reels o TikTok?',
        a: 'Elige 9:16, desliza el marco sobre la parte que quieres conservar y recorta. Obtienes la zona 9:16 más alta de tu video a su propio tamaño; Instagram y TikTok la escalan a pantalla completa.',
      },
      {
        q: '¿Pierde calidad?',
        a: 'Los píxeles conservados no se escalan, pero recortar siempre recodifica la imagen, lo que cuesta un poco de calidad una vez.',
      },
      {
        q: '¿Se sube mi video?',
        a: 'No. Tu navegador decodifica, recorta y codifica el video con WebCodecs; nada sale de tu dispositivo.',
      },
    ],
  },
  'video-to-gif': {
    searchPhrase: 'Video a GIF online',
    title: 'Video a GIF online gratis — MP4 a GIF sin subir ni marca de agua',
    description:
      'Convierte un video en GIF online y gratis: elige el inicio, la duración, los fotogramas por segundo y el ancho. MP4, MOV y WebM. Se hace en tu navegador: no se sube nada y no hay marca de agua.',
    heading: 'Video',
    accent: 'a GIF',
    lede: 'Elige un momento y conviértelo en GIF. El video se queda en tu dispositivo.',
    blurb: 'Unos segundos de video en GIF: inicio, duración, FPS y ancho.',
    featureList: [
      'MP4, MOV y WebM a GIF',
      'Inicio, hasta 15 s, 10–20 FPS, 320–640 px de ancho',
      'Una paleta por fotograma: los colores aguantan',
      'Todo en el navegador: sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Cómo hago un GIF más ligero?',
        a: 'Más corto, más estrecho y con menos FPS, en ese orden. Un GIF de 4 s a 480 px y 15 FPS suele pesar 2–6 MB; a 320 px y 10 FPS, un tercio.',
      },
      {
        q: '¿Se sube mi video?',
        a: 'No. Tu navegador lee los fotogramas y escribe el GIF; nada sale de tu dispositivo.',
      },
    ],
  },
  'add-music-to-video': {
    searchPhrase: 'Poner música a un video online',
    title: 'Poner música a un video online gratis — sin marca de agua ni subidas',
    description:
      'Añade música a un video online y gratis: elige un MP3 o M4A, desde qué segundo empieza la canción y un fundido final. La imagen se copia sin recodificar y la canción se corta a la duración del video. En tu navegador.',
    heading: 'Poner música',
    accent: 'a un video',
    lede: 'Pon tu canción bajo tu clip, cortada a medida y con fundido al final. No se sube nada.',
    blurb: 'Una canción bajo un video, a su duración y con fundido, sin recodificar la imagen.',
    featureList: [
      'Música desde MP3, M4A, WAV, OGG o el sonido de otro video',
      'Elige dónde empieza la canción; fundido de 0–4 s',
      'La imagen se copia intacta: misma calidad, rápido',
      'Todo en el navegador: sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Se conserva el sonido original?',
        a: 'No: la música lo sustituye.',
      },
      {
        q: '¿Y si la canción es más corta que el video?',
        a: 'La música suena una vez y el resto queda en silencio; la herramienta te dice dónde se acabó.',
      },
      {
        q: '¿Puede montar el video al ritmo de la canción?',
        a: 'Esta página no: pone la canción bajo un clip tal cual. Montar varios clips al ritmo lo hace la app Life2Film para iPhone.',
      },
    ],
  },
  'merge-videos': {
    searchPhrase: 'Unir videos online',
    title: 'Unir videos online gratis — juntar clips MP4 y MOV sin subir ni marca de agua',
    description:
      'Une videos online y gratis: junta dos o más clips MP4, MOV o WebM en un solo archivo en el orden que elijas. Los tamaños distintos se encajan en un solo cuadro. En tu navegador, sin subir nada ni marca de agua.',
    heading: 'Unir',
    accent: 'videos',
    lede: 'Pon los clips uno tras otro y obtén un solo video. Nada sale de tu dispositivo.',
    blurb: 'Junta dos o más videos en un archivo, en el orden que quieras.',
    featureList: [
      'Une cualquier número de clips MP4, MOV y WebM',
      'Cambia el orden antes de unir',
      'Los clips de otra forma se encajan con bandas',
      'Los clips sin sonido aportan silencio: imagen y sonido no se desfasan',
      'Todo en el navegador: sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Puedo unir videos de distintos tamaños o teléfonos?',
        a: 'Sí. Cada fotograma se encaja en el cuadro del primer clip (con bandas negras si la forma cambia) y la película se codifica una vez.',
      },
      {
        q: '¿Puede elegir las mejores partes y montarlas con música?',
        a: 'Esta página no: une los clips enteros. Elegir los mejores momentos y montarlos con una canción lo hace la app Life2Film para iPhone.',
      },
    ],
  },
  'video-speed': {
    searchPhrase: 'Acelerar video online',
    title: 'Cambiar la velocidad de un video online gratis — acelerar o cámara lenta',
    description:
      'Acelera un video (de 1,25× a 8×) o ralentízalo (de 0,25× a 0,75×) online y gratis. Conserva el sonido, acelerado con la imagen, o quítalo. En tu navegador: no se sube nada, sin marca de agua.',
    heading: 'Velocidad',
    accent: 'del video',
    lede: 'Haz un video más rápido o más lento en un par de clics. Nada sale de tu dispositivo.',
    blurb: 'Acelera un video hasta 8× o ralentízalo hasta 0,25×, con o sin sonido.',
    featureList: [
      'De cámara lenta 0,25× a rápido 8×',
      'Sonido conservado y ajustado con la imagen, o quitado',
      'Cada fotograma conserva su imagen: nada se mezcla ni se inventa',
      'Todo en el navegador: sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿La cámara lenta queda fluida?',
        a: 'Cada fotograma real se muestra más tiempo: un clip de 30 fps a 0,5× va a 15 fps. La cámara lenta fluida sale de vídeo grabado a 120 o 240 fps.',
      },
      {
        q: '¿Qué pasa con el sonido?',
        a: 'Con «conservar el sonido» va más rápido o más lento con la imagen y su tono sube o baja, como una cinta.',
      },
    ],
  },
  'screen-recorder': {
    searchPhrase: 'Grabar pantalla online',
    title: 'Grabador de pantalla online gratis — sin instalar, sin marca de agua ni límite de tiempo',
    description:
      'Graba tu pantalla online gratis: toda la pantalla, una ventana o una pestaña del navegador, con el sonido del sistema y tu micrófono. Sin instalar, sin marca de agua, sin límite de tiempo y sin subir nada: la grabación se guarda en tu ordenador en MP4 o WebM.',
    heading: 'Grabar',
    accent: 'pantalla',
    lede: 'Graba tu pantalla en el navegador y obtén el archivo en tu ordenador. No se instala ni se sube nada.',
    blurb: 'Graba la pantalla, una ventana o una pestaña, con sonido y micrófono, directo a un archivo.',
    featureList: [
      'Toda la pantalla, una ventana o una pestaña',
      'Sonido de la pestaña o del sistema y micrófono en una pista',
      'MP4 donde el navegador puede (Chrome, Edge, Safari), si no WebM',
      'Sin límite de tiempo ni marca de agua',
    ],
    faq: [
      {
        q: '¿Hay límite de tiempo o marca de agua?',
        a: 'Ninguno de los dos. La grabación la hace tu navegador y se guarda en tu ordenador.',
      },
      {
        q: '¿Puede grabar el sonido del ordenador?',
        a: 'En Chrome y Edge sí: comparte una pestaña con «Compartir audio de la pestaña» o, en Windows, toda la pantalla con «Compartir audio del sistema».',
      },
      {
        q: '¿Funciona en el móvil?',
        a: 'No. Los navegadores móviles no pueden compartir la pantalla.',
      },
    ],
  },
  'audio-cutter': {
    searchPhrase: 'Cortar MP3 online',
    title: 'Cortar MP3 online gratis — recortar una canción, hacer un tono, sin subir',
    description:
      'Corta MP3, M4A, WAV, OGG o FLAC online y gratis: escucha, marca el inicio y el final, añade un fundido suave y guarda en MP3 o WAV. Sirve para tonos y reels. En tu navegador: no se sube nada.',
    heading: 'Cortar',
    accent: 'audio',
    lede: 'Escucha, marca el inicio y el final y guarda el trozo. La canción no sale de tu dispositivo.',
    blurb: 'Corta un trozo de una canción para un tono, un reel o un montaje, con fundido suave.',
    featureList: [
      'MP3, M4A, WAV, OGG, FLAC o el sonido de un video',
      'Inicio y final desde el reproductor',
      'Fundido de medio segundo en ambos extremos, sin clics',
      'Guarda en MP3 (192 kbps) o WAV',
    ],
    faq: [
      {
        q: '¿Cómo hago un tono con una canción?',
        a: 'Corta 20–30 segundos con fundido y guarda en MP3. En Android ponlo en la carpeta Ringtones o elígelo en Ajustes.',
      },
      {
        q: '¿Se sube mi canción?',
        a: 'No. Tu navegador decodifica y codifica el audio.',
      },
    ],
  },
  'audio-converter': {
    searchPhrase: 'Convertidor de audio online',
    title: 'Convertidor de audio online gratis — M4A, WAV, FLAC a MP3 sin subir',
    description:
      'Convierte audio online gratis: M4A, WAV, FLAC, OGG, AAC o el sonido de un video a MP3, WAV u OGG con el bitrate que elijas. En tu navegador, sin subir nada y sin límite de tamaño.',
    heading: 'Convertidor',
    accent: 'de audio',
    lede: 'Cambia el formato de un audio sin enviarlo a ninguna parte.',
    blurb: 'M4A, WAV, FLAC, OGG y más a MP3, WAV u OGG, con el bitrate que elijas.',
    featureList: [
      'Entrada: M4A, WAV, FLAC, OGG, AAC, MP3 y videos',
      'Salida: MP3, WAV u OGG con bitrate a elegir',
      'Todo en el navegador: sin subidas ni límite',
    ],
    faq: [
      {
        q: '¿Cómo convierto M4A a MP3?',
        a: 'Suelta el M4A, elige MP3 y un bitrate (192 kbps va bien) y convierte. Las notas de voz del iPhone también son M4A.',
      },
      {
        q: '¿Un bitrate mayor mejora el sonido?',
        a: 'No. Un archivo no recupera lo que perdió al comprimirse; solo ocupa más.',
      },
    ],
  },
  'reverse-video': {
    searchPhrase: 'Invertir video online',
    title: 'Invertir video online gratis — reproducir un video al revés, sin subir',
    description:
      'Invierte un video online gratis: el clip se reproduce al revés y el sonido también puede invertirse. Clips de hasta 60 segundos. En tu navegador, sin subir nada.',
    heading: 'Invertir',
    accent: 'video',
    lede: 'Haz que un clip se reproduzca al revés. Nada sale de tu dispositivo.',
    blurb: 'Un clip al revés, con el sonido invertido o sin él.',
    featureList: [
      'Clips de hasta 60 segundos',
      'Sonido invertido o quitado',
      'Todo en el navegador: sin subidas',
    ],
    faq: [
      {
        q: '¿Por qué solo 60 segundos?',
        a: 'Invertir exige decodificar todo el clip antes de escribir el primer fotograma; en una pestaña cabe un minuto con holgura.',
      },
    ],
  },
  'video-volume-booster': {
    searchPhrase: 'Aumentar volumen de video online',
    title: 'Aumentar el volumen de un video online gratis — más alto, sin subir',
    description:
      'Sube el volumen de un video online gratis: automático al máximo sin distorsión, o ×1.5 a ×4, o bájalo. La imagen se copia intacta. En tu navegador, sin subir nada.',
    heading: 'Subir el volumen',
    accent: 'del video',
    lede: 'Sube el sonido de un clip bajo sin recodificar la imagen ni enviarlo.',
    blurb: 'Un video bajo más alto sin chasquidos, o uno alto más bajo. La imagen no se toca.',
    featureList: [
      'Auto: el momento más fuerte llega justo bajo el máximo',
      'O ×1.5, ×2, ×3, ×4, o ×0.5 para bajarlo',
      'Limitador suave en vez de recorte, sin chasquidos',
      'La imagen se copia sin pérdida',
    ],
    faq: [
      {
        q: '¿El video pierde calidad?',
        a: 'No. Solo se recodifica el sonido; la imagen se copia tal cual.',
      },
      {
        q: '¿Se sube mi video?',
        a: 'No. Tu navegador lo hace todo.',
      },
    ],
  },
  'loop-video': {
    searchPhrase: 'Video en bucle online',
    title: 'Poner un video en bucle online gratis — repetir 2-10 veces, sin subir',
    description:
      'Pon un video en bucle online gratis: repite un clip 2, 3, 4, 5 o 10 veces en un MP4, con su sonido. En tu navegador, sin subir nada.',
    heading: 'Video en',
    accent: 'bucle',
    lede: 'Convierte un clip corto en uno más largo que se repite. Nada sale de tu dispositivo.',
    blurb: 'Repite un clip de 2 a 10 veces en un archivo, con sonido.',
    featureList: [
      'Repite 2, 3, 4, 5 o 10 veces',
      'El sonido se repite con la imagen',
      'Todo en el navegador: sin subidas',
    ],
    faq: [
      {
        q: '¿Se sube mi video?',
        a: 'No. Tu navegador lo decodifica y codifica.',
      },
    ],
  },
  'video-converter': {
    searchPhrase: 'Convertidor de vídeo online',
    title: 'Convertidor de Vídeo Online Gratis — MP4, WebM, MOV sin subir nada',
    description:
      'Convertidor de vídeo online y gratuito para MP4, WebM y MOV, o extrae el audio como WAV. Convierte en tu navegador con WebCodecs: sin subidas, sin límite de tamaño, sin marca de agua ni registro.',
    heading: 'Convertir',
    accent: 'Vídeo',
    lede: 'Cambia de formato sin entregarle el archivo a nadie. MP4, WebM, MOV — o extrae solo el audio.',
    blurb: 'MP4, WebM y MOV en cualquier dirección — o extrae el audio como WAV.',
    featureList: [
      'Conversión entre MP4, WebM y MOV',
      'Extrae el audio como WAV',
      'Redimensionado opcional al convertir',
      'Todo en el navegador — sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿Qué conversiones admite?',
        a: 'Entre MP4, WebM y MOV, y de cualquiera de ellos a audio WAV. Lo que realmente funciona depende de tu navegador, porque la codificación la hace él: Chrome y Edge cubren más terreno, Safari maneja bien MP4 y MOV. La herramienta lo comprueba antes de empezar y avisa si una combinación no está disponible, en lugar de fallar a mitad de camino.',
      },
      {
        q: '¿Por qué mi navegador no abre un MOV de mi cámara?',
        a: 'Un .mov es un contenedor, y lo que importa es el códec que lleva dentro. Los navegadores manejan H.264 y, cada vez más, HEVC, pero no ProRes, DNxHD ni formatos raw de cámara, que es lo que las cámaras profesionales suelen escribir en un .mov. Eso necesita antes una transcodificación real desde una aplicación de escritorio.',
      },
      {
        q: '¿Se pierde calidad al convertir?',
        a: 'Cambiar de contenedor entre MP4 y MOV a menudo se puede hacer sin tocar el vídeo. Cambiar de códec —a WebM, por ejemplo— obliga a recodificar, y recodificar siempre cuesta algo. Suele ser invisible en una generación, y se acumula si conviertes el mismo archivo una y otra vez.',
      },
      {
        q: '¿Se sube algo?',
        a: 'No. La conversión usa WebCodecs en tu navegador. Ese es el sentido de hacerlo así: convertir un archivo grande subiéndolo, esperando una cola y descargándolo de vuelta es más lento que hacerlo localmente, y por el camino deja tu material en el disco de un desconocido.',
      },
    ],
  },

  'video-splitter': {
    searchPhrase: 'Dividir vídeo online',
    title: 'Dividir Vídeo en Partes Online Gratis — partes iguales o por escenas',
    description:
      'Divisor de vídeo online y gratuito que corta un vídeo largo en partes por sus cambios de plano en vez de cada 30 segundos, ordenadas por calidad de imagen. Recorte 9:16 opcional para Reels, Shorts y TikTok. No se sube nada.',
    heading: 'Dividir',
    accent: 'Vídeo',
    lede: 'Corta un vídeo largo en clips que empiezan donde el vídeo cambia — no cada treinta segundos. Todo ocurre en tu equipo.',
    blurb: 'Corta un vídeo largo en Reels o Shorts que empiezan en un cambio de plano, ordenados por calidad de imagen.',
    featureList: [
      'Corta en los cambios de plano, no a intervalo fijo',
      'Clips ordenados por calidad de imagen',
      'Recorte 9:16 opcional para Reels, Shorts y TikTok',
      'Todo en el navegador — sin subidas ni marca de agua',
    ],
    faq: [
      {
        q: '¿En qué se diferencia de otros divisores de vídeo?',
        a: 'La mayoría corta cada N segundos, así que un clip puede empezar a media frase y terminar a medio gesto. Este busca los cortes que el vídeo ya tiene —los cambios de plano— y construye los clips con planos enteros. Tú sigues eligiendo la duración aproximada; los límites caen en el cambio real más cercano en lugar de en un cronómetro.',
      },
      {
        q: '¿Qué son las estrellas de cada clip?',
        a: 'El motor puntúa cada fotograma muestreado por nitidez, exposición, contraste, colorido y detalle, y cada clip recibe la media ponderada por duración de los planos que contiene. Las estrellas son relativas al mejor clip de ese vídeo, no una escala absoluta: sugieren por dónde empezar a mirar, no dictan qué es interesante.',
      },
      {
        q: '¿El recorte vertical dejará gente fuera de cuadro?',
        a: 'Toma el centro del encuadre, que acierta la mayoría de las veces y falla cuando el sujeto está a un lado. Aquí todavía no hay seguimiento de caras, así que revisa las vistas previas antes de publicar. Si un plano es muy abierto, suele salir mejor recortarlo a mano.',
      },
      {
        q: '¿Se sube el vídeo?',
        a: 'No. El navegador lo decodifica, WebAssembly analiza los fotogramas y los clips se recodifican localmente con WebCodecs, la misma ruta de hardware que usa tu navegador para reproducir vídeo. No se envía nada a ninguna parte, y por eso tampoco hay límites de plan, colas ni marca de agua.',
      },
    ],
  },

  'bpm-detector': {
    searchPhrase: 'Detector de BPM online',
    title: 'Detector de BPM Online Gratis — tempo y cada tiempo de una canción',
    description:
      'Detector de BPM online y gratuito: obtén el tempo de una pista y el momento exacto de cada tiempo, en tu navegador. Exporta la rejilla a DaVinci Resolve, Premiere, Final Cut o Audacity. No se sube nada.',
    heading: 'Detector de',
    accent: 'BPM',
    lede: 'Suelta una pista. Obtén su tempo y el momento exacto de cada tiempo — calculado en tu propio equipo, sin subir nada.',
    blurb: 'Encuentra el tempo de una pista y el momento de cada tiempo, y envía la rejilla a Resolve, Premiere, Final Cut o Audacity como marcadores.',
    featureList: [
      'Detección de tempo (BPM)',
      'Marca de tiempo de cada tiempo musical',
      'Todo en el navegador — sin subidas',
      'Exporta a EDL, OTIO, FCPXML, etiquetas de Audacity, CSV y JSON',
      'Código de tiempo según los fotogramas por segundo del proyecto',
    ],
    faq: [
      {
        q: '¿Se sube mi audio a algún sitio?',
        a: 'No. El análisis corre dentro de tu navegador como WebAssembly. El archivo se lee del disco a memoria y nunca sale por la red: puedes comprobarlo abriendo la pestaña de red, o desconectando una vez cargada la página.',
      },
      {
        q: '¿Qué precisión tiene?',
        a: 'Usa análisis de intensidad de ataques con seguimiento de pulso por programación dinámica, el mismo enfoque que las herramientas consolidadas de recuperación de información musical y el mismo código que mueve el motor de montaje de Life2Film. Con música de pulso estable acierta dentro de un tiempo. Con rubato, grabaciones en directo sin claqueta o material muy sincopado, tómalo como punto de partida.',
      },
      {
        q: '¿Qué significa «mitad o doble de tempo»?',
        a: 'El tempo es ambiguo por naturaleza: una pista a 140 BPM también es, correctamente, 70 BPM contada a mitad de tiempo. Los detectores eligen lo que más pesa en la señal. Si el número parece justo el doble o la mitad, es eso lo que ha pasado, y se muestran ambas lecturas para que tomes la que necesitas.',
      },
      {
        q: '¿Puedo usar los tiempos en mi editor?',
        a: 'Para eso está la exportación. EDL es la opción para DaVinci Resolve o Premiere: cada tiempo llega como un marcador con nombre en la línea de tiempo. Final Cut toma el FCPXML. OTIO funciona también en Resolve, Avid y Premiere, y es lo indicado si los tiempos van a una cadena de producción más que directamente a una línea de tiempo. Audacity lee la exportación de etiquetas, y CSV o JSON cubren hojas de cálculo y scripts.',
      },
      {
        q: '¿Por qué importan los fotogramas por segundo?',
        a: 'Los tiempos caen en fracciones de segundo; las líneas de tiempo cuentan fotogramas enteros. Cada marcador se redondea al fotograma más cercano del proyecto al que va, así que una rejilla exportada a 25 fps quedará hasta 20 ms desplazada en una secuencia a 30 fps. Ajusta la tasa a la de tu proyecto y los marcadores caen justo donde está el tiempo. No afecta a CSV ni JSON, que llevan además los segundos en bruto.',
      },
    ],
  },

  'scene-detector': {
    searchPhrase: 'Detección de escenas online',
    title: 'Detector de Escenas Online Gratis — encuentra cada corte de un vídeo',
    description:
      'Detección de escenas online y gratuita: encuentra cada cambio de plano de un vídeo con miniaturas y códigos de tiempo, y expórtalo como EDL, OTIO, FCPXML o CSV. Funciona en tu navegador — no se sube nada.',
    heading: 'Detector de',
    accent: 'Escenas',
    lede: 'Suelta un vídeo. Obtén cada corte, con una miniatura y un código de tiempo por plano — encontrado en tu propio equipo, sin subir nada.',
    blurb: 'Encuentra cada corte de un vídeo y obtén la lista de planos con miniaturas, códigos de tiempo y puntuación de calidad.',
    featureList: [
      'Detección de cambios de plano',
      'Puntuación de calidad por plano',
      'Miniaturas de cada plano',
      'Todo en el navegador — sin subidas',
      'Exporta a EDL, OTIO, FCPXML, etiquetas de Audacity, CSV y JSON',
    ],
    faq: [
      {
        q: '¿Se sube el vídeo?',
        a: 'No. El navegador lo decodifica localmente, un lienzo lee los píxeles y WebAssembly los compara. No se envía nada a ninguna parte: esta página no tiene servidor al que enviarlo. Por eso tampoco hay límite de tamaño ni cola.',
      },
      {
        q: '¿Cómo encuentra los cortes?',
        a: 'Muestrea fotogramas a lo largo del vídeo y observa cuánto cambia la imagen de una muestra a la siguiente. Un corte es una discontinuidad: color y luminancia saltan de golpe, en lugar de derivar como lo hacen en una panorámica o un fundido. El detector busca esos saltos y devuelve los límites entre ellos.',
      },
      {
        q: '¿Detecta fundidos y encadenados?',
        a: 'En parte. Un corte seco es inequívoco y se encuentra con fiabilidad. Un encadenado lento es, por construcción, un cambio gradual —la misma forma que un movimiento de cámara—, así que puede aparecer algo antes, algo después o fundido con su vecino. Las panorámicas rápidas también pueden leerse como cortes. Toma el resultado como una lista de planos para revisar, no como un veredicto.',
      },
      {
        q: '¿Qué es la puntuación de calidad de cada plano?',
        a: 'La misma puntuación por fotograma que usa la app de Life2Film para decidir qué conservar: nitidez, exposición, contraste, colorido y entropía combinados en un número. Es una ordenación aproximada de qué planos merecen una segunda mirada, no un juicio sobre qué es interesante.',
      },
      {
        q: '¿Cuánto tarda?',
        a: 'Recorre el vídeo saltando a cada punto de muestreo, y cada salto cuesta decenas de milisegundos. Un clip de un minuto tarda unos segundos. Los vídeos largos se muestrean de forma más gruesa para que la espera siga siendo razonable: la lista de planos mantiene una precisión de alrededor de medio segundo.',
      },
    ],
  },
};
