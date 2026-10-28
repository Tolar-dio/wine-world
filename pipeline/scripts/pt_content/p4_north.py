"""Part 4: Vinho Verde (+9 subregions, Minho IGP), Trás-os-Montes (+3 subregions, Transmontano IGP), Távora-Varosa (+Terras de Cister IGP).
Writes work/pt/p4_north.json"""
import json

OUT = "/home/claude/winesite/work/pt/p4_north.json"
SRC_AGRO = {"title": "Agroportal: Portaria 152/2015 and the Alvarinho designation in Vinho Verde", "url": "https://www.agroportal.pt/?p=721327"}
SRC_DN = {"title": "Diário de Notícias: area by region (IVV), 2025", "url": "https://www.dn.pt/economia/portugal-perdeu-50-mil-hectares-de-vinha-numa-década-mas-os-excedentes-de-vinho-continuam-a-preocupar"}
SRC_EU = {"title": "EU PDO inventory (Candiago et al. 2022): Vinho Verde, Trás-os-Montes, Távora-Varosa", "url": "https://doi.org/10.6084/m9.figshare.c.5877659"}
SRC_WP_TV = {"title": "Wikipedia: Távora-Varosa DOC", "url": "https://en.wikipedia.org/wiki/T%C3%A1vora-Varosa_DOC"}
SRC_VV = {"title": "Vinhos Verdes (CVRVV), official site", "url": "https://www.vinhoverde.pt"}

def S(id_, name, kind, cls, app, lat, lon, cq, text, producers):
    return {"id": id_, "country": "pt", "name": name, "kind": kind, "class": cls, "appellation": app,
            "lat": lat, "lon": lon, "coord_quality": cq, "text": text, "producers": producers}

def SUB(name, parent, region, lat, lon, area, styles, dom, grapes, summary, terroir, producers, nerd="", match=None, created=None):
    return {"country": "pt", "name": name, "match": match or [name], "cat": "DOC", "subcat": "Subregion",
            "region": region, "subregion": parent, "created": created or "", "area_ha": area,
            "styles": styles, "dominant_style": dom, "lat": lat, "lon": lon, "coord_quality": "approx",
            "grapes": grapes, "summary": summary, "terroir": terroir, "producers": producers, "nerd_note": nerd}

