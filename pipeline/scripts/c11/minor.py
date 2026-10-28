"""Paraguay, Colombia, Venezuela, Ecuador: short country entries plus a few mapped sites. Saves py/co/ve/ec.json."""
import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c11")
from c11_common import save_part, site  # noqa: E402

# ============================================================================ PARAGUAY
PY = {
    "iso2": "py", "name": "Paraguay", "tier": "minor",
    "tagline": "Jesuit mission vines, German settlers and a handful of hectares in the humid hills of Guairá.",
    "stats": {"vineyard_ha": 150, "year": 2016, "note": "About 150 ha of grapes, almost all table grapes (ABC Color, 2016); wine output tiny and unrecorded by OIV."},
    "overview": (
        "Paraguay sits squarely in the humid subtropics, with hot summers and heavy rain, and has never been a natural home for the vine. Its wine history comes in three short chapters. In the Jesuit mission period, from the late 16th century, missionaries planted European grapes in the *reducciones* of the south-east to make wine for Mass, as part of self-sufficient Guaraní communities. After independence in the early 19th century, viticulture faded as Paraguayans turned to yerba mate and beer, and sacramental wine was imported.\n\n"
        "The modern thread is German. In the early 20th century immigrant families planted vines in the hills of Guairá department; Colonia Independencia, founded in 1919 to 1920 at the foot of the Ybytyruzú range, became the centre of Paraguayan grape growing, mostly for table grapes and fruit wine, and holds a harvest festival each year. A 2016 estimate put the national vineyard at about 150 ha, with only a small share used for wine and a single known commercial winery in Colonia Independencia making a few thousand litres of Riesling and Cabernet Sauvignon. Paraguay had no active wine exports as of 2024."
    ),
    "history": [
        {"when": "Late 16th to 18th century", "title": "Jesuit mission vines", "text": "Jesuit missionaries plant vines in the Guaraní reducciones of south-eastern Paraguay for sacramental wine, until the order's expulsion in 1767.", "lat": -27.13, "lon": -55.7},
        {"when": "19th century", "title": "Wine fades", "text": "After independence, viticulture declines as yerba mate and beer dominate and Mass wine is imported."},
        {"when": "1908", "title": "Carlos Voigt's vineyard", "text": "Carlos Voigt, a grower of German heritage, begins growing grapes in Guairá, marking the rebirth of Paraguayan viticulture.", "lat": -25.78, "lon": -56.45},
        {"when": "1919 to 1920", "title": "Colonia Independencia", "text": "The agricultural colony of Independencia is founded in Guairá; German and Paraguayan families make it the centre of the country's grape growing.", "lat": -25.7062, "lon": -56.1853},
    ],
    "classification": "Paraguay has no wine appellation system or specific wine regulation comparable to its neighbours; wine is governed by general food and Mercosur rules.",
    "climate_soils": "Humid subtropical climate with abundant rain (often 1,300 to 1,700 mm) and hot summers; the slightly higher, cooler hills of Guairá around the Ybytyruzú range are the only area with a grape-growing tradition.",
    "grapes": [{"name": "American and hybrid table grapes", "note": "Most of the small vineyard area grows table grapes."}, {"name": "Riesling, Cabernet Sauvignon", "note": "Grown in tiny quantities by artisanal producers in Colonia Independencia."}],
    "regions": ["Guairá"],
    "further_reading": [],
    "sources": [
        {"title": "Paraguayan wine, Wikipedia", "url": "https://en.wikipedia.org/wiki/Paraguayan_wine"},
        {"title": "ABC Color, Analizarán potencial vitivinícola del país (2016)", "url": "https://www.abc.com.py/edicion-impresa/economia/analizaran-potencial-vitivinicola-del-pais-1519825.html"},
        {"title": "Independencia (Colonia Independencia), Wikipedia", "url": "https://en.wikipedia.org/wiki/Colonia_Independencia"},
    ],
}
PY_SITES = [
    site("py", "Colonia Independencia", "village", -25.7062, -56.1853, "A farming town in Guairá department, founded in 1919 to 1920 at the foot of the Ybytyruzú hills, settled in part by German families. It is the centre of Paraguay's small grape-growing tradition and hosts an annual grape and wine festival; a 2016 report counted a single commercial winery here producing about 1,200 litres a year.", cq="approx", **{"class": "Grape-growing colony"}),
]

