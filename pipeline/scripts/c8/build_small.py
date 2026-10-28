import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c8")
from common import write, site, app, region, H, S

# ---------------------------------------------------------------- Bosnia and Herzegovina
I = "ba"
SRC_BA = [
    S("Jancis Robinson: Bosnia-Herzegovina, at the crossroads", "https://jancisrobinson.com/articles/bosnia-herzegovina-crossroads"),
    S("Decanter: Herzegovina, a wine lover's guide", "https://www.decanter.com/wine/herzegovina-a-wine-lovers-guide-527465/"),
    S("Wikipedia: Tvrdoš Monastery", "https://en.wikipedia.org/wiki/Tvrdo%C5%A1_Monastery"),
    S("Wikipedia: Žilavka", "https://en.wikipedia.org/wiki/%C5%BDilavka"),
]
BA = {
 "iso2": I, "name": "Bosnia and Herzegovina", "tier": "minor",
 "tagline": "Sun-baked Herzegovinian karst, mineral Žilavka and the 'empty barrel' Blatina, with monks still making wine at Tvrdoš.",
 "stats": {"vineyard_ha": 3257, "production_mhl": 0.18, "year": 2016, "world_rank_production": None,
           "note": "Officials reported 2,657 ha of wine grapes in the Federation of BiH in 2016 plus about 600 ha in Republika Srpska, and 177,400 hl of wine (as reported by Jancis Robinson); there is no vineyard register, so the figures are approximate."},
 "overview": """Almost all of Bosnia and Herzegovina's wine comes from Herzegovina, the hot, stony south that drains to the Adriatic along the Neretva. Summers can hit 40 °C, the soils are thin karst and terra rossa, and the scenery around Mostar, Čitluk, Međugorje, Ljubuški, Stolac and Trebinje looks more like Dalmatia than central Europe. About 3,000 ha are planted, worked by up to 11,000 households, most of whom make wine for themselves; around 50 producers are registered and perhaps 30 sell commercially.

Two native grapes make up 60 to 65 percent of the vineyard. Žilavka is a firm, mineral, apricot-and-almond white, said to have been the preferred wine of the Austro-Hungarian emperors after 1878. Blatina is a dark, soft red whose flowers are functionally female, so it must be interplanted with a pollinator such as Trnjak, Vranac or Alicante Bouschet; its nickname 'empty barrel' comes from the poor yields of bad flowering years. Vranac grows around Trebinje, Plavac Mali near the Croatian border.

Viticulture here goes back to the Illyrians and Romans, survived four centuries of Ottoman rule (when wine was mostly made by Christian communities and monasteries), and grew under Austro-Hungarian administration from 1878. In the socialist era households were limited to 100 litres of wine a year, and large cooperatives such as Hepok in Mostar dominated. The 1990s war set the industry back badly; since then family estates (Vinarija Čitluk, Podrumi Andrija, Vukoje, Tvrdoš, Nuić, Škegro, Brkić, Carski Vinogradi) have rebuilt it, and the Herzegovina Wine Route, opened in 2007, was relaunched in 2023. The country imports about five times more wine than it exports.""",
 "history": [
    H("Roman era", "Vines in Roman Dalmatia", "Herzegovina lay in the Roman province of Dalmatia; local tradition and archaeology link viticulture to the Illyrians and Romans more than 2,000 years ago.", 43.3436, 17.8077),
    H("15th century", "Tvrdoš monastery cellar", "The Serbian Orthodox monastery of Tvrdoš near Trebinje, founded in the late 15th or early 16th century, has a wine cellar dating to the 15th century; its monks still make Vranac and Žilavka.", 42.7184, 18.2923),
    H("1878 to 1918", "Austro-Hungarian Herzegovina", "Austro-Hungarian administration modernised viticulture around Mostar; Žilavka became a favourite at the imperial court, and land at Trebinje was part of Emperor Franz Joseph's personal vineyard.", 43.3436, 17.8077),
    H("1992 to 1995 and 2007", "War and the Wine Route", "The war devastated vineyards and wineries; the Herzegovina Wine Route opened in 2007 and was relaunched in 2023.", 43.2267, 17.6963),
 ],
 "classification": """Bosnia and Herzegovina is not in the EU, and no wine names from it appear in the EU or UK geographical-indication registers. Wine law is set separately by the two entities (the Federation and Republika Srpska), and the traditional names Mostarska Žilavka and Mostarska Blatina are widely used on labels. A national vineyard register did not exist as of the last available reporting, so origin rules are loosely enforced.""",
 "climate_soils": """Herzegovina has a Mediterranean-influenced climate with very hot, dry summers, mild winters and high sunshine; soils are karst limestone with pockets of terra rossa and stony alluvium along the Neretva. Northern Bosnia is continental and has only scattered vineyards.""",
 "grapes": [
    {"name": "Žilavka", "note": "Native white of Herzegovina: firm, mineral, apricot and almond; the country's signature wine."},
    {"name": "Blatina", "note": "Native red with female flowers that needs a pollinator; soft, dark-fruited; nicknamed 'empty barrel'."},
    {"name": "Vranac", "note": "Montenegrin red grown around Trebinje and in eastern Herzegovina."},
    {"name": "Trnjak", "note": "Local red often interplanted with Blatina."},
 ],
 "regions": ["Herzegovina"],
 "further_reading": ["Herzegovina Wine Route (hwr.ba)"],
 "sources": SRC_BA,
}
BA_REG = [region(I, "Herzegovina", 43.15, 17.75, 8.4,
  "The Neretva's hot karst country: Žilavka, Blatina and monks' Vranac.",
  """Herzegovina, the southern part of the country, holds nearly all the vineyards: around Mostar and the Neretva valley, Čitluk (with Međugorje), Ljubuški, Stolac and Čapljina in the west, and Trebinje in the south-east near Dubrovnik. Čitluk is the largest wine municipality and home of Vinarija Čitluk and Podrumi Andrija; Trebinje's Tvrdoš monastery and Vukoje estate make the region's best-known Vranac.""",
  """Austro-Hungarian rule from 1878 brought viticultural schools and a market in Vienna; under socialism the Hepok cooperative dominated; the 1990s war broke the industry, and family wineries rebuilt it.""",
  """Karst limestone, terra rossa and stony alluvium; summers up to 40 °C; dry and windy.""",
  """Žilavka, Blatina, Trnjak, Vranac, Plavac Mali, Merlot, Cabernet Sauvignon, Chardonnay.""",
  """Dry whites and reds, rosé.""",
  """Traditional names Mostarska Žilavka and Mostarska Blatina; no EU-recognised GIs.""",
  [], SRC_BA, alt=["Hercegovina"])]
