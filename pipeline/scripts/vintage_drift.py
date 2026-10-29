#!/usr/bin/env python3
"""Vitis Mundi v2, vintage step 4: climate drift and "time-travel twins" -> site/data/vintage/_drift.json

Shape (agreed with the front end; every field optional):
 {"<app or region id>": {"gst6190", "gst9120", "gstRecent", "recent": [2011, 2025], "gdd6190", "gdd9120", "gddRecent",
   "gsp6190", "gsp9120", "twin": {"id", "gst6190", "note"}, "twinRev": {"id", "gstRecent", "note"}}}
Normals = means of the yearly values (work/vintage/series.npz) over harvest years 1961-1990, 1991-2020 and the
recent span = the last 15 complete harvest years (2011-2025).
twin    = the candidate whose 1961-1990 profile is closest to THIS place's recent profile
          ("today X feels like Y did in 1961-1990").
twinRev = the candidate whose recent profile is closest to THIS place's 1961-1990 profile
          ("X's old climate now lives in Y").
Profile distance: d^2 = (dGST/0.5 C)^2 + (dGDD/100 C days)^2 + (dln(GSP)/0.3)^2.
Candidates: appellations (main polygons and point-only), written profile (prof 1), area <= 20,000 km2,
at least one viable 12-24 C cell (not mode "land"). Excluded for a given place: itself, every ancestor and
descendant in the _index parent chain (and, for regions, member appellations from content app_ids and
their descendants), and any candidate sharing more than half of the smaller cell set with it (same place
under another name). No twin is written when the best d > 1.5. Among candidates within d_best + 0.3 (practically equivalent
matches: 0.3 is ~0.15 C or 30 GDD or 9% rain) the best-known one wins: most sites linked to it in _sites.geojson
(directly, not via children), then the closest.
Run: python3 -I scripts/vintage_drift.py
"""
import json
import math
from collections import defaultdict
from pathlib import Path

import numpy as np

ROOT = Path("/home/claude/winesite")
W = ROOT / "work/vintage"
RECENT = (2011, 2025)
SC = {"gst": 0.5, "gdd": 100.0, "lgsp": 0.3}
DMAX = 1.5
TIE = 0.3


