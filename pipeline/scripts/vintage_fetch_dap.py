#!/usr/bin/env python3
"""Vitis Mundi v2, vintage: supplementary extraction of a few missing cells via OPeNDAP subsets.

When geodata changes add cells that work/vintage/cells.npy lacks (e.g. moved point-only appellations), this
fetches only small boxes around them from each annual TerraClimate file (DAP2 binary .dods responses,
https://thredds.northwestknowledge.net/thredds/dodsC/TERRACLIMATE_ALL/data/TerraClimate_{var}_{year}.nc),
instead of re-downloading 228 whole files. Raw packed integers are kept (same encoding as vintage_fetch.py).
Responses are parsed in memory (XDR big-endian); the returned lat/lon maps are checked against the grid.
Output: work/vintage/cells_extra.npy (sorted global cell ids) and work/vintage/cells_extra/{var}_{year}.npy
(12 x n raw values). vintage_build.py reads both stores.
Run: python3 -I scripts/vintage_fetch_dap.py <json file with "miss": [cell ids]> [y0 y1]
"""
import json
import os
import struct
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import numpy as np

ROOT = Path("/home/claude/winesite")
OUT = ROOT / "work/vintage/cells_extra"
BASE = "https://thredds.northwestknowledge.net/thredds/dodsC/TERRACLIMATE_ALL/data/"
NX = 8640
RAWDIR = ROOT / "raw/terraclimate_dap"


def boxes_for(cells, tile=24):
    r, c = cells // NX, cells % NX
    tiles = sorted(set(zip((r // tile).tolist(), (c // tile).tolist())))
    # greedy clustering of tiles into boxes: merge tiles within 2 tiles of an existing box
    bx = []
    for tr, tc in tiles:
        for b in bx:
            if b[0] - 2 <= tr <= b[1] + 2 and b[2] - 2 <= tc <= b[3] + 2:
                b[0], b[1], b[2], b[3] = min(b[0], tr), max(b[1], tr), min(b[2], tc), max(b[3], tc)
                break
        else:
            bx.append([tr, tr, tc, tc])
    return [(b[0] * tile, (b[1] + 1) * tile - 1, b[2] * tile, (b[3] + 1) * tile - 1) for b in bx]


def parse_dods(buf, var, shape, is32):
    """DAP2 Grid response: array then maps time, lat, lon. Returns (array, lat, lon)."""
    k = buf.index(b"\nData:\n") + 7
    def arr(k, n, fmt, size):
        n1, n2 = struct.unpack(">ii", buf[k:k + 8])
        assert n1 == n == n2, (n1, n2, n)
        k += 8
        a = np.frombuffer(buf, dtype=np.dtype(fmt), count=n, offset=k)
        return a, k + n * size
    n = int(np.prod(shape))
    a, k = arr(k, n, ">i4", 4)                      # int16/int32 both travel as XDR int32
    t, k = arr(k, shape[0], ">f8", 8)
    la, k = arr(k, shape[1], ">f8", 8)
    lo, k = arr(k, shape[2], ">f8", 8)
    return a.reshape(shape), la, lo


def fetch_box(var, year, b):
    r0, r1, c0, c1 = b
    url = f"{BASE}TerraClimate_{var}_{year}.nc.dods?{var}%5B0:11%5D%5B{r0}:{r1}%5D%5B{c0}:{c1}%5D"
    for attempt in range(5):
        r = subprocess.run(["curl", "-sS", "--fail", "--compressed", "-m", "300", url], capture_output=True)
        if r.returncode == 0 and b"\nData:\n" in r.stdout:
            a, la, lo = parse_dods(r.stdout, var, (12, r1 - r0 + 1, c1 - c0 + 1), var == "ppt")
            assert abs(la[0] - (90 - (r0 + 0.5) / 24)) < 1e-3 and abs(lo[0] - ((c0 + 0.5) / 24 - 180)) < 1e-3, "grid mismatch"
            return a
        time.sleep(5 * (attempt + 1))
    raise RuntimeError(f"DAP failed {var} {year} {b}: {r.stderr[:200]}")


def main():
    miss = np.array(json.load(open(sys.argv[1]))["miss"], dtype=np.int64)
    y0 = int(sys.argv[2]) if len(sys.argv) > 2 else 1950
    y1 = int(sys.argv[3]) if len(sys.argv) > 3 else 2025
    prev = np.load(ROOT / "work/vintage/cells_extra.npy") if (ROOT / "work/vintage/cells_extra.npy").exists() else np.array([], dtype=np.int64)
    if len(prev) and not np.isin(miss, prev).all():
        raise SystemExit("cells_extra.npy exists with a different set; remove work/vintage/cells_extra* first")
    cells = np.unique(miss)
    np.save(ROOT / "work/vintage/cells_extra.npy", cells)
    OUT.mkdir(parents=True, exist_ok=True)
    bx = boxes_for(cells)
    print(len(cells), "cells in", len(bx), "boxes:", bx, flush=True)
    rr, cc = cells // NX, cells % NX
    t0 = time.time()
    jobs = [(v, y) for y in range(y1, y0 - 1, -1) for v in ("tmax", "tmin", "ppt") if not (OUT / f"{v}_{y}.npy").exists()]

    def job(vy):
        v, y = vy
        out = np.full((12, len(cells)), -2147483648 if v == "ppt" else -32768, dtype=np.int32 if v == "ppt" else np.int16)
        for b in bx:
            a = fetch_box(v, y, b)
            inb = (rr >= b[0]) & (rr <= b[1]) & (cc >= b[2]) & (cc <= b[3])
            out[:, inb] = a[:, rr[inb] - b[0], cc[inb] - b[2]]
        np.save(OUT / f"{v}_{y}.tmp.npy", out)
        os.replace(OUT / f"{v}_{y}.tmp.npy", OUT / f"{v}_{y}.npy")
        return v, y
    with ThreadPoolExecutor(4) as pool:
        for i, (v, y) in enumerate(pool.map(job, jobs)):
            if i % 15 == 0:
                print(f"{v} {y} ok ({time.time() - t0:.0f}s)", flush=True)
    print("done", flush=True)


if __name__ == "__main__":
    main()
