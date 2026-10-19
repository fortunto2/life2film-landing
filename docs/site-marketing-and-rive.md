---
type: assessment
status: draft — Rustam decides what goes in
title: life2film.com — what the site is missing for growth, and where Rive fits
created: 2026-10-18
tags: [marketing, landing, design, rive, animation]
---

# life2film.com — what the site is missing for growth, and where Rive fits

Written 18 Oct 2026 after reading the live home page (desktop and 390 px), the About
page, `docs/research.md` (31 Jul), `life2film/docs/growth/short-video-plan.md` (16 Oct),
and Balalar's Rive pipeline (`balalar-app/docs/adr/001-animation.md`,
`spikes/rive/characters/README.md`). Numbers come from those files, not from memory.

## What the site is for

Search Console in July: 5 clicks, 28 impressions, all brand. Store installs come only in
launch weeks (108, 170), then 5–8 a week. The short-video plan is right that the product
makes the ad, and the site contradicts it: **there is no film on life2film.com**. The hero
is a logo pattern, «Inside the app» is four static screenshots, About now has one video,
from 2014. A visitor who arrives from a Reel («what app?») lands on a page that never
shows what the Reel showed.

So the site's job is narrow: (1) prove the output in the first screen, (2) catch the
non-iPhone visitor instead of losing them, (3) keep the SEO machine (13 posts, 9 tools,
96 URLs) feeding the store link. Design work is in service of (1).

## Findings, by weight

1. **No output above the fold.** Hero right half is the calendar pattern. Replace or
   pair it with a 15–20 s loop of a real film the app made (the short-video format, step
   3), muted, `playsinline`, poster first, loaded after the text paints. Same asset the
   TikTok plan produces, so it costs nothing extra. Keep the wheel: it is the brand mark
   and it should move to the «Pick a stretch of time» step, where it explains something.

2. **No before/after.** The one thing every competitor cannot show (CapCut: you edit;
   Quik: GoPro only) is «40 clips → one tap → this». A two-column strip: a scrolling grid
   of 40 real thumbnails on the left, the film on the right. The app already renders the
   grid (the Gallery); a screen recording is enough.

3. **No proof.** Nothing on the page says anyone uses it. Cheap, true, already ours:
   «First version: 2014, over a million installs» (now on About, belongs in the hero
   note line), the App Store rating once it exists (the rating ask ships in 1.14), 2–3
   real quotes from the «friends» TestFlight group, the SuperDuperAI line. No logos,
   no fake counters.

4. **The screenshots are stale.** The second shot shows the pre-Montage-Chain UI (system
   blue «Preview», old Make screen); the fourth has a recognisable man's face (the same
   consent debt as the store set). Re-shoot from 1.14 on the Duo's inner display later,
   and reuse the exact PNGs the App Store needs (1398×2034 / 2007×2853) so the two sets
   never drift again.

5. **Non-iPhone visitors are dropped.** No Android waitlist, no email anywhere, no «send
   the link to my phone». One field (Cloudflare Pages Function already exists under
   `functions/`) with two reasons to type an address: Android, and «the Studio for Mac is
   a beta, tell me when it is not».

6. **Mobile nav overflows at 390 px** — Blog, Support and the language switch are off
   the right edge, so a Russian or Turkish phone cannot reach its own language. A
   wrapping row or a `<details>` menu; no JS needed.

7. **The wheel is SMIL + 14 spinning circles, forever.** It is lovely on desktop and the
   one thing on the page that burns a phone's battery while it sits in the hero. This is
   the first Rive candidate (below): one file, pauses off-screen, honours Reduce Motion,
   and the app can draw the same file.

8. **Footer and About carry the real company; the hero carries no person.** «Made by
   one founder who shipped the 2014 one» is a line, not a section, and it converts in
   this niche (family footage = trust). Rustam's call whether to be named.

9. **Studio / Engine / Tools are strong SEO pages and invisible from the hero.** A
   one-line strip under the fold: «Free tools: cut to the beat, trim, compress — in your
   browser, nothing uploaded» — those pages already exist and already rank for nothing
   because nothing links to them from the page that has the brand clicks.

10. **The App Store link carries `ct=site-hero`; nothing on the page measures a scroll
    or a play.** Two events in sda.js (hero video played, before/after reached) tell
    whether (1) and (2) did anything. Without them the redesign is taste.

## Design direction, in one paragraph

Keep the dark ground, the gradient, the type. Change the *content* of the first screen,
not the style: film first, wheel second, one CTA (the Mac button goes to the note line as
a text link — two equal buttons split a decision the visitor did not come to make). Under
it the before/after strip, then Three steps with the wheel animating inside step 01, then
proof, then the existing feature/privacy blocks. The page becomes «watch → understand →
trust → download» instead of «read → read → read».

## Rive: what Balalar has, and what carries over

Balalar's decision (ADR 001, 12 Oct): characters are **RML generated by a Python script**,
compiled offline with `rive . --once` (CLI 1.5.1, installed here, no account, no
watermark), 12–14 KB per file, played by `RiveRuntime` 6.28.1 behind an
`AnimationEngine` protocol. Inputs are **view-model properties** (`talking`, `mouthOpen`,
`lookX`, `beatPhase`…), so the host drives the picture with numbers. Costs they measured:
+10 MB debug sim, 32 MB unstripped device slice; SPM clone >7 min once; the licence grey
zone (buy Cadet before the store). Web runtime: `@rive-app/canvas-lite` 2.45, ~2.9 MB
unpacked, a few hundred KB over the wire.

