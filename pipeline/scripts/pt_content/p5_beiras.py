"""Part 5: Bairrada, Dão (+7 subregions), Lafões, Beira Interior (+3 subregions), IGPs Terras do Dão, Terras da Beira, Beira Atlântico.
Writes work/pt/p5_beiras.json"""
import json

OUT = "/home/claude/winesite/work/pt/p5_beiras.json"
SRC_DN = {"title": "Diário de Notícias: area by region (IVV), 2025", "url": "https://www.dn.pt/economia/portugal-perdeu-50-mil-hectares-de-vinha-numa-década-mas-os-excedentes-de-vinho-continuam-a-preocupar"}
SRC_EU = {"title": "EU PDO inventory (Candiago et al. 2022)", "url": "https://doi.org/10.6084/m9.figshare.c.5877659"}
SRC_WP_B = {"title": "Wikipedia: Beiras wine region", "url": "https://en.wikipedia.org/wiki/Beiras_wine_region"}
SRC_CVRDAO = {"title": "CVR Dão, official site", "url": "https://www.cvrdao.pt"}
SRC_CVB = {"title": "Comissão Vitivinícola da Bairrada, official site", "url": "https://www.cvbairrada.pt"}

def S(id_, name, kind, cls, app, lat, lon, cq, text, producers):
    return {"id": id_, "country": "pt", "name": name, "kind": kind, "class": cls, "appellation": app,
            "lat": lat, "lon": lon, "coord_quality": cq, "text": text, "producers": producers}

def SUB(name, parent, region, lat, lon, styles, dom, grapes, summary, terroir, producers, nerd="", match=None):
    return {"country": "pt", "name": name, "match": match or [name], "cat": "DOC", "subcat": "Subregion",
            "region": region, "subregion": parent, "created": "", "area_ha": None,
            "styles": styles, "dominant_style": dom, "lat": lat, "lon": lon, "coord_quality": "approx",
            "grapes": grapes, "summary": summary, "terroir": terroir, "producers": producers, "nerd_note": nerd}

def IGP(name, region, lat, lon, summary, match=None):
    return {"country": "pt", "name": name, "match": match or [name, "IGP " + name, "Vinho Regional " + name], "cat": "IGP", "subcat": "Vinho Regional",
            "region": region, "subregion": None, "created": "IGP", "area_ha": None, "styles": ["red", "white", "rose", "sparkling"], "dominant_style": "red",
            "lat": lat, "lon": lon, "coord_quality": "approx", "grapes": "Regional and international varieties", "summary": summary,
            "terroir": "", "producers": [], "nerd_note": ""}

