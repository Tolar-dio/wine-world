#!/usr/bin/env python3
"""Validation of the vintage record (prints a report; results copied into work/vintage-log.md).
Run: python3 -I scripts/vintage_validate.py [--geo DIR]   (DIR: geo files whose clim to compare, default site/data/geo)"""
import json
import sys
from pathlib import Path

import numpy as np
from scipy.stats import pearsonr, spearmanr

ROOT = Path("/home/claude/winesite")
W = ROOT / "work/vintage"
V = ROOT / "site/data/vintage"


def load_all():
    d = {}
    for p in V.glob("*.json"):
        if p.name.startswith("_"):
            continue
        d.update(json.load(open(p, encoding="utf-8")))
    return d


def arr(rec, k):
    return np.array([np.nan if x is None else x for x in rec[k]], dtype=float)


def yrs(rec):
    return np.arange(rec["y0"], rec["y0"] + len(rec["gst"]))


def get(rec, k, y):
    i = y - rec["y0"]
    return rec[k][i] if 0 <= i < len(rec[k]) else None


def main():
    D = load_all()
    ents = {e["id"]: e for e in json.load(open(W / "entities.json"))}
    print("entities with records:", len(D))
    # ---- A. consistency with v1 normals (TerraClimate 1991-2020 climatology file)
    clim = {}
    geo = Path(sys.argv[sys.argv.index("--geo") + 1]) if "--geo" in sys.argv else ROOT / "site/data/geo"
    for p in sorted(geo.glob("*.geojson")):
        if p.name.startswith("_") or p.name.endswith("_fine.geojson"):
            continue
        for f in json.load(open(p, encoding="utf-8"))["features"]:
            c = f["properties"].get("clim")
            if c:
                clim[f["properties"]["id"]] = c
    dg, dd, dp = [], [], []
    for k, c in clim.items():
        if k in D and D[k]["n9120"]["gst"] is not None:
            dg.append(D[k]["n9120"]["gst"] - c["gst"])
            dd.append(D[k]["n9120"]["gdd"] / max(c["gdd"], 1) - 1)
            dp.append(D[k]["n9120"]["gsp"] / max(c["gsp"], 1) - 1)
    q = lambda a: " / ".join(f"{x:+.2f}" for x in np.percentile(a, [5, 50, 95]))
    print(f"\nA. n9120 vs v1 clim (n={len(dg)}): GST diff C p5/p50/p95 {q(dg)};  GDD rel {q(dd)};  GSP rel {q(dp)}")

    # ---- B. drift checks
    print("\nB. drift (GST n6190 -> n9120 -> 2011-2025 mean; OLS trend 1961-2025 C/decade)")
    for k in ["fr-champagne", "region-fr-champagne", "region-fr-burgundy", "fr-bourgogne", "fr-chablis", "fr-gevrey-chambertin",
              "fr-hermitage", "fr-bordeaux", "fr-pauillac", "de-mosel", "de-rheingau", "at-wachau", "it-barolo", "es-rioja",
              "us-napa-valley", "us-willamette-valley", "au-barossa-valley", "au-coonawarra", "nz-marlborough", "nz-central-otago",
              "za-stellenbosch", "ar-mendoza", "cl-valle-del-maipo", "gb-english-wine"]:
        if k not in D:
            print("  missing", k)
            continue
        r = D[k]
        g = arr(r, "gst"); y = yrs(r)
        sel = (y >= 1961) & np.isfinite(g)
        tr = np.polyfit(y[sel], g[sel], 1)[0] * 10
        rec = np.nanmean(g[(y >= 2011) & (y <= 2025)])
        print(f"  {k:28s} {r['n6190']['gst']:5.1f} -> {r['n9120']['gst']:5.1f} -> {rec:5.1f}  (+{rec - r['n6190']['gst']:.1f})"
              f"  trend {tr:+.2f}/dec  GDD {r['n6190']['gdd']} -> {r['n9120']['gdd']}")
    # global summary
    deltas = np.array([D[k]["n9120"]["gst"] - D[k]["n6190"]["gst"] for k in D
                       if D[k]["n6190"]["gst"] is not None and D[k]["n9120"]["gst"] is not None])
    print(f"  all ids: n9120 - n6190 GST p5/p50/p95 {q(deltas)}; share warmer {np.mean(deltas > 0):.2f}")

    # ---- C. 2003 in France
    fr = {k: v for k, v in D.items() if ents.get(k, {}).get("country") == "fr" and ents[k]["h"] == "n"}
    rk, an = [], []
    for k, r in fr.items():
        g = arr(r, "gst"); y = yrs(r)
        rk.append(int((g > g[y == 2003][0]).sum()) + 1)
        an.append(g[y == 2003][0] - r["n9120"]["gst"])
    rk = np.array(rk)
    print(f"\nC. 2003 in France (n={len(rk)}): GST anomaly vs 1991-2020 median {np.median(an):+.1f} C; rank among 1950-2025:"
          f" 1st in {np.mean(rk == 1):.0%}, top 3 in {np.mean(rk <= 3):.0%}, top 5 in {np.mean(rk <= 5):.0%}")
    rh, hoth = [], {}
    for k, r in fr.items():
        hd = arr(r, "hd"); y = yrs(r)
        rh.append(int((hd > hd[y == 2003][0]).sum()) + 1)
        hoth[int(y[np.nanargmax(hd)])] = hoth.get(int(y[np.nanargmax(hd)]), 0) + 1
    rh = np.array(rh)
    print(f"  heat days (hd) 2003 rank: 1st in {np.mean(rh == 1):.0%}, top 3 in {np.mean(rh <= 3):.0%};"
          f" year with most heat days per id: {dict(sorted(hoth.items(), key=lambda t: -t[1])[:4])}")
    hot = {}
    for k, r in fr.items():
        g = arr(r, "gst"); y = yrs(r)
        hot[int(y[np.nanargmax(g)])] = hot.get(int(y[np.nanargmax(g)]), 0) + 1
    print("  hottest GST year per French id:", dict(sorted(hot.items(), key=lambda t: -t[1])[:6]))
    for k in ["fr-hermitage", "region-fr-burgundy", "fr-champagne", "fr-bordeaux"]:
        r = D[k]
        print(f"  {k}: 2003 gst {get(r, 'gst', 2003)} (n9120 {r['n9120']['gst']}), gdd {get(r, 'gdd', 2003)}, hd {get(r, 'hd', 2003)}"
              f" (median {np.nanmedian(arr(r, 'hd'))}), hi {get(r, 'hi', 2003)}")

    # ---- D. Bordeaux 2013
    print("\nD. Bordeaux 2013 and neighbours")
    for k in ["fr-bordeaux", "fr-pauillac", "fr-saint-emilion", "region-fr-bordeaux"]:
        if k not in D:
            continue
        r = D[k]
        g = arr(r, "gst"); h = arr(r, "hr"); y = yrs(r)
        sel = (y >= 1991) & (y <= 2020)
        print(f"  {k}: 2013 gst {get(r, 'gst', 2013)} vs n9120 {r['n9120']['gst']} (rank coolest since 1991: "
              f"{int((g[y >= 1991] < g[y == 2013][0]).sum()) + 1}/{(y >= 1991).sum()});"
              f" hr 2013 {get(r, 'hr', 2013)} mm vs 1991-2020 mean {np.nanmean(h[sel]):.0f} (rank wettest since 1950:"
              f" {int((h > h[y == 2013][0]).sum()) + 1}/{len(h)}); gsp {get(r, 'gsp', 2013)}")
        print(f"    for contrast 2009/2010/2015/2016/2005 gst: {[get(r, 'gst', yy) for yy in (2009, 2010, 2015, 2016, 2005)]}"
              f" hr: {[get(r, 'hr', yy) for yy in (2009, 2010, 2015, 2016, 2005)]}; 1992/1993/1999 hr {[get(r, 'hr', yy) for yy in (1992, 1993, 1999)]}")

    # ---- E. Southern Hemisphere labelling: Barossa 2007 vs 2008
    print("\nE. Barossa 2007 vs 2008 (season Oct-Apr labelled by April year)")
    for k in ["au-barossa-valley", "au-eden-valley", "au-mclaren-vale", "au-clare-valley", "au-coonawarra", "au-yarra-valley"]:
        if k not in D:
            continue
        r = D[k]
        hd = arr(r, "hd")
        print(f"  {k}: y0 {r['y0']}; 2007 gst {get(r, 'gst', 2007)} gsp {get(r, 'gsp', 2007)} fr {get(r, 'fr', 2007)} hd {get(r, 'hd', 2007)} |"
              f" 2008 gst {get(r, 'gst', 2008)} gsp {get(r, 'gsp', 2008)} fr {get(r, 'fr', 2008)} hd {get(r, 'hd', 2008)} hr {get(r, 'hr', 2008)}"
              f" | n9120 gsp {r['n9120']['gsp']}, median hd {np.nanmedian(hd):.0f}")
    # direct check of the labelling from cell values: Barossa label cell, Mar 2008 Tmax and Oct-2007..Apr-2008 mean
    e = ents["au-barossa-valley"]
    cells = np.load(W / "cells.npy")
    cid = int((90 - e["lat"]) * 24) * 8640 + int((e["lon"] + 180) * 24)
    j = np.searchsorted(cells, cid)
    if cells[j] == cid:
        def mv(var, y, m):
            mt = json.load(open(W / f"cells/{var}_{y}.json"))
            return np.load(W / f"cells/{var}_{y}.npy", mmap_mode="r")[m - 1, j] * mt["scale"] + mt["offset"]
        tm = [(mv("tmax", y, m) + mv("tmin", y, m)) / 2 for y, m in [(2007, 10), (2007, 11), (2007, 12), (2008, 1), (2008, 2), (2008, 3), (2008, 4)]]
        print(f"  label cell Oct 2007-Apr 2008 mean Tmean {np.mean(tm):.1f} (record 2008 gst {get(D['au-barossa-valley'], 'gst', 2008)});"
              f" Mar 2008 mean Tmax {mv('tmax', 2008, 3):.1f} C, Mar 2007 {mv('tmax', 2007, 3):.1f} C")

    # ---- F. frost proxy: famous spring frosts
    print("\nF. spring frost proxy (fr = expected frost nights after normal budburst); rank 1 = most frost since 1950")
    cases = [("region-fr-burgundy", [2021, 2016, 1991, 2019, 2022]), ("fr-chablis", [2021, 2016, 2017, 1957, 1961]),
             ("fr-bordeaux", [1991, 2017, 2021, 1977]), ("fr-champagne", [2021, 2017, 1957, 1991]),
             ("de-mosel", [2011, 2017, 2021]), ("at-wachau", [2016, 2020]), ("it-barolo", [2017, 2021]),
             ("au-coonawarra", [2007, 2006]), ("au-barossa-valley", [2007]), ("nz-central-otago", [2007, 2020]),
             ("us-willamette-valley", [2008, 2010])]
    for k, ys in cases:
        if k not in D:
            continue
        r = D[k]
        f = arr(r, "fr"); y = yrs(r)
        sel = (y >= 1991) & (y <= 2020)
        out = []
        for yy in ys:
            v = f[y == yy][0]
            out.append(f"{yy}: {int(v)} (rank {int((f > v).sum()) + 1})")
        print(f"  {k} (1991-2020 mean {np.nanmean(f[sel]):.1f}): " + ", ".join(out))
    # ---- G. other notable years
    print("\nG. other checks")
    for k, y, what in [("es-rioja", 2017, "frost 28 Apr"), ("fr-champagne", 2021, "cold wet"), ("de-mosel", 2018, "hot dry"),
                       ("region-fr-burgundy", 2022, "hot dry"), ("region-fr-burgundy", 2019, "heat waves"), ("us-napa-valley", 2011, "cool"),
                       ("pt-douro", 2022, "drought heat")]:
        if k not in D:
            continue
        r = D[k]
        g = arr(r, "gst"); yy = yrs(r)
        print(f"  {k} {y} ({what}): gst {get(r, 'gst', y)} (n9120 {r['n9120']['gst']}, rank warmest {int((g > g[yy == y][0]).sum()) + 1}/{len(g)}),"
              f" gsp {get(r, 'gsp', y)} (n9120 {r['n9120']['gsp']}), hd {get(r, 'hd', y)}, fr {get(r, 'fr', y)}")
    # ---- H. TerraClimate cell vs GHCN-Daily station, yearly GST and harvest rain
    print("\nH. TerraClimate (station's cell) vs GHCN-Daily station, harvest years 1961-2025")
    S = json.load(open(W / "ghcnd_monthly.json"))
    cells = np.load(W / "cells.npy")
    tc = {}
    for v in ("tmax", "tmin", "ppt"):
        for y in range(1960, 2026):
            mt = json.load(open(W / f"cells/{v}_{y}.json"))
            tc[(v, y)] = (np.load(W / f"cells/{v}_{y}.npy", mmap_mode="r"), mt)
    res = []
    for sid, st in S.items():
        cid = int((90 - st["lat"]) * 24) * 8640 + int((st["lon"] + 180) * 24)
        j = np.searchsorted(cells, cid)
        if j >= len(cells) or cells[j] != cid:
            continue
        h = "s" if st["lat"] < 0 else "n"
        a, b, pr, pt = [], [], [], []
        for y in range(1961, 2026):
            ms = [(y, m) for m in range(4, 11)] if h == "n" else [(y - 1, m) for m in (10, 11, 12)] + [(y, m) for m in (1, 2, 3, 4)]
            rr = [st["months"].get(f"{yy}-{m:02d}") for yy, m in ms]
            if any(r is None or r[0] is None or r[1] is None for r in rr):
                continue
            def val(v, yy, m):
                arr_, mt = tc[(v, yy)]
                return float(arr_[m - 1, j]) * mt["scale"] + mt["offset"]
            g_tc = np.mean([(val("tmax", yy, m) + val("tmin", yy, m)) / 2 for yy, m in ms])
            g_st = np.mean([(r[0] + r[1]) / 2 for r in rr])
            a.append((y, g_tc)); b.append(g_st)
            hm = ms[5:7]
            rh = [st["months"].get(f"{yy}-{m:02d}") for yy, m in hm]
            if all(r and r[2] is not None for r in rh):
                pr.append(sum(val("ppt", yy, m) for yy, m in hm)); pt.append(sum(r[2] for r in rh))
        if len(a) < 30:
            continue
        yv = np.array([t[0] for t in a]); ga = np.array([t[1] for t in a]); gb = np.array(b)
        r = pearsonr(ga - ga.mean(), gb - gb.mean())[0]
        tr_a = np.polyfit(yv, ga, 1)[0] * 10; tr_b = np.polyfit(yv, gb, 1)[0] * 10
        rp = pearsonr(pr, pt)[0] if len(pr) > 20 else np.nan
        res.append((st["tag"], len(a), r, tr_a, tr_b, ga.mean() - gb.mean(), rp))
    for t in res:
        print(f"  {t[0]:16s} n={t[1]:2d} r(GST)={t[2]:.2f} trend TC {t[3]:+.2f} vs station {t[4]:+.2f} C/dec, bias {t[5]:+.1f} C, r(harvest rain)={t[6]:.2f}")
    R = np.array([t[2:] for t in res], dtype=float)
    print(f"  median r(GST) {np.median(R[:, 0]):.2f}; median trend TC {np.median(R[:, 1]):+.2f} vs station {np.median(R[:, 2]):+.2f} C/dec;"
          f" median r(harvest rain) {np.nanmedian(R[:, 4]):.2f}")
    r = D["fr-bordeaux"]; g = arr(r, "gst"); y = yrs(r)
    rec = g[(y >= 2011)]
    print(f"\n  fr-bordeaux 2013 rank coolest within 2011-2025: {int((rec < g[y == 2013][0]).sum()) + 1}/{len(rec)}; n9120 gsp {r['n9120']['gsp']}")
    # ---- I. drift of the TerraClimate-minus-station difference (inhomogeneity check), by hemisphere and decade
    print("\nI. TerraClimate cell minus station, season Tmax / Tmin, relative to 1991-2020 (positive = TerraClimate warmer)")
    tcv = {(v, y): np.load(W / f"cells/{v}_{y}.npy", mmap_mode="r") for v in ("tmax", "tmin") for y in range(1950, 2026)}
    dec = {}
    for sid, st in S.items():
        cid = int((90 - st["lat"]) * 24) * 8640 + int((st["lon"] + 180) * 24)
        j = np.searchsorted(cells, cid)
        if j >= len(cells) or cells[j] != cid:
            continue
        h = "s" if st["lat"] < 0 else "n"
        rows = []
        for y in range(1951, 2026):
            ms = [(y, m) for m in range(4, 11)] if h == "n" else [(y - 1, m) for m in (10, 11, 12)] + [(y, m) for m in (1, 2, 3, 4)]
            rr = [st["months"].get(f"{a}-{b:02d}") for a, b in ms]
            if any(r is None or r[0] is None or r[1] is None for r in rr):
                continue
            dx = np.mean([float(tcv[("tmax", a)][b - 1, j]) * 0.01 - 99 for a, b in ms]) - np.mean([r[1] for r in rr])
            dn = np.mean([float(tcv[("tmin", a)][b - 1, j]) * 0.01 - 99 for a, b in ms]) - np.mean([r[0] for r in rr])
            rows.append((y, dx, dn))
        if len(rows) < 40:
            continue
        A = np.array(rows)
        base = A[(A[:, 0] >= 1991) & (A[:, 0] <= 2020)].mean(axis=0)
        for lo, hi in ((1951, 1960), (1961, 1978), (1979, 1990), (2011, 2025)):
            sel = (A[:, 0] >= lo) & (A[:, 0] <= hi)
            if sel.sum() >= 5:
                dec.setdefault((h, lo, hi), []).append(A[sel].mean(axis=0) - base)
    for k in sorted(dec):
        a = np.array(dec[k])
        print(f"  {k[0]} {k[1]}-{k[2]}: {len(a)} stations, median offset Tmax {np.median(a[:, 1]):+.2f} C, Tmin {np.median(a[:, 2]):+.2f} C")
    # nulls
    nn = sum(1 for r in D.values() for k in ("gst", "gdd", "hi", "gsp", "hr", "fr", "hd") for x in r[k] if x is None)
    print("\nnull values in arrays:", nn)


if __name__ == "__main__":
    main()
