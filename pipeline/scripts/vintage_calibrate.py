#!/usr/bin/env python3
"""Calibrate and test the spring-frost proxy against GHCN-Daily stations (NOAA NCEI, public domain).

For each station: normal budburst day from the station's own 1991-2020 monthly Tmean (vintage_common),
then for every year the expected frost nights from that year's monthly mean Tmin (the proxy), versus the
observed count of nights with daily Tmin <= 0 C in the same window. Fits the single sigma of the
daily-Tmin spread; reports skill. Run: python3 -I scripts/vintage_calibrate.py   (frost)   then   python3 -I scripts/vintage_calibrate.py --heat
"""
import csv
import json
import sys
from collections import defaultdict
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vintage_common import MSTART, WIN, budburst_index, expected_frost_nights, interp_matrix  # noqa: E402

ROOT = Path("/home/claude/winesite")


def load_daily(sid):
    tmin = defaultdict(dict)
    with open(ROOT / "raw/ghcnd/csv" / f"{sid}.csv", newline="", encoding="utf-8") as fh:
        for row in csv.DictReader(fh):
            d = row["DATE"]
            y = int(d[:4])
            if y < 1950 or not row.get("TMIN", "").strip():
                continue
            att = (row.get("TMIN_ATTRIBUTES") or ",,").split(",")
            if len(att) > 1 and att[1].strip():
                continue
            m, dd = int(d[5:7]), int(d[8:10])
            if m == 2 and dd == 29:
                continue
            tmin[y][MSTART[m - 1] + dd - 1] = int(row["TMIN"]) / 10.0
    return tmin


def main():
    S = json.load(open(ROOT / "work/vintage/ghcnd_monthly.json"))
    recs = []
    for sid, st in S.items():
        h = "s" if st["lat"] < 0 else "n"
        e0, eL, last, m0 = WIN[h]
        mon = st["months"]
        # station normal Tmean of anchor months (1991-2020)
        norm = []
        for k in range(5):
            mm = m0 + k + 1
            v = [(r[0] + r[1]) / 2 for ym, r in mon.items() if 1991 <= int(ym[:4]) <= 2020 and int(ym[5:]) == mm
                 and r[0] is not None and r[1] is not None]
            norm.append(np.mean(v) if len(v) >= 15 else np.nan)
        if np.isnan(norm).any():
            continue
        bb = budburst_index(np.array(norm)[:, None], h)
        M, first = interp_matrix(h)
        daily = load_daily(sid)
        for y, dd in daily.items():
            t5 = []
            for k in range(5):
                r = mon.get(f"{y}-{m0 + k + 1:02d}")
                t5.append(r[0] if r and r[0] is not None else np.nan)
            if np.isnan(t5).any():
                continue
            days = range(first + int(bb[0]), last + 1)
            obs = [dd.get(d) for d in days]
            if sum(o is None for o in obs) > 0.1 * len(obs):
                continue
            n = sum(1 for o in obs if o is not None and o <= 0) * len(obs) / sum(o is not None for o in obs)
            am = [mon.get(f"{y}-{mm:02d}") for mm in ((4, 5) if h == "n" else (10, 11))]
            am = [r[0] for r in am if r and r[0] is not None]
            amt = np.mean(am) if len(am) == 2 else np.nan        # simple alternative proxy: mean Tmin of Apr+May
            recs.append((sid, st["tag"], y, np.array(t5), int(bb[0]), n, amt, h))
    print(len(recs), "station-years")
    obs = np.array([r[5] for r in recs])
    best = None
    for sig in np.arange(1.5, 5.01, 0.05):
        pred = np.array([expected_frost_nights(r[3][:, None], np.array([r[4]]), r[7], sig)[0] for r in recs])
        l = ((pred - obs) ** 2).mean()
        if best is None or l < best[0]:
            best = (l, sig, pred)
    l, sig, pred = best
    from scipy.stats import pearsonr, spearmanr
    amt = np.array([r[6] for r in recs])
    print(f"sigma = {sig:.2f}  RMSE {l ** .5:.2f} nights  mean obs {obs.mean():.2f}  mean pred {pred.mean():.2f}"
          f"  r = {pearsonr(pred, obs)[0]:.3f}  spearman {spearmanr(pred, obs)[0]:.3f}")
    ok = np.isfinite(amt)
    print(f"comparison: Apr-May (Oct-Nov S) mean Tmin vs observed frost nights: spearman {spearmanr(-amt[ok], obs[ok])[0]:.3f}")
    # per-station skill (within-station interannual ranking) for both proxies
    rows = []
    for tag in sorted(set(r[1] for r in recs)):
        sel = np.array([r[1] == tag for r in recs])
        if sel.sum() < 20 or obs[sel].std() == 0:
            continue
        s1 = spearmanr(pred[sel], obs[sel])[0]
        s2 = spearmanr(-amt[sel], obs[sel])[0] if np.isfinite(amt[sel]).all() else np.nan
        rows.append((tag, sel.sum(), obs[sel].mean(), pred[sel].mean(), s1, s2))
        print(f"  {tag:16s} n={sel.sum():3d} obs {obs[sel].mean():5.2f} pred {pred[sel].mean():5.2f}"
              f"  rho(frost-nights proxy) {s1:5.2f}  rho(mean Tmin) {s2:5.2f}")
    print("median within-station rho: proxy %.2f, mean Tmin %.2f" % (np.nanmedian([r[4] for r in rows]), np.nanmedian([r[5] for r in rows])))
    f = ROOT / "work/vintage/frost_calibration.json"
    c = json.load(open(f)) if f.exists() else {}
    c.update({"sigma": round(float(sig), 2), "rmse": round(float(l ** .5), 2), "n": len(recs),
              "r": round(float(pearsonr(pred, obs)[0]), 3)})
    json.dump(c, open(f, "w"))


