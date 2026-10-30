#!/usr/bin/env python3
"""Vitis Mundi v2, vintage step 2: fetch TerraClimate annual monthly files and keep only the
climate cells that wine places use.

Source: TerraClimate v1.1 (Abatzoglou et al. 2018, Sci Data 5:170191; CC0), annual files
TerraClimate_{tmax,tmin,ppt}_{YYYY}.nc (12 months, 1/24 deg global grid, north-up), served by
https://thredds.northwestknowledge.net/thredds/fileServer/TERRACLIMATE_ALL/data/ .
Why whole files and not OPeNDAP subsets: the files are stored in HDF5 chunks of
2 months x 1080 x 2160 cells, so any spatial subset makes the server inflate the same chunks;
the 410k cells we need are spread over ~1,700 one-degree tiles (one DAP request per run of
tiles = ~1,100 requests per year, uncompressed). Three static compressed downloads per year
(~340 MB) are cheaper for the server and finish in ~15 s. Each file is deleted right after
extraction.

Untrusted downloads go to raw/terraclimate_monthly/dl/ ; extracted cell values to
work/vintage/cells/{var}_{year}.npy (raw integers, shape 12 x ncell) + {var}_{year}.json
(scale_factor, add_offset, fill, time stamps).
Each year is re-extracted when work/vintage/cells.npy changes (cells_sha in the per-file json).
Run: python3 -I scripts/vintage_fetch.py [first_year] [last_year]
"""
import json
import os
import subprocess
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import numpy as np

ROOT = Path("/home/claude/winesite")
DL = ROOT / "raw/terraclimate_monthly/dl"
OUTC = ROOT / "work/vintage/cells"
BASE = "https://thredds.northwestknowledge.net/thredds/fileServer/TERRACLIMATE_ALL/data/"
VARS = ("tmax", "tmin", "ppt")
NY, NX = 4320, 8640


def cells_sha():
    import hashlib
    return hashlib.sha1(np.load(ROOT / "work/vintage/cells.npy").tobytes()).hexdigest()[:16]


def done(var, year, sha):
    """Extracted already for the current cell set?"""
    m = OUTC / f"{var}_{year}.json"
    if not (OUTC / f"{var}_{year}.npy").exists() or not m.exists():
        return False
    return json.load(open(m)).get("cells_sha") == sha


def download(var, year, sha=None):
    name = f"TerraClimate_{var}_{year}.nc"
    dst = DL / name
    if sha and done(var, year, sha):
        return None
    if dst.exists() and dst.stat().st_size > 10_000_000:
        return dst
    for attempt in range(4):
        tmp = DL / (name + ".part")
        r = subprocess.run(["curl", "-sS", "--fail", "-m", "900", "-o", str(tmp), BASE + name],
                           capture_output=True, text=True)
        if r.returncode == 0 and tmp.stat().st_size > 10_000_000:
            os.replace(tmp, dst)
            return dst
        print(f"  retry {name}: {r.stderr.strip()[:200]}", flush=True)
        time.sleep(10 * (attempt + 1))
    raise RuntimeError(f"download failed: {name}")


def extract(var, year, path, cells, ref_lat, ref_lon, sha=None):
    import netCDF4
    rows, cols = cells // NX, cells % NX
    with netCDF4.Dataset(path) as d:
        lat = d["lat"][:]
        lon = d["lon"][:]
        assert lat.shape == (NY,) and lon.shape == (NX,)
        assert np.allclose(lat, ref_lat, atol=1e-4) and np.allclose(lon, ref_lon, atol=1e-4), "grid mismatch"
        v = d[var]
        v.set_auto_maskandscale(False)
        assert v.dimensions == ("time", "lat", "lon") and v.shape == (12, NY, NX), v.shape
        t = d["time"]
        dates = netCDF4.num2date(t[:], t.units, getattr(t, "calendar", "standard"))
        assert all(x.year == year for x in dates) and [x.month for x in dates] == list(range(1, 13))
        out = np.empty((12, len(cells)), dtype=v.dtype)
        for m in range(0, 12, 2):
            a = v[m:m + 2]
            out[m:m + 2] = a[:, rows, cols]
            del a
        meta = {"scale": float(getattr(v, "scale_factor", 1.0)), "offset": float(getattr(v, "add_offset", 0.0)),
                "fill": int(getattr(v, "_FillValue")), "missing": int(getattr(v, "missing_value", getattr(v, "_FillValue"))),
                "dtype": str(v.dtype), "units": getattr(v, "units", ""),
                "date_created": getattr(d, "date_created", None), "version": getattr(d, "version", None),
                "nmissing": int((out == getattr(v, "_FillValue")).sum()), "cells_sha": sha, "ncell": int(len(cells))}
    np.save(OUTC / f"{var}_{year}.tmp.npy", out)
    os.replace(OUTC / f"{var}_{year}.tmp.npy", OUTC / f"{var}_{year}.npy")
    json.dump(meta, open(OUTC / f"{var}_{year}.json", "w"))
    path.unlink()
    return meta


def main():
    import netCDF4
    y0 = int(sys.argv[1]) if len(sys.argv) > 1 else 1950
    y1 = int(sys.argv[2]) if len(sys.argv) > 2 else 2025
    DL.mkdir(parents=True, exist_ok=True)
    OUTC.mkdir(parents=True, exist_ok=True)
    cells = np.load(ROOT / "work/vintage/cells.npy")
    with netCDF4.Dataset(ROOT / "raw/terraclimate_1991_2020/TerraClimate_19912020_tmax.nc") as c:
        ref_lat, ref_lon = c["lat"][:], c["lon"][:]
    sha = cells_sha()
    jobs = [(v, y) for y in range(y1, y0 - 1, -1) for v in VARS if not done(v, y, sha)]
    print(f"{len(jobs)} files to fetch", flush=True)
    t0 = time.time()
    # at most MAX_AHEAD files downloaded but not yet extracted (each ~100-150 MB): downloads can outrun
    # the extraction (zlib-9 decompression) and would otherwise fill the disk
    MAX_AHEAD = 6
    from collections import deque
    with ThreadPoolExecutor(3) as pool:
        q = deque()
        it = iter(jobs)
        def refill():
            while len(q) < MAX_AHEAD:
                try:
                    v, y = next(it)
                except StopIteration:
                    return
                q.append((v, y, pool.submit(download, v, y, sha)))
        refill()
        while q:
            v, y, f = q.popleft()
            p = f.result()
            refill()
            if p is None:
                continue
            m = extract(v, y, p, cells, ref_lat, ref_lon, sha)
            print(f"{v} {y}: ok, missing values {m['nmissing']}, created {m['date_created']} "
                  f"({time.time() - t0:.0f}s)", flush=True)
    print("done", flush=True)


if __name__ == "__main__":
    main()
