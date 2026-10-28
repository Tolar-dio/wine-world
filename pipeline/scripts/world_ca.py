"""Canada: Ontario VQA appellations (DVAs, regional and sub-appellations) and British Columbia GIs.

Ontario
  * ON_VQA_Areas (OMAFRA, credit "Ontario Wine Appellation Authority"), public ArcGIS feature service
    https://services1.arcgis.com/pbmLC0kii9WWwA29/arcgis/rest/services/ON_VQA_Areas/FeatureServer/0
    -> Niagara Peninsula, Lake Erie North Shore, Prince Edward County, South Islands sub-appellation
    (raw/ca_gi/vqa_0.geojson). OMAFRA's companion layers carry "Ontario Open Data" licence.
  * Niagara sub-appellations, Brock University Map, Data & GIS Library / Cartographic Office (L. Gasparotto,
    T. Shaw), updated July 2024, "No restrictions. Appropriate citation is requested."
    https://services.arcgis.com/3wgo1qnFL7YLB8lT/arcgis/rest/services/NiagaraSubAppellations_Updated/FeatureServer/0
    (raw/ca_gi/niagara_sub.geojson). Regional appellations Niagara-on-the-Lake and Niagara Escarpment
    are built as unions of their member sub-appellations.
British Columbia
  * No official open GIS data found (BC Data Catalogue, BC Wine Authority site have none). Used the
    public ArcGIS Online layer "S123 - Geographical Indication" (owner olitraining, 2023, "wine regions as
    defined by the BC Wine Authority"), names corrected to the BC Wine Authority list; bq "approx".
    https://services3.arcgis.com/VJAoNmKUVLefv1ve/arcgis/rest/services/Geographical_Indication/FeatureServer/0
Run: python3 -I scripts/world_ca.py
"""
import json
import sys

sys.path.insert(0, "/home/claude/winesite/scripts")
from world_common import IdMaker, finalize, size_interval, fix, RAW, WORK  # noqa: E402
from shapely.geometry import shape  # noqa: E402
from shapely.ops import unary_union  # noqa: E402

NIAGARA_NAME = {"St. Davids Bench": "St. David's Bench"}
NOTL = ["Niagara River", "Niagara Lakeshore", "Four Mile Creek", "St. David's Bench"]
ESCARPMENT = ["Short Hills Bench", "Twenty Mile Bench", "Beamsville Bench"]
BC_NAME = {"Okanagan": "Okanagan Valley", "Kootenay": "Kootenays", "Similkameen": "Similkameen Valley",
           "Naramata Beach": "Naramata Bench", "Skaha Beach": "Skaha Bench"}
BC_SUB = {"Cowichan Valley": "Vancouver Island"}
OK_SUBS = ["East Kelowna Slopes", "South Kelowna Slopes", "Naramata Bench", "Summerland Lakefront",
           "Summerland Bench", "Summerland Valleys", "Skaha Bench", "Okanagan Falls", "Golden Mile Bench",
           "Golden Mile Slopes", "Lake Country"]


