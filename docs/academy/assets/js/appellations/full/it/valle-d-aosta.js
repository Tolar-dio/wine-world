// Full encyclopedia entry: Valle d Aosta. Written from the disciplinare di produzione (AIS copy).
function vdaSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function vda(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [vdaSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-valle-d-aosta"] = vda({
  lede: "Italy's smallest wine region has a single DOC, written in Italian and French, for some 20 varieties and seven named subzones, from Nebbiolo at Donnas to Europe's highest vineyards at Morgex.",
  cat: "DOC, white, red, rosé, sweet", rec: "DOC 1971 (DPR 8 February 1971)", amended: "Text as amended by DM 7 March 2014", d: "Valle d'Aosta/Valle d'Aosta o Vallee d'Aoste",
  facts: [["Also labelled", "Vallée d'Aoste"], ["Varieties", "Petit Rouge, Fumin, Cornalin, Mayolet, Prëmetta, Vuillermin, Nebbiolo, Gamay, Gamaret, Pinot Noir, Syrah, Merlot; Petite Arvine, Chardonnay, Pinots, Müller-Thurgau, Muscat Petit Grain, Gewürztraminer"], ["Geographic names", "Donnas, Arnad-Montjovet, Chambave (also Moscato and Moscato Flétri), Nus (also Malvoisie and Flétri), Torrette, Enfer d'Arvier, Blanc de Morgex et de La Salle"], ["Yields", "Mostly 10 to 12 t/ha; Donnas 7.5 t/ha; Arnad-Montjovet and Nus Malvoisie 8"], ["Flétri", "Passito, grape to wine 40%"]],
  place: "The Dora Baltea valley from the Piedmont border to Mont Blanc: terraces on moraine and schist from 300 m at Donnas to 1,200 m at Morgex, where Prié Blanc grows ungrafted on pergolas.",
  rules: "Donnas and Arnad-Montjovet are Nebbiolo (Picotendro) based; Torrette and Enfer d'Arvier Petit Rouge based; Blanc de Morgex et de La Salle from Prié Blanc.",
  glass: "Light, alpine reds; mineral Petite Arvine; razor-sharp Blanc de Morgex.",
  exam: "Bilingual DOC; Prié Blanc at Morgex is among Europe's highest vineyards; Picotendro = Nebbiolo.",
  producers: ["Les Crêtes", "Grosjean", "Ermes Pavese", "Cave Mont Blanc", "Danilo Thomain", "Caves Cooperatives de Donnas"]
});
