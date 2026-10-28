#!/usr/bin/env python3
"""Vitis Mundi: climate + elevation enrichment of appellation polygons.

Adds/replaces a `clim` object in properties of every feature in site/data/geo/*.geojson
(files starting with "_" are skipped). Nothing else in the file changes: properties order,
coordinates and number formatting are preserved (the script verifies that a plain
load/dump reproduces each file byte for byte before touching it, and auto-detects the
separators / ensure_ascii style used by the producing agent). Safe to rerun at any time
(idempotent: same inputs give byte-identical output).

Run:   python3 -I /home/claude/winesite/scripts/climate_enrich.py [--rebuild-cache] [files...]
       (no file args = all site/data/geo/*.geojson not starting with "_")

Data (downloaded to raw/, see work/base-log.md):
  * TerraClimate 1991-2020 monthly climatology (Abatzoglou et al. 2018, Sci Data 5:170191;
    climatology files TerraClimate_19912020_{tmax,tmin,ppt}.nc, 1/24 deg ~4 km).
  * WorldClim 2.1 elevation, 30 arc-seconds (~1 km) (Fick & Hijmans 2017, Int J Climatol 37:4302).

clim keys:
  elev     m, mean of 30" DEM cells over the climatically viable part (see vf)
  elev_min, elev_max  m, min / max of 30" DEM cells over the whole polygon
  gst      growing-season mean temperature, deg C (Apr-Oct N hemisphere, Oct-Apr S)
  gdd      Winkler growing degree days base 10 deg C, same season, deg C days
           (monthly approximation: sum max(0, Tmean_m - 10) * days_m)
  winkler  Region class from gdd, Jones et al. 2010 bins (see WINKLER below)
  hi       Huglin heliothermal index (Apr-Sep N / Oct-Mar S;
           sum max(0, ((Tmean-10)+(Tmax-10))/2) * days * K, K = latitude coefficient)
  gst_class  Jones (2006) GST classes
  prec     annual precipitation mm;  gsp  growing-season precipitation mm (same months as gst)
  mjt      mean temperature of the warmest month, deg C
  dtr      mean diurnal temperature range (Tmax - Tmin) of the warmest month, deg C
  vf       fraction (0-1) of the polygon's land cells whose GST lies in the viable 12-24 deg C
           range (Jones 2006)
  n        "area" (zonal mean over the polygon) or "point" (sampled at lp: polygon smaller
           than a climate grid cell, or no valid land cells inside)
Viability weighting: large boundaries (admin proxies especially) often take in high mountains
or deserts where no vines grow (e.g. Lujan de Cuyo reaches 6,100 m). Climate values and `elev`
are therefore coverage-weighted means over the cells with GST 12-24 deg C only; when a polygon
has no such cell (vf = 0, e.g. tropical or very cool areas) the plain mean is used.
elev_min / elev_max always describe the whole polygon.
Indices are computed per grid cell first, then averaged over the polygon (coverage-weighted
via exactextract), so nonlinear thresholds (GDD, HI) are honoured cell by cell. Hemisphere
(season) and Huglin K are chosen from the feature's label point latitude.
"""
import json
import math
import os
import sys
import time
from pathlib import Path

import numpy as np

ROOT = Path("/home/claude/winesite")
GEO = ROOT / "site/data/geo"
TC = ROOT / "raw/terraclimate_1991_2020"
DEM_TIF = ROOT / "raw/worldclim_elev_30s/extracted/wc2.1_30s_elev.tif"
CACHE = ROOT / "work/climate_cache"

DAYS = np.array([31, 28.25, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], dtype=np.float32)
SEASON = {"n": [3, 4, 5, 6, 7, 8, 9], "s": [9, 10, 11, 0, 1, 2, 3]}      # Apr-Oct / Oct-Apr
HUGLIN = {"n": [3, 4, 5, 6, 7, 8], "s": [9, 10, 11, 0, 1, 2]}            # Apr-Sep / Oct-Mar
GRIDS = ["gst_n", "gst_s", "gdd_n", "gdd_s", "hi_n", "hi_s", "gsp_n", "gsp_s", "prec", "mjt", "dtr"]
TC_NY, TC_NX = 4320, 8640
DEM_NY, DEM_NX = 21600, 43200