# ============================================================================ COLOMBIA
CO = {
    "iso2": "co", "name": "Colombia", "tier": "minor",
    "tagline": "Equatorial Andean vineyards above 2,000 m in Boyacá, plus a tropical wine industry in the Cauca valley.",
    "stats": {"note": "No reliable national vineyard or wine production figures found; a 2026 travel survey counts about nine serious small wineries, while Casa Grajales in Valle del Cauca reports capacity of about 7 million litres a year."},
    "overview": (
        "Colombia lies on the equator, so its vineyards have no winter. Two very different wine cultures have grown up anyway. In the tropical Cauca valley around La Unión, Valle del Cauca, the Grajales family has grown table and wine grapes for more than 40 years; their Casa Grajales winery, which reports a capacity of about 7 million litres a year, makes wines from grapes adapted to the tropics, harvested more than once a year, and runs the National Grape Park.\n\n"
        "The quality scene is in the high Andes of Boyacá, north of Bogotá, around Villa de Leyva, Sutamarchán and Sáchica in the Alto Ricaurte at about 2,000 to 2,200 m, and in the Valle del Sol near Duitama and Nobsa at about 2,500 m. Cool nights, intense equatorial light and a dry, semi-desert microclimate let growers make Sauvignon Blanc, Riesling, Pinot Noir and Cabernet. Viñedos Ain Karim, established in 1988 near Sutamarchán and the first to plant Sauvignon Blanc in Colombia, and Marqués de Puntalarga in Nobsa, which grows Pinot Noir and Riesling, are the pioneers. With no seasons, vines can be pruned to give two harvests a year. There is no appellation system; volumes are tiny and almost all is drunk at home."
    ),
    "history": [
        {"when": "1980s", "title": "Casa Grajales and tropical wine", "text": "The Grajales family develops tropical viticulture in La Unión, Valle del Cauca, producing wine from multiple harvests a year.", "lat": 4.5373, "lon": -76.1045},
        {"when": "1988", "title": "Ain Karim", "text": "Viñedos Ain Karim is established near Sutamarchán, Boyacá, and plants Colombia's first Sauvignon Blanc.", "lat": 5.6541, "lon": -73.5908},
    ],
    "classification": "Colombia has no wine appellation system.",
    "climate_soils": "Equatorial climate with no seasons; quality vineyards rely on altitude (about 2,000 to 2,600 m in Boyacá) for cool nights, and on the dry, semi-desert microclimate of the Alto Ricaurte around Villa de Leyva, with eroded, low-fertility soils. In the Cauca valley, tropical heat allows several harvests a year.",
    "grapes": [{"name": "Sauvignon Blanc, Riesling", "note": "The main whites of Boyacá's high vineyards."}, {"name": "Pinot Noir, Cabernet Sauvignon, Syrah", "note": "Reds at altitude."}, {"name": "Tropical-adapted varieties (including Isabella and Moscatel)", "note": "In the Cauca valley for Casa Grajales."}],
    "regions": ["Boyacá", "Valle del Cauca"],
    "further_reading": [],
    "sources": [
        {"title": "Pelecanus, Wine tours in Colombia: 9 must-visit vineyards (May 2026)", "url": "https://pelecanus.com.co/en/vineyards-colombia/"},
        {"title": "Agronegocios, Colombia tiene gran potencial para sembrar vid (2021)", "url": "https://www.agronegocios.co/agricultura/colombia-tiene-gran-potencial-para-sembrar-vid-y-producir-vinos-de-alta-calidad-3212646"},
    ],
}
CO_SITES = [
    site("co", "Viñedos Ain Karim", "estate", 5.6541, -73.5908, "Established in 1988 on the road from Villa de Leyva to Santa Sofía, near Sutamarchán in Boyacá, at about 2,000 m. Ain Karim planted Colombia's first Sauvignon Blanc and makes red, white and rosé wines from its own vineyards, aged in an underground cellar.", appellation=None, producers=["Viñedos Ain Karim"]),
    site("co", "Marqués de Puntalarga", "estate", 5.7792, -72.9767, "A vineyard in the Valle del Sol near Nobsa, Boyacá, at about 2,500 m, between Duitama and Belencito. It grows Pinot Noir and Riesling (made dry and sweet) and hosts the Valle del Sol Vid y Vino event each December.", producers=["Marqués de Puntalarga"]),
    site("co", "Casa Grajales and National Grape Park", "estate", 4.5373, -76.1045, "Colombia's pioneering commercial winery in La Unión, Valle del Cauca, founded more than 40 years ago by the Grajales family, with a reported capacity of around 7 million litres a year from tropical-adapted grapes. Its National Grape Park and grape and wine museum explain viticulture in the tropics.", cq="approx", producers=["Casa Grajales"]),
]

