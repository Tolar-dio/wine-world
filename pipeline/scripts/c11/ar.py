"""Argentina: country, regions, appellations (ar_apps) and sites. Run: python3 -I scripts/c11/ar.py"""
import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c11")
from c11_common import region, save_part, site  # noqa: E402
from ar_apps import APPS  # noqa: E402

C = "ar"
SRC = {
    "iglist": {"title": "INV, Indicaciones Geográficas y Denominaciones de Origen reconocidas y protegidas de la República Argentina (register list)", "url": "https://www.argentina.gob.ar/sites/default/files/i.g._y_d.o.c._de_la_republica_argentina.pdf_.pdf.pdf_.pdf"},
    "invdoc": {"title": "INV, Informe: Vinos con Denominación de Origen (July 2023)", "url": "https://www.argentina.gob.ar/sites/default/files/2018/12/vinos_con_denominacion_de_origen_0.pdf"},
    "malbec": {"title": "INV, Informe de Variedades: Malbec (April 2025)", "url": "https://argentina.gob.ar/sites/default/files/2018/10/informe_malbec-2025-inv.pdf"},
    "h26": {"title": "Bichos de Campo, La cosecha de uva 2026 (INV annual report figures), 23 Oct 2026", "url": "https://bichosdecampo.com/cada-vez-se-brinda-menos-la-cosecha-de-uva-argentina-registro-una-de-sus-peores-campanas-y-la-produccion-de-vino-retrocedio-casi-10-en-un-ano/"},
    "vinetur26": {"title": "Vinetur, Argentina's 2026 grape harvest falls 8% (INV final harvest report)", "url": "https://www.vinetur.com/20260520101069/argentinas-grape-harvest-falls-8.html"},
    "oiv": {"title": "OIV, State of the World Wine Sector in 2025 (May 2026)", "url": "https://www.oiv.int/sites/default/files/2026-05/OIV_State_of_the_World_Wine_Sector_in_2025_PPT.pdf"},
    "calingasta": {"title": "Los Andes, El INV reconoció tres nuevas IG (Tamberías, Hilario, Sorocayense), Feb 2024", "url": "https://www.losandes.com.ar/fincas/el-inv-reconocio-tres-nuevas-indicaciones-geograficas-cuales-son-y-donde-quedan"},
    "tandil": {"title": "Marval O'Farrell Mairal, New GI for wines: Tandil (Res. 24/2024)", "url": "https://www.marval.com/Publicacion/nueva-indicacion-geografica-para-vinos-16882?lang=en"},
    "pucara": {"title": "Marval O'Farrell Mairal, New GI for wines: Valle de Pucará (Res. 8/2025)", "url": "https://www.marval.com/Publicacion/nueva-indicacion-geografica-para-vinos-17148?lang=en"},
    "altoagrelo": {"title": "Marval O'Farrell Mairal, New GI for wines: Alto Agrelo (Res. 27/2025)", "url": "https://www.marval.com/Publicacion/nueva-indicacion-geografica-para-vinos-17259?lang=en"},
    "harpers": {"title": "Harpers, Alto Agrelo awarded Geographical Indication status (Aug 2025)", "url": "https://harpers.co.uk/news/fullstory.php/aid/34514/Alto_Agrelo_awarded_Geographical_Indication_status.html"},
    "templados": {"title": "Mendoza Post, Valles Templados: la nueva IG que reconoció el INV (Res. 28/2025)", "url": "https://www.mendozapost.com/economia/valles-templados-la-nueva-indicacion-geografica-que-reconocio-el-inv/"},
    "elhoyo": {"title": "Bichos de Campo, El Hoyo nueva Indicación Geográfica (Res. 25/2023)", "url": "https://bichosdecampo.com/a-pedido-de-una-bodega-se-reconocio-a-zona-patagonica-de-el-hoyo-como-una-nueva-indicacion-geografica-protegida"},
    "elperal": {"title": "Marval O'Farrell Mairal, New GI: El Peral (Res. 1/2022)", "url": "https://www.marval.com/Publicacion/se-registra-una-nueva-indicacion-geografica-para-vinos-15475?lang=en"},
    "simpl": {"title": "Marval O'Farrell Mairal, Procedure for using GIs simplified (INV Res. 56/2024)", "url": "https://www.marval.com/Publicacion/se-simplifica-el-tramite-para-usar-una-indicacion-geografica-17032?lang=en"},
    "mercosur": {"title": "Resolución SAGyP 94/2026 on Mercosur wine GIs (via CIRA)", "url": "https://www.cira.org.ar/?p=25656"},
    "sawg": {"title": "South America Wine Guide, The GIs of Argentina", "url": "https://southamericawineguide.com/the-gis-of-argentina-argentinas-modern-appellation-system/"},
    "malbecday": {"title": "Diario de Cuyo, Qué se celebra el Día Mundial del Malbec (Pouget, Sarmiento, 17 April 1853)", "url": "https://www.diariodecuyo.com.ar/sanjuan/Que-se-celebra-20140415-0084.html"},
    "colome": {"title": "Bodega Colomé, company profile (altitude 2,300 to 3,111 m, founded 1831)", "url": "https://www.bodegacolome.com/wp-content/uploads/2021/08/COLOME_en.pdf"},
    "catena": {"title": "Bodega Catena Zapata, Wikipedia", "url": "https://en.wikipedia.org/wiki/Bodega_Catena_Zapata"},
    "wiki": {"title": "Argentine wine, Wikipedia", "url": "https://en.wikipedia.org/wiki/Argentine_wine"},
    "pucara2": {"title": "Bichos de Campo, Bodegas de Salta: Valle Arriba (altitudes of Calchaquí vineyards)", "url": "https://bichosdecampo.com/?p=276387"},
}


def S(*k):
    return [SRC[x] for x in k]


# --------------------------------------------------------------- assign sub-regions for the region browser
SUB = {}
for n in ["Luján de Cuyo", "Luján de Cuyo (IG)", "Agrelo", "Alto Agrelo", "Las Compuertas", "Vistalba", "Maipú", "Lunlunta", "Barrancas", "Russel", "El Paraíso", "Godoy Cruz", "Guaymallén", "Las Heras", "Canota", "Lavalle"]:
    SUB[n] = "Luján de Cuyo and Maipú"
for n in ["Valle de Uco", "Tupungato", "Gualtallary", "El Peral", "Tunuyán", "Los Chacayes", "Vista Flores", "San Pablo", "San Carlos", "Paraje Altamira", "Pampa el Cepillo", "Cordón el Cepillo", "La Consulta"]:
    SUB[n] = "Valle de Uco"
