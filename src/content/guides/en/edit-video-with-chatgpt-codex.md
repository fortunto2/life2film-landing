---
title: "Can ChatGPT edit video? Yes, with Codex on your computer"
description: "ChatGPT in the browser cannot cut your clips. The ChatGPT desktop app in Codex mode can. Here is how to set it up and what to say, step by step."
date: 2026-11-05
---

The honest answer has two parts. ChatGPT in the browser or on the phone cannot edit video files that sit on your computer. It can write a script, captions and a shot list. The ChatGPT desktop app in Codex mode, and the Codex command line tool, can: they work inside a folder you choose and run programs such as ffmpeg. This page is the ChatGPT part of the [full guide](/guides/edit-video-with-ai-agents/).

You need a ChatGPT plan that includes Codex.

## What each option can do

| Option | Cuts your local clips? |
|---|---|
| ChatGPT in the browser or phone app | No. Plan and write only |
| ChatGPT desktop app, Chat or Work mode | Only if you turn on local work for the folder. Work in the browser runs in a cloud environment |
| ChatGPT desktop app, Codex mode | Yes. Opens a folder, runs commands |
| Codex CLI in a terminal | Yes |

"Work locally" depends on your account and workspace settings, so you may not see it. Codex mode is the sure path.

## 1. Install the desktop app

Download ChatGPT for macOS, Windows or Linux from OpenAI, open it and sign in. In the product selector choose **Codex**. Then open your clips folder as a project.

If you like the terminal, the command line version installs with one line:

```bash
npm install -g @openai/codex
```

or `brew install --cask codex` on a Mac. Run `codex` and choose **Sign in with ChatGPT**.

## 2. Install ffmpeg

```bash
brew install ffmpeg
```

On Windows: `winget install Gyan.FFmpeg`. Or ask Codex: "install ffmpeg for me". It asks for approval before running.

## 3. Add the skills

Codex reads skills from `.agents/skills` in your folder or `~/.agents/skills` in your home folder. Install the two video skills from [solo-factory](https://github.com/fortunto2/solo-factory):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

This needs [Node.js](https://nodejs.org). Choose Codex when it asks. Another way: in Codex type `$skill-installer` and ask it to install those two skills from that GitHub repository. Restart Codex if they do not appear. In a message, call a skill by typing `$` and its name. Do not copy skill files by hand.

## 4. Ask for the film

> The folder has 40 clips from one day. Use $solo-transcribe on all of them, read the transcript and propose a story in five lines. Wait for my answer before cutting.

Then:

> Cut a 3-minute trailer in that story, with music.mp3 under it, cuts on the beat. Show me the script and a contact sheet before you render.

Codex transcribes, finds the beat, writes the cut as a script, renders with ffmpeg and checks the result. Expect three rounds. The first cut is rarely the one you keep.

## Where ChatGPT is weaker

- Without the desktop app or Codex, it has no access to your clips. Do not paste a 2 GB video into a chat and expect a cut.
- Transcription on Windows and Linux runs on the CPU and is slower than on an Apple Silicon Mac.
- Check what Codex wants to run before you approve it. That is your safety net.

If you already pay for Claude, [Claude Code](/guides/edit-video-with-claude-code/) does the same job. Both read the same skills.

## Next

- The general flow and the rules that prevent bad cuts: [Edit video with an AI assistant](/guides/edit-video-with-ai-agents/).
- How the real films were cut: [rustman.org write-up](https://rustman.org/wiki/creative-video-agent-cut/).
- Want a window where you see every cut the assistant proposes: [Life2Film Studio](/studio/) on a Mac.
