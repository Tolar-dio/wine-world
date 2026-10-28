import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c8")
from common import app

I = "hu"
APPS = [
app(I, "Tokaj", ["Tokaj / Tokaji", "Tokaji", "Tokaj-Hegyalja", "Tokaji borvidék"], "OEM", "Tokaj",
    """Tokaj is the one Hungarian appellation every wine lover knows, and one of the handful of sweet-wine regions in the world with genuine claim to greatness. It covers 27 settlements in the volcanic Zemplén foothills, from Abaújszántó and Monok in the west to Sátoraljaújhely in the north-east and Tokaj town at the confluence of the Bodrog and Tisza in the south. The official list in the current specification is: Abaújszántó, Bekecs, Bodrogkeresztúr, Bodrogkisfalud, Bodrogolaszi, Erdőbénye, Erdőhorváti, Golop, Hercegkút, Legyesbénye, Makkoshotyka, Mád, Mezőzombor, Monok, Olaszliszka, Rátka, Sárazsadány, Sárospatak, Sátoraljaújhely, Szegi, Szegilong, Szerencs, Tarcal, Tállya, Tokaj, Tolcsva and Vámosújfalu. (Ond, often listed separately, is now part of Szerencs.) Only vineyard land rated Class I or II in the cadastre counts.

What makes Tokaj special is the meeting of a late-ripening, high-acid grape (Furmint), a volcanic soil that gives the wine a smoky, saline grip, and a river microclimate that brings noble rot most autumns. The result is a family of wines unlike anything else: Eszencia, the near-unfermented nectar of aszú berries; Aszú, botrytised berries steeped in base wine, at least 120 g/l of sugar and 18 months in cask; Szamorodni, dry and nutty under flor or sweet; the rare Fordítás and Máslás; late harvest wines; and, since the 1990s, a fast-growing body of dry Furmint and Hárslevelű, often from named vineyards. Great Aszú tastes of apricot, orange peel, quince, honey, tea and walnut, with an acidity that keeps it fresh for a century.

The appellation is also one of the oldest legally protected wine regions in the world. Vineyards were ranked into classes between the 1720s and 1772, and a royal decree of 1737 limited the Tokaji name to defined towns and made new planting subject to permission. The landscape (cellars, villages, hills) has been a UNESCO World Heritage site since 2002.""",
    created="1737 (royal decree); EU PDO 1993 / registered 2006", area_ha=5500,
    styles=["white", "sweet", "sparkling"], dominant="sweet",
    grapes="Furmint, Hárslevelű, Sárgamuskotály, Kövérszőlő, Zéta, Kabar",
    terroir="""Rhyolite, andesite and dacite with tuff layers, weathered to red *nyirok* clay or white kaolinitic soils; quartzite caps on some hills; loess on about 5% of the area (southern Tokaj hill around Tarcal and Tokaj). South-facing slopes of 120 to 300 m. Continental climate with long warm autumns; morning mists from the Bodrog and Tisza drive botrytis. Rock-cut cellars at 10 to 12 °C with walls furred in black cellar mould.""",
    producers=["Szepsy", "Royal Tokaji", "Disznókő", "Oremus", "Királyudvar", "Dobogó", "Barta", "Samuel Tinon", "Demeter Zoltán", "Pajzos-Megyer", "Tokaj-Hétszőlő", "Patricius", "Grand Tokaj", "Kikelet", "Árvay", "Holdvölgy", "Szent Tamás Pincészet", "Gizella", "Bott Pince", "Pendits", "Béres"],
    nerd="The modern 'puttonyos' label is only a hint: since 2013 every Aszú must have at least 120 g/l of sugar, '6 puttonyos' needs 150 g/l, and wines below 120 g/l can no longer be called Aszú at all. Old bottles labelled 3 or 4 puttonyos are pre-reform.",
    contains=["Mézes Mály", "Szarvas", "Szent Tamás", "Úrágya", "Betsek", "Király", "Nyulászó", "Birsalmás", "Hétszőlő", "Lapis", "Oremus", "Disznókő"]),

app(I, "Eger", ["Eger / Egri", "Egri"], "OEM", "Upper Hungary",
    """Eger is the baroque town of castles, minarets and cellar valleys at the foot of the Bükk hills, and its wine district is Hungary's most famous red-wine name after Villány. Its emblem is Egri Bikavér ('Bull's Blood of Eger'), a blend of at least three (Classicus) or four (Superior) red varieties dominated by Kékfrankos, with Kadarka, Pinot Noir, Merlot, Cabernet Franc and Syrah in support; no single grape may dominate too heavily. The name rests on the legend of the 1552 siege, when István Dobó's defenders supposedly frightened the Ottomans with red-stained beards. In Communist times Bikavér became a cheap export brand; today's good versions are spicy, medium-bodied, cherry-fruited and fresh rather than heavy.

Since 2010 Eger has built a white counterpart, Egri Csillag ('Star of Eger'), a blend led by aromatic varieties such as Leányka, Királyleányka, Olaszrizling, Hárslevelű and Furmint. Both blends follow a pyramid of Classicus, Superior and Grand Superior with stricter yields, mapped vineyards and longer ageing at the top. The district's 19 settlements include Eger, Andornaktálya, Demjén, Egerszalók, Felsőtárkány, Noszvaj and Ostoros; Pinot Noir from the Nagy-Eged hill is the region's other claim to fame.""",
    created="EU PDO 2006", styles=["red", "white", "rose"], dominant="red",
    grapes="Kékfrankos, Kadarka, Pinot Noir, Merlot, Cabernet Franc, Syrah; whites Leányka, Királyleányka, Olaszrizling, Hárslevelű, Furmint",
    terroir="Rhyolite tuff (soft enough to carve the Szépasszony-völgy cellars), andesite, clay and some limestone on south-facing foothills; cooler than southern Hungary, so later harvests and higher acidity.",
    producers=["St. Andrea", "Thummerer", "Gál Tibor", "Bolyki", "Kovács Nimród", "Demeter Csaba", "Grónász", "Juhász Testvérek"],
    nerd="Nagy-Eged hill above Eger reaches about 535 m with very steep south slopes; its Pinot Noir and Kékfrankos are among the most structured reds in northern Hungary.",
    contains=["Nagy-Eged", "Szépasszony-völgy"]),

app(I, "Villány", ["Villány / Villányi", "Villányi", "Villány-Siklós"], "OEM", "Pannon",
    """Villány is Hungary's southernmost and warmest hill district, a 25 km strip along the southern face of the limestone Villány hills close to the Croatian border. Seventeen settlements belong to it, led by Villány, Villánykövesd, Palkonya, Nagyharsány and Siklós. After the Ottoman wars it was resettled by German 'Swabian' families, and their descendants (Bock, Gere, Tiffán, Polgár, Wunderlich, Heumann) built the cellar rows of Villány and Villánykövesd and led Hungary's first post-Communist quality revival. The district introduced Hungary's first origin-control system and the DHC (*Districtus Hungaricus Controllatus*) label term.

The wines are full-bodied, ripe reds. Portugieser (Kékoportó) was the old local grape for early-drinking wine; Bordeaux varieties took over after phylloxera and especially after 1990. Cabernet Franc proved the best fit, and in 2015 the growers created the Villányi Franc category, a premium Franc with strict yield, ageing and tasting rules. A quality pyramid of Classicus, Prémium and Villányi Franc, with single-vineyard wines from sites such as Kopár, Jammertal, Ördögárok and Konkoly, sits on top. Merlot, Cabernet Sauvignon, Kékfrankos and Kadarka make up much of the rest, and Siklós, on the southern side, is known for whites.""",
    created="EU PDO 2006", styles=["red", "rose", "white"], dominant="red",
    grapes="Cabernet Franc, Cabernet Sauvignon, Merlot, Portugieser, Kékfrankos, Kadarka, Pinot Noir; whites Olaszrizling, Hárslevelű, Chardonnay",
    terroir="Jurassic and Triassic limestone and dolomite under loess and red clay; sheltered south-facing slopes; sub-Mediterranean influence with hot summers and the highest sunshine hours in Hungary.",
    producers=["Bock", "Gere Attila", "Tiffán", "Sauska", "Vylyan", "Heumann", "Malatinszky", "Wunderlich", "Polgár", "Riczu"],
    nerd="Zsigmond Teleki, born in Villány in 1854, established an experimental rootstock nursery there in 1881; his Berlandieri x Riparia seedlings were the source of rootstocks such as Kober 5BB and SO4, planted across Europe after phylloxera.",
    contains=["Kopár", "Jammertal", "Villány cellar row"]),

app(I, "Szekszárd", ["Szekszárd / Szekszárdi", "Szekszárdi"], "OEM", "Pannon",
    """Szekszárd sits on a block of deep loess hills above the Danube floodplain, about 150 km south of Budapest, with 15 settlements around the county town. The loess, in places tens of metres thick and cut into sunken lanes, gives the country's silkiest, most fragrant reds. The district's heritage grape is Kadarka, brought by Serbian settlers after the Ottoman era, which once made Szekszárd famous across the Habsburg lands. Phylloxera and Communist-era replanting replaced most of it with Kékfrankos and Bordeaux varieties, but growers such as Heimann and Takler have revived old Kadarka clones.

Szekszárdi Bikavér, a blend with a minimum share of Kadarka and led by Kékfrankos, is the district's answer to Eger and has strict local rules. Bordeaux blends, Merlot and Cabernet Franc can be excellent, and the loess makes softer, rounder versions than Villány's limestone. The district was home to the poet Mihály Babits and to some of Hungary's most respected family estates.""",
    created="EU PDO 2006", styles=["red", "rose", "white"], dominant="red",
    grapes="Kadarka, Kékfrankos, Merlot, Cabernet Franc, Cabernet Sauvignon, Pinot Noir; Olaszrizling, Chardonnay",
    terroir="Thick Pleistocene loess over red clay (*vörösagyag*) and some limestone; deep sunken lanes (*löszmélyutak*); warm, sunny and fairly dry.",
    producers=["Heimann & Fiai", "Takler", "Vesztergombi", "Eszterbauer", "Sebestyén", "Mészáros", "Dúzsi", "Bodri"],
    nerd="Heimann's Kadarka comes from a project that collected and replanted dozens of old Kadarka clones from local vineyards, rescuing the genetic diversity that commercial clones had lost.",
    contains=[]),

app(I, "Somlói", ["Somlói / Somló", "Somló"], "OEM", "Balaton",
    """Somló is a single extinct volcano, a basalt butte rising 432 m out of the flat Kisalföld, and the smallest of Hungary's districts (about 300 to 400 ha in five settlements: Somlóvásárhely, Somlójenő, Somlószőlős, Doba and Borszörcsök). Its wines are among the most distinctive whites in Europe: dense, smoky, saline and austere in youth, built for years in bottle. The PDO allows only white grapes, led by Juhfark ('sheep's tail', after its long cylindrical bunches), Olaszrizling, Furmint, Hárslevelű and Tramini.

Somló's legend is that its wine guarantees a male heir. The Habsburg court is said to have served it on wedding nights, and the 'wedding night wine' story is still told at every cellar door. In the 19th century the Benedictine and Ursuline orders and noble families owned plots, and their small stone press houses still dot the slopes beneath the ruined castle. Today the hill is split among dozens of tiny growers; Kreinbacher's traditional-method sparkling wines are the most visible modern success.""",
    created="EU PDO 2006", area_ha=400, styles=["white", "sparkling"], dominant="white",
    grapes="Juhfark, Olaszrizling, Furmint, Hárslevelű, Tramini",
    terroir="Basalt cap and basalt tuff over Pannonian sand and clay; steep south and south-west slopes around a solitary hill that catches heat and wind on a flat plain.",
    producers=["Kreinbacher", "Fekete Béla", "Kolonics", "Somlói Vándor", "Tornai", "Royal Somló", "Spiegelberg", "Meinklang (Somló)"],
    nerd="Béla Fekete's Juhfark and Hárslevelű, aged in large old casks and released with years of age, showed how slowly the hill's wines evolve.",
    contains=["Somló hill"]),

app(I, "Nagy-Somló", ["Nagy-Somló / Nagy-Somlói", "Nagy-Somlói"], "OEM", "Balaton",
    """Nagy-Somló ('Greater Somló') is the broader district PDO around Somló hill, adding five settlements to the five of Somló proper, including Celldömölk at the foot of the Ság hill and Kissomlyó. It permits a wider range of white varieties (Chardonnay, Rajnai rizling, Szürkebarát, Cserszegi fűszeres and others) and higher yields than the strict Somlói PDO, and it is used mainly for simpler whites from the volcanic satellites of the main hill.""",
    created="EU PDO 2007", styles=["white"], dominant="white",
    grapes="Olaszrizling, Furmint, Hárslevelű, Chardonnay, Rajnai rizling, Szürkebarát and others"),

app(I, "Badacsony", ["Badacsony / Badacsonyi", "Badacsonyi"], "OEM", "Balaton",
    """Badacsony is the district of the basalt 'witness hills' on the north-west shore of Lake Balaton: Badacsony itself (437 m), with its columnar basalt 'organ pipes', plus Szent György-hegy, Gulács, Tóti-hegy and Csobánc. Sixteen settlements share it. The lake reflects light and heat onto the slopes and the basalt and tuff soils give whites of real density and smoky minerality. Olaszrizling and Szürkebarát (Pinot Gris) dominate; Badacsony is also the last real home of Kéknyelű, an old variety with functionally female flowers that has to be interplanted with a pollinator such as Budai zöld, and which the Badacsony research station saved from near extinction.""",
    created="EU PDO 2006", styles=["white"], dominant="white",
    grapes="Olaszrizling, Szürkebarát, Kéknyelű, Furmint, Rajnai rizling, Budai, Hárslevelű",
    terroir="Basalt caps, basalt tuff and Pannonian sand on steep south-facing slopes above the lake.",
    producers=["Szeremley", "Laposa", "Villa Tolnay", "Sabar", "Istvándy", "Borbély", "Szent György-hegy growers", "Gilvesy"],
    nerd="The poet Sándor Kisfaludy's 18th-century press house on Badacsony is now a restaurant; the 'Rózsakő' stone above it is the legendary meeting place of local lovers.",
    contains=["Badacsony hill", "Szent György-hegy"]),

app(I, "Balaton-felvidék", ["Balaton-felvidék / Balaton-felvidéki", "Balaton-felvidéki"], "OEM", "Balaton",
    """The Balaton Uplands district stretches across the hills north and west of Lake Balaton, from Cserszegtomaj and Gyenesdiás near Keszthely to Sümeg and the Káli basin (23 settlements). It mixes volcanic, limestone and sandstone soils and makes mostly fresh dry whites: Olaszrizling, Szürkebarát, Rajnai rizling and the aromatic Cserszegi fűszeres, which was bred at nearby Keszthely and named after Cserszegtomaj.""",
    created="EU PDO 2006", styles=["white", "rose", "red"], dominant="white",
    grapes="Olaszrizling, Szürkebarát, Cserszegi fűszeres, Rajnai rizling, Chardonnay, Sauvignon Blanc"),

app(I, "Káli", ["Káli"], "OEM", "Balaton",
    """The Káli basin is a small enclosed valley behind Badacsony, ringed by basalt hills and littered with sandstone 'stone seas' (*kőtenger*). Its PDO (2009) covers eight villages such as Köveskál, Kővágóörs, Szentbékkálla and Salföld and allows a long list of varieties. It has become a magnet for Budapest weekenders and small natural-leaning growers who make textured whites from Olaszrizling, Furmint and Kéknyelű.""",
    created="EU PDO 2009", styles=["white", "red", "rose"], dominant="white",
    grapes="Olaszrizling, Furmint, Kéknyelű, Juhfark, Szürkebarát, Kékfrankos and others"),

app(I, "Balatonfüred-Csopak", ["Balatonfüred-Csopak / Balatonfüred-Csopaki", "Balatonfüred-Csopaki"], "OEM", "Balaton",
    """This district lines the north-east shore of Lake Balaton from Balatonalmádi through Csopak and Balatonfüred to Zánka, 27 settlements in all, including the Tihany peninsula. Its signature is the red Permian sandstone and slate that colours the soil around Csopak, Paloznak and Lovas, which gives taut, salty Olaszrizling. Balatonfüred, the spa town where Hungary's first Anna Ball was held, adds limestone and marl. In recent years the growers have split off narrower PDOs (Csopak in 2020, Füred in 2025) to promote stricter, terroir-based wines.""",
    created="EU PDO 2006", styles=["white", "red", "rose"], dominant="white",
    grapes="Olaszrizling, Rajnai rizling, Furmint, Chardonnay, Szürkebarát, Merlot, Cabernet",
    producers=["Jásdi", "Figula", "Szent Donát", "Homola", "Feind", "Tamás Pince"]),

app(I, "Csopak", ["Csopak / Csopaki", "Csopaki"], "OEM", "Balaton",
    """Csopak is a narrow PDO (2020) covering five villages on the north-east shore of Balaton (Csopak, Alsóörs, Felsőörs, Lovas, Paloznak) and only two grapes, Olaszrizling and Furmint, with a maximum of 9 t/ha. It grew out of the 'Csopak Codex', a voluntary charter signed by local growers in 2012 to raise Olaszrizling to a terroir wine. The red Permian sandstone and slate soils give firm, saline, almond-scented whites that age well, and producers such as Jásdi and Szent Donát label them by named vineyards.""",
    created="EU PDO 2020", styles=["white"], dominant="white", grapes="Olaszrizling, Furmint",
    producers=["Jásdi", "Szent Donát", "Figula", "Homola", "Tamás Pince"],
    nerd="Csopak's red earth is Permian sandstone, about 270 million years old, the same 'red bed' rock that colours the nearby village of Alsóörs."),

app(I, "Füred", ["Füred", "Füred / Füredi", "Füredi"], "OEM", "Balaton",
    """Füred is a new village-level PDO, listed in the EU register in November 2025, for wines from Balatonfüred and neighbouring communities on the north shore of Lake Balaton. The European Commission's summary describes dry, fresh wines of medium intensity with crisp acidity. Like Csopak before it, it sits inside the larger Balatonfüred-Csopak district and is meant to give the historic spa town's growers a tighter, more site-focused label.""",
    created="EU PDO 2025", styles=["white"], dominant="white", grapes="Mainly white varieties (Olaszrizling and others)",
    nerd="Balatonfüred has held its Anna Ball every July since 1825, one of the oldest society balls in Hungary."),

app(I, "Tihany", ["Tihany / Tihanyi", "Tihanyi"], "OEM", "Balaton",
    """Tihany is a single-commune PDO on the volcanic peninsula that almost cuts Lake Balaton in two, crowned by the Benedictine abbey founded in 1055. Unusually for the north shore, the PDO is red-only: Kékfrankos, Pinot Noir, Merlot, Cabernet Franc, Cabernet Sauvignon, Syrah, Zweigelt and Portugieser, at no more than 55 hl/ha. The peninsula's geyser cones, basalt tuff and warm microclimate ripen red grapes reliably, and the abbey's 11th-century charter is among the first documents to mention vineyards in Hungary.""",
    created="EU PDO 2009", styles=["red", "rose"], dominant="red",
    grapes="Kékfrankos, Pinot Noir, Merlot, Cabernet Franc, Cabernet Sauvignon, Syrah, Zweigelt, Portugieser",
    nerd="The Tihany abbey's 1055 founding charter, written in Latin, contains the oldest surviving sentence fragment in Hungarian."),

app(I, "Balatonboglár", ["Balatonboglár / Balatonboglári", "Balatonboglári", "Dél-Balaton"], "OEM", "Balaton",
    """Balatonboglár covers the south shore of Lake Balaton and its hinterland (42 settlements in Somogy county). The soils are loess and sand, flatter and warmer than the north shore, and the wines are fruit-forward: aromatic whites, rosé, approachable reds and a great deal of sparkling wine, since the Balatonboglár winery (now Törley-owned) is a major sparkling producer. Ikon, Garamvári and Kristinus are among the estates.""",
    created="EU PDO 2006", styles=["white", "rose", "red", "sparkling"], dominant="white",
    grapes="Chardonnay, Olaszrizling, Irsai Olivér, Muscat Ottonel, Pinot Noir, Kékfrankos, Merlot, Cabernet"),

app(I, "Zala", ["Zala / Zalai", "Zalai"], "OEM", "Balaton",
    """Zala is the westernmost Balaton district, spread over the hills of Zala county towards the Slovenian and Croatian borders (37 settlements). It is wetter and cooler than the lake shore, with loamy, sometimes sandy soils, and makes light whites (Olaszrizling, Tramini, Rajnai rizling, Zöld veltelini) plus sparkling base wine.""",
    created="EU PDO 2007", styles=["white", "sparkling"], dominant="white",
    grapes="Olaszrizling, Tramini, Rajnai rizling, Zöld veltelini, Chardonnay, Sauvignon Blanc"),

app(I, "Balaton", ["Balaton / Balatoni", "Balatoni"], "OEM", "Balaton",
    """Balaton is the regional umbrella PDO covering the six Balaton districts (about 155 settlements). Producers use it to blend across districts or for simpler wines; the more specific district and village names carry the prestige.""",
    created="EU PDO 2006", styles=["white", "red", "rose", "sparkling"], dominant="white",
    grapes="Olaszrizling and a wide range of permitted varieties"),

app(I, "Mátra", ["Mátra / Mátrai", "Mátrai"], "OEM", "Upper Hungary",
    """Mátra is Hungary's second-largest hill district, on the southern foothills of the Mátra mountains (Hungary's highest, peaking at Kékes, 1,014 m) around Gyöngyös, Abasár, Gyöngyöspata and Domoszló (36 settlements). Andesite and andesite tuff give fresh, aromatic whites (Olaszrizling, Chardonnay, Sauvignon Blanc, Muscat, Tramini, Zöld veltelini), and the cool slopes are increasingly used for Kékfrankos and Pinot Noir. Historically it fed Budapest's taverns; now growers such as Nagygombos, Szőke Mátyás and Benedek are building individual reputations.""",
    created="EU PDO 2006", styles=["white", "red", "rose"], dominant="white",
    grapes="Olaszrizling, Chardonnay, Sauvignon Blanc, Muscat Ottonel, Tramini, Zöld veltelini, Kékfrankos, Pinot Noir"),

app(I, "Debrői Hárslevelű", ["Debrői Hárslevelű"], "OEM", "Upper Hungary",
    """Debrő, at the eastern foot of the Mátra around Aldebrő, Feldebrő and Verpelét, has been known for Hárslevelű for centuries, and the village name is fused with the grape in this PDO (2007). The wines are soft, perfumed and honeyed, often with a touch of sweetness. The Feldebrő church crypt, with 11th-century frescoes, is one of the oldest in Hungary.""",
    created="EU PDO 2007", styles=["white"], dominant="white", grapes="Hárslevelű (plus permitted whites)"),

app(I, "Bükk", ["Bükk / Bükki", "Bükki"], "OEM", "Upper Hungary",
    """Bükk is a small, cool district on the south-east slopes of the Bükk mountains near Miskolc, with 24 settlements including Bogács and Tibolddaróc, whose cellar villages are carved into rhyolite tuff. Olaszrizling, Leányka and Királyleányka make crisp whites; reds are light.""",
    created="EU PDO 2007", styles=["white", "red", "rose"], dominant="white",
    grapes="Olaszrizling, Leányka, Királyleányka, Chardonnay, Kékfrankos, Zweigelt"),

app(I, "Sopron", ["Sopron / Soproni", "Soproni"], "OEM", "Northern Pannonia",
    """Sopron, hugging the Austrian border on the south-west shore of Lake Fertő (Neusiedlersee), is Hungary's Kékfrankos country: about 60 percent of its vineyards are planted to it. It is the Hungarian continuation of Burgenland, and its wines (crunchy, spicy, sour-cherry reds) resemble those across the border. The town's Swabian growers (*poncichter*, from the German 'Bohnenzüchter', bean-growers, for the beans they grew between vine rows) kept the tradition alive. Franz Weninger's biodynamic estate at Balf and Ráspi in Fertőrákos are leading names; the district covers 18 settlements, extending south to Kőszeg's hills.""",
    created="EU PDO 2006", styles=["red", "white", "sparkling"], dominant="red",
    grapes="Kékfrankos, Zweigelt, Cabernet Sauvignon, Merlot, Pinot Noir; Zöld veltelini, Tramini, Sauvignon Blanc",
    producers=["Weninger", "Ráspi", "Pfneiszl", "Taschner", "Luka"],
    nerd="The Fertőrákos limestone quarry, worked since Roman times, is part of the Fertő/Neusiedlersee UNESCO landscape; the same Leitha limestone underlies some of Sopron's best Kékfrankos."),

app(I, "Kőszeg", ["Kőszeg", "Kőszeg / Kőszegi", "Kőszegi"], "OEM", "Northern Pannonia",
    """Kőszeg, a small walled town under the Alps' last foothills on the Austrian border, gained its own wine PDO in July 2025; the European Commission called it one of the oldest wine areas in Hungary. Its most famous custom is the *Szőlőjövés Könyve* (Book of the Coming of the Grapes): every year since 1740, on St George's Day (24 April), the length of the young vine shoots has been drawn into a town ledger, a unique 280-year phenological record.""",
    created="EU PDO 2025", styles=["white", "red"], dominant="white",
    grapes="Cool-climate whites and Kékfrankos (details in the 2025 specification)",
    nerd="The Book of the Coming of the Grapes is one of the longest continuous records of vine budbreak in Europe, now used by climate researchers."),

app(I, "Pannonhalma", ["Pannonhalma / Pannonhalmi", "Pannonhalmi"], "OEM", "Northern Pannonia",
    """Pannonhalma is the district below the Benedictine Archabbey of Pannonhalma, founded in 996 and a UNESCO site. The monks have made wine here for over a thousand years; the abbey's modern winery, rebuilt in 2003, makes precise whites (Rajnai rizling, Sauvignon Blanc, Tramini, Olaszrizling) and Pinot Noir from cool, windy slopes. Sixteen settlements around Győr belong to the district.""",
    created="EU PDO 2006", styles=["white", "red"], dominant="white",
    grapes="Rajnai rizling, Olaszrizling, Sauvignon Blanc, Tramini, Chardonnay, Pinot Noir",
    producers=["Pannonhalmi Apátsági Pincészet", "Cziráki", "Babarczi"]),

app(I, "Mór", ["Mór / Móri", "Móri"], "OEM", "Northern Pannonia",
    """Mór, between the Vértes and Bakony hills, is the smallest Northern Pannonian district (six settlements) and the home of Ezerjó, a sharp, lean white once made both dry and as a botrytised sweet wine. Swabian settlers rebuilt the vineyards after the Ottoman wars; the 1956 'Ezerjó' tradition and a few dedicated growers keep the grape alive today.""",
    created="EU PDO 2006", styles=["white"], dominant="white", grapes="Ezerjó, Tramini, Rajnai rizling, Chardonnay, Leányka"),

app(I, "Neszmély", ["Neszmély / Neszmélyi", "Neszmélyi"], "OEM", "Northern Pannonia",
    """Neszmély runs along the south bank of the Danube between Komárom and Esztergom (27 settlements). It is a cool, breezy white-wine district best known for the large modern Hilltop Neszmély winery, which pioneered clean, fruit-driven Hungarian whites for export in the 1990s. Sauvignon Blanc, Irsai Olivér, Chardonnay and Cserszegi fűszeres lead.""",
    created="EU PDO 2006", styles=["white", "sparkling"], dominant="white",
    grapes="Sauvignon Blanc, Irsai Olivér, Chardonnay, Olaszrizling, Cserszegi fűszeres"),

app(I, "Etyek-Buda", ["Etyek-Buda / Etyek-Budai", "Etyek-Budai"], "OEM", "Northern Pannonia",
    """Etyek-Buda covers the limestone plateau west of Budapest (Etyek, Bicske, Velence) plus the Buda hills and the capital's Budafok district. Its product specification describes lime-rich brown forest soils on limestone, average temperatures of 9.5 to 10.5 °C and constant north-westerly winds: ideal for crisp whites and sparkling base wine. József Törley founded his champagne-method house at Budafok in 1882, and by the early 1910s the area made about two million bottles a year. Today Etyek is Budapest's weekend wine village, with Chardonnay, Sauvignon Blanc, Pinot Noir and Királyleányka from producers such as Etyeki Kúria, Haraszthy and Nyakas.""",
    created="EU PDO 2006", styles=["white", "sparkling", "rose", "red"], dominant="white",
    grapes="Chardonnay, Sauvignon Blanc, Olaszrizling, Zöld veltelini, Királyleányka, Pinot Noir",
    producers=["Törley", "Etyeki Kúria", "Haraszthy", "Nyakas", "Rókusfalvy", "Hernyák"]),

app(I, "Etyeki pezsgő", ["Etyeki pezsgő", "Etyeki Pezsgő"], "OEM", "Northern Pannonia",
    """Etyeki pezsgő is a sparkling-wine PDO approved by the European Commission in November 2025 for bottle-aged sparkling wine from the Etyek area. The Commission's summary cites limestone bedrock, constant wind and cool, humid air, which give fresh, citrus-fruited wines with firm acidity, and notes that older bottles develop biscuit and bread-crust notes. It formalises Etyek's long role as the vineyard of Budapest's sparkling-wine houses.""",
    created="EU PDO 2025", styles=["sparkling"], dominant="sparkling", grapes="Chardonnay, Pinot Noir and other permitted varieties"),

app(I, "Pécs", ["Pécs", "Pécsi"], "OEM", "Pannon",
    """Pécs spreads over the warm southern slopes of the Mecsek hills around the city of Pécs, Roman Sopianae, and south to Mohács (33 settlements). It is the home of Cirfandli (Zierfandler), a spicy, late-ripening white that the local growers have taken as their emblem, and of the 19th-century Littke sparkling wine house.""",
    created="EU PDO 2006", styles=["white", "red", "sparkling"], dominant="white",
    grapes="Cirfandli, Olaszrizling, Chardonnay, Kékfrankos, Cabernet, Merlot"),

app(I, "Tolna", ["Tolna / Tolnai", "Tolnai"], "OEM", "Pannon",
    """Tolna is a large, varied district between Szekszárd and Lake Balaton (54 settlements) with loess and sandy soils. It produces everyday whites, rosé and reds, and its Dunaföldvár and Bölcske corners on the Danube make some good Kékfrankos and Chardonnay.""",
    created="EU PDO 2006", styles=["white", "red", "rose"], dominant="white",
    grapes="Olaszrizling, Chardonnay, Kékfrankos, Cabernet Sauvignon, Merlot"),

app(I, "Pannon", ["Pannon"], "OEM", "Pannon",
    """Pannon is the umbrella PDO for the four southern Transdanubian districts (Villány, Szekszárd, Pécs and Tolna), about 120 settlements, used for cross-district blends and simpler wines. It lets a producer blend Szekszárd Kékfrankos with Villány Cabernet, for instance, and still sell a protected-origin wine; the district names carry the prestige.""",
    created="EU PDO 2009", styles=["red", "white", "rose"], dominant="red", grapes="Wide range of permitted varieties"),

app(I, "Kunság", ["Kunság / Kunsági", "Kunsági"], "OEM", "Danube",
    """Kunság is Hungary's largest wine district, more than 100 settlements on the sandy plain between the Danube and Tisza around Kecskemét, Kiskőrös and Cegléd. The vineyards were planted on loose sand from the 1880s precisely because phylloxera cannot live in it, and the sand still makes ungrafted vines possible. Most of the output is light, inexpensive wine and sparkling base, but a few producers make lively whites from Ezerjó, Kövidinka, Cserszegi fűszeres and Olaszrizling and fresh Kadarka and Kékfrankos.""",
    created="EU PDO 2006", styles=["white", "red", "rose", "sparkling"], dominant="white",
    grapes="Olaszrizling, Ezerjó, Kövidinka, Cserszegi fűszeres, Arany sárfehér, Kékfrankos, Kadarka",
    nerd="The Miklóstelep demonstration vineyard near Kecskemét, planted on land the town gave the state in 1883, proved that vines could be grown phylloxera-free on sand."),

app(I, "Izsáki Arany Sárfehér", ["Izsáki Arany Sárfehér", "Izsáki Sárfehér"], "OEM", "Danube",
    """A single-variety PDO (2007) for Arany Sárfehér ('golden yellow-white'), a high-acid, neutral old grape grown on the sands around Izsák in the Kunság. Its sharp acidity made it a good base for sparkling wine, and that is still its main use. Ten settlements are covered.""",
    created="EU PDO 2007", styles=["white", "sparkling"], dominant="white", grapes="Arany Sárfehér"),

app(I, "Soltvadkerti", ["Soltvadkerti", "Soltvadkert"], "OEM", "Danube",
    """Soltvadkerti (2020) is a one-commune PDO for Ezerjó from Soltvadkert on the Kunság sands, a town that once had one of the densest concentrations of vineyards on the Great Plain. The rules allow only Ezerjó, making a crisp, citrusy white.""",
    created="EU PDO 2020", styles=["white", "sparkling"], dominant="white", grapes="Ezerjó"),

app(I, "Monor", ["Monor / Monori", "Monori"], "OEM", "Danube",
    """Monor (2018) is a small PDO for four settlements south-east of Budapest (Monor, Monorierdő, Bénye, Gomba), centred on the Monor cellar hill (Strázsahegy), which holds about 900 small cellars, one of the largest cellar villages in Hungary.""",
    created="EU PDO 2018", styles=["white", "red", "rose"], dominant="white",
    grapes="Ezerjó, Olaszrizling, Kövidinka, Kékfrankos, Kadarka and others"),

app(I, "Csongrád", ["Csongrád / Csongrádi", "Csongrádi"], "OEM", "Danube",
    """Csongrád lies east of the Kunság on the sandy plains near Szeged and Csongrád along the Tisza (19 settlements). It is one of the warmest and driest parts of Hungary, producing mostly Kadarka, Kékfrankos and simple whites; its Kadarka has a small revival following.""",
    created="EU PDO 2006", styles=["red", "white", "rose"], dominant="red", grapes="Kadarka, Kékfrankos, Olaszrizling, Cserszegi fűszeres"),

app(I, "Hajós-Baja", ["Hajós-Baja"], "OEM", "Danube",
    """Hajós-Baja is the southern Great Plain district on the left bank of the Danube (17 settlements), on loess-covered sand that is a little richer than the Kunság's. It is famous for the cellar village (*pincefalu*) of Hajós, more than 1,200 cellars and press houses built by Swabian settlers on their own streets outside the village. Reds lead: Kékfrankos, Cabernet Sauvignon, Merlot and Zweigelt.""",
    created="EU PDO 2006", styles=["red", "white", "rose"], dominant="red", grapes="Kékfrankos, Cabernet Sauvignon, Merlot, Zweigelt, Olaszrizling",
    contains=["Hajós cellar village"]),

app(I, "Duna", ["Duna / Dunai", "Dunai"], "OEM", "Danube",
    """Duna is the umbrella PDO for the three Great Plain districts (Kunság, Csongrád, Hajós-Baja), about 150 settlements, for cross-district wines. It is mostly used for fresh, inexpensive whites, rosé and light reds from the sandy plains, often sold in bulk or under brand names.""",
    created="EU PDO 2009", styles=["white", "red", "rose"], dominant="white", grapes="Wide range of permitted varieties"),
]
