import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c8")
from common import write, site, app, region, H, S

I = "rs"
SRC = [
    S("Wikipedia: Serbian wine", "https://en.wikipedia.org/wiki/Serbian_wine"),
    S("Agroberichten Buitenland: The vineyard of the Balkans, wine in Serbia (2020)", "https://agroberichtenbuitenland.nl/actueel/nieuws/2020/10/07/wine-in-serbia"),
    S("Economics of Agriculture (Belgrade): Serbian wine sector article", "https://ea.bg.ac.rs/index.php/EA/article/download/1995/1546/5388"),
    S("GOV.UK protected food and drink names register (Serbian wine GIs under the UK-Serbia agreement)", "https://www.gov.uk/protected-food-drink-names?country_of_origin%5B%5D=serbia"),
    S("UNESCO Tentative List: Negotinske Pivnice (2010)", "https://whc.unesco.org/en/tentativelists/5537"),
    S("Oplenac: King's Winery", "https://oplenac.rs/?p=991"),
    S("Wikipedia: Bermet", "https://en.wikipedia.org/wiki/Bermet"),
    S("Go Eat Do: Wine from the Titanic at Živanović Winery", "https://go-eat-do.com/2018/02/zivanovic-winery-serbia/"),
    S("Vršački vinogradi privatisation profile", "https://privatizacija.privreda.gov.rs/upload/document/vrsacki_vinogradi_vrsac_jsc.pdf"),
    S("Agronews: Dobrodošli u vinsku prestonicu Srbije (Župska berba)", "https://www.agronews.rs/dobrodosli-u-vinsku-prestonicu-srbije/"),
    S("RAS: Serbian wineries at ProWein brochure", "https://ras.gov.rs/uploads/2020/02/prowein-broshura-1.pdf"),
]
COUNTRY = {
 "iso2": I, "name": "Serbia", "tier": "emerging",
 "tagline": "Prokupac and Tamjanika, Fruška Gora's monastery slopes and Bermet, and the stone cellar towns of Negotin.",
 "stats": {"vineyard_ha": 20400, "production_mhl": 0.33, "year": 2018, "world_rank_production": None,
           "note": "Statistical Office of Serbia via the Netherlands agricultural attaché (2020): 20,406 ha of vineyard in 2018 and 331,000 hl of wine. Other sources give 22,150 ha, of which about 6,700 ha are registered for wine. Recent official figures were not found."},
 "overview": """Serbia was once the engine of Yugoslav wine. In the 1970s Yugoslavia made over 6 million hl a year, much of it in Serbian combines such as Navip and Rubin. Today's Serbian industry is far smaller but far more interesting. It has about 20,000 ha of vines, fewer than half registered for wine, and some 350 to 400 registered wineries, most of them family businesses founded after 2000. Production is roughly 0.3 to 0.4 million hl, and imports (above all from North Macedonia) exceed exports.

Serbian law divides the vineyard into three wine-growing units (Central Serbia, Vojvodina, and Kosovo and Metohija, a unit Serbia still defines for Kosovo although Kosovo has administered itself since 1999 and declared independence in 2008), 22 regions and 77 districts, under a zoning adopted in 2015 to match the EU's PDO and PGI system. Under the UK-Serbia trade agreement, 81 Serbian wine names are protected as geographical indications, from the large Šumadija-Velika Morava to small names such as Oplenac, Župa, Rajac and Palić.

The best-known areas are Fruška Gora, a low wooded ridge above the Danube near Novi Sad, studded with sixteen Orthodox monasteries and home to the herbal dessert wine Bermet of Sremski Karlovci; Vršac in the Banat, on the slopes of the only hill in the Pannonian flatlands; Šumadija in the centre, with the royal Oplenac winery; Župa around Aleksandrovac, Serbia's 'wine capital', in the warm valley of the Rasina; and the Negotin Krajina and Timok in the east, where villages of stone cellars (*pivnice*) stand apart from the houses.

Two native grapes carry the story. Prokupac, an ancient red associated with the medieval Nemanjić dynasty, makes light-coloured, spicy, cherry-fruited reds; once dismissed as rustic, it is now the focus of a quality revival. Tamjanika, a local name for Muscat Blanc à Petits Grains grown in Serbia for centuries, makes intensely perfumed dry whites. Smederevka, Sremska Zelenika, Bagrina and the Hungarian-Serb Kadarka add more local colour, but international varieties dominate plantings.""",
 "history": [
    H("3rd century AD", "Probus and Sirmium", "The Roman emperor Probus, born at Sirmium (Sremska Mitrovica) in 232, is credited with lifting Domitian's limits on provincial vineyards and planting vines on Fruška Gora and the slopes above the Danube.", 44.9764, 19.6122),
    H("12th to 14th century", "Nemanjić monasteries and vineyards", "The Nemanjić dynasty and its monasteries promoted viticulture; monastic charters list vineyards in Župa, Metohija and the Morava valley. Legend says Prince Lazar gave his army communion with Župa wine before the Battle of Kosovo in 1389.", 43.4586, 21.0466),
    H("Late 17th to 18th century", "Habsburg Srem and Banat", "After the Great Serbian Migration of 1690, Serbs settled in Habsburg Srem and Banat. Sremski Karlovci became the seat of the Serbian Orthodox metropolitan and a wine town, and Bermet became a court favourite.", 45.2030, 19.9338),
    H("19th century", "Negotin's cellar towns", "Vlach and Serbian winegrowers of the Negotin Krajina built separate cellar villages (pivnice) at Rajac, Rogljevo and Štubik. About 196 cellars survive. During the phylloxera crisis Negotin's wine was sold to France.", 44.0942, 22.5564),
    H("1931", "King Alexander's winery at Oplenac", "King Alexander I built the King's Winery at the foot of Oplenac hill in Topola in 1931, planting over 50 ha with French and local varieties near the Karađorđević mausoleum.", 44.2469, 20.6841),
    H("1963", "Župa harvest festival", "Aleksandrovac began holding the Župska berba harvest festival in 1963. It now draws hundreds of thousands of visitors each September.", 43.4586, 21.0466),
    H("1990s to 2010s", "Collapse and private revival", "The breakup of Yugoslavia and sanctions crippled the state combines. After 2000 small private wineries multiplied, and a 2015 zoning adopted the EU geographical-indication model.", 44.8125, 20.4612),
 ],
 "classification": """Serbia's wine law defines wines with geographical origin in three tiers: *kontrolisano poreklo* (KP, controlled origin), *kontrolisano poreklo i kvalitet* (KPK, controlled origin and quality) and *kontrolisano poreklo i garantovan kvalitet* (KPGK, controlled origin and guaranteed quality). These terms are registered as traditional terms under Serbia's agreements with the EU and UK. The 2015 zoning sets three wine-growing units, 22 regions (*rejoni*) and 77 districts (*vinogorja*). Under the UK-Serbia Partnership, Trade and Cooperation Agreement (2021) 81 Serbian wine names are protected as PGIs. Other traditional terms include *kasna berba* (late harvest), *suvarak* (dried-grape wine), *arhivsko vino* (archive wine) and *mlado vino* (young wine).""",
 "climate_soils": """Vojvodina in the north is flat Pannonian plain, with vineyards on its few hills (Fruška Gora's loess and marl, the Vršac hills' loess and schist) and on sands (Subotica-Horgoš, Deliblato). Central Serbia is hilly continental country of river valleys (Morava, Rasina, Timok) with clay, loess and limestone. Summers are hot and winters cold, and autumns are generally dry.""",
 "grapes": [
    {"name": "Prokupac", "note": "Ancient native red, light in colour with sour cherry, pepper and herbs; at its best in Župa, Toplica and Niš; the focus of the quality revival."},
    {"name": "Tamjanika", "note": "Muscat Blanc à Petits Grains under its Serbian name, grown for more than 500 years; aromatic dry whites from Župa, Negotin and Šumadija."},
    {"name": "Smederevka", "note": "Old neutral white, the base of everyday spritzers (špricer)."},
    {"name": "Sremska Zelenika", "note": "Rare green-skinned white of Fruška Gora, being revived."},
    {"name": "Kreaca", "note": "Kriaca, the local white of the Banat and Vršac."},
    {"name": "Bagrina", "note": "Pink-skinned native white of the Negotin Krajina."},
    {"name": "Morava", "note": "A modern Serbian white crossing bred at Sremski Karlovci, becoming a signature of Fruška Gora."},
    {"name": "Graševina and Riesling", "note": "Welschriesling and Rhine Riesling, mainstays of Vojvodina."},
 ],
 "regions": ["Vojvodina", "Šumadija and Central Serbia", "Eastern Serbia", "Southern Serbia"],
 "further_reading": ["Vinska karta Srbije (Wine map of Serbia)", "Wines of Serbia (serbia.travel/wine)"],
 "sources": SRC,
}

