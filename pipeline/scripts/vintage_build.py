#!/usr/bin/env python3
"""Vitis Mundi v2, vintage step 3: yearly weather record per appellation / region.

Inputs: work/vintage/{entities.json, weights.npz, cells.npy} (vintage_entities.py) and
work/vintage/cells/{tmax,tmin,ppt}_{YYYY}.npy (vintage_fetch.py; TerraClimate v1.1, 2026 release).
Output: site/data/vintage/{iso2}.json  {"<id>": {"y0", "gst", "gdd", "hi", "gsp", "hr", "fr", "hd",
        "n6190": {gst, gdd, gsp}, "n9120": {gst, gdd, gsp}}}   (one entity per line, compact)
        work/vintage/series.npz (unrounded arrays, for _drift.json and validation)

Season / harvest-year convention: N hemisphere year Y = Apr-Oct Y; S hemisphere year Y = Oct (Y-1) to
Apr Y (labelled by the April year). Hemisphere from the label point latitude (as v1).
Per year and per climate cell (Tmean = (Tmax + Tmin)/2, actual month lengths):
  gst  mean Tmean of the 7 season months, C
  gdd  sum max(0, Tmean - 10) * days over the season (Winkler, monthly approximation), C days
  hi   Huglin: sum max(0, (Tmean + Tmax)/2 - 10) * days, Apr-Sep (N) / Oct-Mar (S), x K(lat of entity)
  gsp  season precipitation, mm
  hr   harvest-window precipitation: Sep + Oct (N) / Mar + Apr (S), mm
  fr   spring frost proxy: expected number of frost nights (Tmin <= 0 C) between the cell's normal
       budburst date (first day the 1991-2020 normal Tmean reaches 10 C, interpolated between mid-month
       values, clamped 1 Mar-15 May / 1 Sep-15 Nov) and 31 May / 30 Nov, treating daily Tmin as
       normal(daily-interpolated monthly mean Tmin of that year, sigma); sigma fitted on GHCN-Daily
       stations (vintage_calibrate.py)
  hd   heat proxy: expected number of days with Tmax >= 35 C over the season,
       sum days_m * Phi((Tmax_m - 35) / sigma_h), sigma_h fitted on GHCN-Daily stations
Then entity value = weighted mean over its cells (weights.npz: viable-cell coverage weights).
Normals n6190 / n9120 = mean of the yearly values for harvest years 1961-1990 / 1991-2020.
Rounding: gst 0.1 C, all others integers; null where the season is not covered by the data.
Run: python3 -I scripts/vintage_build.py [--y0 1950] [--y1 2025]
"""
import calendar
import json
import os
import sys
import time
from pathlib import Path

import numpy as np
import scipy.sparse as sp
from scipy.special import ndtr

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vintage_common import budburst_index, expected_frost_nights  # noqa: E402

ROOT = Path("/home/claude/winesite")
W = ROOT / "work/vintage"
CELLS = W / "cells"
OUT = ROOT / "site/data/vintage"
KEYS = ["gst", "gdd", "hi", "gsp", "hr", "fr", "hd"]
HOT_T = 35.0


def huglin_k(lat):
    a = abs(lat)
    for lim, k in ((40, 1.00), (42, 1.02), (44, 1.03), (46, 1.04), (48, 1.05)):
        if a < lim:
            return k
    return 1.06


class Reader:
    def __init__(self):
        self.meta = {}
        self.cache = {}

    def year(self, y):
        if y in self.cache:
            return self.cache[y]
        if not (CELLS / f"tmax_{y}.npy").exists():
            return None
        out = {}
        for v in ("tmax", "tmin", "ppt"):
            m = json.load(open(CELLS / f"{v}_{y}.json"))
            a = np.load(CELLS / f"{v}_{y}.npy")
            f = a.astype(np.float32) * np.float32(m["scale"]) + np.float32(m["offset"])
            f[(a == m["fill"]) | (a == m["missing"])] = np.nan
            out[v] = f
        out["tm"] = (out["tmax"] + out["tmin"]) * np.float32(0.5)
        for k in list(self.cache):
            if k < y - 1:
                del self.cache[k]
        self.cache[y] = out
        return out


def season_months(h, y, rd):
    """List of (data dict, month index 0-11, days) for the 7-month season of harvest year y."""
    cur = rd.year(y)
    if h == "n":
        if cur is None:
            return None
        return [(cur, m, calendar.monthrange(y, m + 1)[1]) for m in range(3, 10)]
    prev = rd.year(y - 1)
    if cur is None or prev is None:
        return None
    return ([(prev, m, calendar.monthrange(y - 1, m + 1)[1]) for m in (9, 10, 11)]
            + [(cur, m, calendar.monthrange(y, m + 1)[1]) for m in (0, 1, 2, 3)])


