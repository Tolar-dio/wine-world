# Agenzia delle Entrate INSPIRE cadastral WFS (CadastralZoning = fogli, CadastralParcel = particelle; CC BY 4.0).
# Cached gzip GML under raw/italy-bounds/ae_cadastre/. Parsed by regex only.
# Usage: python3 -I scripts/itb_cadastre.py roero|dogliani   -> work/italy-bounds/mga_<k>_geom.json (per-row parcel geoms)
import gzip, hashlib, json, os, re, subprocess, sys, time
sys.path.insert(0, '/home/claude/winesite/scripts')
import itb_common as C
import numpy as np
import shapely
from shapely.geometry import Polygon, box

AE = C.RAWB + '/ae_cadastre'
WFS = 'https://wfs.cartografia.agenziaentrate.gov.it/inspire/wfs/owfs01.php'


def fetch(layer, s, w, n, e):
    os.makedirs(AE + '/' + layer, exist_ok=True)
    fn = f'{AE}/{layer}/{s:.5f}_{w:.5f}_{n:.5f}_{e:.5f}.gml.gz'
    if os.path.exists(fn):
        return gzip.open(fn, 'rt', encoding='utf-8', errors='replace').read()
    url = (f'{WFS}?service=WFS&version=2.0.0&request=GetFeature&typeNames=CP:{layer}'
           f'&bbox={s:.5f},{w:.5f},{n:.5f},{e:.5f}')
    for i in range(4):
        r = subprocess.run(['curl', '-sS', '-m', '180', '-A', C.UA, url], capture_output=True)
        t = r.stdout.decode('utf-8', 'replace')
        if 'Richiesta non valida' in t and i >= 1:
            raise ValueError('invalid')
        if r.returncode == 0 and 'numberMatched' in t:
            if 'numberMatched="0"' in t and (n - s) > 0.011 and layer == 'CadastralParcel':
                raise RuntimeError('bbox too big')
            with gzip.open(fn, 'wt', encoding='utf-8') as f:
                f.write(t)
            return t
        time.sleep(3 + 3 * i)
    raise RuntimeError('wfs failed ' + url)


def members(t, kind):
    out = []
    for m in t.split('<wfs:member>')[1:]:
        mid = re.search(r'gml:id="Cadastral\w+\.IT\.AGE\.(?:MAP|PLA)\.([A-Z0-9_.]+)"', m)
        if not mid:
            continue
        polys = []
        for pm in re.findall(r'<gml:Polygon.*?</gml:Polygon>', m, re.S):
            rings = []
            for pl in re.findall(r'<gml:posList[^>]*>([^<]+)</gml:posList>', pm):
                v = [float(x) for x in pl.split()]
                rings.append([(v[i + 1], v[i]) for i in range(0, len(v) - 1, 2)])
            if rings and len(rings[0]) >= 4:
                polys.append(Polygon(rings[0], [r for r in rings[1:] if len(r) >= 4]))
        if polys:
            out.append((mid.group(1), shapely.make_valid(shapely.union_all(polys))))
    return out


def zoning(bounds, geom=None):
    """All fogli in lon/lat bounds -> {ref 'L817_000500': geom4326}."""
    w, s, e, n = bounds
    out = {}
    step = 0.04
    for la in np.arange(s, n, step):
        for lo in np.arange(w, e, step):
            if geom is not None and not box(lo, la, lo + step, la + step).intersects(geom):
                continue
            for t in fetch_split('CadastralZoning', la, lo, min(la + step, n + 1e-4), min(lo + step, e + 1e-4)):
                for ref, g in members(t, 'MAP'):
                    out[ref] = g if ref not in out else out[ref].union(g)
    return out


FAILED = []


def fetch_split(layer, s, w, n, e, depth=0):
    try:
        return [fetch(layer, round(s, 5), round(w, 5), round(n, 5), round(e, 5))]
    except (ValueError, RuntimeError):
        if depth >= 3:
            FAILED.append((layer, s, w, n, e))
            return []
        ms, mw = (s + n) / 2, (w + e) / 2
        out = []
        for a, b, c, d in ((s, w, ms, mw), (s, mw, ms, e), (ms, w, n, mw), (ms, mw, n, e)):
            out += fetch_split(layer, a, b, c, d, depth + 1)
        return out


def parcels_in(g4326, prefix, workers=4):
    """Parcels whose ref starts with prefix ('L817_000500') inside the bounds of g4326 -> {label: geom}."""
    from concurrent.futures import ThreadPoolExecutor
    w, s, e, n = g4326.bounds
    step = 0.009
    tiles = []
    for la in np.arange(s - 0.0005, n + 0.0005, step):
        for lo in np.arange(w - 0.0005, e + 0.0005, step):
            if box(lo, la, lo + step, la + step).intersects(g4326):
                tiles.append((la, lo))
    with ThreadPoolExecutor(workers) as ex:
        texts = list(ex.map(lambda t: fetch_split('CadastralParcel', t[0], t[1], t[0] + step, t[1] + step), tiles))
    out = {}
    for tl in texts:
        for t in tl:
            for ref, g in members(t, 'PLA'):
                if ref.startswith(prefix + '.'):
                    lab = ref.split('.', 1)[1]
                    out[lab] = g if lab not in out else out[lab].union(g)
    return out
