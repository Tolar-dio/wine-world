# T04: build Roero / Dogliani MGA geometries from the cadastral parcels listed in the disciplinari annexes.
# Usage: python3 -I scripts/itb_t04_fetch.py roero|dogliani
import json, sys, time
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import itb_cadastre as K
import shapely
from shapely.geometry import box

k = sys.argv[1]
rows = json.load(open(f'{C.WORKB}/mga_{k}.json'))
coms = sorted({r['comune'] for r in rows}, key=C.norm)
cg = {}
for c in coms:
    cg[C.norm(c)] = C.to4326(C.comune(c))
allc = shapely.union_all(list(cg.values()))
t = time.time()
Z = K.zoning(allc.bounds, allc)
print('fogli', len(Z), round(time.time() - t), 's', flush=True)
# code -> comune by overlap
code_com = {}
for ref, g in Z.items():
    code = ref.split('_')[0]
    for ck, gg in cg.items():
        if g.representative_point().within(gg):
            code_com.setdefault(code, {}).setdefault(ck, 0)
            code_com[code][ck] += 1
com_code = {}
for code, d in code_com.items():
    ck = max(d, key=d.get)
    if d[ck] >= 2 or ck not in com_code:
        com_code.setdefault(ck, code)
print('codes', com_code, flush=True)
out = []
miss_f = []
for i, r in enumerate(rows):
    ck = C.norm(r['comune'])
    code = com_code.get(ck)
    if not code:
        miss_f.append((r['mga'], r['comune'], r['foglio'], 'no code'))
        continue
    pref = f"{code}_{r['foglio']:04d}"
    cands = sorted([ref for ref in Z if ref.startswith(pref)])
    if r.get('allegato'):
        cands = [c for c in cands if c[len(pref):].startswith(r['allegato'])] or cands
    if not cands:
        miss_f.append((r['mga'], r['comune'], r['foglio'], 'no foglio'))
        continue
    got, lost = [], []
    for ref in cands:
        fg = Z[ref]
        P = K.parcels_in(fg, ref)
        for lab in r['particelle']:
            if lab in P:
                got.append(P[lab])
        found = set(r['particelle']) & set(P)
        if found:
            break
    lost = [lab for lab in r['particelle'] if lab not in found]
    g = shapely.union_all(got) if got else None
    out.append({'mga': r['mga'], 'comune': r['comune'], 'foglio': r['foglio'], 'ref': ref,
                'n': len(r['particelle']), 'found': len(r['particelle']) - len(lost), 'lost': lost[:50],
                'geom': shapely.geometry.mapping(g) if g is not None else None})
    print(i, r['mga'], r['comune'], r['foglio'], f"{len(r['particelle']) - len(lost)}/{len(r['particelle'])}",
          round(time.time() - t), flush=True)
json.dump({'rows': out, 'missing_fogli': miss_f, 'codes': com_code, 'failed_tiles': K.FAILED}, open(f'{C.WORKB}/mga_{k}_geom.json', 'w'))
print('done', len(out), 'missing fogli', miss_f)
