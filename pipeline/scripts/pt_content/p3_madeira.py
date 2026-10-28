"""Part 3: Madeira (DOP Madeira, DOP Madeirense, IGP Terras Madeirenses) and sites. Writes work/pt/p3_madeira.json"""
import json

OUT = "/home/claude/winesite/work/pt/p3_madeira.json"
SRC_P39 = {"title": "JORAM I Série n.º 28, 13 Feb 2015: Portarias 38, 39 and 40/2015 (statutes of DO Madeira, Madeirense)", "url": "https://joram.madeira.gov.pt/joram/1serie/Ano%20de%202015/ISerie-028-2015-02-13sup2.pdf"}
SRC_DN = {"title": "DN Madeira: Comercialização do vinho Madeira em 2025 (IVBAM/DREM data, Jan 2026)", "url": "https://www.dnoticias.pt/2026/1/16/477589-comercializacao-do-vinho-madeira-em-2025-caiu-em-quantidade-e-valor/"}
SRC_UMA = {"title": "Universidade da Madeira, Vinho Madeira: the Present", "url": "https://vinhomadeira.web.uma.pt/en/?p=129"}
SRC_BLANDY = {"title": "Madeira Wine Company: The Blandy family", "url": "https://www.madeirawinecompany.com/about-us/the-blandy-family.html"}
SRC_WOP = {"title": "Wines of Portugal: Vinho da Madeira", "url": "https://winesofportugal.com/en/portuguese-wines/wine-styles/vinho-da-madeira/"}
SRC_DN2 = {"title": "DN Madeira: Comercialização de vinho com DO Madeirense cresceu quase 24% (Feb 2026)", "url": "https://www.dnoticias.pt/2026/2/12/481179-comercializacao-de-vinho-com-do-madeirense-cresceu-quase-24/"}
SRC_CKBK = {"title": "Oxford Companion to Wine (ckbk): Justino's", "url": "https://app.ckbk.com/reference/wine05383c10s001e038"}
SRC_MORAIS = {"title": "F. Morais, Vinos licorosos de Portugal (IVV)", "url": "https://evega.xunta.gal/sites/default/files/contido/relatorios/vinos_licorosos_portugal-francisco-morais.pdf"}

