#!/bin/sh
# Build every Rive file: gen.py → rive --verify → inspect (problems must be 0) → .riv into
# public/rive/ → a still into public/img/ (the poster the page shows until the runtime loads,
# and the fallback if it never does). Same shape as balalar-app/spikes/rive/characters/build.sh.
set -e
cd "$(dirname "$0")"
PUB="$(pwd)/../public"
mkdir -p "$PUB/rive"
# The web runtime fetches its wasm from unpkg.com unless told otherwise; the page sets
# RuntimeLoader.setWasmUrl to this copy, so nothing on life2film.com loads from a third party.
cp ../node_modules/@rive-app/canvas-lite/rive.wasm "$PUB/rive/rive.wasm"
for id in wheel; do
  ( cd "$id"
    python3 gen.py
    rive . --verify
    p=$(rive inspect . --summary | python3 -c 'import json,sys; d=json.load(sys.stdin); print(len(d["problems"]))')
    [ "$p" = 0 ] || { echo "$id: $p inspect problems"; rive inspect . --summary; exit 1; }
    rive . --once >/dev/null
    cp "build/$id.riv" "$PUB/rive/$id.riv"
    # The CLI's capture always has a (29,29,29) backdrop and no alpha flag; key it out so
    # the poster sits on the page's own black. Nothing in the file is that grey.
    rive . --screenshot="build/$id-shot.png" --advance=30 >/dev/null
    ffmpeg -v error -y -i "build/$id-shot.png" -vf "colorkey=0x1d1d1d:0.02:0.0,format=rgba" "$PUB/img/$id.png"
  )
  echo "$id $(wc -c < "$PUB/rive/$id.riv" | tr -d ' ') bytes → public/rive/$id.riv, public/img/$id.png"
done
