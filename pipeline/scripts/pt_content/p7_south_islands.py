"""Part 7: Alentejo (+8 subregions, talha, Alentejano IGP), Algarve (Lagos, Portimão, Lagoa, Tavira, IGP), Azores (Pico, Biscoitos, Graciosa, IGP Açores).
Writes work/pt/p7_south_islands.json"""
import json

OUT = "/home/claude/winesite/work/pt/p7_south_islands.json"
SRC_DN = {"title": "Diário de Notícias: area by region (IVV), 2025", "url": "https://www.dn.pt/economia/portugal-perdeu-50-mil-hectares-de-vinha-numa-década-mas-os-excedentes-de-vinho-continuam-a-preocupar"}
SRC_EU = {"title": "EU PDO inventory (Candiago et al. 2022)", "url": "https://doi.org/10.6084/m9.figshare.c.5877659"}
SRC_TALHA = {"title": "Agroportal: Vinho de Talha DOC Alentejo exports and producers (2022)", "url": "https://bo.agroportal.pt/?p=952871"}
SRC_CVRA = {"title": "Comissão Vitivinícola Regional Alentejana (Vinhos do Alentejo)", "url": "https://www.vinhosdoalentejo.pt"}
SRC_PICO = {"title": "eAmbrosia: DO Pico single document (2014)", "url": "https://webgate.ec.europa.eu/eambrosia-api/api/v1/attachments/22328"}
SRC_UNESCO_PICO = {"title": "UNESCO: Landscape of the Pico Island Vineyard Culture", "url": "https://whc.unesco.org/en/list/1117"}
SRC_FORECAST = {"title": "Forbes Portugal: 2025/26 production by region (IVV)", "url": "https://www.forbespt.com/?p=177523"}

def S(id_, name, kind, cls, app, lat, lon, cq, text, producers):
    return {"id": id_, "country": "pt", "name": name, "kind": kind, "class": cls, "appellation": app,
            "lat": lat, "lon": lon, "coord_quality": cq, "text": text, "producers": producers}

def SUB(name, parent, region, lat, lon, styles, dom, grapes, summary, terroir, producers, nerd="", match=None):
    return {"country": "pt", "name": name, "match": match or [name, "Alentejo " + name], "cat": "DOC", "subcat": "Subregion",
            "region": region, "subregion": parent, "created": "", "area_ha": None,
            "styles": styles, "dominant_style": dom, "lat": lat, "lon": lon, "coord_quality": "approx",
            "grapes": grapes, "summary": summary, "terroir": terroir, "producers": producers, "nerd_note": nerd}

def IGP(name, region, lat, lon, summary, match=None, dom="red"):
    return {"country": "pt", "name": name, "match": match or [name, "IGP " + name, "Vinho Regional " + name], "cat": "IGP", "subcat": "Vinho Regional",
            "region": region, "subregion": None, "created": "IGP", "area_ha": None, "styles": ["red", "white", "rose", "sparkling"], "dominant_style": dom,
            "lat": lat, "lon": lon, "coord_quality": "approx", "grapes": "Regional and international varieties", "summary": summary,
            "terroir": "", "producers": [], "nerd_note": ""}

