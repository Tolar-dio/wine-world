"""Part 2: Douro Valley, Port and Douro DOCs, Moscatel do Douro, subregions, Duriense, Gaia lodges and quintas.
Writes work/pt/p2_douro.json"""
import json, os

OUT = "/home/claude/winesite/work/pt/p2_douro.json"
SRC_IVDP = {"title": "IVDP Circular 01/2025 (80 Years Old and Very Very Old Port indications)", "url": "https://ivdp.pt/media/avlbjznd/circular_01_2025_signed_signed.pdf"}
SRC_RR = {"title": "Renascença: benefício 2026 set at 76,000 pipas (17 Jul 2026)", "url": "https://rr.pt/noticia/economia/2026/07/17/douro-aumenta-producao-de-vinho-do-porto-para-as-76-mil-pipas-em-2026/478674/"}
SRC_ECO = {"title": "ECO: O que é o benefício do Douro (2026)", "url": "https://eco.sapo.pt/descodificador/afinal-o-que-e-o-beneficio-do-douro-vinhateiro-e-porque-gera-controversia-no-setor/"}
SRC_SALT = {"title": "Salt of Portugal: The right to make Port (Aug 2026)", "url": "https://saltofportugal.com/2026/08/10/the-right-to-make-port/"}
SRC_MORAIS = {"title": "F. Morais, Vinos licorosos de Portugal (IVV presentation)", "url": "https://evega.xunta.gal/sites/default/files/contido/relatorios/vinos_licorosos_portugal-francisco-morais.pdf"}
SRC_UNESCO = {"title": "UNESCO: Alto Douro Wine Region", "url": "https://whc.unesco.org/en/list/1046"}
SRC_DB = {"title": "The Drinks Business: How a distorted system is creating a crisis in the Douro (Oct 2025)", "url": "https://www.thedrinksbusiness.com/2025/10/how-a-distorted-system-is-creating-a-crisis-in-the-douro/"}
SRC_MARCOS = {"title": "RTP: 105 of 335 marcos pombalinos located", "url": "https://www.rtp.pt/noticias/pais/localizados-105-marcos-pombalinos-dos-335-colocados-no-seculo-xviii_n41501"}
SRC_FTLOP = {"title": "For the Love of Port: IVDP special categories regulation (2005, translated)", "url": "https://fortheloveofport.com/regulation-for-the-special-categories-of-port-wine/"}
SRC_DEC50 = {"title": "Decanter: New 50-year-old Port category", "url": "https://www.decanter.com/wine-reviews-tastings/new-50-year-old-port-category-468981/"}
SRC_WOP_MOSC = {"title": "Wines of Portugal: Moscatel", "url": "https://winesofportugal.com/en/portuguese-wines/wine-styles/vinho-moscatel/"}

region = {
    "country": "pt", "name": "Douro Valley", "alt": ["Douro", "Região Demarcada do Douro", "Alto Douro", "Douro Demarcated Region"], "parent_region": None,
    "lat": 41.17, "lon": -7.48, "zoom": 8.6,
    "tagline": "A river carved through schist, terraced by hand over three centuries: the home of Port and of Portugal's most powerful red wines.",
    "summary": (
        "The Douro Demarcated Region follows the river for about 100 km from Barqueiros, an hour east of Porto, to the Spanish border at Barca d'Alva. It covers some 250,000 hectares, of which roughly 43,000 to 44,000 are vineyard, farmed by about 18,000 growers. Almost all of it is mountain viticulture: the Douro is often described as holding around half of the world's steep-slope vineyard, and nearly every vine stands on a terrace someone built.\n\n"
        "One territory carries two protected names. Porto (Port) is the fortified wine, made under an annual quota, the beneficio, that decides how much of each farm's must may be turned into Port. Douro is the name for everything else: dry reds and whites, rosés, sparkling wines and the fortified Moscatel do Douro. For two centuries the region was a grape farm for the Port shippers of Vila Nova de Gaia; since the 1990s it has become one of Europe's most exciting table-wine regions as well, with old-vine field blends from the side valleys of the Pinhão, Torto, Tua and Távora and a new generation of fresh whites from high-altitude vineyards.\n\n"
        "The Alto Douro Wine Region, a 24,600 ha core of the demarcated area, was inscribed on the UNESCO World Heritage list in 2001 as a cultural landscape. 2026 marks its 25th anniversary, and a difficult one: Port sales are shrinking, the region has more vines than the market needs, and growers' incomes depend on a quota system that many in the trade want reformed."
    ),
    "history": (
        "Wine was made here in Roman times, and the monasteries of the Middle Ages (Cistercians at Salzedas and São João de Tarouca on the south bank) kept it going. The English trade began in earnest in the late 17th century, when merchants who had been shipping thin red 'Viana' wine from the Minho discovered the richer wines of the upper Douro, and learned that a dose of brandy kept them sound on the voyage. The Methuen Treaty of 1703 gave Portuguese wine a lower tariff in England than French wine and turned Port into a national habit.\n\n"
        "Boom brought fraud. After prices collapsed in the 1750s, the Marquis of Pombal created the Companhia Geral da Agricultura das Vinhas do Alto Douro (royal charter of 10 September 1756), drew a boundary around the vineyards, classified them, and between 1758 and 1761 set 335 granite marker stones along the limits of the best land. Wine from inside them was vinho de feitoria, fit for export; the rest was vinho de ramo, for the home market. It was one of the first legal delimitations of a wine region anywhere, and the Museu do Douro has located 105 of the original stones.\n\n"
        "The 19th century brought the rabelo boats racing barrels down the rapids to Gaia, the blasting of the Cachão da Valeira gorge (1780 to 1792) that opened the upper river, Baron Forrester's maps and campaigns, the commanding figure of Dona Antónia Adelaide Ferreira, the arrival of the railway (Pinhão 1880, Barca d'Alva 1887), and then disaster: oidium in the 1850s and phylloxera from the 1860s. Replanting pushed vineyards east into the Douro Superior.\n\n"
        "The 20th century was the age of regulation: the Casa do Douro (1932) and the Instituto do Vinho do Porto (1933), the vineyard points system devised by Álvaro Moreira da Fonseca in the late 1940s, and a rule that Port had to be shipped from the entreposto of Vila Nova de Gaia. In 1986, with EU accession, that monopoly ended and single estates could bottle and export their own Port. In 1952 Ferreira's winemaker Fernando Nicolau de Almeida made the first Barca Velha, proof that the Douro could produce a great dry red; in the 1990s and 2000s a wave of estates followed. The IVDP, created in 2003 from the old Port institute, now regulates both Porto and Douro."
    ),
    "terroir": (
        "The key is schist. The Douro's core is a band of Precambrian and Cambrian schist (the Douro-Beiras complex) set between granite on either side; Port vineyards are concentrated on the schist because its vertical, flaky layers let roots go metres deep in search of water, and because the stony surface stores and reflects heat. Where the granite begins, the quality ratings fall. Before planting, the rock is broken up, by hand with crowbars and explosives in the past and by bulldozers today, to create soil at all.\n\n"
        "Climate grows hotter and drier upstream. The Serra do Marão shields the valley from Atlantic rain: Régua in the Baixo Corgo gets about 900 mm a year, Pinhão in the Cima Corgo around 650 to 700 mm, and Barca d'Alva on the Spanish border barely 400 mm. Summer days in the Douro Superior routinely pass 40 °C. Aspect and altitude matter enormously: the points system gives the most credit to south-facing slopes below 300 m close to the river, but in a warming climate growers are looking uphill and to north-facing sites for freshness, especially for whites.\n\n"
        "Terraces shape every wine. The oldest are socalcos, narrow terraces held up by dry-stone walls, many rebuilt after phylloxera; the ruined, abandoned ones are called mortórios. From the 1970s the PDRITM development programme bulldozed wider earth-banked terraces, patamares, holding one or two rows and allowing small tractors. Vinha ao alto, rows planted straight up and down the slope, works where the gradient is below about 35 to 40 percent. Each system changes vine density, exposure, erosion and labour costs, and many quintas mix all three."
    ),
    "grapes": (
        "More than 100 varieties are authorised. The historic vineyards are field blends, often with dozens of varieties interplanted. A 1981 study by José Ramos Pinto Rosas and João Nicolau de Almeida identified five as the best for Port, and they now dominate modern planting: Touriga Nacional (perfume, structure), Touriga Franca (the most planted, floral and dependable), Tinta Roriz (Tempranillo), Tinta Barroca (sweet, early ripening, for cooler sites) and Tinto Cão (late, fresh, fine-grained). Sousão is valued for colour and acidity, Tinta Amarela for spice. The whites are Malvasia Fina, Viosinho, Rabigato, Gouveio (Godello), Códega do Larinho and, for Moscatel do Douro, Moscatel Galego Branco."
    ),
    "styles": (
        "Port: ruby styles (Ruby, Reserve, Late Bottled Vintage, Crusted, Vintage), wood-aged tawny styles (Tawny, Reserve Tawny, tawnies with an indication of age, Colheita), white Port and rosé Port. Douro DOC: full, dark reds from field blends and Touriga-based cuvées; mineral whites from high vineyards; rosés; traditional-method sparkling; Moscatel do Douro. IGP Duriense covers wines from the same area made outside DOC rules."
    ),
    "classification": (
        "The beneficio is the heart of the system. Every vineyard plot in the region is recorded in a register (the cadastro, kept by the Casa do Douro until 2004 and by the IVDP since) and scored on Moreira da Fonseca's method: location and subregion, altitude, slope, aspect and shelter, soil (schist scores, granite largely does not), proximity to the river, grape varieties, vine age, training and planting density, and yield. The total points place each parcel in a class from A (above 1,200 points) through B (1,001 to 1,200), C (801 to 1,000), D (601 to 800), E (401 to 600) to F (201 to 400). Each July the IVDP's interprofessional council fixes the region's total Port quota in pipas of 550 litres of fortified must, and that total is shared out by class, so an A-grade parcel can turn far more of its grapes into Port than an F-grade one.\n\n"
        "The quota is what makes a Douro grape valuable: in 2026 Port grapes sold for roughly 900 to 1,200 euros a pipa, while grapes destined for Douro DOC wine fetched 150 to 400 euros. Shrinking sales forced cuts from 104,000 pipas in 2023 to 90,000 in 2024 and 75,000 in 2025; the 2026 harvest was set at 76,000 pipas (about 57 million kg of grapes). Port shippers such as the Fladgate Partnership argue the system stops them using the best grapes; growers defend it as their guaranteed income.\n\n"
        "Port categories are defined by the IVDP's 2022 regulation (Regulamento 3/2022) and later council decisions; Douro DOC wines can carry Reserva, Grande Reserva, Colheita Tardia, Palhete and Clarete among other traditional terms."
    ),
    "appellations": ["Porto", "Douro", "Moscatel do Douro", "Baixo Corgo", "Cima Corgo", "Douro Superior", "Duriense"],
    "sources": [SRC_UNESCO, SRC_ECO, SRC_SALT, SRC_MORAIS, SRC_RR, SRC_DB, SRC_MARCOS, SRC_IVDP,
                {"title": "Wikipedia: Douro DOC", "url": "https://en.wikipedia.org/wiki/Douro_DOC"}]
}

