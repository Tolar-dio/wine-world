// Full encyclopedia entries: Calabria. Written from each disciplinare di produzione (AIS copies).
function calSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Calabria/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function cal(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [calSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const CAL_CIRO_DOCG = ["Doctor Wine: Cirò now has its own DOCG, Cirò Classico (2025)", "https://www.doctorwine.wine/pot-pourri-en/wine-world-news/ciro-now-has-its-own-docg-ciro-classico/?lang=en"];
APXF["it-ciro-classico"] = cal({
  lede: "Calabria's first DOCG, approved in 2025: aged Gaglioppo from the historic heart of Cirò and Cirò Marina on the Ionian coast, replacing the old Cirò Rosso Riserva.",
  cat: "DOCG, red", rec: "DOCG 2025 (Regulation (EU) 2025/1518); previously the Classico mention of Cirò DOC (1969)", d: "Ciro",
  sources: [CAL_CIRO_DOCG],
  facts: [["Grapes", "Gaglioppo at least 90%; Magliocco and Greco Nero up to 10%; no international varieties"], ["Zone", "The historic territories of Cirò and Cirò Marina"], ["Yield", "8 t/ha"], ["Vineyards", "At least 4,000 vines per hectare, alberello or espalier"], ["Ageing", "At least 36 months, including 6 in wood"], ["Bottling", "Inside the zone"]],
  place: "Low hills of clay, sand and marl just inland from the Ionian Sea, among the hottest, driest vineyards in Italy.",
  rules: "The AIS PDF linked here is the older DOC text; the DOCG rules come from the 2025 regulation as reported.",
  history: "Cirò claims descent from Krimisa, the wine of Greek colonists, said to have been offered to Olympic champions.",
  glass: "Pale, translucent ruby, red cherry, dried herbs, orange peel, firm tannin: Gaglioppo resembles Nebbiolo more than a southern blockbuster.",
  exam: "Cirò Classico: Calabria's first DOCG (2025), Gaglioppo at least 90%.",
  producers: ["Librandi", "'A Vita", "Sergio Arcuri", "Cataldo Calabretta", "Ippolito 1845", "Scala"]
});
APXF["it-ciro"] = cal({
  lede: "Calabria's best-known DOC: Gaglioppo reds, rosés and Greco Bianco whites from the Ionian coast around Cirò.",
  cat: "DOC, red, rosé, white", rec: "DOC 1969 (DPR 2 April 1969)", d: "Ciro",
  amended: "Text as amended by DM 7 March 2014; the Riserva became the Cirò Classico DOCG in 2025",
  sources: [CAL_CIRO_DOCG],
  facts: [["Rosso and Rosato", "Gaglioppo at least 80%"], ["Bianco", "Greco Bianco based"], ["Zone", "All of Cirò and Cirò Marina, part of Melissa and Crucoli; Classico from Cirò and Cirò Marina only"], ["Yields", "Red 11.5 t/ha; white 12.5"], ["Release", "Rosso from 1 June after harvest"], ["Superiore", "13% natural, 13.5% total; Riserva type formerly 2 years from 1 January"], ["Types after 2025", "Bianco, Rosato, Rosso, Rosso Classico, Rosso Classico Superiore, Rosso Superiore"]],
  place: "Coastal hills of Crotone province.", rules: "Natural alcohol 12% for reds.", glass: "Light-coloured, firm, herbal reds; salty, citrus whites.", exam: "Gaglioppo is Calabria's main red grape.", producers: ["Librandi", "'A Vita", "Sergio Arcuri", "Ippolito 1845"]
});
APXF["it-greco-di-bianco"] = cal({
  lede: "A rare sweet white from partly dried Greco Bianco at Bianco, on the far southern tip of Calabria.",
  cat: "DOC, sweet white (passito)", rec: "DOC 1980 (DPR 18 June 1980)", d: "Greco di Bianco",
  facts: [["Grape", "Greco Bianco at least 95%"], ["Zone", "Bianco and part of Casignana (Reggio Calabria)"], ["Yield", "10 t/ha; 13% natural before drying"], ["Grape to wine", "45%"], ["Release", "From 1 November after the harvest"], ["Total alcohol", "17%, at least 14% actual"]],
  place: "Ionian hills near Cape Spartivento.", rules: "Grapes are partly dried in the sun.", glass: "Amber, orange blossom, apricot, honey, citrus peel.", exam: "Sweet passito from Calabria's southern tip.", producers: ["Ceratti"]
});
APXF["it-terre-di-cosenza"] = cal({
  lede: "The DOC of the province of Cosenza, with seven subzones, chiefly for Magliocco reds and Greco and Guarnaccia whites.",
  cat: "DOC, red, white, rosé, sparkling, sweet", rec: "DOC 2011 (DM 18 October 2011)", d: "Terre di Cosenza",
  amended: "Text as amended by DM 23 November 2015",
  facts: [["Subzones", "Colline del Crati, Condoleo, Donnici, Esaro, Pollino, San Vito di Luzzi, Verbicaro"], ["Varietals", "Magliocco, Greco Bianco, Guarnaccia Bianca, Malvasia Bianca and others"], ["Yields", "8.5 t/ha for most types"], ["Riserva", "24 months from 1 November"], ["Spumante", "At least 9 months on the lees"]],
  place: "From the Tyrrhenian coast to the Pollino massif.", rules: "It absorbed several older DOCs, now its subzones.", glass: "Magliocco: dark, spicy reds.", exam: "Magliocco Dolce is the Cosenza red.", producers: ["Serracavallo", "Ferrocinto", "Spadafora"]
});
APXF["it-melissa"] = cal({
  lede: "Gaglioppo reds and Greco whites from Melissa and nearby communes south of Cirò.",
  cat: "DOC, white, red", rec: "DOC 1979 (DPR 31 May 1979)", d: "Melissa",
  facts: [["Bianco", "Greco Bianco 80 to 95%"], ["Rosso", "Gaglioppo 75 to 95%"], ["Yields", "Bianco 12 t/ha; Rosso 11"], ["Superiore", "2 years from 1 November; total 13%"]],
  place: "Ionian hills of Crotone province.", rules: "Grape to wine 70%.", glass: "Like a rustic Cirò.", exam: "Minor DOC.", producers: []
});
APXF["it-s-anna-di-isola-capo-rizzuto"] = cal({
  lede: "Gaglioppo-based reds and rosés from the coast south of Crotone.",
  cat: "DOC, red, rosé", rec: "DOC 1979 (DPR 10 January 1979)", d: "S. Anna di Isola Capo Rizzuto",
  facts: [["Grapes", "Gaglioppo 40 to 60%; Nocera, Nerello Mascalese, Nerello Cappuccio, Malvasia Nera, Malvasia Bianca and Greco Bianco 40 to 60%"], ["Natural alcohol", "11.5%"], ["Total alcohol", "12%"]],
  place: "Coastal plain and low hills near Isola di Capo Rizzuto.", rules: "Grape to wine 70%.", glass: "Light reds.", exam: "Minor DOC.", producers: []
});
APXF["it-lamezia"] = cal({
  lede: "Wines of the Lamezia plain and hills on the Tyrrhenian side of central Calabria, from Greco, Gaglioppo, Greco Nero and Mantonico.",
  cat: "DOC, white, red, rosé, sparkling, passito", rec: "DOC 1978 (DPR 21 December 1978)", d: "Lamezia",
  facts: [["Bianco", "Greco at least 50%"], ["Varietals", "Greco, Greco Nero, Gaglioppo (at least 85%), Mantonico"], ["Riserva", "Rosso after 18 months including 12 in wood, from 1 December"], ["Spumante", "At least 9 months on the lees"]],
  place: "The isthmus of Catanzaro, where Calabria is narrowest.", rules: "Passito grape to wine 50%.", glass: "Varied.", exam: "Minor DOC.", producers: ["Statti"]
});
APXF["it-bivongi"] = cal({
  lede: "Red, white and rosé from the Ionian hills around Bivongi in the province of Reggio Calabria.",
  cat: "DOC, red, white, rosé", rec: "DOC 1996 (DM 24 May 1996)", d: "Bivongi",
  facts: [["Rosso and Rosato", "Gaglioppo and/or Greco Nero 30 to 50%; Nocera, Calabrese, Castiglione 30 to 50%"], ["Yields", "Bianco 13 t/ha; reds 12"], ["Riserva", "2 years from 1 November; 12% natural"]],
  place: "Hills of the Stilaro valley.", rules: "Grape to wine 70%.", glass: "Rustic reds.", exam: "Minor DOC.", producers: []
});
APXF["it-savuto"] = cal({
  lede: "Reds from the Savuto valley south of Cosenza, with a Classico zone.",
  cat: "DOC, white, red, rosé", rec: "DOC 1975 (DPR 19 May 1975)", d: "Savuto",
  facts: [["Bianco", "Montonico up to 40%; Chardonnay up to 30% among others"], ["Types", "Bianco; Rosso (Classico, Superiore); Rosato (Classico)"], ["Superiore", "After 3 years from 1 November"]],
  place: "Terraced hills of the Savuto valley.", rules: "Grape to wine 70%.", glass: "Firm, herbal reds.", exam: "Minor DOC.", producers: ["Odoardi"]
});
APXF["it-scavigna"] = cal({
  lede: "A small DOC near Lamezia notable for whites from Traminer Aromatico and Chardonnay alongside Gaglioppo reds.",
  cat: "DOC, white, red, rosé", rec: "DOC 1994 (DM 17 October 1994)", d: "Scavigna",
  facts: [["Bianco", "Traminer Aromatico up to 50%; Chardonnay up to 30%; Pinot Bianco and Riesling Italico up to 10% each"], ["Release", "Not before 1 January after the harvest"]],
  place: "Tyrrhenian hills in the province of Catanzaro, near Lamezia.", rules: "Grape to wine 70%.", glass: "Aromatic whites.", exam: "Minor DOC.", producers: ["Odoardi"]
});