# ---------------- Bairrada
r_bai = {
    "country": "pt", "name": "Bairrada", "alt": [], "parent_region": None, "lat": 40.45, "lon": -8.5, "zoom": 9.6,
    "tagline": "Clay, Atlantic air and the fearsome Baga grape: Portugal's Nebbiolo country, and its capital of sparkling wine and roast suckling pig.",
    "summary": "Bairrada is a low, rolling strip between the Atlantic dunes and the Buçaco mountains, between Aveiro and Coimbra. Its name comes from barro, clay, and its identity from Baga, a thick-skinned, high-acid, very tannic red grape that, when properly ripened, makes some of the longest-lived wines in Portugal: dark cherry, plum, tobacco and earth, with Nebbiolo-like structure. It is also Portugal's sparkling-wine heartland, and Bairrada Espumante is the standard partner for leitão (roast suckling pig) at the restaurants of Mealhada. About 9,300 ha of vines remained in 2024, down by a third in a decade.",
    "history": "Bairrada's wines were traded through Aveiro and Coimbra in the Middle Ages. In the 18th century Pombal ordered many vineyards uprooted to protect the Douro's reputation (Bairrada wine was being used to colour Port), and the region was only demarcated in 1979. The first sparkling wine was made around 1890 by the Escola Prática de Viticultura in Anadia, and the 20th-century caves (Caves São João, Aliança, Messias, Primavera) built the region's name on sparkling wine and long-aged red Garrafeiras. From the 1980s Luís Pato, his daughter Filipa and a group of growers, the Baga Friends, fought to rehabilitate Baga as a single-variety wine. In the mid-2010s the CVB introduced the Bairrada Clássico category for wines respecting traditional varieties and ageing, and a Baga Bairrada label for traditional-method sparkling wines made mainly from Baga.",
    "terroir": "Clay-limestone (the best Baga sites) and sandy soils, gently rolling hills at 40 to 150 m; maritime climate, about 1,000 mm of rain, cool nights and frequent autumn rain that makes late-ripening Baga a gamble. Sandy soils give lighter wines and suit whites.",
    "grapes": "Baga dominates the reds, with Touriga Nacional, Alfrocheiro, Castelão, Tinta Roriz, Cabernet Sauvignon and Merlot. Whites: Maria Gomes (Fernão Pires), Bical, Cercial, Arinto, Sercialinho, Chardonnay.",
    "styles": "Tannic, ageworthy reds; fresh whites; traditional-method sparkling (Espumante) in all colours.",
    "classification": "DOC Bairrada (demarcated 1979), with the categories Bairrada Clássico and Baga Bairrada (sparkling); IGP Beira Atlântico.",
    "appellations": ["Bairrada", "Beira Atlântico"],
    "sources": [SRC_CVB, SRC_DN, SRC_EU]
}
bai = {"country": "pt", "id": "pt-bairrada", "name": "Bairrada", "match": ["Bairrada", "DOC Bairrada", "Bairrada Clássico", "Baga Bairrada"],
       "cat": "DOC", "region": "Bairrada", "subregion": None, "created": "1979", "area_ha": 9300,
       "styles": ["red", "white", "sparkling", "rose"], "dominant_style": "red",
       "grapes": "Baga, Touriga Nacional, Alfrocheiro, Castelão, Tinta Roriz; Maria Gomes (Fernão Pires), Bical, Cercial, Arinto",
       "summary": "Bairrada makes two very different things brilliantly. Its reds, from Baga on clay-limestone, are among Europe's most structured: high acidity and dense, grippy tannins that need ten or twenty years to unfold into notes of sour cherry, tobacco, tar and forest floor. Traditional producers fermented with stems and aged in large old casks; old Garrafeiras from the 1950s to 1990s are some of Portugal's great bargains. Its sparkling wines, from Maria Gomes, Bical, Arinto and Baga, are crisp and toasty, sold in every price band, and have been made here since the 1890s.\n\nBecause ripening Baga is risky in a wet Atlantic autumn, many producers blended it with Touriga Nacional or international grapes in the 1990s, while purists, led by Luís Pato, Filipa Pato and the Baga Friends, insisted on Baga alone. The Bairrada Clássico category rewards the traditional path.",
       "terroir": "Clay-limestone hills (Jurassic marls) for the great reds; sands for lighter wines and whites; maritime, rainy and cool.",
       "producers": ["Luís Pato", "Filipa Pato & William Wouters", "Quinta das Bágeiras", "Caves São João", "Sidónio de Sousa", "Buçaco (Alexandre Almeida)", "Quinta de Baixo (Niepoort)", "Kompassus", "Aliança", "Messias", "Campolargo"],
       "nerd_note": "Luís Pato's Vinha Pan, Vinha Barrosa and Quinta do Ribeirinho Pé Franco (ungrafted Baga on sand) are the closest Portugal has to Barolo crus; he left the DOC for years in protest at its rules and labels most wines Beira Atlântico.",
       "contains": []}
beira_atl = IGP("Beira Atlântico", "Bairrada", 40.4, -8.6, "The regional (IGP) designation covering Bairrada and the coastal Beiras, used by many top producers (including Luís Pato) for wines outside DOC rules. Formerly part of the Beiras IGP.")