def cell_indices(h, y, rd, bb, sig_f, sig_h):
    S = season_months(h, y, rd)
    if S is None:
        return None
    tm = np.stack([d["tm"][m] for d, m, n in S])
    tx = np.stack([d["tmax"][m] for d, m, n in S])
    pp = np.stack([d["ppt"][m] for d, m, n in S])
    days = np.array([n for d, m, n in S], dtype=np.float32)[:, None]
    hug = slice(0, 6)                               # Apr-Sep / Oct-Mar = first six season months
    r = {
        "gst": tm.mean(axis=0),
        "gdd": (np.maximum(tm - 10, 0) * days).sum(axis=0),
        "hi": (np.maximum((tm[hug] + tx[hug]) * 0.5 - 10, 0) * days[hug]).sum(axis=0),
        "gsp": pp.sum(axis=0),
        "hr": pp[5] + pp[6],          # season months 6 and 7: Sep+Oct (N) / Mar+Apr (S)
        "hd": (days * ndtr((tx - HOT_T) / sig_h)).sum(axis=0),
    }
    # frost: anchor months Feb-Jun of y (N) / Aug-Dec of y-1 (S)
    if h == "n":
        d = rd.year(y)
        tmin5 = d["tmin"][1:6]
    else:
        d = rd.year(y - 1)
        tmin5 = d["tmin"][7:12]
    r["fr"] = expected_frost_nights(tmin5.astype(np.float64), bb[h], h, sig_f)
    return r


def wmean(Wm, x):
    """Weighted mean per entity, renormalising over cells with data (NaN-aware)."""
    ok = np.isfinite(x)
    num = Wm @ np.where(ok, x, 0).astype(np.float64)
    den = Wm @ ok.astype(np.float64)
    with np.errstate(invalid="ignore", divide="ignore"):
        out = num / den
    out[den < 0.5] = np.nan       # less than half the weight has data -> missing
    return out


def main():
    args = sys.argv[1:]
    y0 = int(args[args.index("--y0") + 1]) if "--y0" in args else 1950
    y1 = int(args[args.index("--y1") + 1]) if "--y1" in args else 2025
    t0 = time.time()
    ents = json.load(open(W / "entities.json"))
    z = np.load(W / "weights.npz")
    ncell = len(np.load(W / "cells.npy"))
    Wm = sp.csr_matrix((z["w"].astype(np.float64), (z["ent"], z["cell"])), shape=(len(ents), ncell))
    cal = json.load(open(W / "frost_calibration.json"))
    sig_f, sig_h = cal["sigma"], cal["heat"]["sigma"]
    rd = Reader()
    # ---- normal budburst per cell from 1991-2020 monthly Tmean
    acc = np.zeros((12, ncell))
    for y in range(1991, 2021):
        acc += rd.year(y)["tm"]
    norm_tm = acc / 30
    bb = {"n": budburst_index(norm_tm[1:6], "n"), "s": budburst_index(norm_tm[7:12], "s")}
    print(f"budburst normals done ({time.time() - t0:.0f}s)", flush=True)
    hem = np.array([e["h"] for e in ents])
    K = np.array([huglin_k(e["lat"]) for e in ents])
    years = list(range(y0, y1 + 1))
    S = {k: np.full((len(ents), len(years)), np.nan) for k in KEYS}
    for j, y in enumerate(years):
        for h in "ns":
            r = cell_indices(h, y, rd, bb, sig_f, sig_h)
            if r is None:
                continue
            sel = hem == h
            for k in KEYS:
                S[k][sel, j] = wmean(Wm, r[k])[sel]
        if y % 10 == 0:
            print(f"  {y} ({time.time() - t0:.0f}s)", flush=True)
    S["hi"] *= K[:, None]
    np.savez(W / "series.npz", years=np.array(years), **S)
    write_outputs(ents, years, S)
    print(f"done ({time.time() - t0:.0f}s)")


def r1(x):
    return None if not np.isfinite(x) else round(float(x), 1)


def ri(x):
    return None if not np.isfinite(x) else int(round(float(x)))


def normals(S, i, years, a, b):
    yy = np.array(years)
    sel = (yy >= a) & (yy <= b)
    out = {}
    for k, f in (("gst", r1), ("gdd", ri), ("gsp", ri)):
        v = S[k][i, sel]
        out[k] = f(np.nanmean(v)) if np.isfinite(v).sum() >= 0.9 * sel.sum() else None
    return out


def write_outputs(ents, years, S):
    OUT.mkdir(parents=True, exist_ok=True)
    by_c = {}
    for i, e in enumerate(ents):
        if e.get("mode") == "none":
            continue
        valid = np.isfinite(S["gst"][i])
        if not valid.any():
            continue
        first = int(np.argmax(valid))
        rec = {"y0": years[first]}
        for k in KEYS:
            f = r1 if k == "gst" else ri
            rec[k] = [f(x) for x in S[k][i, first:]]
        rec["n6190"] = normals(S, i, years, 1961, 1990)
        rec["n9120"] = normals(S, i, years, 1991, 2020)
        by_c.setdefault(e["country"], []).append((e["id"], rec))
    for c, items in sorted(by_c.items()):
        items.sort(key=lambda t: t[0])
        body = ",\n".join(json.dumps(k, ensure_ascii=False) + ":" + json.dumps(v, separators=(",", ":"))
                          for k, v in items)
        txt = "{\n" + body + "\n}\n"
        tmp = OUT / f".{c}.json.tmp"
        tmp.write_text(txt, encoding="utf-8")
        os.replace(tmp, OUT / f"{c}.json")
    print(f"wrote {len(by_c)} country files, {sum(len(v) for v in by_c.values())} entities")


if __name__ == "__main__":
    main()
