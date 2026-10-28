"""South Africa: Wine of Origin (WO) scheme units, all six levels.

Source: "WINE OF ORIGIN SYSTEM 20260626", public ArcGIS Online feature service published by VinPro
(item d038d5ed1b9e4e54b86be7da14cf97fb, "maintained by VinPro in collaboration with SAWIS",
boundaries as gazetted by the Wine and Spirits Board):
https://services-eu1.arcgis.com/u4YTgbzxcollBKYL/arcgis/rest/services/WINE_OF_ORIGIN_SYSTEM_20260626/FeatureServer
layers 1 Wards, 2 Districts, 3 SubRegions, 4 Regions, 5 OverarchingRegions, 6 GeographicalUnits
(downloaded to raw/za_wo/wo_{1..6}.geojson). No licence stated on the item: attribute VinPro/SAWIS.
Run: python3 -I scripts/world_za.py
"""
import json
import sys

sys.path.insert(0, "/home/claude/winesite/scripts")
from world_common import IdMaker, finalize, size_interval, fix, RAW, WORK  # noqa: E402
from shapely.geometry import shape  # noqa: E402

# layer, subcat, name field, afrikaans field, rank
LAYERS = [(6, "Geographical Unit", "PROVNAME", "naam", 0), (5, "Overarching region", "Region", "Streek", 1),
          (4, "Region", "Region", "Streek", 2), (3, "Subregion", "REGION", "STREEK", 3),
          (2, "District", "District", "Distrik", 4), (1, "Ward", "Ward", "Wyk", 5)]
WARD_DISTRICT_FIX = {"Stilbay": "Still Bay"}


def main():
    log = []
    mk = IdMaker("za")
    items = []
    ids = {}
    for layer, subcat, nf, af, rank in LAYERS:
        for f in json.load(open(f"{RAW}/za_wo/wo_{layer}.geojson", encoding="utf-8"))["features"]:
            p = f["properties"]
            name = p[nf].strip()
            afr = (p.get(af) or "").strip()
            alt = [afr] if afr and afr != name and afr.lower() not in ("geen", "none") else None
            reg = {}
            if layer == 1:
                reg["ha"] = round(p["Area_ha"]) if p.get("Area_ha") else None
            parent_name = None
            if layer == 1 and p.get("District") not in (None, "None"):
                parent_name = ("District", WARD_DISTRICT_FIX.get(p["District"], p["District"]))
            elif layer == 2 and p.get("Region") not in (None, "None"):
                parent_name = ("Region", p["Region"])
            if layer in (1, 2) and p.get("Geographic"):
                reg["gu"] = p["Geographic"]
            reg = {k: v for k, v in reg.items() if v is not None}
            fid = mk(name)
            ids[(subcat, name)] = fid
            items.append({"id": fid, "name": name, "alt": alt, "cat": "WO", "subcat": subcat, "src": "vinpro",
                          "bq": "official", "reg": reg or None, "geom": fix(shape(f["geometry"])), "rank": rank,
                          "_p": parent_name})
    for it in items:
        p = it.pop("_p")
        if p:
            if p in ids:
                it["parent_hints"] = [ids[p]]
            else:
                log.append(f"unresolved parent {p} for {it['name']}")
    log.append(f"features: {len(items)} (" + ", ".join(f"{s}: {sum(i['subcat']==s for i in items)}" for _, s, *_ in LAYERS) + ")")
    interval = size_interval(base_m=40, ref_km2=1000, power=0.6, min_m=10, max_m=4000)
    path, nbytes, n = finalize("za", items, interval, max_bytes=2_000_000, log=log, hint_thresh=0.6)
    log.append(f"wrote {path}: {n} features, {nbytes/1e6:.2f} MB")
    for it in items:
        if it.get("parent_hints") and it["parent"] not in it["parent_hints"]:
            log.append(f"parent {it['id']} -> {it['parent']} (register says {it['parent_hints']})")
    log += [f"  {it['subcat']:18s} {it['id']} parent={it['parent']}" for it in items]
    open(f"{WORK}/za_log.txt", "w").write("\n".join(log))
    print("\n".join(l for l in log if not l.startswith("  "))[:3000])


if __name__ == "__main__":
    main()
