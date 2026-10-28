import sys; sys.path.insert(0, '/home/claude/winesite/scripts/es')
from common import save, site, app

region = {
 "country": "es", "name": "Rioja", "alt": ["La Rioja", "DOCa Rioja"], "parent_region": None,
 "lat": 42.45, "lon": -2.45, "zoom": 8.6,
 "tagline": "Spain's most famous red, aged in American and French oak along the Ebro and sheltered by the Sierra de Cantabria.",
 "summary": """Rioja is the name most people know, and for good reason. It is Spain's oldest regulated wine region, its first DOCa (1991) and, by value, its biggest: the Ministry of Agriculture puts its share at about 27 percent of the money earned by all Spanish DOP wine. In 2026 the DOCa had 66,500 registered hectares, 12,704 growers and 719 wineries, spread across three autonomous communities: La Rioja itself, Álava in the Basque Country, and a slice of Navarra, plus a tiny enclave of Burgos. The region follows the Ebro for about 120 km, from the narrows of the Conchas de Haro in the northwest to Alfaro in the southeast.

Rioja's classic style was born in the second half of the 19th century, when Luciano de Murrieta and the Marqués de Riscal brought Bordeaux techniques home and French merchants, desperate for wine after phylloxera, flooded in. They left behind the 225-litre barrica and the habit of long ageing, usually in American oak, which gives the classic dill, coconut and vanilla note. A traditional Gran Reserva from López de Heredia or La Rioja Alta, pale brick and smelling of dried cherries, leather and forest floor, is one of the great old-world styles.

Since the 1990s Rioja has also become a place of argument about place. Modern producers such as Artadi, Roda, Remírez de Ganuza and Contino pushed for riper fruit and French oak; others, led by Telmo Rodríguez and the growers of Rioja Alavesa, argued that Rioja should be labelled by village and vineyard rather than by months in barrel. The 2017 reform answered them partly, with zone names, village wines and *viñedos singulares*. The argument went as far as a secession attempt: some 40 Alavesa wineries sought a separate Basque DO, *Arabako Mahastiak / Viñedos de Álava*, which the Basque high court annulled in November 2024.""",
 "history": """Wine was made here in Roman times, and the monasteries of San Millán de la Cogolla, where the first written words in Castilian (and Basque) appear in 10th and 11th century glosses, kept vineyards through the Middle Ages. A 1102 charter from the king of Navarre and Aragón is often cited as the first legal protection of Rioja's vineyards, and by the early modern period Logroño and Haro had ordinances controlling which wine could enter town.

The modern story begins in the 1850s. Luciano de Murrieta, trained in Bordeaux, made the first aged Rioja for export in 1852 and founded his bodega at Ygay in 1872. Camilo Hurtado de Amézaga, the Marqués de Riscal, built his Elciego winery in 1858 with Bordeaux-trained help. The railway reached Haro in 1863, and when phylloxera devastated France, Haro's Barrio de la Estación filled with bodegas shipping wine north: CVNE (1879), López de Heredia (1877), La Rioja Alta (1890), Bodegas Bilbaínas (1901). Phylloxera arrived in Rioja around 1899 to 1901 and the French went home, but the barrels and the cellar habits stayed.

A royal decree defined the area in 1902; the Consejo Regulador, the first in Spain, was created in 1925 and constituted in 1926, and Rioja celebrated its centenary in 2025 and 2026. It became Spain's first DOCa in 1991, with stricter controls and compulsory bottling in the zone. The 2017 reform introduced *vinos de zona*, *vinos de municipio* (renamed *vino de pueblo* in 2022, with 144 municipalities eligible) and *viñedos singulares*: by September 2026 the ministry had recognised 167 single vineyards, 91 in La Rioja, 73 in Álava and 3 in Navarra, covering about 270 hectares from 101 wineries. White wines, about a tenth of the vineyard after doubling in twenty years, and traditional-method sparkling wines (*Espumoso de Calidad de Rioja*, with a *Gran Añada* top tier) have joined the reds.""",
 "terroir": """Two mountain chains shape Rioja. To the north the Sierra de Cantabria and the Montes Obarenes, rising to about 1,400 m, block the cold wet winds from the Bay of Biscay; to the south the Sierra de la Demanda and the Sierra de Cameros send down cool tributaries, seven of them, from the Oja (which gave Rioja its name, Río Oja) to the Najerilla, Iregua, Leza, Cidacos and Alhama. Between them the Ebro valley slopes down from about 700 m in the west to under 300 m at Alfaro, and the climate shifts from Atlantic to Mediterranean along the way.

Rioja Alta, on the western and southern banks around Haro, Briones, Cenicero and Najera, is the coolest, with clay-limestone and ferrous clay soils and alluvial terraces; it gives the finest, longest-lived classic wines. Rioja Alavesa, on the north bank in Álava below the Sierra de Cantabria, has the region's best chalky clay-limestone soils on steep terraces at 400 to 700 m, and makes perfumed, fresh Tempranillo; it is also the home of *maceración carbónica* young wines, the traditional cosechero style. Rioja Oriental (called Rioja Baja until 2018) is warmer and drier, with alluvial and clay soils, where Garnacha does well, especially on the slopes of Monte Yerga and near Alfaro. Vineyards in all three zones now climb higher in search of freshness: a label may say *viñedo de altura* only from 550 m up.""",
 "grapes": """Tempranillo dominates, about 88 percent of red plantings. It is blended with Garnacha (body and warmth, especially from Rioja Oriental), Mazuelo (Cariñena, for acidity and tannin), Graciano (perfume and acidity, a Rioja treasure) and Maturana Tinta. Whites are led by Viura (Macabeo), with Malvasía Riojana, Garnacha Blanca, Tempranillo Blanco (a natural mutation found in 1988 in Murillo de Río Leza), Maturana Blanca, Turruntés and, since 2008, Chardonnay, Sauvignon Blanc and Verdejo. Recent changes also allow Albillo Mayor.""",
 "styles": """Reds dominate, in four ageing categories. Rioja's rules for reds are stricter than national law: a *crianza* spends two years ageing with at least one in 225-litre oak; a *reserva* three years with at least one in oak and six months in bottle; a *gran reserva* five years with at least two in oak and two in bottle. Whites and rosés have their own minimums (crianza 18 months with six in oak). Wines without an ageing claim are *Genérico*; since 2019 they may also use the softer term *madurado en bodega*. Classic whites from López de Heredia and Murrieta age in barrel for a decade; most modern whites are fresh Viura blends. Rosado is more and more often pale; the traditional, darker *clarete* is coming back. Quality sparkling wine has been allowed since 2017, with at least 15 months on lees and a 36-month *Gran Añada* category.""",
 "classification": """Rioja's hierarchy now runs in two directions at once. By ageing: Genérico, Crianza, Reserva and Gran Reserva. By place: Rioja; a zone (*Rioja Alta*, *Rioja Alavesa*, *Rioja Oriental*), which requires 100 percent of the grapes from that zone; a *vino de pueblo* (village wine, until 2022 called *vino de municipio*), at least 85 percent from one of 144 municipalities and made there; and *viñedo singular*, a single delimited vineyard at least 35 years old, owned or leased long-term, hand-harvested, with yields at least 20 percent below the DOCa limit (5,000 kg/ha for reds), and approved twice by tasting panels. The 2019 labelling rules added terms for old vines (35 years), centenarian vines (100 years), pre-phylloxera vines (before 1900), high-altitude vineyards (550 m), estate vineyards and estate bottling. Viñedos singulares were first recognised by ministerial order in 2019; by 2026 there were 167.""",
 "appellations": ["Rioja"],
 "sources": [
   {"title": "MAPA press note, three new viñedos singulares (Sept 2026), totals", "url": "https://www.mapa.gob.es/dam/mapa/contenido/prensa/notas-de-prensa/documentos/documentos-2026/26-09-24-vi-edos-singulares-2026.pdf"},
   {"title": "DOP Rioja documento único (Oct 2025)", "url": "https://mapa.gob.es/gl/alimentacion/temas/calidad-diferenciada/documento_unico_doca_rioja_tcm37-655340.pdf"},
   {"title": "Agronews, Rioja approves viñedos singulares and sparkling (2017)", "url": "https://www.agronewscastillayleon.com/la-doc-rioja-amparara-vinedos-singulares-y-espumosos"},
   {"title": "Directo al Paladar, Rioja's 2019 labelling terms", "url": "https://www.directoalpaladar.com/enologia/rioja-estrena-siete-calificaciones-sus-vinos-todo-que-debes-saber-nuevo-etiquetado"},
   {"title": "Select Us Wines, EU approves viñedos singulares GI and vino de pueblo (2026)", "url": "https://www.selectuswines.com/en/eu-gives-stamp-of-approval-to-riojas-vinedos-singulares/4561"},
   {"title": "El Derecho, TSJPV annuls Viñedos de Álava (Nov 2024)", "url": "https://elderecho.com/anulada-resolucion-favorable-a-la-solicitud-de-la-dop-vinedos-de-alava"},
   {"title": "Rioja (wine), Wikipedia", "url": "https://en.wikipedia.org/wiki/Rioja_(wine)"},
   {"title": "BOE-A-2026-21760, amendment of DOP Rioja specification (Oct 2026)", "url": "https://www.boe.es/boe/dias/2026/10/19/pdfs/BOE-A-2026-21760.pdf"}]
}

