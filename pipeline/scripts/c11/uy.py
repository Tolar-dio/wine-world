"""Uruguay: country, regions (six informal zones), departmental 'appellations' (no formal DO system), sites."""
import sys
sys.path.insert(0, "/home/claude/winesite/scripts/c11")
from c11_common import app, region, save_part, site  # noqa: E402

C = "uy"
SRC = {
    "wiki_es": {"title": "Vino de Uruguay, Wikipedia (es)", "url": "https://es.wikipedia.org/wiki/Vino_de_Uruguay"},
    "wiki": {"title": "Uruguayan wine, Wikipedia (with 2013 INAVI department vineyard areas)", "url": "https://en.wikipedia.org/wiki/Uruguayan_wine"},
    "decanter": {"title": "Decanter, The wine regions of Uruguay (Oct 2026, with INAVI)", "url": "https://www.decanter.com/wine/uruguay/the-wine-regions-of-uruguay/"},
    "sawg": {"title": "South America Wine Guide, A guide to Uruguay's wine regions (Amanda Barnes)", "url": "https://southamericawineguide.com/uruguay-wine-regions-guide/"},
    "law": {"title": "Ley 18.462 (2009), INAVI structure (FAOLEX)", "url": "https://faolex.fao.org/docs/pdf/uru85191.pdf"},
    "dec171": {"title": "Decreto 171/014: Uruguayan wine declared national drink (2014)", "url": "https://www.impo.com.uy/bases/decretos/171-2014"},
    "inv": {"title": "INV Argentina, Informe país Uruguay: requisitos para exportar (2024)", "url": "https://www.argentina.gob.ar/sites/default/files/2024/04/uruguay_para_web.pdf"},
    "ambito": {"title": "Ámbito, Uruguay produce casi un tercio de los vinos Tannat del mundo (INAVI data)", "url": "https://www.ambito.com/uruguay/produce-casi-un-tercio-los-vinos-tannat-el-mundo-n5691260"},
    "manana": {"title": "La Mañana, INAVI prepara los próximos 30 años de la vitivinicultura nacional (Jan 2022)", "url": "https://www.xn--lamaana-7za.uy/agro/inavi-prepara-los-proximos-30-anos-de-la-vitivinicultura-nacional"},
    "obs": {"title": "El Observador, Exportaciones de vinos uruguayos 2025 (INAVI)", "url": "https://www.elobservador.com.uy/agro/exportaciones-vinos-uruguayos-panorama-desafiante-y-el-64-se-embarco-dos-paises-n6008770"},
    "seth": {"title": "Wine with Seth, Uruguay wine law (six informal zones)", "url": "https://www.winewithseth.com/winewiki/uruguay-wine-law/"},
}


def S(*k):
    return [SRC[x] for x in k]