r_vv = {
    "country": "pt", "name": "Vinho Verde", "alt": ["Vinhos Verdes", "Minho", "Região dos Vinhos Verdes"], "parent_region": None,
    "lat": 41.55, "lon": -8.35, "zoom": 8.4,
    "tagline": "Portugal's green, rain-soaked north-west, where granite, Atlantic air and high-trained vines make some of Europe's freshest whites.",
    "summary": (
        "The Vinho Verde region covers the whole north-west of Portugal, from the Minho river on the Spanish border south to the Douro and inland to the mountains: one of the largest demarcated regions in Europe, with just over 23,000 ha of vines in 2024 spread among tens of thousands of small farms. 'Verde' means green, and refers to youth and to the landscape, not the colour of the wine: there are red, rosé and sparkling Vinhos Verdes as well as white.\n\n"
        "The style most foreigners know, a light, low-alcohol, slightly spritzy white sold in a squat bottle, was largely a creation of the 1950s to 1980s export trade. The modern region is far more interesting: single-variety Alvarinhos from Monção e Melgaço that age for a decade, Loureiro from the Lima valley smelling of laurel and orange blossom, Avesso from the warm Baião slopes near the Douro, and a new wave of skin-contact and old-vine wines from the mountain valleys. Reds from Vinhão, inky and acidic, remain a local passion, served in white porcelain bowls with roast pork and cod."
    ),
    "history": (
        "Vines were trained up trees here since Roman times, and medieval monasteries spread viticulture through the valleys. Minho red wine was the first Portuguese wine shipped in quantity to England from Viana do Castelo in the 14th to 17th centuries, until the merchants moved south to the Douro. The region was demarcated in 1908. For most of the 20th century vines grew on the edges of fields of maize and vegetables, trained high on trees (enforcado), pergolas (ramada) or tall cruzetas, so the ground beneath could be cropped: that is why Vinho Verde was historically light, acidic and high-yielding. Since the 1980s, EU-funded replanting moved most production to dedicated vineyards on lower cordon systems, and quality rose sharply.\n\n"
        "The Comissão de Viticultura da Região dos Vinhos Verdes (CVRVV), founded in 1926, is one of the oldest regional wine commissions in Portugal. A long fight over the Alvarinho name ended with Portaria 152/2015: Monção e Melgaço kept exclusive use of 'Alvarinho' on Vinho Verde labels until 2021, after which any of the nine subregions may label a varietal Alvarinho, while Monção e Melgaço got its own seal and promotion."
    ),
    "terroir": "Granite almost everywhere, with some schist inland: sandy, acidic, free-draining soils. The climate is the wettest in Portugal (1,200 to 2,000 mm a year, falling mostly in winter and spring) and mild, thanks to the Atlantic, which pushes up the river valleys (Minho, Lima, Cávado, Ave, Douro). Inland subregions behind the first mountain ridges (Monção e Melgaço, Basto, Baião, Amarante) are drier and warmer in summer, allowing riper Alvarinho, Avesso and reds. Disease pressure is the constant challenge.",
    "grapes": "Whites: Alvarinho, Loureiro, Arinto (here called Pedernã), Trajadura, Avesso, Azal. Reds: Vinhão (a teinturier with red flesh), Borraçal, Espadeiro (mostly for rosé), Amaral, Padeiro, Alvarelhão.",
    "styles": "Crisp dry and off-dry whites, often with a light prickle; serious varietal Alvarinho and Loureiro; Vinho Verde Tinto; rosé; traditional-method sparkling (Espumante); Aguardente.",
    "classification": "One DOC, Vinho Verde, with nine subregions that may appear on labels: Monção e Melgaço, Lima, Cávado, Ave, Basto, Sousa, Amarante, Baião and Paiva. IGP Minho covers the same area for wines outside the DOC rules, including international varieties. Since 2022, varietal Alvarinho can be labelled Vinho Verde Alvarinho in any subregion.",
    "appellations": ["Vinho Verde", "Monção e Melgaço", "Lima", "Cávado", "Ave", "Basto", "Sousa", "Amarante", "Baião", "Paiva", "Minho"],
    "sources": [SRC_VV, SRC_AGRO, SRC_DN, SRC_EU]
}

vv = {
    "country": "pt", "id": "pt-vinho-verde", "name": "Vinho Verde", "match": ["Vinho Verde", "Vinhos Verdes", "Vinho Verde DOC"],
    "cat": "DOC", "region": "Vinho Verde", "subregion": None, "created": "1908", "area_ha": 23000,
    "styles": ["white", "red", "rose", "sparkling"], "dominant_style": "white",
    "grapes": "Alvarinho, Loureiro, Arinto (Pedernã), Trajadura, Avesso, Azal; Vinhão, Borraçal, Espadeiro, Amaral",
    "summary": (
        "Vinho Verde is Portugal's biggest DOC by number of growers and one of its most exported: the classic is a white of 9 to 11.5% alcohol, bone-dry to off-dry, with lime, green apple and sea-breeze freshness and sometimes a faint sparkle, originally from malolactic fermentation in bottle and now usually from a little added carbon dioxide. It is the wine Portugal drinks with grilled sardines in June.\n\n"
        "The serious end has transformed in a generation. Varietal Alvarinho from the warm, sheltered Monção e Melgaço subregion reaches 12.5 to 13.5%, with peach, citrus and saline minerality, and some, aged on lees or in large oak, need five or ten years. Loureiro from the Lima and Cávado valleys is floral and citrus-scented; Avesso from Baião is rounder and richer; Arinto gives backbone. Reds from Vinhão, almost black and high in acid, are a regional cult. The region also makes good traditional-method sparkling wines and aguardente."
    ),
    "terroir": "Granite soils and Atlantic rainfall; the closer to the sea, the lighter and more acidic the wines. Inland, behind the Peneda, Gerês and Marão mountains, summers are hotter and drier.",
    "producers": ["Soalheiro", "Anselmo Mendes", "Quinta do Ameal", "Aveleda", "Palácio da Brejoeira", "Quinta de Covela", "Quinta da Lixa", "Casa de Vilacetinho", "Adega de Monção", "Afros", "Quinta de Soalheiro", "Márcio Lopes"],
    "nerd_note": "The spritz in cheap Vinho Verde is now mostly injected CO2; the original prickle came from malolactic fermentation finishing in bottle, which is why old-school bottles were slightly cloudy.",
    "contains": ["Monção e Melgaço", "Lima", "Cávado", "Ave", "Basto", "Sousa", "Amarante", "Baião", "Paiva"]
}

