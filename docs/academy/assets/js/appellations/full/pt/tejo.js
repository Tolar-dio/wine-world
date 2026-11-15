// Full encyclopedia entries: Tejo (DoTejo DO and IG Tejo). Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function tj(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const TJU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const TJCVR=["Comissão Vitivinícola Regional do Tejo","https://www.cvrtejo.pt/"];
const TJPLACE="The Tagus valley north-east of Lisbon, around Santarém. The river shapes three zones: the Campo (or Lezíria), flat alluvial land beside the river, periodically flooded and very fertile, traditionally the home of white wine and Fernão Pires; the Bairro, gentle clay-limestone hills on the right bank toward the Porto de Mós, Candeeiros and Montejunto ranges, suited to Castelão and Trincadeira; and the Charneca, sandy, less fertile land south of the river on the left bank, with lower yields and finer wines. Rainfall averages about 750 mm, more around Tomar and less around Coruche, and the river's mass of water moderates temperatures, giving cool, humid summer nights.";

APXF["pt-dotejo"] = tj({
  lede: "The DO of the Tagus valley, formerly Ribatejo, with six subregions across the fertile Campo, the clay-limestone Bairro and the sandy Charneca; Fernão Pires whites and Castelão and Trincadeira reds.",
  cat: "DO (DOP): wine, sparkling and vinho licoroso", rec: "DO Ribatejo, renamed DoTejo",
  src: ["Caderno de especificações DO DoTejo (IVV copy, PDO-PT-A1544)", TJU+"DO_Do-Tejo.pdf"], sources: [TJCVR], amended: "IVV copy published February 2026",
  facts: [["Subregions", "Almeirim (Almeirim, Alpiarça, Salvaterra de Magos); Cartaxo (Azambuja, Cartaxo); Chamusca (Chamusca, Golegã, Abrantes, Constância, Sardoal, Mação); Coruche (Benavente, Coruche); Santarém (Rio Maior, Santarém); Tomar (Tomar, Torres Novas, Alcanena, Entroncamento, Vila Nova da Barquinha, Ferreira do Zêzere)"], ["Minimum alcohol", "Red and rosé 11.5%; white 11%"], ["Natural alcohol", "Red 11.5%"], ["Yields", "Red and rosé 80 hl/ha; white 90 hl/ha"], ["Sparkling", "Traditional method or tank method with at least 9 months' ageing"], ["Vineyard registration", "From the third year after grafting"]],
  place: TJPLACE + " The caderno sets soil requirements subregion by subregion: Almeirim, the largest producer, ranges from modern calcareous alluvium in the Campo to sandy podzols in the Charneca.",
  rules: "The DO is a sum of its six subregions. Soils are specified for each. Sparkling may be traditional method or tank-fermented with nine months' ageing, which is unusual for a Portuguese DO.",
  history: "The caderno notes that the Tejo has been recognized as a wine region since the Middle Ages. Ribatejo, the name of the province, was chosen for the new wine region formed from several older areas; after quality improvements, the region returned to the original river name, Tejo, and the DO became DoTejo.",
  glass: "Fernão Pires whites are aromatic, with citrus, flowers and a soft finish; reds of Castelão, Trincadeira, Touriga Nacional and Alicante Bouschet are fruity and supple, deeper from the Bairro and Charneca.",
  exam: "Ex-Ribatejo; Campo, Bairro, Charneca; Fernão Pires; six subregions.",
  producers: ["Quinta da Alorna", "Casal Branco", "Quinta da Lagoalva", "Falua", "Casa Cadaval", "Fiuza"]
});

APXF["pt-tejo"] = tj({
  lede: "The regional wine of the Tagus valley, the label for most of the region's wine, with a yield cap of 225 hl/ha and a long list of Portuguese and international grapes.",
  cat: "IG (IGP), Vinho Regional: wine, sparkling, frisante, licoroso; also partly dealcoholised", rec: "Vinho Regional Ribatejano, renamed Tejo",
  src: ["Caderno de especificações IG Tejo (IVV copy)", TJU+"IG_Tejo.pdf"], sources: [TJCVR], amended: "IVV copy published February 2026",
  facts: [["Natural alcohol", "Wine 10.5%; sparkling 9%"], ["Yield", "225 hl/ha"], ["Soils", "Alluvial and colluvial soils, sands and sandstones, moderately saline alluvium among others"], ["Styles", "Includes partly dealcoholised wines"]],
  place: TJPLACE,
  rules: "Very permissive: high yields, broad grape list including Gewürztraminer and other international varieties, and provision for partly dealcoholised wine.",
  glass: "Fresh, fruity, good-value whites, rosés and reds; leading estates also use it for premium blends.",
  exam: "IG Tejo (ex-Ribatejano); 225 hl/ha.",
  producers: ["Quinta da Alorna", "Casal Branco", "Falua", "Quinta da Lagoalva"]
});
