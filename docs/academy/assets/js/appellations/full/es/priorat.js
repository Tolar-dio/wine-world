// Full encyclopedia entry: Priorat. Written from the pliego de condiciones (Consell Regulador copy, April 2026).
function pr(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-priorat"] = pr({
  lede: "Steep slate (llicorella) hillsides in the mountains behind Tarragona, where old Garnacha and Cariñena give dense, mineral reds. Spain's second qualified appellation (DOQ in Catalan, DOCa in Spanish), with a four-step pyramid of village, site, classified vineyard and grand classified vineyard.",
  cat: "DOQ / DOCa (DOP), red, white, rosé, sweet and fortified (rancio, vino de licor, vino dulce natural)", rec: "DO 1954; DOQ 2000 (Catalonia), recognised nationally as DOCa in 2009",
  src: ["Pliego de condiciones DOQ Priorat, April 2026 version (Consell Regulador copy)", "https://www.doqpriorat.org/wp-content/uploads/2026/11/plec-de-condicions-doq-priorat_abril-2026.pdf"],
  amended: "Pliego, April 2026 version (amendment AM06); a further amendment was published for objections in August 2026",
  sources: [["DOQ Priorat: rules page", "https://www.doqpriorat.org/es/el-reglamento/"], ["BOE-B-2026-25980: amendment request (August 2026)", "https://www.boe.es/boe/dias/2026/08/03/pdfs/BOE-B-2026-25980.pdf"]],
  facts: [["Zone", "Bellmunt del Priorat, Gratallops, El Lloar, La Morera de Montsant with Escaladei, Poboleda, Porrera, Torroja del Priorat, La Vilella Alta, La Vilella Baixa, and parts of Falset and El Molar (Tarragona)"], ["Main grapes", "Garnacha Tinta, Garnacha Peluda, Cariñena (Samsó, Mazuela); whites Garnacha Blanca, Macabeo, Pedro Ximénez, Chenin, Viognier, Cariñena Blanca and others"], ["Minimum alcohol", "Reds 13.5%, whites and rosés 13%; grapes at least 12.5% (red) or 12% (white) potential"], ["Yields", "Red 6,000 kg/ha, white 8,000 kg/ha; at most 65 l per 100 kg"], ["Vi de vila (12 villages)", "Bellmunt, Escaladei, Gratallops, El Lloar, La Morera, Poboleda, Porrera, Torroja, La Vilella Alta, La Vilella Baixa, Masos de Falset, Solanes del Molar; 5,000 kg/ha red, 90% of vines over 5 years, reds at least 60% Cariñena and/or Garnacha"], ["Vi de paratge", "Named site: 4,000 kg/ha red, 90% of vines over 10 years"], ["Vinya classificada", "Registered single vineyard: 4,000 kg/ha red, 80% of vines at least 15 years old"], ["Gran vinya classificada", "3,000 kg/ha red, 80% of vines at least 25 years old, at least 90% Cariñena and/or Garnacha (or the listed whites)"], ["Other mentions", "Vi de guarda (reds at least 12 months in oak); vi de finca"], ["Sweet and fortified", "Rancio (oxidative, at least 5 years in wood), vino de licor, vino dulce natural; Vimblanc, a Garnacha Tinta white fermented in small oak"]],
  place: "A small, rugged basin in the Serra de Montsant and the Siurana river valley, about 30 km inland from the coast. The llicorella soils are decomposed slate and quartzite that glitter in the sun; vines grow on terraces and steep slopes from about 100 to 700 m, with hot dry summers and low yields.",
  rules: "All wines must be made, aged and bottled in registered cellars inside the zone. The place terms stack: a bottle can say Priorat, then vi de vila, then vi de paratge, then vinya classificada or gran vinya classificada, each with lower yields and older vines.",
  history: "Carthusian monks founded the priory of Scala Dei in the 12th century and gave the region its name. Phylloxera and emigration emptied it. From 1989 a group led by René Barbier, Álvaro Palacios, Daphne Glorian, Josep Lluís Pérez and Carles Pastrana (the five 'Clos') revived it with modern, concentrated reds, and in 2000 Catalonia made it a DOQ.",
  glass: "Deep red, ripe black cherry and plum, liquorice, dried herbs, a mineral, graphite-like finish; high alcohol carried by fresh acidity and firm tannin.",
  exam: "One of only two Spanish DOCa (with Rioja); llicorella slate; Garnacha and Cariñena; the vi de vila to gran vinya classificada pyramid.",
  producers: ["Álvaro Palacios (L'Ermita)", "Clos Mogador", "Clos Erasmus", "Mas Martinet", "Costers del Siurana", "Terroir al Límit", "Mas Doix", "Scala Dei", "Ferrer Bobet", "Vall Llach"]
});
