// Full encyclopedia entries: Balearic Islands. Written from the pliegos de condiciones (Ministry of Agriculture copies), checked 14 November 2026.
function ba(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-binissalem"] = ba({
  lede: "The plain below the Serra de Tramuntana in central Mallorca, built on the native red Manto Negro and white Moll (Prensal).",
  cat: "DO (DOP), red, rosé, white and sparkling", rec: "DO 1991",
  src: ["Pliego de condiciones DOP Binissalem (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/binissalem_2026_04_27.pdf"],
  amended: "Version published by the Ministry in April 2026",
  facts: [["Zone", "Binissalem, Consell, Santa Maria del Camí, Sencelles, Santa Eugènia (Mallorca)"], ["Main grapes", "Manto Negro, Moll (Prensal Blanc), Moscatels"], ["Blends", "Reds at least 30% Manto Negro and at most 30% Gorgollassa; whites at least 50% Moll or Moscatel; sparkling whites at least 50% Moll"], ["Minimum alcohol", "Red 11.5%; rosé 11%; white 10.5%; sparkling 10.5%"], ["Yields", "9,000 kg/ha (64.8 hl/ha), Parellada 10,000; 'Vinyet' wines 6,750 kg/ha; 72 l per 100 kg"]],
  place: "A plain at 70 to 140 m rising to about 400 m, sheltered from frost and north winds by the Serra de Tramuntana (up to about 1,400 m). Calcareous, stony soils; about 550 mm of rain, mostly in autumn, and 2,750 hours of sun.",
  rules: "The DO's identity depends on Manto Negro (at least 30% of reds) and Moll (at least half of whites).",
  history: "Recognised as a DO at the end of the 1980s revival of Mallorcan wine (1991); José L. Ferrer is the historic house.",
  glass: "Manto Negro: light-coloured, cherry, strawberry, herbs and sweet spice; Moll: fresh, floral, almond.",
  exam: "Manto Negro and Moll (Prensal); Mallorca; Serra de Tramuntana.",
  producers: ["José L. Ferrer", "Macià Batle", "Biniagual", "Celler Tianna Negre"]
});
APXF["es-pla-i-llevant"] = ba({
  lede: "The flat centre and east of Mallorca, 19 municipalities where native Callet, Manto Negro and Fogoneu meet international grapes, cooled by the sea breeze.",
  cat: "DO (DOP), white, rosé, red, liqueur, semi-sparkling and sparkling", rec: "DO 1999",
  src: ["Pliego de condiciones DOP Pla i Llevant (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/pla_i_llevant_2025_12_23.pdf"],
  amended: "Version published by the Ministry in December 2025",
  facts: [["Zone", "19 municipalities including Felanitx, Manacor, Porreres, Petra, Llucmajor, Campos, Santanyí and Artà (Mallorca)"], ["Native grapes", "Callet, Manto Negro, Fogoneu, Gorgollassa; white Pensal (Moll), Giró Ros"], ["Other grapes", "Cabernet Sauvignon, Merlot, Syrah, Tempranillo, Monastrell, Pinot Noir; Macabeo, Parellada, Moscatels, Chardonnay, Riesling, Viognier"], ["Minimum alcohol", "White and rosé 10.5%; red 11%; semi-sparkling 10%; sparkling 11%; liqueur 15%"], ["Yields", "Most grapes 10,000 to 11,000 kg/ha; Cabernet and Merlot 9,000; Pinot Noir, Chardonnay, Riesling 7,000; Gorgollassa 5,000; at most 70 l per 100 kg"], ["Bottling", "Inside the zone"]],
  place: "Low land below 100 m on calcareous soils, with high sunshine and the daily 'embat' sea breeze.",
  rules: "Yields are set grape by grape.",
  history: "The DO was created in 1999; Ànima Negra's Callet-based reds (from 1994) put the native grape on the map.",
  glass: "Callet: pale, red berries, herbs, fine tannin; blends with Manto Negro and Fogoneu.",
  exam: "Callet; eastern Mallorca; Ànima Negra.",
  producers: ["Ànima Negra", "Miquel Gelabert", "Toni Gelabert", "Vins Can Majoral"]
});