porto = {
    "country": "pt", "id": "pt-porto", "name": "Porto",
    "match": ["Porto", "Port", "Vinho do Porto", "Port Wine", "Oporto", "vin de Porto", "Portwein", "Portvin", "Portwijn",
              "Porto / Port / vinho do Porto / Port Wine / vin de Porto / Oporto / Portvin / Portwein / Portwijn"],
    "cat": "DOC", "region": "Douro Valley", "subregion": None,
    "created": "1756", "area_ha": 43000, "styles": ["fortified", "sweet", "red", "white", "rose"], "dominant_style": "fortified",
    "grapes": "Touriga Franca, Touriga Nacional, Tinta Roriz, Tinta Barroca, Tinto Cão, Tinta Amarela, Sousão and dozens more in old field blends; for white Port, Malvasia Fina, Gouveio, Viosinho, Rabigato, Códega do Larinho",
    "summary": (
        "Port is a red (or white) wine whose fermentation is stopped part-way by adding grape spirit. Grapes are crushed and, at the best quintas, still trodden by foot in shallow granite tanks called lagares, because Port ferments for only two or three days and colour and tannin have to be extracted fast. When about half the sugar has turned to alcohol, the wine is run off onto aguardente vínica, a neutral grape brandy of about 77% alcohol: roughly 115 litres of spirit to 435 litres of must makes a 550-litre pipa. The yeasts die, the remaining sugar stays, and the wine ends up at 19 to 22% alcohol (white Port can be as low as 16.5%).\n\n"
        "What happens next decides the style. Ruby Ports are aged in large vats or bottle to keep their dark fruit: basic Ruby; Reserve; Late Bottled Vintage (a single year bottled between the fourth and sixth year, a style pioneered by Taylor's with its 1965); Crusted (a bottle-aged blend of vintages); and Vintage Port, made only in the best years from the best lots, bottled unfiltered in its second or third year and built to age for decades. A shipper declares a vintage after the IVDP approves samples in the spring of the second year; famous general declarations include 1927, 1945, 1963, 1977, 1994, 2011, and the back-to-back 2016 and 2017. Single-quinta Vintage Ports (Vargellas, Malvedos, Cavadinha, Vesuvio) often come from the years in between.\n\n"
        "Tawny Ports are aged in small, old casks (pipas, about 550 to 620 litres) where slow oxidation turns them amber, nutty and dried-fruited. A 10, 20, 30 or 40 Year Old Tawny is a blend whose taste matches that average age; the IVDP added 50 Years Old in 2021/22 and, by a circular of January 2025, an 80 Years Old indication plus Very Very Old (VVO) for unstated blends of 80 years or more. Colheita is a single-vintage tawny aged at least seven years in wood, labelled with harvest and bottling dates. White Port ranges from dry aperitif styles to aged whites with an indication of age, and rosé Port has been allowed since 2008."
    ),
    "terroir": "Only the schist core of the valley, graded A to F under the beneficio, can supply Port. The Cima Corgo, around Pinhão and its side valleys, provides most Vintage Port; the Douro Superior gives increasingly important ripe, powerful wines; the Baixo Corgo, wetter and more fertile, supplies much of the ruby and young tawny. Most Port is still aged and blended in the lodges of Vila Nova de Gaia, where the cool, humid Atlantic air slows evaporation; wines aged up the valley take on a hotter, richer 'Douro bake'.",
    "producers": ["Taylor's", "Fonseca", "Croft", "Graham's", "Dow's", "Warre's", "Cockburn's", "Quinta do Noval", "Niepoort", "Ramos Pinto", "Ferreira", "Sandeman", "Kopke", "Cálem", "Burmester", "Quinta do Vesuvio", "Quinta do Crasto", "Quinta de la Rosa", "Real Companhia Velha", "Wine & Soul"],
    "nerd_note": "Vintage Port is the only great wine in the world normally released when it is two years old. A 'declaration' is a shipper's decision, not the IVDP's: the Institute only approves the samples, so in split years some houses declare and others make single-quinta wines instead.",
    "contains": ["Baixo Corgo", "Cima Corgo", "Douro Superior"]
}