# ---------------- Alentejo
r_al = {
    "country": "pt", "name": "Alentejo", "alt": ["Alentejano"], "parent_region": None, "lat": 38.5, "lon": -7.75, "zoom": 7.8,
    "tagline": "Big skies, cork oaks and marble towns: Portugal's favourite wine region, and the last place in Europe where wine is still routinely made in Roman-style clay jars.",
    "summary": "The Alentejo ('beyond the Tejo') covers almost a third of mainland Portugal: rolling plains of wheat, olive groves and cork-oak montado, with low hills and whitewashed towns. Once a cereal belt, it became the country's most popular wine region from the 1990s, prized at home for ripe, generous, fruit-forward reds that are easy to love young. It is also the only Portuguese region that grew in the last decade, to about 26,000 ha in 2024, more than double its 1989 area. Large estates (herdades) with irrigation coexist with cooperatives and a growing number of small, fresh-styled producers in the cooler Portalegre hills.",
    "history": "The Romans made wine here in talhas, huge clay amphorae, and villas such as São Cucufate near Vidigueira had their own presses. The tradition of talha wine survived in villages around Vidigueira, Vila de Frades and Cuba. In the 20th century the Estado Novo's wheat campaign uprooted vineyards; the post-1974 land reform and then EU accession in 1986 reshaped the countryside. Herdade do Esporão (from 1985), the Cartuxa foundation in Évora and the cooperatives of Reguengos, Borba and Redondo led a quality revolution. The CVR Alentejana was founded in 1989; the subregions were recognised as IPRs in the 1980s and unified under DOC Alentejo, and Vinho de Talha DOC Alentejo was recognised in 2010. The Alentejo's Wine Sustainability Programme (2015) has made it a leader in certified sustainable viticulture.",
    "terroir": "Mediterranean-continental: very hot, dry summers (40 °C is common), mild winters, 500 to 700 mm of rain. Soils vary: schist (Reguengos, Granja-Amareleja, Vidigueira), granite (Portalegre), marble and limestone around Estremoz and Borba, clays and Mediterranean red soils elsewhere. The Serra de São Mamede around Portalegre, rising to over 1,000 m, gives the freshest wines; the Vidigueira fault scarp funnels Atlantic air over the vineyards to the south.",
    "grapes": "Reds: Aragonez (Tinta Roriz), Trincadeira, Alicante Bouschet, Castelão, Touriga Nacional, Syrah, Tinta Grossa, Moreto. Whites: Antão Vaz, Roupeiro (Síria), Arinto, Fernão Pires, Rabo de Ovelha, Manteúdo, Perrum, Diagalves.",
    "styles": "Ripe reds, whites from Antão Vaz and Arinto, rosé, sparkling, and Vinho de Talha (amphora wine).",
    "classification": "DOC Alentejo, with eight subregions that may be named on the label: Portalegre, Borba, Redondo, Reguengos, Vidigueira, Évora, Granja-Amareleja and Moura. 'Vinho de Talha DOC Alentejo' designates wines fermented and kept in clay talhas. Most wine is sold as IGP Alentejano.",
    "appellations": ["Alentejo", "Portalegre", "Borba", "Redondo", "Reguengos", "Vidigueira", "Évora", "Granja-Amareleja", "Moura", "Alentejano"],
    "sources": [SRC_CVRA, SRC_DN, SRC_TALHA, SRC_EU, SRC_FORECAST]
}
al = {"country": "pt", "id": "pt-alentejo", "name": "Alentejo", "match": ["Alentejo", "DOC Alentejo", "Vinho de Talha DOC Alentejo", "Vinho de Talha"],
      "cat": "DOC", "region": "Alentejo", "subregion": None, "created": "DOC unifying eight subregions; EU registration 1996", "area_ha": 26000,
      "styles": ["red", "white", "rose", "sparkling", "orange"], "dominant_style": "red",
      "grapes": "Aragonez, Trincadeira, Alicante Bouschet, Castelão, Touriga Nacional, Syrah; Antão Vaz, Roupeiro, Arinto, Fernão Pires",
      "summary": "The DOC covers eight scattered subregions rather than the whole Alentejo. The classic Alentejo red is a blend of Aragonez, Trincadeira and Alicante Bouschet: dark, plush, warm and spicy, with soft tannins, the style that made the region Portugal's bestseller in supermarkets and restaurants. At the top end, estates such as Mouchão (with Alicante Bouschet since the early 20th century), Esporão, Cartuxa (Pêra-Manca) and the Portalegre growers make wines of structure and longevity. Whites from Antão Vaz (tropical and broad) and Arinto (fresh) have improved enormously.\n\nVinho de Talha is the Alentejo's living Roman heritage: grapes are crushed into large clay jars (talhas), sometimes 1,000 to 2,000 litres, lined with a resin called pez, and fermented with the skins, which sink as the wine clears. By tradition the talhas are opened on St Martin's Day, 11 November. The style was formally recognised in 2010; in 2021, 23 producers made about 180,000 litres, a tiny but fast-growing niche.",
      "terroir": "Hot, dry plains and low hills on schist, granite, marble and clay; the Serra de São Mamede is the cool exception.",
      "producers": ["Herdade do Mouchão", "Herdade do Esporão", "Fundação Eugénio de Almeida (Cartuxa, Pêra-Manca)", "Quinta do Mouro", "Tapada de Coelheiros", "Herdade do Rocim", "Herdade dos Grous", "Herdade do Peso (Sogrape)", "Adega Mayor", "Quinta da Fonte Souto (Symington)", "Susana Esteban", "José de Sousa (José Maria da Fonseca)", "Adega de Borba", "CARMIM (Reguengos)"],
      "nerd_note": "Pêra-Manca, Cartuxa's flagship red, made only in exceptional years, takes its name from a 'wobbly stone' (pedra manca) and is said to have been among the wines Pedro Álvares Cabral took to Brazil in 1500.",
      "contains": ["Portalegre", "Borba", "Redondo", "Reguengos", "Vidigueira", "Évora", "Granja-Amareleja", "Moura"]}