COUNTRY = {
    "iso2": "uy", "name": "Uruguay", "tier": "notable",
    "tagline": "An Atlantic-cooled pocket between the River Plate and the ocean, where a Basque pioneer's Tannat became a national identity.",
    "stats": {"vineyard_ha": 6000, "production_mhl": 0.7, "year": 2022,
              "note": "INAVI figures reported by La Mañana (Jan 2022): about 6,000 ha in production, roughly 70 million litres of wine a year, about 7 million litres exported. Not in the OIV 2025 top 20; current INAVI totals not verified."},
    "overview": (
        "Uruguay is South America's Atlantic wine country. Where Argentina and Chile grow grapes in deserts under the Andes, Uruguay grows them on low, rolling hills a few kilometres from the River Plate estuary and the ocean, at 30 to 35°S, in a humid temperate climate with about 1,000 mm of rain a year spread through every season. The landscape looks more like Bordeaux or the French Basque country than like Mendoza, and that resemblance is the key to its story.\n\n"
        "The founding figure is Pascual Harriague, a Basque immigrant from France who planted Tannat near Salto in the north of the country around 1870, using vines brought from Concordia across the Uruguay river. Locals called the grape 'Harriague'. Almost at the same time Francisco Vidiella planted European vines at Colón, near Montevideo, and made the first harvest there in 1883. Italian, Basque and Spanish families built the industry that followed, and by the 1950s Uruguay had about 19,000 ha of vines, many of them hybrids for a thirsty home market.\n\n"
        "The modern era began in the late 1980s, when the coming Mercosur trade bloc threatened to flood Uruguay with cheaper Argentine and Brazilian wine. The response, led by INAVI (the national wine institute, created in 1987), was to pull out hybrids, plant clean vinifera stock and bet on quality and on one grape. Tannat, a tough, tannic red from Madiran in south-west France, became Uruguay's signature. Grown in a wetter, more maritime climate and often made with softer extraction, Uruguayan Tannat is rounder and more approachable than Madiran, with dark plum, blackberry and a savoury edge. In 2022 Uruguay had about 1,575 ha of Tannat, about 27% of its vineyard, the largest share of any country.\n\n"
        "The industry is small and family-based: more than 1,200 mostly small vineyards and, by INAVI's 2022 figure, about 6,000 ha in production, down from 8,000 ha a quarter-century earlier. Most production is in Canelones and Montevideo, but the most exciting growth is east, in Maldonado's granite hills near Punta del Este, where Bodega Garzón and others make Albariño, Pinot Noir and fresh Tannat, and north, in Rivera's red sands on the Brazilian border. Uruguay declared wine its national drink in 2014. Exports remain modest, mostly to Brazil and the United States, while the home market drinks most of the wine."
    ),
    "history": [
        {"when": "17th to 18th century", "title": "Colonial vines", "text": "Spanish settlers plant vines, probably Moscatel, alongside olives in the Banda Oriental, for table grapes and family wine.", "lat": -34.47, "lon": -57.84},
        {"when": "1854", "title": "Los Cerros de San Juan", "text": "Uruguay's oldest commercial winery is founded in Colonia department.", "lat": -34.2203, "lon": -57.9292},
        {"when": "c. 1870", "title": "Harriague plants Tannat in Salto", "text": "Basque immigrant Pascual Harriague plants Tannat cuttings, brought from Concordia in Argentina, near Salto in the north. The grape is known locally as 'Harriague' for decades.", "lat": -31.3889, "lon": -57.9609},
        {"when": "1883", "title": "Vidiella's first harvest at Colón", "text": "Francisco Vidiella harvests his European vines at Colón, near Montevideo, on 25 February 1883, an event remembered as the first national harvest festival. Folle Noire becomes known locally as 'Vidiella'.", "lat": -34.806, "lon": -56.2215},
        {"when": "1903", "title": "First wine law", "text": "Uruguay's first wine law (17 July 1903) regulates 'natural wine'; quality controls and production census follow in 1904."},
        {"when": "1987", "title": "INAVI created", "text": "Law 15.903 creates the Instituto Nacional de Vitivinicultura, based in Las Piedras, Canelones; the Vino de Calidad Preferente category follows in 1993, as hybrid vineyards are replaced with vinifera.", "lat": -34.7275, "lon": -56.2165},
        {"when": "2001", "title": "Maldonado's first vines", "text": "Alto de la Ballena plants the first modern vineyard in Maldonado, opening Uruguay's Atlantic frontier.", "lat": -34.887, "lon": -55.036},
        {"when": "2014", "title": "Wine becomes the national drink", "text": "Decree 171/014 declares Uruguayan wine, in all its styles, the national drink and requires labels to say so."},
        {"when": "2016 to 2018", "title": "Bodega Garzón", "text": "Alejandro Bulgheroni's Bodega Garzón opens its winery near Pueblo Garzón in Maldonado and is named New World Winery of the Year by Wine Enthusiast in 2018.", "lat": -34.5686, "lon": -54.6284},
    ],
    "classification": (
        "Uruguay has no formal denomination of origin system. Wine law, administered by INAVI under laws 15.903 (1987) and 18.462 (2009), divides wine into two main categories: *Vino de Calidad Preferente* (VCP), quality wine from Vitis vinifera, bottled in containers of 75 cl or less, with registered labels; and *Vino Común* (VC), table wine often sold in demijohns or cartons. Under MERCOSUR rules a varietal or vintage claim requires at least 85% of the named grape or year.\n\n"
        "Geographic names on labels follow the country's 19 administrative departments (Canelones, Maldonado, Colonia and so on), and producers may use a finer place name if all grapes come from it. The industry and INAVI's promotion group departments into informal regions, commonly six: Metropolitana (Canelones, Montevideo, San José), Oceánica (Maldonado, Rocha, Lavalleja), Litoral Sur (Colonia, Soriano), Litoral Norte (Salto, Paysandú, Artigas), Centro (Durazno, Florida, Tacuarembó) and Norte (Rivera). These groupings have no legal force, and Uruguay notified only the national name for protection in the Mercosur GI agreement. Uruguay was the first South American country to ban foreign place names such as 'Champagne' on domestic labels, in 1993."
    ),
    "climate_soils": (
        "Uruguay's climate is humid and temperate, closer to Bordeaux than to Mendoza. Average temperatures are around 17°C, rainfall around 1,000 to 1,100 mm a year spread across all seasons, and sea breezes from the River Plate and the Atlantic cool nights and summer afternoons. That humidity is the great challenge (rot and mildew, vintage variation) and the reason thick-skinned Tannat was the grape that survived best. The south and east are coolest; the northern border departments of Rivera, Salto and Artigas are warmer and more continental.\n\n"
        "Geologically, Uruguay is ancient: the Precambrian crystalline shield outcrops as granite and gneiss in the eastern hills of Maldonado and Lavalleja, while the Metropolitan region has heavy, fertile clays and clay-loams, sometimes with calcareous layers. Rivera has deep red sands derived from sandstones, very free-draining, and the western littoral has sedimentary soils shaped by the Uruguay river. INIA's soil inventory identifies dozens of soil types under vine, a lot of diversity for so small an industry."
    ),
    "grapes": [
        {"name": "Tannat", "note": "The national grape: about 1,575 ha in 2022, roughly 27% of the vineyard. Brought by Pascual Harriague around 1870; softer and rounder than Madiran, often blended with Merlot, Cabernet Franc or Pinot Noir."},
        {"name": "Merlot", "note": "The second red, prized for softening Tannat in blends."},
        {"name": "Cabernet Franc", "note": "Increasingly important for fresh, herbal reds, especially in Maldonado and Canelones."},
        {"name": "Albariño", "note": "First planted by Bodega Bouza around 2002; now a signature white of the Atlantic coast and, by INAVI's count, about 128 ha in 2024."},
        {"name": "Sauvignon Blanc", "note": "A leading white, bright and saline in coastal sites."},
        {"name": "Marselan", "note": "A Cabernet Sauvignon x Grenache cross that has found a second home in Canelones."},
        {"name": "Pinot Noir", "note": "Becoming a speciality of Maldonado's cooler, granitic hills and of sparkling wines."},
        {"name": "Moscatel (Muscat Hamburg) and Ugni Blanc", "note": "Large areas remain for rosé and table wine, though INAVI is encouraging reconversion."},
    ],
    "regions": ["Metropolitana", "Oceánica", "Litoral Sur", "Litoral Norte", "Centro", "Norte"],
    "further_reading": ["Wines of South America, Evan Goldstein", "Uruguay Wine (INAVI), uruguaywine.com", "Descorchados Uruguay, Patricio Tapia"],
    "sources": S("wiki_es", "wiki", "decanter", "sawg", "law", "dec171", "inv", "ambito", "manana", "obs", "seth"),
}