vv_subs = [
    SUB("Monção e Melgaço", "Vinho Verde", "Vinho Verde", 42.07, -8.39, None, ["white", "red", "sparkling"], "white",
        "Alvarinho, Trajadura; Pedral, Alvarelhão, Borraçal, Vinhão",
        "The northernmost subregion, along the south bank of the Minho river facing Galicia's Rías Baixas, and the home of Alvarinho (Albariño across the river). Protected from Atlantic rain by the mountains to the west and north, it is warmer and drier in summer than the rest of Vinho Verde, so Alvarinho ripens to 12.5 to 13.5% while keeping its acidity. Palácio da Brejoeira made the first prestige bottling here in 1976; Soalheiro, Anselmo Mendes and the Monção cooperative made the name international. Until 2021 only wines from here could be labelled Vinho Verde Alvarinho.",
        "Granite with alluvial terraces near the river; a semi-continental pocket within the Atlantic north-west. Melgaço's higher, cooler vineyards (Soalheiro) give tauter wines than Monção's warmer valley floor.",
        ["Soalheiro", "Anselmo Mendes", "Palácio da Brejoeira", "Adega de Monção", "Quinta de Santiago", "Quintas de Melgaço"],
        "Wines from here may be labelled with the subregion name alone, Monção e Melgaço, without saying Alvarinho.", ["Monção e Melgaço", "Monção", "Melgaço"]),
    SUB("Lima", "Vinho Verde", "Vinho Verde", 41.77, -8.55, None, ["white", "red"], "white",
        "Loureiro, Arinto, Trajadura; Vinhão, Borraçal",
        "The valley of the Lima river around Ponte de Lima and Arcos de Valdevez, the homeland of Loureiro. Loureiro here is floral and citrus-bright, with laurel (louro), lime blossom and real tension. Quinta do Ameal showed in the 1990s that Lima Loureiro could age.",
        "Granite, an open Atlantic valley with high rainfall and mild temperatures.", ["Quinta do Ameal", "Adega Ponte de Lima", "Casa de Paço d'Anha"]),
    SUB("Cávado", "Vinho Verde", "Vinho Verde", 41.54, -8.55, None, ["white", "red"], "white",
        "Loureiro, Arinto, Trajadura; Vinhão, Borraçal",
        "The Cávado valley around Barcelos and Braga, close to the coast: light, aromatic Loureiro- and Arinto-based whites and fresh reds.",
        "Granite, maritime climate, high rainfall.", []),
    SUB("Ave", "Vinho Verde", "Vinho Verde", 41.42, -8.35, None, ["white", "red", "sparkling"], "white",
        "Loureiro, Arinto, Trajadura, Alvarinho; Vinhão",
        "The Ave valley around Guimarães, Famalicão and Vila Verde: classic blended whites of Loureiro, Arinto and Trajadura and some of the region's best sparkling bases.",
        "Granite; Atlantic influence moderated by distance from the sea.", ["Quinta de Covela (nearby)"]),
    SUB("Basto", "Vinho Verde", "Vinho Verde", 41.42, -8.0, None, ["white", "red"], "white",
        "Azal, Arinto, Trajadura; Rabo de Anho, Espadeiro, Vinhão",
        "The inland Tâmega country around Cabeceiras, Celorico and Mondim de Basto, behind the Marão foothills. Hotter summers and colder winters give fuller reds and the zesty, apple-scented Azal whites.",
        "Granite and some schist, more continental climate.", []),
    SUB("Sousa", "Vinho Verde", "Vinho Verde", 41.25, -8.33, None, ["white", "red"], "white",
        "Loureiro, Arinto, Trajadura, Avesso, Azal; Vinhão, Espadeiro",
        "The Sousa valley around Penafiel, Paredes, Lousada and Felgueiras, where Aveleda, the region's biggest family firm, has its estate.",
        "Granite, intermediate climate.", ["Aveleda"]),
    SUB("Amarante", "Vinho Verde", "Vinho Verde", 41.27, -8.08, None, ["white", "red"], "white",
        "Avesso, Azal, Arinto; Amaral, Vinhão, Espadeiro",
        "Around Amarante on the Tâmega, warmer and drier than the coast: Azal and Avesso whites and some of the region's sturdiest reds.",
        "Granite, sheltered by the Marão.", []),
    SUB("Baião", "Vinho Verde", "Vinho Verde", 41.15, -8.03, None, ["white", "red"], "white",
        "Avesso, Arinto, Azal; Amaral, Vinhão",
        "On the north bank of the Douro next to the Port region's western edge, Baião is the home of Avesso, a full, textured white that ripens well in the warmer, sunnier slopes. Quinta de Covela, revived since 2011, shows how good it can be.",
        "Granite slopes facing the Douro; the warmest, driest Vinho Verde subregion, a transition to the Douro climate.", ["Quinta de Covela", "Quinta de Santa Cristina"]),
    SUB("Paiva", "Vinho Verde", "Vinho Verde", 41.0, -8.25, None, ["white", "red"], "white",
        "Avesso, Arinto, Loureiro; Amaral, Vinhão",
        "South of the Douro around Castelo de Paiva and Cinfães, a smaller subregion of hillside vineyards; known for reds as well as Avesso-based whites.",
        "Granite and schist, south bank of the Douro.", []),
]