al_subs = [
    SUB("Portalegre", "Alentejo", "Alentejo", 39.33, -7.4, ["red", "white"], "red", "Trincadeira, Aragonez, Grand Noir, Alicante Bouschet, old field blends; Arinto, Roupeiro, Fernão Pires",
        "The northernmost and coolest subregion, on the granite and schist slopes of the Serra de São Mamede near the Spanish border, with vineyards up to 700 m and old field blends. It is the darling of the 'new Alentejo': fresher, lighter, more mineral wines. Symington bought Quinta da Fonte Souto here in 2017; Susana Esteban, Tapada do Chaves and Rui Reguinga are other names.",
        "Granite and schist, altitude 400 to 700 m, higher rainfall than the plains.", ["Tapada do Chaves", "Quinta da Fonte Souto (Symington)", "Susana Esteban", "Rui Reguinga"]),
    SUB("Borba", "Alentejo", "Alentejo", 38.81, -7.45, ["red", "white"], "red", "Aragonez, Trincadeira, Alicante Bouschet, Castelão; Roupeiro, Arinto",
        "Between Estremoz and Vila Viçosa in the 'marble triangle', where the soils are pale limestone and schist over marble. The Adega de Borba cooperative (1955) was one of the first to bottle quality Alentejo wine; Quinta do Mouro near Estremoz is the subregion's star estate.",
        "Marble-derived limestone and schist; slightly cooler and higher than the southern plains.", ["Adega de Borba", "Quinta do Mouro", "Quinta do Carmo"]),
    SUB("Redondo", "Alentejo", "Alentejo", 38.65, -7.55, ["red", "white"], "red", "Aragonez, Trincadeira, Alicante Bouschet, Castelão; Roupeiro, Fernão Pires",
        "South of Borba at the foot of the Serra d'Ossa, a subregion of warm granite and schist. Known for its cooperative and its tradition of pottery.",
        "Granite and schist sheltered by the Serra d'Ossa.", ["Adega Cooperativa de Redondo"]),
    SUB("Reguengos", "Alentejo", "Alentejo", 38.42, -7.53, ["red", "white"], "red", "Aragonez, Trincadeira, Alicante Bouschet, Moreto; Roupeiro, Antão Vaz",
        "Around Reguengos de Monsaraz, the largest subregion by production, home of Herdade do Esporão and the cooperative CARMIM. Hot, dry and schistous, it makes powerful, ripe reds. Monsaraz's hilltop village looks over the vineyards and the Alqueva lake.",
        "Schist and some granite, very hot summers.", ["Herdade do Esporão", "CARMIM", "José de Sousa (Reguengos)"]),
    SUB("Vidigueira", "Alentejo", "Alentejo", 38.21, -7.8, ["white", "red", "orange"], "white", "Antão Vaz, Roupeiro, Perrum, Manteúdo; Alicante Bouschet, Trincadeira, Tinta Grossa",
        "Below the Vidigueira fault scarp, a 50 km escarpment that channels cooling Atlantic air over the vineyards, so this southerly subregion makes the Alentejo's best whites, especially from Antão Vaz. It is also the heartland of talha wine, around Vila de Frades and Cuba, where taverns still serve wine straight from the jar in November.",
        "Schist and granite at the foot of the fault scarp, with Atlantic breezes.", ["Herdade do Rocim", "Herdade do Peso (Sogrape)", "Adega Cooperativa de Vidigueira, Cuba e Alvito", "Quinta do Quetzal", "Honrado"]),
    SUB("Évora", "Alentejo", "Alentejo", 38.57, -7.91, ["red", "white"], "red", "Aragonez, Trincadeira, Alicante Bouschet, Touriga Nacional; Roupeiro, Arinto, Antão Vaz",
        "Around the UNESCO-listed city of Évora, home of the Fundação Eugénio de Almeida (Cartuxa, Pêra-Manca) and of Tapada de Coelheiros (Arraiolos). Granite and schist plains.",
        "Granite and schist, rolling plain.", ["Cartuxa (Fundação Eugénio de Almeida)", "Tapada de Coelheiros"]),
    SUB("Granja-Amareleja", "Alentejo", "Alentejo", 38.25, -7.24, ["red", "white"], "red", "Moreto, Trincadeira, Aragonez; Roupeiro, Rabo de Ovelha, Manteúdo",
        "The hottest, driest corner of the Alentejo, on the Spanish border around Mourão and Amareleja, with poor schist soils. Old bush vines of the local red Moreto survive here.",
        "Thin schist, extreme heat (Amareleja often records Portugal's highest temperatures).", []),
    SUB("Moura", "Alentejo", "Alentejo", 38.14, -7.45, ["red", "white"], "red", "Alfrocheiro, Castelão, Moreto, Trincadeira; Antão Vaz, Fernão Pires, Rabo de Ovelha",
        "East of the Guadiana around Moura, a town better known for olive oil; clay and limestone soils that hold water through the summer give fuller wines.",
        "Clay-limestone, hot and dry.", []),
]
alentejano = IGP("Alentejano", "Alentejo", 38.5, -7.9, "The regional (IGP) designation covering the whole Alentejo, used for most of its wine, including many top bottlings that use varieties or blends outside DOC rules.")

