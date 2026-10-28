"""Check that every PT site point falls inside (or within a small tolerance of) its stated appellation polygon,
using the EU PDO geometries (raw/eupdo). Usage: python3 -I check_sites.py work/pt/p2_douro.json [...]"""
import csv, json, sys, unicodedata, re
import geopandas as gpd
from shapely.geometry import Point

RAW = "/home/claude/winesite/raw/eupdo/"

def norm(s):
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c)).lower()
    return re.sub(r"[^a-z0-9]+", " ", s.replace("’", " ")).strip()

ids = {}
for r in csv.DictReader(open(RAW + "PDO_EU_id.csv", encoding="utf-8-sig", errors="replace")):
    if r["Country"] == "PT":
        for part in r["PDOnam"].split(" / "):
            ids.setdefault(norm(part), r["PDOid"])
g = gpd.read_file(RAW + "EU_PDO.gpkg")
g = g[g["PDOid"].str.startswith("PDO-PT")].to_crs(4326).set_index("PDOid")
# geometric containment index for reporting which PDOs a point is in
names_by_id = {}
for k, v in ids.items():
    names_by_id.setdefault(v, k)

# appellations that are subregions/IGPs: check against their parent DOP
PARENT = {"moscatel do douro": "douro", "baixo corgo": "douro", "cima corgo": "douro", "douro superior": "douro",
          "duriense": "douro", "moscatel de setubal": "setubal", "moscatel roxo": "setubal"}

IGPS = {norm(x) for x in ["Minho", "Transmontano", "Duriense", "Terras de Cister", "Terras do Dão", "Terras da Beira", "Beira Atlântico",
        "Lisboa", "Tejo", "Península de Setúbal", "Alentejano", "Algarve", "Açores", "Terras Madeirenses"]}
bad = 0
for path in sys.argv[1:]:
    d = json.load(open(path, encoding="utf-8"))
    for s in d.get("sites", []):
        if s.get("country") != "pt":
            continue
        app = s.get("appellation")
        pt = Point(s["lon"], s["lat"])
        inside = [names_by_id[i] for i, geom in g.geometry.items() if geom.contains(pt)]
        if not app:
            print(f"NOAPP {s['name']}: in {inside}")
            continue
        if norm(app) in IGPS:
            print(f"IGP {s['name']}: {app}; inside PDOs {inside}")
            continue
        key = PARENT.get(norm(app), norm(app))
        pid = ids.get(key)
        if not pid:
            print(f"UNKNOWN-APP {s['name']}: '{app}'")
            bad += 1
            continue
        geom = g.geometry[pid]
        if geom.contains(pt):
            continue
        # Port lodges in Vila Nova de Gaia / Porto city lie outside the Douro demarcation by law (entreposto)
        if key == "porto" and 41.12 <= s["lat"] <= 41.16 and -8.64 <= s["lon"] <= -8.59:
            print(f"GAIA-OK {s['name']}")
            continue
        dist_km = geom.distance(pt) * 111
        flag = "NEAR" if dist_km < 1.5 else "OUT"
        if flag == "OUT":
            bad += 1
        print(f"{flag} {s['name']} ({s['lat']},{s['lon']}) not in {app}; {dist_km:.1f} km away; inside {inside}")
print("problems:", bad)