subregions = [
 {"country": "es", "name": "Rioja Alta", "alt": [], "parent_region": "Rioja", "lat": 42.52, "lon": -2.75, "zoom": 10,
  "tagline": "The cool western heart of classic Rioja, from Haro's station bodegas to the Najerilla valley.",
  "summary": "Rioja Alta covers the western part of the DOCa, mostly on the south bank of the Ebro in La Rioja plus the Sonsierra on the north bank, and the small Burgos enclave of El Ternero. It holds Haro, Briones, Ollauri, Cenicero, Fuenmayor, San Asensio and Nájera, and most of the historic houses. Its wines are the most structured and slow-ageing in Rioja, the source of most great Gran Reservas.",
  "history": "Haro's railway (1863) and the phylloxera boom made Rioja Alta the commercial centre of the region: the Barrio de la Estación holds a cluster of 19th-century bodegas unique in Spain. The monasteries of San Millán, in the Cárdenas valley, are a UNESCO World Heritage Site and the cradle of written Castilian.",
  "terroir": "Altitudes of 450 to 700 m, an Atlantic-influenced climate with about 400 to 500 mm of rain, and ferrous clay, clay-limestone and alluvial terrace soils. Rivers from the Sierra de la Demanda (Oja, Tirón, Najerilla) cool the valleys.",
  "grapes": "Tempranillo above all, with Graciano, Mazuelo, Garnacha in higher, poorer sites, and Viura and Malvasía for whites.", "styles": "Classic oak-aged reds, the great Gran Reservas; long-aged whites at López de Heredia.",
  "classification": "Zone wines labelled Rioja Alta must be 100% from the zone; many villages here have vino de pueblo status and dozens of viñedos singulares, especially in San Vicente de la Sonsierra, Briones and Haro.",
  "appellations": [], "sources": [{"title": "DOP Rioja documento único", "url": "https://mapa.gob.es/gl/alimentacion/temas/calidad-diferenciada/documento_unico_doca_rioja_tcm37-655340.pdf"}]},
 {"country": "es", "name": "Rioja Alavesa", "alt": ["Arabako Errioxa"], "parent_region": "Rioja", "lat": 42.55, "lon": -2.6, "zoom": 10.5,
  "tagline": "Chalky terraces under the cliffs of the Sierra de Cantabria, in the Basque province of Álava.",
  "summary": "Rioja Alavesa is the smallest zone, about 13,000 ha in 15 municipalities on the north bank of the Ebro, among them Laguardia, Elciego, Labastida, Samaniego, Lanciego, Oyón and Villabuena. It produces fine, aromatic Tempranillo, from carbonic-maceration cosechero wines to top single vineyards, and is home to Marqués de Riscal, Artadi, Remírez de Ganuza and Contino. Its growers have long pushed for their own identity: the attempt to create a separate DO, Arabako Mahastiak / Viñedos de Álava, was annulled by the Basque high court in November 2024.",
  "history": "Laguardia, a walled medieval hill town, sits on top of hundreds of underground cellars. In 1858 Riscal built Spain's first modern bodega in Elciego. Alavesa families long made wine by carbonic maceration in stone *lagos*, sold young as *cosechero*.",
  "terroir": "Limestone and clay-limestone soils on south-facing terraces between about 400 and 700 m, sheltered from northern weather by the Sierra de Cantabria and with the most Atlantic climate in Rioja.",
  "grapes": "Tempranillo almost exclusively, with Viura and Malvasía.", "styles": "Fresh carbonic young reds, elegant crianzas and reservas, and single-vineyard wines.",
  "classification": "Álava holds 73 of Rioja's 167 viñedos singulares (2026). Zone wines must be 100% Alavesa grapes.",
  "appellations": [], "sources": [{"title": "El Derecho, TSJPV ruling on Viñedos de Álava", "url": "https://elderecho.com/anulada-resolucion-favorable-a-la-solicitud-de-la-dop-vinedos-de-alava"}]},
 {"country": "es", "name": "Rioja Oriental", "alt": ["Rioja Baja"], "parent_region": "Rioja", "lat": 42.25, "lon": -2.0, "zoom": 10,
  "tagline": "The warm, Mediterranean east of Rioja, Garnacha's stronghold, renamed from Rioja Baja in 2018.",
  "summary": "Rioja Oriental runs from Logroño's eastern edge to Alfaro along the lower Ebro and the valleys of the Leza, Cidacos and Alhama, including the Navarrese villages within the DOCa. Long dismissed as a source of blending wine, it is being reassessed: high Garnacha vineyards on Monte Yerga and around Tudelilla, Quel and Alfaro give some of Rioja's most exciting wines, notably Álvaro Palacios's Palacios Remondo and Quiñón de Valmira.",
  "history": "The zone was called Rioja Baja (lower Rioja) until 2018, when the Consejo renamed it to avoid the implication of lower quality. The Palacios family has been based in Alfaro since 1945.",
  "terroir": "Lower and warmer, mostly 300 to 500 m, with a Mediterranean climate, under 400 mm of rain and alluvial, clay and gravel soils; but slopes up to 700 m and more on Monte Yerga.",
  "grapes": "Tempranillo is most planted, but Garnacha is the zone's signature.", "styles": "Ripe reds, Garnacha, rosados.",
  "classification": "Zone wines must be 100% Oriental grapes. Navarra's three viñedos singulares lie here.",
  "appellations": [], "sources": [{"title": "DOP Rioja documento único", "url": "https://mapa.gob.es/gl/alimentacion/temas/calidad-diferenciada/documento_unico_doca_rioja_tcm37-655340.pdf"}]},
]