# Winkler regions in deg C days (Jones, Duff, Hall & Myers 2010, Am J Enol Vitic 61:313-326,
# Table 1): Ia 850-1111, Ib 1111-1389, II 1389-1667, III 1667-1944, IV 1944-2222, V 2222-2700.
# Values below 850 are labelled "Ia" and above 2700 "V" (the gdd number shows how far outside).
WINKLER = [(1111, "Ia"), (1389, "Ib"), (1667, "II"), (1944, "III"), (2222, "IV")]
# Jones (2006) growing season temperature classes, deg C
GST_CLASSES = [(13, "too cool"), (15, "cool"), (17, "intermediate"), (19, "warm"),
               (21, "hot"), (24, "very hot")]


def huglin_k(lat):
    """Huglin (1978) day-length coefficient; 1.00 below 40 deg, +0.01 per 2 deg from 42,
    capped at 1.06 (the published table stops at 50 deg)."""
    a = abs(lat)
    if a < 40:
        return 1.00
    if a < 42:
        return 1.02
    if a < 44:
        return 1.03
    if a < 46:
        return 1.04
    if a < 48:
        return 1.05
    return 1.06


def winkler_class(gdd):
    for lim, name in WINKLER:
        if gdd < lim:
            return name
    return "V"


def gst_class(gst):
    for lim, name in GST_CLASSES:
        if gst < lim:
            return name
    return "too hot"


# ---------------------------------------------------------------- cache building
def build_climate_cache():
    import netCDF4
    CACHE.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    ds = {v: netCDF4.Dataset(TC / f"TerraClimate_19912020_{v}.nc") for v in ("tmax", "tmin", "ppt")}
    lat = ds["tmax"]["lat"][:]
    assert lat.shape[0] == TC_NY and lat[0] > lat[-1], "expected north-up 4320 rows"
    params = {}
    for v, d in ds.items():
        var = d[v]
        var.set_auto_maskandscale(False)
        params[v] = (var, float(var.scale_factor), float(var.add_offset), var._FillValue)
    out = {g: np.lib.format.open_memmap(CACHE / f"{g}.tmp.npy", mode="w+", dtype=np.float32,
                                        shape=(TC_NY, TC_NX)) for g in GRIDS}
    step = 540
    for r0 in range(0, TC_NY, step):
        r1 = min(TC_NY, r0 + step)
        arr = {}
        for v, (var, sc, off, fill) in params.items():
            raw = var[:, r0:r1, :]
            a = raw.astype(np.float32) * np.float32(sc) + np.float32(off)
            a[raw == fill] = np.nan
            arr[v] = a
            del raw
        tx, tn, pp = arr["tmax"], arr["tmin"], arr["ppt"]
        tm = (tx + tn) * np.float32(0.5)
        d = DAYS[:, None, None]
        for h in ("n", "s"):
            m = SEASON[h]
            out[f"gst_{h}"][r0:r1] = tm[m].mean(axis=0)
            out[f"gdd_{h}"][r0:r1] = (np.maximum(tm[m] - 10, 0) * d[m]).sum(axis=0)
            out[f"gsp_{h}"][r0:r1] = pp[m].sum(axis=0)
            mh = HUGLIN[h]
            out[f"hi_{h}"][r0:r1] = (np.maximum((tm[mh] + tx[mh]) * np.float32(0.5) - 10, 0) * d[mh]).sum(axis=0)
        out["prec"][r0:r1] = pp.sum(axis=0)
        allnan = np.isnan(tm).all(axis=0)
        idx = np.nanargmax(np.where(np.isnan(tm), -999, tm), axis=0)
        mjt = np.take_along_axis(tm, idx[None], axis=0)[0]
        dtr = np.take_along_axis(tx - tn, idx[None], axis=0)[0]
        mjt[allnan] = np.nan
        dtr[allnan] = np.nan
        out["mjt"][r0:r1] = mjt
        out["dtr"][r0:r1] = dtr
        # sums of NaN months come out as 0 with .sum: re-mask ocean/no-data cells
        for g in ("gdd_n", "gdd_s", "gsp_n", "gsp_s", "hi_n", "hi_s", "prec"):
            out[g][r0:r1][allnan] = np.nan
        del arr, tx, tn, pp, tm
        print(f"  climate rows {r0}-{r1} done ({time.time() - t0:.0f}s)", flush=True)
    for g, m in out.items():
        m.flush()
        del m
        os.replace(CACHE / f"{g}.tmp.npy", CACHE / f"{g}.npy")
    print(f"climate cache built in {time.time() - t0:.0f}s")


