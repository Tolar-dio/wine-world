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
  dz       m, mean elevation shift applied by the lapse-rate correction (cell mean elevation minus
           target elevation; positive = the vineyards lie below the TerraClimate cell's mean)

v2 (2026-10-30): ELEVATION (LAPSE-RATE) CORRECTION. TerraClimate values describe a ~4 km cell at the
cell's mean elevation; small units and valley vineyards often lie far below it (Vetzaner, Vinschgau: cell
1,600-1,800 m, vineyards 688-860 m, GST read 9.4 C instead of ~15). Now (scripts/climate_downscale.py):
  * every 30" (~1 km) WorldClim DEM cell inside the polygon gets its TerraClimate cell's monthly normals
    shifted to its own elevation with monthly Tmax/Tmin lapse rates fitted on 1,019 GHCN stations
    (work/climate_lapse.json; e.g. Apr-Oct below-cell rates Tmax ~6.4, Tmin ~4.4 C/km);
  * the viability rule (GST 12-24 C, Jones 2006) is applied to those 1 km cells, not to 4 km cells;
  * small features (<= 25 km2) with Copernicus 30 m terrain stats (site/data/topo) are shifted to their
    30 m mean elevation `e` instead (lieux-dits, Einzellagen, UGAs, grand crus); elev / elev_min / elev_max
    then come from the 30 m stats (e, e5, e95);
  * indices are computed per (feature, TerraClimate cell) pair from the shifted monthly values and then
    weight-averaged, so GDD/Huglin thresholds still act cell by cell; precipitation is not adjusted.
  * vf = viable fraction of the polygon's 1 km land cells after downscaling.
The v1 script is archived at work/climate_enrich.v1.py.
Hemisphere (season) and Huglin K are chosen from the feature's label point latitude.
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


NORM = {"tmax": "int16", "tmin": "int16", "ppt": "uint16"}


