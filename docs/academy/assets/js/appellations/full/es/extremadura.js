// Full encyclopedia entry: Extremadura. Written from the pliego de condiciones (Ministry of Agriculture copy), checked 14 November 2026.
function ex(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-ribera-del-guadiana"] = ex({
  lede: "Extremadura's only DO, six subzones along the Guadiana basin near Portugal, from the red clays of Tierra de Barros to granite Montánchez, with native Pardina and Cayetana alongside Portuguese grapes.",
  cat: "DO (DOP), white, rosé, red, sparkling and semi-sparkling", rec: "Consejo Regulador 1996; DO ratified 1999",
  src: ["Pliego de condiciones DOP Ribera del Guadiana, edition 03 (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/ribera_del_guadiana_2023_06_19.pdf"],
  amended: "Edition 03 of 27 October 2022, published by the Ministry in June 2023",
  facts: [["Subzones", "Tierra de Barros (36 municipalities), Matanegra (9), Ribera Alta (39), Ribera Baja (11), Montánchez (27), Cañamero"], ["White grapes", "Pardina, Cayetana Blanca, Alarije, Borba, Cigüente, Macabeo, Montúa, Eva, Malvar, Moscatels, Parellada, Perruno, Pedro Ximénez, Verdejo, Antão Vaz, Arinto, Fernão Pires, Chardonnay, Sauvignon Blanc and others"], ["Red grapes", "Tempranillo, Garnacha and Tintorera, Graciano, Jaén Tinto, Mazuela, Bobal, Monastrell, Cabernet Sauvignon, Merlot, Syrah, Petit Verdot, Pinot Noir, Malbec, Touriga Nacional, Castelão, Trincadeira"], ["Minimum alcohol", "White and rosé 9%; red 11%; sparkling 10%"], ["Yields", "White 12,000 kg/ha (84 hl/ha); red 10,000 kg/ha (70 hl/ha); at most 70 l per 100 kg"], ["Ageing", "Tinto roble 90 days (60 in oak); vino de guarda 365 days; crianza red 24 months with 6 in oak; reserva 36 with 12; gran reserva 60 with 18; counted from 1 October"]],
  place: "Tierra de Barros (average 524 m) has red 'barros' clays over limestone; Matanegra and Montánchez sit near 638 m, Montánchez on granite; Ribera Baja is lowest (289 m); Cañamero, in the Villuercas hills, is highest (849 m) on slate, with up to 1,100 mm of rain.",
  rules: "The grape list includes Portuguese varieties, reflecting the border.",
  history: "Tierra de Barros around Almendralejo is one of Spain's largest vineyards and also supplies the Cava DO. The Consejo Regulador was formed in 1996 and the DO ratified in 1999.",
  glass: "Ripe, generous Tempranillo reds; soft Pardina and Cayetana whites.",
  exam: "Six subzones; Tierra de Barros; Pardina and Cayetana; Almendralejo also in Cava.",
  producers: ["Bodegas Habla", "Palacio Quemado (Alvear)", "Bodegas Toribio", "Viña Santa Marina"]
});