minho_igp = {"country": "pt", "name": "Minho", "match": ["Minho", "IGP Minho", "Vinho Regional Minho"], "cat": "IGP", "subcat": "Vinho Regional",
             "region": "Vinho Verde", "subregion": None, "created": "IGP", "area_ha": None, "styles": ["white", "red", "rose", "sparkling"], "dominant_style": "white",
             "lat": 41.6, "lon": -8.4, "coord_quality": "approx", "grapes": "Vinho Verde varieties plus international grapes",
             "summary": "The regional wine (IGP) designation covering the Vinho Verde area, used for wines outside DOC rules, such as higher-alcohol or oak-aged Alvarinhos, international varieties or experimental styles.",
             "terroir": "As Vinho Verde.", "producers": [], "nerd_note": ""}

r_tm = {
    "country": "pt", "name": "Trás-os-Montes", "alt": ["Transmontano"], "parent_region": None, "lat": 41.6, "lon": -7.05, "zoom": 8.2,
    "tagline": "'Behind the mountains': a remote, high, continental corner of north-east Portugal with old field blends and sharp, mountain-fresh wines.",
    "summary": "Trás-os-Montes lies north of the Douro valley and east of the Marão and Alvão mountains, a land of chestnut forests, granite villages and harsh winters ('nine months of winter and three of hell', goes the saying). Most of its vineyard is small, old and cooperative-farmed; the area fell from about 23,000 ha in 2014 to about 4,565 ha in 2024 as abandonment and reclassification took their toll. Quality is uneven, but old field blends from Valpaços and the Planalto Mirandês are drawing interest from natural-wine makers.",
    "history": "Vines were planted here by the Romans and by medieval monasteries; Chaves was the Roman Aquae Flaviae. The DOC dates from 2006, consolidating three earlier IPRs (Chaves, Valpaços and Planalto Mirandês). The region is the traditional home of the rustic palhete (light red made from mixed red and white grapes) and the warming, sweet 'vinho dos mortos' of Boticas, buried underground during the Napoleonic invasions and still made today.",
    "terroir": "Granite and schist at 350 to 700 m; continental climate with hot summers, cold winters and around 600 mm of rain. The Planalto Mirandês on the Spanish border is the highest and harshest.",
    "grapes": "Reds: Bastardo, Marufo, Tinta Roriz, Touriga Nacional, Trincadeira, Tinta Carvalha. Whites: Côdega do Larinho, Fernão Pires, Gouveio, Malvasia Fina, Rabigato, Síria, Viosinho.",
    "styles": "Reds, field-blend palhetes, whites, sparkling and fortified (vinho licoroso).",
    "classification": "DOC Trás-os-Montes with three subregions (Chaves, Valpaços, Planalto Mirandês); IGP Transmontano for the wider area.",
    "appellations": ["Trás-os-Montes", "Chaves", "Valpaços", "Planalto Mirandês", "Transmontano"],
    "sources": [SRC_DN, SRC_EU]
}
tm = {"country": "pt", "id": "pt-tras-os-montes", "name": "Trás-os-Montes", "match": ["Trás-os-Montes", "Tras-os-Montes", "DOC Trás-os-Montes"],
      "cat": "DOC", "region": "Trás-os-Montes", "subregion": None, "created": "2006", "area_ha": 4565,
      "styles": ["red", "white", "rose", "sparkling", "fortified"], "dominant_style": "red",
      "grapes": "Bastardo, Marufo, Tinta Roriz, Touriga Nacional, Trincadeira; Côdega do Larinho, Fernão Pires, Gouveio, Malvasia Fina, Síria, Viosinho",
      "summary": "A large, thinly planted DOC covering the high country north of the Douro and east of the Marão. Its best wines are field blends from old vineyards and fresh, spicy reds from Valpaços; whites from Côdega do Larinho and Síria can be bright and herbal. Production is dominated by cooperatives (Valpaços, Chaves) and a few estates such as Valle Pradinhos near Macedo de Cavaleiros, whose cool-climate reds and Riesling-inflected whites made the region's name in the 1990s.",
      "terroir": "Granite and schist plateaus at 350 to 700 m, continental climate.",
      "producers": ["Valle Pradinhos", "Adega Cooperativa de Valpaços", "Casal de Valle Pradinhos", "Menina d'Uva", "Arribas Wine Company"],
      "nerd_note": "Boticas' 'vinho dos mortos' (wine of the dead) is buried in bottles under the earth, a custom said to date from villagers hiding wine from Napoleon's troops in 1809.",
      "contains": ["Chaves", "Valpaços", "Planalto Mirandês"]}
