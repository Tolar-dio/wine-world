// Full encyclopedia entries: Murcia. Written from the pliegos de condiciones, checked 14 November 2026.
function mu(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-jumilla"] = mu({
  lede: "Monastrell's great stronghold, on high, arid plateaus straddling Murcia and Albacete, where phylloxera arrived late and many vines still grow on their own roots.",
  cat: "DO (DOP), red, rosé, white, sweet and Monastrell liqueur wine", rec: "Recognised 1961, according to the pliego",
  src: ["Pliego de condiciones DOP Jumilla, 2025 amendment text (Junta de Castilla-La Mancha copy)", "https://apliagri.castillalamancha.es/sites/default/files/2025-09/PC_DOP_JUMILLA_MODIFCACION_2025.pdf"],
  amended: "Last modification by Resolution of 11 October 2024 (BOE 22 October 2024); a further 2025 amendment text with tracked changes",
  sources: [["Ministry of Agriculture: supra-regional DOPs (Jumilla)", "https://www.mapa.gob.es/es/alimentacion/temas/calidad-diferenciada/dop-igp/htm/dop_jumilla"]],
  facts: [["Zone", "Jumilla (Murcia) with Fuente-Álamo, Albatana, Ontur, Hellín, Tobarra and Montealegre del Castillo (Albacete)"], ["Red grapes", "Monastrell (main), Garnacha Tintorera, Cencibel, Cabernet Sauvignon, Garnacha, Merlot, Syrah, Petit Verdot"], ["White grapes", "Airén, Macabeo, Pedro Ximénez, Malvasía, Chardonnay, Sauvignon Blanc, Moscatel de grano menudo, Verdejo, Merseguera, Viognier"], ["Jumilla Monastrell", "At least 85% Monastrell"], ["Blends", "Reds at least 95% of the listed red grapes; rosé at least 50% red grapes; white may be blanc de noirs from 100% red grapes"], ["Minimum alcohol", "Red 12%; rosé 11%; white 10%; Monastrell liqueur wine 15 to 22% (17.5% total)"], ["Yields", "Dry-farmed (extensive): red 5,000 kg/ha (37 hl/ha), white 5,625 kg/ha; intensive: 8,750 kg/ha (64.75 hl/ha)"]],
  place: "High plateaus and valleys among ranges of 900 to 1,372 m, with very hot summers (often above 40°C), cold winters and little rain; basic, limy, well-aerated soils that hold water well.",
  rules: "Very low dry-farming yields reflect the drought-hardened bush vines that make up much of the vineyard.",
  history: "Jumilla escaped phylloxera until the late 1980s, so for a century it sold wine to France and the rest of Spain; when the louse arrived, replanting brought in modern estates. Casa Castillo, Juan Gil and others made its Monastrell famous.",
  glass: "Monastrell: inky, blackberry, plum, dried herbs, liquorice, high alcohol and firm tannin; old ungrafted vines add depth.",
  exam: "Monastrell (Jumilla Monastrell at least 85%); Murcia and Albacete; late phylloxera; dry-farmed yields of 5,000 kg/ha.",
  producers: ["Casa Castillo", "Juan Gil", "Bodegas Luzón", "Bodegas Carchelo", "Bodegas Bleda"]
});
APXF["es-yecla"] = mu({
  lede: "Spain's only single-municipality DO, a high, dry plateau in northern Murcia devoted to Monastrell.",
  cat: "DO (DOP), red, rosé, white, liqueur and sparkling", rec: "DO 1975",
  src: ["Pliego de condiciones DOP Yecla (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/yecla_2024_02_22.pdf"],
  amended: "Revision of 2023, published by the Ministry in February 2024",
  facts: [["Zone", "The municipality of Yecla (Murcia) only"], ["Red grapes", "Monastrell (main), Tempranillo, Cabernet Sauvignon, Syrah, Merlot, Garnacha Tinta and Tintorera, Petit Verdot"], ["White grapes", "Macabeo, Airén, Merseguera, Malvasía Aromática, Chardonnay, Moscatel de grano menudo, Sauvignon Blanc, Verdejo, Viognier"], ["Minimum alcohol", "White 10.5%; rosé 11%; red 12%; sparkling 11.5%"], ["Yields", "Dry-farmed: white 4,500 kg/ha (33.3 hl/ha), red 4,000 kg/ha (29.6 hl/ha); irrigated: white 9,000, red 7,000; at most 74 l per 100 kg"]],
  place: "Vineyards at 535 to 870 m (average 597 m) on deep, well-drained limestone soils, with only about 300 mm of rain and over 3,000 hours of sun.",
  rules: "Dry-farmed red yields are capped at 4,000 kg/ha, among the lowest in Spain.",
  history: "The DO was set up in the mid-1970s; Bodegas Castaño pioneered quality Monastrell here.",
  glass: "Ripe, dark Monastrell with herbs and spice, often good value.",
  exam: "Only single-municipality DO in Spain; Monastrell.",
  producers: ["Bodegas Castaño", "Bodegas Barahonda", "La Purísima"]
});
APXF["es-bullas"] = mu({
  lede: "A small, high DO in north-west Murcia where Monastrell covers about 80% of the vineyard.",
  cat: "DO (DOP), red, rosé, white, Monastrell liqueur wine and sparkling", rec: "DO 1994",
  src: ["Pliego de condiciones DOP Bullas, revision 3, July 2019 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/bullas_ccaa_2019_07_01.pdf"],
  amended: "Revision 3 (July 2019); regulation of May 2006",
  facts: [["Zone", "Bullas, Cehegín, Mula, Pliego, Ricote and parts of Calasparra, Caravaca, Moratalla, Lorca, Cieza and Totana (Murcia)"], ["Grapes", "Monastrell (about 80%), Tempranillo, Cabernet Sauvignon, Syrah, Merlot, Garnacha Tinta and Tintorera, Petit Verdot; Macabeo (main white), Airén, Chardonnay, Malvasía, Moscatels, Sauvignon Blanc"], ["Minimum alcohol", "White and rosé 11%; red 12%; sparkling 11.5%; liqueur 15 to 22%"], ["Yields", "Dry-farmed: white 6,000 kg/ha, red 5,000 kg/ha; irrigated: white 8,000, red 7,000; at most 74 l per 100 kg"], ["Sparkling", "At least 9 months in bottle, vintage compulsory"], ["Liqueur wine", "Only Monastrell, oak-aged"]],
  place: "Limestone soils around Bullas at about 650 m, among the highest towns in Murcia; continental Mediterranean climate, about 15°C and 365 mm of rain.",
  rules: "Heating grapes or must on the skins to extract colour is banned.",
  history: "Recognised as a DO in 1994; old Monastrell vines need almost no spraying in the dry climate.",
  glass: "Fresher Monastrell than Jumilla, with red and black fruit and herbs.",
  exam: "Monastrell (about 80%); north-west Murcia.",
  producers: ["Bodega Balcona", "Molino y Lagares", "Bodegas del Rosario"]
});
