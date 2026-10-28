"""Merge c9 part files into data/content/c9_east_med_caucasus_africa_asia.json.
Adds lat/lon/coord_quality to appellation profiles that have no polygon (point placement),
adds polygon-file name variants to match lists, validates and writes the final file."""
import json, os, re, sys
sys.path.insert(0, "/home/claude/winesite/scripts/c9")
from c9_common import check_text, PARTS

ROOT = "/home/claude/winesite"
OUT = os.path.join(ROOT, "data", "content", "c9_east_med_caucasus_africa_asia.json")
ORDER = ["gr", "cy", "mt", "tr", "lb", "il", "ps", "sy", "jo", "eg", "tn", "dz", "ma", "ly",
         "ge", "am", "az", "md", "ua", "ru", "kz", "uz", "tj", "kg", "tm", "ir", "iq"]

# (lat, lon, coord_quality, note) for appellations without polygons. Coordinates come from
# OpenStreetMap Nominatim lookups of the named village/town (see research notes); regional
# appellations use a representative town and are marked approx.
P = {
 # Georgia: village-named PDOs placed on the village; regional ones on the main town.
 ("ge", "Tsinandali"): (41.8941, 45.5725, "approx"),
 ("ge", "Mukuzani"): (41.8068, 45.7320, "approx"),
 ("ge", "Kindzmarauli"): (41.9300, 45.7900, "approx"),
 ("ge", "Napareuli"): (42.0446, 45.5037, "approx"),
 ("ge", "Gurjaani"): (41.7464, 45.7947, "approx"),
 ("ge", "Akhasheni"): (41.7922, 45.7476, "approx"),
 ("ge", "Manavi"): (41.7185, 45.4627, "approx"),
 ("ge", "Vazisubani"): (41.8233, 45.6953, "approx"),
 ("ge", "Teliani"): (41.9167, 45.4833, "approx"),
 ("ge", "Kardenakhi"): (41.6716, 45.8849, "approx"),
 ("ge", "Kotekhi"): (41.7521, 45.7830, "approx"),
 ("ge", "Tibaani"): (41.5752, 46.0058, "approx"),
 ("ge", "Kvareli"): (41.9482, 45.8140, "approx"),
 ("ge", "Kakheti"): (41.8500, 45.7000, "approx"),
 ("ge", "Khashmis Saperavi"): (41.7609, 45.1864, "approx"),
 ("ge", "Akhmeta"): (42.0342, 45.2109, "approx"),
 ("ge", "Tsarapi"): (41.6650, 45.8780, "approx"),
 ("ge", "Akhoebi"): (41.6800, 45.8950, "approx"),
 ("ge", "Magraani Kisi"): (42.1018, 45.3561, "approx"),
 ("ge", "Zegaani"): (41.7979, 45.7311, "approx"),
 ("ge", "Atenuri"): (41.9256, 44.1085, "approx"),
 ("ge", "Okami"): (41.9808, 44.4716, "approx"),
 ("ge", "Bolnisi"): (41.4493, 44.5369, "approx"),
 ("ge", "Asuretuli Shala"): (41.5934, 44.6703, "approx"),
 ("ge", "Sviri"): (42.1100, 43.0300, "approx"),
 ("ge", "Obcha"): (42.1017, 42.8699, "approx"),
 ("ge", "Sazanos Otskhanuri"): (42.1936, 43.0561, "approx"),
 ("ge", "Khvanchkara"): (42.5591, 43.0202, "approx"),
 ("ge", "Tvishi"): (42.5130, 42.7941, "approx"),
 ("ge", "Okureshis Usakhelouri"): (42.5441, 42.6821, "approx"),
 ("ge", "Racha"): (42.5186, 43.1532, "approx"),
 ("ge", "Lechkhumi"): (42.6187, 42.7469, "approx"),
 ("ge", "Salkhino Ojaleshi"): (42.5111, 42.3404, "approx"),
 # Moldova
 ("md", "Codru"): (47.1474, 28.6150, "approx"),
 ("md", "Ștefan Vodă"): (46.5156, 29.6621, "approx"),
 ("md", "Valul lui Traian"): (45.9044, 28.1947, "approx"),
 ("md", "Divin"): (47.0105, 28.8638, "approx"),
 ("md", "Ciumai"): (45.7809, 28.5674, "approx"),
 ("md", "Romănești"): (47.2263, 28.7120, "approx"),
 # Tunisia (Sidi Salem left unplaced: location not verified)
 ("tn", "Mornag"): (36.5872, 10.2438, "approx"),
 ("tn", "Grand Cru Mornag"): (36.6100, 10.2700, "approx"),
 ("tn", "Coteaux de Tébourba"): (36.8220, 9.8590, "approx"),
 ("tn", "Coteaux d'Utique"): (37.0346, 9.9599, "approx"),
 ("tn", "Kélibia"): (36.8457, 11.0936, "approx"),
 ("tn", "Thibar"): (36.5218, 9.1050, "approx"),
 # Algeria
 ("dz", "Coteaux de Mascara"): (35.3978, 0.2430, "approx"),
 ("dz", "Coteaux de Tlemcen"): (34.8818, -1.3167, "approx"),
 ("dz", "Monts du Tessalah"): (35.2714, -0.7981, "approx"),
 ("dz", "Dahra"): (36.1500, 0.5500, "approx"),
 ("dz", "Coteaux du Zaccar"): (36.3048, 2.2268, "approx"),
 ("dz", "Médéa"): (35.9752, 3.0124, "approx"),
 ("dz", "Aïn Bessem-Bouira"): (36.2929, 3.6735, "approx"),
 # Morocco (Beni Sadden and Sahel left unplaced: location not verified)
 ("ma", "Coteaux de l'Atlas 1er Cru"): (33.7587, -5.4389, "approx"),
 ("ma", "Guerrouane"): (33.8600, -5.6500, "approx"),
 ("ma", "Beni M'tir"): (33.7571, -5.4855, "approx"),
 ("ma", "Saïss"): (33.9500, -5.2000, "approx"),
 ("ma", "Zerhoune"): (34.0552, -5.5255, "approx"),
 ("ma", "Berkane"): (34.9267, -2.3294, "approx"),
 ("ma", "Angad"): (34.6779, -1.9293, "approx"),
 ("ma", "Gharb"): (34.2599, -5.9273, "approx"),
 ("ma", "Chellah"): (34.0000, -6.8200, "approx"),
 ("ma", "Zemmour"): (33.8303, -6.0726, "approx"),
 ("ma", "Zaër"): (33.5300, -6.6000, "approx"),
 ("ma", "Zenata"): (33.6594, -7.4188, "approx"),
 ("ma", "Doukkala"): (32.8638, -8.0601, "approx"),
}

