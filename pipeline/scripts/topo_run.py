#!/usr/bin/env python3
"""Vitis Mundi v2: terrain statistics from Copernicus DEM GLO-30.

Step 1 (this script): per 1x1 degree DEM tile, partial statistics for every
appellation polygon, fine unit and site disc that touches the tile.  Results
are written to work/topo/parts/{tile}.pkl so the run can be resumed.
Step 2: scripts/topo_merge.py merges the parts and writes site/data/topo/.

DEM access: Cloud Optimized GeoTIFFs on s3://copernicus-dem-30m read by HTTP
range requests through GDAL /vsicurl/; only the 1024x1024 internal blocks that
the features need are fetched.  The 9 tiles missing from the public GLO-30
release (Armenia, Azerbaijan, parts of Georgia; only sites need them) are read
from GLO-90 instead.

Method summary (see work/topo-log.md):
 * Horn (1981) 3x3 gradient with metric cell sizes computed per row on the
   WGS84 ellipsoid (dx = dlon * N(phi) cos(phi), dy = dlat * M(phi)).
 * aspect = azimuth of steepest descent, 0 = north, clockwise.
 * water cells (Copernicus water body mask: ocean, lake, river) excluded.
 * cells counted when their centre falls inside the polygon; polygons under
   0.1 km2 and the 150 m site discs also get an all-touched tally, used by
   topo_merge.py when fewer than 4 centres fall inside.
 * polygons >= BIG_KM2 (10,000 km2) are sampled on a regular lattice of DEM
   blocks (1024x1024-cell blocks with even row and column index inside each
   tile, i.e. one block in four, about 25% of the area) at full 30 m
   resolution; every other polygon uses every cell.
Usage: python3 -I topo_run.py [--tiles T1,T2] [--workers N]
"""
import os, sys, json, glob, math, time, pickle, hashlib, threading, traceback

os.environ.update(
    GDAL_DISABLE_READDIR_ON_OPEN='EMPTY_DIR',
    CPL_VSIL_CURL_ALLOWED_EXTENSIONS='.tif',
    GDAL_HTTP_MERGE_CONSECUTIVE_RANGES='YES',
    GDAL_HTTP_MULTIPLEX='YES',
    GDAL_HTTP_VERSION='2',
    GDAL_HTTP_MAX_RETRY='5',
    GDAL_HTTP_RETRY_DELAY='3',
    GDAL_CACHEMAX='64',
    CPL_VSIL_CURL_CACHE_SIZE='33554432',
)
import numpy as np
import shapely
from shapely.geometry import shape, box, Polygon
from shapely.prepared import prep
from pyproj import Geod

W = '/home/claude/winesite'
GEO = f'{W}/site/data/geo'
WORK = f'{W}/work/topo'
PARTS = f'{WORK}/parts'
BIG_KM2 = 10000.0
TINY_KM2 = 0.1
SITE_R = 150.0
A_WGS, F_WGS = 6378137.0, 1 / 298.257223563
E2 = F_WGS * (2 - F_WGS)
GEOD = Geod(ellps='WGS84')
S3 = {'30': 'https://copernicus-dem-30m.s3.amazonaws.com', '90': 'https://copernicus-dem-90m.s3.amazonaws.com'}


def tname(lat0, lon0, res='30'):
    code = '10' if res == '30' else '30'
    ns = 'N' if lat0 >= 0 else 'S'
    ew = 'E' if lon0 >= 0 else 'W'
    return f'Copernicus_DSM_COG_{code}_{ns}{abs(lat0):02d}_00_{ew}{abs(lon0):03d}_00_DEM'


def urls(tile, res):
    base = f"{S3[res]}/{tile}"
    wbm = tile[:-4] + '_WBM'
    return f'/vsicurl/{base}/{tile}.tif', f'/vsicurl/{base}/AUXFILES/{wbm}.tif'


def radii(lat):
    s = math.sin(math.radians(lat))
    w = 1 - E2 * s * s
    N = A_WGS / math.sqrt(w)
    M = A_WGS * (1 - E2) / w ** 1.5
    return N, M


def site_disc(lon, lat, r=SITE_R, k=48):
    N, M = radii(lat)
    dlat = math.degrees(r / M)
    dlon = math.degrees(r / (N * math.cos(math.radians(lat))))
    return Polygon([(lon + dlon * math.cos(2 * math.pi * i / k), lat + dlat * math.sin(2 * math.pi * i / k)) for i in range(k)])


