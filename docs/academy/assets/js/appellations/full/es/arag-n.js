// Full encyclopedia entries: Aragón. Written from the pliegos de condiciones published by the Government of Aragón and the Ministry of Agriculture, checked 14 November 2026.
function ar(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-carinena"] = ar({
  lede: "One of Spain's oldest wine regions, on the stony plateau south-west of Zaragoza, long a source of bulk Garnacha and now of old-vine Garnacha and Cariñena (the grape takes its name from the town).",
  cat: "DO (DOP), red, rosé, white, quality sparkling, semi-sparkling, liqueur wine and overripe-grape wines (vendimia tardía, naturalmente dulce)", rec: "DO 1932, among the first in Spain",
  src: ["Pliego de condiciones DOP Cariñena, approved September 2025 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/carinena_2025_10_07.pdf"],
  amended: "Orden AGA/1228/2025 of 10 September 2025 (BOA 25 September 2025)",
  facts: [["Zone", "16 municipalities in Zaragoza, including Cariñena, Longares, Almonacid de la Sierra and Villanueva de Huerva"], ["Main red grapes", "Garnacha Tinta, Cariñena (Mazuela), Tempranillo, Cabernet Sauvignon, Merlot, Syrah; also Juan Ibáñez, Monastrell, Vidadillo"], ["Main white grapes", "Macabeo, Garnacha Blanca, Chardonnay; also Cariñena Blanca, Moscatel de Alejandría, Parellada, Sauvignon Blanc, Verdejo"], ["Minimum alcohol", "Still wines 9%; sparkling 10%; overripe-grape wines 13%; liqueur wines 15 to 22% total"], ["Yields", "Red 8,500 kg/ha (62.9 hl/ha); white 9,000 kg/ha (66.6 hl/ha); at most 74 l per 100 kg"], ["Mentions", "Superior (at least 85% of one main grape); Viñas Viejas (vines over 20 years); Vendimia Seleccionada (under 7,000 kg/ha)"], ["Oak", "Roble and barrica: whites and rosés at least 30 days, reds 60 days in oak"]],
  place: "A plateau at 400 to 800 m between the Jalón and Huerva rivers and the Sierra de Algairén, with stony cascajo soils, red clays and limestone. The climate is continental and semi-arid (about 350 to 540 mm of rain), with cold winters, hot summers and the dry cierzo wind.",
  rules: "Cariñena has very low alcohol minimums on paper; quality tiers are expressed through Superior, Viñas Viejas and Vendimia Seleccionada.",
  history: "Cariñena's wine was known in the Middle Ages, and the town gave its name to the Carignan grape. Its wine station opened in 1932, the year the first Spanish DOs were created.",
  glass: "Old-vine Garnacha: ripe red fruit, herbs and warmth; Cariñena adds acidity, colour and black fruit.",
  exam: "One of Spain's first DOs (1932); the town that named Carignan; cierzo wind; Viñas Viejas over 20 years.",
  producers: ["Bodegas San Valero", "Grandes Vinos", "Bodegas Paniza", "Bodega Pirineos"]
});
APXF["es-campo-de-borja"] = ar({
  lede: "Self-styled 'Empire of Garnacha', on the slopes of the Moncayo north-west of Zaragoza, known for generous, good-value Garnacha and a few old-vine icons.",
  cat: "DO (DOP), red, rosé, white, liqueur wine and quality sparkling", rec: "Regulation 1978; DO 1980",
  src: ["Pliego de condiciones DOP Campo de Borja, amendment AM04 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/campo_de_borja_2024_12_13.pdf"],
  amended: "Amendment AM04, published by the Ministry in December 2024",
  facts: [["Zone", "16 municipalities in Zaragoza (Agón, Ainzón, Alberite, Albeta, Ambel, Bisimbre, Borja, Bulbuente, Bureta, El Buste, Fuendejalón, Magallón, Maleján, Pozuelo de Aragón, Tabuenca, Vera de Moncayo) plus parts of Mallén and Fréscano"], ["Red grapes", "Garnacha Tinta, Mazuela, Tempranillo, Cabernet Sauvignon, Merlot, Syrah, Garnacha Tintorera, Caladoc, Marselan"], ["White grapes", "Macabeo, Chardonnay, Moscatel de grano menudo, Moscatel de Alejandría, Garnacha Blanca, Sauvignon Blanc, Verdejo, Viognier"], ["Minimum alcohol", "White and rosé 10%; red 11%; sweet and late-harvest 13%; sparkling 10%; liqueur wines 15 to 22%"], ["Yields", "Red 8,000 kg/ha (59.2 hl/ha); white 10,000 kg/ha (74 hl/ha); at most 74 l per 100 kg; 1,500 to 4,000 vines/ha"], ["Garnachas Históricas", "Varietal Garnacha Tinta from vines at least 35 years old"], ["Oak and ageing", "Roble: whites over 45 days, reds over 90 days in barrels of 600 l; barrel time counted from 1 December; sparkling at least 9 months on lees; liqueur wines at least 24 months with 18 in oak"]],
  place: "Three altitude bands, from 350 m on the Ebro side to 700 m and more toward the Moncayo, on brown limestone and terrace soils, with ferrous red clays on the higher slopes. The cierzo is cold and dry; rainfall is about 350 mm low down, 450 mm higher.",
  rules: "'Garnachas Históricas' is the DO's old-vine mention, reserved for single-variety Garnacha from vines 35 years or older.",
  history: "The Cistercian monastery of Veruela, founded in the 12th century at the foot of the Moncayo, spread the vine here. Cooperatives such as Borsao, founded in the 1950s, built export success from the 1990s.",
  glass: "Ripe strawberry, raspberry, plum, garrigue and spice; old vines add concentration and mineral grip.",
  exam: "'Empire of Garnacha'; Moncayo; Garnachas Históricas (35-year vines); Veruela monastery; Borsao, Alto Moncayo.",
  producers: ["Bodegas Borsao", "Alto Moncayo", "Bodegas Aragonesas", "Bodegas Ruberte"]
});
APXF["es-calatayud"] = ar({
  lede: "High, rugged country around the Roman town of Bilbilis, with old Garnacha on slate and quartzite slopes and a dedicated old-vine tier, Calatayud Superior.",
  cat: "DO (DOP), red, rosé, white, liqueur wine, quality sparkling, semi-sparkling and overripe-grape wine", rec: "DO 1990",
  src: ["Pliego de condiciones DOP Calatayud, approved January 2024 (Government of Aragón)", "https://www.aragon.es/documents/d/guest/pliego_condiciones_dop_calatayud"],
  amended: "Orden AGA/43/2024 of 10 January 2024 (amendment AM03)",
  sources: [["Government of Aragón: DOP Calatayud", "https://www.aragon.es/-/denominacion-origen-protegida-calatayud"]],
  facts: [["Zone", "51 municipalities in western Zaragoza province, in the Jalón and Jiloca valleys"], ["Red grapes", "Garnacha Tinta, Tempranillo, Bobal, Mazuela, Monastrell, Syrah, Cabernet Sauvignon and others"], ["White grapes", "Garnacha Blanca, Macabeo, Malvasía, Moscatel de Alejandría, Sauvignon Blanc and others"], ["Minimum alcohol", "White 10.5%; rosé 11%; red 12.5%; Calatayud Superior 14%; overripe-grape wines 13.5%; liqueur wines 15 to 22%"], ["Yields", "Red 7,000 kg/ha (49 hl/ha); white 8,000 kg/ha (56 hl/ha); at most 70 l per 100 kg"], ["Calatayud Superior", "At least 85% Garnacha Tinta from vines over 50 years, averaging no more than 3,500 kg/ha, hand-harvested into boxes, at least 6 months in barrel and 10 months before release"], ["Viñas Viejas", "Vines over 35 years, at most 4,500 kg/ha"], ["Oak", "Roble: whites over 45 days, reds over 90 days in 600 l oak"]],
  place: "A tectonic basin ringed by mountains of quartzite and slate, with softer limestones, marls and gypsum in the centre. Red-brown soils over slate and quartzite on the margins give the best Garnacha; altitude rises from the valley floor to the basin edges, giving cool nights.",
  rules: "Calatayud Superior is one of Spain's strictest old-vine designations: 50-year vines and a 3,500 kg/ha average.",
  history: "The Roman poet Martial, born at Bilbilis by Calatayud in the 1st century, wrote about the area. Long a cooperative, bulk-wine zone, it gained its DO in 1990 and became a source of old-vine Garnacha for export brands.",
  glass: "Garnacha with intense red and black fruit, violets, herbs and a mineral, fresh line from altitude.",
  exam: "Old-vine Garnacha; Calatayud Superior (85% Garnacha, vines over 50 years, 14%); Martial and Bilbilis.",
  producers: ["El Escocés Volante", "Bodegas Ateca", "San Alejandro", "Bodegas Breca"]
});
APXF["es-somontano"] = ar({
  lede: "The foothills of the Pyrenees around Barbastro in Huesca, Aragón's most modern DO, mixing local Moristel and Parraleta with Chardonnay, Gewürztraminer and Cabernet.",
  cat: "DO (DOP), white, rosé, red, quality sparkling, liqueur wine, naturally sweet and late-harvest wines", rec: "DO 1984",
  src: ["Pliego de condiciones DOP Somontano, 2012 (Government of Aragón)", "https://www.aragon.es/documents/d/guest/2012_pliego_condiciones_dop_somontano"],
  amended: "Orden of 2 August 2012 (BOA 23 August 2012); an amendment (AM01-2026) is in progress",
  sources: [["Government of Aragón: DOP Somontano and the 2026 amendment", "https://www.aragon.es/-/denominacion-origen-protegida-somontano"]],
  facts: [["Red grapes", "Cabernet Sauvignon, Garnacha Tinta, Merlot, Moristel, Parraleta, Pinot Noir, Syrah, Tempranillo"], ["White grapes", "Alcañón, Chardonnay, Garnacha Blanca, Gewürztraminer, Macabeo, Riesling, Sauvignon Blanc"], ["Minimum alcohol", "White 10%; rosé 11%; red 11.5%; naturally sweet and late harvest 13% actual, over 15% potential; sparkling 10%; liqueur wines 15 to 22%"], ["Yields", "Red 8,000 kg/ha (56 hl/ha); white 9,000 kg/ha (63 hl/ha); at most 70 l per 100 kg"], ["Sparkling", "At least 9 months from tirage to disgorging"], ["Liqueur wines", "Aged wines at least 24 months with 18 in oak"]],
  place: "The Somontano ('below the mountain') of Huesca and Barbastro, split by the Alcanadre river, between the Pyrenean ranges of Sobrarbe and Ribagorza and the Monegros desert to the south. Calcisol and gypsisol soils; rainfall falls from 800 mm in the hills to 400 mm in the south, about 500 mm on average, with wide day-night swings in August and September.",
  rules: "Few Spanish DOs embrace so many international grapes; the native Moristel and Parraleta and the white Alcañón give it local character.",
  history: "Vines were grown here before the Romans, and monasteries kept them going. In the 1960s the comarca cooperative revived production; the DO (1984) and investments by Viñas del Vero, Enate and Pirineos made it the showcase of modern Aragón.",
  glass: "Fresh, aromatic whites (Gewürztraminer, Chardonnay); balanced reds from Cabernet, Merlot and Tempranillo; Moristel is light and fruity.",
  exam: "Pyrenean foothills, Barbastro; Moristel, Parraleta, Alcañón; Enate, Viñas del Vero.",
  producers: ["Enate", "Viñas del Vero", "Blecua", "Pirineos", "Lalanne"]
});
APXF["es-ayles"] = ar({
  lede: "A single-estate Vino de Pago on a 2,700-hectare farm at Mezalocha, south of Zaragoza, inside the Cariñena area.",
  cat: "Vino de Pago (DOP), red, rosé and white", rec: "Vino de Pago 2010 (EU registration 2011)",
  src: ["Pliego de condiciones Aylés, approved October 2025 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/ayles_2025_11_11.pdf"],
  amended: "Orden AGA/1399/2025 of 10 October 2025 (BOA 28 October 2025)",
  facts: [["Zone", "Named parcels in polygons 16 and 19 of Mezalocha (Zaragoza), on a 2,703 ha farm"], ["Grapes", "Garnacha Tinta, Tempranillo, Cabernet Sauvignon, Syrah, Merlot; Chardonnay"], ["Minimum alcohol", "White and rosé 11.5%; red 12%"], ["Yields", "8,000 kg/ha (56 hl/ha); at most 70 l per 100 kg"], ["Ageing", "Whites and rosés at least 30 days in oak, reds 60 days; the 'Tres de 3000' wine at least 12 months"]],
  place: "Gentle slopes (1 to 4%) on limestone, marl and conglomerate in the Huerva sub-basin, with 350 to 550 mm of rain and a mean of 13 to 15°C.",
  rules: "As a pago, the estate must grow, make and bottle its wine.",
  history: "Aylés is a historic estate on the Huerva; it was recognised as Aragón's first Vino de Pago in 2010.",
  glass: "Ripe Garnacha and Tempranillo-led reds with Mediterranean herbs.",
  exam: "Aragón's first Vino de Pago (Mezalocha, Huerva valley).",
  producers: ["Pago Aylés"]
});
APXF["es-urbezo"] = ar({
  lede: "A small organic single-estate Vino de Pago in the municipality of Cariñena, registered by the EU in October 2024.",
  cat: "Vino de Pago (DOP), red, rosé and white", rec: "EU registration October 2024 (Implementing Regulation 2024/2742)",
  src: ["Pliego de condiciones DOP Urbezo (Government of Aragón)", "https://www.aragon.es/documents/d/guest/pliego_condiciones_dop_urbezo_rgto_ejecucion_2024-2742"],
  amended: "Text registered by the EU on 25 October 2024",
  sources: [["Government of Aragón: DOP Urbezo", "https://www.aragon.es/-/denominacion-origen-protegida-urbezo"]],
  facts: [["Zone", "Cadastral polygon 35 of Cariñena (Zaragoza), between Alfamén, Cosuenda and Longares"], ["Grapes", "Garnacha Tinta, Cabernet Sauvignon, Mazuela, Merlot, Syrah, Tempranillo; Chardonnay, Garnacha Blanca, Moscatel de Alejandría"], ["Organic", "Vineyards farmed and wines made organically"], ["Minimum alcohol", "White and rosé 12.5%; red 13%"], ["Yields", "Red 8,000 kg/ha (56 hl/ha); white 8,500 kg/ha (59.5 hl/ha); at most 70 l per 100 kg"], ["Ageing", "Crianza 24 months with 6 in oak; reserva 36 with 12; gran reserva 60 with 18; barrels of at most 300 l"]],
  place: "Flat land at 460 to 495 m at the foot of the Sierra de Algairén, crossed by the Frasno river, on Pleistocene valley-floor soils derived from raña deposits. Rainfall is about 423 mm against evapotranspiration over 1,000 mm, and the cierzo blows from the Moncayo.",
  rules: "Organic farming is written into the rules, as is the 300 l barrel limit.",
  history: "Growers who owned plots in the area are recorded in Cariñena's archives from 1929; the family estate Solar de Urbezo took the name.",
  glass: "Concentrated Garnacha and blends with ripe dark fruit, spice and fresh acidity.",
  exam: "Organic Vino de Pago in Cariñena; EU 2024.",
  producers: ["Solar de Urbezo"]
});