# extra match names so text joins to the polygon file's transliterated names
EXTRA_MATCH = {
 ("gr", "Mavrodaphne of Patras"): ["Mavrodafni Patron"],
 ("gr", "Mavrodaphne of Kefalonia"): ["Mavrodafni Kefallinias"],
 ("gr", "Muscat of Kefalonia"): ["Moschatos Kefallinias"],
 ("gr", "Muscat of Rhodes"): ["Moschatos Rodou"],
 ("gr", "Muscat of Limnos"): ["Moschatos Limnou"],
 ("gr", "Muscat of Patras"): ["Moschato Patron"],
 ("gr", "Muscat of Rio Patras"): ["Moschatos Riou Patras"],
 ("gr", "Rhodes"): ["Rodos"],
 ("gr", "Amyndeon"): ["Amyntaio"],
 ("gr", "Malvasia Sitia"): ["Malvasia Sitias"],
 ("gr", "Slopes of Meliton"): ["Plagies Melitona"],
 ("gr", "Robola of Kefalonia"): ["Robola Kefallinias"],
 ("cy", "Vouni Panagias-Ambelitis"): ["Vouni Panagias-Ampelitis"],
}


# sentences appended to short appellation summaries (applied idempotently)
ADD = {
 ("gr", "Anchialos"): "The wines are light, crisp and meant for drinking young, with Roditis giving citrus freshness and Savatiano a little more body.",
 ("gr", "Muscat of Patras"): "The grape is the small-berried Muscat Blanc (Moschato Aspro), the same as on Samos, grown on the hills behind the city alongside the vineyards of PDO Patra and Mavrodaphne of Patras.",
 ("gr", "Muscat of Kefalonia"): "The grape is Muscat Blanc à Petits Grains, grown on the same dry limestone as Robola. Like Mavrodaphne of Kefalonia, it is a small production sold mostly on the island.",
 ("gr", "Mavrodaphne of Kefalonia"): "EU rules allow Korinthiaki (Black Corinth) alongside Mavrodaphne, as in Patras.",
 ("gr", "Muscat of Limnos"): "Unlike the Muscat Blanc of Samos and Patras, it is made from Muscat of Alexandria (Moschato Alexandreias), fortified or from sun-dried grapes, on the island's volcanic soils.",
 ("gr", "Malvasia Paros"): "Its rules allow Monemvasia with a little Assyrtiko. Like the other three Malvasia PDOs of 2011, it aims to revive the sweet wine style Venetian merchants once traded from the Aegean.",
 ("gr", "Muscat of Rhodes"): "The vineyards share the slopes of the island with PDO Rhodes, and the wine is usually lighter and more floral than the Muscats of Samos or Patras. Production is small.",
 ("gr", "Malvasia Sitia"): "Malvasia di Candia Aromatica, Muscat Blanc, Liatiko, Thrapsathiri, Assyrtiko and Athiri are permitted. Production is still tiny, but it gives eastern Crete a sweet-wine identity alongside dry Sitia.",
 ("gr", "Chandakas-Candia"): "White blends lean on Vidiano, Vilana, Thrapsathiri, Assyrtiko and Athiri; reds on Kotsifali and Mandilari.",
 ("gr", "Malvasia Chandakas-Candia"): "Malvasia di Candia Aromatica leads the blend with Vidiano, Muscat Blanc, Liatiko, Thrapsathiri, Assyrtiko and Athiri permitted. Production is small; Heraklion-area producers are still building the style.",
 ("cy", "Krasochoria Lemesou-Afames"): "Higher and cooler than most of the Limassol wine villages, it is planted with Xynisteri, Maratheftiko and Mavro alongside international grapes.",
 ("cy", "Krasochoria Lemesou-Laona"): "The limestone gives fresh, saline Xynisteri, and Maratheftiko and Yiannoudi give the zone's best reds.",
 ("cy", "Vouni Panagias-Ambelitis"): "The plateau is among the coolest places to grow grapes in Cyprus, and the zone's bush vines are ungrafted, like all Cypriot vines.",
 ("tn", "Grand Cru Mornag"): "It sits at the top of the Tunisian hierarchy, and its reds are often oak-aged blends that include Syrah and Cabernet Sauvignon alongside the traditional Mediterranean grapes.",
 ("tn", "Coteaux de Tébourba"): "The Medjerda valley's alluvial soils and hillsides give reds and rosés from Carignan and Cinsault, and a little white wine.",
 ("tn", "Sidi Salem"): "Created in 1973 along with Mornag and Coteaux de Tébourba, it is one of the less-seen Tunisian names on export labels.",
 ("tn", "Coteaux d'Utique"): "Vineyards lie on low hills near the ruins of Utica and the coast of the Gulf of Tunis, giving soft reds and rosés.",
 ("tn", "Thibar"): "It is one of Tunisia's two historic Muscat appellations, both created in 1958, alongside Kélibia.",
 ("dz", "Coteaux de Tlemcen"): "Higher altitude and more rain than the coastal plains give these wines more freshness than most Algerian reds.",
 ("dz", "Monts du Tessalah"): "The hills sit just west of Sidi Bel Abbès in the heart of the old Oranie wine country, where colonial estates once made bulk wine for blending in southern France. Today the zone produces mainly Carignan and Cinsault reds.",
 ("dz", "Dahra"): "The Dahra hills, between the Chelif river and the sea, were one of the largest colonial wine areas.",
 ("dz", "Coteaux du Zaccar"): "Mount Zaccar rises above the town of Miliana in the Chelif valley, and its slopes give some of the freshest reds and rosés of central Algeria. Like the other zones, it is a colonial VDQS name kept by the ONCV.",
 ("dz", "Médéa"): "Altitude makes Médéa one of the coolest Algerian zones, and its reds are among the most balanced the ONCV bottles. Médéa also supplies the Cuvée du Président blend.",
 ("dz", "Aïn Bessem-Bouira"): "The plateau lies at 500 to 700 metres between the Djurdjura and the Bibans ranges, with cool nights that suit fresh rosés and light reds from Cinsault and Grenache.",
 ("ma", "Guerrouane"): "Clay-limestone soils at around 500 to 600 metres and Atlantic air from the west give softer wines than the hotter east.",
 ("ma", "Beni M'tir"): "The altitude and cool nights give fresher reds and some of Morocco's best whites, and Château Roslane's AOC vineyards lie at its edge.",
 ("ma", "Saïss"): "The plateau lies at around 500 to 600 metres, and its clay-limestone soils supply the large Meknès wineries, mainly with reds and vin gris.",
 ("ma", "Zerhoune"): "Vines grew here in Roman times around Volubilis. Today the zone gives reds and rosés from Cinsault, Grenache, Syrah and Cabernet.",
 ("ma", "Berkane"): "The Moulouya plain and the Beni Snassen foothills have a Mediterranean climate, warmer and drier than the Meknès plateau. Wineries here make mostly reds and rosés.",
 ("ma", "Angad"): "One of Morocco's driest wine areas, near the Algerian border, it makes sturdy reds from Carignan, Cinsault and Grenache. It is one of the three AOGs of the Oriental region with Berkane and Beni Sadden.",
 ("ma", "Beni Sadden"): "It is one of the three eastern AOGs, with Berkane and Angad, in Morocco's dry Oriental region. Its exact boundaries and producers could not be verified for this atlas.",
 ("ma", "Gharb"): "The fertile alluvial plain behind the Atlantic coast is better known for citrus, rice and sugar beet, and its wines are mostly everyday reds and rosés.",
 ("ma", "Chellah"): "The Rabat and Casablanca hinterland was one of the main vineyard areas of the French protectorate, close to the big urban markets.",
 ("ma", "Zemmour"): "The plateau around Khémisset, between Rabat and Meknès, at 300 to 500 metres, makes reds and vin gris for the large Moroccan wineries. It is one of the five Rabat and Casablanca AOGs.",
 ("ma", "Zaër"): "Sandy soils and Atlantic breezes give the zone fresh rosés and vin gris as well as reds.",
 ("ma", "Zenata"): "It makes mainly reds and rosés for the Casablanca market, and urban growth has eaten into its vineyards.",
 ("ma", "Sahel"): "It is one of the five AOGs of the Rabat and Casablanca region, with Atlantic-influenced vineyards. Its exact boundaries could not be verified for this atlas.",
 ("ma", "Doukkala"): "The sandy Doukkala plain is hot and flat, and most of its wine is red and rosé for the domestic and French markets.",
 ("ge", "Akhasheni"): "The village's right-bank slopes catch the afternoon sun, giving ripe, soft Saperavi with enough acidity to balance the sweetness.",
 ("ge", "Manavi"): "Mtsvane from Manavi is often made both European-style and in qvevri, where it gains texture and notes of dried herbs.",
 ("ge", "Vazisubani"): "It lies on the right bank of the Alazani between Mukuzani and Gurjaani, and its whites are made in both the European and the Kakhetian qvevri style.",
 ("ge", "Kotekhi"): "Kotekhi lies just outside Gurjaani town in the middle Alazani, on the right-bank terraces. It was one of the original 18 appellations listed in 2002 and covers both a dry white and a dry red.",
 ("ge", "Akhmeta"): "The zone's cooler, higher sites close to the mountains give lighter, more aromatic wines than the middle Alazani.",
 ("ge", "Tsarapi"): "Up to 15 percent Kakhuri Mtsvane or Khikhvi may be added, but no other varieties.",
 ("ge", "Akhoebi"): "Saperavi Budeshuri is a rare local form of Saperavi, traditionally used for softer, fruitier wines.",
 ("ge", "Zegaani"): "Zegaani wines are deep, tannic Saperavi built for ageing, and the microzone's rules make it one of the most demanding PDOs in Georgia.",
 ("ge", "Okami"): "Chinuri and Goruli Mtsvane give crisp whites and ambers, and Shavkapito gives a light, peppery red typical of Kartli.",
 ("ge", "Asuretuli Shala"): "Asuretuli Shavi is a local red grown almost nowhere else, and the wines are light, fresh and fruity.",
 ("ge", "Sviri"): "Imeretian wines here are made with only a small proportion of skins and no stems, which keeps them lighter and fresher than Kakhetian amber wines.",
 ("ge", "Obcha"): "It is one of three Imeretian PDOs, alongside Sviri and Sazanos Otskhanuri.",
 ("ge", "Lechkhumi"): "The appellation's exact grape and style rules could not be verified for this atlas.",
 ("ge", "Salkhino Ojaleshi"): "Ojaleshi, whose name is linked to the old practice of training vines up trees, ripens late in the humid west and gives fresh, peppery wines.",
}

