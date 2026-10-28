"""Peru and Bolivia: countries, regions, areas and sites. Saves pe.json and bo.json."""
import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c11")
from c11_common import app, region, save_part, site  # noqa: E402

# ============================================================================ PERU
P = "pe"
PS = {
    "wiki": {"title": "Peruvian wine, Wikipedia", "url": "https://en.wikipedia.org/wiki/Peruvian_wine"},
    "pisco": {"title": "Pisco, Wikipedia (DO dates: Peru 1991, Chile 1931)", "url": "https://en.wikipedia.org/wiki/Pisco"},
    "agraria": {"title": "Agraria.pe, Entre 2019 y 2023 la producción nacional de vinos creció (PRODUCE data, Oct 2024)", "url": "https://agraria.pe/noticias/entre-2019-y-2023-la-produccion-nacional-de-vinos-crecio-a-u-37251"},
    "icex": {"title": "ICEX, Estudio de mercado: el vino en Perú 2025 (resumen)", "url": "https://www.icex.es/content/dam/icex/centros/peru/documentos/2025/estudio-mercado-vino-peru-2025-resumen.pdf"},
    "tacama": {"title": "Wine with Seth, Tacama winery profile", "url": "https://www.winewithseth.com/winewiki/tacama/"},
    "ica": {"title": "Wine with Seth, Ica wine region", "url": "https://www.winewithseth.com/winewiki/ica/"},
}
PSRC = list(PS.values())

