// Full encyclopedia entry: Madrid. Written from the pliego de condiciones (Ministry of Agriculture copy), checked 14 November 2026.
function md(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-vinos-de-madrid"] = md({
  lede: "Four subzones ringing Spain's capital, from limestone Arganda to granite San Martín de Valdeiglesias in the Gredos foothills, where old-vine Garnacha and Albillo Real have made Madrid fashionable.",
  cat: "DO (DOP), white, rosé, clarete, red, sobremadre and quality sparkling", rec: "DO 1990 (Denominación Específica 1984)",
  src: ["Pliego de condiciones DOP Vinos de Madrid (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/vinos_de_madrid_2024_10_25.pdf"],
  amended: "Version published by the Ministry in October 2024",
  facts: [["Subzones", "Arganda (31 municipalities plus El Encín), Navalcarnero (19), San Martín de Valdeiglesias (9), El Molar (11)"], ["Main grapes by subzone", "Arganda: Malvar and Tinto Fino; Navalcarnero and El Molar: Malvar and Garnacha; San Martín: Albillo Real and Garnacha"], ["Other grapes", "Airén, Macabeo, Torrontés, Parellada, Moscatel, Sauvignon Blanc, Garnacha Blanca; Merlot, Cabernet Sauvignon, Syrah, Petit Verdot, Graciano, Negral, Listán Prieto"], ["Minimum alcohol", "White 10%; rosé and clarete 11%; red 11.5%; sparkling 10%"], ["Place terms", "Vino de pueblo (85% from the village); comarca (85%); paraje (95%); parcela (100%)"], ["Sobremadre", "Wine left on its 'madres' (skins and lees) for 90 to 180 days"], ["Yields", "White 8,000 kg/ha (59.2 hl/ha); red 7,000 kg/ha (51.8 hl/ha); at most 74 l per 100 kg"], ["Ageing", "Crianza red 24 months with 6 in oak (up to 330 l); reserva 36 with 12; gran reserva 60 with 18"]],
  place: "Vineyards at 480 to 1,000 m. Arganda has calcareous soils (pH 7.5 to 8.5); Navalcarnero and San Martín are acidic to neutral, San Martín on Sistema Central granite. Rainfall runs from 461 mm in Arganda to 658 mm in San Martín and El Molar.",
  rules: "The place ladder runs from village (85%) to single plot (100%); sobremadre is a traditional Madrid style.",
  history: "Madrid's taverns drank local wine for centuries; the Denominación Específica of 1984 became the DO in 1990. Since the 2000s Comando G and Bernabeleva have made San Martín's old Garnacha world-famous.",
  glass: "San Martín Garnacha: pale, raspberry, rose, granite freshness; Malvar whites: soft and fruity.",
  exam: "Four subzones; San Martín de Valdeiglesias Garnacha (Gredos); Malvar; sobremadre.",
  producers: ["Comando G", "Bernabeleva", "Bodega Marañones", "4 Monos", "Bodegas Licinia"]
});