BA_SITES = [
 site(I, "tvrdos", "Tvrdoš Monastery winery", "historic", 42.7184, 18.2923, "The Serbian Orthodox monastery of Tvrdoš on the Trebišnjica near Trebinje dates from the late 15th or early 16th century. One of its wine cellars is from the 15th century, and the monks still make Vranac and a flinty Žilavka, with a monk as cellar master.", "precise", "Monastic winery", None, ["Tvrdoš"]),
 site(I, "vukoje", "Vukoje, Trebinje", "estate", 42.7156, 18.3436, "Radovan Vukoje harvested his first grapes in 2000 and built one of Herzegovina's largest private wineries near Trebinje, on land that was once part of Emperor Franz Joseph's personal vineyard. Its pure Vranac and Žilavka are benchmarks.", "approx", "Estate", None, ["Vukoje"]),
 site(I, "andrija", "Podrumi Andrija, Paoča (Čitluk)", "estate", 43.2289, 17.7382, "The Ćorić family's winery at Paoča near Čitluk made Žilavka for Tito under special permission in the socialist era and kept working through the 1990s war. Its Blatina Andrija Selection is a reference for the grape.", "precise", "Family estate", None, ["Podrumi Andrija"]),
 site(I, "citluk", "Vinarija Čitluk", "estate", 43.2241, 17.6934, "Čitluk is Herzegovina's largest wine municipality, and Vinarija Čitluk its biggest producer. Its Žilavka and Blatina come from the stony Brotnjo plateau, which includes the pilgrimage village of Međugorje.", "precise", "Winery", None, ["Vinarija Čitluk"]),
 site(I, "mostar", "Mostar", "village", 43.3436, 17.8077, "Mostar, with its rebuilt Old Bridge (UNESCO), is the regional capital and starting point of the Herzegovina Wine Route. The Mostarska Žilavka and Mostarska Blatina names come from the vineyards around it.", "approx", "Wine town", None),
]
write(I, {"countries": [BA], "regions": BA_REG, "appellations": [], "sites": BA_SITES})

