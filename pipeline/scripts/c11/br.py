"""Brazil: country, regions, IG (IP/DO) appellations and sites."""
import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c11")
from c11_common import app, region, save_part, site  # noqa: E402

C = "br"
SRC = {
    "emb24": {"title": "Embrapa Uva e Vinho, Documentos 141: Panorama da vitivinicultura brasileira em 2024 (2025)", "url": "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1186269/1/Documentos-141.pdf"},
    "oiv": {"title": "OIV, State of the World Wine Sector in 2025 (May 2026)", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV_State_of_the_World_Wine_Sector_in_2025_PPT.pdf"},
    "jdc": {"title": "Jornal do Comércio, Indicações Geográficas preservam tradições (Altos de Pinto Bandeira, Vale dos Vinhedos), March 2025", "url": "https://www.jornaldocomercio.com/cadernos/empresas-e-negocios/2025/03/1192986-indicacoes-geograficas-preservam-tradicoes-e-fortalecem-a-economia.html"},
    "jdc26": {"title": "Jornal do Comércio, Regiões e produtos gaúchos com indicação geográfica (April 2026)", "url": "https://www.jornaldocomercio.com/mapa-economico/regiao-serra/2026/04/1244025-confira-quais-regioes-e-produtos-gauchos-possuem-indicacao-geografica.html"},
    "minas": {"title": "Notícias Agrícolas / Sebrae, Vinhos de inverno do Sul de Minas são a nova IG (Feb 2025)", "url": "https://www.noticiasagricolas.com.br/noticia/394178"},
    "ibge": {"title": "IBGE, Indicações Geográficas 2018 map (grant dates)", "url": "https://geoftp.ibge.gov.br/cartas_e_mapas/mapas_do_brasil/sociedade_e_economia/indicacoes_geograficas_2018.pdf"},
    "vsf": {"title": "Revista Cultivar, Vale do São Francisco recebe IG para vinhos (Nov 2022)", "url": "https://revistacultivar.com.br/noticias/vale-do-sao-francisco-recebe-reconhecimento-de-indicacao-geografica-para-vinhos-da-regiao"},
    "campanha": {"title": "Jornal do Brasil, Vinhos da Campanha Gaúcha ganham indicação geográfica (May 2020)", "url": "https://www.jb.com.br/bem_viver/gastronomia/2020/05/1024024-vinhos-do-extremo-sul-gaucho-ganham-indicacao-geografica.html"},
    "campemb": {"title": "Embrapa, IG Campanha Gaúcha: estruturação e delimitação (chapter 1)", "url": "https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1186386/1/Cap01-IGCampanha-Falcadeetal.pdf"},
    "sc": {"title": "Agência Sebrae, IP Vinhos de Altitude de Santa Catarina", "url": "https://agenciasebrae.com.br/?p=3332"},
    "bitu": {"title": "Agência Sebrae, Com vinhos de Bituruna, Paraná conquista sua 11ª IG (Oct 2022)", "url": "https://agenciasebrae.com.br/cultura-empreendedora/com-vinhos-de-bituruna-parana-conquista-a-sua-11a-indicacao-geografica/"},
    "farroupilha": {"title": "Revista Cultivar, Reconhecida a IP Farroupilha para vinhos finos moscatéis (Nov 2015)", "url": "https://revistacultivar.com.br/noticias/reconhecida-a-indicacao-de-procedencia-farroupilha-para-vinhos-finos-moscateis"},
    "inpi2883": {"title": "INPI, Revista da Propriedade Industrial 2883, IG section (Jundiahy application pending)", "url": "https://revistas.inpi.gov.br/pdf/Indicacoes_Geograficas2883.pdf"},
    "vv_wiki": {"title": "Vale dos Vinhedos, Wikipedia (pt)", "url": "https://pt.wikipedia.org/wiki/Vale_dos_Vinhedos"},
}


def S(*k):
    return [SRC[x] for x in k]


COUNTRY = {
    "iso2": "br", "name": "Brazil", "tier": "notable",
    "tagline": "Italian immigrants' hill-country sparkling wine, tropical vineyards that harvest twice a year, and 'winter wines' made by reversing the seasons.",
    "stats": {"vineyard_ha": 84400, "production_mhl": 3.0, "year": 2025, "world_rank_production": 15,
              "note": "Vineyard: IBGE 2024 via Embrapa (all grapes, including table and juice grapes). Production: OIV 2025 (3.0 mhl, 15th; +38% on the frost- and flood-hit 2024)."},
    "overview": (
        "Brazil is a giant that makes a modest amount of wine, and most of it is not what you might expect. Of about 84,000 ha of vines (IBGE 2024), the majority are American and hybrid grapes such as Isabel, Bordô and Niágara, grown for juice, table grapes and sweet *vinho de mesa*. Fine wine from Vitis vinifera is a smaller but fast-improving slice, concentrated in the far south, and Brazil's best calling card is sparkling wine.\n\n"
        "The story is Italian. From 1875 the Brazilian empire settled immigrants from Veneto, Trentino and Lombardy on the forested basalt plateau of the Serra Gaúcha in Rio Grande do Sul, around Bento Gonçalves, Garibaldi, Caxias do Sul and Flores da Cunha. They planted vines on small family plots and built cooperatives such as Aurora (1931); their descendants (Valduga, Miolo, Salton, Pizzato and many more) still run much of the industry. The Serra is humid, with summer rain, so early-ripening Chardonnay and Pinot Noir for traditional-method *espumante* and the aromatic Moscato of Farroupilha became its strengths. Brazil's first geographical indications were born here: Vale dos Vinhedos became an IP in 2002 and Brazil's first wine DO in 2012, and Altos de Pinto Bandeira became the second DO, for traditional-method sparkling wine only, in 2022.\n\n"
        "Brazil also breaks the rules of viticulture. In the semi-arid Vale do São Francisco, at 9°S on the border of Pernambuco and Bahia, irrigated vines never go dormant, and growers prune to produce two or more harvests a year, making fruity reds, whites and Muscat sparkling wines in the tropics. In Minas Gerais and São Paulo, the *dupla poda* (double pruning) technique developed by Epamig moves the harvest to the dry, cool winter (June to September), creating 'vinhos de inverno', winter wines of Syrah and Sauvignon Blanc that received their own IG, Sul de Minas, in 2025. Meanwhile the high plateau of Santa Catarina around São Joaquim, at 900 to 1,400 m, makes cool-climate wines under snow-dusted winters, and the Campanha Gaúcha on the Uruguayan border produces sunny reds on sandy soils.\n\n"
        "Brazilians drink about 4.4 million hl of wine a year (OIV 2025), much of it imported from Chile, Argentina and Portugal, but local sparkling wine has won a large share of the home market. Vintages swing wildly: the catastrophic floods of 2024 in Rio Grande do Sul cut fine-wine production in the state by about half, and output rebounded 38% in 2025."
    ),
    "history": [
        {"when": "1532 to 17th century", "title": "Portuguese vines", "text": "Portuguese settlers try vines in São Vicente (São Paulo) from the 1530s; Jesuit missions later plant vines in the south, but tropical humidity and disease defeat colonial viticulture.", "lat": -23.96, "lon": -46.39},
        {"when": "1840s", "title": "Isabel arrives", "text": "The American grape Isabella (Isabel), resistant to fungal disease, is introduced to Rio Grande do Sul and becomes the foundation of Brazilian grape growing."},
        {"when": "1875", "title": "Italian colonisation of the Serra Gaúcha", "text": "The first Italian immigrants, from Veneto, Trentino and Lombardy, settle the Serra Gaúcha, founding the colonies of Conde d'Eu (Garibaldi), Dona Isabel (Bento Gonçalves) and Caxias. Wine for family and church follows.", "lat": -29.1657, "lon": -51.5201},
        {"when": "1931", "title": "Cooperativa Aurora", "text": "Sixteen families found the Aurora cooperative in Bento Gonçalves, now Brazil's largest wine cooperative.", "lat": -29.1722, "lon": -51.5154},
        {"when": "1970s", "title": "Multinationals and vinifera", "text": "Moët & Chandon, Martini & Rossi and other multinationals invest in the Serra Gaúcha, spreading Vitis vinifera and modern sparkling-wine techniques."},
        {"when": "2002", "title": "Brazil's first geographical indication", "text": "On 19 November 2002 INPI grants Vale dos Vinhedos an Indicação de Procedência, the first GI for any product in Brazil, to the producers' association Aprovale.", "lat": -29.179, "lon": -51.579},
        {"when": "2012", "title": "Vale dos Vinhedos DO", "text": "On 25 September 2012 Vale dos Vinhedos becomes Brazil's first wine Denominação de Origem, built on Merlot and Chardonnay."},
        {"when": "2020 to 2022", "title": "IGs spread", "text": "INPI recognises Campanha Gaúcha (2020), Vinhos de Altitude de Santa Catarina (2021), Altos de Pinto Bandeira DO for sparkling wine (2022), Bituruna (2022) and Vale do São Francisco, the first tropical wine IG in the world (2022).", "lat": -9.38, "lon": -40.5},
        {"when": "2024", "title": "The great flood", "text": "Floods in Rio Grande do Sul in 2024, after heavy rain in late 2023, hit the vineyards of the Serra Gaúcha; fine-wine production in the state falls by about half."},
        {"when": "2025", "title": "Winter wines win a GI", "text": "INPI grants the IP Sul de Minas for 'vinhos de inverno', double-pruned wines harvested between June and September, Brazil's 13th wine GI.", "lat": -21.37, "lon": -45.51},
    ],
    "classification": (
        "Brazilian wine geographical indications are granted by INPI (the national industrial property institute) under Law 9.279 of 1996, with technical support from Embrapa Uva e Vinho. There are two kinds. An *Indicação de Procedência* (IP) protects a place known for a product; a *Denominação de Origem* (DO) requires that the wine's qualities be due essentially to the place, natural and human factors combined. Each has a *caderno de especificações técnicas* with permitted varieties, yields, area of production and processing, and a numbered seal; many IPs require 85% of grapes from the area, and wines are tasted by a regulatory council.\n\n"
        "As of 2025 Brazil had 13 wine GIs: two DOs (Vale dos Vinhedos 2012, Altos de Pinto Bandeira 2022) and IPs for Vale dos Vinhedos (2002, still active), Pinto Bandeira (2010), Altos Montes (2012), Monte Belo (2013), Farroupilha (2015), Campanha Gaúcha (2020) in Rio Grande do Sul, Vales da Uva Goethe (2012) and Vinhos de Altitude de Santa Catarina (2021) in Santa Catarina, Bituruna (2022) in Paraná, Vale do São Francisco (2022) in Pernambuco and Bahia, and Sul de Minas (2025) in Minas Gerais. Further applications, such as Jundiahy in São Paulo, are under examination. Outside the GIs, Brazilian law separates *vinho fino* (from vinifera grapes) and *vinho de mesa* (often from American or hybrid grapes)."
    ),
    "climate_soils": (
        "Brazil's vineyards span from 31°S to 5°S, and three climatic logics coexist. In the temperate south (Rio Grande do Sul, Santa Catarina, Paraná), vines follow the normal annual cycle, but summer rain and humidity are the enemy: the Serra Gaúcha gets 1,700 mm or more, mostly during the growing season, so early-ripening grapes, trellis training and fungicides are the rule. Soils there are clays derived from basalt of the Serra Geral formation. The Campanha Gaúcha on the Uruguayan border is drier and sunnier, with sandy, granite-derived soils, and the Santa Catarina plateau (900 to 1,400 m) has cold nights and late harvests.\n\n"
        "In the tropical north-east, the Vale do São Francisco has a semi-arid climate with intense sun, about 500 mm of rain and constant warmth; vines are irrigated from the river and can produce two harvests a year, timed by pruning. In the south-east highlands of Minas Gerais and São Paulo, summers are wet but winters dry and cool, so double pruning shifts ripening to the dry season."
    ),
    "grapes": [
        {"name": "Isabel (Isabella) and Bordô", "note": "American grapes that still dominate Brazilian vineyards for juice and vinho de mesa."},
        {"name": "Chardonnay", "note": "Backbone of traditional-method sparkling wine in the Serra Gaúcha; a main variety of the Vale dos Vinhedos DO."},
        {"name": "Pinot Noir", "note": "For sparkling wine (one of the three grapes of the Altos de Pinto Bandeira DO) and increasingly still reds in Santa Catarina."},
        {"name": "Riesling Itálico", "note": "Welschriesling, a traditional base for Brazilian sparkling wine and permitted in the Altos de Pinto Bandeira DO."},
        {"name": "Merlot", "note": "The red flagship of Vale dos Vinhedos DO, ripening reliably in the humid Serra."},
        {"name": "Moscato Branco and other Muscats", "note": "Aromatic sweet sparkling Moscatel, the speciality of Farroupilha and the São Francisco valley."},
        {"name": "Cabernet Sauvignon and Tannat", "note": "Important reds of the Campanha Gaúcha and Serra Gaúcha."},
        {"name": "Syrah", "note": "The leading grape of the 'winter wines' of Minas Gerais and São Paulo, made by double pruning."},
        {"name": "Goethe", "note": "A historic American-vinifera hybrid of the Urussanga valleys in Santa Catarina, protected by its own IP."},
    ],
    "regions": ["Serra Gaúcha", "Campanha Gaúcha", "Serra Catarinense", "Vale do São Francisco", "Sul de Minas"],
    "further_reading": ["Wines of South America, Evan Goldstein", "Embrapa Uva e Vinho, Panorama da vitivinicultura brasileira (annual)", "Wines of Brasil (Ibravin / Consevitis-RS)"],
    "sources": S("emb24", "oiv", "jdc", "jdc26", "minas", "ibge", "vsf", "campanha", "sc", "bitu", "farroupilha", "inpi2883", "vv_wiki"),
}


def ig(name, cat, reg, created, summary, **kw):
    return app(C, name, cat, summary, region=reg, created=created, **kw)


APPS = [
    ig("Vale dos Vinhedos", "DO", "Serra Gaúcha", "IP 19 Nov 2002; DO 25 Sep 2012",
       "Vale dos Vinhedos ('valley of the vineyards') is the cradle of Brazilian fine wine and its first appellation, a valley of about 82 km² of rolling hills shared by Bento Gonçalves, Garibaldi and Monte Belo do Sul in the Serra Gaúcha. Italian families settled here from 1875, and their descendants (Valduga, Miolo, Pizzato, Don Laurindo and others) turned small farms into Brazil's most visited wine valley. In 2002 it received Brazil's first geographical indication of any kind, an IP, and in 2012 the first wine DO.\n\nThe DO is built on two grapes: Merlot, which ripens reliably in the humid climate, for reds, and Chardonnay for whites and sparkling wine, with Cabernet Franc, Cabernet Sauvignon, Tannat, Pinot Noir and Riesling Itálico as permitted partners. Reds must age 12 months before release, and every lot is tasted by a regulatory council. About 11 wineries were certified to use the DO seal in 2025, while the older IP remains in force for a wider range of grapes. Expect supple, fresh Merlot with soft tannins and bright acidity, and some of Brazil's best traditional-method sparkling wine.",
       match=["Vale dos Vinhedos", "Vale dos Vinhedos DO", "Vale dos Vinhedos IP"], styles=["red", "white", "sparkling", "rose"], dominant_style="red",
       grapes="DO: Merlot (main red), Chardonnay (main white); complementary Cabernet Franc, Cabernet Sauvignon, Tannat, Pinot Noir, Riesling Itálico. IP: 12 red and 11 white vinifera varieties.",
       terroir="Basalt-derived clays and some sandier soils on hillsides at 400 to 700 m; humid subtropical climate with summer rain.",
       producers=["Miolo", "Casa Valduga", "Pizzato", "Lidio Carraro", "Don Laurindo"],
       lat=-29.179, lon=-51.579, coord_quality="approx",
       nerd_note="Grape prices in the DO rose from about R$2.50 to R$12 per kilo after certification, by the producers' association's account."),
    ig("Altos de Pinto Bandeira", "DO", "Serra Gaúcha", "2022",
       "Altos de Pinto Bandeira is Brazil's second wine DO and one of the very few appellations anywhere reserved exclusively for traditional-method sparkling wine. Its 65 km² lie mostly in Pinto Bandeira (77%), with slivers of Farroupilha and Bento Gonçalves, on basalt plateaus at 520 to 770 m. Only Chardonnay, Pinot Noir and Riesling Itálico are allowed, from vineyards trained on espalier or 'Y' trellises with a yield cap of 12 t/ha, and the whole process (base wine, second fermentation and ageing in bottle) must happen inside the area. Each bottle carries a numbered seal; the first DO wines reached the market in 2023. Producers such as Cave Geisse, founded by the Chilean Mario Geisse in 1979, made Pinto Bandeira's reputation for crisp, toasty, long-aged sparkling wine.",
       match=["Altos de Pinto Bandeira"], styles=["sparkling"], dominant_style="sparkling", area_ha=6500,
       grapes="Chardonnay, Pinot Noir, Riesling Itálico", producers=["Cave Geisse", "Valmarino", "Don Giovanni"],
       lat=-29.10, lon=-51.44, coord_quality="approx",
       nerd_note="The producers' association, Asprovinho, began work on the DO in 2016 and won it in 2022, twelve years after the area's IP."),
    ig("Pinto Bandeira", "IP", "Serra Gaúcha", "13 Jul 2010",
       "Pinto Bandeira's IP (2010) covers about 7,960 ha on the high basalt plateau north-east of Bento Gonçalves and allows red, white and sparkling wines from eight red and twelve white vinifera varieties, with at least 85% of grapes from the area and sparkling wine by the traditional method only. It remains in force alongside the stricter sparkling-only DO Altos de Pinto Bandeira.",
       match=["Pinto Bandeira"], styles=["sparkling", "white", "red"], dominant_style="sparkling", area_ha=7960,
       producers=["Cave Geisse", "Valmarino", "Don Giovanni"], lat=-29.0977, lon=-51.4498, coord_quality="approx"),
    ig("Altos Montes", "IP", "Serra Gaúcha", "11 Dec 2012",
       "Altos Montes covers about 174 km² of high country in Flores da Cunha and Nova Pádua, among the highest parts of the Serra Gaúcha (often above 800 m). Its IP (2012) covers still and sparkling wines from varieties including Tannat, Cabernet Sauvignon, Merlot, Chardonnay, Pinot Noir and Cabernet Franc. Flores da Cunha, settled by Venetians, is one of Brazil's leading wine-producing municipalities.",
       match=["Altos Montes"], styles=["red", "white", "sparkling"], area_ha=17384, producers=["Luiz Argenta"],
       lat=-29.03, lon=-51.18, coord_quality="approx"),
    ig("Monte Belo", "IP", "Serra Gaúcha", "1 Oct 2013",
       "Monte Belo (Monte Belo do Sul), a 56 km² municipality next to the Vale dos Vinhedos, received its IP in 2013 for still and sparkling wines from a network of small family wineries descended from Italian settlers. Merlot, Cabernet Sauvignon, Tannat and Chardonnay are prominent.",
       match=["Monte Belo", "Monte Belo do Sul"], styles=["red", "white", "sparkling"], area_ha=5609,
       lat=-29.1392, lon=-51.6548, coord_quality="approx"),
    ig("Farroupilha", "IP", "Serra Gaúcha", "10 Jul 2015",
       "Farroupilha, near Caxias do Sul, is Brazil's Moscato capital, and its 2015 IP is unusual worldwide: it protects only Muscat-based products, including fine white Moscatel, Moscatel espumante (sweet, fragrant sparkling), frisante, licoroso, mistela and Moscatel brandy. The town grows most of Brazil's Moscato Branco, and its sparkling Moscatel, low in alcohol and fresh, is a national favourite.",
       match=["Farroupilha"], styles=["sparkling", "white", "sweet"], dominant_style="sparkling", grapes="Moscato Branco, Moscato Giallo, Moscatel Nazareno, Malvasia de Cândia and other Muscats",
       lat=-29.2265, lon=-51.3468, coord_quality="approx",
       nerd_note="The pilgrimage sanctuary of Nossa Senhora de Caravaggio in Farroupilha hosted the IP's founding mass in 2015."),
    ig("Campanha Gaúcha", "IP", "Campanha Gaúcha", "May 2020",
       "The Campanha Gaúcha is Brazil's second wine region by volume, a sunny, rolling grassland (the pampa) on the Uruguayan and Argentine borders between 29°S and 32°S. Modern vineyards date from the 1970s, when Almadén planted at Santana do Livramento; by 2019 about 1,512 ha supplied 31% of Brazilian fine-wine production. Its 2020 IP covers 14 municipalities and 18 wineries, with up to 36 vinifera varieties allowed. Drier, sunnier conditions and sandy, granite-derived soils give riper reds than the Serra: Cabernet Sauvignon, Tannat and Merlot, plus Chardonnay for whites and sparkling.",
       match=["Campanha Gaúcha", "Campanha Gaucha", "Campanha"], styles=["red", "white", "rose", "sparkling"], dominant_style="red",
       grapes="Cabernet Sauvignon, Tannat, Merlot, Chardonnay, Sauvignon Blanc, Pinot Noir",
       producers=["Guatambu", "Miolo (Seival and Almadén)", "Cordilheira de Sant'Ana", "Campos de Cima"],
       lat=-30.9, lon=-55.0, coord_quality="approx"),
    ig("Vinhos de Altitude de Santa Catarina", "IP", "Serra Catarinense", "2021",
       "This IP covers wines from vineyards at least 900 m above sea level across 29 municipalities of Santa Catarina's high plateau, around São Joaquim, Urubici, Campos Novos and Caçador, about a fifth of the state. Nearly 300 ha of vines produce about a million bottles a year; the rules cap yields at 7,000 litres per hectare and require blind tasting. Cold winters (São Joaquim sees snow), late ripening into April and cool nights give Sauvignon Blanc, Pinot Noir, Cabernet Sauvignon, Merlot and sparkling wines with high acidity.",
       match=["Vinhos de Altitude de Santa Catarina", "Vinhos de Altitude"], styles=["white", "red", "sparkling"],
       grapes="Sauvignon Blanc, Chardonnay, Pinot Noir, Cabernet Sauvignon, Merlot, Malbec", producers=["Villa Francioni", "Quinta da Neve", "Suzin"],
       lat=-28.29, lon=-49.94, coord_quality="approx"),
    ig("Vales da Uva Goethe", "IP", "Santa Catarina", "14 Feb 2012",
       "Vales da Uva Goethe, in the valleys around Urussanga in southern Santa Catarina, protects wines from Goethe, a 19th-century American hybrid grape brought by Italian immigrants. The IP (2012) covers dry and off-dry whites, light wines, sparkling wines by traditional and Charmat methods, and licorosos, a rare case of a GI built on a hybrid.",
       match=["Vales da Uva Goethe"], styles=["white", "sparkling", "sweet"], grapes="Goethe (and Goethe Primo)", lat=-28.49, lon=-49.35, coord_quality="approx"),
    ig("Bituruna", "IP", "Paraná", "18 Oct 2022",
       "Bituruna, in southern Paraná, was granted an IP in 2022 for its *casca dura* ('hard skin') white wines, made from a pink, thick-skinned local grape long grown by Italian-descended families. The dry, aromatic wines of four wineries (Sanber, Bertoletti, Di Sandi and Dell Mont) were the first certified; Bituruna calls itself Paraná's wine capital.",
       match=["Bituruna", "Vinhos de Bituruna"], styles=["white"], producers=["Sanber", "Bertoletti", "Di Sandi", "Dell Mont"], lat=-26.1613, lon=-51.5533, coord_quality="approx"),
    ig("Vale do São Francisco", "IP", "Vale do São Francisco", "1 Nov 2022",
       "The world's first tropical wine region with a geographical indication, recognised by INPI on 1 November 2022. It covers five municipalities along the São Francisco river: Lagoa Grande, Petrolina and Santa Maria da Boa Vista in Pernambuco, and Casa Nova and Curaçá in Bahia, at about 9°S in the semi-arid sertão. Irrigation from the river turned caatinga scrub into vineyards from the 1960s. Because the vines never go dormant, growers prune to schedule successive harvests, often two a year. The IP covers fine still wines, sparkling wines and Muscat sparkling wines; fruity Syrah, Tempranillo, Chenin Blanc and Moscato are typical.",
       match=["Vale do São Francisco", "Vale do Sao Francisco", "Vale do Submédio São Francisco"], styles=["red", "white", "sparkling"],
       grapes="Syrah, Cabernet Sauvignon, Tempranillo, Touriga Nacional, Chenin Blanc, Moscato Canelli, Muscats", producers=["Rio Sol", "Miolo (Terranova)"],
       lat=-9.10, lon=-40.30, coord_quality="approx",
       nerd_note="Embrapa's Jorge Tonietto called it the first region of tropical wines in the world to hold a GI with EU-style production standards."),
    ig("Sul de Minas", "IP", "Sul de Minas", "Feb 2025",
       "Sul de Minas, granted in February 2025, is Brazil's 13th wine GI and protects 'vinhos de inverno', winter wines. Vines are pruned twice (*dupla poda*): once to grow the plant through the rainy summer and again to set fruit that ripens in the dry, cool winter, with harvest required between 1 June and 21 September. The area covers ten municipalities around Três Corações and Três Pontas (São João da Mata, Cordislândia, São Gonçalo do Sapucaí, Três Corações, Três Pontas, Campos Gerais, Boa Esperança, Bom Sucesso, Ibituruna and Ijaci). Syrah is the star, with Sauvignon Blanc and Cabernet Franc.",
       match=["Sul de Minas", "Vinhos de Inverno do Sul de Minas"], styles=["red", "white"], dominant_style="red", grapes="Syrah, Sauvignon Blanc, Cabernet Franc, Merlot",
       lat=-21.5, lon=-45.4, coord_quality="approx",
       nerd_note="The technique was developed in the 2000s by the Minas Gerais agricultural research company Epamig and spread to São Paulo, Goiás and the Federal District."),
]

REGIONS = [
    region(C, "Serra Gaúcha", -29.15, -51.5, 9, "Italian hill country and Brazil's sparkling-wine capital.",
           "The basalt plateau of north-east Rio Grande do Sul around Bento Gonçalves, Garibaldi, Caxias do Sul, Flores da Cunha and Farroupilha makes the majority of Brazil's wine. It holds both of Brazil's DOs and four more IPs.",
           "Settled by Italian immigrants from 1875; cooperatives such as Aurora (1931); multinational investment in the 1970s; Brazil's first GI in 2002.",
           "Clay soils from basalt; 400 to 800 m; humid subtropical climate with heavy summer rain.",
           "Chardonnay, Pinot Noir, Riesling Itálico, Merlot, Cabernet Franc, Moscato, plus American Isabel and Bordô.",
           "Traditional-method and Charmat sparkling wine, Moscatel espumante, Merlot.",
           "DOs Vale dos Vinhedos and Altos de Pinto Bandeira; IPs Vale dos Vinhedos, Pinto Bandeira, Altos Montes, Monte Belo, Farroupilha.",
           ["Vale dos Vinhedos", "Altos de Pinto Bandeira", "Pinto Bandeira", "Altos Montes", "Monte Belo", "Farroupilha"], S("jdc", "jdc26", "ibge", "emb24")),
    region(C, "Campanha Gaúcha", -30.9, -55.0, 8, "Sunny pampa on the Uruguayan border.",
           "The southern frontier of Rio Grande do Sul, Brazil's second fine-wine region, with large modern estates around Santana do Livramento, Bagé, Dom Pedrito and Candiota.",
           "Almadén planted at Santana do Livramento in the 1970s; the IP was granted in 2020.",
           "Drier and sunnier than the Serra; sandy and granite-derived soils on rolling grassland.",
           "Cabernet Sauvignon, Tannat, Merlot, Chardonnay.", "Riper reds, whites, sparkling.",
           "IP Campanha Gaúcha (14 municipalities).", ["Campanha Gaúcha"], S("campanha", "campemb")),
    region(C, "Serra Catarinense", -28.3, -49.95, 9, "Brazil's high-altitude cold-climate frontier.",
           "The high plateau of Santa Catarina around São Joaquim, at 900 to 1,400 m, where snow falls in winter and harvests run into April.",
           "Modern vineyards from the late 1990s and 2000s; IP Vinhos de Altitude de Santa Catarina granted in 2021.",
           "Volcanic soils, cold nights, high rainfall.", "Sauvignon Blanc, Pinot Noir, Cabernet Sauvignon, Merlot.",
           "Crisp whites, sparkling, elegant reds.", "IP Vinhos de Altitude de Santa Catarina; IP Vales da Uva Goethe in the south of the state.",
           ["Vinhos de Altitude de Santa Catarina", "Vales da Uva Goethe"], S("sc", "ibge")),
    region(C, "Vale do São Francisco", -9.1, -40.3, 8, "Tropical vineyards with two harvests a year.",
           "The irrigated semi-arid valley of the São Francisco river around Petrolina and Lagoa Grande, Pernambuco, and Casa Nova, Bahia, at about 9°S.",
           "Irrigation projects from the 1960s; wine from the 1980s; IP in 2022.",
           "Semi-arid, hot, sunny; river irrigation; sandy soils.", "Syrah, Tempranillo, Chenin Blanc, Moscato.",
           "Young, fruity reds and whites; Muscat sparkling wines.", "IP Vale do São Francisco (five municipalities).",
           ["Vale do São Francisco"], S("vsf", "emb24")),
    region(C, "Sul de Minas", -21.6, -45.5, 9, "Winter wines made by double pruning.",
           "The southern Minas Gerais highlands, where double pruning moves the harvest into the dry winter.",
           "Technique developed by Epamig in the 2000s; IP granted in 2025.",
           "Highlands at about 800 to 1,100 m; wet summers, dry cool winters.", "Syrah, Sauvignon Blanc.",
           "Structured Syrah and fresh whites from winter harvests.", "IP Sul de Minas (ten municipalities).", ["Sul de Minas"], S("minas", "emb24")),
]

SITES = [
    site(C, "Miolo, Vale dos Vinhedos", "estate", -29.1825, -51.5827, "The Miolo family, descendants of Giuseppe Miolo who arrived from Veneto in 1897, sold grapes for decades before launching their own winery in the late 1980s. Miolo Wine Group is now Brazil's largest fine-wine producer, with estates in the Campanha Gaúcha and the São Francisco valley; its Vale dos Vinhedos winery is a tourism hub.", appellation="Vale dos Vinhedos", producers=["Miolo"]),
    site(C, "Casa Valduga, Vale dos Vinhedos", "estate", -29.1792, -51.5558, "Founded by the Valduga family, descendants of Trentino immigrants who arrived in 1875, Casa Valduga built one of Brazil's first wine-tourism complexes in the Vale dos Vinhedos and is known for traditional-method sparkling wine aged in deep cellars.", appellation="Vale dos Vinhedos", producers=["Casa Valduga"]),
    site(C, "Vinícola Salton, Tuiuty", "estate", -29.0797, -51.5549, "Founded in 1910 by the sons of the Italian immigrant Antonio Domenico Salton in Bento Gonçalves, Salton is one of Brazil's oldest and largest wineries, especially for sparkling wine, now with a large modern winery at Tuiuty.", appellation="Altos de Pinto Bandeira", producers=["Salton"]),
    site(C, "Cooperativa Vinícola Aurora", "cellar", -29.1722, -51.5154, "Founded in 1931 by 16 families in Bento Gonçalves, Aurora is Brazil's largest wine cooperative, with more than a thousand grower families. Its downtown winery offers tours through vast cellars of Brazilian wine history.", class_="Cooperative (1931)", appellation="Vale dos Vinhedos", producers=["Aurora"]),
    site(C, "Cave Geisse, Pinto Bandeira", "house", -29.1398, -51.4273, "Chilean winemaker Mario Geisse came to Brazil in the 1970s to run Moët & Chandon's operation and founded his own sparkling-wine house at Pinto Bandeira in 1979. Long-aged traditional-method Chardonnay and Pinot Noir from the basalt plateau made it the reference for the Altos de Pinto Bandeira DO.", appellation="Altos de Pinto Bandeira", producers=["Cave Geisse"]),
    site(C, "Bento Gonçalves", "village", -29.1657, -51.5201, "Founded as the Italian colony of Dona Isabel in 1875, Bento Gonçalves is Brazil's wine capital, home to Embrapa Uva e Vinho, the Aurora cooperative and dozens of wineries, and the gateway to the Vale dos Vinhedos.", appellation="Vale dos Vinhedos"),
    site(C, "Flores da Cunha", "village", -29.0301, -51.1833, "A hill town settled by Venetian immigrants in the 1870s and long the leading grape and wine municipality of the Serra Gaúcha. Its high vineyards, often above 800 m, form the heart of the Altos Montes IP, known for Tannat, Merlot and sparkling wine.", appellation="Altos Montes"),
    site(C, "Villa Francioni, São Joaquim", "estate", -28.2592, -49.9635, "A pioneering high-altitude winery near São Joaquim, Santa Catarina, on the plateau above 1,000 m, built in the early 2000s. Its Sauvignon Blanc, rosé and red blends helped launch the Vinhos de Altitude movement.", appellation="Vinhos de Altitude de Santa Catarina", producers=["Villa Francioni"]),
    site(C, "Rio Sol, Lagoa Grande", "estate", -9.0253, -40.1886, "A large estate on the São Francisco river in Lagoa Grande, Pernambuco, founded with Portuguese investment. Irrigated vines produce more than one harvest a year in the tropical sertão, making Syrah, Touriga Nacional and sparkling wines.", appellation="Vale do São Francisco", producers=["Rio Sol"]),
    site(C, "Guaspari, Espírito Santo do Pinhal", "estate", -22.1806, -46.7417, "A São Paulo state estate on former coffee land in the Mantiqueira foothills and a pioneer of winter wines by double pruning. Its Syrah, harvested in the dry winter, helped build the 'vinho de inverno' category and won international recognition.", appellation=None, producers=["Guaspari"]),
    site(C, "Santana do Livramento", "village", -30.8894, -55.5318, "A border town facing Rivera in Uruguay, where Almadén planted vineyards in the 1970s and launched the modern Campanha Gaúcha. Cordilheira de Sant'Ana and Almadén (now part of Miolo) farm the pampa here.", appellation="Campanha Gaúcha", producers=["Almadén", "Cordilheira de Sant'Ana"]),
]
for s in SITES:
    if s.get("appellation") is None:
        s.pop("appellation", None)
    if "class_" in s:
        s["class"] = s.pop("class_")

if __name__ == "__main__":
    save_part(C, {"countries": [COUNTRY], "regions": REGIONS, "appellations": APPS, "sites": SITES})