def build_normals_cache():
    """Monthly 1991-2020 normals as raw integer memmaps (12, 4320, 8640): tmax/tmin int16 as stored
    (x0.1 - 73 C, -32768 = no data); ppt as uint16 tenths of mm (65535 = no data)."""
    import netCDF4
    CACHE.mkdir(parents=True, exist_ok=True)
    for v, dt in NORM.items():
        with netCDF4.Dataset(TC / f"TerraClimate_19912020_{v}.nc") as d:
            var = d[v]
            var.set_auto_maskandscale(False)
            fill = var._FillValue
            assert abs(float(var.scale_factor) - 0.1) < 1e-9
            mm = np.lib.format.open_memmap(CACHE / f"norm_{v}.tmp.npy", mode="w+", dtype=dt, shape=(12, TC_NY, TC_NX))
            for m in range(12):
                a = var[m]
                if v == "ppt":
                    b = np.where(a == fill, 65535, np.clip(a, 0, 65534)).astype(np.uint16)
                else:
                    assert abs(float(var.add_offset) + 73.0) < 1e-9
                    b = a.astype(np.int16)
                mm[m] = b
            mm.flush()
            del mm
        os.replace(CACHE / f"norm_{v}.tmp.npy", CACHE / f"norm_{v}.npy")
    print("monthly normals cache built")


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
    if rebuild or not all((CACHE / f"norm_{v}.npy").exists() for v in NORM):
        build_normals_cache()
    if rebuild or not (CACHE / "tc_elev.npy").exists():
        sys.path.insert(0, str(Path(__file__).resolve().parent))
        import climate_downscale
        climate_downscale.build_tc_elev()


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
    """v2: lapse-rate downscaled normals per (feature, TerraClimate cell) pair (see module docstring)."""

    def __init__(self):
        sys.path.insert(0, str(Path(__file__).resolve().parent))
        import climate_downscale as cd
        self.cd = cd
        self.L = cd.lapse()
        self.topo = cd.load_topo()
        self.norm = {v: np.load(CACHE / f"norm_{v}.npy", mmap_mode="r") for v in NORM}

    def cellvals(self, cells):
        rows, cols = cells // TC_NX, cells % TC_NX
        tx = self.norm["tmax"][:, rows, cols].astype(np.float64)
        tn = self.norm["tmin"][:, rows, cols].astype(np.float64)
        pr = self.norm["ppt"][:, rows, cols].astype(np.float64)
        bad = (tx == -32768) | (tn == -32768) | (pr == 65535)
        tx, tn, pr = tx * 0.1 - 73.0, tn * 0.1 - 73.0, pr * 0.1
        tx[bad] = np.nan; tn[bad] = np.nan; pr[bad] = np.nan
        return tx, tn, pr

    def indices(self, r):
        """Normal climate indices for one feature's pairs (weighted means of per-pair values)."""
        h = r["h"]
        tx, tn, pr = self.cellvals(r["cell"])
        dz = (r["zc"] - r["zt"]) / 1000.0
        tx = tx + self.cd.shift(self.L, h, "tmax", dz)
        tn = tn + self.cd.shift(self.L, h, "tmin", dz)
        tm = (tx + tn) * 0.5
        d = DAYS[:, None].astype(np.float64)
        m, mh = SEASON[h], HUGLIN[h]
        per = {
            "gst": tm[m].mean(axis=0),
            "gdd": (np.maximum(tm[m] - 10, 0) * d[m]).sum(axis=0),
            "hi": (np.maximum((tm[mh] + tx[mh]) * 0.5 - 10, 0) * d[mh]).sum(axis=0),
            "gsp": pr[m].sum(axis=0),
            "prec": pr.sum(axis=0),
        }
        k = np.argmax(np.where(np.isfinite(tm), tm, -999), axis=0)
        per["mjt"] = np.take_along_axis(tm, k[None], axis=0)[0]
        per["dtr"] = np.take_along_axis(tx - tn, k[None], axis=0)[0]
        ok = np.isfinite(per["gst"]) & np.isfinite(per["prec"])
        if not ok.any():
            return None
        w = r["w"] * ok
        w = w / w.sum()
        out = {g: float(np.dot(w, np.where(ok, v, 0))) for g, v in per.items()}
        out["zt"] = float(np.dot(w, r["zt"]))
        out["dz"] = float(np.dot(w, r["zc"] - r["zt"]))
        return out

    def compute(self, feats):
        pairs = self.cd.feature_pairs(feats, ["poly"] * len(feats), topo=self.topo, L=self.L)
        out = []
        for f, r in zip(feats, pairs):
            if r is None:
                out.append(None)
                continue
            v = self.indices(r)
            if v is None:
                out.append(None)
                continue
            t = self.topo.get(f["properties"].get("id"), {})
            c = {}
            if r["ztype"] == "topo30" and fin(t.get("e5")) and fin(t.get("e95")):
                c.update({"elev": int(round(v["zt"])), "elev_min": int(round(t["e5"])), "elev_max": int(round(t["e95"]))})
            else:
                c.update({"elev": int(round(v["zt"])), "elev_min": int(round(r["zmin"])), "elev_max": int(round(r["zmax"]))})
            gst, gdd = v["gst"], v["gdd"]
            c.update({
                "gst": round(gst, 1),
                "gdd": int(round(gdd)),
                "winkler": winkler_class(gdd),
                "hi": int(round(v["hi"] * huglin_k(r["lat"]))),
                "gst_class": gst_class(gst),
                "prec": int(round(v["prec"])),
                "gsp": int(round(v["gsp"])),
                "mjt": round(v["mjt"], 1),
                "dtr": round(v["dtr"], 1),
                "vf": round(r["vf"], 2) if fin(r["vf"]) else None,
                "n": "point" if r["mode"] == "point" else "area",
                "dz": int(round(v["dz"])),
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


def report(ids):
    """--report id1,id2: print old and new clim for these ids without writing anything."""
    enr = Enricher()
    want = set(ids)
    for p in sorted(GEO.glob("*.geojson")):
        if p.name.startswith("_"):
            continue
        feats = [f for f in json.load(open(p, encoding="utf-8"))["features"]
                 if f.get("geometry") and f["properties"].get("id") in want]
        if not feats:
            continue
        for f, c in zip(feats, enr.compute(feats)):
            o = f["properties"].get("clim") or {}
            print(json.dumps({"id": f["properties"]["id"], "old": {k: o.get(k) for k in ("gst", "gdd", "hi", "elev", "mjt", "dtr", "n")},
                              "new": c}, ensure_ascii=False))


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    ensure_cache("--rebuild-cache" in sys.argv)
    if "--report" in sys.argv:
        report(args[0].split(","))
        return
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