PE_COUNTRY = {
    "iso2": "pe", "name": "Peru", "tier": "emerging",
    "tagline": "The cradle of South American wine, where desert vineyards once supplied an empire and now feed pisco stills.",
    "stats": {"vineyard_ha": 13000, "production_mhl": 0.19, "year": 2024,
              "note": "ICEX market study 2025: about 13,000 ha of grapes for wine and pisco; production 19.2 million litres in 2024 (PRODUCE reported 19.1 million litres in 2023)."},
    "overview": (
        "Peru is where South American wine began. Within a decade of Francisco Pizarro's conquest of the Inca empire, Spanish settlers had planted vines in the irrigated desert valleys of the south coast, and by the late 16th century the valleys of Ica, Pisco, Moquegua and Arequipa held the largest vineyards in the Americas. Their wine travelled by mule to the silver mines of Potosí, in today's Bolivia, then the largest city in the Americas, where workers were partly paid in wine, and to Lima, capital of the viceroyalty. Peruvian vines also seeded Chile and, through Chile, Argentina.\n\n"
        "That golden age ended in stages. The Spanish crown restricted wine exports from Peru to protect Spanish producers; the earthquake of 1687 destroyed the cellars and clay *botijas* of Ica and Pisco; producers turned to distilling, and by 1764 pisco made up 90% of the grape drinks of the region. The expulsion of the Jesuits in 1767 cost the vineyards their best managers, and in the 19th century cotton, booming during the American Civil War, replaced vines on the coast. Pisco, a grape brandy distilled from fresh must and named after the port of Pisco, became Peru's national spirit and its grapes' main destiny.\n\n"
        "Today Peru has roughly 13,000 ha of grapes for wine and pisco and makes about 19 million litres of wine a year, most of it sweet or semi-sweet for the home market, dominated by Tabernero and Santiago Queirolo. A small quality scene has grown around Tacama, Ica's historic estate, Intipalka and boutique producers in Ica, Cañete (Lunahuaná), Arequipa and Moquegua. Desert conditions, almost no rain and cooling from the Humboldt Current make dry wines possible; most vines are ungrafted. Peru claims exclusive rights to the name pisco, and its 1991 pisco denomination covers Lima, Ica, Arequipa, Moquegua and parts of Tacna."
    ),
    "history": [
        {"when": "1540s", "title": "First vineyards in Ica", "text": "Spanish settlers, Francisco de Carabantes among them, plant Vitis vinifera in Ica's desert valley; the vines later spread to Chile.", "lat": -14.07, "lon": -75.73},
        {"when": "Late 16th to 17th century", "title": "Supplying the viceroyalty", "text": "Vineyards in Ica, Pisco, Nazca, Moquegua and Arequipa become the largest in the Americas, shipping wine to Lima and the silver city of Potosí.", "lat": -17.19, "lon": -70.93},
        {"when": "1687", "title": "Earthquake ends the wine boom", "text": "A great earthquake destroys Villa de Pisco and Ica, their cellars and clay jars; distilling grows in importance.", "lat": -13.71, "lon": -76.2},
        {"when": "1764 to 1767", "title": "Pisco takes over; Jesuits expelled", "text": "By 1764 pisco represents 90% of grape beverages; in 1767 the Jesuits are expelled and their vineyards auctioned."},
        {"when": "1861 to 1865", "title": "Cotton replaces vines", "text": "High cotton prices during the American Civil War push coastal growers from vineyards to cotton."},
        {"when": "1889", "title": "The Olaechea family buys Tacama", "text": "Manuel Pablo Olaechea acquires Hacienda Tacama in Ica; in the 20th century the family hires French consultants, including Émile Peynaud, and modernises Peruvian winemaking.", "lat": -14.0034, "lon": -75.7177},
        {"when": "1991", "title": "Pisco denomination of origin", "text": "Peru establishes the pisco DO covering Lima, Ica, Arequipa, Moquegua and the Tacna valleys of Locumba, Sama and Caplina."},
    ],
    "classification": "Peru has no wine appellation system comparable to Chile's or Argentina's. The protected name that matters is the denomination of origin *Pisco*, established in 1991, which covers the coastal valleys of Lima, Ica, Arequipa, Moquegua and Tacna (Locumba, Sama and Caplina valleys) and specifies eight pisco grapes (Quebranta, Negra Criolla, Mollar, Uvina, Italia, Torontel, Moscatel and Albilla) and production rules. Peru contests Chile's use of the name pisco, which Chile protected in its own law in 1931; international recognition is split between the two countries. Wine labels may name valleys or regions without a formal appellation.",
    "climate_soils": "Peru's wine valleys are river oases in one of the driest deserts on Earth, the coastal Atacama-Sechura desert, with almost no rain. The cold Humboldt Current cools the coast and brings morning fog, and vineyards in Ica sit at about 400 to 500 m, with sandy alluvial soils irrigated from rivers and wells. Further south, Moquegua and Arequipa's valleys (Majes, Vítor) are higher and more continental. Phylloxera has not been a significant problem in the sandy desert soils, so own-rooted vines are common.",
    "grapes": [
        {"name": "Quebranta", "note": "Peru's emblematic pisco grape, a non-aromatic black grape born in Peru from Listán Prieto (Negra Criolla) and Mollar."},
        {"name": "Negra Criolla", "note": "Listán Prieto, the colonial grape (Mission, País, Criolla Chica), used for pisco and traditional wine."},
        {"name": "Moscatel, Italia, Torontel", "note": "Aromatic grapes for pisco acholado and aromático, and for sweet wines."},
        {"name": "Malbec, Tannat, Petit Verdot, Cabernet Sauvignon, Syrah", "note": "Grown in Ica and other valleys for modern dry reds."},
        {"name": "Sauvignon Blanc, Chardonnay", "note": "For dry whites in Ica's estates."},
    ],
    "regions": ["Ica", "Lima", "Arequipa", "Moquegua", "Tacna"],
    "further_reading": ["Wines of South America, Evan Goldstein", "Pablo Lacoste, El vino y el pisco en la historia de Perú y Chile"],
    "sources": PSRC,
}


def pe_area(name, lat, lon, summary, **kw):
    kw.setdefault("subcat", "Pisco DO zone")
    kw.setdefault("coord_quality", "approx")
    return app(P, name, "Region", summary, region=name, lat=lat, lon=lon, **kw)


