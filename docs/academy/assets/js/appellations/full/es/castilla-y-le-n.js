// Full encyclopedia entries: Castilla y León. Written from the pliegos de condiciones published by ITACYL (Castilla y León agrarian institute), checked 14 November 2026.
function cl(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-ribera-del-duero"] = cl({
  lede: "Tempranillo (here called Tinto Fino or Tinta del País) on the high plateau along the Duero, from Soria to just east of Valladolid. Big temperature swings between day and night give dark, structured reds that age for decades, led by Vega Sicilia.",
  cat: "DO (DOP), red, rosé (rosado or clarete) and white", rec: "DO 1982 (first regulation, Order of 21 July 1982)",
  src: ["Pliego de condiciones DOP Ribera del Duero, revision 5 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+RIBERA+DUERO+_rev+5+%281%29.pdf/a1e603c3-0df9-1129-0cd4-02cfa675f3ba"],
  amended: "Revision 5 (amendment AM06), in force 31 July 2023",
  sources: [["Ministry of Agriculture copy of the same text", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/ribera_del_duero_2023_07_31.pdf"]],
  facts: [["Zone", "Burgos, Segovia, Soria and Valladolid; 118 named settlements (64 in Burgos, 25 in Soria, 24 in Valladolid, 5 in Segovia)"], ["Grapes", "Tempranillo (Tinto Fino, Tinta del País), Cabernet Sauvignon, Merlot, Malbec, Garnacha Tinta; white Albillo Mayor"], ["Blends", "Reds at least 75% Tempranillo; rosados and claretes at least 50% red grapes; whites at least 75% Albillo Mayor"], ["Minimum alcohol", "Red 11.5%; rosé and white 11%"], ["Yields", "7,000 kg/ha (50.4 hl/ha); Albillo Mayor 9,500 kg/ha; at most 72 l per 100 kg; continuous presses banned"], ["Crianza", "Red 24 months with 12 in oak; white and rosé 18 with 6"], ["Reserva", "Red 36 months with 12 in oak; white and rosé 24 with 6"], ["Gran Reserva", "Red 60 months with 24 in oak; white and rosé 48 with 6"], ["Oak", "Barrels of at most 330 l for crianza, reserva and gran reserva; roble or barrica wines at least 3 months in barrels of at most 600 l; ageing counted from 1 October"], ["Place names", "A settlement may appear on the label if 85% of the grapes come from it"]],
  place: "A long strip of the Duero valley, about 115 km from east to west, on the northern Meseta. Valleys sit at 750 to 850 m with hills to 1,014 m. Soils are Tertiary sandy clays, ochre and reddish, with limestone layers and Quaternary river terraces. The climate is continental with Atlantic influence: about 435 mm of rain at Aranda de Duero, over 2,400 hours of sun, and swings of 15 to 20°C between day and night during ripening.",
  rules: "Ribera is a red-wine DO first; whites were added only in the 2019 revision and must be mostly Albillo Mayor. Its crianza rule (12 months in oak) is stricter than the Spanish minimum of 6, and its barrels are capped at 330 l.",
  history: "Vega Sicilia, founded in 1864 near Valbuena, made Bordeaux-style reds for a century before there was a DO. Growers including Alejandro Fernández (Tinto Pesquera) pushed for the 1982 DO, and Pesquera's praise from American critics in the 1980s, followed by Peter Sisseck's Pingus in 1995, made Ribera Rioja's great rival.",
  glass: "Deep purple-black; blackberry, black plum, liquorice, toasted oak and earth; firm tannin and fresh acidity from altitude. Old reservas turn to leather, tobacco and dried fruit.",
  exam: "Tinto Fino / Tinta del País; reds at least 75% Tempranillo; crianza 24 months with 12 in oak (barrels up to 330 l); white wines (Albillo Mayor) only since 2019; Vega Sicilia, Pingus, Pesquera.",
  producers: ["Vega Sicilia", "Dominio de Pingus", "Tinto Pesquera", "Aalto", "Hacienda Monasterio", "Pago de Carraovejas", "Emilio Moro", "Protos", "Alión", "Dominio del Águila"]
});
APXF["es-rueda"] = cl({
  lede: "Spain's best-selling white wine DO, on the flat, stony plateau south of Valladolid, built on the native Verdejo. It also keeps alive two old oxidative styles, Dorado and Pálido.",
  cat: "DO (DOP), white, sparkling, rosé, red and liqueur wine (Dorado, Pálido)", rec: "DO 1980 (Order of 12 January 1980), the first in Castilla y León",
  src: ["Pliego de condiciones DOP Rueda, revision 4 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+RUEDA_Rev+4.pdf/2af4f73c-1563-9ef3-fc8d-b7ceca791001"],
  amended: "Revision 4 (July 2024: wine descriptions and grape list), published by the Ministry in June 2025; regulation Orden AGR/1127/2023",
  sources: [["Ministry of Agriculture copy", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/rueda_2025_06_12.pdf"], ["Consejo Regulador DO Rueda", "https://www.dorueda.com/es/"]],
  facts: [["Zone", "About 74 municipalities: 53 in Valladolid, 17 in Segovia, 4 in Ávila"], ["White grapes", "Verdejo, Sauvignon Blanc, Viura, Chardonnay, Viognier (main); Palomino Fino (no new planting), Riesling, Garnacha Blanca, Moscatel de grano menudo, Moscatel de Alejandría, Gewürztraminer"], ["Red grapes", "Tempranillo and Cenicienta (main), Cabernet Sauvignon, Merlot, Garnacha Tinta, Syrah, Bruñal"], ["Blends", "Whites and sparkling at least 75% of the main white grapes; rosé at least 50% red grapes"], ["Minimum alcohol", "White and rosé 11%; red 12%; sparkling 9.5%; Dorado and Pálido 15 to 17.5%"], ["Yields", "Verdejo 10,000 kg/ha trellised, 8,000 bush-trained; Viura 12,000 / 10,000; reds 7,000; at most 72 l per 100 kg"], ["Gran Vino de Rueda", "Vines over 30 years old, at most 6,500 kg/ha and 65% extraction"], ["Village wines", "'Vino de' plus a municipality if 85% of the grapes come from it"], ["Dorado", "Palomino Fino and/or Verdejo, oxidative ageing at least 4 years, the last 2 in oak"], ["Pálido", "Palomino Fino and/or Verdejo, biological ageing under flor, at least the last 3 years in oak"]],
  place: "A high, flat plateau at 700 to 870 m across the Duero basin, with long cold winters, hot dry summers, a mean of about 11.5°C and 400 to 430 mm of rain. The best vineyards are on rañas, pebbly quartzite terraces over sand and clay that drain fast and store heat.",
  rules: "A white labelled Rueda needs three-quarters of its main white grapes, so Sauvignon Blanc and Viura blends qualify as well as varietal Verdejo; a varietal name on the label follows the general EU 85% rule. Gran Vino de Rueda, added in 2020, is the DO's old-vine tier.",
  history: "Rueda's medieval wines were oxidative, aged in underground cellars and glass demijohns. In 1972 Marqués de Riscal, advised by Émile Peynaud, set up in Rueda to make fresh, cold-fermented Verdejo, and the modern style took over. Red wines were admitted in 2008.",
  glass: "Verdejo: pale lemon-green, fennel, green apple, citrus, a bitter-almond finish; lees-aged and old-vine wines add texture. Dorado: amber, nutty and oxidative.",
  exam: "Verdejo; first DO of Castilla y León (1980); rañas soils; Marqués de Riscal 1972; Gran Vino de Rueda (vines over 30 years); Dorado (4 years oxidative) and Pálido (flor).",
  producers: ["Marqués de Riscal", "Belondrade", "José Pariente", "Ossian", "Bodegas Naia", "Javier Sanz", "Menade"]
});
APXF["es-toro"] = cl({
  lede: "Powerful reds from Tinta de Toro, a thick-skinned local Tempranillo, on sandy soils east of Zamora where phylloxera barely reached and many vines are still ungrafted.",
  cat: "DO (DOP), red, white, rosé and traditional-method sparkling", rec: "DO 1987 (Order of 29 May 1987)",
  src: ["Pliego de condiciones DOP Toro, revision 5 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DO+TORO_Rev+5+con+4.2.pdf/05b17302-6e3e-1ceb-2c03-61772db97301"],
  amended: "Revision 5 (June 2024), in force 3 January 2025",
  sources: [["Ministry of Agriculture copy", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/toro_2025_01_03.pdf"]],
  facts: [["Zone", "12 municipalities in south-east Zamora including Toro, plus San Román de Hornija, Villafranca de Duero and the pagos of Villaester (Valladolid)"], ["Grapes", "Tinta de Toro (main) and Garnacha Tinta; whites Malvasía Castellana and Verdejo (main), Moscatel de grano menudo, Albillo Real"], ["Red", "At least 85% Tinta de Toro"], ["Minimum alcohol", "Dry red 12.5%; dry white and rosé 11%; sweet styles 9%; sparkling 11.5%"], ["Yields", "Tinta de Toro 7,500 kg/ha (54 hl/ha); Garnacha and whites 9,000 kg/ha; at most 72 l per 100 kg"], ["Sparkling", "Traditional method, white, rosé (at least 25% red grapes) or red"], ["Ageing", "Roble, crianza, reserva and gran reserva under the general Spanish rules, counted from 1 November"], ["Bottling", "Inside the zone, in glass"]],
  place: "Rolling land along the Duero at 620 to 840 m. The soils are brown, limy and sandy-loam with less than 1% organic matter, often covered with river pebbles. The climate is extreme continental and semi-arid, 350 to 400 mm of rain and a mean of 12 to 13°C. More than half the vineyard is over 40 years old, and the rules mention surviving pre-phylloxera vines.",
  rules: "Toro's minimum of 12.5% for dry reds is one of the highest in Spain and reflects how ripe Tinta de Toro gets. The rules also allow semi-sweet and sweet styles and traditional-method sparkling wine.",
  history: "Toro's wine was prized in medieval Castile and, by tradition, sailed with Columbus. It was a bulk region until the DO of 1987. In the late 1990s and 2000s Vega Sicilia (Pintia), the Eguren family (Numanthia, later Teso La Monja) and others bought old ungrafted vines, and Toro became a source of top reds.",
  glass: "Opaque purple; ripe blackberry, black cherry, cocoa, liquorice, spice; full body, high alcohol, dense tannin.",
  exam: "Tinta de Toro (Tempranillo); red at least 85% Tinta de Toro and 12.5%; sandy soils and ungrafted vines; Numanthia, Pintia, Teso La Monja.",
  producers: ["Numanthia", "Pintia (Vega Sicilia)", "Teso La Monja", "Bodegas Fariña", "Elías Mora", "San Román", "Quinta de la Quietud"]
});
APXF["es-cigales"] = cl({
  lede: "Valladolid's traditional claret country along the Pisuerga, known for rosados made from a mix of red and white grapes and aged in hillside cellars. Most of its wine is now red Tempranillo.",
  cat: "DO (DOP), rosé (rosado or clarete), red, white, sweet and quality sparkling", rec: "Denominación Específica 1986; DO 1991 (12 March 1991)",
  src: ["Pliego de condiciones DOP Cigales, revision 2 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+CIGALES+en+vigor_Rev+2.pdf/2aae0caf-1631-ee29-c2ae-c65397b3292e"],
  amended: "Revision 2 (December 2020, approved March 2022)",
  facts: [["Zone", "Cabezón de Pisuerga, Cigales, Corcos del Valle, Cubillas de Santa Marta, Fuensaldaña, Mucientes, Quintanilla de Trigueros, San Martín de Valvení, Santovenia de Pisuerga, Trigueros del Valle, Valoria la Buena and the pago of El Berrocal (Valladolid), plus Dueñas (Palencia)"], ["Red grapes", "Tinto del País (Tempranillo), Garnacha Tinta, Garnacha Gris, Garnacha Tintorera, Syrah, Merlot, Cabernet Sauvignon"], ["White grapes", "Verdejo, Albillo Mayor, Viura, Sauvignon Blanc, Garnacha Blanca"], ["Minimum alcohol", "Red 12%; white, rosé and sweet 11%"], ["Yields", "Red 7,000 kg/ha (50.4 hl/ha); white, rosé and sparkling 9,000 kg/ha (64.8 hl/ha); at most 72 l per 100 kg"], ["Ageing", "Crianza, reserva and gran reserva under the general Spanish rules, in oak of at most 330 l, counted from 1 November"]],
  place: "About 574 km² on both banks of the Pisuerga just north of Valladolid, in the Duero basin. Soils are Tertiary and Quaternary sediments with very little organic matter and widely varying limestone; the climate is continental with 344 to 468 mm of rain. About 30% of the vineyard is over 60 years old.",
  rules: "The rules set no blending percentages, so the traditional claret, a co-fermented mix of red and white grapes, sits alongside modern rosados and reds.",
  history: "Cigales supplied Valladolid, Spain's capital in the early 1600s, with claret. The villages are honeycombed with underground cellars; one in Dueñas bears the date 1738.",
  glass: "Rosado: bright strawberry to salmon, red berries, fresh and dry. Reds: ripe Tempranillo, red and black fruit, often generous.",
  exam: "Rosado and clarete tradition (red and white grapes); Pisuerga valley; underground cellars.",
  producers: ["César Príncipe", "Bodega Finca Museum", "Traslanzas", "Bodegas Hijos de Félix Salas"]
});
APXF["es-arlanza"] = cl({
  lede: "A small, high DO along the Arlanza river in Burgos and Palencia, around Lerma and Covarrubias, where altitude gives fresher Tempranillo than in neighbouring Ribera.",
  cat: "DO (DOP), red, rosé, white, sweet and overripe-grape wine", rec: "DO 2007 (Orden AYG/781/2007)",
  src: ["Pliego de condiciones DOP Arlanza, revision 3.4, consolidated text (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PPC+DOP+ARLANZA+rev.+3.4+consolidado.pdf/958ba6c3-178b-6b6f-2bc1-f84690998276"],
  amended: "Revision 3 (filed March 2026, approved by Castilla y León June 2026): overripe-grape wines, ice wine, carbonic maceration and new villages",
  sources: [["Ministry of Agriculture copy of revision 2 (2024)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/arlanza_2024_10_29.pdf"]],
  facts: [["Zone", "South-west Burgos and south-east Palencia, including Lerma, Covarrubias, Santo Domingo de Silos, Baltanás and Palenzuela"], ["Grapes", "Red: Tinta del País (Tempranillo), Garnacha Tinta, Mencía, Cabernet Sauvignon, Merlot, Petit Verdot; white: Albillo Mayor and Viura only"], ["Blends", "Red at least 75% of the listed reds; rosé at least 50% red grapes"], ["Minimum alcohol", "White 10.5%; rosé 11%; young and carbonic-maceration red 11.5%; aged red 12%; overripe red 15% total"], ["Yields", "White 10,000 kg/ha (72 hl/ha); red 7,000 kg/ha (50.4 hl/ha); at most 72 l per 100 kg"], ["Overripe-grape wine", "From grapes dried on the vine or after picking, at least 45 g/l residual sugar, no fortification"], ["Vino de hielo", "Grapes picked frozen (about -2 to -7°C) and pressed frozen, with no added sugar or alcohol"], ["Place terms", "Vino de Pueblo (85% from the village, yields cut 20%); Vino de Villa (100% from Lerma, Covarrubias or Santa María del Campo)"]],
  place: "Vineyards between 750 and 1,200 m on terraces and slopes of the Arlanza and Arlanzón valleys and the Cerrato páramos, among the highest in the Duero basin. The climate is continental with 450 to 500 mm of rain and a three-month dry spell; harvest traditionally falls in the second week of October.",
  rules: "The 2026 revision made Arlanza one of the few Spanish DOs to define an ice wine and a dried-grape sweet red. The village terms reward smaller yields.",
  history: "Benedictine monks at San Pedro de Arlanza made wine here for centuries; Count Fernán González, founder of Castile, was buried at the monastery before being moved to Covarrubias. The DO grew out of a Vino de la Tierra group and was recognised in 2007.",
  glass: "Medium-bodied Tempranillo with bright red and black fruit, fresh acidity and moderate alcohol.",
  exam: "High Tempranillo (750 to 1,200 m) between Ribera and Burgos; Lerma and Covarrubias; whites only Albillo Mayor and Viura.",
  producers: ["Sabinares", "Buezo", "Lerma"]
});
APXF["es-leon"] = cl({
  lede: "The plains south of León, around Valencia de Don Juan and Valdevimbre, home of Prieto Picudo and Albarín Blanco. Known first for fresh, slightly prickly rosado made by the madreo method.",
  cat: "DO (DOP), red, rosé, white, semi-sweet and sweet", rec: "DO 2007 as Tierra de León (Orden AYG/1263/2007, 11 July); renamed León in 2014",
  src: ["Pliego de condiciones DOP León, revision 3 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+LEON_rev+3.pdf/b43a186c-40b7-7efc-7536-10738608c5b3"],
  amended: "Revision 3 (February 2023)",
  facts: [["Zone", "88 municipalities, 69 in southern León and 19 in Valladolid; seat at Valencia de Don Juan; includes Gordoncillo, Sahagún, Valderas, Valdevimbre"], ["Red grapes", "Prieto Picudo, Mencía, Negro Saurí (main); Tempranillo, Garnacha Tinta"], ["White grapes", "Verdejo, Albarín Blanco, Godello"], ["Blends", "Reds and rosés at least 60% of the main reds"], ["Minimum alcohol", "White 10.5%; rosé 11%; young red 11.5%; aged red 12%; sweet styles 9%"], ["Yields", "Whites 7,000 kg/ha bush-trained, 10,000 trellised; reds 6,000 and 8,000; at most 74 l per 100 kg"], ["Madreo", "Traditional rosado method: 5 to 10% whole bunches of Prieto Picudo added during fermentation for colour, body and natural CO2"]],
  place: "About 3,317 km² of plains and low terraces, all below 900 m, on rañas, alluvial terraces and loam-clay soils poor in organic matter. A cool Mediterranean climate with about 500 mm of rain and 2,700 hours of sun lets vines grow without irrigation.",
  rules: "The DO is built on its native grapes: at least 60% Prieto Picudo, Mencía or Negro Saurí in reds and rosés, and only Verdejo, Albarín Blanco and Godello in whites.",
  history: "Growers here dug cuevas, underground cellars, to make rosado; the wine association formed in 1997, picked the name Tierra de León in 2002 and won DO status in 2007.",
  glass: "Prieto Picudo: dark, with blackberry, violet, black pepper and fresh acidity; madreo rosado is bright, fruity and faintly spritzy. Albarín: floral, citrus, high acid.",
  exam: "Prieto Picudo and Albarín Blanco; madreo rosado; Valencia de Don Juan; renamed from Tierra de León in 2014.",
  producers: ["Bodegas Margón", "Leyenda del Páramo", "Gordonzello"]
});
APXF["es-arribes"] = cl({
  lede: "Steep granite and slate terraces in the Duero gorge along the Portuguese border, across from the Douro Superior, where a sheltered canyon climate grows Juan García, Rufete and Bruñal.",
  cat: "DO (DOP), red, rosé, white and orange wine", rec: "DO 2007 (Orden AYG/1264/2007, 11 July)",
  src: ["Pliego de condiciones DOP Arribes, revision 4.2 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+ARRIBES+Rev+4.2.pdf/8e184668-8b8c-5dd0-e6a3-9adab025a028"],
  amended: "Revision 4 (filed April 2026, approved 1 June 2026): adds orange wine",
  facts: [["Zone", "20 municipalities in Salamanca and 25 in Zamora, plus parts of Almaraz de Duero and Muelas del Pan"], ["Red grapes", "Juan García, Rufete, Tempranillo, Garnacha Tinta, Mencía, Bruñal (Albarín Tinto), Syrah, Bastardillo Chico, Tinta Jeromo, Mandón, Gajo Arroba"], ["White grapes", "Malvasía Castellana (Doña Blanca), Verdejo, Albillo Real, Albillo Mayor, Puesta en Cruz, Tijonera"], ["Blends", "Reds at least 85% of the listed reds; whites, orange wines and rosés at least 95% listed grapes"], ["Minimum alcohol", "11% for all types except aged reds, 12%"], ["Yields", "Red 7,000 kg/ha (50.4 hl/ha); white 10,000 kg/ha (72 hl/ha); at most 72 l per 100 kg"], ["Labels", "Roble (at least 3 months in oak); fermentado en barrica (barrels up to 600 l, at least 3 months); vino naranja"]],
  place: "The plateau at about 700 m drops in a few kilometres to 130 m at the river. Soils are mostly granite with some slate, acidic (pH 5 to 6). Rainfall is 575 to 800 mm, sun about 2,680 hours, and the canyon bottoms are frost-free, with olives and almonds beside the vines.",
  rules: "Arribes is one of the few Spanish DOs with a defined orange wine (skin-fermented white), added in 2026.",
  history: "The terraces were built by hand over centuries and partly abandoned in the 20th century; the area's wine association led to the 2007 DO. Bruñal is the same grape as Portugal's Alfrocheiro.",
  glass: "Juan García: light-to-medium red, red cherry, black pepper, herbs, fresh acidity; Bruñal: darker and more structured.",
  exam: "Juan García; Duero gorge facing Portugal's Douro; granite terraces; orange wine since 2026.",
  producers: ["La Setera", "Ocellum Durii", "Almaroja", "Bodegas Las Gavias"]
});
APXF["es-tierra-del-vino-de-zamora"] = cl({
  lede: "The historic 'Land of Wine' south of Zamora, between Toro and Salamanca, with some of the oldest bush vines in Spain, many never grafted.",
  cat: "DO (DOP), red, rosé, clarete and white", rec: "DO 2007 (Orden AYG/782/2007, 24 April)",
  src: ["Pliego de condiciones DOP Tierra del Vino de Zamora, revision 1.2 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PLIEGO+DE+CONDICIONES+DO+TVZ+ITACYL+rev.1.2.pdf/88f14b4b-ec26-32b1-2538-cb5c0d26094a"],
  amended: "Revision 1 (filed June 2026, approved 18 June 2026): analytics, tasting descriptors, aged whites, rosés and claretes",
  facts: [["Zone", "46 municipalities in south-east Zamora (including Zamora city, Corrales del Vino, Fuentesaúco, Moraleja del Vino) and 10 in north-east Salamanca"], ["Grapes", "Tempranillo (Tinto Fino, Tinta del País), Garnacha Tinta, Cabernet Sauvignon; Malvasía Castellana (Doña Blanca), Moscatel de grano menudo, Verdejo, Godello, Albillo Real, Palomino"], ["Blends", "Red at least 75% red grapes; rosé at least 60%; clarete at least 30%"], ["Minimum alcohol", "White 11%; rosé and clarete 12%; red 12.5%"], ["Yields", "White 10,000 kg/ha (72 hl/ha); red 7,000 kg/ha (50.4 hl/ha); at most 72 l per 100 kg"], ["Labels", "Vino de Pueblo (85% from the municipality or named locality); roble; fermentado en barrica"]],
  place: "Gentle land in the Duero basin at an average 750 m, on clay subsoils with sandier tops. The vineyard averages 65 years old and many parcels pass 100, because phylloxera barely touched the area; two-thirds are bush vines averaging 75 years.",
  rules: "The 2026 revision recognises aged whites, rosés and claretes and village wines named after a single municipality or locality.",
  history: "The district has been called Tierra del Vino since the Middle Ages. It became a DO in 2007 after a period as Vino de la Tierra.",
  glass: "Tempranillo with ripe dark fruit and spice, fresher and less massive than Toro; Malvasía whites are textured and nutty.",
  exam: "Ungrafted old vines; Tempranillo and Malvasía; between Toro and Salamanca.",
  producers: ["Viñas del Cénit", "Bodegas El Soto"]
});
APXF["es-cebreros"] = cl({
  lede: "Old bush-vine Garnacha and Albillo Real on the northern slopes of the Sierra de Gredos in Ávila, part of the Gredos Garnacha revival.",
  cat: "Vino de Calidad con Indicación Geográfica (DOP), red, rosé and white", rec: "Application 2015, approved by Castilla y León 2016; EU registration 2019",
  src: ["Pliego de condiciones DOP Cebreros, revision 2 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+CEBREROS_Rev+2+%281%29.pdf/a64c5e82-8b93-03b8-6a49-f9fa3bf78fc3"],
  amended: "Revision 2, in force 10 July 2024",
  facts: [["Zone", "35 municipalities in south-east Ávila (1,663 km²), including Cebreros, El Tiemblo, La Adrada, Villanueva de Ávila and Villarejo del Valle"], ["Red and rosé", "At least 95% Garnacha Tinta; Garnacha Tintorera and Tempranillo as secondary grapes"], ["White", "Albillo Real only"], ["Minimum alcohol", "Red 13%; white and rosé 12%"], ["Yields", "8,000 kg/ha (56 hl/ha); at most 70 l per 100 kg"], ["Ageing", "In oak, counted from 1 November; fermentado en barrica allowed"]],
  place: "The Sistema Central between the Alberche and Tiétar valleys, with vineyards above 1,000 m in places. Soils derive mostly from granite, sandy-loam and poor; the climate is Mediterranean with continental influence, 400 to 800 mm of rain. 94% of the vines are over 50 years old and 37% over 80.",
  rules: "Cebreros is essentially a Garnacha appellation: 95% minimum in reds and rosés, and the 13% minimum for reds is among Spain's highest.",
  history: "Cebreros long sold bulk Garnacha to Madrid's taverns. From the 2000s, producers such as Rafael Mancebo, Daniel Landi and the Comando G team made fine, perfumed Garnacha from its old vines.",
  glass: "Pale-to-medium red; raspberry, red cherry, rosemary, crushed granite; fine tannin and freshness.",
  exam: "Gredos Garnacha (95% minimum) and Albillo Real; Ávila; granite; Vino de Calidad.",
  producers: ["Bodega Garnacha Alto Alberche", "Daniel Landi", "Rafael Mancebo"]
});
APXF["es-sierra-de-salamanca"] = cl({
  lede: "Terraced slate and granite slopes in the Sierra de Francia south of Salamanca, where very old Rufete vines make light, fragrant reds.",
  cat: "Vino de Calidad con Indicación Geográfica (DOP), red, rosé and white", rec: "Vino de la Tierra 1994; Vino de Calidad 2010 (Orden AYG/806/2010, 20 May)",
  src: ["Pliego de condiciones DOP Sierra de Salamanca, revision 2.3 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+SSalamanca+Rev+2.3.pdf/d6eae069-98d5-8bad-ab26-857709321690"],
  amended: "Revision 2 (filed April 2026, approved 1 June 2026): control body and legal references",
  facts: [["Zone", "26 municipalities in southern Salamanca (482 km²), including Mogarraz, Miranda del Castañar, San Esteban de la Sierra, Sotoserrano and Sequeros"], ["Red grapes", "Rufete, Garnacha Tinta, Tempranillo"], ["White grapes", "Viura, Moscatel de grano menudo, Palomino, Rufete Serrano Blanco"], ["Rosé", "At least 70% red grapes"], ["Minimum alcohol", "White, rosé and young red 11%; barrel-aged red 12%"], ["Yields", "Red 7,000 kg/ha (50.4 hl/ha); white 9,000 kg/ha (64.8 hl/ha); at most 72 l per 100 kg"], ["Village wines", "A municipality may be named if 85% of the grapes come from it"]],
  place: "Steep, often terraced slopes on granite (fine sand and silt) and slate (coarse sand), with over 1,000 mm of rain in autumn and spring and long hot summers. Half the parcels are more than 80 years old and 80% are more than 50.",
  rules: "The appellation is built around Rufete, which the rules treat as native and prize for its very old vines.",
  history: "Growers here have terraced the best-exposed slopes for centuries. The district gained Vino de la Tierra status in 1994 and Vino de Calidad status in 2010.",
  glass: "Rufete: pale ruby, red cherry, pomegranate, dried herbs, a light, Pinot-like frame and lifted acidity.",
  exam: "Rufete; Sierra de Francia terraces; Mogarraz; Vino de Calidad.",
  producers: ["Bodega La Zorra", "Cámbrico"]
});
APXF["es-valles-de-benavente"] = cl({
  lede: "A small Vino de Calidad around Benavente in northern Zamora, where the Esla, Tera, Órbigo and Eria rivers meet, focused on Prieto Picudo and Tempranillo.",
  cat: "Vino de Calidad con Indicación Geográfica (DOP), red, rosé and white", rec: "Vino de la Tierra 2000; Vino de Calidad 2004 (Orden AYG/1942/2004, 22 December)",
  src: ["Pliego de condiciones DOP Valles de Benavente, revision 0 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+VALLES+DE+BENAVENTE_FINAL+%28Rev.+0%29+%281%29.pdf/717509e4-898d-e4e5-4f9f-5b71bc34d53c"],
  amended: "Original text sent to the European Commission in November 2011, unchanged since",
  facts: [["Zone", "62 municipalities in north-east Zamora (1,520 km²) in the Esla, Tera, Órbigo and Eria valleys"], ["Red grapes", "Prieto Picudo, Tempranillo, Mencía (main); Garnacha Tinta, Cabernet Sauvignon"], ["White grapes", "Verdejo, Malvasía Castellana (Doña Blanca)"], ["Blends", "Red at least 75% main reds; rosé at least 35% main reds and at most 30% white grapes"], ["Minimum alcohol", "White and rosé 11%; young red 11.5%; aged red 12%"], ["Yields", "Red 7,000 kg/ha (50.4 hl/ha); white 9,000 kg/ha (64.8 hl/ha); at most 72 l per 100 kg"]],
  place: "Gently rolling land where the León páramo meets the Tierra de Campos, around 740 m at Benavente. Soils are brown and limy, sandy-loam, pH 7 to 8. The climate is extreme continental and dry, 350 to 550 mm of rain, with very cold, foggy winters.",
  rules: "Prieto Picudo, Tempranillo and Mencía must make up three-quarters of any red.",
  history: "Benavente's wines appear in medieval town ordinances, and the French traveller Jouvin called them 'très excellens' in 1672. Growers formed an association in 1997, gaining Vino de la Tierra (2000) and then Vino de Calidad (2004) status.",
  glass: "Prieto Picudo reds and rosés: dark berry fruit, pepper, fresh acidity.",
  exam: "Prieto Picudo; northern Zamora; one of Castilla y León's Vinos de Calidad.",
  producers: []
});
APXF["es-valtiendas"] = cl({
  lede: "A tiny, high Vino de Calidad in northern Segovia along the Duratón gorge, just south of Ribera del Duero, making Tempranillo reds and rosés.",
  cat: "Vino de Calidad con Indicación Geográfica (DOP), red and rosé", rec: "Vino de Calidad 2007 (Orden AYG/309/2007, 21 February)",
  src: ["Pliego de condiciones DOP Valtiendas, revision 2 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+VALTIENDAS+Rev+2+en+vigor+%282%29.pdf/2037cb2f-e138-0d09-342a-765995b87f16"],
  amended: "Revision 2 (approved December 2016, published by the EU July 2019)",
  facts: [["Zone", "16 municipalities in northern Segovia (433 km²), including Valtiendas, Sacramenia, Fuentidueña and Cuevas de Provanco"], ["Grapes", "Tempranillo (main), Garnacha Tinta, Cabernet Sauvignon, Merlot, Syrah; white Albillo Mayor"], ["Blends", "Red and rosé at least 50% Tempranillo"], ["Minimum alcohol", "Rosé 11%; young red 11.5%; crianza, reserva and gran reserva 12%"], ["Yields", "Red 7,000 kg/ha (50.4 hl/ha); white 10,000 kg/ha (72 hl/ha); at most 72 l per 100 kg"]],
  place: "Páramo and valley land above 800 m, with 400 to 500 mm of rain and a strongly continental climate. The villages line the Duratón gorge, a natural park known for griffon vultures.",
  rules: "Tempranillo needs only a 50% share, lower than in neighbouring Ribera (75%).",
  history: "The area was listed as a wine district in national rules of 1979 and 1988, and its growers won Vino de Calidad status in 2007.",
  glass: "Fresh, mid-weight Tempranillo with red and black fruit and high acidity from altitude.",
  exam: "Segovia; Duratón gorge; Tempranillo at 50% minimum; Vino de Calidad.",
  producers: []
});
APXF["es-abadia-retuerta"] = cl({
  lede: "A single-estate Vino de Pago around the 12th-century abbey of Santa María de Retuerta at Sardón de Duero, just west of the Ribera del Duero boundary.",
  cat: "Vino de Pago (DOP), red and white", rec: "Applied 2014; EU registration 2022",
  src: ["Pliego de condiciones DOP Abadía Retuerta, version 2 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+VP+Abadia+Retuerta_v2.pdf/4ffcc3a9-7864-03c0-1283-3bb5415356f7"],
  amended: "Revision 2 (filed July 2025, approved August 2026): tasting rules, new red grapes and sustainability requirements",
  facts: [["Zone", "560.49 ha of named parcels in Sardón de Duero (Valladolid)"], ["Red grapes", "Tempranillo, Cabernet Sauvignon, Syrah, Merlot, Garnacha, Graciano, Malbec, Cabernet Franc, Pinot Noir, Petit Verdot, Hondarrabi Beltza, Mencía, Prieto Picudo, Touriga Nacional"], ["White grapes", "Sauvignon Blanc, Gewürztraminer, Riesling, Godello, Albillo Mayor, Verdejo"], ["Minimum alcohol", "12% red and white"], ["Yields", "8,000 kg/ha (60 hl/ha); at most 75 l per 100 kg"], ["Ageing", "Single-variety red at least 12 months in oak; blended red at least 6 months; white in steel or at least 3 months in oak"], ["Winemaking", "Native yeasts (and native bacteria for reds); gravity-flow cellar"]],
  place: "A continuous block of land on the Duero's south bank, about 450 mm of rain and a mean of about 10.7°C, with sandy covers over varied soils and pine woods that give the wines a balsamic, herbal note, according to the rules.",
  rules: "As a pago, every step from vineyard to bottle happens on the estate. The 2026 revision widened the red list to 14 grapes, including Touriga Nacional and Hondarrabi Beltza.",
  history: "Doña Mayor, daughter of Count Pedro Ansúrez, founder of Valladolid, founded the abbey in 1146. The estate's modern wines date from the 1996 vintage and were sold as Vino de la Tierra de Castilla y León until the pago was registered in 2022.",
  glass: "Polished reds with ripe black fruit, herbs (thyme, lavender, cistus) and fine-grained tannin.",
  exam: "Vino de Pago next to Ribera but outside it; Sardón de Duero; 12th-century abbey.",
  producers: ["Abadía Retuerta"]
});
APXF["es-dehesa-penalba"] = cl({
  lede: "A single-estate Vino de Pago at Villabáñez, on the south bank of the Duero east of Valladolid, named after the abandoned village of Peñalba de Duero.",
  cat: "Vino de Pago (DOP), red and rosé", rec: "Applied 2015; approved by Castilla y León 2019; EU registration 2022",
  src: ["Pliego de condiciones DOP Dehesa Peñalba, revision 2.2 (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/Pliego+de+condiciones+Dehesa+Pe%C3%B1alba_rev+2.2.pdf/6cf1fd95-ec55-0a0c-73c7-41a1dd1bb4bd"],
  amended: "Revision 2 (filed June 2026, approved August 2026): rosé yields and updated link to the area",
  facts: [["Zone", "91.43 ha of parcels in Villabáñez (Valladolid); wines made in the estate winery"], ["Grapes", "Tempranillo, Cabernet Sauvignon, Merlot, Syrah"], ["Minimum alcohol", "Red 12.5%; rosé 12%"], ["Yields", "Young red and rosé 8,000 kg/ha (57.6 hl/ha); aged red and rosé 6,000 kg/ha (43.2 hl/ha); at most 72 l per 100 kg"], ["Ageing", "Oak barrels of 225 to 600 l and/or wooden vats of up to 5,500 l"]],
  place: "A low-slope campiña (under 5% gradient) set apart from the steeper surrounding land, with soils that the rules describe as distinct from those to the west.",
  rules: "Yields drop by a quarter for wines meant for ageing; rosé rules were added in 2022 and rosé yields in 2026.",
  history: "Peñalba de Duero appears in old land records of the Valladolid district; 'Dehesa' here is the place name, not a reference to pasture.",
  glass: "Ripe red and black fruit, sweet spice from oak, warm Duero-valley frame.",
  exam: "Vino de Pago in Valladolid; four red grapes; registered 2022.",
  producers: ["Bodegas Vizar"]
});
APXF["es-uruena"] = cl({
  lede: "A single-estate Vino de Pago just north of the walled town of Urueña in western Valladolid, made only by Heredad de Urueña.",
  cat: "Vino de Pago (DOP), red and rosé", rec: "Applied 2015; EU registration 2021",
  src: ["Pliego de condiciones DOP Urueña, version in force (ITACYL copy)", "https://www.itacyl.es/documents/20143/342640/PCC+DOP+URUE%C3%91A_en+vigor.pdf/e3569dbe-e269-2292-6c7f-ffa7f20b5efd"],
  amended: "Revision 1 (December 2021, correction of an error in the parcel list)",
  facts: [["Zone", "78 ha of named parcels in Urueña (Valladolid); wines made in the estate winery"], ["Grapes", "Tempranillo (Tinta del País, Tinta de Toro), Cabernet Sauvignon, Merlot, Syrah"], ["Minimum alcohol", "Red 13%; rosé 12.5%"], ["Yields", "8,000 kg/ha (56 hl/ha); at most 70 l per 100 kg; only vertical hydraulic or pneumatic presses"], ["Ageing", "French and American oak barrels"]],
  place: "A plateau edge at 710 to 720 m with about 410 mm of rain and four dry months (June to September), on soils low in organic matter.",
  rules: "Its 13% minimum for reds is higher than any of the surrounding DOs.",
  history: "Syrah, Cabernet Sauvignon and Merlot make up about three-quarters of the estate, which the rules contrast with Verdejo-dominated Rueda next door.",
  glass: "Dense, ripe reds with dark fruit, spice and oak.",
  exam: "Vino de Pago; Urueña, Spain's 'book town'; Heredad de Urueña.",
  producers: ["Heredad de Urueña"]
});
