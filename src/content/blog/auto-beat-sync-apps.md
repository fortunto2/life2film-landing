---
title: "Auto beat sync: how CapCut, Filmora and the automatic apps place cuts on the music"
description: "What auto beat sync actually detects, how to use it in CapCut and Filmora, why the markers still need fixing by hand, and which apps do the whole cut for you."
date: 2026-10-17
---

Every editor now has a button that promises to put your cuts on the beat. They all do roughly the
same thing underneath, and they all stop at the same point. Knowing where that point is saves an
evening.

## What the button detects

The audio is scanned for onsets: moments where energy jumps, usually a kick or a snare. A tempo is
fitted to those onsets, and the beats that fit the tempo become markers. On a track with a steady
drum pattern the markers land within a few milliseconds of where a drummer would say the beat is.
On a song with rubato, a live recording, or heavy syncopation, the markers are a guess, and
sometimes a guess at double or half the real tempo.

That is the whole of "auto beat sync". The second half, deciding which clip goes between which
markers and which seconds of the clip to show, is either left to you or done by a separate
automatic step.

## CapCut

Desktop: select the audio clip and click **Mark beats** above the timeline. CapCut places markers on
the waveform. Mobile: tap the track, swipe to **Beats**, turn on **Auto Generate**; yellow dots appear.
Then drag a clip's edge toward a marker until it snaps.

CapCut also has **Auto Cut** with **Beat Sync**, which does the second half: hand it clips and a
track and it cuts and aligns them. Available on mobile and desktop, not on CapCut Web at the time of
writing. The result lands on the timeline for you to fix.

## Filmora

Filmora's **Auto Beat Sync** takes a set of clips and a track, detects beats, and assembles a cut,
with a choice of how many beats per cut. The same caveats: good on steady music, a starting point
afterwards.

## Premiere Pro and Resolve

Neither places beat markers for you out of the box. People use a plugin, or export a beat grid from
a detector and import it as markers. If that is your workflow, the free
[BPM detector](/tools/bpm-detector/) on this site analyses a track in the browser and exports every
beat as EDL (Resolve, Premiere), FCPXML (Final Cut), OTIO, Audacity labels or CSV. Nothing is
uploaded. Ask for the right frame rate: markers land on whole frames, and a 25 fps grid in a
30 fps sequence sits up to 20 ms off.

## Why the markers still need a hand

Three things the detector cannot know:

- **Which beat matters.** Cutting on every beat at 128 BPM is a cut every 0.47 s, which reads as
  a strobe. Edits usually want the downbeat of each bar, or every second bar, and the detector
  does not know where the bar starts.
- **Where the clip should start.** A cut that lands on the beat but opens on the tail of the
  previous shot still looks wrong. The clip's own content has to be read.
- **When the music breathes.** Breakdowns and drops want longer and shorter shots respectively,
  and a fixed beats-per-cut setting gives the same length everywhere.

Marker tools solve the timing. They do not solve the edit.

## Apps that do the whole cut

A smaller set of apps run the detection and the selection together, so you get a finished film
rather than a marked timeline. [Life2Film](https://apps.apple.com/app/id6761656888?pt=128499174&ct=blog-beat-sync&mt=8)
is ours: pick a day or a trip, choose a track, and it reads the clips for sharpness, faces and
motion, decides which seconds to keep, and places the cuts on the beats, with shot length following
the music. It re-cuts on request, and the analysis runs on the iPhone with nothing uploaded. CapCut's
Auto Cut and Filmora's Auto Beat Sync are the equivalents inside a timeline editor, if you intend
to finish by hand.

For the by-hand version of all this, the earlier post on
[cutting video to the beat](/blog/cut-video-to-the-beat/) goes through where the cuts belong and
why an edit that ignores the downbeat reads as amateur.