PE_APPS = [
    pe_area("Ica", -14.07, -75.73, "Ica, about 300 km south of Lima, is the heart of Peruvian wine and pisco: a desert valley with roughly half the country's production, about 400 to 500 m above sea level, irrigated by the Ica river and wells. It holds the colonial-era Hacienda Tacama, Viña Ocucaje (1898), Santiago Queirolo's estate and Intipalka, and the Tabernero group is based in nearby Chincha. Hot days and cool, foggy nights give ripe reds such as Malbec, Tannat and Petit Verdot, while Quebranta and the aromatic grapes go to pisco.", styles=["red", "white", "sweet", "fortified"], producers=["Tacama", "Ocucaje", "Santiago Queirolo (Intipalka)", "Tabernero", "Vista Alegre"], nerd_note="Ica's Huacachina oasis, a lagoon among giant dunes 5 km from the city, is the tourist centre of Peru's wine route."),
    pe_area("Lima", -12.95, -76.15, "Lima region's wine and pisco valleys lie south of the capital in Cañete, around Lunahuaná and Azpitia, where small producers make pisco, artisanal wine and *cachina* (young, partly fermented grape wine) on terraces along the Cañete river.", styles=["red", "white", "sweet"]),
    pe_area("Arequipa", -16.3, -72.4, "Arequipa's wine valleys (Majes, Vítor, Caravelí) were colonial vineyards supplying the mines of Upper Peru; today they produce pisco and a revival of traditional wines from old Negra Criolla vines in desert valleys at 500 to 1,800 m.", styles=["red", "white", "sweet"]),
    pe_area("Moquegua", -17.19, -70.93, "Moquegua was one of the great wine valleys of the viceroyalty; archaeologists have mapped dozens of colonial *bodegas* with clay jars in its desert valley. It is a pisco DO region with small, traditional producers.", styles=["sweet", "red"], nerd_note="Archaeological surveys have documented dozens of colonial winery sites, with their clay botijas, in the Moquegua valley."),
    pe_area("Tacna", -17.9, -70.4, "Tacna, on the Chilean border, has pisco DO status in the Locumba, Sama and Caplina valleys, with small vineyards for pisco and local wine.", styles=["sweet", "red"]),
]

PE_REGIONS = [
    region(P, "Ica", -14.07, -75.73, 9, "Peru's desert heartland of wine and pisco.",
           "The Ica valley produces about half of Peru's wine and pisco.",
           "Vines planted from the 1540s; the 1687 earthquake; the Olaechea family's Tacama from 1889; the modern pisco revival.",
           "Hyper-arid desert at 400 to 500 m, sandy alluvium, Humboldt-cooled nights.", "Quebranta, Negra Criolla, Moscatel, Italia, Torontel, Malbec, Tannat, Petit Verdot.",
           "Pisco, sweet and semi-sweet wines, modern dry reds.", "Pisco DO region.", ["Ica"], PSRC),
    region(P, "Southern Andes valleys", -16.8, -71.5, 7, "Colonial wine valleys of Arequipa, Moquegua and Tacna.",
           "The southern coastal valleys that supplied Potosí's silver mines in colonial times, now pisco and artisanal wine country.",
           "Colonial vineyards of the 16th and 17th centuries, mapped by archaeologists in Moquegua.", "Desert river valleys, some at higher altitude.",
           "Negra Criolla, Quebranta, Moscatel, Italia.", "Pisco and traditional wines.", "Pisco DO regions.", ["Arequipa", "Moquegua", "Tacna", "Lima"], PSRC),
]