def build_dem_cache():
    import rasterio
    from rasterio.windows import Window
    CACHE.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    with rasterio.open(DEM_TIF) as src:
        assert (src.height, src.width) == (DEM_NY, DEM_NX)
        nod = src.nodata
        mm = np.lib.format.open_memmap(CACHE / "elev.tmp.npy", mode="w+", dtype=np.int16,
                                       shape=(DEM_NY, DEM_NX))
        step = 1200
        for r0 in range(0, DEM_NY, step):
            n = min(step, DEM_NY - r0)
            a = src.read(1, window=Window(0, r0, DEM_NX, n))
            if nod is not None and nod != -32768:
                a[a == nod] = -32768
            mm[r0:r0 + n] = a
        mm.flush()
        del mm
    os.replace(CACHE / "elev.tmp.npy", CACHE / "elev.npy")
    print(f"DEM cache built in {time.time() - t0:.0f}s")


VIABLE = (12.0, 24.0)   # Jones (2006) GST range in which quality viticulture is practised


def build_viability_cache():
    """via_{n,s}: 1 where GST (that hemisphere's season) is within VIABLE, 0 where not,
    NaN over ocean / no data. wt_{n,s}: same with NaN -> 0 (used as exactextract weights)."""
    for h in ("n", "s"):
        g = np.load(CACHE / f"gst_{h}.npy", mmap_mode="r")
        via = np.lib.format.open_memmap(CACHE / f"via_{h}.tmp.npy", mode="w+", dtype=np.float32, shape=g.shape)
        wt = np.lib.format.open_memmap(CACHE / f"wt_{h}.tmp.npy", mode="w+", dtype=np.float32, shape=g.shape)
        for r0 in range(0, g.shape[0], 540):
            a = np.asarray(g[r0:r0 + 540])
            v = ((a >= VIABLE[0]) & (a <= VIABLE[1])).astype(np.float32)
            wt[r0:r0 + 540] = v
            v[np.isnan(a)] = np.nan
            via[r0:r0 + 540] = v
        via.flush(); wt.flush()
        del via, wt
        os.replace(CACHE / f"via_{h}.tmp.npy", CACHE / f"via_{h}.npy")
        os.replace(CACHE / f"wt_{h}.tmp.npy", CACHE / f"wt_{h}.npy")
    print("viability grids built")


def ensure_cache(rebuild=False):
    if rebuild or not all((CACHE / f"{g}.npy").exists() for g in GRIDS):
        build_climate_cache()
        rebuild = True
    if rebuild or not all((CACHE / f"{k}_{h}.npy").exists() for k in ("via", "wt") for h in "ns"):
        build_viability_cache()
    if rebuild or not (CACHE / "elev.npy").exists():
        build_dem_cache()


# ---------------------------------------------------------------- helpers
def dump_lines(obj, ensure_ascii=False):
    """Layout used by scripts/europe_common.py: one compact feature per line."""
    head = {k: v for k, v in obj.items() if k != "features"}
    h = json.dumps(head, separators=(",", ":"), ensure_ascii=ensure_ascii)[:-1]
    h = (h + ',"features":[\n') if head else '{"features":[\n'
    body = ",\n".join(json.dumps(f, separators=(",", ":"), ensure_ascii=ensure_ascii)
                      for f in obj["features"])
    return h + body + ("\n" if obj["features"] else "") + "]}"


def render(obj, style):
    st = dict(style)
    if st.pop("lines", False):
        return dump_lines(obj, **st)
    return json.dumps(obj, **st)


def detect_style(text, obj):
    """Return (style, tail) such that render(obj, style) + tail == text, or (None, None)."""
    cands = []
    for ea in (False, True):
        cands.append({"separators": (",", ":"), "ensure_ascii": ea})
        if isinstance(obj, dict) and isinstance(obj.get("features"), list) and list(obj)[-1] == "features":
            cands.append({"lines": True, "ensure_ascii": ea})
        cands.append({"separators": (", ", ": "), "ensure_ascii": ea})
        for ind in (0, 1, 2, 4):
            cands.append({"indent": ind, "ensure_ascii": ea})
    for st in cands:
        s = render(obj, st)
        if s == text:
            return st, ""
        if text.startswith(s) and text[len(s):].strip() == "" and len(text) - len(s) <= 2:
            return st, text[len(s):]
    return None, None


def label_point(f):
    lp = f["properties"].get("lp")
    if isinstance(lp, (list, tuple)) and len(lp) == 2:
        return float(lp[0]), float(lp[1])
    from shapely.geometry import shape
    p = shape(f["geometry"]).representative_point()
    return p.x, p.y


