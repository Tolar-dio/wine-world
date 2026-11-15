// Full encyclopedia entries: Península de Setúbal (Setúbal, Palmela, IG Península de Setúbal). Written from the IVV cadernos de especificações (2026 copies), checked 14 November 2026.
function ps(o){const facts=[["Category",o.cat],["Recognized",o.rec]].concat(o.facts||[]);if(o.amended)facts.push(["Specification used",o.amended]);const sections=[["The place",`<p>${o.place}</p>`],["The rules",`<p>${o.rules}</p>`]];if(o.history)sections.push(["History",`<p>${o.history}</p>`]);sections.push(["In the glass",`<p>${o.glass}</p>`]);if(o.exam)sections.push(["For the exam",`<p>${o.exam}</p>`]);const sources=(o.src?[o.src]:[]).concat(o.sources||[]);return {lede:o.lede,facts,sections,producers:o.producers||[],sources,checked:"2026-11-14"};}
const PSU="https://www.ivv.gov.pt/wp-content/uploads/2026/02/";
const PSCVR=["Comissão Vitivinícola Regional da Península de Setúbal","https://www.vinhosdapeninsuladesetubal.pt/"];
const PSAM="IVV copy published February 2026";
const PSAREA="Montijo, Palmela and Setúbal municipalities and the parish of Sesimbra (Castelo)";
const PSPLACE="South of the Tagus estuary, between the Serra da Arrábida and the Sado. Arrábida's limestone ridge shelters the north-facing slopes from the sea and gives clay-limestone soils; most vineyards, however, are on the flat, sandy plain of Palmela, Pinhal Novo, Poceirão and Pegões, where podzolised sands and sandstones dominate. The climate is Mediterranean with Atlantic influence: hot, dry summers and mild winters.";

APXF["pt-setubal"] = ps({
  lede: "Portugal's great fortified Muscat: Moscatel de Setúbal and the rarer Moscatel Roxo, fortified early and left on their skins for months, aged in old casks to amber richness.",
  cat: "DO (DOP), vinho licoroso (vinho generoso), white or red (Roxo)", rec: "Demarcated 1907",
  src: ["Caderno de especificações DO Setúbal (IVV copy)", PSU+"DO_Setubal.pdf"], sources: [PSCVR], amended: PSAM,
  facts: [["Names", "Setúbal; Moscatel de Setúbal; Moscatel Roxo de Setúbal or Roxo"], ["Grape minimums", "White Setúbal at least 67% Moscatel de Setúbal (Muscat of Alexandria); red at least 67% Moscatel Roxo; varietal name needs 85%"], ["Alcohol", "16 to 22%; natural potential at least 10%"], ["Sugar", "Up to 280 g/L for wines up to 20 years; 340 g/L for older"], ["Ageing", "At least 18 months before certification"], ["Fortifying spirit", "Wine distillate of 52 to 86% or neutral wine spirit of at least 96%"], ["Age terms", "Superior (at least 5 years and a high tasting mark); 5 to 40 years in five-year steps"], ["Yield", "100 hl/ha"], ["Area", PSAREA]],
  place: PSPLACE + " The best Moscatel traditionally comes from the Arrábida slopes around Azeitão.",
  rules: "Fermentation is stopped with spirit, and maceration on the skins after fortification is permitted, which is the key to the style: skins steep in the fortified must for months, extracting aroma. Ageing indications run from 5 to 40 years. The terms vinho generoso and generoso may only accompany the DO.",
  history: "The caderno records Phoenician, Greek and Roman wine artefacts in the region, some from the fifth century BC, and more than a thousand wild vines found in the Sado valley. José Maria da Fonseca's Moscatel de Setúbal won recognition at the 1855 Paris Universal Exhibition, and the house still holds very old stocks.",
  glass: "Young: orange blossom, grape, orange peel and honey. Aged: amber to mahogany, with dried apricot, fig, toffee, nuts and a fresh, citrus finish that balances the sweetness. Roxo is spicier, with tea, rose and dried fruit.",
  exam: "67% minimum Moscatel; 85% for varietal name; skin maceration after fortification; Roxo; Azeitão; 1907; José Maria da Fonseca.",
  producers: ["José Maria da Fonseca", "Bacalhôa", "Horácio Simões", "Casa Ermelinda Freitas", "Adega de Pegões"]
});

APXF["pt-palmela"] = ps({
  lede: "Castelão country: red wines at least two-thirds Castelão from the sandy plain and Arrábida slopes around Palmela, plus whites, rosé, sparkling and fortified wine.",
  cat: "DO (DOP): white, red, rosé, frisante, sparkling and vinho licoroso", rec: "DO (former IPR)",
  src: ["Caderno de especificações DO Palmela (IVV copy)", PSU+"DO_Palmela.pdf"], sources: [PSCVR], amended: PSAM,
  facts: [["Red rule", "At least 66.7% Castelão"], ["Minimum alcohol", "White 10.5%; red 11.5%; rosé, frisante and sparkling 10%; licoroso 16%"], ["Yield", "120 hl/ha"], ["Area", PSAREA], ["Grapes", "Castelão, Aragonez, Touriga Franca, Touriga Nacional, Alicante Bouschet, Syrah and others; Fernão Pires, Arinto, Moscatel, Chardonnay, Loureiro and others"]],
  place: PSPLACE,
  rules: "The Castelão minimum applies only to reds; rosés, sparkling and licoroso may use any permitted grape without minimum percentage. Fortified Palmela uses neutral spirit or wine distillate like Setúbal.",
  history: "Palmela's first charter, granted by Afonso Henriques in 1185, already mentions vineyards and wine. The caderno recalls nineteenth- and twentieth-century producers who made the municipality a model wine district, and Palmela's Núcleo Museológico do Vinho e da Vinha.",
  glass: "Castelão on sand gives deep garnet reds with red berries, plum and a savoury, earthy edge, softer than in clay; old vines have real depth. Whites from Fernão Pires are aromatic and soft.",
  exam: "Castelão 66.7%; sandy soils; Pegões; Palmela charter 1185.",
  producers: ["Casa Ermelinda Freitas", "José Maria da Fonseca", "Bacalhôa", "Adega de Pegões"]
});

APXF["pt-peninsula-de-setubal"] = ps({
  lede: "The regional wine of the Setúbal district, covering the Sado and the Alentejo coast fringe as well as the DO area, with very high permitted yields.",
  cat: "IG (IGP), Vinho Regional: wine, sparkling, licoroso and low-alcohol wine", rec: "Vinho Regional Terras do Sado, renamed Península de Setúbal",
  src: ["Caderno de especificações IG Península de Setúbal (IVV copy)", PSU+"IG_Peninsula-de-Setubal.pdf"], sources: [PSCVR], amended: PSAM,
  facts: [["Area", "The whole Setúbal district"], ["Yield", "30,000 kg/ha"], ["Natural alcohol", "White 9%"], ["Low-alcohol wine", "Baixo grau: 9 to 10.5%"]],
  place: "Wider than the DOs: it reaches south along the Sado to Alcácer do Sal and Grândola. Sandy soils and a warm, ripe climate predominate.",
  rules: "Very permissive yields and grape choice; most of the district's wine, including export volume, is sold under this name.",
  glass: "Generous, fruity reds and soft whites; some ambitious estates also use the label.",
  exam: "Península de Setúbal IGP (ex-Terras do Sado); 30,000 kg/ha.",
  producers: ["Casa Ermelinda Freitas", "Bacalhôa", "José Maria da Fonseca", "Herdade do Portocarro"]
});
