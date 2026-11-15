// Full encyclopedia entries: Bairrada DO and IG Beira Atlântico. Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function ba(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const BAU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const BACVR=["Comissão Vitivinícola da Bairrada","https://www.cvbairrada.pt/"];

APXF["pt-bairrada"] = ba({
  lede: "Portugal's Atlantic clay country between Aveiro and Coimbra: home of the tannic, high-acid Baga grape, of Portugal's first commercial sparkling wine in 1890, and of the long-ageing Clássico reds.",
  cat: "DO (DOP): white, red and rosé wine; quality sparkling; vinho licoroso", rec: "DO 1979",
  src: ["Caderno de especificações DO Bairrada (IVV copy)", BAU+"DO_Bairrada.pdf"], sources: [BACVR], amended: "IVV copy published February 2026",
  facts: [["Area", "Anadia, Mealhada, Oliveira do Bairro; parts of Águeda, Aveiro, Cantanhede, Coimbra and Vagos"], ["Minimum alcohol", "Wine 11%; quality sparkling 11%; licoroso 16%"], ["Natural alcohol", "Wine 11%; sparkling base 9.5%; licoroso 12%"], ["Yields", "White and rosé 100 hl/ha; red 80 hl/ha; sparkling 120 hl/ha; licoroso 100 hl/ha"], ["Sparkling", "Traditional method; at least 9 months at the producer after bottling"], ["Clássico", "Arinto, Bical, Cercial, Fernão Pires (Maria Gomes), Rabo de Ovelha; Alfrocheiro, Baga, Camarate, Castelão, Jaen, Touriga Nacional only; 55 hl/ha; red 12.5% with 30 months' ageing (12 in bottle); white 12% with 12 months (6 in bottle)"], ["Soils", "Calcareous brown or red soils (clay-limestone) and lithosols, with sandy patches"]],
  place: "Bounded by the Vouga to the north, the Mondego to the south, the Buçaco and Caramulo ranges to the east and the Atlantic to the west. It is a flat to gently rolling plateau, rarely above 250 m, always close enough to the ocean to feel it. The climate is Mediterranean with strong Atlantic influence: long, cool, wet winters and warm summers moderated by sea breezes, with hot days and cool nights. The name comes from barro, clay: the classic vineyards sit on heavy clay-limestone, with sandier soils toward the coast.",
  rules: "Since the rules were liberalised, Baga is no longer compulsory for red Bairrada, and international grapes are allowed. The Clássico designation restores tradition: native varieties only, low yields, higher ripeness and long ageing. Sparkling must be made by the traditional method.",
  history: "The caderno dates commercial winemaking in Bairrada to the Middle Ages and notes that in 1890 the region produced Portugal's first commercially significant sparkling wine. The DO was created in 1979. Luís Pato and others revived interest in Baga from the 1980s, and producers such as the Baga Friends group have championed traditional styles.",
  glass: "Baga reds are deep, tannic and acidic young, with sour cherry, plum, tar and herbs, turning into tobacco, leather and forest floor over decades, often compared with Nebbiolo. Whites from Bical, Maria Gomes, Cercial and Arinto are fresh and textured. Sparkling, the regional speciality, is crisp and often blanc de noirs from Baga; it is traditionally drunk with leitão (suckling pig) from Mealhada.",
  exam: "DO 1979; barro = clay; Baga; first commercial sparkling 1890; Clássico 30 months for reds; between Vouga and Mondego.",
  producers: ["Luís Pato", "Filipa Pato & William Wouters", "Quinta das Bágeiras", "Caves São João", "Sidónio de Sousa", "Buçaco (Alexandre Almeida)", "Quinta de Baixo (Niepoort)", "Kompassus", "Aliança", "Messias", "Campolargo"]
});

APXF["pt-beira-atlantico"] = ba({
  lede: "The regional wine of the Atlantic Beira, covering most of the Aveiro and Coimbra districts around the Bairrada, with a strong emphasis on sparkling and frisante styles.",
  cat: "IG (IGP), Vinho Regional: wine, sparkling, quality sparkling, aromatic quality sparkling, frisante", rec: "Vinho Regional; formerly part of the Beiras regional wine",
  src: ["Caderno de especificações IG Beira Atlântico (IVV copy, PGI-PT-02350)", BAU+"IG_Beira-Atlantico.pdf"], sources: [BACVR], amended: "IVV copy published February 2026",
  facts: [["Area", "Aveiro district (except Arouca, Castelo de Paiva, Vale de Cambra, Ossela) and Coimbra district (except Arganil, Oliveira do Hospital, Tábua) and neighbouring areas"], ["Minimum alcohol", "10% for wine and sparkling"], ["Yields", "White and rosé 100 hl/ha; red 80 hl/ha; sparkling and frisante 120 hl/ha"], ["Soils", "Red Mediterranean soils on limestone or dolomite, schist soils, calcareous marls"]],
  place: "The coastal plain and low hills of central Portugal between the Vouga and the Mondego and beyond, with Atlantic climate.",
  rules: "Allows international varieties and wines outside Bairrada DO rules; Bairrada producers often use it for varietal or experimental wines.",
  glass: "Fresh whites and sparkling; reds from Baga, Touriga Nacional and international grapes.",
  exam: "IGP for the Bairrada area; sparkling focus.",
  producers: ["Luís Pato", "Filipa Pato & William Wouters", "Campolargo"]
});
