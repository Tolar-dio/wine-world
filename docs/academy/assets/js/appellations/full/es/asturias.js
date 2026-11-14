// Full encyclopedia entry: Asturias. Written from the pliego de condiciones (Ministry of Agriculture copy), checked 14 November 2026.
function as(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-cangas"] = as({
  lede: "Steep slate slopes in south-western Asturias around Cangas del Narcea, a tiny mountain wine area reviving rare grapes such as Albarín Tinto, Carrasquín and Verdejo Negro.",
  cat: "Vino de Calidad con Indicación Geográfica (DOP), red and white", rec: "Vino de Calidad 2008",
  src: ["Pliego de condiciones DOP Cangas (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/cangas_2019_01_01.pdf"],
  amended: "Version listed by the Ministry as in force (2019)",
  facts: [["Zone", "Allande, Cangas del Narcea, Degaña, Grandas de Salime, Ibias, Illano, Pesoz and parishes of Tineo (Asturias)"], ["Preferred red grapes", "Albarín Tinto, Carrasquín, Verdejo Negro, Mencía; also Garnacha Tintorera, Merlot, Pinot Noir, Syrah"], ["Preferred white", "Albarín Blanco; also Albillo Mayor, Godello, Gewürztraminer, Moscatel de grano menudo, Picapoll"], ["Minimum alcohol", "Red 10%; white 9.5%; aged wines 11.5%"], ["Yields", "Red 8,000 kg/ha (56 hl/ha); white 10,000 kg/ha (70 hl/ha); at most 70 l per 100 kg"], ["Labels", "Vintage compulsory"]],
  place: "Very steep slopes on slate and schist with sandy additions, pH near 6; about 1,000 mm of rain, around 30% less than the rest of Asturias, up to 2,000 hours of sun, winter lows near -10°C and summer highs above 30°C.",
  rules: "Planting density of 3,000 to 6,000 vines/ha and irrigation only until 31 July.",
  history: "Monks of Corias monastery tended vines here from the Middle Ages; the modern revival led to Vino de Calidad status in 2008.",
  glass: "Light, peppery, high-acid reds; floral, citrusy Albarín Blanco.",
  exam: "Asturias's only quality wine; Albarín, Carrasquín, Verdejo Negro; slate slopes.",
  producers: ["Monasterio de Corias", "Chacón Buelta"]
});
