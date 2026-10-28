import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c9")
from c9_common import site, save

S = []
def s(iso, *a, **k): S.append(site(iso, *a, **k))

# ------------------------------------------------------------------ EGYPT
SRC_EG = [
    {"title": "OIV, State of the World Wine Sector in 2025 (Egypt vineyard area)", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf"},
    {"title": "Wikipedia, Egyptian wine", "url": "https://en.wikipedia.org/wiki/Egyptian_wine"},
    {"title": "Wikipedia, Scorpion I (Tomb U-j)", "url": "https://en.wikipedia.org/wiki/Scorpion_I"},
    {"title": "McGovern, P. E. et al., 'Ancient Egyptian herbal wines', PNAS 106 (2009)", "url": "https://doi.org/10.1073/pnas.0811578106"},
]
eg = {
    "iso2": "eg", "name": "Egypt", "tier": "emerging",
    "tagline": "The pharaohs labelled their wine by vintage, estate and winemaker; a modern industry is reviving it on the Nile and by the sea.",
    "stats": {"vineyard_ha": 86000, "year": 2025, "note": "OIV 2025: 86 kha of vines, almost all table grapes; wine production is small (a few thousand tonnes)."},
    "overview": (
        "Egypt gave wine its first labels. The earliest evidence is imported: in tomb U-j at Abydos, built for a ruler of about 3150 BC often identified as Scorpion I, dozens of imported jars held resinated, herb-flavoured wine, and grape seeds, skins and pulp survived alongside them. By the third millennium BC royal vineyards in the Nile Delta made wine for the court and the gods, tomb paintings show the whole process from picking to treading in vats to sealing jars, and wine jars were stamped with the estate's name. The jars in Tutankhamun's tomb (about 1323 BC) carry ink labels giving the regnal year, the estate (often 'of the Western River', in the Delta), the chief vintner's name and whether the wine was red or white; residue analysis showed that some jars held white wine and one held shedeh, a prized red.\n\n"
        "Wine was made at the Mareotis lake near Alexandria and in the Western Desert oases (Kharga and Dakhla) through Greek and Roman times, and Christian monasteries kept making it after the Arab conquest. Commercial production collapsed under Islamic rule until 1882, when the Greek-Egyptian tobacco merchant Nestor Gianaclis planted a modern vineyard near Alexandria. Nasser nationalised the industry in 1963, and after privatisation in 1997 the company, Al Ahram Beverages, was bought by Heineken in 2002.\n\n"
        "Today a handful of wineries (Gianaclis, Kouroum of the Nile, Egyptian Vineyards, Omar Khayyam) make wine mostly for hotels and the domestic market, from vineyards in the desert near Alexandria and on the Nile near Beni Hasan in Middle Egypt. Kouroum of the Nile has revived the local white grape Bannati. Heat and lack of rain mean every vine is irrigated, and harvests start in July."
    ),
    "history": [
        {"when": "c. 3150 BC", "title": "Imported wine in tomb U-j", "text": "A predynastic ruler at Abydos was buried with dozens of imported jars of resinated, herbal wine, among the oldest wine finds in Egypt.", "lat": 26.1752, "lon": 31.908},
        {"when": "c. 2700 BC onwards", "title": "Royal vineyards of the Delta", "text": "From the Third Dynasty, royal wine estates in the Nile Delta supplied the court; by the end of the Old Kingdom five named wines were a standard offering for the afterlife.", "lat": 31.0, "lon": 30.5},
        {"when": "c. 1323 BC", "title": "Tutankhamun's labelled jars", "text": "Wine jars in the boy king's tomb carry dockets naming year, estate, vintner and colour; residue studies identified white wine and the red shedeh.", "lat": 25.7404, "lon": 32.6015},
        {"when": "c. 1400 BC", "title": "The vintage scene in the tomb of Nakht", "text": "The tomb of the scribe Nakht at Sheikh Abd el-Qurna shows grapes picked from a pergola, trodden in a vat and stored in jars, one of the most famous images of ancient winemaking.", "lat": 25.732, "lon": 32.6076},
        {"when": "1882", "title": "Nestor Gianaclis replants", "text": "A Greek-Egyptian tobacco merchant planted Egypt's first modern vineyard near Alexandria, restarting commercial winemaking.", "lat": 31.1997, "lon": 29.8969},
        {"when": "1963 to 2002", "title": "Nationalisation and Heineken", "text": "Nasser nationalised wineries and breweries in 1963; the industry was privatised in 1997 and bought by Heineken in 2002.", "lat": 30.0444, "lon": 31.2357},
    ],
    "classification": "No appellation system.",
    "climate_soils": "Desert climate with almost no rain; vineyards on sandy and calcareous soils near the Mediterranean coast and on the Nile valley margins are fully irrigated, and growers use shading and pergolas against the heat.",
    "grapes": [{"name": "Bannati", "note": "Local white grape revived by Kouroum of the Nile."}, {"name": "Cabernet Sauvignon, Syrah, Grenache, Tempranillo, Bobal", "note": "Main reds."}, {"name": "Viognier, Chardonnay, Muscat", "note": "Main whites."}],
    "regions": ["Mareotis and the north coast", "Middle Egypt (Nile valley)", "Western Desert oases"],
    "further_reading": ["Ancient Wine, Patrick E. McGovern", "Wine and Wine Offering in the Religion of Ancient Egypt, Mu-chou Poo"],
    "sources": SRC_EG,
}
s("eg", "Abydos, tomb U-j", "historic", 26.1752, 31.9080, "In the royal cemetery of Umm el-Qa'ab at Abydos, the tomb of a ruler of about 3150 BC (often called Scorpion I) contained dozens of imported wine jars with residues of resin and herbs, plus grape seeds and skins, and ivory labels that are among the earliest Egyptian writing.", "precise", cls="Predynastic royal tomb")
s("eg", "Tomb of Tutankhamun (KV62)", "historic", 25.7404, 32.6015, "The king's tomb in the Valley of the Kings held more than two dozen wine jars, most with ink dockets naming the regnal year, the estate (often in the western Delta), the chief vintner and the colour; analysis identified red, white and shedeh.", "precise", cls="Royal tomb")
s("eg", "Tomb of Nakht, Sheikh Abd el-Qurna", "historic", 25.7320, 32.6076, "Theban tomb TT52, about 1400 BC, whose painted vintage scene shows grape picking from a pergola, treading in a vat and the filling of amphorae.", "approx", cls="Painted tomb")
s("eg", "Gianaclis (Alexandria)", "house", 31.1997, 29.8969, "Alexandria home of the Gianaclis brand, founded by Nestor Gianaclis, who planted Egypt's first modern vineyard south of the city in 1882; now part of Al Ahram Beverages (Heineken). The vineyards themselves lie in the desert south of Alexandria.", "approx", producers=["Gianaclis"])
s("eg", "Lake Mareotis", "landscape", 31.1679, 29.9265, "The lake south of Alexandria whose shores produced Mareotic wine, praised by Horace and Virgil, in Ptolemaic and Roman times.", "approx", cls="Ancient wine area")
s("eg", "Kharga Oasis", "historic", 25.4523, 30.5416, "Western Desert oasis whose Roman-era fortresses and settlements had vineyards and wine presses; oasis wine was famous in late antiquity.", "approx", cls="Ancient wine area")
s("eg", "Beni Hasan", "historic", 27.9313, 30.8753, "Middle Kingdom rock tombs whose paintings show grape harvesting and treading; Kouroum of the Nile's vineyards lie nearby on the Nile.", "precise", cls="Rock-cut tombs")

# ------------------------------------------------------------------ TUNISIA
SRC_TN = [
    {"title": "Wikipedia, Tunisian wine", "url": "https://en.wikipedia.org/wiki/Tunisian_wine"},
    {"title": "Wikipedia, Geographical indications in Tunisia (WIPO Lisbon register)", "url": "https://en.wikipedia.org/wiki/Geographical_indications_in_Tunisia"},
    {"title": "Wikipedia, Mago (agricultural writer)", "url": "https://en.wikipedia.org/wiki/Mago_(agricultural_writer)"},
]
tn = {
    "iso2": "tn", "name": "Tunisia", "tier": "emerging",
    "tagline": "Carthage's wine country, home of the first great agricultural writer and of Cap Bon's dry Muscat.",
    "stats": {"vineyard_ha": 31000, "year": 2008, "note": "Wikipedia: about 31,000 ha of vines in 2008, just over half for wine; production 300,000 to 400,000 hl a year in the 2000s. No recent OIV figure."},
    "overview": (
        "Tunisia is Carthage, and Carthage wrote the book on viticulture. The Punic agronomist Mago composed a 28-volume treatise on farming, including how to plant and prune vines and how to make passum, raisin wine; when Rome destroyed Carthage in 146 BC, the Senate ordered his work translated into Latin, and Columella, Varro and Pliny quoted it. The Punic town of Kerkouane on Cap Bon, preserved because it was never rebuilt, and Roman villas with wine mosaics (the Bardo museum in Tunis has some of the finest Dionysiac mosaics in the world) show how deeply wine ran through North African life.\n\n"
        "After the Arab conquest wine shrank but never vanished, and after the French protectorate began in 1881 large vineyards were planted on the plains around Tunis and on Cap Bon. Seven appellations were created between 1958 and the 1970s and registered internationally under the Lisbon Agreement. Since the late 1990s European investment (from Italy, France and Germany) has modernised a sector that was largely run by state and cooperative wineries.\n\n"
        "Tunisian wine is mostly rosé and red from Mediterranean grapes (Carignan, Cinsault, Grenache, Mourvèdre, Syrah, Alicante Bouschet), with dry and sweet Muscat of Alexandria on the windy tip of Cap Bon at Kélibia as the local speciality. The country sells mostly at home, to tourists and to Germany and France."
    ),
    "history": [
        {"when": "c. 4th to 2nd century BC", "title": "Mago's treatise", "text": "The Carthaginian Mago wrote a 28-book agricultural manual, translated into Latin on the Roman Senate's orders after 146 BC; its fragments include advice on vines and raisin wine.", "lat": 36.8548, "lon": 10.331},
        {"when": "4th to 3rd century BC", "title": "Kerkouane", "text": "A Punic town on Cap Bon abandoned around 250 BC and never rebuilt, giving a rare picture of Carthaginian domestic life in the Muscat country of Kélibia.", "lat": 36.9464, "lon": 11.0992},
        {"when": "1881 to 1956", "title": "The French vineyard", "text": "Under the French protectorate large estates were planted around Tunis, Mornag and Cap Bon, mostly for bulk wine shipped to France.", "lat": 36.5872, "lon": 10.2438},
        {"when": "1958 to 1973", "title": "Tunisia's AOCs", "text": "Muscat de Kélibia and Muscat de Thibar (1958), then Mornag, Coteaux de Tébourba and Sidi Salem (1973) and others were created as appellations.", "lat": 36.8457, "lon": 11.0936},
    ],
    "classification": "Tunisia has a French-style system of appellations d'origine contrôlée, with seven names registered under the Lisbon Agreement: Grand Cru Mornag, Mornag, Coteaux de Tébourba, Sidi Salem, Kélibia (Muscat de Kélibia), Thibar (Muscat de Thibar) and Coteaux d'Utique. Labels also use 'Premier Cru' for higher-quality AOC wines.",
    "climate_soils": "Mediterranean north and Cap Bon with hot summers and winter rain; sandy and clay-limestone soils; the Atlas foothills around Thibar and Bou Arada are higher and cooler.",
    "grapes": [{"name": "Carignan, Cinsault, Grenache, Mourvèdre, Syrah, Alicante Bouschet, Merlot", "note": "Reds and rosés."}, {"name": "Muscat of Alexandria", "note": "Kélibia's grape, dry and sweet."}, {"name": "Chardonnay, Pedro Ximénez, Clairette", "note": "Other whites."}],
    "regions": ["Grand Tunis and Mornag", "Cap Bon", "Bizerte and Utique", "Haut Tell (Thibar)"],
    "further_reading": [],
    "sources": SRC_TN,
}
def Atn(name, match, created, styles, dom, grapes, region, summary):
    return {"country": "tn", "name": name, "match": match, "cat": "AOC", "region": region, "created": created, "styles": styles, "dominant_style": dom, "grapes": grapes, "summary": summary}
tn_apps = [
    Atn("Mornag", ["Mornag", "Mornag V.D.Q.S", "AOC Mornag"], "1973", ["red", "rose", "white"], "red", "Carignan, Cinsault, Grenache, Mourvèdre, Syrah", "Grand Tunis and Mornag",
        "The largest Tunisian appellation, on the plain and hills south-east of Tunis around Mornag, Khledia and the slopes of Djebel Ressas. Most of the country's reds and rosés come from here."),
    Atn("Grand Cru Mornag", ["Grand Cru Mornag", "Mornag Grand Cru"], "1970s", ["red"], "red", "Carignan, Grenache, Syrah, Mourvèdre, Cabernet Sauvignon", "Grand Tunis and Mornag",
        "The top tier of the Mornag area, from lower-yielding hillside vineyards; 'Grand Cru' is part of the registered name."),
    Atn("Coteaux de Tébourba", ["Coteaux de Tébourba", "Côteaux de Tebourba", "Coteau de Tébourba"], "1973", ["red", "rose", "white"], "red", "Carignan, Cinsault, Grenache, Mourvèdre", "Grand Tunis and Mornag",
        "Hills along the Medjerda river west of Tunis around Tébourba, once a centre of French colonial estates."),
    Atn("Sidi Salem", ["Sidi Salem"], "1973", ["red", "rose"], "red", "Carignan, Cinsault, Grenache", "Grand Tunis and Mornag",
        "A small appellation in the hinterland of Tunis; reds and rosés from Mediterranean varieties."),
    Atn("Coteaux d'Utique", ["Coteaux d'Utique", "Côteaux d'Utique"], "1970s", ["red", "rose"], "red", "Carignan, Cinsault, Grenache, Mourvèdre", "Bizerte and Utique",
        "Named after the Phoenician city of Utica, older than Carthage, on the lower Medjerda north-west of Tunis."),
    Atn("Kélibia", ["Kelibia", "Kélibia", "Muscat de Kelibia", "Vin Muscat de Kelibia"], "1958", ["white", "sweet"], "white", "Muscat of Alexandria", "Cap Bon",
        "Muscat de Kélibia comes from the sandy, windswept tip of Cap Bon around Kélibia, made dry and aromatic (unusually for Muscat of Alexandria) as well as sweet. Kerkouane's Punic ruins lie just north."),
    Atn("Thibar", ["Thibar", "Muscat de Thibar"], "1958", ["sweet"], "sweet", "Muscat", "Haut Tell (Thibar)",
        "Muscat de Thibar comes from the hills of Béja governorate, where the White Fathers missionaries founded a domain in 1895 and made wine and Thibarine liqueur."),
]
for name, kind, lat, lon, text, cq, kw in [
    ("Carthage", "historic", 36.8548, 10.3310, "The Phoenician and Punic metropolis whose agronomist Mago wrote the classic treatise on farming and viticulture; destroyed by Rome in 146 BC and rebuilt as a Roman city. A UNESCO World Heritage Site.", "approx", {"cls": "Archaeological site (UNESCO)"}),
    ("Kerkouane", "historic", 36.9464, 11.0992, "The best-preserved Punic town, on Cap Bon near Kélibia, abandoned in the third century BC and never rebuilt (UNESCO).", "precise", {"cls": "Punic town (UNESCO)", "app": "Kélibia"}),
    ("Domaine Neferis", "estate", 36.6042, 10.4176, "A Tunisian-Italian estate near Grombalia on Cap Bon, one of the modern wineries built since the late 1990s.", "approx", {"producers": ["Domaine Neferis"]}),
    ("Domaine Atlas", "estate", 36.5333, 10.5357, "A Tunisian-German estate near Bou Argoub on Cap Bon, one of the private wineries founded after the sector opened to foreign investment in the late 1990s. It makes AOC and Premier Cru reds and rosés from Mediterranean grapes on sandy coastal soils.", "approx", {"producers": ["Domaine Atlas"]}),
    ("Kélibia", "village", 36.8457, 11.0936, "Fishing town at the tip of Cap Bon and centre of AOC Muscat de Kélibia.", "approx", {"app": "Kélibia"}),
    ("Thibar", "village", 36.5218, 9.1050, "Village in the Béja hills where the White Fathers planted vines in the 1890s; home of Muscat de Thibar.", "approx", {"app": "Thibar"}),
    ("Mornag", "village", 36.5872, 10.2438, "Town on the plain south-east of Tunis at the heart of Tunisia's largest appellation, created in 1973. French colonists planted the area after 1881; today its reds and rosés from Carignan, Grenache, Cinsault and Syrah supply much of the country's wine.", "approx", {"app": "Mornag"}),
]:
    s("tn", name, kind, lat, lon, text, cq, **kw)

# ------------------------------------------------------------------ ALGERIA
SRC_DZ = [
    {"title": "OIV, State of the World Wine Sector in 2025 (Algeria vineyard area)", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf"},
    {"title": "Wein-Plus Glossary, Algeria", "url": "https://glossary.wein-plus.eu/algeria"},
    {"title": "Wikipedia, Algerian wine", "url": "https://en.wikipedia.org/wiki/Algerian_wine"},
]
dz = {
    "iso2": "dz", "name": "Algeria", "tier": "emerging",
    "tagline": "Once the world's biggest wine exporter, now a quiet producer of sun-baked reds from the hills of Oran and Médéa.",
    "stats": {"vineyard_ha": 68000, "year": 2025, "note": "OIV 2025: 68 kha of vines (table and wine grapes). Wine production around 500,000 hl in the 2010s (Wein-Plus: 492,000 hl in 2012)."},
    "overview": (
        "Algeria's wine story is one of the most dramatic in the world. Phoenicians, Carthaginians and Romans made wine here, and it faded after the Islamic conquest. Then France arrived in 1830, and when phylloxera destroyed French vineyards from the 1860s, settlers planted the Algerian plains and hills on an enormous scale. Production rose from about 25,000 hectolitres in 1854 to 10 million by 1915; by the late 1930s around 400,000 hectares of vines covered the colony, and by around 1960 output reached some 16 million hectolitres. With Morocco and Tunisia, Algeria then accounted for nearly two thirds of the international wine trade, most of it deep-coloured, high-alcohol red shipped to Sète and blended into the thin wines of the Languedoc.\n\n"
        "Independence in 1962 broke the system. The pied-noir growers and the French army, the domestic market, left; France sharply cut its purchases; a Soviet contract from 1969 took 500 million litres a year at low prices; and the state, uneasy about depending on alcohol, encouraged growers to replace vines with cereals and table grapes. Within a few decades the wine vineyard shrank to a small fraction of its colonial peak.\n\n"
        "Today the state marketing office ONCV (Office National de Commercialisation des Produits Vitivinicoles) dominates production, alongside a few private companies (Grands Crus de l'Ouest and others). Most vineyards lie in the west around Mascara, Tlemcen, Aïn Témouchent and Sidi Bel Abbès, and in the Médéa and Aïn Bessem hills south of Algiers. Seven quality zones survive from the colonial VDQS: Coteaux de Mascara, Coteaux de Tlemcen, Monts du Tessalah, Dahra, Coteaux du Zaccar, Médéa and Aïn Bessem-Bouira. Wines are sturdy reds from Carignan, Cinsault, Grenache and Alicante Bouschet, rosés, and whites from Clairette and Ugni Blanc."
    ),
    "history": [
        {"when": "1854 to 1915", "title": "The great planting", "text": "As phylloxera ravaged France, settlers planted Algeria; production rose from about 25,000 hl to 10 million hl, helped by winemakers from Baden and the south of France.", "lat": 36.75, "lon": 3.06},
        {"when": "1938", "title": "Peak vineyard", "text": "About 400,000 ha of vines covered French Algeria, one of the largest vineyards in the world.", "lat": 35.4, "lon": 0.14},
        {"when": "c. 1960", "title": "Sixteen million hectolitres", "text": "Algeria produced around 16 million hl and was the world's largest wine exporter, mostly for blending in southern France.", "lat": 35.7, "lon": -0.63},
        {"when": "1962", "title": "Independence and collapse", "text": "The departure of settlers and French cuts in imports, then policy favouring cereals, shrank the vineyard dramatically in the following decades.", "lat": 36.75, "lon": 3.06},
    ],
    "classification": "Seven quality zones (labelled AOG, appellation d'origine garantie) recognised by the ONCV, inherited from French VDQS designations: Coteaux de Mascara, Coteaux de Tlemcen, Monts du Tessalah, Dahra, Coteaux du Zaccar, Médéa and Aïn Bessem-Bouira.",
    "climate_soils": "Mediterranean climate on the coastal hills and the Tell Atlas, with about 400 mm of rain in the west and 600 mm in the east; vineyards up to about 1,200 metres around Médéa; clay-limestone and sandy soils.",
    "grapes": [{"name": "Carignan, Cinsault, Grenache, Alicante Bouschet", "note": "The historic colonial reds."}, {"name": "Syrah, Mourvèdre, Cabernet Sauvignon, Merlot, Pinot Noir", "note": "Newer reds."}, {"name": "Clairette, Ugni Blanc, Merseguera", "note": "Whites."}],
    "regions": ["Oranie (western Algeria)", "Algérois (central Algeria)"],
    "further_reading": ["Wine and Empire: Viticulture in French Algeria (studies by Giulia Meloni and Johan Swinnen)"],
    "sources": SRC_DZ,
}
def Adz(name, match, region, summary):
    return {"country": "dz", "name": name, "match": match, "cat": "AOG", "region": region, "created": "Colonial VDQS; ONCV quality zone", "styles": ["red", "rose", "white"], "dominant_style": "red", "grapes": "Carignan, Cinsault, Grenache, Alicante Bouschet, Syrah, Clairette", "summary": summary}
dz_apps = [
    Adz("Coteaux de Mascara", ["Coteaux de Mascara", "Mascara"], "Oranie (western Algeria)", "The most famous Algerian name, from the hills around Mascara in the west, whose heavy, dark reds were prized for blending in colonial times and are counted among the country's best today."),
    Adz("Coteaux de Tlemcen", ["Coteaux de Tlemcen", "Tlemcen"], "Oranie (western Algeria)", "Hills around the historic city of Tlemcen near the Moroccan border, at 600 to 900 metres; a source of the ONCV's Cuvée du Président blend."),
    Adz("Monts du Tessalah", ["Monts du Tessalah", "Tessalah"], "Oranie (western Algeria)", "The Tessala mountains near Sidi Bel Abbès, south of Oran; reds and rosés."),
    Adz("Dahra", ["Dahra"], "Oranie (western Algeria)", "The coastal Dahra massif between Mostaganem and Ténès, with sea-cooled hillside vineyards; a component of the Cuvée du Président."),
    Adz("Coteaux du Zaccar", ["Coteaux du Zaccar", "Zaccar"], "Algérois (central Algeria)", "The slopes of Mount Zaccar around Miliana, south-west of Algiers."),
    Adz("Médéa", ["Médéa", "Medea"], "Algérois (central Algeria)", "High vineyards in the Tell Atlas around Médéa, up to about 1,200 metres, among the coolest in Algeria."),
    Adz("Aïn Bessem-Bouira", ["Aïn Bessem-Bouira", "Ain Bessem Bouira", "Aïn Bessem"], "Algérois (central Algeria)", "The plateau around Aïn Bessem and Bouira, south-east of Algiers, known for rosés."),
]
for name, kind, lat, lon, text, kw in [
    ("Mascara", "village", 35.3978, 0.2430, "Hill town south-east of Oran, centre of the Coteaux de Mascara zone and of colonial Algeria's most famous wines.", {"app": "Coteaux de Mascara"}),
    ("Médéa", "village", 35.9752, 3.0124, "Highland town in the Tell Atlas south of Algiers, centre of the Médéa zone with vineyards up to about 1,200 metres.", {"app": "Médéa"}),
    ("Tlemcen", "village", 34.8818, -1.3167, "Historic city of Zayyanid mosques near the Moroccan border at the heart of the Coteaux de Tlemcen, one of Algeria's seven quality zones. Vineyards on the surrounding hills at 600 to 900 metres supply the ONCV's Cuvée du Président blend.", {"app": "Coteaux de Tlemcen"}),
    ("Sidi Brahim", "village", 35.2607, -0.5675, "Village near Sidi Bel Abbès whose name became one of the best-known Algerian wine brands in France.", {}),
]:
    s("dz", name, kind, lat, lon, text, "approx", **kw)

# ------------------------------------------------------------------ MOROCCO
SRC_MA = [
    {"title": "Wikipedia, Moroccan wine", "url": "https://en.wikipedia.org/wiki/Moroccan_wine"},
    {"title": "Wikipedia, Brahim Zniber", "url": "https://en.wikipedia.org/wiki/Brahim_Zniber"},
]
ma = {
    "iso2": "ma", "name": "Morocco", "tier": "emerging",
    "tagline": "The Arab world's leading quality producer, with an AOC in the Atlas foothills and a national love of vin gris.",
    "stats": {"vineyard_ha": 50000, "production_mhl": 0.4, "year": 2013, "note": "Wikipedia: about 50,000 ha of vines in the early 2000s, most for table grapes; wine production about 400,000 hl in 2013."},
    "overview": (
        "Morocco grew vines in Roman times (the ruins of Volubilis, near Meknès, have olive presses and Bacchic mosaics) and again under the French protectorate from 1912, when colonists planted around Meknès, Fès, Rabat and Casablanca. Production peaked above 3 million hectolitres in the 1950s. After independence (1956) the EEC's quotas of 1967 cut exports, and from 1973 the state took over most vineyards; quality fell until the 1990s, when the state company SODEA leased land to foreign investors, mainly French, such as Castel and William Pitters.\n\n"
        "The central figure of modern Moroccan wine was Brahim Zniber (about 1920 to 2016), who built Celliers de Meknès and the Diana Holding group into a business that by 2016 controlled about 85 percent of national production and some 8,300 hectares. His Château Roslane, near Meknès, became in 2009 the first estate with 'château' status, and its vineyards make up the country's only AOC, Coteaux de l'Atlas 1er Cru (2001).\n\n"
        "Morocco has about 14 AOG zones (appellation d'origine garantie) grouped into five regions, from Berkane and Angad in the east to Guerrouane, Beni M'tir and Zerhoune around Meknès, Zemmour and Zaër near Rabat, and Doukkala inland from El Jadida. Most wine is red, from Cinsault, Carignan, Grenache, Cabernet, Merlot and Syrah, but the national style is vin gris, a very pale rosé from Cinsault and Grenache, the best-selling wine in a country where sale to Muslims is technically forbidden and consumption is concentrated in cities, hotels and among tourists. Castel's Boulaouane was for years the best-selling foreign wine in France."
    ),
    "history": [
        {"when": "1st to 3rd century AD", "title": "Roman Volubilis", "text": "The Roman city near Meknès had presses and Bacchic mosaics; the region's wine and oil were traded across the empire.", "lat": 34.0735, "lon": -5.5554},
        {"when": "1912 to 1956", "title": "The protectorate vineyard", "text": "French settlers planted around Meknès, Fès, Rabat and Casablanca; output passed 3 million hl in the 1950s.", "lat": 33.8984, "lon": -5.5322},
        {"when": "1973 to 1990s", "title": "State control and foreign revival", "text": "The state took over vineyards in 1973; from the 1990s SODEA leased them to French investors.", "lat": 33.62, "lon": -7.13},
        {"when": "2001", "title": "Coteaux de l'Atlas 1er Cru", "text": "Morocco's first and only AOC was created for vineyards of Celliers de Meknès around Château Roslane.", "lat": 33.7587, "lon": -5.4389},
    ],
    "classification": "Morocco's system, set up from the 1970s and revised in the 1990s and 2000s, has about 14 AOG zones (appellations d'origine garanties) and one AOC, Coteaux de l'Atlas 1er Cru. 'Château' status for single estates was first granted to Château Roslane in 2009.",
    "climate_soils": "Mediterranean with Atlantic influence on the coast; the Meknès plateau at 500 to 700 metres and the Middle Atlas foothills are cooler and get 500 to 600 mm of rain. Soils are clay-limestone and sandy; the eastern zones near Berkane are drier.",
    "grapes": [{"name": "Cinsault", "note": "The most planted wine grape, base of vin gris."}, {"name": "Carignan, Grenache, Alicante Bouschet", "note": "Traditional reds."}, {"name": "Cabernet Sauvignon, Merlot, Syrah", "note": "Modern reds."}, {"name": "Chardonnay, Sauvignon Blanc, Muscat", "note": "Whites."}],
    "regions": ["Meknès and Fès", "Rabat and Casablanca", "Eastern Morocco (Berkane)", "Northern plains (Gharb)", "El Jadida (Doukkala)"],
    "further_reading": [],
    "sources": SRC_MA,
}
def Ama(name, match, cat, region, summary, created="1970s to 1990s"):
    return {"country": "ma", "name": name, "match": match, "cat": cat, "region": region, "created": created, "styles": ["red", "rose", "white"], "dominant_style": "red", "grapes": "Cinsault, Carignan, Grenache, Cabernet Sauvignon, Merlot, Syrah", "summary": summary}
ma_apps = [
    Ama("Coteaux de l'Atlas 1er Cru", ["Coteaux de l'Atlas 1er Cru", "Coteaux de l'Atlas Premier Cru", "Coteaux de l'Atlas"], "AOC", "Meknès and Fès", "Morocco's only AOC, created in 2001 for vineyards of Celliers de Meknès on the Meknès plateau around Château Roslane, at about 600 to 700 metres in the foothills of the Middle Atlas; mainly red blends of Cabernet Sauvignon, Merlot and Syrah aged in oak.", "2001"),
    Ama("Guerrouane", ["Guerrouane"], "AOG", "Meknès and Fès", "A large AOG west of Meknès known for vin gris and soft reds; Les Celliers de Meknès and Castel source much of their wine here."),
    Ama("Beni M'tir", ["Beni M'tir", "Beni Mtir"], "AOG", "Meknès and Fès", "Plateau south of Meknès at around 700 to 800 metres, among the coolest and highest Moroccan vineyards, including the area around Boufekrane and El Hajeb."),
    Ama("Saïss", ["Saïss", "Saiss"], "AOG", "Meknès and Fès", "The Saïss plain between Meknès and Fès."),
    Ama("Zerhoune", ["Zerhoune", "Zerhoun"], "AOG", "Meknès and Fès", "Hills around Moulay Idriss Zerhoun and the Roman ruins of Volubilis north of Meknès."),
    Ama("Berkane", ["Berkane"], "AOG", "Eastern Morocco (Berkane)", "Eastern zone near the Mediterranean and the Algerian border, around Berkane; reds and rosés."),
    Ama("Angad", ["Angad"], "AOG", "Eastern Morocco (Berkane)", "The Angad plain around Oujda in the far east."),
    Ama("Beni Sadden", ["Beni Sadden", "Beni Saden"], "AOG", "Eastern Morocco (Berkane)", "A small eastern zone."),
    Ama("Gharb", ["Gharb"], "AOG", "Northern plains (Gharb)", "The fertile Gharb plain around Sidi Slimane north-east of Kenitra."),
    Ama("Chellah", ["Chellah"], "AOG", "Rabat and Casablanca", "Named after the Roman and Merinid site of Chellah at Rabat; vineyards on the coastal hinterland."),
    Ama("Zemmour", ["Zemmour"], "AOG", "Rabat and Casablanca", "Inland from Rabat around Khémisset."),
    Ama("Zaër", ["Zaër", "Zaer"], "AOG", "Rabat and Casablanca", "South-east of Rabat around Rommani and Benslimane, home of Thalvin's Domaine des Ouled Thaleb."),
    Ama("Zenata", ["Zenata", "Zenatta"], "AOG", "Rabat and Casablanca", "Coastal hills between Casablanca and Mohammédia, with Atlantic influence."),
    Ama("Sahel", ["Sahel"], "AOG", "Rabat and Casablanca", "Coastal zone south of Casablanca."),
    Ama("Doukkala", ["Doukkala"], "AOG", "El Jadida (Doukkala)", "Inland from El Jadida around Boulaouane, whose Castel-owned brand was long France's best-selling imported wine."),
]
for name, kind, lat, lon, text, cq, kw in [
    ("Château Roslane", "chateau", 33.7587, -5.4389, "The Celliers de Meknès flagship estate in the foothills of the Middle Atlas near El Hajeb, granted Morocco's first château status in 2009; its vineyards make AOC Coteaux de l'Atlas 1er Cru.", "precise", {"app": "Coteaux de l'Atlas 1er Cru", "producers": ["Celliers de Meknès"]}),
    ("Volubilis", "historic", 34.0735, -5.5554, "Roman city near Meknès (UNESCO) with olive presses and Bacchic mosaics, at the centre of today's Zerhoune and Guerrouane wine zones.", "precise", {"cls": "Roman city (UNESCO)"}),
    ("Domaine des Ouled Thaleb (Thalvin)", "estate", 33.6183, -7.1892, "One of Morocco's oldest wineries, founded in the 1920s near Benslimane in the Zaër zone, run by Thalvin.", "approx", {"app": "Zaër", "producers": ["Thalvin"]}),
    ("Boulaouane", "village", 32.8638, -8.0601, "Kasbah village in the Doukkala whose name became the brand of Morocco's most exported wine.", "approx", {"app": "Doukkala"}),
    ("Meknès", "village", 33.8984, -5.5322, "Imperial city of the Alaouite sultan Moulay Ismail and the capital of Moroccan wine, seat of Celliers de Meknès, the company Brahim Zniber built into the producer of about 85 percent of the country's wine by 2016. Most AOG zones of the Saïss plateau surround it.", "approx", {}),
]:
    s("ma", name, kind, lat, lon, text, cq, **kw)

# ------------------------------------------------------------------ LIBYA
ly = {
    "iso2": "ly", "name": "Libya", "tier": "minor",
    "tagline": "Greek Cyrene and Roman Leptis drank local wine; production has been banned since 1969.",
    "stats": {"note": "No legal wine production since 1969."},
    "overview": "Libya's coast has two ancient wine landscapes. In the east, Greek colonists from Thera (Santorini) founded Cyrene around 630 BC on the green, rain-fed plateau of the Jebel Akhdar, where vines, olives and grain grew; Cyrenaica traded wine and the famous medicinal plant silphium across the Greek world. In the west, Tripolitania was Punic and then Roman: Leptis Magna, Oea (Tripoli) and Sabratha grew rich on olive oil, and the region also made wine for local use.\n\nItaly took Libya from the Ottomans in 1911 and from the 1930s settled tens of thousands of colonists, who planted vineyards in Tripolitania and on the Jebel Akhdar. After Muammar Gaddafi's coup of 1969 alcohol was banned, and the remaining Italian settlers were expelled in 1970. Libya has had no legal wine industry since, and its grapes are grown for the table.",
    "history": [
        {"when": "c. 630 BC", "title": "Greek Cyrene", "text": "Greek settlers from Thera (Santorini) founded Cyrene and farmed the green Jebel Akhdar, including vines.", "lat": 32.8207, "lon": 21.8551},
        {"when": "1969", "title": "Alcohol banned", "text": "After the revolution of 1969 Libya prohibited alcohol, ending the Italian-era wine industry.", "lat": 32.8872, "lon": 13.1913},
    ],
    "classification": "None.", "climate_soils": "Mediterranean coastal strip; desert inland.", "grapes": [], "regions": [], "further_reading": [],
    "sources": [{"title": "Wikipedia, Cyrene; Alcohol in Libya", "url": "https://en.wikipedia.org/wiki/Cyrene,_Libya"}],
}
s("ly", "Cyrene", "historic", 32.8207, 21.8551, "Greek city founded around 630 BC by settlers from Thera, in the wet Jebel Akhdar, where vines and olives grew; a UNESCO World Heritage Site.", "precise", cls="Archaeological site (UNESCO)")

if __name__ == "__main__":
    by = lambda iso: [x for x in S if x["country"] == iso]
    save("eg", {"countries": [eg], "regions": [], "appellations": [], "sites": by("eg")})
    save("tn", {"countries": [tn], "regions": [], "appellations": tn_apps, "sites": by("tn")})
    save("dz", {"countries": [dz], "regions": [], "appellations": dz_apps, "sites": by("dz")})
    save("ma", {"countries": [ma], "regions": [], "appellations": ma_apps, "sites": by("ma")})
    save("ly", {"countries": [ly], "regions": [], "appellations": [], "sites": by("ly")})