# ---------------- Algarve
r_alg = {
    "country": "pt", "name": "Algarve", "alt": [], "parent_region": None, "lat": 37.15, "lon": -8.3, "zoom": 8.6,
    "tagline": "Portugal's sunny southern coast, where a small wine revival is growing between the golf courses.",
    "summary": "The Algarve is better known for beaches than wine, but vines have grown here since Phoenician and Roman times, and the region has four DOCs: Lagos, Portimão, Lagoa and Tavira. For decades the local cooperatives made heavy, alcoholic reds; since the 2000s a few dozen estates (some owned by foreign investors and one by the singer Cliff Richard) have improved quality, with rosés, Negra Mole reds and fresh whites. Production fell 20% in 2025.",
    "history": "Moorish rule (8th to 13th centuries) and later the fishing economy shaped the region; wine was a local product. The four DOCs were demarcated in the 1980s around the cooperatives of each town. Only the Lagoa cooperative remains significant, and many vineyards are sold under IGP Algarve.",
    "terroir": "Mediterranean with Atlantic influence: hot, dry summers, mild winters. The Serra de Monchique and Serra do Caldeirão shelter the coastal strip from the north. Soils: sandy, red clays and limestone (barrocal).",
    "grapes": "Negra Mole (the local red, pale and spicy), Castelão, Trincadeira, Touriga Nacional, Syrah, Aragonez, Alicante Bouschet; Arinto, Síria, Malvasia Fina, Moscatel Graúdo, Manteúdo, Crato Branco.",
    "styles": "Reds, rosés, whites, some fortified and sparkling.",
    "classification": "DOCs Lagos, Portimão, Lagoa and Tavira; IGP Algarve.",
    "appellations": ["Lagos", "Portimão", "Lagoa", "Tavira", "Algarve"],
    "sources": [SRC_DN, SRC_EU, SRC_FORECAST]
}
lagos = {"country": "pt", "id": "pt-lagos", "name": "Lagos", "match": ["Lagos", "DOC Lagos"], "cat": "DOC", "region": "Algarve", "subregion": None,
         "created": "1980s; DOP registered 1991", "area_ha": None, "styles": ["red", "white", "rose"], "dominant_style": "red",
         "grapes": "Negra Mole, Castelão, Touriga Nacional, Syrah; Arinto, Síria, Malvasia Fina",
         "summary": "The westernmost Algarve DOC, from Lagos out to Sagres and up the Atlantic coast to Aljezur. Windswept and cooler, with a handful of small estates making fresh reds and whites.",
         "terroir": "Sandy and limestone soils exposed to Atlantic winds.", "producers": ["Quinta dos Vales (nearby)", "Monte da Casteleja"], "nerd_note": "", "contains": []}
portimao = {"country": "pt", "id": "pt-portimao", "name": "Portimão", "match": ["Portimão", "Portimao", "DOC Portimão"], "cat": "DOC", "region": "Algarve", "subregion": None,
            "created": "1980s; DOP registered 1991", "area_ha": None, "styles": ["red", "white", "rose"], "dominant_style": "red",
            "grapes": "Negra Mole, Castelão, Trincadeira, Touriga Nacional; Arinto, Síria",
            "summary": "The smallest Algarve DOC, around Portimão, Alvor and Mexilhoeira Grande; very little wine is bottled under the name.",
            "terroir": "Coastal sands and clays.", "producers": [], "nerd_note": "", "contains": []}
lagoa = {"country": "pt", "id": "pt-lagoa", "name": "Lagoa", "match": ["Lagoa", "DOC Lagoa"], "cat": "DOC", "region": "Algarve", "subregion": None,
         "created": "1980s; DOP registered 1991", "area_ha": None, "styles": ["red", "white", "rose", "fortified"], "dominant_style": "red",
         "grapes": "Negra Mole, Castelão, Trincadeira, Touriga Nacional, Syrah; Arinto, Síria, Malvasia Fina, Manteúdo",
         "summary": "The Algarve's most important DOC, stretching from Lagoa and Silves east to Albufeira and Loulé. The Lagoa cooperative (founded 1945) dominated for decades; estates such as Quinta dos Vales, Morgado do Quintão (with century-old Negra Mole vines) and Adega do Cantor have raised the bar, including the region's characteristic pale, savoury Negra Mole reds and an old tradition of dry fortified wine.",
         "terroir": "Red clay and limestone barrocal behind the coast, sheltered by the Serra de Monchique.",
         "producers": ["Adega de Lagoa", "Morgado do Quintão", "Quinta dos Vales", "Adega do Cantor (Vida Nova)", "Quinta do Francês"],
         "nerd_note": "Negra Mole is so pale that its reds are often mistaken for rosés; the Algarve sold them as the local 'clarete'.", "contains": []}