if __name__ == "__main__" and "--heat" not in sys.argv:
    main()


def heat():
    """Heat proxy: expected days with Tmax >= 35 C over the growing season (Apr-Oct N, Oct-Apr S),
    sum over months of days_m * Phi((Tmax_m - 35)/sigma). Fit sigma on station-seasons, compare with the
    warmest-month mean Tmax."""
    from scipy.special import ndtr
    from scipy.stats import pearsonr, spearmanr
    S = json.load(open(ROOT / "work/vintage/ghcnd_monthly.json"))
    D = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    recs = []
    for sid, st in S.items():
        h = "s" if st["lat"] < 0 else "n"
        mon = st["months"]
        for y in range(1951, 2026):
            ms = [(y, m) for m in range(4, 11)] if h == "n" else [(y - 1, m) for m in (10, 11, 12)] + [(y, m) for m in (1, 2, 3, 4)]
            rr = [mon.get(f"{a}-{b:02d}") for a, b in ms]
            if any(r is None or r[1] is None or not r[8] or r[8] < 25 for r in rr):
                continue
            tx = np.array([r[1] for r in rr])
            d = np.array([D[b - 1] for a, b in ms])
            obs = sum(r[7] * D[b - 1] / r[8] for r, (a, b) in zip(rr, ms))
            recs.append((st["tag"], tx, d, obs))
    obs = np.array([r[3] for r in recs])
    best = None
    for sig in np.arange(2.5, 7.01, 0.05):
        pred = np.array([(r[2] * ndtr((r[1] - 35) / sig)).sum() for r in recs])
        l = ((pred - obs) ** 2).mean()
        if best is None or l < best[0]:
            best = (l, sig, pred)
    l, sig, pred = best
    wm = np.array([r[1].max() for r in recs])
    print(f"\nHEAT: {len(recs)} station-seasons; sigma {sig:.2f}; RMSE {l ** .5:.2f} days; mean obs {obs.mean():.2f} pred {pred.mean():.2f};"
          f" r {pearsonr(pred, obs)[0]:.3f}")
    rows = []
    for tag in sorted(set(r[0] for r in recs)):
        sel = np.array([r[0] == tag for r in recs])
        if sel.sum() < 20 or obs[sel].std() == 0:
            continue
        rows.append((spearmanr(pred[sel], obs[sel])[0], spearmanr(wm[sel], obs[sel])[0]))
        print(f"  {tag:16s} n={sel.sum():3d} obs {obs[sel].mean():5.1f} pred {pred[sel].mean():5.1f}  rho(proxy) {rows[-1][0]:5.2f}  rho(warmest-month Tmax) {rows[-1][1]:5.2f}")
    print("median within-station rho: proxy %.2f, warmest-month Tmax %.2f" % tuple(np.nanmedian(np.array(rows), axis=0)))
    c = json.load(open(ROOT / "work/vintage/frost_calibration.json"))
    c["heat"] = {"sigma": round(float(sig), 2), "rmse": round(float(l ** .5), 2), "n": len(recs), "r": round(float(pearsonr(pred, obs)[0]), 3)}
    json.dump(c, open(ROOT / "work/vintage/frost_calibration.json", "w"))


if __name__ == "__main__" and "--heat" in sys.argv:
    heat()
