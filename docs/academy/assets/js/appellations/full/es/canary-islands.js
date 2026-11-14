// Full encyclopedia entries: Canary Islands. Written from the pliegos de condiciones (Ministry of Agriculture copies), checked 14 November 2026.
function ci(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const CANW = "Preferred whites (most DOs): Albillo Criollo, Marmajuelo (Bermejuela), Forastera Blanca, Doradilla, Gual, Malvasía Aromática, Malvasía Volcánica, Moscatel de Alejandría, Sabro, Verdello, Vijariego Blanco; also Listán Blanco, Pedro Ximénez, Torrontés and others";
const CANR = "Preferred reds: Castellana Negra, Listán Negro (Almuñeco), Malvasía Rosada, Negramoll, Tintilla; authorised Baboso Negro, Listán Prieto, Moscatel Negro, Vijariego Negro and, in some DOs, international grapes";
APXF["es-lanzarote"] = ci({
  lede: "Black volcanic ash, vines planted in pits dug through the picón and sheltered by curved stone walls, almost no rain: Lanzarote's La Geria is one of the world's most extraordinary vineyards, famous for Malvasía Volcánica.",
  cat: "DO (DOP), white, rosé, red, overripe-grape (sweet), liqueur and sparkling wines", rec: "DO 1993 (Order of 14 December 1993)",
  src: ["Pliego de condiciones DOP Lanzarote (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/lanzarote_2025_01_13.pdf"],
  amended: "Version published by the Ministry in January 2025; regulation of February 2011",
  facts: [["Zone", "The whole island; place names Arrecife, Haría, San Bartolomé, Teguise, Tías, Tinajo, Yaiza"], ["Preferred whites", "Malvasía Volcánica, Albillo Criollo, Gual, Moscatel de Alejandría, Vijariego Blanco (Diego), Verdello"], ["Preferred reds", "Listán Negro, Negramoll, Malvasía Rosada, Tintilla"], ["Minimum alcohol", "Still wines 9%; overripe-grape wine 13%; liqueur 15%; sparkling 10%"], ["Yields", "7,000 kg/ha (51.8 hl/ha); at most 74 l per 100 kg"], ["Rainfall", "Under 150 mm a year"]],
  place: "Vines grow in hoyos (pits) about 3 m across and 2 to 2.5 m deep, dug down through the volcanic lapilli (picón) to old soil and protected by semicircular stone walls (zocos) from the constant trade winds. The picón soaks up night dew and rain and stops evaporation.",
  rules: "The island's yield cap of 7,000 kg/ha is a ceiling rarely reached: real yields in La Geria are far lower.",
  history: "The eruptions of Timanfaya (1730 to 1736) buried farmland under ash; farmers learned to plant vines in pits through it. Malvasía from the Canaries was prized in Shakespeare's England as 'Canary sack'.",
  glass: "Malvasía Volcánica: dry or sweet, with peach, apricot, herbs, smoky minerality and saline freshness; Listán Negro reds are light, peppery and volcanic.",
  exam: "La Geria; hoyos and zocos in picón; Malvasía Volcánica; Timanfaya eruptions 1730-36.",
  producers: ["El Grifo", "Los Bermejos", "Stratvs", "Bodega La Geria", "Puro Rofe"]
});
APXF["es-tacoronte-acentejo"] = ci({
  lede: "The green, Atlantic north-east coast of Tenerife, the Canaries' first DO, specialising in Listán Negro reds from terraces between 100 and 1,000 m.",
  cat: "DO (DOP), white, rosé, red, liqueur, sparkling, semi-sparkling and sweet styles", rec: "DO 1992 (Order of 22 January 1992)",
  src: ["Pliego de condiciones DOP Tacoronte-Acentejo, consolidated November 2024 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/tacoronte-acentejo_2024_12_30.pdf"],
  amended: "Consolidated version, November 2024",
  facts: [["Zone", "Tegueste, Tacoronte, El Sauzal, La Matanza de Acentejo, La Victoria de Acentejo, Santa Úrsula, La Laguna, El Rosario, Santa Cruz de Tenerife"], ["Subzone", "Anaga (parts of La Laguna, Santa Cruz and Tegueste)"], ["Preferred reds", "Listán Negro, Negramoll, Castellana Negra, Malvasía Rosada, Tintilla"], ["Whites", "Listán Blanco, Moscatel, Malvasía and other Canary grapes"], ["Minimum alcohol", "Still wines 9%; naturally sweet 13%; liqueur 15%"], ["Yields", "15,000 kg/ha (111 hl/ha); at most 74 l per 100 kg"]],
  place: "North-facing slopes from 100 to 1,000 m, on acidic volcanic loams, cooled and watered by the trade winds; about 2,500 hours of sun and 400 to 550 mm of rain.",
  rules: "The Anaga subzone covers vineyards in the ancient, steep Anaga massif.",
  history: "Recognised in 1992, the first appellation in the Canaries; cooperative and family wineries supplied Tenerife's own market.",
  glass: "Listán Negro: bright ruby, red cherry, black pepper, smoky volcanic notes, fresh and light to medium bodied.",
  exam: "First Canary DO (1992); Listán Negro; Anaga subzone.",
  producers: ["Bodegas Monje", "Bodegas Insulares Tenerife", "Presas Ocampo", "Viñátigo"]
});
APXF["es-valle-de-la-orotava"] = ci({
  lede: "The valley below Mount Teide on Tenerife's north coast, known for the braided multi-cordon vines (cordón trenzado) and some of Spain's most exciting volcanic Listán.",
  cat: "DO (DOP), white, rosé, red, liqueur, sweet and sparkling wines", rec: "DO 1995 (Order of 29 December 1994)",
  src: ["Pliego de condiciones DOP Valle de La Orotava (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/valle_de_la_orotava_2011_01_01.pdf"],
  amended: "Text listed by the Ministry as in force (2011)",
  facts: [["Zone", "La Orotava, Los Realejos and Puerto de la Cruz (Tenerife)"], ["Grapes", CANW + "; " + CANR], ["International grapes", "Cabernet Sauvignon, Merlot, Pinot Noir, Ruby Cabernet, Syrah and Tempranillo together at most 30% of a winery's grapes, and never varietal"], ["Minimum alcohol", "White and rosé 10.5%; red 11%; liqueur and sweet 15%"], ["Yields", "White 13,000 kg/ha (96.2 hl/ha); red 10,000 kg/ha (74 hl/ha)"], ["Training", "Traditional cordón trenzado (braided cordon), plus pergola, espalier and others"]],
  place: "A gentle slope at 400 to 800 m formed by material that slid from Las Cañadas del Teide; light, slightly acidic volcanic soils, about 465 mm of rain and constant humid trade winds.",
  rules: "International grapes are capped at 30% and cannot be bottled as varietals, protecting the native identity.",
  history: "The braided cordon, long canes woven into horizontal ropes, is unique to this valley. Producers such as Suertes del Marqués and Envínate brought it worldwide attention in the 2010s.",
  glass: "Listán Blanco and Negro: smoky, saline, citrus and red fruit with fine acidity.",
  exam: "Cordón trenzado; Teide; Suertes del Marqués; 30% cap on international grapes.",
  producers: ["Suertes del Marqués", "Envínate", "Tajinaste", "Bodegas El Penitente", "Bodega Ignios Orígenes"]
});
APXF["es-ycoden-daute-isora"] = ci({
  lede: "The north-west of Tenerife, from Icod de los Vinos to Guía de Isora, with vineyards from near the sea to 1,400 m and a classic sweet Malvasía.",
  cat: "DO (DOP), white, rosé, red, liqueur, Malvasía clásico and quality sparkling", rec: "DO 1994 (Order of 16 February 1994)",
  src: ["Pliego de condiciones DOP Ycoden-Daute-Isora (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/ycoden-daute-isora_2011_01_01.pdf"],
  amended: "Text listed by the Ministry as in force (regulation of November 2010)",
  facts: [["Zone", "San Juan de la Rambla, La Guancha, Icod de los Vinos, Garachico, Los Silos, Buenavista del Norte, El Tanque, Santiago del Teide, Guía de Isora"], ["Grapes", CANW + "; " + CANR], ["Minimum alcohol", "White and sparkling 11%; rosé and red 11.5%; liqueur 15%; Malvasía clásico 14% (grapes 17% potential)"], ["Blends", "Rosé at least 50% red grapes; young red at least 75%; Malvasía clásico only Malvasía, overripened on the vine"], ["Yields", "White 15,000 kg/ha (105 hl/ha); red 10,000 kg/ha (70 hl/ha); at most 70 l per 100 kg"], ["Sparkling", "At least 9 months in bottle"]],
  place: "About 1,600 ha from 50 to 1,400 m on volcanic ash and rock (pH about 6.2), with about 540 mm of rain and 3,000 hours of sun.",
  rules: "Malvasía clásico, a sweet wine of late-picked Malvasía, is this DO's traditional speciality.",
  history: "Icod de los Vinos, as its name says, was a wine town; Tenerife's Malvasía trade made the island rich in the 16th and 17th centuries.",
  glass: "Fresh volcanic whites and reds; Malvasía clásico is golden, honeyed and apricot-scented.",
  exam: "Icod de los Vinos; Malvasía clásico; north-west Tenerife.",
  producers: ["Bodegas Viñátigo", "Bodegas Tierra de Frontos"]
});
APXF["es-abona"] = ci({
  lede: "The dry south of Tenerife, where vines climb from 400 m to about 1,700 m at Vilaflor, among the highest vineyards in Europe, on porous volcanic jable.",
  cat: "DO (DOP), white, rosé, red, sweet classic, sparkling, semi-sparkling and liqueur", rec: "DO 1995 (Order of 5 May 1995)",
  src: ["Pliego de condiciones DOP Abona (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/abona_2011_01_01.pdf"],
  amended: "Text listed by the Ministry as in force (2011)",
  facts: [["Zone", "Adeje, Arico, Arona, Fasnia, Granadilla de Abona, San Miguel de Abona, Vilaflor (Tenerife)"], ["Grapes", CANW + "; " + CANR], ["Minimum alcohol", "White 9.5%; rosé and sparkling 10%; red 11.5%; sweet classic 15%; liqueur 15% (17.5% total)"], ["Yields", "Traditional edge pergolas 20,000 kg/ha (148 hl/ha); other systems 10,000 kg/ha (74 hl/ha); at most 74 l per 100 kg"]],
  place: "Vineyards from 400 to 1,700 m; the best at 400 to 800 m on very porous, moisture-absorbing volcanic soils with jable (pumice), and at Vilaflor on dark clays at an altitude the rules call astonishing for vines. Rain is scarce; only land above 1,000 m gets a usable amount.",
  rules: "Very different yields apply to traditional pergolas on field edges and to modern vineyards.",
  history: "Recognised in 1995. Vilaflor's high vineyards became famous through producers such as Envínate and Bodega Reverón.",
  glass: "Taut, smoky Listán Blanco and light, peppery reds with high acidity from altitude.",
  exam: "Vilaflor at about 1,700 m; jable pumice soils; south Tenerife.",
  producers: ["Envínate", "Bodega Reverón", "Bodegas Altos de Trevejos", "Cumbres de Abona"]
});
APXF["es-valle-de-guimar"] = ci({
  lede: "The south-east valley of Tenerife around Güímar, with vineyards from 300 m to 1,700 m below Izaña.",
  cat: "DO (DOP), white, rosé, red, liqueur, quality sparkling, semi-sparkling and sweet classic", rec: "DO 1995 (Order of 5 May 1995)",
  src: ["Pliego de condiciones DOP Valle de Güímar (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/valle_de_guimar_2011_01_01.pdf"],
  amended: "Text listed by the Ministry as in force (2011)",
  facts: [["Zone", "Arafo, Candelaria and Güímar (Tenerife)"], ["Grapes", CANW + "; " + CANR], ["Minimum alcohol", "Dry white 11%; sweet white 13.5%; rosé 11%; red 12% (carbonic maceration 11.5%); liqueur 15%; sweet classic 15%"], ["Varietal labels", "One grape at least 85%; two or more grapes 100% from those named"], ["Yields", "Traditional edge systems 30,000 kg/ha (222 hl/ha); modern systems 10,000 kg/ha (74 hl/ha)"]],
  place: "Vineyards from 300 to 1,700 m; the best from 800 to 1,700 m on dark soils, with jable-covered volcanic soils at 400 to 800 m. Rainfall rises from 161 mm at the coast to 504 mm at Izaña, which has the most sunshine in Spain.",
  rules: "Traditional vineyards on field edges have an exceptionally high yield allowance.",
  history: "Recognised in 1995; largely a cooperative zone.",
  glass: "Fresh Listán Blanco and aromatic Malvasía and Moscatel.",
  exam: "South-east Tenerife; vines to 1,700 m below Izaña.",
  producers: ["Bodegas Comarcal Valle de Güímar"]
});
APXF["es-la-palma"] = ci({
  lede: "The steep, volcanic 'Isla Bonita', with three very different subzones, ungrafted century-old Malvasía and the unique pine-aged Vino de Tea.",
  cat: "DO (DOP), white, rosé, clarete, Negramoll, red, Vino de Tea, naturally sweet, Malvasía dry and sweet, sparkling, semi-sparkling and liqueur", rec: "DO 1994 (Order of 16 February 1994)",
  src: ["Pliego de condiciones DOP La Palma (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/la_palma_2011_01_01.pdf"],
  amended: "Text listed by the Ministry as in force (regulation of July 2011)",
  facts: [["Subzones", "Norte de La Palma (Tijarafe, Puntagorda, Garafía, Barlovento, San Andrés y Sauces, Puntallana); Hoyo de Mazo; Fuencaliente (with Los Llanos, El Paso, Tazacorte)"], ["Grapes", CANW + "; " + CANR], ["Minimum alcohol", "10% for most types; Malvasía dulce and naturally sweet 13%; liqueur 15%"], ["Blends", "Malvasía seco and Negramoll at least 85% of their grape; clarete at least 25% red grapes"], ["Yields", "10,000 kg/ha (70 hl/ha); at most 70 l per 100 kg"], ["Vino de Tea", "Made in Norte de La Palma; aged no more than 6 months in casks of Canary pine heartwood (tea)"], ["Malvasía dulce", "Late-harvested, over 45 g/l residual sugar"]],
  place: "Terraces on steep slopes from about 200 to 1,400 m. In Hoyo de Mazo and Fuencaliente low vines grow in lapilli up to 5 m deep. The island is phylloxera-free and nearly all vines are on their own roots, some Malvasía over 100 years old.",
  rules: "Vino de Tea, aged briefly in Canary pine, is a protected traditional style found nowhere else.",
  history: "La Palma's Malvasía was shipped to Europe from the 16th century. The 1971 Teneguía eruption and the 2021 Cumbre Vieja eruption both hit the southern vineyards.",
  glass: "Malvasía dulce: honey, apricot, citrus peel; Vino de Tea: resinous, minty, slightly bitter; Listán Prieto and Negramoll reds light and spicy.",
  exam: "Vino de Tea (Canary pine); Fuencaliente Malvasía; three subzones; ungrafted vines.",
  producers: ["Bodegas Teneguía", "Victoria Torres (Matías i Torres)", "Bodegas Carballo", "Juan Matías Torres"]
});
APXF["es-el-hierro"] = ci({
  lede: "The smallest and most westerly Canary island, with terraced vineyards from 50 to 1,000 m and rare grapes such as Baboso and Vijariego.",
  cat: "DO (DOP), white, rosé, red, carbonic-maceration red, liqueur, dulce clásico and sparkling", rec: "DO 1994 (Order of 27 April 1994)",
  src: ["Pliego de condiciones DOP El Hierro (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/el_hierro_2011_01_01.pdf"],
  amended: "Text listed by the Ministry as in force (regulation of February 2011)",
  facts: [["Zone", "The whole island (El Golfo, Frontera, El Pinar, Echedo, Sabinosa and others)"], ["Preferred whites", "Marmajuelo, Gual, Malvasía Aromática and Volcánica, Moscatel de Alejandría, Vijariego Blanco"], ["Preferred reds", "Listán Negro, Negramoll, Tintilla; authorised Baboso Negro, Vijariego Negro, Moscatel Negro"], ["Minimum alcohol", "White and sparkling 11%; rosé 11.5%; red 12%; dulce clásico 14%; liqueur 15%"], ["Yields", "15,000 kg/ha (111 hl/ha); at most 74 l per 100 kg"], ["Ripeness", "Grape minimums of 11 to 13 Baumé by variety"]],
  place: "An island of 278 km² rising to 1,520 m; vines on steep terraces from 50 to 1,000 m on light, stony volcanic soils, sometimes under picón. Mean rainfall is only 170 mm and the mean temperature 20.4°C; phylloxera never arrived.",
  rules: "Ripeness minimums are set grape by grape, and some old varieties are kept in existing vineyards but banned from new planting.",
  history: "Wine has been made in El Golfo since the 16th century; the island's cooperative at Frontera dominates production.",
  glass: "High-alcohol, high-acid whites and reds with salty, volcanic notes; Baboso Negro is dark and spicy.",
  exam: "Smallest Canary DO; Baboso and Vijariego; El Golfo.",
  producers: ["Bodega Uwe Urbach", "Cooperativa del Campo de Frontera"]
});
APXF["es-la-gomera"] = ci({
  lede: "A ravine-cut island of steep terraces, dominated by the white Forastera Blanca, which covers about 85% of the vineyard.",
  cat: "DO (DOP), white, rosé, red, carbonic-maceration red, liqueur, sparkling, naturally sweet, traditional white/rosé and varietal Forastera Blanca", rec: "DO 2003 (Order of 10 December 2003)",
  src: ["Pliego de condiciones DOP La Gomera (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/la_gomera_2011_01_01.pdf"],
  amended: "Text listed by the Ministry as in force (regulation of July 2009)",
  facts: [["Zone", "The whole island"], ["Signature grape", "Forastera Blanca (about 85% of plantings)"], ["Grapes", CANW + "; " + CANR], ["Minimum alcohol", "White 10.5%; rosé and sparkling 11%; red and varietal Forastera 12%; traditional white/rosé 13%; naturally sweet 13%; liqueur 15%"], ["Traditional wine", "At least 90% Forastera Blanca among the white grapes, up to 10% red grapes, passed through barrel, 13 to 17% alcohol"], ["Yields", "12,000 kg/ha (89 hl/ha), up to 40% more on steep slopes"]],
  place: "369 km² rising to 1,487 m, with a central plateau near 1,000 m. Volcanic activity ended about two million years ago, so soils are older and more weathered (ferralitic above 700 m, brown soils lower, vertisols near the coast). Average rainfall is 370 mm.",
  rules: "The traditional style, a barrel-aged, high-alcohol Forastera white, has its own category.",
  history: "Just over 800 ha of terraces survive; the DO came late, in 2003.",
  glass: "Forastera Blanca: high, balanced acidity, citrus, herbs and a saline, mineral finish.",
  exam: "Forastera Blanca; DO 2003; older non-volcanic soils.",
  producers: ["Bodega Insular de La Gomera"]
});
APXF["es-gran-canaria"] = ci({
  lede: "The round central island of the Canaries, whose single DO took in the historic Monte Lentiscal area, with vineyards from 50 to 1,300 m.",
  cat: "DO (DOP), white, rosé, red, liqueur, sparkling and overripe-grape wine", rec: "DO 2005 (Order of 23 December 2005)",
  src: ["Pliego de condiciones DOP Gran Canaria (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/gran_canaria_2025_04_23.pdf"],
  amended: "Version published by the Ministry in April 2025",
  facts: [["Zone", "The whole island; 21 municipalities may be named; includes the historic Monte Lentiscal (Las Palmas, Santa Brígida, Telde)"], ["Grapes", CANW + "; " + CANR], ["Minimum alcohol", "White, rosé and sparkling 10%; red 11%; overripe 14%; liqueur 15%"], ["Varietal labels", "100% of the named grape"], ["Yields", "White 13,000 kg/ha (94.25 hl/ha); red 12,000 kg/ha (87 hl/ha); at most 72.5 l per 100 kg; at most 5,000 vines/ha"], ["Bottling", "Inside the zone"]],
  place: "An island rising to 1,950 m at Pico de las Nieves; vineyards from 50 to 1,300 m on volcanic soils from porous ash to fertile clay, shaped by the trade winds and warm air from Africa about 100 km away.",
  rules: "A varietal label needs 100% of the grape, stricter than the EU's 85%.",
  history: "Vines arrived after the Castilian conquest of 1483. The Monte Lentiscal denomination was merged into the island-wide DO.",
  glass: "Fresh whites and light, fruity Listán Negro reds; Monte Lentiscal reds are fuller.",
  exam: "Island-wide DO 2005; Monte Lentiscal; 100% varietal rule.",
  producers: ["Bodegas Los Berrazales", "Bodega San Juan del Mocanal", "Bodega Mondalón"]
});
APXF["es-islas-canarias"] = ci({
  lede: "A region-wide quality wine designation covering all seven islands, letting producers blend across islands and DOs.",
  cat: "Vino de Calidad con Indicación Geográfica (DOP), white, rosé, red, liqueur, quality sparkling, carbonated semi-sparkling and overripe-grape wine", rec: "Vino de Calidad 2011 (Order of 2 May 2011)",
  src: ["Pliego de condiciones DOP Islas Canarias (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/islas_canarias_2021_07_27.pdf"],
  amended: "Version published by the Ministry in July 2021",
  facts: [["Zone", "All the Canary Islands"], ["Grapes", "Canary natives (Listán Blanco, Malvasía Volcánica, Listán Negro and others) plus Tempranillo and other listed grapes"], ["Minimum alcohol", "White and rosé 10%; red 11.5%; sparkling 10%; liqueur 15% (17.5% total); overripe 15% (17% total)"], ["Red", "At least 85% red grapes"], ["Yields", "15,000 kg/ha (111 hl/ha); at most 74 l per 100 kg"]],
  place: "Volcanic, light, permeable, slightly acidic soils across all the islands, cooled by the humid north-east trade winds; phylloxera-free, ungrafted vines.",
  rules: "It overlaps the island DOs, so a wine can carry either name; many leading Tenerife producers use it for cross-island blends.",
  history: "Created in 2011 to give a quality umbrella to the whole archipelago.",
  glass: "Varies by island: smoky Listán, aromatic Malvasía.",
  exam: "Archipelago-wide Vino de Calidad (2011); overlaps island DOs.",
  producers: ["Suertes del Marqués", "Envínate", "Bodegas Monje"]
});
