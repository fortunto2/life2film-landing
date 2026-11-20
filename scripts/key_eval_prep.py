"""Pick N tracks djay has analysed with key confidence >= 0.7, decode 120 s of each to mono f32 at
22 050 Hz, write a manifest for key-eval.ts plus djay's keyIndex / secondKeyIndex per track.

djay's own analysis is the ground truth here for the same reason it is for beats in video-analyzer
(scripts/beat_eval.py): a DJ plays on it for hours. This Mac only.
"""
import glob, json, os, plistlib, random, re, shutil, sqlite3, subprocess, sys, tempfile
from urllib.parse import unquote

LIB = os.path.expanduser("~/Music/djay/djay Media Library.djayMediaLibrary")
META = os.path.expanduser("~/Library/Group Containers/VJXTL73S8G.com.algoriddim.userdata/Library/Application Support/Algoriddim/Metadata")
n, out = int(sys.argv[1]), sys.argv[2]
os.makedirs(out, exist_ok=True)

tmp = tempfile.mkdtemp()
for s in ("", "-wal", "-shm"):
    if os.path.exists(os.path.join(LIB, "MediaLibrary.db" + s)):
        shutil.copy(os.path.join(LIB, "MediaLibrary.db" + s), os.path.join(tmp, "MediaLibrary.db" + s))
paths = {}
for key, data in sqlite3.connect(os.path.join(tmp, "MediaLibrary.db")).execute("SELECT key, data FROM database2 WHERE collection = 'localMediaItemLocations'"):
    f = re.findall(rb"file://[^\x00\x08\x10]+", data or b"")
    if f:
        paths[key] = unquote(f[0].decode("utf-8", "ignore")).replace("file://", "")

files = glob.glob(os.path.join(META, "*", "*.djayMetadata"))
random.Random(7).shuffle(files)
items = []
for m in files:
    if len(items) >= n:
        break
    uuid = os.path.basename(m)[: -len(".djayMetadata")]
    p = paths.get(uuid)
    if not p or not os.path.exists(p):
        continue
    try:
        ki = plistlib.load(open(m, "rb")).get("keyInfo") or {}
    except Exception:
        continue
    if ki.get("keyConfidence", 0) < 0.7 or "keyIndex" not in ki:
        continue
    pcm = os.path.join(out, uuid + ".f32")
    r = subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "20", "-t", "120", "-i", p, "-ac", "1", "-ar", "22050", "-f", "f32le", pcm])
    if r.returncode or os.path.getsize(pcm) < 22050 * 4 * 30:
        continue
    items.append({"id": uuid, "pcm": pcm, "djay": ki["keyIndex"], "djay2": ki.get("secondKeyIndex"), "conf": ki["keyConfidence"]})
json.dump(items, open(os.path.join(out, "manifest.json"), "w"))
print(len(items), "tracks")