# ---------------- Dão
r_dao = {
    "country": "pt", "name": "Dão", "alt": ["Dão e Lafões"], "parent_region": None, "lat": 40.55, "lon": -7.9, "zoom": 9.0,
    "tagline": "A granite bowl ringed by mountains, the homeland of Touriga Nacional and of Portugal's most Burgundian reds and whites.",
    "summary": "The Dão sits on a granite plateau in central Portugal, enclosed by the Caramulo, Buçaco and Serra da Estrela mountains, which block Atlantic rain from the west and continental extremes from the east. Vineyards are scattered in clearings among pine and eucalyptus forest at 400 to 700 m, and the wines are known for elegance rather than power: perfumed, mineral, fresh reds with fine tannins and textured, long-lived whites, especially from Encruzado. About 9,800 ha of vines remained in 2024, a third fewer than a decade earlier.",
    "history": "Wine has been made around Viseu since Roman times; the Dão was demarcated in 1908, among the first table-wine regions in Portugal. Under the Estado Novo, rules from the 1950s channelled almost all Dão wine through cooperatives, which made dull, oxidised wine for decades. EU entry in 1986 ended the monopoly; Sogrape's Quinta dos Carvalhais, Quinta dos Roques, Álvaro Castro (Quinta da Pellada), Quinta da Falorca and others rebuilt the region's reputation. Touriga Nacional, native here, was revived through clonal selection from the 1970s and 1980s, with the Nelas research station among the pioneers.",
    "terroir": "Granite (decomposed, sandy, acidic) with some schist in the south-west; altitude and mountain shelter give warm days and cool nights, about 1,100 mm of rain falling mostly in winter. The Serra da Estrela subregion, Portugal's highest vineyards (up to around 800 m), gives the freshest wines.",
    "grapes": "Touriga Nacional, Alfrocheiro, Tinta Roriz (Aragonez), Jaen (Mencía), Tinto Cão, Baga; Encruzado, Malvasia Fina, Bical, Cercial, Verdelho.",
    "styles": "Elegant, age-worthy reds; textured whites; rosé and sparkling (Dão Espumante).",
    "classification": "DOC Dão (1908) with seven subregions (Alva, Besteiros, Castendo, Serra da Estrela, Silgueiros, Terras de Azurara, Terras de Senhorim); 'Dão Nobre' is a special top category requiring tasting panel approval; IGP Terras do Dão.",
    "appellations": ["Dão", "Alva", "Besteiros", "Castendo", "Serra da Estrela", "Silgueiros", "Terras de Azurara", "Terras de Senhorim", "Lafões", "Terras do Dão"],
    "sources": [SRC_CVRDAO, SRC_DN, SRC_EU]
}
dao = {"country": "pt", "id": "pt-dao", "name": "Dão", "match": ["Dão", "Dao", "DOC Dão", "Dão Nobre"],
       "cat": "DOC", "region": "Dão", "subregion": None, "created": "1908", "area_ha": 9827,
       "styles": ["red", "white", "rose", "sparkling"], "dominant_style": "red",
       "grapes": "Touriga Nacional, Alfrocheiro, Tinta Roriz, Jaen, Tinto Cão; Encruzado, Malvasia Fina, Bical, Cercial",
       "summary": "If the Douro is Portugal's Rhône, the Dão is its Burgundy. Touriga Nacional, native here, shows a finer, more floral face than in the Douro, with violet, bergamot and red cherry, and is often blended with Alfrocheiro (bright, red-fruited), Jaen (the Mencía of Bierzo) and Tinta Roriz. The reds have fresh acidity and fine, granitic tannins, and the best age for decades: the old Garrafeiras of the 1960s from the Centro de Estudos de Nelas and cooperatives can still astonish.\n\nThe whites are the other revelation. Encruzado, almost unique to the Dão, takes barrel fermentation and lees ageing like Chardonnay, gaining a smoky, nutty, saline texture over ten years or more. Modern producers such as Álvaro Castro, Quinta dos Roques, Quinta dos Carvalhais, Casa de Mouraz, António Madeira and Textura are among Portugal's most admired.",
       "terroir": "Decomposed granite at 400 to 700 m in a basin surrounded by mountains; warm, dry summers, cold wet winters, wide day-night swings.",
       "producers": ["Quinta dos Carvalhais (Sogrape)", "Quinta dos Roques", "Álvaro Castro (Quinta da Pellada, Quinta de Saes)", "Casa de Santar", "Quinta da Falorca", "Casa de Mouraz", "António Madeira", "Textura (Quinta da Boavista)", "Quinta do Mondego", "Lusovini", "Boas Quintas", "Niepoort (Quinta da Lomba)"],
       "nerd_note": "Jaen is the same grape as Mencía in Spain's Bierzo; pilgrims on the road to Santiago are often credited with carrying it, though in which direction is still argued.",
       "contains": ["Alva", "Besteiros", "Castendo", "Serra da Estrela", "Silgueiros", "Terras de Azurara", "Terras de Senhorim"]}