for n in ["San Martín", "Junín", "Rivadavia", "Distrito Medrano", "Reducción", "Santa Rosa", "La Paz"]:
    SUB[n] = "East Mendoza"
for n in ["San Rafael", "San Rafael (IG)", "General Alvear"]:
    SUB[n] = "San Rafael and General Alvear"
for a in APPS:
    if a["name"] in SUB:
        a["subregion"] = SUB[a["name"]]
    if a["name"] in ("Cuyo", "San Luis", "Victoria, Entre Ríos"):
        a["region"] = None

COUNTRY = {
    "iso2": "ar", "name": "Argentina", "tier": "major",
    "tagline": "Malbec at altitude: desert oases fed by Andean snowmelt, from the Tropic of Capricorn to the Patagonian wind.",
    "stats": {"vineyard_ha": 199946, "production_mhl": 9.7, "year": 2026, "world_rank_production": 6,
              "note": "Vineyard: INV, all grape vines at 31 Dec 2024 (Malbec report 2025). Production: INV 2026 annual report, 9,700,421 hl (down 9.9% on 2025). Rank: OIV 2025, where Argentina made 10.8 mhl, 6th in the world."},
    "overview": (
        "Argentina makes wine in the desert. Almost every vineyard lies in the rain shadow of the Andes, in irrigated oases strung along rivers of snowmelt between the Tropic of Capricorn in Jujuy and 45°S in Chubut. Rainfall is often 200 mm a year or less, the sun shines on more than 300 days, and the only reason a vine can grow is a canal network whose oldest channels follow Huarpe and Inca irrigation. Height does the work that latitude does in Europe. Vineyards run from about 500 m on the eastern plains of Mendoza to 1,500 m in the Uco Valley and above 3,000 m in the Calchaquí valleys of Salta, among the highest commercial vineyards on Earth. Every 100 m of altitude costs roughly 0.6°C, so the higher sites keep acidity and freshness while the intense ultraviolet light thickens grape skins.\n\n"
        "The vine came from Chile and Peru with Spanish priests and conquistadors in the 1550s: to Santiago del Estero in 1557, to Mendoza after its founding in 1561, to San Juan soon after. For three centuries the country drank wine from Criolla grapes, the Listán Prieto family that Chile calls País. The modern story begins in 1853, when Domingo Faustino Sarmiento's Quinta Normal in Mendoza, run by the French agronomist Michel Aimé Pouget, brought French varieties including Malbec. The railway from Buenos Aires reached Mendoza in 1885, carrying Italian and Spanish immigrants west and their wine east, and by the early 20th century Argentina had one of the largest wine industries in the world, built on cheap table wine for a nation that drank about 90 litres a head in the 1970s.\n\n"
        "That model collapsed in the 1980s, along with consumption, hyperinflation and much of the old Malbec vineyard. The rebirth of the 1990s came from looking outward: foreign capital and flying winemakers, drip irrigation, yield control, new oak, and above all a few producers who bet on altitude and on Malbec. Nicolás Catena planted the Adrianna vineyard at about 1,450 m in Gualtallary in 1992, when locals thought it was too cold to ripen anything. French investors arrived in the Uco Valley (Clos de los Siete, Cheval des Andes), and by the 2000s Argentine Malbec, plush, violet-scented and affordable, had become one of the wine world's great export stories.\n\n"
        "Malbec is now the most planted grape in the country, 47,064 ha in 2024 according to INV, 23.5% of the national vineyard and present in 18 of 20 wine provinces. It is joined by Bonarda (Douce Noir of Savoie), Cabernet Sauvignon, Cabernet Franc, Syrah, the pink-skinned Criolla Grande and Cereza that still fill boxes and demijohns, and Torrontés Riojano, the floral white born in Argentina from Muscat of Alexandria and Criolla Chica. Phylloxera is present, but in a weak form held back by sandy soils and flood irrigation, so most vineyards remain ungrafted.\n\n"
        "The frontier of the 2010s and 2020s is precision. Mendoza's Uco Valley has been carved into district IGs drawn on geology (Paraje Altamira, Los Chacayes, San Pablo, Pampa El Cepillo), producers map calcareous crusts and river stones parcel by parcel, and new IGs keep appearing in the high north, the Andean valleys of San Juan, Patagonia and even the Atlantic coast of Buenos Aires. At the same time the domestic industry is shrinking: the 2026 harvest of 18.6 million quintals was among the lowest on record, wine output fell to 9.7 million hectolitres, and the national vineyard has lost tens of thousands of hectares in a decade. Argentines still drink more wine than anyone else in the Americas, about 21 litres per adult in 2025 according to the OIV, and wine has been the national drink by law since 2013."
    ),
    "history": [
        {"when": "1557", "title": "First vines at Santiago del Estero", "text": "Vine cuttings from Chile are planted at Santiago del Estero, the oldest Spanish town in Argentina; tradition credits the priest Juan Cedrón (or Cidrón). The grape is the Criolla family, ancestor of Criolla Chica and cousin of Chile's País.", "lat": -27.7834, "lon": -64.2642},
        {"when": "1561", "title": "Mendoza is founded", "text": "Pedro del Castillo founds Mendoza on 2 March 1561. Spanish settlers extend the Huarpe irrigation canals, and vineyards spread through Cuyo; San Juan follows from 1562. Wine and aguardiente travel by cart and mule to Buenos Aires, Córdoba and the silver city of Potosí.", "lat": -32.8826, "lon": -68.8333},
        {"when": "17th to 18th century", "title": "Jesuit estancias", "text": "Jesuit estancias around Córdoba, such as Caroya, make wine for their colleges until the order's expulsion in 1767; the estancias are now a UNESCO World Heritage site.", "lat": -30.9881, "lon": -64.1061},
        {"when": "17 April 1853", "title": "Pouget, Sarmiento and Malbec", "text": "Following Domingo Faustino Sarmiento's plan, the project for Mendoza's Quinta Normal de Agricultura is presented to the provincial legislature; its director, the French agronomist Michel Aimé Pouget, brings French vine varieties including Malbec. The date is now celebrated as Malbec World Day.", "lat": -32.889, "lon": -68.845},
        {"when": "1885", "title": "The railway reaches Mendoza", "text": "The Buenos Aires to Mendoza railway opens, championed by governor Tiburcio Benegas, owner of El Trapiche. Italian and Spanish immigrants pour into Cuyo, and wine for the booming capital becomes Mendoza's industry.", "lat": -32.9725, "lon": -68.7469},
        {"when": "1902", "title": "Nicola Catena plants Malbec", "text": "Italian immigrant Nicola Catena plants his first Malbec vineyard in Rivadavia, Eastern Mendoza, founding the family firm that his grandson Nicolás would turn into Argentina's best-known fine-wine house.", "lat": -33.1958, "lon": -68.4661},
        {"when": "1909", "title": "Wine in Patagonia", "text": "Humberto Canale plants vines in the Alto Valle of Río Negro, beginning commercial Patagonian viticulture.", "lat": -39.0693, "lon": -67.6397},
        {"when": "1959", "title": "INV and Chandon", "text": "Law 14.878 creates the Instituto Nacional de Vitivinicultura to regulate the industry; the same year Moët & Chandon chooses Argentina for its first winery outside France.", "lat": -33.1389, "lon": -68.8892},
        {"when": "1970s to 1980s", "title": "Boom and bust", "text": "Per-capita consumption peaks near 90 litres a year in the 1970s; then consumption falls, inflation soars and vast areas of old vines, Malbec included, are uprooted or grafted to high-yielding pink grapes."},
        {"when": "1990s", "title": "Modernisation and altitude", "text": "Economic stabilisation brings foreign investment and flying winemakers. Nicolás Catena plants the Adrianna vineyard at about 1,450 m in Gualtallary (1992); Michel Rolland and partners begin Clos de los Siete in Vista Flores (1998); the Uco Valley boom starts.", "lat": -33.39, "lon": -69.26},
        {"when": "1999", "title": "Law 25.163: IP, IG and DOC", "text": "The national law creates Argentina's appellation system of Indicación de Procedencia, Indicación Geográfica and Denominación de Origen Controlada, regulated by Decree 57/2004; the large IG list follows in 2002.", "lat": -33.03, "lon": -68.88},
        {"when": "2013", "title": "Wine becomes the national drink; Paraje Altamira", "text": "Law 26.870 declares wine Argentina's national drink. The same year INV recognises Paraje Altamira, the first Uco district IG drawn after soil-pit studies, opening the era of geology-based IGs.", "lat": -33.765, "lon": -69.165},
        {"when": "2016", "title": "Zuccardi Valle de Uco", "text": "The Zuccardi family opens its stone winery at Paraje Altamira, built from the alluvial rocks of its own vineyards; it is later named the World's Best Vineyard three years running.", "lat": -33.776, "lon": -69.145},
        {"when": "2023 to 2025", "title": "New IGs from Patagonia to Jujuy", "text": "INV recognises El Hoyo (Chubut), Tamberías, Hilario and Sorocayense (Calingasta), Tandil (Buenos Aires), Valle de Pucará (Salta), Alto Agrelo (Luján de Cuyo) and Valles Templados (Jujuy).", "lat": -42.0641, "lon": -71.5193},
        {"when": "2026", "title": "A short harvest", "text": "INV reports an 18.6 million quintal grape harvest, among the lowest on record, and 9.7 million hl of wine; Argentina also sets the rules for protecting Mercosur partners' wine GIs under the 2019 Bento Gonçalves agreement."},
    ],
    "classification": (
        "Argentina's appellation law is Law 25.163 of 1999, regulated by Decree 57/2004 and administered by the Instituto Nacional de Vitivinicultura (INV). It creates three tiers. An *Indicación de Procedencia* (IP) is for table and regional wines with at least 80% of grapes from the named area. An *Indicación Geográfica* (IG) is for quality wines from a region, locality or area no larger than a province (or an established interprovincial zone) whose character is mainly due to its origin; grapes must be grown and the wine made in the area. A *Denominación de Origen Controlada* (DOC) requires that quality be due 'exclusively or essentially' to the place, natural and human factors combined, with a regulatory council and production rules.\n\n"
        "In practice, the IG is what matters. INV's register held 110 IGs and 2 DOCs in 2023, and at least eight more IGs have been added since (El Hoyo, Tamberías, Hilario, Sorocayense, Tandil, Valle de Pucará, Alto Agrelo, Valles Templados). They nest loosely: interprovincial regions (Cuyo, Patagonia, Valles Calchaquíes, Valles del Famatina), provinces (Mendoza, San Juan, Salta), departments (Luján de Cuyo, Tupungato, Cafayate) and districts or *parajes* (Agrelo, Los Chacayes, Paraje Altamira, San Pablo). Many department IGs were registered in bulk in 2002, while the district IGs of the 2010s and 2020s were drawn on soil, geology and climate studies. Since INV Resolution 56/2024, wineries in an area with a department or provincial IG can use it automatically. Gualtallary, Argentina's most famous district, has long been labelled under a provisional 'mención precaria' while its boundaries are argued over.\n\n"
        "Only two DOCs exist, Luján de Cuyo (Malbec-focused, the only one in regular use) and San Rafael (2007). Varietal labels require 85% of the named grape. Under INV rules, 'Reserva' and 'Gran Reserva' are tied to minimum ageing periods, but they do not imply a particular origin."
    ),
    "climate_soils": (
        "The climate is continental desert modified by altitude. Mendoza averages around 200 mm of rain a year, most of it falling in summer thunderstorms that bring hail (*la piedra*), the industry's great hazard, which is why many vineyards sit under anti-hail nets. The Zonda, a hot, dry foehn wind off the Andes, can damage flowering in spring. Day-night temperature swings of 15 to 20°C are normal, and low humidity keeps fungal disease rare, so organic farming is easy. In the north, the Calchaquí valleys add extreme altitude and ultraviolet light; in Patagonia, latitude, constant wind and long summer days take over; and on the Atlantic coast of Buenos Aires, the ocean.\n\n"
        "Soils are young and alluvial: fans of stones, gravel, sand and silt washed out of the Andes by rivers and flash floods. Near the mountains the fans are coarse, with rounded boulders often coated in white calcium carbonate (caliche), which drains fast and stresses the vine; further from the mountains the material becomes deep sand and silt, fertile and easy to irrigate. That gradient, more than latitude, explains why Uco Valley and Luján de Cuyo Malbec taste so different from Eastern Mendoza's. Organic matter is very low everywhere, and the sandy soils are one reason phylloxera never became the catastrophe it was elsewhere."
    ),
    "grapes": [
        {"name": "Malbec", "note": "Argentina's signature: 47,064 ha in 2024 (INV), 23.5% of all vines and the most planted variety, from Salta to Patagonia. Brought from France via Pouget's Quinta Normal in 1853; it thrives in the high Andean light, giving dark, violet-scented, plush wines."},
        {"name": "Bonarda", "note": "Argentina's second red, genetically the Douce Noir of Savoie (Charbono in California), not the Bonarda of Piedmont. Juicy and soft; old-vine Bonarda from Eastern Mendoza and San Rafael is a cult value red."},
        {"name": "Cabernet Sauvignon", "note": "Planted throughout Cuyo and Salta; firmer and more herbal at altitude, often blended with Malbec."},
        {"name": "Cabernet Franc", "note": "The rising star of Uco and Gualtallary since the 2010s, with fresh herbal lift on calcareous soils."},
        {"name": "Criolla Grande and Cereza", "note": "Pink-skinned Criolla grapes of colonial descent, still major in the East and San Juan for bulk wine, juice and concentrate."},
        {"name": "Criolla Chica", "note": "Listán Prieto, the original colonial grape (Chile's País, California's Mission), revived by small producers in Salta, Calingasta and Mendoza for light, earthy reds."},
        {"name": "Torrontés Riojano", "note": "Argentina's own aromatic white, a natural cross of Muscat of Alexandria and Criolla Chica; at its best in Cafayate and the Famatina valley. Torrontés Sanjuanino and Mendocino are separate, lesser varieties."},
        {"name": "Syrah", "note": "Especially associated with San Juan's warm Tulum and Pedernal valleys."},
        {"name": "Pedro Giménez", "note": "A widely planted white for everyday wine and concentrate, distinct from Spain's Pedro Ximénez."},
        {"name": "Chardonnay", "note": "From Gualtallary and San Pablo come some of South America's most precise Chardonnays; also the backbone of Mendoza sparkling wine."},
        {"name": "Pinot Noir", "note": "Old vines in Río Negro (Chacra, Noemía's neighbours) and high Uco sites; the main red for traditional-method sparkling."},
        {"name": "Semillon", "note": "Old-vine Semillon in Uco (La Consulta) and Río Negro is a revived treasure."},
        {"name": "Tannat", "note": "Grown in Salta's Calchaquí valleys, where altitude softens its tannins."},
    ],
    "regions": ["Mendoza", "San Juan", "La Rioja", "Catamarca", "Salta", "Jujuy", "Tucumán", "Patagonia", "Córdoba", "Buenos Aires"],
    "further_reading": ["Vino Argentino: An Insider's Guide to the Wines and Wine Country of Argentina, Laura Catena", "Wines of South America, Evan Goldstein", "Descorchados (annual guide), Patricio Tapia", "The Wines of Argentina, Ian Mount", "La vid y el vino en el Cono Sur de América: Argentina y Chile (1545-2019), Pablo Lacoste"],
    "sources": S("iglist", "invdoc", "malbec", "h26", "vinetur26", "oiv", "calingasta", "tandil", "pucara", "altoagrelo", "templados", "elhoyo", "simpl", "mercosur", "sawg", "malbecday", "catena", "wiki"),
}