# ---------------------------------------------------------------- Montenegro
I = "me"
SRC_ME = [
    S("Wikipedia: Montenegrin wine", "https://en.wikipedia.org/wiki/Montenegrin_wine"),
    S("Wikipedia: Plantaže", "https://en.wikipedia.org/wiki/Plantaže"),
    S("Plantaže: Wine cellars (Šipčanik, Stari podrum)", "https://www.plantaze.com/en/wine-cellars/"),
    S("FAOLEX/LEAP: Decision determining the regions for wine production (Montenegro, 2017)", "https://leap.unep.org/en/countries/me/national-legislation/decision-determining-region-wine-production"),
    S("Wein.plus: Montenegro", "https://wineguide.wein.plus/wine-regions/montenegro"),
    S("Wikipedia: Zinfandel (Kratošija, Budva Statute)", "https://en.wikipedia.org/wiki/Zinfandel"),
]
ME = {
 "iso2": I, "name": "Montenegro", "tier": "minor",
 "tagline": "Vranac country around Lake Skadar, the possible cradle of Zinfandel, and a wine cellar inside a Cold War aircraft tunnel.",
 "stats": {"vineyard_ha": 2825, "production_mhl": 0.07, "year": 2022, "world_rank_production": None,
           "note": "Wein.plus (2022): 2,825 ha of vineyard and 70,000 hl of wine; Wikipedia gives over 2,800 ha and 22,200 t of grapes in 2017."},
 "overview": """Montenegro is small (about 2,800 ha of vines, roughly 70,000 hl a year) but it punches above its weight because of two grapes and one company. The grapes are Vranac, a deep-coloured, tannic red that makes up most of the country's wine, and Kratošija, a local name for the variety the world knows as Zinfandel or Primitivo; geneticists now consider Montenegro the most likely home of that grape, whose name as 'Cratosia' appears in the medieval Statute of Budva (1426 to 1442). Krstač is the native white, and Žižak and Kadarun are rarer reds.

The company is Plantaže 13. jul, founded in 1963 and still state-controlled, which planted the Ćemovsko polje plain south-east of Podgorica in the 1970s and 1980s into a single vineyard of more than 2,300 ha and some 11 million vines, one of the largest in Europe. It makes about 17 million bottles a year, led by Vranac Pro Corde and Crnogorski Vranac, and ages its premium wines in Šipčanik, a 356 m tunnel more than 30 m underground that was built as part of a military airfield and converted to a cellar in 2007.

Most vineyards lie in the basin of Lake Skadar, where the hot Zeta plain and the terraced slopes of Crmnica around Virpazar catch both Adriatic and continental influences; the Boka Kotorska and Budva-Bar coast and the cooler north make the rest. A legal decision of 2017 defines four wine regions and 15 subregions in line with EU practice, in preparation for EU membership.""",
 "history": [
    H("1426 to 1442", "Cratosia in the Statute of Budva", "The medieval Statute of Budva mentions a grape called Cratosia, probably today's Kratošija, the earliest known record of the variety later identified as Zinfandel/Primitivo.", 42.2864, 18.8400),
    H("1860 to 1918", "King Nikola's revival", "Under Prince (later King) Nikola I viticulture recovered after Ottoman-era losses; Crmnica wine won first prizes at the 1907 Balkan Exhibition in London.", 42.2463, 19.0906),
    H("1963 to 1981", "Plantaže and Ćemovsko polje", "Plantaže was founded in 1963 with its first cellar at Lješkopolje; the Ćemovsko polje cellar opened in 1981 with 190,000 hl of capacity.", 42.4202, 19.2651),
    H("2007", "Šipčanik", "In November 2007 Plantaže began ageing wine in Šipčanik, a 356 m tunnel more than 30 m underground in a former military facility of the airfield under the vineyard.", 42.3684, 19.3157),
    H("2017", "Wine regions defined", "A government decision of October 2017 defined four wine-production regions and fifteen subregions.", 42.4411, 19.2636),
 ],
 "classification": """A 2017 government decision (Official Gazette 65/2017) defines four wine-production regions: the Montenegrin basin of Lake Skadar (subregions Kučki, Crmnički, Riječki, Podgorički, Piperski, Katunski, Bjelopavlićki), the Montenegrin coast (Boka Kotorska, Budva-Bar, Ulcinj, Adriatic hinterland), Nudo, and the Montenegrin north (Nikšićki, Bjelopoljski, Šćepan polje, Dragaljsko polje). No Montenegrin wine names were found in the EU or UK GI registers as of 2026.""",
 "climate_soils": """The Skadar basin is hot, with Mediterranean summers and karst-limestone soils, gravels and terra rossa on the Zeta plain; Crmnica's terraces get Adriatic air over the coastal mountains. The coast is Mediterranean and the north continental.""",
 "grapes": [
    {"name": "Vranac", "note": "The national red, over 70% of production: deep colour, high tannin, black fruit."},
    {"name": "Kratošija", "note": "Montenegro's name for Tribidrag/Zinfandel/Primitivo; dominant before phylloxera, now being replanted."},
    {"name": "Krstač", "note": "Native white of the Podgorica area."},
    {"name": "Žižak and Kadarun", "note": "Rare local reds."},
 ],
 "regions": ["Lake Skadar Basin", "Montenegrin Coast"],
 "further_reading": ["Plantaže (plantaze.com)"],
 "sources": SRC_ME,
}
ME_REG = [
 region(I, "Lake Skadar Basin", 42.35, 19.20, 9.0, "The Zeta plain, Ćemovsko polje and the terraces of Crmnica: Montenegro's Vranac heartland.",
  """The Montenegrin basin of Lake Skadar is the main wine region, from the Zeta plain and Ćemovsko polje around Podgorica to the terraced slopes of Crmnica above Virpazar and the Riječki subregion around Rijeka Crnojevića. Plantaže's 2,300 ha vineyard dominates, but family wineries in Crmnica (Godinje, Virpazar) keep older traditions and Kratošija vines.""",
  """Crmnica wine was considered the best in Montenegro in the 19th century and won prizes in London in 1907.""",
  """Karst limestone, gravel and terra rossa; hot Mediterranean summers moderated by the lake.""",
  """Vranac, Kratošija, Krstač, Žižak, Cabernet Sauvignon, Merlot, Chardonnay.""",
  """Full reds, Krstač whites, rosé.""",
  """Legal region (2017) with seven subregions.""",
  ["Montenegrin basin of Skadar Lake"], SRC_ME, alt=["Crnogorski basen Skadarskog jezera"]),
 region(I, "Montenegrin Coast", 42.30, 18.80, 9.0, "Boka Kotorska to Ulcinj: small coastal vineyards above the Adriatic.",
  """The coastal region runs from the Bay of Kotor through Budva and Bar to Ulcinj, with small vineyards on the slopes above the sea. Budva's medieval statute contains the first record of Kratošija.""",
  """Venetian rule kept coastal vineyards alive during the Ottoman period.""",
  """Limestone and flysch slopes; Mediterranean climate.""",
  """Vranac, Kratošija, Krstač, Žižak.""",
  """Reds and whites for local consumption.""",
  """Legal region (2017) with four subregions.""",
  ["Montenegrin coast"], SRC_ME, alt=["Crnogorsko primorje"]),
]
ME_APPS = [
 app(I, "Montenegrin basin of Skadar Lake", ["Crnogorski basen Skadarskog jezera", "Skadar Lake basin"], "Region", "Lake Skadar Basin",
  """The main wine-production region defined by Montenegro's 2017 decision, covering the Lake Skadar basin with seven subregions: Kučki, Crmnički, Riječki, Podgorički, Piperski, Katunski and Bjelopavlićki. It includes Plantaže's Ćemovsko polje vineyard and the historic terraces of Crmnica, and produces most of the country's Vranac.""",
  created="2017 (national decision)", styles=["red", "white"], dominant="red", grapes="Vranac, Kratošija, Krstač, Žižak", producers=["Plantaže", "Vinarija Džaković", "Vinarija Lipovac"]),
 app(I, "Montenegrin coast", ["Crnogorsko primorje", "Montenegrin coastal"], "Region", "Montenegrin Coast",
  """The coastal wine region defined in 2017, with four subregions: Boka Kotorska, Budva-Bar, Ulcinj and the Adriatic hinterland. Vineyards are small and scattered on terraces above the sea, and Venetian rule on this coast helped them survive the Ottoman centuries. Budva's medieval statute holds the first record of Kratošija.""",
  created="2017 (national decision)", styles=["red", "white"], dominant="red", grapes="Vranac, Kratošija, Krstač"),
 app(I, "Nudo", ["Nudo"], "Region", "Lake Skadar Basin",
  """Nudo is a small upland region near the Bosnian border north-west of Nikšić, defined as a separate wine-production region in 2017 without subregions. It is one of the most isolated vineyard areas in the country.""",
  created="2017 (national decision)", styles=["red"], dominant="red", grapes="Vranac and local varieties"),
 app(I, "Montenegrin north", ["Crnogorski sjever"], "Region", "Lake Skadar Basin",
  """The northern wine region defined in 2017 has four subregions (Nikšićki, Bjelopoljski, Šćepan polje, Dragaljsko polje), with small vineyards in a cooler, continental climate. Most of the wine is made for home use, and the area is better known for the Trebjesa brewery at Nikšić than for wine.""",
  created="2017 (national decision)", styles=["red", "white"], dominant="red", grapes="Vranac and others"),
]
ME_SITES = [
 site(I, "cemovsko-polje", "Ćemovsko polje vineyard (Plantaže)", "vineyard", 42.3800, 19.3000, "South-east of Podgorica, Plantaže's single vineyard on the stony Ćemovsko polje covers more than 2,300 ha with some 11 million vines. It is one of the largest single vineyard blocks in Europe, planted mainly with Vranac, Kratošija, Krstač and international grapes.", "approx", "Single vineyard", "Montenegrin basin of Skadar Lake", ["Plantaže"]),
 site(I, "sipcanik", "Šipčanik cellar", "cellar", 42.3684, 19.3157, "Under Plantaže's Ćemovsko polje vineyard lies Šipčanik, a 356 m winding tunnel more than 30 m underground. It was built as a military facility of the former airfield. Since November 2007 it has held oak casks instead of aircraft: over 2 million litres of wine at 17 to 19 °C, plus an archive of 18,000 bottles.", "approx", "Underground cellar (former military facility)", "Montenegrin basin of Skadar Lake", ["Plantaže"]),
 site(I, "virpazar", "Virpazar and Crmnica", "village", 42.2463, 19.0906, "Virpazar, on the shore of Lake Skadar, is the centre of Crmnica, whose terraced vineyards made Montenegro's most prized wine in the 19th century. Family cellars in Godinje and Limljani still make Vranac and Kratošija.", "precise", "Wine village", "Montenegrin basin of Skadar Lake"),
 site(I, "budva", "Budva", "historic", 42.2864, 18.8400, "The walled town of Budva on the Adriatic gave its name to the medieval statute (1426 to 1442) that first records 'Cratosia', probably today's Kratošija. Geneticists now consider this the likely origin of Zinfandel.", "approx", "Historic town", "Montenegrin coast"),
]
write(I, {"countries": [ME], "regions": ME_REG, "appellations": ME_APPS, "sites": ME_SITES})