dao_subs = [
    SUB("Serra da Estrela", "Dão", "Dão", 40.43, -7.68, ["red", "white"], "red", "Touriga Nacional, Alfrocheiro, Jaen; Encruzado, Malvasia Fina",
        "The highest Dão subregion, on the western foothills of the Serra da Estrela around Seia and Gouveia; vineyards reach about 800 m, giving the freshest, most mineral wines. Álvaro Castro's Quinta da Pellada and Quinta de Saes are here.",
        "Granite, high altitude, cold winters and cool nights.", ["Quinta da Pellada (Álvaro Castro)", "Quinta de Saes"], match=["Serra da Estrela", "Dão Serra da Estrela"]),
    SUB("Terras de Senhorim", "Dão", "Dão", 40.53, -7.85, ["red", "white"], "red", "Touriga Nacional, Alfrocheiro, Tinta Roriz; Encruzado",
        "Around Nelas and Carregal do Sal, the historic core of Dão research (the Centro de Estudos Vitivinícolas at Nelas) and home of Casa de Santar.",
        "Granite plateau at about 400 to 500 m.", ["Casa de Santar"]),
    SUB("Terras de Azurara", "Dão", "Dão", 40.58, -7.78, ["red", "white"], "red", "Touriga Nacional, Jaen, Alfrocheiro; Encruzado",
        "The Mangualde area (Azurara was the medieval name), home of Sogrape's Quinta dos Carvalhais and Quinta dos Roques.",
        "Granite, 400 to 550 m.", ["Quinta dos Carvalhais", "Quinta dos Roques"]),
    SUB("Silgueiros", "Dão", "Dão", 40.6, -7.95, ["red", "white"], "red", "Touriga Nacional, Jaen, Alfrocheiro; Encruzado",
        "South-west of Viseu along the Dão river; warm, well-exposed slopes and some of the region's riper reds. Quinta da Falorca is the best-known estate.",
        "Granite slopes, slightly warmer than the plateau.", ["Quinta da Falorca"]),
    SUB("Castendo", "Dão", "Dão", 40.68, -7.6, ["red", "white"], "red", "Touriga Nacional, Tinta Roriz, Jaen; Malvasia Fina",
        "The north-east of the Dão around Penalva do Castelo (formerly Castendo), on the plateau toward the Beira Alta.",
        "Granite, higher and more continental.", []),
    SUB("Besteiros", "Dão", "Dão", 40.55, -8.1, ["red", "white"], "red", "Touriga Nacional, Baga, Jaen; Encruzado, Bical",
        "Around Tondela on the western side, toward the Caramulo mountains: wetter and more Atlantic, with lighter, fresher wines. Casa de Mouraz farms organically here.",
        "Granite with some schist, more rainfall.", ["Casa de Mouraz"]),
    SUB("Alva", "Dão", "Dão", 40.36, -7.9, ["red", "white"], "red", "Touriga Nacional, Alfrocheiro, Tinta Roriz; Encruzado",
        "The southern subregion along the Alva river around Oliveira do Hospital, sheltered by the Estrela and Açor ranges.",
        "Granite and schist, river valleys.", []),
]
terras_dao = IGP("Terras do Dão", "Dão", 40.6, -7.9, "The regional (IGP) designation for the Dão and Lafões area.")

r_laf = None  # Lafões is described under the Dão region
lafoes = {"country": "pt", "id": "pt-lafoes", "name": "Lafões", "match": ["Lafões", "Lafoes", "DOC Lafões"],
          "cat": "DOC", "region": "Dão", "subregion": None, "created": "1991 (EU register); former IPR", "area_ha": None,
          "styles": ["white", "red"], "dominant_style": "white",
          "grapes": "Arinto, Cercial; Amaral, Jaen, Touriga Nacional",
          "summary": "A small, rainy hill region between the Dão and the Vinho Verde country, around São Pedro do Sul, Vouzela and Oliveira de Frades. Its wines are a transition between the two: light, high-acid whites from Arinto and Cercial and sharp reds from Amaral (Vinho Verde's Azal Tinto) and Jaen. Production is tiny and mostly local.",
          "terroir": "Granite valleys of the Vouga, Atlantic-influenced and wet.",
          "producers": ["Adega Cooperativa de Lafões"], "nerd_note": "Lafões is better known in Portugal for its veal (vitela de Lafões) than its wine.", "contains": []}

