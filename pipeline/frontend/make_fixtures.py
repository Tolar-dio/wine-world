#!/usr/bin/env python3
"""Temporary test fixtures for the front end, written to work/fe_fixtures/ (never site/).

Only fills files that site/ does not have yet (content/{iso}.json, content/global/*, sites,
regions, varieties), so the page can be exercised before research content lands. The text is
placeholder-quality test copy, marked FIXTURE in meta.
Run: python3 -I /home/claude/winesite/frontend/make_fixtures.py
"""
import json
import shutil
from pathlib import Path

from shapely.geometry import shape, mapping
from shapely.ops import unary_union

ROOT = Path("/home/claude/winesite")
SITE = ROOT / "site"
FIX = ROOT / "work" / "fe_fixtures"
if FIX.exists():
    for p in FIX.rglob("*"):
        if p.is_file() and p.name != "index.html":
            p.unlink()
FIX.mkdir(parents=True, exist_ok=True)


def w(rel, obj):
    if (SITE / rel).exists() and (SITE / rel).stat().st_size > 50:
        return False
    p = FIX / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(obj, ensure_ascii=False), encoding="utf-8")
    return True


def feats(iso):
    p = SITE / "data/geo" / f"{iso}.geojson"
    return json.loads(p.read_text())["features"] if p.exists() else []


idx = json.loads((SITE / "data/geo/_index.json").read_text())
byid = {a["id"]: a for a in idx}
FR, IT = feats("fr"), feats("it")
G = {f["properties"]["id"]: f for f in FR + IT}

# ---------- regions: union of member appellations
REG = {
    "region-fr-burgundy": ("Burgundy", "fr", ["fr-chablis", "fr-gevrey-chambertin", "fr-vosne-romanee", "fr-meursault", "fr-pommard", "fr-volnay", "fr-chambolle-musigny", "fr-nuits-saint-georges", "fr-beaune", "fr-puligny-montrachet", "fr-chassagne-montrachet", "fr-macon", "fr-pouilly-fuisse", "fr-mercurey", "fr-givry", "fr-rully"]),
    "region-fr-rhone": ("Rhône Valley", "fr", ["fr-chateauneuf-du-pape", "fr-cote-rotie", "fr-hermitage", "fr-crozes-hermitage", "fr-gigondas", "fr-vacqueyras", "fr-cornas", "fr-saint-joseph", "fr-condrieu", "fr-lirac", "fr-tavel", "fr-rasteau", "fr-vinsobres"]),
    "region-it-piemonte": ("Piedmont", "it", ["it-barolo", "it-barbaresco", "it-langhe", "it-roero", "it-barbera-d-asti", "it-asti", "it-gavi", "it-dogliani", "it-nizza", "it-ghemme", "it-gattinara"]),
}
rf, regions_content = [], {"fr": [], "it": []}
for rid, (name, iso, ids) in REG.items():
    ids = [i for i in ids if i in G]
    if not ids:
        continue
    u = unary_union([shape(G[i]["geometry"]).buffer(0) for i in ids]).simplify(0.004)
    pt = u.representative_point()
    rf.append({"type": "Feature", "properties": {"id": rid, "name": name, "country": iso, "lp": [round(pt.x, 4), round(pt.y, 4)], "bbox": [round(v, 4) for v in u.bounds]}, "geometry": mapping(u)})
    regions_content[iso].append({"id": rid, "country": iso, "name": name, "alt": ["Bourgogne"] if iso == "fr" and "Burg" in name else [], "parent_region": None,
                                 "lat": round(pt.y, 4), "lon": round(pt.x, 4), "zoom": 8,
                                 "tagline": "A fixture region used to test the region profile.",
                                 "summary": f"{name} is a fixture entry. The real profile arrives with the research content.\n\nIts outline is the union of {len(ids)} member appellations.",
                                 "terroir": "Fixture text for terroir.", "appellations": [byid[i]["name"] for i in ids if i in byid], "app_ids": ids, "sources": [{"title": "Fixture", "url": "https://example.org"}]})
