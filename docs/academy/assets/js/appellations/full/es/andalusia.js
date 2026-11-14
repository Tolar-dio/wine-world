// Full encyclopedia entries: Andalusia (Jerez and Manzanilla are in sherry-country.js). Written from the pliegos de condiciones (Ministry of Agriculture copies), checked 14 November 2026.
function an(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-montilla-moriles"] = an({
  lede: "Sherry's inland cousin in the province of Córdoba, where Pedro Ximénez ripens so fully that its Fino reaches 15% without fortification, and where the world's richest PX is made from sun-dried grapes.",
  cat: "DO (DOP), Fino, Amontillado, Oloroso, Palo Cortado, Pedro Ximénez, Moscatel, cream styles and still whites", rec: "Protected 1933; Consejo Regulador 1944, first regulation 1945",
  src: ["Pliego de condiciones DOP Montilla-Moriles, amendment of December 2020 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/montilla_moriles_2020_12_03.pdf"],
  amended: "Amendment published in BOJA no. 234, 3 December 2020",
  facts: [["Zone", "Montilla, Moriles, Doña Mencía, Montalbán, Monturque, Puente Genil, Nueva Carteya and parts of ten other municipalities (Córdoba); ageing also in Córdoba city"], ["Superior zones", "Sierra de Montilla and Moriles Altos, on albariza"], ["Grapes", "Pedro Ximénez, Layren (Airén), Baladí, Verdejo, Moscatels, Torrontés, Chardonnay, Sauvignon Blanc, Macabeo"], ["Fino", "14.5 to 17% as an unfortified wine, or 15 to 17% when adjusted; at least 2 years under flor"], ["Amontillado", "16 to 22%; at least 5 years under flor then 3 oxidative"], ["Oloroso and Palo Cortado", "16 to 22%; Oloroso at least 2 years, mainly oxidative"], ["Pedro Ximénez", "At least 95% PX; sun-dried (asoleo) grapes giving must of at least 450 g/l sugar, at most 40 l per 100 kg"], ["Age indications", "Pasado (Fino) at least 10 years; Viejo 15; Viejísimo 25"], ["Yields", "13,714 kg/ha; 70 l per 100 kg (60 for Flor and Yema wines)"]],
  place: "The campiña south of Córdoba at 125 to 600 m, semi-continental and very hot (above 46°C at times) with 3,000 hours of sun. The best vineyards are on albariza chalk in the Sierra de Montilla and Moriles Altos; albero soils elsewhere.",
  rules: "Unlike Jerez, Montilla's Fino and much of its Amontillado and Oloroso can be made without added alcohol, because Pedro Ximénez reaches high natural strength.",
  history: "Montilla's wines were sold for centuries through Jerez; 'Amontillado' means 'in the style of Montilla'. The DO was protected in 1933.",
  glass: "Fino: pale, almond, bread dough, softer than Jerez Fino; PX: ebony, raisin, fig, coffee, syrupy.",
  exam: "Pedro Ximénez; unfortified Fino; Amontillado named after Montilla; asoleo PX.",
  producers: ["Alvear", "Toro Albalá", "Pérez Barquero", "Bodegas Robles", "Bodegas Lagar Blanco"]
});
APXF["es-condado-de-huelva"] = an({
  lede: "Flat country between Seville and Doñana, the source of America-bound wines in the Age of Discovery, now making fresh Zalema whites and sherry-style Condado Pálido and Viejo.",
  cat: "DO (DOP), young white, aged white, Condado Pálido (Fino), Condado Viejo (Oloroso), Amontillado, Palo Cortado, sweet liqueur wines, reds and rosés", rec: "Protected 1932; first regulation 1964",
  src: ["Pliego de condiciones DOP Condado de Huelva, consolidated February 2026 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/condado_de_huelva_2026_07_31.pdf"],
  amended: "Consolidated under the Order of 27 February 2026 (BOJA 5 March 2026)",
  facts: [["Zone", "18 municipalities in Huelva, including Bollullos Par del Condado, La Palma del Condado, Almonte, Moguer, Niebla and Rociana"], ["Main grape", "Zalema; also Palomino Fino, Listán del Condado, Garrido Fino, Moscatels, Pedro Ximénez and others"], ["Red grapes", "Syrah, Tempranillo, Cabernet Sauvignon and Franc, Petit Verdot, Listán Prieto, Mollar Cano, Garnacha, Tintilla de Rota, Merlot"], ["Minimum alcohol", "Young white 10 to 12.5%; Condado Pálido 14 to 17%; Condado Viejo 16 to 22%; sweet liqueur wines 15 to 22%; reds and rosés 11 to 14.5%"], ["Ageing", "Generosos at least 2 years average age in oak up to 1,000 l, solera or añada; sacas at most 40% a year; aged Condado white at least 1 year; raisin PX at least 24 months"], ["Yields", "12,000 kg/ha (Zalema 18,000 kg/ha); at most 70 l per 100 kg"]],
  place: "The lower Guadalquivir plain at 50 to 180 m, Mediterranean with Atlantic touches (about 16°C, 716 to 810 mm of rain), next to the Doñana national park.",
  rules: "Zalema is the backbone of the young whites; generosos follow sherry-like solera rules with a two-year minimum.",
  history: "Columbus sailed from Palos and Moguer in 1492, and Condado wine went to the Americas with the first voyages. The area was protected in 1932; it long supplied wine to Jerez blenders.",
  glass: "Zalema: light, apple, herbs, low acidity when young; Condado Pálido: flor-driven, almond, saline; Viejo: walnut, toffee.",
  exam: "Zalema; Condado Pálido and Viejo; Doñana; Columbus's ports.",
  producers: ["Bodegas Díaz", "Bodegas Iglesias", "Oliveros", "Bodegas Sauci"]
});
APXF["es-malaga"] = an({
  lede: "The legendary sweet wines of Málaga, from Pedro Ximénez and Moscatel, coloured and sweetened with arrope (cooked must) and classified by colour and age, from Pálido to Trasañejo.",
  cat: "DO (DOP), liqueur wines, naturally sweet, sun-dried-grape and overripe-grape wines, dry wines", rec: "Protected 1932; Consejo Regulador 1933, regulation 1935 (published 1937)",
  src: ["Pliego de condiciones DOP Málaga (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/malaga_2019_01_01.pdf"],
  amended: "Version listed by the Ministry as in force (2019)",
  facts: [["Zone", "Municipalities of Málaga province plus Benamejí and Palenciana (Córdoba); areas Axarquía, Montes de Málaga, Manilva, Norte"], ["Grapes", "Pedro Ximénez (Pero Ximén), Moscatel de Alejandría, Moscatel Morisco (preferred); Lairén, Doradilla, Rome"], ["Varietal labels", "Pero Ximén and Moscatel wines 100% of that grape"], ["Vino Dulce Natural", "PX and/or Moscatel, must at least 212 g/l sugar, at least 7% natural alcohol before fortification"], ["Terms", "Lágrima (free-run only; Lacrimae Christi after 2 years), Pajarete (45 to 140 g/l, 2 years), Maestro, Tierno (from long sun-dried grapes), Vendimia Asoleada"], ["Colour by arrope", "Dorado 0%; Rojo dorado up to 5%; Oscuro 5 to 10%; Color 10 to 15%; Negro 15% or more"], ["Age", "Noble 2 to 3 years; Añejo 3 to 5; Trasañejo over 5; oak up to 1,000 l, solera or añada"], ["Yields", "12,000 kg/ha; at most 70 l per 100 kg"]],
  place: "From sea level to 1,000 m: slate soils in the Axarquía and Montes de Málaga (300 to 700 mm of rain) where grapes are sun-dried on paseros; albariza at Manilva; brown limestone in the north.",
  rules: "Málaga's colour scale is set by the share of arrope, must reduced by heat to a third of its volume.",
  history: "Phoenicians planted vines here in the 9th century BC; Moorish Málaga sold 'xarab al malaqui'. Phylloxera entered Spain at Málaga in 1874, cutting a vineyard of 110,000 ha to a fraction.",
  glass: "Raisin, fig, honey, caramel, coffee; Moscatel adds orange blossom; old Trasañejo is profound and long.",
  exam: "PX and Moscatel; arrope colour scale; Lágrima; Trasañejo over 5 years; phylloxera arrived 1874.",
  producers: ["Antigua Casa de Guardia", "Bodegas Málaga Virgen", "Bodegas Quitapenas", "Bodegas Dimobe", "Compañía de Vinos Telmo Rodríguez"]
});
APXF["es-sierras-de-malaga"] = an({
  lede: "The dry-wine sister of DO Málaga, covering the province's mountains, with a stricter subzone in the Serranía de Ronda.",
  cat: "DO (DOP), white, rosé, red and overripe-grape red", rec: "DO 2001, under the Málaga Consejo Regulador",
  src: ["Pliego de condiciones DOP Sierras de Málaga, consolidated August 2024 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/sierras_de_malaga_2024_10_29.pdf"],
  amended: "Consolidated under the Order of 19 August 2024 (BOJA 27 August 2024)",
  facts: [["Subzone", "Serranía de Ronda (hand harvest in boxes of at most 30 kg, 9,000 kg/ha for all grapes)"], ["Areas", "Axarquía, Montes de Málaga, Manilva, Costa Occidental, Norte de Málaga, Sierra de las Nieves"], ["Grapes", "20 whites (incl. Moscatel, Pedro Ximénez, Doradilla, Montúa, Chardonnay, Sauvignon Blanc) and 19 reds (incl. Tintilla de Rota, Romé, Jaén Tinto, Melonera, Tempranillo, Syrah, Cabernet, Pinot Noir, Blauer Limberger)"], ["Minimum alcohol", "White 10%; rosé 11%; red 12%; overripe red 15%"], ["Yields", "White 12,000 kg/ha (84 hl/ha); red 9,000 kg/ha (63 hl/ha); at most 70 l per 100 kg"], ["Ageing", "Oak up to 1,000 l, añada system; crianza, reserva and gran reserva terms allowed"]],
  place: "Steep mountains at the lowest latitude of Europe's Mediterranean arc: slate in the Axarquía and Montes, limestone around Ronda, albariza at Manilva, brown limestone in the north.",
  rules: "The Serranía de Ronda subzone has lower yields and compulsory hand harvest.",
  history: "Replanting and recovery of historic grapes began in the early 1980s; the dry-wine DO followed in 2001, led by Ronda estates such as F. Schatz.",
  glass: "Ronda reds: ripe yet fresh, Mediterranean herbs; dry Moscatel whites: floral and aromatic.",
  exam: "Dry wines of Málaga; Serranía de Ronda subzone.",
  producers: ["F. Schatz", "Descalzos Viejos", "Cortijo Los Aguilares", "Bodega Joaquín Fernández", "Bodegas Bentomiz"]
});
APXF["es-granada"] = an({
  lede: "A province-wide DO where half the land is above 1,000 m, with the native Vigiriego and a strict Contraviesa-Alpujarra subzone that bans oak.",
  cat: "DO (DOP), white, rosé, red, sparkling and naturally sweet wines", rec: "Vino de Calidad 2009; now a DO",
  src: ["Pliego de condiciones DOP Granada, consolidated October 2024 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/granada_2024_11_18.pdf"],
  amended: "Consolidated under the Order of 9 October 2024 (BOJA 17 October 2024)",
  facts: [["Subzones", "Geoparque-Norte, Poniente, Contraviesa-Alpujarra (13 municipalities)"], ["White grapes", "Vigiriego, Sauvignon Blanc, Chardonnay, Moscatels, Pedro Ximénez, Palomino, Jaén Blanco, Torrontés, Blanca Gordal, Macabeo, Viognier"], ["Red grapes", "Tempranillo, Garnacha, Cabernet Sauvignon and Franc, Merlot, Syrah, Pinot Noir, Monastrell, Romé, Petit Verdot"], ["Minimum alcohol", "White and rosé 10%, red 11%; Contraviesa-Alpujarra white 11%, rosé 12%, red 13 to 16%"], ["Yields", "Red 8,000 kg/ha, white 9,000, sparkling 12,000; Contraviesa red 6,000 (Tempranillo 7,000), white 8,000; at most 70 l per 100 kg (65 in Contraviesa)"], ["Sparkling", "Traditional method, at least 9 months; Premium 12, Reserva 18; Contraviesa sparkling at least 70% Vigiriego"], ["Contraviesa-Alpujarra", "No oak allowed"]],
  place: "All of Granada province; about half lies above 1,000 m, with 15 to 16°C mean temperature, about 450 mm of rain and 2,700 hours of sun. Vines grow mostly on brown soils over metamorphic schists.",
  rules: "The Contraviesa-Alpujarra subzone forbids oak entirely, to keep the character of high-altitude native grapes.",
  history: "Approved as a Vino de Calidad in 2009 and registered by the EU as a DOP the same year.",
  glass: "Vigiriego: fresh, citrus, herbal whites; mountain reds with bright fruit and acidity.",
  exam: "Vigiriego; Contraviesa-Alpujarra bans oak; half the province above 1,000 m.",
  producers: ["Bodega Barranco Oscuro", "Bodegas Fontedei", "Cortijo El Cura"]
});
APXF["es-lebrija"] = an({
  lede: "A small Vino de Calidad on the edge of the Guadalquivir marshes, just north of the sherry zone, making Palomino generosos and sweet Moscatel.",
  cat: "Vino de Calidad con Indicación Geográfica (DOP), white, red, generoso, generoso de licor, vino dulce natural and mistela", rec: "Vino de Calidad 2009 (Order of 11 March 2009)",
  src: ["Pliego de condiciones DOP Lebrija (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/lebrija_2021_09_14.pdf"],
  amended: "Version published by the Ministry in September 2021",
  facts: [["Zone", "Lebrija and El Cuervo (Seville)"], ["Grapes", "Palomino and Palomino Fino (main), Moscatel de Alejandría, Sauvignon Blanc; Cabernet Sauvignon, Syrah, Tempranillo, Merlot, Petit Verdot, Tintilla de Rota"], ["Generosos", "Flor de Lebrija and Lebrija Old Vino Seco, 15 to 22%, only Palomino, at least 3 years average age, butts up to 600 l"], ["Sweet", "Lebrija Old Dulce; vino dulce natural (Moscatel) from must of at least 212 g/l"], ["Minimum alcohol", "White 10.5%; red 11.5%"], ["Yields", "White 15,000 kg/ha (Sauvignon 10,000); red 11,250 (Cabernet and Tintilla 6,000); at most 72.5 l per 100 kg"]],
  place: "Flat albariza campiña beside the marshes, hot and frost-free, tempered by Atlantic air, with about 3,000 hours of sun.",
  rules: "Lebrija lies partly inside the Jerez production zone, but its generosos carry the Lebrija name.",
  history: "Recognised as a Vino de Calidad in 2009.",
  glass: "Flor-aged Palomino: almond and saline; Moscatel: grapey and sweet.",
  exam: "Vino de Calidad next to Jerez; Palomino generosos.",
  producers: ["Bodegas González Palacios"]
});
