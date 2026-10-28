"""Basemap: internal admin-1 boundary LINES for the main wine countries.

Run: python3 -I /home/claude/winesite/scripts/base_admin1.py
Input: raw/ne_10m/ne_10m_admin_1_states_provinces (NE 10m admin-1 polygons, v5.1)
Output: site/data/base/admin1_lines.geojson, properties {country, level}
  level 1 = region/state boundary (FR regions, IT regioni, ES comunidades, PT NUTS-like regions,
            HU/SI statistical regions; for other countries the admin-1 unit itself)
  level 2 = sub-unit boundary inside a level-1 region (FR departements, IT province, ES provincias,
            PT distritos, HU counties)
International borders and coastlines are excluded (they come from countries.geojson).
"""
import json
import subprocess
from pathlib import Path

ROOT = Path("/home/claude/winesite")
MS = str(ROOT / "work/node/node_modules/.bin/mapshaper")
SRC = ROOT / "raw/ne_10m/ne_10m_admin_1_states_provinces/ne_10m_admin_1_states_provinces.shp"
TMP = ROOT / "work/base_tmp"
OUT = ROOT / "site/data/base/admin1_lines.geojson"
TMP.mkdir(parents=True, exist_ok=True)

A3 = {"FRA": "fr", "ITA": "it", "ESP": "es", "PRT": "pt", "DEU": "de", "AUT": "at", "CHE": "ch",
      "HUN": "hu", "GRC": "gr", "USA": "us", "CAN": "ca", "AUS": "au", "NZL": "nz", "ZAF": "za",
      "ARG": "ar", "CHL": "cl", "BRA": "br", "URY": "uy", "ROU": "ro", "BGR": "bg", "MDA": "md",
      "GEO": "ge", "HRV": "hr", "SVN": "si", "SRB": "rs", "CHN": "cn", "JPN": "jp"}
TWO_LEVEL = {"FRA", "ITA", "ESP", "PRT", "HUN"}   # region field is meaningful, keep both levels
REGION_ONLY = {"SVN"}                             # 193 municipalities is too fine: regions only

flt = "[" + ",".join(f'"{k}"' for k in A3) + "].indexOf(adm0_a3) > -1"
r1 = ("r1 = " + json.dumps(sorted(TWO_LEVEL | REGION_ONLY)) +
      ".indexOf(adm0_a3) > -1 && region ? region : name")
tmp = TMP / "admin1_lines_tmp.geojson"
args = [MS, "-i", str(SRC), "encoding=utf8", "-filter", flt,
        "-each", r1,
        "-lines", "adm0_a3,r1,name", "each=cty = A.adm0_a3",
        "-filter", "TYPE == 'r1' || TYPE == 'name'",
        "-simplify", "45%", "weighted",
        "-o", str(tmp), "format=geojson", "precision=0.0001"]
r = subprocess.run(args, capture_output=True, text=True)
if r.returncode:
    raise SystemExit(r.stderr)

fc = json.loads(tmp.read_text(encoding="utf-8"))
feats = []
for f in fc["features"]:
    p = f["properties"]
    a3 = p.get("cty")
    lvl = 1 if p["TYPE"] == "r1" else 2
    if lvl == 2 and a3 in REGION_ONLY:
        continue
    if not f["geometry"]:
        continue
    feats.append({"type": "Feature", "geometry": f["geometry"],
                  "properties": {"country": A3[a3], "level": lvl}})
OUT.write_text(json.dumps({"type": "FeatureCollection", "features": feats}, separators=(",", ":")),
               encoding="utf-8")
from collections import Counter
print(OUT, OUT.stat().st_size, len(feats), Counter((f["properties"]["country"], f["properties"]["level"]) for f in feats))
