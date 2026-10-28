"""Part 1: Portugal and Cape Verde country entries. Writes work/pt/p1_country.json"""
import json, os

OUT = "/home/claude/winesite/work/pt/p1_country.json"

pt = {
    "iso2": "pt",
    "name": "Portugal",
    "tier": "major",
    "tagline": "A narrow Atlantic country with some 250 native grapes, two of the world's great fortified wines and a table-wine revolution still gathering speed.",
    "stats": {
        "vineyard_ha": 171000,
        "production_mhl": 6.0,
        "year": 2025,
        "world_rank_production": 10,
        "note": "OIV, State of the World Wine Sector in 2025 (May 2026): vineyard 171 kha (10th in the world), production 6.0 mhl (-14% on 2024, lowest since 2011), consumption a record 5.6 mhl, exports 3.4 mhl worth about 1.0 bn EUR. IVV put the 2025/26 campaign at 5.9 mhl."
    },
    "overview": (
        "Portugal is small on the map and enormous in the glass. From the granite hills of the Minho to the cork-oak plains of the Alentejo it covers barely 560 km north to south, yet it holds about 171,000 hectares of vines (the world's tenth-largest vineyard in 2025) and a grape list that runs to roughly 250 native varieties. Almost none of them were planted elsewhere until recently. Touriga Nacional, Touriga Franca, Baga, Alvarinho, Arinto, Encruzado: these are names you learn in Portugal because this is where they live.\n\n"
        "The country's fame was built on two fortified wines made for export. Port, from the schist terraces of the Douro, was shaped by English merchants who needed a wine that survived the sea and suited a cold northern climate; the Douro became one of the world's first legally delimited wine regions in 1756, a century before Bordeaux had its classification. Madeira, from an island 1,000 km out in the Atlantic, was cooked by tropical voyages until merchants learned to recreate the heat in warm lofts and stoves; it filled the glasses that toasted American independence. Behind them come two lesser-known sweet wines with long pedigrees: Moscatel de Setúbal, perfumed and amber, and Carcavelos, an almost-vanished fortified wine from the Lisbon coast now being nursed back to life.\n\n"
        "For most of the 20th century the rest of Portugal's wine was made by cooperatives for a closed home market and the colonies, or blended into the sweet, slightly fizzy rosés (Mateus, Lancers) that conquered the post-war world. Joining the European Community in 1986 changed everything. Money, stainless steel, temperature control and young winemakers trained in Bordeaux, Montpellier and Davis arrived together. In the Douro, families who had sold grapes to Port shippers for generations started bottling dry reds under their own names; the group of five estates that marketed themselves as the Douro Boys in the early 2000s became the symbol of that change. The Alentejo grew from a cereal belt into the country's most popular wine region; the Dão rediscovered the finesse of its granite; Bairrada's growers rehabilitated the fearsome Baga grape.\n\n"
        "The result is a wine culture that feels both very old and very young. Talha wine is still fermented in clay jars in the Alentejo much as the Romans did it; the ungrafted Ramisco vines of Colares grow in Atlantic dune sand that phylloxera never crossed; Pico Island's black-basalt vineyard walls are a UNESCO World Heritage landscape. At the same time a new generation is making low-intervention whites from Vinho Verde's mountain valleys, high-altitude reds from the Serra da Estrela and old-vine field blends from forgotten Douro hillsides.\n\n"
        "Portugal also drinks its own wine with conviction. The OIV recorded a record 5.6 million hectolitres of domestic consumption in 2025, one of the highest per-head levels in the world, even as production fell to 6.0 mhl after a season of record rain followed by heat and disease. Exports are worth about 1 billion euros a year; Port alone is close to a third of that value. The sector's live issue in 2026 is oversupply: the Douro has more vineyard than the shrinking Port market can absorb, and the annual Port quota (the beneficio) fell from 104,000 pipes in 2023 to 75,000 in 2025 before edging up to 76,000 for the 2026 harvest."
    ),
    "history": [
        {"when": "c. 2nd century BC", "title": "Rome reaches Lusitania", "text": "Vines were probably first planted by Tartessians and Phoenicians in the south, but it was Rome that spread viticulture after conquering the province it called Lusitania. Roman wine presses and dolia have been excavated across the Alentejo, and the clay-jar (talha) tradition of the Vidigueira area is the living descendant of that technology.", "lat": 38.2233, "lon": -7.845},
        {"when": "1386", "title": "Treaty of Windsor", "text": "England and Portugal signed the alliance that is still in force today, the oldest diplomatic alliance in the world. It gave English merchants privileges in Portuguese ports, and trade in wine, cloth and salt cod grew under its protection. Viana do Castelo and Monção shipped red 'Viana' wine to England long before Port existed.", "lat": 41.6932, "lon": -8.8329},
        {"when": "1678", "title": "Brandy meets Douro wine", "text": "The best-known Port origin story has two Liverpool wine merchants finding the abbot of Lamego adding brandy to his wine during fermentation. True or not, the late 17th century is when English shippers in Porto began fortifying Douro red to stabilise it for the sea voyage, creating the sweet, strong style that became Port.", "lat": 41.0975, "lon": -7.81},
        {"when": "1703", "title": "Methuen Treaty", "text": "John Methuen's commercial treaty set duties on Portuguese wine in England at a third below those on French wine, in exchange for Portugal opening its market to English woollens. With England at war with France, Port became the patriotic drink of Georgian England and the Douro's fortunes were made.", "lat": 41.1406, "lon": -8.6119},
        {"when": "1756", "title": "Pombal demarcates the Douro", "text": "After a price collapse blamed on adulteration and the power of the English shippers, the Marquis of Pombal created the Companhia Geral da Agricultura das Vinhas do Alto Douro by royal charter of 10 September 1756. It drew a legal boundary around the Douro vineyards, graded them, and between 1758 and 1761 set 335 granite boundary stones (the marcos pombalinos) around the best land. It is one of the first legally delimited and regulated wine regions in the world.", "lat": 41.1632, "lon": -7.789},
        {"when": "1790", "title": "The Factory House", "text": "The British merchants of Porto, organised as a 'factory' (trading association), completed their club house on Rua do Infante Dom Henrique around 1790. It still hosts the weekly lunch of the Port shippers' association, where decanters of Vintage Port are passed to the left.", "lat": 41.1415, "lon": -8.6137},
        {"when": "1843", "title": "Forrester maps the river", "text": "Joseph James Forrester, an English merchant later made a baron, published his great map of the Douro in 1843 (with later editions) and campaigned against the over-fortification of Port. He drowned in 1861 when his boat overturned at the Cachão da Valeira rapids; legend says Dona Antónia Ferreira, aboard the same boat, was saved by her crinoline.", "lat": 41.158, "lon": -7.3679},
        {"when": "1852", "title": "Oidium", "text": "Powdery mildew arrived from America in the early 1850s and devastated both Madeira and the Douro. On Madeira, many growers switched to sugar cane or replanted with hybrids; the noble Madeira varieties never fully recovered their pre-oidium area.", "lat": 32.6511, "lon": -16.909},
        {"when": "1863-1880s", "title": "Phylloxera", "text": "The vine louse was identified in the Douro in the 1860s and wiped out much of the old vineyard by the 1880s. The ruins of abandoned terraces, the mortórios, still scar the hillsides. Replanting on American rootstocks pushed vineyards upriver into the Douro Superior, and a few ungrafted survivors, such as Quinta do Noval's Nacional parcel and the sand vineyards of Colares, became legends.", "lat": 41.2131, "lon": -7.5378},
        {"when": "1907-1911", "title": "A map of demarcated regions", "text": "A burst of laws between 1907 and 1911, under the last kings and the first Republic, created or re-confirmed demarcated regions for Port and the Douro, Madeira, Moscatel de Setúbal, Carcavelos, Colares, Bucelas, Dão and Vinho Verde, laying the skeleton of the modern appellation system.", "lat": 38.7223, "lon": -9.1393},
        {"when": "1933", "title": "Estado Novo corporatism", "text": "Salazar's regime created the Instituto do Vinho do Porto (1933) and the Casa do Douro (1932) and pushed growers into cooperatives (the adegas cooperativas) from the 1940s onwards. The system guaranteed outlets but rewarded volume, and most Portuguese table wine was anonymous until the 1980s.", "lat": 41.1608, "lon": -7.7884},
        {"when": "1942", "title": "Mateus Rosé", "text": "Fernando van Zeller Guedes created a lightly sparkling, off-dry rosé for the export market and named it after the baroque Mateus Palace near Vila Real, whose image went on the flask-shaped bottle. Mateus and its rival Lancers (from José Maria da Fonseca) became among the best-selling wines in the world in the 1960s and 1970s; Mateus founded the fortune of Sogrape.", "lat": 41.2968, "lon": -7.7122},
        {"when": "1986", "title": "EU accession", "text": "Portugal joined the European Community on 1 January 1986. The Port shippers lost their export monopoly through Vila Nova de Gaia, so Douro estates could ship Port directly; EU funds paid for new wineries and the replanting of whole regions; and the DOC system was rebuilt on European lines.", "lat": 38.7223, "lon": -9.1393},
        {"when": "2001", "title": "UNESCO and the Douro Boys", "text": "The Alto Douro Wine Region was inscribed as a World Heritage cultural landscape in 2001 (24,600 ha core zone). In the same years Quinta do Crasto, Quinta do Vale Meão, Quinta do Vallado, Niepoort and Quinta Vale Dona Maria began promoting their dry Douro reds together as the Douro Boys, announcing the region's second life as a table-wine region.", "lat": 41.1657, "lon": -7.5177},
        {"when": "2004", "title": "Pico's lava vineyards listed", "text": "UNESCO inscribed the Landscape of the Pico Island Vineyard Culture, a grid of small walled plots (currais) built from black basalt to protect vines from wind and salt spray.", "lat": 38.5142, "lon": -28.5342},
        {"when": "2023-2026", "title": "The Douro surplus", "text": "Falling Port sales forced the IVDP to cut the annual Port quota from 104,000 pipes (2023) to 90,000 (2024) and 75,000 (2025); it was set at 76,000 for 2026. Crisis distillation and calls to reform the beneficio system dominate the region's politics.", "lat": 41.1632, "lon": -7.789}
    ],
    "classification": (
        "Portugal uses the EU two-tier system with its own labels. The top tier is the DOP (Denominação de Origem Protegida), still almost universally written DOC (Denominação de Origem Controlada) on labels and by wine people; there are 30 wine DOPs registered with the EU (31 if you count Porto and Douro, which share one territory, as two, which the register does). The second tier is the IGP (Indicação Geográfica Protegida), labelled Vinho Regional: Minho, Transmontano, Duriense, Terras de Cister, Terras do Dão, Terras da Beira, Beira Atlântico, Lisboa, Tejo, Península de Setúbal, Alentejano, Algarve, Açores and Terras Madeirenses. Many of Portugal's most ambitious wines are Vinho Regional because the producer wanted to use grapes or blends outside the DOC rules. Below that is plain Vinho (wine without geographical indication).\n\n"
        "Each region is policed by a Comissão Vitivinícola Regional (CVR), except the Douro (IVDP) and Madeira (IVBAM), where state institutes control both production and the fortified-wine trade. National policy is set by the Instituto da Vinha e do Vinho (IVV).\n\n"
        "Label terms that matter: Reserva (higher quality, at least 0.5% above the minimum alcohol for the DOC); Grande Reserva; Garrafeira (for red, at least 30 months ageing including 12 in bottle; for white 12 months including 6 in bottle); Colheita (vintage); Quinta (single estate); Herdade (estate, used in the south); Escolha (selection). Port and Madeira have their own category systems, explained in their entries. Some DOCs contain subregions that may be named on the label (Vinho Verde has nine, Alentejo eight, Dão seven, Beira Interior three, Trás-os-Montes three).\n\n"
        "Two quirks: the territory of the Douro carries two DOPs on one map, Porto for fortified wine and Douro for unfortified wines, and growers there need a quota (beneficio) to turn their grapes into Port; and on Madeira the DOP Madeira covers the fortified wine while Madeirense covers the island's young dry table wines."
    ),
    "climate_soils": (
        "Portugal is an Atlantic country with a Mediterranean south. The north-west (Minho, coastal Beiras) is green and wet, with 1,200 to 2,000 mm of rain a year falling on granite: perfect for fresh, acidic whites like Alvarinho and Loureiro. A chain of mountains (Peneda-Gerês, Marão, Alvão, Montemuro, Caramulo, Serra da Estrela) blocks the Atlantic rain from the interior, so the Douro, Trás-os-Montes and Beira Interior are progressively drier and more continental: the Douro Superior can see 400 mm of rain and summer days over 40 °C.\n\n"
        "Geology splits the country too. The Douro is schist, a flaky rock that the vines' roots can penetrate and that stores what little water falls; this is why Port can only come from the schist core of the valley. The Dão and much of the Minho sit on granite, giving lean, perfumed wines. Bairrada has clay-limestone (the name comes from barro, clay), the key to Baga's tannic power and long life. Lisbon's coast mixes limestone, clay and, at Colares, pure Atlantic sand; Setúbal has limestone on the Arrábida hills and sand on the plain; the Alentejo is a mosaic of schist, granite, marble (around Estremoz and Borba) and red Mediterranean clays under hot, dry summers. The islands are volcanic: basalt and tuff on Madeira and the Azores, where wind, salt spray and humidity shape everything from vine training to the final wine."
    ),
    "grapes": [
        {"name": "Touriga Nacional", "note": "The flagship red. Native to the Dão, it gives small berries, deep colour, violet and bergamot perfume and firm tannin. Once scarce because of low yields, it was rescued by clonal selection in the 1970s and 1980s and is now planted everywhere, from Port to Alentejo."},
        {"name": "Touriga Franca", "note": "The most planted grape in the Douro and the backbone of most Port blends: floral, dense, reliable and better than Nacional at handling heat. Also called Touriga Francesa."},
        {"name": "Tinta Roriz", "note": "Tempranillo, known as Aragonez in the south. Widely planted across Douro, Dão and Alentejo; gives body and red fruit, but can be dilute when overcropped."},
        {"name": "Baga", "note": "Bairrada's thick-skinned, late-ripening, high-acid, very tannic red. Notoriously difficult, it makes long-lived reds and some of Portugal's best traditional-method sparkling wines."},
        {"name": "Castelão", "note": "Once the most planted red in Portugal (also called Periquita), the grape of the Setúbal Peninsula sands, where it gives supple, red-fruited wine."},
        {"name": "Alicante Bouschet", "note": "A French teinturier (red-fleshed) that found its true home in the Alentejo, where Herdade do Mouchão has grown it since the early 20th century."},
        {"name": "Trincadeira", "note": "Tinta Amarela in the Douro. Spicy and aromatic but rot-prone; a key Alentejo blending grape in hot, dry sites."},
        {"name": "Alfrocheiro", "note": "A Dão native with bright acidity and red-berry fruit, increasingly bottled alone."},
        {"name": "Ramisco", "note": "The rare, ungrafted, very tannic red of the Colares sand vineyards."},
        {"name": "Tinta Negra", "note": "Madeira's workhorse, most of the island's grapes; since 2015 it may be named on labels."},
        {"name": "Alvarinho", "note": "Albariño, the most prestigious grape of Vinho Verde, historically concentrated in Monção e Melgaço. Peach, citrus and minerality, with ageing potential."},
        {"name": "Loureiro", "note": "Floral, laurel-scented Vinho Verde grape of the Lima and Cávado valleys."},
        {"name": "Arinto", "note": "Pedernã in Vinho Verde. Bracing natural acidity that survives heat, which makes it valuable from Bucelas to the Alentejo."},
        {"name": "Encruzado", "note": "The Dão's great white: textured, ageworthy, able to take oak like a fine white Burgundy."},
        {"name": "Fernão Pires", "note": "Maria Gomes in Bairrada. The most planted white in Portugal, aromatic and versatile, central to Tejo and Bairrada wines and sparkling bases."},
        {"name": "Antão Vaz", "note": "The Alentejo's best white, from Vidigueira: full-bodied with tropical fruit."},
        {"name": "Moscatel Graúdo and Moscatel Roxo", "note": "Muscat of Alexandria and a rare pink-skinned Muscat, the grapes of Moscatel de Setúbal."},
        {"name": "Sercial, Verdelho, Boal, Malvasia, Terrantez", "note": "The noble white varieties of Madeira, which also define the wine's sweetness level when named on the label."},
        {"name": "Verdelho (Azores)", "note": "The historic grape of Pico and Terceira, together with Arinto dos Açores and Terrantez do Pico."}
    ],
    "regions": ["Vinho Verde", "Trás-os-Montes", "Douro Valley", "Távora-Varosa", "Bairrada", "Dão", "Beira Interior", "Lisboa", "Tejo", "Península de Setúbal", "Alentejo", "Algarve", "Madeira", "Azores"],
    "further_reading": [
        "The Wines of Portugal, Richard Mayson (Infinite Ideas, 2nd ed. 2020)",
        "Port and the Douro, Richard Mayson (Infinite Ideas, 4th ed. 2016)",
        "Madeira: The Islands and Their Wines, Richard Mayson (Infinite Ideas, 2015)",
        "Port: Vintage, Tawny and other styles, George Robertson; and The Port Companion, Godfrey Spence",
        "Wine Grapes, Jancis Robinson, Julia Harding and José Vouillamoz (2012), for the native varieties",
        "Wines of Portugal (winesofportugal.com), the ViniPortugal generic site"
    ],
    "sources": [
        {"title": "OIV, State of the World Wine Sector in 2025 (May 2026)", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf"},
        {"title": "OIV, State of the World Vine and Wine Sector in 2024 (April 2025)", "url": "https://www.oiv.int/sites/default/files/2025-04/OIV-State_of_the_World_Vine-and-Wine-Sector-in-2024.pdf"},
        {"title": "Forbes Portugal: Produção de vinho cai 14% na campanha 2025/2026 (IVV figures)", "url": "https://www.forbespt.com/?p=177523"},
        {"title": "AICEP Portugal Global: Faturação do setor do vinho cresce 2% em 2025", "url": "https://www.portugalglobal.pt/pt/noticias/2026/fevereiro/faturacao-do-setor-do-vinho-cresce-2-em-2025/"},
        {"title": "Diário de Notícias: Portugal perdeu 50 mil hectares de vinha numa década (IVV data by region)", "url": "https://www.dn.pt/economia/portugal-perdeu-50-mil-hectares-de-vinha-numa-década-mas-os-excedentes-de-vinho-continuam-a-preocupar"},
        {"title": "Renascença: Douro aumenta produção de vinho do Porto para as 76 mil pipas em 2026", "url": "https://rr.pt/noticia/economia/2026/07/17/douro-aumenta-producao-de-vinho-do-porto-para-as-76-mil-pipas-em-2026/478674/"},
        {"title": "EU geospatial inventory of wine PDOs (Candiago et al. 2022), PT entries", "url": "https://doi.org/10.6084/m9.figshare.c.5877659"},
        {"title": "UNESCO World Heritage: Alto Douro Wine Region", "url": "https://whc.unesco.org/en/list/1046"},
        {"title": "RTP: Localizados 105 marcos pombalinos dos 335 colocados no século XVIII", "url": "https://www.rtp.pt/noticias/pais/localizados-105-marcos-pombalinos-dos-335-colocados-no-seculo-xviii_n41501"}
    ]
}

cv = {
    "iso2": "cv",
    "name": "Cape Verde",
    "tier": "minor",
    "tagline": "Wine from inside a live volcano: the vineyards of Chã das Caldeiras, in the crater of Pico do Fogo.",
    "stats": {"vineyard_ha": 120, "production_mhl": 0.001, "year": 2025, "world_rank_production": 0, "note": "No OIV figures. About 1.2 km2 of vines in the Fogo caldera (Wikipedia, Chã das Caldeiras); the Chã cooperative alone made about 100,000 litres a year by 2025 (Forbes África Lusófona, Aug 2025); a 2019 report claimed far more, so the area figure is uncertain."},
    "overview": (
        "Cape Verde's wine comes almost entirely from one extraordinary place: Chã das Caldeiras, a flat-floored caldera about 9 km across at roughly 1,700 metres on the island of Fogo, overlooked by the 2,829 m cone of Pico do Fogo. Vines grow there in black volcanic ash and lapilli, planted in hollows dug down to moisture and spread low across the ground. Rain is scarce and erratic, but altitude and cool nights let the grapes keep their freshness in a country that sits at 15 degrees north.\n\n"
        "Tradition credits a French count, François Louis Armand de Montrond, who stopped on Fogo around 1670, with introducing vines; Portuguese settlers certainly grew grapes on the island from the 17th century, and families in the crater still make a rustic house wine called *manecom*. Commercial bottling only began in 1998, when an Italian NGO helped organise a growers' cooperative and the *Chã* brand. The 2014 to 2015 eruption, the latest of many, buried most of the villages of Portela and Bangaeira and the old cooperative winery under lava, yet growers returned and rebuilt inside the crater.\n\n"
        "Today the main labels are Chã (the cooperative, white, red and rosé, about 100,000 litres a year), Maria Chaves from the Monte Barro winery (a 25-hectare irrigated vineyard planted in 2009 with support from Capuchin-linked Italian aid), Sodade and Monte Losna. The whites, often from a Muscat-like local grape called *sabro branco*, are the best known; the reds lean on Alfrocheiro and Preta. There is no legally protected appellation yet."
    ),
    "history": [
        {"when": "c. 1670", "title": "Montrond's vines", "text": "Local tradition credits the French count Montrond, who stayed on Fogo after a voyage to Brazil, with bringing the first vines and coffee plants to the island.", "lat": 14.9603, "lon": -24.3675},
        {"when": "1998", "title": "The Chã cooperative", "text": "With support from the Italian NGO COSPE, growers began bottling wine commercially under the Chã label, the first modern Cape Verdean wine brand.", "lat": 14.9681, "lon": -24.3674},
        {"when": "2014-2015", "title": "Eruption", "text": "The eruption that began on 23 November 2014 destroyed about three quarters of the buildings in Portela and Bangaeira, including the cooperative winery. A new winery opened inside the crater in 2015.", "lat": 14.9493, "lon": -24.3404}
    ],
    "classification": "Cape Verde has no wine appellation system or OIV membership-based statistics. Wines are labelled by brand and island (Fogo).",
    "climate_soils": "Tropical arid Sahelian climate moderated by altitude: vineyards in Chã das Caldeiras lie at about 1,600 to 1,900 m (some up to 2,100 m on the cone's flanks), on fresh volcanic ash, lapilli and lava fields with very little rain, which falls mainly between August and October. Vines are planted in hollows and trained low or as bush vines; dry farming is the norm except at the irrigated Maria Chaves vineyard.",
    "grapes": [
        {"name": "Sabro branco", "note": "A Muscat-like local white grape, basis of the aromatic Fogo whites."},
        {"name": "Alfrocheiro", "note": "Portuguese red variety that is now important for Fogo reds."},
        {"name": "Preta tinta", "note": "Local name for the traditional red grapes used in manecom."}
    ],
    "regions": ["Fogo"],
    "further_reading": ["Forbes África Lusófona, 'Vinho do Fogo, o néctar da resiliência' (Aug 2025)"],
    "sources": [
        {"title": "Wikipedia: Chã das Caldeiras", "url": "https://en.wikipedia.org/wiki/Ch%C3%A3_das_Caldeiras"},
        {"title": "Forbes África Lusófona: Vinho do Fogo, o néctar da resiliência (27 Aug 2025)", "url": "https://forbesafricalusofona.com/?p=161692"},
        {"title": "Sábado: Seca e erupções não travam produtores de vinho do vulcão do Fogo (Dec 2019)", "url": "https://www.sabado.pt/mundo/detalhe/seca-e-erupcoes-nao-travam-produtores-de-vinho-do-vulcao-do-fogo"}
    ]
}

cv_region = {
    "country": "cv", "name": "Fogo", "alt": ["Chã das Caldeiras", "Ilha do Fogo"], "parent_region": None,
    "lat": 14.9603, "lon": -24.3675, "zoom": 11,
    "tagline": "Vines on fresh lava at 1,700 metres, inside the crater of Pico do Fogo.",
    "summary": "Fogo ('fire') is the volcanic island of the Sotavento group, and its wine is grown almost entirely on the floor of the Chã das Caldeiras caldera beneath Pico do Fogo. The vines are low bushes in ash and cinder; the wines (mostly whites) are fresh, aromatic and saline, with surprising acidity for the latitude.",
    "history": "Vines were introduced in the 17th century, traditionally by the Count of Montrond around 1670. For three centuries wine was a household product (manecom). Bottling began with the Chã cooperative in 1998; the Maria Chaves project followed in 2009 and released its first wine in 2013. The 1951, 1995 and 2014 eruptions repeatedly destroyed homes and vineyards, and each time the farmers came back.",
    "terroir": "Altitude (about 1,700 m), strong sun, a short rainy season and young volcanic soils with almost no organic matter. The caldera wall (Bordeira) shelters the plain from the north-east trades; nights are cool enough to preserve acidity. Water is the limiting factor: harvests swing widely with the rains.",
    "grapes": "Sabro branco (Muscat type), Alfrocheiro, local reds known as Preta; about 25 varieties were identified in a recent survey.",
    "styles": "Dry whites (about three quarters of output), reds around 14% alcohol, rosé, a sparkling pilot and fruit liqueurs; manecom is the traditional sweetish house wine.",
    "classification": "No protected designation; brands only.",
    "appellations": [],
    "sources": [
        {"title": "Forbes África Lusófona (Aug 2025)", "url": "https://forbesafricalusofona.com/?p=161692"},
        {"title": "Wikipedia: Chã das Caldeiras", "url": "https://en.wikipedia.org/wiki/Ch%C3%A3_das_Caldeiras"}
    ]
}

cv_sites = [
    {"id": "site-cv-cooperativa-cha-das-caldeiras", "country": "cv", "name": "Adega Cooperativa de Chã (Chã wines)", "kind": "cellar", "class": "Growers' cooperative, founded 1998", "appellation": None,
     "lat": 14.9681, "lon": -24.3674, "coord_quality": "precise",
     "text": "The cooperative of about 85 Chã das Caldeiras growers makes the Chã white, red and rosé, the oldest Cape Verdean wine brand, at roughly 100,000 litres a year. Its first winery was swallowed by the 2014 lava flow; the growers refused to move to the coast and rebuilt inside the crater in 2015.",
     "producers": ["Chã"]},
    {"id": "site-cv-pico-do-fogo", "country": "cv", "name": "Pico do Fogo", "kind": "landscape", "class": "Active stratovolcano, 2,829 m", "appellation": None,
     "lat": 14.9493, "lon": -24.3404, "coord_quality": "precise",
     "text": "Cape Verde's highest point and an active volcano whose 2014 to 2015 eruption overran the crater villages. Its vineyards climb the cone's lower flanks; the Pico do Fogo name is also used for a Maria Chaves reserva.",
     "producers": []},
    {"id": "site-cv-cha-das-caldeiras", "country": "cv", "name": "Chã das Caldeiras", "kind": "landscape", "class": "Caldera vineyard plain, about 1,700 m", "appellation": None,
     "lat": 14.9603, "lon": -24.3675, "coord_quality": "approx",
     "text": "The flat floor of the Fogo caldera, about 9 km across, is where nearly all Cape Verdean grapes are grown: bush vines in black ash between lava tongues, with the cone of Pico do Fogo on one side and the 1,000 m wall of the Bordeira on the other.",
     "producers": ["Chã", "Maria Chaves", "Sodade"]}
]

data = {"countries": [pt, cv], "regions": [cv_region], "appellations": [], "sites": cv_sites}
os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump(data, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ok", OUT)