MZA_APPS = ["Mendoza", "Luján de Cuyo", "Maipú", "Valle de Uco", "San Rafael", "General Alvear", "San Martín", "Junín", "Rivadavia", "Santa Rosa", "La Paz", "Lavalle", "Las Heras", "Godoy Cruz", "Guaymallén"]
REGIONS = [
    region(C, "Mendoza", -33.2, -68.8, 7, "Argentina's wine heartland: 142,800 ha of irrigated vines between the Andes and the desert.",
           "Mendoza holds more than 70% of Argentina's vineyards and grapes. Its five broad zones are the historic Primera Zona of Luján de Cuyo and Maipú, the high Uco Valley, the warm eastern plain, the southern oasis of San Rafael and General Alvear, and the northern desert of Lavalle.",
           "Founded in 1561, Mendoza drank and sold wine from the colonial era, but it became the national wine province after the 1853 Quinta Normal, the 1885 railway and mass Italian and Spanish immigration. The 1990s turned it into an international fine-wine region.",
           "Alluvial fans from the Andes, stony near the mountains and sandy to the east; 500 to 1,600 m; about 200 mm of mostly summer rain; hail, frost and the Zonda wind are the main hazards.",
           "Malbec, Bonarda, Cabernet Sauvignon, Cabernet Franc, Syrah, Criolla Grande, Cereza, Chardonnay, Torrontés, Pedro Giménez.",
           "Red above all, plus traditional-method sparkling, Chardonnay and bulk wine.",
           "Provincial IG > department IGs > district IGs; DOCs Luján de Cuyo and San Rafael.",
           MZA_APPS, S("malbec", "iglist", "h26")),
    region(C, "Luján de Cuyo and Maipú", -33.05, -68.85, 10, "The Primera Zona: old-vine Malbec on the terraces of the Mendoza river.",
           "Just south of Mendoza city, Luján de Cuyo and Maipú form the traditional first zone of Argentine fine wine, at 750 to 1,100 m along the Mendoza river. Luján holds the country's first DOC and more Malbec than any other department.",
           "Italian, Spanish and French families planted here from the late 19th century; Trapiche, López, Lagarde, Norton, Escorihuela and Weinert are among its historic houses, and Catena built its pyramid in Agrelo in the late 1990s.",
           "Stony alluvial soils near the river (Vistalba, Las Compuertas, Lunlunta, Drummond), deeper clay-loam to the south (Agrelo, Perdriel, Ugarteche).",
           "Malbec, Cabernet Sauvignon, Bonarda, Chardonnay, Petit Verdot.",
           "Classic, ripe, velvety Malbec; Cabernet blends; sparkling wine.",
           "DOC Luján de Cuyo; IGs Luján de Cuyo, Agrelo, Alto Agrelo, Las Compuertas, Vistalba, Maipú, Lunlunta, Barrancas, Russel, El Paraíso.",
           ["Luján de Cuyo", "Agrelo", "Alto Agrelo", "Las Compuertas", "Vistalba", "Maipú", "Lunlunta", "Barrancas", "Russel", "El Paraíso", "Godoy Cruz", "Guaymallén", "Las Heras", "Canota", "Lavalle"], S("invdoc", "malbec", "altoagrelo"), alt=["Primera Zona"], parent="Mendoza"),
    region(C, "Valle de Uco", -33.6, -69.2, 9, "High, cool and stony: the valley that redefined Argentine Malbec.",
           "The Uco Valley spans Tupungato, Tunuyán and San Carlos at 900 to 1,600 m, about 100 km south-west of Mendoza city. It is the most used IG in Argentina and the home of the country's most detailed terroir mapping.",
           "Fruit-growing country until the 1990s, when Catena's Adrianna vineyard (1992), Clos de los Siete (1998), Salentein and others proved its potential. District IGs followed from 2012, and Zuccardi's 2016 winery at Paraje Altamira became a symbol.",
           "Alluvial fans of stones, sand and calcium carbonate; cold nights, frost and hail; strong UV light.",
           "Malbec, Cabernet Franc, Chardonnay, Pinot Noir, Cabernet Sauvignon, Semillon, Sauvignon Blanc.",
           "Fresh, floral, chalky Malbec; precise Chardonnay; sparkling base.",
           "Interdepartmental IG Valle de Uco > departments Tupungato, Tunuyán, San Carlos > districts Gualtallary (provisional), El Peral, Los Chacayes, Vista Flores, San Pablo, Paraje Altamira, Pampa El Cepillo, Cordón del Cepillo, La Consulta.",
           ["Valle de Uco", "Tupungato", "Gualtallary", "El Peral", "Tunuyán", "Los Chacayes", "Vista Flores", "San Pablo", "San Carlos", "Paraje Altamira", "Pampa el Cepillo", "Cordón el Cepillo", "La Consulta"], S("sawg", "malbec", "invdoc"), parent="Mendoza"),
    region(C, "East Mendoza", -33.15, -68.45, 9, "The volume engine: hot plains, old Bonarda and the Catena family's first vineyard.",
           "Eastern Mendoza (San Martín, Junín, Rivadavia, Santa Rosa, La Paz) holds the largest vineyard area in Argentina on flat, hot plains at 600 to 750 m. It produces most of the country's everyday wine, juice and concentrate, and old-vine Bonarda and Malbec of real character.",
           "Settled by Italian and Spanish immigrants after the railway; Nicola Catena planted his first Malbec at Rivadavia in 1902.",
           "Deep sandy and silty alluvium; warmer and lower than western Mendoza.",
           "Bonarda, Malbec, Criolla Grande, Cereza, Pedro Giménez, Syrah.",
           "Generous reds, bulk wine, juice.",
           "Department IGs plus district IGs Distrito Medrano and Reducción.",
           ["San Martín", "Junín", "Rivadavia", "Distrito Medrano", "Reducción", "Santa Rosa", "La Paz"], S("malbec", "iglist"), alt=["Este Mendocino", "Eastern Mendoza"], parent="Mendoza"),
    region(C, "San Rafael and General Alvear", -34.7, -68.2, 9, "Mendoza's southern oasis, home of Argentina's second DOC.",
           "The southern oasis of the Diamante and Atuel rivers at 450 to 800 m, about 230 km from Mendoza city. San Rafael has been a DOC since 2007 and is known for fresh, fairly priced reds and sparkling wines.",
           "French, Italian and Spanish immigrants built the oasis from the late 19th century; Valentín Bianchi's family winery dates from 1928.",
           "Alluvial soils, cooler than eastern Mendoza thanks to latitude.",
           "Malbec, Cabernet Sauvignon, Bonarda, Chenin Blanc, Syrah.",
           "Fruity reds, sparkling wine.",
           "DOC San Rafael; IGs San Rafael and General Alvear.",
           ["San Rafael", "General Alvear"], S("iglist"), alt=["Sur Mendocino"], parent="Mendoza"),
    region(C, "San Juan", -31.5, -68.7, 8, "Desert Syrah in the Tulum oasis and high-mountain wine in Calingasta and Pedernal.",
           "Argentina's second wine province, about 39,700 ha, mostly in the hot Tulum valley around the capital, plus the high valleys of Pedernal, Zonda and Calingasta.",
           "Vines arrived in the 1560s; the province became a grape, raisin and wine powerhouse after the railway; Syrah took on a provincial identity from the 1990s; three Calingasta IGs were added in 2024.",
           "Desert climate with under 100 mm of rain; alluvial soils on the Tulum floor; stony, calcareous soils at 1,300 to 1,700 m in Pedernal and Calingasta.",
           "Syrah, Malbec, Bonarda, Cereza, Criolla, Pedro Giménez, Moscatel de Alejandría, Torrontés Sanjuanino.",
           "Generous Syrah and Malbec; fresh mountain reds; raisins and juice.",
           "Provincial IG > department IGs (19) > Valle del Tulum, Valle del Pedernal, Valle de Zonda, Pozo de los Algarrobos, Barreal, Tamberías, Hilario, Sorocayense.",
           ["San Juan", "Valle del Tulum", "Valle del Pedernal", "Valle de Zonda", "Calingasta", "Barreal", "Tamberías", "Hilario", "Sorocayense", "Sarmiento", "Caucete", "Pocito", "Zonda", "Ullum", "25 de Mayo", "9 de Julio", "Albardón", "Angaco", "Chimbas", "Iglesia", "Jáchal", "Rawson", "Santa Lucía", "Valle Fértil", "Pozo de los Algarrobos"], S("malbec", "iglist", "calingasta")),
    region(C, "La Rioja", -29.1, -67.5, 8, "Torrontés Riojano's homeland in the Famatina valleys.",
           "La Rioja's wine is concentrated in the Famatina valleys around Chilecito at 1,000 to 1,700 m, the birthplace of Torrontés Riojano. The province's IG carries 'Argentina' in its name to distinguish it from Spain's Rioja.",
           "Colonial vineyards for wine and aguardiente; 20th-century cooperatives, especially La Riojana in Chilecito.",
           "Arid valleys between the Famatina and Velasco ranges; alluvial soils; hot days, cool nights.",
           "Torrontés Riojano, Malbec, Bonarda, Syrah, Cabernet Sauvignon.",
           "Aromatic Torrontés, value reds.",
           "Provincial IG La Rioja Argentina > Valles del Famatina > department IGs and Valle de Chañarmuyo.",
           ["La Rioja Argentina", "Valles del Famatina", "Chilecito", "Famatina", "Valle de Chañarmuyo", "Arauco", "Castro Barros", "Felipe Varela", "General Lamadrid", "San Blas de los Sauces", "Sanagasta", "Vinchina"], S("malbec", "invdoc", "iglist")),
    region(C, "Catamarca", -27.5, -67.0, 7, "High Andean oases of Criolla, Torrontés and altitude reds.",
           "Catamarca's vineyards lie in the Fiambalá and Tinogasta valleys, around Belén, Pomán and in Santa María at the southern end of the Calchaquí valleys.",
           "Colonial vineyards and adobe wineries; a revival of home-made *vino patero* and modern altitude projects.",
           "Desert valleys at 1,200 to 2,000 m; sandy and stony soils.",
           "Torrontés Riojano, Malbec, Syrah, Criolla.",
           "Traditional and modern altitude wines.",
           "Provincial IG > department IGs Tinogasta, Belén, Pomán, Santa María.",
           ["Catamarca", "Tinogasta", "Belén", "Pomán", "Santa María"], S("malbec", "iglist")),
    region(C, "Salta", -25.6, -66.1, 8, "The Calchaquí valleys: Torrontés at Cafayate and Malbec above 3,000 m.",
           "Salta's vineyards sit almost entirely in the Calchaquí valleys from Cafayate (1,700 m) to Cachi and Payogasta (over 3,000 m). Malbec covers 46% of the vineyard; Torrontés from Cafayate is the regional signature.",
           "Jesuits and Spanish settlers planted Criolla; Colomé was founded in 1831 and planted French Malbec and Cabernet in the 1850s; Swiss Donald Hess bought it in 2001 and planted the 3,111 m Altura Máxima vineyard.",
           "Sandy and gravelly alluvium, granite slopes; extreme UV, cold nights, under 200 mm of rain.",
           "Malbec, Torrontés Riojano, Cabernet Sauvignon, Tannat, Cabernet Franc, Criolla Chica.",
           "Floral Torrontés; deep, tannic altitude reds.",
           "Provincial IG Salta; interprovincial Valles Calchaquíes; Valle de Cafayate, Molinos, Cachi, San Carlos, Valle de Pucará.",
           ["Salta", "Valles Calchaquíes", "Valle de Cafayate", "Molinos", "Cachi", "San Carlos (Salta)", "Valle de Pucará"], S("malbec", "colome", "pucara", "pucara2")),
    region(C, "Jujuy", -23.9, -65.4, 8, "Terraces in the Quebrada de Humahuaca at the top of Argentina.",
           "Argentina's northernmost wine province, about 70 ha of vines, mostly on terraces in the UNESCO-listed Quebrada de Humahuaca at 2,300 to over 3,000 m, plus the temperate valleys IG created in 2025.",
           "A modern project scene from the 2000s around Maimará, Tilcara and Huacalera.",
           "Stony alluvial terraces, extreme altitude and light.",
           "Malbec, Cabernet Franc, Syrah, Merlot.",
           "Small volumes of intense mountain reds.",
           "Provincial IG Jujuy; Quebrada de Humahuaca (2015); Valles Templados (2025).",
           ["Jujuy", "Quebrada de Humahuaca", "Valles Templados"], S("malbec", "templados")),
    region(C, "Tucumán", -26.5, -65.95, 9, "Calchaquí-side vineyards at Colalao and Amaicha.",
           "Tucumán's wine comes from the Tafí del Valle department on the dry western side of the Aconquija range, at Colalao del Valle and Amaicha del Valle.",
           "Small family and community wineries, including the Amaicha indigenous community's winery.",
           "Arid valleys at about 1,700 to 2,000 m.",
           "Malbec, Torrontés.",
           "Altitude reds and aromatic whites.",
           "Provincial IG Tucumán > Tafí.",
           ["Tucumán", "Tafí"], S("malbec", "iglist")),
    region(C, "Patagonia", -39.5, -67.5, 6, "Wind, cold nights and old vines along the Río Negro.",
           "Patagonian wine is centred on the Alto Valle of the Río Negro and the San Patricio del Chañar plateau in Neuquén, with outposts in La Pampa and Chubut down to 45°S.",
           "Humberto Canale planted in 1909; old Malbec, Merlot and Pinot Noir vineyards of the 1930s to 1950s were rediscovered by Noemía (2001) and Chacra (2004); Neuquén's desert projects date from the late 1990s.",
           "Irrigated river valleys at 250 to 400 m; alluvial soils; constant wind, cool nights, long summer days.",
           "Malbec, Pinot Noir, Merlot, Cabernet Franc, Semillon, Sauvignon Blanc, Chardonnay.",
           "Fresh, perfumed reds; Pinot Noir; crisp whites; sparkling wine in Chubut.",
           "Interprovincial IG Patagonia; provincial IGs Neuquén and Río Negro; Alto Valle de Río Negro; department IGs; Chubut IGs Trevelin, El Hoyo, Sarmiento.",
           ["Patagonia", "Neuquén", "Río Negro", "Alto valle de Río Negro", "General Roca", "Avellaneda", "General Conesa", "Pichimahuida", "Añelo", "Confluencia", "Trevelin", "El Hoyo", "Sarmiento (Chubut)"], S("malbec", "elhoyo", "iglist")),
    region(C, "Córdoba", -31.0, -64.3, 8, "Jesuit estancias and Friulian Frambua.",
           "Córdoba's small wine area sits around Colonia Caroya and Jesús María, the Traslasierra valley and Cruz del Eje.",
           "Jesuit estancias made wine from the 17th century; Friulian immigrants founded Colonia Caroya in 1878.",
           "Sierras and piedmont plains with summer rain.",
           "Isabella (for Frambua), Malbec and other vinifera.",
           "Traditional Frambua and small-scale vinifera wines.",
           "Provincial IG Córdoba Argentina; IGs Colón, Colonia Caroya, Cruz del Eje, San Javier.",
           ["Córdoba Argentina", "Colón", "Colonia Caroya", "Cruz del Eje", "San Javier"], S("iglist")),
    region(C, "Buenos Aires", -38.0, -59.5, 6, "Atlantic and Pampas hill vineyards on the new frontier.",
           "Buenos Aires province has a young wine scene in the Ventania and Tandilia hills and at Chapadmalal on the Atlantic coast, plus Médanos in the south-west.",
           "Mostly 21st-century projects; Trapiche's coastal vineyard at Chapadmalal and IGs from 2011 (Villa Ventana) to 2024 (Tandil).",
           "Cool, humid maritime and Pampas climates; loess and stony hill soils.",
           "Sauvignon Blanc, Albariño, Chardonnay, Pinot Noir, Malbec.",
           "Saline whites, light reds, sparkling wine.",
           "IGs Chapadmalal, Villa Ventana, Balcarce, Tandil.",
           ["Chapadmalal", "Villa Ventana", "Balcarce", "Tandil"], S("tandil", "iglist")),
]

