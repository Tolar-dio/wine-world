#!/usr/bin/env python3
"""Vitis Mundi v2, vintage step 1: entities and climate-cell weights.

Builds, for every appellation main polygon (site/data/geo/{iso2}.geojson), every point-only
appellation (_extra_points.geojson) and every region outline (_regions.geojson), the list of
TerraClimate 1/24 deg cells and weights used to average its yearly weather. Same rules as v1
(scripts/climate_enrich.py):
  * coverage-weighted mean (exactextract 0.3 coverage fractions) over the cells whose 1991-2020
    growing-season temperature is 12-24 C (v1 viability grids work/climate_cache/wt_{n,s}.npy,
    built from the TerraClimate 1991-2020 climatology, so the mask is fixed across years);
  * plain coverage over land cells when the polygon has no viable cell (vf = 0);
  * a single cell at the label point (nearest valid cell within 3 rings) when the polygon is
    smaller than one climate cell, has no valid cell, or is a point-only appellation.
Hemisphere (season) from the label point latitude; Huglin K from it too (applied later).
Output: work/vintage/entities.json, work/vintage/weights.npz (sparse COO: ent, cell, w),
        work/vintage/cells.npy (sorted unique global cell ids = row*8640+col, north-up grid).
Run: python3 -I scripts/vintage_entities.py
"""
import json
import math
import sys
import time
from pathlib import Path

import numpy as np

ROOT = Path("/home/claude/winesite")
GEO = ROOT / "site/data/geo"
CACHE = ROOT / "work/climate_cache"
OUT = ROOT / "work/vintage"
NY, NX = 4320, 8640
RES = 1 / 24


def label_point(f):
    lp = f["properties"].get("lp")
    if isinstance(lp, (list, tuple)) and len(lp) == 2:
        return float(lp[0]), float(lp[1])
    if f["geometry"]["type"] == "Point":
        c = f["geometry"]["coordinates"]
        return float(c[0]), float(c[1])
    from shapely.geometry import shape
    p = shape(f["geometry"]).representative_point()
    return p.x, p.y


def approx_area_km2(f):
    a = f["properties"].get("area")
    if isinstance(a, (int, float)):
        return float(a)
    from shapely.geometry import shape
    g = shape(f["geometry"])
    return g.area * (111.32 ** 2) * math.cos(math.radians(g.centroid.y))


def nearest_valid_cell(valid, lon, lat, max_r=3):
    """Global cell id of the cell containing (lon, lat), or the nearest valid one within max_r rings
    (same search as v1 sample())."""
    col = min(NX - 1, max(0, int((lon + 180) / RES)))
    row = min(NY - 1, max(0, int((90 - lat) / RES)))
    for r in range(0, max_r + 1):
        r0, r1 = max(0, row - r), min(NY, row + r + 1)
        c0, c1 = max(0, col - r), min(NX, col + r + 1)
        win = np.asarray(valid[r0:r1, c0:c1])
        if win.any():
            if r == 0:
                return row * NX + col
            yy, xx = np.mgrid[r0:r1, c0:c1]
            dist = np.where(win, (yy - row) ** 2 + (xx - col) ** 2, 10 ** 9)
            k = np.unravel_index(np.argmin(dist), dist.shape)
            return int(yy[k]) * NX + int(xx[k])
    return None


