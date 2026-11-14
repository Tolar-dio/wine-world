// Full encyclopedia entries: Castilla-La Mancha. Written from the pliegos de condiciones published by the Junta de Comunidades de Castilla-La Mancha, checked 14 November 2026.
function cm(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = (o.src ? [o.src] : []).concat(o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const CLMSRC = ["Junta de Castilla-La Mancha: quality schemes (DOP, IGP)", "https://apliagri.castillalamancha.es/figuras-de-calidad-dop-igp-etg"];
APXF["es-la-mancha"] = cm({
  lede: "The biggest single wine appellation in Europe by vineyard area, on the high, hot, dry plateau of central Spain, once the land of bulk Airén and now increasingly of Tempranillo (Cencibel), international reds and fresh whites.",
  cat: "DO (DOP), white, rosé, red, quality sparkling, semi-sparkling, naturally sweet and low-alcohol wines", rec: "DO 1966 (current regulation from the 1970s onward)",
  src: ["Pliego de condiciones DOP La Mancha, amendment AM08, 2026 (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2026-09/PC_DOP_La_Mancha_AM08_2026_0.pdf"],
  amended: "Amendment AM08 (2026); the Ministry's list carries the November 2025 version", sources: [CLMSRC],
  facts: [["Zone", "Municipalities in Albacete, Ciudad Real, Cuenca and Toledo across the southern Meseta"], ["White grapes", "Airén, Macabeo (Viura), Verdejo, Sauvignon Blanc, Chardonnay, Moscatels, Albariño, Gewürztraminer, Parellada, Pedro Ximénez, Riesling, Torrontés, Viognier"], ["Red grapes", "Cencibel (Tempranillo), Garnacha Tinta and Tintorera, Cabernet Sauvignon and Franc, Merlot, Syrah, Monastrell, Bobal, Graciano, Malbec, Mencía, Moravia Dulce, Petit Verdot and others"], ["Minimum alcohol", "White and rosé 9% actual (10.5% total); red, semi-sparkling and sparkling 11.5%; naturally sweet 13%; low-alcohol wines from 4.5%"], ["Yields", "Bush vines 10,000 kg/ha (74 hl/ha); trellis 13,000 kg/ha (96.2 hl/ha)"], ["Ageing", "Crianza red 24 months (white 18) with 6 in oak; reserva red 36 with 12; gran reserva red 60 with 18"], ["Varietal labels", "At least 85% of the named grape"]],
  place: "A vast plateau mostly at 600 to 800 m, with an extreme continental climate: very hot summers, cold winters and only 300 to 350 mm of rain. Soils are red-brown clays over limestone, often with a chalky crust.",
  rules: "The 2026 text keeps generous trellis yields and adds a category of low-alcohol wines, reflecting the DO's role as a high-volume producer.",
  history: "The land of Don Quixote has grown vines for centuries, traditionally Airén vinified in clay tinajas. EU grubbing-up and conversion schemes since the 1990s replaced much Airén with Tempranillo and international varieties.",
  glass: "Airén: neutral, fresh and fruity when cool-fermented; Cencibel reds: red cherry, plum, sweet spice, soft tannin.",
  exam: "Largest DO by area; Airén and Cencibel; tinajas; extreme continental climate.",
  producers: ["Bodegas Ayuso", "Vinícola de Tomelloso", "Bodegas Verum", "Bodegas Volver", "Finca Antigua"]
});
APXF["es-valdepenas"] = cm({
  lede: "An island of red-wine tradition inside La Mancha, around the town of Valdepeñas, famed for soft Cencibel reds aged in oak and once sold by the jug in Madrid's taverns.",
  cat: "DO (DOP), white, rosé, red (including traditional red), sparkling", rec: "DO 1932",
  src: ["Pliego de condiciones DOP Valdepeñas, consolidated text (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-09/PLIEGO_CONSOLID_VALDEPE%C3%91AS.pdf"],
  amended: "Consolidated text, version listed by the Ministry in September 2019", sources: [CLMSRC],
  facts: [["Zone", "Valdepeñas, Santa Cruz de Mudela, Moral de Calatrava, Alcubillas, San Carlos del Valle, Torrenueva and parts of Alhambra and Granátula (Ciudad Real)"], ["White grapes", "Airén, Macabeo, Chardonnay, Sauvignon Blanc, Moscatel de grano menudo, Verdejo"], ["Red grapes", "Cencibel (Tempranillo), Garnacha Tinta, Cabernet Sauvignon, Merlot, Syrah, Petit Verdot"], ["Minimum alcohol", "White 11%; rosé 11.5%; traditional red 12%; red 12.5%; sparkling 11%"], ["Blends", "Reds at least 85% red grapes; rosé at least 25% red grapes; 'tinto tradicional' at least 85% red grapes, the rest white"], ["Yields", "White 8,000 kg/ha (56 hl/ha); red 7,500 kg/ha (52.5 hl/ha)"], ["Ageing", "Crianza 24 months for reds, 18 for whites, with 6 in oak; reserva 36 months; gran reserva 60 months with 18 in oak"]],
  place: "A plain at about 705 m in southern Ciudad Real, with a continental climate, little rain and limestone subsoils that hold water.",
  rules: "Valdepeñas keeps a 'tinto tradicional' category in which white grapes may be blended with red, a relic of the old claret style.",
  history: "Valdepeñas wine supplied Madrid from the 16th century and was among the DOs of the 1932 Wine Statute. The town is famous for its underground cellars and clay tinajas, now largely replaced by oak and steel.",
  glass: "Cencibel reds: ripe red fruit, vanilla and coconut from American oak, soft and round; good-value reservas and gran reservas.",
  exam: "DO 1932; Cencibel; traditional red with white grapes; island inside La Mancha.",
  producers: ["Félix Solís", "Bodegas Navarro López", "Bodegas Real", "Los Llanos"]
});
APXF["es-almansa"] = cm({
  lede: "The south-eastern corner of Castilla-La Mancha, on the border with Valencia and Murcia, home of Garnacha Tintorera (the red-fleshed Alicante Bouschet) and Monastrell.",
  cat: "DO (DOP), white, rosé, red, semi-sweet and sweet, quality sparkling", rec: "DO 1966",
  src: ["Pliego de condiciones DOP Almansa, July 2025 (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-11/PC_DOP_ALMANSA_20250709.pdf"],
  amended: "Version of 9 July 2025, published by the Ministry in April 2026", sources: [CLMSRC],
  facts: [["Zone", "Almansa, Alpera, Bonete, Chinchilla de Monte-Aragón, Corral-Rubio, Higueruela, Hoya Gonzalo, Pétrola and El Villar de Chinchilla (Albacete)"], ["Red grapes", "Garnacha Tintorera, Monastrell, Cabernet Sauvignon, Tempranillo, Syrah, Merlot, Garnacha Tinta, Petit Verdot, Pinot Noir, Cabernet Franc"], ["White grapes", "Chardonnay, Sauvignon Blanc, Verdejo, Macabeo, Garnacha Blanca, Moscatel de grano menudo"], ["Minimum alcohol", "Dry white and rosé 11.5%; dry red 12%; sweet styles 9% actual (11.5% total); sparkling 10%"], ["Yields", "Bush vines: white 7,860 kg/ha (55 hl/ha), red 6,430 kg/ha; trellis: white 11,430 kg/ha (80 hl/ha), red 10,000 kg/ha (74 hl/ha)"], ["Varietal labels", "At least 85% of the named grape"]],
  place: "The transition from the Meseta to the Levante, rising from about 400 m to over 700 m; very dry, about 250 mm of rain a year, with chalky soils.",
  rules: "Almansa is the main appellation built around Garnacha Tintorera, one of the few red-fleshed grapes.",
  history: "Almansa was founded as a DO in 1966. Its bulk wines, deeply coloured from Garnacha Tintorera, were long used to give colour to blends elsewhere.",
  glass: "Garnacha Tintorera and Monastrell: inky, blackberry, plum, liquorice, firm structure.",
  exam: "Garnacha Tintorera (Alicante Bouschet) and Monastrell; Albacete; DO 1966.",
  producers: ["Bodegas Atalaya", "Bodegas Piqueras", "Santa Quiteria"]
});
APXF["es-manchuela"] = cm({
  lede: "High plateau and river gorges of the Júcar and Cabriel in Cuenca and Albacete, Spain's second home of Bobal, with old bush vines and a modern orange-wine category.",
  cat: "DO (DOP), white (including orange wine), rosé, red, quality sparkling", rec: "DO 2000",
  src: ["Pliego de condiciones DOP Manchuela, consolidated 'normal' amendment (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2026-01/PC_Modificaci%C3%B3n_normal_Consolidado.pdf"],
  amended: "Consolidated text posted January 2026; published by the Ministry in April 2026", sources: [CLMSRC],
  facts: [["Zone", "25 municipalities in Albacete (including Casas Ibáñez, Villamalea, Mahora, Alcalá de Júcar) and a group in Cuenca (including Alarcón and Iniesta)"], ["Red grapes", "Bobal, Cencibel (Tempranillo), Garnacha Tinta and Tintorera, Monastrell, Moravia Dulce and Agria, Cabernet Sauvignon, Merlot, Syrah, Malbec, Mazuela, Graciano, Rojal Tinta, Frasco (Tinto Velasco) and others"], ["White grapes", "Albillo Real, Albillo Dorado, Chardonnay, Macabeo, Garnacha Blanca, Sauvignon Blanc, Verdejo, Pardillo, Tardana, Viognier, Moscatels"], ["Minimum alcohol", "White, rosé and orange 10.5%; red 12%; sparkling 10.5%"], ["Rosé", "At least 85% red grapes"], ["Orange wine", "Vino naranja: white grapes fermented on their skins"], ["Yields", "Bush vines: white 7,860 kg/ha, red 6,430 kg/ha (45 hl/ha); trellis: white 11,430 kg/ha, red 10,000 kg/ha (70 hl/ha)"], ["Oak", "At least 2 months for roble or barrel-aged mentions"]],
  place: "Vineyards at 600 to 1,100 m on a plateau cut by the Júcar and Cabriel gorges. The climate is continental with humid easterly winds from the Levante; hot days and cool nights slow ripening.",
  rules: "Manchuela added orange wine (skin-contact whites) to its rules in the 2020s, alongside its Bobal focus.",
  history: "A cooperative region next to Valencia's Utiel-Requena, it became a DO in 2000; Finca Sandoval and Ponce brought it international notice with old-vine Bobal and Moravia Agria.",
  glass: "Bobal: deep purple, blueberry, black cherry, fresh acidity and firm tannin; rosado bright and fruity.",
  exam: "Bobal; Júcar and Cabriel gorges; orange wine category.",
  producers: ["Finca Sandoval", "Bodegas Ponce", "Bodegas Altolandón", "Cooperativa San Antonio Abad"]
});
APXF["es-mentrida"] = cm({
  lede: "North-west Toledo, on the edge of the Sierra de Gredos, where old Garnacha vines have been reborn as a source of fresh, perfumed reds.",
  cat: "DO (DOP), white, rosé, red (incl. vat-aged 'tonel'), quality sparkling", rec: "DO 1976",
  src: ["Pliego de condiciones DOP Méntrida, amendment AM04, July 2022 (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-09/MOD_AM04_PC_MENTRIDA_20220725_DF.pdf"],
  amended: "AM04 (July 2022), published by the Ministry in December 2022", sources: [CLMSRC],
  facts: [["Zone", "Municipalities of north-west Toledo, including Méntrida, Almorox, Camarena, Casarrubios del Monte and El Casar de Escalona"], ["Red grapes", "Garnacha Tinta, Garnacha Peluda, Garnacha Tintorera, Moravia Agria, Tempranillo, Cabernet Sauvignon, Merlot, Syrah, Petit Verdot, Cabernet Franc, Graciano"], ["White grapes", "Albillo Real, Macabeo, Sauvignon Blanc, Chardonnay, Verdejo, Moscatel de grano menudo, Garnacha Blanca"], ["Minimum alcohol", "White and rosé 11.5%; red 12%; sparkling 10%"], ["Yields", "Bush vines 7,150 kg/ha (50 hl/ha); trellis 12,850 kg/ha (90 hl/ha); 20% less for Vino de Pueblo"], ["Tonel", "White at least 2 months in vats of 200 to 2,000 l; red at least 2 months in vats up to 5,000 l"], ["Ageing", "Roble at least 2 months in barrels of 200 to 500 l; crianza at least 24 months"]],
  place: "Slopes rising toward Gredos, with granite and sandy soils, hot summers and barely 300 mm of rain.",
  rules: "Méntrida recognises a 'Vino de Pueblo' tier and the traditional use of large wooden vats (toneles).",
  history: "Méntrida supplied bulk Garnacha to Madrid. The modern DO dates from 1976, and since the 2010s growers such as Jiménez-Landi and Canopy have revived its old vines alongside the wider Gredos movement.",
  glass: "Garnacha: raspberry, red cherry, herbs, granite freshness; lighter and more perfumed than older Méntrida styles.",
  exam: "Gredos Garnacha in Toledo; Vino de Pueblo; toneles (large vats).",
  producers: ["Jiménez-Landi", "Bodegas Arrayán", "Canopy", "Bodegas Tierra Calma"]
});
APXF["es-mondejar"] = cm({
  lede: "A small DO in southern Guadalajara, in the Tajo and Tajuña valleys of the Alcarria, making Malvar and Airén whites and Tempranillo reds.",
  cat: "DO (DOP), white, rosé and red", rec: "DO 1996",
  src: ["Pliego de condiciones DOP Mondéjar, March 2022 (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-09/PLIEGO_MONDEJAR_20220311.pdf"],
  amended: "Version of 11 March 2022, published by the Ministry in October 2022", sources: [CLMSRC],
  facts: [["Zone", "21 municipalities in Guadalajara, including Mondéjar, Pastrana, Sacedón, Almoguera and Zorita de los Canes"], ["Red grapes", "Cencibel (Tempranillo), Cabernet Sauvignon, Syrah, Merlot"], ["White grapes", "Airén, Malvar, Macabeo, Torrontés, Sauvignon Blanc, Moscatel de grano menudo, Verdejo"], ["Minimum alcohol", "Young white 10%; rosé and red 11%"], ["Rosé", "100% red grapes"], ["Yields", "Bush vines: white 7,860 kg/ha (55 hl/ha), red 7,430 kg/ha (52 hl/ha); higher on trellis"], ["Ageing", "Crianza 24 months; reserva 36; gran reserva 60"]],
  place: "The Alcarria plateau and valleys of the Tajo and Tajuña, at the north-eastern edge of the region, with a continental climate.",
  rules: "Rosé must be made only from red grapes.",
  history: "Mondéjar supplied Madrid and Alcalá de Henares for centuries; it became a DO in 1996.",
  glass: "Malvar whites: fresh, light, citrus and apple; Tempranillo reds: soft and fruity.",
  exam: "Malvar; Guadalajara's Alcarria.",
  producers: ["Bodegas Mariscal"]
});
APXF["es-ribera-del-jucar"] = cm({
  lede: "Seven villages along the Júcar in southern Cuenca making Cencibel and Bobal reds, including a 'tradición' style aged in big wooden tinas.",
  cat: "DO (DOP), white, rosé and red", rec: "DO 2003",
  src: ["Pliego de condiciones DOP Ribera del Júcar, amendment AM02 (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-09/AM02_PLIEGO_DOP_RIBERA_JUCAR_0.pdf"],
  amended: "AM02, published by the Ministry in August 2021", sources: [CLMSRC],
  facts: [["Zone", "Named polygons of Casas de Benítez, Casas de Fernando Alonso, Casas de Guijarro, Casas de Haro, Pozoamargo, Sisante and El Picazo (Cuenca)"], ["Red grapes", "Cencibel (Tempranillo), Bobal, Cabernet Sauvignon and Franc, Merlot, Syrah, Petit Verdot, Garnacha Tinta and Tintorera, Monastrell"], ["White grapes", "Moscatel de grano menudo, Sauvignon Blanc, Airén, Macabeo, Verdejo, Pardillo (Marisancho), Chardonnay"], ["Minimum alcohol", "White and rosé 10.5%; red 12%"], ["Yields", "Bush vines 10,140 kg/ha (75 hl/ha); trellis 12,170 kg/ha (90 hl/ha)"], ["Vino tradición", "Red with at least 4 months in wooden tinas of 5,000 to 20,000 l, or 2 months in 225 to 330 l barrels"], ["Ageing", "Crianza 24 months with 6 in oak; reserva 36 with 12"]],
  place: "A plateau averaging about 750 m along the Júcar, with continental extremes.",
  rules: "The 'tradición' red keeps alive large-vat ageing in tinas.",
  history: "A cooperative-based area recognised as a DO in 2003.",
  glass: "Ripe, fruity Cencibel and Bobal reds.",
  exam: "Júcar valley, Cuenca; 'vino tradición' aged in wooden tinas.",
  producers: ["Bodegas Illana"]
});
APXF["es-ucles"] = cm({
  lede: "The highest DO in Castilla-La Mancha, in the Sierra de Altomira between Cuenca and Toledo, around the monastery town of Uclés, with yields tied to vine age.",
  cat: "DO (DOP), red, white, rosé and quality sparkling", rec: "DO 2005",
  src: ["Pliego de condiciones DOP Uclés, December 2024 (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-08/PLIEGO_DE_CONDICIONES_D.O._UCLES_12-12-2024.pdf"],
  amended: "Version of 12 December 2024, published by the Ministry in September 2025", sources: [CLMSRC],
  facts: [["Zone", "Municipalities in Cuenca (including Uclés, Huete, Tarancón, Belinchón) and Toledo (including parts of Cabezamesada and Corral de Almaguer)"], ["Red grapes", "Tempranillo (Cencibel), Cabernet Sauvignon and Franc, Merlot, Syrah, Garnacha Tinta, Mazuela, Malbec, Petit Verdot, Tinto Velasco, Graciano, Touriga Nacional"], ["White grapes", "Verdejo, Chardonnay, Moscatel de grano menudo, Sauvignon Blanc, Macabeo, Airén, Viognier, Albariño"], ["Minimum alcohol", "Red 12%; rosé 11.5%; young white 10%; sparkling 10%"], ["Red yields by vine age", "Over 40 years: 5,000 kg/ha bush, 8,000 trellis; 15 to 40 years: 6,500 / 9,500; 6 to 15 years: 8,000 / 11,000"], ["Ageing", "Roble at least 2 months; crianza at least 24 months with 6 in 330 l oak"]],
  place: "Hills of the Sierra de Altomira at 500 to 800 m in the west and 600 to 1,200 m in the east, the highest DO in the region, with dry Augusts and Septembers and large temperature swings.",
  rules: "Red-wine yields fall as vines age, rewarding old vineyards.",
  history: "The fortress-monastery of Uclés, seat of the Order of Santiago, overlooks the vineyards. The DO dates from 2005.",
  glass: "Fresh, structured Tempranillo with red fruit and good acidity from altitude.",
  exam: "Highest DO in Castilla-La Mancha; yields linked to vine age; Uclés monastery.",
  producers: ["Bodegas Fontana", "Finca La Estacada"]
});
APXF["es-campo-de-calatrava"] = cm({
  lede: "A new DO in the volcanic Campo de Calatrava south of Ciudad Real, approved in the 2020s, with dark, mineral soils rich in manganese and potassium.",
  cat: "DO (DOP), white, rosé, red, quality sparkling and overripe-grape red", rec: "DO 2024",
  src: ["Pliego de condiciones DOP Campo de Calatrava (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-08/Pliego_Condic_CAMPO_DE_CALATRAVA_definitivo.pdf"],
  amended: "Definitive text, published by the Ministry in October 2025", sources: [CLMSRC],
  facts: [["Zone", "Aldea del Rey, Almagro, Argamasilla de Calatrava, Ballesteros, Bolaños, Calzada, Cañada, Carrión, Granátula, Miguelturra, Moral, Pozuelo, Torralba and Valenzuela de Calatrava, Villanueva de San Carlos, Villar del Pozo and a plot of Ciudad Real"], ["Red grapes", "Cencibel (Tempranillo), Cabernet Sauvignon and Franc, Merlot, Syrah, Bobal, Petit Verdot, Graciano, Garnacha Tintorera, Malbec"], ["White grapes", "Airén, Macabeo, Verdejo, Chardonnay, Moscatels, Sauvignon Blanc, Riesling, Gewürztraminer, Viognier, Albariño"], ["Minimum alcohol", "White and rosé 10.5%; red 12%; sparkling 10.5%; overripe red 16%"], ["Yields", "Bush vines 10,000 kg/ha (74 hl/ha); trellis 13,000 kg/ha (96.2 hl/ha); at most 74 l per 100 kg"], ["Ageing", "Crianza 24 months with 6 in oak; reserva 36; gran reserva 60"]],
  place: "Elongated ridges at 700 to 900 m alternating with plains at about 630 to 650 m, shaped by hundreds of small volcanoes. Volcanic soils are high in manganese and potassium and low in calcium compared with the rest of La Mancha.",
  rules: "The DO carves its zone out of what was La Mancha and Valdepeñas territory, on the basis of the volcanic soils.",
  history: "Named after the medieval Order of Calatrava, whose castles dominate the area. Growers pushed for a separate DO in the 2010s, approved by the region in 2024.",
  glass: "Ripe Tempranillo-based reds with dark fruit and a savoury, mineral edge.",
  exam: "Newest DO of Castilla-La Mancha; volcanic Campo de Calatrava.",
  producers: []
});
APXF["es-dominio-de-valdepusa"] = cm({
  lede: "The Marqués de Griñón's estate on the Pusa river at Malpica de Tajo, Toledo: Spain's first Vino de Pago and a pioneer of drip irrigation, Syrah and Petit Verdot in Spain.",
  cat: "Vino de Pago (DOP)", rec: "Spain's first Vino de Pago, 2003",
  src: ["Pliego de condiciones Dominio de Valdepusa (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-10/PLIEGO_DOMINIO_VALDEPUSA_mod_20190429.pdf"],
  amended: "Amendment of April 2019", sources: [CLMSRC],
  facts: [["Zone", "49.08 ha in polygon 13 of Malpica de Tajo (Toledo)"], ["Grapes", "Cabernet Sauvignon, Petit Verdot, Syrah, Graciano, Merlot"], ["Minimum alcohol", "12.5%"], ["Yields", "Cabernet Sauvignon and Merlot 10,000 kg/ha (68 hl/ha); Petit Verdot 12,000 kg/ha; Syrah and Graciano 13,000 kg/ha (88.4 hl/ha)"], ["Ageing", "Reds at least 6 or 10 months (by wine) in oak barrels of 225 to 500 l"]],
  place: "Gentle slopes above the Pusa, a tributary of the Tajo, with about 450 mm of rain.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Carlos Falcó, Marqués de Griñón, planted Cabernet Sauvignon here in 1974 and, advised by Émile Peynaud and later Richard Smart, introduced canopy management and drip irrigation; the estate became Spain's first Vino de Pago in 2003.",
  glass: "Polished Cabernet, Syrah and Petit Verdot reds with ripe fruit and fine tannin.",
  exam: "Spain's first Vino de Pago (2003); Marqués de Griñón; Toledo.",
  producers: ["Marqués de Griñón"]
});
APXF["es-finca-elez"] = cm({
  lede: "Manuel Manzaneque's high estate at El Bonillo, Albacete, at about 1,080 m, one of the first Vinos de Pago.",
  cat: "Vino de Pago (DOP)", rec: "Regional recognition 2002; EU register 2009",
  src: ["Pliego de condiciones Finca Élez (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-09/M04_PC_FINCA_%C3%89LEZ_SINCC.pdf"],
  amended: "Amendment M04, published by the Ministry in July 2023", sources: [CLMSRC],
  facts: [["Zone", "38.90 ha in El Bonillo (Albacete)"], ["Grapes", "Chardonnay, Viognier; Cabernet Sauvignon, Merlot, Tempranillo, Syrah"], ["Minimum alcohol", "11 to 11.5% depending on type"], ["Yields", "Cabernet Sauvignon 9,000 kg/ha (66.6 hl/ha); Tempranillo 12,000 kg/ha; Merlot 8,500 kg/ha"], ["Types", "White (Chardonnay, Viognier), rosé, red: young, aged, crianza, reserva, gran reserva"]],
  place: "A plateau at 1,080 m with a dry continental climate that limits disease pressure.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Manuel Manzaneque planted the estate in the 1990s in the foothills of the Sierra de Alcaraz; it was among the first pagos recognised.",
  glass: "Fresh, mountain-grown Chardonnay and structured reds.",
  exam: "One of Spain's highest pagos (1,080 m); El Bonillo.",
  producers: ["Manuel Manzaneque"]
});
APXF["es-guijoso"] = cm({
  lede: "The Sánchez Muliterno family's Finca El Guijoso at El Bonillo, Albacete, about 960 m up.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2004 (EU register 2007)",
  src: ["Pliego de condiciones Guijoso (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/PLIEGO_GUIJOSO.pdf"],
  amended: "Text as published by the Ministry (2011)", sources: [CLMSRC],
  facts: [["Zone", "Named parcels at El Bonillo (Albacete)"], ["Grapes", "Chardonnay, Sauvignon Blanc; Cabernet Sauvignon, Merlot, Syrah, Tempranillo"], ["Minimum alcohol", "12% (actual alcohol between 12 and 15%)"], ["Yields", "8,000 kg/ha (56 hl/ha)"]],
  place: "A high plateau averaging 960 m on the edge of the Sierra de Alcaraz.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Recognised as a pago in 2004, early in the Castilla-La Mancha pago programme.",
  glass: "Fresh whites and Bordeaux-style reds from altitude.",
  exam: "El Bonillo; high-altitude pago.",
  producers: ["Sánchez Muliterno"]
});
APXF["es-dehesa-del-carrizal"] = cm({
  lede: "A pago at Retuerta del Bullaque in the Montes de Toledo, on the edge of Cabañeros national park.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2006 (EU register 2009)",
  src: ["Pliego de condiciones Dehesa del Carrizal (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/Pliego_Condiciones_DEHESA_CARRIZAL_scc_20180628.pdf"],
  amended: "Version of June 2018", sources: [CLMSRC],
  facts: [["Zone", "26.28 ha at Retuerta del Bullaque (Ciudad Real)"], ["Grapes", "Cabernet Sauvignon, Syrah, Merlot, Tempranillo, Petit Verdot; Chardonnay"], ["Minimum alcohol", "12%"], ["Yields", "Syrah and Petit Verdot 12,000 kg/ha (84 hl/ha); Cabernet Sauvignon and Tempranillo 10,000 kg/ha; Merlot 8,500 kg/ha; Chardonnay 9,000 kg/ha"], ["Types", "Varietal reds, blends aged at least 3 or 12 months, Chardonnay"]],
  place: "A north-facing hollow near 800 m among quartzite screes and narrow water gaps (boquerones), sheltered from hot, dry winds.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "It became a pago in 2006, one of the first in Castilla-La Mancha.",
  glass: "Bordeaux-style reds and Chardonnay with freshness from altitude.",
  exam: "Montes de Toledo; Cabañeros.",
  producers: ["Dehesa del Carrizal"]
});
APXF["es-campo-de-la-guardia"] = cm({
  lede: "The Martúe estate at La Guardia, north-east Toledo.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2009",
  src: ["Pliego de condiciones Campo de La Guardia (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/Pliego_Condiciones_CAMPO_GUARDIA.pdf"],
  amended: "Text as published by the Ministry (2011)", sources: [CLMSRC],
  facts: [["Zone", "81.06 ha at La Guardia (Toledo)"], ["Grapes", "Cabernet Sauvignon, Syrah, Merlot, Tempranillo, Malbec, Petit Verdot; Chardonnay"], ["Minimum alcohol", "13%"], ["Yields", "Cabernet Sauvignon 7,500 kg/ha; Syrah 9,000; Merlot and Petit Verdot 10,000; Tempranillo 11,000; Chardonnay 12,000"], ["Ageing", "Reds aged at least 5 to 9 months in barrels of limited age"]],
  place: "Open plateau land in north-east Toledo.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Recognised as a pago in 2009.",
  glass: "Ripe, oak-aged red blends; Chardonnay.",
  exam: "La Guardia, Toledo; Martúe.",
  producers: ["Martúe"]
});
APXF["es-pago-florentino"] = cm({
  lede: "The Arzuaga family's La Mancha estate at Malagón, Ciudad Real, on south-facing slopes of the Sierra de Malagón.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2009",
  src: ["Pliego de condiciones Pago Florentino (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/Pliego_Condiciones_PAGO_FLORENTINO.pdf"],
  amended: "Text as published by the Ministry (2011)", sources: [CLMSRC],
  facts: [["Zone", "58.12 ha at Malagón (Ciudad Real)"], ["Grapes", "Tempranillo, Syrah, Petit Verdot"], ["Minimum alcohol", "13%"], ["Yields", "10,000 kg/ha (70 hl/ha)"]],
  place: "South-facing slopes of the Sierra de Malagón beside the natural lagoons of Nava Grande and Nava En Medio, sheltered from north winds.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Owned by the Arzuaga family of Ribera del Duero; recognised as a pago in 2009.",
  glass: "Concentrated Tempranillo-based reds.",
  exam: "Malagón; Arzuaga's La Mancha pago.",
  producers: ["Arzuaga Navarro"]
});
APXF["es-casa-del-blanco"] = cm({
  lede: "A large pago on the flat plain of Manzanares, Ciudad Real.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2010 (EU register 2011)",
  src: ["Pliego de condiciones Casa del Blanco (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-09/Pliego_de_Condiciones_Mod_Casa_del_Blanco_20200706.pdf"],
  amended: "Amendment of July 2020", sources: [CLMSRC],
  facts: [["Zone", "About 136 ha at Manzanares (Ciudad Real)"], ["Grapes", "Tempranillo, Cabernet Sauvignon and Franc, Merlot, Syrah, Petit Verdot, Malbec, Garnacha; Sauvignon Blanc, Chardonnay, Airén"], ["Minimum alcohol", "Not set out separately in the text used here"], ["Yields", "7,500 kg/ha (52.5 hl/ha) for every grape"], ["Ageing", "Aged reds at least 12 months in barrel, plus bottle ageing"]],
  place: "Flat land (slopes under 2%) in the centre of Ciudad Real province.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Recognised as a pago in 2010.",
  glass: "Ripe reds and fresh whites.",
  exam: "Manzanares; flat-land pago.",
  producers: ["Pago Casa del Blanco"]
});
APXF["es-calzadilla"] = cm({
  lede: "A high, steep pago at Huete, Cuenca, among hills of the Alcarria at 845 to 1,005 m.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2011",
  src: ["Pliego de condiciones Calzadilla (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/Pliego_Condiciones_vinoDOP_CALZADILLA.pdf"],
  amended: "Text as published by the Ministry (2011)", sources: [CLMSRC],
  facts: [["Zone", "13.10 ha in polygon 510 of Huete (Cuenca)"], ["Grapes", "Tempranillo, Cabernet Sauvignon, Garnacha, Syrah"], ["Minimum alcohol", "13%"], ["Yields", "Garnacha 9,000 kg/ha (63 hl/ha); others 10,000 kg/ha (70 hl/ha)"], ["Ageing", "At least 8 months in oak barrels and casks of 225 to 4,700 l"]],
  place: "Supra-Mediterranean continental climate, surrounded by hills of 900 to 1,200 m; parcels at 845 to 1,005 m, many on steep slopes.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "It became a pago in 2011.",
  glass: "Firm, fresh reds from altitude.",
  exam: "Huete, Cuenca; small high pago.",
  producers: ["Pago Calzadilla"]
});
APXF["es-la-jaraba"] = cm({
  lede: "A flat estate at El Provencio, Cuenca, near Villarrobledo, at about 700 m.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2019",
  src: ["Pliego de condiciones La Jaraba (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-09/20130426_PC_PAGO_LA_JARABA.pdf"],
  amended: "Text of April 2013, published by the Ministry in October 2020", sources: [CLMSRC],
  facts: [["Zone", "75.19 ha at El Provencio (Cuenca)"], ["Grapes", "Tempranillo, Cabernet Sauvignon, Merlot, Graciano"], ["Minimum alcohol", "12.5%"], ["Yields", "Tempranillo 10,500 kg/ha; Cabernet Sauvignon 11,000; Merlot and Graciano 10,000"]],
  place: "Completely flat land at 700 m on the La Mancha plain.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Applied for in 2013 and recognised in 2019.",
  glass: "Ripe red blends.",
  exam: "El Provencio; flat-land pago.",
  producers: ["Pago de la Jaraba"]
});
APXF["es-los-cerrillos"] = cm({
  lede: "The Montalvo Wilmot estate beside the Peñarroya reservoir at Argamasilla de Alba, Ciudad Real.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2019",
  src: ["Pliego de condiciones Los Cerrillos (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/Pliego_condiciones_Los_Cerrillos_20201019scc.pdf"],
  amended: "Text of October 2020", sources: [CLMSRC],
  facts: [["Zone", "Polygons 109 and 111 of Argamasilla de Alba (Ciudad Real)"], ["Grapes", "Tempranillo, Cabernet Sauvignon, Syrah, Petit Verdot"], ["Minimum alcohol", "12.5 to 13% depending on type"], ["Yields", "Tempranillo and Petit Verdot 12,000 kg/ha; Cabernet Sauvignon 10,000; Syrah 13,000"]],
  place: "Next to the Peñarroya reservoir at 695 m, surrounded by low hills (the cerrillos).",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Recognised in 2019.",
  glass: "Fruity, structured reds.",
  exam: "Argamasilla de Alba; Peñarroya reservoir.",
  producers: ["Montalvo Wilmot"]
});
APXF["es-el-vicario"] = cm({
  lede: "A pago near Ciudad Real known for an unusual white wine made from red grapes.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2019",
  src: ["Pliego de condiciones El Vicario (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/Pliego_Condiciones_vinoDOP_EL_VICARIO.pdf"],
  amended: "Text published by the Ministry in October 2020", sources: [CLMSRC],
  facts: [["Zone", "Named parcels in the municipality of Ciudad Real"], ["Grapes", "Chardonnay, Sauvignon Blanc; Tempranillo, Garnacha, Graciano, Syrah, Cabernet Sauvignon, Merlot, Petit Verdot"], ["Minimum alcohol", "From 11.5% for dry wines"], ["Yields", "Chardonnay and Sauvignon Blanc 9,000 kg/ha; Tempranillo for red 12,000 kg/ha, for white-from-red 15,000 kg/ha; Syrah 12,000"], ["Types", "Partly barrel-fermented white, white from red grapes, Petit Verdot rosé, semi-sweet white, reds and sweet red"]],
  place: "Estate land in the municipality of Ciudad Real.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Recognised in 2019.",
  glass: "Fresh whites, a pale blanc de noirs and ripe reds.",
  exam: "Ciudad Real; blanc de noirs from Tempranillo.",
  producers: ["Pago del Vicario"]
});
APXF["es-vallegarcia"] = cm({
  lede: "A large estate in the Montes de Toledo at Retuerta del Bullaque, known for Viognier and Syrah.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago 2019",
  src: ["Pliego de condiciones Vallegarcía (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/Pliego_Condiciones_AM_01_PC_Vallegarc%C3%ADa_DF_Pub_DOUE.pdf"],
  amended: "Amendment AM01 (published in the EU Official Journal), listed by the Ministry in December 2021", sources: [CLMSRC],
  facts: [["Zone", "Cadastral parcel 448, polygon 9, Retuerta del Bullaque (Ciudad Real), 1,521 ha"], ["Grapes", "Viognier; Syrah, Merlot, Cabernet Sauvignon and Franc, Petit Verdot, Garnacha Tinta, Mazuela, Monastrell"], ["Minimum alcohol", "White 12.5% total; reds 12 to 12.5%"], ["Yields", "Viognier and Cabernet Franc 11,500 kg/ha; Syrah 9,250; Merlot and Cabernet Sauvignon 8,500; Petit Verdot 14,600"], ["Types", "Partly barrel-fermented Viognier; single-variety and blended reds"]],
  place: "835 m in the Montes de Toledo.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Recognised in 2019.",
  glass: "Aromatic Viognier and dark, spicy Syrah.",
  exam: "Montes de Toledo; Viognier and Syrah.",
  producers: ["Pago de Vallegarcía"]
});
APXF["es-rosalejo"] = cm({
  lede: "A pago on a raña plateau at 650 m between Anchuras (Ciudad Real) and Sevilleja de la Jara (Toledo), with Atlantic influence.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago (recognised 2023 to 2024)",
  src: ["Pliego de condiciones Rosalejo (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/Pliego_de_Condiciones_Rosalejo_20220523.pdf"],
  amended: "Text of May 2022, published by the Ministry in November 2023", sources: [CLMSRC],
  facts: [["Zone", "Parcels at Anchuras (Ciudad Real) and Sevilleja de la Jara (Toledo)"], ["Grapes", "Syrah, Tempranillo, Garnacha"], ["Minimum alcohol", "12%"], ["Yields", "Syrah 6,000 kg/ha (40.8 hl/ha); Tempranillo and Garnacha 8,000 kg/ha (54.4 hl/ha)"]],
  place: "A raña (old alluvial plateau) at 650 m with Atlantic influence.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "One of the newest pagos of Castilla-La Mancha.",
  glass: "Red wines from Syrah, Tempranillo and Garnacha.",
  exam: "Raña plateau pago between Toledo and Ciudad Real.",
  producers: []
});
APXF["es-rio-negro"] = cm({
  lede: "A high páramo at 940 to 1,000 m near Cogolludo, Guadalajara, by the Sierra Norte, Castilla-La Mancha's coolest pago.",
  cat: "Vino de Pago (DOP)", rec: "Vino de Pago (published 2024)",
  src: ["Pliego de condiciones Río Negro (Junta de Castilla-La Mancha)", "https://apliagri.castillalamancha.es/sites/default/files/2025-06/PLIEGO_DE_CONDICIONES_RIO_NEGRO.pdf"],
  amended: "Text published by the Ministry in November 2024", sources: [CLMSRC],
  facts: [["Zone", "Parcels at Cogolludo, San Andrés del Congosto and Membrillera (Guadalajara)"], ["Grapes", "Tempranillo, Tinto Fragoso, Syrah, Cabernet Sauvignon, Merlot; Gewürztraminer"], ["Minimum alcohol", "White 12%; red 13%"], ["Yields", "White 9,000 kg/ha (63 hl/ha); red 7,000 kg/ha (49 hl/ha)"], ["White", "100% Gewürztraminer"]],
  place: "A páramo at 940 to 1,000 m bounded by the Aliendre river and the Cogolludo pine forest; cooler summers than the rest of the region.",
  rules: "As a Vino de Pago, the wine must be grown, made and bottled on the estate.",
  history: "Recognised in the 2020s.",
  glass: "Aromatic Gewürztraminer and fresh reds.",
  exam: "Guadalajara; Gewürztraminer at 1,000 m.",
  producers: []
});