tavira = {"country": "pt", "id": "pt-tavira", "name": "Tavira", "match": ["Tavira", "DOC Tavira"], "cat": "DOC", "region": "Algarve", "subregion": None,
          "created": "1980s; DOP registered 1991", "area_ha": None, "styles": ["red", "white", "rose"], "dominant_style": "red",
          "grapes": "Negra Mole, Castelão, Trincadeira; Síria, Arinto, Diagalves, Moscatel Graúdo",
          "summary": "The eastern Algarve DOC around Tavira, Faro, Olhão and Castro Marim toward the Spanish border; a few small producers and a fading cooperative tradition.",
          "terroir": "Limestone barrocal hills and coastal plain; the hottest, driest part of the Algarve.", "producers": [], "nerd_note": "", "contains": []}
algarve_igp = IGP("Algarve", "Algarve", 37.15, -8.2, "The regional (IGP) designation for the Algarve, under which most of its quality estates bottle their wines.")

# ---------------- Azores
r_az = {
    "country": "pt", "name": "Azores", "alt": ["Açores"], "parent_region": None, "lat": 38.6, "lon": -28.1, "zoom": 7.6,
    "tagline": "Mid-Atlantic volcanic islands where vines grow in black-stone pens beside the surf: Pico's UNESCO landscape and some of Europe's most saline whites.",
    "summary": "The Azores lie 1,500 km west of Lisbon in the middle of the Atlantic. Three islands have DOCs: Pico, whose vineyards of tiny walled plots (currais) on black lava are a UNESCO World Heritage landscape; Biscoitos on Terceira; and Graciosa. For centuries their claim to fame was a fortified Verdelho that, the islanders say, reached the tables of the Russian tsars. Today the islands are famous among sommeliers for dry whites from Arinto dos Açores, Verdelho and Terrantez do Pico: high-acid, salty, smoky and quite unlike anything else. Production rebounded in 2025 (up 221% on a disastrous 2024), but volumes remain tiny.",
    "history": "Franciscan friars are said to have brought Verdelho from Sicily (or Madeira) in the 15th century. Pico's Verdelho, fortified like Madeira, was exported to northern Europe, Brazil and Russia in the 18th and 19th centuries. Oidium (1850s) and phylloxera (1870s) wiped out the vineyards; American hybrid vines (for the local 'vinho de cheiro') replaced many of them. Revival began in the 1980s with the Pico cooperative and the DOCs (1994); UNESCO inscribed the Pico vineyard landscape in 2004. Since 2014 the Azores Wine Company (António Maçanita, Filipe Rocha, Paulo Machado) has led a new wave, replanting abandoned currais.",
    "terroir": "Young basaltic lava (lajido, 'biscoitos'), barely weathered, with vines planted in cracks in the rock and protected by walls of piled black stone from salt-laden winds. Oceanic climate: mild, humid, windy, about 1,000 mm of rain on Pico's coast. Vineyards lie within about 100 m of sea level.",
    "grapes": "Arinto dos Açores (distinct from mainland Arinto), Verdelho, Terrantez do Pico; also Boal, Sercial, Fernão Pires, Generosa, Malvasia; hybrids (Isabella) for vinho de cheiro.",
    "styles": "Dry and fortified (licoroso) whites; some reds and rosés under IGP Açores.",
    "classification": "DOCs Pico, Biscoitos and Graciosa (registered 1996); IGP Açores. The EU single document for Pico (2014) covers its fortified licoroso; dry still whites from the islands are widely bottled under IGP Açores or as DOC Pico according to the current regional rules.",
    "appellations": ["Pico", "Biscoitos", "Graciosa", "Açores"],
    "sources": [SRC_PICO, SRC_UNESCO_PICO, SRC_EU, SRC_FORECAST,
                {"title": "Wikipedia: Pico IPR", "url": "https://en.wikipedia.org/wiki/Pico_IPR"}]
}
pico = {"country": "pt", "id": "pt-pico", "name": "Pico", "match": ["Pico", "DOC Pico", "Pico Verdelho", "Verdelho do Pico", "Lajido"],
        "cat": "DOC", "region": "Azores", "subregion": None, "created": "1994; DOP registered 1996", "area_ha": None,
        "styles": ["fortified", "white", "sweet"], "dominant_style": "white",
        "grapes": "Verdelho, Arinto dos Açores, Terrantez do Pico, Boal, Sercial, Fernão Pires, Generosa, Galego Dourado, Malvasia",
        "summary": "Pico is a single, near-perfect volcanic cone rising 2,351 m from the Atlantic, and its vineyards sit on the lava flows at its foot, below 100 m, on the west coast around Madalena, Criação Velha and Bandeiras and on the north coast at Santa Luzia. Settlers broke the black basalt into thousands of small rectangular pens (currais), each a few metres across, walled with loose stones to shelter vines from wind and salt spray; the vines root into cracks in the lava. The resulting grid, stretching for kilometres, is one of the world's great agricultural landscapes.\n\nHistorically Pico made a fortified Verdelho (licoroso), and the 2014 EU specification still defines DOC Pico around that style. Today the excitement is the dry whites, especially Arinto dos Açores and Terrantez do Pico: piercing acidity, flinty smoke, citrus and an unmistakable sea-salt finish. The Azores Wine Company, the Pico cooperative, Fita Preta and Insula are the leading producers.",
        "terroir": "Fresh basalt lava (lajido) with almost no soil; walls of black stone that also radiate heat at night; extreme exposure to wind and salt; maritime, humid climate with high disease pressure.",
        "producers": ["Azores Wine Company", "Cooperativa Vitivinícola da Ilha do Pico (Picowines)", "Insula", "Pico Wines", "Fita Preta (Azores)", "Adega A Buraca"],
        "nerd_note": "The currais walls, piled from stones cleared from the lava, were so extensive that, it is often said, their total length would circle the Earth twice.",
        "contains": []}