def main():
    from exactextract import exact_extract
    from exactextract.feature import JSONFeatureSource
    from exactextract.raster import NumPyRasterSource
    t0 = time.time()
    idx = {e["id"]: e for e in json.load(open(GEO / "_index.json", encoding="utf-8"))}
    feats = []      # (entity dict, feature)
    for p in sorted(GEO.glob("*.geojson")):
        if p.name.startswith("_") or p.name.endswith("_fine.geojson"):
            continue
        for f in json.load(open(p, encoding="utf-8"))["features"]:
            if f.get("geometry"):
                feats.append(({"id": f["properties"]["id"], "kind": "app", "country": f["properties"]["country"]}, f))
    for f in json.load(open(GEO / "_extra_points.geojson", encoding="utf-8"))["features"]:
        feats.append(({"id": f["properties"]["id"], "kind": "pt", "country": f["properties"]["country"]}, f))
    for f in json.load(open(GEO / "_regions.geojson", encoding="utf-8"))["features"]:
        if f.get("geometry"):
            feats.append(({"id": f["properties"]["id"], "kind": "region", "country": f["properties"]["country"]}, f))
    ids = [e["id"] for e, _ in feats]
    assert len(ids) == len(set(ids)), "duplicate ids"

    gst = {h: np.load(CACHE / f"gst_{h}.npy", mmap_mode="r") for h in "ns"}
    wt = {h: np.load(CACHE / f"wt_{h}.npy", mmap_mode="r") for h in "ns"}
    valid = np.isfinite(np.load(CACHE / "gst_n.npy", mmap_mode="r"))   # land mask of the climatology
    # also require valid cells in the yearly files (land mask of the 2026 release); optional mask file
    ym = OUT / "yearly_landmask.npy"
    if ym.exists():
        valid &= np.load(ym)
        print("using yearly land mask too")
    E = (-180, -90, 180, 90)
    land_src = NumPyRasterSource(valid.astype(np.float32), *E, name="land")
    wt_src = {h: NumPyRasterSource(np.where(valid, wt[h], 0).astype(np.float32), *E, name="wt") for h in "ns"}

    ents, rows_e, rows_c, rows_w = [], [], [], []
    poly = []
    for i, (e, f) in enumerate(feats):
        lon, lat = label_point(f)
        e.update({"h": "n" if lat >= 0 else "s", "lat": round(lat, 4), "lon": round(lon, 4)})
        ents.append(e)
        if f["geometry"]["type"] in ("Polygon", "MultiPolygon"):
            area = approx_area_km2(f)
            cell_km2 = (RES * 111.32) ** 2 * max(0.05, math.cos(math.radians(lat)))
            if area >= cell_km2:
                poly.append(i)
                continue
        e["mode"] = "point"
    print(f"{len(ents)} entities, {len(poly)} polygons to extract")
    # zonal cell lists, per hemisphere
    for h in "ns":
        sel = [i for i in poly if ents[i]["h"] == h]
        fs = [{"type": "Feature", "properties": {"_i": i}, "geometry": feats[i][1]["geometry"]} for i in sel]
        for k in range(0, len(fs), 200):
            chunk = fs[k:k + 200]
            res = exact_extract([wt_src[h], land_src], JSONFeatureSource(chunk), ["cell_id", "coverage", "values"],
                                include_cols=["_i"])
            for r in res:
                p = r["properties"]
                i = p["_i"]
                cid = np.asarray(p.get("wt_cell_id", p.get("cell_id")), dtype=np.int64)
                cov = np.asarray(p.get("wt_coverage", p.get("coverage")), dtype=np.float64)
                wv = np.asarray(p["wt_values"], dtype=np.float64)
                lv = np.asarray(p["land_values"], dtype=np.float64)
                landcov = (cov * (lv > 0)).sum()
                wsum = (cov * wv).sum()
                e = ents[i]
                if wsum > 0:
                    w = cov * wv
                    e["mode"] = "viable"
                    e["vf"] = round(float(wsum / landcov), 3) if landcov > 0 else None
                elif landcov > 0:
                    w = cov * (lv > 0)
                    e["mode"] = "land"
                    e["vf"] = 0.0
                else:
                    e["mode"] = "point"
                    continue
                m = w > 0
                rows_e.append(np.full(m.sum(), i, dtype=np.int32))
                rows_c.append(cid[m])
                rows_w.append((w[m] / w[m].sum()).astype(np.float32))
                e["ncell"] = int(m.sum())
        print(f"  hemisphere {h}: {len(sel)} polygons ({time.time() - t0:.0f}s)", flush=True)
    for i, e in enumerate(ents):
        if e.get("mode") == "point":
            c = nearest_valid_cell(valid, e["lon"], e["lat"])
            if c is None:
                e["mode"] = "none"
                print("  no data:", e["id"])
                continue
            rows_e.append(np.array([i], dtype=np.int32))
            rows_c.append(np.array([c], dtype=np.int64))
            rows_w.append(np.array([1.0], dtype=np.float32))
            e["ncell"] = 1
    ent = np.concatenate(rows_e)
    cell = np.concatenate(rows_c)
    w = np.concatenate(rows_w)
    cells = np.unique(cell)
    np.savez(OUT / "weights.npz", ent=ent, cell=np.searchsorted(cells, cell).astype(np.int32), w=w)
    np.save(OUT / "cells.npy", cells)
    json.dump(ents, open(OUT / "entities.json", "w"), ensure_ascii=False)
    from collections import Counter
    print(Counter(e.get("mode") for e in ents), "unique cells:", len(cells), "pairs:", len(w),
          f"({time.time() - t0:.0f}s)")


if __name__ == "__main__":
    main()