appellation = app("Rioja", ["Rioja", "DOCa Rioja", "Rioja DOCa", "DOP Rioja", "Rioja (DOCa)"], "DOCa", "Rioja",
 "1925 (Consejo; DO 1932 statute; DOCa 1991)", 66499, ["red", "white", "rose", "sparkling"], "red",
 "Tempranillo (about 88% of reds), Garnacha, Mazuelo, Graciano, Maturana Tinta; whites Viura, Malvasía Riojana, Garnacha Blanca, Tempranillo Blanco, Maturana Blanca, Turruntés, Chardonnay, Sauvignon Blanc, Verdejo",
 """Rioja is the benchmark Spanish red and, with 66,500 registered hectares and around 2.4 million hectolitres sold a year, also one of Europe's largest fine-wine regions. The classic Rioja is a blend led by Tempranillo, aged in 225-litre barrels, traditionally American oak, until it turns soft and savoury: strawberry and dried cherry, vanilla and dill, leather and tobacco. That style was learned from Bordeaux in the 1850s to 1880s and is still made beautifully by López de Heredia, La Rioja Alta, CVNE and Muga, whose Gran Reservas can live for half a century.

From the 1990s, a modern wave led by Artadi, Roda, Remírez de Ganuza, Finca Allende and Benjamín Romeo made darker, riper wines in new French oak, sold on the name of a vineyard rather than an ageing category. Today the most interesting movement is about place: Telmo Rodríguez and Remelluri, Sierra Cantabria, Olivier Rivière, Abel Mendoza and many small growers in San Vicente de la Sonsierra and Rioja Alavesa make transparent wines from old field blends, often from bush vines high on the slopes. The rules have followed: since 2017 a label can name one of three zones, a village (*vino de pueblo*) or one of 167 *viñedos singulares*.

Rioja's whites deserve more attention. Barrel-aged Viura and Malvasía from López de Heredia (Viña Tondonia Blanco) and Murrieta (Castillo Ygay Blanco) are among the world's most singular long-lived white wines, and white plantings have doubled in twenty years.""",
 "The DOCa spans the Ebro valley from the Conchas de Haro to Alfaro, protected from the Atlantic by the Sierra de Cantabria and fed by seven tributaries from the south. Rioja Alta (cool, clay-limestone and ferrous clay, alluvial terraces), Rioja Alavesa (chalky clay-limestone terraces under the Sierra de Cantabria) and Rioja Oriental (warmer, drier, alluvial soils, Garnacha country) give three distinct climates, and altitude ranges from under 300 m to over 700 m.",
 ["R. López de Heredia", "La Rioja Alta", "CVNE", "Muga", "Marqués de Murrieta", "Marqués de Riscal", "Bodegas Roda", "Artadi", "Remírez de Ganuza", "Contino", "Remelluri", "Sierra Cantabria", "Palacios Remondo", "Finca Allende", "Bodegas Bilbaínas", "Gómez Cruzado"],
 "Rioja's minimum ageing for a red Gran Reserva (two years in oak and two in bottle within five) is stricter than the national rule, but the real eccentric is López de Heredia, which still ages its Viña Tondonia whites for years in old barrels in cellars dug in 1877 and makes its own casks with an in-house cooper.",
 contains=["Rioja Alta", "Rioja Alavesa", "Rioja Oriental"])

