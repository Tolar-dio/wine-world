// Full encyclopedia entries: Molise. Written from each disciplinare di produzione (AIS copies).
function moSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Molise/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function mo(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [moSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-tintilia-del-molise"] = mo({
  lede: "Molise's own red grape, Tintilia, rescued from near-extinction and given its DOC in 2011.",
  cat: "DOC, red and rosé", rec: "DOC 2011 (DM 1 June 2011)", d: "Tintilia del Molise",
  amended: "Text as amended by DM 22 September 2022",
  facts: [["Grape", "Tintilia at least 95%"], ["Zone", "Communes of the provinces of Campobasso and Isernia"], ["Yield", "8 t/ha; 11.5% natural (Riserva 12.5%)"], ["Riserva", "2 years from 1 November"], ["Total alcohol", "11.5%; Riserva 13%"]],
  place: "Mountain hills of inland Molise, often 400 m and higher.", rules: "Low yields for a southern DOC.",
  history: "Tintilia was long thought to be Bovale (Sardinia); DNA has shown it is a distinct variety.",
  glass: "Dark, blackberry, pepper, herbs, firm but fine tannin.",
  exam: "Tintilia: Molise's native red.",
  producers: ["Claudio Cipressi", "Catabbo", "Cianfagna", "Herero"]
});
APXF["it-biferno"] = mo({
  lede: "Montepulciano-Aglianico reds and Trebbiano whites from the Biferno valley and the coast around Campobasso and Termoli.",
  cat: "DOC, red, rosé, white", rec: "DOC 1983 (DPR 26 April 1983)", d: "Biferno",
  facts: [["Rosso and Rosato", "Montepulciano 70 to 80%; Aglianico 10 to 20%"], ["Types", "Rosso, Rosato, Bianco, Rosso Riserva, Rosso Superiore"], ["Yields", "14 t/ha; Superiore 12.5 t/ha"], ["Natural alcohol", "Rosso 11.5%; Riserva 13%; Superiore 12.5%; Bianco 10.5%"]],
  place: "Province of Campobasso, from the Adriatic coast up the Biferno valley.", rules: "Grape to wine 70%.", glass: "Full, dark reds with firm tannin.", exam: "Montepulciano plus Aglianico.", producers: ["Di Majo Norante", "Borgo di Colloredo"]
});
APXF["it-pentro-di-isernia"] = mo({
  lede: "A small DOC in the province of Isernia for Montepulciano-Tintilia reds and Falanghina whites.",
  cat: "DOC, white, red, rosé", rec: "DOC 1983 (DPR 17 May 1983)", d: "Pentro di Isernia o Pentro",
  amended: "Text as amended by DM 18 June 2014",
  facts: [["Also labelled", "Pentro"], ["Bianco", "Falanghina 80%; Trebbiano Toscano 15 to 20%"], ["Rosso and Rosato", "Montepulciano 75 to 80%; Tintilia 20 to 25%"], ["Yield", "11 t/ha"], ["Release", "Rosso from 1 November of the year after the harvest; Riserva from 1 May of the fourth year"]],
  place: "Hills around Isernia.", rules: "Riserva ageing counts from 1 November of the harvest year.", glass: "Medium reds.", exam: "Minor DOC.", producers: []
});
APXF["it-molise"] = mo({
  lede: "The regional DOC of Molise, for blends and many varietals including Aglianico, Falanghina, Fiano, Tintilia and Moscato.",
  cat: "DOC, red, white, rosé, sparkling, passito", rec: "IGT 1995; DOC 1998 (DM 18 May 1998)", d: "Molise o del Molise",
  facts: [["Also labelled", "del Molise"], ["Rosso", "Montepulciano at least 85%"], ["Varietals", "Aglianico (also riserva), Chardonnay, Falanghina (also passito), Fiano, Greco Bianco, Malvasia, Moscato Bianco, Pinot Bianco, Sauvignon, Trebbiano and others"], ["Riserva", "2 years, 6 months in wood, from 1 November"], ["Passito", "Grape to wine 50%"]],
  place: "The whole region.", rules: "Grape to wine 70% except passito.", glass: "Varied.", exam: "Regional DOC.", producers: ["Di Majo Norante"]
});
