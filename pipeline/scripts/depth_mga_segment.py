# Segment the coloured MGA fills of the consortium's official MGA map images into regions.
#  half resolution; median filter removes contour lines and lettering; black buildings, red/yellow lines are
#  in-painted from neighbours; colours clustered in Lab (k-means); connected components; small pieces (label
#  boxes, slivers) merged into the neighbour they share most border with.
# Output: work/depth/mga/{map}_regions.npz (lab: int32 region raster at half res, -1 = background) + stats json.
# Usage: python3 -I scripts/depth_mga_segment.py barolo|barbaresco
import sys, json
import numpy as np
import cv2
from PIL import Image
from scipy import ndimage
from sklearn.cluster import MiniBatchKMeans

Image.MAX_IMAGE_PIXELS = None
MGA = '/home/claude/winesite/work/depth/mga'
FRAME = {'barolo': (1000, 900, 7000, 9100), 'barbaresco': (0, 0, 7085, 9444)}


def main():
    key = sys.argv[1]
    im = cv2.imread(f'{MGA}/{key}-000.jpg')[:, :, ::-1]          # RGB
    H, W = im.shape[:2]
    im = cv2.resize(im, (W // 2, H // 2), interpolation=cv2.INTER_AREA)
    a = im.astype(np.int16)
    mx, mn = a.max(2), a.min(2)
    # in-paint mask: dark ink (text, buildings, contours), red boundary dots, yellow/white road casings
    dark = (mx < 165) & ((mx - mn) < 60)
    red = (a[..., 0] > 170) & (a[..., 1] < 100) & (a[..., 2] < 110) & (a[..., 0] - a[..., 1] > 100)
    red_thin = red & ~ndimage.binary_opening(red, structure=np.ones((7, 7)))
    mask = ndimage.binary_dilation(dark | red_thin, iterations=1)
    _, (iy, ix) = ndimage.distance_transform_edt(mask, return_indices=True)
    clean = im[iy, ix]
    clean = cv2.medianBlur(clean, 5)
    clean = cv2.medianBlur(clean, 5)
    c = clean.astype(np.int16)
    bg = (c.min(2) > 236) & ((c.max(2) - c.min(2)) < 14)
    x0, y0, x1, y1 = [v // 2 for v in FRAME[key]]
    frame = np.zeros(bg.shape, bool); frame[y0:y1, x0:x1] = True
    fg = ~bg & frame
    lab = cv2.cvtColor(clean, cv2.COLOR_RGB2LAB).reshape(-1, 3).astype(np.float32)
    idx = np.flatnonzero(fg.ravel())
    rng = np.random.default_rng(0)
    samp = lab[rng.choice(idx, min(400000, len(idx)), replace=False)]
    km = MiniBatchKMeans(n_clusters=72, random_state=0, batch_size=20000, n_init=3).fit(samp)
    cl = np.full(fg.size, -1, np.int32)
    cl[idx] = km.predict(lab[idx])
    cl = cl.reshape(fg.shape)
    # connected components per colour cluster
    reg = np.full(fg.shape, -1, np.int32)
    nreg = 0
    for k in range(km.n_clusters):
        m = cl == k
        if not m.any():
            continue
        cc, n = ndimage.label(m)
        reg[m] = cc[m] - 1 + nreg
        nreg += n
    print('raw regions', nreg)
    # merge small regions into the neighbour sharing the longest border (iterative, smallest first)
    MIN = 900
    for rnd in range(6):
        sizes = np.bincount(reg[reg >= 0].ravel(), minlength=nreg)
        small = np.flatnonzero((sizes > 0) & (sizes < MIN))
        if not len(small):
            break
        # neighbour votes via 4-neighbour shifts
        votes = {}
        for dy, dx in ((0, 1), (1, 0), (0, -1), (-1, 0)):
            a1 = reg[max(dy, 0):reg.shape[0] + min(dy, 0), max(dx, 0):reg.shape[1] + min(dx, 0)]
            a2 = reg[max(-dy, 0):reg.shape[0] + min(-dy, 0), max(-dx, 0):reg.shape[1] + min(-dx, 0)]
            m = (a1 != a2) & (a1 >= 0) & (a2 >= 0)
            s1, s2 = a1[m], a2[m]
            sel = sizes[s1] < MIN
            pairs = np.column_stack([s1[sel], s2[sel]])
            u, cnt = np.unique(pairs, axis=0, return_counts=True)
            for (p, q), n in zip(u, cnt):
                votes.setdefault(p, {}).setdefault(q, 0)
                votes[p][q] += n
        remap = np.arange(nreg)
        for p in sorted(votes, key=lambda p: sizes[p]):
            q = max(votes[p], key=lambda q: (votes[p][q], sizes[q]))
            if sizes[q] >= sizes[p]:
                remap[p] = q
        # resolve chains
        for _ in range(10):
            remap = remap[remap]
        reg = np.where(reg >= 0, remap[np.maximum(reg, 0)], -1)
        print('  merge round', rnd, 'small', len(small))
    # small isolated pieces with no neighbour -> background
    sizes = np.bincount(reg[reg >= 0].ravel(), minlength=nreg)
    reg[(reg >= 0) & (sizes[np.maximum(reg, 0)] < MIN)] = -1
    ids = np.unique(reg[reg >= 0])
    relabel = np.full(nreg, -1, np.int32); relabel[ids] = np.arange(len(ids))
    reg = np.where(reg >= 0, relabel[np.maximum(reg, 0)], -1)
    mean_rgb = ndimage.mean(clean[..., 0], reg + 1, index=np.arange(1, len(ids) + 1))
    print('regions', len(ids))
    np.savez_compressed(f'{MGA}/{key}_regions.npz', reg=reg)
    # preview
    rng = np.random.default_rng(1)
    pal = rng.integers(40, 255, (len(ids) + 1, 3)).astype(np.uint8); pal[0] = 255
    prev = pal[reg + 1]
    Image.fromarray(prev).resize((prev.shape[1] // 4, prev.shape[0] // 4), Image.NEAREST).save(f'{MGA}/{key}_regions_prev.png')
    Image.fromarray(clean).resize((W // 8, H // 8)).save(f'{MGA}/{key}_clean_prev.jpg')


if __name__ == '__main__':
    main()