tm_subs = [
    SUB("Chaves", "Trás-os-Montes", "Trás-os-Montes", 41.74, -7.47, None, ["red", "white"], "red", "Bastardo, Tinta Roriz, Trincadeira; Côdega do Larinho, Fernão Pires",
        "The valley of the Tâmega around the spa town of Chaves near the Spanish border: light, fresh reds and palhetes from granite soils, historically an IPR in its own right.", "Granite valley at 350 to 500 m, colder and wetter than the rest of the DOC.", []),
    SUB("Valpaços", "Trás-os-Montes", "Trás-os-Montes", 41.61, -7.31, None, ["red", "white"], "red", "Tinta Roriz, Trincadeira, Bastardo, Touriga Nacional; Síria, Gouveio",
        "The largest and most productive subregion, around the town of Valpaços and its cooperative; fuller, warmer reds from schist and granite.", "Schist and granite at 400 to 600 m.", ["Adega Cooperativa de Valpaços"]),
    SUB("Planalto Mirandês", "Trás-os-Montes", "Trás-os-Montes", 41.45, -6.35, None, ["red", "white"], "red", "Bastardo, Tinta Roriz, Touriga Nacional, Marufo; Síria, Malvasia Fina",
        "The high plateau around Miranda do Douro and Mogadouro, above the Douro's international canyon, where Mirandese (Portugal's second official language) is spoken. Old field blends, often ungrafted or very old, are being rediscovered by small growers.", "Granite plateau at 600 to 800 m; extreme continental climate.", ["Arribas Wine Company"]),
]
transmontano = {"country": "pt", "name": "Transmontano", "match": ["Transmontano", "IGP Transmontano", "Vinho Regional Transmontano"], "cat": "IGP", "subcat": "Vinho Regional",
                "region": "Trás-os-Montes", "subregion": None, "created": "IGP", "area_ha": None, "styles": ["red", "white", "rose"], "dominant_style": "red",
                "lat": 41.6, "lon": -7.0, "coord_quality": "approx", "grapes": "Regional and international varieties",
                "summary": "The regional (IGP) designation for Trás-os-Montes, used for wines outside DOC rules.", "terroir": "As Trás-os-Montes.", "producers": [], "nerd_note": ""}