douro = {
    "country": "pt", "id": "pt-douro", "name": "Douro",
    "match": ["Douro", "DOC Douro", "Douro DOC", "Vinho do Douro"],
    "cat": "DOC", "region": "Douro Valley", "subregion": None,
    "created": "1756 (region); DOC for unfortified wines late 20th century", "area_ha": 43000,
    "styles": ["red", "white", "rose", "sparkling", "fortified", "sweet"], "dominant_style": "red",
    "grapes": "Touriga Nacional, Touriga Franca, Tinta Roriz, Tinta Barroca, Tinto Cão, Sousão, old-vine field blends; whites from Rabigato, Viosinho, Gouveio, Códega do Larinho, Malvasia Fina, Arinto; Moscatel Galego Branco for Moscatel do Douro",
    "summary": (
        "The Douro DOC covers the unfortified wines of the same demarcated region as Port, and for most of its history they were an afterthought: everyday reds for the farm, or the grapes that missed out on the Port quota. The exception that proved what was possible was Barca Velha, first made in 1952 by Fernando Nicolau de Almeida at Quinta do Vale Meão for A. A. Ferreira, using ice carried up the valley to cool the fermentation. It is released only in exceptional years (around twenty times since 1952) and remains Portugal's most famous red.\n\n"
        "The real revolution came after 1986 and especially in the 1990s, when families who had sold grapes to Port shippers began bottling dry wines under their own names. The five estates that marketed themselves together from 2003 as the Douro Boys (Quinta do Crasto, Quinta do Vale Meão, Quinta do Vallado, Niepoort and Quinta Vale Dona Maria) became the face of that change. Today more than 60 million bottles of Douro DOC wine are sold a year, using over half of the region's grapes.\n\n"
        "The classic Douro red is dark, dense and perfumed: Touriga Nacional's violets and bergamot, Touriga Franca's rose and black fruit, the grip of schist-grown tannin, often with the herbal, resinous note of the hillside scrub (esteva, rockrose). Old-vine field blends (vinhas velhas), sometimes with 30 or more varieties interplanted, give the most complex wines. Whites from high plateau vineyards around Alijó, Murça, Favaios and the Douro Superior's upper slopes are increasingly serious: taut, saline and long-lived. The DOC also covers Moscatel do Douro, rosés and traditional-method sparkling wine."
    ),
    "terroir": "Same schist slopes and climate gradient as Port, but table-wine growers prize what the Port points system penalises: altitude (500 to 700 m for whites), north and east aspects, granite margins and old field-blend vineyards. The economic problem is that DOC grapes are worth far less than Port grapes, which pushes growers toward volume and has led to abandonment of steep plots.",
    "producers": ["Casa Ferreirinha (Barca Velha)", "Quinta do Crasto", "Quinta do Vale Meão", "Niepoort", "Quinta do Vallado", "Quinta Vale Dona Maria", "Wine & Soul", "Quinta da Gaivosa (Alves de Sousa)", "Quinta do Noval", "Prats & Symington (Chryseia)", "Quinta Nova", "Real Companhia Velha", "Luis Seabra", "Mateus Nicolau de Almeida"],
    "nerd_note": "Barca Velha is named after an old boat; the first vintage was cooled with blocks of ice brought from Porto, because Vale Meão had no electricity. When a year is good but not quite great enough, Casa Ferreirinha releases it as Reserva Especial instead.",
    "contains": ["Moscatel do Douro", "Baixo Corgo", "Cima Corgo", "Douro Superior"]
}

moscatel = {
    "country": "pt", "name": "Moscatel do Douro", "match": ["Moscatel do Douro", "Douro Moscatel", "Favaios"],
    "cat": "DOC", "subcat": "Traditional designation within DOC Douro", "region": "Douro Valley", "subregion": "Cima Corgo",
    "created": "Traditional; protected under DOC Douro", "area_ha": None, "styles": ["fortified", "sweet", "white"], "dominant_style": "fortified",
    "grapes": "Moscatel Galego Branco (Muscat Blanc à Petits Grains), at least 85%",
    "lat": 41.2667, "lon": -7.5, "coord_quality": "approx",
    "summary": (
        "Moscatel do Douro is the Douro's other fortified wine: Muscat grapes, fortified with grape spirit like Port, at least 85% Moscatel and 16.5% alcohol or more, then aged at least 18 months in wood. Most of it comes from the high, cooler plateau around Favaios and Alijó, at roughly 500 to 600 m, where the small-berried Moscatel Galego keeps its acidity and its orange-blossom perfume. The village cooperative, Adega Cooperativa de Favaios, made the name so well known in Portugal that many people simply order 'a Favaios'. Aged versions (10 and 20 years, occasionally single-vintage) turn amber and develop notes of orange peel, honey and walnut."
    ),
    "terroir": "Granite and schist plateau north of Pinhão, at the edge of the demarcated region; more Atlantic influence and cooler nights than the river valley.",
    "producers": ["Adega Cooperativa de Favaios", "Quinta da Avessada", "Poças", "Quinta do Portal"],
    "nerd_note": "A dash of Moscatel is also used by some shippers to lift the aroma of white Port blends."
}

baixo = {
    "country": "pt", "name": "Baixo Corgo", "match": ["Baixo Corgo", "Lower Corgo"], "cat": "DOC", "subcat": "Subregion",
    "region": "Douro Valley", "subregion": None, "created": "1756 (part of the original demarcation)", "area_ha": 14000,
    "styles": ["fortified", "red", "white"], "dominant_style": "fortified",
    "lat": 41.1637, "lon": -7.80, "coord_quality": "approx",
    "grapes": "Touriga Franca, Tinta Roriz, Tinta Barroca, Touriga Nacional; whites Malvasia Fina, Gouveio",
    "summary": "The westernmost and smallest of the three subregions, from Barqueiros to the Corgo river at Peso da Régua and Lamego on the south bank. It is the wettest (around 900 mm of rain at Régua), greenest and most densely planted part of the Douro, about 14,000 ha of vines, with deeper soils and higher yields. Historically it supplied the bulk of young ruby and tawny Port; today it is also home to ambitious table-wine estates such as Quinta do Vallado, Quinta da Gaivosa and Quinta do Côtto, whose wines tend to be fresher and more elegant than those upstream.",
    "terroir": "Schist with granite outcrops; Atlantic influence through the Marão gap; many patamares and vinha ao alto plantings on gentler slopes.",
    "producers": ["Quinta do Vallado", "Quinta da Gaivosa (Alves de Sousa)", "Quinta do Côtto", "Quinta da Pacheca", "Casa de Mateus (Sogrape, IGP and DOC)"],
    "nerd_note": "Peso da Régua was the river port where the Companhia's officials weighed and taxed the wine (peso means weight), and it is still the administrative capital of the region."
}

cima = {
    "country": "pt", "name": "Cima Corgo", "match": ["Cima Corgo", "Upper Corgo"], "cat": "DOC", "subcat": "Subregion",
    "region": "Douro Valley", "subregion": None, "created": "1756 (core extended in 1761)", "area_ha": 19000,
    "styles": ["fortified", "red", "white"], "dominant_style": "fortified",
    "lat": 41.19, "lon": -7.545, "coord_quality": "approx",
    "grapes": "Touriga Franca, Touriga Nacional, Tinta Roriz, Tinto Cão, Tinta Barroca, Sousão, field blends",
    "summary": "The heart of Port: from the Corgo river east to the Cachão da Valeira gorge, centred on the village of Pinhão and the side valleys of the Pinhão, Torto, Tua and Távora. Around 19,000 ha of vines, almost all on steep schist, include most of the famous Vintage Port quintas: Noval, Roêda, Bomfim, Malvedos, Cavadinha, Panascal, Cruzeiro, Seixo, La Rosa, Vale Dona Maria. Rainfall is around 650 to 700 mm, summers are hot, and the many valleys give every possible aspect, which is why blenders draw on so many quintas here. It produces the bulk of the region's top-graded A and B vineyards.",
    "terroir": "Deep, hard schist; terraces of every era (pre-phylloxera socalcos, 1970s patamares, vinha ao alto); hot south-facing amphitheatres along the main river, cooler side-valley slopes.",
    "producers": ["Quinta do Noval", "Graham's", "Dow's", "Warre's", "Fonseca", "Taylor's", "Croft", "Quinta do Crasto", "Quinta de la Rosa", "Quinta Vale Dona Maria", "Wine & Soul", "Quinta do Infantado", "Niepoort"],
    "nerd_note": "Pombal's first boundary (marked out 1757 to 1761) covered roughly the Baixo Corgo and the western Cima Corgo; it crept east over the following decades, and the Douro Superior was only fully included in the early 20th century."
}

