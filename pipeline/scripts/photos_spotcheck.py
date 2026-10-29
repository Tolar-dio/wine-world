#!/usr/bin/env python3
"""Spot-check photo picks: sample N entries across countries and types, print their caption with the
Commons description and categories, and download the 960px thumbnail of the first image to a scratch
folder for visual review.
Usage: python3 scripts/photos_spotcheck.py N SEED OUTDIR [type-filter]
"""
import json, os, sys, random, glob, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from photos_common import S

D = '/home/claude/winesite/site/data/photos'
W = '/home/claude/winesite/work/photos'
n, seed, outdir = int(sys.argv[1]), int(sys.argv[2]), sys.argv[3]
flt = sys.argv[4] if len(sys.argv) > 4 else None
os.makedirs(outdir, exist_ok=True)
dbg = json.load(open(f'{W}/picks_debug.json'))
T = {t['id']: t for t in json.load(open(f'{W}/targets.json'))}
items = []
for f in sorted(glob.glob(f'{D}/*.json')):
    for k, v in json.load(open(f)).items():
        if flt and T.get(k, {}).get('type') != flt:
            continue
        items.append((os.path.basename(f)[:-5], k, v))
rnd = random.Random(seed)
by = {}
for it in items:
    by.setdefault(it[0], []).append(it)
# stratify: one per country file in random order, then fill
keys = list(by)
rnd.shuffle(keys)
sample = []
while len(sample) < n and any(by.values()):
    for k in keys:
        if by[k] and len(sample) < n:
            sample.append(by[k].pop(rnd.randrange(len(by[k]))))
for i, (dest, k, v) in enumerate(sample):
    e = v[0]
    d = next((x for x in dbg.get(k, []) if x['file'] == e['file']), {})
    fn = f'{outdir}/{i:02d}_{k[:40]}.jpg'
    if not os.path.exists(fn):
        r = S.get(e['thumb'], timeout=60)
        if r.status_code == 200:
            open(fn, 'wb').write(r.content)
        time.sleep(1)
    print(f"[{i:02d}] {k} ({T.get(k, {}).get('type')}) | {e['caption']}\n     {e['file']} | {e['license']} | {e['author']}\n"
          f"     src={d.get('src')} desc={d.get('desc', '')[:140]!r}\n     cats={d.get('cats', '')[:160]!r}")