SITES = [
    site(C, "Bodega Catena Zapata", "estate", -33.164, -68.9194, "The Catena family's pyramid in Agrelo, built in the late 1990s to a Mayan-inspired design by Pablo Sánchez Elía, overlooks the La Pirámide vineyard planted in 1983. Nicolás Catena's research on high-altitude Malbec, continued by his daughter Laura's Catena Institute of Wine, transformed Argentina's image. Named World's Best Vineyard in 2023.", class_="Icon winery", appellation="Agrelo", producers=["Catena Zapata"]),
    site(C, "Adrianna Vineyard, Gualtallary", "vineyard", -33.40, -69.26, "Planted by Nicolás Catena in 1992 at about 1,450 m in Gualtallary, Tupungato, where locals said grapes would never ripen. Its parcels on calcareous gravels give the Adrianna Malbecs (Mundus Bacillus Terrae, Fortuna Terrae, River Stones) and the White Bones and White Stones Chardonnays, among the most acclaimed wines of South America.", cq="approx", appellation="Gualtallary", producers=["Catena Zapata"]),
    site(C, "Achával-Ferrer", "estate", -33.0554, -68.9074, "Founded in 1998 by Santiago Achával and Manuel Ferrer with Italian winemaker Roberto Cipresso among the partners, Achával-Ferrer helped prove that old, low-yielding Malbec vineyards could each make a distinct single-vineyard wine: Finca Altamira, Finca Bella Vista and Finca Mirador. Its winery stands by the Mendoza river in Perdriel.", appellation="Luján de Cuyo", producers=["Achával-Ferrer"]),
    site(C, "Zuccardi Valle de Uco", "estate", -33.776, -69.145, "Opened in 2016 at Paraje Altamira, the Zuccardi winery is built from the rounded, lime-coated stones of its own vineyards, and works largely with concrete fermenters and untoasted casks. Sebastián Zuccardi's parcel-by-parcel approach made it the World's Best Vineyard in 2019, 2020 and 2021.", appellation="Paraje Altamira", producers=["Zuccardi"]),
    site(C, "Finca Piedra Infinita", "vineyard", -33.7703, -69.1586, "Zuccardi's estate vineyard at Paraje Altamira, named for the 'infinite stone' of its soils: river cobbles coated in calcium carbonate over sand. Its Malbecs, including Finca Piedra Infinita and Gravascal, are made by soil type rather than variety.", appellation="Paraje Altamira", producers=["Zuccardi"]),
    site(C, "Bodega Noemía", "estate", -39.064, -67.31, "Founded in 2001 in Mainqué, Río Negro, by Italian Countess Noemi Marone Cinzano and Danish winemaker Hans Vinding-Diers, around a Malbec vineyard planted in 1932. Biodynamically farmed, flood-irrigated old vines in the Patagonian wind give some of Argentina's most perfumed Malbec.", cq="approx", appellation="General Roca", producers=["Bodega Noemía"]),
    site(C, "Bodega Chacra", "estate", -39.055, -67.29, "Piero Incisa della Rocchetta, of the family behind Sassicaia, founded Chacra in Mainqué in 2004 around ungrafted Pinot Noir planted in 1932 and 1955, naming wines after the planting years (Treinta y Dos, Cincuenta y Cinco). Biodynamic farming and Burgundian restraint made it Patagonia's reference for Pinot Noir.", cq="approx", appellation="General Roca", producers=["Bodega Chacra"]),
    site(C, "Bodega Humberto Canale", "estate", -39.0693, -67.6397, "Founded in 1909 by engineer Humberto Canale near General Roca, the pioneer winery of Patagonia. Still family-owned, it keeps old Semillon, Malbec and Merlot vineyards in the Alto Valle among apple and pear orchards.", class_="Pioneer winery (1909)", appellation="Alto valle de Río Negro", producers=["Humberto Canale"]),
    site(C, "Bodega Colomé", "estate", -25.5128, -66.3922, "Founded in 1831 by the governor of Salta, Nicolás Severo de Isasmendi, Colomé is one of Argentina's oldest working wineries; French Malbec and Cabernet were brought in 1854. Swiss collector Donald Hess bought it in 2001, planted vineyards from 2,300 to 3,111 m and opened a James Turrell museum on the estate.", class_="Historic estate (1831)", appellation="Molinos", producers=["Colomé"]),
    site(C, "Altura Máxima vineyard", "vineyard", -25.04, -66.13, "Colomé's vineyard at 3,111 m near Payogasta in the upper Calchaquí valley, among the highest commercial vineyards in the world. Frost, wind and extreme ultraviolet light make yields tiny; the Malbec and Pinot Noir sold as Altura Máxima are deeply coloured yet fresh.", cq="approx", appellation="Cachi", producers=["Colomé"]),
    site(C, "El Esteco, Cafayate", "estate", -26.063, -65.966, "A winery founded in 1892 by the Michel brothers at the edge of Cafayate, long known as Michel Torino. Today El Esteco keeps old Torrontés and Criolla vines, makes the Old Vines range, and its colonial estate houses the Patios de Cafayate hotel.", class_="Historic estate (1892)", appellation="Valle de Cafayate", producers=["El Esteco"]),
    site(C, "Bodega Weinert", "estate", -32.9836, -68.8595, "Bernardo Weinert, born in Brazil, founded the winery in 1975 in a late 19th-century cellar in Carrodilla, Luján de Cuyo. Weinert is famous for ageing reds for years in large, old oak casks, the Cavas de Weinert style, a living link to Argentina's pre-1990s tradition.", appellation="Luján de Cuyo", producers=["Bodega Weinert"]),
    site(C, "Cheval des Andes", "estate", -33.0368, -68.9532, "A joint venture launched in 1999 by Château Cheval Blanc and Terrazas de los Andes, with its own winery in Las Compuertas. The blend of old-vine Malbec and Cabernet Sauvignon, flood-irrigated as in Mendoza tradition, is a Saint-Émilion view of the Andes.", appellation="Las Compuertas", producers=["Cheval des Andes"]),
    site(C, "Terrazas de los Andes", "estate", -33.082, -68.896, "LVMH's Argentine still-wine house, founded in 1999 and housed in a restored late 19th-century winery in Perdriel. Its name refers to the vineyard 'terraces' at different altitudes chosen for each variety, a founding idea of the high-altitude movement.", appellation="Luján de Cuyo", producers=["Terrazas de los Andes"]),
    site(C, "Bodega Chandon", "estate", -33.1389, -68.8892, "Moët & Chandon's first winery outside France, established in Argentina in 1959 in Agrelo. It built the country's sparkling-wine industry and planted early vineyards in the Uco Valley; the El Peral IG (2022) was granted at its request.", class_="First Moët & Chandon venture abroad (1959)", appellation="Agrelo", producers=["Bodegas Chandon"]),
    site(C, "Bodegas Salentein", "estate", -33.4985, -69.2521, "Dutch businessman Mijndert Pon founded Salentein in Los Árboles, Tunuyán, in the late 1990s. Its cross-shaped winery with a circular barrel cellar, the Killka art gallery and a chapel became icons of the Uco Valley boom; vineyards reach up to about 1,700 m in San Pablo.", appellation="Tunuyán", producers=["Salentein"]),
    site(C, "Clos de los Siete", "estate", -33.6527, -69.2458, "A block of about 850 ha on the western edge of Vista Flores, Tunuyán, bought from 1998 by Michel Rolland and French partners and shared among several wineries (Monteviejo, Cuvelier Los Andes, DiamAndes, Rolland). Each makes its own wines and contributes to the shared Clos de los Siete blend.", appellation="Vista Flores", producers=["Clos de los Siete", "Monteviejo", "DiamAndes", "Cuvelier Los Andes"]),
    site(C, "Bodega Trapiche (Espejo de Trapiche)", "historic", -32.9725, -68.7469, "Trapiche, founded in 1883 and owned by governor Tiburcio Benegas, who pushed for the 1885 railway, is one of Argentina's founding wine brands. Its Florentine-style 1912 winery in Maipú, built beside the railway line with its own rail spur, was restored and reopened in 2008.", class_="Historic winery (1883; building 1912)", appellation="Maipú", producers=["Trapiche"]),
    site(C, "Bodega Norton", "estate", -33.0869, -68.8912, "Founded in 1895 by the English engineer Edmund James Palmer Norton, who came to Argentina to build the Transandine railway. Owned since 1989 by the family of Austrian Gernot Langes-Swarovski, it farms large estates in Perdriel.", class_="Historic estate (1895)", appellation="Luján de Cuyo", producers=["Norton"]),
    site(C, "Bodegas López", "historic", -32.9633, -68.7838, "Founded in 1898 by José López Rivas, a Spanish immigrant from Málaga, in Maipú. Still family-run, López keeps the traditional style of long ageing in huge old oak foudres, and its Château Vieux and Montchenot reds are released with years of bottle age.", class_="Historic winery (1898)", appellation="Maipú", producers=["Bodegas López"]),
    site(C, "Club Tapiz", "estate", -33.009, -68.828, "A historic estate house of 1890 in Russell, Maipú, now an inn and restaurant belonging to the Tapiz group, which farms high vineyards in San Pablo in the Uco Valley.", cq="approx", appellation="Russel", producers=["Tapiz"]),
    site(C, "Bodega La Rural (Museo del Vino San Felipe)", "museum", -32.9579, -68.7456, "Founded in 1885 by Felipe Rutini, an immigrant from the Marche, at Coquimbito in Maipú. Its wine museum displays thousands of objects from Mendoza's past, from cowhide presses to early bottling machines; the Rutini brand now makes wine mostly from Tupungato.", class_="Historic winery and museum (1885)", appellation="Maipú", producers=["Rutini Wines"]),
    site(C, "Museo Nacional del Vino y la Vendimia", "museum", -32.9735, -68.7881, "The national wine and harvest museum in Maipú, housed in the early 20th-century villa of Juan Giol, whose La Colina de Oro winery was once among the largest in the world. It tells the story of Mendoza's harvest festival and industrial wine age.", class_="National museum", appellation="Maipú"),
    site(C, "Escorihuela Gascón", "historic", -32.9124, -68.8431, "Founded in 1884 by Spanish immigrant Miguel Escorihuela Gascón in Godoy Cruz, now inside the city. Its old cellars and park house the restaurant 1884, opened by chef Francis Mallmann.", class_="Historic winery (1884)", appellation="Godoy Cruz", producers=["Escorihuela Gascón"]),
    site(C, "Bodega Lagarde", "estate", -33.0232, -68.8733, "Founded in 1897 in Mayor Drummond, Luján de Cuyo, Lagarde is one of Mendoza's oldest wineries still working in its original buildings, with old Malbec and an early Argentine planting of Viognier.", class_="Historic winery (1897)", appellation="Luján de Cuyo", producers=["Lagarde"]),
    site(C, "Familia Schroeder", "estate", -38.5794, -68.3123, "A winery on the San Patricio del Chañar plateau in Neuquén. During its construction in the early 2000s workers found dinosaur fossils, later described as the titanosaur *Panamericansaurus schroederi* and displayed in the cellar; the winery's Saurus label celebrates them.", appellation="Añelo", producers=["Familia Schroeder"]),
    site(C, "Bodega del Fin del Mundo", "estate", -38.5565, -68.3839, "Planted from the late 1990s on desert plateau in San Patricio del Chañar, Neuquén, with water piped from the Neuquén river; one of the projects that put northern Patagonia on the wine map.", appellation="Añelo", producers=["Bodega del Fin del Mundo"]),
    site(C, "Patagonian Wines (Weinert), El Hoyo", "estate", -42.0867, -71.5404, "Bernardo Weinert's estate in the pre-Andean valley of El Hoyo, Chubut, near El Bolsón at about 300 m and 42°S. Its roughly 28 ha of Merlot, Pinot Noir, Chardonnay, Riesling and Gewürztraminer led to the El Hoyo IG in 2023.", cq="approx", appellation="El Hoyo", producers=["Patagonian Wines"]),
    site(C, "Estancia Jesuítica de Caroya", "historic", -30.9881, -64.1061, "A 17th-century Jesuit estancia north of Córdoba that supplied the Jesuit college with food and wine until the order's expulsion in 1767. Part of the UNESCO World Heritage site of the Jesuit Block and Estancias of Córdoba; its lands were later settled by Friulian vine growers in 1878.", class_="UNESCO World Heritage (2000)", appellation="Colonia Caroya"),
    site(C, "Área Fundacional, Mendoza", "historic", -32.8826, -68.8333, "The site of Mendoza's foundation by Pedro del Castillo in 1561, destroyed by the earthquake of 1861. A museum over the excavated ruins of the old cabildo shows the colonial city whose irrigation canals and vineyards began Argentine wine country.", cq="approx", class_="Historic site (1561)", appellation="Mendoza"),
    site(C, "Quebrada de Humahuaca vineyards (Maimará)", "landscape", -23.6245, -65.4086, "Terraced vineyards at 2,300 to over 2,500 m around Maimará and Tilcara in the UNESCO-listed Quebrada de Humahuaca, below the multicoloured hills of the Paleta del Pintor. Producers such as Fernando Dupont make intense Malbec, Cabernet Franc and Syrah.", cq="approx", class_="UNESCO World Heritage landscape (2003)", appellation="Quebrada de Humahuaca", producers=["Fernando Dupont"]),
    site(C, "Costa & Pampa, Chapadmalal", "estate", -38.19, -57.68, "Trapiche's Atlantic experiment, a vineyard a few kilometres from the sea south of Mar del Plata, planted around 2010. Its Albariño, Sauvignon Blanc, Chardonnay and Pinot Noir, salty and taut, led to the Chapadmalal IG in 2014.", cq="approx", appellation="Chapadmalal", producers=["Trapiche"]),
]

for s in SITES:
    if "class_" in s:
        s["class"] = s.pop("class_")

if __name__ == "__main__":
    save_part(C, {"countries": [COUNTRY], "regions": REGIONS, "appellations": APPS, "sites": SITES})