def R(name, lat, lon, z, tag, summ, hist, terr, gr, sty, cls, apps, alt=None):
    return region(I, name, lat, lon, z, tag, summ, hist, terr, gr, sty, cls, apps, SRC, alt=alt)

REGIONS = [
 R("Vojvodina", 45.20, 20.00, 7.6, "Fruška Gora's monasteries, Sremski Karlovci's Bermet and the Banat hills of Vršac.",
   """Vojvodina, the autonomous north, is flat Pannonian plain broken by two hill islands that hold its best vineyards. Fruška Gora is a 75 km ridge on the Danube's right bank above Novi Sad, covered with forest, sixteen Orthodox monasteries and vineyards on loess and marl; Sremski Karlovci, at its foot, is the historic wine town and the home of Bermet. In the Banat to the east, the Vršac hills are the only real elevation; Vršac's vineyards once covered about 10,000 ha and its cellar complex, built in 1968, was among the largest in Europe. The sands of Subotica-Horgoš and Deliblato and the lakeside of Palić complete the picture. Riesling, Graševina, Kreaca, Sremska Zelenika, Morava, Tamjanika, Frankovka and Bordeaux varieties dominate.""",
   """Habsburg rule from 1699 to 1918 brought German, Hungarian and Slovak settlers and Austrian wine culture; Sremski Karlovci was the Serbian Orthodox metropolitan seat and a wine-trading town. The Karlovci Gymnasium and the 1699 Treaty of Karlowitz were signed here.""",
   """Loess and marl on Fruška Gora; loess and schist at Vršac; sand dunes in the north and at Deliblato.""",
   """Graševina, Riesling, Sremska Zelenika, Morava, Kreaca, Tamjanika, Chardonnay, Sauvignon Blanc, Frankovka, Cabernet Sauvignon, Merlot.""",
   """Crisp whites, Bermet, reds from Fruška Gora's warmer slopes.""",
   """PGIs Srem, Fruška Gora, Banat, Southern Banat, Northern Banat, Banat-Tisa, Vršac, Bela Crkva, Deliblato Sands, Subotica-Horgoš Sands, Palić, Horgoš and others.""",
   ["Fruška Gora", "Srem", "Vršac", "Banat", "Southern Banat", "Palić", "Subotica-Horgoš Sands", "Deliblato Sands"]),
 R("Šumadija and Central Serbia", 44.10, 20.80, 7.4, "The rolling heart of Serbia: Oplenac's royal winery, Župa's Prokupac and the Morava valleys.",
   """Central Serbia is hilly, rural and continental. Šumadija ('forest land') around Topola, Aranđelovac and Kragujevac holds the King's Winery at Oplenac and estates such as Aleksandrović; to the south, the West Morava and Rasina valleys lead to Župa around Aleksandrovac, Serbia's self-styled wine capital, warm and sheltered, where Prokupac and Tamjanika thrive. Levač, Jagodina, Kruševac, Trstenik and Belgrade's own hills (Grocka, Kosmaj, Dubona) are other districts.""",
   """Medieval Serbia's monasteries (Studenica, Žiča, Ljubostinja) held vineyards; Topola was the seat of Karađorđe's First Serbian Uprising (1804) and the Karađorđević dynasty built its mausoleum and winery at Oplenac.""",
   """Clay, loess and limestone hills; continental climate with hot summers.""",
   """Prokupac, Tamjanika, Smederevka, Graševina, Chardonnay, Sauvignon Blanc, Cabernet Sauvignon, Merlot, Pinot Noir.""",
   """Prokupac and Tamjanika varietals, international reds and whites.""",
   """PGIs Šumadija-Velika Morava, Oplenac, Župa, Kruševac, Levač, Jagodina, Trstenik, Grocka, Kosmaj, Belgrade and others.""",
   ["Šumadija-Velika Morava", "Oplenac", "Župa", "Kruševac", "Levač", "Belgrade"]),
 R("Eastern Serbia", 44.00, 22.40, 7.6, "The Timok and Negotin Krajina: stone cellar villages, Bagrina and black Tamjanika near the Danube.",
   """Eastern Serbia covers the Timok valley and the Negotin Krajina by the Danube's Iron Gates and the Bulgarian and Romanian borders, plus Knjaževac, Zaječar and Bor. Its unique heritage is the *pivnice*: villages of stone cellars at Rajac, Rogljevo and Štubik, built apart from the homes, where families made and stored wine and stayed during the harvest. Bagrina, black Tamjanika and Gamay are local specialities; Matalj, Raj and Rajac Cellars are among the producers.""",
   """The pivnice date mostly from the 19th century; Negotin wine was exported to France during phylloxera. The Negotin Pivnice were placed on Serbia's UNESCO Tentative List in 2010.""",
   """Sandstone and limestone hills, warm continental climate tempered by the Danube.""",
   """Prokupac, Bagrina, Tamjanika (white and black), Gamay, Cabernet Sauvignon, Merlot, Riesling.""",
   """Reds, aromatic whites.""",
   """PGIs Negotin, Krajina, Rajac, Timok, Zaječar, Knjaževac, Bor, Boljevac, Mihajlovac, Ključ and others.""",
   ["Negotin", "Krajina", "Rajac", "Timok", "Knjaževac"]),
 R("Southern Serbia", 43.10, 21.80, 7.6, "Toplica and Niš: Prokupac's homeland in the warm south.",
   """Southern Serbia (Niš, Toplica, Leskovac, Vranje, Pirot) is the historic home of Prokupac, named after the town of Prokuplje in the Toplica valley. Warm summers ripen it to fuller, spicier wines than in the north. Niš's Matejevac hills, Toplica and Vranje are among the most active districts, with wineries such as Aleksić, Kovačević and Doja reviving the grape.""",
   """Niš (Roman Naissus), birthplace of Constantine the Great, had vineyards in antiquity; Prokuplje gave its name to the grape in the Middle Ages.""",
   """Hills of clay, schist and limestone; warm continental to sub-Mediterranean influence in the south.""",
   """Prokupac, Tamjanika, Smederevka, Vranac, Cabernet Sauvignon, Merlot.""",
   """Prokupac reds and rosé.""",
   """PGIs Toplica, Prokuplje, Niš, Nišava, Nišava-Južna Morava, Leskovac, Vranje, Pirot and others.""",
   ["Toplica", "Prokuplje", "Niš", "Vranje"]),
]

