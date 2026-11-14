// Full encyclopedia entries: Basilicata. Written from each disciplinare di produzione (AIS copies).
function basSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Basilicata/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function bas(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [basSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-aglianico-del-vulture-superiore"] = bas({
  lede: "The aged top tier of Aglianico from the extinct Monte Vulture volcano in northern Basilicata, a DOCG since 2010.",
  cat: "DOCG, red", rec: "DOC 1971; DOCG 2010 (DM 2 August 2010)", d: "DOCG/Aglianico del Vulture Superiore",
  facts: [["Grape", "Aglianico del Vulture and/or Aglianico 100%"], ["Zone", "15 communes of Potenza province: Rionero in Vulture, Barile, Rapolla, Ripacandida, Ginestra, Maschito, Forenza, Acerenza, Melfi, Atella, Venosa, Lavello, Palazzo San Gervasio, Banzi, Genzano di Lucania"], ["Yield", "8 t/ha; 13% natural"], ["Superiore", "Released from 1 November of the third year after harvest, after at least 12 months in wood and 12 in bottle"], ["Riserva", "Released from 1 November of the fifth year, after at least 24 months in wood and 12 in bottle"], ["Total alcohol", "13.5%"]],
  place: "Slopes of Monte Vulture (1,326 m) at 200 to 700 m, on volcanic tuff and ash; cool nights and a long autumn.",
  rules: "Pure Aglianico; lower yields and higher alcohol than the DOC.",
  glass: "Black cherry, plum, smoke, licorice, volcanic minerality, strong tannin and acidity.",
  exam: "Basilicata's only DOCG; 100% Aglianico.",
  producers: ["Elena Fucci", "Paternoster", "Cantine del Notaio", "Grifalco", "Basilisco", "D'Angelo", "Re Manfredi"]
});
APXF["it-aglianico-del-vulture"] = bas({
  lede: "Aglianico from the slopes of Monte Vulture: Basilicata's flagship red, made dry or lightly off-dry, and sparkling.",
  cat: "DOC, red (still and spumante)", rec: "DOC 1971 (DPR 18 February 1971)", d: "DOC/Aglianico del Vulture",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grape", "Aglianico del Vulture and/or Aglianico 100%"], ["Zone", "The same 15 communes as the DOCG"], ["Yield", "10 t/ha; 12% natural (spumante 11%)"], ["Release", "From 1 September of the year after the harvest"], ["Total alcohol", "12.5%"]],
  place: "The volcanic Vulture area, around Rionero, Barile, Rapolla, Venosa and Melfi; Barile's tuff cellars are famous.", rules: "The aged Superiore and Riserva became the DOCG in 2010.",
  glass: "Dark fruit, smoke, firm tannin; more approachable than the Superiore.", exam: "DOC since 1971.", producers: ["Elena Fucci", "Paternoster", "Cantine del Notaio", "Grifalco"]
});
APXF["it-matera"] = bas({
  lede: "The DOC of the province of Matera: Primitivo, a Sangiovese-Primitivo red, Moro, Greco and sparkling wines.",
  cat: "DOC, red, white, rosé, sparkling, passito", rec: "DOC 2005 (DM 6 July 2005)", d: "DOC/Matera",
  amended: "Text as amended by DM 12 July 2019",
  facts: [["Rosso", "Sangiovese at least 60%; Primitivo at least 30%"], ["Primitivo", "Primitivo at least 90% (also passito)"], ["Types", "Rosso, Primitivo, Primitivo Passito, Rosato, Moro, Moro Riserva, Greco, Bianco, Bianco Passito, Spumante, Spumante Rosé"], ["Moro Riserva", "36 months including 24 in cask, from 1 November"]],
  place: "Hills of the province of Matera toward the Ionian coast.", rules: "Some types need 12 months of maturation.", glass: "Ripe Primitivo; structured Moro.", exam: "Minor DOC.", producers: []
});
APXF["it-grottino-di-roccanova"] = bas({
  lede: "Wines from Roccanova, Sant'Arcangelo and Castronuovo di Sant'Andrea, aged in tuff caves (grotte).",
  cat: "DOC, red, white, rosé", rec: "DOC 2009 (DM 24 July 2009)", d: "DOC/Grottino di Roccanova",
  facts: [["Rosso", "Sangiovese 60 to 85%; Cabernet Sauvignon, Malvasia Nera di Basilicata and Montepulciano 5 to 30% each"], ["Ageing", "Rosso 9 months; Riserva 36 months in cave; Bianco and Rosato 5 months; all from 1 November"], ["Total alcohol", "Rosso 12%; Riserva 13%"]],
  place: "Hills of the Agri and Sinni valleys.", rules: "Riserva ageing must be 'in grotta'.", glass: "Rustic, medium-bodied reds.", exam: "Named after its caves.", producers: []
});
APXF["it-terre-dell-alta-val-d-agri"] = bas({
  lede: "Merlot-Cabernet reds from the high Agri valley in southern Basilicata.",
  cat: "DOC, red, rosé", rec: "DOC 2003 (DM 4 September 2003)", d: "DOC/Terre dell'Alta Val d'Agri",
  facts: [["Rosso", "Merlot at least 50%; Cabernet Sauvignon at least 30%"], ["Ageing", "Rosso 12 months; Riserva 24 months including 6 in wood; from 1 November"], ["Release", "Rosato after 1 March"]],
  place: "The upper Agri valley in the province of Potenza.", rules: "Grape to wine 70%.", glass: "Supple reds.", exam: "Minor DOC.", producers: []
});
