---
title: "Edición de video con Claude Code: guía paso a paso"
description: "Instala Claude Code, añade las skills de edición de video y corta una película desde una carpeta de clips chateando. Para quien nunca usó la terminal."
date: 2026-11-05
---

Claude Code es un asistente de Anthropic que trabaja dentro de una carpeta de tu computadora. Puede leer archivos, ejecutar programas como ffmpeg y escribir scripts. Eso es lo que necesita la edición de video. Esta página es la parte de Claude Code de la [guía completa](/es/guides/edit-video-with-ai-agents/).

Necesitas un plan de pago de Claude o una cuenta de la API de Anthropic. Claude Code funciona en macOS 13 o superior, Windows 10 o superior y Linux, con 4 GB de RAM o más.

## 1. Abre una terminal

- **Mac:** pulsa Cmd+Espacio, escribe "Terminal" y pulsa Enter.
- **Windows:** pulsa la tecla Windows, escribe "PowerShell" y pulsa Enter.

Anthropic también tiene una [guía de la terminal](https://code.claude.com/docs/en/terminal-guide) para quien empieza. ¿Prefieres no usar la terminal? Hay una [app de escritorio de Claude](https://code.claude.com/docs/en/desktop-quickstart.md) con Claude Code dentro. Los pasos de abajo para las skills siguen valiendo.

## 2. Instala Claude Code

Mac, Linux o WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

O con un gestor de paquetes: `brew install --cask claude-code` en Mac, `winget install Anthropic.ClaudeCode` en Windows.

El instalador no imprime nada mientras descarga. Cuando termine, abre una ventana de terminal nueva y ejecuta:

```bash
claude --version
```

Si ves un número de versión, funcionó.

## 3. Instala ffmpeg y las dos skills

```bash
brew install ffmpeg
```

En Windows usa `winget install Gyan.FFmpeg`. Luego las skills, desde [solo-factory](https://github.com/fortunto2/solo-factory):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

Esto necesita [Node.js](https://nodejs.org). Elige Claude Code cuando pregunte dónde instalar. Si prefieres no usar Node, inicia `claude` y di: "Instala las skills solo-transcribe y solo-video-edit desde github.com/fortunto2/solo-factory". No copies los archivos de las skills a mano. Una copia deja de recibir correcciones.

## 4. Empieza en la carpeta de tus clips

```bash
cd ~/Movies/lisbon-day1
claude
```

La primera vez te pide iniciar sesión. Después te pregunta antes de ejecutar cualquier cosa. Lee lo que quiere ejecutar. Aprueba lo que se vea bien.

## 5. Pide la película

> La carpeta tiene 40 clips de un día. Transcribe todos con la skill de transcripción, luego lee la transcripción y propón una historia en cinco líneas. Espera mi respuesta antes de cortar.

Responde con tu elección y luego:

> Corta un tráiler de 3 minutos con esa historia. Usa ~/Music/score.mp3 y corta al ritmo. Antes de renderizar, muéstrame el guion y una hoja de contactos de los planos.

Claude Code va a:

1. ejecutar la transcripción, un archivo de texto para todo el día;
2. detectar el ritmo de tu canción;
3. escribir el corte como un pequeño archivo de guion;
4. renderizar un mp4 con ffmpeg y comprobar que la duración y el sonido coincidan.

Claude Code también puede trabajar dentro de la app Life2Film Studio en un Mac: lee la línea de tiempo, mira fotogramas y propone cambios que tú aceptas en la ventana. Se conecta con un comando, mira [Connect an agent](/studio/agent/).

## Cuando algo sale mal

- **`claude: command not found`.** Cierra la terminal y abre una nueva. Si sigue fallando, ejecuta `claude doctor` o mira la [solución de problemas de instalación](https://code.claude.com/docs/en/troubleshoot-install.md) de Anthropic.
- **La transcripción tiene nombres raros.** Dale una lista de palabras: "Anna es mi hermana, el café se llama Oficina". Corrige el texto una vez, antes de que los subtítulos lo usen.
- **Un clip no tiene habla.** Las multitudes y la música pueden producir frases inventadas. Di "trata el clip 17 como sin habla".
- **El corte se siente plano.** Di qué falla con palabras simples. "Demasiados planos generales seguidos." "Abre con el mejor momento."

## Siguiente

- El flujo general y las reglas: [Montaje de video con IA](/es/guides/edit-video-with-ai-agents/).
- Usar ChatGPT en su lugar: [ChatGPT y Codex](/es/guides/edit-video-with-chatgpt-codex/).