PE_SITES = [
    site(P, "Hacienda Tacama", "estate", -14.0034, -75.7177, "An estate in the upper Ica valley with roots claimed back to the 1540s, when Francisco de Carabantes planted the first vines in the valley. Owned by the Olaechea family since 1889, its pink colonial hacienda and chapel make it Peru's best-known winery; French consultants including Émile Peynaud advised it from the mid-20th century.", class_="Historic estate (vineyards from the 1540s, claimed)", appellation="Ica", producers=["Tacama"]),
    site(P, "Viña Ocucaje", "estate", -14.4945, -75.7757, "Founded in 1898 in the desert south of Ica, Ocucaje is one of Peru's oldest working wineries, known for pisco and traditional sweet and fortified wines. Its estate and hotel sit amid dunes famous for marine fossil beds.", cq="approx", class_="Historic winery (1898)", appellation="Ica", producers=["Viña Ocucaje"]),
    site(P, "Santiago Queirolo, Ica", "estate", -13.9784, -75.6934, "The Queirolo family, of Italian origin, founded their winery in Lima's Pueblo Libre in 1880; it is now one of Peru's two dominant producers. Its Ica estate at San José de los Molinos grows grapes for pisco and for the Intipalka fine-wine brand.", appellation="Ica", producers=["Santiago Queirolo", "Intipalka"]),
    site(P, "Huacachina oasis", "landscape", -14.0875, -75.7626, "A lagoon among giant sand dunes 5 km from Ica, the symbol of Peru's desert wine country and the hub for visits to the valley's wineries and pisco makers.", cq="approx", appellation="Ica"),
    site(P, "Port of Pisco", "historic", -13.71, -76.2, "The colonial port that gave its name to Peru's grape brandy, from which aguardiente from the Ica valley was shipped to Lima and beyond. The town was devastated by earthquakes in 1687 and 2007.", cq="approx", class_="Historic port", appellation="Ica"),
    site(P, "Moquegua colonial bodegas", "historic", -17.19, -70.93, "The Moquegua valley holds the remains of many colonial wineries with huge clay *tinajas*, evidence of a 17th and 18th century industry that shipped wine and aguardiente to Potosí's silver mines.", cq="approx", class_="Archaeological landscape", appellation="Moquegua"),
]

# ============================================================================ BOLIVIA
B = "bo"
BS = {
    "wiki": {"title": "Bolivian wine, Wikipedia", "url": "https://en.wikipedia.org/wiki/Bolivian_wine"},
    "wiki_es": {"title": "Vino de Bolivia, Wikipedia (es)", "url": "https://es.wikipedia.org/wiki/Vino_de_Bolivia"},
    "singani": {"title": "Singani, Wikipedia", "url": "https://en.wikipedia.org/wiki/Singani"},
    "l1334": {"title": "Ley 1334 sobre las Denominaciones de Origen (4 May 1992), Bolivia", "url": "https://www.lexivox.org/norms/BO-L-1334.html"},
    "correo": {"title": "Correo del Sur, Vinos de altura de Bolivia sueñan con ganar mercados (2021)", "url": "https://correodelsur.com/sociedad/20210511/vinos-de-altura-de-bolivia-suenan-con-ganar-mercados-en-el-mundo.html"},
}
BSRC = list(BS.values())

