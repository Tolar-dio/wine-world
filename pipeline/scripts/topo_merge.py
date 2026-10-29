#!/usr/bin/env python3
"""Merge per-tile partial terrain stats (work/topo/parts/*.pkl, written by
topo_run.py) into the v2 sidecars:
  site/data/topo/{iso2}.json   main + fine features of that country
  site/data/topo/_sites.json   site points (150 m radius discs)
  site/data/topo/_attrs.json   compact per-id attributes (clim + topo)
Usage: python3 -I topo_merge.py [--check]   (--check: print validation only)
"""
import os, sys, json, glob, math, pickle
import numpy as np

sys.path.insert(0, '/home/claude/winesite/scripts')
W = '/home/claude/winesite'
WORK = f'{W}/work/topo'
OUT = os.environ.get('TOPO_OUT', f'{W}/site/data/topo')
OCT = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
R_MIN = 0.1        # slope-weighted mean resultant length below which aspect is "no dominant aspect" (null)
MIN_NONFLAT = 5    # fewer non-flat cells than this: aspect null


def hmerge(h1, h2):
    if h1 is None:
        return h2
    if h2 is None:
        return h1
    o1, c1 = h1; o2, c2 = h2
    lo = min(o1, o2); hi = max(o1 + len(c1), o2 + len(c2))
    out = np.zeros(hi - lo, dtype=np.int64)
    out[o1 - lo:o1 - lo + len(c1)] += c1
    out[o2 - lo:o2 - lo + len(c2)] += c2
    return (lo, out)


def add(A, B):
    if A is None:
        return {k: (v.copy() if isinstance(v, np.ndarray) else v) for k, v in B.items()}
    for k in ('n', 'se', 'ss', 'nf', 'gx', 'gy', 'gm', 'ux', 'uy'):
        A[k] += B[k]
    A['oc'] = A['oc'] + B['oc']
    A['eh'] = hmerge(A['eh'], B['eh']); A['sh'] = hmerge(A['sh'], B['sh'])
    return A


def pct(h, q):
    o, c = h
    cs = np.cumsum(c)
    k = np.searchsorted(cs, q * cs[-1], side='left')
    return o + int(k)


def finalize(A):
    n = A['n']
    if not n:
        return None
    e = A['se'] / n
    r = dict(e=int(round(e)), e5=pct(A['eh'], 0.05), e95=pct(A['eh'], 0.95),
             s=round(A['ss'] / n, 1), s75=round(pct(A['sh'], 0.75) / 10 + 0.05, 1))
    nn = int(A['oc'].sum())
    a = None
    if nn >= MIN_NONFLAT:
        R = math.hypot(A['gx'], A['gy']) / A['gm'] if A['gm'] > 0 else 0.0
        if R >= R_MIN:
            a = int(round(math.degrees(math.atan2(A['gx'], A['gy'])) % 360)) % 360
    r['a'] = a
    if nn:
        sh = A['oc'] / nn
        ar = [round(float(x), 2) for x in sh]
    else:
        ar = [0] * 8
    r['ar'] = [int(x) if x == int(x) else x for x in ar]
    r['fl'] = round(A['nf'] / n, 2)
    r['n'] = int(n)
    return r


def load_parts():
    acc = {}
    meta = []
    for p in sorted(glob.glob(f'{WORK}/parts/*.pkl')):
        d = pickle.load(open(p, 'rb'))
        meta.append(d['meta'])
        res90 = d['meta']['res'] == '90'
        for k, slots in d['out'].items():
            for w, A in slots.items():
                key = (k, w)
                acc[key] = add(acc.get(key), A)
                if res90:
                    acc.setdefault(('_90', k), True)
    return acc, meta