def main():
    ents = json.load(open(W / "entities.json"))
    z = np.load(W / "series.npz")
    years = z["years"]
    idx = {e["id"]: e for e in json.load(open(ROOT / "site/data/geo/_index.json", encoding="utf-8"))}
    regions = {f["properties"]["id"]: f["properties"] for f in
               json.load(open(ROOT / "site/data/geo/_regions.geojson", encoding="utf-8"))["features"]}
    members = {}
    for p in (ROOT / "site/data/content").glob("*.json"):
        try:
            d = json.load(open(p, encoding="utf-8"))
        except Exception:
            continue
        if isinstance(d, dict):
            for rg in d.get("regions") or []:
                if isinstance(rg, dict) and rg.get("id"):
                    members[rg["id"]] = set(rg.get("app_ids") or [])
    # hierarchy
    parent = {k: e.get("parent") for k, e in idx.items()}
    kids = defaultdict(set)
    for k, p in parent.items():
        if p:
            kids[p].add(k)

    def ancestors(k):
        out, seen = set(), set()
        while parent.get(k) and k not in seen:
            seen.add(k)
            k = parent[k]
            out.add(k)
        return out

    def descendants(k):
        out, st = set(), [k]
        while st:
            for c in kids.get(st.pop(), ()):
                if c not in out:
                    out.add(c)
                    st.append(c)
        return out

    sites = defaultdict(int)
    for f in json.load(open(ROOT / "site/data/geo/_sites.geojson", encoding="utf-8"))["features"]:
        a = f["properties"].get("app")
        if a:
            sites[a] += 1
    # cell sets
    zw = np.load(W / "weights.npz")
    cellsets = defaultdict(set)
    for e_, c_ in zip(zw["ent"], zw["cell"]):
        cellsets[int(e_)].add(int(c_))

    def mean(a, lo, hi):
        sel = (years >= lo) & (years <= hi)
        v = a[:, sel]
        n = np.isfinite(v).sum(axis=1)
        with np.errstate(invalid="ignore"):
            m = np.nanmean(v, axis=1)
        m[n < 0.9 * sel.sum()] = np.nan
        return m

    P = {}
    for tag, (lo, hi) in {"6190": (1961, 1990), "9120": (1991, 2020), "rec": RECENT}.items():
        P[tag] = {k: mean(z[k], lo, hi) for k in ("gst", "gdd", "gsp")}
    assert np.isfinite(z["gst"][:, years == RECENT[1]]).all(), "recent span not complete"

    def feat(tag):
        return np.stack([P[tag]["gst"] / SC["gst"], P[tag]["gdd"] / SC["gdd"],
                         np.log(np.maximum(P[tag]["gsp"], 1)) / SC["lgsp"]], axis=1)

    F6190, Frec = feat("6190"), feat("rec")
    n = len(ents)
    cand = np.array([e["kind"] != "region" and idx.get(e["id"], {}).get("prof") == 1
                     and idx.get(e["id"], {}).get("area", 0) <= 20000 and e.get("mode") != "land"
                     and np.isfinite(F6190[i]).all() and np.isfinite(Frec[i]).all()
                     for i, e in enumerate(ents)])
    ci = np.where(cand)[0]
    print(f"{n} places, {len(ci)} twin candidates")

    def name(k):
        if k in idx:
            return idx[k]["name"]
        return regions.get(k, {}).get("name", k)

    def excluded(i):
        k = ents[i]["id"]
        ex = {k} | ancestors(k) | descendants(k)
        if k in members:
            for a in members[k]:
                ex |= {a} | descendants(a)
        return ex

    def best(i, Fsrc, Fdst):
        if not np.isfinite(Fsrc[i]).all():
            return None, None
        d = np.sqrt(((Fdst[ci] - Fsrc[i]) ** 2).sum(axis=1))
        ex = excluded(i)
        A = cellsets[i]
        ok = []
        for j in np.argsort(d):
            c = int(ci[j])
            if d[j] > DMAX or (ok and d[j] > ok[0][1] + TIE):
                break
            if ents[c]["id"] in ex:
                continue
            B = cellsets[c]
            if A and B and len(A & B) > 0.5 * min(len(A), len(B)):
                continue
            ok.append((c, float(d[j])))
        if not ok:
            return None, None
        return max(ok, key=lambda t: (sites[ents[t[0]]["id"]], -t[1]))

    r1 = lambda x: None if not np.isfinite(x) else round(float(x), 1)
    ri = lambda x: None if not np.isfinite(x) else int(round(float(x)))
    out, dists, ntw, ntr = {}, [], 0, 0
    for i, e in enumerate(ents):
        if not np.isfinite(P["6190"]["gst"][i]) and not np.isfinite(P["rec"]["gst"][i]):
            continue
        rec = {"gst6190": r1(P["6190"]["gst"][i]), "gst9120": r1(P["9120"]["gst"][i]), "gstRecent": r1(P["rec"]["gst"][i]),
               "recent": list(RECENT),
               "gdd6190": ri(P["6190"]["gdd"][i]), "gdd9120": ri(P["9120"]["gdd"][i]), "gddRecent": ri(P["rec"]["gdd"][i]),
               "gsp6190": ri(P["6190"]["gsp"][i]), "gsp9120": ri(P["9120"]["gsp"][i])}
        rec = {k: v for k, v in rec.items() if v is not None}
        nm = name(e["id"])
        c, d = best(i, Frec, F6190)
        if c is not None:
            t = ents[c]["id"]
            rec["twin"] = {"id": t, "gst6190": r1(P["6190"]["gst"][c]),
                           "note": f"{nm} in {RECENT[0]}-{RECENT[1]} ({r1(P['rec']['gst'][i])} °C, {ri(P['rec']['gdd'][i])} GDD, "
                                   f"{ri(P['rec']['gsp'][i])} mm) resembles {name(t)} in 1961-1990 ({r1(P['6190']['gst'][c])} °C, "
                                   f"{ri(P['6190']['gdd'][c])} GDD, {ri(P['6190']['gsp'][c])} mm)."}
            dists.append(d)
            ntw += 1
        c, d = best(i, F6190, Frec)
        if c is not None:
            t = ents[c]["id"]
            rec["twinRev"] = {"id": t, "gstRecent": r1(P["rec"]["gst"][c]),
                              "note": f"{nm} in 1961-1990 ({r1(P['6190']['gst'][i])} °C, {ri(P['6190']['gdd'][i])} GDD, "
                                      f"{ri(P['6190']['gsp'][i])} mm) resembles {name(t)} in {RECENT[0]}-{RECENT[1]} "
                                      f"({r1(P['rec']['gst'][c])} °C, {ri(P['rec']['gdd'][c])} GDD, {ri(P['rec']['gsp'][c])} mm)."}
            ntr += 1
        out[e["id"]] = rec
    body = ",\n".join(json.dumps(k, ensure_ascii=False) + ":" + json.dumps(v, ensure_ascii=False, separators=(",", ":"))
                      for k, v in sorted(out.items()))
    tmp = ROOT / "site/data/vintage/._drift.json.tmp"
    tmp.write_text("{\n" + body + "\n}\n", encoding="utf-8")
    tmp.replace(ROOT / "site/data/vintage/_drift.json")
    print(f"wrote {len(out)} ids; twin for {ntw}, twinRev for {ntr}; twin distance p50 {np.median(dists):.2f} p90 {np.percentile(dists, 90):.2f}")


if __name__ == "__main__":
    main()
