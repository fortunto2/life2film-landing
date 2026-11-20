"""Score key-eval.ts output against djay's keyIndex.

djay's keyIndex encoding is not documented; the fixed map below was found by structure search (see
the comment on it). Reports exact agreement and the neighbours MIREX counts at partial credit
(fifth 0.5, relative 0.3, parallel 0.2).
"""
import collections, json, sys

man = {m["id"]: m for m in json.load(open(sys.argv[1]))}
ours = [json.loads(l) for l in open(sys.argv[2])]
NAMES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]


def k(t):
    return (t[0], t[1])


# djay keyIndex: pairs (major, its relative minor), tonic rising chromatically from C:
# 0 = C, 1 = Am, 2 = C#, 3 = Bbm, 4 = D, 5 = Bm ... 23 = G#m. Found 20 Nov 2026 by searching every
# structured layout (pairs or halves, chromatic or by fifths, any start, relative or parallel
# minor) for the one that best explains 120 tracks: 70 agreements against 50 for the runner-up.
# Fixed here so the score below is not inflated by fitting the map to our own answers.
mapping = {i: ((i // 2), "major") if i % 2 == 0 else (((i // 2) + 9) % 12, "minor") for i in range(24)}


def relation(a, b):
    if a == b:
        return "exact"
    (ta, ma), (tb, mb) = a, b
    if ma == mb and (tb - ta) % 12 in (5, 7):
        return "fifth"
    if ma != mb:
        major, minor = (a, b) if ma == "major" else (b, a)
        if (major[0] - minor[0]) % 12 == 3:
            return "relative"
        if major[0] == minor[0]:
            return "parallel"
    return "other"


WEIGHT = {"exact": 1, "fifth": 0.5, "relative": 0.3, "parallel": 0.2, "other": 0}
counts = collections.Counter()
alt_hits = 0
for o in ours:
    truth = mapping.get(man[o["id"]]["djay"])
    r = relation(k(o["best"]), truth)
    counts[r] += 1
    if r != "exact" and k(o["alt"]) == truth:
        alt_hits += 1
n = len(ours)
print(f"\n{n} tracks, djay keyConfidence >= 0.7")
for r in ["exact", "fifth", "relative", "parallel", "other"]:
    print(f"  {r:9} {counts[r]:>3}  {counts[r] / n:.0%}")
print(f"  MIREX weighted score {sum(WEIGHT[r] * c for r, c in counts.items()) / n:.2f}")
print(f"  misses where our second guess is djay's key: {alt_hits}/{n - counts['exact']}")
