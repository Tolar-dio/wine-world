import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c9")
from c9_common import site, save

S = []
def s(iso, *a, **k): S.append(site(iso, *a, **k))

# ------------------------------------------------------------------ ARMENIA
SRC_AM = [
    {"title": "Barnard, H. et al. (2011), Chemical evidence for wine production around 4000 BCE in the Late Chalcolithic Near Eastern highlands, Journal of Archaeological Science 38(5)", "url": "https://doi.org/10.1016/j.jas.2010.11.012"},
    {"title": "Wikipedia, Areni-1 winery", "url": "https://en.wikipedia.org/wiki/Areni-1_winery"},
    {"title": "Wikipedia, Teišebaini (Karmir Blur)", "url": "https://en.wikipedia.org/wiki/Tei%C5%A1ebaini"},
    {"title": "Wikipedia, Armenian wine", "url": "https://en.wikipedia.org/wiki/Armenian_wine"},
]
am = {
    "iso2": "am", "name": "Armenia", "tier": "notable",
    "tagline": "Home of the world's oldest known winery, Urartian cellars of buried karas jars and a mountain wine revival around Areni.",
    "stats": {"note": "Wine-grape area roughly 15,000 to 17,000 ha in the 2020s (most grapes historically went to brandy); production figures vary by source and are not reported by OIV 2025."},
    "overview": (
        "In 2007 archaeologists digging in a three-chambered limestone cave above the Arpa river, near the village of Areni in Vayots Dzor, found a winery: a clay basin about a metre long for treading grapes, sloping to drain juice into a vat about 60 centimetres deep, storage jars, cups, grape seeds, pressed skins and vines, all preserved by the cave's dry air and a layer of sheep dung. Radiocarbon dating placed it around 4100 to 4000 BC, and a 2011 paper by Hans Barnard and colleagues in the Journal of Archaeological Science confirmed malvidin, the pigment of red grapes, in the vessels. Areni-1 is the oldest winery yet found, and the same cave gave the world's oldest leather shoe.\n\n"
        "Wine runs through the Urartian kingdom that ruled the Armenian Highlands in the first millennium BC. At Teishebaini (Karmir Blur), a fortress built by King Rusa II on the edge of today's Yerevan, excavators found storerooms with hundreds of karases, huge clay jars sunk into the ground, with capacity marks on their shoulders. Xenophon's Greek army, marching through in 401 BC, was served wine and beer from jars buried in village houses.\n\n"
        "Christianity, adopted in 301, kept wine sacred; cross-stones (khachkars) are carved with vines and pomegranates. In the Soviet era Armenia's grapes went mostly into brandy: the Yerevan brandy distillery (founded in 1887, bought by Nikolay Shustov's company in 1899, famous as Ararat brandy and owned by Pernod Ricard since 1998) supplied a quarter of all Soviet brandy, and wine was largely sherry-style or bulk. Since about 2010 a wine renaissance has followed: Zorah (Rind), Trinity Canyon, Old Bridge, Hin Areni, Momik, Voskevaz, ArmAs, Van Ardi, Keush (sparkling at 1,750 metres) and many small producers now bottle native grapes from some of the highest vineyards in the northern hemisphere.\n\n"
        "The signature grapes are the red Areni Noir (Areni), thick-skinned, peppery and fresh, grown on its own roots in Vayots Dzor's sandy, volcanic soils at 1,000 to 1,600 metres, and the white Voskehat ('golden berry'), floral and textured. Kangun, a Soviet-era cross, and the red Haghtanak and Sireni (Khndoghni) are also important. The traditional vessel, the karas, is being revived by producers who ferment and age in clay. The Areni Wine Festival, held each October since 2009, celebrates the village's double legacy."
    ),
    "history": [
        {"when": "c. 4100 to 4000 BC", "title": "The Areni-1 winery", "text": "A cave near Areni held a clay treading basin, a fermentation vat, storage jars and domesticated grape remains: the oldest winery yet discovered (Barnard et al. 2011).", "lat": 39.7314, "lon": 45.2036},
        {"when": "c. 3600 to 3500 BC", "title": "The Areni-1 shoe", "text": "The same cave preserved the world's oldest known leather shoe, found in 2008.", "lat": 39.7314, "lon": 45.2036},
        {"when": "782 BC", "title": "Erebuni founded", "text": "The Urartian king Argishti I founded the fortress of Erebuni, origin of Yerevan, whose storerooms held wine jars.", "lat": 40.1403, "lon": 44.5381},
        {"when": "7th century BC", "title": "Teishebaini's wine magazines", "text": "Rusa II's fortress at Karmir Blur had storerooms of buried karases; excavations from 1939 found hundreds of jars, many with capacity marks, before its destruction around 585 BC.", "lat": 40.1539, "lon": 44.4511},
        {"when": "401 BC", "title": "Xenophon's buried jars", "text": "Xenophon's Anabasis describes Armenian villagers storing wine and barley beer in jars sunk into the floors of their houses.", "lat": 39.9, "lon": 43.5},
        {"when": "1887", "title": "The Yerevan brandy distillery", "text": "The first brandy factory opened in Yerevan; after Nikolay Shustov's company bought it in 1899 it made Armenian brandy famous across the Russian Empire.", "lat": 40.1764, "lon": 44.4964},
        {"when": "2007 to 2011", "title": "Excavation and publication of Areni-1", "text": "An Armenian, Irish and American team excavated the cave from 2007; the winery was announced in January 2011.", "lat": 39.7314, "lon": 45.2036},
    ],
    "classification": "Armenia has no EU-style appellation system yet. Labels carry the region (Vayots Dzor, Ararat Valley, Aragatsotn, Armavir, Tavush) and the grape; the Vine and Wine Foundation of Armenia promotes the sector, and 'Armenian brandy' is a protected name.",
    "climate_soils": "Dry, sunny, continental highland climate with hot summers, very cold winters and big day-night swings; vineyards range from about 800 metres in the Ararat Valley to over 1,700 metres. Soils are volcanic (basalt, tuff), sandy and stony, which kept phylloxera out of much of Vayots Dzor, so many old vines are ungrafted.",
    "grapes": [
        {"name": "Areni Noir", "note": "The great native red: medium-bodied, peppery, sour cherry and violet, often ungrafted at high altitude."},
        {"name": "Voskehat", "note": "The leading native white, floral, apricot and honey."},
        {"name": "Kangun", "note": "Soviet-era white cross (Rkatsiteli by Sukholimansky), used for wine and brandy."},
        {"name": "Haghtanak", "note": "Deep-coloured red cross used in blends and dessert wines."},
        {"name": "Sireni (Khndoghni)", "note": "Red of the Karabakh/Artsakh area, dark and tannic."},
        {"name": "Garan Dmak, Chilar, Mskhali, Lalvari, Kakhet", "note": "Other native varieties being revived."},
    ],
    "regions": ["Vayots Dzor", "Ararat Valley", "Aragatsotn", "Armavir", "Tavush"],
    "further_reading": ["Ancient Wine, Patrick E. McGovern", "The Wines of Armenia (Vine and Wine Foundation of Armenia)"],
    "sources": SRC_AM,
}
am_regions = [
    {"country": "am", "name": "Vayots Dzor", "alt": ["Areni", "Yeghegnadzor"], "parent_region": None, "lat": 39.75, "lon": 45.3, "zoom": 10,
     "tagline": "The gorge of the Arpa: Areni Noir, karas and the oldest winery on earth.", "summary": "Armenia's most celebrated wine region follows the Arpa river through red-rock gorges from Areni to Yeghegnadzor and beyond. Vineyards at 1,000 to 1,600 metres grow ungrafted Areni Noir; the Areni-1 cave and the Noravank monastery are next to the vines. Zorah at Rind, Trinity Canyon and Hin Areni are the best-known estates.",
     "history": "Areni-1 winery (about 4100 BC); medieval monasteries such as Noravank (thirteenth century); Soviet-era Areni wine factory.", "terroir": "Very dry, sunny, high; volcanic and sandy limestone soils, cold winters.",
     "grapes": "Areni Noir, Voskehat, Garan Dmak.", "styles": "Fresh, peppery reds; whites; karas-aged wines.", "classification": "Regional name; no appellation law.", "appellations": [], "sources": SRC_AM},
    {"country": "am", "name": "Ararat Valley", "alt": ["Ararat", "Armavir"], "parent_region": None, "lat": 40.05, "lon": 44.3, "zoom": 9.5,
     "tagline": "The hot plain beneath Mount Ararat, historic home of brandy grapes.", "summary": "The broad valley of the Araks south and west of Yerevan, at 800 to 1,000 metres, with Mount Ararat across the Turkish border. It supplies most of the grapes for Armenian brandy and many table grapes; Urartian Teishebaini and Erebuni were wine centres. Armavir to the west and parts of Ararat province are covered.",
     "history": "Urartian fortresses with wine magazines; Soviet brandy factories.", "terroir": "Hot summers, irrigation, alluvial and volcanic soils.",
     "grapes": "Kangun, Voskehat, Mskhali, Haghtanak, Rkatsiteli.", "styles": "Brandy base, dessert wines, whites.", "classification": "Regional name.", "appellations": [], "sources": SRC_AM},
    {"country": "am", "name": "Aragatsotn", "alt": ["Ashtarak", "Voskevaz"], "parent_region": None, "lat": 40.28, "lon": 44.3, "zoom": 10.5,
     "tagline": "Mount Aragats' southern slopes: Voskehat and the Ashtarak sherry tradition.", "summary": "Vineyards on the slopes south of Mount Aragats around Ashtarak, Voskevaz and Oshakan grow Voskehat and other whites; Soviet oenologists developed Armenian flor 'sherry' here in the 1930s. Voskevaz winery and ArmAs are the leading producers.",
     "history": "Karases dating to the seventh century were found at the church of Surp Hovhannes in Voskevaz.", "terroir": "1,000 to 1,300 metres, volcanic tuff.", "grapes": "Voskehat, Kakhet, Areni.", "styles": "Whites, flor-aged wines, reds.", "classification": "Regional name.", "appellations": [], "sources": SRC_AM},
    {"country": "am", "name": "Tavush", "alt": ["Ijevan", "Berd"], "parent_region": None, "lat": 40.95, "lon": 45.2, "zoom": 10,
     "tagline": "Forested north-east, wetter and greener.", "summary": "The northern province bordering Georgia and Azerbaijan, around Ijevan and Berd, has a more humid climate, forests and a Soviet-era winery at Ijevan; small producers are reviving it.",
     "history": "A Soviet-era state winery at Ijevan anchored the region.", "terroir": "Lower altitude (500 to 900 metres), more rain.", "grapes": "Rkatsiteli, Areni, local varieties.", "styles": "Whites, light reds, fruit wines.", "classification": "Regional name.", "appellations": [], "sources": SRC_AM},
]
s("am", "Areni-1 cave winery", "historic", 39.7314, 45.2036, "A three-chambered karst cave above the Arpa river where a winery of about 4100 to 4000 BC was excavated from 2007: a clay basin for treading grapes, a 60-centimetre vat, storage jars, cups and domesticated grape remains, with malvidin residues confirmed in 2011. The cave also yielded the world's oldest leather shoe (about 3500 BC).", "precise", cls="Chalcolithic winery (oldest known)")
s("am", "Teishebaini (Karmir Blur)", "historic", 40.1539, 44.4511, "Urartian fortress of King Rusa II, built in the seventh century BC on the Red Hill at the edge of Yerevan and burnt around 585 BC. Its storerooms were lined with rows of karases, giant clay jars sunk into the floor and marked with their capacity; excavations from 1939 to 1971 recovered hundreds of them.", "precise", cls="Urartian fortress and wine magazines")
s("am", "Erebuni Fortress", "historic", 40.1403, 44.5381, "The fortress founded by the Urartian king Argishti I in 782 BC, origin of Yerevan; its storerooms included wine jars, and a museum displays karases.", "precise", cls="Urartian fortress")
s("am", "Noravank Monastery", "historic", 39.6848, 45.2330, "Thirteenth-century monastery in a red-rock gorge near Areni, with carved grapevines on its churches, at the heart of Vayots Dzor wine country.", "precise", cls="Monastery")
s("am", "Zorah Wines, Rind", "estate", 39.7680, 45.1744, "Founded by Zorik Gharibian, an Armenian-Italian fashion entrepreneur, with vineyards of ungrafted Areni at about 1,400 metres in Rind; its Karasì red, aged in karases, helped put Armenian wine on the world map.", "precise", producers=["Zorah"])
s("am", "Trinity Canyon Vineyards", "estate", 39.7836, 45.2281, "A pioneering estate at Aghavnadzor in Vayots Dzor, making Areni, Voskehat and karas-aged wines at about 1,400 metres.", "approx", producers=["Trinity Canyon"])
s("am", "Voskevaz Winery", "estate", 40.2700, 44.2937, "Historic winery in Voskevaz on Aragats' southern slopes, founded in 1932, which revived karas winemaking.", "precise", producers=["Voskevaz"])
s("am", "ArmAs", "estate", 40.2615, 44.1449, "Estate at Nor Yedesia in Aragatsotn with one of Armenia's largest modern vineyards and a winery making native and international varieties.", "precise", producers=["ArmAs"])
s("am", "Yerevan Brandy Company (Ararat)", "house", 40.1764, 44.4964, "The brandy house founded in 1887 and bought by Nikolay Shustov's company in 1899, maker of Ararat brandy; owned by Pernod Ricard since 1998. Its cellars by the Hrazdan river hold barrels laid down for famous visitors.", "precise", producers=["Yerevan Brandy Company"])