# ---------------------------------------------------------------- North Macedonia
I = "mk"
SRC_MK = [
    S("Wikipedia: Macedonian wine", "https://en.wikipedia.org/wiki/Macedonian_wine"),
    S("Wein.plus: North Macedonia", "https://wineguide.wein.plus/wine-regions/north-macedonia"),
    S("GIZ: Macedonian wine will receive a geographical indication (Feb 2026)", "https://www.giz.de/en/regions/europe/north-macedonia/news/macedonian-wine-will-receive-geographical-indication-symbol"),
    S("Journey Macedonia: Tikveš winery", "https://journeymacedonia.com/wineries/tikves-tikvesh/"),
]
MK = {
 "iso2": I, "name": "North Macedonia", "tier": "emerging",
 "tagline": "The Vardar valley's sun-soaked Vranec, the ruins of Stobi and the Balkans' biggest winery at Kavadarci.",
 "stats": {"vineyard_ha": 24776, "production_mhl": 0.85, "year": 2022, "world_rank_production": None,
           "note": "Wein.plus: 24,776 ha of wine vineyards and 854,000 hl of wine in 2022; GIZ (2026) expected 90 to 100 million litres in 2025, at least 85% exported."},
 "overview": """North Macedonia is a wine exporter first: in a normal year it makes 0.9 to 1 million hl and sends at least 85 percent abroad, much of it in bulk to Serbia, Croatia, Germany and beyond. In the 1980s it made about two-thirds of Yugoslavia's wine. The vineyard (about 25,000 ha for wine, plus large plantings of table grapes) is dominated by red grapes, about 80 percent, and above all by Vranec, with roughly 9,500 ha. Smederevka (Dimyat) is the main white.

Three regions organise the country: Povardarie, the Vardar valley from Skopje to the Greek border, with about 85 to 87 percent of vineyards and 90 percent of wineries; Pčinja-Osogovo in the east toward Bulgaria; and Pelagonija-Polog in the west, including Ohrid and Prespa. The heart of Povardarie is Tikveš, the basin around Kavadarci and Negotino, where hot summers (often over 35 °C), Mediterranean air funnelled up the Vardar from the Aegean and cold continental winters give dark, ripe, full-bodied reds. Tikveš winery in Kavadarci, which dates its history to 1885, is the largest in South-Eastern Europe; Stobi, Bovin, Popova Kula, Chateau Kamnik and Dalvina lead the newer estates.

Native grapes include Stanušina, a light, local red of Tikveš, and Kratošija (Tribidrag/Zinfandel). The ancient city of Stobi on the Vardar, with mosaics showing vines and wine, recalls that Paeonians, Macedonians and Romans all made wine here. Since 2024 amendments to the Wine Law have aimed to introduce EU-style geographical indications, and the first, 'Vardar Valley', was being prepared in 2026.""",
 "history": [
    H("4th century BC to 6th century AD", "Stobi on the Vardar", "Stobi, a Paeonian then Macedonian and Roman city at the confluence of the Crna and Vardar, has mosaics with vine and wine motifs; the Stobi winery nearby takes its name.", 41.5520, 21.9733),
    H("1885", "Tikveš winery", "Tikveš winery in Kavadarci dates its founding to 1885; it became a cooperative after 1946 and was privatised with new investment in 2003. It is described as the largest winery in South-Eastern Europe.", 41.4362, 22.0048),
    H("1980s", "Yugoslavia's vineyard", "Macedonia produced about two-thirds of Yugoslav wine; output fell from about 1.8 million hl in the mid-1990s to 447,000 hl in 2002 after the federation broke up.", 41.4333, 22.0123),
    H("2024 to 2026", "Toward geographical indications", "Wine Law amendments in 2024 opened the way for EU-style GIs; 'Vardar Valley' was being prepared as the first, coordinated by the Povardarski wine region body.", 41.4844, 22.0906),
 ],
 "classification": """North Macedonia has three wine regions (Povardarie, Pčinja-Osogovo, Pelagonija-Polog) subdivided into 16 to 18 wine areas (*vinogorja*) such as Tikveš, Skopje, Veles, Ovče Pole, Gevgelija-Valandovo, Strumica-Radoviš, Kočani-Vinica, Kratovo, Kumanovo, Prilep, Bitola, Ohrid, Prespa, Tetovo and Kičevo. Labels have long used 'controlled origin' wording tied to these areas. Wine Law amendments adopted in April 2024 set up an EU-compatible system of geographical indications; as of early 2026 the first GI, 'Vardar Valley', was in preparation. Note that the EU PGI 'Macedonia' refers to Greek Macedonia.""",
 "climate_soils": """The Vardar valley is a corridor of hot, dry summers and Mediterranean influence from the Aegean, with cold winters and frequent wind; soils are alluvial, sandy and clay-loam on terraces, with limestone and schist on the hills. The west (Ohrid, Prespa, Bitola) is higher and cooler.""",
 "grapes": [
    {"name": "Vranec", "note": "About 9,500 ha: the national red, dark and tannic, from rustic bulk wine to aged single-vineyard bottlings."},
    {"name": "Smederevka", "note": "About 6,500 ha, the main white (Dimyat elsewhere)."},
    {"name": "Kratošija", "note": "About 1,000 ha of Tribidrag/Zinfandel."},
    {"name": "Stanušina", "note": "Rare native red of Tikveš, light and fragrant."},
    {"name": "Temjanika and Žilavka", "note": "Aromatic Muscat and Herzegovinian white grown in smaller amounts."},
 ],
 "regions": ["Povardarie", "Pčinja-Osogovo", "Pelagonija-Polog"],
 "further_reading": ["Wines of Macedonia (Tikveš, Stobi producer sites)"],
 "sources": SRC_MK,
}
MK_REG = [
 region(I, "Povardarie", 41.50, 22.05, 8.4, "The Vardar valley and Tikveš: hot, sunny, Vranec-dominated and home to nearly all the wineries.",
  """Povardarie, the Vardar river valley, holds about 85 to 87 percent of the country's vineyards and 90 percent of its wineries. Its subregions include Skopje, Veles, Ovče Pole, Tikveš, Gevgelija-Valandovo and Strumica-Radoviš. Tikveš, around Kavadarci, Negotino and Demir Kapija, is the most famous, with Tikveš winery, Stobi, Bovin, Popova Kula and many smaller estates.""",
  """Stobi's Roman ruins and Tikveš's 19th-century winery mark the long continuity of wine here.""",
  """Alluvial terraces and clay-loam hills; hot dry summers, cold winters, Aegean influence.""",
  """Vranec, Kratošija, Stanušina, Smederevka, Temjanika, Cabernet Sauvignon, Merlot, Syrah, Chardonnay.""",
  """Ripe, dark reds; fresh whites; bulk wine for export.""",
  """Wine region with 8 subregions; first GI 'Vardar Valley' in preparation (2026).""",
  ["Tikveš"], SRC_MK, alt=["Vardar Valley"]),
 region(I, "Pčinja-Osogovo", 42.00, 22.30, 8.4, "The eastern hills toward Bulgaria: Kratovo, Kočani and Kumanovo.",
  """Pčinja-Osogovo covers the eastern hills along the Pčinja river and the Osogovo mountains toward Bulgaria, with subregions such as Kočani, Kratovo, Kumanovo and Pijanec. It is cooler and higher than the Vardar valley and makes fresher wines.""",
  """Kratovo sits in the crater of an extinct volcano and has a long winemaking tradition.""",
  """Volcanic and metamorphic soils, continental climate.""",
  """Vranec, Smederevka, Riesling, Kratošija.""",
  """Reds and whites.""",
  """Wine region with 4 subregions.""",
  [], SRC_MK),
 region(I, "Pelagonija-Polog", 41.30, 21.00, 8.0, "The high west: Bitola, Prilep, Ohrid and Prespa.",
  """Pelagonija-Polog spans the west, from the Pelagonia plain around Bitola and Prilep to Ohrid and Prespa lakes and Tetovo and Kičevo in the Polog valley. Higher altitudes and lake influence give fresher, lighter wines.""",
  """Ohrid's monasteries and Bitola's Roman Heraclea Lyncestis recall a long wine history.""",
  """Lake and mountain influence, cooler climate; alluvial and limestone soils.""",
  """Vranec, Smederevka, Riesling, Chardonnay, Pinot Noir.""",
  """Fresher reds and whites.""",
  """Wine region with 6 subregions.""",
  [], SRC_MK),
]
MK_APPS = [
 app(I, "Tikveš", ["Тиквеш", "Tikves", "Tikvesh"], "Vinogorje", "Povardarie",
  """Tikveš is the country's most famous wine area, a sun-baked basin in the middle Vardar valley around Kavadarci, Negotino and Demir Kapija. It holds the largest share of the vineyard and the Tikveš winery (founded in 1885), whose Barovo and Bela Voda single-vineyard reds, developed with consultant Philippe Cambie, showed what the area's Vranec, Kratošija and Plavac can do. Stanušina is the local red.""",
  created="Wine area under national law", styles=["red", "white"], dominant="red", grapes="Vranec, Kratošija, Stanušina, Smederevka, Temjanika, Cabernet Sauvignon, Merlot, Chardonnay",
  producers=["Tikveš", "Stobi", "Bovin", "Popova Kula", "Chateau Kamnik"]),
]
MK_SITES = [
 site(I, "tikves-winery", "Tikveš winery, Kavadarci", "estate", 41.4362, 22.0048, "Tikveš winery in Kavadarci dates its founding to 1885. It became a cooperative after 1946, was privatised with new owners in 2003, and calls itself the largest winery in South-Eastern Europe. Its Barovo and Bela Voda single-vineyard reds are named after Tikveš localities.", "approx", "Winery", "Tikveš", ["Tikveš"]),
 site(I, "stobi-ruins", "Stobi archaeological site", "historic", 41.5520, 21.9733, "The ruins of Stobi, a Paeonian, Macedonian and Roman city at the confluence of the Crna and Vardar rivers, include mosaics with vines and drinking scenes. They are a reminder that the Vardar valley has made wine for well over two thousand years.", "precise", "Archaeological site", "Tikveš"),
 site(I, "stobi-winery", "Stobi winery", "estate", 41.5814, 21.9356, "Founded in the 2000s near Gradsko and named after the nearby Roman city, Stobi is one of the most modern wineries in the Vardar valley. It makes Vranec, Žilavka, Temjanika and Bordeaux varieties.", "precise", "Winery", "Tikveš", ["Stobi"]),
 site(I, "popova-kula", "Popova Kula, Demir Kapija", "estate", 41.4106, 22.2263, "Popova Kula, on a hill above Demir Kapija ('iron gate') where the Vardar cuts through a gorge, is a winery and guesthouse that has championed the local red Stanušina.", "precise", "Winery", "Tikveš", ["Popova Kula"]),
]
write(I, {"countries": [MK], "regions": MK_REG, "appellations": MK_APPS, "sites": MK_SITES})

