// Full encyclopedia entries: Friuli Venezia Giulia. Written from each disciplinare di produzione (AIS copies).
const FVD = "https://aisitalia.it/Disciplinari/Friuli%20Venezia%20Giulia/";
function fvSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", FVD + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function fv(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [fvSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-colli-orientali-del-friuli-picolit"] = fv({
  lede: "Sweet white from the low-yielding Picolit grape in the eastern hills of Udine, one of Italy's most prized dessert wines.",
  cat: "DOCG, sweet white", rec: "DOC 1970 (within Colli Orientali del Friuli); DOCG 2006", d: "DOCG/Colli Orientali del Friuli Picolit",
  facts: [["Grape", "Picolit at least 85%; other whites up to 15%, no Traminer"], ["Subzone", "Cialla"], ["Yield", "4 t/ha; 13% natural alcohol"], ["Grape to wine", "55%"], ["Release", "From 1 September of the year after the harvest"], ["Total alcohol", "15%"]],
  place: "The Friuli Colli Orientali hills from Tarcento to the Slovenian border, on ponca (marl and sandstone flysch).",
  rules: "Grapes may be late-harvested or dried. Picolit suffers floral abortion, so bunches set few berries.",
  history: "Count Fabio Asquini sold Picolit to European courts in the 18th century; it was revived after phylloxera by the Perusini family at Rocca Bernarda.",
  glass: "Golden, apricot, acacia honey and almond, sweet but elegant.",
  exam: "Picolit's natural low yield comes from poor fruit set (aborted flowers).",
  producers: ["Livio Felluga", "Ronchi di Cialla", "Perusini"]
});
APXF["it-ramandolo"] = fv({
  lede: "Sweet Verduzzo Friulano from the steep hills of Ramandolo near Nimis, at the northern end of the Colli Orientali.",
  cat: "DOCG, sweet white", rec: "Subzone of Colli Orientali del Friuli 1970; DOCG 2001", d: "DOCG/Ramandolo",
  amended: "Text as amended by DM 22 July 2024",
  facts: [["Grape", "Verduzzo Friulano (locally Verduzzo Giallo) 100%"], ["Types", "Ramandolo, Ramandolo Riserva"], ["Yield", "8 t/ha; 11% natural"], ["Grape to wine", "65%"], ["Release", "From November of the year after the harvest; Riserva later"], ["Total alcohol", "14%"]],
  place: "Steep terraces around Ramandolo, Nimis and Tarcento below Monte Bernadia, the coolest part of the Colli Orientali.",
  rules: "Ramandolo vineyards may also declassify to Friuli Colli Orientali Verduzzo.",
  glass: "Golden, honey, dried apricot, chestnut; slightly tannic for a white.",
  exam: "Verduzzo is a white grape with noticeable tannin.",
  producers: ["Dario Coos", "Anna Berra"]
});
APXF["it-rosazzo"] = fv({
  lede: "A white blend led by Friulano from the hills around the Abbey of Rosazzo, a former Colli Orientali subzone.",
  cat: "DOCG, white", rec: "Subzone of Colli Orientali del Friuli 1970; DOCG 2011", d: "DOCG/Rosazzo",
  facts: [["Grapes", "Friulano at least 50%; Sauvignon 20 to 30%; Pinot Bianco and/or Chardonnay 20 to 30%; Ribolla Gialla up to 10%; others up to 5%"], ["Communes", "Parts of Manzano, San Giovanni al Natisone, Corno di Rosazzo (Udine)"], ["Natural alcohol", "11.5%"], ["Total alcohol", "12%"]],
  place: "Ponca hills around the medieval Abbey of Rosazzo.",
  rules: "A blended white, unusual in a varietal region.",
  history: "Walter Filiputti and the abbey estate championed the blend.",
  glass: "Rich, almondy, herbal white with good structure.",
  exam: "Rosazzo is a white-blend DOCG; Ribolla Gialla di Rosazzo and Pignolo di Rosazzo are subzones of Friuli Colli Orientali.",
  producers: ["Livio Felluga (Abbazia di Rosazzo)", "Ronco delle Betulle"]
});
APXF["it-friuli-colli-orientali"] = fv({
  lede: "The eastern hills of Udine province along the Slovenian border: Friulano, Ribolla, Sauvignon, native reds like Schioppettino, Pignolo and Refosco, and five subzones.",
  cat: "DOC, white, red, sweet", rec: "DOC 1970 (as Colli Orientali del Friuli)", d: "DOC/Friuli Colli Orientali",
  amended: "Text as amended by DM 14 October 2011",
  facts: [["Grapes", "Chardonnay, Malvasia, Pinots, Ribolla Gialla, Riesling, Sauvignon, Friulano, Traminer, Verduzzo, Cabernets, Merlot, Pignolo, Pinot Nero, Refosco, Schioppettino, Tazzelenghe; Bianco, Rosso, Dolce"], ["Subzones", "Cialla, Ribolla Gialla di Rosazzo, Pignolo di Rosazzo, Schioppettino di Prepotto, Refosco di Faedis"], ["Yield", "11 t/ha; 10% natural"]],
  place: "Ponca (Eocene flysch of marl and sandstone) hills from Tarcento to Corno di Rosazzo, sheltered by the Julian Prealps.",
  rules: "Riserva versions exist. The name now carries 'Friuli' first.",
  glass: "Aromatic, structured whites; peppery Schioppettino; tannic Pignolo.",
  exam: "Ponca soils; native Schioppettino, Pignolo, Tazzelenghe; DOCGs Picolit, Ramandolo, Rosazzo sit within it.",
  producers: ["Miani", "Ronchi di Cialla", "Livio Felluga", "Le Vigne di Zamò", "Moschioni", "Ronco del Gnemiz"]
});
APXF["it-collio-goriziano"] = fv({
  lede: "The hills of Gorizia on the Slovenian border (Brda across it), Italy's most celebrated white-wine hills, for varietals and the blended Collio Bianco.",
  cat: "DOC, white, red", rec: "DOC 1968", d: "DOC/Collio Goriziano o Collio",
  facts: [["Also labelled", "Collio"], ["Types", "Bianco, Chardonnay, Malvasia, Müller-Thurgau, Picolit, Pinot Bianco, Pinot Grigio, Ribolla Gialla, Riesling, Riesling Italico, Sauvignon, Friulano, Traminer; Rosso, Cabernets, Merlot, Pinot Nero"], ["Grape to wine", "70%; Picolit 60%"], ["Natural alcohol", "10.5%; Picolit 13%"], ["Riserva", "Allowed for all types with longer ageing"]],
  place: "A crescent of hills between the Isonzo and the Judrio, on ponca flysch, with the Adriatic to the south and the Alps to the north.",
  rules: "Collio Bianco may blend local and international white varieties.",
  history: "Mario Schiopetto pioneered modern, temperature-controlled white winemaking here in the 1960s; Josko Gravner and Stanko Radikon later led the orange-wine revival.",
  glass: "Mineral, textured whites: Friulano (almond), Ribolla (citrus, often skin-macerated), Sauvignon.",
  exam: "Collio and Friuli Colli Orientali are the hill DOCs on ponca; Isonzo and Grave are plains.",
  producers: ["Schiopetto", "Gravner", "Radikon", "Venica & Venica", "Russiz Superiore", "Edi Keber", "Primosic"]
});
APXF["it-carso"] = fv({
  lede: "The limestone plateau above Trieste, for Terrano (a Refosco), Vitovska and Malvasia Istriana.",
  cat: "DOC, red, white", rec: "DOC 1985", d: "DOC/Carso o Carso-Kras",
  facts: [["Also labelled", "Carso-Kras"], ["Types", "Rosso, Terrano (also Classico), Refosco, Cabernets, Merlot, Chardonnay, Glera, Malvasia, Pinot Grigio, Sauvignon, Traminer, Vitovska"], ["Riserva", "For Rosso, Malvasia, Sauvignon, Vitovska, Merlot, Refosco, Terrano"]],
  place: "Thin red soil (terra rossa) over karst limestone, windswept by the bora; cellars cut into rock.",
  rules: "Terrano Classico from the oldest zone.",
  glass: "Terrano: very high acid, tart red; Vitovska: saline, often skin-contact.",
  exam: "Karst gave its name to the geology term; Terrano is a Refosco.",
  producers: ["Edi Kante", "Paolo Vodopivec", "Zidarich", "Skerk"]
});
APXF["it-friuli"] = fv({
  lede: "The regional DOC for the whole of Friuli Venezia Giulia, created in 2016, for varietals, blends and sparkling Ribolla Gialla.",
  cat: "DOC, white, red, sparkling", rec: "DOC 2016 (EU implementing regulation)", d: "DOC/Friuli o Friuli Venezia Giulia - Furlanija o Furlanija Julijska Krajina",
  facts: [["Also labelled", "Friuli Venezia Giulia, Furlanija, Furlanija Julijska Krajina"], ["Types", "Bianco, Rosso, Chardonnay, Friulano, Malvasia, Pinots, Riesling, Sauvignon, Traminer, Verduzzo, Cabernets, Merlot, Refosco; Spumante and Ribolla Gialla Spumante (tank or metodo classico)"], ["Yields", "Mostly 14 t/ha"], ["Metodo classico", "At least 9 months on the lees; millesimato with longer ageing"]],
  place: "All the region's DOC areas.",
  rules: "Tank-method spumante at least 90 days on the lees; released from 1 February after the harvest.",
  glass: "Simple, fresh varietals and sparkling Ribolla.",
  exam: "Regional umbrella DOC from 2016.",
  producers: []
});
APXF["it-friuli-grave"] = fv({
  lede: "The largest Friulian DOC, on the stony gravel plain (grave) of the Tagliamento and Meduna in Pordenone and Udine.",
  cat: "DOC, white, red, rosé, sparkling", rec: "DOC 1970", d: "DOC/Friuli Grave",
  facts: [["Types", "Bianco, Rosso, Chardonnay, Pinots, Riesling, Sauvignon, Friulano, Traminer, Verduzzo, Cabernets, Merlot, Refosco, Novello, Rosato; Superiore versions"], ["Natural alcohol", "10%; Superiore 11%"]],
  place: "Alluvial gravels, well drained and warm by day.",
  rules: "Superiore from riper grapes.",
  glass: "Fruity, easy varietals; Merlot and Pinot Grigio dominate.",
  exam: "Grave = gravel.",
  producers: []
});
APXF["it-friuli-isonzo"] = fv({
  lede: "The gravel plain of the Isonzo river south of Collio, for structured whites and reds.",
  cat: "DOC, white, red, rosé, sweet, sparkling", rec: "DOC 1974", d: "DOC/Friuli Isonzo o Isonzo del Friuli",
  facts: [["Also labelled", "Isonzo del Friuli"], ["Types", "Bianco, Rosso, Rosato, Vendemmia tardiva, Chardonnay, Malvasia, Moscato Giallo and Rosa, Pinots, Riesling, Sauvignon, Friulano, Traminer, Verduzzo, Cabernets, Merlot, Refosco, Schioppettino, Franconia, spumante"], ["Natural alcohol", "9.5%"], ["Vendemmia tardiva", "Picked at least 30 days after harvest start; grape to wine 60%"]],
  place: "Red, iron-rich gravels (rive rosse) and white limestone gravels on either side of the Isonzo, with warm days and sea breezes.",
  rules: "Many varietal types.",
  glass: "Riper, rounder whites than Collio.",
  exam: "Isonzo is a plain DOC, but its best wines rival the hills.",
  producers: ["Vie di Romans", "Lis Neris", "Ronco del Gelso"]
});
APXF["it-friuli-aquileia"] = fv({
  lede: "A coastal-plain DOC around the Roman city of Aquileia, for varietal whites and reds.",
  cat: "DOC, white, red, rosé", rec: "DOC 1975", d: "DOC/Friuli Aquileia",
  facts: [["Types", "Bianco, Rosso, Merlot, Cabernets, Refosco, Friulano, Pinots, Riesling, Sauvignon, Traminer, Chardonnay, Verduzzo, Malvasia, Müller-Thurgau; Superiore"]],
  place: "Flat alluvial land near the Grado lagoon.",
  rules: "Refosco may include up to 10% Refosco Nostrano.",
  glass: "Light, fresh wines.",
  exam: "Named for the Roman colony of Aquileia.",
  producers: []
});
APXF["it-friuli-latisana"] = fv({
  lede: "A plain DOC near the mouth of the Tagliamento, with Franconia (Blaufränkisch) among its reds.",
  cat: "DOC, white, red, rosé, sparkling", rec: "DOC 1975", d: "DOC/Friuli Latisana",
  facts: [["Types", "Merlot, Cabernets, Carmenère, Franconia, Refosco, Pinot Nero, Rosato, Rosso, Pinot Bianco and other whites; Superiore and Riserva"]],
  place: "The lower Tagliamento plain.",
  rules: "Riserva aged in wood or other vessels from 11 November.",
  glass: "Soft, fruity reds.",
  exam: "Franconia = Blaufränkisch.",
  producers: []
});
APXF["it-friuli-annia"] = fv({
  lede: "A small coastal-plain DOC named after the Roman Via Annia, for varietal and blended wines.",
  cat: "DOC, white, red, rosé, sparkling", rec: "DOC 1995", d: "DOC/Friuli Annia",
  facts: [["Grapes", "Varietals at least 90%: Merlot, Cabernets, Refosco, Friulano, Pinots, Verduzzo, Traminer, Sauvignon, Chardonnay, Malvasia"], ["Natural alcohol", "10%"]],
  place: "Lowlands between Aquileia and Latisana.",
  rules: "Frizzante and spumante allowed.",
  glass: "Simple, fresh wines.",
  exam: "Minor plain DOC.",
  producers: []
});
