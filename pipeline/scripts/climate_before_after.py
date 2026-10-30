#!/usr/bin/env python3
"""Before/after table for the elevation (lapse-rate) correction.
Static clim: old = work/vintage/v1_out/_clim_v1.json (v1 values snapshotted 2026-10-30), new = --new DIR
(default site/data/geo, i.e. after the forced integration run).
Vintage: old = work/vintage/v1_out/*.json, new = site/data/vintage/*.json (n9120 GST, recent drift).
Run: python3 -I scripts/climate_before_after.py [--old DIR] [--new DIR]"""
import json
import sys
from pathlib import Path

ROOT = Path("/home/claude/winesite")
IDS = ["it-alto-adige-vetzaner", "it-alto-adige-penon", "it-alto-adige", "cn-shangri-la-deqin", "ch-valais",
       "it-valtellina-superiore", "fr-chambertin", "fr-gevrey-chambertin", "de-bernkastel-doctor", "de-wehlen-sonnenuhr",
       "de-mosel", "fr-cote-rotie", "fr-cote-rotie-la-landonne", "fr-hermitage", "fr-champagne", "us-napa-valley",
       "us-oakville", "us-howell-mountain", "au-barossa-valley", "ar-lujan-de-cuyo", "it-barolo", "za-stellenbosch"]


def clim_of(d):
    out = {}
    for p in sorted(Path(d).glob("*.geojson")):
        if p.name.startswith("_"):
            continue
        for f in json.load(open(p, encoding="utf-8"))["features"]:
            c = f["properties"].get("clim")
            if c:
                out[f["properties"]["id"]] = c
    return out


def vint(d):
    out = {}
    for p in Path(d).glob("*.json"):
        if not p.name.startswith("_"):
            out.update(json.load(open(p, encoding="utf-8")))
    return out


def main():
    a = sys.argv
    new_dir = a[a.index("--new") + 1] if "--new" in a else ROOT / "site/data/geo"
    co, cn = json.load(open(ROOT / "work/vintage/v1_out/_clim_v1.json", encoding="utf-8")), clim_of(new_dir)
    vo, vn = vint(ROOT / "work/vintage/v1_out"), vint(ROOT / "site/data/vintage")
    dr = json.load(open(ROOT / "site/data/vintage/_drift.json"))
    names = {e["id"]: e["name"] for e in json.load(open(ROOT / "site/data/geo/_index.json", encoding="utf-8"))}
    ents = {e["id"]: e for e in json.load(open(ROOT / "work/vintage/entities.json"))}
    print("| place | elevation used (shift) | clim GST old -> new | clim GDD old -> new | Huglin old -> new | vintage n9120 GST old -> new | GST 1961-90 -> 2011-25 (new) |")
    print("|---|---|---|---|---|---|---|")
    for i in IDS:
        o, n = co.get(i, {}), cn.get(i, {})
        e = ents.get(i, {})
        el = f"{n['elev']} m ({'+' if n.get('dz', 0) >= 0 else ''}{n.get('dz')} m)" if n else (f"{e.get('zt')} m ({e.get('dz')} m)" if e else "")
        f = lambda k: f"{o.get(k, '-')} -> {n.get(k, '-')}" if (o or n) else "no polygon"
        v0 = vo.get(i, {}).get("n9120", {}).get("gst", "-")
        v1 = vn.get(i, {}).get("n9120", {}).get("gst", "-")
        d = dr.get(i, {})
        if i not in vn:
            v0 = v1 = "fine unit (inherits parent)"
        vv = v0 if (v0 == v1 and isinstance(v0, str)) else f"{v0} -> {v1}"
        dd = f"{d.get('gst6190')} -> {d.get('gstRecent')}" if d else "-"
        print(f"| {names.get(i, i)} (`{i}`) | {el} | {f('gst')} | {f('gdd')} | {f('hi')} | {vv} | {dd} |")


if __name__ == "__main__":
    main()
