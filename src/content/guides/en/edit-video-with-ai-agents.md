---
title: "Edit video with an AI assistant: Claude Code, ChatGPT and Codex"
description: "Step by step for non-programmers: install an AI assistant, add two free skills, and tell it in plain words to cut your clips to the beat. No upload, no timeline."
date: 2026-11-05
---

You can edit video by talking to an AI assistant. You drop your clips in a folder and say what film you want. The assistant reads what people say in the clips, picks the shots, cuts to the music and renders an mp4. You watch, say what is wrong, and it fixes it.

This guide is for people who have never opened a terminal. Allow 30 minutes for setup the first time. After that a new film starts with one message.

## The short version

1. Install **ffmpeg**, the free tool that does the actual cutting.
2. Install an assistant that can work in a folder on your computer: [Claude Code](/guides/edit-video-with-claude-code/), or the [ChatGPT desktop app with Codex](/guides/edit-video-with-chatgpt-codex/).
3. Install two free skills: `solo-transcribe` and `solo-video-edit`.
4. Put your clips in one folder and ask for a film.

## Which assistant can do this

The assistant has to run programs on your computer and read your files. Not every chat can.

| Tool | Edits your local clips | Notes |
|---|---|---|
| Claude Code (terminal or Claude desktop app) | Yes | Needs a paid Claude plan or an API account |
| ChatGPT desktop app, Codex mode | Yes | Needs a ChatGPT plan. Pick a folder, it works inside it |
| Codex CLI | Yes | Same as above, in the terminal |
| ChatGPT in the browser or on the phone | No | It can write a script, captions and a shot list. It cannot run ffmpeg on 40 clips on your disk |

If you only have the browser chat, use it to plan the film and write the text. Then do the cut in one of the tools above.

## Step 1. Install ffmpeg

On a Mac, with [Homebrew](https://brew.sh):

```bash
brew install ffmpeg
```

On Windows:

```powershell
winget install Gyan.FFmpeg
```

Check it worked: type `ffmpeg -version` and you should see a version number. If you do not want to type commands, install the assistant first and say "install ffmpeg for me". It will run the command and ask your permission.

## Step 2. Install the assistant

Pick one. Both are covered step by step on their own pages:

- [Claude Code](/guides/edit-video-with-claude-code/): one command, then `claude` in your clips folder.
- [ChatGPT desktop app and Codex](/guides/edit-video-with-chatgpt-codex/): download the app, choose Codex, open your clips folder.

## Step 3. Add the two skills

A skill is a text file of instructions that the assistant loads when it needs it. These two hold the rules for editing, written from real work: nine days in Chicago, 40 to 70 clips a day, cut into trailers and a 55-minute film.

- `solo-transcribe` turns speech in your clips into text with timings. It runs on your machine, nothing is uploaded.
- `solo-video-edit` holds the editing rules and the ffmpeg recipes.

They are public in [solo-factory on GitHub](https://github.com/fortunto2/solo-factory). Do not copy them by hand. Install them with the skills tool, which needs [Node.js](https://nodejs.org):

```bash
npx skills add fortunto2/solo-factory --skill solo-transcribe --skill solo-video-edit --global
```

It asks which assistants to install for. Choose yours. Restart the assistant afterwards so it sees the new skills.

## Step 4. Say what you want

Put all clips of one day in one folder and open the assistant there. Then write like you would to a human editor:

> New day: the folder has 40 clips from my trip to Lisbon. Transcribe everything, read it, and propose a story. Then cut a 3-minute trailer. Put my track music.mp3 under it and cut on the beat.

What happens next:

1. **Transcribe.** The assistant runs `solo-transcribe` on every clip. On an Apple Silicon Mac that is about four times faster than real time. On Windows or Linux it runs on the CPU and takes longer.
2. **Read the day as text.** All speech goes into one file in shooting order. The assistant reads it like a scriptwriter and proposes the story. You can say "no, make it about the food".
3. **Find the beat.** It detects the tempo and downbeats of your track, so cuts land on the music. You can try this part alone with the free [BPM detector](/tools/bpm-detector/).
4. **Write the cut as a script.** Not a timeline. A short file that says which sentence of which clip plays, and which shot covers it. A complaint like "you mention the Bean but never show it" becomes a one-line fix.
5. **Render.** ffmpeg builds the mp4. The assistant checks that length, codec and sound match the plan.

## Expect three tries

The first cut is usually boring or slightly out of sync. The third is good. That is still faster than editing by hand, because the slow parts are gone: watching every clip, finding the beat, syncing subtitles.

Useful things to say after the first cut:

- "Show me a contact sheet of the whole film."
- "The cutaway at 1:20 does not match what I say. Replace it."
- "Open with 8 seconds of the best shots, then the hook."
- "Add English and Spanish subtitles."
- "Make a vertical 9:16 version for Reels."

## Rules that save you a bad cut

- A cutaway shows what is being talked about. If you mention the bridge, the bridge is on screen.
- Never cover a shot where lips are moving. Viewers read it as broken sync.
- Pick the first 8 to 10 seconds yourself. The machine picks sharp and colourful, not interesting.
- Music playing in the background of a clip can trigger a copyright claim. One day of footage got 10. Put your own track under it.
- Tell the assistant the names of people and places. Speech recognition turns unknown names into celebrities.

## What it does not do

- It does not make footage. It cuts what you filmed.
- It does not choose the story for you. It proposes, you decide.
- Large files take time. 66 clips took about 20 minutes to analyse the first time.
- The skills are written for people who accept a few tries. If you want one button, use an editor with a timeline.

## Prefer a window to a chat?

[Life2Film Studio](/studio/) is a free Mac app (beta): a timeline editor you share with your assistant. It opens a film from the original files, the assistant proposes cuts on the timeline, and you play each proposal before accepting it. For browser tools, see [Free tools](/tools/): beat detector, scene detector, trimmer and more, all running in your browser without upload. For developers, the analysis engine is on the [Engine page](/engine/).

## The technical details

How the Chicago films were cut, the exact rules and the numbers behind them are on rustman.org: [Edit video with an AI assistant: a day of footage to a film](https://rustman.org/wiki/creative-video-with-claude/) and how the cut is written as a script.

## Questions

**Can ChatGPT edit video?** The chat in the browser cannot edit files on your computer. The ChatGPT desktop app in Codex mode can, because it works in a folder and runs commands. See the [ChatGPT and Codex page](/guides/edit-video-with-chatgpt-codex/).

**Is my footage uploaded?** The skills run on your computer. The assistant itself sees the text of the transcript and the commands it runs. It does not need the video files uploaded to answer.

**Does it work on Windows?** Yes. Install ffmpeg with winget. Transcription runs on the CPU there.

**Do I need to know how to code?** No. You type sentences. You approve the commands it wants to run.
