---
title: "The automatic montage tools that came and went"
description: "Magisto, GoPro Quik, Google Photos and the idea that software should pick your clips for you — what worked, what closed, and why the problem is still open."
date: 2026-07-31
---

Around 2011 a handful of companies decided the same thing: people film far more than they will ever
edit, so software should do the editing. Point it at your library, get a film back. Fifteen years
later the idea is still right and most of the products are gone.

Worth going through what happened, because the failures were not technical.

## Magisto: the one that defined it

[Magisto launched in 2011](https://techcrunch.com/2011/09/20/magisto-debuts-automatic-video-editing-tool-raises-5-5m-from-li-ka-shing-others)
with a promise nobody else was making: upload raw footage, receive an edited film with music,
transitions and pacing. It analysed the video, guessed which parts mattered, and assembled them. For
a while it was genuinely magic. The name was not subtle.

It was a **cloud service**, and that was the only way to build it then. Phones of that era could not
run video analysis; a 2011 iPhone would have needed hours and a wall socket. So you uploaded, their
servers worked, you got a link. Everyone accepted this because there was no alternative.

Vimeo bought Magisto in 2019 for a reported $200M, folded the technology into Vimeo Create, and
pointed it at business marketing rather than family memories. Then it wound down:
[the integration was discontinued on 31 December 2024](https://help.magisto.com/hc/en-us/articles/360031272952-Vimeo-Integration-Discontinued),
and in September 2025 Vimeo
[laid off around a quarter of its Israeli staff](https://www.calcalistech.com/ctechnews/article/sjtjgbabzx),
the office that came from the Magisto acquisition.

The technology did not fail. It got bought, repositioned toward a market with better margins, and
then trimmed. That is a normal ending, and it leaves the original users with nothing.

## GoPro Quik: alive, and tied to a camera

Quik survived, which makes it the exception. It does the same core thing: hand it clips, get a cut
with music. And it is genuinely good at it.

The catch is the gravity of the ecosystem. Quik is built to make GoPro footage look good and to keep
GoPro owners subscribed. If your video comes from a phone and you have never owned an action camera,
it works, but you are not who it is for, and the subscription is priced accordingly.

## Google Photos Memories: automatic, and not an editor

Google solved a different half of the problem. Memories assembles clips from your library with no
effort at all, and they show up whether you asked or not.

But you cannot direct it. There is no "make it two minutes", no "keep the beach, skip the drive", no
choosing the music with intent. It is a feature that produces a thing, not a tool you use. And it
works because your entire library is already on their servers, which is either fine or exactly the
problem, depending on you.

## Why the idea kept being right

The premise held up. People film more every year and edit approximately none of it. A phone shoots
4K; a weekend produces forty clips; the barrier is not the tooling difficulty, it is that nobody
wants to spend two hours in a timeline for a two-minute result.

What changed is where the compute can happen. Every attempt above was cloud-first, because in 2011
through roughly 2020 there was no choice. Scene detection, face grouping, quality scoring and beat
detection on hours of footage needed a server.

That constraint is gone. A recent iPhone runs all of it in seconds. The analysis that needed a data
centre now fits in a pocket, on battery. Which means the compromise every one of these products
demanded, that you upload your family footage to a company, is no longer the price of admission.

## What is around now

A small set of iOS apps do the analysis locally. [Bitcut](https://bitcut.app/) turns long recordings
into short clips with beat-synced cuts, entirely on the device. A handful of privacy-first editors
launched in the last year. And Life2Film, which is where we should declare the interest: we build one
of these.

Our angle is the original Magisto problem, the whole library rather than one long video and photos
alongside footage, with the constraint removed. Analysis on the phone, nothing uploaded, and a
calendar you spin to any month you filmed. There is a desktop version for archives that have been
piling up for years, where a phone is the wrong tool.

We are not claiming to replace Magisto. It was a web service, and it did some things we do not: a
polished template library, a business tier, sharing built for teams. What we take from it is the
premise it proved: that the editing decisions can be made by software, and that most people will
never make them by hand.

## The part still unsolved

Automatic selection is a judgement, and judgement is where these tools remain weak. Software can tell
that a shot is sharp, well-framed, contains a face, and lands on a beat. It cannot tell that the
important thing in the frame is your grandmother, in the last summer she was well.

Nobody has solved that, and possibly nobody will. The best available compromise is to make the
re-cut cheap: if the first result misses the point, changing it should take seconds rather than a
timeline session. That is the bar worth holding these tools to, including ours.