# ---------------------------------------------------------------- Albania
I = "al"
SRC_AL = [
    S("Wikipedia: Albanian wine", "https://en.wikipedia.org/wiki/Albanian_wine"),
    S("GOV.UK protected food and drink names register (Albanian wine GIs)", "https://www.gov.uk/protected-food-drink-names?country_of_origin%5B%5D=albania"),
]
AL = {
 "iso2": I, "name": "Albania", "tier": "minor",
 "tagline": "Kallmet, Shesh and Pulës: native grapes on the Adriatic hills, recovering from a century of upheaval.",
 "stats": {"vineyard_ha": 10178, "production_mhl": None, "year": 2015, "world_rank_production": None,
           "note": "Wikipedia (national statistics): 10,178 ha of vineyard and 204,000 t of grapes in 2015; no reliable recent wine-production figure found."},
 "overview": """Albania has grown vines since the Illyrians, at least 3,000 years ago, and the Greek and Roman colonies of the coast (Apollonia, Dyrrhachium, Butrint) left wine imagery in their ruins. The Ottoman centuries reduced vineyards largely to Christian areas, phylloxera nearly destroyed what remained by 1933, and after 1945 the Communist regime planted collective vineyards (from about 2,700 ha after the war to over 17,000 ha by 1990) for brandy and bulk wine. The collapse of 1991 and the privatisation chaos that followed broke up those estates; today about 10,000 ha are planted, mostly for table grapes and home wine and raki, and a few dozen commercial wineries are building a modern identity.

That identity rests on native grapes. Kallmet, a red named after the village of Kallmet near Lezhë, grows on the Zadrima plain between Shkodër and Lezhë and makes dark, spicy wines. Shesh i Zi (black) and Shesh i Bardhë (white) take their name from Shesh, near Tirana, and are the most widespread. Pulës is a white of Berat, Debinë a white from the south-east (Korçë, Përmet), and Vlosh a red of the Vlorë coast. The best-known producers include Kantina Arbëri in Mirditë (Kallmet), Çobo near Berat (Pulës and Shesh), Kokomani near Tirana, Nurellari in Skrapar, Skënderbeu and Bardha.

Albania is an EU candidate. Under its trade agreement with the United Kingdom, 36 Albanian wine names, essentially its historic districts from Shkodër and Koplik to Korçë, Përmet, Berat and Sarandë, are protected as geographical indications.""",
 "history": [
    H("1st millennium BC", "Illyrian and Greek vines", "Illyrian tribes and the Greek colonies of Epidamnos (Durrës) and Apollonia grew and traded wine; Roman Butrint's decorations show its importance.", 40.7333, 19.4750),
    H("1933", "Phylloxera", "Phylloxera nearly wiped out Albanian viticulture; after the Second World War only about 2,737 ha remained.", None, None),
    H("1945 to 1990", "Collective vineyards", "The Communist state expanded vineyards to about 17,600 ha by 1990 for wine and brandy, but exports fell from 61,000 hl (1971) to 22,000 hl (1985).", 41.3275, 19.8187),
    H("1990s onward", "Private revival", "After 1991 collective farms were dismantled and family wineries emerged, focusing on Kallmet, Shesh, Pulës and Debinë.", 41.8506, 19.6858),
 ],
 "classification": """Albania is not in the EU and has no EU-registered wine PDOs or PGIs. Under the UK-Albania trade agreement, 36 Albanian wine names are protected in the UK as geographical indications, corresponding to the country's historic districts (rrethe): Berat, Bulqizë, Delvinë, Devoll, Dibër, Durrës, Elbasan, Fier, Gjirokastër, Gramsh, Has, Kavajë, Kolonjë, Koplik, Korçë, Krujë, Kukës, Kurbin, Kuçovë, Lezhë, Librazhd, Lushnjë, Mallakastër, Mat, Mirditë, Peqin, Pogradec, Pukë, Përmet, Sarandë, Shkodër, Skrapar, Tepelenë, Tiranë, Tropojë and Vlorë.""",
 "climate_soils": """The coastal plain and hills are Mediterranean, with hot dry summers; the interior and the south-eastern highlands around Korçë are continental and cooler. Soils range from alluvial plains to limestone and flysch hills.""",
 "grapes": [
    {"name": "Kallmet", "note": "Native red of the Zadrima plain near Lezhë and Shkodër, named after the village of Kallmet."},
    {"name": "Shesh i Zi and Shesh i Bardhë", "note": "Red and white grapes named after Shesh near Tirana; the most widespread natives."},
    {"name": "Pulës", "note": "White grape of Berat."},
    {"name": "Debinë", "note": "White of the south-east (Korçë, Përmet)."},
    {"name": "Vlosh", "note": "Red of the Vlorë coast."},
 ],
 "regions": ["Northern Albania", "Central and Southern Albania"],
 "further_reading": ["Albanian Wine (kantina producer sites)"],
 "sources": SRC_AL,
}
AL_REG = [
 region(I, "Northern Albania", 41.90, 19.70, 8.6, "The Zadrima plain and the hills of Shkodër, Lezhë and Mirditë: Kallmet country.",
  """The north (Shkodër, Koplik, Lezhë, Kurbin, Mirditë, Pukë) is the home of Kallmet, grown on the alluvial Zadrima plain and surrounding hills where the Drin reaches the sea. Kantina Arbëri in Mirditë and family wineries around Shkodër and Lezhë lead.""",
  """The Catholic north kept vineyards through the Ottoman period.""",
  """Alluvial plains and limestone hills; Mediterranean with high rainfall.""",
  """Kallmet, Shesh i Zi, Shesh i Bardhë.""", """Reds and whites.""",
  """UK-protected GIs Shkodër, Koplik, Lezhë, Kurbin, Mirditë, Pukë and others.""",
  ["Shkodër", "Koplik", "Lezhë", "Kurbin", "Mirditë", "Pukë"], SRC_AL),
 region(I, "Central and Southern Albania", 40.80, 19.90, 7.6, "Tirana's Shesh, Berat's Pulës and the Debinë of Korçë and Përmet.",
  """Central and southern Albania include Tirana (Shesh), Durrës and Kavajë on the coast, Berat (Pulës, Çobo winery), Skrapar (Nurellari), Vlorë (Vlosh), and the highlands of Korçë and Përmet (Debinë).""",
  """Greek and Roman Apollonia, Butrint and Berat give the region a deep wine history.""",
  """Coastal hills, river valleys and continental highlands.""",
  """Shesh i Zi, Shesh i Bardhë, Pulës, Debinë, Vlosh, Serinë, Merlot, Cabernet Sauvignon.""", """Reds and whites.""",
  """UK-protected GIs Tiranë, Berat, Korçë, Përmet, Vlorë, Skrapar and others.""",
  ["Tiranë", "Berat", "Korçë", "Përmet", "Vlorë", "Skrapar"], SRC_AL),
]
AL_INFO = {
 "Berat": ("Central and Southern Albania", "Berat, the 'city of a thousand windows' (UNESCO), is the home of the white Pulës. Çobo winery near Ura Vajgurore makes the best-known Pulës and Shesh."),
 "Bulqizë": ("Northern Albania", "Bulqizë is a mountainous district of the Drin valley in the north-east, known more for chrome mining than wine."),
 "Delvinë": ("Central and Southern Albania", "Delvinë is a small southern district near Sarandë with Mediterranean hillside vineyards."),
 "Devoll": ("Central and Southern Albania", "Devoll is a south-eastern highland district by the Greek border near Korçë."),
 "Dibër": ("Northern Albania", "Dibër (Peshkopi) is a mountain district in the north-east by North Macedonia."),
 "Durrës": ("Central and Southern Albania", "Durrës, ancient Epidamnos and Dyrrachium, is Albania's main port, with vineyards on the coastal hills."),
 "Elbasan": ("Central and Southern Albania", "Elbasan lies in the Shkumbin valley in central Albania."),
 "Fier": ("Central and Southern Albania", "Fier, near ancient Apollonia, covers the Myzeqe plain and coastal hills."),
 "Gjirokastër": ("Central and Southern Albania", "Gjirokastër, the stone city of the south (UNESCO), lies in the Drino valley."),
 "Gramsh": ("Central and Southern Albania", "Gramsh is an upland district on the Devoll river in central Albania."),
 "Has": ("Northern Albania", "Has is a small district in the far north-east by Kosovo."),
 "Kavajë": ("Central and Southern Albania", "Kavajë lies on the coastal plain south of Durrës."),
 "Kolonjë": ("Central and Southern Albania", "Kolonjë (Ersekë) is a high south-eastern district near the Greek border."),
 "Koplik": ("Northern Albania", "Koplik lies north of Lake Shkodër near the Montenegrin border, part of Kallmet country."),
 "Korçë": ("Central and Southern Albania", "Korçë, on a high plateau in the south-east, is the centre of Debinë wines and of the Skënderbeu winery tradition."),
 "Krujë": ("Northern Albania", "Krujë, Skanderbeg's mountain stronghold, overlooks the coastal plain north of Tirana."),
 "Kukës": ("Northern Albania", "Kukës is a north-eastern district on the Drin near the Kosovo border."),
 "Kurbin": ("Northern Albania", "Kurbin (Laç) lies on the coastal plain between Tirana and Lezhë."),
 "Kuçovë": ("Central and Southern Albania", "Kuçovë, near Berat, is an oil-town district on the Devoll plain."),
 "Lezhë": ("Northern Albania", "Lezhë, at the mouth of the Drin, includes the village of Kallmet, which gave its name to Albania's most famous red grape."),
 "Librazhd": ("Central and Southern Albania", "Librazhd is a mountain district on the upper Shkumbin."),
 "Lushnjë": ("Central and Southern Albania", "Lushnjë lies on the Myzeqe plain, an agricultural heartland."),
 "Mallakastër": ("Central and Southern Albania", "Mallakastër is a hilly district between Fier and Tepelenë."),
 "Mat": ("Northern Albania", "Mat (Burrel) is a mountain district in north-central Albania."),
 "Mirditë": ("Northern Albania", "Mirditë, a Catholic mountain district, is home to Kantina Arbëri, a leading producer of Kallmet and Shesh."),
 "Peqin": ("Central and Southern Albania", "Peqin lies in the lower Shkumbin valley in central Albania."),
 "Pogradec": ("Central and Southern Albania", "Pogradec sits on Lake Ohrid's south shore, a cool, lake-moderated district."),
 "Pukë": ("Northern Albania", "Pukë is a forested northern highland district."),
 "Përmet": ("Central and Southern Albania", "Përmet, in the Vjosa valley in the south, is known for Debinë whites, raki and preserves."),
 "Sarandë": ("Central and Southern Albania", "Sarandë, near ancient Butrint, is on the southern Ionian coast opposite Corfu."),
 "Shkodër": ("Northern Albania", "Shkodër, on its lake by the Montenegrin border, is the northern capital and a centre of Kallmet."),
 "Skrapar": ("Central and Southern Albania", "Skrapar, in the Osum valley south-east of Berat, is home to the Nurellari winery."),
 "Tepelenë": ("Central and Southern Albania", "Tepelenë is a southern district on the Vjosa, birthplace of Ali Pasha."),
 "Tiranë": ("Central and Southern Albania", "Tirana's district includes Shesh, which gave its name to the Shesh grapes, and the Kokomani winery at Ndroq."),
 "Tropojë": ("Northern Albania", "Tropojë is the remote north-eastern mountain district of the Valbona valley."),
 "Vlorë": ("Central and Southern Albania", "Vlorë, on the bay where Albania's independence was declared in 1912, is home to the Vlosh red, grown around Narta."),
}
AL_APPS = [app(I, n, [n], "GI", r, t + " It is one of 36 Albanian wine names protected in the United Kingdom under the UK-Albania trade agreement, matching the historic district boundaries; few labels use it yet.",
               created="UK GI (trade agreement)", styles=["red", "white"], dominant=None, grapes=None) for n, (r, t) in AL_INFO.items()]