def sample(grid, res, lon, lat, max_r=3):
    """Value of the cell containing (lon, lat); if no data, nearest valid cell within max_r rings."""
    ny, nx = grid.shape
    col = min(nx - 1, max(0, int((lon + 180) / res)))
    row = min(ny - 1, max(0, int((90 - lat) / res)))
    for r in range(0, max_r + 1):
        r0, r1 = max(0, row - r), min(ny, row + r + 1)
        c0, c1 = max(0, col - r), min(nx, col + r + 1)
        win = np.asarray(grid[r0:r1, c0:c1], dtype=np.float64)
        if grid.dtype == np.int16:
            win[win == -32768] = np.nan
        if np.isfinite(win).any():
            if r == 0:
                return float(win[0, 0])
            yy, xx = np.mgrid[r0:r1, c0:c1]
            dist = (yy - row) ** 2 + (xx - col) ** 2
            dist = np.where(np.isfinite(win), dist, np.inf)
            k = np.unravel_index(np.argmin(dist), dist.shape)
            return float(win[k])
    return float("nan")


def approx_area_km2(f):
    a = f["properties"].get("area")
    if isinstance(a, (int, float)):
        return float(a)
    from shapely.geometry import shape
    g = shape(f["geometry"])
    lat = g.centroid.y
    return g.area * (111.32 ** 2) * math.cos(math.radians(lat))


def fin(x):
    return isinstance(x, (int, float)) and not isinstance(x, bool) and math.isfinite(x)


# ---------------------------------------------------------------- main computation
class Enricher:
    def __init__(self):
        from exactextract.raster import NumPyRasterSource
        self.grids = {g: np.load(CACHE / f"{g}.npy", mmap_mode="r") for g in GRIDS}
        self.via = {h: np.load(CACHE / f"via_{h}.npy", mmap_mode="r") for h in "ns"}
        self.wt = {h: np.load(CACHE / f"wt_{h}.npy", mmap_mode="r") for h in "ns"}
        self.elev = np.load(CACHE / "elev.npy", mmap_mode="r")
        E = (-180, -90, 180, 90)
        self.tc_src = [NumPyRasterSource(self.grids[g], *E, nodata=np.nan, name=g) for g in GRIDS]
        self.via_src = {h: NumPyRasterSource(self.via[h], *E, nodata=np.nan, name="via") for h in "ns"}
        self.wt_src = {h: NumPyRasterSource(self.wt[h], *E, name="wt") for h in "ns"}
        self.dem_src = NumPyRasterSource(self.elev, *E, nodata=-32768, name="elev")

    def zonal(self, feats, hemis):
        """Per feature: plain and viability-weighted means of every climate grid, viable
        fraction, DEM min/max/mean/weighted mean. Features grouped by hemisphere because
        the viability weights depend on the season."""
        from exactextract import exact_extract
        from exactextract.feature import JSONFeatureSource
        res = {i: {} for i in range(len(feats))}
        for h in "ns":
            idx = [i for i in range(len(feats)) if hemis[i] == h]
            if not idx:
                continue
            fs = [{"type": "Feature", "properties": {"_i": i}, "geometry": feats[i]["geometry"]} for i in idx]
            for r in exact_extract(self.tc_src, JSONFeatureSource(fs), ["mean", "weighted_mean"],
                                   weights=self.wt_src[h], include_cols=["_i"]):
                res[r["properties"]["_i"]].update(r["properties"])
            for r in exact_extract([self.via_src[h]], JSONFeatureSource(fs), ["mean"], include_cols=["_i"]):
                res[r["properties"]["_i"]]["vf"] = r["properties"].get("via_mean", r["properties"].get("mean"))
            for r in exact_extract([self.dem_src], JSONFeatureSource(fs), ["mean", "min", "max", "weighted_mean"],
                                   weights=self.wt_src[h], include_cols=["_i"]):
                p = r["properties"]
                res[p["_i"]].update({k if k.startswith("elev_") else "elev_" + k: v
                                     for k, v in p.items() if k != "_i"})
        return res

    def compute(self, feats):
        pts = [label_point(f) for f in feats]
        hemis = ["n" if lat >= 0 else "s" for _, lat in pts]
        z = self.zonal(feats, hemis)
        out = []
        for i, f in enumerate(feats):
            lon, lat = pts[i]
            h = hemis[i]
            area = approx_area_km2(f)
            cell_tc = (1 / 24 * 111.32) ** 2 * max(0.05, math.cos(math.radians(lat)))
            cell_dem = (1 / 120 * 111.32) ** 2 * max(0.05, math.cos(math.radians(lat)))
            t = z[i]
            vf = t.get("vf")
            weighted = isinstance(vf, float) and math.isfinite(vf) and vf > 0
            if weighted:   # exactextract names weighted outputs "{value}_{weight}_weighted_mean"
                vals = {g: t.get(f"{g}_wt_weighted_mean", t.get(f"{g}_weighted_mean")) for g in GRIDS}
            else:
                vals = {g: t.get(f"{g}_mean") for g in GRIDS}
            mode = "area"
            if area < cell_tc or not all(fin(vals[g]) for g in GRIDS):
                mode = "point"
                vals = {g: sample(self.grids[g], 1 / 24, lon, lat) for g in GRIDS}
                vf = sample(self.via[h], 1 / 24, lon, lat)
            em = (t.get("elev_wt_weighted_mean", t.get("elev_weighted_mean"))
                  if weighted and mode == "area" else t.get("elev_mean"))
            if area < cell_dem or not fin(em):
                em = emin = emax = sample(self.elev, 1 / 120, lon, lat, max_r=6)
            else:
                emin, emax = t.get("elev_min"), t.get("elev_max")
            if not fin(vals["gst_" + h]):
                out.append(None)
                continue
            gst = vals["gst_" + h]
            gdd = vals["gdd_" + h]
            hi = vals["hi_" + h] * huglin_k(lat)
            c = {}
            if fin(em):
                c["elev"] = int(round(em))
                c["elev_min"] = int(round(emin))
                c["elev_max"] = int(round(emax))
            c.update({
                "gst": round(gst, 1),
                "gdd": int(round(gdd)),
                "winkler": winkler_class(gdd),
                "hi": int(round(hi)),
                "gst_class": gst_class(gst),
                "prec": int(round(vals["prec"])),
                "gsp": int(round(vals["gsp_" + h])),
                "mjt": round(vals["mjt"], 1),
                "dtr": round(vals["dtr"], 1),
                "vf": round(vf, 2) if fin(vf) else None,
                "n": mode,
            })
            out.append(c)
        return out