region = {
    "country": "pt", "name": "Madeira", "alt": ["Ilha da Madeira", "Região Demarcada da Madeira", "Madeira Island"], "parent_region": None,
    "lat": 32.75, "lon": -16.96, "zoom": 9.8,
    "tagline": "A volcanic island 1,000 km out in the Atlantic whose wine is deliberately heated and oxidised, and is all but indestructible.",
    "summary": (
        "Madeira is the wine that cannot die. It is fortified, then heated for months or aged for decades in warm lofts, exposed to air on purpose, so that by the time it is bottled nothing is left that oxygen or heat can harm. A bottle from the 1790s can still be vibrant, and an opened bottle keeps for months. The flavours are unlike any other wine: burnt sugar, walnut, dried orange, coffee, smoke and iodine, carried by a searing acidity that keeps even the sweetest Malmsey from cloying.\n\n"
        "The vineyards are tiny and vertiginous. About 400 hectares of vines, spread among roughly 1,200 growers, cling to terraces (poios) cut into the island's basalt, many trained on low pergolas (latada) so that vegetables can grow underneath, and watered by the levadas, the 600-year-old irrigation channels that thread the mountains. Harvest is by hand, and grapes are often carried down in baskets.\n\n"
        "Trade is concentrated in a handful of shippers in Funchal and Câmara de Lobos. In 2025 they sold about 3.1 million litres for 20.6 million euros (IVBAM data): France is the largest market, followed by Germany, Belgium, the United States, the UK and Japan. Most of it is young, estufa-heated wine for cooking and everyday drinking; the treasures are the old Frasqueiras and the age-dated blends."
    ),
    "history": (
        "Madeira was settled from 1420 under the patronage of Prince Henry the Navigator, who had sugar cane and Malvasia vines brought from Crete and the eastern Mediterranean. The island sat on the sea routes to Africa, Brazil, the West Indies and India, and its wine became the ship's provision of choice. Shippers noticed that wine which had crossed the Equator twice in a ship's hold came back better than it left: the vinho da roda ('wine of the round voyage') commanded a premium, and by the late 18th century producers were imitating the voyage on land with heated stores (estufas, first recorded around 1794) and warm attic lodges.\n\n"
        "A 1665 English law that banned European goods from being shipped to the American colonies except via England made an exception for Madeira, and the wine became the drink of colonial America. It was served at the signing celebrations of the Declaration of Independence in 1776; George Washington drank a pint a day at dinner; Thomas Jefferson ordered it by the pipe. British merchants (Blandy, Cossart Gordon, Leacock, Rutherford) ran the trade from Funchal.\n\n"
        "Then the 19th century fell apart. Oidium arrived in 1852 and destroyed most of the vineyards; phylloxera followed from 1872. Many growers turned to sugar cane or replanted with American hybrids, and the noble varieties shrank to a fraction of their former area, while Tinta Negra became the workhorse. The American market collapsed with the Civil War and Prohibition, and the Russian market with the 1917 revolution. To survive, shippers merged: the Madeira Wine Association was formed in 1913, later becoming the Madeira Wine Company, which Blandy's joined in 1925. In 1989 the Blandys brought in the Symingtons as partners; in 2011 the Blandy family regained control, with the Symingtons keeping a minority share, and Chris Blandy, of the seventh generation, now leads it.\n\n"
        "Since the 1990s and particularly since 2015, when new statutes reorganised the categories, Madeira has regained prestige among sommeliers and collectors. The old Frasqueiras of Barbeito, D'Oliveiras and Blandy's sell out, and Tinta Negra can now be named on labels, which has encouraged shippers to make fine wines from it."
    ),
    "terroir": (
        "Madeira is the top of a volcano rising from the ocean floor to 1,862 m at Pico Ruivo. Soils are basaltic and tuffaceous, acidic, rich in iron and magnesium, and very fertile when water is available. The climate is subtropical and maritime: warm all year in Funchal, but rain, mist and wind vary dramatically with aspect and altitude. The south coast (Câmara de Lobos, Estreito de Câmara de Lobos, Campanário, Funchal) is sunny and warm, with vines from sea level to about 700 m; Estreito and Jardim da Serra above Câmara de Lobos are the heartland of Sercial and Tinta Negra. The north (São Vicente, Seixal, Porto Moniz, Santana, Arco de São Jorge) is wetter, greener and cooler, home to Sercial and Verdelho, with vines sheltered from the trade winds by hedges of heather and fern. Porto Santo, the flat, dry neighbouring island, has sandy limestone soils and a small vineyard of Caracol and Listrão.\n\n"
        "Humidity means rot and mildew pressure, which is why vines are trained high on pergolas or, in newer plantings, on espaliers (espaldeira). Natural acidity is very high, and that acidity is what makes Madeira able to survive heat and oxygen for centuries."
    ),
    "grapes": (
        "The four classic white 'noble' varieties name both a grape and a sweetness level. Sercial (Esgana Cão) grows highest and coolest and makes the driest, most piercing wine; Verdelho is medium-dry and smoky; Boal (Bual, Boal Cachudo) is medium-sweet and raisined; Malvasia (Malmsey, mostly Malvasia de São Jorge and the historic Malvasia Cândida) is sweet, rich and still bracingly acid. Terrantez, nearly lost after oidium, is prized by collectors for a bittersweet balance between Verdelho and Boal; Bastardo is a rare red. Tinta Negra (formerly called Tinta Negra Mole) is the workhorse, the majority of production (about 60% or more of grapes on most estimates), used in every sweetness level. Listrão and Caracol are Porto Santo specialities; Moscatel and Complexa appear in small amounts."
    ),
    "styles": (
        "By sweetness (in degrees Baumé): Seco (dry, up to 1.5°; Extra Seco below 0.5°), Meio Seco, Meio Doce and Doce (above 3.5°). A wine labelled Sercial must be dry or extra dry, Verdelho medium dry, Boal medium sweet, Malvasia sweet, and Terrantez medium dry or medium sweet. Rainwater is a lighter, pale style up to 10 years old. Madeirense DOP covers the island's unfortified table wines, and Terras Madeirenses IGP the rest."
    ),
    "classification": (
        "Production is controlled by the IVBAM (Instituto do Vinho, do Bordado e do Artesanato da Madeira) under statutes of 2015 (Portarias 38 to 40/2015). Two ways of ageing are recognised. Estufagem: fortified wine is held in tanks or casks warmed to no more than 50 °C (in practice 45 to 50 °C) for at least three months, then rested; it cannot be bottled before 31 October of the second year after harvest. Canteiro: wine is aged in casks stacked on wooden beams (canteiros) in warm lofts, heated only by the sun, for at least two years in wood and three before bottling; all the finest Madeira is canteiro.\n\n"
        "Age-indicated blends: 5, 10, 15, 20, 30, 40, 50 and More than 50 years old (the 2015 statute added 50 and More than 50), with traditional equivalents such as Reserva (5), Reserva Especial or Velha (10) and Reserva Extra (15); Seleccionado or Finest is the basic 3-year level. Single-vintage wines: Colheita (at least 5 years in wood, labelled with harvest and bottling dates) and Frasqueira or Garrafeira (at least 20 years in wood, from one recommended variety, exceptional quality, with bottling date); many great Frasqueiras spend 50 or 100 years in cask. Solera: a canteiro wine from a single vintage and variety, at least 5 years old, refreshed with up to 10% younger wine a year for at most ten additions.\n\n"
        "Fortification is with neutral grape spirit of about 96% alcohol, to 17 to 22% abv. Wine for Madeira DOP can be fortified during fermentation (to keep sweetness) or after (for dry styles)."
    ),
    "appellations": ["Madeira", "Madeirense", "Terras Madeirenses"],
    "sources": [SRC_P39, SRC_DN, SRC_DN2, SRC_UMA, SRC_BLANDY, SRC_WOP, SRC_CKBK, SRC_MORAIS]
}

