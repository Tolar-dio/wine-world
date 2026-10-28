import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c9")
from c9_common import site, save

ISO = "ge"
SRC = [
    {"title": "McGovern et al. (2017), Early Neolithic wine of Georgia in the South Caucasus, PNAS 114(48)", "url": "https://doi.org/10.1073/pnas.1714728114"},
    {"title": "Jancis Robinson, Breakthrough discovery in Georgia (2017)", "url": "https://jancisrobinson.com/articles/breakthrough-discovery-in-georgia"},
    {"title": "CBW, Sazano's Otskhanuri added to the list of Georgian PDO wines (list of 33)", "url": "https://cbw.ge/wine/sazanos-otskhanuri-added-to-the-list-of-georgian-wines-registered-with-protected-designation-of-origin"},
    {"title": "Ministry of Environmental Protection and Agriculture of Georgia, news item of 2 October 2025 (Racha appellation)", "url": "https://mepa.gov.ge/En/News/Details/24146"},
    {"title": "Georgia.to, Georgia's wine appellations (citing NWA 2023 catalogue)", "url": "https://georgia.to/wine-appellations/"},
    {"title": "Decree of the President of Georgia N 88 (2002) on appellations of origin, WIPO Lex", "url": "https://www.wipo.int/wipolex/en/text/533874"},
    {"title": "CBW, Rtveli 2025: record 336,000 tons of grapes processed", "url": "https://www.cbw.ge/wine/within-rtveli-2025-a-record-high-336000-tons-of-grapes-were-processed"},
    {"title": "1TV Georgia, NWA export figures January to November 2025", "url": "https://1tv.ge/lang/en/news/national-wine-agency-in-january-november-2025-georgia-received-over-usd-half-a-billion-from-export-of-wine-alcoholic-beverages/"},
    {"title": "FreshPlaza, Georgia's vineyard area up 81% over ten years (Geostat, 2024)", "url": "https://www.freshplaza.com/asia/article/9852442/georgia-s-vineyard-area-up-81-over-ten-years/"},
    {"title": "OIV, State of the World Wine Sector in 2025", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf"},
    {"title": "UNESCO, Ancient Georgian traditional Qvevri wine-making method (2013)", "url": "https://ich.unesco.org/en/RL/ancient-georgian-traditional-qvevri-wine-making-method-00870"},
    {"title": "Wikipedia, Georgian wine; Kvevri; Tsinandali; Gadachrili Gora", "url": "https://en.wikipedia.org/wiki/Georgian_wine"},
    {"title": "Badagoni, Alaverdi wine cellar", "url": "https://badagoni.com/alaverdi-wine-cellar/"},
]

country = {
    "iso2": ISO, "name": "Georgia", "tier": "major",
    "tagline": "Eight thousand years of wine in buried clay jars, from the oldest known vintages on earth to the amber wines that changed modern taste.",
    "stats": {"vineyard_ha": 59900, "production_mhl": 2.6, "year": 2025, "world_rank_production": 16,
              "note": "Vineyard area end of 2024 from the National Statistics Office (Geostat), via FreshPlaza; production 2025 from OIV (largest Georgian harvest in at least 30 years; the National Wine Agency recorded about 336,000 tonnes of grapes processed)"},
    "overview": (
        "No country has a better claim to be wine's birthplace. In 2017 a team led by Patrick McGovern and Georgian archaeologists published chemical evidence from pottery jars at two Neolithic villages in Kvemo Kartli, Gadachrili Gora and Shulaveris Gora, about 50 kilometres south of Tbilisi: tartaric acid, the fingerprint of grapes, along with malic, succinic and citric acids, in vessels dated to roughly 6000 to 5800 BC. That pushed the earliest chemical evidence of grape wine back by several centuries from the Zagros mountains of Iran. Georgians did not need the science to believe it. Wine is woven into the language, the church and the table: St Nino is said to have converted the country in the fourth century with a cross bound from vine branches and her own hair, and a Georgian feast, the *supra*, is run by a *tamada* who proposes toasts for hours.\n\n"
        "The heart of the tradition is the *qvevri*, a large egg-shaped clay vessel lined with beeswax and buried up to its neck in the earth of the *marani*, the wine cellar. Crushed grapes go in with their juice, skins, stems and pips, ferment in the ground, and stay sealed on the skins for months. Whites made this way in Kakheti come out deep amber, tannic and savoury, smelling of dried apricot, walnut, tea and honey; this is the style the rest of the world now calls orange wine, and Georgia never stopped making it. In 2013 UNESCO inscribed the traditional qvevri method on its list of the Intangible Cultural Heritage of Humanity. What is left after pressing, the pomace, becomes *chacha*, the fierce grape spirit served at every celebration.\n\n"
        "History has been hard on Georgian vines. Persian and Ottoman invasions repeatedly burned Kakheti: Shah Abbas I's campaigns of 1614 to 1616 depopulated the region and destroyed the royal capital at Gremi. Under Russian rule from 1801 the aristocracy, led by Prince Alexander Chavchavadze at Tsinandali, bottled wine in the European way and started a commercial industry. The Soviet period turned Georgia into the USSR's prestige wine cellar, with semi-sweet Kindzmarauli and Khvanchkara reputedly on Stalin's table, but also into a factory of bulk wine; Gorbachev's 1985 anti-alcohol campaign uprooted vineyards across the republic.\n\n"
        "Independence in 1991 brought civil war, poverty and counterfeiting, and in 2006 Russia, then the destination for most Georgian wine, banned it outright, citing quality problems. The embargo lasted until 2013 and forced Georgia to look west. Producers rebuilt around quality, family wineries reopened ancestral *marani*, and a small group of natural winemakers (Pheasant's Tears, Iago Bitarishvili, Ramaz Nikoladze, Okro Natroshvili, Alaverdi Monastery among them) became heroes of the world's natural wine scene. Today Georgia exports wine to about 70 countries, earning around 245 million US dollars from 82 million litres in the first eleven months of 2025, with Russia again the largest buyer by volume and the EU, Poland, the Baltic states, China and the US growing.\n\n"
        "The wine map is old and dense. Kakheti, in the east between the Greater Caucasus and the Gombori ridge, grows the great majority of the country's grapes and holds most of the 33 registered appellations of origin, among them Tsinandali, Mukuzani, Kindzmarauli, Napareuli and Gurjaani. Kartli around Tbilisi makes lighter whites and sparkling wine; Imereti in the west uses less skin contact and its own vessel, the *churi*; Racha and Lechkhumi in the mountains produce rare semi-sweet reds. Georgia counts more than 500 indigenous grape varieties, though a few dominate: Rkatsiteli and Saperavi above all, with Kakhuri Mtsvane, Kisi, Khikhvi, Chinuri, Tsolikouri, Tsitska, Aleksandrouli, Mujuretuli, Otskhanuri Sapere and Ojaleshi giving the country's patchwork its colour.\n\n"
        "The recent numbers are striking. Georgia's vineyard area grew about 81 percent between the 2014 census and the end of 2024, to roughly 59,900 hectares, and the 2025 harvest, about 336,000 tonnes of grapes processed, was the largest in at least three decades. The OIV puts 2025 wine production at 2.6 million hectolitres. The challenge is to sell that wave of Saperavi and Rkatsiteli at good prices without becoming dependent on a single market again."
    ),
    "history": [
        {"when": "c. 6000 to 5800 BC", "title": "The world's earliest known grape wine", "text": "Pottery jars from the Shulaveri-Shomu villages of Gadachrili Gora and Shulaveris Gora in Kvemo Kartli held tartaric, malic, succinic and citric acid residues: the earliest chemical evidence of grape wine yet found (McGovern et al., PNAS 2017). A Gadachrili jar also held grape pollen and starch.", "lat": 41.3904, "lon": 44.821},
        {"when": "c. 4th century AD", "title": "St Nino's cross of vines", "text": "Tradition holds that St Nino, who converted the kingdom of Kartli to Christianity around 337, carried a cross made of grapevine branches tied with her own hair. Vines are carved on the facades of Georgian churches from then on.", "lat": 41.8422, "lon": 44.7208},
        {"when": "6th century and 1106", "title": "Ikalto: monks, wine and an academy", "text": "Ikalto monastery near Telavi was founded by St Zenon, one of the Thirteen Assyrian Fathers, and became an academy under King David the Builder; its curriculum reportedly included viticulture and winemaking, and a large ancient grape press survives on the site.", "lat": 41.937, "lon": 45.381},
        {"when": "11th century", "title": "Alaverdi cathedral and its cellar", "text": "The great cathedral of Alaverdi in the Alazani valley dates from the early eleventh century, and its monastic wine cellar from the same era. Restored in 2006, it again makes qvevri wine.", "lat": 42.0325, "lon": 45.3771},
        {"when": "1614 to 1616", "title": "Shah Abbas devastates Kakheti", "text": "The Safavid shah's campaigns destroyed the Kakhetian royal capital of Gremi, killed or deported a large share of the population and left vineyards abandoned.", "lat": 42.002, "lon": 45.66},
        {"when": "1830s to 1840s", "title": "Prince Chavchavadze bottles Georgian wine", "text": "At Tsinandali, the poet and general Alexander Chavchavadze (1786 to 1846) combined European winemaking with Georgian tradition and built what became the country's most famous wine estate; its oenotheque now holds historic bottles dating from 1814.", "lat": 41.8947, "lon": 45.5756},
        {"when": "1854", "title": "Shamil's raid on Tsinandali", "text": "Forces of Imam Shamil raided Tsinandali in July 1854 and took the Chavchavadze princesses hostage; they were exchanged in March 1855 for Shamil's son and 40,000 silver rubles. The estate later passed to the Russian imperial family.", "lat": 41.8947, "lon": 45.5756},
        {"when": "1920s to 1980s", "title": "The Soviet wine cellar", "text": "Georgia became the USSR's prestige wine republic, famous for semi-sweet reds such as Kindzmarauli and Khvanchkara. Vineyards expanded massively, then Gorbachev's 1985 anti-alcohol campaign uprooted large areas.", "lat": 41.95, "lon": 45.8153},
        {"when": "2006 to 2013", "title": "The Russian embargo", "text": "Russia, which then took most Georgian wine, banned imports in 2006, officially on quality grounds, amid a political crisis. The ban lasted until 2013 and pushed Georgia towards quality and new markets in Europe, Asia and the Americas.", "lat": 41.7151, "lon": 44.8271},
        {"when": "2013", "title": "UNESCO recognises qvevri winemaking", "text": "The ancient Georgian traditional qvevri winemaking method was inscribed on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity.", "lat": 41.9369, "lon": 45.3812},
        {"when": "2017", "title": "Neolithic wine confirmed", "text": "The PNAS paper on Gadachrili Gora and Shulaveris Gora was published in November 2017, and the find was named one of Archaeology magazine's top discoveries of the year.", "lat": 41.3904, "lon": 44.821},
        {"when": "2025", "title": "A record harvest", "text": "About 336,000 tonnes of grapes were processed in the 2025 rtveli (harvest), the largest in at least thirty years, and the appellation list grew with Racha and others to 33 registered PDOs.", "lat": 41.9167, "lon": 45.4833},
    ],
    "classification": (
        "Georgia protects its classic wine names as appellations of origin (PDOs) registered with Sakpatenti, the National Intellectual Property Centre, and controlled by the National Wine Agency. A presidential decree of 2002 listed the first 18 (Tsinandali, Teliani, Napareuli, Vazisubani, Mukuzani, Akhasheni, Gurjaani, Kardenakhi, Tibaani, Kindzmarauli, Manavi, Khvanchkara, Tvishi, Kvareli, Atenuri, Sviri, Kotekhi and Kakheti/Kakhuri), most registered between 2005 and 2007. Since 2018 the list has grown quickly with small microzones applied for by local associations or single wineries: Khashmis Saperavi, Bolnisi, Salkhino Ojaleshi, Akhmeta, Tsarapi, Akhoebi, Magraani Kisi, Zegaani, Okureshis Usakhelouri, Asuretuli Shala, Okami, Obcha, Lechkhumi, Racha and Sazanos Otskhanuri. The National Wine Agency's list stood at 33 by late 2025.\n\n"
        "Each appellation fixes a zone, permitted grapes and a style, and the style can be the point: Kindzmarauli, Akhasheni, Khvanchkara and Tvishi are by definition naturally semi-sweet wines, made by chilling the fermentation to leave residual sugar, while Mukuzani and Napareuli are dry reds. 'Kakhuri' (Kakhetian) on a label denotes the traditional Kakhetian method with long skin contact in qvevri; 'Imeruli' (Imeretian) means a lighter maceration with only part of the skins. Georgia also protects Chacha and Georgian brandy as geographical indications, and several PDOs are recognised in the EU under the 2012 EU-Georgia agreement on geographical indications."
    ),
    "climate_soils": (
        "Georgia sits between the Black Sea and the Caspian, sheltered from the north by the Greater Caucasus. The west (Imereti, Samegrelo, Guria, Adjara) is humid and subtropical, with heavy rain and mild winters; the east (Kartli, Kakheti) is drier and more continental, with hot summers and cold winters. Kakheti's main valley, the Alazani, runs north-west to south-east beneath the Caucasus wall, which blocks cold air and sends down cool night breezes; the Iori valley lies across the Gombori ridge to the south-west. Most Kakhetian vineyards sit between about 300 and 800 metres.\n\n"
        "Soils change with the rivers: alluvial and brown forest soils in the Alazani valley, carbonate-rich clays and gravels on the right-bank terraces of Mukuzani, Tsinandali and Gurjaani, and red and humus-calcareous soils under Kvareli's Kindzmarauli. Racha's Khvanchkara vineyards climb the steep, limestone-rich slopes of the Rioni gorge around 400 to 750 metres, and Imereti mixes clay, limestone and sandy soils on low hills."
    ),
    "grapes": [
        {"name": "Rkatsiteli", "note": "Georgia's most planted white and one of the world's most planted grapes overall; high acidity, made fresh and fruity in steel or amber and tannic in qvevri. Basis of Tsinandali, Gurjaani, Tibaani, Tsarapi and much of Kakheti."},
        {"name": "Saperavi", "note": "The great red, a teinturier with pink-red flesh: inky, high in acid and tannin, capable of long ageing. Mukuzani, Napareuli, Kvareli and Zegaani are dry Saperavi; Kindzmarauli and Akhasheni are semi-sweet."},
        {"name": "Kakhuri Mtsvane", "note": "Kakhetian 'green' white: perfumed, mineral; blended with Rkatsiteli in Tsinandali and the main grape of Manavi and Akhmeta."},
        {"name": "Kisi", "note": "Kakhetian white revived since the 2000s, aromatic and textured, brilliant in qvevri; the grape of Magraani Kisi."},
        {"name": "Khikhvi", "note": "Rich, aromatic Kakhetian white, traditionally used in fortified Kardenakhi and now made as amber wine."},
        {"name": "Chinuri", "note": "Kartli's crisp white, used for sparkling Atenuri and for fine amber wines (Iago's Chardakhi)."},
        {"name": "Goruli Mtsvane", "note": "Kartli white, used with Chinuri in Atenuri and Okami."},
        {"name": "Tsolikouri", "note": "The most planted white of western Georgia; Sviri, Tvishi and Obcha."},
        {"name": "Tsitska", "note": "High-acid Imeretian white, used for still and sparkling wines."},
        {"name": "Krakhuna", "note": "Full-bodied Imeretian white, part of Sviri."},
        {"name": "Aleksandrouli and Mujuretuli", "note": "Racha's red pair, the basis of semi-sweet Khvanchkara."},
        {"name": "Otskhanuri Sapere", "note": "Fiercely tannic Imeretian red, the grape of Obcha (red) and Sazanos Otskhanuri."},
        {"name": "Usakhelouri", "note": "Rare, perfumed red of Lechkhumi grown on a few hectares; Okureshis Usakhelouri is among Georgia's most expensive wines."},
        {"name": "Ojaleshi", "note": "Red of Samegrelo and Lechkhumi, traditionally trained up trees; Salkhino Ojaleshi."},
        {"name": "Shavkapito, Tavkveri and Asuretuli Shavi", "note": "Kartli reds; Asuretuli Shavi grows around Asureti, the former German colony of Elisabethtal, and gives the pale reds of Asuretuli Shala."},
    ],
    "regions": ["Kakheti", "Kartli", "Imereti", "Racha-Lechkhumi and Kvemo Svaneti", "Samegrelo", "Guria", "Adjara", "Meskheti", "Abkhazia"],
    "further_reading": ["For the Love of Wine: My Odyssey through the World's Most Ancient Wine Culture, Alice Feiring", "Georgia: A Guide to the Cradle of Wine, Miquel Hudin", "Ancient Wine, Patrick E. McGovern", "The Wines of Georgia, Lisa Granik MW"],
    "sources": SRC,
}

regions = [
    {"country": ISO, "name": "Kakheti", "alt": ["Kakhetia", "კახეთი"], "parent_region": None, "lat": 41.85, "lon": 45.7, "zoom": 8.5,
     "tagline": "The Alazani valley under the Caucasus wall: Saperavi, Rkatsiteli and amber wine.",
     "summary": "Kakheti is to Georgian wine what Bordeaux is to French: the source of most of the country's grapes (about 327,000 of the 336,000 tonnes processed in 2025) and of 20 or more of its 33 appellations. Traditionally it is divided into Inner Kakheti (Shida Kakheti), along both banks of the Alazani river around Telavi, Gurjaani, Kvareli and Sighnaghi, and Outer Kakheti (Gare Kakheti), the drier land around Sagarejo and the Iori valley where Manavi and Khashmi lie. This is the home of the Kakhetian method: grapes, skins, stems and pips fermented and macerated together in qvevri for up to six months, giving amber whites and tannic Saperavi.",
     "history": "The kingdom of Kakheti (1465 to 1762) had its capital at Gremi, destroyed by Shah Abbas I in 1616. Monasteries such as Alaverdi, Ikalto, Shuamta and Nekresi kept winemaking alive through invasion. In the nineteenth century the Chavchavadze family at Tsinandali, the Andronikashvili family at Kardenakhi and the Russian imperial Udel (appanage) estates at Napareuli and Tsinandali built the commercial wine industry. In Soviet times giant state wineries in Telavi, Gurjaani and Kvareli made the semi-sweet wines Moscow loved.",
     "terroir": "The Greater Caucasus rises to over 4,000 metres immediately north of the Alazani valley, shielding it from Arctic air and draining cool air down at night. Vineyards lie between about 250 and 800 metres. Right-bank sites (Tsinandali, Mukuzani, Gurjaani, Vazisubani) sit on terraces of carbonate-rich alluvium and clay; left-bank sites (Kvareli, Kindzmarauli, Napareuli) are closer to the mountains on deeper, often red, soils. Hail and spring frost are real risks.",
     "grapes": "Rkatsiteli and Saperavi dominate; Kakhuri Mtsvane, Kisi, Khikhvi, Saperavi Budeshuri, Cabernet Sauvignon (Teliani) and many rare varieties also grow.",
     "styles": "Dry and semi-sweet reds, fresh European-style whites, amber qvevri whites, fortified Kardenakhi.",
     "classification": "PDOs: Tsinandali, Mukuzani, Kindzmarauli, Napareuli, Gurjaani, Akhasheni, Manavi, Vazisubani, Teliani, Kardenakhi, Kotekhi, Tibaani, Kvareli, Kakheti, Khashmis Saperavi, Akhmeta, Tsarapi, Akhoebi, Magraani Kisi, Zegaani.",
     "appellations": ["Tsinandali", "Mukuzani", "Kindzmarauli", "Napareuli", "Gurjaani", "Akhasheni", "Manavi", "Vazisubani", "Teliani", "Kardenakhi", "Kotekhi", "Tibaani", "Kvareli", "Kakheti", "Khashmis Saperavi", "Akhmeta", "Tsarapi", "Akhoebi", "Magraani Kisi", "Zegaani"],
     "sources": SRC},
    {"country": ISO, "name": "Kartli", "alt": ["Shida Kartli", "Kvemo Kartli", "Mtskheta-Mtianeti", "ქართლი"], "parent_region": None, "lat": 41.85, "lon": 44.4, "zoom": 8.5,
     "tagline": "Around Tbilisi: Neolithic wine villages, Chinuri and Georgia's sparkling tradition.",
     "summary": "Kartli, the historical core of the Georgian kingdom along the Mtkvari (Kura) river, is cooler and windier than Kakheti and makes lighter whites, rosés and sparkling wine. Kvemo Kartli (Lower Kartli) in the south holds the Neolithic sites of Gadachrili Gora and Shulaveris Gora and the appellations Bolnisi and Asuretuli Shala; Shida Kartli (Inner Kartli) around Gori holds Atenuri and Okami; the Mukhrani valley near Mtskheta is home to Château Mukhrani and Iago Bitarishvili's Chinuri.",
     "history": "Ateni's Sioni church (seventh century) stands above the Atenuri vineyards. Prince Ivane Mukhranbatoni founded the Mukhrani estate in the 1870s and exported wine to Europe. German settlers from Württemberg founded colonies in Kvemo Kartli in the 1810s (Katharinenfeld, now Bolnisi; Elisabethtal, now Asureti) and planted vineyards; they were deported in 1941.",
     "terroir": "Continental climate, 500 to 800 metres, colder winters than Kakheti; soils of alluvium, gravel and carbonate clay.",
     "grapes": "Chinuri, Goruli Mtsvane, Shavkapito, Tavkveri, Asuretuli Shavi, Rkatsiteli, Saperavi.",
     "styles": "Light and sparkling whites, rosé-style reds, delicate amber Chinuri.",
     "classification": "PDOs: Atenuri, Okami, Bolnisi, Asuretuli Shala.",
     "appellations": ["Atenuri", "Okami", "Bolnisi", "Asuretuli Shala"], "sources": SRC},
    {"country": ISO, "name": "Imereti", "alt": ["Imeretia", "იმერეთი"], "parent_region": None, "lat": 42.15, "lon": 42.8, "zoom": 9,
     "tagline": "Western Georgia's gentler way: churi jars, less skin and bright Tsolikouri.",
     "summary": "Imereti, in the humid west around Kutaisi, makes wine in the same buried clay vessels (here called churi) but with only a part of the skins and no stems, so whites are lighter and fresher than Kakhetian amber wines. The 'Imeruli' style is a midpoint between European white wine and full Kakhetian maceration. Ramaz Nikoladze, Baia's Wine and Archil Guniava helped make the region a darling of natural wine.",
     "history": "Imereti was the kingdom of the west, ruled from Kutaisi. Many of Georgia's qvevri makers come from Imeretian villages such as Makatubani, Shrosha, Tkemlovana and Chkhiroula.",
     "terroir": "Subtropical, wet climate; low hills of clay, limestone and sandy soils along the Rioni and Kvirila rivers.",
     "grapes": "Tsolikouri, Tsitska, Krakhuna, Otskhanuri Sapere, Aladasturi.",
     "styles": "Fresh and lightly macerated whites, sparkling Tsitska, tannic Otskhanuri Sapere reds.",
     "classification": "PDOs: Sviri, Obcha, Sazanos Otskhanuri.", "appellations": ["Sviri", "Obcha", "Sazanos Otskhanuri"], "sources": SRC},
    {"country": ISO, "name": "Racha-Lechkhumi and Kvemo Svaneti", "alt": ["Racha", "Lechkhumi"], "parent_region": None, "lat": 42.55, "lon": 43.0, "zoom": 9,
     "tagline": "Mountain gorges of the Rioni and Tskhenistskali: semi-sweet Khvanchkara and rare Usakhelouri.",
     "summary": "This mountainous north-western region has small, steep vineyards and some of Georgia's most famous names. Racha's Khvanchkara, a naturally semi-sweet red from Aleksandrouli and Mujuretuli, was a Soviet luxury; Lechkhumi's Tvishi is its white counterpart from Tsolikouri, and Okureshi's Usakhelouri is a tiny-production, perfumed red that sells at high prices. Racha and Lechkhumi both became appellations in their own right in the mid-2020s.",
     "history": "Khvanchkara wine has been made commercially since 1907; legend makes it Stalin's favourite.",
     "terroir": "Steep slopes at 400 to 800 metres in the Rioni (Racha) and Tskhenistskali (Lechkhumi) gorges; limestone and clay; cool nights and late harvests.",
     "grapes": "Aleksandrouli, Mujuretuli, Tsolikouri, Usakhelouri, Ojaleshi (Orbeluri Ojaleshi), Tsulukidzis Tetra.",
     "styles": "Naturally semi-sweet reds and whites, increasingly dry wines.",
     "classification": "PDOs: Khvanchkara, Tvishi, Okureshis Usakhelouri, Racha, Lechkhumi.",
     "appellations": ["Khvanchkara", "Tvishi", "Okureshis Usakhelouri", "Racha", "Lechkhumi"], "sources": SRC},
    {"country": ISO, "name": "Samegrelo", "alt": ["Mingrelia"], "parent_region": None, "lat": 42.5, "lon": 42.1, "zoom": 9,
     "tagline": "Ojaleshi on trees, between the Black Sea and the Caucasus.",
     "summary": "Samegrelo, the low western land of the Mingrelians, is humid and subtropical. Its red grape Ojaleshi (literally 'growing on trees') was historically trained up living trees; Salkhino Ojaleshi is its appellation, named after the village of the Dadiani princes' summer residence near Martvili.",
     "history": "The Dadiani princes of Mingrelia had their palace at Zugdidi and a summer residence at Salkhino; Ojaleshi was the wine of their court.",
     "terroir": "High rainfall, warm humid summers, clay soils; disease pressure is high.",
     "grapes": "Ojaleshi, Tsolikouri, Chkhaveri.", "styles": "Dry and semi-sweet reds.", "classification": "PDO: Salkhino Ojaleshi.",
     "appellations": ["Salkhino Ojaleshi"], "sources": SRC},
    {"country": ISO, "name": "Guria", "alt": [], "parent_region": None, "lat": 41.95, "lon": 42.05, "zoom": 9.5,
     "tagline": "Tiny, humid and full of rescued grapes.",
     "summary": "Guria, south of Samegrelo, has very little vineyard but a long list of nearly lost varieties (Chkhaveri, Aladasturi, Jani, Mtevandidi) that small producers are reviving. The village of Atsana is one of the traditional centres of qvevri making.",
     "history": "Phylloxera and Soviet planting policy almost wiped out Gurian grapes; Chkhaveri, a pink-skinned variety, survives in rosé-like wines.",
     "terroir": "Wet subtropical hills near the Black Sea.", "grapes": "Chkhaveri, Aladasturi, Jani.", "styles": "Light reds and rosés.",
     "classification": "No PDO.", "appellations": [], "sources": SRC},
    {"country": ISO, "name": "Adjara", "alt": ["Ajara"], "parent_region": None, "lat": 41.6, "lon": 41.9, "zoom": 9.5,
     "tagline": "Batumi's hinterland, where Chkhaveri and Tsolikouri hang on.",
     "summary": "The autonomous republic of Adjara around Batumi has small vineyards in the hills of the Ajaristskali valley, notably around Keda, which hosts a wine festival. Chkhaveri and Tsolikouri are the local grapes.",
     "history": "Under Ottoman rule until 1878, Adjara had a largely Muslim population and a smaller wine culture than the rest of Georgia.",
     "terroir": "Very wet climate (Batumi gets well over 2,000 mm of rain a year), steep hills.", "grapes": "Chkhaveri, Tsolikouri.", "styles": "Light reds, rosés, whites.",
     "classification": "No PDO.", "appellations": [], "sources": SRC},
    {"country": ISO, "name": "Meskheti", "alt": ["Samtskhe-Javakheti"], "parent_region": None, "lat": 41.55, "lon": 43.0, "zoom": 9.5,
     "tagline": "Medieval terraces around Vardzia, replanted after centuries.",
     "summary": "Meskheti in the south had extensive terraced vineyards in the Middle Ages, visible around the cave monastery of Vardzia, but Ottoman rule and depopulation emptied them. Since the 2010s growers have replanted local varieties such as Meskhuri Mtsvane and Meskhuri Shavi at up to about 1,300 metres.",
     "history": "The cave city of Vardzia, carved under Queen Tamar in the twelfth century, includes wine cellars with buried qvevri.",
     "terroir": "High, dry, continental valleys of the upper Mtkvari.", "grapes": "Meskhuri Mtsvane, Meskhuri Shavi, Tamaris Vazi.", "styles": "Fresh whites and light reds.",
     "classification": "No PDO.", "appellations": [], "sources": SRC},
    {"country": ISO, "name": "Abkhazia", "alt": ["Apkhazeti", "Apsny"], "parent_region": None, "lat": 43.05, "lon": 41.0, "zoom": 8.5,
     "tagline": "A Soviet-era wine region now beyond Tbilisi's control.",
     "summary": "Abkhazia, on the Black Sea coast in the north-west, is internationally recognised as part of Georgia but has been controlled by Russian-backed de facto authorities since the war of 1992 to 1993; Russia recognised it as independent in 2008, as have only a handful of other states. In Soviet times it made popular semi-sweet wines such as Lykhny (from Isabella), Apsny and the white Anakopia (Tsolikouri). Production continues for the Russian market, outside Georgia's appellation and control system.",
     "history": "The 1992 to 1993 war displaced most of the region's ethnic Georgian population; the 2008 Russia-Georgia war froze the conflict.",
     "terroir": "Humid subtropical coast under the Caucasus.", "grapes": "Isabella, Tsolikouri, Kachichi, Avasirkhva.", "styles": "Semi-sweet reds and whites.",
     "classification": "No Georgian PDO is controlled here.", "appellations": [], "sources": SRC},
]

def A(name, match, created, styles, dom, grapes, region, summary, terroir=None, producers=None, nerd=None, sub=None):
    d = {"country": ISO, "name": name, "match": match, "cat": "PDO", "region": region, "created": created,
         "styles": styles, "dominant_style": dom, "grapes": grapes, "summary": summary}
    if sub: d["subregion"] = sub
    if terroir: d["terroir"] = terroir
    if producers: d["producers"] = producers
    if nerd: d["nerd_note"] = nerd
    return d

apps = [
    A("Tsinandali", ["Tsinandali", "წინანდალი"], "Listed 2002; registered 2005", ["white"], "white", "Rkatsiteli with at least 15% Kakhuri Mtsvane", "Kakheti",
      "Tsinandali is the most famous dry white of Georgia and the one made in the European rather than the qvevri way: Rkatsiteli blended with Kakhuri Mtsvane, fermented clean and traditionally aged in oak before release, with notes of quince, citrus, white flowers and honey. The name belongs to the village and estate of the Chavchavadze princes on the right bank of the Alazani near Telavi, where Prince Alexander Chavchavadze ran a European-style winery in the first half of the nineteenth century, and the style is a direct descendant of his experiments. Soviet Tsinandali was the white on official tables across the USSR.",
      "Right-bank terraces of the Alazani at 400 to 700 metres, on carbonate-rich alluvial and clay soils; cooled by night air from the Caucasus.",
      ["Tsinandali Estate", "Tbilvino", "Shumi", "Teliani Valley", "GWS"],
      "The Tsinandali oenotheque holds more than 16,500 historic bottles; the oldest listed is a 1814 'Polish honey'."),
    A("Mukuzani", ["Mukuzani", "მუკუზანი"], "Listed 2002; registered 2005", ["red"], "red", "Saperavi 100%", "Kakheti",
      "The benchmark dry Saperavi. Mukuzani village sits on the right bank of the Alazani in the Gurjaani district, and its wines are dense, inky and high in acid, with black cherry, plum, blackberry and spice, traditionally given oak ageing before release, and capable of a decade or more. Story has it that Stalin poured Mukuzani for Churchill at Yalta. Many large companies produce it; the best come from old vines on the village's gravel terraces.",
      "Right-bank slopes at about 400 to 700 metres; brown carbonate soils with gravel.", ["Vaziani", "Tbilvino", "Teliani Valley", "Badagoni", "Marani"]),
    A("Kindzmarauli", ["Kindzmarauli", "ქინძმარაული"], "Listed 2002; registered 2006", ["red", "sweet"], "red", "Saperavi 100%", "Kakheti",
      "A naturally semi-sweet red from the Kvareli district on the left bank of the Alazani, beneath the Caucasus. Fermentation is stopped by chilling to keep residual sugar (typically 3 to 5 percent) without fortification, giving a soft, juicy wine of black cherry and pomegranate with Saperavi's acidity holding the sweetness in check. It has been produced commercially since 1942 and was one of the great Soviet favourites; it remains Georgia's best-known export in Russia, Ukraine, Kazakhstan and China.",
      "Left-bank slopes of the Duruji river near Kvareli at 300 to 550 metres, on deep red soils with a warm microclimate.", ["Kindzmarauli Marani", "Khareba", "Tbilvino", "GWS"]),
    A("Napareuli", ["Napareuli", "ნაფარეული"], "Listed 2002; registered 2007", ["red", "white"], "red", "Saperavi (red); Rkatsiteli (white)", "Kakheti",
      "On the left bank of the Alazani north of Telavi, Napareuli makes dry Saperavi and dry Rkatsiteli. The imperial Udel estate made wine here in the nineteenth century, and today the village is a cluster of family cellars and the Twins Wine Cellar, whose qvevri museum explains the method.",
      "Alluvial and carbonate soils near the river, 400 to 500 metres.", ["Twins Wine Cellar", "Teliani Valley", "Marani"]),
    A("Gurjaani", ["Gurjaani", "გურჯაანი"], "Listed 2002; registered 2005", ["white"], "white", "Rkatsiteli with Kakhuri Mtsvane", "Kakheti",
      "A dry white from around the town of Gurjaani, on the right bank in the middle Alazani. Traditionally Rkatsiteli with Mtsvane, it is often a fuller, rounder white than Tsinandali, and many producers make it in qvevri.",
      "Terraces of the Gombori ridge foothills at 400 to 700 metres."),
    A("Akhasheni", ["Akhasheni", "ახაშენი"], "Listed 2002; registered 2005", ["red", "sweet"], "red", "Saperavi 100%", "Kakheti",
      "A naturally semi-sweet Saperavi from the village of Akhasheni in the Gurjaani district, softer and more chocolatey than Kindzmarauli. Commercial production dates from 1958.",
      "Right-bank slopes of the Alazani at 400 to 600 metres."),
    A("Manavi", ["Manavi", "მანავი"], "Listed 2002; registered 2006", ["white"], "white", "Kakhuri Mtsvane (Rkatsiteli permitted)", "Kakheti",
      "The appellation of Kakhuri Mtsvane, around the village of Manavi in the Sagarejo district (Outer Kakheti). Its whites are aromatic and mineral, among Georgia's most elegant non-amber whites.",
      "Southern slopes of the Gombori range at 500 to 700 metres, drier than the Alazani valley.", None,
      "Mtsvane means 'green', and several unrelated grapes share it; Manavi's is Mtsvane Kakhuri, the Kakhetian one."),
    A("Vazisubani", ["Vazisubani", "ვაზისუბანი"], "Listed 2002; registered 2007", ["white"], "white", "Rkatsiteli with Kakhuri Mtsvane", "Kakheti",
      "A dry white from Vazisubani in the Gurjaani district; the name means 'vine quarter'. The Andronikashvili princes had an estate here, now a restored hotel and winery."),
    A("Teliani", ["Teliani", "თელიანი"], "Listed 2002; registered 2007", ["red"], "red", "Cabernet Sauvignon", "Kakheti",
      "Georgia's only appellation for an international grape: dry Cabernet Sauvignon from the Telavi area, a style made since the late nineteenth century when French varieties were planted on aristocratic estates."),
    A("Kardenakhi", ["Kardenakhi", "კარდენახი"], "Listed 2002; registered 2007", ["fortified", "white"], "fortified", "Rkatsiteli, Khikhvi, Kakhuri Mtsvane", "Kakheti",
      "A fortified, port-like white wine from Kardenakhi in the Gurjaani district, made from very ripe Rkatsiteli, Khikhvi and Mtsvane and aged in oak. Kardenakhi village also contains the microzones of Tsarapi and Akhoebi."),
    A("Kotekhi", ["Kotekhi", "ქოთეხი"], "Listed 2002; registered 2007", ["white", "red"], "white", "Rkatsiteli (white); Saperavi (red)", "Kakheti",
      "A small appellation on the right bank of the middle Alazani for dry Rkatsiteli and Saperavi."),
    A("Tibaani", ["Tibaani", "ტიბაანი"], "Listed 2002; registered 2007", ["white", "orange"], "orange", "Rkatsiteli", "Kakheti",
      "From the Sighnaghi district in the eastern Alazani valley, Tibaani is classically a Kakhetian-method Rkatsiteli made with long skin contact, deep amber in colour and tannic: a historic appellation for what is now called orange wine."),
    A("Kvareli", ["Kvareli", "ყვარელი"], "Listed 2002; registered 2007", ["red"], "red", "Saperavi 100%", "Kakheti",
      "The dry red appellation of the Kvareli district on the left bank under the Caucasus, for powerful dry Saperavi. Kvareli is also home to the Khareba tunnel cellar and the Kindzmarauli Corporation.",
      "Red and humus-calcareous soils under the mountains, 350 to 600 metres.", ["Khareba", "Kindzmarauli Marani", "Kvareli Wine Cellar"]),
    A("Kakheti", ["Kakheti", "Kakhuri", "კახეთი", "Kakhuri Rkatsiteli", "Kakhuri Mtsvane"], "Listed 2002; registered 2007", ["white", "orange", "red", "rose"], "white",
      "Rkatsiteli, Kakhuri Mtsvane, Saperavi and other permitted Kakhetian varieties", "Kakheti",
      "The regional appellation covering all of Kakheti. Historically it meant a white wine made by the full Kakhetian method (whole-cluster maceration in qvevri); today it also covers dry whites, ambers, rosés and reds from the region, labelled Kakheti or Kakhuri. Varietal labels such as 'Kakhuri Rkatsiteli' or 'Kakhuri Mtsvane' fall under this name rather than being separate appellations."),
    A("Khashmis Saperavi", ["Khashmis Saperavi", "Khashmi Saperavi", "Saperavi Khashmi", "Khashmi", "ხაშმის საფერავი"], "2018", ["red"], "red", "Saperavi", "Kakheti",
      "Dry Saperavi from the village of Khashmi in Sagarejo (Outer Kakheti), on the Iori side of the Gombori ridge; the first of the new wave of microzone appellations after the original 18."),
    A("Akhmeta", ["Akhmeta", "ახმეტა"], "2020", ["white", "orange"], "white", "Kakhuri Mtsvane (amber wines may include Kisi and Khikhvi)", "Kakheti",
      "The upper Alazani around Akhmeta, cooler and closer to the Pankisi gorge, gives fresh, perfumed Mtsvane in dry, semi-dry, semi-sweet and amber styles."),
    A("Tsarapi", ["Tsarapi", "წარაპი"], "2020", ["orange"], "orange", "Rkatsiteli with up to 15% Kakhuri Mtsvane and/or Khikhvi", "Kakheti",
      "A microzone within Kardenakhi village in the Gurjaani district, for dry amber Rkatsiteli made with skin contact; one of the first appellations created specifically for qvevri-style amber wine."),
    A("Akhoebi", ["Akhoebi", "ახოები"], "2020", ["red"], "red", "Saperavi and/or Saperavi Budeshuri", "Kakheti",
      "A microzone near Kardenakhi for dry Saperavi, including the rare large-berried Saperavi Budeshuri. Akhoebi grapes were the source of the Soviet-era Pirosmani wine."),
    A("Magraani Kisi", ["Magraani Kisi", "Maghraani Kisi", "Kisi Magraani", "Kisi magrani", "Magriaani", "მაღრაანის ქისი"], "2021", ["white", "orange"], "orange", "Kisi 100%", "Kakheti",
      "The Kisi appellation, around Magraani in the Telavi area: dry white and amber Kisi, a grape revived from near oblivion in the 2000s that gives golden, aromatic qvevri wines of pear, mango, tobacco and walnut."),
    A("Zegaani", ["Zegaani", "ზეგაანი"], "2022", ["red"], "red", "Saperavi 100%", "Kakheti",
      "A microzone around the village of Zegaani in Gurjaani municipality; unusually, its rules require dry red qvevri Saperavi from organic farming."),
    A("Atenuri", ["Atenuri", "Ateni", "ატენური"], "Listed 2002; registered 2007", ["sparkling", "white"], "white", "Chinuri, Goruli Mtsvane (Aligoté permitted)", "Kartli",
      "The Ateni gorge south of Gori in Shida Kartli has made crisp whites for centuries; the appellation covers fresh and traditionally sparkling wines from Chinuri and Goruli Mtsvane. The seventh-century Ateni Sioni church stands above the vines.",
      "Cool gorge at 600 to 900 metres along the Tana river; calcareous soils."),
    A("Okami", ["Okami", "ოკამი"], "2022", ["white", "orange", "red"], "white", "Chinuri or Goruli Mtsvane (white and amber); Shavkapito (red)", "Kartli",
      "A small zone in Kaspi municipality, Shida Kartli, for dry white, amber and red wines from Kartli's own grapes."),
    A("Bolnisi", ["Bolnisi", "ბოლნისი"], "2018", ["white", "orange", "rose", "red"], "red",
      "Rkatsiteli, Chinuri, Goruli Mtsvane, Saperavi, Tavkveri, Shavkapito, Asuretuli Shavi", "Kartli",
      "Kvemo Kartli's main appellation, around the town German colonists founded in 1818 as Katharinenfeld. Bolnisi now has its own designation of origin festival and covers dry white, amber, rosé and red wines.",
      "Volcanic and alluvial soils of the Mashavera valley at 500 to 1,000 metres."),
    A("Asuretuli Shala", ["Asuretuli Shala", "Asuretuli shala", "ასურეთული შალა"], "2022", ["red", "rose"], "red", "Asuretuli Shavi with Tavkveri and Shavkapito", "Kartli",
      "From Asureti (the former German colony Elisabethtal) in Tetritskaro, a light, pale red traditionally made from Asuretuli Shavi; 'shala' describes its pale, rosé-like colour."),
    A("Sviri", ["Sviri", "სვირი"], "Listed 2002; registered 2007", ["white"], "white", "Tsolikouri, Tsitska, Krakhuna", "Imereti",
      "A dry white from the Zestaponi area of Imereti, on the left bank of the Kvirila river, blending the region's three classic whites in the gentler Imeretian style."),
    A("Obcha", ["Obcha", "ობჩა"], "c. 2024 to 2025", ["orange", "red"], "orange", "Tsolikouri (amber, up to 15% Tsitska and/or Krakhuna); Otskhanuri Sapere (red)", "Imereti",
      "From Obcha in Baghdati municipality, an amber Tsolikouri and a red Otskhanuri Sapere. Registered around 2024 to 2025, it was the 30th Georgian PDO."),
    A("Sazanos Otskhanuri", ["Sazanos Otskhanuri", "Sazano's Otskhanuri", "Sazanos Otskhanuri Sapere", "საზანოს ოცხანური"], "2025", ["red"], "red", "Otskhanuri Sapere (up to 5% Saperavi from the same microzone)", "Imereti",
      "Dry red from the Sazano microzone at 120 to 420 metres, fermented fully on the skins in qvevri or steel. Otskhanuri Sapere is one of Georgia's most tannic grapes. It was the 33rd PDO on the National Wine Agency list."),
    A("Khvanchkara", ["Khvanchkara", "ხვანჭკარა"], "Listed 2002; registered 2005", ["red", "sweet"], "red", "Aleksandrouli and Mujuretuli", "Racha-Lechkhumi and Kvemo Svaneti",
      "Georgia's most celebrated semi-sweet red comes from steep vineyards around the village of Khvanchkara near Ambrolauri in Racha. Aleksandrouli gives raspberry perfume, Mujuretuli colour and body; fermentation stops naturally in the cold autumn of the mountains, leaving sweetness, low alcohol and lively acidity. Production is tiny, fakes are common, and authentic bottles command a premium.",
      "Limestone-rich slopes of the Rioni gorge around 450 to 750 metres; cool nights and late harvests.", ["Kindzmarauli Marani", "Rachuli Wine Cellar"],
      "Khvanchkara has been bottled commercially since 1907; legend says it was Stalin's favourite wine."),
    A("Tvishi", ["Tvishi", "ტვიში"], "Listed 2002; registered 2007", ["white", "sweet"], "white", "Tsolikouri", "Racha-Lechkhumi and Kvemo Svaneti",
      "A naturally semi-sweet (sometimes dry) white from the village of Tvishi in the Tsageri district of Lechkhumi, on the right bank of the Rioni. Late-picked Tsolikouri gives honeyed, pear-scented wine with fresh acidity."),
    A("Okureshis Usakhelouri", ["Okureshis Usakhelouri", "Okureshi Usakhelouri", "ოყურეშის უსახელოური"], "2022", ["red", "sweet"], "red", "Usakhelouri 100%", "Racha-Lechkhumi and Kvemo Svaneti",
      "A tiny microzone around Okureshi in Tsageri, Lechkhumi, for dry, semi-dry or semi-sweet red from Usakhelouri ('nameless'), a delicate, strawberry-scented grape grown on a handful of hectares. It is among the most expensive wines in Georgia."),
    A("Racha", ["Racha", "რაჭა"], "2025", ["red", "white", "sweet"], "red", "Racha's local varieties (rules not verified for this atlas)", "Racha-Lechkhumi and Kvemo Svaneti",
      "A regional appellation for Racha, announced by the Georgian Ministry of Agriculture in October 2025, broadening protection beyond the single village of Khvanchkara to the upper Rioni valley around Ambrolauri."),
    A("Lechkhumi", ["Lechkhumi", "ლეჩხუმი"], "by 2025", ["red", "white"], "red", "Lechkhumi's local varieties (rules not verified for this atlas)", "Racha-Lechkhumi and Kvemo Svaneti",
      "A regional appellation for Lechkhumi, the Tskhenistskali valley around Tsageri, home of Usakhelouri, Orbeluri Ojaleshi and Tsolikouri; listed among Georgia's PDOs by 2025."),
    A("Salkhino Ojaleshi", ["Salkhino Ojaleshi", "Salhino Ojaleshi", "სალხინოს ოჯალეში"], "2010s", ["red"], "red", "Ojaleshi 100%", "Samegrelo",
      "Dry red Ojaleshi from Salkhino in Martvili municipality, where the Dadiani princes of Mingrelia kept their summer residence; peppery, dark-fruited and fresh."),
]

S = []
def s(*a, **k): S.append(site(ISO, *a, **k))

s("Gadachrili Gora", "historic", 41.3904, 44.821, "A low Neolithic mound near the village of Imiri, south of Marneuli, cut through by the Shulaveri stream. Jars from its round mudbrick houses, dated to about 6000 to 5800 BC, held the oldest chemical traces of grape wine yet found (tartaric, malic, succinic and citric acids), and one contained grape pollen. A museum is planned on the site.", "precise", cls="Neolithic settlement (Shulaveri-Shomu culture)")
s("Shulaveris Gora", "historic", 41.3650, 44.8394, "The type site of the Shulaveri-Shomu culture, a few kilometres from Gadachrili Gora, which yielded the second set of Neolithic wine jars published in 2017, along with some of the earliest bread wheat in the Caucasus.", "approx", cls="Neolithic settlement (Shulaveri-Shomu culture)")
s("Alaverdi Monastery cellar", "cellar", 42.0325, 45.3771, "The eleventh-century cathedral of Alaverdi rises above the Alazani valley; its monastic wine cellar, restored in 2006 with the support of Badagoni, holds more than 40 qvevri, and the monks' qvevri wines are among Georgia's most respected. The monastery hosts the Alaverdoba harvest festival in September.", "precise", cls="Monastery cellar", producers=["Alaverdi Monastery", "Badagoni"])
s("Tsinandali Estate (Chavchavadze)", "historic", 41.8947, 45.5756, "The country house of Prince Alexander Chavchavadze, poet, general and Georgia's first great modern winemaker, with its Italianate palace, English garden and a cellar of more than 16,500 historic bottles from 1814 onwards. Raided by Imam Shamil's forces in 1854, later owned by the Russian imperial family, it is now a museum, hotel and home of the Tsinandali classical music festival.", "precise", cls="Historic estate and oenotheque", app="Tsinandali")
s("Gremi citadel", "historic", 42.0131, 45.6734, "The hilltop citadel and Church of the Archangels of Gremi, capital of the Kingdom of Kakheti from the fifteenth century until Shah Abbas I destroyed it in 1615 to 1616, an invasion that emptied Kakheti's vineyards for generations.", "precise", cls="Royal citadel")
s("Ikalto Academy", "historic", 41.9369, 45.3812, "Monastery founded by St Zenon in the sixth century and an academy in the twelfth, where viticulture and winemaking were reportedly taught; a huge stone wine press and qvevri remain in the grounds. Tradition says Shota Rustaveli studied here.", "precise", cls="Monastery and medieval academy")
s("Nekresi Monastery", "historic", 41.9721, 45.7686, "One of the oldest Christian sites in Kakheti, on a forested slope above the Alazani valley, with old qvevri cellars and a fourth-century basilica.", "approx", cls="Monastery")
s("Khareba wine tunnel", "cellar", 41.9357, 45.8339, "A 7.7-kilometre tunnel carved into the rock near Kvareli in the 1950s as a military facility and now used by the Khareba winery as a cellar, holding a steady 12 to 14 degrees C.", "precise", app="Kvareli", producers=["Khareba (Winery Khareba)"])
s("Pheasant's Tears", "estate", 41.6162, 45.9203, "Founded in 2007 in hilltop Sighnaghi by the American painter John Wurdeman and the Georgian grower Gela Patalishvili; its long-macerated qvevri Rkatsiteli, Kisi and Saperavi helped introduce the world to Georgian natural wine.", "precise", producers=["Pheasant's Tears"])
s("Okro's Wines", "estate", 41.6200, 45.9200, "Okro Natroshvili's small natural-wine cellar in Sighnaghi, making qvevri wines from Rkatsiteli, Mtsvane, Saperavi and rare Kakhetian grapes.", "approx", producers=["Okro's Wines"])
s("Iago's Wine, Chardakhi", "estate", 41.8878, 44.6511, "Iago Bitarishvili makes amber and skin-free Chinuri in qvevri in the village of Chardakhi in the Mukhrani valley of Kartli, one of the first certified organic wineries in Georgia.", "approx", app="Atenuri", producers=["Iago's Wine"])
s("Château Mukhrani", "estate", 41.9330, 44.5650, "The estate Prince Ivane Mukhranbatoni founded in the 1870s, exporting wine to Europe in the nineteenth century; restored and replanted in the 2000s on the Mukhrani plain north-west of Tbilisi.", "approx", producers=["Château Mukhrani"])
s("Twins Wine Cellar", "museum", 42.0446, 45.5037, "The Kapanadze twins' winery in Napareuli includes a qvevri museum explaining how the vessels are made, lined with beeswax and buried.", "approx", app="Napareuli", producers=["Twins Wine Cellar"])
s("Ateni Sioni Church", "historic", 41.9039, 44.0960, "Seventh-century church in the Ateni gorge south of Gori, standing among the vineyards of PDO Atenuri.", "precise", app="Atenuri")
s("Sioni Cathedral, Tbilisi", "historic", 41.6912, 44.8075, "Tbilisi's Sioni Cathedral keeps the Grapevine Cross attributed to St Nino, the symbol of Georgian Christianity and wine.", "approx", cls="Cathedral (St Nino's Grapevine Cross)")
s("Khvanchkara village", "village", 42.5591, 43.0202, "The Racha village above the Rioni gorge whose steep slopes give the famous semi-sweet Khvanchkara from Aleksandrouli and Mujuretuli.", "approx", app="Khvanchkara")
s("Vardzia cave monastery", "historic", 41.3809, 43.2833, "The twelfth-century cave city of Queen Tamar carved into a cliff of the upper Mtkvari, with wine cellars and buried qvevri; the terraces around it were once vineyards and are being replanted.", "approx", cls="Cave monastery")

s("Mukuzani village", "village", 41.8068, 45.7320, "The right-bank village in Gurjaani municipality whose gravel and carbonate terraces above the Alazani give Georgia's benchmark dry Saperavi. Mukuzani was one of the first 18 appellations listed in 2002 and is traditionally oak-aged before release.", "approx", app="Mukuzani")
s("Kindzmarauli Corporation, Kvareli", "cellar", 41.9465, 45.8127, "A large Kvareli winery and one of the main producers of semi-sweet Kindzmarauli and of Khvanchkara.", "approx", app="Kindzmarauli", producers=["Kindzmarauli Marani"])
s("Shumi Winery and vine collection", "estate", 41.9004, 45.5680, "A Tsinandali winery with a wine museum and a large collection vineyard of Georgian and foreign grape varieties beside the road from Telavi.", "precise", app="Tsinandali", producers=["Shumi"])
s("Okureshi", "village", 42.5441, 42.6821, "Hillside village in Tsageri, Lechkhumi, home of the rare Usakhelouri grape; its few hectares supply PDO Okureshis Usakhelouri.", "approx", app="Okureshis Usakhelouri")
s("Tvishi", "village", 42.5130, 42.7941, "Lechkhumi village on the right bank of the Rioni that gives its name to semi-sweet Tsolikouri.", "approx", app="Tvishi")
s("Zegaani", "village", 41.7979, 45.7311, "Village in Gurjaani municipality whose microzone has had its own PDO since 2022, unusual in requiring dry red Saperavi made in qvevri from organically farmed grapes. It lies on the right bank of the Alazani between Mukuzani and Akhasheni.", "approx", app="Zegaani")
s("Magraani", "village", 42.1018, 45.3561, "Village in the upper Alazani valley in Akhmeta municipality, at the heart of PDO Magraani Kisi (2021). Kisi, revived since the 2000s, gives golden, aromatic qvevri wines here, cooled by air off the Caucasus.", "approx", app="Magraani Kisi")
s("Kardenakhi", "village", 41.6716, 45.8849, "Gurjaani-district village of fortified Kardenakhi and the microzones Tsarapi and Akhoebi; the Andronikashvili princes had an estate here.", "approx", app="Kardenakhi")
s("Salkhino palace of the Dadiani", "historic", 42.5111, 42.3404, "The Dadiani princes' summer residence near Martvili, whose name lives on in PDO Salkhino Ojaleshi.", "approx", app="Salkhino Ojaleshi")
s("Vani archaeological site", "historic", 42.0847, 42.5036, "The ancient Colchian city of Vani in Imereti (8th to 1st century BC), rich in gold work and in imported Greek amphorae that show Colchis trading wine with the Greek world.", "precise", cls="Archaeological site")
s("Tibaani", "village", 41.5752, 46.0058, "Village in the Sighnaghi district, in the eastern Alazani valley, whose appellation is a historic name for long-macerated amber Rkatsiteli.", "approx", app="Tibaani")

data = {"countries": [country], "regions": regions, "appellations": apps, "sites": S}
if __name__ == "__main__":
    save(ISO, data)
