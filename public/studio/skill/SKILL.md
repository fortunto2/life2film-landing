---
name: life2film-studio
description: Edit a film in Life2Film Studio through its MCP door — read an .otio timeline, look at frames, read loudness, propose cuts, B-roll, subtitles and mix changes that the person accepts in the window. Use when the user asks to review a cut, direct a film, fix a moment they name by timecode ("at 14:36 the caption is wrong"), trim or reorder chapters, add cutaways, set levels or plugin chains, make a reel or a vertical from a chapter, start a film from a folder of footage, or export a film. Do NOT use for scoring raw footage or an automatic montage (that is the Life2Film app or the video-analyzer CLI).
---

# Life2Film Studio

Life2Film Studio is a Mac editor whose document is an OpenTimelineIO file (`.otio`). The film plays from
the original footage; nothing is imported. The app carries an MCP server, `studio-cli mcp`, with twelve
tools. You read and propose; **only the person accepts**. You never write the film yourself.

> **Needs:** Life2Film Studio 0.4 or later on macOS 15+ (Apple Silicon), and the door registered once:
>
> ```bash
> claude mcp add studio -- "/Applications/Life2Film Studio.app/Contents/MacOS/studio-cli" mcp
> ```
>
> Check with `claude mcp list`. Any MCP host works the same way: the command is the program above with
> the one argument `mcp`, over stdio. There is no port and no key. If the tools are missing, say so and
> give the person this command; do not edit the `.otio` by hand instead.

Every tool takes `file`: the absolute path of the `.otio`. Times are seconds or the clock the person
reads off the screen, as text (`"10:21"`, `"1:02:05"`).

## The tools

| Tool | What it is for |
|---|---|
| `timeline_read` | The film. A long film answers with its outline (chapters, lanes); then read a stretch with `from`/`to`. Views: `words` (the lines said, `find` searches), `where` (what is at a moment), `sources` (the files behind a stretch and what of each is unused), `sound` (loudness ten times a second, pauses, the level at each cut), `levels` (each sound lane against where it is kept), `session` (notes and past proposals) |
| `timeline_frame` | One frame of the film at a moment, as the window shows it, subtitles in |
| `timeline_sheet` | A sheet of frames over a stretch; `openings` gives the first frame of every shot. With `source`, the inside of one of the film's own files |
| `timeline_propose` | Edits checked against the film's `revision` and kept beside the file. `on_top: true` lays a second idea over a waiting one |
| `timeline_accept` | Only after the person says yes |
| `timeline_reject` | Take a proposal back (`last` for the newest idea alone) |
| `timeline_undo` | Put back the film as it was before the last accepted proposal |
| `timeline_note` | Pin a note to a moment, or reply to one (`re`) |
| `timeline_new` | Begin a film; with `folder` the film begins with that folder's video files, whole, in the order shot (then read it and propose the cut); with `of`, `from`, `to` a reel cut out of another film |
| `timeline_mix` | Render the film's sound with its chains and measure it (LUFS, peak); `proposal: true` measures the film as proposed. `to_target` in the answer is the edit that brings it to -16 LUFS |
| `mix_plugins` | The effects that exist, each one's knobs, and `chains` ready made |
| `timeline_film` | Write the film: whole or `from`/`to`; `preset` (youtube, vertical, messenger, master, review) |

The edit words a proposal may hold, with their shapes, are the resource `studio://guide/edits`. The
director's method is `studio://guide/director`; how to review a finished cut is `studio://guide/review`.
Read the director guide before the first proposal on a film. The prompts `direct_film` and `review_cut`
start either job with its guide attached.

## The loop

1. **Read.** `timeline_read` for the outline, then the chapter you will work on, then its `words`.
   Read `session` first if there is one: open notes are the person's brief.
2. **Look.** `timeline_sheet` with `openings` over the stretch. A cut you have not seen is a guess.
3. **Say the plan** in the film's terms before the first proposal: what the film is about in one
   sentence, and the changes that matter most.
4. **Propose one idea** with `timeline_propose`: a few edits and a note that says what and why
   ("the walk repeats what she just said: 14 s out of chapter 2"). Name the notes it `answers`.
5. **Check what you made.** The answer lists the changes as sentences. Then `timeline_sheet` and, for
   cuts in speech, `timeline_read` view `sound`, both with `proposal: true`. A cut inside a word moves to
   the pause beside it. If the proposal is wrong, `timeline_reject` and propose again.
6. **Wait.** The person sees the proposal drawn on the timeline and can play it. `timeline_accept`
   follows their yes, never your own judgment.

## Rules that are easy to get wrong

- **Pieces are named `[track, index]`** as `timeline_read` printed them for the current `revision`.
  After any accepted edit the indexes move: read again before the next proposal. A proposal against an
  old revision is refused.
- **A moment the person names is a film time.** `timeline_read` view `where` turns it into the chapter,
  the shot and the file behind it.
- **Linked edits carry the rest.** Removing or trimming a shot of the main line moves its sound, the
  subtitle lines over it, B-roll and chapter markers with it. Music lanes keep their time.
- **You cannot hear.** Views `sound` and `levels` and `timeline_mix` are numbers; say so where a
  judgment needs ears (a tone, a music cue).
- **Sound is measured, not guessed.** Propose one mix change, measure it with `timeline_mix` and
  `proposal: true`, and take it back if the number did not move the right way. Speech sits around
  -16 LUFS with peaks under -1 dB.
- **A short is a film of its own.** Begin a reel with `timeline_new` and `of`; never cut the long
  film down to make it.
- **Footage outside the film is out of reach.** The door looks only into files the film already uses.
  A folder the person names becomes a film with `timeline_new` and `folder`; after that its clips are the film's.
- **Nothing is rendered unless asked.** `timeline_film` writes a file; call it when the person asks
  for an export or a review copy, and tell them where it went.

## When something is refused

A refusal is a sentence from the editor's core ("the piece would play past its file's end"). Report it
as it is and change the edit; do not retry the same call, and do not work around it by editing the
`.otio` as text.