madeira = {
    "country": "pt", "id": "pt-madeira", "name": "Madeira",
    "match": ["Madeira", "Vinho da Madeira", "Madeira Wine", "Madère", "Vin de Madère", "Madera", "Madeira Wein", "Vino di Madera", "Madeira Wijn",
              "Madeira / Vinho da Madeira / Madère / Vin de Madère / Madera / Madeira Wein / Madeira Wine / Vino di Madera / Madeira Wijn"],
    "cat": "DOC", "region": "Madeira", "subregion": None, "created": "Regulated from the early 20th century; DOP registered 1991; statute 2015",
    "area_ha": 400, "styles": ["fortified", "sweet", "white", "red"], "dominant_style": "fortified",
    "grapes": "Tinta Negra (majority); noble whites Sercial, Verdelho, Boal, Malvasia (Malvasia de São Jorge, Malvasia Cândida), Terrantez; Bastardo, Moscatel, Complexa, Listrão",
    "summary": (
        "Madeira is the only wine region where heat and air, the two things that ruin every other wine, are the point of the process. Grapes are pressed and fermented, then fortified with grape spirit at around 96% to between 17 and 22% alcohol: early, during fermentation, for the sweet styles (Boal, Malvasia), and later for dry Sercial and Verdelho. The wine is then either warmed in an estufa (no more than 50 °C, at least three months) or, for every fine Madeira, left in casks in hot lofts (canteiro) for years or decades. The slow cooking and oxidation turn fruit into caramel, toffee, roasted nuts, marmalade, coffee and smoke, while Madeira's ferocious acidity keeps it alive.\n\n"
        "The labels tell you three things. The grape, if named (85% minimum), fixes the sweetness: Sercial dry, Verdelho medium dry, Boal medium sweet, Malvasia sweet, Terrantez in between. The age: 5, 10, 15, 20, 30, 40, 50 or More than 50 years for blends, or a vintage for Colheita (at least 5 years in wood) and Frasqueira (at least 20). And the house: Blandy's, Barbeito, D'Oliveiras, Henriques & Henriques, Justino's, Broadbent, Borges, Faria.\n\n"
        "Great old Madeira is one of the longest-lived things you can drink. Wines from the 19th century, and occasionally the 18th, still appear at auction and are often in perfect condition, because there is nothing left in them to spoil. Once opened, a bottle lasts months."
    ),
    "terroir": "Basalt terraces from sea level to about 800 m on the south coast and lower, cooler slopes on the north; very high natural acidity everywhere. The south (Câmara de Lobos, Estreito, Campanário) is warmer and supplies Tinta Negra, Boal and Malvasia; the north (São Vicente, Seixal, Porto Moniz, Santana) gives Sercial and Verdelho their tension.",
    "producers": ["Blandy's (Madeira Wine Company)", "Cossart Gordon", "Barbeito", "Pereira d'Oliveira (D'Oliveiras)", "Henriques & Henriques", "Justino's", "H. M. Borges", "Broadbent", "J. Faria & Filhos"],
    "nerd_note": "Since 2015 Tinta Negra can be named on the label, and shippers now bottle 50-year-old Tinta Negra Colheitas that are as complex as noble-grape wines. The rule linking variety to sweetness can be waived for Frasqueiras with the IVBAM tasting panel's approval.",
    "contains": []
}

