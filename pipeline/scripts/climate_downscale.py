"""Vitis Mundi: elevation (lapse-rate) downscaling shared by climate_enrich.py and the vintage scripts.

Problem: TerraClimate (1/24 deg, ~4 km) gives one value per cell, representative of the cell's mean
elevation. Small units (fine units, small appellations, point-only appellations) and vineyards in deep
valleys sit hundreds of metres below (or above) that mean, so their temperatures were off by up to
6 C (Vetzaner, Vinschgau: cell ~1,700 m vs vineyards 688-860 m).

Fix: for every feature, a set of "pairs" (TerraClimate cell, weight, target elevation). Temperatures of
the cell are shifted to the target elevation with monthly lapse rates (climate_lapse.json, fitted on
GHCN stations by climate_lapse_calibrate.py):  T_target = T_cell + rate_m * (z_cell - z_target) / 1000.
Precipitation is not adjusted.

  z_cell    mean land elevation of the 5 x 5 WorldClim 2.1 30-arc-second DEM cells inside the TerraClimate
            cell (cache work/climate_cache/tc_elev.npy); TerraClimate's normals are WorldClim 2 normals
            aggregated to 1/24 deg, so this is the elevation the cell value refers to.
  pairs     polygons: every 30" (~1 km) DEM cell inside the polygon (exactextract coverage) gets the
            downscaled normal GST of its TerraClimate cell; 30" cells with GST 12-24 C (Jones 2006, the v1
            viability rule, now applied at 1 km instead of 4 km) are kept; per TerraClimate cell the
            weight = summed coverage of kept 30" cells and the target = their mean elevation.
            No viable 30" cell: all land cells (v1 fallback). Small features (area <= SMALL_KM2) that have
            Copernicus 30 m terrain stats (site/data/topo) use the 30 m mean elevation `e` as target instead
            (precise for lieux-dits, Einzellagen, UGAs; no masking needed at that size).
  points    point-only appellations: the vine-viable 30" cells within POINT_LOCAL_KM (1.5 km) of the point
            (the named village or place itself, at its own elevation); when none is viable there (a town
            above its vineyards, e.g. Deqin at 3,300 m over the Mekong gorge vineyards at 2,200-2,600 m),
            the viable cells within POINT_RADIUS_KM (10 km). Sites: 150 m disc, target = 30 m mean `e`
            from site/data/topo/_sites.json.
"""
import json
import math
from pathlib import Path

import numpy as np

ROOT = Path("/home/claude/winesite")
CACHE = ROOT / "work/climate_cache"
TC_NY, TC_NX = 4320, 8640
DEM_NY, DEM_NX = 21600, 43200
VIABLE = (12.0, 24.0)
SMALL_KM2 = 25.0
POINT_RADIUS_KM = 10.0
POINT_LOCAL_KM = 1.5
SEASON = {"n": [3, 4, 5, 6, 7, 8, 9], "s": [9, 10, 11, 0, 1, 2, 3]}     # Apr-Oct / Oct-Apr (month index)


def build_tc_elev():
    """Mean land elevation per TerraClimate cell from the 30" DEM cache (int16, -32768 = no data)."""
    elev = np.load(CACHE / "elev.npy", mmap_mode="r")
    out = np.full((TC_NY, TC_NX), np.nan, dtype=np.float32)
    step = 240                                    # TC rows per chunk (1,200 DEM rows)
    for r0 in range(0, TC_NY, step):
        a = np.asarray(elev[r0 * 5:(r0 + step) * 5]).astype(np.float32)
        a[a == -32768] = np.nan
        b = a.reshape(step, 5, TC_NX, 5)
        n = np.isfinite(b).sum(axis=(1, 3))
        s = np.nansum(b, axis=(1, 3))
        with np.errstate(invalid="ignore"):
            out[r0:r0 + step] = np.where(n > 0, s / np.maximum(n, 1), np.nan)
    np.save(CACHE / "tc_elev.tmp.npy", out)
    (CACHE / "tc_elev.tmp.npy").replace(CACHE / "tc_elev.npy")
    return out


def tc_elev():
    p = CACHE / "tc_elev.npy"
    if not p.exists():
        build_tc_elev()
    return np.load(p, mmap_mode="r")


def lapse():
    """Monthly lapse rates, C per km (positive = colder upward), index 0 = January, per hemisphere.
    Keys tmax/tmin apply when the target lies below the cell's mean elevation (dz > 0), tmax_up/tmin_up when
    it lies above (dz < 0). Fitted by climate_lapse_calibrate.py (work/climate_lapse.json)."""
    d = json.load(open(ROOT / "work/climate_lapse.json"))
    return {h: {v: np.array(d["rates"][h][v], dtype=np.float64) for v in ("tmax", "tmin", "tmax_up", "tmin_up")}
            for h in "ns"}


