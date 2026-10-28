"""Fourth pass: short names inside a bounding viewbox. Writes work/na/geocode_cache4.json"""
import json, subprocess, time, urllib.parse
OUT = "/home/claude/winesite/work/na/geocode_cache4.json"
# key: (query, w, n, e, s)
Q = {
 "montelena": ("Montelena", -122.65, 38.63, -122.55, 38.56),
 "dominus": ("Dominus", -122.43, 38.44, -122.37, 38.39),
 "diamond-creek": ("Diamond Creek", -122.60, 38.59, -122.52, 38.53),
 "screaming-eagle": ("Screaming Eagle", -122.41, 38.46, -122.36, 38.42),
 "kistler": ("Kistler", -122.88, 38.50, -122.78, 38.42),
 "hirsch": ("Hirsch", -123.30, 38.60, -123.10, 38.48),
 "wente": ("Wente", -121.80, 37.70, -121.65, 37.60),
 "concannon": ("Concannon", -121.80, 37.70, -121.65, 37.60),
 "borghese": ("Borghese", -72.55, 41.06, -72.45, 40.99),
 "hillcrest": ("HillCrest", -123.50, 43.30, -123.35, 43.18),
 "ste-chapelle": ("Chapelle", -116.85, 43.65, -116.65, 43.50),
 "mother-vine": ("Mother Vineyard", -75.72, 35.96, -75.64, 35.89),
 "bechthold": ("Bechthold", -121.40, 38.20, -121.25, 38.08),
 "champoux": ("Champoux", -120.0, 46.0, -119.7, 45.8),
 "ciel": ("Ciel du Cheval", -119.50, 46.33, -119.40, 46.26),
 "san-lorenzo": ("San Lorenzo", -102.25, 25.60, -102.05, 25.40),
 "casa-madero": ("Madero", -102.25, 25.60, -102.05, 25.40),
 "pandosy": ("Pandosy", -119.50, 49.90, -119.42, 49.83),
 "eyrie-vyd": ("Eyrie", -123.12, 45.30, -123.02, 45.24),
 "hyde": ("Hyde Vineyard", -122.35, 38.30, -122.25, 38.24),
 "monte-bello": ("Monte Bello", -122.20, 37.34, -122.08, 37.27),
 "red-willow": ("Red Willow", -120.60, 46.45, -120.40, 46.30),
 "rochioli": ("Rochioli", -122.92, 38.55, -122.84, 38.49),
 "iron-horse": ("Iron Horse", -122.90, 38.45, -122.80, 38.39),
 "stony-hill": ("Stony Hill", -122.55, 38.56, -122.48, 38.51),
 "dunn": ("Dunn", -122.48, 38.60, -122.38, 38.54),
 "mondavi-lodi": ("Woodbridge", -121.36, 38.18, -121.28, 38.13),
 "korbel": ("Korbel", -123.00, 38.53, -122.92, 38.48),
 "simi": ("Simi", -122.90, 38.64, -122.84, 38.59),
 "durell": ("Durell", -122.55, 38.30, -122.45, 38.24),
 "hudson-vyd": ("Hudson", -122.35, 38.29, -122.28, 38.24),
 "jordan-wy": ("Jordan Winery", -122.85, 38.70, -122.78, 38.64),
 "fetzer": ("Fetzer", -123.25, 39.12, -123.05, 38.95),
 "sine-qua-non": ("Sine Qua Non", -119.35, 34.34, -119.20, 34.25),
}
cache = {}
for k, (q, w, n, e, s) in Q.items():
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({"q": q, "format": "json", "limit": 3, "viewbox": f"{w},{n},{e},{s}", "bounded": 1})
    r = subprocess.run(["curl", "-sS", "-m", "30", "-A", "VitisMundiAtlas/1.0 (research)", url], capture_output=True, text=True)
    time.sleep(1.1)
    try:
        res = json.loads(r.stdout)
    except Exception:
        res = []
    cache[k] = {"q": q, "res": [{"lat": float(x["lat"]), "lon": float(x["lon"]), "name": x.get("display_name", "")[:80], "type": x.get("type")} for x in res]}
json.dump(cache, open(OUT, "w"), indent=1, ensure_ascii=False)
print(" ; ".join(f"{k}:{round(v['res'][0]['lat'],4)},{round(v['res'][0]['lon'],4)},{v['res'][0]['type']},{v['res'][0]['name'][:35]}" if v["res"] else k + ":NONE" for k, v in cache.items()))
