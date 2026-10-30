#!/usr/bin/env python3
"""Fit monthly Tmax / Tmin lapse rates for downscaling TerraClimate cell values to vineyard elevation.

Data: NOAA NCEI Global Summary of the Month (GSOM, derived from GHCN-Daily; public domain), one CSV per
station from https://www.ncei.noaa.gov/data/global-summary-of-the-month/access/{id}.csv (downloads in
raw/ghcn_gsom/). Stations: GHCN-D stations at 25-55 deg latitude with TMAX and TMIN covering 1993-2018,
a known elevation, and either |z_cell - z_station| >= 150 m (all of them: the informative ones) or a random
400 of the rest (anchor). z_cell = mean 30" DEM elevation of the station's TerraClimate cell (tc_elev.npy).

Model, per calendar month m (Southern Hemisphere months shifted by 6 so that index 0 is always mid-winter
January-equivalent):   T_station - T_cell = a_m + rate_m * (z_cell - z_station) / 1000 + e
fitted separately for stations BELOW their cell's mean elevation (dz >= 150 m; the vineyard case: valley
floors and lower slopes) and ABOVE it (dz <= -150 m: hilltops), each together with the |dz| < 150 m anchors.
A pooled fit mixes two regimes (night-time cold-air pooling below, thermal-belt nights above) and gives a
misleading Tmin rate (1.6 C/km for Apr-Oct). Tmin rates of the "above" set come out negative (hill nights
warmer than the cell mean); they are clipped at 0 so no target gets warmer nights by going up.
T_cell from TerraClimate 1991-2020 monthly climatology; station normal = mean of 1991-2020 monthly values
(>= 15 years, months with <= 5 missing days). Huber regression (scipy least_squares, soft_l1). Rates are then
smoothed with a 3-month circular running mean. The intercept (dataset bias) is reported, not applied.
Writes work/climate_lapse.json. Run: python3 -I scripts/climate_lapse_calibrate.py [--download]
"""
import csv
import json
import random
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import numpy as np

ROOT = Path("/home/claude/winesite")
RAW = ROOT / "raw/ghcn_gsom"
CACHE = ROOT / "work/climate_cache"


def select():
    z = np.load(CACHE / "tc_elev.npy", mmap_mode="r")
    inv = {}
    for l in open(ROOT / "raw/ghcnd/ghcnd-inventory.txt"):
        el = l[31:35]
        if el in ("TMAX", "TMIN"):
            inv.setdefault(l[:11], {})[el] = (int(l[36:40]), int(l[41:45]))
    big, small = [], []
    for l in open(ROOT / "raw/ghcnd/ghcnd-stations.txt"):
        sid, la, lo, el = l[:11], float(l[12:20]), float(l[21:30]), float(l[31:37])
        I = inv.get(sid, {})
        if el < -900 or "TMAX" not in I or "TMIN" not in I or not (25 <= abs(la) <= 55):
            continue
        if I["TMAX"][0] > 1993 or I["TMAX"][1] < 2018 or I["TMIN"][0] > 1993 or I["TMIN"][1] < 2018:
            continue
        zc = float(z[int((90 - la) * 24), int((lo + 180) * 24)])
        if not np.isfinite(zc):
            continue
        rec = {"sid": sid, "lat": la, "lon": lo, "z": el, "zc": zc}
        (big if abs(zc - el) >= 150 else small).append(rec)
    random.Random(42).shuffle(small)
    return big + small[:400]


def fetch(sid):
    p = RAW / f"{sid}.csv"
    if p.exists() and p.stat().st_size > 0:
        return True
    r = subprocess.run(["curl", "-sS", "--fail", "-m", "120", "-o", str(p),
                        f"https://www.ncei.noaa.gov/data/global-summary-of-the-month/access/{sid}.csv"],
                       capture_output=True)
    if r.returncode != 0:
        p.unlink(missing_ok=True)
    return r.returncode == 0