BO_COUNTRY = {
    "iso2": "bo", "name": "Bolivia", "tier": "emerging",
    "tagline": "Some of the world's highest vineyards, where wine and singani grow above 1,600 m on the edge of the tropics.",
    "stats": {"vineyard_ha": 5000, "year": 2021, "note": "About 5,000 ha of grapes in Tarija (Correo del Sur, 2021); Tarija holds about 80% of Bolivia's wine industry. No reliable national production figure found."},
    "overview": (
        "Bolivia makes wine in a place where vines should not grow: at 21°S, inside the tropics, but high in the Andes. Almost all vineyards sit between about 1,600 and 3,000 m, so the altitude replaces latitude, nights are cold and the sunlight is fierce. That combination gives aromatic grapes and deeply coloured reds, and it is the selling point of the small modern industry centred on the Tarija valley in the south of the country.\n\n"
        "Vines arrived from Peru with Spanish settlers and missionaries in the 16th century to supply wine for Mass and for the booming silver city of Potosí. The earliest documented vineyards are in the Tarija valley around 1589 to 1590, and in the Cinti valley of Chuquisaca, where colonial haciendas trained vines up native molle and chañar trees, a practice that survives in vineyards 100 to 200 years old. For centuries most grapes went to *singani*, a fragrant brandy distilled from Muscat of Alexandria that Bolivia protects as a denomination of origin.\n\n"
        "Modern winemaking dates from the 1960s and 1970s, when producers such as Kohlberg and Kuhlmann moved operations to Tarija and imported European technology. Today wineries including Kohlberg, Aranjuez, Campos de Solana, La Concepción, Casa Vieja and Magnus make Tannat, Malbec, Cabernet Sauvignon, Syrah and aromatic whites, and a revival of old Criolla and Moscatel vines in Cinti has drawn attention abroad. Bolivia celebrates a national day of wine and singani on the last Friday of February."
    ),
    "history": [
        {"when": "1589 to 1590", "title": "First documented vineyards in Tarija", "text": "Documents of Luis de Fuentes y Vargas, founder of Tarija, mention vineyards in the Tarija valley, including at Tolomosa, the earliest records of vines in Bolivia.", "lat": -21.53, "lon": -64.73},
        {"when": "16th to 18th century", "title": "Wine for Potosí", "text": "Vineyards in Cinti, Tarija and the valleys of Potosí department supply wine and aguardiente to the silver mines of Potosí, then one of the largest cities in the world."},
        {"when": "1925", "title": "First winery in Cinti", "text": "The first industrial winery is established at San Pedro near Camargo in Chuquisaca, starting with singani.", "lat": -20.7263, "lon": -65.2259},
        {"when": "1960s to 1980s", "title": "Tarija modernises", "text": "Producers such as Kuhlmann (which moves from Cinti to Tarija in 1973) and Kohlberg invest in European equipment; a national viticulture centre is created in 1986.", "lat": -21.53, "lon": -64.73},
        {"when": "1992", "title": "Singani denomination of origin", "text": "Law 1334 recognises Singani as a denomination of origin reserved for brandies made in defined valleys of Tarija, Chuquisaca, La Paz and Potosí."},
        {"when": "2016", "title": "National day of wine and singani", "text": "Bolivia establishes a national day of wine and singani, celebrated on the last Friday of February."},
    ],
    "classification": "Bolivia's only protected wine-sector name is the denomination of origin *Singani*, recognised by Law 1334 of 4 May 1992 and reserved for grape brandy distilled from Muscat of Alexandria wines produced, distilled and bottled in defined zones: the central valley and provinces of Tarija (Cercado, Avilés, Méndez, Arce), the Nor and Sud Cinti valleys of Chuquisaca, Luribay, Sapahaqui and the Loayza and Murillo provinces of La Paz, and valleys of Potosí department such as Cotagaita and Turuchipa. 'Gran singani' must come from grapes grown above 1,600 m. Wines carry place names (Tarija, Valle de Cinti) without a formal appellation system.",
    "climate_soils": "Bolivian vineyards are high-altitude, subtropical and semi-arid. In Tarija's central valley (about 1,700 to 2,100 m) days are warm, nights cool and rain falls mostly in summer; winds help dry the vines. Cinti, at about 2,400 m, is a narrow canyon of red rock. Intense ultraviolet radiation thickens grape skins and builds aromatics. Soils are alluvial and colluvial, derived from erosion of the surrounding peaks, with clay and sandy loams.",
    "grapes": [
        {"name": "Muscat of Alexandria (Moscatel de Alejandría)", "note": "The main grape, used above all for singani."},
        {"name": "Tannat", "note": "The leading quality red of Tarija, thick-skinned and suited to altitude."},
        {"name": "Malbec, Cabernet Sauvignon, Syrah, Merlot", "note": "Modern reds from Tarija's wineries."},
        {"name": "Negra Criolla (Listán Prieto) and Vischoqueña", "note": "Colonial grapes surviving in old Cinti vineyards trained up trees."},
        {"name": "Torrontés, Chardonnay, Riesling, Sauvignon Blanc", "note": "Aromatic and fresh whites at altitude."},
    ],
    "regions": ["Tarija", "Valle de Cinti", "Samaipata"],
    "further_reading": ["Wines of South America, Evan Goldstein"],
    "sources": BSRC,
}


