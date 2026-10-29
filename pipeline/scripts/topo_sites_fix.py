#!/usr/bin/env python3
"""Second pass for sites whose 150 m disc has (almost) no land cell in the
Copernicus water body mask (approximate points that fall in a lake, the sea or
a river channel).  Their stats are recomputed on a 500 m disc, land cells only.
Writes work/topo/sites_fix.pkl {site geometry key: acc}; topo_merge.py uses it
and adds "r":500 to those entries (or "w":1 when even 500 m holds no land).
Usage: python3 -I topo_sites_fix.py   (after topo_run.py; reads work/topo/prep.pkl and parts)
"""
import sys, math, pickle
sys.path.insert(0, '/home/claude/winesite/scripts')
import topo_run as tr
import topo_merge as tm
import numpy as np
import rasterio
from rasterio.features import geometry_mask
from shapely.geometry import mapping

R2 = 500.0
MIN_LAND = 4


def main():
    prep = pickle.load(open(f'{tr.WORK}/prep.pkl', 'rb'))
    acc, _ = tm.load_parts()
    gs = tm.group_stats(prep, acc, apply_fix=False)
    todo = {}
    for f in prep['feats']:
        if not f.get('site'):
            continue
        st, mode = gs[f['key']]
        if 'water' in mode or (st and st['n'] < MIN_LAND):
            todo[f['key']] = f['lonlat']
    out = {}
    for k, (lon, lat) in todo.items():
        g = tr.site_disc(lon, lat, R2)
        res = '30' if tr.tname(math.floor(lat), math.floor(lon)) in set(l.strip() for l in open(f'{tr.W}/raw/copdem30/tileList.txt')) else '90'
        url, wurl = tr.urls(tr.tname(math.floor(lat), math.floor(lon), res), res)
        with rasterio.open(url) as ds, rasterio.open(wurl) as wb:
            w, s, e, n = g.buffer(0.002).bounds
            win = ds.window(w, s, e, n).round_offsets().round_lengths()
            Z = ds.read(1, window=win, boundless=True, fill_value=0).astype(np.float32)
            WB = wb.read(1, window=win, boundless=True, fill_value=1) > 0
            T = ds.window_transform(win)
        S, X, Y = tr.horn(Z, T, 0)
        m = geometry_mask([mapping(g)], out_shape=Z.shape, transform=T, invert=True)
        A, wet = tr.stats_from(m, Z, S, X, Y, WB)
        out[k] = dict(acc=A, wet=wet, r=int(R2))
        print(k, (lon, lat), 'wet' if wet else 'land', tm.finalize(A))
    pickle.dump(out, open(f'{tr.WORK}/sites_fix.pkl', 'wb'))


if __name__ == '__main__':
    main()