NOTE_DEPT = "Uruguay has no legal appellations; geographic indications on labels follow the 19 departments."


def dept(name, reg, lat, lon, summary, **kw):
    kw.setdefault("subcat", "Department")
    kw.setdefault("coord_quality", "approx")
    return app(C, name, "Department", summary, region=reg, lat=lat, lon=lon, **kw)


APPS = [
    dept("Canelones", "Metropolitana", -34.62, -56.10, "Canelones, immediately north of Montevideo, is Uruguay's wine heartland: by most accounts more than 60% of national production, with Montevideo together over three-quarters of the vineyard. Its gently rolling hills of heavy clay and clay-calcareous soils (around Las Piedras, Progreso, Juanicó, Canelón Chico, Las Violetas and Melilla's edge) are home to the historic family wineries of Italian, Basque and Spanish descent: Pisano, Pizzorno, Carrau, Stagnari, Juanicó, Marichal, Toscanini, De Lucca, Varela Zarranz. Tannat is king, making structured, ageable reds whose tannins are tamed by the maritime humidity, alongside Merlot, Cabernet Franc, Marselan, Sauvignon Blanc and a growing range of Italian and Spanish varieties. INAVI itself is headquartered in Las Piedras.",
         styles=["red", "white", "rose", "sparkling"], dominant_style="red", grapes="Tannat, Merlot, Cabernet Franc, Marselan, Sauvignon Blanc, Chardonnay, Albariño, Muscat Hamburg",
         terroir="Rolling hills of heavy clay and clay-calcareous soils; humid maritime climate with about 1,000 mm of rain; sea breezes from the River Plate.",
         producers=["Pisano", "Pizzorno", "Bodegas Carrau", "Establecimiento Juanicó (Familia Deicas)", "Marichal", "Stagnari", "De Lucca", "Varela Zarranz", "Viñedo de los Vientos"],
         nerd_note="Uruguay grows nearly a third of the world's Tannat, by INAVI and University of Adelaide estimates, and most of it is in Canelones.", area_ha=5046),
    dept("Montevideo", "Metropolitana", -34.80, -56.24, "Montevideo department holds the historic suburban vineyards of the capital, at Melilla, Colón, Peñarol and Carrasco. Francisco Vidiella made the first harvest of European vines at Colón in 1883, and Bodega Bouza, Carrau's Colón winery, Bodega Santa Rosa and others keep the tradition alive within city limits. Conditions mirror Canelones: clay soils, river-moderated climate, Tannat, Merlot and Albariño.",
         styles=["red", "white", "sparkling"], dominant_style="red", producers=["Bodega Bouza", "Bodegas Carrau (Colón)", "Bodega Santa Rosa", "Bodega Cerro Chapeu"], area_ha=1073),
    dept("San José", "Metropolitana", -34.40, -56.75, "San José, west of Canelones, is pastoral cattle country with a significant vineyard (about 500 ha in 2013) on the gentle hills around Libertad, Ecilda Paullier and Rincón del Pino. Conditions are similar to Canelones, slightly more influenced by the River Plate.",
         styles=["red", "white"], area_ha=502),
    dept("Maldonado", "Oceánica", -34.65, -54.85, "Maldonado is Uruguay's fastest-growing and most glamorous wine region, on granite hills between Punta del Este, José Ignacio and the sierras inland. Nobody planted here until Alto de la Ballena in 2001, because the rocky, poor soils gave low yields; that is exactly what attracted the quality pioneers. The ocean is close, winds are strong and summers fresher, so Tannat comes out brighter and Albariño, Pinot Noir, Sauvignon Blanc and Cabernet Franc shine.\n\nBodega Garzón, built near Pueblo Garzón by Argentine billionaire Alejandro Bulgheroni and opened in 2016, put the department on the world map with hundreds of small vineyard blocks on granite and ballast-like decomposed rock. Viña Edén, Bodega Oceánica José Ignacio, Familia Deicas's Atlántico Sur and Cerro del Toro are among the others.",
         styles=["white", "red", "sparkling"], dominant_style="white", grapes="Albariño, Tannat, Pinot Noir, Cabernet Franc, Sauvignon Blanc, Marselan",
         terroir="Granite, gneiss and decomposed 'balasto' rock on hills up to a few hundred metres; strong Atlantic winds; cooler summers.",
         producers=["Bodega Garzón", "Alto de la Ballena", "Viña Edén", "Bodega Oceánica José Ignacio", "Cerro del Toro", "Familia Deicas (Atlántico Sur)"], area_ha=252,
         nerd_note="Garzón's vineyard is split into a large number of small blocks to follow the patchwork of granite and soil depth."),
    dept("Rocha", "Oceánica", -34.25, -54.10, "Rocha, the easternmost coastal department towards the Brazilian border, is Uruguay's newest wine frontier, with a handful of small vineyards in windswept coastal and sierra sites.", styles=["white", "red"]),
    dept("Lavalleja", "Oceánica", -34.20, -55.10, "Lavalleja, inland from Maldonado in the eastern sierras, has few vineyards, but Familia Deicas farms an extreme site on the volcanic outcrop of Cerro del Guazuvirá, a rare volcanic terroir in Uruguay.", styles=["red", "white"], producers=["Familia Deicas"]),
    dept("Colonia", "Litoral Sur", -34.20, -57.75, "Colonia, on the River Plate opposite Buenos Aires, has the oldest commercial winery in Uruguay, Los Cerros de San Juan (1854), and a hub of wineries around Carmelo, including Irurtia, Narbona and the Zubizarreta family. The warmer river influence and sedimentary soils make Tannat fuller and riper here.",
         styles=["red", "white", "sparkling"], dominant_style="red", producers=["Los Cerros de San Juan", "Irurtia", "Narbona", "El Legado"], area_ha=563),
    dept("Soriano", "Litoral Sur", -33.55, -58.00, "Soriano, on the Uruguay river north of Colonia, has a small vineyard area among the grain farms around Dolores and Mercedes.", styles=["red"]),
    dept("Salto", "Litoral Norte", -31.39, -57.96, "Salto, on the Uruguay river in the north-west, is where Pascual Harriague planted Tannat around 1870 and where the grape's Uruguayan story began. Today its vineyards are small (about 60 ha in 2013), in a warmer, more continental climate.",
         styles=["red"], area_ha=58, nerd_note="Uruguayans called Tannat 'Harriague' in the founder's honour for decades."),
    dept("Paysandú", "Litoral Norte", -32.32, -58.08, "Paysandú, on the Uruguay river, has about 170 ha of vines (2013) on sedimentary soils in a warm, continental climate; Tannat and Cabernet ripen fully here.", styles=["red"], area_ha=172),
    dept("Artigas", "Litoral Norte", -30.30, -57.60, "Artigas, the northernmost department, grows grapes around Bella Unión on the Brazilian border, in Uruguay's warmest climate (about 115 ha in 2013).", styles=["red", "white"], area_ha=115),
    dept("Durazno", "Centro", -33.08, -56.08, "Durazno, in the centre of the country, has a small, experimental wine scene led by Bodega El Capricho, an early planter of Verdejo and Mencía in Uruguay. Supple reds from warmer inland conditions.", styles=["red", "white"], area_ha=89),
    dept("Florida", "Centro", -33.85, -55.95, "Florida department, north of Canelones, has a few dozen hectares of vines (about 50 ha in 2013).", styles=["red"], area_ha=49),
    dept("Tacuarembó", "Centro", -31.73, -55.98, "Tacuarembó, in the north-central interior, has small emerging plantings (about 30 ha in 2013).", styles=["red"], area_ha=28),
    dept("Rivera", "Norte", -30.95, -55.50, "Rivera, on the Brazilian border, is Uruguay's most distinctive northern terroir: deep, red, sandy soils derived from sandstone, very free-draining in a warmer, sunnier climate. The Carrau family pioneered here from the 1970s with the Cerro Chapeu vineyard; the wines, notably Tannat and Cabernet, are fragrant and juicy with silky tannins.",
         styles=["red", "white"], dominant_style="red", producers=["Bodegas Carrau (Cerro Chapeu)", "Cerros de Oro"], area_ha=47),
]
for a in APPS:
    a["classification"] = NOTE_DEPT