r_tv = {
    "country": "pt", "name": "Távora-Varosa", "alt": ["Terras de Cister"], "parent_region": None, "lat": 40.98, "lon": -7.68, "zoom": 9.5,
    "tagline": "Portugal's first region demarcated for sparkling wine, on high Cistercian land south of the Douro.",
    "summary": "A small mountain region on the plateau south of the Douro, between the Távora and Varosa rivers, at 500 to 800 m. Its cool, late-ripening vineyards and granite soils produce high-acid base wines, and the region is best known for traditional-method sparkling wine (Espumante), led by Murganheira and Raposeira. It was the first Portuguese region demarcated specifically for sparkling wine (as Varosa IPR in 1989, later promoted to DOC, absorbing the Encostas da Nave IPR).",
    "history": "Cistercian monks arrived in the 12th century, founding São João de Tarouca (the first Cistercian monastery in Portugal) and Santa Maria de Salzedas, and planted vineyards; the IGP name Terras de Cister honours them. Raposeira near Lamego has made sparkling wine since 1898; Murganheira, founded in 1947, ages its wines in tunnels carved into the granite.",
    "terroir": "Granite and some schist, 500 to 800 m; cold winters, cool nights and late harvests that keep acidity high.",
    "grapes": "Malvasia Fina, Cerceal, Gouveio, Bical, Chardonnay, Pinot Noir, Pinot Blanc; Touriga Nacional, Tinta Roriz.",
    "styles": "Traditional-method sparkling wines (white and rosé), plus still whites and reds.",
    "classification": "DOC Távora-Varosa; IGP Terras de Cister.",
    "appellations": ["Távora-Varosa", "Terras de Cister"],
    "sources": [SRC_WP_TV, SRC_EU]
}
tv = {"country": "pt", "id": "pt-tavora-varosa", "name": "Távora-Varosa", "match": ["Távora-Varosa", "Tavora-Varosa", "Távora Varosa", "Varosa"],
      "cat": "DOC", "region": "Távora-Varosa", "subregion": None, "created": "1989 (Varosa IPR); DOC later; EU registration 2004",
      "area_ha": None, "styles": ["sparkling", "white", "red", "rose"], "dominant_style": "sparkling",
      "grapes": "Malvasia Fina, Cerceal, Gouveio, Bical, Chardonnay, Pinot Noir; Touriga Nacional, Tinta Roriz",
      "summary": "The sparkling-wine DOC of Portugal's northern Beiras, on the high plateau between the Douro and Viseu. Altitude (500 to 800 m) gives slow-ripening grapes with sharp acidity, the raw material for traditional-method Espumante aged on lees. Murganheira's cellars, cut into the granite at Ucanha, hold millions of bottles; Raposeira near Lamego is the other historic house. Still whites from Malvasia Fina and Cerceal can be very fresh.",
      "terroir": "Granite soils, high altitude, cold winters and big diurnal swings.",
      "producers": ["Murganheira", "Raposeira", "Cooperativa Agrícola do Távora"],
      "nerd_note": "Murganheira's founder dug the cellars straight into the blue granite of the hillside, giving a constant temperature for long lees ageing without air conditioning.",
      "contains": []}