superior = {
    "country": "pt", "name": "Douro Superior", "match": ["Douro Superior", "Upper Douro"], "cat": "DOC", "subcat": "Subregion",
    "region": "Douro Valley", "subregion": None, "created": "Incorporated progressively, 19th and 20th centuries", "area_ha": 8700,
    "styles": ["fortified", "red", "white"], "dominant_style": "red",
    "lat": 41.12, "lon": -7.15, "coord_quality": "approx",
    "grapes": "Touriga Nacional, Touriga Franca, Tinta Roriz, Sousão; whites Rabigato, Códega do Larinho",
    "summary": "East of the Cachão da Valeira gorge to the Spanish border at Barca d'Alva: the largest subregion by land but with only about 8,700 ha of vines, because it was cut off by the rapids until the 1790s and remote until the railway reached it in 1887. It is the hottest and driest part of the Douro (around 400 mm of rain near the border), with flatter land that allows mechanisation, and it is where most new planting has happened since the 1980s. Great estates include Quinta de Vargellas (Taylor's), Quinta do Vesuvio (Symington), Quinta do Vale Meão (birthplace of Barca Velha) and Quinta da Leda (Casa Ferreirinha). Wines are riper, darker and fuller, with soft, generous tannins.",
    "terroir": "Schist and some granite; continental climate with very hot summers and cold winters; the Côa valley, with its Palaeolithic rock art, enters the Douro here.",
    "producers": ["Taylor's (Vargellas)", "Quinta do Vesuvio", "Quinta do Vale Meão", "Casa Ferreirinha (Quinta da Leda)", "Ramos Pinto (Ervamoira)", "Cockburn's (Quinta dos Canais)", "Dow's (Senhora da Ribeira)"],
    "nerd_note": "Ramos Pinto's Quinta de Ervamoira was planted in the 1970s with Portugal's first large vinha ao alto vineyard, and the discovery of rock engravings nearby in the 1990s helped stop a dam that would have flooded it."
}

duriense = {
    "country": "pt", "name": "Duriense", "match": ["Duriense", "Vinho Regional Duriense", "IGP Duriense"], "cat": "IGP", "subcat": "Vinho Regional",
    "region": "Douro Valley", "subregion": None, "created": "IGP (Vinho Regional)", "area_ha": None,
    "styles": ["red", "white", "rose", "sparkling"], "dominant_style": "red",
    "lat": 41.15, "lon": -7.6, "coord_quality": "approx",
    "grapes": "Douro varieties plus international grapes",
    "summary": "The regional (IGP) designation for the Douro area, used for wines made outside DOC Douro rules: different varieties or blends, experimental styles, or wines a producer simply prefers not to submit to the DOC tasting panel. Some serious bottlings appear under it, but most Duriense wine is everyday drinking.",
    "terroir": "Same area as the Douro DOC.",
    "producers": ["Casa de Mateus (Sogrape)", "various Douro cooperatives"],
    "nerd_note": "Like the DOC, it is administered by the IVDP rather than a regional commission."
}

def S(id_, name, kind, cls, app, lat, lon, cq, text, producers):
    return {"id": id_, "country": "pt", "name": name, "kind": kind, "class": cls, "appellation": app,
            "lat": lat, "lon": lon, "coord_quality": cq, "text": text, "producers": producers}