# ------------------------------------------------------------------ AZERBAIJAN
az = {
    "iso2": "az", "name": "Azerbaijan", "tier": "emerging",
    "tagline": "German colonists' cellars at Göygöl, the pink Madrasa grape of Shamakhi and a state-backed revival.",
    "stats": {"note": "No reliable current vineyard figure found; Soviet Azerbaijan harvested about 2 million tonnes of grapes by the early 1980s. Wine output is small and not reported by OIV 2025."},
    "overview": (
        "Azerbaijan's wine history is ancient (jars with wine residues of the second millennium BC from Göygöl and Neolithic Kültəpə in Nakhchivan) and recent in equal measure. In 1817 to 1819 Lutheran colonists from Württemberg settled in the South Caucasus with the tsar's permission and founded Helenendorf (today Göygöl) near Ganja and Annenfeld (today Shamkir); families such as the Vohrer brothers and the Hummels built wineries and cognac houses that sold across the Russian Empire. Stalin deported the German community in 1941, but its cellars, including the Göygöl wine plant of 1860, are still in use.\n\n"
        "Under the Soviet Union Azerbaijan became one of the biggest grape producers in the USSR, reaching about two million tonnes of grapes by the early 1980s, before Gorbachev's 1985 campaign tore out most of the vines. A state programme from 2012 to 2020 subsidised replanting, and a dozen modern wineries now work in three areas: Ganja and Göygöl, Tovuz and Shamkir in the west, and the Shamakhi and Ismayilli foothills of the Greater Caucasus in the east, where Savalan (Aspi Winery), Chabiant and Meysari make the best-known wines. The local signature is Madrasa (Matrassa), a dark-skinned grape named after the village of Madrasa near Shamakhi, used for deeply coloured dry and sweet reds. Nagorno-Karabakh, internationally recognised as part of Azerbaijan, had Armenian-run wineries (in Hadrut, Martuni and elsewhere, using the local Sireni grape) until the region's ethnic Armenian population left after Azerbaijan's military takeover in September 2023."
    ),
    "history": [
        {"when": "2nd millennium BC", "title": "Ancient jars at Göygöl", "text": "Archaeologists found jars with wine remains in the Göygöl district dated to the second millennium BC.", "lat": 40.5968, "lon": 46.3248},
        {"when": "1817 to 1819", "title": "The Swabian colonies", "text": "Colonists from Württemberg founded Helenendorf (Göygöl) and Annenfeld (Shamkir); their wineries industrialised Azerbaijani wine.", "lat": 40.5968, "lon": 46.3248},
        {"when": "1941", "title": "Deportation of the Germans", "text": "Stalin deported the Caucasus Germans to Central Asia; their cellars passed to Soviet state wineries.", "lat": 40.5968, "lon": 46.3248},
        {"when": "1985", "title": "The vines torn out", "text": "Gorbachev's anti-alcohol campaign destroyed most of Azerbaijan's Soviet-era vineyard.", "lat": 40.4093, "lon": 49.8671},
        {"when": "2012 to 2020", "title": "State replanting programme", "text": "A national grape and wine programme subsidised new vineyards and wineries such as Savalan, Chabiant and Meysari.", "lat": 40.7831, "lon": 47.6126},
    ],
    "classification": "No appellation system.",
    "climate_soils": "Continental to subtropical, with semi-arid lowlands along the Kura and cooler foothills of the Greater and Lesser Caucasus at 300 to 900 metres; brown and chestnut soils, with winter burying of vines in colder sites.",
    "grapes": [{"name": "Madrasa (Matrassa)", "note": "Dark local red from Shamakhi, also grown in Georgia and Armenia."}, {"name": "Bayan Shira", "note": "Local white, used for still and fortified wines."}, {"name": "Rkatsiteli, Saperavi", "note": "Georgian varieties widely planted."}, {"name": "Cabernet Sauvignon, Merlot, Pinot Noir, Chardonnay", "note": "International varieties in new plantings."}],
    "regions": ["Ganja-Gazakh (Göygöl, Tovuz, Shamkir)", "Shirvan (Shamakhi, Ismayilli)"],
    "further_reading": ["Wine and Wagons: Helenendorf, Azerbaijan's First German Settlement (Azerbaijan International)"],
    "sources": [{"title": "Wikipedia, Azerbaijani wine", "url": "https://en.wikipedia.org/wiki/Azerbaijani_wine"}],
}
s("az", "Göygöl wine plant (Helenendorf)", "historic", 40.5968, 46.3248, "Göygöl, founded as Helenendorf in 1819 by Swabian colonists, kept its German houses, Lutheran church and the wine and cognac plant founded in 1860, today run by Vinagro.", "approx", cls="German colonial winery town")
s("az", "Madrasa village", "village", 40.6139, 48.5605, "Village near Shamakhi that gave its name to the Madrasa (Matrassa) grape, the signature red of eastern Azerbaijan.", "approx")
s("az", "Savalan (Aspi Winery)", "estate", 40.7831, 47.6126, "Aspi Winery's estate at Savalan in the Qabala district, at the foot of the Greater Caucasus, established in the late 2000s; its Savalan wines are Azerbaijan's best-known exports.", "approx", producers=["Aspi Winery (Savalan)"])
s("az", "Chabiant", "estate", 40.7055, 47.9008, "Winery in Ismayilli district at the foot of the Greater Caucasus, making Madrasa and international varieties.", "approx", producers=["Chabiant"])