print("regions", w("data/geo/_regions.geojson", {"type": "FeatureCollection", "features": rf}))

# ---------- sites
SITES = [
    ("site-fr-chambertin", "fr", "Chambertin", "grand_cru", "Grand Cru (AOC 1937)", "fr-chambertin", 47.2135, 4.9645),
    ("site-fr-clos-de-beze", "fr", "Chambertin-Clos de Bèze", "grand_cru", "Grand Cru", "fr-chambertin-clos-de-beze", 47.2168, 4.9637),
    ("site-fr-romanee-conti", "fr", "La Romanée-Conti", "grand_cru", "Grand Cru (monopole)", "fr-romanee-conti", 47.1585, 4.9592),
    ("site-fr-chateau-rayas", "fr", "Château Rayas", "chateau", "Estate", "fr-chateauneuf-du-pape", 44.0828, 4.8647),
    ("site-fr-chateau-des-papes", "fr", "Château des Papes (ruins)", "historic", "Historic site", "fr-chateauneuf-du-pape", 44.0561, 4.8318),
    ("site-it-cannubi", "it", "Cannubi", "mga", "MGA, Barolo", "it-barolo", 44.6118, 7.9395),
    ("site-it-brunate", "it", "Brunate", "mga", "MGA, La Morra", "it-barolo", 44.6247, 7.9348),
    ("site-it-rabaja", "it", "Rabajà", "mga", "MGA, Barbaresco", "it-barbaresco", 44.7253, 8.0705),
    ("site-it-museo-wimu", "it", "WiMu, Barolo castle", "museum", "Wine museum", "it-barolo", 44.6104, 7.9431),
]
sf, sites_content = [], {"fr": [], "it": []}
for sid, iso, name, kind, cls, app, lat, lon in SITES:
    sf.append({"type": "Feature", "properties": {"id": sid, "name": name, "kind": kind, "country": iso, "class": cls, "app": app if app in byid else None, "cq": "precise"}, "geometry": {"type": "Point", "coordinates": [lon, lat]}})
    sites_content[iso].append({"id": sid, "country": iso, "name": name, "kind": kind, "class": cls, "appellation": byid.get(app, {}).get("name"), "app": app, "lat": lat, "lon": lon, "coord_quality": "precise",
                               "text": f"{name} is a fixture site. The real note will tell you which slope it faces and why it matters.", "producers": ["Fixture Producer"]})
print("sites", w("data/geo/_sites.geojson", {"type": "FeatureCollection", "features": sf}))

# ---------- content
LOREM = ("This is fixture copy, written only so the front end can be tested before the research content lands. "
         "It runs long enough to show how *italic terms* and paragraphs render, and how the measure feels on a phone.")
prof = {}
for aid in ["fr-chateauneuf-du-pape", "fr-gevrey-chambertin", "fr-chambertin", "it-barolo", "it-barbaresco"]:
    if aid not in byid:
        continue
    a = byid[aid]
    prof[aid] = {"name": a["name"], "cat": a["cat"], "region": "Fixture", "created": "1936", "area_ha": 3200 if "chateauneuf" in aid else 500,
                 "styles": ["red", "white"], "dominant_style": "red", "grapes": "Grenache leads, with Syrah and Mourvèdre." if "fr-ch" in aid else "Nebbiolo.",
                 "summary": LOREM + "\n\n" + LOREM, "terroir": LOREM, "producers": ["Producer One", "Producer Two", "Producer Three"],
                 "nerd_note": "A fixture nerd note: a single specific detail a sommelier would love.", "contains": []}
