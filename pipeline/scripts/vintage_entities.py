#!/usr/bin/env python3
"""Vitis Mundi v2, vintage step 1: entities and (TerraClimate cell, weight, elevation shift) pairs.

Entities: every appellation main polygon (site/data/geo/{iso2}.geojson), every point-only appellation
(_extra_points.geojson) and every region outline (_regions.geojson); plus, in a separate set, every site
(_sites.geojson) for the optional site normals sidecar.
Pairs come from scripts/climate_downscale.py (same rules as the static `clim` in climate_enrich.py v2):
  * polygons: 30" (~1 km) DEM cells inside the polygon, each with its TerraClimate cell's normal GST shifted
    to its own elevation (monthly lapse rates, work/climate_lapse.json); cells with downscaled GST 12-24 C kept
    (v1 viability rule at 1 km); grouped per TerraClimate cell -> weight + mean target elevation;
  * small polygons (<= 25 km2) with Copernicus 30 m stats: target = 30 m mean elevation `e`;
  * point-only appellations: 10 km disc around the point, same masking;
  * sites: 150 m disc, target = 30 m mean elevation from site/data/topo/_sites.json.
The mask comes from the 1991-2020 normal, so it is the same in every year.
Output: work/vintage/entities.json, work/vintage/weights.npz (ent, cell index into cells.npy + cells_extra.npy,
        w, dz_km = (z_cell - z_target)/1000),
        work/vintage/cells.npy (sorted unique global TerraClimate cell ids = row*8640+col, north-up);
        work/vintage/site_entities.json + site_weights.npz (sites).
NOTE: if cells.npy gains cells that work/vintage/cells/*.npy lack, rerun vintage_fetch.py (it re-extracts).
Run: python3 -I scripts/vintage_entities.py [--new-cells] [--list-missing]
     (--new-cells: rebuild cells.npy from scratch, then vintage_fetch.py re-extracts all years;
      --list-missing: write work/vintage/missing_cells.json for vintage_fetch_dap.py)
"""
import json
import sys
import time
from collections import Counter
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import climate_downscale as cd  # noqa: E402

ROOT = Path("/home/claude/winesite")
GEO = ROOT / "site/data/geo"
OUT = ROOT / "work/vintage"


def pack(ents, pairs):
    rows_e, rows_c, rows_w, rows_d = [], [], [], []
    for i, (e, r) in enumerate(zip(ents, pairs)):
        if r is None:
            e["mode"] = "none"
            print("  no data:", e["id"])
            continue
        e.update({"h": r["h"], "lat": round(r["lat"], 4), "lon": round(r["lon"], 4), "mode": r["mode"],
                  "vf": None if r["vf"] is None else round(r["vf"], 3), "ztype": r["ztype"], "ncell": int(len(r["cell"])),
                  "zt": int(round(float(np.dot(r["w"], r["zt"])))), "dz": int(round(float(np.dot(r["w"], r["zc"] - r["zt"]))))})
        rows_e.append(np.full(len(r["cell"]), i, dtype=np.int32))
        rows_c.append(r["cell"].astype(np.int64))
        rows_w.append(r["w"].astype(np.float32))
        rows_d.append(((r["zc"] - r["zt"]) / 1000.0).astype(np.float32))
    return (np.concatenate(rows_e), np.concatenate(rows_c), np.concatenate(rows_w), np.concatenate(rows_d))


