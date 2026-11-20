#!/bin/sh
# Pin superduper-tools to its current HEAD: package.json, the pnpm 11 allowBuilds line, the lockfile.
# Run after any registry or shell change in ~/startups/shared/superduper-tools (the hubs show the
# registry as of the pinned commit). `npm run bump-tools`
set -e
REPO="$HOME/startups/shared/superduper-tools"
H=$(git -C "$REPO" rev-parse HEAD)
python3 - "$REPO" "$H" <<'PY'
import re, sys
repo, h = sys.argv[1], sys.argv[2]
spec = re.escape(f"git+file://{repo}")
for path, pat, new in [
    ("package.json", rf'"superduper-tools": "{spec}(#[0-9a-f]+)?"', f'"superduper-tools": "git+file://{repo}#{h}"'),
    ("pnpm-workspace.yaml", rf"superduper-tools@{spec}#[0-9a-f]+: true", f"superduper-tools@git+file://{repo}#{h}: true"),
]:
    s = open(path).read()
    s2, n = re.subn(pat, new, s)
    if n != 1: sys.exit(f"{path}: expected one superduper-tools spec, found {n}")
    open(path, "w").write(s2)
PY
CI=true pnpm install --no-frozen-lockfile --config.confirmModulesPurge=false >/dev/null
grep -q "$H" pnpm-lock.yaml && echo "superduper-tools -> $(echo "$H" | cut -c1-7)"
