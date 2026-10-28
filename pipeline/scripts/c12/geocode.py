import json, sys, time, urllib.request, urllib.parse
inp, outp = sys.argv[1], sys.argv[2]
qs = json.load(open(inp))
try:
    res = json.load(open(outp))
except Exception:
    res = {}
UA = "VitisMundiResearch/1.0 (tolarlocke@gmail.com)"
for key, cc, variants in qs:
    if key in res and res[key]:
        continue
    found = []
    for v in variants:
        url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({"q": v, "format": "json", "limit": 3, "countrycodes": cc})
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            d = json.load(urllib.request.urlopen(req, timeout=30))
        except Exception as e:
            d = []
        time.sleep(1.3)
        if d:
            found = [{"q": v, "lat": float(x["lat"]), "lon": float(x["lon"]), "name": x.get("name"), "type": x.get("class")+"/"+x.get("type"), "disp": x.get("display_name")[:140]} for x in d]
            break
    res[key] = found
    json.dump(res, open(outp, "w"), indent=1, ensure_ascii=False)
print("done", len(res))