REGIONS = [
    region(C, "Metropolitana", -34.65, -56.3, 9, "Canelones, Montevideo and San José: the clay hills where Uruguayan Tannat was built.",
           "The informal Metropolitan region around the capital holds the vast majority of Uruguay's vineyards and wineries.",
           "Vidiella's Colón vineyard (1883) and generations of Italian, Basque and Spanish family wineries.",
           "Heavy clay and clay-calcareous soils, humid maritime climate.",
           "Tannat, Merlot, Cabernet Franc, Marselan, Sauvignon Blanc, Albariño.",
           "Structured Tannat, blends, rosés, sparkling.", "Informal grouping of the departments Canelones, Montevideo, San José.",
           ["Canelones", "Montevideo", "San José"], S("decanter", "sawg", "seth"), alt=["Metropolitan"]),
    region(C, "Oceánica", -34.6, -54.9, 9, "Maldonado's granite hills by the Atlantic.",
           "The informal Oceanic region covers Maldonado, Rocha and Lavalleja, Uruguay's cool, rocky Atlantic frontier.",
           "Planted from 2001; transformed by Bodega Garzón from the late 2000s.",
           "Granite and gneiss, strong ocean winds.", "Albariño, Pinot Noir, Tannat, Cabernet Franc, Sauvignon Blanc.",
           "Saline whites, fresh reds, sparkling.", "Informal grouping of the departments Maldonado, Rocha, Lavalleja.",
           ["Maldonado", "Rocha", "Lavalleja"], S("decanter", "sawg", "seth"), alt=["Oceanic", "Atlántica"]),
    region(C, "Litoral Sur", -34.0, -57.9, 8, "Colonia and the River Plate shore.",
           "The southern riverside region of Colonia and Soriano, with Uruguay's oldest winery and the Carmelo wine route.",
           "Los Cerros de San Juan, founded 1854.", "Sedimentary riverine soils, warmer river influence.",
           "Tannat, Merlot, Cabernet Sauvignon.", "Rich reds.", "Informal grouping of the departments Colonia, Soriano.",
           ["Colonia", "Soriano"], S("decanter", "seth"), alt=["Southern Riverside"]),
    region(C, "Litoral Norte", -31.4, -57.9, 7, "Salto, where Harriague's Tannat began.",
           "The northern riverside region along the Uruguay river: Salto, Paysandú and Artigas.",
           "Pascual Harriague's Tannat, c. 1870.", "Warm continental climate, sedimentary soils.",
           "Tannat, Cabernet Sauvignon.", "Ripe reds.", "Informal grouping of the departments Salto, Paysandú, Artigas.",
           ["Salto", "Paysandú", "Artigas"], S("wiki_es", "seth"), alt=["Northern Riverside"]),
    region(C, "Centro", -33.0, -56.0, 7, "The interior: experimentation in Durazno.",
           "The central departments of Durazno, Florida and Tacuarembó, with small, experimental plantings.",
           "Mostly 21st-century projects.", "Inland, warmer, mixed soils.", "Tannat, Verdejo, Mencía.", "Supple reds and new whites.",
           "Informal grouping of the departments Durazno, Florida, Tacuarembó.", ["Durazno", "Florida", "Tacuarembó"], S("decanter", "seth"), alt=["Central"]),
    region(C, "Norte", -30.95, -55.5, 9, "Rivera's red sands on the Brazilian border.",
           "The northern region of Rivera, with deep red sandy soils and a warmer climate.",
           "Pioneered by the Carrau family from the 1970s at Cerro Chapeu.", "Deep red sands from sandstone, free-draining.",
           "Tannat, Cabernet Sauvignon, Merlot.", "Fragrant, silky reds.", "Informal; the department of Rivera.", ["Rivera"], S("decanter", "seth"), alt=["Northern"]),
]