# ------------------------------------------------------------------ UKRAINE
SRC_UA = [
    {"title": "Wikipedia, Ukrainian wine", "url": "https://en.wikipedia.org/wiki/Ukrainian_wine"},
    {"title": "Decanter, Ukraine's defiant winemakers look to EU and exports (March 2023)", "url": "https://www.decanter.com/wine-news/ukraine-winemakers-look-to-eu-and-exports-498896/"},
    {"title": "Espreso Global, Russian forces destroy Kherson winery (December 2022)", "url": "https://global.espreso.tv/russian-forces-destroy-kherson-winery-which-survived-two-world-wars"},
    {"title": "Wikipedia, Massandra; Abrau-Dyurso (Golitsyn)", "url": "https://en.wikipedia.org/wiki/Massandra"},
]
ua = {
    "iso2": "ua", "name": "Ukraine", "tier": "emerging",
    "tagline": "Swiss colonists at Shabo, Golitsyn's sparkling cellars in Crimea and a new generation of winemakers working through war.",
    "stats": {"note": "Before 2014 Ukraine had roughly 50,000 ha of vines including Crimea; occupation of Crimea removed about 17,000 ha and wineries providing about 60 percent of wine, and the war since 2022 has damaged or occupied more vineyards in Kherson, Mykolaiv and Zaporizhzhia. No current official total found."},
    "overview": (
        "Ukraine's southern coast has made wine since Greek colonists founded Olbia, Tyras and Chersonesus around the sixth and fifth centuries BC. The modern industry dates from the Russian Empire's conquest of the Black Sea steppe in the late eighteenth century. In 1822, with Alexander I's approval, winegrowers from the Swiss canton of Vaud founded the colony of Chabag, today Shabo, on the Dniester estuary in Bessarabia, and their descendants made wine there until the Second World War. Shabo is again Ukraine's largest wine company, with about 1,200 hectares and a wine culture centre on the old colony.\n\n"
        "Crimea was the empire's showcase. Count Mikhail Vorontsov planted the south coast from the 1820s, the Magarach research institute was founded in 1828, and Prince Lev Golitsyn (1845 to 1915) built the sparkling wine cellars of Novy Svet (Noviy Svit), where his wine won at the 1900 Paris exhibition and was renamed for the coronation of Nicholas II, and directed the imperial Massandra winery (1894), whose collection of about a million bottles holds sherries and dessert wines back to 1775. Inkerman near Sevastopol ages wine in old limestone galleries. Crimea is internationally recognised as part of Ukraine; Russia has occupied and claimed it since 2014, and Massandra and other estates now operate under Russian control (the Russian-installed authorities 'nationalised' Massandra and sold it at auction in 2023).\n\n"
        "The rest of Ukrainian wine is in the south (Odesa, Mykolaiv and Kherson oblasts) and in Transcarpathia (Zakarpattia) in the west, near Hungary, where Berehove and the Tisza valley have Tokaj-related traditions. Soviet Ukraine was the USSR's largest supplier of wine, with about 250,000 hectares before Gorbachev's 1985 campaign destroyed around 80,000. In the 2010s small producers such as Beykush (on the Berezan estuary near Mykolaiv), Kolonist and 46 Parallel in Odesa, Father and Sons, Chateau Chizay in Transcarpathia and Prince Trubetskoi's estate in Kherson started a quality movement, with local grapes such as Telti-Kuruk and Odessa Black alongside Saperavi, Riesling and Chardonnay.\n\n"
        "Russia's full-scale invasion in February 2022 hit wine country hard. The Prince Trubetskoi estate at Kozatske in Kherson oblast was occupied, looted (including about 32,000 bottles) and its historic chateau destroyed; Artwinery, the sparkling-wine plant at Bakhmut with cellars in old gypsum mines, was forced out and moved production to Odesa; vineyards in Mykolaiv and Zaporizhzhia were mined and shelled. Producers kept harvesting, and exports to the EU have grown."
    ),
    "history": [
        {"when": "c. 5th century BC", "title": "Greek colonies on the Black Sea", "text": "Olbia, Tyras (Bilhorod-Dnistrovskyi) and Chersonesus made and traded wine; presses and amphorae survive at Chersonesus near Sevastopol.", "lat": 44.6108, "lon": 33.4904},
        {"when": "1822", "title": "The Swiss colony of Chabag", "text": "Vaudois winegrowers led by Louis-Vincent Tardent founded Chabag (Shabo) on the Dniester estuary; their wine was shown at the 1893 Chicago exposition.", "lat": 46.1283, "lon": 30.3868},
        {"when": "1828", "title": "Magarach Institute", "text": "The Russian Empire founded the Magarach viticulture research institute near Yalta; its collection holds thousands of vine varieties.", "lat": 44.51, "lon": 34.21},
        {"when": "1878 onwards", "title": "Golitsyn's Novy Svet", "text": "Prince Lev Golitsyn developed Novy Svet in Crimea into Russia's first great sparkling wine house and later directed Massandra (founded 1894).", "lat": 44.8292, "lon": 34.9128},
        {"when": "1985 to 1987", "title": "Anti-alcohol campaign", "text": "About 80,000 ha of Soviet Ukraine's vineyards were destroyed under Gorbachev's campaign.", "lat": 46.48, "lon": 30.73},
        {"when": "2014", "title": "Occupation of Crimea", "text": "Russia occupied and annexed Crimea, an annexation not recognised by Ukraine or most of the world; Ukraine lost control of about 17,000 ha of vineyards and the Massandra, Novy Svet and Inkerman wineries.", "lat": 44.5176, "lon": 34.1856},
        {"when": "2022", "title": "Full-scale invasion", "text": "Kherson's Prince Trubetskoi winery was occupied, looted and its chateau destroyed; Bakhmut's Artwinery relocated; southern vineyards were damaged.", "lat": 46.7855, "lon": 33.3503},
    ],
    "classification": "Ukraine is building an EU-compatible system of protected geographical indications under its 2019 to 2023 legislation; historic names such as Shabo have been registered nationally. Most labels carry region and grape.",
    "climate_soils": "Continental steppe climate moderated by the Black Sea in the south, with hot dry summers and cold winters (vines are sometimes buried); chernozem and southern chernozem on loess. Transcarpathia is wetter and volcanic. Crimea's south coast is sub-Mediterranean, protected by the Crimean Mountains.",
    "grapes": [{"name": "Telti-Kuruk", "note": "Aromatic local white of the Budjak (southern Bessarabia)."}, {"name": "Odessa Black (Alibernet)", "note": "Soviet-era teinturier cross of Alicante Bouschet and Cabernet Sauvignon."}, {"name": "Saperavi, Rkatsiteli, Aligoté", "note": "Soviet-era staples."}, {"name": "Riesling, Chardonnay, Pinot Noir, Cabernet Sauvignon", "note": "International varieties."}, {"name": "Sukholimansky White", "note": "Odesa cross (Chasselas by Plavai)."}],
    "regions": ["Odesa and Bessarabia", "Mykolaiv and Kherson", "Transcarpathia", "Crimea"],
    "further_reading": ["Ukrainer, Wine of Ukraine (2026)"],
    "sources": SRC_UA,
}
ua_regions = [
    {"country": "ua", "name": "Odesa and Bessarabia", "alt": ["Budjak", "Odesa oblast"], "parent_region": None, "lat": 46.1, "lon": 30.1, "zoom": 8.5,
     "tagline": "Ukraine's main wine region, from Swiss Shabo to the Danube.", "summary": "The Odesa oblast, including the southern Bessarabian Budjak between the Dniester and the Danube, holds the largest share of Ukraine's vineyards. Shabo, Kolonist, Frumushika-Nova, 46 Parallel and Tairove (home of the national viticulture institute) are here.",
     "history": "Swiss Chabag (1822), Bulgarian and German colonies in the Budjak.", "terroir": "Steppe chernozem near estuaries and the sea.", "grapes": "Telti-Kuruk, Odessa Black, Aligoté, Rkatsiteli, Saperavi, Cabernet Sauvignon.", "styles": "Dry and sparkling wines, brandy.", "classification": "Regional names.", "appellations": [], "sources": SRC_UA},
    {"country": "ua", "name": "Mykolaiv and Kherson", "alt": ["Koblevo"], "parent_region": None, "lat": 46.7, "lon": 32.0, "zoom": 8.5,
     "tagline": "Estuary vineyards now on the war's front line.", "summary": "The southern oblasts around the Dnipro and Southern Bug estuaries, with Koblevo (a large Soviet-era winery on the Tylihul estuary), Beykush on the Berezan estuary and the Prince Trubetskoi estate on the Dnipro at Kozatske. Much of left-bank Kherson has been occupied since 2022.",
     "history": "Prince Trubetskoi's estate dates from the late nineteenth century.", "terroir": "Hot, dry steppe on sandy and chernozem soils by estuaries.", "grapes": "Saperavi, Rkatsiteli, Chardonnay, Riesling, Telti-Kuruk.", "styles": "Dry wines.", "classification": "Regional names.", "appellations": [], "sources": SRC_UA},
    {"country": "ua", "name": "Transcarpathia", "alt": ["Zakarpattia", "Berehove"], "parent_region": None, "lat": 48.2, "lon": 22.7, "zoom": 9,
     "tagline": "Volcanic hills on the Hungarian border.", "summary": "Western Ukraine's Tisza valley around Berehove and Mukachevo shares volcanic soils and Hungarian traditions with nearby Tokaj; Chateau Chizay and family wineries grow Furmint, Traminer and local grapes.",
     "history": "Part of Hungary until 1920, then Czechoslovakia, Hungary again and the USSR.", "terroir": "Volcanic hills, wetter climate.", "grapes": "Furmint, Traminer, Riesling, Kadarka.", "styles": "Whites, light reds.", "classification": "Regional names.", "appellations": [], "sources": SRC_UA},
    {"country": "ua", "name": "Crimea", "alt": ["Krym"], "parent_region": None, "lat": 44.7, "lon": 34.2, "zoom": 8.5,
     "tagline": "Imperial cellars of Massandra and Novy Svet, under Russian occupation since 2014.", "summary": "Crimea's south coast and valleys (Sudak, Alushta, Yalta, Balaklava, Sevastopol, Bakhchysarai) were the Russian Empire's luxury wine region. Internationally recognised as Ukraine, the peninsula has been occupied and annexed by Russia since 2014, and its wineries operate under Russian law; Russia treats 'Crimea' as one of its protected geographical indications.",
     "history": "Greek Chersonesus; Vorontsov's estates (1820s); Magarach (1828); Golitsyn's Novy Svet and Massandra (1894).", "terroir": "Sub-Mediterranean south coast under the Crimean Mountains; steppe in the north.", "grapes": "Muscat, Kokur, Kefesiya, Ekim Kara, Cabernet Sauvignon, Pinot Noir.", "styles": "Dessert wines, sparkling, dry.", "classification": "Disputed; regional names.", "appellations": [], "sources": SRC_UA},
]
s("ua", "Shabo wine culture centre", "estate", 46.1283, 30.3868, "The former Swiss colony of Chabag on the Dniester estuary, founded in 1822 by winegrowers from Vaud. Shabo, with about 1,200 hectares, is now Ukraine's largest wine company, with a museum of the colony.", "approx", producers=["Shabo"])
s("ua", "Massandra winery", "cellar", 44.5176, 34.1856, "The imperial winery founded by Prince Lev Golitsyn in 1894 near Yalta, whose tunnel cellars hold about a million bottles, including dessert wines back to the eighteenth century. In occupied Crimea since 2014.", "precise", cls="Historic winery (occupied Crimea)")
s("ua", "Novy Svet sparkling wine cellars", "cellar", 44.8292, 34.9128, "Prince Lev Golitsyn's estate near Sudak, where he dug cellars into the cliffs and made Russia's first great sparkling wine from the 1870s. In occupied Crimea since 2014.", "approx", cls="Historic sparkling house (occupied Crimea)")
s("ua", "Inkerman winery", "cellar", 44.6153, 33.6115, "Winery near Sevastopol that ages wine in limestone galleries left by quarrying. In occupied Crimea since 2014.", "approx", cls="Cellar galleries (occupied Crimea)")
s("ua", "Chersonesus", "historic", 44.6108, 33.4904, "The Greek city near Sevastopol (UNESCO), whose 'chora' of walled vineyard plots and wine presses is one of the best-preserved ancient agricultural landscapes anywhere.", "precise", cls="Greek city and vineyard plots (UNESCO)")
s("ua", "Koblevo", "cellar", 46.6674, 31.2046, "A large winery on the Tylihul estuary between Odesa and Mykolaiv and one of Ukraine's best-known volume brands. Its vineyards sit on sandy chernozem by the estuary, where Black Sea air tempers the steppe heat.", "approx", producers=["Koblevo"])
s("ua", "Chateau Chizay", "estate", 48.2260, 22.6403, "Winery near Berehove in Transcarpathia, on volcanic hills a few kilometres from the Hungarian border, part of a winegrowing area that shares soils and traditions with nearby Tokaj. It makes still and sparkling wines from Transcarpathian grapes.", "approx", producers=["Chateau Chizay"])
s("ua", "Prince Trubetskoi winery, Kozatske", "estate", 46.7855, 33.3503, "A historic estate on the Dnipro in Kherson oblast linked to Prince Trubetskoi, occupied in February 2022; its wine collection was looted and the chateau destroyed.", "approx", producers=["Prince Trubetskoi"])
s("ua", "Artwinery, Bakhmut", "cellar", 48.5947, 38.0267, "Sparkling-wine plant founded in 1950 in former gypsum mines under Bakhmut; production moved to Odesa during the battle for the city.", "approx", producers=["Artwinery"])