madeirense = {
    "country": "pt", "id": "pt-madeirense", "name": "Madeirense", "match": ["Madeirense", "DOP Madeirense", "Madeirense DOC"],
    "cat": "DOC", "region": "Madeira", "subregion": None, "created": "DOP registered 2007",
    "area_ha": None, "styles": ["white", "red", "rose", "sparkling"], "dominant_style": "white",
    "grapes": "Verdelho, Sercial, Arnsburger, Malvasia, Boal, Tinta Negra, Aragonez, Touriga Nacional, Cabernet Sauvignon, Merlot, Bastardo and others",
    "summary": "The DOP for Madeira's unfortified table wines: whites from Verdelho, Sercial, Arnsburger and Malvasia, reds and rosés from Tinta Negra and mainland or international varieties. Volumes are small and mostly consumed on the island, but quality has improved fast; Atlantis rosé from the Madeira Wine Company and Verdelho-based whites from the north coast show sharp acidity and a salty edge. Sales of Madeirense DOP rose almost 24% in 2025.",
    "terroir": "Same basalt terraces as Madeira DOP; whites favour the cool, wet north coast (São Vicente, Seixal, Porto Moniz).",
    "producers": ["Madeira Wine Company (Atlantis)", "Barbeito", "Quinta do Barbusano", "Terras do Avô", "Seiçal"],
    "nerd_note": "Arnsburger, a German Riesling crossing introduced in the 20th century, has become one of the island's typical table-wine whites."
}

terras_mad = {
    "country": "pt", "name": "Terras Madeirenses", "match": ["Terras Madeirenses", "IGP Terras Madeirenses", "Vinho Regional Terras Madeirenses"],
    "cat": "IGP", "subcat": "Vinho Regional", "region": "Madeira", "subregion": None, "created": "IGP; statute 2017",
    "area_ha": None, "styles": ["white", "red", "rose"], "dominant_style": "white",
    "lat": 32.75, "lon": -16.96, "coord_quality": "approx",
    "grapes": "Island varieties plus international grapes",
    "summary": "The regional wine designation for Madeira and Porto Santo, for wines outside the Madeirense DOP rules.",
    "terroir": "Madeira and Porto Santo.", "producers": [], "nerd_note": ""
}

def S(id_, name, kind, cls, app, lat, lon, cq, text, producers):
    return {"id": id_, "country": "pt", "name": name, "kind": kind, "class": cls, "appellation": app,
            "lat": lat, "lon": lon, "coord_quality": cq, "text": text, "producers": producers}

