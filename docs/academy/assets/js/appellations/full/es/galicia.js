// Full encyclopedia entries: Galicia. Written from the pliegos de condiciones (Ministry of Agriculture copies), checked 14 November 2026.
function gl(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["es-rias-baixas"] = gl({
  lede: "Albariño country on the granite coast of south-west Galicia, where Atlantic estuaries (rías), heavy rain and pergola-trained vines give tense, saline whites.",
  cat: "DO (DOP), white, red and sparkling", rec: "DO 1988 (preceded by an Albariño denominación específica from 1980)",
  src: ["Pliego de condiciones DOP Rías Baixas, July 2024 text (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/rias_baixas_2024_09_30.pdf"],
  amended: "July 2024 text, published by the Ministry in September 2024",
  sources: [["Consejo Regulador DO Rías Baixas", "https://www.doriasbaixas.com/"]],
  facts: [["Subzones", "Val do Salnés, O Rosal, Condado do Tea, Soutomaior, Ribeira do Ulla (Pontevedra and A Coruña)"], ["White grapes", "Albariño, Treixadura, Loureira, Caíño Blanco, Torrontés, Godello"], ["Red grapes", "Caíño Tinto, Espadeiro, Loureiro Tinto, Sousón, Mencía, Brancellao, Pedral, Castañal"], ["Label rules", "Rías Baixas Albariño 100% Albariño; Condado do Tea at least 70% Albariño and Treixadura; O Rosal at least 70% Albariño, Loureira and/or Caíño Blanco; other subzone wines at least 70% of their listed grapes"], ["Minimum alcohol", "Albariño 11.3%; other whites 11%; barrica 11.5%; red and sparkling 10%"], ["Yields", "Albariño 12,000 kg/ha (84 hl/ha); other varieties 12,500 kg/ha; Caíño Tinto 10,000 kg/ha; at most 70 l of wine per 100 kg for whites, 72 for reds"], ["Barrica", "Oak of at most 600 l, time stated on the label"], ["Sparkling", "Second fermentation in bottle, white or red"]],
  place: "Low coastal valleys, rarely above 300 m, along the Arousa and Vigo estuaries and the Miño on the Portuguese border. Soils are poor, acidic and sandy over granite; rainfall is about 1,300 mm a year, drier in summer. The traditional emparrado (pergola) lifts the grapes away from damp ground.",
  rules: "Only a wine from 100% Albariño may be labelled 'Rías Baixas Albariño'. Subzone names come with their own blending minimums, so O Rosal and Condado do Tea are often blends.",
  history: "Albariño was the region's prized grape for centuries, legend says brought by Cluny monks. An Albariño specific denomination was created in 1980 and widened into the multi-variety Rías Baixas DO in 1988; the export boom followed in the 1990s.",
  glass: "Pale lemon; peach, apricot, citrus, white flowers; high acidity and a salty, mineral finish; lees-aged and older wines gain texture and depth.",
  exam: "Albariño (100% for the varietal label); five subzones (Val do Salnés, O Rosal, Condado do Tea, Soutomaior, Ribeira do Ulla); granite and pergolas; 1,300 mm of rain.",
  producers: ["Pazo de Señorans", "Do Ferreiro (Gerardo Méndez)", "Forjas del Salnés (Rodrigo Méndez)", "Zárate", "Palacio de Fefiñanes", "Terras Gauda"]
});
APXF["es-ribeiro"] = gl({
  lede: "Galicia's historic wine heartland around Ribadavia, where the Miño meets the Avia and Arnoia, known for aromatic Treixadura blends and the rare raisin wine Tostado.",
  cat: "DO (DOP), white, red, barrel-aged, quality sparkling and Tostado (naturally sweet, from raisined grapes)", rec: "Protected under the 1932 Wine Statute; Consejo Regulador 1956, first regulation 1957",
  src: ["Pliego de condiciones DOP Ribeiro, April 2025 text (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/ribeiro_2025_12_04.pdf"],
  amended: "April 2025 text, published by the Ministry in 2025; current regulation 2009",
  facts: [["Zone", "Ribadavia, Arnoia, Castrelo de Miño, Carballeda de Avia, Leiro, Cenlle, Beade, Punxín and Cortegada, plus parishes of O Carballiño, Boborás, Ourense, Toén and San Amaro"], ["Principal white grapes", "Treixadura, Albariño, Albilla do Avia, Branco Lexítimo, Caíño Blanco, Godello, Lado, Loureira, Torrontés"], ["Principal red grapes", "Brancellao, Caíño Bravo, Caíño Longo, Caíño Tinto, Espadeiro, Ferrón, Mencía, Merenzao, Sousón"], ["Secondary grapes", "Palomino; Garnacha Tintorera, Tempranillo"], ["Ribeiro castes", "Only principal grapes, minimum 11%; plain Ribeiro may include secondary grapes, minimum 9.5%"], ["Yields", "Principal whites 13,000 kg/ha (93.6 hl/ha), principal reds 12,000 kg/ha, secondary grapes far higher; limits move with planting density; 72 l per 100 kg for castes wines, 74 for others"], ["Tostado", "Principal grapes dried at least 3 months under cover; must at least 350 g/l sugar; 13% actual alcohol; at most 40 l per 100 kg of raisins; at least 6 months in oak or cherry wood and 3 in bottle"], ["Barrica", "Casks up to 600 l, minimum 12%"]],
  place: "River valleys of the Miño, Avia and Arnoia, with vineyards on terraces below about 450 m. Soils are mostly granite, with mica schists around the edges; the climate is Atlantic with a drier, warmer ripening season than the coast.",
  rules: "Ribeiro has two tiers: 'castes' (native principal grapes only) and plain Ribeiro, which may include Palomino and other secondary grapes in any proportion.",
  history: "Ribeiro wine was exported from Ribadavia to England and the Low Countries in the Middle Ages. Phylloxera and mass replanting with Palomino and Garnacha Tintorera brought decline; since the 1980s growers have returned to Treixadura and other native grapes.",
  glass: "Treixadura blends: ripe apple, pear, citrus, white flowers, medium acidity and a rounder texture than Rías Baixas. Tostado: amber, raisin, fig, honey and nuts.",
  exam: "Treixadura; Ribadavia; Tostado (raisin wine); one of Spain's oldest protected wine names.",
  producers: ["Viña Meín", "Emilio Rojo", "Coto de Gomariz", "Luis Anxo Rodríguez (Arsenio Paz)", "Casal de Armán"]
});
APXF["es-ribeira-sacra"] = gl({
  lede: "Breathtaking terraced slopes plunging to the Miño and Sil rivers in Lugo and Ourense, where every grape is picked by hand for light, fragrant Mencía reds.",
  cat: "DO (DOP), red, white and rosé", rec: "Vino de la Tierra 1991; DO 1996 (Order of 30 May 1995)",
  src: ["Pliego de condiciones DOP Ribeira Sacra, January 2025 text (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/ribeira_sacra_2025_03_12.pdf"],
  amended: "January 2025 text, published by the Ministry in March 2025",
  facts: [["Subzones", "Amandi, Chantada, Quiroga-Bibei, Ribeiras do Miño, Ribeiras do Sil"], ["Zone", "20 municipalities in Lugo and Ourense"], ["Principal red grapes", "Mencía, Brancellao, Merenzao, Sousón, Caíño Tinto, Caíño Longo, Caíño Bravo"], ["Principal white grapes", "Godello, Loureira, Treixadura, Dona Branca, Albariño, Torrontés, Branco Lexítimo, Caíño Blanco"], ["Secondary grapes", "Garnacha Tintorera, Mouratón, Tempranillo, Gran Negro"], ["Blends", "Reds at least 70% Mencía; Súmmum at least 85% principal grapes; rosé at least 85% principal reds and always Súmmum"], ["Minimum alcohol", "11%; barrica and garda 12%"], ["Yields", "Red 7,500 kg/ha (51.75 hl/ha); white 12,000 kg/ha (82.8 hl/ha); at most 69 l per 100 kg; continuous and centrifugal presses banned"], ["Harvest", "Entirely by hand"], ["Ageing", "Barrica red at least 6 months in barrels up to 500 l, white 3 months up to 600 l; garda red at least 7 months, white 4, in wood or other non-steel vessels"]],
  place: "Steep slopes built into terraces (socalcos, bancales) above the gorges of the Miño and Sil, on soils that range from granite to slate over a slate base. Rainfall is 700 to 800 mm; aspect and altitude decide ripeness, and the canyons trap heat.",
  rules: "The compulsory hand harvest reflects the slopes, often worked as 'heroic viticulture' with monorails. Súmmum marks wines of mostly principal grapes.",
  history: "The Romans terraced these slopes, and medieval monasteries, which gave the 'Sacred Bank' its name, expanded them. The area became a Vino de la Tierra in 1991 and a DO in 1996.",
  glass: "Light-to-medium ruby; red cherry, raspberry, violets, wet slate, black pepper; fresh acidity and fine tannin.",
  exam: "Mencía; heroic terraced viticulture on the Sil and Miño; five subzones; compulsory hand harvest.",
  producers: ["Adega Algueira", "Guímaro", "Dominio do Bibei", "Envínate", "Regina Viarum", "Adega Vella"]
});
APXF["es-valdeorras"] = gl({
  lede: "The eastern gateway of Galicia along the Sil in Ourense, on slate soils, home of the Godello revival.",
  cat: "DO (DOP), white, red, rosé, sparkling and Tostado", rec: "DO 1957 (declared by the Ministry of Agriculture)",
  src: ["Pliego de condiciones DOP Valdeorras, October 2024 text (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/valdeorras_2024_12_04.pdf"],
  amended: "October 2024 text, published by the Ministry in December 2024",
  facts: [["Zone", "Eight municipalities in Ourense: O Barco de Valdeorras, A Rúa, Vilamartín de Valdeorras, O Bolo, Carballeda de Valdeorras, Larouco, Petín, Rubiá"], ["Preferred white grapes", "Godello, Loureira, Treixadura, Dona Branca, Albariño, Torrontés, Lado; also Palomino"], ["Preferred red grapes", "Mencía, Tempranillo (Araúxa), Brancellao, Merenzao, Sousón, Caíño Tinto, Espadeiro, Ferrón; also Gran Negro, Garnacha Tintorera, Mouratón"], ["Varietal labels", "Valdeorras Godello 100% Godello; Mencía at least 85%; Castes Nobres at least 85% preferred grapes; white sparkling at least 85% Godello"], ["Minimum alcohol", "10.5% basic; Godello, Mencía and Castes Nobres 11.5%; Tostado and sparkling 11%; controlled production and aged wines 12.5%"], ["Yields", "15,000 kg/ha (108 hl/ha); preferred grapes 12,500 kg/ha (90 hl/ha); controlled production 6,000 kg/ha red, 8,000 Godello; at most 72 l per 100 kg"], ["Tostado", "Grapes dried naturally at least 30 days; at most 40 l per 100 kg of raisins"], ["Ageing terms", "Barrica, crianza, reserva, gran reserva"]],
  place: "The Sil valley, crossing the comarca east to west, at 300 to 700 m (best above 450 m). Soils are shallow, stony Ordovician and Silurian slate, with some granite; rainfall is 850 to 1,000 mm, with more continental warmth than coastal Galicia.",
  rules: "A wine labelled Valdeorras Godello must be pure Godello. The low-yield 'producción controlada' mention is the DO's premium tier.",
  history: "Romans mined gold here and planted vines. By the 1970s Godello had almost disappeared; the Recuperación de Godello project (1974), led by Horacio Fernández and Luis Hidalgo, saved it, and producers such as Rafael Palacios made it famous.",
  glass: "Godello: pear, quince, citrus, fennel, a stony, textured palate with good acidity; lees and oak bring Burgundian weight.",
  exam: "Godello (100% for the varietal label) on slate; Sil valley; Rafael Palacios (As Sortes).",
  producers: ["Rafael Palacios", "Valdesil", "Godeval", "Telmo Rodríguez (Gaba do Xil)", "Bodegas Avancia", "A Coroa"]
});
APXF["es-monterrei"] = gl({
  lede: "Galicia's warmest, most inland DO, in the Támega valley around Verín near the Portuguese border, making Godello, Treixadura and Mencía with a continental edge.",
  cat: "DO (DOP), white, red and rosé", rec: "DO regulation approved by Galicia in 1994, ratified by the Ministry in 1996",
  src: ["Pliego de condiciones DOP Monterrei, July 2025 text (Ministry of Agriculture copy)", "https://www.mapa.gob.es/dam/mapa/contenido/alimentacion/temas/calidad-agroalimentaria/2017-calidad-diferenciada/nuevo_denominaciones/pliegos-de-condiciones/pliego-condiciones-vinos/dops/monterrei_2025_09_12.pdf"],
  amended: "July 2025 text, published by the Ministry in September 2025",
  sources: [["Consejo Regulador DO Monterrei", "http://www.domonterrei.wine/"]],
  facts: [["Subzones", "Valle de Monterrei (parishes of Castrelo do Val, Monterrei, Oímbra, Verín) and Ladera de Monterrei (Vilardevós and parishes of Castrelo do Val, Oímbra, Monterrei, Verín, Riós, Cualedro, Laza)"], ["White grapes", "Godello, Treixadura, Albariño, Blanca de Monterrei, Caíño Blanco, Dona Branca, Loureira"], ["Red grapes", "Mencía, Merenzao, Sousón, Caíño Tinto, Tempranillo (Araúxa)"], ["Rosé", "At least 85% red grapes"], ["Minimum alcohol", "11%; aged whites 11.5%, aged reds 12%"], ["Yields", "White 13,200 kg/ha (97.68 hl/ha); red 10,000 kg/ha (74 hl/ha); at most 74 l per 100 kg"], ["Ageing terms", "Barrica, crianza, reserva, gran reserva"]],
  place: "A broad valley floor and surrounding slopes on slate and schist (for reds), granite and sand (for whites) and mixed sediments. The climate is Mediterranean with continental and Atlantic touches: hot dry summers, cold winters and day-night swings of up to 30°C during ripening.",
  rules: "Two subzones, valley and slope; no further varietal minimums beyond rosé.",
  history: "The medieval fortress of Monterrei overlooks the valley above Verín. The pliego credits the DO with the recovery of native varieties after its recognition in the 1990s.",
  glass: "Godello and Treixadura whites: ripe stone fruit, herbs, fuller body; Mencía reds: riper and rounder than coastal Galicia.",
  exam: "Warmest Galician DO; Verín and the Támega valley; Godello, Treixadura, Mencía.",
  producers: ["Quinta da Muradella", "Pazos del Rey", "Gargalo", "Adegas Triay"]
});