# ------------------------------------------------------------------ RUSSIA
SRC_RU = [
    {"title": "OIV, State of the World Wine Sector in 2025", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf"},
    {"title": "Simple Wine News, How Russian wine laws are changing (2020)", "url": "https://swn.ru/en/articles/how-russian-wine-laws-are-changing"},
    {"title": "Kuban-Vino, protected geographical indications", "url": "https://en.kuban-vino.ru/about/events/news/916/"},
    {"title": "Wikipedia, Winemaking in Russia; Abrau-Dyurso", "url": "https://en.wikipedia.org/wiki/Abrau-Dyurso"},
]
ru = {
    "iso2": "ru", "name": "Russia", "tier": "emerging",
    "tagline": "Imperial sparkling at Abrau-Durso, the Don Cossacks' native reds and a protected, fast-growing domestic industry.",
    "stats": {"vineyard_ha": 110000, "production_mhl": 5.7, "year": 2025, "world_rank_production": 11, "note": "OIV 2025 (figures as reported by Russia, including occupied Crimea and Sevastopol, which are internationally recognised as Ukraine)."},
    "overview": (
        "Most of Russia is too cold for vines, but its south, along the Black Sea, the Sea of Azov and the Caspian, has a wine history as old as anyone's. Greek colonies on the Taman peninsula (Phanagoria, Gorgippia at today's Anapa) made wine in the sixth century BC. The Don Cossacks grew vines on the river's islands and terraces from the seventeenth century and kept their own red grapes, Tsimlyansky Cherny, Krasnostop Zolotovsky and Plechistik; the sparkling red Tsimlyanskoye was praised by Pushkin.\n\n"
        "In 1870 Tsar Alexander II founded an imperial estate at Abrau-Durso, by a mountain lake near Novorossiysk, and in 1891 Prince Lev Golitsyn, already famous for Crimea's Novy Svet, took charge and brought French specialists to make sparkling wine by the traditional method. The Soviet Union turned Abrau-Durso into the model for 'Sovetskoye Shampanskoye', most of which was made by the tank method in giant plants. Gorbachev's 1985 campaign destroyed much of the vineyard.\n\n"
        "Since the 2000s private investment has rebuilt Kuban (Krasnodar Krai), now the heart of Russian wine, with the Taman peninsula, Anapa and the Krymsk-Abrau area: Fanagoria, Kuban-Vino (Château Tamagne), Lefkadia, Gai-Kodzor, Château le Grand Vostock, Abrau-Durso (now a listed company and Russia's largest sparkling wine producer) and many small estates. The Don valley in Rostov oblast, Stavropol and Dagestan (Derbent) add native grapes and brandy. A federal law on viticulture and winemaking in force from June 2020 reserved 'Russian wine' for wine from Russian grapes and set up protected geographical indications (ZGU) and protected designations of origin (ZNMP). Approved geographical names include Kuban, Kuban. Taman Peninsula, Don Valley, Stavropol, Dagestan, Terek Valley, Lower Volga and Crimea; by 2020 there were 15 ZGU and 23 ZNMP, with more since. Import duties on wine from countries Russia designates 'unfriendly' rose to 20 percent in 2023 and 25 percent in 2024, handing domestic producers a protected market. Production reached 5.7 million hectolitres in 2025."
    ),
    "history": [
        {"when": "6th century BC", "title": "Phanagoria and Gorgippia", "text": "Greek colonists on the Taman peninsula and at Gorgippia (Anapa) grew vines and traded wine; ancient presses have been excavated.", "lat": 44.8962, "lon": 37.3106},
        {"when": "17th to 19th century", "title": "Cossack wines of the Don", "text": "Don Cossack stanitsas such as Tsimlyanskaya and Razdorskaya grew native red grapes; sparkling Tsimlyanskoye was praised by Pushkin.", "lat": 47.6506, "lon": 42.0982},
        {"when": "1870", "title": "Imperial Abrau-Durso", "text": "Tsar Alexander II founded an imperial estate at Abrau-Durso on 25 November 1870 to supply the court.", "lat": 44.7028, "lon": 37.6019},
        {"when": "1891 to 1897", "title": "Golitsyn makes champagne for the tsar", "text": "Prince Lev Golitsyn, appointed head of the imperial vineyards, brought French winemakers to Abrau-Durso; by 1897 it held over 13,000 bottles of sparkling wine in its cellars.", "lat": 44.7028, "lon": 37.6019},
        {"when": "1985", "title": "Anti-alcohol campaign", "text": "Gorbachev's campaign uprooted vineyards across southern Russia.", "lat": 45.04, "lon": 38.98},
        {"when": "2020", "title": "Federal wine law", "text": "Law 468-FZ on viticulture and winemaking came into force on 26 June 2020, reserving 'Russian wine' for domestic grapes and setting up ZGU and ZNMP designations.", "lat": 55.75, "lon": 37.62},
    ],
    "classification": "Since the 2020 law, Russian wine can carry a protected geographical indication (ZGU, roughly an IGP: Kuban, Kuban. Taman Peninsula, Don Valley, Stavropol, Dagestan, Terek Valley, Lower Volga and others) or a protected designation of origin (ZNMP, smaller zones often tied to one estate, especially in Krasnodar Krai). 'Russian wine' requires 100 percent Russian-grown grapes; wine made from imported bulk or concentrate must say so. Russia also lists Crimea and Sevastopol as geographical indications, which Ukraine and most states regard as occupied Ukrainian territory.",
    "climate_soils": "Continental, with harsh winters in Rostov, Stavropol and Dagestan where vines are buried for protection; the Black Sea coast around Anapa, Taman and Novorossiysk is milder. Soils range from chernozem to marl, limestone and the sandy islands of the Don.",
    "grapes": [{"name": "Krasnostop Zolotovsky", "note": "Don native red, deep and tannic, the rising star."}, {"name": "Tsimlyansky Cherny", "note": "Don red, the base of sparkling Tsimlyanskoye."}, {"name": "Plechistik, Sibirkovy", "note": "Other Don natives."}, {"name": "Rkatsiteli, Aligoté, Saperavi", "note": "Soviet-era staples."}, {"name": "Cabernet Sauvignon, Merlot, Chardonnay, Pinot Noir, Riesling", "note": "International varieties in Kuban."}],
    "regions": ["Kuban (Krasnodar)", "Don Valley", "Stavropol", "Dagestan"],
    "further_reading": ["Simple Wine News (swn.ru) guides to Russian wine"],
    "sources": SRC_RU,
}
ru_regions = [
    {"country": "ru", "name": "Kuban (Krasnodar)", "alt": ["Krasnodar Krai", "Taman", "Anapa"], "parent_region": None, "lat": 45.0, "lon": 37.5, "zoom": 8,
     "tagline": "The Black Sea coast and Taman peninsula: the heart of modern Russian wine.", "summary": "Krasnodar Krai produces the largest share of Russian wine. Its zones include the Taman peninsula (Fanagoria, Kuban-Vino's Château Tamagne), Anapa (Gai-Kodzor, Château le Grand Vostock), the Abrau-Durso and Novorossiysk area, and Krymsk (Lefkadia).",
     "history": "Greek Phanagoria and Gorgippia; imperial Abrau-Durso (1870).", "terroir": "Sea-moderated, marl and limestone near Novorossiysk, sandy and chernozem soils on Taman.", "grapes": "Cabernet Sauvignon, Merlot, Chardonnay, Riesling, Aligoté, Krasnostop.", "styles": "Sparkling, dry reds and whites.", "classification": "ZGU Kuban, Kuban. Taman Peninsula and many ZNMP.", "appellations": [], "sources": SRC_RU},
    {"country": "ru", "name": "Don Valley", "alt": ["Rostov", "Dolina Dona"], "parent_region": None, "lat": 47.6, "lon": 40.8, "zoom": 8.5,
     "tagline": "Cossack stanitsas and native reds.", "summary": "Rostov oblast's vineyards line the lower Don around Razdorskaya, Tsimlyansk and Starocherkassk. Native grapes such as Krasnostop Zolotovsky and Tsimlyansky Cherny are revived by Vedernikov, Kuban-Vino's Don estate and others.",
     "history": "Cossack viticulture since the seventeenth century.", "terroir": "Cold winters (vines buried), hot summers, sandy and chernozem soils.", "grapes": "Krasnostop Zolotovsky, Tsimlyansky Cherny, Plechistik, Sibirkovy.", "styles": "Dry and sparkling reds, whites.", "classification": "ZGU Don Valley.", "appellations": [], "sources": SRC_RU},
    {"country": "ru", "name": "Dagestan", "alt": ["Derbent"], "parent_region": None, "lat": 42.06, "lon": 48.29, "zoom": 9,
     "tagline": "Caspian vineyards around ancient Derbent.", "summary": "Dagestan's Caspian lowlands around Derbent and Kizlyar grow table grapes, brandy grapes and increasingly wine grapes; the Derbent Wine Company planted about 1,400 hectares of new vineyards.",
     "history": "Derbent's Sasanian citadel and its vines; Kizlyar brandy since the nineteenth century.", "terroir": "Semi-arid Caspian coast.", "grapes": "Rkatsiteli, Saperavi, local Güliabi.", "styles": "Brandy, dry wines.", "classification": "ZGU Dagestan.", "appellations": [], "sources": SRC_RU},
]
s("ru", "Abrau-Durso", "house", 44.7028, 37.6019, "The imperial estate founded in 1870 beside Lake Abrau near Novorossiysk, where Prince Lev Golitsyn and French winemakers made Russia's first traditional-method sparkling wine for the tsars; the Soviet 'Sovetskoye Shampanskoye' style was modelled on it. Its tunnels run into the hills above the lake.", "precise", producers=["Abrau-Durso"])
s("ru", "Phanagoria", "historic", 45.2780, 36.9640, "The largest Greek city on the Taman peninsula, founded around 543 BC, with ancient wine presses and amphora workshops; the modern Fanagoria winery takes its name.", "approx", cls="Archaeological site")
s("ru", "Gorgippia", "historic", 44.8962, 37.3106, "The Greek city of Gorgippia, founded in the sixth century BC under modern Anapa, part of the Bosporan Kingdom; its open-air museum includes ancient wine-making installations and amphorae, evidence of wine on this coast for over two thousand years.", "precise", cls="Archaeological site")
s("ru", "Lefkadia", "estate", 44.9436, 37.8555, "Estate in the Lefkadia valley near Moldavanskoye in the Krymsk district of Kuban, planted from 2006; it holds its own protected designation of origin.", "approx", producers=["Lefkadia"])
s("ru", "Gai-Kodzor", "village", 44.8532, 37.4373, "Village in the hills behind Anapa, a few kilometres from the Black Sea, where several of Kuban's new estates, including Gai-Kodzor winery, planted marl and limestone slopes from the 2000s.", "approx")
s("ru", "Tsimlyansk", "village", 47.6506, 42.0982, "Town on the Don whose Cossack winemakers made the famous sparkling red Tsimlyanskoye from the native Tsimlyansky Cherny, praised by Pushkin. The Don valley around it is now the centre of a revival of Cossack grape varieties.", "approx")
s("ru", "Razdorskaya", "village", 47.5426, 40.6516, "Cossack stanitsa on the Don, centre of the native-grape revival and home of an ethnographic museum.", "approx")

if __name__ == "__main__":
    by = lambda iso: [x for x in S if x["country"] == iso]
    save("am", {"countries": [am], "regions": am_regions, "appellations": [], "sites": by("am")})
    save("az", {"countries": [az], "regions": [], "appellations": [], "sites": by("az")})
    save("ua", {"countries": [ua], "regions": ua_regions, "appellations": [], "sites": by("ua")})
    save("ru", {"countries": [ru], "regions": ru_regions, "appellations": [], "sites": by("ru")})