sites = [
    # ---------------- Vila Nova de Gaia and Porto
    S("site-pt-taylors-lodge", "Taylor's Port Lodge", "house", "Port lodge, founded 1692", "Porto", 41.1343, -8.6144, "precise",
      "Taylor's lodge on Rua do Choupelo has aged Port since the house's earliest days; the company traces itself to Job Bearsley in 1692 and took its present name, Taylor, Fladgate & Yeatman, in 1838. Taylor's made the first single-quinta Vintage Port (Vargellas 1958) and the first commercial Late Bottled Vintage (1965). The lodge's cellars hold great vats and thousands of casks of tawny.", ["Taylor's", "The Fladgate Partnership"]),
    S("site-pt-the-yeatman", "The Yeatman", "historic", "Wine hotel of the Fladgate Partnership (2010)", "Porto", 41.1339, -8.6129, "precise",
      "The Fladgate Partnership's wine hotel above the lodges, opened in 2010, with a cellar of Portuguese wine and decanter-shaped pool; part of the company's push to turn Gaia into a wine-tourism destination, followed in 2020 by World of Wine.", ["The Fladgate Partnership"]),
    S("site-pt-world-of-wine-gaia", "World of Wine (WOW)", "museum", "Museum and cultural quarter (2020)", "Porto", 41.1347, -8.6143, "precise",
      "A cluster of museums, restaurants and a wine school built by the Fladgate Partnership in restored lodges, opened in 2020. Its wine museum explains Portuguese regions and Port's history; it is the most ambitious attempt yet to explain Port to people who have never tasted it.", ["The Fladgate Partnership"]),
    S("site-pt-fonseca-lodge", "Fonseca Port Lodge", "house", "Port lodge (Fladgate Partnership since 1948)", "Porto", 41.1357, -8.6150, "approx",
      "Fonseca Guimaraens, a house of Portuguese and Brazilian origins run for generations by the Guimaraens family, joined the Taylor's group in 1948. Its Vintage Ports, rich and opulent, come mainly from three quintas: Panascal in the Távora valley and Cruzeiro and Santo António in the Pinhão valley. Fonseca Bin 27 is one of the best-known reserve rubies.", ["Fonseca"]),
    S("site-pt-croft-lodge", "Croft Port Lodge", "house", "Port lodge, house founded 1588", "Porto", 41.1354, -8.6147, "precise",
      "Croft claims 1588 as its founding date, making it one of the oldest Port names; it has been part of the Fladgate Partnership since 2001. Croft launched Croft Pink in 2008, the first rosé Port, and its Vintage Ports come from Quinta da Roêda beside Pinhão.", ["Croft"]),
    S("site-pt-grahams-lodge", "Graham's Port Lodge", "house", "Port lodge (1890), Symington Family Estates", "Porto", 41.1374, -8.6241, "precise",
      "W. & J. Graham started as Glasgow textile merchants who, the story goes, accepted a debt paid in Port in 1820. The lodge, built in 1890 high on the Gaia hillside, is the Symington family's flagship visitor centre and holds the Vinum restaurant. Graham's is known for sweeter, fruit-rich Vintage Port from Quinta dos Malvedos.", ["Graham's", "Symington Family Estates"]),
    S("site-pt-cockburns-lodge", "Cockburn's Lodge", "house", "Port lodge, founded 1815", "Porto", 41.1337, -8.6182, "approx",
      "Robert Cockburn founded the house in 1815. Its lodge has one of Gaia's largest cask collections and a working cooperage; Cockburn's Special Reserve was for decades among the best-selling Ports in Britain. The Symington family took the brand over in 2010 and revived its Vintage Port, built around Quinta dos Canais in the Douro Superior.", ["Cockburn's", "Symington Family Estates"]),
    S("site-pt-symington-gaia", "Dow's and Warre's (Symington, Travessa do Barão de Forrester)", "house", "Port houses: Warre's (1670), Dow's (Silva & Cosens, 1798)", "Porto", 41.1328, -8.6165, "approx",
      "The Symingtons' Gaia base on the street named after Baron Forrester. Warre's, dating from 1670, is regarded as the first British Port company; Andrew James Symington, who arrived from Scotland in 1882, became a partner in 1905. Dow's grew out of Silva & Cosens (1798), which merged with Dow & Co in 1877; Symington became a partner in 1912. Dow's is the drier, firmer style; Warre's the most elegant and floral.", ["Dow's", "Warre's", "Symington Family Estates"]),
    S("site-pt-sandeman-lodge", "Sandeman Lodge", "house", "Port lodge, house founded 1790", "Porto", 41.1376, -8.6125, "precise",
      "George Sandeman, a Scot, founded the firm in London in 1790. The silhouette of the Don, in Portuguese student cape and Spanish hat, designed by George Massiot Brown in 1928, became one of the first great drinks logos. Sandeman has belonged to Sogrape since 2002; the riverside lodge is one of the busiest visitor centres in Gaia.", ["Sandeman", "Sogrape"]),
    S("site-pt-ferreira-lodge", "Caves Ferreira", "house", "Port lodge, house founded 1751", "Porto", 41.1369, -8.6193, "precise",
      "A. A. Ferreira, founded in 1751, is the great Portuguese-owned Port house, shaped by Dona Antónia Adelaide Ferreira (1811 to 1896), 'Ferreirinha', who bought and planted vast estates including Vesuvio and Vale Meão and became the most powerful figure in the Douro. Sogrape bought the company in 1987. Ferreira is known for tawnies and for the Casa Ferreirinha table wines, including Barca Velha.", ["Ferreira", "Casa Ferreirinha", "Sogrape"]),
    S("site-pt-ramos-pinto-lodge", "Ramos Pinto Lodge", "house", "Port lodge, founded 1880", "Porto", 41.1370, -8.6155, "precise",
      "Adriano Ramos Pinto founded the house in 1880 and built a business in Brazil on daring Art Nouveau advertising posters, many displayed in the lodge's museum. Owned by Champagne Louis Roederer since 1990, Ramos Pinto pioneered research into Douro grape varieties and vinha ao alto planting, and its quintas include Bom Retiro and Ervamoira.", ["Ramos Pinto", "Louis Roederer"]),
    S("site-pt-kopke-lodge", "Kopke", "house", "Port house founded 1638", "Porto", 41.1380, -8.6114, "approx",
      "Founded by Christiano Kopke, a German-born merchant, in 1638: the oldest Port name still trading. Kopke specialises in old Colheitas and white Ports, and was the first house to release 50 Year Old Ports when that category was created. Since 2025 its group (formerly Sogevinus, owned by the Escotet family) is called the Kopke Group, alongside Cálem, Burmester, Barros and Quinta de São Luiz.", ["Kopke", "Kopke Group"]),
    S("site-pt-calem-lodge", "Cálem Lodge", "house", "Port lodge, founded 1859", "Porto", 41.1380, -8.6110, "precise",
      "António Alves Cálem founded the house in 1859; its ships carried Port to Brazil and brought back tropical timber. The riverfront lodge, with fado evenings and a visitor museum, is one of the most visited in Gaia. Part of the Kopke Group.", ["Cálem", "Kopke Group"]),
    S("site-pt-burmester-lodge", "Burmester Lodge", "house", "Port lodge, 18th-century house", "Porto", 41.1391, -8.6090, "precise",
      "A house of English and German origins established in the 18th century, with a lodge right by the Luís I bridge. Burmester is particularly respected for old tawnies and Colheitas. Part of the Kopke Group.", ["Burmester", "Kopke Group"]),
    S("site-pt-offley-lodge", "Offley Lodge", "house", "Port house founded 1737", "Porto", 41.1356, -8.6141, "precise",
      "William Offley's house dates from 1737; Joseph James Forrester, later Baron Forrester, made his name as a partner of Offley Forrester in the 19th century. Today Offley is part of Sogrape and its lodge sits on Rua do Choupelo.", ["Offley", "Sogrape"]),
    S("site-pt-niepoort-lodge", "Niepoort", "house", "Port house founded 1842", "Porto", 41.1310, -8.6109, "precise",
      "A Dutch family house founded in 1842 and now run by the fifth generation, Dirk Niepoort, one of the Douro's most influential and restless winemakers. Niepoort is famous for Colheitas, rare Garrafeira Ports aged in glass demijohns, and for the Douro reds Redoma, Batuta and Charme from Quinta de Nápoles.", ["Niepoort"]),
    S("site-pt-real-companhia-velha", "Real Companhia Velha", "house", "Successor of Pombal's 1756 Companhia", "Porto", 41.1327, -8.6011, "precise",
      "The direct descendant of the Companhia Geral da Agricultura das Vinhas do Alto Douro created by Pombal in 1756, privately owned by the Silva Reis family since the 20th century. It owns Quinta das Carvalhas opposite Pinhão and makes Port and Douro wines under several brands.", ["Real Companhia Velha"]),
    S("site-pt-factory-house", "Factory House", "historic", "British merchants' club, completed c. 1790", "Porto", 41.1415, -8.6137, "precise",
      "The Georgian club house of the British Association in Porto, completed around 1790 to designs by consul John Whitehead. Its members, the British Port shippers, still lunch there every Wednesday, then move to an identical dining room next door to drink Port without the smell of food. The house holds a remarkable cellar of old Vintage Port.", []),
    S("site-pt-ivdp-porto", "IVDP, Porto headquarters", "historic", "Port and Douro regulator", "Porto", 41.1419, -8.6154, "precise",
      "The Instituto dos Vinhos do Douro e do Porto, created in 2003 as successor to the Port Wine Institute of 1933, certifies every bottle of Port and Douro wine, runs the tasting chamber that approves Vintage and LBV samples, and each July its interprofessional council sets the beneficio. Its Porto building on Rua Ferreira Borges has a public tasting room.", []),
    S("site-pt-cais-de-gaia", "Cais de Gaia and the rabelo boats", "historic", "Riverfront of the Port lodges", "Porto", 41.1379, -8.6193, "precise",
      "The Gaia quayside where rabelos, flat-bottomed boats with a square sail and a long steering oar, once unloaded pipes of new wine after a perilous trip down the rapids from the Douro. Railways, roads and dams ended the trade in the 20th century; restored rabelos with shippers' names now moor here and race each year on São João, 24 June.", []),
    # ---------------- Baixo Corgo
    S("site-pt-museu-do-douro", "Museu do Douro", "museum", "Regional museum (2008)", "Douro", 41.1614, -7.7900, "precise",
      "The museum of the Douro wine region in Peso da Régua, housed partly in the 18th-century Casa da Companhia, the warehouse of Pombal's company. It holds the region's archives, and its researchers led the search that located 105 of the 335 original boundary stones.", []),
    S("site-pt-casa-do-douro", "Casa do Douro", "historic", "Growers' institution (1932)", "Douro", 41.1608, -7.7884, "precise",
      "Created in 1932 to represent the region's growers, the Casa do Douro kept the vineyard register (cadastro) and administered the points system until 2004. Its building in Régua is known for its stained-glass windows depicting the Port cycle. It was restored as a public association of growers in the 2010s and 2020s amid political dispute.", []),
    S("site-pt-marcos-pombalinos", "Marcos pombalinos (Galafura group)", "historic", "Demarcation stones of 1758 to 1761", "Porto", 41.1871, -7.6922, "precise",
      "Classified group of the granite boundary stones placed between 1758 and 1761 to mark the limits of the vineyards entitled to produce export-quality vinho de feitoria. 335 were set; the Museu do Douro has relocated 105. Many are inscribed FEITORIA with the year, a physical record of one of the world's first legal wine delimitations.", []),
    S("site-pt-miradouro-sao-leonardo-de-galafura", "Miradouro de São Leonardo de Galafura", "landscape", "Viewpoint over the Baixo Corgo", "Douro", 41.1726, -7.6723, "precise",
      "A granite outcrop at about 640 m with one of the great views of the terraced valley, celebrated in a poem by Miguel Torga, who called the Douro 'a geological poem'.", []),
    S("site-pt-quinta-do-vallado", "Quinta do Vallado", "quinta", "Douro Boys estate, Baixo Corgo", "Douro", 41.1622, -7.7666, "precise",
      "On the Corgo river just outside Régua, Vallado has belonged to descendants of Dona Antónia Ferreira for generations. Its dry reds and whites, a wine hotel with a contemporary schist-clad wing, and its role as a founding Douro Boy make it a symbol of the region's table-wine turn. It also farms Quinta do Orgal in the Douro Superior.", ["Quinta do Vallado"]),
    S("site-pt-quinta-da-pacheca", "Quinta da Pacheca", "quinta", "Estate and wine hotel, Baixo Corgo", "Douro", 41.1555, -7.7978, "precise",
      "A historic estate on the south bank opposite Régua, documented since the 18th century, now known for its wine hotel (including rooms inside giant wine barrels) and Port and Douro wines.", ["Quinta da Pacheca"]),
    S("site-pt-quinta-da-gaivosa", "Quinta da Gaivosa", "quinta", "Alves de Sousa estate, Baixo Corgo", "Douro", 41.2325, -7.7633, "precise",
      "The Alves de Sousa family's estate near Santa Marta de Penaguião, on cooler, higher Baixo Corgo slopes. Domingos Alves de Sousa was among the first growers to bottle Douro wines under his own name in the early 1990s; Gaivosa and Abandonado (from an old vineyard left almost wild) are its icons.", ["Alves de Sousa"]),
    S("site-pt-quinta-do-cotto", "Quinta do Côtto", "quinta", "Historic Baixo Corgo estate", "Douro", 41.1707, -7.8465, "precise",
      "Owned by the Champalimaud family for centuries, at the western edge of the region near Mesão Frio. Its Grande Escolha, first made in the 1980s, was one of the earliest serious single-estate Douro reds.", ["Quinta do Côtto"]),
    S("site-pt-mateus-palace", "Mateus Palace", "historic", "Baroque manor, Mateus Rosé label", "Douro", 41.2968, -7.7122, "precise",
      "The 18th-century baroque palace near Vila Real whose façade has appeared on every bottle of Mateus Rosé since 1942. The wine was never made here: Sogrape's founder paid the owners for the image (choosing a royalty-free lump sum, the story goes, rather than a fee per bottle). The house and gardens are open to visitors.", ["Sogrape (Mateus Rosé)"]),
    # ---------------- Cima Corgo
    S("site-pt-pinhao", "Pinhão", "village", "Heart of the Cima Corgo", "Porto", 41.1906, -7.5450, "precise",
      "A small riverside village at the mouth of the Pinhão river, surrounded by famous quintas (Roêda, Bomfim, Foz, Carvalhas, La Rosa). Its railway station, reached by the Douro line in 1880, is decorated with azulejo panels of the vintage and the river. Most Vintage Port is grown within about 20 km of here.", []),
    S("site-pt-quinta-do-noval", "Quinta do Noval", "quinta", "Single-quinta Vintage Port; Nacional parcel", "Porto", 41.2131, -7.5378, "precise",
      "Above the Pinhão valley, Noval has been documented since 1715. Under Luiz Vasconcelos Porto in the 20th century it became famous for its 1931 Vintage, one of the most celebrated Ports ever made. AXA Millésimes has owned it since 1993, run by Christian Seely, and in 2019 it added neighbouring Quinta do Passadouro. After a 1981 fire destroyed its Gaia lodge, Noval moved its ageing to the Douro.", ["Quinta do Noval", "AXA Millésimes"]),
    S("site-pt-noval-nacional", "Nacional vineyard (Quinta do Noval)", "vineyard", "Ungrafted pre-phylloxera-style parcel, about 2.5 ha", "Porto", 41.2131, -7.5378, "approx",
      "A plot of about 2.5 ha within Noval planted with vines on their own roots (pé franco), never grafted onto American rootstock, hence nacional, 'national'. Phylloxera is present in the soil, so dying vines are replaced by layering. Yields are tiny; Nacional Vintage Port is made only in exceptional years and is the rarest and most expensive Port. The precise parcel location is not published; the point marks the quinta.", ["Quinta do Noval"]),
    S("site-pt-quinta-do-passadouro", "Quinta do Passadouro", "quinta", "Pinhão valley estate (Noval since 2019)", "Porto", 41.2352, -7.5312, "precise",
      "Bought by Dieter Bohrmann in 1991 and by Quinta do Noval in 2019, adding 36 ha in the Pinhão and Roncão valleys; it had long supplied grapes for Noval's Vintage. The Passadouro brand was kept.", ["Quinta do Noval"]),
    S("site-pt-quinta-do-cruzeiro", "Quinta do Cruzeiro", "quinta", "Fonseca Vintage Port quinta", "Porto", 41.2265, -7.5440, "approx",
      "On the eastern side of the Pinhão river near Vale de Mendiz, Cruzeiro was given feitoria status in 1761 and has supplied Fonseca since about 1870; its wines have been in the Fonseca Vintage blend since 1912. Fonseca bought it in 1973 and it was one of the first Douro properties replanted on wide patamares. It gives the dense black-fruit core of Fonseca's Vintage.", ["Fonseca"]),
    S("site-pt-quinta-de-santo-antonio-fonseca", "Quinta de Santo António (Fonseca)", "quinta", "Fonseca Vintage Port quinta", "Porto", 41.2355, -7.5455, "approx",
      "About a kilometre north of Cruzeiro on a west-facing slope that falls to the Pinhão river, included in the first classification of 1757. It has supplied Fonseca's Vintage blend for about a century, bringing the exotic aromatics, and is farmed organically.", ["Fonseca"]),
    S("site-pt-quinta-da-cavadinha", "Quinta da Cavadinha", "quinta", "Warre's single-quinta Vintage", "Porto", 41.2184, -7.5539, "precise",
      "Warre's quinta in the Pinhão valley, in Symington hands since 1980. Its vineyards climb to around 500 m, and the altitude gives Cavadinha's single-quinta Vintage Ports a floral, fresh character that defines Warre's style.", ["Warre's", "Symington Family Estates"]),
    S("site-pt-quinta-da-roeda", "Quinta da Roêda", "quinta", "Croft's Vintage Port quinta", "Porto", 41.1858, -7.5283, "precise",
      "Croft's home quinta, a broad amphitheatre of terraces immediately east of Pinhão, owned by Croft since 1889. It is the source of Croft's single-quinta Vintage and the backbone of its declared Vintage; visitors can tread grapes in its lagares at harvest.", ["Croft", "The Fladgate Partnership"]),
    S("site-pt-quinta-do-bomfim", "Quinta do Bomfim", "quinta", "Dow's quinta, Symington visitor centre", "Porto", 41.1887, -7.5393, "precise",
      "Dow's estate on the edge of Pinhão, bought by Silva & Cosens in 1896. It has a Symington winery and visitor centre and gives single-quinta Vintage Ports in non-declared years.", ["Dow's", "Symington Family Estates"]),
    S("site-pt-quinta-da-foz", "Quinta da Foz", "quinta", "Cálem's quinta at the mouth of the Pinhão", "Porto", 41.1905, -7.5495, "precise",
      "Where the Pinhão meets the Douro, Foz has supplied Cálem since the late 19th century and gives its single-quinta Vintage.", ["Cálem"]),
    S("site-pt-quinta-das-carvalhas", "Quinta das Carvalhas", "quinta", "Real Companhia Velha estate", "Porto", 41.1826, -7.5337, "precise",
      "A huge hill of terraces opposite Pinhão, rising to over 500 m, owned by Real Companhia Velha. Its round house at the summit looks over the whole Cima Corgo, and its old-vine blocks give some of the company's finest wines.", ["Real Companhia Velha"]),
    S("site-pt-quinta-de-la-rosa", "Quinta de la Rosa", "quinta", "Bergqvist family estate", "Porto", 41.1823, -7.5525, "precise",
      "Just downriver from Pinhão, La Rosa was given in 1906 as a christening present to Claire Feuerheerd, from a German Port family. Her granddaughter Sophia Bergqvist revived it as an independent estate in 1988, bottling its own Port and Douro wines when that became possible after 1986.", ["Quinta de la Rosa"]),
    S("site-pt-quinta-do-junco", "Quinta do Junco", "quinta", "Taylor's quinta, Pinhão valley", "Porto", 41.2040, -7.5634, "precise",
      "A Taylor's property of about 46 ha of vines in the Pinhão valley, part of the core of its Vintage Port alongside Terra Feita.", ["Taylor's"]),
    S("site-pt-quinta-de-terra-feita", "Quinta de Terra Feita", "quinta", "Taylor's quinta, Pinhão valley", "Porto", 41.2100, -7.5550, "approx",
      "Terra Feita, in the Pinhão valley near Quinta do Junco, has about 61 ha of south-facing vines and has been a mainstay of Taylor's Vintage Port for more than a century; in some years Taylor's releases it as a single-quinta Vintage.", ["Taylor's"]),
    S("site-pt-quinta-do-portal", "Quinta do Portal", "quinta", "Estate and hotel, Fladgate since 2024", "Porto", 41.2391, -7.5680, "precise",
      "On the Sabrosa to Pinhão road at Celeirós, Portal built a reputation for Moscatel and Douro wines under the Mansilha family, with a barrel cellar designed by Álvaro Siza Vieira. The Fladgate Partnership bought it in 2024 (53 ha of vines, winery and 16-room hotel), its first Douro vineyards dedicated to table wine.", ["The Fladgate Partnership"]),
    S("site-pt-quinta-do-infantado", "Quinta do Infantado", "quinta", "Grower-bottled Port pioneer", "Porto", 41.1744, -7.5803, "precise",
      "The Roseira family's estate at Chanceleiros near Covas do Douro, once owned by the Infante (a royal prince), hence the name. Infantado was among the first Douro farms to bottle and sell its own Port, from the late 1970s, and is known for less-sweet Vintage and LBV styles.", ["Quinta do Infantado"]),
    S("site-pt-quinta-nova-nossa-senhora-do-carmo", "Quinta Nova de Nossa Senhora do Carmo", "quinta", "Estate and wine hotel", "Porto", 41.1624, -7.5954, "precise",
      "A historic north-bank estate near Covas do Douro, owned by the Amorim family (of cork fame), with a wine hotel and a notable range of Douro reds.", ["Quinta Nova"]),
    S("site-pt-quinta-do-crasto", "Quinta do Crasto", "quinta", "Douro Boys estate", "Douro", 41.1636, -7.6284, "precise",
      "Perched on a ridge above the north bank between Régua and Pinhão, Crasto (from castrum, a Roman fort) belongs to the Roquette family. Its old field-blend vineyards Vinha Maria Teresa and Vinha da Ponte make two of the Douro's most sought-after reds; its infinity pool over the river is the region's most photographed view.", ["Quinta do Crasto"]),
    S("site-pt-quinta-do-seixo", "Quinta do Seixo", "quinta", "Sandeman's home quinta", "Porto", 41.1681, -7.5552, "precise",
      "Sandeman's estate and visitor centre on the south bank opposite Pinhão, owned with the brand by Sogrape. The winery, with its robotic lagares, sits high above the river with a view toward Pinhão.", ["Sandeman", "Sogrape"]),
    S("site-pt-quinta-do-bom-retiro", "Quinta do Bom Retiro", "quinta", "Ramos Pinto estate, Rio Torto", "Porto", 41.1611, -7.5390, "precise",
      "Ramos Pinto's main estate in the Rio Torto valley, source of its single-quinta tawnies (10 Year Old Quinta da Ervamoira and 20 Year Old Quinta do Bom Retiro).", ["Ramos Pinto"]),
    S("site-pt-quinta-vale-dona-maria", "Quinta Vale Dona Maria", "quinta", "Douro Boys estate, Rio Torto", "Porto", 41.1658, -7.5115, "precise",
      "Cristiano van Zeller's estate in the Rio Torto valley, bought in 1996 with old field-blend vineyards; a founding Douro Boy. Van Zeller had earlier run Quinta do Noval for his family. Now owned by Aveleda.", ["Quinta Vale Dona Maria", "Aveleda"]),
    S("site-pt-quinta-de-ventozelo", "Quinta de Ventozelo", "quinta", "Large historic south-bank estate", "Porto", 41.1764, -7.5146, "precise",
      "One of the largest single estates in the Douro, on the south bank east of Pinhão, documented since the Middle Ages. Owned by Gran Cruz (La Martiniquaise group), it has been restored with a hotel and an interpretation centre on the estate's history.", ["Gran Cruz"]),
    S("site-pt-quinta-do-panascal", "Quinta do Panascal", "quinta", "Fonseca quinta, Távora valley", "Porto", 41.1467, -7.5736, "precise",
      "In the Távora valley on the south bank, Panascal (acquired by Fonseca in 1978) produces Fonseca's single-quinta Vintage and was one of the first Douro quintas to open to visitors and to earn organic certification.", ["Fonseca", "The Fladgate Partnership"]),
    S("site-pt-quinta-de-sao-luiz", "Quinta de São Luiz", "quinta", "Kopke Group estate", "Porto", 41.1577, -7.6162, "precise",
      "A large estate at Adorigo on the south bank, the Douro home of the Kopke Group (Kopke, Cálem, Burmester), with a winery and stocks of old wines.", ["Kopke Group"]),
    S("site-pt-quinta-do-tedo", "Quinta do Tedo", "quinta", "Estate at the mouth of the Tedo", "Porto", 41.1568, -7.6402, "precise",
      "A French-owned estate where the Tedo river meets the Douro, making organic Port and Douro wines and running a guesthouse.", ["Quinta do Tedo"]),
    S("site-pt-quinta-de-napoles", "Quinta de Nápoles", "quinta", "Niepoort's Douro winery", "Douro", 41.1488, -7.6423, "precise",
      "Niepoort's winery in the Tedo valley, opened in 2007, built into the schist hillside. Here Dirk Niepoort makes Redoma, Batuta, Charme and an expanding range of fresh, lower-extraction Douro wines.", ["Niepoort"]),
    S("site-pt-quinta-de-roriz", "Quinta de Roriz", "quinta", "Historic quinta (Prats & Symington)", "Porto", 41.1950, -7.4778, "approx",
      "Roriz has been a celebrated vineyard since the 18th century and was among the first estates whose Port was sold under its own name; since 2009 it has been the vineyard base of Prats & Symington, the partnership between the Symingtons and Bordeaux's Bruno Prats that makes the dry red Chryseia.", ["Prats & Symington"]),
    S("site-pt-quinta-da-romaneira", "Quinta da Romaneira", "quinta", "Estate and hotel, Cima Corgo", "Porto", 41.2023, -7.4977, "precise",
      "A grand north-bank estate between Pinhão and Tua, owned in the 2000s by a group led by Christian Seely and later converted into a luxury hotel.", []),
    S("site-pt-quinta-dos-malvedos", "Quinta dos Malvedos", "quinta", "Graham's Vintage Port quinta", "Porto", 41.2152, -7.4394, "precise",
      "Graham's principal estate, bought in 1890, on the north bank just upstream of the Tua confluence. Its broad south-facing terraces make Graham's single-quinta Vintage Port (Malvedos) and the heart of the declared Vintage blend.", ["Graham's", "Symington Family Estates"]),
    S("site-pt-quinta-do-tua", "Quinta do Tua", "quinta", "Graham's quinta, Tua valley", "Porto", 41.2115, -7.4225, "approx",
      "On the opposite bank of the Tua from Malvedos. The Ferreira family built its house in 1834; Cockburn's owned it from the late 19th century and its research vineyard, established by John Smithes, helped rescue Touriga Nacional from near-extinction. The Symingtons bought it in 2006 as a Graham's quinta (about 22 ha of vines).", ["Graham's", "Symington Family Estates"]),
    S("site-pt-casal-de-loivos-viewpoint", "Miradouro de Casal de Loivos", "landscape", "Viewpoint above Pinhão", "Porto", 41.1985, -7.5321, "precise",
      "A balcony above Pinhão with a near-aerial view of the river's bend and the quintas of Bomfim, Roêda and La Rosa; the classic postcard of the Port vineyards.", []),
    S("site-pt-alto-douro-wine-region", "Alto Douro Wine Region (UNESCO)", "landscape", "World Heritage cultural landscape, 2001", "Porto", 41.1657, -7.5177, "precise",
      "Inscribed by UNESCO in 2001 under criteria iii, iv and v: about 24,600 ha of terraced vineyards, villages, chapels and quintas, with a 225,400 ha buffer zone. The listing recognises roughly two thousand years of winemaking and two and a half centuries of regulation that shaped the landscape.", []),
    # ---------------- Douro Superior
    S("site-pt-cachao-da-valeira", "Cachão da Valeira", "historic", "Gorge between Cima Corgo and Douro Superior", "Porto", 41.1580, -7.3679, "precise",
      "A granite gorge whose rapids blocked navigation upstream until it was blasted open between 1780 and 1792, making the Douro Superior reachable by rabelo. Baron Forrester drowned here in 1861 when his boat capsized; Dona Antónia Ferreira, travelling with him, survived. Today a dam stills the water and the gorge marks the boundary of the Douro Superior.", []),
    S("site-pt-sao-salvador-do-mundo", "São Salvador do Mundo", "landscape", "Chapels and viewpoint over the Valeira gorge", "Porto", 41.1518, -7.3668, "precise",
      "A hill of pilgrimage chapels above the Cachão da Valeira, with a view over the Douro's most dramatic gorge and the first vineyards of the Douro Superior.", []),
    S("site-pt-quinta-de-vargellas", "Quinta de Vargellas", "quinta", "Taylor's single-quinta Vintage, first released 1958", "Porto", 41.1419, -7.3174, "precise",
      "Taylor's assembled Vargellas from three properties bought between 1893 and 1896 (one from a daughter of Dona Antónia Ferreira). It has its own railway halt from 1886, about 67 ha of vines plus the neighbouring São Xisto, and blocks of very old vines bottled in the best years as Vargellas Vinha Velha. Vargellas 1958 was the first single-quinta Vintage Port marketed as such, and the quinta's violet-scented wines are the backbone of Taylor's Vintage.", ["Taylor's", "The Fladgate Partnership"]),
    S("site-pt-quinta-dos-canais", "Quinta dos Canais", "quinta", "Cockburn's quinta", "Porto", 41.1507, -7.3048, "precise",
      "A vast estate on the north bank opposite Vargellas, the heart of Cockburn's Vintage Port; now farmed by the Symingtons, who took over Cockburn's vineyards and then the brand between 2006 and 2010.", ["Cockburn's", "Symington Family Estates"]),
    S("site-pt-quinta-do-vesuvio", "Quinta do Vesuvio", "quinta", "Symington estate, foot-trodden single-quinta Vintage", "Porto", 41.1418, -7.2640, "precise",
      "Developed in the 19th century by the Ferreira family into one of the grandest estates in the Douro, with its own chapel, village and a long row of granite lagares. The Symingtons bought it in 1989 and make only single-quinta wines here, all still foot-trodden; with about 133 ha of vines it is the largest of the family's 26 quintas.", ["Quinta do Vesuvio", "Symington Family Estates"]),
    S("site-pt-quinta-da-senhora-da-ribeira", "Quinta da Senhora da Ribeira", "quinta", "Dow's quinta, Douro Superior", "Porto", 41.1462, -7.2606, "precise",
      "A south-bank estate across from Vesuvio that belonged to Silva & Cosens (Dow's) from 1890 to 1954; the Symingtons bought it back in 1998 and now release it as a Dow's single-quinta Vintage.", ["Dow's", "Symington Family Estates"]),
    S("site-pt-quinta-do-vale-meao", "Quinta do Vale Meão", "quinta", "Birthplace of Barca Velha; Douro Boys estate", "Douro", 41.1547, -7.1238, "precise",
      "The last great estate created by Dona Antónia Ferreira, planted from 1877 in a meander of the Douro near Pocinho. Ferreira's first Barca Velha (1952) came from here. Her descendants, the Olazabal family, began bottling under the Vale Meão name in 1999: a founding Douro Boy, with alluvial, granite and schist soils side by side in one bend of the river.", ["Quinta do Vale Meão"]),
    S("site-pt-quinta-de-ervamoira", "Quinta de Ervamoira", "quinta", "Ramos Pinto estate and museum, Côa valley", "Porto", 41.0201, -7.1124, "precise",
      "Planted by Ramos Pinto from 1974 in the Côa valley with a large vinha ao alto vineyard. In the 1990s, construction of a dam that would have flooded it was abandoned after Palaeolithic rock engravings were found along the Côa; the quinta now has a museum, and the Côa rock art is a UNESCO site.", ["Ramos Pinto"]),
    S("site-pt-quinta-da-leda", "Quinta da Leda", "quinta", "Casa Ferreirinha estate, Barca Velha source", "Douro", 41.0350, -7.0100, "approx",
      "Bought bare by Jorge Ferreira for Casa Ferreirinha in 1979 and planted from scratch near Almendra, toward Barca d'Alva. Since the 1980s it has been the main source of Barca Velha, with a winery built by Sogrape in 2001 and about 160 ha of vines dedicated to Douro DOC wine.", ["Casa Ferreirinha", "Sogrape"]),
    S("site-pt-barca-d-alva", "Barca d'Alva", "village", "Douro's border village", "Douro", 41.0268, -6.9410, "precise",
      "The hamlet where the Douro leaves Spain and becomes wholly Portuguese, at the eastern end of the demarcated region. The railway arrived in 1887 and once continued to Salamanca; the section beyond Pocinho closed in 1988, and its reopening has been planned since the 2020s. River cruises end here.", []),
    S("site-pt-pocinho", "Pocinho", "village", "End of the Douro railway line", "Douro", 41.1311, -7.1204, "precise",
      "Today's terminus of the Linha do Douro, which runs along the river from Porto through Régua, Pinhão and Tua; the dam and lock here help make the Douro navigable for cruise boats.", []),
    # ---------------- Moscatel do Douro
    S("site-pt-adega-cooperativa-de-favaios", "Adega Cooperativa de Favaios", "cellar", "Moscatel do Douro cooperative", "Douro", 41.2711, -7.5042, "precise",
      "The cooperative of the plateau village of Favaios, whose Moscatel do Douro is so widely drunk in Portugal that 'um Favaios' is a bar order. Favaios sits at about 550 m, cool enough for Moscatel Galego to keep its freshness; the village is also known for its four-cornered bread.", ["Adega Cooperativa de Favaios"]),
]

data = {"countries": [], "regions": [region],
        "appellations": [porto, douro, moscatel, baixo, cima, superior, duriense], "sites": sites}
json.dump(data, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("ok", OUT, len(sites), "sites")
