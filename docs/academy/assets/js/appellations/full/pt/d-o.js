// Full encyclopedia entries: Dão DO and its seven subregions, Lafões DO, IG Terras do Dão. Written from the IVV cadernos de especificações (2026 copies) and the Dão statute, Decreto-Lei 376/93; checked 14 November 2026.
function da(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const DAU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const DASRC=["Caderno de especificações DOP Dão (IVV copy)",DAU+"DO_Dao.pdf"];
const DALAW=["Decreto-Lei 376/93, Estatuto da Região Demarcada do Dão (FAOLEX copy)","https://faolex.fao.org/docs/pdf/por26220.pdf"];
const DACVR=["Comissão Vitivinícola Regional do Dão","https://www.cvrdao.pt/pt/regiao-demarcada/"];
const DASUB="Under the 1993 statute a subregion name may be added to Dão only if the wine is made entirely from grapes grown and vinified in that subregion, entered in specific registers and approved by the CVR. All other rules are those of DO Dão.";
function dsub(o){return da(Object.assign({cat:"Subregion of DO Dão (DOP)",rec:"Subregion defined by Decreto-Lei 376/93",src:DALAW,sources:[DASRC,DACVR]},o));}

APXF["pt-dao"] = da({
  lede: "A granite basin ringed by mountains in central Portugal, demarcated in 1908, where Touriga Nacional shows its most floral, fine-grained side and Encruzado makes one of the country's great whites.",
  cat: "DO (DOP): red, white, rosé and sparkling", rec: "Demarcated by Carta de Lei of 18 September 1908; rules 1910; current statute Decreto-Lei 376/93",
  src: DASRC, sources: [DALAW, DACVR], amended: "IVV copy published February 2026",
  facts: [["Minimum alcohol", "11% for red, white, rosé and sparkling"], ["Natural potential alcohol", "11%; Dão Nobre 13% red and 12% white; Novo 10.5%"], ["Minimum ageing", "8 months for reds"], ["Yields", "Red and rosé 80 hl/ha; white and sparkling 100 hl/ha"], ["Main red grapes", "Touriga Nacional, Alfrocheiro, Aragonês (Tinta Roriz), Jaen, Rufete, Tinto Cão, Bastardo, Alvarelhão, Trincadeira"], ["Main white grapes", "Encruzado, Bical, Cerceal-Branco, Malvasia Fina, Barcelo, Rabo de Ovelha, Terrantez, Uva Cão, Verdelho"], ["Planting", "Low cordon training; at least 3,000 vines/ha; irrigation only by exception"], ["Subregions", "Alva, Besteiros, Castendo, Serra da Estrela, Silgueiros, Terras de Azurara, Terras de Senhorim"], ["Label terms", "Nobre, Garrafeira, Reserva, Branco de uvas tintas, Palhete"]],
  place: "The region covers municipalities in the districts of Viseu, Guarda and Coimbra, from Mortágua to Seia and Gouveia. The Caramulo range to the west, Buçaco to the south, Nave to the north and Serra da Estrela to the east wall it off from Atlantic humidity and continental winds. The Dão and Mondego rivers run in parallel across a granite massif, and vines sit mostly at 400 to 700 m on granitic soils, with some schist outcrops. The caderno describes a temperate climate, cold and rainy in winter, very hot and dry in summer. Vineyards are scattered among pine forest, so most plots are small and fragmented.",
  rules: "Since November 1993, new plantings count for the DO only if they use the first-tier varieties, and older plantings of Alicante Bouschet, Cabernet Sauvignon, Pinot Noir and similar may not exceed 40%. Dão Nobre requires distinguished quality, registration and a vintage on the label; under the 1993 statute it also demands at least 15% Touriga Nacional for reds and 15% Encruzado for whites, with long ageing. Garrafeira and Reserva follow the 1993 statute (Garrafeira red 36 months, 12 in bottle, for ordinary DO wines). Wine must be made inside the region in registered cellars.",
  history: "The CVR dates the region's prestige to the late nineteenth century, when Dão sold above the national average and estates such as Casa da Ínsua and Conde de Santar were models. A Carta de Lei of 18 September 1908 demarcated it, with regulation in 1910 after strong local pressure. Cooperatives dominated vinification in the 1960s and 1970s and, the CVR says, volume came before quality. After Portugal joined the EU in 1986 private estates gained ground, and from the mid-1990s new quintas rebuilt the reputation.",
  glass: "Reds are medium to full, with fresh acidity, red and black cherry, violet, bergamot and pine, and fine, granitic tannin; Touriga Nacional leads, with Alfrocheiro for bright fruit and Jaen (Mencía) for softness. Old Garrafeiras can age for decades. Encruzado whites, often barrel-fermented with lees ageing, combine citrus, resin, smoke and a saline, textured palate, and age for ten years or more.",
  exam: "1908; granite; mountains on four sides (Caramulo, Buçaco, Nave, Estrela); Touriga Nacional and Encruzado; seven subregions; Nobre; cooperative era until 1986.",
  producers: ["Quinta dos Carvalhais (Sogrape)", "Quinta dos Roques", "Álvaro Castro (Quinta da Pellada, Quinta de Saes)", "Casa de Santar", "Quinta da Falorca", "Casa de Mouraz", "António Madeira", "Textura", "Quinta da Ponte Pedrinha", "Niepoort (Quinta da Lomba)"]
});

APXF["pt-alva"] = dsub({
  lede: "The southern edge of the Dão along the Alva river, covering the municipalities of Oliveira do Hospital and Tábua.",
  facts: [["Municipalities", "Oliveira do Hospital, Tábua"], ["District", "Coimbra"]],
  place: "Alva lies south of the Mondego, toward the Serra do Açor and the western foot of Serra da Estrela, on granite with some schist. The Alva valley runs south-west to the Mondego.",
  rules: DASUB,
  glass: "Classic Dão profile: fresh, red-fruited Touriga Nacional and Alfrocheiro blends; Encruzado and Malvasia Fina whites.",
  exam: "Oliveira do Hospital and Tábua; south of the Mondego.",
  producers: ["Quinta da Ponte Pedrinha"]
});

APXF["pt-besteiros"] = dsub({
  lede: "The western Dão below the Caramulo range: Mortágua, Santa Comba Dão and the Besteiros parishes of Tondela, the wettest and most Atlantic part of the region.",
  facts: [["Municipalities", "Mortágua, Santa Comba Dão; most of Tondela (Campo, Barreiro, Santiago and Vilar de Besteiros, Mouraz, Molelos and others)"], ["District", "Viseu"]],
  place: "Closest to the Caramulo, which catches Atlantic rain, so Besteiros is cooler and wetter than the central plateau. Granite dominates, with schist near Mortágua.",
  rules: DASUB,
  glass: "Fresher, lighter reds with more acidity; Baga and Jaen are traditional here alongside Touriga Nacional.",
  exam: "Western subregion; Caramulo; Tondela.",
  producers: ["Casa de Mouraz"]
});

APXF["pt-castendo"] = dsub({
  lede: "The north-eastern Dão around Penalva do Castelo, whose old name, Castendo, the subregion keeps.",
  facts: [["Municipalities", "Penalva do Castelo; parishes of Rio de Moinhos and Silvã de Cima in Sátão"], ["District", "Viseu"]],
  place: "Higher, more continental granite country toward the Serra da Lapa and the northern rim of the basin, with colder winters and later ripening than the south-west.",
  rules: DASUB,
  glass: "Firm, fresh reds and aromatic whites; Malvasia Fina and Encruzado do well on the cooler sites.",
  exam: "Penalva do Castelo; old name Castendo; Casa da Ínsua.",
  producers: ["Casa da Ínsua"]
});

APXF["pt-serra-da-estrela"] = dsub({
  lede: "The highest Dão vineyards, on the north-western slopes of Portugal's highest mountain range around Seia and Gouveia.",
  facts: [["Municipalities", "Parishes of Seia (Pinhanços, São Romão, Sandomil and others) and Gouveia (Vila Nova de Tazem, Melo and others)"], ["District", "Guarda"]],
  place: "Granite slopes rising toward Serra da Estrela, with vines above 500 m in places. Nights are cold and the growing season long, so wines keep high acidity. Pinhanços and Vila Nova de Tazem are the main wine villages.",
  rules: DASUB,
  glass: "Tense, mountain-fresh reds and long-lived whites; Álvaro Castro's Quinta da Pellada and Quinta de Saes show the subregion's finesse.",
  exam: "Highest subregion; Seia; Pinhanços; Álvaro Castro.",
  producers: ["Álvaro Castro (Quinta da Pellada, Quinta de Saes)"]
});

APXF["pt-silgueiros"] = dsub({
  lede: "A small subregion of five parishes south-west of Viseu, on granite slopes above the Dão river.",
  facts: [["Parishes", "Silgueiros, Fragosela, Povolide, São João de Lourosa, Santos Evos (all in Viseu)"], ["District", "Viseu"]],
  place: "South-west of the city of Viseu, where slopes fall toward the Dão river; slightly warmer than the higher plateau.",
  rules: DASUB,
  glass: "Ripe yet fresh Touriga Nacional and Jaen; supple tannins.",
  exam: "Five parishes of Viseu municipality; Quinta da Falorca.",
  producers: ["Quinta da Falorca"]
});

APXF["pt-terras-de-azurara"] = dsub({
  lede: "The municipality of Mangualde, old Azurara da Beira, home to Quinta dos Carvalhais and Quinta dos Roques.",
  facts: [["Municipality", "Mangualde"], ["District", "Viseu"]],
  place: "Granite plateau between the Dão and the Mondego, at roughly 400 to 550 m, sheltered and well drained.",
  rules: DASUB,
  glass: "Benchmark modern Dão: Touriga Nacional with violet and cherry, Encruzado with structure and age-worthiness.",
  exam: "Mangualde; Carvalhais (Sogrape); Roques.",
  producers: ["Quinta dos Carvalhais (Sogrape)", "Quinta dos Roques"]
});

APXF["pt-terras-de-senhorim"] = dsub({
  lede: "Nelas and Carregal do Sal, the central Dão: home of the old Centro de Estudos Vitivinícolas do Dão at Nelas and of Casa de Santar.",
  facts: [["Municipalities", "Nelas, Carregal do Sal"], ["District", "Viseu"]],
  place: "Granite plateau at about 400 to 500 m between the Dão and Mondego, the geographic centre of the region.",
  rules: DASUB,
  glass: "Balanced reds and whites; the Nelas research station shaped modern Dão variety choices.",
  exam: "Nelas; Casa de Santar; Centro de Estudos de Nelas.",
  producers: ["Casa de Santar"]
});

APXF["pt-lafoes"] = da({
  lede: "A tiny, rainy DO in the Vouga valley between the Dão and Vinho Verde, making light, high-acid wines with a slight prickle.",
  cat: "DO (DOP): white and red", rec: "Delimited by Decreto-Lei 296/90 (IPR 1990)",
  src: ["Caderno de especificações DO Lafões (IVV copy)", DAU+"DO_Lafoes.pdf"], sources: [DACVR], amended: "IVV copy published February 2026",
  facts: [["Municipalities", "Oliveira de Frades, São Pedro do Sul, Vouzela"], ["Minimum alcohol", "9.5%; natural 9%"], ["Minimum fixed acidity", "5.0 g/L"], ["Yields", "Red 60 hl/ha; white 65 hl/ha"], ["Grapes", "Arinto, Cercial, Dona Branca, Rabo de Ovelha; Amaral, Jaen, Touriga Nacional, Esgana Cão Tinto"], ["Vine age", "At least four years since grafting"]],
  place: "The western edge of central Beira, along the Vouga valley. Vines grow on small terraced holdings, often lining plot edges or on ramadas, on soils of schist, gneiss, granite and migmatite. Atlantic air reaches up the valley, so the climate is wetter and cooler than the Dão.",
  rules: "Low alcohol and high acidity are written into the caderno: 9.5% minimum and 5 g/L fixed acidity. The caderno describes wines that may release a little gas.",
  glass: "Pale, sharp, citrus whites and light ruby-violet reds with brisk acidity, close to Vinho Verde in style.",
  exam: "Vouga valley; three municipalities; between Dão and Vinho Verde; Terras de Lafões is also an IG subregion.",
  producers: ["Adega Cooperativa de Lafões"]
});

APXF["pt-terras-do-dao"] = da({
  lede: "The regional wine of the Dão and Lafões, with its own subregion, Terras de Lafões, and room for international grapes and higher yields.",
  cat: "IG (IGP), Vinho Regional: wine and sparkling", rec: "Vinho Regional; IG under EU rules",
  src: ["Caderno de especificações IG Terras do Dão (IVV copy)", DAU+"IG_Terras-do-Dao.pdf"], sources: [DACVR], amended: "IVV copy published February 2026",
  facts: [["Natural alcohol", "10% (Terras de Lafões 9.5%)"], ["Yields", "Red 18,000 kg/ha; white 20,000 kg/ha"], ["Sparkling", "Traditional method only"], ["Subregion", "Terras de Lafões (Oliveira de Frades, São Pedro do Sul, Vouzela, Castro Daire, parts of Viseu and Sever do Vouga)"], ["Area", "The Dão municipalities plus Castro Daire, Vila Nova de Paiva, Oliveira de Frades, São Pedro do Sul, Vouzela and part of Sever do Vouga"]],
  place: "Wider than the DO: it adds the Lafões and Paiva uplands to the Dão basin. The caderno lists soils from granite and schist to sands, marls and alluvium.",
  rules: "Higher yields and a broad variety list including Chardonnay, Alvarinho and others not allowed in the DO. Sparkling must be made by the traditional method.",
  glass: "From fresh varietal whites to reds that mirror DO Dão.",
  exam: "IGP for the Dão; subregion Terras de Lafões.",
  producers: []
});