def A(name, match, region_, summ, **kw):
    kw.setdefault("created", "PGI (UK register 2021)")
    kw.setdefault("styles", ["red", "white"])
    return app(I, name, match, "PGI", region_, summ, **kw)

APPS = [
 A("Fruška Gora", ["Фрушкогорско / Fruska Gora", "Fruškogorsko", "Fruska Gora"], "Vojvodina",
   """Fruška Gora is a forested ridge on the right bank of the Danube opposite Novi Sad, rising to 539 m, with vineyards on its loess and marl slopes. Probus is credited with planting it in the 3rd century, and from the 16th century its sixteen Orthodox monasteries kept the vine alive. Sremski Karlovci, the old metropolitan seat at its eastern foot, is the wine capital and the home of Bermet. Today about 60 wineries work the ridge, making Graševina, Riesling, Sremska Zelenika, Morava, Chardonnay, Sauvignon Blanc and reds from Frankovka, Merlot and Cabernet. Leading names include Kovačević, Erdevik (whose cellar dates to 1826), Trivanović, Probus, Šijački and Živanović.""",
   dominant="white", grapes="Graševina, Riesling, Sremska Zelenika, Morava, Chardonnay, Sauvignon Blanc, Frankovka, Merlot, Cabernet Sauvignon",
   terroir="Loess and marl over Paleozoic schist; south-facing slopes 150 to 400 m; continental climate tempered by the Danube.",
   producers=["Kovačević", "Erdevik", "Trivanović", "Probus", "Živanović", "Šijački", "Deurić", "Vinum"], contains=["Sremski Karlovci"]),
 A("Srem", ["Сремски/Srem", "Sremski", "Srem"], "Vojvodina", """Srem is the broader PGI for the Syrmia region between the Danube and the Sava, including Fruška Gora and its plains. It is used for blends and for wines from the lower slopes.""", dominant="white", grapes="Graševina, Riesling, Chardonnay, Frankovka, Merlot"),
 A("Vršac", ["Вршачко/Vrsac", "Vršačko", "Vrsac"], "Vojvodina", """Vršac lies at the foot of the Vršac hills, the only real elevation of the Serbian Banat, near the Romanian border. In the 19th century its vineyards spread over about 10,000 ha; today about 2,000 ha remain, much of it once worked by the state company Vršački vinogradi, whose 1968 'New Cellar' with a capacity of about 20 million litres was one of the largest in Europe. Riesling (Italian, Banat and Rhine), Kreaca, Chardonnay and Frankovka grow on loess and schist; Gudurica's estates (Vinarija Selecta, Kreačić) and Vršac's family wineries are reviving quality.""",
   dominant="white", grapes="Graševina, Banat Riesling, Rhine Riesling, Kreaca, Chardonnay, Smederevka, Frankovka", producers=["Vršački vinogradi", "Selecta", "Nedin", "Kreačić"]),
 A("Banat", ["Банатски/Banat", "Banatski"], "Vojvodina", """Banat is the broad PGI for the Serbian part of the historic Banat region east of the Tisa, divided further into Southern Banat, Northern Banat and Banat-Tisa. It is mostly flat, with vineyards concentrated around Vršac and Bela Crkva.""", dominant="white", grapes="Graševina, Riesling, Kreaca, Smederevka, Frankovka"),
 A("Southern Banat", ["Јужнобанатски/Southern Banat", "Južnobanatski"], "Vojvodina", """Southern Banat covers the Vršac hills, Bela Crkva and the Deliblato sands down to the Danube; it is the most important part of the Serbian Banat for wine. Riesling, Kreaca and Frankovka from the Vršac hills are its best-known wines.""", dominant="white", grapes="Graševina, Riesling, Kreaca, Frankovka, Cabernet Sauvignon"),
 A("Palić", ["Палићко / Palic", "Palićko", "Palic"], "Vojvodina", """Palić, a resort lake near Subotica on the Hungarian border, grows vines on wind-blown sands that once kept phylloxera at bay. Zvonko Bogdan, the famous tamburica singer, built a 62 ha estate here; Vinarija Čoka and Dibonis are other producers.""",
   dominant="white", grapes="Riesling, Chardonnay, Sauvignon Blanc, Muscat, Kadarka, Frankovka, Cabernet Franc", producers=["Zvonko Bogdan", "Dibonis", "Čoka"]),
 A("Subotica-Horgoš Sands", ["Суботичко- хоргошка пешчара / Subotica-Horgos Sands", "Subotičko-horgoška peščara"], "Vojvodina", """The Subotica-Horgoš sands in the far north are a continuation of Hungary's Great Plain sand vineyards, planted on dunes that phylloxera could not penetrate. Light whites and Kadarka are traditional.""", dominant="white", grapes="Kadarka, Graševina, Riesling, Kövidinka"),
 A("Deliblato Sands", ["Делиблатска пешчара/Deliblato Sands", "Deliblatska peščara"], "Vojvodina", """Deliblato Sands, Europe's largest continental sand area, in the southern Banat, has vineyards on its edges planted, like Hungary's Kunság, on phylloxera-proof sand. The dunes, now a nature reserve, were stabilised with forest in the 19th century, and the vineyards on their fringes make light, fresh whites.""", dominant="white", grapes="Graševina, Smederevka, Kreaca, Frankovka"),
 A("Oplenac", ["Опленачки / Oplenac", "Oplenački"], "Šumadija and Central Serbia", """Oplenac is the hill above Topola where King Peter I built the white marble Church of St George and the Karađorđević mausoleum. His son, King Alexander I, built the King's Winery at its foot in 1931 on the French model, with two underground floors held at 8 °C and 99 oak casks of 2,000 litres, and planted over 50 ha with Traminer, Chardonnay, Gamay and Pinot Noir. The vineyards were neglected after 1945 and replanted in the 2000s; the first new harvest was in 2006. Aleksandrović's Trijumf, a nearby estate wine, follows a royal blend recipe from 1932.""",
   dominant="white", grapes="Traminer, Chardonnay, Sauvignon Blanc, Tamjanika, Pinot Noir, Gamay, Prokupac, Cabernet Sauvignon", producers=["Kraljevski podrumi (King's Winery)", "Aleksandrović"]),
 A("Šumadija-Velika Morava", ["Шумадијско- великоморавски / Sumadija-Velika Morava", "Šumadijsko-velikomoravski"], "Šumadija and Central Serbia", """Šumadija-Velika Morava is the broad PGI for the central Serbian heartland between the Sava, Danube and Velika Morava, around Topola, Kragujevac, Aranđelovac, Smederevo and Jagodina. It is the catch-all name for wines blended across the rolling, mixed-farming hills of the Serbian heartland.""", dominant="white", grapes="Smederevka, Tamjanika, Prokupac, Chardonnay, Cabernet Sauvignon"),
 A("Župa", ["Жупско/Zupa", "Župsko", "Zupa"], "Šumadija and Central Serbia", """Župa is a warm, sheltered valley around Aleksandrovac in the Rasina district, ringed by the Kopaonik, Goč and Jastrebac mountains, and Serbia's self-styled wine capital. Monastic charters record its vineyards in the Nemanjić era, and legend says Prince Lazar's army took communion with Župa wine before the 1389 Battle of Kosovo. Prokupac and Tamjanika are the stars. Aleksandrovac's Župska berba harvest festival has run every September since 1963, and the town has a museum of viticulture.""",
   dominant="red", grapes="Prokupac, Tamjanika, Smederevka, Graševina, Cabernet Sauvignon, Merlot", producers=["Budimir", "Ivanović", "Spasić", "Rubin (Kruševac)"]),
 A("Kruševac", ["Крушевачки/Krusevac", "Kruševački"], "Šumadija and Central Serbia", """Kruševac, Prince Lazar's medieval capital, is home to the Rubin company, once Yugoslavia's largest brandy and wine producer. The PGI covers the surrounding Rasina hills, which share the warm, sheltered conditions of neighbouring Župa and grow Prokupac and Tamjanika.""", dominant="red", grapes="Prokupac, Tamjanika, Smederevka, Vranac"),
 A("Levač", ["Левачко/Levac", "Levačko"], "Šumadija and Central Serbia", """Levač is a hilly district west of the Velika Morava near Rekovac, home to Lastar (founded 2013) and other new wineries reviving Prokupac and Tamjanika on the district's rolling clay hills.""", dominant="red", grapes="Prokupac, Tamjanika, Cabernet Sauvignon, Merlot", producers=["Lastar"]),
 A("Belgrade", ["Београдски/Belgrade", "Beogradski"], "Šumadija and Central Serbia", """The Belgrade PGI covers vineyards within the capital's territory, including Grocka on the Danube and the Kosmaj and Dubona hills to the south. Grocka's Danube slopes were among the capital's main vineyards before the city spread.""", grapes="Smederevka, Graševina, Cabernet Sauvignon, Merlot"),
 A("Negotin", ["Неготинско / Negotin", "Negotinsko"], "Eastern Serbia", """Negotin, in the Krajina by the Danube's Iron Gates near the Bulgarian and Romanian borders, is famous for its stone cellar villages (*pivnice*) at Rajac, Rogljevo and Štubik, on Serbia's UNESCO Tentative List since 2010. Its warm hills grow Prokupac, black Tamjanika, Gamay, Bagrina and Bordeaux varieties. During France's phylloxera crisis Negotin wine was sold to French merchants.""",
   dominant="red", grapes="Prokupac, Gamay, Crna Tamjanika, Bagrina, Cabernet Sauvignon, Merlot", producers=["Matalj", "Raj", "Rajačke pivnice"], contains=["Rajac pivnice", "Rogljevo pivnice"]),
 A("Rajac", ["Рајачко/Rajac", "Rajačko"], "Eastern Serbia", """Rajac is a village in the Negotin Krajina whose cellar settlement, about 2 km west on the Beli Breg hill, is the finest of the region's pivnice: a cluster of stone cellars with arched portals along winding lanes next to a 19th-century cemetery. The PGI covers its vineyards.""", dominant="red", grapes="Prokupac, Gamay, Tamjanika, Bagrina"),
 A("Krajina", ["Крајински/Krajina", "Krajinski"], "Eastern Serbia", """Krajina is the PGI for the wider Negotin Krajina along the Danube and Timok, framing Negotin, Rajac, Mihajlovac and Ključ. The Danube's Iron Gates gorge moderates the climate, and the area's stone cellar villages are unique in the Balkans.""", dominant="red", grapes="Prokupac, Gamay, Tamjanika, Bagrina"),
 A("Timok", ["Тимочки / Timok", "Timočki"], "Eastern Serbia", """Timok is the broad PGI for the Timok river valley in eastern Serbia, from Knjaževac through Zaječar to Negotin. Small family wineries around Knjaževac and Zaječar are reviving the area, and the late-Roman palace of Felix Romuliana near Zaječar is a reminder of the valley's ancient importance.""", dominant="red", grapes="Prokupac, Gamay, Tamjanika, Cabernet Sauvignon, Merlot"),
 A("Toplica", ["Топлички / Toplica", "Toplički"], "Southern Serbia", """Toplica, the valley of the Toplica river around Prokuplje, gave its name to Prokupac and remains the grape's heartland. Warm summers give fuller, spicier Prokupac than in the north, and growers here are leading the effort to make the grape a serious varietal wine rather than a blending component.""", dominant="red", grapes="Prokupac, Tamjanika, Smederevka, Cabernet Sauvignon"),
 A("Prokuplje", ["Прокупачко/Prokuplje", "Prokupačko"], "Southern Serbia", """Prokuplje, the medieval town that gave Prokupac its name, has its own PGI for the hills around the town in the Toplica valley. The town's name and the grape's are the same root, and Prokupac is still the dominant variety.""", dominant="red", grapes="Prokupac, Tamjanika"),
 A("Niš", ["Нишки / Nis", "Niški"], "Southern Serbia", """Niš, Roman Naissus and birthplace of Constantine the Great, has vineyards on the surrounding hills; Matejevac's slopes above the city are its best-known district, with a cellar row and a tradition of Prokupac and Tamjanika going back centuries.""", dominant="red", grapes="Prokupac, Tamjanika, Smederevka"),
 A("Vranje", ["Врањски/Vranje", "Vranjski"], "Southern Serbia", """Vranje, in the far south near North Macedonia, is a warm, hilly PGI where Aleksić and other wineries make Prokupac, Vranac and international reds. Aleksić, one of Serbia's most awarded wineries, produces about 450,000 litres a year.""", dominant="red", grapes="Prokupac, Vranac, Cabernet Sauvignon, Merlot, Tamjanika", producers=["Aleksić"]),
]
OTHERS = [
 ("Jagodina", "Јагодински/Jagodina", "Šumadija and Central Serbia", "Jagodina lies on the Velika Morava in central Serbia; its PGI covers the hills of the Pomoravlje district."),
 ("Jelica", "Јеличко/Jelica", "Šumadija and Central Serbia", "Jelica is a mountain near Čačak in western Serbia, with vineyards on its southern slopes."),
 ("Jovac", "Јовачко/Jovac", "Southern Serbia", "Jovac is a village near Vladičin Han in the Južna Morava valley in southern Serbia."),
 ("Ljubić", "Љубићко / Ljubic", "Šumadija and Central Serbia", "Ljubić is the hill district of Čačak in western Serbia, site of an 1815 battle of the Second Serbian Uprising."),
 ("Džervin", "Џервинско / Dzervin", "Vojvodina", "Džervin is a small PGI in Vojvodina near Novi Sad, named after a local vineyard area."),
 ("Aleksinac", "Алексиначки/Aleksinac", "Southern Serbia", "Aleksinac lies on the Južna Morava north of Niš; its hills grow Prokupac and Smederevka."),
 ("Babička gora", "Бабичко/Babicko", "Southern Serbia", "Babička gora is a mountain near Leskovac in southern Serbia with vineyards on its lower slopes."),
 ("Babušnica", "Бабушничко/Babusnica", "Southern Serbia", "Babušnica lies in the Lužnica valley near Pirot in south-eastern Serbia."),
 ("Banat-Tisa", "Банатско-потиско/Banat-Tisa", "Vojvodina", "Banat-Tisa covers the Banat plain along the Tisa river in northern Vojvodina."),
 ("Bela Palanka", "Белопаланачко/Bela Palanka", "Southern Serbia", "Bela Palanka lies on the Nišava between Niš and Pirot in south-eastern Serbia."),
 ("Bela Crkva", "Белоцркванско/Bela Crkva", "Vojvodina", "Bela Crkva, a lake town in the southern Banat near the Romanian border, has vineyards on the last hills of the Carpathian foreland."),
 ("Bor", "Борско/Bor", "Eastern Serbia", "Bor, a copper-mining town in eastern Serbia, has small vineyards in the surrounding Timok hills."),
 ("Boljevac", "Бољевачко/Boljevac", "Eastern Serbia", "Boljevac lies at the foot of Rtanj mountain in eastern Serbia's Crna Reka valley."),
 ("Braničevo", "Браничевско/Branicevo", "Šumadija and Central Serbia", "Braničevo covers the hills around Požarevac east of Belgrade, near the Danube and the Mlava."),
 ("Brza Palanka", "Брзопаланачко/Brza Palanka", "Eastern Serbia", "Brza Palanka is a Danube village below the Iron Gates in the Negotin Krajina."),
 ("Buštranje", "Буштрањско/Bustranje", "Southern Serbia", "Buštranje is a village in the Preševo valley in the far south of Serbia."),
 ("Venčac", "Венчачко/Vencac", "Šumadija and Central Serbia", "Venčac is a marble-quarry mountain near Aranđelovac in Šumadija with vineyards on its slopes."),
 ("Vinarce", "Винарачко/Vinarce", "Southern Serbia", "Vinarce, whose name comes from the word for wine, is a village near Leskovac in southern Serbia."),
 ("Vlasotince", "Власотиначко /Vlasotince", "Southern Serbia", "Vlasotince on the Vlasina river near Leskovac is an old Prokupac-growing town of southern Serbia."),
 ("Vrbica", "Врбичко/Vrbica", "Eastern Serbia", "Vrbica is a village near Zaječar in the Timok valley of eastern Serbia."),
 ("Vrtogoš", "Вртогошко/Vrtogos", "Southern Serbia", "Vrtogoš is a village near Vranje in southern Serbia."),
 ("Grocka", "Грочанско/Grocka", "Šumadija and Central Serbia", "Grocka is a Danube-side municipality of Belgrade, historically known for its vineyards and orchards."),
 ("Dobrić", "Добричко/Dobric", "Šumadija and Central Serbia", "Dobrić is a village near Šabac in the Mačva region of western Serbia."),
 ("Dubona", "Дубонско/Dubona", "Šumadija and Central Serbia", "Dubona is a village in Mladenovac, south of Belgrade, on the edge of Šumadija."),
 ("Žitkovac", "Житковачко/Zitkoac", "Southern Serbia", "Žitkovac is a village near Aleksinac on the Južna Morava."),
 ("Zapadna Morava", "Западноморавски/Zapadna Morava", "Šumadija and Central Serbia", "Zapadna Morava is the broad PGI for the West Morava valley from Čačak to Kruševac, including Župa and Trstenik."),
 ("Zaječar", "Зајечарско/Zajecar", "Eastern Serbia", "Zaječar is the main town of the Timok valley, near the late-Roman imperial palace of Felix Romuliana (Gamzigrad), a UNESCO site."),
 ("Kosmaj", "Космајско/Kosmaj", "Šumadija and Central Serbia", "Kosmaj is a wooded mountain south of Belgrade whose slopes hold vineyards around Sopot."),
 ("Kragujevac", "Крагујевачко/Kragujevac", "Šumadija and Central Serbia", "Kragujevac, Serbia's first modern capital (1818 to 1841), is the centre of Šumadija."),
 ("Ključ", "Кључко/Kljuc", "Eastern Serbia", "Ključ is the Danube-side district around Kladovo in the Negotin Krajina."),
 ("Knjaževac", "Књажевачки/Кnjazevac", "Eastern Serbia", "Knjaževac, on the upper Timok, has a revived wine scene led by family wineries."),
 ("Krnjevo", "Крњевачко/Krnjevo", "Šumadija and Central Serbia", "Krnjevo is a village near Velika Plana on the Velika Morava."),
 ("Kutina", "Кутинско/Kutin", "Southern Serbia", "Kutina is a district near Niška Banja, east of Niš."),
 ("Leskovac", "Лесковачки/Leskovac", "Southern Serbia", "Leskovac, in the Južna Morava valley, is a southern Serbian centre of Prokupac."),
 ("Matejevac", "Матејевачко / Matejevac", "Southern Serbia", "Matejevac, on the hills just north-east of Niš, is the city's historic vineyard quarter."),
 ("Mihajlovac", "Михајловачко / Mihajlovac", "Eastern Serbia", "Mihajlovac is a Danube village in the Negotin Krajina north of Negotin."),
 ("Mlava", "Млавски / Mlava", "Šumadija and Central Serbia", "Mlava covers the Mlava river valley around Požarevac and Petrovac; Virtus winery is based here."),
 ("Nišava", "Нишавски / Nisava", "Southern Serbia", "Nišava is the PGI for the Nišava river valley between Pirot and Niš."),
 ("Nišava-Južna Morava", "Нишавско- jужноморавски / Nisava-Juzna Morava", "Southern Serbia", "Nišava-Južna Morava is the broad PGI for south-eastern Serbia's river valleys."),
 ("Oreovica", "Ореовачко / Oreovica", "Šumadija and Central Serbia", "Oreovica is a village near Požarevac in the Braničevo district."),
 ("Paraćin", "Параћинско / Paracin", "Šumadija and Central Serbia", "Paraćin lies on the Velika Morava in central Serbia."),
 ("Pirot", "Пиротско / Pirot", "Southern Serbia", "Pirot, near the Bulgarian border, is better known for kilims and cheese, but has small vineyards in the Nišava valley."),
 ("Podgorina", "Подгорско/Podgorina", "Šumadija and Central Serbia", "Podgorina is a hilly district near Valjevo in western Serbia."),
 ("Cer", "Поцерски/Cer", "Šumadija and Central Serbia", "Cer is the mountain near Šabac in western Serbia, site of a 1914 Serbian victory, with vineyards on its slopes."),
 ("Pusta reka", "Пусторечко/Pusta reka", "Southern Serbia", "Pusta reka is a valley near Bojnik in the Jablanica district of southern Serbia."),
 ("Ražanj", "Ражањско/Razanj", "Southern Serbia", "Ražanj is a small municipality between Paraćin and Aleksinac."),
 ("Rasina", "Расинско/Rasina", "Šumadija and Central Serbia", "Rasina is the broad PGI for the Rasina district around Kruševac, including Župa."),
 ("Rača", "Рачанско/Raca", "Šumadija and Central Serbia", "Rača is a municipality in eastern Šumadija near Kragujevac."),
 ("Resava", "Ресавско/Resava", "Šumadija and Central Serbia", "Resava is the valley around Despotovac in central Serbia, near the 15th-century Manasija monastery."),
 ("Northern Banat", "Севернобанатски / Northern Banat", "Vojvodina", "Northern Banat covers the flat north-east of Vojvodina around Kikinda."),
 ("Sićevo", "Сићевачко / Sicevo", "Southern Serbia", "Sićevo lies at the mouth of the Sićevo gorge of the Nišava east of Niš, a historic vineyard area."),
 ("Smederevo", "Смедеревско / Smederevo", "Šumadija and Central Serbia", "Smederevo, the 15th-century Danube fortress capital of the Serbian Despotate, gave its name to the Smederevka grape."),
 ("Sokobanja", "Сокобањско / Sokobanja", "Eastern Serbia", "Sokobanja is a spa town in eastern Serbia with small hillside vineyards."),
 ("Surdulica", "Сурдуличко / Surdulica", "Southern Serbia", "Surdulica lies in the hills of the far south near the Vlasina plateau."),
 ("Tamnava", "Тамнавско / Tamnava", "Šumadija and Central Serbia", "Tamnava is a district in the Kolubara basin of western Serbia."),
 ("Temnić", "Темничко / Temnic", "Šumadija and Central Serbia", "Temnić is the area around Varvarin at the confluence of the West and South Morava."),
 ("Trstenik", "Трстеничко / Trstenik", "Šumadija and Central Serbia", "Trstenik on the West Morava is near the medieval Ljubostinja monastery, with vineyards on both sides of the valley."),
 ("Horgoš", "Хоргошко / Horgos", "Vojvodina", "Horgoš is a village on the Hungarian border north of Kanjiža, on the edge of the northern sands."),
 ("Čačak", "Чачански / Cacak", "Šumadija and Central Serbia", "Čačak, in the West Morava valley, is the centre of a hilly district of vineyards and plum orchards."),
]
for nm, cyr, reg, txt in OTHERS:
    if cyr is None:
        continue
    APPS.append(A(nm, [cyr], reg, txt + " Like most of Serbia's 81 wine geographical indications, it is protected under the 2021 UK-Serbia trade agreement and corresponds to a district of the national zoning; few producers use the name on labels so far."))

