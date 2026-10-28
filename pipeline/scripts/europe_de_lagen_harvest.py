# Stretch: German Einzellagen for Rheinland-Pfalz (Mosel, Rheinhessen, Pfalz, Nahe, Mittelrhein, Ahr).
# Source: Landwirtschaftskammer Rheinland-Pfalz, Weinbergsrolle "Weinlagen" layer (QGIS Server WMS
#   geodaten.lwk-rlp.de, gg_weinbau_lokal; also published by LGB-RLP as "BFD5W: Weinlagen", licence dl-de/by-2.0).
# The service exposes attributes (GetFeatureInfo) but not vector geometry, so geometry is recovered by rendering
# each Lage in a unique colour with an SLD (GetMap PNG, 10 m pixels, EPSG:25832), decoding colours back to
# Lage numbers, and vectorising. Resumable: tiles cached in raw/de_rlp_lagen/tiles/.
# Usage: python3 -I scripts/europe_de_lagen_harvest.py
import os, sys, json, time, urllib.parse, subprocess
import numpy as np
from PIL import Image

U = "https://geodaten.lwk-rlp.de/cgi-bin/qgis_mapserv.fcgi?MAP=/home/qgis/projects/gg_weinbau_lokal.qgs"
OUT = '/home/claude/winesite/raw/de_rlp_lagen'
TILES = OUT + '/tiles'
os.makedirs(TILES, exist_ok=True)
PX = 10.0          # metres per pixel
N = 2000           # tile size in pixels (20 km)
X0, Y0, X1, Y1 = 309000, 5431000, 457500, 5607500
LAYER = sys.argv[1] if len(sys.argv) > 1 else 'Weinlagen'
FIELD = 'wlg_nr' if LAYER == 'Weinlagen' else sys.argv[2]


def curl(args, retries=5):
    out = args[args.index('-o') + 1] if '-o' in args else None
    for k in range(retries):
        if out and os.path.exists(out):
            os.remove(out)
        r = subprocess.run(['curl', '-sS', '-m', '300'] + args, capture_output=True)
        ok = r.returncode == 0 and (os.path.exists(out) and os.path.getsize(out) > 100 if out else bool(r.stdout))
        if ok and out:
            with open(out, 'rb') as f:
                if f.read(4) != b'\x89PNG':
                    ok = False
        if ok:
            return r.stdout
        time.sleep(3 * (k + 1))
    raise RuntimeError(r.stderr[:300])


def list_ids(x0, y0, x1, y1):
    p = {'SERVICE': 'WMS', 'VERSION': '1.3.0', 'REQUEST': 'GetFeatureInfo', 'LAYERS': LAYER, 'QUERY_LAYERS': LAYER,
         'CRS': 'EPSG:25832', 'BBOX': f'{x0},{y0},{x1},{y1}', 'WIDTH': '500', 'HEIGHT': '500',
         'INFO_FORMAT': 'application/vnd.ogc.gml', 'FEATURE_COUNT': '5000', 'STYLES': '',
         'FILTER_GEOM': f'POLYGON(({x0} {y0},{x1} {y0},{x1} {y1},{x0} {y1},{x0} {y0}))'}
    s = curl([U + '&' + urllib.parse.urlencode(p)]).decode('utf8', 'replace')
    import re
    return sorted(set(re.findall(rf'<qgs:{FIELD}>([^<]+)</qgs:{FIELD}>', s)))


def colour(i):
    # 1-based index -> distinct RGB, spaced so antialiased blends rarely hit a valid code
    i += 1
    r, g, b = (i % 32) * 8 + 4, ((i // 32) % 32) * 8 + 4, ((i // 1024) % 8) * 32 + 16
    return r, g, b


def sld(rules):
    rs = ''.join(
        f'<se:Rule><ogc:Filter><ogc:PropertyIsEqualTo><ogc:PropertyName>{FIELD}</ogc:PropertyName><ogc:Literal>{v}</ogc:Literal>'
        f'</ogc:PropertyIsEqualTo></ogc:Filter><se:PolygonSymbolizer><se:Fill><se:SvgParameter name="fill">#{c[0]:02x}{c[1]:02x}{c[2]:02x}'
        f'</se:SvgParameter></se:Fill></se:PolygonSymbolizer></se:Rule>' for v, c in rules)
    return ('<?xml version="1.0" encoding="UTF-8"?><StyledLayerDescriptor xmlns="http://www.opengis.net/sld" '
            'xmlns:ogc="http://www.opengis.net/ogc" version="1.1.0" xmlns:se="http://www.opengis.net/se"><NamedLayer>'
            f'<se:Name>{LAYER}</se:Name><UserStyle><se:Name>s</se:Name><se:FeatureTypeStyle>{rs}</se:FeatureTypeStyle>'
            '</UserStyle></NamedLayer></StyledLayerDescriptor>')


def main():
    tag = 'wl' if LAYER == 'Weinlagen' else 'gl'
    nx = int(np.ceil((X1 - X0) / (PX * N)))
    ny = int(np.ceil((Y1 - Y0) / (PX * N)))
    t0 = time.time()
    for ix in range(nx):
        for iy in range(ny):
            fn = f'{TILES}/{tag}_{ix}_{iy}.npz'
            if os.path.exists(fn):
                continue
            x0, y0 = X0 + ix * PX * N, Y0 + iy * PX * N
            x1, y1 = x0 + PX * N, y0 + PX * N
            ids = list_ids(x0, y0, x1, y1)
            if not ids:
                np.savez_compressed(fn, ids=np.array([], dtype=str), lab=np.zeros((1, 1), np.int16), bbox=np.array([x0, y0, x1, y1]))
                continue
            # chunk rules: one image per <=900 ids (colour codes are unique within a tile)
            lab = np.full((N, N), -1, np.int16)
            cmap = {colour(k): k for k in range(len(ids))}
            body = sld([(v, colour(k)) for k, v in enumerate(ids)])
            q = {'SERVICE': 'WMS', 'VERSION': '1.3.0', 'REQUEST': 'GetMap', 'LAYERS': LAYER, 'CRS': 'EPSG:25832',
                 'BBOX': f'{x0},{y0},{x1},{y1}', 'WIDTH': str(N), 'HEIGHT': str(N), 'FORMAT': 'image/png',
                 'STYLES': '', 'TRANSPARENT': 'TRUE', 'SLD_BODY': body}
            png = f'{TILES}/tmp.png'
            curl(['-o', png, '-X', 'POST', '--data', urllib.parse.urlencode(q), U])
            im = np.array(Image.open(png).convert('RGBA'))
            solid = im[..., 3] == 255
            code = (im[..., 0].astype(np.int32) << 16) | (im[..., 1].astype(np.int32) << 8) | im[..., 2]
            for (r, g, b), k in cmap.items():
                lab[solid & (code == ((r << 16) | (g << 8) | b))] = k
            np.savez_compressed(fn, ids=np.array(ids), lab=lab, bbox=np.array([x0, y0, x1, y1]))
            print(f'tile {ix},{iy}: {len(ids)} ids, labelled px {int((lab >= 0).sum())}, {time.time()-t0:.0f}s', flush=True)
    print('done', time.time() - t0)


if __name__ == '__main__':
    main()