# ---------------- Beira Interior
r_bi = {
    "country": "pt", "name": "Beira Interior", "alt": ["Beiras"], "parent_region": None, "lat": 40.5, "lon": -7.15, "zoom": 8.5,
    "tagline": "Portugal's highest wine region, on the plateaux along the Spanish border, where old vines and altitude make taut, mineral wines.",
    "summary": "Beira Interior runs north to south along the Spanish border, from the Douro to the Tejo, with the Serra da Estrela, Portugal's highest mainland mountain, at its western edge. Vineyards lie at 300 to 750 m, many of them old field blends farmed by cooperatives. Long under-rated, the region is now attracting producers looking for freshness in a warming climate: Rui Roboredo Madeira, Quinta dos Termos, Quinta do Cardo and newcomers in the Cova da Beira are making crisp Síria whites and fragrant Rufete and Touriga reds.",
    "history": "Settled since prehistory (Côa rock art lies at its northern edge) and fortified through the Middle Ages, the Beira Interior was a land of castles and transhumance. Its three former IPRs, Castelo Rodrigo, Pinhel and Cova da Beira, were merged into DOC Beira Interior (EU registration 2004) and are now subregions.",
    "terroir": "Granite and schist plateaux, some of the highest vineyards in Portugal; continental climate with very cold winters, hot dry summers and large day-night swings.",
    "grapes": "Síria (Roupeiro), Fonte Cal, Arinto, Fernão Pires, Malvasia Fina; Rufete, Tinta Roriz, Touriga Nacional, Jaen, Marufo, Trincadeira.",
    "styles": "Fresh whites, perfumed reds, sparkling wines (especially from Pinhel).",
    "classification": "DOC Beira Interior with three subregions (Castelo Rodrigo, Pinhel, Cova da Beira); IGP Terras da Beira.",
    "appellations": ["Beira Interior", "Castelo Rodrigo", "Pinhel", "Cova da Beira", "Terras da Beira"],
    "sources": [SRC_WP_B, SRC_EU]
}
bi = {"country": "pt", "id": "pt-beira-interior", "name": "Beira Interior", "match": ["Beira Interior", "DOC Beira Interior"],
      "cat": "DOC", "region": "Beira Interior", "subregion": None, "created": "EU registration 2004 (merger of three IPRs)", "area_ha": None,
      "styles": ["white", "red", "sparkling", "rose"], "dominant_style": "red",
      "grapes": "Síria, Fonte Cal, Arinto, Fernão Pires; Rufete, Tinta Roriz, Touriga Nacional, Marufo, Jaen",
      "summary": "A big, high, sparsely planted DOC along the Spanish frontier. Síria, the local name for Roupeiro, gives citrusy, floral whites with real cut at altitude; Fonte Cal is a local white rarity. Reds from Rufete, Touriga Nacional and Tinta Roriz are lighter and more perfumed than in the Douro next door. Pinhel has a long sparkling-wine tradition; Cova da Beira, between the Estrela and Gardunha ranges around Fundão and Covilhã, has the most dynamic estates.",
      "terroir": "Granite and schist, 300 to 750 m, continental climate.",
      "producers": ["Quinta dos Termos", "Quinta do Cardo", "Rui Roboredo Madeira (Beyra)", "Adega Cooperativa de Pinhel"],
      "nerd_note": "Síria is the same grape as Roupeiro in the Alentejo and Códega in the Douro: one variety, three regional names.",
      "contains": ["Castelo Rodrigo", "Pinhel", "Cova da Beira"]}
