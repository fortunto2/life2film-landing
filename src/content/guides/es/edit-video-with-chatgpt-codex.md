---
title: "¿Se puede editar video con ChatGPT? Sí, con Codex en tu computadora"
description: "ChatGPT en el navegador no puede cortar tus clips. La app de escritorio de ChatGPT en modo Codex sí. Cómo configurarla y qué decirle, paso a paso."
date: 2026-11-05
---

La respuesta honesta tiene dos partes. ChatGPT en el navegador o en el teléfono no puede editar archivos de video que están en tu computadora. Puede escribir un guion, textos y una lista de planos. La app de escritorio de ChatGPT en modo Codex, y la herramienta de línea de comandos Codex, sí pueden: trabajan dentro de una carpeta que tú eliges y ejecutan programas como ffmpeg. Esta página es la parte de ChatGPT de la [guía completa](/es/guides/edit-video-with-ai-agents/).

Necesitas un plan de ChatGPT que incluya Codex.

## Qué puede hacer cada opción

| Opción | ¿Corta tus clips locales? |
|---|---|
| ChatGPT en el navegador o en la app del teléfono | No. Solo planear y escribir |
| App de escritorio de ChatGPT, modo Chat o Work | Solo si activas el trabajo local para la carpeta. Work en el navegador funciona en un entorno en la nube |
| App de escritorio de ChatGPT, modo Codex | Sí. Abre una carpeta y ejecuta comandos |
| Codex CLI en una terminal | Sí |

"Trabajar en local" depende de la configuración de tu cuenta y de tu espacio de trabajo, así que puede que no lo veas. El modo Codex es el camino seguro.

## 1. Instala la app de escritorio

Descarga ChatGPT para macOS, Windows o Linux desde OpenAI, ábrela e inicia sesión. En el selector de producto elige **Codex**. Luego abre la carpeta de tus clips como proyecto.

Si te gusta la terminal, la versión de línea de comandos se instala con una línea:

```bash
npm install -g @openai/codex
```

o `brew install --cask codex` en Mac. Ejecuta `codex` y elige **Sign in with ChatGPT**.

## 2. Instala ffmpeg

```bash
brew install ffmpeg
```

En Windows: `winget install Gyan.FFmpeg`. O pídeselo a Codex: "instala ffmpeg por mí". Pide aprobación antes de ejecutarlo.

## 3. Añade las skills

Codex lee las skills de `.agents/skills` en tu carpeta o de `~/.agents/skills` en tu carpeta personal. Instala las dos skills de video desde [solo-factory](https://github.com/fortunto2/solo-factory):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Esto necesita [Node.js](https://nodejs.org). Elige Codex cuando pregunte. Otra forma: en Codex escribe `$skill-installer` y pídele que instale esas dos skills desde ese repositorio de GitHub. Reinicia Codex si no aparecen. En un mensaje, llama a una skill escribiendo `$` y su nombre. No copies los archivos de las skills a mano.

## 4. Pide la película

> La carpeta tiene 40 clips de un día. Usa $solo-transcribe en todos, lee la transcripción y propón una historia en cinco líneas. Espera mi respuesta antes de cortar.

Luego:

> Corta un tráiler de 3 minutos con esa historia, con music.mp3 debajo, cortes al ritmo. Muéstrame el guion y una hoja de contactos antes de renderizar.

Codex transcribe, encuentra el ritmo, escribe el corte como un guion, renderiza con ffmpeg y comprueba el resultado. Espera tres rondas. El primer corte rara vez es el que te quedas.

## Dónde ChatGPT es más débil

- Sin la app de escritorio o Codex, no tiene acceso a tus clips. No pegues un video de 2 GB en un chat esperando un corte.
- La transcripción en Windows y Linux funciona en la CPU y es más lenta que en un Mac con Apple Silicon.
- Revisa lo que Codex quiere ejecutar antes de aprobarlo. Esa es tu red de seguridad.

Si ya pagas por Claude, [Claude Code](/es/guides/edit-video-with-claude-code/) hace el mismo trabajo. Los dos leen las mismas skills.

## Siguiente

- El flujo general y las reglas que evitan malos cortes: [Montaje de video con IA](/es/guides/edit-video-with-ai-agents/).
- Cómo se cortaron las películas reales: [nota en rustman.org](https://rustman.org/wiki/creative-video-agent-cut/).
- ¿Quieres una app lista con ventana? [Life2Film Studio](/studio/) en un Mac.