The transferable idea is not the animals. It is **one data-driven file drawn by the site
and the app from the same source**, where today each surface hand-animates its own copy:

| Surface | Today | As a `.riv` driven by data |
|---|---|---|
| Calendar wheel (site hero; app's Life page is SwiftUI) | SMIL on the site, `CalendarWheelView` in Swift, two implementations of one mark | one `wheel.riv`: `month` (0..11), `filled` months as booleans, `spin` trigger. Site: hero and step 01. App: onboarding card 2 («Open the calendar, choose a day») and the empty state. **Not** the live wheel — that one is a control with gestures, ring hit-tests and a player in the middle; replacing it buys nothing |
| «Three steps» explainer | three text cards | one `steps.riv` with `step` 0..2: clips fall into the wheel → a sentence is typed → a ribbon of shots plays. Site: the section. App: `OnboardingView`'s three cards, `HowItWorksView` |
| Analysis in progress | `ScoringBars` in `MontageConsole` (SwiftUI, data-honest bars) | keep SwiftUI. The bars draw *measured* numbers, and the rule is «never draw invented data»; a canned animation here is the thing that rule forbids |
| Beat grid / «cuts to the beat» | a sentence on the site | `beat.riv` with `beatPhase` 0..1 (Balalar already has this exact input for dance): a strip of shots that cuts on the beat. Site: feature card. App: the Music step while beats are being detected, driven by the real `pulse_strength` and BPM once known |
| Empty states (`CalendarEmptyState`, Films shelf, agent screen) | static icon + sentence | a small loop with `still` for Reduce Motion, as Balalar's contract has |
| App icon / store art | hand-made | Balalar rendered its icon from the Rive rig at 3x; the wheel mark could be rendered the same way for og.png, the icon and the store banner from one source |

Rules that carry over unchanged, because both apps already have them: no `repeatForever`
in SwiftUI (the loop lives in the engine and pauses off-screen), `still` under Reduce
Motion, every tap a `Button`, triggers only from idle.

### Cost and order

- **Site first.** Zero binary cost, the CLI is installed, a `.riv` is 13 KB, the runtime
  loads lazily. Start with `wheel.riv` replacing the SMIL hero — it is the one piece that
  is both the brand mark and a battery problem. Measure CPU on a phone before and after.
- **App second, and only if two surfaces want the same file.** RiveRuntime is a 10–32 MB
  dependency on a 28 MB IPA for onboarding cards a person sees once; that is a no unless
  the Music step's beat strip or the Duo screenshots also use it. A SwiftUI
  `PhaseAnimator` version of the same three cards costs nothing and ships now; Rive earns
  its place in the app when the file is shared with the site and changes without a
  release (Balalar's «content stays data» argument, which Life2Film's onboarding does not
  have — it changes once a year).
- **Pipeline as in Balalar**: a `gen.py` writing RML into `landing/rive/<name>/`,
  `rive . --verify && rive inspect . --summary` as a test (problems must be 0),
  `--screenshot` with `--data=…` as the visual check, `.riv` committed and copied into
  `public/rive/`. Same contract names across site and app so the Swift side, if it
  comes, drives the file with the code Balalar already wrote.

## What to do first (one week, no release needed) — shipped 19 Oct 2026, `a923c3d`…`1397a03`

1. [x] Hero film + poster, lazy; Mac button to a text link; `ct=site-hero` stays. The film
   is the first 20 s of `eval/2026-06-04-extra/montage_2026-06-04.mp4` (one morning at
   the beach, no recognisable people), 720p, 3.6 MB, `preload="none"`, plays on
   visibility, not under Reduce Motion / Save-Data. **A better film replaces one file:**
   `public/video/hero.mp4` + `public/img/hero-poster.jpg`.
2. [~] Before/after: folded into the hero caption rather than a second strip — the one
   number that was verifiable («a 30-second film from one morning») is under the phone.
   A 40-clip grid needs a screen recording from the app; still open.
3. [x] Proof line under the CTA, seven locales.
4. [x] Mobile nav wraps under 720 px (was: languages off the right edge at 390 px).
5. [x] «Not on iPhone yet?»: POST `/api/waitlist`, KV `WAITLIST` (sha256(address) →
   reason, lang), honeypot, works without JS; `GET /api/waitlist` answers the two counts.
6. [x] `wheel.riv` (`rive/wheel/gen.py`, 14 rings, 4 KB, `still` for Reduce Motion:
   0 bytes change over 600 frames with it on, 117 848 off). Drawn on a canvas under the
   SVG month ring; runtime lazy, paused off-screen, wasm self-hosted (`rive.wasm` was
   loading from unpkg.com by default). **Cost measured, not guessed: 57 KB JS + 325 KB
   wasm, gzipped, once.** CPU on a phone not yet measured — the claim that stands is
   «paused off-screen», not «cheaper while visible».
7. [x] Events through the shared snippet's click hook: `hero_film_played`,
   `waitlist_sent` (on success only).

Found on the way, not changed: the page loads Google Fonts and **gtag (G-856SXW60BG)**
beside our own counter, so «nothing leaves» is not true of the website the way it is of
the app. Whether GA stays is Rustam's; the About page's privacy paragraph is about the
app and does not mention the site.

Re-shoot screenshots from 1.14 on the Duo and the people-consent cleanup go with the
App Store screenshot task in `DirectorOS/docs/plan/iphone-duo_20261017/plan.md` (task 8),
not here, so the two sets come from one session.

Not proposed: a redesign of the type, palette or page structure; testimonials that do
not exist yet; a counter of anything.