bi_subs = [
    SUB("Castelo Rodrigo", "Beira Interior", "Beira Interior", 40.88, -6.96, ["red", "white"], "red", "Rufete, Touriga Nacional, Tinta Roriz; Síria",
        "The northern subregion around Figueira de Castelo Rodrigo, bordering the Douro Superior and Spain; warm, schist-and-granite hills with a hill-top medieval village. Quinta do Cardo is the best-known estate.",
        "Schist and granite, the warmest part of the Beira Interior.", ["Quinta do Cardo"]),
    SUB("Pinhel", "Beira Interior", "Beira Interior", 40.77, -7.06, ["white", "sparkling", "red"], "white", "Síria, Fonte Cal, Arinto; Rufete, Marufo",
        "Around the fortified town of Pinhel; known for whites and a long tradition of sparkling wine, with its cooperative as the main producer.",
        "Granite plateau at 500 to 700 m.", ["Adega Cooperativa de Pinhel"]),
    SUB("Cova da Beira", "Beira Interior", "Beira Interior", 40.2, -7.45, ["red", "white"], "red", "Rufete, Tinta Roriz, Touriga Nacional, Trincadeira; Síria, Fonte Cal, Arinto",
        "The basin of the Zêzere between the Serra da Estrela and the Serra da Gardunha, around Belmonte, Covilhã and Fundão (famous for cherries). The largest and most dynamic subregion.",
        "Granite and schist in a sheltered valley.", ["Quinta dos Termos"]),
]
terras_beira = IGP("Terras da Beira", "Beira Interior", 40.4, -7.2, "The regional (IGP) designation for the Beira Interior area.")

