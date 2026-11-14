// Full encyclopedia entries: Valencia. Written from the pliegos de condiciones (Ministry of Agriculture copies), checked 14 November 2026.
function va(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-utiel-requena"] = va({
  lede: "A high inland plateau west of Valencia, the heartland of Bobal, which covers about three-quarters of the vineyard, with a special tier for old-vine 'Bobal Alta Expresión'.",
  cat: "DO (DOP), red, rosé, white, liqueur, quality sparkling, semi-sparkling and low-alcohol wines", rec: "DO 1957",
  src: ["Pliego de condiciones DOP Utiel-Requena (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/utiel-requena_2023_05_09.pdf"],
  amended: "Version published by the Ministry in May 2023",
  sources: [["Consejo Regulador DO Utiel-Requena", "https://utielrequena.org/"]],
  facts: [["Zone", "Camporrobles, Caudete de las Fuentes, Fuenterrobles, Requena, Siete Aguas, Sinarcas, Utiel, Venta del Moro, Villargordo del Cabriel (Valencia)"], ["Red grapes", "Bobal (about 75% of the vineyard), Tempranillo, Garnacha Tinta and Tintorera, Cabernet Sauvignon and Franc, Merlot, Syrah, Pinot Noir, Petit Verdot, Graciano, Monastrell"], ["White grapes", "Macabeo, Merseguera, Tardana (Planta Nova), Chardonnay, Sauvignon Blanc, Parellada, Verdejo, Godello, Garnacha Blanca, Tortosí, Albariño, Xarel·lo, Viognier, Moscatel de grano menudo"], ["Minimum alcohol", "Red 10.5%; white 10%; rosé 9%; Superior red 11.5%; Bobal Alta Expresión 12.5%; crianza and older 12%"], ["Yields", "Bobal 8,600 kg/ha bush, 10,500 trellis; other reds 7,500 / 9,100; whites 9,900 / 12,000; at most 74 l per 100 kg"], ["Bobal Alta Expresión", "Varietal Bobal from vines over 50 years, under 4,000 kg/ha (29.6 hl/ha), no irrigation without approval"], ["Ageing", "Crianza red 24 months with 6 in oak (barrels up to 330 l); reserva 36 with 12; gran reserva 60 with 18; Madurado up to 6 months in oak"]],
  place: "A plateau 650 to 905 m high (average 720 m), about 65 km from the sea. Mediterranean climate with strong continental swings, about 400 mm of rain (as little as 150 mm in dry years) and 2,700 hours of sun; loamy, alkaline limestone soils.",
  rules: "The Bobal Alta Expresión mention protects the old bush-vine Bobal that drives the region's modern reputation.",
  history: "Requena's 1265 charter mentions vines. The railway from Valencia in the late 19th century fuelled a vineyard boom; for a century the region shipped bulk wine, before producers such as Mustiguillo revived Bobal from the 2000s. Part of the area is also in DO Cava (Requena zone).",
  glass: "Bobal: deep purple, blueberry, blackberry, violet, fresh acidity and grippy tannin; rosados are bright and fruity.",
  exam: "Bobal (about 75%); Bobal Alta Expresión (vines over 50 years); 720 m average altitude; Requena Cava zone.",
  producers: ["Mustiguillo", "Bodegas Hispano-Suizas", "Chozas Carrascal", "Bruno Murciano", "Bodega Sierra Norte"]
});
APXF["es-valencia"] = va({
  lede: "Four subzones around the city of Valencia, from hot coastal plains to the cool Alto Turia, best known for sweet Moscatel de Valencia and good-value reds and whites.",
  cat: "DO (DOP), white, rosé, red, liqueur wine (Moscatel de Valencia), aromatic sparkling and semi-sparkling", rec: "DO 1957",
  src: ["Pliego de condiciones DOP Valencia, amendment AM05 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/valencia_2024_09_20.pdf"],
  amended: "AM05 (August 2023), published by the Ministry in September 2024",
  facts: [["Subzones", "Alto Turia (11 municipalities), Valentino (29), Moscatel de Valencia (12, overlapping Valentino), Clariano (49)"], ["Moscatel de Valencia", "Liqueur wine of 100% Moscatel de Alejandría; 'Tradicional' when the must macerates on lees and skins"], ["Minimum alcohol", "White 9%; rosé and red 9.5%; crianza and older 12%; liqueur 15% (17.5% total); 'Petit Valencia' low-alcohol 4.5 to 9%"], ["Yields", "White 12,000 kg/ha (91.2 hl/ha); red 9,100 kg/ha; Moscatel de Alejandría 16,000 kg/ha"], ["Place tiers", "Vino de Pueblo (85% from the municipality, yields 10% lower); Vino de Parcela (yields 40% lower, at most 65 l per 100 kg)"], ["Grapes", "Native Merseguera, Tortosí, Verdil, Planta Fina, Planta Nova, Bonicaire, Forcallat, Mandó, Bobal, Monastrell, plus many international varieties"]],
  place: "Inland Valencia province, from the coastal Valentino to the mountains of Alto Turia and the southern Clariano. Mild, sea-influenced climate around 15°C, about 520 mm of rain, brown limestone soils.",
  rules: "The DO allows a low-alcohol 'Petit Valencia' and two place tiers, village and single plot.",
  history: "Valencia's port shipped wine to northern Europe for centuries; the DO dates from 1957. Celler del Roure and Rafael Cambra lead a revival of native grapes and clay-amphora wines.",
  glass: "Moscatel de Valencia: orange blossom, grape, honey; reds from Monastrell and Garnacha are ripe and fruity.",
  exam: "Four subzones; Moscatel de Valencia (100% Moscatel de Alejandría); Vino de Pueblo and Vino de Parcela.",
  producers: ["Celler del Roure", "Rafael Cambra", "Bodegas Murviedro", "Vicente Gandía"]
});
APXF["es-alicante"] = va({
  lede: "From the Monastrell vineyards of the Vinalopó to the Moscatel terraces of the Marina Alta, home of Fondillón, a naturally strong, long-aged Monastrell that is one of Spain's historic wines.",
  cat: "DO (DOP), white, rosé, red, liqueur wines (Moscatel), Fondillón, sparkling and aromatic sparkling", rec: "Regulation 1957 (with roots in the 16th-century Junta de Inhibición)",
  src: ["Pliego de condiciones DOP Alicante (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/alicante_2024_07_25.pdf"],
  amended: "Version published by the Ministry in July 2024; regulation Orden 13/2010",
  facts: [["Subzones", "Eight districts: L'Alacantí, L'Alcoià, Alto, Medio and Bajo Vinalopó, Marina Alta, Marina Baja, El Comtat (112 named municipalities)"], ["Main grapes", "Monastrell, Garnacha Tintorera, Garnacha Tinta (Giró), Bobal; Moscatel de Alejandría, Alarije, Malvasía, Merseguera, Verdil; plus historic and international grapes"], ["Minimum alcohol", "White and rosé 10%; red 12%; liqueur 15%; Noble and Añejo 14%; Fondillón 16%"], ["Fondillón", "100% Monastrell overripened on the vine, native yeasts, at least 16% all natural, under 45 g/l sugar, at least 10 years in oak, solera allowed"], ["Moscatel Alicante", "Only Moscatel de Alejandría"], ["Yields", "White 12,000 kg/ha (88.8 hl/ha); red 9,100 kg/ha; Alicante Singular 8,400 / 6,370 kg/ha"], ["Alicante Singular", "At least 85% main or historic grapes, main-grape vines at least 25 years old, bush-trained"]],
  place: "Hot, dry, calcareous inland valleys of the Vinalopó (from -5°C in winter to 45°C in summer), the higher, cooler El Comtat, and the rainier, clay and sandy-loam Marina Alta (over 500 mm). Sun around 2,900 hours.",
  rules: "Fondillón is defined as an unfortified wine reaching 16% naturally, aged at least a decade.",
  history: "The rules cite a 6th-century BC winemaking site at Benimaquía (Dénia) and an Alicante wine at a Paris competition in 1241; by tradition Fondillón was prized at European courts in the 17th and 18th centuries.",
  glass: "Monastrell reds: ripe dark fruit, herbs, warmth; Fondillón: amber-mahogany, dried fruit, toffee, spice; Moscatel: grapey and honeyed.",
  exam: "Fondillón (Monastrell, 16% natural, 10 years in oak); Marina Alta Moscatel; Monastrell.",
  producers: ["Enrique Mendoza", "Gutiérrez de la Vega", "Primitivo Quiles", "Bodegas Bocopa", "Bernabé Navarro"]
});
APXF["es-el-terrerazo"] = va({
  lede: "Mustiguillo's estate near Utiel, the pago that made Bobal's name, at 790 to 870 m beside the Magro river.",
  cat: "Vino de Pago (DOP), red", rec: "Vino de Pago 2010 (Resolution of 17 September 2010)",
  src: ["Pliego de condiciones El Terrerazo (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/el_terrerazo_2011_01_01.pdf"],
  amended: "Text listed by the Ministry as in force (2011)",
  facts: [["Zone", "Parcels in polygons 8, 14 and 15 of Utiel (Valencia)"], ["Grapes", "Bobal, Tempranillo, Syrah, Cabernet Sauvignon, Merlot, Garnacha Tinta"], ["Types", "Red blend; varietal Bobal"], ["Minimum alcohol", "13%"], ["Yields", "7,300 kg/ha (59 hl/ha); 74% extraction for varietal Bobal"]],
  place: "Sandy-loam, calcareous soils from dolomitic glacis at 790 to 870 m, with July and August maxima near 28 to 31°C and winter minimums below zero.",
  rules: "As a pago, the estate grows, makes and bottles its own wine.",
  history: "Toni Sarrión founded Mustiguillo in the late 1990s on vineyards planted in 1919 and 1948; El Terrerazo was the first pago in the Valencian Community (2010).",
  glass: "Bobal of depth and freshness: blackberry, violet, herbs, fine tannin.",
  exam: "First Valencian pago; Mustiguillo; Bobal.",
  producers: ["Mustiguillo"]
});
APXF["es-los-balagueses"] = va({
  lede: "The Vegalfaro family's pago south-west of Requena, at about 700 m.",
  cat: "Vino de Pago (DOP), red and white", rec: "Vino de Pago 2011",
  src: ["Pliego de condiciones Los Balagueses (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/los_balagueses_2024_10_29.pdf"],
  amended: "Version published by the Ministry in October 2024",
  facts: [["Zone", "Named parcels in Requena (Valencia)"], ["Grapes", "Merlot, Syrah, Garnacha Tintorera, Tempranillo, Bobal; Chardonnay, Sauvignon Blanc, Tardana"], ["Minimum alcohol", "Red 13.5%; white 12%"], ["Yields", "Red 7,950 kg/ha (68 hl/ha); white 10,000 kg/ha (75 hl/ha)"]],
  place: "Gentle 7% slopes at about 700 m on calcareous deposits and marls, continental climate with Mediterranean influence and about 450 mm of rain.",
  rules: "As a pago, the estate grows, makes and bottles its own wine.",
  history: "Recognised in 2011.",
  glass: "Ripe, structured reds; fresh Tardana white.",
  exam: "Requena pago; Vegalfaro.",
  producers: ["Vegalfaro"]
});
APXF["es-vera-de-estenas"] = va({
  lede: "A family estate near Utiel recognised as a pago in 2019, with its own ageing ladder.",
  cat: "Vino de Pago (DOP), red, rosé and white", rec: "Vino de Pago 2019",
  src: ["Pliego de condiciones Vera de Estenas (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/vera_de_estenas_2019_11_11.pdf"],
  amended: "Version published by the Ministry in November 2019",
  facts: [["Zone", "Polygons 37 and 38 of Utiel (Valencia)"], ["Grapes", "Bobal, Tempranillo, Cabernet Sauvignon, Merlot; Chardonnay"], ["Minimum alcohol", "12%; reserva and gran reserva 12.5%"], ["Yields", "Red 7,950 kg/ha (55.65 hl/ha); white 8,700 kg/ha; at most 70% extraction"], ["Ageing", "Madurado under 6 months in barrel; crianza at least 6; reserva 12; gran reserva 18; oak of 225 or 300 l"]],
  place: "Brown limestone soils on Miocene terrain (pH above 8.5), about 430 mm of rain and 2,600 hours of sun; a shallow water table helps ripening and acidity.",
  rules: "As a pago, the estate grows, makes and bottles its own wine.",
  history: "Recognised in 2019.",
  glass: "Bobal and Bordeaux-variety reds with oak; Chardonnay.",
  exam: "Utiel pago (2019).",
  producers: ["Vera de Estenas"]
});
APXF["es-chozas-carrascal"] = va({
  lede: "A small organic estate at San Antonio de Requena, registered as a pago in 2020, making Bobal-led reds, a barrel-fermented white and a rosé.",
  cat: "Vino de Pago (DOP), red, rosé and white", rec: "EU registration 2020",
  src: ["Pliego de condiciones Chozas Carrascal (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/chozas_carrascal_2020_05_11.pdf"],
  amended: "Version published by the Ministry in May 2020",
  facts: [["Zone", "About 30 ha in polygons 14 and 16, San Antonio (Requena, Valencia)"], ["Grapes", "Bobal, Tempranillo, Garnacha Tinta, Cabernet Sauvignon and Franc, Merlot, Syrah, Monastrell; Chardonnay, Sauvignon Blanc, Macabeo"], ["Minimum alcohol", "Red 13%; white and rosé 12.5%"], ["Yields", "Red 7,500 kg/ha (53 hl/ha); white 9,000 kg/ha (63 hl/ha); 70% extraction"], ["Winemaking", "Reds at least 14 days' maceration and 5 months in barrel; rosé macerated in oak; white barrel-fermented"]],
  place: "720 m near the Sierra Juan Navarro, on alkaline limestone soils with a hard layer at about 30 cm, 350 to 400 mm of rain and over 3,000 hours of sun.",
  rules: "As a pago, the estate grows, makes and bottles its own wine.",
  history: "The family estate became a pago in 2020.",
  glass: "Fresh, fruity Bobal blends; textured barrel-fermented white.",
  exam: "Requena pago (2020).",
  producers: ["Chozas Carrascal"]
});
APXF["es-tharsys"] = va({
  lede: "An organic estate at Requena with a lake and old winery, registered as a Vino de Pago in 2025 for still and quality sparkling wines.",
  cat: "Vino de Pago (DOP), red, rosé, white and quality sparkling", rec: "Vino de Pago 2025",
  src: ["Pliego de condiciones Tharsys (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/tharsis_2025_10_02.pdf"],
  amended: "Version published by the Ministry in October 2025",
  facts: [["Zone", "19.5 ha in polygon 47 of Requena (Valencia)"], ["Grapes", "Merlot, Bobal, Garnacha, Cabernet Franc; Chardonnay, Albariño, Xarel·lo"], ["Minimum alcohol", "Red 13%; white and rosé 11.5%; sparkling 10.5%"], ["Yields", "Red 8,500 kg/ha (60 hl/ha); white 10,500 kg/ha (75 hl/ha)"], ["Organic", "Whole vineyard certified organic since 2015"]],
  place: "Flat land at 690 m below the Sierra de Juan Navarro, on calcareous sandy loams over Miocene limestone; about 430 mm of rain and over 3,000 hours of sun, with a cooler microclimate from trees and a lake.",
  rules: "One of the few pagos whose rules include quality sparkling wine.",
  history: "The winery dates from 1808 and the estate was restored from 1998.",
  glass: "Fresh sparkling wines and Bobal and Merlot reds.",
  exam: "Requena pago with sparkling wine (2025).",
  producers: ["Pago de Tharsys"]
});