for iso, name, tag in [("fr", "France", "The country that wrote the rules most others copied."), ("it", "Italy", "Every region, every hillside, its own grape.")]:
    c = {"country": {"id": iso, "iso2": iso, "name": name, "tier": "major", "tagline": tag,
                     "stats": {"vineyard_ha": 780000 if iso == "fr" else 718000, "production_mhl": 36.1 if iso == "fr" else 44.1, "year": 2025, "world_rank_production": 2 if iso == "fr" else 1, "note": "Fixture figures"},
                     "overview": "\n\n".join([LOREM] * 3),
                     "history": [{"when": "c. 600 BC", "title": "Greeks found Massalia", "text": "Fixture history entry.", "lat": 43.3, "lon": 5.37},
                                 {"when": "1855", "title": "The Bordeaux classification", "text": "Fixture history entry.", "lat": 44.84, "lon": -0.58},
                                 {"when": "1935", "title": "The AOC law", "text": "Fixture history entry.", "lat": 48.86, "lon": 2.35}] if iso == "fr" else
                                [{"when": "1966", "title": "The first DOCs", "text": "Fixture history entry.", "lat": 41.9, "lon": 12.5}],
                     "classification": LOREM, "climate_soils": LOREM,
                     "grapes": [{"name": "Pinot Noir", "note": "Burgundy's red."}, {"name": "Grenache", "note": "The southern Rhône."}] if iso == "fr" else [{"name": "Nebbiolo", "note": "Piedmont."}, {"name": "Sangiovese", "note": "Tuscany."}],
                     "regions": [r["name"] for r in regions_content[iso]], "further_reading": ["The Wine Atlas of the World, Johnson and Robinson"], "sources": [{"title": "Fixture source", "url": "https://example.org"}]},
         "regions": regions_content[iso], "profiles": {k: v for k, v in prof.items() if k.startswith(iso + "-")}, "sites": sites_content[iso]}
    print(iso, w(f"data/content/{iso}.json", c))

# ---------- globals
grapes = [
    {"id": "pinot-noir", "name": "Pinot Noir", "color": "noir", "synonyms": ["Spätburgunder", "Pinot Nero", "Blauburgunder"], "origin": {"lat": 47.05, "lon": 4.83, "place": "Burgundy", "country": "France"},
     "parents": ["Traminer?"], "offspring": ["Chardonnay", "Gamay", "Aligoté"], "profile": LOREM + "\n\n" + LOREM, "trivia": ["Fixture trivia line."], "countries": ["fr", "de", "us"], "regions": ["Burgundy", "Oregon"]},
    {"id": "nebbiolo", "name": "Nebbiolo", "color": "noir", "synonyms": ["Spanna", "Chiavennasca"], "origin": {"lat": 44.7, "lon": 8.0, "place": "Piedmont", "country": "Italy"}, "parents": [], "offspring": ["Freisa"], "profile": LOREM},
    {"id": "grenache", "name": "Grenache", "color": "noir", "synonyms": ["Garnacha", "Cannonau"], "origin": {"lat": 41.6, "lon": -0.9, "place": "Aragón", "country": "Spain"}, "parents": [], "offspring": [], "profile": LOREM},
    {"id": "chardonnay", "name": "Chardonnay", "color": "blanc", "synonyms": ["Morillon"], "origin": {"lat": 46.4, "lon": 4.8, "place": "Burgundy", "country": "France"}, "parents": ["Pinot Noir", "Gouais Blanc"], "offspring": [], "profile": LOREM},
    {"id": "syrah", "name": "Syrah", "color": "noir", "synonyms": ["Shiraz"], "origin": {"lat": 45.1, "lon": 4.8, "place": "Northern Rhône", "country": "France"}, "parents": ["Dureza", "Mondeuse Blanche"], "offspring": [], "profile": LOREM},
]
print("grapes", w("data/content/global/grapes.json", {"grapes": grapes}))
var = {"pinot-noir": [], "nebbiolo": [], "grenache": [], "chardonnay": [], "syrah": []}
for f in FR + IT + feats("de") + feats("at") + feats("es"):
    vs = " ".join(f["properties"].get("varieties") or []).lower()
    pid = f["properties"]["id"]
    if "pinot noir" in vs or "pinot nero" in vs or "spätburgunder" in vs: var["pinot-noir"].append(pid)
    if "nebbiolo" in vs: var["nebbiolo"].append(pid)
    if "grenache" in vs or "garnacha" in vs: var["grenache"].append(pid)
    if "chardonnay" in vs: var["chardonnay"].append(pid)
    if "syrah" in vs: var["syrah"].append(pid)