def gkey(g):
    return hashlib.sha1(shapely.to_wkb(g)).hexdigest()[:16]


# ----------------------------------------------------------------- prep
def build_tasks():
    avail30 = set(l.strip() for l in open(f'{W}/raw/copdem30/tileList.txt') if l.strip())
    groups = {}   # key -> {ids:[...], big, tiny, area}
    geoms = {}
    feats = []    # (id, iso, fine, key, props-lite)
    for f in sorted(glob.glob(f'{GEO}/*.geojson')):
        b = os.path.basename(f)
        if b.startswith('_'):
            continue
        iso = b.split('.')[0].split('_')[0]
        fine = '_fine' in b
        for ft in json.load(open(f))['features']:
            p = ft['properties']
            g = shape(ft['geometry'])
            if not g.is_valid:
                g = g.buffer(0)
            k = 'g' + gkey(g)
            if k not in groups:
                area = abs(GEOD.geometry_area_perimeter(g)[0]) / 1e6
                groups[k] = dict(ids=[], big=area >= BIG_KM2, tiny=area < TINY_KM2, area=area, kind='poly')
                geoms[k] = g
            groups[k]['ids'].append(p['id'])
            feats.append(dict(id=p['id'], iso=iso, fine=int(fine), key=k, country=p.get('country', iso),
                              clim=p.get('clim') or {}, area_prop=p.get('area')))
    for ft in json.load(open(f'{GEO}/_sites.geojson'))['features']:
        p = ft['properties']
        lon, lat = ft['geometry']['coordinates'][:2]
        g = site_disc(lon, lat)
        k = 's' + gkey(g)
        if k not in groups:
            groups[k] = dict(ids=[], big=False, tiny=True, area=math.pi * SITE_R ** 2 / 1e6, kind='site')
            geoms[k] = g
        groups[k]['ids'].append(p['id'])
        feats.append(dict(id=p['id'], iso=p.get('country'), fine=0, key=k, site=1, lonlat=[lon, lat]))
    tasks = {}
    for k, g in geoms.items():
        w, s, e, n = g.bounds
        pg = prep(g)
        for la in range(math.floor(s), math.floor(n) + 1):
            for lo in range(math.floor(w), math.floor(e) + 1):
                tb = box(lo, la, lo + 1, la + 1)
                if not pg.intersects(tb):
                    continue
                t30 = tname(la, lo, '30')
                if t30 in avail30:
                    tile, res = t30, '30'
                else:
                    tile, res = tname(la, lo, '90'), '90'
                eps = 0.002
                if pg.contains(tb.buffer(eps, join_style=2)):
                    cg = box(lo - eps, la - eps, lo + 1 + eps, la + 1 + eps)
                else:
                    cg = g.intersection(box(lo - eps, la - eps, lo + 1 + eps, la + 1 + eps))
                if cg.is_empty:
                    continue
                tasks.setdefault((tile, res), []).append((k, cg, groups[k]['big'], groups[k]['tiny']))
    return groups, feats, tasks


# ----------------------------------------------------------------- worker
_tl = threading.local()


def _read_block(args):
    url, r0, r1, c0, c1 = args
    import rasterio
    from rasterio.windows import Window
    last = None
    for attempt in range(5):
        try:
            with rasterio.open(url) as ds:
                return ds.read(1, window=Window(c0, r0, c1 - c0, r1 - r0))
        except Exception as ex:  # network hiccup
            last = ex
            time.sleep(2 + 4 * attempt)
    raise last


def read_rect(url, R0, R1, C0, C1, bh, bw, pool):
    jobs = []
    for r in range(R0, R1, bh):
        for c in range(C0, C1, bw):
            jobs.append((url, r, min(R1, r + bh), c, min(C1, c + bw)))
    parts = list(pool.map(_read_block, jobs))
    out = np.empty((R1 - R0, C1 - C0), dtype=parts[0].dtype)
    for (u, r0, r1, c0, c1), a in zip(jobs, parts):
        out[r0 - R0:r1 - R0, c0 - C0:c1 - C0] = a
    return out