AL_SITES = [
 site(I, "kallmet", "Kallmet", "village", 41.8506, 19.6858, "The village of Kallmet near Lezhë gave its name to Albania's most famous native red grape, grown on the surrounding Zadrima plain and hills. The village is part of the Catholic north, where vineyards survived the Ottoman centuries.", "precise", "Wine village", "Lezhë"),
 site(I, "cobo", "Çobo winery", "estate", 40.7781, 19.8586, "The Çobo family winery at Ura Vajgurore near Berat is one of Albania's best-known estates, championing the local white Pulës and the red Shesh i Zi.", "precise", "Family winery", "Berat", ["Çobo"]),
 site(I, "kokomani", "Kokomani winery", "estate", 41.3010, 19.6261, "Kantina Kokomani at Ndroq, west of Tirana, is a modern family winery making Shesh and international varieties from the coastal hills between the capital and Durrës.", "precise", "Winery", "Tiranë", ["Kokomani"]),
 site(I, "nurellari", "Nurellari winery", "estate", 40.6475, 20.0413, "Nurellari's winery near Poliçan in the Osum valley of Skrapar, south-east of Berat, makes wines from local and international grapes in Albania's rugged southern interior.", "precise", "Winery", "Skrapar", ["Nurellari"]),
]
write(I, {"countries": [AL], "regions": AL_REG, "appellations": AL_APPS, "sites": AL_SITES})