def main():
    merged = {"countries": [], "regions": [], "appellations": [], "sites": []}
    problems = []
    for iso in ORDER:
        p = os.path.join(PARTS, f"{iso}.json")
        d = json.load(open(p, encoding="utf-8"))
        for a in d["appellations"]:
            k = (a["country"], a["name"])
            if k in P:
                lat, lon, cq = P[k]
                a["lat"], a["lon"], a["coord_quality"] = round(lat, 4), round(lon, 4), cq
            if k in ADD and ADD[k] not in a["summary"]:
                a["summary"] = a["summary"].rstrip() + " " + ADD[k]
            if k in EXTRA_MATCH:
                for m in EXTRA_MATCH[k]:
                    if m not in a["match"]:
                        a["match"].append(m)
        # write enriched part back so parts and merged file stay in step
        json.dump(d, open(p, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        for k in merged:
            merged[k].extend(d[k])
    used = {k for k in P}
    have = {(a["country"], a["name"]) for a in merged["appellations"]}
    for k in used - have:
        problems.append(f"point key not found: {k}")
    # validation
    problems += check_text(merged)
    ids = [s["id"] for s in merged["sites"]]
    dups = sorted({i for i in ids if ids.count(i) > 1})
    if dups: problems.append(f"duplicate site ids: {dups}")
    for s in merged["sites"]:
        if not re.fullmatch(r"site-[a-z]{2}-[a-z0-9-]+", s["id"]): problems.append(f"bad site id {s['id']}")
        if not (-90 <= s["lat"] <= 90 and -180 <= s["lon"] <= 180): problems.append(f"bad coords {s['id']}")
        if s["coord_quality"] not in ("precise", "approx"): problems.append(f"bad cq {s['id']}")
        n = len(s["text"].split())
        if n < 15 or n > 160: problems.append(f"site text length {n} words: {s['id']}")
    akeys = [(a["country"], a["name"]) for a in merged["appellations"]]
    for k in {k for k in akeys if akeys.count(k) > 1}: problems.append(f"duplicate appellation {k}")
    ckeys = [c["iso2"] for c in merged["countries"]]
    for k in {k for k in ckeys if ckeys.count(k) > 1}: problems.append(f"duplicate country {k}")
    for a in merged["appellations"]:
        if not a.get("match"): problems.append(f"no match: {a['name']}")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    tmp = OUT + ".tmp"
    json.dump(merged, open(tmp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    json.load(open(tmp, encoding="utf-8"))
    os.replace(tmp, OUT)
    unplaced = [a["name"] for a in merged["appellations"] if a["country"] not in ("gr", "cy", "mt") and "lat" not in a]
    print(f"wrote {OUT}: countries={len(merged['countries'])} regions={len(merged['regions'])} "
          f"appellations={len(merged['appellations'])} sites={len(merged['sites'])}")
    print("appellations with point coords:", sum(1 for a in merged["appellations"] if "lat" in a))
    print("non-polygon appellations left without coords:", unplaced)
    for p_ in problems: print("PROBLEM:", p_)
    return merged

if __name__ == "__main__":
    main()