def main():
    log = []
    mk = IdMaker("ca")
    items = []
    ids = {}

    def add(name, cat, subcat, src, bq, geom, rank, reg=None, alt=None, hint=None):
        fid = mk(name)
        ids[name] = fid
        items.append({"id": fid, "name": name, "alt": alt, "cat": cat, "subcat": subcat, "src": src, "bq": bq,
                      "geom": fix(geom), "rank": rank, "reg": reg, "_hint": hint})

    # Ontario
    for f in json.load(open(f"{RAW}/ca_gi/vqa_0.geojson", encoding="utf-8"))["features"]:
        n = f["properties"]["Name"].strip()
        g = shape(f["geometry"])
        if n == "South Islands Sub-Appellation":
            add("South Islands", "VQA", "Sub-appellation", "omafra", "official", g, 2,
                reg={"province": "ON", "note": "former Pelee Island DVA; sub-appellation of Lake Erie North Shore"},
                alt=["Pelee Island"], hint="Lake Erie North Shore")
        else:
            add(n, "VQA", "DVA", "omafra", "official", g, 0, reg={"province": "ON"})
    subs = {}
    for f in json.load(open(f"{RAW}/ca_gi/niagara_sub.geojson", encoding="utf-8"))["features"]:
        p = f["properties"]
        n = NIAGARA_NAME.get(p["NAME"].strip(), p["NAME"].strip())
        subs[n] = (fix(shape(f["geometry"])), p)
    add("Niagara-on-the-Lake", "VQA", "Regional appellation", "brock", "official",
        unary_union([subs[n][0] for n in NOTL]).buffer(0), 1, reg={"province": "ON", "members": ", ".join(NOTL)},
        hint="Niagara Peninsula")
    add("Niagara Escarpment", "VQA", "Regional appellation", "brock", "official",
        unary_union([subs[n][0] for n in ESCARPMENT]).buffer(0), 1,
        reg={"province": "ON", "members": ", ".join(ESCARPMENT)}, hint="Niagara Peninsula")
    for n, (g, p) in subs.items():
        reg = {"province": "ON", "gdd": p.get("GROW_DEG_D"), "frost_free_days": p.get("AVG_FROST_"),
               "july_c": p.get("JULY_MEAN_"), "precip_mm": p.get("AVG_PRECIP")}
        reg = {k: v for k, v in reg.items() if v not in (None, "", 0)}
        hint = "Niagara-on-the-Lake" if n in NOTL else "Niagara Escarpment" if n in ESCARPMENT else "Niagara Peninsula"
        add(n, "VQA", "Sub-appellation", "brock", "official", g, 2, reg=reg, hint=hint)
    # British Columbia
    for f in json.load(open(f"{RAW}/ca_gi/bc_Geographical_Indication.geojson", encoding="utf-8"))["features"]:
        n = BC_NAME.get(f["properties"]["Name"].strip(), f["properties"]["Name"].strip())
        g = shape(f["geometry"])
        if n in OK_SUBS or n in BC_SUB:
            add(n, "GI", "Sub-GI", "agol-bcgi", "approx", g, 2, reg={"province": "BC"},
                hint=BC_SUB.get(n, "Okanagan Valley"))
        else:
            add(n, "GI", "GI", "agol-bcgi", "approx", g, 0, reg={"province": "BC"})
    # BC source digitises sub-GIs as holes in their parent GI: legally the parent includes them.
    by = {i["name"]: i for i in items}
    for parent in ("Okanagan Valley", "Vancouver Island"):
        kids = [i["geom"] for i in items if i.get("_hint") == parent and i["reg"]["province"] == "BC"]
        by[parent]["geom"] = fix(unary_union([by[parent]["geom"]] + kids).buffer(0))
    log.append("BC: sub-GI holes filled back into Okanagan Valley and Vancouver Island")
    for it in items:
        h = it.pop("_hint")
        if h:
            it["parent_hints"] = [ids[h]]
            if it["name"] == "South Islands":
                it["force_parent"] = [ids[h]]
    log.append(f"features: {len(items)} (ON {sum(i['reg']['province']=='ON' for i in items)}, "
               f"BC {sum(i['reg']['province']=='BC' for i in items)})")
    interval = size_interval(base_m=30, ref_km2=1000, power=0.5, min_m=5, max_m=1500)
    path, nbytes, n = finalize("ca", items, interval, max_bytes=1_500_000, log=log, hint_thresh=0.6)
    log.append(f"wrote {path}: {n} features, {nbytes/1e6:.2f} MB")
    log += [f"  {it['id']} {it['subcat']} parent={it['parent']} area={it['area']}" for it in items]
    open(f"{WORK}/ca_log.txt", "w").write("\n".join(log))
    print("\n".join(log))


if __name__ == "__main__":
    main()
