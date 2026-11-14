---
title: "How to edit video with Claude Code, step by step"
description: "Install Claude Code, add the video editing skills and cut a film from a folder of clips by chatting. Written for people who never used a terminal."
date: 2026-11-05
---

Claude Code is an assistant from Anthropic that works inside a folder on your computer. It can read files, run programs like ffmpeg, and write scripts. That is what video editing needs. This page is the Claude Code part of the [full guide](/guides/edit-video-with-ai-agents/).

You need a paid Claude plan or an Anthropic API account. Claude Code runs on macOS 13 or newer, Windows 10 or newer and Linux, with 4 GB of RAM or more.

## 1. Open a terminal

- **Mac:** press Cmd+Space, type "Terminal", press Enter.
- **Windows:** press the Windows key, type "PowerShell", press Enter.

Anthropic also keeps a [terminal guide](https://code.claude.com/docs/en/terminal-guide) for first-time users. Prefer no terminal? There is a [Claude desktop app](https://code.claude.com/docs/en/desktop-quickstart.md) with Claude Code inside. The steps below still apply to the skills.

## 2. Install Claude Code

Mac, Linux or WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Or with a package manager: `brew install --cask claude-code` on a Mac, `winget install Anthropic.ClaudeCode` on Windows.

The installer prints nothing while it downloads. When it stops, open a new terminal window and run:

```bash
claude --version
```

A version number means it worked.

## 3. Install ffmpeg and the two skills

```bash
brew install ffmpeg
```

On Windows use `winget install Gyan.FFmpeg`. Then the skills, from [solo-factory](https://github.com/fortunto2/solo-factory):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

This needs [Node.js](https://nodejs.org). Choose Claude Code when it asks where to install. If you would rather not use Node, start `claude` and say: "Install the skills solo-transcribe and solo-video-edit from github.com/fortunto2/solo-factory". Do not copy skill files by hand. A copy stops getting fixes.

## 4. Start in your clips folder

```bash
cd ~/Movies/lisbon-day1
claude
```

The first time, it asks you to log in. Then it asks before it runs anything. Read what it wants to run. Approve the ones that look right.

## 5. Ask for the film

> The folder has 40 clips from one day. Transcribe all of them with the transcribe skill, then read the transcript and propose a story in five lines. Wait for my answer before cutting.

Answer with your pick, then:

> Cut a 3-minute trailer in that story. Use ~/Music/score.mp3 and cut on the beat. Before rendering, show me the script and a contact sheet of the shots.

Claude Code will:

1. run the transcription, one text file for the whole day;
2. detect the beat of your track;
3. write the cut as a small script file;
4. render an mp4 with ffmpeg and check that length and sound match.

Claude Code can also work inside the Life2Film Studio app on a Mac: it reads the timeline, looks at frames and proposes edits that you accept in the window. Setup takes one command, see [Connect an agent](/studio/agent/).

## When something goes wrong

- **`claude: command not found`.** Close the terminal, open a new one. If it still fails, run `claude doctor` or see Anthropic's [install troubleshooting](https://code.claude.com/docs/en/troubleshoot-install.md).
- **Transcript has strange names.** Give it a word list: "Anna is my sister, the cafe is called Oficina". It fixes the text once, before subtitles use it.
- **A clip has no speech.** Crowds and music can produce invented sentences. Say "treat clip 17 as no speech".
- **The cut feels flat.** Say what is wrong in plain words. "Too many wide shots in a row." "Open on the best moment."

## Next

- The general flow and rules: [Edit video with an AI assistant](/guides/edit-video-with-ai-agents/).
- Use ChatGPT instead: [ChatGPT and Codex](/guides/edit-video-with-chatgpt-codex/).