SITES = [
    site(C, "Bodega Garzón", "estate", -34.5686, -54.6284, "Opened in 2016 near Pueblo Garzón, about 18 km from the Atlantic, by Argentine energy magnate Alejandro Bulgheroni. A sustainability-certified winery among granite hills, with vineyards split into many small blocks; its Albariño and Tannat made Maldonado famous, and Wine Enthusiast named it New World Winery of the Year in 2018.", appellation="Maldonado", producers=["Bodega Garzón"]),
    site(C, "Pueblo Garzón", "village", -34.593, -54.5455, "A near-abandoned railway village that was revived when Argentine chef Francis Mallmann opened his hotel and restaurant in the old general store in 2003. Bodega Garzón's vineyards stretch over the surrounding hills.", appellation="Maldonado"),
    site(C, "Alto de la Ballena", "estate", -34.887, -55.036, "Planted in 2001 on the Sierra de la Ballena, a granite ridge overlooking the Atlantic near Punta Ballena. The first modern vineyard in Maldonado, it proved that the rocky coastal hills could ripen Tannat, Merlot, Cabernet Franc and Viognier.", cq="approx", appellation="Maldonado", producers=["Alto de la Ballena"]),
    site(C, "Viña Edén", "estate", -34.6624, -55.0403, "An estate in the hills near Pueblo Edén, Maldonado, with a winery set among granite boulders. Known for unoaked, bright Tannat and traditional-method sparkling wine.", appellation="Maldonado", producers=["Viña Edén"]),
    site(C, "Bodega Bouza, Melilla", "estate", -34.7908, -56.277, "The Bouza family's winery in Melilla, on Montevideo's rural edge, in a restored early 20th-century building. Bouza planted Uruguay's first commercial Albariño in the early 2000s and makes single-parcel Tannat (Parcela Única); it also displays a collection of vintage cars and planes.", appellation="Montevideo", producers=["Bodega Bouza"]),
    site(C, "Bodegas Carrau, Colón", "estate", -34.7879, -56.2233, "The Carrau family, winemakers in Catalonia since the 18th century, settled in Uruguay in the 1930s. Their Colón winery in Montevideo makes classic Tannat and pioneered both the Cerro Chapeu vineyard in Rivera and Petit Manseng in Uruguay.", appellation="Montevideo", producers=["Bodegas Carrau"]),
    site(C, "Cerro Chapeu, Rivera", "vineyard", -30.953, -55.4847, "A vineyard area in Rivera near the Brazilian border, on deep red sandy soils, pioneered by the Carrau family from the 1970s. Its wines, notably Tannat, are fragrant with fine tannins, quite different from the clay-grown Tannat of Canelones.", cq="approx", appellation="Rivera", producers=["Bodegas Carrau"]),
    site(C, "Establecimiento Juanicó", "estate", -34.5904, -56.2509, "A historic estate in Juanicó, Canelones, with an underground cellar built in the colonial era, owned by the Deicas family since 1979. Familia Deicas makes the Preludio blend and extreme-terroir wines from Maldonado and Lavalleja.", appellation="Canelones", producers=["Familia Deicas"]),
    site(C, "Pizzorno Family Estates", "estate", -34.7153, -56.1681, "Founded in 1910 by the Italian immigrant Próspero Pizzorno in Canelón Chico, Canelones. Four generations on, the family makes Tannat-based reds and sparkling wines from its estate vineyards.", appellation="Canelones", producers=["Pizzorno"]),
    site(C, "Pisano, Progreso", "estate", -34.67, -56.21, "The Pisano family, of Italian origin, farm vineyards around Progreso in Canelones. Brothers Daniel, Eduardo and Gustavo Pisano helped take Uruguayan Tannat to export markets from the 1990s with wines such as the RPF (Reserva Personal de la Familia) range.", cq="approx", appellation="Canelones", producers=["Pisano"]),
    site(C, "Los Cerros de San Juan", "historic", -34.2203, -57.9292, "Founded in 1854 in Colonia department, Los Cerros de San Juan is Uruguay's oldest commercial winery. Its estate of stone buildings and old cellars sits by the San Juan river near the River Plate.", cq="approx", class_="Oldest commercial winery in Uruguay (1854)", appellation="Colonia", producers=["Los Cerros de San Juan"]),
    site(C, "Carmelo wine route", "landscape", -33.9968, -58.2836, "The river port of Carmelo in Colonia is the hub of a small wine route of family wineries (Irurtia, Narbona, El Legado and others) facing the Paraná delta and Buenos Aires across the water.", cq="approx", appellation="Colonia", producers=["Irurtia", "Narbona"]),
    site(C, "Harriague's Tannat, Salto", "historic", -31.3889, -57.9609, "Near Salto, around 1870, the Basque immigrant Pascual Harriague planted Tannat on an estate north of the city, using cuttings brought from Concordia across the Uruguay river. It was the beginning of Uruguay's national grape.", cq="approx", class_="Historic site", appellation="Salto"),
    site(C, "Colón, Vidiella's vineyard", "historic", -34.806, -56.2215, "At Colón, now a Montevideo suburb, Francisco Vidiella planted European vines and held his first harvest on 25 February 1883, celebrated as Uruguay's first harvest festival. The grape he grew, Folle Noire, became known locally as 'Vidiella'.", cq="approx", class_="Historic site", appellation="Montevideo"),
    site(C, "INAVI, Las Piedras", "historic", -34.7275, -56.2165, "The headquarters of the Instituto Nacional de Vitivinicultura, created in 1987, in Las Piedras, the historic wine town of Canelones. INAVI regulates the industry, sets the minimum grape price and runs Uruguay Wine's promotion.", cq="approx", class_="National wine institute", appellation="Canelones"),
]
for s in SITES:
    if "class_" in s:
        s["class"] = s.pop("class_")

if __name__ == "__main__":
    save_part(C, {"countries": [COUNTRY], "regions": REGIONS, "appellations": APPS, "sites": SITES})