SITES = [
 site(I, "sremski-karlovci", "Sremski Karlovci", "village", 45.2030, 19.9338, "This baroque town at the foot of Fruška Gora was the seat of the Serbian Orthodox metropolitans and the place where the 1699 Treaty of Karlowitz was signed. It is the home of Bermet, a dessert wine flavoured with about 20 herbs and spices, made only by a few families.", "approx", "Wine town", "Fruška Gora"),
 site(I, "zivanovic", "Živanović winery and Beekeeping Museum", "estate", 45.1991, 19.9406, "The Živanović family's 300-year-old cellar in Sremski Karlovci makes Bermet, said to have been stocked on the Titanic in 1912. The family also runs Serbia's only private beekeeping museum, honouring Jovan Živanović, a pioneer of modern beekeeping.", "precise", "Family winery and museum", "Fruška Gora", ["Živanović"]),
 site(I, "oplenac", "King's Winery, Oplenac", "historic", 44.2469, 20.6841, "King Alexander I built this winery at the foot of Oplenac hill in Topola in 1931. It has two underground floors kept at 8 °C and 99 oak casks. A barrel of over 4,000 litres from King Peter I's first winery of 1909 survives. Replanted vineyards gave their first harvest in 2006.", "approx", "Royal winery", "Oplenac", ["Kraljevski podrumi"]),
 site(I, "rajac-pivnice", "Rajac pivnice", "cellar", 44.0942, 22.5564, "The cellar settlement of Rajac stands about 2 km west of the village on Beli Breg hill. Stone cellars with arched portals line winding lanes beside a cemetery of about 200 19th-century tombstones. It is part of the Negotin Pivnice on Serbia's UNESCO Tentative List.", "approx", "UNESCO Tentative List (2010)", "Rajac"),
 site(I, "rogljevo-pivnice", "Rogljevo pivnice", "cellar", 44.1164, 22.5736, "On a hill north of Rajac, Rogljevo's cellar village has about 122 structures along two parallel roads. About 40 are still used for wine and some as taverns. Forty cellars were built between 1859 and 1890.", "precise", "UNESCO Tentative List (2010)", "Negotin"),
 site(I, "vrsac-vinogradi", "Vršački vinogradi", "estate", 45.1197, 21.2985, "The Vršac wine company's headquarters on Svetosavski trg and its 1968 'New Cellar', with a capacity of 2,000 wagons (about 20 million litres), once among the largest in Europe, anchor the Banat's wine history.", "approx", "Historic winery", "Vršac", ["Vršački vinogradi"]),
 site(I, "aleksandrovac", "Aleksandrovac", "village", 43.4586, 21.0466, "Aleksandrovac in the Župa valley calls itself Serbia's wine capital. It has held the Župska berba harvest festival each September since 1963 and has a museum of viticulture and winemaking. Prokupac and Tamjanika are its grapes.", "approx", "Wine town", "Župa"),
 site(I, "gudurica", "Gudurica", "village", 45.1665, 21.4435, "Gudurica, about 25 km east of Vršac, was a German-speaking village (Kudritz) and is now the centre of the Vršac hills' boutique wineries. Its slopes on the eastern edge of the Vršac hills catch more rain and cooler air than the town's vineyards.", "approx", "Wine village", "Vršac"),
]
write(I, {"countries": [COUNTRY], "regions": REGIONS, "appellations": APPS, "sites": SITES})
