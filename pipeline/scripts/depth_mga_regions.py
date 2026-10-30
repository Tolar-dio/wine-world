# Grow one region per OCR'd MGA label on the cleaned map image (colour region growing from the fill around the
# label), resolve overlaps, and write vector polygons in EPSG:32632 using the georeferencing affine.
# Output: work/depth/mga/{map}_mga.gpkg (name, n_labels, px) + preview png.
# Usage: python3 -I scripts/depth_mga_regions.py barolo|barbaresco
import sys, json
sys.path.insert(0, '/home/claude/winesite/scripts')
import numpy as np
import cv2
from PIL import Image
from scipy import ndimage
import rasterio.features
from affine import Affine
import shapely
from shapely.geometry import shape
import geopandas as gpd

MGA = '/home/claude/winesite/work/depth/mga'
Image.MAX_IMAGE_PIXELS = None
LEGENDS = {'barolo': [(4360, 900, 5140, 1620), (4360, 1460, 5140, 1680), (5380, 1300, 6100, 1540), (6120, 1620, 6840, 2020),
                      (220, 3200, 1160, 3400), (220, 3860, 1160, 5220), (220, 5660, 1000, 6980), (360, 7460, 1090, 7880),
                      (700, 8160, 1450, 8720), (3200, 8500, 4100, 9320), (5920, 8180, 6810, 9360), (1840, 8680, 3160, 9320),
                      (4760, 8680, 5880, 9200)],
           'barbaresco': [(280, 3064, 1120, 4344), (6040, 2160, 6800, 3300), (4120, 6300, 4880, 7320), (360, 7500, 1120, 7880),
                          (4080, 8000, 5120, 8880), (360, 8920, 2080, 9120), (5760, 6400, 6880, 9360)]}
TOL = 15.0
_yy, _xx = np.mgrid[-10:11, -10:11]
DISK10 = (_xx ** 2 + _yy ** 2) <= 100


