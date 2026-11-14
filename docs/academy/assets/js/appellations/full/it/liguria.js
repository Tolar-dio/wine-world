// Full encyclopedia entries: Liguria. Written from each disciplinare di produzione (AIS copies).
function ligSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Liguria/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function lig(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [ligSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-cinque-terre"] = lig({
  lede: "Whites from Bosco, Albarola and Vermentino on vertiginous terraces above the sea, and the rare sweet Sciacchetrà from dried grapes.",
  cat: "DOC, white and sweet white", rec: "DOC 1973 (DPR 29 May 1973)", d: "Cinque Terre e Cinque Terre Sciacchetra",
  amended: "Text as amended by DM 6 August 2021",
  facts: [["Grapes", "Bosco, Albarola and/or Vermentino at least 80%"], ["Subzones", "Costa de Sera, Costa de Campu, Costa da Posa"], ["Sciacchetrà", "Dried grapes; grape to wine at most 32%; released from 1 October of the year after the harvest; total alcohol 19% (Riserva 20%), at least 11.5% actual"]],
  place: "Terraces held by dry-stone walls over cliffs at Monterosso, Vernazza, Corniglia, Manarola and Riomaggiore (plus Tramonti in La Spezia), a UNESCO site; monorails carry the grapes.",
  rules: "Vinification in the zone.",
  glass: "Dry: saline, herbal, citrus. Sciacchetrà: amber, apricot, honey, sea-salt.",
  exam: "Sciacchetrà = passito of the Cinque Terre.",
  producers: ["Cantina Cinque Terre", "Possa", "Buranco", "Walter De Battè"]
});
APXF["it-colli-di-luni"] = lig({
  lede: "Vermentino and Sangiovese from the hills on the Liguria-Tuscany border at the mouth of the Magra.",
  cat: "DOC, white, red", rec: "DOC 1989", d: "Colli di Luni",
  facts: [["Regions", "Province of La Spezia (Liguria) and Massa-Carrara (Tuscany)"], ["Types", "Rosso (Sangiovese at least 50%), Bianco (Vermentino at least 35%, Trebbiano 25 to 40%), Vermentino (at least 90%; also superiore), Albarola"], ["Yield", "11 t/ha; Vermentino superiore 9 t/ha"], ["Riserva", "Reds aged two years from 1 November"]],
  place: "Hills of the Val di Magra near the Roman city of Luni.", rules: "Grape to wine 70%.", glass: "Vermentino: fuller, herbal, saline.", exam: "Crosses the Liguria-Tuscany border.", producers: ["Lunae Bosoni", "Ottaviano Lambruschi", "Cantine Bondonor"]
});
APXF["it-colline-di-levanto"] = lig({
  lede: "Vermentino, Albarola and Bosco whites and light reds from the coast just north of the Cinque Terre.",
  cat: "DOC, white, red", rec: "DOC 1995 (DM 11 August 1995)", d: "Colline di Levanto",
  facts: [["Bianco", "Vermentino at least 40%, Albarola at least 20%, Bosco at least 5%"], ["Wine yield", "63 hl/ha"]],
  place: "Terraces around Levanto.", rules: "Grape to wine 70%.", glass: "Saline whites.", exam: "Minor DOC.", producers: []
});
APXF["it-portofino"] = lig({
  lede: "Wines of the Gulf of Tigullio behind Portofino, including the local Bianchetta Genovese and Scimiscià.",
  cat: "DOC, white, red, rosé, sweet", rec: "DOC 1997", d: "Golfo del Tigullio-Portofino o  Portofino",
  facts: [["Also labelled", "Portofino"], ["Types", "Bianco, Rosso, Rosato, Bianchetta Genovese, Vermentino, Ciliegiolo, Moscato (also passito), Scimiscià (Cimixa)"], ["Subzone", "Costa dei Fieschi"], ["Yield", "9 t/ha"]],
  place: "Steep coastal hills of the Riviera di Levante east of Genoa.", rules: "Grape to wine 70%.", glass: "Fresh whites.", exam: "Scimiscià is a rare local white.", producers: []
});
APXF["it-val-polcevera"] = lig({
  lede: "A small DOC in the valley behind Genoa, with the Coronata subzone.",
  cat: "DOC, white, red, rosé, passito", rec: "DOC 1999", d: "Val Polcevera",
  facts: [["Types", "Bianco (also spumante, frizzante, passito), Rosso, Rosato, Bianchetta Genovese, Vermentino"], ["Subzone", "Coronata (whites)"], ["Yield", "9.5 t/ha"]],
  place: "The Polcevera valley on the edge of Genoa.", rules: "Passito grape to wine 50%.", glass: "Light whites.", exam: "Genoa's own DOC.", producers: []
});
APXF["it-riviera-ligure-di-ponente"] = lig({
  lede: "The western Ligurian Riviera, home of Pigato, Vermentino and Rossese, with five subzones.",
  cat: "DOC, white, red, sweet", rec: "DOC 1988", d: "Riviera Ligure di Ponente",
  facts: [["Types", "Granaccia (Alicante), Moscato, Pigato, Rossese, Vermentino; superiore and passito versions"], ["Subzones", "Riviera dei Fiori, Albenganese, Finalese, Quiliano, Taggia"], ["Yields", "Pigato and Vermentino 11 t/ha; superiore 9 t/ha"]],
  place: "Hills behind Imperia and Savona, the Albenga plain among them.", rules: "Passito grape to wine 50%.", glass: "Pigato: fuller, more structured than Vermentino, with a bitter finish.", exam: "Pigato is a biotype of Vermentino.", producers: ["Bruna", "Laura Aschero", "Lupi", "BioVio"]
});
APXF["it-rossese-di-dolceacqua"] = lig({
  lede: "Light, perfumed red from Rossese on steep slopes behind Ventimiglia, Liguria's first DOC.",
  cat: "DOC, red", rec: "DOC 1972 (DPR 28 January 1972)", d: "Rossese di Dolceacqua o Dolceacqua",
  facts: [["Also labelled", "Dolceacqua"], ["Grape", "Rossese at least 95%"], ["Communes", "Dolceacqua, Apricale, Baiardo, Camporosso, Castelvittorio, Isolabona, Perinaldo, Pigna, Rocchetta Nervina, San Biagio della Cima, Soldano and others"], ["Yield", "9 t/ha"], ["Superiore", "Released from 1 November of the year after the harvest"], ["Total alcohol", "12%; Superiore 13%"]],
  place: "Steep terraces on marl and sandstone near the French border.", rules: "Grape to wine 70%.", glass: "Pale, red cherry, rose, spice.", exam: "Rossese = Tibouren of Provence.", producers: ["Terre Bianche", "Maccario Dringenberg", "Tenuta Anfosso"]
});
APXF["it-pornassio"] = lig({
  lede: "Ormeasco (Dolcetto) from high mountain vineyards in the Arroscia valley, including the rosé Sciac-trà.",
  cat: "DOC, red, rosé, sweet", rec: "DOC 2003", d: "Pornassio o Ormeasco di Pornassio",
  facts: [["Also labelled", "Ormeasco di Pornassio"], ["Grape", "Ormeasco (Dolcetto) at least 95%"], ["Types", "Rosso, Sciac-trà (rosé), Superiore, Passito, Passito liquoroso"], ["Sciac-trà", "Released from 1 March after the harvest"]],
  place: "Mountain valleys of Imperia province near Piedmont.", rules: "Passito aged 12 months from 1 January.", glass: "Dark, fruity Dolcetto.", exam: "Ormeasco = Dolcetto.", producers: []
});