def shift(L, h, var, dz_km, months=None):
    """Additive correction (C) for monthly values of var ('tmax' or 'tmin') at elevation offset
    dz_km = (z_cell - z_target)/1000 (array, km). Returns (12, n) or (len(months), n)."""
    months = list(range(12)) if months is None else months
    dz = np.asarray(dz_km, dtype=np.float64)
    down = L[h][var][months][:, None]
    up = L[h][var + "_up"][months][:, None]
    return np.where(dz[None, :] >= 0, down, up) * dz[None, :]


def lapse_gst(L, h):
    """Season-mean Tmean lapse rates (below, above) used for the 1 km viability test."""
    m = SEASON[h]
    return (float((L[h]["tmax"][m] + L[h]["tmin"][m]).mean() / 2),
            float((L[h]["tmax_up"][m] + L[h]["tmin_up"][m]).mean() / 2))


def disc(lon, lat, km, n=64):
    """Geodesic-ish disc polygon (GeoJSON geometry) of radius km around lon/lat."""
    dlat = km / 110.574
    dlon = km / (111.320 * max(0.05, math.cos(math.radians(lat))))
    ring = [[lon + dlon * math.cos(2 * math.pi * k / n), lat + dlat * math.sin(2 * math.pi * k / n)] for k in range(n)]
    ring.append(ring[0])
    return {"type": "Polygon", "coordinates": [ring]}