# ---------------------------------------------------------------- Kosovo
I = "xk"
SRC_XK = [
    S("Kosovo Ministry of Industry, Entrepreneurship and Trade: Vineyards and wines sector", "https://mik.rks-gov.net/?p=1752"),
    S("Wikipedia: Stone Castle (Kosovan winery)", "https://en.wikipedia.org/wiki/Stone_Castle_(Kosovan_winery)"),
]
XK = {
 "iso2": I, "name": "Kosovo", "tier": "minor",
 "tagline": "The Rahovec valley's sunny slopes, once the source of a German supermarket red, rebuilding as a small wine country.",
 "stats": {"vineyard_ha": 3406, "production_mhl": None, "year": 2024, "world_rank_production": None,
           "note": "Kosovo Ministry of Industry, Entrepreneurship and Trade: 3,405.54 ha of vineyard in 2024 (Rahovec 2,465 ha, Suharekë 575, Prizren 198, Gjakovë 77, Malishevë 65); 35 licensed wineries, three of which make about 70% of the wine."},
 "overview": """Kosovo's vineyards are concentrated in the south-west, in the Dukagjin plain (Rrafshi i Dukagjinit) and especially around Rahovec (Orahovac in Serbian), which alone has about 2,465 of the country's 3,400 ha. The hills around Rahovec, at 300 to 600 m with around 276 sunny days a year, loamy and red soils and a ripening season from mid-July to mid-October, have grown grapes since antiquity. In the Yugoslav era the state winery at Rahovec shipped large volumes of soft red wine to West Germany; it was sold there under brands such as Amselfelder, German for 'blackbird field', the meaning of the Serbian name Kosovo Polje.

War in 1998 and 1999 and the loss of the German market left the sector in ruins. The old state winery was privatised in 2006 as Stone Castle, bought for €5.5 million by Albanian-American businessman Rrustem Gecaj; it has a capacity of 10 to 13 million litres and is one of the largest private wineries in the region. Today 35 licensed wineries operate, three of them making about 70 percent of the wine, alongside many small family cellars in Rahovec, Suharekë and Prizren. Main grapes include Vranac, Prokupac, Gamay, Pinot Noir, Merlot, Cabernet Sauvignon, Smederevka, Riesling and Chardonnay.""",
 "history": [
    H("1952", "Rahovec's big winery", "The Rahovec winery that became Stone Castle was founded in 1952; it grew into a major exporter of red wine to West Germany in the Yugoslav period.", 42.3691, 20.6193),
    H("1998 to 1999", "War", "The Kosovo war devastated vineyards and ended the German export trade.", 42.6629, 21.1655),
    H("2006", "Stone Castle privatised", "The former state winery was privatised for €5.5 million and renamed Stone Castle; its capacity is 10 to 13 million litres.", 42.3691, 20.6193),
 ],
 "classification": """Kosovo regulates wine through its own wine law and a register of licensed producers; vineyard statistics are kept by region (Rahovec, Suharekë, Prizren, Gjakovë, Malishevë). No Kosovar wine names appear in the EU or UK geographical-indication registers as of 2026.""",
 "climate_soils": """Continental with Mediterranean influence from the south-west; about 276 sunny days a year in Rahovec; loamy soils with some red soils; vineyards mostly at 300 to 600 m.""",
 "grapes": [
    {"name": "Vranac and Prokupac", "note": "Balkan reds that dominate the local blends."},
    {"name": "Gamay, Pinot Noir, Merlot, Cabernet Sauvignon", "note": "International reds planted widely in the Yugoslav era."},
    {"name": "Smederevka, Riesling, Chardonnay, Žilavka", "note": "Main whites."},
 ],
 "regions": ["Dukagjin"],
 "further_reading": ["Kosovo Ministry of Industry, Entrepreneurship and Trade, vineyards and wine sector"],
 "sources": SRC_XK,
}
XK_REG = [region(I, "Dukagjin", 42.35, 20.65, 9.0, "Rahovec, Suharekë and Prizren: the sunny south-western hills where nearly all of Kosovo's vines grow.",
  """The Dukagjin plain and its rim of hills in south-western Kosovo contain almost the whole vineyard: Rahovec (about 2,465 ha), Suharekë (575 ha), Prizren (198 ha), Gjakovë (77 ha) and Malishevë (65 ha), as reported by the ministry for 2024. Rahovec town is the wine capital, home of Stone Castle and dozens of family cellars.""",
  """Yugoslav-era Rahovec exported red wine to West Germany; war and the loss of that market shattered the industry, which has been rebuilding since 2000.""",
  """Hillsides at 300 to 600 m with loamy and red soils; continental climate with Mediterranean air from the Drin valley.""",
  """Vranac, Prokupac, Gamay, Pinot Noir, Merlot, Cabernet Sauvignon, Smederevka, Riesling, Chardonnay.""",
  """Mostly reds, some whites and rosé.""",
  """No GIs; statistics and licensing by region.""",
  [], SRC_XK, alt=["Rrafshi i Dukagjinit", "Rahovec"])]
XK_SITES = [
 site(I, "stone-castle", "Stone Castle, Rahovec", "estate", 42.3691, 20.6193, "Founded in 1952 as Rahovec's large wine combine, the winery was privatised in 2006 for €5.5 million and renamed Stone Castle. With 10 to 13 million litres of capacity and the ability to process about 70,000 tonnes of grapes a season, it is one of the largest private wineries in Europe.", "precise", "Winery", None, ["Stone Castle"]),
 site(I, "rahovec", "Rahovec", "village", 42.3999, 20.6527, "Rahovec (Orahovac) is Kosovo's wine capital. Its municipality holds about 2,465 of the country's 3,400 ha of vineyard on sunny hills at 300 to 600 m, with many small family cellars alongside Stone Castle.", "approx", "Wine town", None),
]
write(I, {"countries": [XK], "regions": XK_REG, "appellations": [], "sites": XK_SITES})
