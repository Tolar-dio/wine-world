// Full encyclopedia entries: Abruzzo. Written from each disciplinare di produzione (AIS copies).
function abSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Abruzzo/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function ab(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [abSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-montepulciano-d-abruzzo"] = ab({
  lede: "Abruzzo's signature red: Montepulciano grown across the region from the Adriatic hills to the mountain valleys, from juicy everyday wine to dense, long-lived Riserva, with nine subzones.",
  cat: "DOC, red", rec: "DOC 1968 (DPR 24 May 1968)", d: "DOC/Montepulciano d'Abruzzo",
  amended: "Text as amended by DM 19 January 2023",
  facts: [["Grapes", "Montepulciano at least 85%; other non-aromatic reds up to 15%"], ["Yield", "15 t/ha; 11.5% natural"], ["Release", "From 1 February after the harvest"], ["Superiore and Riserva", "Only within subzones: Superiore at least 6 months of refinement; Riserva at least 24 months including 6 in wood (Casauria Riserva: 9 in wood), from 1 November"], ["Subzones", "Casauria or Terre di Casauria, Terre dei Vestini, Alto Tirino, Terre dei Peligni, Teate (each also Riserva); Terre di Chieti, Terre Aquilane or Terre de L'Aquila, Colline Pescaresi, San Martino sulla Marrucina (Superiore and Riserva)"], ["Subzone rules", "Stricter: Casauria 100% Montepulciano and 9.5 t/ha; Terre dei Vestini 90%; Alto Tirino 95% and 9 t/ha"], ["Total alcohol", "12%"]],
  place: "All four provinces: hills of clay and limestone between the Gran Sasso and Maiella massifs and the Adriatic, plus inland valleys such as the Peligna and Tirino.",
  rules: "The plain DOC may not use Riserva or Superiore; those mentions belong to the subzones. The Teramo hills have their own DOCG, Colline Teramane.",
  history: "The 2023 revision added the four province-level subzones that a 2019 consortium proposal had sought, with Superiore and Riserva mentions.",
  glass: "Deep purple, black cherry, plum, licorice, soft but generous tannin; Riserva adds tobacco and leather.",
  exam: "Montepulciano the grape is unrelated to Vino Nobile di Montepulciano (Sangiovese, Tuscany).",
  producers: ["Valentini", "Emidio Pepe", "Masciarelli", "Torre dei Beati", "Cataldi Madonna", "Valle Reale", "Tiberio", "Illuminati"]
});
APXF["it-montepulciano-d-abruzzo-colline-teramane"] = ab({
  lede: "The DOCG for Montepulciano from the Teramo hills in northern Abruzzo, the region's first DOCG.",
  cat: "DOCG, red", rec: "Part of the Montepulciano d'Abruzzo DOC; DOCG 2003 (DM 20 February 2003)", d: "DOCG/Colline Teramane Montepulciano d'Abruzzo",
  amended: "Text as amended by DM 7 May 2014 and an EU implementing regulation",
  facts: [["Grapes", "Montepulciano at least 90%; Sangiovese up to 10%"], ["Zone", "30 communes of Teramo province, including Teramo, Atri, Controguerra, Nereto, Roseto degli Abruzzi, Giulianova"], ["Yield", "9.5 t/ha; 12% natural; grape to wine 70%"], ["Ageing", "At least 1 year, including 2 months in bottle, from 1 November"], ["Riserva", "At least 3 years, including 1 in wood and 2 months in bottle"], ["Bottling", "Inside the zone"], ["Total alcohol", "12.5%"]],
  place: "Hills between the Tronto and Vomano rivers, from the Gran Sasso foothills to the sea.", rules: "Bottling and bottle refinement must take place inside the zone.",
  glass: "Structured, dark-fruited, firmer than the general DOC.",
  exam: "Colline Teramane: Montepulciano at least 90%, DOCG 2003.",
  producers: ["Emidio Pepe", "Illuminati", "Barone Cornacchia", "Montori", "Faraone"]
});
APXF["it-terre-tollesi"] = ab({
  lede: "A single-commune DOCG for the town of Tollo in Chieti province: Montepulciano reds plus Pecorino and Passerina.",
  cat: "DOCG, red and white", rec: "DOC 2008 (DM 23 July 2008); DOCG with the 2019 revision (DM 18 June 2019)", d: "DOCG/Terre Tollesi o Tullum",
  amended: "Text as amended by DM 18 June 2019 and an EU implementing regulation",
  facts: [["Also labelled", "Tullum"], ["Types", "Rosso, Rosso Riserva, Pecorino, Passerina"], ["Rosso", "Montepulciano at least 95%"], ["Whites", "9 t/ha; Pecorino 12% natural, Passerina 11.5%"], ["Riserva", "At least 2 years, 6 months in wood, from 1 January after the harvest"], ["Total alcohol", "Rosso 13%; Riserva 13.5%; whites 12.5%"]],
  place: "The commune of Tollo, a few kilometres from the coast between Pescara and Ortona.", rules: "Grape to wine 70%.",
  glass: "Dense Montepulciano; herbal Pecorino.",
  exam: "Tullum is Tollo's Latin name; one of Italy's smallest DOCGs.",
  producers: ["Feudo Antico", "Cantina Tollo"]
});
APXF["it-cerasuolo-d-abruzzo"] = ab({
  lede: "Deep-coloured rosé of Montepulciano, separated from Montepulciano d'Abruzzo as its own DOC in 2010.",
  cat: "DOC, rosé", rec: "Type of Montepulciano d'Abruzzo from 1968; own DOC 2010 (DM 5 October 2010)", d: "DOC/Cerasuolo d'Abruzzo",
  amended: "Text as amended by DM 19 January 2023",
  facts: [["Grapes", "Montepulciano at least 85%"], ["Yield", "14 t/ha"], ["Release", "From 1 December of the harvest year"], ["Subzones", "Terre di Chieti, Terre Aquilane or Terre de L'Aquila, Colline Pescaresi, Colline Teramane (all Superiore)"], ["Total alcohol", "12%"]],
  place: "Throughout Abruzzo.", rules: "Short skin contact gives a cherry-red colour ('cerasuolo' = cherry-coloured).",
  glass: "Bright cherry red, cherry and strawberry, savoury, firm acidity, a light grip of tannin.",
  exam: "Cerasuolo d'Abruzzo is a rosé; Cerasuolo di Vittoria (Sicily) is a red DOCG.",
  producers: ["Valentini", "Emidio Pepe", "Cataldi Madonna", "Tiberio", "Praesidium"]
});
APXF["it-trebbiano-d-abruzzo"] = ab({
  lede: "The white partner of Montepulciano: often neutral, but in the hands of a few growers among Italy's most profound, ageworthy whites.",
  cat: "DOC, white", rec: "DOC 1972 (DPR 28 June 1972)", d: "DOC/Trebbiano d'Abruzzo",
  amended: "Text as amended by DM 19 January 2023",
  facts: [["Grapes", "Trebbiano Abruzzese and/or Trebbiano Toscano at least 85%"], ["Yield", "14 t/ha"], ["Release", "From 1 January after the harvest"], ["Subzones", "Terre di Chieti, Terre Aquilane or Terre de L'Aquila, Colline Pescaresi, Colline Teramane (Superiore and Riserva)"], ["Total alcohol", "11.5%"]],
  place: "Throughout Abruzzo.", rules: "Older texts confused Trebbiano Abruzzese with Bombino Bianco; the current text explains the distinction.",
  glass: "Usually light and neutral; from Valentini or Pepe, waxy, nutty, smoky and long-lived.",
  exam: "Trebbiano Abruzzese is distinct from Trebbiano Toscano and Bombino Bianco.",
  producers: ["Valentini", "Emidio Pepe", "Tiberio", "Valle Reale", "Cirelli"]
});
APXF["it-abruzzo"] = ab({
  lede: "The regional DOC for whites, reds, rosés, sparkling and passito, and for Pecorino, Passerina, Cococciola, Montonico and Malvasia varietals.",
  cat: "DOC, white, red, rosé, sparkling, passito", rec: "DOC 2010 (DM 9 August 2010)", d: "DOC/Abruzzo",
  amended: "Text as amended by DM 31 July 2024",
  facts: [["Varietals", "Cococciola, Malvasia, Montonico, Passerina, Pecorino (all also spumante)"], ["Subzones", "Terre di Chieti, Terre Aquilane or Terre de L'Aquila, Colline Pescaresi, Colline Teramane (Superiore and Riserva)"], ["Spumante", "Vintage classic-method and tank-method wines need at least 85% of the vintage; at least 18 months on the lees for some types"], ["Passito", "14% natural (Vino) or 16% (Vino da uve appassite); released from 1 March"], ["Release", "Whites and rosés from 1 December; reds from 1 January"]],
  place: "The whole region.", rules: "Grape to wine 75% for the native white varietals.",
  glass: "Pecorino: herbal, citrus, saline; Cococciola: crisp, light.",
  exam: "Pecorino, Passerina and Cococciola are Abruzzo natives.",
  producers: ["Tiberio", "Cataldi Madonna", "Masciarelli", "Cantina Frentana"]
});
APXF["it-controguerra"] = ab({
  lede: "A small DOC in the far north of Abruzzo for Montepulciano reds, international varietals, Passerina, Pecorino and classic-method sparkling.",
  cat: "DOC, red, white, rosé, sparkling, passito", rec: "DOC 1996 (DM 20 August 1996)", d: "DOC/Controguerra",
  facts: [["Rosso", "Montepulciano at least 70%"], ["Types", "Rosso (also riserva, novello), Rosato, Bianco, Spumante metodo classico, Bianco and Rosso Passito, Merlot, Cabernet, Passerina, Chardonnay, Pecorino"], ["Riserva", "24 months, 6 in wood"], ["Passito", "Grape to wine 45%; 24% sugar; pressed from 15 November; total 14%"]],
  place: "The hills around Controguerra near the Marche border, inside the Colline Teramane area.", rules: "Novello needs at least 30% carbonic maceration.", glass: "Varied.", exam: "Minor DOC.", producers: ["Illuminati", "Camillo Montori"]
});
APXF["it-ortona"] = ab({
  lede: "Montepulciano reds and Trebbiano whites from Ortona on the Chieti coast.",
  cat: "DOC, red, white", rec: "DOC 2011 (DM 20 April 2011)", d: "DOC/Ortona",
  facts: [["Rosso", "Montepulciano 95%"], ["Bianco", "Trebbiano Abruzzese and/or Toscano at least 70%"], ["Release", "Bianco from 1 January; Rosso from 1 March after harvest"], ["Total alcohol", "Rosso 12.5%; Bianco 12%"]],
  place: "Coastal hills around the port of Ortona.", rules: "Grape to wine 70%.", glass: "Generous Montepulciano.", exam: "Minor DOC.", producers: []
});
APXF["it-villamagna"] = ab({
  lede: "A small DOC for Montepulciano from Villamagna and parts of Bucchianico and Vacri, near Chieti.",
  cat: "DOC, red", rec: "DOC 2011 (DM 20 April 2011)", d: "DOC/Villamagna",
  facts: [["Grape", "Montepulciano at least 95%"], ["Yield", "Riserva 12 t/ha, 13.5% natural; grape to wine 70% (84 hl/ha)"], ["Release", "From 1 September of the year after the harvest; Riserva from 1 November of the second year"], ["Total alcohol", "13%; Riserva 13.5%"]],
  place: "Hills inland from Chieti.", rules: "Higher alcohol minimums than the regional Montepulciano.", glass: "Ripe, dense reds.", exam: "Minor DOC.", producers: []
});
