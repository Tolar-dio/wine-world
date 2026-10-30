# Georeference the Consorzio Barolo Barbaresco Alba Langhe e Dogliani official MGA map images (2019, 300 dpi scans
# of the printed maps, raw/langhevini/MeGa-*.pdf) to UTM 32N (EPSG:32632).
#  1. rough affine from village label positions (read off the map) to OSM village centres (Nominatim);
#  2. refine by ICP: the map's red dotted commune boundaries (pixels) against OSM commune boundaries (Nominatim,
#     ODbL), affine least squares, trimmed to the closest 70% of matches, iterated.
# Output: work/depth/mga/{map}_affine.json  (pixel -> EPSG:32632, full-resolution pixel coordinates)
# Usage: python3 -I scripts/depth_mga_georef.py barolo|barbaresco
import sys, json, hashlib
sys.path.insert(0, '/home/claude/winesite/scripts')
from depth_common import *
from PIL import Image
from scipy import ndimage
from scipy.spatial import cKDTree

Image.MAX_IMAGE_PIXELS = None
MGA = ROOT + '/work/depth/mga'
NOM = RAW + '/osm_nominatim_depth'
T_4326_32632 = Transformer.from_crs(4326, 32632, always_xy=True)

CFG = {
    'barolo': {
        'img': MGA + '/barolo-000.jpg',
        # map label (full-res pixel x, y) -> village
        'rough': [((2720, 1584), 'Verduno'), ((2704, 3728), 'La Morra'), ((3100, 5850), 'Barolo'),
                  ((5648, 4736), 'Castiglione Falletto'), ((6448, 6784), "Serralunga d'Alba"),
                  ((4128, 8416), "Monforte d'Alba"), ((1800, 7296), 'Novello'), ((5960, 2760), 'Grinzane Cavour')],
        'communes': ['Barolo', 'La Morra', 'Castiglione Falletto', "Serralunga d'Alba", "Monforte d'Alba", 'Novello',
                     'Verduno', 'Grinzane Cavour', "Diano d'Alba", 'Roddi', 'Cherasco'],
        'frame': (1000, 900, 7000, 9000),   # map body in full-res px (excludes title and legends roughly)
    },
    'barbaresco': {
        'img': MGA + '/barbaresco-000.jpg',
        'rough': [((2280, 3320), 'Barbaresco'), ((4440, 3824), 'Neive'), ((2720, 6640), 'Treiso')],
        'communes': ['Barbaresco', 'Neive', 'Treiso', 'Alba'],
        'navy': False,
        'frame': (900, 1000, 6100, 8900),
    },
}


def nom_geom(q):
    fn = f'{NOM}/{hashlib.md5(q.encode()).hexdigest()[:12]}.json'
    for r in json.load(open(fn))['res']:
        if r['class'] == 'boundary':
            return reproj(shape(r['geojson']), T_4326_32632), r
    raise KeyError(q)


def place(name):
    fn = RAW + '/osm_nominatim_depth/places/' + re.sub(r'[^A-Za-z0-9]', '_', name + ', ') + '.json'
    fn = fn.replace('__.json', '_.json')
    d = json.load(open(fn))
    x, y = T_4326_32632.transform(float(d[0]['lon']), float(d[0]['lat']))
    return x, y


def fit_affine(src, dst):
    A = np.column_stack([src, np.ones(len(src))])
    cx, *_ = np.linalg.lstsq(A, dst[:, 0], rcond=None)
    cy, *_ = np.linalg.lstsq(A, dst[:, 1], rcond=None)
    return np.vstack([cx, cy])   # 2x3


def apply(M, p):
    p = np.asarray(p, float)
    return p @ M[:, :2].T + M[:, 2]


def red_dotted(img, step=2, navy=False):
    a = np.asarray(img)[::step, ::step].astype(np.int16)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    red = (r > 170) & (g < 90) & (b < 100) & (r - g > 110)
    thick = ndimage.binary_opening(red, structure=np.ones((5, 5)))
    thick = ndimage.binary_dilation(thick, iterations=2)
    thin = red & ~thick
    # keep the dashes of dotted boundaries only (continuous red roads form long components)
    cc, n = ndimage.label(thin, structure=np.ones((3, 3)))
    sz = ndimage.sum(thin, cc, range(1, n + 1))
    keep = np.zeros(n + 1, bool); keep[1:] = sz <= 120
    thin = keep[cc]
    if navy:
        # the DOCG zone limit (dark navy line) follows the outer commune boundaries on the Barbaresco map
        nv = (b > r + 30) & (b > g + 20) & (r < 110) & (b < 170)
        nv &= ~ndimage.binary_opening(nv, structure=np.ones((5, 5)))
        thin |= nv
    ys, xs = np.nonzero(thin)
    return np.column_stack([xs * step, ys * step]).astype(float)


