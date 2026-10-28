import json, time, sys, os, urllib.request, urllib.parse
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from site_queries import rows
OUT = sys.argv[1]
UA = {"User-Agent": "VitisMundiResearch/1.0 (wine atlas; low volume)"}
res = json.load(open(OUT)) if os.path.exists(OUT) else {}
def nom(params):
    params = dict(params, format="jsonv2", limit=3, addressdetails=1, countrycodes="fr")
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(params)
    for a in range(3):
        try:
            return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40))
        except Exception as e:
            time.sleep(5)
    return None
def slim(r):
    if not r: return []
    return [{"lat": float(x["lat"]), "lon": float(x["lon"]), "name": x.get("name"), "type": x.get("type"), "cls": x.get("category") or x.get("class"),
             "disp": x.get("display_name","")[:160]} for x in r]
for row in rows():
    s = row["slug"]
    if s in res and res[s].get("hits") is not None: continue
    hits = nom({"q": f"{row['q']}, {row['commune']}, France"}); time.sleep(1.1)
    if not hits:
        hits = nom({"q": f"{row['q']}, {row['dept']}"}); time.sleep(1.1)
    commune = nom({"city": row["commune"], "county": row["dept"]}) if not hits else None
    if commune is not None: time.sleep(1.1)
    res[s] = {"row": row, "hits": slim(hits), "commune": slim(commune)}
    json.dump(res, open(OUT, "w"), ensure_ascii=False, indent=0)
    print(s, len(hits or []), (hits or [{}])[0].get("display_name","")[:90] if hits else ("COMMUNE " + str(len(commune or []))), flush=True)
print("DONE")