def main():
    t0 = time.time()
    feats, ents, kinds = [], [], []
    for p in sorted(GEO.glob("*.geojson")):
        if p.name.startswith("_") or p.name.endswith("_fine.geojson"):
            continue
        for f in json.load(open(p, encoding="utf-8"))["features"]:
            if f.get("geometry"):
                feats.append(f); kinds.append("poly")
                ents.append({"id": f["properties"]["id"], "kind": "app", "country": f["properties"]["country"]})
    for f in json.load(open(GEO / "_extra_points.geojson", encoding="utf-8"))["features"]:
        feats.append(f); kinds.append("point")
        ents.append({"id": f["properties"]["id"], "kind": "pt", "country": f["properties"]["country"]})
    for f in json.load(open(GEO / "_regions.geojson", encoding="utf-8"))["features"]:
        if f.get("geometry"):
            feats.append(f); kinds.append("poly")
            ents.append({"id": f["properties"]["id"], "kind": "region", "country": f["properties"]["country"]})
    ids = [e["id"] for e in ents]
    assert len(ids) == len(set(ids)), "duplicate ids"
    L = cd.lapse()
    topo = cd.load_topo()
    print(f"{len(ents)} entities", flush=True)
    pairs = cd.feature_pairs(feats, kinds, topo=topo, L=L, log=lambda m: print(m, flush=True))
    ent, cell, w, dz = pack(ents, pairs)
    # sites
    sf = [f for f in json.load(open(GEO / "_sites.geojson", encoding="utf-8"))["features"] if f.get("geometry")]
    sents = [{"id": f["properties"]["id"], "kind": "site", "country": f["properties"].get("country"),
              "app": f["properties"].get("app")} for f in sf]
    sp = cd.feature_pairs(sf, ["site"] * len(sf), topo=topo, L=L)
    se, sc, sw, sd = pack(sents, sp)
    cells = np.unique(np.concatenate([cell, sc]))
    old = OUT / "cells.npy"
    extra = np.load(OUT / "cells_extra.npy") if (OUT / "cells_extra.npy").exists() else np.array([], dtype=np.int64)
    if old.exists() and "--new-cells" not in sys.argv:
        # keep the extracted cell stores: cells.npy (whole-file extraction, vintage_fetch.py) and cells_extra.npy
        # (OPeNDAP subsets, vintage_fetch_dap.py). Pairs whose cell is in neither are snapped to the nearest
        # available cell (3 x 3 neighbourhood) and their dz recomputed; to avoid snapping, fetch them first with
        # vintage_fetch_dap.py (list printed by --list-missing).
        prev = np.load(old)
        avail = np.union1d(prev, extra)
        if "--list-missing" in sys.argv:
            miss = np.setdiff1d(cells, avail)
            json.dump({"miss": miss.tolist()}, open(OUT / "missing_cells.json", "w"))
            print(f"{len(miss)} cells missing -> work/vintage/missing_cells.json")
        zc = cd.tc_elev()
        snapped = 0
        for arrc, arrd, arre, el in ((cell, dz, ent, ents), (sc, sd, se, sents)):
            miss = ~np.isin(arrc, avail)
            for k in np.where(miss)[0]:
                r0, c0 = divmod(int(arrc[k]), cd.TC_NX)
                best = None
                for dr in (-1, 0, 1):
                    for dc in (-1, 0, 1):
                        cid = (r0 + dr) * cd.TC_NX + (c0 + dc)
                        if (dr or dc) and np.isin(cid, avail) and np.isfinite(zc[r0 + dr, c0 + dc]):
                            dist = dr * dr + dc * dc
                            if best is None or dist < best[0]:
                                best = (dist, cid, float(zc[r0 + dr, c0 + dc]))
                if best is None:
                    raise SystemExit(f"cell {arrc[k]} not extracted and no neighbour: run with --list-missing, then vintage_fetch_dap.py")
                zt = float(zc[r0, c0]) - float(arrd[k]) * 1000
                arrc[k], arrd[k] = best[1], (best[2] - zt) / 1000
                snapped += 1
                print("  snapped a pair of", el[int(arre[k])]["id"])
        print(f"kept cells.npy ({len(prev)}) + cells_extra.npy ({len(extra)}); {snapped} pairs snapped to a neighbour cell")
        cells = prev
    else:
        extra = np.array([], dtype=np.int64)

    def index_of(a):
        """Combined index: positions in cells.npy, then len(cells) + positions in cells_extra.npy."""
        i = np.searchsorted(cells, a)
        ok = (i < len(cells)) & (cells[np.minimum(i, len(cells) - 1)] == a)
        out = i.astype(np.int64)
        if (~ok).any():
            j = np.searchsorted(extra, a[~ok])
            assert (extra[np.minimum(j, len(extra) - 1)] == a[~ok]).all(), "cell in no store"
            out[~ok] = len(cells) + j
        return out.astype(np.int32)

    np.savez(OUT / "weights.npz", ent=ent, cell=index_of(cell), w=w, dz=dz)
    np.savez(OUT / "site_weights.npz", ent=se, cell=index_of(sc), w=sw, dz=sd)
    np.save(OUT / "cells.npy", cells)
    json.dump(ents, open(OUT / "entities.json", "w"), ensure_ascii=False)
    json.dump(sents, open(OUT / "site_entities.json", "w"), ensure_ascii=False)
    print(Counter(e.get("mode") for e in ents), Counter(e.get("ztype") for e in ents), "sites:", Counter(e.get("mode") for e in sents))
    print(f"unique cells: {len(cells)}, pairs: {len(w)} + {len(sw)} site pairs ({time.time() - t0:.0f}s)")


if __name__ == "__main__":
    main()