print("varieties", w("data/geo/_varieties.json", var), {k: len(v) for k, v in var.items()})
tl = {"events": [
    {"id": "event-areni-1", "year": -4100, "when": "c. 4100 BC", "title": "Areni-1 cave winery", "place": "Vayots Dzor, Armenia", "lat": 39.73, "lon": 45.2, "text": LOREM},
    {"id": "event-shulaveri", "year": -6000, "when": "c. 6000 BC", "title": "Wine residue in Georgian jars", "place": "Gadachrili Gora, Georgia", "lat": 41.39, "lon": 44.83, "text": LOREM},
    {"id": "event-massalia", "year": -600, "when": "c. 600 BC", "title": "Greeks found Massalia", "place": "Marseille, France", "lat": 43.3, "lon": 5.37, "text": LOREM},
    {"id": "event-cistercians", "year": 1098, "when": "1098", "title": "The Cistercians reach Cîteaux", "place": "Burgundy", "lat": 47.13, "lon": 5.09, "text": LOREM},
    {"id": "event-tokaj-1730", "year": 1730, "when": "1730", "title": "Tokaj classifies its vineyards", "place": "Tokaj, Hungary", "lat": 48.12, "lon": 21.41, "text": LOREM},
    {"id": "event-1855", "year": 1855, "when": "1855", "title": "The Bordeaux classification", "place": "Bordeaux", "lat": 44.84, "lon": -0.58, "text": LOREM},
    {"id": "event-phylloxera", "year": 1863, "when": "1863", "title": "Phylloxera found in the Rhône", "place": "Pujaut, Gard", "lat": 43.99, "lon": 4.78, "text": LOREM},
    {"id": "event-judgment", "year": 1976, "when": "1976", "title": "The Judgment of Paris", "place": "Paris", "lat": 48.87, "lon": 2.3, "text": LOREM},
    {"id": "event-unesco-climats", "year": 2015, "when": "2015", "title": "Burgundy's climats join UNESCO", "place": "Côte d'Or", "lat": 47.1, "lon": 4.85, "text": LOREM}]}
print("timeline", w("data/content/global/timeline.json", tl))
print("glossary", w("data/content/global/glossary.json", {"terms": [
    {"term": "Climat", "lang": "French", "def": "A named vineyard plot in Burgundy with its own soil and exposure. Fixture."},
    {"term": "Bâtonnage", "lang": "French", "def": "Stirring the lees in barrel. Fixture."},
    {"term": "Sorì", "lang": "Piedmontese", "def": "A south-facing slope where the snow melts first. Fixture."},
    {"term": "Assemblage", "lang": "French", "def": "Blending. Fixture.", "see": ["Climat"]}]}))
print("soils", w("data/content/global/soils.json", {"soils": [
    {"name": "Galets roulés", "text": "Rounded quartzite stones. Fixture.", "wine": "Store heat and reflect light.", "examples": [{"name": "Châteauneuf-du-Pape", "app": "fr-chateauneuf-du-pape"}]},
    {"name": "Kimmeridgian marl", "text": "Fixture.", "wine": "Saline, taut Chablis.", "examples": [{"name": "Chablis", "lat": 47.81, "lon": 3.8}]}]}))
print("systems", w("data/content/global/systems.json", {"systems": [
    {"name": "France: AOC", "country": "fr", "text": "Fixture system text.", "tiers": [{"name": "AOC/AOP", "note": "Place-based"}, {"name": "IGP", "note": "Regional"}, {"name": "Vin de France", "note": "No place"}]},
    {"name": "Italy: DOCG", "country": "it", "text": "Fixture.", "tiers": ["DOCG", "DOC", "IGT", "Vino"]}]}))