def main():
    key = sys.argv[1]
    cfg = CFG[key]
    img = Image.open(cfg['img']).convert('RGB')
    src = np.array([p for p, _ in cfg['rough']], float)
    dst = np.array([place(n) for _, n in cfg['rough']], float)
    M = fit_affine(src, dst)
    res = np.hypot(*(apply(M, src) - dst).T)
    print('rough fit residuals (m):', np.round(res).astype(int), 'scale m/px', round(np.hypot(*M[:, 0]), 3))
    pix = red_dotted(img, navy=cfg.get('navy', False))
    x0, y0, x1, y1 = cfg['frame']
    pix = pix[(pix[:, 0] > x0) & (pix[:, 0] < x1) & (pix[:, 1] > y0) & (pix[:, 1] < y1)]
    print('red boundary pixels', len(pix))
    # OSM commune boundaries densified to 5 m
    pts = []
    for c in cfg['communes']:
        g, _ = nom_geom(f'{c}, Cuneo')
        for poly in getattr(g, 'geoms', [g]):
            ring = poly.exterior
            n = int(ring.length // 5)
            pts += [ring.interpolate(i * 5).coords[0] for i in range(n)]
    pts = np.array(pts)
    tree = cKDTree(pts)
    # ---- global search: similarity transform (scale, rotation) x translation by FFT correlation on a 20 m grid
    from numpy.fft import rfft2, irfft2
    res_m = 20.0
    bx0, by0 = pts.min(0) - 3000
    bx1, by1 = pts.max(0) + 3000
    W, H = int((bx1 - bx0) / res_m), int((by1 - by0) / res_m)
    occ = np.zeros((H, W), bool)
    ii = ((pts[:, 1] - by0) / res_m).astype(int); jj = ((pts[:, 0] - bx0) / res_m).astype(int)
    occ[ii, jj] = True
    dist = ndimage.distance_transform_edt(~occ) * res_m
    close = np.exp(-dist / 40.0)
    Fc = rfft2(close)
    sub = pix[::4]
    cxp, cyp = sub.mean(0)
    s0 = np.hypot(*M[:, 0])
    best = (-1, None)
    for sc in np.arange(1.40, 1.80, 0.01):
        for th in np.radians(np.arange(-3, 3.01, 0.5)):
            c, s_ = np.cos(th), np.sin(th)
            dx, dy = sub[:, 0] - cxp, sub[:, 1] - cyp
            X = sc * (c * dx - s_ * dy)
            Y = -sc * (s_ * dx + c * dy)
            # rasterise the transformed red pixels with their centroid at grid centre
            gi = ((Y / res_m) + H // 2).astype(int); gj = ((X / res_m) + W // 2).astype(int)
            ok = (gi >= 0) & (gi < H) & (gj >= 0) & (gj < W)
            r = np.zeros((H, W)); np.add.at(r, (gi[ok], gj[ok]), 1.0)
            corr = irfft2(Fc * np.conj(rfft2(r)), s=(H, W))
            k = np.argmax(corr)
            v = corr.flat[k]
            if v > best[0]:
                oi, oj = np.unravel_index(k, corr.shape)
                best = (v, (sc, th, oi, oj))
    v, (sc, th, oi, oj) = best
    # translation: grid offset (oi, oj) maps the centred raster onto the closeness map
    oi = oi if oi < H // 2 + H // 2 else oi - H
    tx = bx0 + (oj + W // 2) % W * res_m
    ty = by0 + (oi + H // 2) % H * res_m
    c, s_ = np.cos(th), np.sin(th)
    # pixel -> UTM: X = sc*(c*(x-cxp) - s*(y-cyp)) + tx ; Y = -sc*(s*(x-cxp) + c*(y-cyp)) + ty
    M = np.array([[sc * c, -sc * s_, tx - sc * c * cxp + sc * s_ * cyp],
                  [-sc * s_, -sc * c, ty + sc * s_ * cxp + sc * c * cyp]])
    d0, _ = tree.query(apply(M, pix))
    print(f'  global search: scale {sc:.3f} m/px, rotation {np.degrees(th):.1f} deg, median dist {np.median(d0):.1f} m')
    for it in range(40):
        w = apply(M, pix)
        d, idx = tree.query(w)
        keep = d < np.quantile(d, 0.7)
        if it > 10:
            keep &= d < 60
        M2 = fit_affine(pix[keep], pts[idx[keep]])
        delta = np.abs(apply(M2, src) - apply(M, src)).max()
        M = M2
        if it % 5 == 0 or delta < 0.05:
            print(f'  ICP {it}: median {np.median(d):.1f} m, p70 {np.quantile(d, 0.7):.1f} m, used {keep.sum()}, delta {delta:.2f} m')
        if delta < 0.05:
            break
    d, _ = tree.query(apply(M, pix))
    stats = {'median_m': round(float(np.median(d)), 1), 'p70_m': round(float(np.quantile(d, 0.7)), 1),
             'p90_m': round(float(np.quantile(d, 0.9)), 1), 'scale_m_per_px': round(float(np.hypot(*M[:, 0])), 4)}
    print('final', stats, 'village check (m):', np.round(np.hypot(*(apply(M, src) - dst).T)).astype(int))
    json.dump({'M': M.tolist(), 'crs': 'EPSG:32632', 'stats': stats}, open(f'{MGA}/{key}_affine.json', 'w'), indent=1)


if __name__ == '__main__':
    main()
