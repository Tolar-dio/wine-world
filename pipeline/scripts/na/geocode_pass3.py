"""Third geocoding pass using street addresses. Writes work/na/geocode_cache3.json"""
import json, os, subprocess, time, urllib.parse
OUT = "/home/claude/winesite/work/na/geocode_cache3.json"
Q = {
 "chateau-montelena": "1429 Tubbs Lane, Calistoga, California",
 "opus-one": "7900 Saint Helena Highway, Oakville, California",
 "dominus": "2570 Napanook Road, Yountville, California",
 "diamond-creek": "1500 Diamond Mountain Road, Calistoga, California",
 "harlan": "1551 Oakville Grade Road, Oakville, California",
 "screaming-eagle": "Silverado Trail, Oakville, California",
 "mayacamas": "1155 Lokoya Road, Napa, California",
 "hanzell": "18596 Lomita Avenue, Sonoma, California",
 "kistler": "4707 Vine Hill Road, Sebastopol, California",
 "hirsch": "45075 Bohan Dillon Road, Cazadero, California",
 "wente": "5565 Tesla Road, Livermore, California",
 "concannon": "4590 Tesla Road, Livermore, California",
 "mission-san-gabriel": "428 South Mission Drive, San Gabriel, California",
 "leonetti": "1875 Foothills Lane, Walla Walla, Washington",
 "quilceda-creek": "11306 52nd Street SE, Snohomish, Washington",
 "castello-di-borghese": "17150 County Road 48, Cutchogue, New York",
 "cotes-dardoise": "879 Rue Bruce, Dunham, Quebec",
 "blue-mountain": "2385 Allendale Road, Okanagan Falls, British Columbia",
 "hillcrest": "240 Vineyard Lane, Roseburg, Oregon",
 "ste-chapelle": "19348 Lowell Road, Caldwell, Idaho",
 "trefethen": "1160 Oak Knoll Avenue, Napa, California",
 "mother-vine": "Mother Vineyard Road, Manteo, North Carolina",
 "domaine-pinnacle": "150 Chemin Richford, Frelighsburg, Quebec",
 "stags-leap-district-winery": "5766 Silverado Trail, Napa, California",
 "heitz-marthas": "Oakville Grade Road, Oakville, California",
 "to-kalon": "7801 Saint Helena Highway, Oakville, California",
 "monte-bello-rd": "17100 Monte Bello Road, Cupertino, California",
 "pisoni": "River Road, Gonzales, California",
 "domecq-mx": "Valle de Guadalupe, Baja California",
 "bechthold": "Bechthold Road, Lodi, California",
 "hermann-mo": "Hermann, Missouri",
 "augusta-mo": "Augusta, Missouri",
 "eden-park": "Eden Park Drive, Cincinnati, Ohio",
 "vineland-station": "Vineland Station, Lincoln, Ontario",
 "oak-knoll-cave-spring": "3836 Main Street, Jordan, Ontario",
 "pelee-island-winery": "455 Seacliff Drive, Kingsville, Ontario",
 "jost": "48 Vintage Lane, Malagash, Nova Scotia",
 "parras": "Parras de la Fuente, Coahuila",
 "ensenada": "Ensenada, Baja California",
 "san-vicente": "San Vicente, Ensenada, Baja California",
 "ojos-negros": "Ojos Negros, Baja California",
 "ezequiel-montes": "Ezequiel Montes, Querétaro",
 "aguascalientes": "Pabellón de Arteaga, Aguascalientes",
 "zacatecas-wine": "Ojocaliente, Zacatecas",
 "delicias": "Delicias, Chihuahua",
 "caborca": "Caborca, Sonora",
 "cerocahui": "Cerocahui, Chihuahua",
 "san-miguel-allende": "San Miguel de Allende, Guanajuato",
}
cache = json.load(open(OUT)) if os.path.exists(OUT) else {}
for k, q in Q.items():
    if k in cache and cache[k].get("res"):
        continue
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({"q": q, "format": "json", "limit": 2})
    r = subprocess.run(["curl", "-sS", "-m", "30", "-A", "VitisMundiAtlas/1.0 (research)", url], capture_output=True, text=True)
    time.sleep(1.1)
    try:
        res = json.loads(r.stdout)
    except Exception:
        res = []
    cache[k] = {"q": q, "res": [{"lat": float(x["lat"]), "lon": float(x["lon"]), "name": x.get("display_name", "")[:120], "type": x.get("type")} for x in res]}
    json.dump(cache, open(OUT, "w"), indent=1, ensure_ascii=False)
print(len(cache), sum(1 for v in cache.values() if v["res"]))
