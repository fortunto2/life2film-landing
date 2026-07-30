# life2film.com

Landing site for [Life2Film](https://life2film.com) — Astro static site on Cloudflare Pages,
English / Russian / Turkish.

This repository also hosts the releases for **Life2Film Studio**, the macOS desktop app.

---

## Life2Film Studio (public beta)

A desktop video analyser and montage builder. Where the iPhone app handles a day or a trip, Studio
is aimed at the archive that has been piling up for years: it scores every frame, works out where
scenes genuinely change, and assembles montages from the segments worth keeping.

```sh
brew install --cask fortunto2/tap/life2film-studio
```

Or grab the DMG from [Releases](https://github.com/fortunto2/life2film-landing/releases).
Apple Silicon, macOS 13+. Signed with a Developer ID and notarised by Apple, so it opens without
Gatekeeper warnings. ffmpeg is linked statically — nothing to install first.

### What it does

- **Scores every frame.** Thirty measurements per frame: sharpness, stability, noise, exposure and
  contrast balance, composition, symmetry, horizon level, attention saliency, bokeh, colour harmony,
  texture energy, aesthetic score, and more. Faces are detected with a YOLO model; face quality
  combines detector confidence, landmark visibility and the share of frame the face occupies.
- **Finds the segments.** An ensemble of detectors decides where a scene actually changes rather
  than cutting whenever the camera moves. Shots are classified by scale, close-up through wide.
- **Assembles the montage.** Segments are ranked, trimmed and laid out to a target duration, with
  audio energy and beat positions shaping where the cuts land.

Everything runs locally. Originals are never modified and nothing is uploaded.

**It is a beta.** The analysis engine is the mature part; the interface around it is not. Expect
rough edges. Bugs and requests: <info@superduperai.co>.

---

## The site

```sh
pnpm install
pnpm dev        # localhost:4321
pnpm build      # → dist/
pnpm deploy     # build + wrangler pages deploy
```

Pushing to `main` deploys through GitHub Actions once `CLOUDFLARE_API_TOKEN` is set in repository
secrets (`CLOUDFLARE_ACCOUNT_ID` already is).

Structure:

```
src/i18n.ts              all copy, three languages
src/layouts/Base.astro   shell, nav, global styles
src/components/          CalendarWheel (the 2018 logo pattern), Landing, About
src/pages/               index + /ru + /tr, about, studio, privacy, support
```

The calendar wheel is the original LIFE2FILM logo animation (design: MANITOU, ann.ridzel),
restored as standalone SVG and extended with the app's month ring.
