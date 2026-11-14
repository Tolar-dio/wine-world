// Full encyclopedia entries: Basque Country. Written from the pliegos de condiciones (Basque Government and Consejo Regulador copies), checked 14 November 2026.
function pv(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-getariako-txakolina"] = pv({
  lede: "The original txakoli: crisp, low-alcohol, slightly spritzy white from Hondarrabi Zuri grown on pergolas above the sea at Getaria and Zarautz, poured from a height in San Sebastián's pintxo bars.",
  cat: "DO (DOP), white (almost all), rosé and red", rec: "DO 1989 (regulation ratified April 1990); extended to all of Gipuzkoa in 2007",
  src: ["Pliego de condiciones DO Getariako Txakolina (Consejo Regulador copy, 2025)", "https://www.getariakotxakolina.eus/wp-content/uploads/2025/07/r83766_pliego-cr-gt.pdf"],
  amended: "Consejo Regulador text posted in 2025; the Ministry's 2026 list still dates the specification to 2011",
  sources: [["Basque Government: Getariako Txakolina", "https://www.euskadi.eus/web01-a2hikus/es/contenidos/informacion/dop_txakoli_getaria/es_dapa/index.shtml"]],
  facts: [["Zone", "The whole province of Gipuzkoa (originally Aia, Getaria and Zarautz)"], ["Recommended grapes", "Hondarrabi Zuri (white), Hondarrabi Beltza (red)"], ["Authorised grapes", "Hondarrabi Zuri Zerratia (Petit Courbu), Izkiriota (Gros Manseng), Riesling, Chardonnay; together at most 20% of each winery's vineyard"], ["Varietal labels", "Only recommended grapes, at least 85%"], ["Rosé", "At least 50% Hondarrabi Beltza"], ["Minimum alcohol", "9.5%"], ["Yields", "13,000 kg/ha; at most 72 l per 100 kg (93 hl/ha)"]],
  place: "About 95% of the vineyard lies close to the sea on south-facing slopes of 15 to 20%. The climate is mild and Atlantic, about 13.4°C on average with around 1,600 mm of rain a year; most vines (about 80%) are trained on high pergolas (parral) to catch light and air.",
  rules: "Its 9.5% minimum is among the lowest of any Spanish DO, reflecting the cool, wet coast. Imported grapes are capped at a fifth of each winery's vineyard.",
  history: "Txakoli was a farmhouse wine of the Basque coast for centuries and nearly vanished in the 20th century. Growers in Getaria and Zarautz renewed vineyards and cellars in the 1980s and won the DO in 1989.",
  glass: "Very pale; green apple, lemon, white flowers, a salty tang, high acidity and a light natural prickle, around 10.5 to 11.5% alcohol.",
  exam: "Hondarrabi Zuri; 9.5% minimum; Getaria and Zarautz; poured from a height (escanciado).",
  producers: ["Txomin Etxaniz", "Ameztoi", "Gaintza", "Talai Berri", "Akarregi Txiki"]
});
APXF["es-bizkaiko-txakolina"] = pv({
  lede: "Txakoli from the hills of Bizkaia, around Bakio and the Urdaibai estuary, a little fuller than Getaria's, with an aged 'Berezia' tier and sparkling wines.",
  cat: "DO (DOP), white, rosé, red, Berezia (aged) white, rosé, red and 'aparta', and sparkling", rec: "DO 1994",
  src: ["Pliego de condiciones DO Bizkaiko Txakolina, November 2024 (Consejo Regulador copy)", "https://bizkaikotxakolina.eus/wp-content/uploads/2025/06/BTpliego-20241128.pdf"],
  amended: "Version of 28 November 2024, published by the Ministry in September 2025",
  facts: [["Zone", "Registered vineyards below 400 m anywhere in Bizkaia"], ["Recommended grapes", "Hondarrabi Zuri, Hondarrabi Beltza, Hondarrabi Zuri Zerratia (Petit Courbu)"], ["Authorised grapes", "Mune Mahatsa (Folle Blanche), Izkiriota (Gros Manseng), Izkiriota Ttipia (Petit Manseng), Sauvignon Blanc, Riesling, Chardonnay, Pinot Noir, Cabernet Franc"], ["Varietal labels", "Recommended grapes only, at least 85%"], ["Rosé", "At least 50% red grapes"], ["Minimum alcohol", "10.5%; Berezia 11.5%; Berezia aparta 11%"], ["Yields", "White 11,500 kg/ha (80.5 hl/ha); red 9,500 kg/ha (66.5 hl/ha); at most 70 l per 100 kg"], ["Berezia", "Aged at least 5 months in vessels of cement, ceramic, wood and others, released from 1 May after harvest; 'aparta' covers special methods (carbonic maceration, no added sulphites, skin contact); barrel fermentation in casks up to 600 l; oak chips banned"]],
  place: "Hilly country of medium mountains, with vineyards on south-facing slopes below 400 m to secure ripening; about 1,200 mm of rain a year.",
  rules: "Berezia is Bizkaia's answer to longer-lived txakoli: lees or vessel ageing rather than simple young wine.",
  history: "Txakoli is recorded in Bizkaia since the Middle Ages. The DO dates from 1994, a few years after Getaria's.",
  glass: "Citrus, green apple, herbs, sharp acidity, sometimes a light prickle; Berezia wines show more texture and savoury, lees-derived notes.",
  exam: "Bizkaia txakoli; Berezia (5 months) aged tier; vineyards below 400 m; Folle Blanche (Mune Mahatsa) allowed.",
  producers: ["Doniene Gorrondona", "Itsasmendi", "Gorka Izagirre", "Bodegas Virgen de Lorea"]
});
APXF["es-arabako-txakolina"] = pv({
  lede: "The smallest txakoli DO, in the Ayala valley of north-western Álava, inland from Bilbao.",
  cat: "DO (DOP), white, rosé, red and Berezia (aged) styles", rec: "DO 2001",
  src: ["Pliego de condiciones DO Arabako Txakolina, consolidated December 2024 (Basque Government copy)", "https://www.euskadi.eus/contenidos/informacion/dop_txakoli_araba/es_dapa/adjuntos/Pliego-Arabako-Tx-20241219-consolidado.pdf"],
  amended: "Consolidated text of 19 December 2024, published by the Ministry in September 2025",
  facts: [["Zone", "Amurrio, Artziniega, Ayala/Aiara, Laudio/Llodio and Okondo"], ["Recommended grapes", "Hondarrabi Zuri, Hondarrabi Beltza, Hondarrabi Zuri Zerratia (Petit Courbu)"], ["Authorised grapes", "Izkiriota (Gros Manseng), Izkiriota Ttippia (Petit Manseng), Sauvignon Blanc, Riesling, Chardonnay, Pinot Noir, Cabernet Franc"], ["Minimum alcohol", "9.5%; Berezia 11.5%"], ["Rosé", "At least 30% of the recommended red grape"], ["Yields", "13,000 kg/ha; at most 70 l per 100 kg"], ["Berezia", "Aged at least 5 months"]],
  place: "A green, rainy valley of the Nervión and Izoria rivers, with Atlantic influence and grapes typically picked around 12% potential alcohol.",
  rules: "The rules mirror the other txakoli DOs, with a 5-month Berezia tier for aged wines.",
  history: "Txakoli was made in the Ayala valley for centuries; the DO, the third for txakoli, came in 2001.",
  glass: "Crisp, citrusy, lightly herbal white with high acidity.",
  exam: "Ayala/Aiara valley, Álava; smallest txakoli DO; 2001.",
  producers: ["Astobiza", "Bodegas Okendo"]
});