# ============================================================================ VENEZUELA
VE = {
    "iso2": "ve", "name": "Venezuela", "tier": "minor",
    "tagline": "Tropical wine in the semi-arid hills of Carora, with two harvests a year.",
    "stats": {"vineyard_ha": 80, "note": "Bodegas Pomar's vineyards at Altagracia, Lara, cover about 80 ha; no national statistics found."},
    "overview": (
        "Venezuela's wine industry is essentially one company and one place. In 1985 the brewer Empresas Polar and the Cognac house Martell joined forces to make wine in the tropics; the brand Pomar combines their names. After experimental plantings at El Tocuyo, they settled on the semi-arid plain of Carora in Lara state, a hot, dry area at about 10°N where cacti and goats are more common than vines. Of about 20 European varieties trialled, six adapted to the climate.\n\n"
        "Because there is no winter, Pomar's vineyards at Altagracia (about 80 ha) are pruned to produce two harvests a year, and all grapes are picked by hand. The winery makes red, white and rosé wines, traditional-method sparkling wines (its Brut Rosé has won medals abroad) and Ecclesia, the communion wine used in Venezuelan churches. Venezuela has no appellation system, and small artisanal producers aside, the country's wine is Pomar's.\n\nCarora's terroir is a dry, hot plain at a few hundred metres, with poor soils and irrigation; the long, bright days and absence of winter mean the vine never truly rests, so vineyard management (pruning dates, water) does the work that seasons do elsewhere."
    ),
    "history": [
        {"when": "1985", "title": "Polar and Martell found Pomar", "text": "Empresas Polar and Martell launch a wine project in Lara; after trials at El Tocuyo, vineyards are planted at Carora.", "lat": 10.1695, "lon": -70.0728},
        {"when": "2010s to 2020s", "title": "Three decades of tropical wine", "text": "Pomar marks three decades of continuous production of still and sparkling wine from twice-yearly harvests."},
    ],
    "classification": "Venezuela has no wine appellation system.",
    "climate_soils": "Semi-arid tropical climate at about 10°N; hot all year with little rain on the Carora plain, so vines are irrigated and pruned to fruit twice a year.",
    "grapes": [{"name": "Six European varieties adapted at Carora", "note": "Selected from about 20 vinifera varieties trialled in the 1980s; they make all of Pomar's red, white, rosé and sparkling wines."}],
    "regions": ["Lara (Carora)"],
    "further_reading": [],
    "sources": [
        {"title": "El Diario, Carora: la ciudad que cobija un proyecto exitoso de vinos (Nov 2023)", "url": "https://eldiario.com/2023/11/24/carora-cobija-proyecto-de-vinos-en-venezuela/"},
        {"title": "Bodegas Pomar, C.A., Wikipedia", "url": "https://en.wikipedia.org/wiki/Bodegas_Pomar,_C.A."},
    ],
}
VE_SITES = [
    site("ve", "Bodegas Pomar, Carora", "estate", 10.1695, -70.0728, "Founded in 1985 by Empresas Polar and Martell, Pomar makes Venezuela's best-known wines from about 80 ha of vineyards at Altagracia near Carora, Lara. With no winter, vines are pruned for two harvests a year, picked by hand, and turned into still wines, traditional-method sparkling wines and communion wine.", cq="approx", producers=["Bodegas Pomar"]),
]