A = "Rioja"
sites = [
 site("Barrio de la Estación, Haro", "historic", A, 42.5837, -2.8491,
  "Haro's railway station opened in 1863, and in the phylloxera years the land beside it filled with bodegas that could load wine straight onto trains for Bilbao and Bordeaux. López de Heredia, CVNE, La Rioja Alta, Muga, Bodegas Bilbaínas, Gómez Cruzado, Roda and Ramón Bilbao nearby make it the densest cluster of historic wineries in the world, perhaps. Every June the Barrio stages its own open-door weekend, a pilgrimage for Rioja lovers.",
  cls="Historic wine quarter (from 1863)", q="precise"),
 site("R. López de Heredia Viña Tondonia", "house", A, 42.5844, -2.8481,
  "Founded in 1877 by Rafael López de Heredia, the most traditional house in Rioja. Its cellars run deep into the rock beside the Ebro, its barrels are made and repaired by its own coopers, and its Viña Tondonia, Bosconia, Cubillo and Gravonia wines spend years in old American oak. The whites and rosado Gran Reserva are cult wines. The modern tasting pavilion by Zaha Hadid wraps an Art Nouveau stand from the 1910 Brussels fair.",
  cls="Bodega (1877)", producers=["R. López de Heredia"]),
 site("Viña Tondonia vineyard", "vineyard", A, 42.5963, -2.8267,
  "A 100-hectare estate on a meander of the Ebro, planted by Rafael López de Heredia on the north bank opposite Haro in the 1910s. Its clay-limestone and alluvial soils supply both the red and white Viña Tondonia, released only after six or more years of barrel ageing and, for the Gran Reservas, decades. One of the few historic Rioja brands named after a real vineyard.",
  cls="Single vineyard (estate)", producers=["R. López de Heredia"], q="approx"),
 site("CVNE (Compañía Vinícola del Norte de España)", "house", A, 42.5819, -2.8491,
  "Founded in 1879 by the Real de Asúa brothers, CVNE (often spoken as Cune) makes the Imperial Gran Reserva and the Viña Real wines. Its 1909 barrel hall, roofed by a column-free steel truss attributed to the Eiffel engineering firm, remains a landmark of Haro's station quarter. Imperial Gran Reserva 2004 was Wine Spectator's wine of the year in 2013.",
  cls="Bodega (1879)", producers=["CVNE"]),
 site("La Rioja Alta S.A.", "house", A, 42.5844, -2.8469,
  "Founded in 1890 by five families from Rioja and the Basque Country, La Rioja Alta is the guardian of the classic style: long ageing in American oak barrels made in its own cooperage, racked by hand by candlelight. Its Gran Reserva 890 and 904 (named after the founding year, 1890, and the 1904 merger with Bodegas Ardanza) are reference wines for traditional Rioja. The group also owns Torre de Oña in Rioja Alavesa.",
  cls="Bodega (1890)", producers=["La Rioja Alta"]),
 site("Bodegas Muga", "house", A, 42.5829, -2.8472,
  "Founded in 1932 by Isaac Muga and Aurora Caño and moved to the station quarter in 1971. Muga ferments in large oak vats, ages in its own barrels and keeps a team of coopers who build and repair both 225-litre barricas and big wooden tinas, a rarity today. It makes both the traditional Prado Enea Gran Reserva and the modern Torre Muga and Aro.",
  cls="Bodega (1932)", producers=["Bodegas Muga"]),
 site("Bodegas Roda", "house", A, 42.5858, -2.8463,
  "Founded in 1987 by Mario Rotllant and Carmen Daurella, Roda built its modern cellar on a cliff above the Ebro next to the station quarter. It works with old-vine Tempranillo from selected vineyards around Haro and the Sonsierra, and its research into clones and its Roda I and Cirsion wines helped define the modern Rioja of the 1990s.",
  cls="Bodega (1987)", producers=["Bodegas Roda"]),
 site("Bodegas Bilbaínas", "house", A, 42.5839, -2.8513,
  "Founded in 1901 by a Bilbao merchant family on the site of an earlier French-owned wine trading house, Bodegas Bilbaínas holds one of Rioja's largest estates around Haro and underground galleries under the station quarter. It is known for Viña Pomal, a brand dating from 1908, and is today part of the Codorníu Raventós group.",
  cls="Bodega (1901)", producers=["Bodegas Bilbaínas"]),
 site("Bodegas Gómez Cruzado", "house", A, 42.5837, -2.8472,
  "One of the smaller houses of the station quarter, dating from 1886. Its modern revival focuses on high-altitude Garnacha and Tempranillo from the Sierra de la Demanda foothills and old vines from the Obarenes, with village wines such as Pancrudo.",
  cls="Bodega (1886)", producers=["Gómez Cruzado"]),
 site("Marqués de Riscal and the Gehry hotel", "house", A, 42.5117, -2.6177,
  "Camilo Hurtado de Amézaga, Marqués de Riscal, built this Elciego bodega in 1858 with advice from Bordeaux, making one of the first modern wineries in Spain. His cellar El Embotellado holds bottles from 1862. Since 2006 Frank Gehry's hotel, wrapped in titanium ribbons coloured like red wine, gold mesh and silver capsules, has made the City of Wine one of Spain's most visited wineries. Riscal also pioneered Verdejo in Rueda in 1972.",
  cls="Bodega (1858) and hotel (2006)", producers=["Marqués de Riscal"]),
 site("Marqués de Murrieta, Finca Ygay", "house", A, 42.4546, -2.3889,
  "Luciano de Murrieta made the first aged Rioja for export in 1852, then founded his bodega at Finca Ygay southeast of Logroño in 1872. The estate's 300 hectares surround the restored castle. Castillo Ygay Gran Reserva Especial is one of Rioja's grand wines (the 2010 was named Wine Spectator's wine of the year in 2020), and the white Castillo Ygay is aged for years before release.",
  cls="Bodega and estate (1852/1872)", producers=["Marqués de Murrieta"]),
 site("Remírez de Ganuza", "estate", A, 42.567, -2.684,
  "Fernando Remírez de Ganuza, once a vineyard broker who knew every plot in the Sonsierra, founded this Samaniego winery in 1989. He famously separates the shoulders of each bunch, the ripest part, for his top wines and the tips for others. Its reserva and Trasnocho wines are among the most sought after of modern Rioja. Coordinates are approximate, for the village of Samaniego.",
  cls="Bodega (1989)", producers=["Remírez de Ganuza"], q="approx"),
 site("Artadi", "estate", A, 42.5471, -2.5746,
  "Founded as a growers' cooperative in Laguardia in 1985 and turned into a family estate by Juan Carlos López de Lacalle. Artadi's single-vineyard wines (El Pisón, Viña El Pisón from a 1945 planting, and La Poza de Ballesteros) led modern Rioja. In 2015 Artadi announced it was leaving the DOCa, protesting at Rioja's refusal to label villages and vineyards, and since the 2016 vintage it has sold its wines outside the Rioja name.",
  cls="Bodega (1985)", producers=["Artadi"]),
 site("Viña El Pisón", "vineyard", A, 42.539, -2.576,
  "A 2.4-hectare vineyard below Laguardia planted by the López de Lacalle family in 1945, on chalky clay soils at about 520 m. Artadi's Viña El Pisón, first made in 1991, became one of the defining single-vineyard Tempranillos of modern Spain, and a test case for the argument that Rioja should be labelled by place.",
  cls="Single vineyard", producers=["Artadi"], q="approx"),
 site("Viñedos del Contino", "estate", A, 42.4999, -2.4967,
  "Rioja's first single-estate bodega in the modern sense, founded in 1973 by CVNE and local partners on a 62-hectare loop of the Ebro at Laserna, in Rioja Alavesa. Contino pioneered a varietal Graciano and the Viña del Olivo, named after an old olive tree in the vineyard. The coordinates point to CVNE's nearby Viña Real cellar in Laserna; the estate lies just across the farmland.",
  cls="Single estate (1973)", producers=["Contino (CVNE)"], q="approx"),
 site("Remelluri", "estate", A, 42.5992, -2.774,
  "A historic estate below the Toloño hermitage in Labastida, once a farm of the Monastery of Toloño (14th century), with medieval stone presses cut into rock. Jaime Rodríguez Salis bought it in 1967; his son Telmo Rodríguez returned in 2010 and turned it toward village and vineyard wines grown organically at up to 800 m.",
  cls="Estate (from 1967)", producers=["Remelluri", "Telmo Rodríguez"]),
 site("Bodegas Ysios", "estate", A, 42.5687, -2.591,
  "Santiago Calatrava designed this Laguardia winery for Domecq in 2001: an undulating aluminium roof that mimics the line of the Sierra de Cantabria behind it, above a cedar facade. It belongs to Pernod Ricard and makes Tempranillo from old Alavesa vineyards.",
  cls="Bodega (2001)", producers=["Bodegas Ysios"]),
 site("Laguardia", "village", A, 42.543, -2.5805,
  "The walled medieval capital of Rioja Alavesa, founded as a Navarrese frontier town in 1164. Beneath its streets are more than 300 old cellars and tunnels, some still used to age wine, and the town's Gothic Santa María de los Reyes church has a painted portico. Around it, chalky terraces at 600 m produce some of Rioja's finest Tempranillo.",
  cls="Village (vino de pueblo)", producers=["Artadi", "Ysios", "Viña Real (CVNE)"]),
 site("Sierra Cantabria", "estate", A, 42.5584, -2.7515,
  "The Eguren family's winery in San Vicente de la Sonsierra, under the cliffs of the Sierra de Cantabria. With Señorío de San Vicente and Viñedos de Páganos, they make single-vineyard Tempranillo such as Amancio and El Bosque, part of the Sonsierra's claim to some of Rioja's best north-facing sites.",
  cls="Bodega", producers=["Sierra Cantabria", "Eguren family"]),
 site("Abel Mendoza, San Vicente de la Sonsierra", "estate", A, 42.566, -2.761,
  "Abel Mendoza and Maite Fernández farm small plots around San Vicente de la Sonsierra and bottle single varieties, including rare whites such as Torrontés, Malvasía and Garnacha Blanca, plus field blends from old vineyards. A model for the grower movement that pushed Rioja toward village and vineyard labels.",
  cls="Grower estate", producers=["Abel Mendoza"]),
 site("Finca Allende, Briones", "estate", A, 42.5205, -2.7951,
  "Miguel Ángel de Gregorio founded Finca Allende in Briones in 1995 in an 18th-century manor house. His Aurus and Calvario wines, from old vineyards around the village, helped launch modern Rioja Alta. The coordinates are for Briones village.",
  cls="Bodega (1995)", producers=["Finca Allende"], q="approx"),
 site("Dinastía Vivanco Museum of Wine Culture", "museum", A, 42.5396, -2.7775,
  "Opened in 2004 below Briones by the Vivanco family, this is one of the largest wine museums in the world, with archaeology, presses, a corkscrew collection of thousands and art about wine from Roman mosaics to Picasso. Its garden of varieties grows more than 200 grape types.",
  cls="Museum (2004)", producers=["Dinastía Vivanco"]),
 site("Monasteries of San Millán de Yuso and Suso", "historic", A, 42.3259, -2.8657,
  "Twin monasteries in the Cárdenas valley, UNESCO World Heritage Sites since 1997. Glosses in the margins of a Latin codex from here, the Glosas Emilianenses, contain the oldest written Castilian and Basque. The monks of Rioja's monasteries kept vineyards through the Middle Ages, and the area's wines are now part of Rioja Alta.",
  cls="Historic monastery (UNESCO)", producers=[]),
 site("Palacios Remondo, Alfaro", "estate", A, 42.1773, -1.7562,
  "The Palacios family winery in Alfaro, founded in 1945 and run by Álvaro Palacios since 2000. He has championed Rioja Oriental's Garnacha, especially from the slopes of Monte Yerga, and his Quiñón de Valmira, from vineyards at about 600 m, is a single-vineyard Garnacha that changed opinions of the region.",
  cls="Bodega (1945)", producers=["Palacios Remondo", "Álvaro Palacios"]),
 site("Bodegas Riojanas, Cenicero", "house", A, 42.4818, -2.64,
  "Founded in 1890 by the Artacho family, with underground cellars in Cenicero, Rioja Alta. Its Monte Real brand dates from the 1920s, and its Viña Albina and Monte Real Gran Reservas are textbook classic Rioja, long aged in American oak.",
  cls="Bodega (1890)", producers=["Bodegas Riojanas"]),
 site("Bodegas Franco Españolas, Logroño", "house", A, 42.4721, -2.4469,
  "Founded in 1890 by a Bordeaux merchant, Frédéric Anglade, on the banks of the Ebro in Logroño, across the river from the old town. It is a direct relic of the French phylloxera-era presence in Rioja, and its Rioja Bordón and Diamante brands are long-running classics.",
  cls="Bodega (1890)", producers=["Bodegas Franco Españolas"]),
]
save('02_rioja', {"regions": [region] + subregions, "appellations": [appellation], "sites": sites})
