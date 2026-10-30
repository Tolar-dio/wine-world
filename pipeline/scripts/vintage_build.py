#!/usr/bin/env python3
"""Vitis Mundi v2, vintage step 3: yearly weather record per appellation / region.

Inputs: work/vintage/{entities.json, weights.npz, site_entities.json, site_weights.npz, cells.npy}
(vintage_entities.py) and work/vintage/cells/{tmax,tmin,ppt}_{YYYY}.npy (vintage_fetch.py; TerraClimate v1.1,
2026 release).
v2 (2026-10-30): every (entity, TerraClimate cell) pair carries an elevation offset dz = z_cell - z_target;
monthly Tmax/Tmin are shifted by the monthly lapse rates of work/climate_lapse.json before any index is
computed (scripts/climate_downscale.py; same rule as the static `clim`). Precipitation is not shifted.
Also writes site/data/vintage/_sites.json: 1991-2020 and 1961-1990 normals per site (150 m disc at the site's
30 m mean elevation): {"<site id>": {"e", "dz", "n9120": {gst, gdd, hi, gsp}, "n6190": {gst, gdd, gsp}}}.
Output: site/data/vintage/{iso2}.json  {"<id>": {"y0", "gst", "gdd", "hi", "gsp", "hr", "fr", "hd",
        "n6190": {gst, gdd, gsp}, "n9120": {gst, gdd, gsp}}}   (one entity per line, compact)
        work/vintage/series.npz (unrounded arrays, for _drift.json and validation)

Season / harvest-year convention: N hemisphere year Y = Apr-Oct Y; S hemisphere year Y = Oct (Y-1) to
Apr Y (labelled by the April year). Hemisphere from the label point latitude (as v1).
Per year and per (entity, cell) pair (Tmean = (Tmax + Tmin)/2 after the elevation shift, actual month lengths):
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
Run: python3 -I scripts/vintage_build.py [--y0 1950] [--y1 2025] [--only ids.json]
     --only: recompute only these entity ids (pairs from entities.json/weights.npz) and reuse the rows of
     series.npz (keyed by series_entities.json) for every other id; _sites.json is left as is.
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
import climate_downscale as cd  # noqa: E402

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
        ex = W / "cells_extra.npy"
        self.n_extra = len(np.load(ex)) if ex.exists() else 0

    def year(self, y):
        if y in self.cache:
            return self.cache[y]
        if not (CELLS / f"tmax_{y}.npy").exists():
            return None
        out = {}
        for v in ("tmax", "tmin", "ppt"):
            m = json.load(open(CELLS / f"{v}_{y}.json"))
            a = np.load(CELLS / f"{v}_{y}.npy")
            if self.n_extra:                  # supplementary store (vintage_fetch_dap.py), same raw encoding
                a = np.concatenate([a, np.load(W / "cells_extra" / f"{v}_{y}.npy").astype(a.dtype)], axis=1)
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


class PairSet:
    """Pairs of one hemisphere: cell index into cells.npy and Tmax/Tmin monthly shifts (12, n)."""

    def __init__(self, cidx, dz, h, L):
        self.cidx = cidx
        self.h = h
        self.sx = cd.shift(L, h, "tmax", dz).astype(np.float32)
        self.sn = cd.shift(L, h, "tmin", dz).astype(np.float32)

    def tx(self, d, m):
        return d["tmax"][m][self.cidx] + self.sx[m]

    def tn(self, d, m):
        return d["tmin"][m][self.cidx] + self.sn[m]


def pair_indices(ps, y, rd, bb, sig_f, sig_h):
    """Yearly indices per pair for harvest year y (None when the season is not covered)."""
    S = season_months(ps.h, y, rd)
    if S is None:
        return None
    tx = np.stack([ps.tx(d, m) for d, m, n in S])
    tn = np.stack([ps.tn(d, m) for d, m, n in S])
    tm = (tx + tn) * np.float32(0.5)
    pp = np.stack([d["ppt"][m][ps.cidx] for d, m, n in S])
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
    d = rd.year(y) if ps.h == "n" else rd.year(y - 1)
    months = list(range(1, 6)) if ps.h == "n" else list(range(7, 12))
    tmin5 = np.stack([ps.tn(d, m) for m in months]).astype(np.float64)
    fr = np.empty(len(ps.cidx))
    for i0 in range(0, len(ps.cidx), 150000):
        sl = slice(i0, i0 + 150000)
        fr[sl] = expected_frost_nights(tmin5[:, sl], bb[sl], ps.h, sig_f)
    r["fr"] = fr
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
    sents = json.load(open(W / "site_entities.json"))
    z = np.load(W / "weights.npz")
    zs = np.load(W / "site_weights.npz")
    only = None
    if "--only" in args:                 # incremental: recompute these entity ids, reuse series.npz rows for the rest
        only = set(json.load(open(args[args.index("--only") + 1])))
        sents = []
        zs = {"ent": np.array([], np.int32), "cell": np.array([], np.int32), "w": np.array([], np.float32),
              "dz": np.array([], np.float32)}
    allents = ents + sents
    ent = np.concatenate([z["ent"], zs["ent"] + len(ents)])
    cidx = np.concatenate([z["cell"], zs["cell"]])
    w = np.concatenate([z["w"], zs["w"]]).astype(np.float64)
    dz = np.concatenate([z["dz"], zs["dz"]]).astype(np.float64)
    if only is not None:
        keep = np.isin(ent, [i for i, e in enumerate(ents) if e["id"] in only])
        ent, cidx, w, dz = ent[keep], cidx[keep], w[keep], dz[keep]
        print(f"incremental: {len(only)} ids, {keep.sum()} pairs", flush=True)
    L = cd.lapse()
    cal = json.load(open(W / "frost_calibration.json"))
    sig_f, sig_h = cal["sigma"], cal["heat"]["sigma"]
    rd = Reader()
    hem_e = np.array([e.get("h", "n") for e in allents])
    hem_p = hem_e[ent]
    PS, WM = {}, {}
    for h in "ns":
        sel = np.where(hem_p == h)[0]
        PS[h] = PairSet(cidx[sel], dz[sel], h, L)
        WM[h] = sp.csr_matrix((w[sel], (ent[sel], np.arange(len(sel)))), shape=(len(allents), len(sel)))
    # ---- normal budburst per pair from the elevation-shifted 1991-2020 monthly Tmean
    ncell = len(np.load(W / "cells.npy")) + rd.n_extra
    acc_x = np.zeros((12, ncell)); acc_n = np.zeros((12, ncell))
    for y in range(1991, 2021):
        d = rd.year(y)
        acc_x += d["tmax"]; acc_n += d["tmin"]
    nx, nn = acc_x / 30, acc_n / 30
    bb = {}
    for h in "ns":
        ps = PS[h]
        months = list(range(1, 6)) if h == "n" else list(range(7, 12))
        tm5 = np.stack([(nx[m][ps.cidx] + ps.sx[m] + nn[m][ps.cidx] + ps.sn[m]) / 2 for m in months])
        bb[h] = budburst_index(tm5, h)
    print(f"budburst normals done ({time.time() - t0:.0f}s)", flush=True)
    K = np.array([huglin_k(e.get("lat", 0)) for e in allents])
    years = list(range(y0, y1 + 1))
    S = {k: np.full((len(allents), len(years)), np.nan) for k in KEYS}
    for j, y in enumerate(years):
        for h in "ns":
            r = pair_indices(PS[h], y, rd, bb[h], sig_f, sig_h)
            if r is None:
                continue
            sel = hem_e == h
            for k in KEYS:
                S[k][sel, j] = wmean(WM[h], r[k])[sel]
        if y % 10 == 0:
            print(f"  {y} ({time.time() - t0:.0f}s)", flush=True)
    S["hi"] *= K[:, None]
    ne = len(ents)
    if only is not None:                 # merge with the previous series for unchanged ids
        prev = np.load(W / "series.npz")
        pent = {e["id"]: i for i, e in enumerate(json.load(open(W / "series_entities.json")))}
        assert list(prev["years"]) == years, "year range differs from series.npz"
        for i, e in enumerate(ents):
            if e["id"] not in only:
                j = pent[e["id"]]
                for k in KEYS:
                    S[k][i] = prev[k][j]
    np.savez(W / "series.npz", years=np.array(years), **{k: v[:ne] for k, v in S.items()})
    json.dump(ents, open(W / "series_entities.json", "w"), ensure_ascii=False)
    write_outputs(ents, years, {k: v[:ne] for k, v in S.items()})
    if only is None:
        write_sites(sents, years, {k: v[ne:] for k, v in S.items()})
    print(f"done ({time.time() - t0:.0f}s)")


def write_sites(sents, years, S):
    out = {}
    for i, e in enumerate(sents):
        if e.get("mode") in (None, "none") or not np.isfinite(S["gst"][i]).any():
            continue
        n9 = normals(S, i, years, 1991, 2020)
        yy = np.array(years)
        sel = (yy >= 1991) & (yy <= 2020)
        n9["hi"] = ri(np.nanmean(S["hi"][i, sel]))
        out[e["id"]] = {"e": e.get("zt"), "dz": e.get("dz"), "n9120": n9, "n6190": normals(S, i, years, 1961, 1990)}
    body = ",\n".join(json.dumps(k, ensure_ascii=False) + ":" + json.dumps(v, separators=(",", ":")) for k, v in sorted(out.items()))
    tmp = OUT / "._sites.json.tmp"
    tmp.write_text("{\n" + body + "\n}\n", encoding="utf-8")
    os.replace(tmp, OUT / "_sites.json")
    print(f"wrote _sites.json: {len(out)} sites")


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
        if e.get("mode") in (None, "none"):
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