def process_file(enr, path, retries=2):
    for attempt in range(retries + 1):
        st = path.stat()
        text = path.read_text(encoding="utf-8")
        obj = json.loads(text)
        style, tail = detect_style(text, obj)
        if style is None:
            multi = text.count("\n") > 2
            print(f"  WARNING {path.name}: formatting not reproducible; writing "
                  f"{'one feature per line' if multi else 'compact'} UTF-8")
            style = {"lines": True, "ensure_ascii": False} if multi else {"separators": (",", ":"), "ensure_ascii": False}
            tail = "\n" if text.endswith("\n") else ""
        feats = [f for f in obj.get("features", []) if f.get("geometry")]
        clims = enr.compute(feats)
        nset = nfail = 0
        for f, c in zip(feats, clims):
            if c is None:
                f["properties"].pop("clim", None)
                nfail += 1
            else:
                f["properties"]["clim"] = c
                nset += 1
        new = render(obj, style) + tail
        st2 = path.stat()
        if (st2.st_mtime_ns, st2.st_size) != (st.st_mtime_ns, st.st_size):
            print(f"  {path.name} changed while processing, retrying")
            continue
        if new != text:
            tmp = path.with_name("." + path.name + ".climtmp")
            tmp.write_text(new, encoding="utf-8")
            os.chmod(tmp, st.st_mode & 0o777)
            os.replace(tmp, path)
        return nset, nfail, new != text
    raise RuntimeError(f"{path} kept changing")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    ensure_cache("--rebuild-cache" in sys.argv)
    files = [Path(a) for a in args] if args else sorted(
        p for p in GEO.glob("*.geojson") if not p.name.startswith("_"))
    t0 = time.time()
    enr = Enricher()
    tot = 0
    for p in files:
        t1 = time.time()
        nset, nfail, changed = process_file(enr, p)
        tot += nset
        print(f"{p.name}: clim on {nset} features, {nfail} without data, "
              f"{'rewritten' if changed else 'unchanged'} ({time.time() - t1:.1f}s)", flush=True)
    print(f"done: {len(files)} files, {tot} features, {time.time() - t0:.1f}s")


if __name__ == "__main__":
    main()