# ============================================================================ ECUADOR
EC = {
    "iso2": "ec", "name": "Ecuador", "tier": "minor",
    "tagline": "Vineyards on the equator, from the Andes above Quito to the limestone coast of Guayas.",
    "stats": {"note": "Three producers reported as of 2022 (Primicias); no national statistics found."},
    "overview": (
        "Ecuador's wine scene is tiny and improbable: vines growing almost exactly on the equator, without seasons. As of 2022 a Spanish journalist counted three producers. Chaupi Estancia, the oldest, has grown grapes for about 30 years at Yaruquí, near Quito, at about 2,400 m and only 10 km from the equator line, making Palomino, a Chardonnay and Viognier blend, Pinot Noir and experimental blends. Dos Hemisferios, the best known, began as a table-grape grower in San Miguel del Morro on the coast of Guayas and turned to wine from 2004, with limestone soils swept by sea breezes; its first wine, Paradoja (Cabernet Sauvignon and Malbec), came from the 2006 harvest. Viña del Guayacán, founded in 2017 at Zapotillo in Loja near the Peruvian border, makes small lots of Cabernet Sauvignon and Chardonnay.\n\n"
        "With no winter, vines can be harvested twice a year, but they age fast and rarely live beyond about 25 years. There is no appellation system."
    ),
    "history": [
        {"when": "1990s", "title": "Chaupi Estancia", "text": "Chaupi Estancia begins growing vines at Yaruquí near Quito, at about 2,400 m on the equator.", "lat": -0.1626, "lon": -78.3179},
        {"when": "2004 to 2006", "title": "Dos Hemisferios", "text": "A table-grape grower in coastal Guayas turns to wine; its first wine, Paradoja, comes from the 2006 harvest.", "lat": -2.5165, "lon": -80.3102},
        {"when": "2017", "title": "Viña del Guayacán", "text": "A third winery is founded at Zapotillo, Loja, near the Peruvian border."},
    ],
    "classification": "Ecuador has no wine appellation system.",
    "climate_soils": "Equatorial: no seasons, so vines are pruned to give up to two harvests a year. The Andes give cool nights at 2,400 m near Quito; the Guayas coast is warm but cooled by the Humboldt Current, with limestone soils.",
    "grapes": [{"name": "Cabernet Sauvignon, Malbec, Pinot Noir", "note": "Main reds."}, {"name": "Chardonnay, Viognier, Palomino", "note": "Whites from the highlands and coast."}],
    "regions": ["Pichincha", "Guayas", "Loja"],
    "further_reading": [],
    "sources": [{"title": "Primicias, Tres viñedos en la mitad del mundo (Ignacio Medina, April 2022)", "url": "https://primicias.ec/noticias/el-chat/tres-vinedos-mitad-mundo-vinos-ecuador"}],
}
EC_SITES = [
    site("ec", "Dos Hemisferios", "estate", -2.5165, -80.3102, "Ecuador's best-known winery, in San Miguel del Morro, Guayas, near the Pacific. A former table-grape grower, it made its first wine, Paradoja, from the 2006 harvest; sea breezes and limestone soils, plus two harvests a year, shape its reds and whites.", producers=["Dos Hemisferios"]),
    site("ec", "Chaupi Estancia, Yaruquí", "estate", -0.1626, -78.3179, "Ecuador's oldest wine estate, planted about 30 years ago at Yaruquí in the Quito district, at about 2,400 m and roughly 10 km from the equator. It makes Palomino, a Chardonnay and Viognier blend and Pinot Noir in a land of 'eternal spring'.", cq="approx", producers=["Chaupi Estancia"]),
]

for lst in (CO_SITES,):
    for s in lst:
        if s.get("appellation") is None:
            s.pop("appellation", None)

if __name__ == "__main__":
    save_part("py", {"countries": [PY], "regions": [], "appellations": [], "sites": PY_SITES})
    save_part("co", {"countries": [CO], "regions": [], "appellations": [], "sites": CO_SITES})
    save_part("ve", {"countries": [VE], "regions": [], "appellations": [], "sites": VE_SITES})
    save_part("ec", {"countries": [EC], "regions": [], "appellations": [], "sites": EC_SITES})