def horn(Z, T, R0):
    """Return slope_pct, dz/dx (east), dz/dn (north) as float32 arrays."""
    h = Z.shape[0]
    lat = T.f + (R0 + np.arange(h) + 0.5) * T.e
    s = np.sin(np.radians(lat))
    w = 1 - E2 * s * s
    N = A_WGS / np.sqrt(w)
    M = A_WGS * (1 - E2) / w ** 1.5
    dx = (np.radians(abs(T.a)) * N * np.cos(np.radians(lat))).astype(np.float32)[:, None]
    dy = (np.radians(abs(T.e)) * M).astype(np.float32)[:, None]
    Zp = np.pad(Z, 1, mode='reflect', reflect_type='odd')
    a = Zp[:-2, :-2]; b = Zp[:-2, 1:-1]; c = Zp[:-2, 2:]
    d = Zp[1:-1, :-2]; f = Zp[1:-1, 2:]
    g = Zp[2:, :-2]; hh = Zp[2:, 1:-1]; i = Zp[2:, 2:]
    dzdx = ((c + 2 * f + i) - (a + 2 * d + g)) / (8 * dx)
    dzdn = ((a + 2 * b + c) - (g + 2 * hh + i)) / (8 * dy)
    del Zp
    S = np.hypot(dzdx, dzdn) * np.float32(100)
    return S, dzdx, dzdn


def _hist(vals):
    mn = int(vals.min())
    return (mn, np.bincount(vals - mn).astype(np.int32))


def _hmerge(h1, h2):
    if h1 is None:
        return h2
    o1, c1 = h1; o2, c2 = h2
    lo = min(o1, o2); hi = max(o1 + len(c1), o2 + len(c2))
    out = np.zeros(hi - lo, dtype=np.int64)
    out[o1 - lo:o1 - lo + len(c1)] += c1
    out[o2 - lo:o2 - lo + len(c2)] += c2
    return (lo, out.astype(np.int32) if out.max() < 2**31 - 1 else out)


def acc_new():
    return dict(n=0, se=0.0, eh=None, ss=0.0, sh=None, nf=0, oc=np.zeros(8, np.int64), gx=0.0, gy=0.0, gm=0.0, ux=0.0, uy=0.0)


def acc_add(A, B):
    A['n'] += B['n']; A['se'] += B['se']; A['ss'] += B['ss']; A['nf'] += B['nf']
    A['oc'] = A['oc'] + B['oc']; A['gx'] += B['gx']; A['gy'] += B['gy']; A['gm'] += B['gm']; A['ux'] += B['ux']; A['uy'] += B['uy']
    A['eh'] = _hmerge(A['eh'], B['eh']); A['sh'] = _hmerge(A['sh'], B['sh'])
    return A


