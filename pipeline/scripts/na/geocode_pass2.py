"""Second geocoding pass with alternate query strings for misses. Writes work/na/geocode_cache2.json"""
import json, os, subprocess, time, urllib.parse
OUT = "/home/claude/winesite/work/na/geocode_cache2.json"
Q = {
 "chateau-montelena": ["Chateau Montelena", "Montelena, Calistoga"],
 "opus-one": ["Opus One", "Opus One Winery"],
 "dominus": ["Dominus Estate", "Dominus Winery"],
 "diamond-creek": ["Diamond Creek Vineyards", "Diamond Mountain Road, Calistoga"],
 "charles-krug": ["Charles Krug", "Charles Krug Winery"],
 "harlan": ["Harlan Estate"],
 "screaming-eagle": ["Screaming Eagle Winery"],
 "heitz": ["Heitz Cellar", "Heitz Wine Cellars"],
 "heitz-marthas": ["Martha's Vineyard, Oakville", "Heitz Martha's Vineyard"],
 "mayacamas": ["Mayacamas Vineyards", "Lokoya Road, Napa"],
 "hanzell": ["Hanzell Vineyards", "Hanzell"],
 "kistler": ["Kistler Vineyards", "Kistler"],
 "ridge-monte-bello": ["Ridge Vineyards", "Monte Bello Road"],
 "ridge-lytton-springs": ["Ridge Lytton Springs", "Lytton Springs Road, Healdsburg"],
 "calera": ["Calera Wine Company", "Calera Winery"],
 "bien-nacido": ["Bien Nacido Vineyards", "Bien Nacido"],
 "wente": ["Wente Vineyards", "Wente Vineyards Estate Winery"],
 "concannon": ["Concannon Vineyard", "Concannon"],
 "sobon": ["Sobon Estate", "Sobon Winery"],
 "mission-san-gabriel": ["Mission San Gabriel", "San Gabriel Mission"],
 "tablas-creek": ["Tablas Creek Vineyard", "Tablas Creek"],
 "hirsch": ["Hirsch Vineyards", "Hirsch Winery"],
 "eyrie": ["Eyrie Vineyards", "The Eyrie Vineyards"],
 "domaine-drouhin": ["Domaine Drouhin", "Domaine Drouhin Oregon"],
 "leonetti": ["Leonetti Cellar"],
 "quilceda-creek": ["Quilceda Creek"],
 "ciel-du-cheval": ["Ciel du Cheval"],
 "champoux": ["Champoux Vineyard"],
 "wiemer": ["Hermann J. Wiemer", "Wiemer Vineyard"],
 "castello-di-borghese": ["Castello di Borghese"],
 "monticello": ["Monticello", "Thomas Jefferson's Monticello"],
 "munson": ["Munson Vineyard", "T. V. Munson Memorial Vineyard"],
 "mother-vine": ["Mother Vine", "Mother Vineyard, Manteo"],
 "mauiwine": ["MauiWine", "Tedeschi Vineyards", "Ulupalakua Ranch"],
 "vin-villa": ["Vin Villa", "Pelee Island"],
 "norman-hardie": ["Norman Hardie", "Hardie Winery"],
 "pandosy": ["Pandosy Mission", "Father Pandosy Mission Heritage Site"],
 "mission-hill": ["Mission Hill Family Estate", "Mission Hill Winery"],
 "nkmip": ["Nk'Mip Cellars", "Nkmip Cellars", "Spirit Ridge"],
 "cotes-dardoise": ["Côtes d'Ardoise", "Domaine des Côtes d'Ardoise"],
 "casa-de-piedra": ["Casa de Piedra, Ensenada", "Vinos Casa de Piedra"],
 "museo-vid": ["Museo de la Vid y el Vino", "Museo de la Vid"],
 "santo-tomas": ["Bodegas de Santo Tomás", "Santo Tomás winery Ensenada", "Santo Tomas, Ensenada"],
 "dolores-parroquia": ["Parroquia de Dolores Hidalgo", "Dolores Hidalgo Cuna de la Independencia Nacional"],
 "domecq-mx": ["Domecq, Valle de Guadalupe", "Casa Pedro Domecq"],
 "pisoni": ["Pisoni Vineyards"],
 "monte-rosso": ["Monte Rosso Vineyard", "Moon Mountain Road, Sonoma"],
 "trefethen": ["Trefethen Family Vineyards", "Trefethen"],
 "hargrave": ["Castello di Borghese", "Cutchogue"],
 "sokol-blosser": ["Sokol Blosser"],
 "hillcrest": ["HillCrest Vineyard", "Hillcrest Vineyard, Roseburg"],
 "ste-chapelle": ["Ste. Chapelle", "Ste Chapelle Winery"],
 "jaeger-neosho": ["Neosho, Missouri"],
 "to-kalon": ["To Kalon", "To-Kalon Vineyard"],
 "sanford-benedict": ["Sanford & Benedict Vineyard", "Sanford Winery", "Santa Rosa Road, Lompoc"],
 "stag-leap-fay": ["Stags Leap District", "Silverado Trail Stags Leap"],
 "cuna-tierra": ["Cuna de Tierra"],
 "hacienda-sl": ["Hacienda San Lorenzo, Parras"],
 "jordan-on": ["Jordan, Lincoln, Ontario"],
 "tawse": ["Tawse Winery"],
 "closson-chase": ["Closson Chase"],
 "burrowing-owl": ["Burrowing Owl Estate Winery"],
 "blue-mountain": ["Blue Mountain Vineyard and Cellars"],
 "painted-rock": ["Painted Rock Estate Winery"],
 "lacadie": ["L'Acadie Vineyards"],
 "luckett": ["Luckett Vineyards"],
 "domaine-pinnacle": ["Domaine Pinnacle"],
 "chateau-camou": ["Château Camou", "Chateau Camou"],
 "adobe-guadalupe": ["Adobe Guadalupe"],
 "vena-cava": ["Vena Cava, Valle de Guadalupe"],
 "bruma": ["Bruma, Valle de Guadalupe"],
 "vinedos-azteca": ["Viñedos Azteca"],
 "vinicola-toyan": ["Toyan"],
 "hacienda-guadalupe": ["Hacienda Guadalupe"],
 "lagunitas-ch": ["Bodega Los Cedros"],
}
cache = json.load(open(OUT)) if os.path.exists(OUT) else {}
for k, qs in Q.items():
    if k in cache and cache[k].get("res"):
        continue
    best = None
    for q in qs:
        url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({"q": q, "format": "json", "limit": 3, "countrycodes": "us,ca,mx"})
        r = subprocess.run(["curl", "-sS", "-m", "30", "-A", "VitisMundiAtlas/1.0 (research)", url], capture_output=True, text=True)
        time.sleep(1.1)
        try:
            res = json.loads(r.stdout)
        except Exception:
            res = []
        if res:
            best = {"q": q, "res": [{"lat": float(x["lat"]), "lon": float(x["lon"]), "name": x.get("display_name", "")[:140], "type": x.get("type")} for x in res]}
            break
    cache[k] = best or {"q": qs, "res": []}
    json.dump(cache, open(OUT, "w"), indent=1, ensure_ascii=False)
print(len(cache), sum(1 for v in cache.values() if v["res"]))
