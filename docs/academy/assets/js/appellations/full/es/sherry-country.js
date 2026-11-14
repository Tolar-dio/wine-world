// Full encyclopedia entries: Sherry Country. Written from the pliegos de condiciones (Consejo Regulador copies, consolidated to the Order of 13 May 2026).
function sh(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-jerez-xeres-sherry"] = sh({
  lede: "Sherry: wines from the albariza chalk of the Cádiz triangle, aged in criaderas and soleras either under a veil of flor yeast (Fino), without it (Oloroso), or in sequence (Amontillado, Palo Cortado), plus sweet Pedro Ximénez and Moscatel. Spain's oldest regulated wine name.",
  cat: "DO (DOP), fortified and unfortified wines (vino and vino de licor)", rec: "Statute 1932; Consejo Regulador 1935",
  src: ["Pliego de condiciones DOP Jerez-Xérès-Sherry, consolidated to the Order of 13 May 2026 (Consejo Regulador copy)", "https://www.sherry.wine/documents/597/21052026_Pliego_Jerez_1wBQg8y.pdf"],
  amended: "Consolidated pliego, Order of 13 May 2026 (BOJA no. 95, 20 May 2026)",
  sources: [["Consejo Regulador: documents page", "https://www.sherry.wine/sherry-region/consejo-regulador/documentaci%C3%B3n"]],
  facts: [["Also called", "Jerez, Xérès or Sherry, each on its own"], ["Grapes", "Palomino (Listán Blanco or Palomino Fino), Pedro Ximénez, Moscatel de Alejandría, and the historic Beba, Perruno and Vigiriega"], ["Zone", "Jerez de la Frontera, El Puerto de Santa María, Sanlúcar de Barrameda, Trebujena, Chipiona, Rota, Puerto Real, Chiclana de la Frontera, Lebrija and San José del Valle (Cádiz and Seville provinces)"], ["Vinos generosos (dry)", "Fino (biological ageing only), Amontillado (biological then oxidative), Palo Cortado (mainly oxidative after the flor dies), Oloroso (oxidative only); at least 2 years' average age; may be fortified (vino de licor) or unfortified (vino)"], ["Alcohol and sugar", "Fino 14 to 17%, up to 4 g/l; Amontillado 16 to 22%; Oloroso and Palo Cortado 17 to 22%, all dry (up to 4 g/l)"], ["Sweet and blended", "Pedro Ximénez (at least 85% sun-dried PX, at least 212 g/l sugar), Moscatel (at least 85% Moscatel, 160 g/l), Dulce; blends Pale Dry (4 to 50 g/l), Pale Cream (50 to 115), Medium (4 to 115), Cream (115 to 140)"], ["Yield", "11,428 kg/ha; grapes above that, or from vineyards over 12,570 kg/ha, may only go into complementary products; at most 70 l per 100 kg"], ["Casks", "Oak butts of at most 1,000 litres (larger or other woods only if historic and approved)"], ["Ageing systems", "Criaderas y solera (dynamic; average age t = total stock / annual sales) or añadas (static, vintage)"], ["Age mentions", "Fino Viejo (at least 7 years); 12 and 15 years; VOS (Very Old Sherry, over 20 years); VORS (Very Old Rare Sherry, over 30 years); Añada (vintage)"], ["Place mentions", "Pagos (named vineyard areas, listed in Annex 2) and 'Jerez Superior' vineyards classified by the Consejo; 'pago' itself cannot appear on labels because 'vino de pago' is a protected term"], ["Other labels", "'En rama' for wines with no stabilisation beyond light filtering"]],
  place: "The marco de Jerez in south-western Andalusia between the Guadalquivir and Guadalete rivers. The white albariza soils (chalky, diatom-rich marls) hold winter rain through hot, dry summers. The humid westerly poniente and the dry easterly levante shape the flor in the bodegas.",
  rules: "Fino may be aged in any town of the zone except Sanlúcar de Barrameda, whose biologically aged wine is Manzanilla. Crianza can use the solera system or single vintages. 'Asoleo' (sun-drying grapes) is traditional for PX and Moscatel. Recent reforms widened the zone to Lebrija and San José del Valle, allowed unfortified wines with the same type names, and introduced pagos.",
  history: "Jerez wine was exported to England from the Middle Ages; 'sack' appears in Shakespeare. The solera system developed in the 18th and 19th centuries, when British and Spanish houses (Domecq, González Byass, Osborne, Garvey, Sandeman) built the trade. The 1932 statute made Jerez one of Spain's first DOs, with the Consejo Regulador founded in 1935.",
  glass: "Fino: pale, almond, bread dough, chamomile, saline, bone dry. Amontillado: amber, hazelnut, still dry and tangy. Oloroso: mahogany, walnut, leather, rich but dry. Palo Cortado: Amontillado's nose with Oloroso's body. PX: ebony, raisin, fig, molasses, very sweet.",
  exam: "Know the four dry styles by ageing (biological, oxidative, mixed); VOS over 20 years, VORS over 30; Palomino is the main grape; albariza soil; solera system.",
  producers: ["González Byass (Tío Pepe)", "Lustau", "Bodegas Tradición", "Valdespino", "Equipo Navazos", "Fernando de Castilla", "El Maestro Sierra", "Williams & Humbert", "Osborne", "Emilio Hidalgo"]
});
APXF["es-manzanilla-sanlucar-de-barrameda"] = sh({
  lede: "Manzanilla: the Fino-style sherry aged under flor only in the bodegas of Sanlúcar de Barrameda, at the mouth of the Guadalquivir, where sea humidity keeps the flor thick year-round.",
  cat: "DO (DOP), fortified wine aged under flor", rec: "Separate DO 1964",
  src: ["Pliego de condiciones DOP Manzanilla-Sanlúcar de Barrameda, consolidated May 2026 (Consejo Regulador copy)", "https://www.sherry.wine/documents/598/21052026_Pliego_Manzanilla_WA1VuvD.pdf"],
  amended: "Consolidated pliego, Order of 13 May 2026",
  sources: [["Consejo Regulador: documents page", "https://www.sherry.wine/sherry-region/consejo-regulador/documentaci%C3%B3n"]],
  facts: [["Also called", "Manzanilla de Sanlúcar de Barrameda, Manzanilla de Sanlúcar, or Manzanilla alone"], ["Grape", "Palomino (Listán Blanco or Palomino Fino)"], ["Production zone", "The same ten municipalities as Jerez"], ["Ageing zone", "Only the municipality of Sanlúcar de Barrameda"], ["Ageing", "Biological ageing under flor for at least 2 years"], ["Alcohol", "14 to 17%"], ["Yield", "11,428 kg/ha (as Jerez)"], ["Mentions", "Manzanilla Pasada (average age at least 7 years, slight oxidation); Añada"], ["Note", "Wines aged outside Sanlúcar can never become Manzanilla"]],
  place: "Sanlúcar sits between the Guadalquivir estuary, the Doñana marshes and the Atlantic. Its bodegas, built to catch sea breezes, have cooler and more humid conditions than Jerez or El Puerto, so the flor stays thicker and longer.",
  rules: "The Manzanilla name depends on where the wine is aged, not where the grapes grow.",
  history: "Sanlúcar's wine trade dates to the voyages that left its port (Columbus's third voyage, Magellan in 1519). Manzanilla gained its own DO in 1964, separate from Jerez but run by the same Consejo Regulador.",
  glass: "Very pale, chamomile ('manzanilla' also means chamomile), green apple, salt, yeast and almond; lighter and more saline than Fino. Pasada is deeper and nuttier.",
  exam: "Manzanilla must be aged in Sanlúcar; Manzanilla Pasada at least 7 years.",
  producers: ["Barbadillo", "Hidalgo-La Gitana", "Bodegas Delgado Zuleta", "Herederos de Argüeso", "La Guita (Grupo Estévez)", "Bodegas Yuste"]
});