def normals(sid):
    """Station 1991-2020 monthly normals of TMAX, TMIN (C) -> (2, 12) array (NaN where < 15 years)."""
    acc = {"TMAX": [[] for _ in range(12)], "TMIN": [[] for _ in range(12)]}
    with open(RAW / f"{sid}.csv", newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            y, m = int(row["DATE"][:4]), int(row["DATE"][5:7])
            if not 1991 <= y <= 2020:
                continue
            for v in acc:
                x = (row.get(v) or "").strip()
                if not x:
                    continue
                miss = (row.get(v + "_ATTRIBUTES") or "").split(",")[0].strip()
                if miss and miss.isdigit() and int(miss) > 5:
                    continue
                acc[v][m - 1].append(float(x))
    out = np.full((2, 12), np.nan)
    for k, v in enumerate(("TMAX", "TMIN")):
        for m in range(12):
            if len(acc[v][m]) >= 15:
                out[k, m] = np.mean(acc[v][m])
    return out


def tc_normals(st):
    import netCDF4
    out = np.full((len(st), 2, 12), np.nan)
    rows = np.array([int((90 - s["lat"]) * 24) for s in st])
    cols = np.array([int((s["lon"] + 180) * 24) for s in st])
    for k, v in enumerate(("tmax", "tmin")):
        with netCDF4.Dataset(ROOT / f"raw/terraclimate_1991_2020/TerraClimate_19912020_{v}.nc") as d:
            var = d[v]
            var.set_auto_maskandscale(False)
            a = var[:]
            sc, off, fill = float(var.scale_factor), float(var.add_offset), var._FillValue
            raw = a[:, rows, cols]
            val = raw * sc + off
            val[raw == fill] = np.nan
            out[:, k, :] = val.T
            del a
    return out


def huber_fit(x, y):
    from scipy.optimize import least_squares
    A = np.c_[np.ones_like(x), x]
    b0 = np.linalg.lstsq(A, y, rcond=None)[0]
    r = least_squares(lambda b: A @ b - y, b0, loss="soft_l1", f_scale=1.0)
    # standard error via bootstrap of the robust fit
    rng = np.random.default_rng(0)
    bs = []
    for _ in range(200):
        i = rng.integers(0, len(x), len(x))
        bs.append(least_squares(lambda b: A[i] @ b - y[i], r.x, loss="soft_l1", f_scale=1.0).x[1])
    return r.x, float(np.std(bs))


def main():
    st = select()
    print(len(st), "stations selected;", sum(abs(s["zc"] - s["z"]) >= 150 for s in st), "with |dz| >= 150 m")
    if "--download" in sys.argv:
        RAW.mkdir(parents=True, exist_ok=True)
        with ThreadPoolExecutor(8) as pool:
            ok = list(pool.map(fetch, [s["sid"] for s in st]))
        print(sum(ok), "downloaded")
    st = [s for s in st if (RAW / f"{s['sid']}.csv").exists()]
    S = np.array([normals(s["sid"]) for s in st])          # (n, 2, 12)
    T = tc_normals(st)
    dz = np.array([(s["zc"] - s["z"]) / 1000 for s in st])
    south = np.array([s["lat"] < 0 for s in st])
    res = {"n": {}, "s": {}}
    anchor = np.abs(dz) < 0.15
    groups = {"below": (dz >= 0.15) | anchor, "above": (dz <= -0.15) | anchor}
    fits, rates = [], {}
    for gname, gsel in groups.items():
        raw_rates = np.full((2, 12), np.nan)
        for k, v in enumerate(("tmax", "tmin")):
            for m in range(12):                                   # m = northern-equivalent month index
                mm = np.where(south, (m + 6) % 12, m)
                ys = S[np.arange(len(st)), k, mm] - T[np.arange(len(st)), k, mm]
                ok = gsel & np.isfinite(ys) & (np.abs(ys - np.nanmedian(ys) - 6.5 * dz) < 8)
                (a, b), se = huber_fit(dz[ok], ys[ok])
                raw_rates[k, m] = b
                fits.append((gname, v, m + 1, int(ok.sum()), a, b, se))
        sm = (np.roll(raw_rates, 1, axis=1) + raw_rates + np.roll(raw_rates, -1, axis=1)) / 3
        if gname == "above":
            sm = np.maximum(sm, 0.0)
        rates[gname] = (raw_rates, sm)
    for g, v, mo, n, a, b, se in fits:
        print(f"  {g:5s} {v} month {mo:2d} (N-equivalent): n={n} intercept {a:+.2f} C  rate {b:.2f} +- {se:.2f} C/km")
    for h in "ns":
        sh = 0 if h == "n" else 6
        res[h] = {f"{v}{'' if g == 'below' else '_up'}": [round(float(rates[g][1][k, (m - sh) % 12]), 2) for m in range(12)]
                  for g in rates for k, v in enumerate(("tmax", "tmin"))}
    # skill: station growing-season Tmean vs cell, before and after (in-sample and 5-fold CV)
    def gst_err(rates_by_st):
        e0, e1 = [], []
        for i, s in enumerate(st):
            h = "s" if s["lat"] < 0 else "n"
            months = [3, 4, 5, 6, 7, 8, 9] if h == "n" else [9, 10, 11, 0, 1, 2, 3]
            if not np.isfinite(S[i][:, months]).all():
                continue
            g_st = S[i][:, months].mean()
            g_tc = T[i][:, months].mean()
            rx, rn = rates_by_st(i, h, dz[i])
            g_cor = g_tc + dz[i] * (rx[months].mean() + rn[months].mean()) / 2
            e0.append((g_tc - g_st, dz[i])); e1.append((g_cor - g_st, dz[i]))
        return np.array(e0), np.array(e1)
    pick = lambda i, h, d: ((np.array(res[h]["tmax"]), np.array(res[h]["tmin"])) if d >= 0
                            else (np.array(res[h]["tmax_up"]), np.array(res[h]["tmin_up"])))
    e0, e1 = gst_err(pick)
    for lab, sel in (("all", np.ones(len(e0), bool)), ("station >=300 m below cell", e0[:, 1] >= 0.3),
                     ("station >=300 m above cell", e0[:, 1] <= -0.3), ("|dz|<150 m", np.abs(e0[:, 1]) < 0.15)):
        print(f"  GST error ({lab}, n={sel.sum()}): before bias {e0[sel, 0].mean():+.2f} RMSE {np.sqrt((e0[sel, 0] ** 2).mean()):.2f};"
              f"  after bias {e1[sel, 0].mean():+.2f} RMSE {np.sqrt((e1[sel, 0] ** 2).mean()):.2f} C")
    out = {"rates": res, "unit": "C per km, positive = colder with height; index 0 = January",
           "keys": "tmax/tmin: target below the cell mean elevation; tmax_up/tmin_up: target above it",
           "fits": [{"group": g, "var": v, "month_n_equiv": mo, "n": n, "intercept": round(float(a), 2), "rate": round(float(b), 2),
                     "se": round(se, 2)} for g, v, mo, n, a, b, se in fits],
           "n_stations": len(st),
           "skill_gst_below300": {"before_bias": round(float(e0[e0[:, 1] >= 0.3, 0].mean()), 2),
                                  "before_rmse": round(float(np.sqrt((e0[e0[:, 1] >= 0.3, 0] ** 2).mean())), 2),
                                  "after_bias": round(float(e1[e1[:, 1] >= 0.3, 0].mean()), 2),
                                  "after_rmse": round(float(np.sqrt((e1[e1[:, 1] >= 0.3, 0] ** 2).mean())), 2)}}
    json.dump(out, open(ROOT / "work/climate_lapse.json", "w"), indent=1)
    for k in ("tmax", "tmin", "tmax_up", "tmin_up"):
        print(f"  {k}: N months Jan-Dec {res['n'][k]}  (Apr-Oct mean {np.mean(res['n'][k][3:10]):.2f} C/km)")


if __name__ == "__main__":
    main()