class Pairs:
    """Computes (tc cell id, weight, target elevation) pairs for geometries."""

    def __init__(self, L):
        from exactextract.raster import NumPyRasterSource
        self.elev = np.load(CACHE / "elev.npy", mmap_mode="r")
        self.zc = tc_elev()
        self.gst = {h: np.load(CACHE / f"gst_{h}.npy", mmap_mode="r") for h in "ns"}
        self.rate = {h: lapse_gst(L, h) for h in "ns"}
        E = (-180, -90, 180, 90)
        self.dem_src = NumPyRasterSource(self.elev, *E, nodata=-32768, name="dem")

    def _subcells(self, geoms):
        """exactextract over the 30" DEM: per geometry, (dem cell ids, coverage, elevation)."""
        from exactextract import exact_extract
        from exactextract.feature import JSONFeatureSource
        fs = [{"type": "Feature", "properties": {"_i": i}, "geometry": g} for i, g in enumerate(geoms)]
        out = [None] * len(geoms)
        for r in exact_extract(self.dem_src, JSONFeatureSource(fs), ["cell_id", "coverage", "values"], include_cols=["_i"]):
            p = r["properties"]
            out[p["_i"]] = (np.asarray(p["cell_id"], dtype=np.int64), np.asarray(p["coverage"], dtype=np.float64),
                            np.asarray(p["values"], dtype=np.float64))
        return out

    def compute(self, geoms, hemis, targets=None):
        """geoms: list of GeoJSON geometries (polygons); hemis: 'n'/'s'; targets: optional list of fixed target
        elevations (m) or None. Returns list of dicts {cell, w, zt, zc, mode, vf, zmin, zmax} (cell = TC cell id)."""
        targets = targets or [None] * len(geoms)
        sub = self._subcells(geoms)
        res = []
        for i, s in enumerate(sub):
            h = hemis[i]
            if s is None or len(s[0]) == 0:
                res.append(None)
                continue
            cid, cov, z = s
            land = (z > -1000) & (cov > 0)
            if not land.any():
                res.append(None)
                continue
            cid, cov, z = cid[land], cov[land], z[land]
            r, c = cid // DEM_NX, cid % DEM_NX
            tcid = (r // 5) * TC_NX + (c // 5)
            zc = np.asarray(self.zc.flat[tcid] if hasattr(self.zc, "flat") else self.zc.ravel()[tcid], dtype=np.float64)
            g = np.asarray(self.gst[h].ravel()[tcid], dtype=np.float64)
            ok = np.isfinite(g) & np.isfinite(zc)
            if not ok.any():
                res.append(None)
                continue
            cid, cov, z, tcid, zc, g = cid[ok], cov[ok], z[ok], tcid[ok], zc[ok], g[ok]
            fixed = targets[i]
            zt_sub = np.full(len(z), float(fixed)) if fixed is not None else z
            d = (zc - zt_sub) / 1000.0
            gd = g + np.where(d >= 0, self.rate[h][0], self.rate[h][1]) * d   # downscaled normal GST of each 30" cell
            via = (gd >= VIABLE[0]) & (gd <= VIABLE[1])
            if fixed is not None:
                use, mode = np.ones(len(z), bool), "fixed"
                vf = float((cov * via).sum() / cov.sum())
            elif via.any():
                use, mode = via, "viable"
                vf = float((cov * via).sum() / cov.sum())
            else:
                use, mode, vf = np.ones(len(z), bool), "land", 0.0
            u, inv = np.unique(tcid[use], return_inverse=True)
            w = np.bincount(inv, weights=cov[use])
            zt = np.bincount(inv, weights=cov[use] * zt_sub[use]) / w
            zcu = np.bincount(inv, weights=cov[use] * zc[use]) / w
            res.append({"cell": u, "w": w / w.sum(), "zt": zt, "zc": zcu, "mode": mode, "vf": vf,
                        "zmin": float(z.min()), "zmax": float(z.max())})
        return res


# ------------------------------------------------------------------ feature -> pairs (shared rules)
def load_topo():
    t = {}
    for p in sorted((ROOT / "site/data/topo").glob("*.json")):
        if p.name.startswith("_") and p.name != "_sites.json":
            continue
        t.update(json.load(open(p, encoding="utf-8")))
    return t


def approx_area_km2(f):
    a = f["properties"].get("area")
    if isinstance(a, (int, float)) and a > 0:
        return float(a)
    from shapely.geometry import shape
    g = shape(f["geometry"])
    return g.area * (111.32 ** 2) * math.cos(math.radians(g.centroid.y))


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


def nearest_valid_cell(valid, lon, lat, max_r=3):
    col = min(TC_NX - 1, max(0, int((lon + 180) * 24)))
    row = min(TC_NY - 1, max(0, int((90 - lat) * 24)))
    for r in range(0, max_r + 1):
        r0, r1 = max(0, row - r), min(TC_NY, row + r + 1)
        c0, c1 = max(0, col - r), min(TC_NX, col + r + 1)
        win = np.asarray(valid[r0:r1, c0:c1])
        if win.any():
            if r == 0:
                return row * TC_NX + col
            yy, xx = np.mgrid[r0:r1, c0:c1]
            dist = np.where(win, (yy - row) ** 2 + (xx - col) ** 2, 10 ** 9)
            k = np.unravel_index(np.argmin(dist), dist.shape)
            return int(yy[k]) * TC_NX + int(xx[k])
    return None


def feature_pairs(feats, kinds=None, topo=None, L=None, log=None):
    """feats: GeoJSON features (polygons, or points for point-only appellations / sites).
    kinds: per feature 'poly' (default), 'point' (point-only appellation -> 10 km disc) or 'site' (150 m disc,
    fixed target = 30 m mean of site/data/topo/_sites.json).
    Returns per feature dict {h, lat, lon, cell, w, zt, zc, mode, vf, zmin, zmax, ztype} or None."""
    L = L or lapse()
    topo = load_topo() if topo is None else topo
    kinds = kinds or ["poly"] * len(feats)
    P = Pairs(L)
    valid = None
    geoms, hemis, targets, meta = [], [], [], []
    for f, k in zip(feats, kinds):
        lon, lat = label_point(f)
        h = "n" if lat >= 0 else "s"
        fid = f["properties"].get("id")
        t = topo.get(fid) if fid else None
        te = t.get("e") if isinstance(t, dict) and not t.get("w") else None
        if k == "site":
            g, tgt, ztype = disc(lon, lat, 0.15), te, "topo30" if te is not None else "dem1km"
        elif k == "point" or f["geometry"]["type"] == "Point":
            g, tgt, ztype = disc(lon, lat, POINT_LOCAL_KM), None, "dem1km-local"
        else:
            g = f["geometry"]
            small = approx_area_km2(f) <= SMALL_KM2
            tgt = te if (small and te is not None) else None
            ztype = "topo30" if tgt is not None else "dem1km"
        geoms.append(g); hemis.append(h); targets.append(tgt); meta.append((h, lat, lon, ztype, tgt))
    out = []
    step = 500
    for i0 in range(0, len(geoms), step):
        out.extend(P.compute(geoms[i0:i0 + step], hemis[i0:i0 + step], targets[i0:i0 + step]))
        if log:
            log(f"  pairs {min(i0 + step, len(geoms))}/{len(geoms)}")
    # points whose own spot is not vine-viable: widen to POINT_RADIUS_KM
    wide = [i for i, m in enumerate(meta) if m[3] == "dem1km-local" and (out[i] is None or out[i]["mode"] != "viable")]
    if wide:
        rw = P.compute([disc(meta[i][2], meta[i][1], POINT_RADIUS_KM) for i in wide], [meta[i][0] for i in wide],
                       [None] * len(wide))
        for i, r in zip(wide, rw):
            if r is not None and (out[i] is None or r["mode"] == "viable"):
                out[i] = r
                h, lat, lon, _, tgt = meta[i]
                meta[i] = (h, lat, lon, "dem1km-10km", tgt)
    res = []
    for i, r in enumerate(out):
        h, lat, lon, ztype, tgt = meta[i]
        if r is None:      # no land 30" cell: nearest valid TerraClimate cell to the label point (v1 rule)
            if valid is None:
                valid = np.isfinite(np.load(CACHE / "gst_n.npy", mmap_mode="r")) & np.isfinite(P.zc)
            c = nearest_valid_cell(valid, lon, lat)
            if c is None:
                res.append(None)
                continue
            zc = float(P.zc.ravel()[c])
            zt = tgt if tgt is not None else zc
            r = {"cell": np.array([c]), "w": np.array([1.0]), "zt": np.array([float(zt)]), "zc": np.array([zc]),
                 "mode": "point", "vf": None, "zmin": float(zt), "zmax": float(zt)}
        r.update({"h": h, "lat": lat, "lon": lon, "ztype": ztype})
        res.append(r)
    return res