bisc = {"country": "pt", "id": "pt-biscoitos", "name": "Biscoitos", "match": ["Biscoitos", "DOC Biscoitos"], "cat": "DOC", "region": "Azores", "subregion": None,
        "created": "1994; DOP registered 1996", "area_ha": None, "styles": ["fortified", "white"], "dominant_style": "fortified",
        "grapes": "Verdelho, Arinto, Terrantez, Boal",
        "summary": "A tiny DOC on the north coast of Terceira island, named after the 'biscuit'-like jagged lava rock on which the vines grow in walled curraletas. It is known for fortified Verdelho, traditionally made by the Brum family's Casa Agrícola, whose museum documents the island's wine history; dry whites are increasing.",
        "terroir": "Rough, porous basalt lava fields beside the sea, sheltered by stone walls.",
        "producers": ["Casa Agrícola Brum (Museu do Vinho dos Biscoitos)", "Adega Cooperativa dos Biscoitos"], "nerd_note": "", "contains": []}
grac = {"country": "pt", "id": "pt-graciosa", "name": "Graciosa", "match": ["Graciosa", "DOC Graciosa"], "cat": "DOC", "region": "Azores", "subregion": None,
        "created": "1994; DOP registered 1996", "area_ha": None, "styles": ["white"], "dominant_style": "white",
        "grapes": "Verdelho, Arinto, Boal, Fernão Pires, Terrantez",
        "summary": "The DOC of Graciosa, the flattest and driest of the Azores, a UNESCO biosphere reserve. Its dry whites, made mainly by the island cooperative, are fresh and saline; Graciosa is the only Azores DOC defined for still (unfortified) white wine in the EU register.",
        "terroir": "Volcanic soils on a low, windy island.", "producers": ["Adega Cooperativa da Graciosa"], "nerd_note": "", "contains": []}
acores_igp = IGP("Açores", "Azores", 38.5, -28.3, "The regional (IGP) designation for the Azores archipelago, used for most of the islands' modern dry whites, reds and rosés.", match=["Açores", "Acores", "Azores", "IGP Açores", "Vinho Regional Açores"], dom="white")

