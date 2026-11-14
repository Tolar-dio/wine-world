// Full encyclopedia entry: Bierzo. Written from the pliego de condiciones (MAPA copy, revision of June 2021).
function bz(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-bierzo"] = bz({
  lede: "A mountain basin in the far west of León, closer in spirit to Galicia than to Castile, where old Mencía vines on slate and clay make fresh, floral, peppery reds. Its village-to-grand-cru classification is the most Burgundian in Spain.",
  cat: "DO (DOP), red, white, rosé and clarete", rec: "DO 1989 (Order of 11 December 1989)",
  src: ["Pliego de condiciones DOP Bierzo, revision of 22 June 2021 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/bierzo_2021_07_23.pdf"],
  amended: "Revision of 22 June 2021 (new control arrangements and updated list of parajes), the version the Ministry listed in 2026",
  sources: [["Consejo Regulador DO Bierzo", "https://www.crdobierzo.es/"]],
  facts: [["Zone", "31 municipalities in the province of León, including Ponferrada, Cacabelos, Villafranca del Bierzo, Corullón, Camponaraya, Arganza, Bembibre and Molinaseca"], ["Red grapes", "Mencía (about three-quarters of the vineyard), Garnacha Tintorera, Merenzao (Trousseau), Estaladiña"], ["White grapes", "Godello, Doña Blanca (Malvasía Castellana), Malvasía Riojana, Palomino"], ["Red", "At least 85% Mencía, Garnacha Tintorera, Estaladiña and/or Merenzao"], ["Rosé and clarete", "Rosé at least 70% red grapes; clarete 40 to 60% red grapes with the rest white, fermented with 5 to 10% skins"], ["Minimum alcohol", "White 11.5%; rosé, clarete and red 12%"], ["Yields", "11,000 kg/ha (81.4 hl/ha) for reds, Godello, Doña Blanca and Malvasía; Palomino 12,000 kg/ha; at most 74 l per 100 kg"], ["Place tiers", "Vino de Villa (one village, yields cut 20%); Vino de Paraje (named site, cut 25%); Viña Clasificada (single plot, cut 30%, at least 5 years as a paraje wine); Gran Viña Clasificada (cut 35%, at least 5 years as Viña Clasificada); all with 100% of grapes from the named place"], ["Ageing terms", "Roble, crianza, reserva and gran reserva under the general Spanish rules"]],
  place: "The Bierzo is a bowl ringed by the Cantabrian, Ancares and León mountains, drained by the Sil. Vineyards sit between 355 and 1,200 m, mostly 400 to 800 m, on acidic, carbonate-free loam and clay in the valley and slate and quartzite on the slopes. The climate is mild (about 12.3°C on average, 793 mm of rain) with Atlantic influence and continental warmth. Much of the vineyard is old: the rules put the average vine age at about 75 years.",
  rules: "The classification, approved in 2018 to 2019, ties lower yields to smaller places. A Viña Clasificada must first prove itself for five years as a paraje wine and pass an assessment by the Consejo Regulador, and a Gran Viña Clasificada needs five more years at that level. Unlike the EU's 85% rule, every named-place wine must be 100% from that place.",
  history: "Romans mined gold here at Las Médulas, and medieval monasteries on the Camino de Santiago spread the vine; the pliego counts 25 documented monasteries before the 19th-century confiscations. After decades of cooperative bulk wine, Álvaro Palacios and his nephew Ricardo Pérez founded Descendientes de J. Palacios in Corullón in 1999, and local winemaker Raúl Pérez helped put old-vine Mencía on the world map.",
  glass: "Mencía: bright red and black cherry, violets, black pepper, a slate or graphite note, juicy acidity and medium tannin; old-vine and site wines gain depth without heaviness. Godello: pear, citrus and a saline, textured finish.",
  exam: "Mencía on slate; Corullón and Descendientes de J. Palacios; Villa, Paraje, Viña Clasificada and Gran Viña Clasificada at 100% from the named place.",
  producers: ["Descendientes de J. Palacios", "Raúl Pérez", "Losada", "Dominio de Tares", "Castro Ventosa", "Pittacum", "Bodega del Abad", "Verónica Ortega"]
});