sites = [
    S("site-pt-blandys-wine-lodge", "Blandy's Wine Lodge", "house", "Madeira lodge, Funchal", "Madeira", 32.6478, -16.9106, "precise",
      "In the heart of Funchal, Blandy's lodge grew from properties John Blandy assembled from 1824 onwards, including parts of an old Franciscan convent. Its upper floors hold canteiro casks warmed by the sun under the roof; the tour shows the cooperage, the old wooden estufas and a library of vintages. Blandy arrived in 1808 and founded the firm in 1811; it is now the core of the Madeira Wine Company (Blandy's, Cossart Gordon, Miles, Leacock's).", ["Blandy's", "Madeira Wine Company"]),
    S("site-pt-pereira-d-oliveira", "Pereira d'Oliveira", "house", "Family Madeira shipper, Funchal (1850)", "Madeira", 32.6504, -16.9095, "precise",
      "A family firm founded in 1850 whose lodge on Rua dos Ferreiros holds one of the island's largest stocks of old Frasqueiras, sold only when the family judges them ready; bottles from the 19th century are still released and can be tasted in the shop.", ["Pereira d'Oliveira"]),
    S("site-pt-barbeito", "Vinhos Barbeito", "house", "Madeira shipper (1946), Câmara de Lobos", "Madeira", 32.6679, -16.9978, "precise",
      "Founded by Mário Barbeito de Vasconcelos in 1946 and transformed by his grandson Ricardo Diogo Freitas from the 1990s, Barbeito makes the most precise, least caramelised Madeiras on the island, with no added colouring, and single-cask and single-grower releases. Its winery sits above Câmara de Lobos.", ["Barbeito"]),
    S("site-pt-henriques-and-henriques", "Henriques & Henriques", "house", "Madeira shipper (1850), Câmara de Lobos", "Madeira", 32.6498, -16.9792, "precise",
      "Founded in 1850, one of the few shippers to own significant vineyards. Its Câmara de Lobos winery makes estufa and canteiro wines from a wide range of ages; the firm is now controlled by La Martiniquaise.", ["Henriques & Henriques"]),
    S("site-pt-justinos", "Justino's Madeira", "house", "Largest Madeira shipper (1870)", "Madeira", 32.6476, -16.8610, "approx",
      "Founded in Funchal in 1870 as Justino Henriques and later renamed, Justino's is the largest Madeira shipper, with modern premises in the Cancela industrial area east of Funchal. Its Cruz brand is the biggest Madeira (and Port) brand in France, the island's largest market. Point approximate.", ["Justino's"]),
    S("site-pt-camara-de-lobos", "Câmara de Lobos", "village", "Fishing town and vineyard heart", "Madeira", 32.6500, -16.9767, "precise",
      "A fishing harbour west of Funchal, painted by Winston Churchill in 1950, surrounded by terraces of Tinta Negra and Malvasia climbing toward Cabo Girão. Câmara de Lobos and Estreito together grow a large share of the island's grapes.", []),
    S("site-pt-estreito-de-camara-de-lobos", "Estreito de Câmara de Lobos", "village", "Vineyard parish, harvest festival", "Madeira", 32.6711, -16.9800, "precise",
      "The hillside parish above Câmara de Lobos, with terraces up to about 600 m, is the island's single most important vineyard area and hosts the harvest festival every September. Sercial thrives in its upper reaches toward Jardim da Serra.", []),
    S("site-pt-jardim-da-serra", "Jardim da Serra", "village", "High vineyards for Sercial", "Madeira", 32.6854, -16.9895, "precise",
      "The parish above Estreito, at 600 to 800 m, where cool, misty slopes give Sercial and some of the island's freshest wines.", []),
    S("site-pt-cabo-girao", "Cabo Girão", "landscape", "Sea cliff with fajã vineyards", "Madeira", 32.6565, -17.0045, "precise",
      "One of Europe's highest sea cliffs, about 580 m. At its foot lie the fajãs, flat landslide terraces once reached only by boat or rope, where tiny vineyards are still worked, now accessed by cable car.", []),
    S("site-pt-faja-dos-padres", "Fajã dos Padres", "vineyard", "Historic Malvasia Cândida vineyard", "Madeira", 32.6564, -17.0255, "precise",
      "A strip of land at the foot of the cliffs west of Cabo Girão, cultivated by Jesuits from the 16th century. It is famous as the last refuge of Malvasia Cândida, the original Malmsey grape of Madeira, after oidium; a few rows still survive here, reached by a lift down the cliff.", []),
    S("site-pt-sao-vicente-madeira", "São Vicente", "village", "North-coast vineyards", "Madeira", 32.7960, -17.0480, "precise",
      "On the wet north coast, São Vicente's terraces, sheltered by heather hedges, grow Sercial and Verdelho for both Madeira and the dry Madeirense whites. The cooler, greener north gives sharper, more saline wines than the south.", []),
    S("site-pt-seixal-madeira", "Seixal", "village", "North-coast Sercial terraces", "Madeira", 32.8236, -17.1069, "precise",
      "A tiny north-coast village famous for its steep terraces of Sercial and Verdelho running down to black-sand beaches; it gives its name to some of the island's best table wines.", []),
    S("site-pt-museu-vinho-arco-de-sao-jorge", "Museu do Vinho e da Vinha, Arco de São Jorge", "museum", "Wine and vine museum", "Madeira", 32.8244, -16.9539, "precise",
      "A small museum on the north coast about traditional Madeira viticulture, with pergola training, harvest tools and old vine varieties.", []),
    S("site-pt-porto-santo-vineyards", "Porto Santo vineyards", "landscape", "Dry neighbouring island, Caracol and Listrão", "Madeira", 33.0619, -16.3564, "approx",
      "Flat, arid and sandy, Porto Santo grows vines in low bushes protected by stone walls and reed fences. Its Caracol and Listrão grapes once supplied Madeira's shippers and are now being bottled again as distinctive salty whites. Columbus lived here after marrying a local governor's daughter.", []),
]

data = {"countries": [], "regions": [region], "appellations": [madeira, madeirense, terras_mad], "sites": sites}
json.dump(data, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ok", OUT, len(sites), "sites")
