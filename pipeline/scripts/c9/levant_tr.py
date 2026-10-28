import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c9")
from c9_common import site, save

S = []
def s(iso, *a, **k): S.append(site(iso, *a, **k))

# ------------------------------------------------------------------ TURKEY
SRC_TR = [
    {"title": "OIV, State of the World Wine Sector in 2025", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf"},
    {"title": "Wikipedia, Turkish wine", "url": "https://en.wikipedia.org/wiki/Turkish_wine"},
    {"title": "Wikipedia, Tekel", "url": "https://en.wikipedia.org/wiki/Tekel"},
]
tr = {
    "iso2": "tr", "name": "Türkiye", "tier": "notable",
    "tagline": "The world's sixth-largest vineyard, almost all for eating, with a small and stubborn wine scene built on Öküzgözü, Boğazkere, Kalecik Karası and Emir.",
    "stats": {"vineyard_ha": 395000, "year": 2025, "note": "OIV 2025: 395 kha of vines, the sixth largest vineyard in the world, but mostly table grapes and raisins (Sultaniye); only a small share of the crop, estimated at 3 to 15 percent, is made into wine. Wine output below the OIV's 1 mhl reporting threshold."},
    "overview": (
        "Anatolia is one of the places where the grapevine was domesticated, and wine runs through its ancient history: Hittite laws of the second millennium BC fined anyone who damaged a vineyard, Assyrian merchants at Kültepe traded wine, the Phrygians and Lydians shipped it across the Aegean, and the Ionian coast was Dionysus's home ground. Under the Ottomans, commercial winemaking was the business of non-Muslim communities (Greeks, Armenians, Syriacs and Jews), and the population exchanges and expulsions of the early twentieth century took much of that knowledge with them.\n\n"
        "The Republic restarted the industry from the top. Atatürk ordered a state winery at Tekirdağ in 1925, the Tekel monopoly controlled alcohol for most of the century, and the private houses that still dominate, Doluca (1926) and Kavaklıdere (1929), date from those years. Tekel's wine division was privatised in 2004 (its successor, Kayra, owns the historic Buzbağ brand), and a wave of new estates in Thrace, on the Aegean and in Cappadocia began replanting native grapes alongside Cabernet and Merlot. There are now roughly 140 licensed wineries.\n\n"
        "The native grapes are the reason to pay attention. Öküzgözü ('ox eye') from Elazığ is juicy and bright; Boğazkere ('throat-scratcher') from Diyarbakır is dark and tannic, and the two together are the classic Turkish red blend. Kalecik Karası, rescued by Ankara University in the 1960s and 1970s from near extinction, makes pale, perfumed, Pinot-like reds near Ankara. Emir grows on the volcanic tuff of Cappadocia and gives crisp, mineral whites and traditional-method sparkling; Narince, from Tokat, gives fuller whites. On the Aegean, Urla Karası and Bornova Misketi have been brought back from near extinction.\n\n"
        "The obstacle is policy. Since a 2013 law, alcohol advertising and promotion are banned, producers cannot advertise or even show their wines in most media, sales are restricted at night and near schools and mosques, and special consumption tax is among the highest in Europe and is revised upward regularly. Domestic consumption is tiny (about one litre per person a year), so the industry lives from tourism, the urban middle class and a small export trade."
    ),
    "history": [
        {"when": "c. 1900 BC", "title": "Wine in the Assyrian colony at Kültepe", "text": "Clay tablets from the Old Assyrian merchant colony at Kültepe (Kanesh), near Kayseri, record wine among the goods traded across Anatolia.", "lat": 38.8506, "lon": 35.6346},
        {"when": "c. 1650 to 1200 BC", "title": "Hittite vineyard laws", "text": "Hittite law codes from Hattusa set penalties for damaging vineyards and ritual texts describe wine libations to the gods.", "lat": 40.0222, "lon": 34.6197},
        {"when": "1925", "title": "Atatürk's state winery", "text": "The new Republic ordered a state winery at Tekirdağ in Thrace; Tekel later held the alcohol monopoly.", "lat": 40.978, "lon": 27.511},
        {"when": "1926 and 1929", "title": "Doluca and Kavaklıdere", "text": "The two private houses that still lead the industry were founded in Thrace (Doluca at Mürefte) and Ankara (Kavaklıdere).", "lat": 40.6644, "lon": 27.2378},
        {"when": "2004", "title": "Tekel's wine business privatised", "text": "The state monopoly's alcoholic drinks division was privatised; its wineries became Kayra, and a generation of boutique estates followed.", "lat": 38.6744, "lon": 39.2228},
        {"when": "2013", "title": "The alcohol advertising ban", "text": "Law 6487 banned alcohol advertising and promotion and restricted retail sales between 22:00 and 06:00, sharply limiting how Turkish wineries can reach customers.", "lat": 39.9334, "lon": 32.8597},
    ],
    "classification": "Türkiye has no operational appellation system for wine comparable to the EU's; labels name grapes, wineries and broad regions (Thrace, Aegean, Cappadocia, Eastern Anatolia). A few geographical indications exist for grapes and other products, and producer groups such as Thrace's 'Trakya' wine route promote regional identity.",
    "climate_soils": "Four broad zones: maritime Thrace and the Marmara coast; the Mediterranean Aegean coast and its hotter inland plateaus (Denizli, Manisa); continental Central Anatolia at 800 to 1,200 metres, including Cappadocia's volcanic tuff, where growers sometimes bury vines against winter frost; and the hot, dry, high Euphrates valley of Eastern Anatolia (Elazığ, Malatya, Diyarbakır).",
    "grapes": [
        {"name": "Öküzgözü", "note": "Elazığ's 'ox-eye' red: juicy, bright, low tannin."},
        {"name": "Boğazkere", "note": "Diyarbakır's tannic, dark red; blended with Öküzgözü in Buzbağ and many modern reds."},
        {"name": "Kalecik Karası", "note": "Pale, perfumed red from the Kızılırmak valley near Ankara, revived from near extinction."},
        {"name": "Emir", "note": "Cappadocia's crisp white, still and sparkling."},
        {"name": "Narince", "note": "Fuller white from Tokat, also used for stuffed vine leaves."},
        {"name": "Papazkarası and Yapıncak", "note": "Thrace's native red and white."},
        {"name": "Urla Karası and Bornova Misketi", "note": "Aegean grapes revived around İzmir."},
        {"name": "Sultaniye", "note": "The seedless raisin grape of Manisa and Denizli, mostly for drying."},
    ],
    "regions": ["Thrace and Marmara", "Aegean", "Central Anatolia and Cappadocia", "Eastern and Southeastern Anatolia"],
    "further_reading": ["Turkish Wine: The Complete Guide (various), and the work of Jancis Robinson and Julia Harding on Turkish varieties", "Wine Grapes, Jancis Robinson, Julia Harding and José Vouillamoz"],
    "sources": SRC_TR,
}
tr_regions = [
    {"country": "tr", "name": "Thrace and Marmara", "alt": ["Trakya"], "parent_region": None, "lat": 40.9, "lon": 27.3, "zoom": 8,
     "tagline": "European Türkiye between three seas: the industry's historic base.", "summary": "Thrace and the Marmara coast make 30 to 40 percent of Turkish wine. Mürefte and Şarköy on the Sea of Marmara were Greek wine villages before 1923; Doluca and Kayra work there, and new estates (Chamlija, Arcadia, Barbare, Şato Kalpak, Gülor) planted Kırklareli and the Gelibolu peninsula from the 2000s.",
     "history": "The Tekirdağ state winery of 1925 and Doluca (1926) began the Republic's wine industry here.", "terroir": "Maritime climate moderated by the Aegean, the Marmara and the Black Sea; clay and limestone hills.",
     "grapes": "Papazkarası, Yapıncak, Cabernet Sauvignon, Merlot, Sauvignon Blanc, Chardonnay.", "styles": "Bordeaux-style reds, fresh whites, rosé.", "classification": "No appellations; regional name Trakya.", "appellations": [], "sources": SRC_TR},
    {"country": "tr", "name": "Aegean", "alt": ["Ege"], "parent_region": None, "lat": 38.5, "lon": 27.5, "zoom": 7.5,
     "tagline": "The largest wine region by volume: Urla, Bozcaada, Denizli and Manisa.", "summary": "The Aegean region makes around a third of Turkish wine. The coast has revived old Greek-era vineyards at Urla near İzmir and on the island of Bozcaada (ancient Tenedos); the inland plateaus of Denizli (especially Çal) and Manisa grow most of the country's Sultaniye and the rosé grape Çalkarası.",
     "history": "Smyrna (İzmir) was the Ottoman Empire's great export port for wine and raisins in the seventeenth century.", "terroir": "Mediterranean coast and higher inland plateaus at 600 to 850 metres.",
     "grapes": "Urla Karası, Bornova Misketi, Karalahna, Kuntra, Çavuş, Çalkarası, Sultaniye, international varieties.", "styles": "Reds, rosé, aromatic Muscat.", "classification": "No appellations.", "appellations": [], "sources": SRC_TR},
    {"country": "tr", "name": "Central Anatolia and Cappadocia", "alt": ["Kapadokya"], "parent_region": None, "lat": 39.2, "lon": 34.0, "zoom": 7.5,
     "tagline": "Volcanic tuff, cave cellars and Emir; Kalecik Karası near Ankara.", "summary": "Cappadocia's tuff landscape, with vineyards at 1,000 to 1,200 metres around Ürgüp, Uçhisar and Göreme, has stored wine in rock-cut cellars for centuries. Its white grape Emir makes crisp still and sparkling wines; Kalecik, north-east of Ankara, is the home of Kalecik Karası. Kavaklıdere and Vinkara (Kalecik) and the Cappadocian houses Turasan and Kocabağ are the main producers.",
     "history": "Cappadocia had a large Greek Orthodox population, exchanged in 1924; villages such as Mustafapaşa (Sinasos) still have their wine cellars.", "terroir": "Continental, 800 to 1,200 metres, cold winters (vines are sometimes buried), volcanic tuff and sand.",
     "grapes": "Emir, Kalecik Karası, Narince, Dimrit.", "styles": "Mineral whites, sparkling, light reds.", "classification": "No appellations.", "appellations": [], "sources": SRC_TR},
    {"country": "tr", "name": "Eastern and Southeastern Anatolia", "alt": ["Doğu Anadolu"], "parent_region": None, "lat": 38.4, "lon": 39.6, "zoom": 7.5,
     "tagline": "The Euphrates highlands of Öküzgözü and Boğazkere, and Syriac wine in Mardin.", "summary": "Elazığ and Malatya in the upper Euphrates valley are the heartland of Öküzgözü; the Diyarbakır plain grows Boğazkere. Most grapes are trucked west to wineries in Thrace and Ankara. In Mardin, the Syriac Christian community keeps a small tradition with the grape Mazrona.",
     "history": "Kayra's Elazığ winery, inherited from Tekel, produces Buzbağ, the classic Öküzgözü and Boğazkere blend.", "terroir": "Continental high plateaus at 900 to 1,200 metres, hot dry summers, cold winters.",
     "grapes": "Öküzgözü, Boğazkere, Horoz Karası, Mazrona.", "styles": "Structured reds.", "classification": "No appellations.", "appellations": [], "sources": SRC_TR},
]
s("tr", "Kavaklıdere winery", "house", 40.0804, 33.0168, "Founded in Ankara in 1929 and now based at Akyurt north-east of the capital, Kavaklıdere is Türkiye's largest private wine producer, with vineyards in Cappadocia, the Aegean and Thrace; its Pendore and Çankaya brands are national classics.", "precise", producers=["Kavaklıdere"])
s("tr", "Vinkara, Kalecik", "estate", 40.0952, 33.4545, "A winery in Kalecik on the Kızılırmak, near the village that gave its name to Kalecik Karası; known for still and traditional-method sparkling Kalecik Karası.", "precise", producers=["Vinkara"])
s("tr", "Turasan winery, Ürgüp", "house", 38.6332, 34.9042, "A Cappadocian family winery founded in 1943 in Ürgüp with cellars cut into the tuff; makes Emir, Narince and Öküzgözü.", "approx", producers=["Turasan"])
s("tr", "Kocabağ, Uçhisar", "estate", 38.6323, 34.7969, "Family winery at Uçhisar in Cappadocia, beside the fairy chimneys of Göreme, specialising in Emir and local reds.", "precise", producers=["Kocabağ"])
s("tr", "Urla Şarapçılık", "estate", 38.2529, 26.7365, "Can Ortabaş's winery on the Urla peninsula west of İzmir, which led the revival of the near-extinct Urla Karası and of Aegean vineyards abandoned after 1923.", "precise", producers=["Urla Şarapçılık"])
s("tr", "Corvus Vineyards, Bozcaada", "estate", 39.8292, 26.0408, "Architect Reşit Soley's estate on Bozcaada (ancient Tenedos), working the island's Karalahna and Çavuş alongside international grapes.", "approx", producers=["Corvus"])
s("tr", "Doluca, Mürefte", "house", 40.6644, 27.2378, "Founded in 1926 by Nihat Kutman at Mürefte on the Sea of Marmara, once a Greek wine village; Doluca introduced many international varieties to Türkiye.", "precise", producers=["Doluca"])
s("tr", "Chamlija", "estate", 41.2967, 27.5421, "Mustafa Çamlıca's estate in Büyükkarıştıran, Kırklareli, one of the leading boutique wineries of Thrace, known for Papazkarası and blends.", "approx", producers=["Chamlija"])
s("tr", "Hattusa", "historic", 40.0222, 34.6197, "The Hittite capital, whose archives include laws protecting vineyards and texts on wine offerings; a UNESCO World Heritage Site.", "precise", cls="Archaeological site")
s("tr", "Kültepe (Kanesh)", "historic", 38.8506, 35.6346, "The Bronze Age city and Assyrian merchant colony near Kayseri whose tablets record trade in wine around 1900 BC.", "precise", cls="Archaeological site")

# ------------------------------------------------------------------ LEBANON
SRC_LB = [
    {"title": "Wikipedia, Lebanese wine", "url": "https://en.wikipedia.org/wiki/Lebanese_wine"},
    {"title": "Wikipedia, Chateau Musar", "url": "https://en.wikipedia.org/wiki/Chateau_Musar"},
    {"title": "Wikipedia, Château Ksara", "url": "https://en.wikipedia.org/wiki/Ch%C3%A2teau_Ksara"},
    {"title": "Union Vinicole du Liban", "url": "https://www.uvl.org.lb"},
]
lb = {
    "iso2": "lb", "name": "Lebanon", "tier": "notable",
    "tagline": "Phoenician wine, Roman temples and Jesuit cellars, made every vintage through war in the high Bekaa.",
    "stats": {"vineyard_ha": 2500, "year": 2024, "note": "Wine-grape area approximate (roughly 2,000 to 3,000 ha of wine grapes; total vineyard including table grapes is larger). Lebanese wineries produced about 15 million bottles in 2024 despite the war, per press reports cited on Wikipedia; the Union Vinicole du Liban has estimated around 9 million bottles in normal years."},
    "overview": (
        "Lebanon is the coast that taught the Mediterranean to trade wine. Phoenician ports at Byblos, Tyre and Sidon shipped wine to Old Kingdom Egypt, and Phoenician sailors carried vines and amphorae to Carthage, Sicily, Sardinia and Spain; a seventh-century BC wine press at Tell el-Burak near Sidon shows production for export. The prophet Hosea compared Israel's future fame to 'the wine of Lebanon'. Under Rome, the great sanctuary at Baalbek in the Bekaa included the Temple of Bacchus, one of the best-preserved Roman temples anywhere, its doorway carved with vines and grapes.\n\n"
        "Four centuries of Ottoman rule kept commercial wine to Christian communities making it for the church. The modern revival began in the Bekaa in the mid-nineteenth century: Château Ksara was founded by Jesuits in 1857 near Zahlé, and in 1898 they found the Roman-era caves that are now its cellar; Domaine des Tourelles followed in 1868. The French Mandate created a market for wine in Beirut, and in 1930 Gaston Hochar founded Château Musar at Ghazir, north of Beirut. His son Serge, Bordeaux-trained under Émile Peynaud, made Musar from 1959 until his death in 2014 and turned it into one of the cult wines of the world after Michael Broadbent picked the 1967 at the Bristol Wine Fair of 1979.\n\n"
        "The legend of Lebanese wine is resilience. Through the civil war of 1975 to 1990, Musar missed only one vintage (1976); in 1982 its Bekaa vineyards lay on the front line between Syrian and Israeli tanks; in 2006 and again in 2024 harvests went on under airstrikes. Since the 1990s the number of wineries has grown from a handful to around 50 to 60, with Kefraya, Massaya, Ixsir, Domaine Wardy, Château Marsyas, Atibaia and many small producers. Most vineyards are in the Bekaa at about 900 to 1,200 metres, between the Mount Lebanon and Anti-Lebanon ranges, with newer high vineyards in Batroun, Jezzine and Mount Lebanon.\n\n"
        "Two native white grapes, Obaideh and Merwah, give Lebanon its own voice (they are the white in Château Musar Blanc), and producers are reviving others such as Zeini, Meksassi, Asmi Noir and Sabbagieh. Reds are mostly Cinsault, Carignan, Cabernet Sauvignon, Syrah, Grenache and Mourvèdre, with a warm, spicy character from sun and altitude."
    ),
    "history": [
        {"when": "c. 2500 BC", "title": "Byblos wine for the pharaohs", "text": "Wine from Byblos and the Phoenician coast was shipped to Old Kingdom Egypt, one of the earliest long-distance wine trades.", "lat": 34.1237, "lon": 35.6494},
        {"when": "7th century BC", "title": "The wine press of Tell el-Burak", "text": "Excavations near Sidon found a large plastered Phoenician wine press with vineyards nearby, built to produce wine for overseas trade.", "lat": 33.6262, "lon": 35.3866},
        {"when": "2nd century AD", "title": "The Temple of Bacchus at Baalbek", "text": "Rome built the Temple of Bacchus within the sanctuary of Heliopolis in the Bekaa, its stone carved with vines, grapes and drinking scenes.", "lat": 34.0061, "lon": 36.204},
        {"when": "1857", "title": "Jesuits found Château Ksara", "text": "Jesuit priests planted vines at Ksara near Zahlé; in 1898 they found Roman-era caves, now two kilometres of cellars.", "lat": 33.8263, "lon": 35.8923},
        {"when": "1930", "title": "Gaston Hochar founds Château Musar", "text": "Hochar, back from Bordeaux, set up Musar in an eighteenth-century castle at Ghazir; his son Serge took over winemaking in 1959.", "lat": 34.0163, "lon": 35.6699},
        {"when": "1979", "title": "Musar discovered at Bristol", "text": "Michael Broadbent named the 1967 Château Musar the discovery of the Bristol Wine Fair, opening the UK market.", "lat": 34.0163, "lon": 35.6699},
        {"when": "1975 to 1990", "title": "Vintages through civil war", "text": "Lebanese wineries kept harvesting through the civil war; Musar missed only 1976.", "lat": 33.85, "lon": 35.9},
        {"when": "2024", "title": "Harvest under fire", "text": "Israeli strikes hit the Bekaa during the 2024 war; producers still harvested and bottled around 15 million bottles.", "lat": 33.85, "lon": 35.9},
    ],
    "classification": "Lebanon has no appellation system. It joined the OIV in 1996, and the producers' association Union Vinicole du Liban, founded in 1997, promotes common standards and exports; labels carry winery names and broad regions (Bekaa Valley, Batroun, Mount Lebanon) rather than regulated appellations.",
    "climate_soils": "The Bekaa is a high plain at 900 to 1,200 metres between two ranges over 2,000 metres high: hot, dry summers with no rain from May to October, cold nights, snowy winters and snowmelt groundwater. Soils are limestone, clay and gravel, red in places. Coastal and Mount Lebanon vineyards (Batroun, Jezzine, Kesrouan) climb to 1,400 metres and more, with more maritime influence.",
    "grapes": [
        {"name": "Obaideh", "note": "Native white, rich and creamy with low acidity, sometimes said to be related to Chardonnay (not confirmed); in Musar Blanc."},
        {"name": "Merwah", "note": "Native white from Mount Lebanon, often linked to Sémillon; fresh and nutty."},
        {"name": "Cinsault", "note": "Planted by the Jesuits; the traditional red base of the Bekaa."},
        {"name": "Cabernet Sauvignon, Syrah, Carignan, Grenache, Mourvèdre", "note": "The main red blend components."},
        {"name": "Zeini, Meksassi, Sabbagieh, Asmi Noir", "note": "Rare native grapes being revived."},
    ],
    "regions": ["Bekaa Valley", "Batroun", "Mount Lebanon"],
    "further_reading": ["Wines of Lebanon, Michael Karam", "Arak and Mezze: The Taste of Lebanon, Michael Karam"],
    "sources": SRC_LB,
}
lb_regions = [
    {"country": "lb", "name": "Bekaa Valley", "alt": ["Beqaa"], "parent_region": None, "lat": 33.8, "lon": 35.85, "zoom": 9.5,
     "tagline": "A high plain between two mountain ranges, home of almost all Lebanese wine.", "summary": "The Bekaa produces most of Lebanon's wine, concentrated in the central and western valley around Zahlé, Chtaura, Kefraya, Tanail and the West Bekaa, with Baalbek's Roman temple at the northern end. Ksara, Kefraya, Musar's vineyards, Massaya, Domaine des Tourelles, Domaine Wardy and Château Marsyas are here.",
     "history": "Supplied the Phoenicians and the Roman army; Jesuit Ksara (1857) and Tourelles (1868) began modern production.", "terroir": "900 to 1,200 metres; limestone, clay and gravel; dry summers and cold winters.",
     "grapes": "Cinsault, Cabernet Sauvignon, Syrah, Carignan, Grenache, Mourvèdre, Obaideh, Chardonnay.", "styles": "Spicy, long-lived reds; rosé; whites.", "classification": "No appellations.", "appellations": [], "sources": SRC_LB},
    {"country": "lb", "name": "Batroun", "alt": ["Batroun District"], "parent_region": None, "lat": 34.22, "lon": 35.75, "zoom": 10,
     "tagline": "Coastal mountains north of Byblos, Lebanon's second wine area.", "summary": "The Batroun hills behind the coast grow vines from near sea level up to around 1,000 metres; Ixsir (in Basbina), Domaine de Baal's sister estates, Atibaia and others have made it Lebanon's most dynamic region outside the Bekaa.",
     "history": "A historic wine area near Byblos, revived since the 2000s.", "terroir": "Limestone terraces with sea influence.", "grapes": "Merwah, Obaideh, Syrah, Cabernet Sauvignon.", "styles": "Fresh whites, elegant reds.",
     "classification": "No appellations.", "appellations": [], "sources": SRC_LB},
    {"country": "lb", "name": "Mount Lebanon", "alt": ["Jezzine", "Kesrouan"], "parent_region": None, "lat": 33.9, "lon": 35.7, "zoom": 9.5,
     "tagline": "High terraces and the native Merwah.", "summary": "Scattered high vineyards in Kesrouan, the Chouf and Jezzine, often old terraces of Merwah and Obaideh; Château Musar's winery stands at Ghazir in Kesrouan, though its grapes come mostly from the Bekaa.",
     "history": "Christian villages kept winemaking alive under Ottoman rule.", "terroir": "Terraces at 1,000 to 1,700 metres.", "grapes": "Merwah, Obaideh.", "styles": "Whites, some reds.", "classification": "No appellations.", "appellations": [], "sources": SRC_LB},
]
s("lb", "Château Musar", "chateau", 34.0163, 35.6699, "Gaston Hochar's winery, founded in 1930 in an eighteenth-century castle at Ghazir above Jounieh Bay. Grapes travel from Bekaa vineyards over the mountains; the red (Cabernet Sauvignon, Cinsault, Carignan) is released after about seven years and the white is old-vine Obaideh and Merwah. Serge Hochar's 'natural' approach and its long-lived, variable vintages made it a cult wine.", "precise", producers=["Château Musar"])
s("lb", "Château Ksara", "chateau", 33.8263, 35.8923, "Lebanon's oldest and largest winery, founded by Jesuit priests in 1857 near Zahlé. In 1898 the Jesuits found Roman-era caves, now about two kilometres of cellars at constant temperature; the Vatican told the order to sell in 1972, and a Lebanese consortium bought it. About 3 million bottles a year.", "precise", producers=["Château Ksara"])
s("lb", "Château Kefraya", "chateau", 33.7728, 35.8096, "An estate in the West Bekaa on the slopes of Mount Barouk, founded as a winery in 1979 by Michel de Bustros; its Comte de M is one of Lebanon's top reds. During the 1982 invasion its French winemaker was arrested as a spy until he proved he made wine.", "approx", producers=["Château Kefraya"])
s("lb", "Massaya", "estate", 33.7961, 35.8721, "Founded in 1998 by the brothers Sami and Ramzi Ghosn with partners from Bordeaux and the Rhône (including Vieux Télégraphe's Brunier family), at Tanail in the central Bekaa; famous for its terrace restaurant and Cinsault-based reds.", "approx", producers=["Massaya"])
s("lb", "Temple of Bacchus, Baalbek", "historic", 34.0061, 36.2040, "One of the best-preserved Roman temples in the world, built in the second century AD in the sanctuary of Heliopolis at Baalbek; its portal is carved with vines, grape clusters and Bacchic scenes. A UNESCO World Heritage Site at the northern end of the Bekaa wine zone.", "precise", cls="Roman temple (UNESCO)")
s("lb", "Byblos", "historic", 34.1237, 35.6494, "One of the oldest continuously inhabited towns in the world, whose wine was shipped to Old Kingdom Egypt.", "approx", cls="Phoenician port (UNESCO)")
s("lb", "Tell el-Burak Phoenician wine press", "historic", 33.6262, 35.3866, "A seventh-century BC plastered wine press, one of the largest known in the Phoenician world, excavated south of Sidon with traces of nearby vineyards.", "approx", cls="Archaeological site")
s("lb", "Château Marsyas", "estate", 33.6583, 35.7495, "The Saadé family's estate in the West Bekaa near Kefraya, making structured Cabernet and Syrah blends.", "approx", producers=["Château Marsyas"])

# ------------------------------------------------------------------ ISRAEL
SRC_IL = [
    {"title": "Wikipedia, Israeli wine", "url": "https://en.wikipedia.org/wiki/Israeli_wine"},
    {"title": "Wikipedia, Tel Kabri", "url": "https://en.wikipedia.org/wiki/Tel_Kabri"},
    {"title": "Wine Route of Israel / Israel Wine Producers Association", "url": "https://www.israelwines.co.il"},
]
il = {
    "iso2": "il", "name": "Israel", "tier": "notable",
    "tagline": "Bronze Age palace cellars, Rothschild's colonies and a modern industry that took winemaking up the Golan and into the desert.",
    "stats": {"vineyard_ha": 5500, "year": 2020, "note": "Approximate: about 5,000 to 5,500 ha of wine grapes and some 300 wineries; production around 40 million bottles. Not reported separately by OIV 2025."},
    "overview": (
        "Wine in the land of Israel is ancient, biblical and, after a long gap, very new. The Canaanite palace at Tel Kabri in western Galilee held a wine cellar of about 1700 BC with some 40 large jars and roughly 2,000 litres of wine flavoured with resins, honey and herbs: the oldest and largest palatial wine cellar known in the Near East. The Bible is full of vineyards and presses; Byzantine Gaza and Ashkelon exported wine across the Mediterranean, and in the Negev the Nabataean and Byzantine towns of Avdat and Shivta had large wine presses.\n\n"
        "Islamic rule from the seventh century ended commercial wine for a millennium, though local grapes survived in Arab vineyards as table grapes and raisins. The modern industry was founded by Baron Edmond de Rothschild, owner of Château Lafite, who in the 1880s funded Jewish agricultural colonies and built wineries at Rishon LeZion (1890) and Zichron Ya'akov (1892), the origin of Carmel. For a century the industry made mostly sweet sacramental kosher wine.\n\n"
        "The turn came in the late 1970s and 1980s, when University of California, Davis researchers identified the Golan Heights as a cool, high site, and the Golan Heights Winery (founded 1983, Yarden label) proved it with modern Cabernet, Chardonnay and sparkling wine. Domaine du Castel in the Judean Hills, Margalit, Yatir in the Negev, Clos de Gat, Recanati, Tzora and Flam followed, and the country now has about 300 wineries. The regions run from the Upper Galilee and the Golan (vineyards up to about 1,200 metres) through the Judean Hills and the Shomron to the Negev desert, where drip irrigation and high plateaus make viticulture possible.\n\n"
        "Two features make Israel distinctive. Almost all large wineries are kosher, which involves rules on who handles the wine (Sabbath-observant Jews from crushing onward, unless the wine is heat-treated, mevushal), on fining agents and on agricultural laws such as orlah (no fruit from vines under four years) and shmita (the sabbatical year). And a research programme led by Ariel University and others has identified and revived ancient local grapes, among them Marawi (also called Hamdani), Jandali and Dabouki, as well as the red Bittuni, with Recanati and Cremisan bottling them.\n\n"
        "Some of Israel's best-known vineyards lie in territory whose status is disputed. The Golan Heights were captured from Syria in 1967 and annexed by Israel in 1981, an annexation not recognised by the UN or most states (the United States recognised it in 2019); Israeli wineries in the West Bank are in territory considered occupied under international law. The EU requires that products from these areas not be labelled simply 'Made in Israel'."
    ),
    "history": [
        {"when": "c. 1700 BC", "title": "The palace cellar at Tel Kabri", "text": "In 2013 excavators uncovered a storeroom in the Canaanite palace with about 40 large jars, around 2,000 litres in total, holding residues of a resinated, flavoured red wine.", "lat": 33.0091, "lon": 35.1407},
        {"when": "5th to 7th century AD", "title": "Wine of Gaza and the Negev", "text": "Byzantine wine from Gaza and the Negev towns of Shivta and Avdat, which had large stone presses, was exported in 'Gaza jars' across the Mediterranean.", "lat": 30.8814, "lon": 34.6309},
        {"when": "1870", "title": "Mikveh Israel", "text": "The first Jewish agricultural school was founded near Jaffa and taught viticulture.", "lat": 32.0255, "lon": 34.7760},
        {"when": "1882 to 1892", "title": "Rothschild's wineries", "text": "Baron Edmond de Rothschild funded the colonies of Rishon LeZion and Zichron Ya'akov and built their wineries (1890 and 1892), the core of Carmel.", "lat": 32.5737, "lon": 34.959},
        {"when": "1983", "title": "The Golan Heights Winery", "text": "Founded at Katzrin after UC Davis advice identified the high Golan as a cool site; its Yarden wines started Israel's quality era.", "lat": 32.992, "lon": 35.6877},
        {"when": "2010s", "title": "Ancient grapes revived", "text": "DNA research identified local varieties such as Marawi (Hamdani), Jandali, Dabouki and Bittuni; Recanati bottled a Marawi from the 2014 vintage.", "lat": 33.03, "lon": 35.48},
    ],
    "classification": "Israel has an official list of wine regions (Galil with the Golan, Upper and Lower Galilee subregions; Shomron; Shimshon; the Judean Hills; and the Negev) used on labels, but no appellation system with yield or grape rules. Kosher certification (and mevushal status) is the most visible label distinction.",
    "climate_soils": "Mediterranean, with rainy winters and dry summers; every vineyard needs drip irrigation in summer. Quality depends on altitude: the Golan's basalt and volcanic tuff at 400 to 1,200 metres, Upper Galilee's limestone and terra rossa, the Judean Hills' limestone at 500 to 900 metres, and loess and sand in the Negev at up to 800 metres.",
    "grapes": [
        {"name": "Cabernet Sauvignon, Merlot, Syrah, Petite Sirah, Carignan", "note": "The main reds; old-vine Carignan and Petite Sirah are local specialities."},
        {"name": "Chardonnay, Sauvignon Blanc, Gewürztraminer", "note": "Main whites; Chardonnay for traditional-method sparkling on the Golan."},
        {"name": "Marawi (Hamdani), Jandali, Dabouki", "note": "Ancient local whites revived from Arab vineyards."},
        {"name": "Argaman", "note": "An Israeli cross (Carignan by Souzão) bred for colour."},
    ],
    "regions": ["Galilee and Golan Heights", "Judean Hills", "Shomron", "Shimshon", "Negev"],
    "further_reading": ["Wines of Israel, Adam Montefiore", "Rogov's Guide to Israeli Wines, Daniel Rogov"],
    "sources": SRC_IL,
}
il_regions = [
    {"country": "il", "name": "Galilee and Golan Heights", "alt": ["Galil", "Upper Galilee", "Golan"], "parent_region": None, "lat": 33.0, "lon": 35.55, "zoom": 9,
     "tagline": "The coolest, highest vineyards: basalt on the Golan, limestone in the Upper Galilee.", "summary": "Israel's quality heartland. The Golan Heights rise from the Sea of Galilee towards Mount Hermon, with vineyards up to about 1,200 metres on volcanic basalt and tuff; the Upper Galilee around Dalton and Kerem Ben Zimra and the Lower Galilee around Mount Tabor add limestone and terra rossa. The Golan is internationally regarded as Syrian territory occupied by Israel since 1967; Israel annexed it in 1981, an act recognised by the United States since 2019 but not by the UN.",
     "history": "Golan Heights Winery (1983), Galil Mountain, Dalton, Recanati and Tabor built the region's reputation.", "terroir": "Cooler nights, winter snow on the high Golan, volcanic and limestone soils.",
     "grapes": "Cabernet Sauvignon, Merlot, Syrah, Chardonnay, Sauvignon Blanc, Marawi.", "styles": "Structured reds, sparkling, fresh whites.", "classification": "Official wine region name Galil (subregions Upper Galilee, Lower Galilee, Golan Heights).", "appellations": [], "sources": SRC_IL},
    {"country": "il", "name": "Judean Hills", "alt": ["Harei Yehuda"], "parent_region": None, "lat": 31.77, "lon": 35.05, "zoom": 10,
     "tagline": "Terraced limestone around Jerusalem and Domaine du Castel.", "summary": "Hills west and south of Jerusalem at 500 to 900 metres, on limestone terraces of biblical age, with wineries such as Domaine du Castel, Flam, Tzora, Clos de Gat and Sphera. Part of the area extends into the occupied West Bank.",
     "history": "Ancient presses dot the terraces; Castel (1988) started the boutique wave.", "terroir": "Limestone and terra rossa, cool nights.", "grapes": "Cabernet Sauvignon, Merlot, Chardonnay, Syrah.", "styles": "Elegant reds and whites.", "classification": "Official region name.", "appellations": [], "sources": SRC_IL},
    {"country": "il", "name": "Shomron", "alt": ["Samaria", "Mount Carmel area"], "parent_region": None, "lat": 32.55, "lon": 35.0, "zoom": 10,
     "tagline": "Carmel's historic heartland around Zichron Ya'akov and Binyamina.", "summary": "The official Shomron wine region covers the coastal hills south of Mount Carmel around Zichron Ya'akov and Binyamina, where Rothschild's Carmel winery stands, and the plain of Sharon.",
     "history": "Rothschild built the Zichron Ya'akov winery in 1892.", "terroir": "Coastal hills, limestone and marine sediments, warm.", "grapes": "Carignan, Cabernet Sauvignon, Petite Sirah.", "styles": "Reds, kosher wines.", "classification": "Official region name.", "appellations": [], "sources": SRC_IL},
    {"country": "il", "name": "Shimshon", "alt": ["Samson"], "parent_region": None, "lat": 31.85, "lon": 34.9, "zoom": 10,
     "tagline": "Between the coast and the Judean Hills, where Rishon LeZion's winery began.", "summary": "Low hills and plains between the coastal strip and the Judean foothills, historically a large-volume area; Barkan, Carmel's Rishon LeZion and Teperberg draw on it.",
     "history": "Rishon LeZion winery (1890).", "terroir": "Warm, lower altitude.", "grapes": "Cabernet Sauvignon, Merlot, Carignan.", "styles": "Everyday reds and whites.", "classification": "Official region name.", "appellations": [], "sources": SRC_IL},
    {"country": "il", "name": "Negev", "alt": ["Ramat HaNegev"], "parent_region": None, "lat": 30.85, "lon": 34.75, "zoom": 9,
     "tagline": "Desert vineyards on ancient Nabataean terraces.", "summary": "Drip irrigation and high plateaus (Ramat HaNegev at about 800 metres, and the Yatir forest near Arad) make viticulture possible in the desert, echoing the Byzantine wine towns of Shivta and Avdat. Yatir Winery and around 50 small Negev wineries work here.",
     "history": "Byzantine wine presses at Shivta and Avdat.", "terroir": "Loess and sand, extreme diurnal swings, salt-tolerant management.", "grapes": "Cabernet Sauvignon, Syrah, Petit Verdot, Chardonnay.", "styles": "Ripe reds, whites.", "classification": "Official region name.", "appellations": [], "sources": SRC_IL},
]
s("il", "Tel Kabri palace wine cellar", "historic", 33.0091, 35.1407, "The Canaanite palace on the grounds of Kibbutz Kabri, near Nahariya, where in 2013 archaeologists found a storeroom of about 40 large jars, around 2,000 litres, with residues of red wine flavoured with resins, honey and herbs, dated to about 1700 BC. The palace also had Minoan-style frescoes and was destroyed by an earthquake.", "precise", cls="Archaeological site (Middle Bronze Age)")
s("il", "Carmel Winery, Zichron Ya'akov", "house", 32.5737, 34.9590, "The cellars Baron Edmond de Rothschild built in 1892 for the colony of Zichron Ya'akov on Mount Carmel's southern slopes, still Carmel's winery and visitor centre.", "precise", producers=["Carmel"])
s("il", "Carmel Winery, Rishon LeZion", "house", 31.9610, 34.8042, "Rothschild's first great winery, completed in 1890 at Rishon LeZion, with historic underground cellars; long the heart of Israel's sacramental wine trade.", "precise", producers=["Carmel"])
s("il", "Golan Heights Winery", "house", 32.9884, 35.7068, "Founded in 1983 at Katzrin by Golan settlements, the winery behind the Yarden, Gamla and Golan labels and the first to prove the high Golan's potential for Cabernet and sparkling wine. The Golan is Syrian territory occupied by Israel since 1967.", "precise", producers=["Golan Heights Winery"])
s("il", "Domaine du Castel", "estate", 31.8095, 35.0902, "Eli Ben Zaken's family estate in the Judean Hills, founded in 1988 at Ramat Raziel, with its winery now at Yad HaShmona; its Grand Vin was among the first Israeli wines praised internationally.", "approx", producers=["Domaine du Castel"])
s("il", "Shivta Byzantine wine presses", "historic", 30.8814, 34.6309, "A Byzantine town in the Negev (UNESCO Incense Route) with large wine presses and evidence that it made and exported wine in the sixth and seventh centuries.", "precise", cls="Archaeological site (UNESCO)")
s("il", "Avdat", "historic", 30.8096, 34.7561, "Nabataean and Byzantine city on the Incense Route in the Negev, with ancient wine presses on its hillsides.", "approx", cls="Archaeological site (UNESCO)")
s("il", "Dalton Winery", "estate", 33.0293, 35.4765, "In the Dalton industrial park of the Upper Galilee, part of a cluster of seven wineries including Recanati and Adir.", "approx", producers=["Dalton", "Recanati"])
s("il", "Flam Winery", "estate", 31.7775, 35.0155, "The Flam family's winery in the Judean Hills near Eshtaol, one of Israel's leading boutique producers.", "precise", producers=["Flam"])
s("il", "Tabor Winery", "estate", 32.6866, 35.4286, "Winery at Kfar Tavor beneath Mount Tabor in the Lower Galilee, on chalk and terra rossa.", "precise", producers=["Tabor"])

# ------------------------------------------------------------------ PALESTINE
SRC_PS = [{"title": "Wikipedia, Cremisan; Taybeh Winery", "url": "https://en.wikipedia.org/wiki/Cremisan"}, {"title": "Wikipedia, Israeli wine (ancient varieties)", "url": "https://en.wikipedia.org/wiki/Israeli_wine"}]
ps = {
    "iso2": "ps", "name": "Palestine", "tier": "minor",
    "tagline": "Monastic and family wineries in the West Bank keeping Hebron's ancient grapes alive.",
    "stats": {"note": "Very small production from a handful of wineries; no official statistics found."},
    "overview": (
        "The hills of Hebron and Bethlehem have grown grapes since antiquity, and Palestinian farmers kept local varieties alive as table grapes and raisins through centuries when wine was not made commercially. Today a few wineries operate in the West Bank. The Salesian monastery of Cremisan, on the edge of Beit Jala near Bethlehem, has made wine since 1885 and bottles single-variety wines from the ancient local grapes Hamdani, Jandali, Dabouki and Baladi, sourced from Palestinian growers around Hebron. In the Christian village of Taybeh, north-east of Ramallah, the Khoury family, known for Palestine's first craft brewery (1994), opened Taybeh Winery in 2013.\n\n"
        "Winemaking here is shaped by occupation: checkpoints, permits and the separation barrier affect access to vineyards and markets. The Cremisan valley itself has been the subject of a long legal and political dispute over the barrier's route through monastery and village land."
    ),
    "history": [
        {"when": "1885", "title": "Cremisan's monks begin making wine", "text": "Italian Salesian monks set up a winery at the Cremisan monastery near Beit Jala.", "lat": 31.7301, "lon": 35.1713},
        {"when": "2008 to 2010s", "title": "Ancient grapes bottled", "text": "With Italian oenologist Riccardo Cotarella's advice, Cremisan began releasing varietal Hamdani, Jandali, Dabouki and Baladi.", "lat": 31.7301, "lon": 35.1713},
        {"when": "2013", "title": "Taybeh Winery opens", "text": "The Khoury family added a winery to their Taybeh brewery in the Christian village north-east of Ramallah.", "lat": 31.9552, "lon": 35.2999},
    ],
    "classification": "No appellation system.",
    "climate_soils": "Mediterranean hill climate at 700 to 1,000 metres around Hebron and Bethlehem; limestone and terra rossa; dry farming of old bush vines is common.",
    "grapes": [{"name": "Hamdani and Jandali", "note": "Ancient whites from the Hebron hills, often blended."}, {"name": "Dabouki", "note": "White grape thought to be among the oldest local varieties."}, {"name": "Baladi", "note": "Local red."}],
    "regions": ["Bethlehem and Hebron hills"],
    "further_reading": [],
    "sources": SRC_PS,
}
s("ps", "Cremisan Monastery winery", "cellar", 31.7301, 35.1713, "The Salesian monastery on a terraced hillside between Beit Jala and Jerusalem has made wine since 1885 and now bottles the ancient Palestinian grapes Hamdani, Jandali, Dabouki and Baladi bought from Hebron-area growers.", "precise", producers=["Cremisan"])
s("ps", "Taybeh Winery", "estate", 31.9552, 35.2999, "The Khoury family's winery, opened in 2013 next to their brewery in the Christian village of Taybeh, north-east of Ramallah.", "precise", producers=["Taybeh"])

# ------------------------------------------------------------------ SYRIA
sy = {
    "iso2": "sy", "name": "Syria", "tier": "minor",
    "tagline": "From the wine lists of Ugarit and Mari to Domaine de Bargylus, made through civil war in the Jebel Ansariyeh.",
    "stats": {"note": "Large table-grape vineyard; wine production tiny. No reliable statistics."},
    "overview": (
        "Syria's wine history begins in the Bronze Age archives. Tablets from the palace of Mari on the Euphrates (eighteenth century BC) record wine shipments and the king's taste for good vintages; Ugarit on the coast traded wine across the eastern Mediterranean; and Ebla's archives mention vineyards. Under Rome and Byzantium, the north Syrian 'dead cities' of the limestone massif were wealthy olive and wine towns.\n\n"
        "Modern Syrian wine is almost a single estate. Domaine de Bargylus, founded by the Lebanese Saadé brothers (also owners of Château Marsyas in the Bekaa) in 2003 on the slopes of the Jebel Ansariyeh near Latakia, at about 900 metres, makes Bordeaux- and Rhône-style blends; through the civil war from 2011 its owners managed the estate remotely and grapes were sometimes driven to Beirut under extreme conditions. Bargylus takes its name from the Greek name of the mountain range. Christian monasteries and villages also make small amounts of wine and arak."
    ),
    "history": [
        {"when": "18th century BC", "title": "The wine of Mari", "text": "Palace archives at Mari record wine supplies and royal requests for fine wine, among the earliest written wine commerce.", "lat": 34.5501, "lon": 40.8884},
        {"when": "14th to 12th century BC", "title": "Ugarit's wine trade", "text": "The port city of Ugarit, near Latakia, exported wine and recorded vineyards in its archives.", "lat": 35.6024, "lon": 35.7854},
        {"when": "2003", "title": "Domaine de Bargylus", "text": "The Saadé family planted vineyards in the Jebel Ansariyeh near Latakia and kept producing through the civil war.", "lat": 35.65, "lon": 36.05},
    ],
    "classification": "No appellation system.",
    "climate_soils": "Mediterranean coast backed by the Jebel Ansariyeh (Coastal Mountains), with limestone and clay at 800 to 1,000 metres; continental interior plateaus grow table grapes.",
    "grapes": [{"name": "Cabernet Sauvignon, Merlot, Syrah, Sauvignon Blanc, Chardonnay", "note": "Bargylus's grapes."}, {"name": "Local table grapes such as Zeini and Halwani", "note": "Mostly eaten or used for arak."}],
    "regions": ["Jebel Ansariyeh"],
    "further_reading": [],
    "sources": [{"title": "Wikipedia, Domaine de Bargylus; Mari; Ugarit", "url": "https://en.wikipedia.org/wiki/Domaine_de_Bargylus"}],
}
s("sy", "Ugarit (Ras Shamra)", "historic", 35.6024, 35.7854, "The Bronze Age port city near Latakia whose archives record vineyards and wine exports, and which gave the world one of its first alphabets.", "precise", cls="Archaeological site")
s("sy", "Mari (Tell Hariri)", "historic", 34.5501, 40.8884, "Palace of the kings of Mari on the Euphrates whose eighteenth-century BC tablets record wine shipments and royal preferences.", "precise", cls="Archaeological site")
s("sy", "Domaine de Bargylus", "estate", 35.6500, 36.0500, "The Saadé family's vineyard on the Jebel Ansariyeh east of Latakia, at about 900 metres, Syria's only internationally distributed wine estate; it kept producing through the civil war.", "approx", producers=["Domaine de Bargylus"])

# ------------------------------------------------------------------ JORDAN
jo = {
    "iso2": "jo", "name": "Jordan", "tier": "minor",
    "tagline": "Nabataean presses at Little Petra and two modern wineries on the high plateau.",
    "stats": {"note": "A few hundred hectares of wine grapes; two main wineries. No official statistics found."},
    "overview": (
        "Wine in Jordan reaches back to the Nabataeans, whose wine presses and triclinium dining halls at Little Petra (Siq al-Barid) show that grapes were grown and pressed in the desert two thousand years ago, and to the Decapolis city of Gadara (Umm Qais), praised for its wine. The modern industry is tiny but serious. The Haddad family's Eagle Distilleries launched Jordan River Wines (vineyards near Mafraq and Sama as-Sarhan in the north-east, close to the Syrian border), and Omar Zumot's Zumot Winery, best known for its Saint George label, farms organically at Sama as-Sarhan. Vineyards sit at 600 to 850 metres on the basalt-strewn plateau, with very hot days, cold nights and irrigation.\n\nJordan's Christian minority, around Madaba, Fuheis and Salt, kept a home tradition of wine and arak, and Byzantine church mosaics around Madaba include scenes of grape harvest and treading. The modern wineries sell mostly to hotels and restaurants in Amman and to visitors, and export small quantities."
    ),
    "history": [
        {"when": "1st century AD", "title": "Nabataean wine presses at Little Petra", "text": "Rock-cut presses and banquet halls at Siq al-Barid, near Petra, show Nabataean winemaking.", "lat": 30.3741, "lon": 35.448},
        {"when": "1990s to 2000s", "title": "Modern wineries", "text": "Zumot (Saint George) and Jordan River Wines planted vineyards on the north-eastern plateau near Mafraq.", "lat": 32.35, "lon": 36.2},
    ],
    "classification": "No appellation system.",
    "climate_soils": "Arid plateau at 600 to 850 metres near the Syrian border, basalt and limestone soils, drip irrigation essential.",
    "grapes": [{"name": "Cabernet Sauvignon, Merlot, Syrah, Chardonnay, Sauvignon Blanc", "note": "Main varieties."}],
    "regions": ["Northern plateau (Mafraq)"],
    "further_reading": [],
    "sources": [{"title": "Wikipedia, Little Petra; Jordanian wine", "url": "https://en.wikipedia.org/wiki/Little_Petra"}],
}
s("jo", "Little Petra (Siq al-Barid)", "historic", 30.3741, 35.4480, "A Nabataean suburb north of Petra with rock-cut wine presses, cisterns and banquet halls, evidence of winemaking in the desert two thousand years ago.", "precise", cls="Archaeological site")
s("jo", "Umm Qais (Gadara)", "historic", 32.6540, 35.6845, "The Decapolis city of Gadara, above the Sea of Galilee and the Yarmouk, renowned in Roman times for its wine.", "approx", cls="Archaeological site")

if __name__ == "__main__":
    by = lambda iso: [x for x in S if x["country"] == iso]
    save("tr", {"countries": [tr], "regions": tr_regions, "appellations": [], "sites": by("tr")})
    save("lb", {"countries": [lb], "regions": lb_regions, "appellations": [], "sites": by("lb")})
    save("il", {"countries": [il], "regions": il_regions, "appellations": [], "sites": by("il")})
    save("ps", {"countries": [ps], "regions": [], "appellations": [], "sites": by("ps")})
    save("sy", {"countries": [sy], "regions": [], "appellations": [], "sites": by("sy")})
    save("jo", {"countries": [jo], "regions": [], "appellations": [], "sites": by("jo")})
