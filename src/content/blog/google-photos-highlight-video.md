---
title: "Google Photos highlight video: how to make one, and why it keeps processing"
description: "The steps to create a highlight video in Google Photos on the web and in the app, how to change the music and the clips, why it says still processing or will not save, and what to use when you want control."
date: 2026-10-17
---

Google Photos renamed its automatic movies to **highlight videos** and rebuilt the editor around
them. The feature is good at what it does. Most of the questions people search for are about the
edges: where the button is now, why the video is stuck processing, and how to make it longer or
from a specific album.

## Make a highlight video

On the web:

1. Go to photos.google.com and click **Create** at the top right, then **Highlight video**.
2. Pick a subject. You can type people, places, themes or dates into search, or choose from the
   suggested Who, Where and When chips.
3. Click **Preview**, then **Save**.

To pick the clips yourself: **Create**, **Highlight video**, then **Create your own video**. Select
the photos and videos, click Create, then Save. Making one "from an album" means opening the album
and selecting everything in it first; there is no album button in the flow.

In the Android and iOS apps the same thing lives under **Create**. Since late 2025 the app also has
templates: preset formats with music, text and cuts synced to a soundtrack, and a single timeline for
multi-clip edits. Google's own write-up is
[here](https://blog.google/products/photos/new-video-editor-templates-custom-text/).

## Change the music and the clips

Open the saved video and tap **Edit**. **Music** swaps the soundtrack, either from Google's theme
library or, in the app, from your own music. Drag clips to reorder; the **More** menu next to a
clip removes it. Save again when done.
[Google's help page](https://support.google.com/photos/answer/6128862) lists the current menus.

## Still processing, not saving

A highlight video is rendered on Google's servers, not on your phone. Three consequences follow:

- The clips must be **backed up** first. A video that lives only on the device is not available to
  the renderer, and the creation waits for the upload to finish.
- "Still processing" is a queue, not an error. It usually clears in minutes; on a slow connection or
  a large library it can take longer. Closing the app does not cancel it.
- If it never saves, the usual fixes are the boring ones: update the app, check that backup is on
  and complete for those items, and try from the web, which shows errors the app hides.

This is also why there is no highlight video without an internet connection, and why the footage
goes through Google's servers whether you wanted an edit or not. For many people that is already
true of their whole library. If it is not, that is the trade you are making.

## What it does not do

- **Length** is chosen by Google. There is no slider, and templates have fixed lengths.
- **Beat sync** exists only inside templates with built-in music; your own track is laid under
  the cuts, not matched to them.
- **Direction** is a search query. "Fewer shots of the pavement, more of grandma" is not something
  you can say.
- **Offline**: no.

## When you want control

[Life2Film](https://apps.apple.com/app/id6761656888?pt=128499174&ct=blog-google-photos&mt=8) is the
iPhone app we make for the other half of this. Pick the day or month on a calendar, say what the film
should be in plain words, choose the music, and it cuts to the beat. Ask for a different length or
mood and it re-cuts in seconds. The analysis runs on the phone, so it works offline and nothing is
uploaded; there is no account to make.

If you have a long clip and only want it split at the shot changes, the free
[video splitter](/tools/video-splitter/) on this site does that in the browser, with nothing
uploaded either.