def group_stats(prep, acc, apply_fix=True):
    out = {}
    for k, gi in prep['groups'].items():
        src = None; mode = 'center'
        land = acc.get((k, 'land'))
        wet = acc.get((k, 'wet'))
        if gi.get('tiny'):
            atl = acc.get((k + '@at', 'land')); atw = acc.get((k + '@at', 'wet'))
            ncent = (land['n'] if land else 0)
            if ncent < 4:
                land, wet, mode = atl, atw, 'touched'
        if land and land['n']:
            src = land
        elif wet and wet['n']:
            src = wet; mode += '+water'
        st = finalize(src) if src else None
        if st is not None:
            if gi.get('big'):
                st['sub'] = 1
            if acc.get(('_90', k)):
                st['g90'] = 1
        out[k] = (st, mode)
    # second pass for site discs that are (almost) all water (topo_sites_fix.py)
    fixp = f'{WORK}/sites_fix.pkl'
    if apply_fix and os.path.exists(fixp):
        for k, fx in pickle.load(open(fixp, 'rb')).items():
            st = finalize(fx['acc'])
            st['r'] = fx['r']
            if fx['wet']:
                st['w'] = 1
            out[k] = (st, out[k][1] + '+r500')
    return out


def r_area(a):
    if a is None:
        return None
    if a >= 100:
        return round(a, 1)
    if a >= 1:
        return round(a, 2)
    return round(a, 3)


def main():
    check = '--check' in sys.argv
    prep = pickle.load(open(f'{WORK}/prep.pkl', 'rb'))
    acc, meta = load_parts()
    gs = group_stats(prep, acc)
    feats = prep['feats']
    by_id = {}
    for f in feats:
        st, mode = gs[f['key']]
        by_id[f['id']] = (f, st, mode)
    if check:
        return by_id
    os.makedirs(OUT, exist_ok=True)
    per_iso = {}
    sites = {}
    attrs = {'_cols': ['country', 'gst', 'gdd', 'hi', 'prec', 'gsp', 'dtr', 'mjt', 'elev_mean', 'slope_mean', 'aspect_mean', 'area_km2', 'fine']}
    missing = []
    for fid, (f, st, mode) in by_id.items():
        if f.get('site'):
            if st is None:
                missing.append(fid); continue
            sites[fid] = st
            continue
        if st is None:
            missing.append(fid)
        else:
            per_iso.setdefault(f['iso'], {})[fid] = st
        c = f['clim']
        ga = prep['groups'][f['key']]['area']
        ap = f.get('area_prop')
        area = ap if (ap is not None and ap >= 10) else r_area(ga)
        attrs[fid] = [f['country'], c.get('gst'), c.get('gdd'), c.get('hi'), c.get('prec'), c.get('gsp'), c.get('dtr'), c.get('mjt'),
                      st['e'] if st else None, st['s'] if st else None, st['a'] if st else None, area, f['fine']]
    sizes = {}
    for iso, d in sorted(per_iso.items()):
        p = f'{OUT}/{iso}.json'
        json.dump(d, open(p, 'w'), separators=(',', ':'), ensure_ascii=False)
        sizes[os.path.basename(p)] = os.path.getsize(p)
    p = f'{OUT}/_sites.json'
    json.dump(sites, open(p, 'w'), separators=(',', ':'), ensure_ascii=False)
    sizes['_sites.json'] = os.path.getsize(p)
    p = f'{OUT}/_attrs.json'
    json.dump(attrs, open(p, 'w'), separators=(',', ':'), ensure_ascii=False)
    sizes['_attrs.json'] = os.path.getsize(p)
    summ = dict(n_main=sum(1 for f in feats if not f.get('site') and not f['fine']),
                n_fine=sum(1 for f in feats if f['fine']), n_sites=len(sites), n_attrs=len(attrs) - 1,
                missing=missing, sizes=sizes, tiles=len(meta), tiles90=sum(1 for m in meta if m['res'] == '90'),
                blocks=sum(m['nblocks'] for m in meta), cells=sum(m['ncells'] for m in meta),
                tile_secs=sum(m['secs'] for m in meta),
                modes={k: sum(1 for v in by_id.values() if v[2] == k) for k in set(v[2] for v in by_id.values())},
                sub=[fid for fid, (f, st, m) in by_id.items() if st and st.get('sub')])
    json.dump(summ, open(f'{WORK}/merge_summary.json', 'w'), indent=1)
    print(json.dumps({k: (v if k != 'missing' else len(v)) for k, v in summ.items() if k not in ('sub',)}, indent=1))
    print('missing ids (first 30):', missing[:30])
    print('subsampled', len(summ['sub']))


if __name__ == '__main__':
    main()
