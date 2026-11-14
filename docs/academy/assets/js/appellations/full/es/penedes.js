// Full encyclopedia entries: Penedès. Written from the pliegos de condiciones (Consejo Regulador copies).
function pe(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-penedes"] = pe({
  lede: "The historic heart of Catalan wine between Barcelona and Tarragona, now the first Spanish DO to require organic grapes for every wine, with traditional-method sparkling wine aged at least 15 months.",
  cat: "DO (DOP), white, red, rosé, sparkling, fortified and sweet", rec: "DO 1960",
  src: ["Plec de condicions DOP Penedès, November 2024 version (Consell Regulador copy)", "https://dopenedes.cat/wp-content/uploads/2025/11/plec-de-condicions-dop-penedes.pdf"],
  amended: "Plec, November 2024 version",
  sources: [["INCAVI: DO Penedès rules texts and amendments", "https://incavi.gencat.cat/ca/normativa/plecs-de-condicions-de-les-do-catalanes/do-penedes"]],
  facts: [["Organic rule", "All wines from the 2025 harvest on must be certified organic"], ["White grapes", "Macabeu, Xarel·lo, Parellada, Subirat Parent (Malvasia), Garnatxa Blanca, Moscatells, Malvasia de Sitges, Chardonnay, Sauvignon Blanc, Riesling, Gewürztraminer, Chenin, Sumoi Blanc, Viognier, Xarel·lo Rosat, Forcada"], ["Sparkling (vi escumós de qualitat)", "Traditional method or ancestral method, at least 15 months from bottling to disgorging, all in the same bottle and cellar; wines aged at least 4 years under cork may be sold undisgorged"], ["Minimum alcohol", "Whites and rosés 9.5%; reds 11%; sparkling 11%"], ["Yields", "Whites and sparkling 12,000 kg/ha (79.92 hl/ha); reds 9,000 kg/ha (63 hl/ha); at most 66.6 l per 100 kg (white) or 70 (red)"], ["Named areas", "Ten unitats geogràfiques menors: Alts d'Ancosa, Conca del Foix, Costers de l'Anoia, Costers de Lavernó, Costers del Montmell, Marina del Garraf, Massís del Garraf, Muntanyes d'Ordal, Turons de Vilafranca, Vall Bitlles-Anoia"], ["Specialities", "Malvasia de Sitges vi de licor (100% Malvasia de Sitges); late-harvest and overripe-grape wines"], ["Bottling", "Inside the production zone"]],
  place: "A coastal strip and inland basins in the provinces of Barcelona and Tarragona, from the Garraf massif by the sea up to the higher Alt Penedès toward Montserrat. Limestone and clay soils dominate; the lower areas are warm and Mediterranean, the upper ones cooler and better for whites and sparkling.",
  rules: "Since the 2025 harvest, organic certification applies to every Penedès wine, still or sparkling. Producers can name one of the ten zones if the grapes are kept separate.",
  history: "Vines were here before the Romans, according to the region's own history. Josep Raventós of Codorníu made Spain's first traditional-method sparkling wine at Sant Sadurní d'Anoia in 1872, and Miguel Torres modernised still wines from the 1960s. Several leading sparkling houses left the Cava DO: some joined the Corpinnat brand in 2019 and 2020, others moved to the DO's own Clàssic Penedès sparkling category, which became the template for today's organic, 15-month rule.",
  glass: "Xarel·lo whites: citrus, fennel, almond, saline; sparkling: green apple, brioche and nutty notes with longer ageing.",
  exam: "All-organic DO since the 2025 harvest; sparkling at least 15 months on the lees; Xarel·lo is the signature grape.",
  producers: ["Torres", "Jean Leon", "Can Ràfols dels Caus", "Albet i Noya", "Pardas", "Can Sumoi", "Mas Candí", "Parés Baltà"]
});
APXF["es-cava"] = pe({
  lede: "Spain's traditional-method sparkling wine, made mostly in Penedès from Macabeo, Xarel·lo and Parellada, but legally spread over several regions in four zones. Since 2020 it has a quality pyramid in which Reserva, Gran Reserva and single-site Paraje Calificado must come from organic vineyards.",
  cat: "DO (DOP), quality sparkling wine (white and rosé), traditional method", rec: "Cava name regulated from 1972; DO 1986",
  src: ["Pliego de condiciones DOP Cava (Consejo Regulador copy)", "https://www.cava.wine/documents/615/Pliego_de-CondicionesDOPCAVA.pdf"],
  amended: "Pliego in force as published by MAPA in March 2026; a further minor amendment (paraje boundaries, vineyard register) was requested in January 2026",
  sources: [["MAPA: Cava documents and list of Parajes Calificados", "https://www.mapa.gob.es/es/alimentacion/temas/calidad-diferenciada/dop-igp/htm/documentos_dop_cava"], ["BOE-A-2026-1373: amendment request", "https://www.boe.es/boe/dias/2026/01/20/pdfs/BOE-A-2026-1373.pdf"]],
  facts: [["Grapes", "White: Macabeo (Viura), Xarel·lo, Parellada, Malvasía (Subirat Parent), Chardonnay; red: Garnacha Tinta, Monastrell, Pinot Noir, Trepat"], ["Method", "Second fermentation in the bottle (traditional method); at least 9 months on the lees"], ["Zones", "Comtats de Barcelona (with subzones Valls d'Anoia-Foix, Serra de Mar, Conca del Gaià, Serra de Prades, Pla de Ponent), Valle del Ebro (subzones Alto Ebro, Valle del Cierzo), Viñedos de Almendralejo, Requena"], ["Categories", "Cava de Guarda (at least 9 months); Cava de Guarda Superior: Reserva (at least 18 months), Gran Reserva (at least 30 months), Paraje Calificado (at least 36 months)"], ["Guarda Superior rules", "Organic vineyards (certified from the 2025 harvest), vines at least 10 years old, 10,000 kg/ha; Gran Reserva and Paraje made entirely in one bottle and one cellar"], ["Paraje Calificado", "Single named site, hand-harvested whole bunches, 8,000 kg/ha (48 hl/ha), at most 0.6 hl per 100 kg, no acidification or decolouring"], ["Yields", "12,000 kg/ha (80 hl/ha); base wine from at most 1 hl per 150 kg"], ["Alcohol", "Finished Cava 10.8 to 12.8%; base wine 9.5 to 11.5%"], ["Rosé", "Base wine at least 25% red varieties"], ["Sweetness", "Brut Nature (under 3 g/l, no added sugar), Extra Brut (0 to 6), Brut (under 12), Extra Seco (12 to 17), Seco (17 to 32), Semiseco (32 to 50), Dulce (over 50)"]],
  place: "About 95% of Cava comes from the Comtats de Barcelona zone, chiefly the Alt Penedès around Sant Sadurní d'Anoia, on limestone and clay. Other municipalities lie in Lleida, Girona, La Rioja, Álava, Navarra, Zaragoza, Badajoz (Almendralejo) and Valencia (Requena).",
  rules: "Cava is defined by method and registered vineyards rather than a single region, which is why it covers places hundreds of kilometres apart. Zone and subzone names may appear on labels from the 2020s reforms onward.",
  history: "Josep Raventós made the first Catalan traditional-method wine in 1872. The name 'Cava' (cellar) replaced 'champaña' after a 1970s agreement with France; the DO was created in 1986 when Spain joined the EEC. Departures by leading producers (Raventós i Blanc in 2012, the Corpinnat group in 2019) pushed the DO to add zones and the organic Guarda Superior tier.",
  glass: "Citrus, green apple, almond, light toast; Gran Reserva and Paraje Calificado add brioche, dried fruit and nuttiness with fine, persistent mousse.",
  exam: "Traditional method; 9 months minimum, Reserva 18, Gran Reserva 30, Paraje Calificado 36; Macabeo, Xarel·lo, Parellada; four zones.",
  producers: ["Codorníu", "Freixenet", "Juvé & Camps", "Agustí Torelló Mata", "Alta Alella", "Pere Ventura", "Bodegas Bilbaínas", "Vilarnau"]
});