terras_cister = {"country": "pt", "name": "Terras de Cister", "match": ["Terras de Cister", "IGP Terras de Cister", "Vinho Regional Terras de Cister"], "cat": "IGP", "subcat": "Vinho Regional",
                 "region": "Távora-Varosa", "subregion": None, "created": "IGP", "area_ha": None, "styles": ["white", "red", "sparkling"], "dominant_style": "white",
                 "lat": 41.0, "lon": -7.7, "coord_quality": "approx", "grapes": "Regional and international varieties",
                 "summary": "The regional (IGP) name for the Távora-Varosa area, named after the Cistercian monks who planted its first vineyards.", "terroir": "As Távora-Varosa.", "producers": [], "nerd_note": ""}

sites = [
    S("site-pt-palacio-da-brejoeira", "Palácio da Brejoeira", "estate", "Neoclassical palace; first prestige Alvarinho (1976)", "Vinho Verde", 42.0416, -8.4945, "precise",
      "A neoclassical palace built in the early 19th century near Monção. Its owner Maria Hermínia Paes began bottling Alvarinho from the estate's vineyards in 1976, and for years Brejoeira was the most expensive white wine in Portugal and the benchmark for Monção Alvarinho.", ["Palácio da Brejoeira"]),
    S("site-pt-soalheiro", "Soalheiro", "estate", "Alvarinho pioneer, Melgaço", "Vinho Verde", 42.0976, -8.3099, "precise",
      "In 1974 João António Cerdeira planted the first commercial vineyard of Alvarinho in Melgaço, at a site whose name means 'sunny place'. His children Luís and Maria João Cerdeira built Soalheiro into the best-known Alvarinho brand, with styles from barrel-fermented to skin-contact and sparkling.", ["Soalheiro"]),
    S("site-pt-anselmo-mendes", "Anselmo Mendes", "estate", "Winemaker's estate, Melgaço", "Vinho Verde", 42.0911, -8.3202, "precise",
      "Anselmo Mendes, nicknamed 'Mr Alvarinho', pioneered barrel fermentation, lees ageing and skin contact for Alvarinho; his Melgaço winery makes some of the most age-worthy Vinho Verde.", ["Anselmo Mendes"]),
    S("site-pt-adega-de-moncao", "Adega Cooperativa Regional de Monção", "cellar", "Cooperative (1958), Muralhas de Monção", "Vinho Verde", 42.0642, -8.4902, "precise",
      "Founded in 1958, the Monção cooperative made Alvarinho accessible with its Muralhas de Monção blend and remains the largest producer in the subregion.", ["Adega de Monção"]),
    S("site-pt-quinta-do-ameal", "Quinta do Ameal", "quinta", "Loureiro estate, Lima valley", "Vinho Verde", 41.7874, -8.5218, "precise",
      "Pedro Araújo's estate on the Lima, from the 1990s the proof that Loureiro could make serious, long-lived whites. Since 2019 it belongs to Esporão.", ["Quinta do Ameal", "Esporão"]),
    S("site-pt-quinta-de-covela", "Quinta de Covela", "quinta", "Avesso estate, Baião", "Vinho Verde", 41.1189, -7.9888, "precise",
      "A Renaissance-era estate overlooking the Douro at the very edge of the Vinho Verde region. Abandoned after financial trouble, it was revived in 2011 by Tony Smith and Marcelo Lima; its Avesso and Arinto whites are among the region's finest.", ["Quinta de Covela"]),
    S("site-pt-aveleda", "Quinta da Aveleda", "quinta", "Family firm and gardens, Penafiel", "Vinho Verde", 41.2085, -8.3068, "precise",
      "The Guedes family estate since the 19th century, with romantic gardens and a goat tower. Aveleda's Casal Garcia (launched 1939) is one of the best-selling Vinho Verde brands worldwide; the group also owns Quinta Vale Dona Maria in the Douro and Quinta da Aguieira in Bairrada.", ["Aveleda"]),
    S("site-pt-chaves-aquae-flaviae", "Chaves (Aquae Flaviae)", "historic", "Roman spa town", "Trás-os-Montes", 41.7400, -7.4707, "precise",
      "The Roman Aquae Flaviae, whose 1st-century bridge over the Tâmega still stands. The Chaves subregion around it makes light reds and palhetes, and the town gives its name to a smoked ham as famous as its wine.", []),
    S("site-pt-valpacos", "Valpaços", "village", "Heart of the largest Trás-os-Montes subregion", "Trás-os-Montes", 41.6075, -7.3108, "precise",
      "Market town of the Valpaços subregion, whose cooperative handles much of the region's wine; old field blends survive in the surrounding villages.", ["Adega Cooperativa de Valpaços"]),
    S("site-pt-miranda-do-douro", "Miranda do Douro", "village", "Planalto Mirandês", "Trás-os-Montes", 41.4958, -6.2739, "precise",
      "A fortress town on the cliffs above the Douro's international canyon; the surrounding plateau is the Planalto Mirandês subregion.", []),
    S("site-pt-boticas-vinho-dos-mortos", "Boticas (vinho dos mortos)", "historic", "Buried wine tradition (IGP Transmontano, outside the DOC)", "Transmontano", 41.6893, -7.6731, "precise",
      "In 1809, legend says, villagers buried their wine to hide it from Napoleon's invading army and found it improved when dug up. Boticas, in the Barroso highlands just outside the DOC boundary, still makes 'wine of the dead', aged in bottles buried in the ground.", []),
    S("site-pt-murganheira", "Caves da Murganheira", "cellar", "Sparkling house (1947), granite tunnels", "Távora-Varosa", 41.0574, -7.7385, "precise",
      "Founded in 1947, Murganheira ages traditional-method sparkling wine in galleries hewn into granite near Ucanha; it also owns the historic Raposeira brand.", ["Murganheira", "Raposeira"]),
    S("site-pt-mosteiro-sao-joao-de-tarouca", "Mosteiro de São João de Tarouca", "historic", "First Cistercian monastery in Portugal", "Terras de Cister", 40.9947, -7.7458, "precise",
      "Founded in the 12th century, the first Cistercian house in Portugal; its monks planted vines across the Varosa and Barosa valleys, the origin of the Terras de Cister name. The monastery itself stands just south of the DOC's parish boundary.", []),
    S("site-pt-mosteiro-de-salzedas", "Mosteiro de Santa Maria de Salzedas", "historic", "Cistercian abbey", "Távora-Varosa", 41.0497, -7.7333, "precise",
      "A great Cistercian abbey of the 12th to 18th centuries in the Barosa valley, whose monks owned vineyards on both sides of the Douro.", []),
    S("site-pt-ucanha-bridge", "Ucanha fortified bridge", "historic", "Medieval toll tower over the Varosa", "Távora-Varosa", 41.0484, -7.7473, "precise",
      "A 15th-century fortified bridge with a toll tower, where the abbots of Salzedas collected dues on goods, wine included, crossing the Varosa.", []),
]

data = {"countries": [], "regions": [r_vv, r_tm, r_tv],
        "appellations": [vv] + vv_subs + [minho_igp, tm] + tm_subs + [transmontano, tv, terras_cister], "sites": sites}
json.dump(data, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ok", OUT, len(sites), "sites")
