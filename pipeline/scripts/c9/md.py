import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c9")
from c9_common import site, save

ISO = "md"
SRC = [
    {"title": "OIV, State of the World Wine Sector in 2025", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf"},
    {"title": "Logos Press, Moldovan winemaking 2025: production growth and export trends", "url": "https://logos-pres.md/en/news/moldovan-winemaking-progressive-development"},
    {"title": "Logos Press, Moldova loses almost 2 thousand hectares of vineyards per year (April 2025)", "url": "https://logos-pres.md/en/news/moldova-loses-almost-2-thousand-hectares-of-vineyards-per-year"},
    {"title": "AGEPI, Moldovan geographical indications protected in the EU (2016)", "url": "https://agepi.gov.md/en/node/9982"},
    {"title": "Decanter (sponsored with Wine of Moldova), Wine in Moldova now (2023, updated 2025)", "url": "https://www.decanter.com/sponsored/wine-in-moldova-now-509474/"},
    {"title": "Adnkronos/PRNewswire, Moldova to host the 46th OIV World Congress (2025)", "url": "https://www.adnkronos.com/immediapress/eng/moldova-to-host-the-46th-world-congress-of-vine-and-wine-in-the-country-with-the-highest-vineyard-density-per-capita_4b125YbUEqT3yypHgLZDql"},
    {"title": "Forbes Romania, Moldovan wine exports January to July 2026", "url": "https://www.forbes.ro/republica-moldova-isi-extinde-exporturile-de-vin-romania-este-principala-destinatie-pentru-produsele-imbuteliate-518047"},
    {"title": "Wikipedia, Moldovan wine; Cricova (winery); Mileștii Mici (winery); Purcari (winery); Mimi Castle", "url": "https://en.wikipedia.org/wiki/Moldovan_wine"},
]

country = {
    "iso2": ISO, "name": "Moldova", "tier": "major",
    "tagline": "The most vine-covered country on earth, where a Soviet wine factory became a nation of underground cities and Fetească.",
    "stats": {"vineyard_ha": 110000, "production_mhl": 1.8, "year": 2025, "world_rank_production": 19,
              "note": "OIV, State of the World Wine Sector in 2025 (total vine area including table grapes and household plots; the national vine register counted about 47,700 ha of commercial wine-grape vineyards in 2024). 2025 output was the highest since 2018."},
    "overview": (
        "Moldova is the country where wine is not a sector of the economy so much as the economy's landscape. Squeezed between Romania and Ukraine, between the Prut and the Dniester, it has about 110,000 hectares of vines on some 33,800 square kilometres, roughly four hectares for every hundred people and the highest density of vineyard per person and per square kilometre of any country. Drive almost any road and the hills are striped with vines; most villages have a cellar, and many families still make their own wine from rows behind the house. Wine and divin, the national brandy, have long been among the country's leading exports.\n\n"
        "The history is one of empires using Moldova as their vineyard. Greek colonists on the Black Sea traded wine with the Getae and Dacians; Romans followed. Stephen the Great, prince of Moldavia from 1457 to 1504, is remembered for encouraging viticulture, and medieval Moldavian wine went north to Poland and Russia. After 1812 Bessarabia became part of the Russian Empire, which brought French varieties, German and Swiss colonists and estates such as Purcari (granted its status by Tsar Nicholas I in 1827) and the Mimi family's château at Bulboaca. By 1914 Bessarabia had the largest vineyard area in the Russian Empire. Under the Soviet Union, Moldova was turned into a wine factory: replanting from the 1950s took the vine area to about 220,000 hectares by 1960, and giant state combines shipped sweet and fortified wine, 'Cahor' and sparkling to the whole USSR. Then Gorbachev's anti-alcohol campaign of 1985 to 1987 destroyed about 30 percent of the vineyards.\n\n"
        "Independence in 1991 left Moldova dependent on one customer. In 2006 Russia, which took around 80 percent of Moldovan wine, banned it (alongside Georgian wine) for two years; in September 2013, as Moldova prepared to sign its Association Agreement with the EU, Moscow banned it again. Each embargo was a disaster for bulk producers and a turning point for quality. The National Office of Vine and Wine (ONVV) was created in 2013 and launched the national brand Wine of Moldova around the National Wine Day festival, held in Chișinău on the first weekend of October since 2002, and three wine regions were protected as PGIs in the EU in 2016: Codru, Ștefan Vodă and Valul lui Traian, with Divin for brandy.\n\n"
        "What a wine nerd finds now is a country with world-class infrastructure built for another age, and a young generation reworking it. Cricova and Mileștii Mici are literally underground cities, carved from the limestone quarries that built Chișinău: Mileștii Mici holds the Guinness record for the largest wine collection, and Cricova's 120 kilometres of streets store sparkling wine and a national collection that includes bottles from Hermann Göring's cellar. Purcari's red blend, Negru de Purcari, was famous in nineteenth-century Europe. Private estates such as Château Vartely, Asconi, Et Cetera, Gitana, Carpe Diem, Fautor, Castel Mimi and Purcari Wineries (listed on the Bucharest stock exchange) export to the EU, the US and China; small producers have doubled their exports of artisanal wine in five years.\n\n"
        "The grapes tell two stories. International varieties planted in Russian and Soviet times (Cabernet Sauvignon, Merlot, Chardonnay, Sauvignon Blanc, Aligoté, Pinot Noir, Muscat, Rkatsiteli, Saperavi) still dominate. But the native Feteasca family (Fetească Albă, Fetească Regală, Fetească Neagră) and the red Rară Neagră, along with Moldovan crosses such as Viorica, are the signature now, covering only about a tenth of the vineyard but most of the excitement. Fetească Neagră gives plummy, spicy reds; Rară Neagră is lighter, sour-cherry and floral, and was the original backbone of Negru de Purcari.\n\n"
        "The challenge is the vineyard itself. Almost half the registered area is more than 30 years old, and growers have been grubbing up close to 2,000 hectares a year: between 2014 and 2024 about 20,500 hectares were cleared and fewer than 3,900 replanted. Drought and frost hit 2024 hard, before 2025 brought the biggest harvest since 2018 (259,000 tonnes of grapes processed, wine production up about 53 percent). Exports, 144 million litres worth more than 234 million US dollars in 2024, are shifting from bulk to bottle, and from Russia towards Romania, Poland, Ukraine, the EU and even West Africa. In June 2025 Chișinău hosted the OIV World Congress of Vine and Wine for the first time."
    ),
    "history": [
        {"when": "c. 2800 BC", "title": "Grape seeds at Vărvăreuca", "text": "Imprints of cultivated grape seeds on pottery from the village of Vărvăreuca, in the north, are among the oldest traces of grape growing between the Prut and the Dniester. Fossil leaves of a prehistoric vine, Vitis teutonica, were found near Naslavcea.", "lat": 47.79, "lon": 28.21},
        {"when": "1457 to 1504", "title": "Stephen the Great's vineyards", "text": "Prince Stephen III of Moldavia promoted viticulture and the import of better varieties; wine became one of medieval Moldavia's main exports to Poland and Russia. His name lives on in the Ștefan Vodă wine region.", "lat": 46.5156, "lon": 29.6621},
        {"when": "1812", "title": "Bessarabia joins the Russian Empire", "text": "The Treaty of Bucharest gave the land between the Prut and the Dniester to Russia. Imperial support, French varieties and colonists from Germany, Switzerland and Bulgaria transformed the vineyard; by 1837 Bessarabia had 14,000 ha of vines.", "lat": 47.0105, "lon": 28.8638},
        {"when": "1827", "title": "Purcari, Bessarabia's first specialised winery", "text": "A decree of Tsar Nicholas I gave Purcari on the Dniester the status of the first specialised winery in Bessarabia. Negru de Purcari later won a gold medal in Paris in 1878 and was served to Queen Victoria and Tsar Nicholas II.", "lat": 46.5295, "lon": 29.8719},
        {"when": "1893 to 1901", "title": "Constantin Mimi's château", "text": "The Bessarabian statesman and winemaker Constantin Mimi, trained in Montpellier, built a reinforced-concrete winery in the French style at Bulboaca, considered the first château of Bessarabia.", "lat": 46.8921, "lon": 29.2918},
        {"when": "1906 to 1914", "title": "Phylloxera and recovery", "text": "After phylloxera devastated the vines at the end of the nineteenth century, grafted replanting began in earnest in 1906; by 1914 Bessarabia had the largest vineyard area in the Russian Empire.", "lat": 47.0105, "lon": 28.8638},
        {"when": "1950s", "title": "Cricova goes underground", "text": "Limestone galleries dug since the fifteenth century to build Chișinău were turned into Cricova's wine city in the 1950s; Soviet planting took Moldova's vineyard to about 220,000 ha by 1960.", "lat": 47.133, "lon": 28.85},
        {"when": "1969", "title": "Mileștii Mici founded", "text": "The state complex for storing and ageing quality wines was set up in the Mileștii Mici galleries south of Chișinău; in 2005 Guinness World Records listed its collection as the largest in the world.", "lat": 46.9212, "lon": 28.8199},
        {"when": "1985 to 1987", "title": "Gorbachev's anti-alcohol campaign", "text": "Moscow's campaign against drinking led to about 30 percent of Moldova's vineyards being destroyed in two years.", "lat": 47.0105, "lon": 28.8638},
        {"when": "2006 and 2013", "title": "Russian embargoes", "text": "Russia banned Moldovan wine in 2006 (lifted in 2007 to 2008) and again in September 2013, as Moldova moved to sign its EU Association Agreement. The bans forced a pivot to quality and Western markets.", "lat": 47.0105, "lon": 28.8638},
        {"when": "2013", "title": "Wine of Moldova and the ONVV", "text": "The National Office of Vine and Wine was created and launched the national brand Wine of Moldova, promoted above all at National Wine Day, held on the first weekend of October since 2002.", "lat": 47.0105, "lon": 28.8638},
        {"when": "2016", "title": "EU protection for Codru, Ștefan Vodă and Valul lui Traian", "text": "The three historical wine regions and the brandy name Divin were protected as geographical indications in the EU on 18 October 2016.", "lat": 46.5156, "lon": 29.6621},
        {"when": "2023", "title": "Europe's leaders at Castel Mimi", "text": "Castel Mimi hosted the second summit of the European Political Community on 1 June 2023, a symbol of how far Moldova's wine estates have come.", "lat": 46.8921, "lon": 29.2918},
        {"when": "2025", "title": "The OIV comes to Chișinău", "text": "Moldova hosted the 46th OIV World Congress of Vine and Wine in June 2025 and harvested its biggest crop since 2018.", "lat": 47.0105, "lon": 28.8638},
    ],
    "classification": (
        "Moldova's wine law follows the EU model. At the top are wines with a protected designation of origin (Vin cu Denumire de Origine Protejată, DOP): historic appellations such as Ciumai and Romănești were already protected in the EU before 2016, but PDOs are few and little used on labels. The workhorse is the protected geographical indication (Indicație Geografică Protejată, IGP): Codru in the centre, Ștefan Vodă in the south-east and Valul lui Traian in the south-west, each managed by a growers' association that sets yields, varieties and controls. Divin is a national IGP for wine brandy aged at least three years in oak. Below these sit varietal wines and plain wine.\n\n"
        "Older Soviet-era names survive on labels and in cellars: 'Cahor' (a sweet, fortified red in the Russian Orthodox church style, now often called Ciumai or Moldavian dessert wine), 'Negru de Purcari' and 'Roșu de Purcari' (brand names of historic blends) and 'Codru' as a red blend name. Wines labelled IGP must come from registered vineyards in the zone, and the ONVV runs a national vine and wine register."
    ),
    "climate_soils": (
        "Moldova sits around 46 to 48 degrees north, on the same latitude band as Burgundy and Bordeaux, but with a moderately continental climate: hot summers, cold winters (frost below minus 20 degrees C happens), about 400 to 550 mm of rain a year and frequent summer drought. The Black Sea, 60 to 100 kilometres from the south-east, moderates the Ștefan Vodă zone and the Dniester valley, while the Codru hills in the centre are wooded, cooler and wetter, which is why they suit whites and sparkling base wines. The south (Valul lui Traian) is the warmest and driest and gives the ripest reds.\n\n"
        "Soils are dominated by chernozem, deep black earths rich in humus and often calcareous, over limestone, loess and clays; the limestone bedrock is what allowed the great underground cellars to be carved. Gentle hills between about 100 and 400 metres give slope and aspect but not much altitude."
    ),
    "grapes": [
        {"name": "Fetească Neagră", "note": "The flagship native red: plum, black cherry, spice and smoky notes; made in every style from fresh to oak-aged reserves."},
        {"name": "Rară Neagră", "note": "Light, aromatic red of the south-east (Romania's Băbească Neagră); the historic backbone of Negru de Purcari."},
        {"name": "Fetească Albă", "note": "Delicate, floral native white, used for still and sparkling wines; the most planted of the native grapes."},
        {"name": "Fetească Regală", "note": "A natural cross of Fetească Albă and Grasă de Cotnari: crisp, aromatic, popular for whites and sparkling."},
        {"name": "Viorica", "note": "Aromatic, disease-resistant Moldovan cross from the 1960s and 1970s, with notes of muscat, basil and lime blossom."},
        {"name": "Busuioacă Albă", "note": "White Muscat-like variety, aromatic dry and sweet wines."},
        {"name": "Cabernet Sauvignon", "note": "The leading red, central to Negru de Purcari and most reserve blends."},
        {"name": "Merlot", "note": "Widely planted, soft reds and blends."},
        {"name": "Chardonnay, Sauvignon Blanc, Aligoté and Pinot Gris", "note": "The main international whites, used for still and sparkling wine in Codru."},
        {"name": "Saperavi and Rkatsiteli", "note": "Georgian varieties planted in Soviet times, still common in the south."},
        {"name": "Isabella and Lidia", "note": "American hybrids grown in home vineyards for traditional village wine, outside the quality categories."},
    ],
    "regions": ["Codru", "Ștefan Vodă", "Valul lui Traian", "Northern zone (Bălți)", "Transnistria"],
    "further_reading": ["Wine of Moldova (wineofmoldova.com), National Office of Vine and Wine", "Wine Grapes, Jancis Robinson, Julia Harding and José Vouillamoz", "The Wines of Moldova, Romania and Bulgaria (World Atlas of Wine chapter), Hugh Johnson and Jancis Robinson"],
    "sources": SRC,
}

regions = [
    {"country": ISO, "name": "Codru", "alt": ["Codri", "IGP Codru"], "parent_region": None, "lat": 47.1, "lon": 28.5, "zoom": 8.5,
     "tagline": "Forested central hills, underground cities and Moldova's whites and sparkling wines.",
     "summary": "Codru, meaning 'forest' in Romanian, is the central wine region around Chișinău, Strășeni, Orhei, Ialoveni and Hîncești, and the largest of the three IGPs (around 60,000 ha of vineyard by Wine of Moldova's count). Oak and beech forest on the hills keep it cooler and wetter than the south, so it is Moldova's white and sparkling heartland, and its limestone holds the great galleries of Cricova and Mileștii Mici. Château Vartely, Asconi, Château Cojușna, Carpe Diem and Gitana are among the leading estates.",
     "history": "Historic estates such as Romănești, a former Soviet state farm whose Bordeaux-style blends were made for the Kremlin, and Cojușna are here. The galleries under Cricova and Mileștii Mici were quarried for Chișinău's limestone buildings from the fifteenth century onwards.",
     "terroir": "Hills of 200 to 400 metres with forest cover, grey forest soils and leached chernozem over limestone; about 550 mm of rain.",
     "grapes": "Fetească Albă, Fetească Regală, Chardonnay, Sauvignon Blanc, Aligoté, Pinot Noir, Traminer, Riesling, Cabernet Sauvignon, Merlot.",
     "styles": "Crisp whites, traditional-method sparkling, lighter reds.",
     "classification": "IGP Codru (EU-protected 2016); PDO Romănești.", "appellations": ["Codru", "Romănești"], "sources": SRC},
    {"country": ISO, "name": "Ștefan Vodă", "alt": ["Stefan Voda", "IGP Ștefan Vodă"], "parent_region": None, "lat": 46.55, "lon": 29.7, "zoom": 9,
     "tagline": "The Dniester's last hills before the Black Sea: Purcari and the great reds.",
     "summary": "The smallest of the three IGPs (around 10,000 ha) occupies the south-east corner of Moldova, between the lower Dniester and the Ukrainian border, a short drive from the Black Sea. It is red-wine country, famous for Purcari's Negru de Purcari, and home to Et Cetera at Crocmaz and the vineyards of Tănătari and Căușeni.",
     "history": "Purcari was established in 1827 by imperial decree; French specialists and German colonists made it famous in the nineteenth century.",
     "terroir": "Gentle slopes of 100 to 200 metres, calcareous chernozem; the Black Sea and the Dniester bring warm breezes, morning fog and milder winters, and about 3,300 degree-days of heat.",
     "grapes": "Cabernet Sauvignon, Merlot, Rară Neagră, Fetească Neagră, Saperavi, Malbec, Chardonnay.",
     "styles": "Structured, age-worthy reds; rosé; some whites.",
     "classification": "IGP Ștefan Vodă (EU-protected 2016); the Purcari subzone is its most famous name.",
     "appellations": ["Ștefan Vodă"], "sources": SRC},
    {"country": ISO, "name": "Valul lui Traian", "alt": ["Valul lui Traian", "IGP Valul lui Traian", "Trajan's Wall"], "parent_region": None, "lat": 46.1, "lon": 28.5, "zoom": 8.5,
     "tagline": "The warm south, named after a Roman earthwork, with Ciumai's dessert wines.",
     "summary": "Valul lui Traian ('Trajan's Wall') takes its name from the ancient earthworks that cross southern Moldova. The region (around 43,000 ha) covers the south-west, including Cahul, Cimișlia, Taraclia and the autonomous Gagauz region around Comrat. It is the warmest and driest part of the country, best for ripe reds (about 60 percent of plantings) and the traditional sweet and fortified wines of Ciumai and Tomai.",
     "history": "Bulgarian and Gagauz settlers arrived in the nineteenth century; Ciumai's state winery made 'Cahor' dessert wine for the Russian Orthodox church. Large Soviet-era wineries (Vulcănești, Comrat, Taraclia) still dominate volume.",
     "terroir": "Low, rolling plateaus of 100 to 250 metres, chernozem on loess; hot, dry summers.",
     "grapes": "Cabernet Sauvignon, Merlot, Fetească Neagră, Saperavi, Pinot Noir, Muscat, Chardonnay.",
     "styles": "Ripe reds, dessert and fortified wines, sparkling base wine.",
     "classification": "IGP Valul lui Traian (EU-protected 2016); PDO Ciumai.", "appellations": ["Valul lui Traian", "Ciumai"], "sources": SRC},
    {"country": ISO, "name": "Northern zone (Bălți)", "alt": ["Bălți"], "parent_region": None, "lat": 47.8, "lon": 27.9, "zoom": 8.5,
     "tagline": "Cool northern Moldova, mostly for brandy and sparkling base.",
     "summary": "The north around Bălți and Soroca is the coolest part of the country and is not covered by a wine IGP. Its grapes go mainly into divin and sparkling base wines.",
     "history": "Fossil leaves of Vitis teutonica near Naslavcea and grape-seed imprints from around 2800 BC at Vărvăreuca come from this area.",
     "terroir": "Cold winters, shorter season, chernozem plains.", "grapes": "Aligoté, Rkatsiteli, Pinot varieties.", "styles": "Base wines for brandy and sparkling.",
     "classification": "No wine IGP; covered by IGP Divin for brandy.", "appellations": [], "sources": SRC},
    {"country": ISO, "name": "Transnistria", "alt": ["Pridnestrovie"], "parent_region": None, "lat": 46.84, "lon": 29.6, "zoom": 9,
     "tagline": "The breakaway left bank of the Dniester and its Kvint brandy.",
     "summary": "The strip east of the Dniester is internationally recognised as part of Moldova but has been governed by unrecognised, Russian-backed authorities in Tiraspol since the 1992 war. Its best-known drinks business is the Kvint brandy distillery in Tiraspol, founded in 1897; wine production is modest and outside Moldova's IGP system.",
     "history": "The 1992 conflict froze the division; Russian troops remain.", "terroir": "Dniester terraces and steppe.", "grapes": "Aligoté, Rkatsiteli, Cabernet Sauvignon.",
     "styles": "Brandy, table wines.", "classification": "Not covered by Moldovan IGPs in practice.", "appellations": [], "sources": SRC},
]

apps = [
    {"country": ISO, "name": "Codru", "match": ["Codru", "IGP Codru", "Codri"], "cat": "IGP", "region": "Codru", "created": "Protected in the EU 2016", "styles": ["white", "red", "sparkling"], "dominant_style": "white",
     "grapes": "Fetească Albă, Fetească Regală, Viorica, Chardonnay, Sauvignon Blanc, Aligoté, Pinot Noir, Cabernet Sauvignon, Merlot and others",
     "summary": "Moldova's central IGP and its biggest, covering the forested hills around Chișinău. Cool for Moldova, it is the home of the country's fresh whites and its sparkling wine industry (Cricova, Asconi, Château Vartely, Carpe Diem, Gitana), and of the underground cellars of Cricova and Mileștii Mici. Codru reds are lighter and more aromatic than those of the south.",
     "terroir": "Wooded hills of 200 to 400 metres on grey forest soils and chernozem over limestone; the forests keep humidity higher and nights cooler.",
     "producers": ["Cricova", "Château Vartely", "Asconi", "Château Cojușna", "Carpe Diem", "Gitana", "Mileștii Mici"],
     "nerd_note": "Wine of Moldova counted about 61,200 ha of vineyard in IGP Codru, more than half the country's wine-grape area."},
    {"country": ISO, "name": "Ștefan Vodă", "match": ["Ștefan Vodă", "Stefan Voda", "IGP Stefan Voda", "Ştefan Vodă"], "cat": "IGP", "region": "Ștefan Vodă", "created": "Protected in the EU 2016", "styles": ["red", "rose", "white"], "dominant_style": "red",
     "grapes": "Cabernet Sauvignon, Merlot, Rară Neagră, Fetească Neagră, Saperavi, Malbec, Chardonnay and others",
     "summary": "The south-eastern IGP on the lower Dniester, named after Stephen the Great, and the source of Moldova's most celebrated reds. Purcari's Negru de Purcari (Cabernet Sauvignon, Saperavi and Rară Neagră) has been made here since the nineteenth century; Et Cetera at Crocmaz and estates around Tănătari and Căușeni carry the tradition forward.",
     "terroir": "Low slopes of 100 to 200 metres within about 60 kilometres of the Black Sea; Dniester fog and sea breezes temper winter cold and summer heat on calcareous chernozem.",
     "producers": ["Purcari", "Et Cetera", "Crama Mircesti"],
     "nerd_note": "The Purcari vineyards are about 500 metres from the Dniester and less than 2 kilometres from the Ukrainian border."},
    {"country": ISO, "name": "Valul lui Traian", "match": ["Valul lui Traian", "IGP Valul lui Traian"], "cat": "IGP", "region": "Valul lui Traian", "created": "Protected in the EU 2016", "styles": ["red", "white", "sweet", "fortified"], "dominant_style": "red",
     "grapes": "Cabernet Sauvignon, Merlot, Fetească Neagră, Saperavi, Pinot Noir, Muscat, Chardonnay and others",
     "summary": "The southern IGP, named after the Roman-era earthworks known as Trajan's Wall, is the warmest and driest part of Moldova. Reds make up about 60 percent of its plantings and ripen fully; it also keeps the dessert-wine traditions of Ciumai and Tomai. Large wineries in Gagauzia and around Cahul make much of the volume.",
     "terroir": "Rolling plateaus of 100 to 250 metres, chernozem on loess, hot summers with drought risk.",
     "producers": ["Bostavan (Purcari Wineries)", "Fautor", "Vinăria Ciumai"],
     "nerd_note": "About 43,200 ha of vineyard lie in this IGP."},
    {"country": ISO, "name": "Divin", "match": ["Divin", "IGP Divin"], "cat": "IGP", "region": "Codru", "created": "Protected in the EU 2016", "styles": ["fortified"], "dominant_style": "fortified",
     "grapes": "Wine distillate from Moldovan grapes",
     "summary": "A geographical indication for Moldovan wine brandy, covering the whole country. Divin must be double-distilled from wine and aged at least three years in oak; it replaced the Soviet-era name 'cognac'. Leading houses include Kvint (Tiraspol), Călărași Divin and Barza Albă.",
     "nerd_note": "Divin covers the whole territory, including Transnistria, where the Kvint distillery has made brandy since 1897."},
    {"country": ISO, "name": "Ciumai", "match": ["Ciumai", "Chumai", "Cahor-Ciumai"], "cat": "PDO", "region": "Valul lui Traian", "created": "Protected in the EU before 2016", "styles": ["sweet", "fortified", "red"], "dominant_style": "sweet",
     "grapes": "Cabernet Sauvignon (traditionally)",
     "summary": "A historic appellation from the village of Ciumai in the Taraclia district, known for a deep red dessert wine in the 'Cahor' style once supplied to the Russian Orthodox church. The name was one of Moldova's first designations of origin protected in the EU."},
    {"country": ISO, "name": "Romănești", "match": ["Romănești", "Romanesti", "Romăneşti"], "cat": "PDO", "region": "Codru", "created": "Protected in the EU before 2016", "styles": ["red"], "dominant_style": "red",
     "grapes": "Cabernet Sauvignon, Merlot, Malbec (Bordeaux varieties)",
     "summary": "The historic estate and village of Romănești in the Strășeni district, Codru, whose Bordeaux-style reds were made for the imperial and later Soviet elite. Romănești was among Moldova's first designations of origin protected in the EU."},
]

S = []
def s(*a, **k): S.append(site(ISO, *a, **k))

s("Cricova underground wine city", "cellar", 47.1481, 28.8608, "Cricova's limestone galleries were dug from the fifteenth century to quarry building stone for Chișinău and converted into a wine city in the 1950s: about 120 kilometres of tunnels, half used for wine, with 'streets' named after the wines stored in them (Cabernet Street, Feteasca Street), held at about 12 degrees C all year. It is Moldova's traditional-method sparkling house and keeps the national collection, about 1.3 million bottles including wines from Hermann Göring's cellar, seized by the Soviets in 1945. Yuri Gagarin is said to have visited in 1966 and emerged two days later; Vladimir Putin celebrated his 50th birthday here.", "approx", cls="State winery, national oenotheque", app="Codru", producers=["Cricova"])
s("Mileștii Mici", "cellar", 46.9212, 28.8199, "A state wine complex founded in 1969 in former limestone mines about 18 kilometres south of Chișinău. The galleries run for about 200 kilometres, of which 55 are used, at 12 to 14 degrees C and 85 to 95 percent humidity. In August 2005 Guinness World Records listed its collection, about 1.5 million bottles at the time, as the largest wine collection in the world; visitors drive through the tunnels.", "approx", cls="State wine complex (Guinness record collection)", app="Codru", producers=["Mileștii Mici"])
s("Purcari Winery", "chateau", 46.5295, 29.8719, "Established in 1827 by a decree of Tsar Nicholas I as Bessarabia's first specialised winery, on a slope 500 metres from the Dniester. Its Negru de Purcari, a blend of Cabernet Sauvignon, Saperavi and Rară Neagră, won gold in Paris in 1878 and was served to Queen Victoria and Nicholas II; Pimen Cupcea recreated it after the Second World War. Revived since 2003, the château and its restored 1827 vaulted cellar anchor Purcari Wineries, now listed on the Bucharest stock exchange.", "precise", cls="Historic estate (1827)", app="Ștefan Vodă", producers=["Purcari"])
s("Castel Mimi", "chateau", 46.8921, 29.2918, "The winery Constantin Mimi, a Bessarabian governor trained in Montpellier, completed at Bulboaca around 1893 to 1901, considered the first true château of Bessarabia and built of reinforced concrete, then a novelty. Its cellar held about 300,000 litres. Restored between 2011 and 2016 as a winery, hotel and museum, it hosted the European Political Community summit in June 2023.", "precise", cls="Historic château (1893 to 1901)", app="Codru", producers=["Castel Mimi"])
s("Château Vartely", "estate", 47.3803, 28.8343, "A modern estate founded in 2004 on the outskirts of Orhei, with vineyards in Codru and the south, a hotel and one of Moldova's most visited wineries; known for Fetească Neagră, Rară Neagră and the Individo range.", "approx", app="Codru", producers=["Château Vartely"])
s("Asconi", "estate", 46.8388, 29.0259, "Family winery founded in 1994 at Puhoi, south-east of Chișinău, with a large tourist complex and a reputation for Fetească Neagră and sparkling wines.", "precise", app="Codru", producers=["Asconi"])
s("Et Cetera", "estate", 46.4536, 29.9232, "The Luchianov brothers' estate at Crocmaz, founded in 2002 in the Ștefan Vodă region near the Ukrainian border, a leader of Moldova's boutique wave with blends of Saperavi, Fetească Neagră and Bordeaux grapes.", "precise", app="Ștefan Vodă", producers=["Et Cetera"])
s("Gitana Winery (Tănătari)", "estate", 46.7214, 29.4194, "A small family winery in Tănătari, Căușeni district, known for low-yield reds such as its Lupi range of Rară Neagră and Fetească Neagră; the village sits between Codru and the Ștefan Vodă region.", "approx", producers=["Gitana"])
s("Château Cojușna", "estate", 47.0939, 28.6693, "A long-established winery at Cojușna, north-west of Chișinău, famous in Soviet times and now operating as Château Cojușna, with wine tunnels and tasting rooms in the Codru hills.", "approx", app="Codru", producers=["Château Cojușna"])
s("Romănești estate", "estate", 47.2263, 28.7120, "The historic estate at Romănești, Strășeni, planted with Bordeaux varieties in the late nineteenth century, whose reds were reputedly reserved for the Kremlin in Soviet times; one of Moldova's first designations of origin protected in the EU.", "approx", app="Romănești")
s("Ciumai", "village", 45.7809, 28.5674, "Southern village in the Taraclia district, home of the historic Ciumai dessert wine and a large winery.", "approx", app="Ciumai")
s("Orheiul Vechi", "historic", 47.3057, 28.9749, "A dramatic limestone gorge of the Răut river with a cave monastery and medieval ruins, at the edge of the Codru wine region.", "precise", cls="Historic landscape")
s("Kvint distillery, Tiraspol", "house", 46.8403, 29.6433, "Brandy distillery founded in 1897 in Tiraspol, in the breakaway Transnistria region; Kvint is the best-known producer of Moldovan divin-style brandy.", "approx", cls="Brandy house (1897)", producers=["Kvint"])

data = {"countries": [country], "regions": regions, "appellations": apps, "sites": S}
if __name__ == "__main__":
    save(ISO, data)
