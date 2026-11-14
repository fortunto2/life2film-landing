---
title: "Montaje de video con IA: edita con Claude Code, ChatGPT y Codex"
description: "Guía paso a paso para no programadores: instala un asistente de IA, añade dos skills gratis y pídele con palabras simples que corte tus clips al ritmo."
date: 2026-11-05
---

Puedes hacer el montaje de video hablando con un asistente de IA. Dejas tus clips en una carpeta y dices qué película quieres. El asistente lee lo que se dice en los clips, elige los planos, corta al ritmo de la música y renderiza un mp4. Tú lo ves, dices qué falla y él lo corrige.

Esta guía es para personas que nunca han abierto una terminal. Calcula 30 minutos para la configuración la primera vez. Después, una película nueva empieza con un solo mensaje.

## Resumen rápido

1. Instala **ffmpeg**, la herramienta gratis que hace el corte de verdad.
2. Instala un asistente que pueda trabajar en una carpeta de tu computadora: [Claude Code](/es/guides/edit-video-with-claude-code/) o la [app de escritorio de ChatGPT con Codex](/es/guides/edit-video-with-chatgpt-codex/).
3. Instala dos skills gratis: `solo-transcribe` y `solo-video-edit`.
4. Pon tus clips en una carpeta y pide una película.

## Qué asistente sirve para esto

El asistente tiene que ejecutar programas en tu computadora y leer tus archivos. No todos los chats pueden.

| Herramienta | Edita tus clips locales | Notas |
|---|---|---|
| Claude Code (terminal o app de escritorio de Claude) | Sí | Necesita un plan de pago de Claude o una cuenta de API |
| App de escritorio de ChatGPT, modo Codex | Sí | Necesita un plan de ChatGPT. Eliges una carpeta y trabaja dentro |
| Codex CLI | Sí | Igual que arriba, en la terminal |
| ChatGPT en el navegador o en el teléfono | No | Puede escribir un guion, textos y una lista de planos. No puede ejecutar ffmpeg sobre 40 clips de tu disco |

Si solo tienes el chat del navegador, úsalo para planear la película y escribir el texto. Luego haz el corte con una de las herramientas de arriba.

## Paso 1. Instala ffmpeg

