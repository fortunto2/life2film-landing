---
title: "How to cut video to the beat, by hand and automatically"
description: "Why edits land badly when they ignore the music, how to place cuts on downbeats manually, and what beat-sync tools actually detect."
date: 2026-07-31
---

Two montages of the same holiday, same clips, same song. One feels like a film. The other feels like
a slideshow. The usual difference is not colour grading or transitions. It is whether the cuts land
with the music or across it.

## What the ear is actually catching

Music is organised in bars, and bars have a strong first beat, the downbeat. When a shot changes on
that beat, the change reads as intentional, because two things you were already tracking resolve at
the same moment. When it lands a third of a second early, nothing is obviously wrong, and the whole
thing still feels amateur. The eye does not notice the offset; the body does.

This is why a cut placed on a downbeat can carry a mediocre shot, and why a beautiful shot cut at a
random moment still feels loose.

Two more rules worth knowing before any tool gets involved:

- **Cut on motion, not before it.** If someone is about to jump, cut as they leave the ground, not
  while they crouch. The movement carries across the edit.
- **Match the cutting rate to the section.** A verse can hold four-second shots. A chorus usually
  wants one or two. Keeping one rhythm throughout is the single most common reason a montage drags.

## Doing it by hand

Any editor with a waveform will do: CapCut, InShot, iMovie, LumaFusion, Premiere.

1. Drop the track on the timeline first, before any video. The music is the structure; the footage
   fills it.
2. Zoom in until you can see individual peaks. In most dance and pop tracks the kick drum shows up as
   an obvious spike, roughly every half second at 120 BPM.
3. Play through once and tap a marker on the strong beats. Do not mark every beat. Mark the ones
   that start a bar. You want fewer, stronger anchors.
4. Trim clips so each ends on a marker. Adjust the start, not the end, when a clip is slightly long:
   the ending is what the viewer feels.
5. Watch it once with your eyes closed. If the cuts are wrong you will hear the mismatch even without
   seeing it.

For a one-minute montage this is about twenty minutes of work, and it is worth doing manually at
least once. After that you know what the automatic tools are supposed to be doing, and you can tell
when they got it wrong.

If step three is the part you want to skip, the [BPM detector](/tools/bpm-detector/) gives you the
tempo and the time of every beat, and exports the grid as markers for Resolve, Premiere, Final Cut
or Audacity. You still choose the shots; you just stop tapping.

## What the automatic tools do

Beat detection is a solved signal-processing problem. The software computes an onset envelope (how
sharply energy rises across the spectrum, moment to moment), finds the periodicity in those onsets to
estimate tempo, then picks which of those onsets are downbeats. Good implementations also track tempo
drift, which matters for live recordings and anything not made to a click.

What tools do with that information differs, and it is where they separate:

| Approach | What you get |
|---|---|
| **Snap to grid** (Canva, most templates) | Cuts every N beats regardless of content. Rhythmically correct, visually monotonous |
| **Snap on edit** (Bitcut, Filmora) | You choose clips, trims re-snap to the nearest beat. Precise, still your selection |
| **Analyse then place** (Beatleap, Life2Film) | The tool ranks the footage and decides which moment goes on which beat |

The third is harder and fails more interestingly. A tool that both selects and places has to decide
what a good moment is, which is a judgement call, and it will sometimes disagree with you about your
own footage.

## Where automation actually helps

Not with a carefully planned three-shot sequence. Do that by hand, you will be faster.

It helps at volume. Forty clips from a weekend, several hundred from a trip. Marking beats by hand
scales linearly with clip count; beat detection does not. The realistic workflow is to let a tool
place the cuts, watch once, then fix the two or three that are wrong. Twenty minutes becomes two,
and the tedious part is the part you handed over.

It also helps when the music is not steady. Live recordings drift, and a fixed grid drifts away from
them audibly by the second chorus. Detection that tracks tempo follows the drift; a human marking
peaks by hand at 2 a.m. does not.

## Trying it

In [Life2Film](/), pick a track and the edits land on its downbeats. Tempo and beat positions come from
analysing the audio on the phone, and the same analysis decides where in each clip to cut. If you
disagree with a placement, ask for a different length or a different mood and it re-cuts.

Worth knowing either way: once you have marked beats by hand a few times, you stop being able to
un-hear a montage that ignores them.