def bo_area(name, reg, lat, lon, summary, **kw):
    kw.setdefault("subcat", "Wine area")
    kw.setdefault("coord_quality", "approx")
    return app(B, name, "Region", summary, region=reg, lat=lat, lon=lon, **kw)


BO_APPS = [
    bo_area("Valle Central de Tarija", "Tarija", -21.6, -64.68, "The central valley of Tarija, at about 1,600 to 2,150 m, holds most of Bolivia's vineyards and wineries around the city of Tarija, Concepción (Uriondo), Santa Ana and La Pintada. A mild, semi-arid climate with summer rain, winds and cool nights favours Tannat, Malbec, Cabernet Sauvignon, Syrah and Muscat for singani. Kohlberg, Aranjuez, Campos de Solana, Casa Vieja, La Concepción and Magnus are based here.",
            match=["Valle Central de Tarija", "Tarija", "Valle de Tarija"], styles=["red", "white", "sweet"], dominant_style="red",
            grapes="Tannat, Malbec, Cabernet Sauvignon, Syrah, Merlot, Moscatel de Alejandría, Torrontés",
            producers=["Bodegas Kohlberg", "Aranjuez", "Campos de Solana", "La Concepción", "La Casa Vieja", "Bodega Magnus"],
            nerd_note="Tarija's Concepción valley in Uriondo is the hub of Bolivia's wine route, with adobe wineries and Casa Vieja's traditional cellar."),
    bo_area("Valle de Cinti", "Valle de Cinti", -20.8, -65.22, "The Cinti valley in Chuquisaca, around Camargo and Villa Abecia at about 2,400 m, is the spiritual home of Bolivian traditional winemaking. Its colonial vineyards, some 100 to 250 years old, climb native molle and chañar trees in a narrow red-rock canyon, a training system found almost nowhere else. Old Negra Criolla, Moscatel and Vischoqueña vines make singani and small-batch wines that have attracted a new generation of producers since 2000.",
            match=["Valle de Cinti", "Cinti", "Los Cintis"], styles=["red", "white", "sweet"], grapes="Negra Criolla, Moscatel de Alejandría, Vischoqueña",
            nerd_note="About 300 ha of vineyard in Cinti include around 30 vineyards with vines trained up living trees."),
    bo_area("Samaipata", "Samaipata", -18.18, -63.88, "Samaipata, in the Andean foothills of Santa Cruz department at about 1,700 m, is a young wine area near a famous pre-Inca site. Small wineries such as Uvairenda (Vinos 1750) and Landsuá make fresh reds and whites in a more humid climate.",
            match=["Samaipata", "Valle de Samaipata"], styles=["red", "white"], producers=["Uvairenda (1750)", "Bodegas Landsuá"]),
    bo_area("Cotagaita and Vitichi", "Tarija", -20.82, -65.66, "Neighbouring valleys in Potosí department, with about 250 ha of vines (2008), roughly a tenth of Bolivia's vineyard, mostly traditional grapes for singani and local wine.",
            match=["Cotagaita", "Vitichi"], styles=["sweet", "red"]),
]