def stats_from(m, Zw, Sw, Xw, Yw, Ww):
    """Partial stats for mask m. Returns (acc, wet) or None."""
    if not m.any():
        return None
    land = m & ~Ww
    wet = False
    if not land.any():
        land = m
        wet = True
    e = Zw[land]
    s = Sw[land]
    nonflat = s >= 2.0
    gx = -Xw[land][nonflat].astype(np.float64)
    gy = -Yw[land][nonflat].astype(np.float64)
    A = acc_new()
    A['n'] = int(e.size)
    A['se'] = float(e.sum(dtype=np.float64))
    A['eh'] = _hist(np.rint(e).astype(np.int32))
    A['ss'] = float(s.sum(dtype=np.float64))
    A['sh'] = _hist(np.minimum((s * 10).astype(np.int32), 30000))
    A['nf'] = int(e.size - nonflat.sum())
    if gx.size:
        asp = np.degrees(np.arctan2(gx, gy)) % 360.0
        A['oc'] = np.bincount((((asp + 22.5) // 45).astype(np.int64)) % 8, minlength=8)
        mag = np.hypot(gx, gy)
        A['gx'] = float(gx.sum()); A['gy'] = float(gy.sum()); A['gm'] = float(mag.sum())
        A['ux'] = float((gx / mag).sum()); A['uy'] = float((gy / mag).sum())
    return A, wet


def put(res, k, A, wet):
    slot = res.setdefault(k, {})
    w = 'wet' if wet else 'land'
    if w in slot:
        acc_add(slot[w], A)
    else:
        slot[w] = A


def components(need):
    need = set(need); comps = []
    while need:
        st = [need.pop()]; comp = set(st)
        while st:
            i, j = st.pop()
            for nb in ((i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)):
                if nb in need:
                    need.remove(nb); comp.add(nb); st.append(nb)
        comps.append((min(i for i, _ in comp), max(i for i, _ in comp) + 1, min(j for _, j in comp), max(j for _, j in comp) + 1))
    return comps


def process(task):
    (tile, res), items = task
    outp = f'{PARTS}/{tile}.pkl'
    if os.path.exists(outp):
        return tile, 'cached', 0.0, 0
    import rasterio
    from rasterio.features import geometry_mask
    from rasterio.transform import Affine
    from concurrent.futures import ThreadPoolExecutor
    t0 = time.time()
    dem_url, wbm_url = urls(tile, res)
    try:
        with rasterio.open(dem_url) as ds:
            H, Wd = ds.height, ds.width
            T = ds.transform
            bh, bw = ds.block_shapes[0]
    except Exception as ex:
        return tile, 'ERR open ' + str(ex)[:200], time.time() - t0, 0
    inv = ~T
    nbr, nbc = -(-H // bh), -(-Wd // bw)

    def pixwin(g):
        w, s, e, n = g.bounds
        c0, r0 = inv * (w, n)
        c1, r1 = inv * (e, s)
        return max(0, math.floor(r0) - 1), min(H, math.ceil(r1) + 1), max(0, math.floor(c0) - 1), min(Wd, math.ceil(c1) + 1)

    def blockbox(bi, bj):
        r0, r1 = bi * bh, min(H, (bi + 1) * bh)
        c0, c1 = bj * bw, min(Wd, (bj + 1) * bw)
        x0, y0 = T * (c0, r0)
        x1, y1 = T * (c1, r1)
        return box(x0, y1, x1, y0), (r0, r1, c0, c1)

    need = set(); plans = []
    for k, g, big, tiny in items:
        r0, r1, c0, c1 = pixwin(g)
        if r0 >= r1 or c0 >= c1:
            continue
        if big:
            blks = []
            pg = prep(g)
            for bi in range(0, nbr, 2):
                for bj in range(0, nbc, 2):
                    bb, (br0, br1, bc0, bc1) = blockbox(bi, bj)
                    if br1 <= r0 or br0 >= r1 or bc1 <= c0 or bc0 >= c1:
                        continue
                    if pg.intersects(bb):
                        blks.append((bi, bj)); need.add((bi, bj))
            if blks:
                plans.append((k, g, big, tiny, blks, None))
        else:
            for bi in range(r0 // bh, (r1 - 1) // bh + 1):
                for bj in range(c0 // bw, (c1 - 1) // bw + 1):
                    need.add((bi, bj))
            plans.append((k, g, big, tiny, None, (r0, r1, c0, c1)))
    out = {}
    ncells = 0
    with ThreadPoolExecutor(8) as pool:
        for (bi0, bi1, bj0, bj1) in components(need):
            R0, R1 = bi0 * bh, min(H, bi1 * bh)
            C0, C1 = bj0 * bw, min(Wd, bj1 * bw)
            Z = read_rect(dem_url, R0, R1, C0, C1, bh, bw, pool).astype(np.float32)
            try:
                WB = read_rect(wbm_url, R0, R1, C0, C1, bh, bw, pool) > 0
            except Exception:
                WB = np.zeros(Z.shape, bool)
            ncells += Z.size
            S, X, Y = horn(Z, T, R0)
            for k, g, big, tiny, blks, win in plans:
                if big:
                    wins = []
                    for (bi, bj) in blks:
                        if bi0 <= bi < bi1 and bj0 <= bj < bj1:
                            _, (r0, r1, c0, c1) = blockbox(bi, bj)
                            wins.append((r0, r1, c0, c1))
                else:
                    r0, r1, c0, c1 = win
                    r0, r1, c0, c1 = max(r0, R0), min(r1, R1), max(c0, C0), min(c1, C1)
                    wins = [(r0, r1, c0, c1)] if (r0 < r1 and c0 < c1) else []
                for (r0, r1, c0, c1) in wins:
                    sl = (slice(r0 - R0, r1 - R0), slice(c0 - C0, c1 - C0))
                    wT = T * Affine.translation(c0, r0)
                    shp = (r1 - r0, c1 - c0)
                    m = geometry_mask([g], out_shape=shp, transform=wT, invert=True, all_touched=False)
                    r = stats_from(m, Z[sl], S[sl], X[sl], Y[sl], WB[sl])
                    if r:
                        put(out, k, *r)
                    if tiny:
                        m2 = geometry_mask([g], out_shape=shp, transform=wT, invert=True, all_touched=True)
                        r = stats_from(m2, Z[sl], S[sl], X[sl], Y[sl], WB[sl])
                        if r:
                            put(out, k + '@at', *r)
            del Z, S, X, Y, WB
    meta = dict(tile=tile, res=res, ncells=ncells, nblocks=len(need), secs=time.time() - t0)
    tmp = outp + '.tmp'
    with open(tmp, 'wb') as fh:
        pickle.dump(dict(meta=meta, out=out), fh, protocol=pickle.HIGHEST_PROTOCOL)
    os.replace(tmp, outp)
    return tile, 'ok', time.time() - t0, len(need)


def safe_process(task):
    try:
        return process(task)
    except Exception as ex:
        return task[0][0], 'ERR ' + repr(ex)[:300] + ' ' + traceback.format_exc()[-300:], 0.0, 0


def main():
    global PARTS
    import multiprocessing as mp
    args = sys.argv[1:]
    only = None; nworkers = 3
    if '--tiles' in args:
        only = set(args[args.index('--tiles') + 1].split(','))
    if '--workers' in args:
        nworkers = int(args[args.index('--workers') + 1])
    os.makedirs(PARTS, exist_ok=True)
    t0 = time.time()
    groups, feats, tasks = build_tasks()
    with open(f'{WORK}/prep.pkl', 'wb') as fh:
        pickle.dump(dict(groups=groups, feats=feats, tiles=sorted(t for t, _ in tasks)), fh)
    print(f'prep: {len(feats)} features/sites, {len(groups)} unique geometries, {len(tasks)} tiles, {time.time()-t0:.0f}s', flush=True)
    if '--incremental' in args:
        # keys already computed in earlier runs: never recomputed (identical geometry -> identical stats)
        done = set()
        for d in [f'{WORK}/parts'] + sorted(glob.glob(f'{WORK}/parts_inc*')):
            for p in glob.glob(f'{d}/*.pkl'):
                done.update(k.split('@')[0] for k in pickle.load(open(p, 'rb'))['out'])
        tag = args[args.index('--incremental') + 1]
        PARTS = f'{WORK}/parts_inc{tag}'
        os.makedirs(PARTS, exist_ok=True)
        tasks = {t: [it for it in v if it[0] not in done] for t, v in tasks.items()}
        tasks = {t: v for t, v in tasks.items() if v}
        newkeys = set(it[0] for v in tasks.values() for it in v)
        print(f'incremental {tag}: {len(done)} keys already done, {len(newkeys)} geometries to compute on {len(tasks)} tiles', flush=True)
    todo = [(k, v) for k, v in tasks.items() if (only is None or any(o in k[0] for o in only))]
    todo = [t for t in todo if not os.path.exists(f'{PARTS}/{t[0][0]}.pkl')]
    # heavy tiles first-ish but interleaved
    todo.sort(key=lambda t: -len(t[1]))
    todo = todo[::2] + todo[1::2][::-1]
    print(f'todo {len(todo)} tiles', flush=True)
    done = 0; errs = []
    t1 = time.time()
    ctx = mp.get_context('fork')
    with ctx.Pool(nworkers, maxtasksperchild=25) as pool:
        for tile, status, secs, nb in pool.imap_unordered(safe_process, todo):
            done += 1
            if status != 'ok':
                errs.append((tile, status))
                print('!!', tile, status, flush=True)
            if done % 25 == 0 or done == len(todo):
                el = time.time() - t1
                print(f'{done}/{len(todo)} tiles, {el/60:.1f} min elapsed, eta {el/done*(len(todo)-done)/60:.1f} min', flush=True)
    print(f'finished in {(time.time()-t0)/60:.1f} min, errors {len(errs)}', flush=True)
    with open(f'{WORK}/run_errors.json', 'w') as fh:
        json.dump(errs, fh)


if __name__ == '__main__':
    main()