sites = [
    S("site-pt-bucaco-palace-hotel", "Palácio Hotel do Buçaco", "historic", "Neo-Manueline palace hotel with its own cellar", "Bairrada", 40.3768, -8.3651, "precise",
      "Built as a royal hunting palace from 1888 inside the walled Buçaco forest and turned into a hotel in 1917. Its wines, made under the hotel's own label for about a century from Bairrada and Dão grapes, are aged for years and sold only in the hotel and its sister properties; bottles back to the 1940s remain on the list and are legendary for longevity.", ["Buçaco (Alexandre Almeida)"]),
    S("site-pt-caves-sao-joao", "Caves São João", "cellar", "Historic Bairrada cave (1920)", "Bairrada", 40.4945, -8.4542, "precise",
      "Founded in 1920 by the Costa brothers at São João da Azenha, Caves São João built huge stocks of Bairrada and Dão reds (the Frei João and Porta dos Cavaleiros labels) and still releases old reserve wines from the 1960s onwards.", ["Caves São João"]),
    S("site-pt-alianca-underground-museum", "Aliança Underground Museum", "museum", "Cellars and art collection, Sangalhos", "Bairrada", 40.4893, -8.4718, "precise",
      "The cellars of Caves Aliança (founded 1927), part of the Bacalhôa group, now host a museum of archaeology, minerals and ceramics alongside barrels and millions of bottles of sparkling wine.", ["Aliança"]),
    S("site-pt-caves-messias", "Caves Messias", "cellar", "Bairrada sparkling and table-wine house (1926)", "Bairrada", 40.3755, -8.4477, "precise",
      "Founded in Mealhada in 1926, Messias is known for Bairrada Clássico reds and sparkling wine, and for its own Port business in Gaia.", ["Messias"]),
    S("site-pt-luis-pato", "Luís Pato (Óis do Bairro)", "estate", "Baga champion", "Bairrada", 40.4326, -8.4841, "approx",
      "Luís Pato took over his family's vineyards in the 1980s and became Bairrada's best-known grower, making single-vineyard Baga (Vinha Pan, Vinha Barrosa) and an ungrafted Baga from sand. His daughter Filipa Pato makes 'authentic wines without make-up' nearby. The point marks Óis do Bairro, the family's home village; exact winery location not verified.", ["Luís Pato", "Filipa Pato"]),
    S("site-pt-quinta-das-bageiras", "Quinta das Bágeiras", "estate", "Traditional Bairrada grower, Fogueira", "Bairrada", 40.4832, -8.4914, "approx",
      "Mário Sérgio Alves Nuno's estate in the hamlet of Fogueira near Sangalhos: Baga fermented in open lagares with stems and aged in old casks, and long-aged bottle-fermented sparkling wines. A benchmark of classic Bairrada. Point at the hamlet.", ["Quinta das Bágeiras"]),
    S("site-pt-mealhada-leitao", "Mealhada (leitão and Espumante)", "village", "Roast suckling pig capital", "Bairrada", 40.3781, -8.4500, "precise",
      "The town on the old Lisbon to Porto road whose restaurants roast suckling pig (leitão à Bairrada) in wood ovens; the dish is always paired with Bairrada sparkling wine, whose acidity and bubbles cut the fat.", []),
    S("site-pt-quinta-dos-carvalhais", "Quinta dos Carvalhais", "quinta", "Sogrape's Dão estate", "Dão", 40.5577, -7.7862, "precise",
      "Sogrape bought this estate near Mangualde in 1988 and built a modern winery, a key moment in the Dão's revival; its Encruzado and Touriga Nacional set modern benchmarks, and Duque de Viseu is one of Portugal's best-known red brands.", ["Sogrape"]),
    S("site-pt-quinta-dos-roques", "Quinta dos Roques", "quinta", "Family estate, Abrunhosa do Mato", "Dão", 40.5425, -7.7458, "approx",
      "The Oliveira family's estate near Mangualde (with Quinta das Maias near Gouveia) became one of the stars of the 1990s Dão revival, with varietal Encruzado and Touriga Nacional. Point at the village of Abrunhosa do Mato.", ["Quinta dos Roques"]),
    S("site-pt-quinta-da-pellada", "Quinta da Pellada (Álvaro Castro)", "quinta", "Álvaro Castro's estate, Pinhanços", "Dão", 40.4690, -7.6853, "approx",
      "Álvaro Castro's family estate at Pinhanços in the Serra da Estrela foothills, with old granite terraces and walled vineyards; with Quinta de Saes, it is the source of some of the Dão's most admired wines, including Primus (old-vine white) and the Pape blend. Point at Pinhanços.", ["Álvaro Castro"]),
    S("site-pt-casa-de-santar", "Casa de Santar", "estate", "Historic manor and estate, Santar", "Dão", 40.5707, -7.8911, "precise",
      "A 17th-century manor in the village of Santar, one of the Dão's oldest wine estates, with a formal garden; now part of the Global Wines group. Santar's village of noble houses (Santar Vila Jardim) is a model of wine tourism.", ["Casa de Santar"]),
    S("site-pt-solar-paco-dos-cunhas-de-santar", "Paço dos Cunhas de Santar", "historic", "Manor house and restaurant, Santar", "Dão", 40.5722, -7.8923, "precise",
      "A 17th-century manor in Santar with a vineyard and restaurant run by the Dão Sul / Global Wines group.", []),
    S("site-pt-quinta-da-falorca", "Quinta da Falorca", "quinta", "Silgueiros estate", "Dão", 40.5831, -7.9358, "approx",
      "A family estate in the Silgueiros subregion known for long-lived Touriga Nacional and Jaen, and the T-Nac label. Point at the Quinta da Falorca road stop.", ["Quinta da Falorca"]),
    S("site-pt-adega-cooperativa-de-pinhel", "Adega Cooperativa de Pinhel", "cellar", "Cooperative, Pinhel", "Beira Interior", 40.7722, -7.0616, "precise",
      "The main producer of the Pinhel subregion, known for sparkling wine and Síria whites from high granite plateaux.", ["Adega Cooperativa de Pinhel"]),
    S("site-pt-castelo-rodrigo", "Castelo Rodrigo", "village", "Medieval hill village", "Beira Interior", 40.8776, -6.9650, "precise",
      "A walled medieval village on a hill above the plains toward Spain, giving its name to the northern subregion of Beira Interior.", []),
    S("site-pt-tapada-de-chaves-placeholder", "Fundão and the Cova da Beira", "village", "Cherry town and wine subregion", "Beira Interior", 40.1392, -7.5019, "precise",
      "Fundão, famous for cherries, sits at the heart of the Cova da Beira subregion between the Gardunha and Estrela mountains, the most active part of the Beira Interior wine scene.", []),
]
# fix id for Fundão site
sites[-1]["id"] = "site-pt-fundao-cova-da-beira"

data = {"countries": [], "regions": [r_bai, r_dao, r_bi],
        "appellations": [bai, beira_atl, dao] + dao_subs + [terras_dao, lafoes, bi] + bi_subs + [terras_beira], "sites": sites}
json.dump(data, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ok", OUT, len(sites), "sites")
