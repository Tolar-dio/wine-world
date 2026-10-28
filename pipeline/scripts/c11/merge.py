"""Merge c11 part files into data/content/c11_south_america.json and validate.
Run: python3 -I scripts/c11/merge.py
"""
import glob
import json
import os
import sys

sys.path.insert(0, "/home/claude/winesite/scripts/c11")
from c11_common import PARTS, ROOT, check  # noqa: E402

ORDER = ["cl", "ar", "uy", "br", "pe", "bo", "py", "co", "ve", "ec"]
out = {"countries": [], "regions": [], "appellations": [], "sites": []}
files = {os.path.basename(p)[:-5]: p for p in glob.glob(os.path.join(PARTS, "*.json"))}
for iso in ORDER + sorted(set(files) - set(ORDER)):
    if iso not in files:
        continue
    d = json.load(open(files[iso], encoding="utf-8"))
    for k in out:
        out[k].extend(d.get(k, []))
probs = check(out)
for p in probs:
    print("PROBLEM:", p)
dest = os.path.join(ROOT, "data", "content", "c11_south_america.json")
tmp = dest + ".tmp"
with open(tmp, "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
json.load(open(tmp, encoding="utf-8"))
os.replace(tmp, dest)
print(f"wrote {dest}: " + ", ".join(f"{k} {len(v)}" for k, v in out.items()) + f"; {len(probs)} problems")
