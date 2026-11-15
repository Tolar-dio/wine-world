// Full encyclopedia entries: Beira Interior DO, its three subregions and IG Terras da Beira. Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function bi(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const BIU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const BISRC=["Caderno de especificações DO Beira Interior (IVV copy)",BIU+"DO_Beira-Interior.pdf"];
const BICVR=["Comissão Vitivinícola Regional da Beira Interior","https://www.cvrbi.pt/"];
const BIAM="IVV copy published February 2026";
const BISUB="Subregion wines follow DO Beira Interior rules: red 12% (palhete and clarete 11.5%), white and rosé 11%, Seleção red 13% and white 12%; 55 hl/ha; natural alcohol at least equal to the minimum actual alcohol.";
function bsub(o){return bi(Object.assign({cat:"Subregion of DO Beira Interior (DOP)",rec:"Former IPR; subregion of the merged DO",src:BISRC,sources:[BICVR],amended:BIAM},o));}

APXF["pt-beira-interior"] = bi({
  lede: "Portugal's highest wine region, between Serra da Estrela and the Spanish border, with vineyards from 300 to 750 m on granite and schist, a harsh continental climate and old native grapes such as Síria, Fonte Cal and Rufete.",
  cat: "DO (DOP): wine, quality sparkling and vinho licoroso", rec: "DO formed from the Castelo Rodrigo, Cova da Beira and Pinhel IPRs",
  src: BISRC, sources: [BICVR], amended: BIAM,
  facts: [["Subregions", "Castelo Rodrigo, Cova da Beira, Pinhel"], ["Altitude", "300 to 750 m"], ["Minimum alcohol", "Red 12%; palhete and clarete 11.5%; white and rosé 11%; Seleção red 13%, white 12%; sparkling 11%"], ["Yield", "55 hl/ha"], ["Sparkling", "Traditional method; at least 9 months at the producer after bottling"], ["Licoroso", "Fortified with 77% wine distillate, up to 20% alcohol"], ["Seleção", "Native varieties only (Aragonez, Arinto, Bastardo, Bical, Malvasia Fina, Rufete, Síria, Tamarez, Touriga Nacional, Trincadeira and others); red 12 months, white 6 months ageing"], ["Rainfall", "400 to 700 mm, almost none in July and August"]],
  place: "The caderno calls it the highest wine region in Portugal. Serra da Estrela, Gardunha, Açor, Marofa and Malcata dominate the relief. The north drains to the Côa and Águeda, the south to the Zêzere and upper Tagus. Soils are mainly granite in the north and schist in the south, with quartz veins between. The climate is continental: severe, frosty winters and hot, dry summers, moderated by altitude, which the caderno quantifies as a fall of about 0.65°C per 100 m and wide day-night swings.",
  rules: "Rules are uniform across the subregions. The Seleção designation requires native varieties, higher alcohol and ageing. Labels must carry a registered brand.",
  history: "Granite lagaretas (rock-cut treading tanks) show winemaking before the Romans. The caderno credits religious orders that settled in the twelfth century, notably the Cistercians at Santa Maria de Aguiar near Figueira de Castelo Rodrigo, with expanding viticulture.",
  glass: "Fresh, aromatic whites from Síria (Roupeiro) and Fonte Cal; reds from Rufete, Touriga Nacional, Tinta Roriz and Marufo that are lively, spicy and moderate in alcohol thanks to altitude.",
  exam: "Highest region; Síria and Fonte Cal; Rufete; three subregions; Serra da Estrela.",
  producers: ["Quinta dos Termos", "Quinta do Cardo", "Rui Roboredo Madeira (Beyra)", "Adega Cooperativa de Pinhel"]
});

APXF["pt-castelo-rodrigo"] = bsub({
  lede: "The northern tip of the Beira Interior, in Figueira de Castelo Rodrigo and Almeida near the Douro and the Spanish border, where Cistercian monks planted vines in the twelfth century.",
  facts: [["Area", "Parishes of Figueira de Castelo Rodrigo and Almeida"], ["Climate", "Continental; close to the Douro Superior"]],
  place: "Granite and schist plateau toward the Côa and Águeda valleys, under the Serra da Marofa. Hotter and drier than the south of the region.",
  rules: BISUB,
  history: "The Cistercian monastery of Santa Maria de Aguiar is where, the caderno says, viticulture developed most significantly.",
  glass: "Riper reds of Rufete, Touriga Nacional and Tinta Roriz; Síria whites.",
  exam: "Santa Maria de Aguiar; Marofa; borders the Douro Superior.",
  producers: ["Quinta do Cardo"]
});

APXF["pt-cova-da-beira"] = bsub({
  lede: "The largest subregion, a basin between Serra da Estrela and Gardunha around Covilhã, Fundão and Belmonte, extending south to Castelo Branco.",
  facts: [["Area", "Belmonte, Castelo Branco, Covilhã, Fundão, Manteigas, Penamacor; parts of Guarda, Idanha-a-Nova, Sabugal and Vila Velha de Ródão"], ["Soils", "Schist and granite"]],
  place: "A sheltered valley (cova) of the Zêzere between the mountains, warmer than the northern subregions, with schist dominant toward the south.",
  rules: BISUB,
  glass: "Fuller reds of Rufete, Trincadeira and Touriga Nacional; Fonte Cal and Síria whites.",
  exam: "Largest subregion; Fundão; Zêzere basin.",
  producers: ["Quinta dos Termos"]
});

APXF["pt-pinhel"] = bsub({
  lede: "The granite plateau around Pinhel, cold and high, historically known for white and sparkling base wines from Síria and Fonte Cal.",
  facts: [["Area", "Pinhel; parts of Celorico da Beira, Guarda, Meda and Trancoso"], ["Soils", "Mainly granite"]],
  place: "High granite plateau with severe winters; whites keep strong acidity, which made Pinhel a supplier of base wine for sparkling.",
  rules: BISUB,
  glass: "Crisp, citrus whites; light reds; sparkling.",
  exam: "Granite; whites and sparkling base; Pinhel cooperative.",
  producers: ["Adega Cooperativa de Pinhel"]
});

APXF["pt-terras-da-beira"] = bi({
  lede: "The regional wine of the Beira Interior uplands, covering the Guarda and Castelo Branco hinterland with lower minimums and wider grape choice.",
  cat: "IG (IGP), Vinho Regional: wine, sparkling and licoroso", rec: "Vinho Regional; IG under EU rules",
  src: ["Caderno de especificações IG Terras da Beira (IVV copy)", BIU+"IG_Terras-da-Beira.pdf"], sources: [BICVR], amended: BIAM,
  facts: [["Area", "Municipalities of Guarda and Castelo Branco districts including Almeida, Figueira de Castelo Rodrigo (except Escalhão), Guarda, Manteigas, Meda (part), Pinhel, Sabugal, Trancoso and others"], ["Soils", "Humic and non-humic lithosols on schist and granite; brown and red schist soils"]],
  place: "Same mountain-ringed upland as the DO, between Serra da Estrela, Marofa and Malcata, with the same cold winters and dry summers.",
  rules: "Freer than the DO in yields and varieties.",
  glass: "Fresh, aromatic whites and lively reds.",
  exam: "IGP for Beira Interior.",
  producers: []
});
