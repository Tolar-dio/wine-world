// Full encyclopedia entries: Navarra. Written from the pliegos de condiciones published by the Government of Navarra and the Ministry of Agriculture, checked 14 November 2026.
function na(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-navarra"] = na({
  lede: "The old kingdom between Rioja and the Pyrenees, once famous for Garnacha rosado, now making everything from Tempranillo and Cabernet reds to Chardonnay and sweet Moscatel, across five very different subzones.",
  cat: "DO (DOP), white, rosé, red, late-harvest botrytis white and liqueur wine (Moscatel, Garnacha)", rec: "Recognised 1933; Consejo Regulador 1958",
  src: ["Pliego de condiciones DOP Navarra, March 2026 version (Government of Navarra)", "https://www.navarra.es/documents/48192/34266318/Pliego+de+condiciones_DO_Navarra.pdf/dcf46c09-09bb-d1b6-d3ff-ceba1abdba4d"],
  amended: "March 2026 version, listed by the Government of Navarra as in force; the Ministry's list carries the July 2024 text",
  sources: [["Ministry of Agriculture copy, July 2024 text", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/navarra_2024_10_11.pdf"], ["Government of Navarra: protected designations", "https://www.navarra.es/es/agricultura-y-ganaderia/calidad%20agroalimentaria/denominaciones-de-origen-protegidas"]],
  facts: [["Subzones", "Baja Montaña, Ribera Alta, Ribera Baja, Tierra Estella, Valdizarbe"], ["Red grapes", "Garnacha Tinta, Tempranillo, Graciano, Mazuelo, Merlot, Cabernet Sauvignon, Syrah, Pinot Noir, Garnacha Roja"], ["White grapes", "Chardonnay, Garnacha Blanca, Viura, Malvasía, Moscatel de grano menudo, Sauvignon Blanc, Oneca"], ["Minimum alcohol", "White 10.5%; rosé 11%; red 11.5%; liqueur wines 15 to 18%"], ["Rosé", "At least 85% red grapes; bled (sangrado) must at most 40 l per 100 kg; 'Rosado Tradición' 100% Garnacha Tinta, free-run must by gravity alone"], ["Yields", "Red 8,000 kg/ha (56 hl/ha); white 9,200 kg/ha (64.4 hl/ha); at most 70 l per 100 kg; continuous presses banned"], ["Vino de Pueblo", "'Vino de' a municipality (grown, made and bottled there) or 'Viñedo en' a municipality (grown there, made elsewhere in the DO); yields cut to 6,400 kg/ha red and 7,500 white"], ["Ageing", "Roble over 90 days in barrels up to 330 l; crianza red 24 months with 9 in oak; reserva red 36 with 12; gran reserva red 60 with 18; whites 18, 24 and 48 months with 6 in oak"], ["Moscatel", "Liqueur wine at least 85% Moscatel de grano menudo; 'envejecido en roble' at least 24 months with 18 in oak"]],
  place: "From the humid foothills near Pamplona (Valdizarbe, Baja Montaña, Tierra Estella) south to the dry, hot Ribera along the Ebro. Vineyards sit at 300 to 550 m, rainfall falls from about 800 mm in the north to under 400 mm in the Ribera Baja, and the cierzo north-west wind blows hard. Soils are alkaline and chalky.",
  rules: "The 2026 text added village wines ('Vino de Pueblo') and a protected 'Rosado Tradición' made only from free-run Garnacha.",
  history: "Navarra's wines followed the pilgrim road to Santiago and the medieval kingdom's monasteries. Phylloxera arrived in 1892; the region replanted mostly with Garnacha and became known for rosado. In the 1980s the EVENA research station and producers like Chivite and Ochoa brought in Tempranillo and international grapes.",
  glass: "Rosado: bright pink, strawberry and raspberry; reds: ripe red fruit with oak; Moscatel: grapey, honeyed, apricot.",
  exam: "Five subzones; Garnacha rosado (now 'Rosado Tradición'); Moscatel; EVENA; Vino de Pueblo since 2026.",
  producers: ["Chivite", "Ochoa", "Domaines Lupier", "Viña Zorzal", "Bodegas Nekeas", "Inurrieta"]
});
APXF["es-pago-de-arinzano"] = na({
  lede: "The Señorío de Arínzano estate on the Ega river in Tierra Estella, Spain's first Vino de Pago outside Castilla-La Mancha.",
  cat: "Vino de Pago (DOP), red and white", rec: "Vino de Pago 2007 (Orden Foral 400/2007)",
  src: ["Pliego de condiciones Pago de Arínzano, April 2025 version (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/pago_de_arinzano_2026_02_05.pdf"],
  amended: "April 2025 version (lower polyphenol minimum for reds), published by the Ministry in February 2026",
  sources: [["Government of Navarra copy", "https://www.navarra.es/documents/48192/34266318/Pliego+de+condiciones_+Pago+de+Arinzano.pdf/0c112992-b72e-05f1-9281-76601164308e"]],
  facts: [["Zone", "Señorío de Arínzano, municipality of Aberin (Navarra)"], ["Grapes", "Tempranillo, Cabernet Sauvignon, Merlot; Chardonnay"], ["Minimum alcohol", "Red 12.5%; white 12%"], ["Yields", "Tempranillo and Chardonnay 6,000 kg/ha (42 hl/ha); Cabernet Sauvignon and Merlot 7,000 kg/ha (49 hl/ha); at most 70 l per 100 kg"], ["Ageing", "Oak barrels; crianza, reserva and gran reserva terms allowed"]],
  place: "Stony Pleistocene terraces and glacis on the slopes of Montejurra, crossed by the Ega, at 460 to 520 m. Atlantic influence, 12.9°C mean and about 680 mm of rain.",
  rules: "As a pago, the estate grows, makes and bottles its own wine.",
  history: "Arínzano is a historic señorío on the Ega; its modern vineyard was replanted from the late 1980s and gained pago status in 2007, the first outside Castilla-La Mancha.",
  glass: "Elegant, structured Tempranillo and Bordeaux-variety reds; barrel-fermented Chardonnay.",
  exam: "First Vino de Pago outside Castilla-La Mancha (2007); Ega river.",
  producers: ["Arínzano"]
});
APXF["es-pago-de-otazu"] = na({
  lede: "A Vino de Pago in the Cuenca de Pamplona that claims to be Spain's northernmost red-wine estate, between the Sierra del Perdón and the Sierra de Sarbil.",
  cat: "Vino de Pago (DOP), red and white", rec: "Vino de Pago 2008 (Orden Foral 575/2008)",
  src: ["Pliego de condiciones Pago de Otazu, June 2025 version (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/pago_de_otazu_2026_04_22.pdf"],
  amended: "June 2025 version, published by the Ministry in April 2026",
  sources: [["Government of Navarra copy", "https://www.navarra.es/documents/48192/29766738/Pliego+de+Condiciones+Pago+de+Otazu.pdf/9e9a2b8e-74a6-ecb5-dbd6-dfd305691864"]],
  facts: [["Zone", "Otazu (Echauri) and Eriete (Cendea de Cizur), Cuenca de Pamplona"], ["Grapes", "Tempranillo, Merlot, Cabernet Sauvignon; Chardonnay"], ["Minimum alcohol", "12.5% red and white"], ["Yields", "6,500 kg/ha (46.15 hl/ha); at least 2,400 vines/ha"], ["Ageing", "Crianza, reserva and gran reserva terms allowed, counted from 1 October"]],
  place: "Deep, stony, calcareous soils at 402 to 451 m in a valley where Atlantic and Mediterranean air meet. Winter cold lasts more than 100 days and ripening runs 15 to 20 days later than elsewhere in Navarra.",
  rules: "Single estate, low yields and the latest ripening in Navarra.",
  history: "The Señorío de Otazu, an old estate west of Pamplona, was recognised as a pago in 2008.",
  glass: "Fresh, firm reds and taut Chardonnay from a cool site.",
  exam: "Northernmost red-wine estate in Spain (its own claim); Pamplona basin; pago 2008.",
  producers: ["Bodega Otazu"]
});
APXF["es-prado-de-irache"] = na({
  lede: "A small red-wine Vino de Pago at Ayegui, near Estella, beside the old Benedictine monastery of Irache on the Camino de Santiago.",
  cat: "Vino de Pago (DOP), red", rec: "Vino de Pago 2008 (Orden Foral 574/2008)",
  src: ["Pliego de condiciones Prado de Irache, June 2025 version (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/prado_de_irache_2025_11_06.pdf"],
  amended: "June 2025 version, published by the Ministry in November 2025",
  facts: [["Zone", "Ayegui (Tierra Estella, Navarra)"], ["Grapes", "Tempranillo, Cabernet Sauvignon, Merlot, Graciano, Mazuelo, Garnacha"], ["Minimum alcohol", "12%"], ["Yields", "About 6,800 to 7,200 kg/ha by grape (47.6 to 50.4 hl/ha); continuous presses banned"], ["Ageing", "Crianza, reserva and gran reserva terms allowed, counted from 1 October"]],
  place: "495 to 550 m, slightly over 600 mm of rain and 2,200 to 2,300 hours of sun, on soils with 40 to 60% carbonates.",
  rules: "Red wine only.",
  history: "The monks of Irache tended vines for centuries; Bodegas Irache dates from 1891 and is known for the free wine fountain for pilgrims on the Camino.",
  glass: "Medium-bodied Tempranillo-led reds with red fruit and oak.",
  exam: "Vino de Pago by the Irache monastery and the Camino de Santiago.",
  producers: ["Bodegas Irache"]
});
APXF["es-bolandin"] = na({
  lede: "A single estate on a hill at Ablitas in the far south of Navarra, near the Bardenas Reales, registered as a Vino de Pago for reds, whites and a late-harvest Moscatel.",
  cat: "Vino de Pago (DOP), red, white and overripe-grape sweet white", rec: "National transitional protection 2014; EU registration 2022",
  src: ["Pliego de condiciones Bolandin, April 2025 version (Government of Navarra)", "https://www.navarra.es/documents/48192/29766738/Pliego+Condiciones++Bolandin.pdf/106b8861-2386-42ec-7e21-d98e3c7d12a7"],
  amended: "April 2025 version, published in the EU Official Journal in January 2026 and approved by Navarra in May 2026",
  facts: [["Zone", "About 170 ha around the Bolandin hill, municipality of Ablitas (Navarra)"], ["Grapes", "Cabernet Sauvignon, Merlot, Tempranillo, Syrah; Chardonnay, Sauvignon Blanc, Moscatel de grano menudo"], ["Minimum alcohol", "Red and white 12.5%; overripe Moscatel 15% total, 12.5% actual"], ["Yields", "Reds 7,300 to 7,500 kg/ha (51 to 52 hl/ha); Chardonnay and Sauvignon 7,400 kg/ha (48 hl/ha); Moscatel 7,200 kg/ha (28 hl/ha)"]],
  place: "A low hill at about 324 to 369 m, lower than the rest of DO Navarra, with red clays on the upper slopes and south-east to south-west exposures.",
  rules: "The 2025 revision added a sweet wine from overripe Moscatel de grano menudo.",
  history: "Bolandin is a historic place name in Navarra's land registry and a survey point. The estate is farmed by Pago de Cirsus; it received provisional national protection in 2014 and EU registration in 2022.",
  glass: "Ripe, structured Cabernet and Syrah reds; sweet Moscatel with apricot and honey.",
  exam: "Vino de Pago at Ablitas, southern Navarra; Pago de Cirsus.",
  producers: ["Pago de Cirsus"]
});
