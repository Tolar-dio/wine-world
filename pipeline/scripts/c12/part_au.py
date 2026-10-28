"""Build the Australia part file: work/c12/parts/au.json."""
import json, sys
sys.path.insert(0, "/home/claude/winesite/scripts/c12")
from c12_common import save, SRC, geo_index
import au_country, au_apps_sa, au_apps_vic, au_apps_other, au_sites

attrs = {}
for L in (0, 1, 2):
    d = json.load(open(SRC + "/wa_L%d.json" % L))
    for f in d["features"]:
        a = f["attributes"]
        nm = a["GI_NAME"]
        yr = a.get("YEAR_REGISTERED") or a.get("YEAR_REGISTER")
        key = nm.lower().replace(",", "")
        attrs.setdefault(key, {})
        attrs[key].update({"year": yr, "vine_ha": a.get("VINE_AREA_HA"), "type": a.get("GI_TYPE")})

geo = geo_index("au")
STATE_REGION = {"South Australia": "South Australia", "Victoria": "Victoria", "New South Wales": "New South Wales",
                "Western Australia": "Western Australia", "Tasmania": "Tasmania", "Queensland": "Queensland",
                "Northern Territory": None, "Australian Capital Territory": "New South Wales", None: None}
EXTRA_MATCH = {"McLaren Vale": ["Mclaren Vale"],
               "Eastern Plains, Inland and North of Western Australia": ["Eastern Plains - Inland and North of Western Australia", "Eastern Plains, Inland And North Of Western Australia"],
               "Adelaide": ["Adelaide Super Zone", "Adelaide (Super Zone)"],
               "Hunter": ["Hunter Valley region"], "Tasmania": ["Tasmanian"],
               "Great Western": ["Great Western (Grampians)"], "Swan District": [], "New England Australia": ["New England"]}

apps = []
for a in au_apps_sa.A + au_apps_vic.A + au_apps_other.A:
    nm = a["name"]
    at = attrs.get(nm.lower().replace(",", ""), {})
    sub = a["sub"]
    cat = "GI"
    rec = {"country": "au", "name": nm, "match": [nm] + EXTRA_MATCH.get(nm, []), "cat": cat,
           "subcat": {"State": "State GI", "Super zone": "Super zone", "National": "National GI"}.get(sub, sub),
           "region": STATE_REGION.get(a.get("state")) or ("Tasmania" if nm == "Tasmania" else None),
           "subregion": a.get("zone") if a.get("zone") and a.get("zone") != nm else None}
    if at.get("year"):
        rec["created"] = str(at["year"])
    if at.get("vine_ha"):
        rec["area_ha"] = at["vine_ha"]
    rec.update({"styles": a["styles"], "dominant_style": a["dom"], "grapes": a["grapes"], "summary": a["summary"]})
    if a.get("terroir"):
        rec["terroir"] = a["terroir"]
    if a.get("producers"):
        rec["producers"] = a["producers"]
    if a.get("nerd"):
        rec["nerd_note"] = a["nerd"]
    if a.get("contains"):
        rec["contains"] = a["contains"]
    if nm not in geo:
        if "lat" in a:
            rec["lat"], rec["lon"] = a["lat"], a["lon"]
        else:
            print("NO POLYGON AND NO POINT:", nm)
    apps.append(rec)

names = [x["name"] for x in apps]
missing = [n for n in geo if n not in names and geo[n]["country"] == "au"]
print("geo features without content:", missing)
print("dupes:", set(n for n in names if names.count(n) > 1))
data = {"countries": [au_country.COUNTRY], "regions": au_country.REGIONS, "appellations": apps, "sites": au_sites.S}
save("au", data)
