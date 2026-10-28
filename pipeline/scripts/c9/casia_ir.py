import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c9")
from c9_common import site, save

S = []
def s(iso, *a, **k): S.append(site(iso, *a, **k))
OIV = {"title": "OIV, State of the World Wine Sector in 2025", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf"}

uz = {
    "iso2": "uz", "name": "Uzbekistan", "tier": "emerging",
    "tagline": "A vast Silk Road vineyard of table grapes and raisins, with Samarkand's nineteenth-century winery still making sweet fortified wines.",
    "stats": {"vineyard_ha": 125000, "year": 2025, "world_rank_production": None, "note": "OIV 2025: 125 kha of vines, the 14th largest vineyard area in the world, overwhelmingly table grapes and raisins; wine output small and not reported."},
    "overview": (
        "Grapes have grown in the oases of Transoxiana for thousands of years. Chinese envoys of the Han dynasty described the wine of Ferghana in the second century BC, Sogdian merchants carried wine and vines along the Silk Road, and Samarkand and Bukhara were famous for their grapes long after Islam made wine a matter of poetry rather than commerce.\n\n"
        "The modern industry arrived with the Russian Empire. In Samarkand, a winery founded in 1868 according to its own history by the merchant D. M. Filatov became, in Soviet times, the Khovrenko winery, named after the oenologist M. A. Khovrenko, who led it and developed its range. It is known for sweet and fortified wines in the Soviet style, such as Gulyakandoz, Shirin and Aleatiko, made from grapes grown in a hot continental climate with very high sugar, and for its museum and tasting room. In the Soviet era Uzbekistan was a major source of dessert wines and brandy for the USSR.\n\n"
        "Today Uzbekistan has one of the world's largest vineyards by area (about 125,000 hectares, the 14th largest according to the OIV), but almost all of it is for table grapes and raisins, and the wine sector is small. Since the late 2010s the government has opened the economy and encouraged private wineries and wine tourism around Tashkent (Parkent, Bostanliq) and Samarkand."
    ),
    "history": [
        {"when": "2nd century BC", "title": "Ferghana's wine and the Han envoys", "text": "Chinese envoy Zhang Qian reported that the people of Ferghana made wine from grapes and stored it for years; the Han court brought vines back to China.", "lat": 40.39, "lon": 71.78},
        {"when": "1868", "title": "Filatov's Samarkand winery", "text": "A winery was founded in Samarkand, according to its own history, by the merchant D. M. Filatov, shortly after the Russian conquest of the city.", "lat": 39.655, "lon": 66.9757},
        {"when": "Soviet era", "title": "Khovrenko and Uzbek dessert wines", "text": "Under the oenologist M. A. Khovrenko the Samarkand winery developed sweet and fortified wines that won medals across the USSR; it now bears his name.", "lat": 39.655, "lon": 66.9757},
    ],
    "classification": "No appellation system.",
    "climate_soils": "Hot, dry continental desert-oasis climate with very hot summers, cold winters (vines are often buried) and irrigation from mountain rivers; loess and alluvial soils.",
    "grapes": [{"name": "Rkatsiteli, Saperavi, Bayan Shirey", "note": "Soviet-era wine grapes."}, {"name": "Kattakurgan, Husayne, Kishmish", "note": "Local table and raisin grapes."}, {"name": "Aleatico, Muscat", "note": "Used for sweet wines."}],
    "regions": ["Samarkand", "Tashkent region"],
    "further_reading": [],
    "sources": [OIV, {"title": "Eurasia Travel, Museum of Winemaking (Khovrenko Winery)", "url": "https://eurasia.travel/uzbekistan/samarkand/winemaking-museum/"}],
}
s("uz", "Khovrenko winery and museum, Samarkand", "museum", 39.6550, 66.9757, "Samarkand's historic winery at 58 Makhmud Kashgari street, founded in 1868 according to its own history by D. M. Filatov and later named after the Soviet oenologist M. A. Khovrenko. Its museum and tasting room present the sweet and fortified wines and brandies that made Samarkand known in the USSR.", "approx", producers=["Khovrenko"])
s("uz", "Afrasiyab", "historic", 39.6705, 66.9873, "The ancient city mound of Samarkand (Maracanda), capital of Sogdiana, whose merchants traded wine along the Silk Road.", "approx", cls="Archaeological site")

kz = {
    "iso2": "kz", "name": "Kazakhstan", "tier": "minor",
    "tagline": "Vineyards under the Tian Shan east of Almaty, where a young estate industry buries its vines each winter.",
    "stats": {"note": "Small wine sector; no reliable vineyard total found."},
    "overview": (
        "Kazakhstan is the world's largest landlocked country, but almost all of it is too cold or too dry for vines. Its wine country lies in the far south-east, in the foothills of the Zailiysky Alatau (Tian Shan) east of Almaty, and in the south around Shymkent and the Turkestan region. Soviet planners established large vineyards here; many were lost after 1985 and 1991. Since the late 2000s private estates have replanted the Almaty region, most visibly Arba Wine in the Enbekshikazakh district towards Shelek and Turgen, with others nearby. Winters are severe enough that vines are buried in autumn and dug out in spring, and summers are hot and dry with irrigation from mountain rivers. Kazakhstan is also an important market for Georgian and Moldovan wine."
    ),
    "history": [
        {"when": "Soviet era", "title": "State vineyards in the south", "text": "Soviet planners planted vineyards in the Almaty and Shymkent regions, many of them lost after the 1985 anti-alcohol campaign and independence.", "lat": 42.3147, "lon": 69.5883},
        {"when": "2000s to 2010s", "title": "Private estates east of Almaty", "text": "New wineries such as Arba Wine replanted the foothills east of Almaty.", "lat": 43.5994, "lon": 78.2492},
    ],
    "classification": "No appellation system.", "climate_soils": "Extreme continental, 600 to 1,000 metres, vines buried in winter, irrigated loess and alluvial fans.",
    "grapes": [{"name": "Saperavi, Rkatsiteli, Cabernet Sauvignon, Riesling, Chardonnay", "note": "Main varieties."}],
    "regions": ["Almaty region", "Turkestan region"], "further_reading": [], "sources": [{"title": "Nominatim/OpenStreetMap location data for Arba Wine and Shelek", "url": "https://www.openstreetmap.org"}],
}
s("kz", "Shelek and Turgen vineyards", "landscape", 43.5994, 78.2492, "The foothills of the Zailiysky Alatau east of Almaty around Shelek and Turgen, where Kazakhstan's new estates (including Arba Wine) grow vines that must be buried each winter.", "approx", cls="Wine landscape")

tj = {
    "iso2": "tj", "name": "Tajikistan", "tier": "minor",
    "tagline": "Sogdian Panjakent's ancient presses and a small Soviet-era wine legacy.",
    "stats": {"note": "Mostly table grapes and raisins; wine production minimal."},
    "overview": "Tajikistan's claim on wine history lies in Sogdiana, the land of the Silk Road's great merchants. The Sogdian city of Panjakent in the Zeravshan valley, abandoned after the Arab conquest in the eighth century, has yielded wine presses, storage jars and painted banquet halls, evidence of a flourishing pre-Islamic wine culture shared with Samarkand, 60 kilometres downstream. The northern Sughd region around Khujand also reaches into the Ferghana valley, the ancient kingdom of Dayuan whose wine impressed Chinese envoys in the second century BC.\n\nIn Soviet times the Hissar valley west of Dushanbe and the Ferghana fringe around Khujand had state vineyards and wineries producing dessert wines and brandy. Since independence and the civil war of the 1990s, grape growing has shifted overwhelmingly to table grapes and raisins, and wine production is small and aimed at the domestic market. Hot, dry summers, cold winters and irrigation from mountain rivers define the vineyards.",
    "history": [{"when": "5th to 8th century AD", "title": "Sogdian Panjakent", "text": "The Sogdian merchant city had wine presses and painted banquet halls before the Arab conquest.", "lat": 39.4853, "lon": 67.6219}],
    "classification": "No appellation system.", "climate_soils": "Hot continental valleys under high mountains; irrigated.", "grapes": [{"name": "Rkatsiteli, Saperavi, local table grapes", "note": "Main varieties."}],
    "regions": [], "further_reading": [], "sources": [{"title": "Wikipedia, Panjakent", "url": "https://en.wikipedia.org/wiki/Panjakent"}],
}
s("tj", "Ancient Panjakent", "historic", 39.4853, 67.6219, "Ruins of a Sogdian city on the Zeravshan, abandoned after the Arab conquest, with wine presses, storage jars and famous banquet murals.", "precise", cls="Archaeological site")

kg = {
    "iso2": "kg", "name": "Kyrgyzstan", "tier": "minor",
    "tagline": "A few vineyards in the Chui and Issyk-Kul valleys and the Ferghana fringe.",
    "stats": {"note": "Very small production."},
    "overview": "Kyrgyzstan is mountain country, almost entirely above 1,000 metres, and grapes grow only on its edges. In the south, the Kyrgyz part of the Ferghana valley around Osh and Jalal-Abad belongs to one of the oldest grape-growing areas of Central Asia: Ferghana was the kingdom of Dayuan, whose grape wine the Han envoy Zhang Qian reported in the second century BC, and whose vines were carried back to China. In the north, the Chui valley around Bishkek and the shores of Lake Issyk-Kul, a huge high lake that softens the local climate, had Soviet-era vineyards and wineries that made fortified and fruit wines for the USSR.\n\nMost of those vineyards were lost after the anti-alcohol campaign of 1985 and independence in 1991, and today Kyrgyzstan makes little grape wine; much of what is sold locally is fruit wine or imported. The continental climate, with very cold winters, means vines must be buried each autumn, as across most of Central Asia.",
    "history": [{"when": "Soviet era", "title": "Chui valley wineries", "text": "State wineries near Bishkek made fortified and fruit wines for the Soviet market.", "lat": 42.8761, "lon": 74.6037}],
    "classification": "No appellation system.", "climate_soils": "Extreme continental mountain valleys.", "grapes": [], "regions": [], "further_reading": [], "sources": [{"title": "Wikipedia, Dayuan (Ferghana)", "url": "https://en.wikipedia.org/wiki/Dayuan"}],
}
tm = {
    "iso2": "tm", "name": "Turkmenistan", "tier": "minor",
    "tagline": "Parthian Nisa's wine archive and Soviet desert vineyards.",
    "stats": {"note": "Small state-run production; no reliable data."},
    "overview": "Turkmenistan is mostly desert, the Karakum, but its southern oases along the Kopet Dag mountains and the Murghab river were centres of civilisation for thousands of years. At Old Nisa, near Ashgabat, the early Parthian royal fortress (from about the third century BC) yielded more than 2,000 inscribed potsherds, written in Aramaic script, that are largely receipts for wine delivered from royal and temple vineyards to the stores: one of the great administrative wine archives of antiquity, showing a state that taxed and tracked wine by vintage and estate. Merv, in the Murghab oasis, was one of the great cities of the Silk Road.\n\nIn Soviet times Turkmenistan grew grapes in the Kopet Dag foothills and the Murghab and Amu Darya oases, and state wineries made dessert wines and brandy. Today grapes are grown mostly for eating, and a small state-controlled industry produces wine for the domestic market. Summers are extremely hot and all vineyards are irrigated.",
    "history": [{"when": "2nd to 1st century BC", "title": "The wine ostraca of Nisa", "text": "Thousands of inscribed sherds at the Parthian fortress of Nisa record deliveries of wine from royal and temple vineyards.", "lat": 37.9513, "lon": 58.2112}],
    "classification": "No appellation system.", "climate_soils": "Desert oases with irrigation from the Kopet Dag and the Murghab.", "grapes": [], "regions": [], "further_reading": [], "sources": [{"title": "Wikipedia, Nisa, Turkmenistan", "url": "https://en.wikipedia.org/wiki/Nisa,_Turkmenistan"}],
}
s("tm", "Old Nisa (Parthian fortress)", "historic", 37.9513, 58.2112, "The Parthian royal fortress near Ashgabat (UNESCO), whose archive of more than 2,000 inscribed potsherds records wine deliveries to the royal stores.", "precise", cls="Archaeological site (UNESCO)")

ir = {
    "iso2": "ir", "name": "Iran", "tier": "minor",
    "tagline": "Neolithic resinated wine in the Zagros and the wine poetry of Hafez; production banned since 1979.",
    "stats": {"vineyard_ha": 128000, "year": 2025, "note": "OIV 2025: 128 kha of vines, all for table grapes and raisins (Iran is a major raisin producer). Commercial wine production has been illegal since the 1979 revolution; licensed religious minorities may make wine for their own use."},
    "overview": (
        "Iran holds some of the oldest evidence of wine in the world. At Hajji Firuz Tepe, a Neolithic village in the Zagros mountains south of Lake Urmia excavated by the Penn Museum in 1958 to 1968, six jars of about nine litres each, set into the floor of a mudbrick house of about 5400 to 5000 BC, held residues of tartaric acid and terebinth resin: a resinated wine, published by Patrick McGovern in Nature in 1996 and for two decades the oldest chemical evidence of grape wine. At Godin Tepe, further south, jars of about 3100 to 2900 BC with red residue and wine stains on their sides (they were stored lying down) show a trade in wine along the routes to Mesopotamia.\n\n"
        "Persian kings feasted on wine at Persepolis, and wine remained central to court culture and poetry after Islam. The ghazals of Hafez of Shiraz (fourteenth century) and the quatrains attributed to Omar Khayyam made wine the great metaphor of mystical love, and Shiraz, in Fars province, was renowned for its wine into the twentieth century; European travellers such as Jean Chardin described it in the seventeenth. The Syrah grape is sometimes said to come from Shiraz, but DNA has shown it is a cross of two French varieties from the Rhône. Before 1979 Iran had a few hundred wineries; after the revolution commercial alcohol was banned, and Iran's vineyards today grow table grapes and raisins (Takestan near Qazvin and Malayer are major raisin centres)."
    ),
    "history": [
        {"when": "c. 5400 to 5000 BC", "title": "Hajji Firuz Tepe", "text": "Neolithic jars sunk in a house floor held tartaric acid and terebinth resin: resinated wine (McGovern et al., Nature 1996).", "lat": 36.9947, "lon": 45.4743},
        {"when": "c. 3100 to 2900 BC", "title": "Godin Tepe", "text": "Jars with wine residues and evidence of storage on their sides at a trading post on the route to Mesopotamia.", "lat": 34.5185, "lon": 48.0687},
        {"when": "c. 515 BC", "title": "Persepolis", "text": "Achaemenid administrative tablets at Persepolis record wine rations for workers and the court.", "lat": 29.9352, "lon": 52.8904},
        {"when": "14th century", "title": "Hafez of Shiraz", "text": "The poet Hafez made wine the central image of Persian mystical poetry; his tomb in Shiraz is a place of pilgrimage.", "lat": 29.6258, "lon": 52.5585},
        {"when": "1979", "title": "Prohibition", "text": "After the Islamic Revolution commercial wine production was banned.", "lat": 35.6892, "lon": 51.389},
    ],
    "classification": "None (commercial production prohibited).",
    "climate_soils": "High plateaus and Zagros valleys with hot, dry summers and cold winters; irrigated vineyards for table grapes and raisins.",
    "grapes": [{"name": "Kishmish, Askari, Shahani, Yaghuti", "note": "Table and raisin grapes."}],
    "regions": ["Fars (Shiraz)", "Qazvin (Takestan)", "Zagros"],
    "further_reading": ["Ancient Wine, Patrick E. McGovern", "The Pursuit of Pleasure: Drugs and Stimulants in Iranian History, Rudi Matthee"],
    "sources": [OIV, {"title": "McGovern, P. E. et al. (1996), Neolithic resinated wine, Nature 381", "url": "https://doi.org/10.1038/381480a0"}, {"title": "Wikipedia, Hajji Firuz Tepe; Persian wine", "url": "https://en.wikipedia.org/wiki/Hajji_Firuz_Tepe"}],
}
s("ir", "Hajji Firuz Tepe", "historic", 36.9947, 45.4743, "A Neolithic mound in the Gadar valley south of Lake Urmia where six jars of about 5400 to 5000 BC, set in a kitchen floor, held tartaric acid and terebinth resin, the first chemical proof of ancient resinated wine (published 1996).", "precise", cls="Neolithic settlement")
s("ir", "Godin Tepe", "historic", 34.5185, 48.0687, "Late Uruk-period trading post in the central Zagros (about 3100 to 2900 BC) whose jars held wine and were stored lying on their sides.", "precise", cls="Archaeological site")
s("ir", "Tomb of Hafez, Shiraz", "historic", 29.6258, 52.5585, "The garden tomb of the fourteenth-century poet whose ghazals made wine the central metaphor of Persian poetry, in the city once famous for its wine.", "precise", cls="Poet's tomb")
s("ir", "Persepolis", "historic", 29.9352, 52.8904, "Achaemenid ceremonial capital (UNESCO) whose administrative tablets record wine rations; reliefs show tribute bearers with vessels.", "precise", cls="Archaeological site (UNESCO)")

iq = {
    "iso2": "iq", "name": "Iraq", "tier": "minor",
    "tagline": "Mesopotamia's beer country, where wine was the imported luxury of kings.",
    "stats": {"note": "No significant modern wine production; Christian villages in the north make small amounts."},
    "overview": "In ancient Mesopotamia beer was the everyday drink and wine an expensive import. The alluvial plains of Sumer and Babylonia were too hot, flat and salty for good vines, so wine came down the Tigris and Euphrates from the hills of the north and from Syria and the Zagros; Sumerian texts call it the beer of the mountains. The trade route that ran past Godin Tepe in the Zagros carried wine to the lowland cities by the late fourth millennium BC.\n\nRoyal archives show wine as a palace luxury. At Mari on the Euphrates, letters of the eighteenth century BC discuss wine shipments; at Nimrud (Kalhu), the Assyrian capital, the so-called wine lists of the eighth century BC record rations for the royal household and staff; and a famous relief from Nineveh shows King Ashurbanipal and his queen drinking wine beneath a grapevine, with the severed head of an enemy king hanging nearby. The hills of northern Iraq, in today's Kurdistan region, had vineyards in Assyrian times.\n\nToday Iraq has no notable wine industry. Assyrian and Chaldean Christian villages around Alqosh and in the Nineveh plains make small amounts of wine and arak for church and home.",
    "history": [{"when": "8th century BC", "title": "The Nimrud wine lists", "text": "Tablets from the Assyrian capital Kalhu (Nimrud) record wine rations for the royal household and its staff.", "lat": 36.0982, "lon": 43.3289}, {"when": "c. 645 BC", "title": "Ashurbanipal's garden party", "text": "A relief from Nineveh shows the king and queen drinking wine beneath a grapevine.", "lat": 36.3564, "lon": 43.1622}],
    "classification": "None.", "climate_soils": "Hot alluvial plains; vines only in the northern hills.", "grapes": [], "regions": [], "further_reading": [], "sources": [{"title": "Wikipedia, Nimrud; Nineveh", "url": "https://en.wikipedia.org/wiki/Nimrud"}],
}
s("iq", "Nimrud (Kalhu)", "historic", 36.0982, 43.3289, "The Assyrian capital Kalhu on the Tigris, whose 'wine lists' of the eighth century BC record wine rations issued to the royal household and palace staff. In Mesopotamia wine was a costly import from the northern hills.", "approx", cls="Archaeological site")
s("iq", "Nineveh", "historic", 36.3564, 43.1622, "Assyrian capital whose relief of Ashurbanipal's banquet shows the king drinking wine beneath a vine.", "approx", cls="Archaeological site")

if __name__ == "__main__":
    by = lambda iso: [x for x in S if x["country"] == iso]
    uz["stats"].pop("world_rank_production", None)
    for iso, c in [("uz", uz), ("kz", kz), ("tj", tj), ("kg", kg), ("tm", tm), ("ir", ir), ("iq", iq)]:
        save(iso, {"countries": [c], "regions": [], "appellations": [], "sites": by(iso)})