BO_REGIONS = [
    region(B, "Tarija", -21.6, -64.68, 9, "Bolivia's high-altitude wine heartland.", "The Tarija valley produces about 80% of Bolivian wine and singani.",
           "Vineyards documented from 1589; modern wineries from the 1960s and 1970s.", "Semi-arid valley at 1,600 to 2,150 m; strong UV; summer rain.",
           "Tannat, Malbec, Cabernet Sauvignon, Muscat of Alexandria.", "Reds, aromatic whites, singani.", "Singani DO zone (provinces Cercado, Avilés, Méndez, Arce).",
           ["Valle Central de Tarija", "Cotagaita and Vitichi"], BSRC),
    region(B, "Valle de Cinti", -20.8, -65.22, 10, "Colonial vines climbing molle trees.", "The Cinti valley of Chuquisaca, Bolivia's oldest wine landscape.",
           "Colonial haciendas; first winery at San Pedro in 1925; revival since 2000.", "Canyon at about 2,400 m.", "Negra Criolla, Moscatel, Vischoqueña.",
           "Singani and traditional wines.", "Singani DO zone (Nor and Sud Cinti).", ["Valle de Cinti"], BSRC),
    region(B, "Samaipata", -18.18, -63.88, 10, "Foothill vineyards near a pre-Inca fortress.", "A small modern wine area in Santa Cruz department.",
           "21st-century wineries.", "About 1,700 m, more humid.", "Mixed vinifera.", "Fresh reds and whites.", "No formal appellation.", ["Samaipata"], BSRC),
]

BO_SITES = [
    site(B, "Bodegas Kohlberg", "estate", -21.5959, -64.6106, "A family winery founded in Tarija by Julio Kohlberg, one of the pioneers of Bolivia's modern wine and singani industry. It is among the country's largest producers, with vineyards in the central valley.", appellation="Valle Central de Tarija", producers=["Kohlberg"]),
    site(B, "Bodegas Aranjuez", "estate", -21.5849, -64.6133, "A family winery on the outskirts of Tarija, Aranjuez is best known for Tannat grown at high altitude in the central valley. Its Tannat-based wines, notably the Juan Cruz label, helped bring Bolivian wine its first international recognition.", appellation="Valle Central de Tarija", producers=["Aranjuez"]),
    site(B, "Campos de Solana", "estate", -21.585, -64.6604, "A Tarija winery on the road south to Padcaya, belonging to a family with a long singani tradition. Its wines include Tannat, Malbec and aromatic whites from vineyards in the central valley.", appellation="Valle Central de Tarija", producers=["Campos de Solana"]),
    site(B, "Bodegas La Concepción, Uriondo", "estate", -21.701, -64.6695, "A winery in the Concepción valley of Uriondo, south of Tarija, with vineyards at around 1,800 to 2,000 m, making high-altitude reds, whites and singani.", appellation="Valle Central de Tarija", producers=["La Concepción"]),
    site(B, "La Casa Vieja, Concepción", "historic", -21.6988, -64.6549, "A traditional adobe winery in the village of Concepción, Uriondo, where wine is still made in old style and visitors eat under the vines; a centre of Tarija's wine route and harvest festivals.", appellation="Valle Central de Tarija", producers=["La Casa Vieja"]),
    site(B, "Villa Abecia, Cinti valley", "landscape", -20.9745, -65.2307, "A village in the Cinti canyon of Chuquisaca where colonial-era vines climb native molle trees. Some vineyards here are over a century old, part of a landscape of adobe haciendas and singani stills.", cq="approx", class_="Traditional tree-trained vineyards", appellation="Valle de Cinti"),
    site(B, "San Pedro, Camargo", "historic", -20.7263, -65.2259, "Site of Bolivia's first industrial winery, established in 1925 near Camargo in the Cinti valley by the Ortiz and Patiño families, which began with singani.", cq="approx", class_="First winery in Bolivia (1925)", appellation="Valle de Cinti"),
]

for s in PE_SITES + BO_SITES:
    if "class_" in s:
        s["class"] = s.pop("class_")

if __name__ == "__main__":
    save_part(P, {"countries": [PE_COUNTRY], "regions": PE_REGIONS, "appellations": PE_APPS, "sites": PE_SITES})
    save_part(B, {"countries": [BO_COUNTRY], "regions": BO_REGIONS, "appellations": BO_APPS, "sites": BO_SITES})
