"""Basemap: countries (detailed + low) and country label points from Natural Earth.

Run: python3 -I /home/claude/winesite/scripts/base_countries.py
Inputs (untrusted raw downloads): raw/ne_10m, raw/ne_50m_110m
Crimea and Sevastopol are assigned to Ukraine (see CRIMEA_EACH).
Outputs: site/data/base/countries.geojson (10m simplified, 4 dp)
         site/data/base/countries_low.geojson (50m simplified, 3 dp)
         site/data/base/country_labels.geojson (NE label points, 3 dp)
"""
import json
import subprocess
from pathlib import Path

ROOT = Path("/home/claude/winesite")
MS = str(ROOT / "work/node/node_modules/.bin/mapshaper")
OUT = ROOT / "site/data/base"
TMP = ROOT / "work/base_tmp"
OUT.mkdir(parents=True, exist_ok=True)
TMP.mkdir(parents=True, exist_ok=True)

SRC10 = ROOT / "raw/ne_10m/ne_10m_admin_0_countries/ne_10m_admin_0_countries.shp"
SRC50 = ROOT / "raw/ne_50m_110m/ne_50m_admin_0_countries/ne_50m_admin_0_countries.shp"

# NE entities with ISO_A2_EH == -99, resolved per ISO 3166-1 practice / sovereignty.
# "" = indeterminate or disputed land with no ISO code (rendered, not clickable).
FIX = {
    "Somaliland": "so",              # ISO 3166 treats it as part of Somalia
    "Northern Cyprus": "cy",         # ISO 3166 treats it as part of Cyprus
    "Cyprus No Mans Area": "cy",     # UN buffer zone inside Cyprus
    "Akrotiri Sovereign Base Area": "gb",
    "Dhekelia Sovereign Base Area": "gb",
    "US Naval Base Guantanamo Bay": "cu",
    "Kosovo": "xk",
    "Siachen Glacier": "",
    "Southern Patagonian Ice Field": "",
    "Bir Tawil": "",
    "Spratly Islands": "",
    "Scarborough Reef": "",
    "Bajo Nuevo Bank (Petrel Is.)": "",
    "Serranilla Bank": "",
}


def iso2_of(p):
    adm = p.get("ADMIN")
    if adm in FIX:
        return FIX[adm]
    for k in ("ISO_A2_EH", "ISO_A2"):
        v = str(p.get(k, "-99"))
        if v not in ("-99", "") and len(v) == 2:
            return v.lower()
    raise SystemExit(f"unresolved iso2 for {adm}")


def ms(*args):
    r = subprocess.run([MS, *args], capture_output=True, text=True)
    if r.returncode:
        raise SystemExit(r.stderr)
    return r.stderr


# Internationally recognised borders: Natural Earth's default worldview draws Crimea (incl.
# Sevastopol) inside Russia. Move that part (the single RUS polygon part whose inner point lies in
# the peninsula) to Ukraine, then dissolve by ADMIN so the Perekop border disappears.
CRIMEA_EACH = ('if (ADM0_A3 == "RUS" && this.innerX > 32 && this.innerX < 36.7 && '
               'this.innerY > 44.2 && this.innerY < 46.3) '
               '{ADMIN = "Ukraine"; NAME = "Ukraine"; NAME_LONG = "Ukraine"; ISO_A2 = "UA"; '
               'ISO_A2_EH = "UA"; ADM0_A3 = "UKR"; moved = 1} else {moved = 0}')


def build(src, out, pct, precision):
    tmp = TMP / (out.stem + "_tmp.geojson")
    ms("-i", str(src), "encoding=utf8",
       "-explode", "-each", CRIMEA_EACH,
       "-dissolve2", "ADMIN", "copy-fields=NAME,NAME_LONG,ISO_A2,ISO_A2_EH,TYPE",
       "-simplify", f"{pct}%", "weighted", "keep-shapes",
       "-filter-fields", "ADMIN,NAME,NAME_LONG,ISO_A2,ISO_A2_EH",
       "-o", str(tmp), "format=geojson", f"precision={precision}")
    fc = json.loads(tmp.read_text(encoding="utf-8"))
    feats = []
    for f in fc["features"]:
        p = f["properties"]
        f["properties"] = {"iso2": iso2_of(p), "name": p["NAME"], "name_long": p["NAME_LONG"]}
        if f["geometry"] is None:
            continue
        feats.append(f)
    feats.sort(key=lambda f: (f["properties"]["iso2"], f["properties"]["name"]))
    fc = {"type": "FeatureCollection", "features": feats}
    out.write_text(json.dumps(fc, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return out.stat().st_size, len(feats)


def labels(src, out):
    tmp = TMP / "labels_attrs.json"
    ms("-i", str(src), "encoding=utf8", "-o", str(tmp), "format=json")
    rows = json.loads(tmp.read_text(encoding="utf-8"))
    feats = []
    for p in rows:
        iso = iso2_of(p)
        if not iso or p.get("TYPE") == "Indeterminate":
            continue
        feats.append({"type": "Feature",
                      "geometry": {"type": "Point", "coordinates": [round(p["LABEL_X"], 3), round(p["LABEL_Y"], 3)]},
                      "properties": {"iso2": iso, "name": p["NAME"], "rank": p["LABELRANK"],
                                     "minz": p["MIN_LABEL"]}})
    feats.sort(key=lambda f: (f["properties"]["rank"], f["properties"]["name"]))
    out.write_text(json.dumps({"type": "FeatureCollection", "features": feats}, ensure_ascii=False,
                              separators=(",", ":")), encoding="utf-8")
    return out.stat().st_size, len(feats)


if __name__ == "__main__":
    print("countries", build(SRC10, OUT / "countries.geojson", 25, 0.0001))
    print("countries_low", build(SRC50, OUT / "countries_low.geojson", 30, 0.001))
    print("country_labels", labels(SRC10, OUT / "country_labels.geojson"))