sites = [
    # Alentejo
    S("site-pt-herdade-do-mouchao", "Herdade do Mouchão", "estate", "Historic Alicante Bouschet estate", "Alentejano", 38.9216, -7.8090, "precise",
      "The Reynolds family, of English origin, bought this cork estate near Casa Branca (Sousel) in the 19th century and planted Alicante Bouschet in the early 20th. Its traditional adega with granite lagares and old vats makes Mouchão and the rare Tonel 3-4, dark, powerful and long-lived reds, among the Alentejo's few historic icons. The estate lies just outside the DOC subregions and is labelled Alentejano.", ["Herdade do Mouchão"]),
    S("site-pt-herdade-do-esporao", "Herdade do Esporão", "estate", "Estate and winery, Reguengos", "Alentejo", 38.3810, -7.5599, "precise",
      "A huge estate with a medieval tower, bought in the 1970s by José Roquette's family, planted from the 1980s and now among Portugal's biggest wine groups (also owning Quinta dos Murças in the Douro and Quinta do Ameal in Vinho Verde). Australian winemaker David Baverstock shaped its style from 1992. Esporão is a leader in organic farming and keeps a large ampelographic collection of Portuguese and foreign varieties.", ["Esporão"]),
    S("site-pt-adega-cartuxa", "Adega da Cartuxa", "cellar", "Fundação Eugénio de Almeida winery, Évora", "Alentejo", 38.5425, -7.8702, "precise",
      "The Fundação Eugénio de Almeida's cellars, in a former Jesuit retreat house just outside Évora, beside the Carthusian monastery of Scala Coeli. Here are made Cartuxa and Pêra-Manca, released only in great years and among Portugal's most sought-after reds.", ["Cartuxa", "Fundação Eugénio de Almeida"]),
    S("site-pt-villa-romana-sao-cucufate", "Villa Romana de São Cucufate", "historic", "Roman villa, Vila de Frades", "Alentejo", 38.2233, -7.8450, "precise",
      "The ruins of a large Roman villa, rebuilt in the 4th century, with storerooms and evidence of wine and olive oil production; later a monastery. It anchors the talha wine tradition of nearby Vila de Frades.", []),
    S("site-pt-vila-de-frades", "Vila de Frades (talha wine village)", "village", "Heart of the talha tradition", "Alentejo", 38.2139, -7.8231, "precise",
      "A village near Vidigueira whose adegas and taverns still ferment wine in clay talhas; every November, around St Martin's Day, the talhas are opened and the new wine is served from the jar. Producers such as Honrado, Gerações da Talha and Herdade do Rocim have helped it become a recognised style.", []),
    S("site-pt-herdade-do-rocim", "Herdade do Rocim", "estate", "Vidigueira estate and talha champion", "Alentejo", 38.1975, -7.8554, "precise",
      "A modern estate between Vidigueira and Cuba that hosts the Amphora Wine Day each November and makes several talha wines alongside fresh Antão Vaz whites.", ["Herdade do Rocim"]),
    S("site-pt-herdade-do-peso", "Herdade do Peso", "estate", "Sogrape's Alentejo estate", "Alentejo", 38.1429, -7.6864, "precise",
      "Sogrape's estate near Vidigueira, on the plains below the fault scarp, making Vinha do Monte and Herdade do Peso wines.", ["Sogrape"]),
    S("site-pt-adega-cooperativa-de-vidigueira", "Adega Cooperativa de Vidigueira, Cuba e Alvito", "cellar", "Cooperative", "Alentejo", 38.2068, -7.7996, "precise",
      "The Vidigueira cooperative, one of the main producers of Antão Vaz whites below the fault scarp, and a keeper of the local talha wine tradition.", []),
    S("site-pt-adega-de-borba", "Adega de Borba", "cellar", "Cooperative (1955)", "Alentejo", 38.8060, -7.4687, "precise",
      "Founded in 1955, the Borba cooperative was one of the first in the Alentejo to bottle quality wine; its red Reserva with the cork-oak label became a national classic.", ["Adega de Borba"]),
    S("site-pt-quinta-do-mouro", "Quinta do Mouro", "quinta", "Estremoz estate", "Alentejo", 38.8500, -7.5900, "approx",
      "Miguel Louro's estate on schist near Estremoz, which in the 1990s showed that the Alentejo could make structured, age-worthy reds; known for its Alicante Bouschet and the 'Erro' wines. Point approximate (near Estremoz).", ["Quinta do Mouro"]),
    S("site-pt-tapada-do-chaves", "Tapada do Chaves", "estate", "Historic Portalegre estate", "Alentejo", 38.2900, -7.4640, "approx",
      "", []),
    S("site-pt-quinta-da-fonte-souto", "Quinta da Fonte Souto", "quinta", "Symington's Portalegre estate (2017)", "Alentejo", 39.3955, -7.3633, "approx",
      "The Symingtons' first property outside the Douro, bought in 2017 on the slopes of the Serra de São Mamede near Marvão, at about 500 to 600 m; cool, granite and schist vineyards for fresh Alentejo whites and reds. Point at the Fonte Souto locality.", ["Symington Family Estates"]),
    S("site-pt-tapada-de-coelheiros", "Tapada de Coelheiros", "estate", "Arraiolos estate", "Alentejo", 38.7299, -7.8786, "precise",
      "An estate near Igrejinha (Arraiolos), founded in the 1980s, among the first Alentejo producers of single-estate Cabernet blends and Chardonnay; now in Brazilian ownership.", ["Tapada de Coelheiros"]),
    S("site-pt-herdade-dos-grous", "Herdade dos Grous", "estate", "Estate and hotel near Beja", "Alentejano", 37.8817, -7.9517, "precise",
      "A large estate and agritourism hotel south of Beja, outside the DOC subregions, known for Moon Harvested wines and ripe reds.", ["Herdade dos Grous"]),
    S("site-pt-adega-mayor", "Adega Mayor", "cellar", "Siza Vieira winery, Campo Maior", "Alentejano", 39.0502, -7.0941, "precise",
      "The winery of the Delta coffee group in Campo Maior, designed by the architect Álvaro Siza Vieira and opened in 2007; a white concrete block on the plain near the Spanish border.", ["Adega Mayor"]),
    S("site-pt-monsaraz", "Monsaraz", "village", "Hilltop village over Reguengos", "Alentejo", 38.4434, -7.3802, "precise",
      "A fortified medieval village on a hill above the Reguengos vineyards and the Alqueva reservoir, Europe's largest artificial lake, whose irrigation water has changed Alentejo farming.", []),
    # Algarve
    S("site-pt-adega-de-lagoa", "Adega de Lagoa", "cellar", "Algarve cooperative (1945)", "Lagoa", 37.1320, -8.4540, "precise",
      "The historic Lagoa cooperative, founded in 1945 and once the main producer of Algarve wine, including an aged dry fortified wine.", ["Adega de Lagoa"]),
    S("site-pt-morgado-do-quintao", "Morgado do Quintão", "estate", "Old Negra Mole vineyards", "Lagoa", 37.1588, -8.4584, "precise",
      "A family estate near Estômbar with Negra Mole vines over a century old; its pale, savoury reds have revived interest in the Algarve's native grape.", ["Morgado do Quintão"]),
    S("site-pt-adega-do-cantor", "Adega do Cantor", "estate", "Cliff Richard's Algarve winery", "Lagoa", 37.1232, -8.2805, "precise",
      "The winery at Guia, Albufeira, founded in partnership with the singer Sir Cliff Richard, whose Vida Nova wines helped draw attention to the Algarve in the 2000s.", ["Adega do Cantor"]),
    S("site-pt-quinta-do-frances", "Quinta do Francês", "quinta", "Silves estate", "Lagoa", 37.2171, -8.5090, "precise",
      "A small estate in the hills above Silves making Syrah, Touriga Nacional and Aragonez blends.", ["Quinta do Francês"]),
    # Azores
    S("site-pt-pico-vineyard-landscape", "Landscape of the Pico Island Vineyard Culture", "landscape", "UNESCO World Heritage (2004)", "Pico", 38.5142, -28.5342, "precise",
      "A 987-ha listed landscape on Pico's west coast: thousands of currais, rectangular pens of black basalt built from the 15th century to shield vines from wind and spray, plus manor houses, wine cellars, wells, ramps and tiny harbours. The Lajido da Criação Velha trail crosses its heart.", []),
    S("site-pt-lajido-de-santa-luzia", "Lajido de Santa Luzia", "landscape", "Lava-field vineyard village (UNESCO)", "Pico", 38.5562, -28.4274, "precise",
      "A hamlet on Pico's north coast built of black lava, among walled vineyards and the old cellars and stills of the Verdelho trade; part of the UNESCO landscape.", []),
    S("site-pt-museu-do-vinho-do-pico", "Museu do Vinho do Pico", "museum", "Wine museum, Madalena", "Pico", 38.5361, -28.5162, "precise",
      "In an old Carmelite convent estate in Madalena, with a dragon-tree grove, a traditional still and displays on the island's Verdelho history.", []),
    S("site-pt-azores-wine-company", "Azores Wine Company", "cellar", "Winery, Bandeiras (2014)", "Pico", 38.5557, -28.4720, "precise",
      "Founded in 2014 by António Maçanita, Filipe Rocha and Paulo Machado, the company has replanted abandoned currais and makes dry Arinto dos Açores, Terrantez do Pico and Verdelho that have put Azores wine on top wine lists. Its winery in Bandeiras, opened in the early 2020s, is clad in black basalt.", ["Azores Wine Company"]),
    S("site-pt-cooperativa-ilha-do-pico", "Cooperativa Vitivinícola da Ilha do Pico", "cellar", "Pico cooperative (Picowines)", "Pico", 38.5310, -28.5328, "precise",
      "The island cooperative in Madalena, which kept Pico wine alive through the late 20th century and produces the Frei Gigante and Terras de Lava ranges.", ["Picowines"]),
    S("site-pt-museu-do-vinho-dos-biscoitos", "Museu do Vinho dos Biscoitos", "museum", "Casa Agrícola Brum, Terceira", "Biscoitos", 38.7929, -27.2587, "precise",
      "The Brum family's wine house and museum in Biscoitos, which has made fortified Verdelho on Terceira since 1890 and documents the island's lava-field vineyards.", ["Casa Agrícola Brum"]),
    S("site-pt-adega-cooperativa-da-graciosa", "Adega Cooperativa da Graciosa", "cellar", "Island cooperative", "Graciosa", 39.0867, -28.0156, "precise",
      "The cooperative of Santa Cruz da Graciosa that makes most of the island's DOC white wine.", []),
]
# Tapada do Chaves: correct coordinates (OSM 'Tapada de Chaves', Frangoneiro, Portalegre) and text
for s in sites:
    if s["id"] == "site-pt-tapada-do-chaves":
        s.update({"lat": 39.2891, "lon": -7.4638, "coord_quality": "precise",
                  "text": "A historic estate near Portalegre whose old vineyards on the granite foothills of the Serra de São Mamede made some of the Alentejo's most long-lived reds in the late 20th century; now owned by Fundação Eugénio de Almeida (Cartuxa)."})

data = {"countries": [], "regions": [r_al, r_alg, r_az],
        "appellations": [al] + al_subs + [alentejano, lagos, portimao, lagoa, tavira, algarve_igp, pico, bisc, grac, acores_igp], "sites": sites}
json.dump(data, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ok", OUT, len(sites), "sites")