En Mac, con [Homebrew](https://brew.sh):

```bash
brew install ffmpeg
```

En Windows:

```powershell
winget install Gyan.FFmpeg
```

Comprueba que funcionó: escribe `ffmpeg -version` y deberías ver un número de versión. Si no quieres escribir comandos, instala primero el asistente y dile "instala ffmpeg por mí". Ejecutará el comando y te pedirá permiso.

## Paso 2. Instala el asistente

Elige uno. Los dos tienen su propia página, paso a paso:

- [Claude Code](/es/guides/edit-video-with-claude-code/): un comando y luego `claude` en la carpeta de tus clips.
- [App de escritorio de ChatGPT y Codex](/es/guides/edit-video-with-chatgpt-codex/): descarga la app, elige Codex, abre la carpeta de tus clips.

## Paso 3. Añade las dos skills

Una skill es un archivo de texto con instrucciones que el asistente carga cuando lo necesita. Estas dos guardan las reglas de edición, escritas a partir de trabajo real: nueve días en Chicago, de 40 a 70 clips al día, cortados en tráilers y en una película de 55 minutos.

- `solo-transcribe` convierte el habla de tus clips en texto con tiempos. Funciona en tu máquina, no se sube nada.
- `solo-video-edit` guarda las reglas de edición y las recetas de ffmpeg.

Son públicas en [solo-factory en GitHub](https://github.com/fortunto2/solo-factory). No las copies a mano. Instálalas con la herramienta de skills, que necesita [Node.js](https://nodejs.org):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Te pregunta para qué asistentes instalar. Elige el tuyo. Reinicia el asistente después para que vea las skills nuevas.

## Paso 4. Di lo que quieres

Pon todos los clips de un día en una carpeta y abre el asistente ahí. Luego escribe como le escribirías a un editor humano:

> Día nuevo: la carpeta tiene 40 clips de mi viaje a Lisboa. Transcribe todo, léelo y propón una historia. Después corta un tráiler de 3 minutos. Pon debajo mi canción music.mp3 y corta al ritmo.

Esto es lo que pasa a continuación:

1. **Transcribir.** El asistente ejecuta `solo-transcribe` sobre cada clip. En un Mac con Apple Silicon es unas cuatro veces más rápido que el tiempo real. En Windows o Linux funciona en la CPU y tarda más.
2. **Leer el día como texto.** Todo el habla va a un solo archivo, en el orden en que se grabó. El asistente lo lee como un guionista y propone la historia. Puedes decir "no, hazla sobre la comida".
3. **Encontrar el ritmo.** Detecta el tempo y los tiempos fuertes de tu canción, así los cortes caen en la música. Puedes probar esta parte por separado con el [detector de BPM](/es/tools/bpm-detector/) gratis.
4. **Escribir el corte como un guion.** No una línea de tiempo. Un archivo corto que dice qué frase de qué clip suena y qué plano la cubre. Una queja como "mencionas la Bean pero nunca la muestras" se arregla con una línea.
5. **Renderizar.** ffmpeg construye el mp4. El asistente comprueba que la duración, el códec y el sonido coincidan con el plan.

## Espera tres intentos

El primer corte suele ser aburrido o estar un poco desfasado. El tercero es bueno. Aun así es más rápido que editar a mano, porque desaparecen las partes lentas: ver cada clip, encontrar el ritmo, sincronizar los subtítulos.

Cosas útiles que decir después del primer corte:

- "Muéstrame una hoja de contactos de toda la película."
- "El plano de recurso en 1:20 no coincide con lo que digo. Cámbialo."
- "Abre con 8 segundos de los mejores planos y luego el gancho."
- "Añade subtítulos en inglés y en español."
- "Haz una versión vertical 9:16 para Reels."

## Reglas que te ahorran un mal corte

- Un plano de recurso muestra de lo que se habla. Si mencionas el puente, el puente está en pantalla.
- Nunca tapes un plano donde se mueven los labios. El espectador lo lee como sincronía rota.
- Elige tú los primeros 8 a 10 segundos. La máquina elige lo nítido y colorido, no lo interesante.
- La música de fondo en un clip puede provocar un reclamo de derechos de autor. Un día de material recibió 10. Pon debajo tu propia canción.
- Dile al asistente los nombres de personas y lugares. El reconocimiento de voz convierte los nombres desconocidos en famosos.

## Lo que no hace

- No crea material. Corta lo que tú grabaste.
- No elige la historia por ti. Propone, tú decides.
- Los archivos grandes tardan. 66 clips tardaron unos 20 minutos en analizarse la primera vez.
- Las skills están escritas para quien acepta unos cuantos intentos. Si quieres un solo botón, usa un editor con línea de tiempo.

## ¿Prefieres una ventana a un chat?

[Life2Film Studio](/studio/) es una app gratis para Mac (beta): un editor de línea de tiempo que compartes con tu asistente. Abre la película desde los archivos originales, el asistente propone cortes en la línea de tiempo y tú ves cada propuesta antes de aceptarla. Para herramientas en el navegador, mira las [herramientas gratis](/es/tools/): detector de ritmo, detector de escenas, recortador y más, todo en tu navegador sin subir nada. Para desarrolladores, el motor de análisis está en la [página del motor](/engine/).

## Los detalles técnicos

Cómo se cortaron las películas de Chicago, las reglas exactas y los números detrás están en rustman.org: [Edit video with an AI assistant: a day of footage to a film](https://rustman.org/wiki/creative-video-with-claude/) y how the cut is written as a script.

## Preguntas

**¿Puede ChatGPT editar video?** El chat del navegador no puede editar archivos de tu computadora. La app de escritorio de ChatGPT en modo Codex sí, porque trabaja en una carpeta y ejecuta comandos. Mira la [página de ChatGPT y Codex](/es/guides/edit-video-with-chatgpt-codex/).

**¿Se sube mi material?** Las skills funcionan en tu computadora. El asistente ve el texto de la transcripción y los comandos que ejecuta. No necesita que subas los archivos de video para responder.

**¿Funciona en Windows?** Sí. Instala ffmpeg con winget. La transcripción funciona en la CPU.

**¿Necesito saber programar?** No. Escribes frases. Tú apruebas los comandos que quiere ejecutar.
