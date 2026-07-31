---
title: "Where your footage actually goes when you edit on your phone"
description: "Most video editors upload your clips before they touch them. Here is which ones do it, what it means in practice, and how to tell without reading a privacy policy."
date: 2026-07-31
---

You film your kid's birthday. You open an editor, pick the clips, ask for a one-minute cut. Somewhere
between those two steps, on most apps, your footage leaves the phone.

That is not a scandal. It is architecture. Analysing video takes compute, and the cheapest way to get
compute is someone else's machine. The question worth asking is not whether an app uploads, but
whether you were told, and whether you would have agreed if you had been.

## Who uploads what

**Web tools upload everything, by definition.** Opus Clip, Vizard, Klap, Vimeo Create: you hand over
the whole file, it is processed on their servers, you download the result. There is no other way for
a browser tab to analyse an hour of 4K. These services say so plainly, and their pricing reflects the
compute they pay for.

**CapCut is the interesting case**, because it is the default for most people and it is not obvious.
Basic trimming happens on the device. But the AI features that make it worth using (auto-captions,
background removal, script-to-video) run in the cloud. That means the clip goes to ByteDance
infrastructure. Whether that bothers you depends on what is in the clip and where you live, but it is
a decision you are making whether or not you noticed it.

**Google Photos Memories** never uploads for editing, because your library is already there. The
upload happened when you enabled backup.

A handful of iOS apps do the whole job locally. [Bitcut](https://bitcut.app/) is the most developed
of them and states it directly: on-device processing, no upload, works offline. Life2Film works the
same way. So does the small crop of privacy-first editors that appeared in the last year. The
positioning exists because enough people started asking.

## Why "we delete it after processing" is a weaker promise than it sounds

Most cloud editors say the file is removed once the job is done. Usually true, and beside the point.

Deletion is a policy, and policies change with ownership, funding rounds and jurisdictions. An
architecture does not. If the video never left the phone, there is no retention window to trust, no
breach that can expose it, no subpoena that can reach it, and no terms update that can quietly start
using it for training. The strongest privacy guarantee is not a promise to delete. It is having
nothing to delete.

This matters more for personal footage than for work. A podcast recording leaking is embarrassing.
Your home, your children and your unflattering takes are a different category, and they are exactly
what accumulates in a camera roll.

## How to check for yourself

You do not need to read the privacy policy. Two tests, one minute each.

**Airplane mode.** Turn it on, then ask the app to do its clever thing. If the feature fails or
spins, it needs a server. If it works, it does not. This is unambiguous, and it tests behaviour
rather than claims.

**Watch the battery and the timer.** On-device analysis is heavy: the phone warms up, and the time
scales with how much footage you gave it. Cloud processing is the opposite: a fast upload, a wait
that depends on their queue rather than your clip count, then a download. The shape of the delay
tells you where the work happened.

An honest app makes this easy to verify. If it advertises "private" and fails in airplane mode, the
word is doing marketing work rather than describing anything.

## What you give up locally

Being fair about the trade: on-device processing is not free.

The phone does the work, so long jobs drain the battery and heat the device. You are limited by what
the hardware can do, and a laptop with a proper GPU beats a phone, and a server farm beats both. Some
features are genuinely impractical locally today; large generative video is one of them.

For selecting and cutting footage you already have, though, the hardware caught up years ago. Modern
iPhone silicon runs scene detection, face grouping and quality scoring quickly enough that the
bottleneck is reading files, not thinking about them. That is why the local option exists at all now
and did not in 2015, when everything had to be a cloud service.

## The point

Anyone who films their family should know which of their apps upload and which do not. Not because
uploading is wrong, but because it should be a choice you made rather than a default you inherited.

Life2Film is built the local way: the analysis runs on the phone, originals never leave it, and the
only thing that can go out, if you set up an AI provider with your own key, is a text description
of clips. Details are in the [privacy policy](/privacy/), and the airplane-mode test works on us too.
