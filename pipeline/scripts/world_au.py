"""Australia: Wine Australia Geographical Indications (zones, regions, subregions). CC BY 4.0.

Input : raw/wineaus/gi_layer{0,1,2}.geojson, downloaded from the Wine Australia open data hub
        FeatureServer https://services6.arcgis.com/s8j6JbJJCqmhNgh7/arcgis/rest/services/
        Wine_Geographical_Indications_Australia/FeatureServer/{0,1,2}/query?where=1=1&outFields=*
        &outSR=4326&f=geojson   (0 = subregions, 1 = regions, 2 = zones)
Output: site/data/geo/au.geojson
Run   : python3 -I scripts/world_au.py
"""
import json
import sys

sys.path.insert(0, "/home/claude/winesite/scripts")
from world_common import IdMaker, finalize, size_interval, fix, RAW, WORK  # noqa: E402
from shapely.geometry import shape, Polygon  # noqa: E402
from shapely.ops import unary_union  # noqa: E402

LAYERS = [(2, "Zone"), (1, "Region"), (0, "Subregion")]
RANK = {"Super zone": 0, "Zone": 1, "Region": 2, "Subregion": 3}
STATE_GI = {"NSW": "New South Wales", "VIC": "Victoria", "SA": "South Australia", "WA": "Western Australia"}
# South Eastern Australia (GI registered 1 May 1996): straight line from where the Tropic of
# Capricorn meets the east coast, to Cameron Corner, to Ceduna and on to the coast of the Bight;
# everything south and east of it. Clip polygon below follows that text (coords WGS84).
TROPIC = -23.4365
SEA_CLIP = [(155.0, TROPIC), (150.70, TROPIC), (140.9993, -28.9986), (133.6766, -32.1257),
            (132.2121, -32.7511), (132.2121, -46.0), (160.0, -46.0), (160.0, TROPIC)]
NAME_FIX = {
    "Mclaren Vale": "McLaren Vale",
    "Eastern Plains, Inland And North Of Western Australia": "Eastern Plains, Inland and North of Western Australia",
}


def fmt_alt(p):
    lo, hi = p.get("ALTITUDE_LOW"), p.get("ALTITUDE_HIGH")
    return f"{lo}-{hi}" if lo is not None and hi is not None else None


def main():
    log = []
    mk = IdMaker("au")
    items = []
    seen_names = {}
    for layer, subcat in LAYERS:
        fc = json.load(open(f"{RAW}/wineaus/gi_layer{layer}.geojson", encoding="utf-8"))
        for f in fc["features"]:
            p = f["properties"]
            name = NAME_FIX.get(p["GI_NAME"].strip(), p["GI_NAME"].strip())
            geom = fix(shape(f["geometry"]))
            # Tasmania is registered as a State, Zone and Region GI with one boundary (GI 33):
            # keep a single feature (the region) and note the other roles.
            if name in seen_names and seen_names[name]["reg"].get("gi_no") == p["GI_NUMBER"]:
                seen_names[name]["reg"]["also"] = f"{seen_names[name]['subcat']} GI"
                seen_names[name]["subcat"] = subcat
                log.append(f"merged duplicate {subcat} '{name}' into existing feature")
                continue
            reg = {
                "gi_no": p.get("GI_NUMBER"),
                "registered": p.get("YEAR_REGISTER") or p.get("YEAR_REGISTERED"),
                "state": p.get("STATE"),
                "vine_ha": p.get("VINE_AREA_HA"),
                "alt_m": fmt_alt(p),
                "gdd": p.get("GROW_DEGREE_DAYS_OCT_APR"),
                "gs_rain_mm": p.get("GROW_SEASON_RAIN_OCT_APR"),
                "jan_c": p.get("MEAN_JAN_TEMP"),
                "crush_t": p.get("AVE_CRUSH"),
                "crush_yrs": p.get("AVE_CRUSH_PERIOD") if p.get("AVE_CRUSH") is not None else None,
            }
            reg = {k: v for k, v in reg.items() if v is not None and v != ""}
            it = {"id": mk(name), "name": name, "cat": "GI", "subcat": subcat, "src": "wineaus",
                  "bq": "official", "reg": reg, "geom": geom, "rank": RANK[subcat], "_state": p.get("STATE")}
            items.append(it)
            seen_names[name] = it
    # Tasmania keeps subcat Region (rank of a region, so its own sub-areas could nest);
    # it is also the State and Zone GI. Queensland zone is also the State GI.
    if "Tasmania" in seen_names:
        seen_names["Tasmania"]["reg"]["also"] = "State and Zone GI"
        seen_names["Tasmania"]["rank"] = RANK["Region"]
    if "Queensland" in seen_names:
        seen_names["Queensland"]["reg"]["also"] = "State GI"
    # State GIs = union of their zones (zones tile each state completely).
    zones = [i for i in items if i["subcat"] == "Zone" or i["name"] == "Tasmania"]
    supers = []
    for st, nm in STATE_GI.items():
        u = fix(unary_union([z["geom"] for z in zones if z["_state"] == st]).buffer(0))
        supers.append({"id": mk(nm), "name": nm, "cat": "GI", "subcat": "Super zone", "src": "wineaus",
                       "bq": "official", "rank": 0,
                       "reg": {"type": "State GI", "state": st, "note": "union of the state's zone GIs"},
                       "geom": u})
    land = unary_union([z["geom"] for z in zones if z["_state"] in ("NSW", "VIC", "TAS", "SA", "QLD")])
    sea = fix(land.intersection(Polygon(SEA_CLIP)).buffer(0))
    supers.append({"id": mk("South Eastern Australia"), "name": "South Eastern Australia", "cat": "GI",
                   "subcat": "Super zone", "src": "wineaus", "bq": "official", "rank": -1,
                   "reg": {"registered": 1996, "type": "Super zone",
                           "note": "built from the registered text: line Tropic of Capricorn coast, Cameron Corner, Ceduna"},
                   "geom": sea})
    items = supers + items
    for i in items:
        i.pop("_state", None)
    log.append("State GIs NSW, Victoria, South Australia, Western Australia built as the union of their zones; "
               "South Eastern Australia built by clipping NSW+VIC+TAS+SA+QLD zones with the line in the registered "
               "description. Northern Territory and ACT state GIs not built (no zone boundaries).")
    log.append(f"features: {len(items)} (" + ", ".join(
        f"{s}: {sum(1 for i in items if i['subcat']==s)}" for s in RANK) + ")")
    interval = size_interval(base_m=40, ref_km2=1000, power=0.75, min_m=8, max_m=4000)
    path, nbytes, n = finalize("au", items, interval, max_bytes=2_000_000, log=log)
    log.append(f"wrote {path}: {n} features, {nbytes/1e6:.2f} MB")
    for it in items:
        log.append(f"  {it['subcat']:9s} {it['id']:45s} parent={it['parent']}")
    open(f"{WORK}/au_log.txt", "w").write("\n".join(log))
    print("\n".join(log))


if __name__ == "__main__":
    main()