def cleaned(key):
    im = cv2.imread(f'{MGA}/{key}-000.jpg')[:, :, ::-1]
    H, W = im.shape[:2]
    im = cv2.resize(im, (W // 2, H // 2), interpolation=cv2.INTER_AREA)
    a = im.astype(np.int16)
    mx, mn = a.max(2), a.min(2)
    # ink to in-paint: very dark pixels (text, buildings) and thin greyish strokes (contour lines, lettering);
    # grey MGA fills (Bricco Rocche, San Lorenzo...) are wide and survive the opening, so they are kept
    dark = (mx < 165) & ((mx - mn) < 60)
    very = mx < 95
    thin_dark = dark & ~ndimage.binary_opening(dark, structure=np.ones((5, 5)))
    red = (a[..., 0] > 170) & (a[..., 1] < 100) & (a[..., 2] < 110) & (a[..., 0] - a[..., 1] > 100)
    red_thin = red & ~ndimage.binary_opening(red, structure=np.ones((7, 7)))
    mask = ndimage.binary_dilation(very | thin_dark | red_thin, iterations=1)
    _, (iy, ix) = ndimage.distance_transform_edt(mask, return_indices=True)
    c = cv2.medianBlur(cv2.medianBlur(im[iy, ix], 5), 5)
    return c


def main():
    key = sys.argv[1]
    labels = json.load(open(f'{MGA}/{key}_labels.json'))
    import os
    if os.path.exists(f'{MGA}/{key}_manual_labels.json'):
        # labels the OCR missed, read off the map by eye (position of the printed label)
        labels += json.load(open(f'{MGA}/{key}_manual_labels.json'))
    if os.path.exists(f'{MGA}/{key}_label_fixes.json'):
        # OCR matches checked by eye: first lines of two-line labels matched to the shorter name, etc.
        fx = json.load(open(f'{MGA}/{key}_label_fixes.json'))
        near = lambda l, n, x, y: l['name'] == n and abs(l['x'] - x) < 8 and abs(l['y'] - y) < 8
        labels = [l for l in labels if not any(near(l, n, x, y) for n, x, y in fx.get('drop', []))]
        for l in labels:
            for n, x, y, new in fx.get('rename', []):
                if near(l, n, x, y):
                    l['name'] = new
    leg = LEGENDS.get(key, [])
    labels = [l for l in labels if not any(a <= l['x'] <= c and b <= l['y'] <= d for a, b, c, d in leg)]
    # MGA labels are printed in capitals; mixed-case words are village and hamlet names (Perno, Annunziata...)
    labels = [l for l in labels if l.get('manual') or sum(ch.isupper() for ch in l['text']) >= 0.7 * sum(ch.isalpha() for ch in l['text'])]
    img = cleaned(key)
    lab = cv2.cvtColor(img, cv2.COLOR_RGB2LAB).astype(np.float32)
    c16 = img.astype(np.int16)
    bg = (c16.min(2) > 244) & ((c16.max(2) - c16.min(2)) < 10)
    Hh, Wh = bg.shape
    owner = np.full((Hh, Wh), -1, np.int32)
    best = np.full((Hh, Wh), np.inf, np.float32)
    R = 1100
    info = []
    for i, l in enumerate(labels):
        bx0, by0, bx1, by1 = [int(v / 2) for v in l['bbox']]
        # ring around the label box: sample the fill colour
        pad = 22
        ys0, ys1 = max(by0 - pad, 0), min(by1 + pad, Hh)
        xs0, xs1 = max(bx0 - pad, 0), min(bx1 + pad, Wh)
        ring = np.zeros((ys1 - ys0, xs1 - xs0), bool); ring[:] = True
        ring[by0 - ys0 + 2: by1 - ys0 - 2, bx0 - xs0 + 2: bx1 - xs0 - 2] = False
        pix = lab[ys0:ys1, xs0:xs1][ring & ~bg[ys0:ys1, xs0:xs1]]
        if len(pix) < 30:
            info.append(None); continue
        # fill colour: among the dominant ring colours, the one that explains the label box tint (the boxes are
        # semi-transparent white over the fill: box = a*fill + (1-a)*white)
        q = np.round(pix / 6).astype(int)
        u, inv, cnt = np.unique(q, axis=0, return_inverse=True, return_counts=True)
        inv = inv.ravel()
        order = np.argsort(-cnt)
        rgbring = img[ys0:ys1, xs0:xs1][ring & ~bg[ys0:ys1, xs0:xs1]].astype(float)
        box = img[by0 + 2:by1 - 2, bx0 + 2:bx1 - 2].reshape(-1, 3).astype(float)
        box = box[box.min(1) > 120] if len(box) else box
        dom = pix[inv == order[0]].mean(0)
        if l.get('seed'):
            # manual seed placed inside the fill: take the colour right there
            dom = lab[by0:by1, bx0:bx1].reshape(-1, 3).mean(0)
        elif len(box) > 20:
            bt = np.median(box, 0)
            best_e = None
            for o in order[:4]:
                if cnt[o] < 0.08 * len(pix):
                    continue
                crgb = rgbring[inv == o].mean(0)
                e = min(np.abs(a * crgb + (1 - a) * 255 - bt).sum() for a in np.arange(0.2, 0.95, 0.05))
                if best_e is None or e < best_e:
                    best_e, dom = e, pix[inv == o].mean(0)
        wy0, wy1 = max(by0 - R, 0), min(by1 + R, Hh)
        wx0, wx1 = max(bx0 - R, 0), min(bx1 + R, Wh)
        d = np.sqrt(((lab[wy0:wy1, wx0:wx1] - dom) ** 2).sum(2))
        m = (d < TOL) & ~bg[wy0:wy1, wx0:wx1]
        # include the label box itself (lighter tint) before taking the connected part
        m[by0 - wy0: by1 - wy0, bx0 - wx0: bx1 - wx0] = True
        m = ndimage.binary_opening(m, iterations=1)
        # connectivity across roads and lettering gaps (up to about 12 half-res px) of the same fill colour
        cc, n = ndimage.label(ndimage.binary_closing(m, iterations=6))
        seedlab = np.unique(cc[max(by0 - wy0 - pad, 0): by1 - wy0 + pad, max(bx0 - wx0 - pad, 0): bx1 - wx0 + pad])
        seedlab = seedlab[seedlab > 0]
        if not len(seedlab):
            info.append(None); continue
        reg = np.isin(cc, seedlab) & m
        reg = ndimage.binary_fill_holes(reg)
        # competition score: colour distance plus a small penalty for distance from the label, so that two labels
        # of near-identical colour split contested fill by proximity
        yy, xx = np.ogrid[wy0:wy1, wx0:wx1]
        dist = np.hypot(yy - (by0 + by1) / 2, xx - (bx0 + bx1) / 2)
        sub_d = np.where(reg, d + 0.003 * dist, np.inf).astype(np.float32)
        ob = best[wy0:wy1, wx0:wx1]; oo = owner[wy0:wy1, wx0:wx1]
        take = sub_d < ob
        ob[take] = sub_d[take]; oo[take] = i
        info.append({'dom': dom.tolist(), 'px': int(reg.sum())})
    # absorb orphan fill pieces (cut off from their label by roads or lettering) into the adjacent region of the
    # same colour (dominant colour within TOL + 4, touching within 8 px)
    orph = ~bg & (owner < 0)
    x0, y0, x1, y1 = [v // 2 for v in {'barolo': (1000, 900, 7000, 9100), 'barbaresco': (900, 1000, 6100, 8900)}[key]]
    fr = np.zeros_like(orph); fr[y0:y1, x0:x1] = True
    for a, b, c, d in leg:
        fr[b // 2:d // 2, a // 2:c // 2] = False
    orph &= fr
    for rnd in range(3):
        cc, n = ndimage.label(orph)
        if n == 0:
            break
        objs = ndimage.find_objects(cc)
        moved = 0
        for k, sl in enumerate(objs, start=1):
            sy, sx = sl
            sy = slice(max(sy.start - 10, 0), min(sy.stop + 10, Hh)); sx = slice(max(sx.start - 10, 0), min(sx.stop + 10, Wh))
            piece = cc[sy, sx] == k
            # only blob-like fill pieces (roads, rivers and thin slivers are not vineyard land)
            piece = ndimage.binary_opening(piece, iterations=3)
            if piece.sum() < 150:
                continue
            rgb = c16[sy, sx][piece].mean(0)
            if rgb.min() > 232 and rgb.max() - rgb.min() < 16:
                continue          # near-white: unclassified land between MGAs
            col = lab[sy, sx][piece].mean(0)
            ring = ndimage.binary_dilation(piece, iterations=8) & ~piece
            neigh = owner[sy, sx][ring]
            neigh = neigh[neigh >= 0]
            if not len(neigh):
                continue
            cand = []
            for o in np.unique(neigh):
                if info[o] is None:
                    continue
                dE = float(np.sqrt(((np.array(info[o]['dom']) - col) ** 2).sum()))
                if dE < TOL:
                    cand.append((dE, -int((neigh == o).sum()), o))
            if cand:
                o = min(cand)[2]
                sub = owner[sy, sx]; sub[piece] = o
                moved += 1
        orph = ~bg & (owner < 0) & fr
        print('  absorb round', rnd, 'moved', moved)
    np.savez_compressed(f'{MGA}/{key}_owner.npz', owner=owner)
    json.dump({'labels': labels, 'info': info}, open(f'{MGA}/{key}_owner.json', 'w'), ensure_ascii=False)
    post(key)


def post(key):
    owner = np.load(f'{MGA}/{key}_owner.npz')['owner']
    d = json.load(open(f'{MGA}/{key}_owner.json'))
    labels, info = d['labels'], d['info']
    Hh, Wh = owner.shape
    aff = json.load(open(f'{MGA}/{key}_affine.json'))['M']
    M = np.array(aff)
    # half-res pixel (col,row) -> full-res pixel (2c, 2r) -> UTM
    A = Affine(M[0, 0] * 2, M[0, 1] * 2, M[0, 2], M[1, 0] * 2, M[1, 1] * 2, M[1, 2])
    names = sorted({l['name'] for l in labels})
    nidx = {n: k for k, n in enumerate(names)}
    lab2name = np.array([nidx[l['name']] if info[i] is not None else -1 for i, l in enumerate(labels)] + [-1], np.int32)
    nr = np.where(owner >= 0, lab2name[owner], -1).astype(np.int32)
    del owner
    nr2 = np.full_like(nr, -1)
    lab_of = {k: [l for i, l in enumerate(labels) if l['name'] == n and info[i] is not None] for n, k in nidx.items()}
    objs = ndimage.find_objects(nr + 1)
    for k, sl in enumerate(objs):
        if sl is None:
            continue
        sy, sx = sl
        sy = slice(max(sy.start - 8, 0), min(sy.stop + 8, Hh)); sx = slice(max(sx.start - 8, 0), min(sx.stop + 8, Wh))
        m = nr[sy, sx] == k
        # keep only the pieces holding one of this name's labels, plus pieces within 20 px (about 60 m) of those;
        # far-flung fragments of a shared colour are dropped
        cc0, n0 = ndimage.label(m)
        if n0 > 1:
            keep = set()
            for l in lab_of[k]:
                x, y = int(l['x'] / 2) - sx.start, int(l['y'] / 2) - sy.start
                win = cc0[max(y - 15, 0):max(y + 15, 0), max(x - 40, 0):max(x + 40, 0)]
                keep |= set(np.unique(win[win > 0]).tolist())
            if keep:
                kept = np.isin(cc0, list(keep))
                for _ in range(4):
                    near = np.unique(cc0[ndimage.binary_dilation(kept, iterations=20) & (cc0 > 0)])
                    new = np.isin(cc0, near)
                    if new.sum() == kept.sum():
                        break
                    kept = new
                m = kept
        # drop thin attachments (rivers, roads, contour-line slivers) and specks: keep what lies within 10 px of
        # the morphological core (opening radius 10 half-res px = about 30 m), unless that would remove most of it
        core = ndimage.binary_opening(m, structure=DISK10)
        if core.sum() > 0.25 * m.sum():
            m = m & ndimage.binary_dilation(core, structure=DISK10)
        m = ndimage.binary_opening(m, iterations=3)
        cc, n = ndimage.label(m)
        if n > 1:
            sz = ndimage.sum(m, cc, range(1, n + 1))
            m = np.isin(cc, 1 + np.flatnonzero(sz >= max(400, 0.02 * sz.max())))
        m = ndimage.binary_fill_holes(m)
        sub = nr2[sy, sx]
        sub[m & (sub < 0)] = k
    del nr
    # diagnostic: different names interleaving (stripes) = a label assigned to the wrong name
    area = np.bincount(nr2[nr2 >= 0].ravel(), minlength=len(names)).astype(float)
    codes = []
    for dy, dx in ((0, 1), (1, 0)):
        a1 = nr2[:Hh - dy, :Wh - dx]; a2 = nr2[dy:, dx:]
        m = (a1 >= 0) & (a2 >= 0) & (a1 != a2)
        lo = np.minimum(a1[m], a2[m]); hi = np.maximum(a1[m], a2[m])
        codes.append(lo.astype(np.int64) * 100000 + hi)
    u, cnt = np.unique(np.concatenate(codes), return_counts=True)
    sus = []
    for code, c in zip(u, cnt):
        a, b = int(code // 100000), int(code % 100000)
        r = c / np.sqrt(max(min(area[a], area[b]), 1))
        if r > 6:
            sus.append((round(float(r), 1), names[a], names[b]))
    print('  interleaving suspects:', sorted(sus, reverse=True)[:20])
    rows = []
    for k, nm in enumerate(names):
        m = nr2 == k
        if m.sum() < 50:
            continue
        geoms = [shape(g) for g, v in rasterio.features.shapes(m.astype(np.uint8), mask=m, transform=A, connectivity=4)]
        g = shapely.make_valid(shapely.union_all(geoms))
        nl = sum(1 for i, l in enumerate(labels) if l['name'] == nm and info[i] is not None)
        man = any(l.get('manual') for l in labels if l['name'] == nm)
        rows.append({'name': nm, 'n_labels': nl, 'manual': int(man), 'px': int(m.sum()), 'geometry': g})
    gdf = gpd.GeoDataFrame(rows, crs=32632)
    gdf.to_file(f'{MGA}/{key}_mga.gpkg', driver='GPKG')
    print(key, 'MGA polygons', len(gdf), 'total km2', round(gdf.area.sum() / 1e6, 1))
    rng = np.random.default_rng(3)
    pal = rng.integers(40, 255, (len(names) + 1, 3)).astype(np.uint8); pal[0] = 255
    prev = pal[nr2[::3, ::3] + 1].copy()
    for l in labels:
        cv2.putText(prev, l['name'][:14], (int(l['x'] / 6) - 30, int(l['y'] / 6)), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 0), 1)
    Image.fromarray(prev).save(f'{MGA}/{key}_mga_prev.png')


if __name__ == '__main__':
    if len(sys.argv) > 2 and sys.argv[2] == 'post':
        post(sys.argv[1])
    else:
        main()
