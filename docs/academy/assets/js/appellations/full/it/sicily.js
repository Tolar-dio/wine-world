// Full encyclopedia entries: Sicily. Written from each disciplinare di produzione (AIS copies).
function sicSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Sicilia/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function sic(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [sicSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
const SIC_ETNA_DOCG = ["Rivista di Agraria: Etna DOCG, the final sprint (October 2025)", "https://www.rivistadiagraria.org/vino-e-dintorni/etna-docg-sprint-finale/?print=pdf"];
APXF["it-etna"] = sic({
  lede: "Wines from the slopes of Europe's highest active volcano: Nerello Mascalese reds compared with Burgundy and Barolo, Carricante whites of piercing acidity, and 133 named contrade.",
  cat: "DOC, red, white, rosé, sparkling", rec: "DOC 1968 (DPR 11 August 1968), Sicily's first", d: "DOC/Etna",
  amended: "Text as amended by DM 19 January 2022; DOCG application in progress",
  sources: [SIC_ETNA_DOCG],
  facts: [["Rosso and Rosato", "Nerello Mascalese at least 80%; Nerello Cappuccio (Mantellato) up to 20%; others up to 10%"], ["Bianco", "Carricante at least 60%; Catarratto up to 40%"], ["Bianco Superiore", "Carricante at least 80%, only from the commune of Milo"], ["Zone", "20 communes on the north, east and south slopes: Biancavilla, Santa Maria di Licodia, Ragalna, Belpasso, Nicolosi, Pedara, Trecastagni, Viagrande, Aci Sant'Antonio, Acireale, Santa Venerina, Giarre, Mascali, Zafferana, Milo, Sant'Alfio, Piedimonte, Linguaglossa, Castiglione, Randazzo"], ["Yields", "9 t/ha; Rosso Riserva 8"], ["Rosso Riserva", "At least 4 years in the zone, including 12 months in wood, from 1 November"], ["Spumante", "Classic method, at least 18 months on the lees"], ["Contrade", "Named on labels since 2011"]],
  place: "A horseshoe of terraces on black volcanic sand and lava from about 350 m to over 1,000 m, among Europe's highest vineyards, with old alberello vines, many ungrafted, and huge day-night swings.",
  rules: "Producers were gathering signatures in late 2025 to apply for DOCG status; at the date checked the DOC was still in force.",
  history: "Long a source of bulk wine shipped to the north, Etna was revived from the 1990s and 2000s by producers such as Benanti, Passopisciaro, Frank Cornelissen and Terre Nere.",
  glass: "Rosso: pale ruby, red cherry, rose, dried herbs, smoke, fine chalky tannin. Bianco: lemon, apple, saline, very high acidity, ages for decades.",
  exam: "Bianco Superiore only from Milo; Rosso Riserva 4 years; Nerello Mascalese at least 80%.",
  producers: ["Benanti", "Passopisciaro", "Tenuta delle Terre Nere", "Frank Cornelissen", "Pietradolce", "Girolamo Russo", "Graci", "I Vigneri", "Biondi"]
});
APXF["it-cerasuolo-di-vittoria"] = sic({
  lede: "Sicily's only DOCG: a red blend of Nero d'Avola and Frappato from the south-eastern plateau around Vittoria.",
  cat: "DOCG, red", rec: "DOC 1973; DOCG 2005 (DM 13 September 2005)", d: "DOCG/Cerasuolo di Vittoria",
  amended: "Text as amended by DM 17 February 2020",
  facts: [["Grapes", "Nero d'Avola 50 to 70%; Frappato 30 to 50%"], ["Zone", "Vittoria, Comiso, Acate, Chiaramonte Gulfi, Santa Croce Camerina and part of Ragusa (Ragusa); Butera and Mazzarino (Caltanissetta); Caltagirone, Licodia Eubea, Mazzarrone (Catania)"], ["Classico", "The historic core; released from 31 March of the second year after harvest"], ["Natural alcohol", "12.5%; grape to wine 65% (52 hl/ha)"], ["Release", "From 1 June after the harvest"], ["Total alcohol", "12.5%"]],
  place: "Red sand over limestone (terra rossa) on the Iblei plateau near the south coast.",
  rules: "The name means 'cherry-coloured', not a rosé.",
  glass: "Bright cherry red, strawberry, cherry, rose, soft tannin: Frappato gives perfume, Nero d'Avola body.",
  exam: "Sicily's only DOCG; Nero d'Avola plus Frappato.",
  producers: ["COS", "Arianna Occhipinti", "Valle dell'Acate", "Planeta", "Gulfi", "Feudi del Pisciotto"]
});
APXF["it-vittoria"] = sic({
  lede: "The DOC overlapping Cerasuolo di Vittoria, for varietal Frappato, Nero d'Avola and Insolia.",
  cat: "DOC, red, white", rec: "DOC 2005 (DM 13 September 2005)", d: "DOC/Vittoria",
  facts: [["Rosso", "Nero d'Avola 50 to 70%; Frappato 30 to 50%"], ["Types", "Rosso, Calabrese or Nero d'Avola, Frappato, Ansonica or Insolia, Novello"], ["Release", "Rosso from 30 March; Nero d'Avola from 1 June after harvest"], ["Natural alcohol", "Reds 12%"]],
  place: "As Cerasuolo di Vittoria.", rules: "Grape to wine 70%.", glass: "Frappato: light, perfumed, strawberry and pepper.", exam: "Home of varietal Frappato.", producers: ["COS", "Arianna Occhipinti", "Valle dell'Acate"]
});
APXF["it-sicilia"] = sic({
  lede: "The island-wide DOC created from the Sicilia IGT in 2011, now the main home of Grillo and Nero d'Avola.",
  cat: "DOC, white, red, rosé, sparkling, sweet", rec: "IGT 1995; DOC 2011 (DM 22 November 2011)", d: "DOC/Sicilia",
  amended: "Text as amended by DM 27 August 2024",
  sources: [["BlogSicilia: Grillo and Nero d'Avola reserved for the DOCs (2017)", "https://www.blogsicilia.it/palermo/via-libera-ai-vini-grillo-e-nero-davola-nelle-doc/397502/"]],
  facts: [["Types", "Bianco and Rosso (also late harvest, passito, riserva; Bianco also superiore), Rosato, classic-method and tank-method spumante"], ["Varietals", "At least 85% of the named variety: Grillo, Nero d'Avola, Frappato, Inzolia, Catarratto, Grecanico, Carricante, Perricone, Nerello Mascalese and international varieties"], ["Grillo and Nero d'Avola", "Since the 2017 harvest they may appear on labels only under DOCs, not the Terre Siciliane IGT"]],
  place: "The whole island, from the western Trapani plain to Etna.", rules: "The regional authority may set annual yield limits and stock releases for Grillo and others.",
  glass: "Grillo: citrus, herbs, saline; Nero d'Avola: plum, cherry, spice.", exam: "Sicilia DOC is island-wide; Grillo and Nero d'Avola are DOC-only names.", producers: ["Planeta", "Donnafugata", "Tasca d'Almerita", "Firriato", "Cusumano"]
});
APXF["it-marsala"] = sic({
  lede: "The fortified wine of the Trapani province, developed by English merchants from 1773, made golden, amber or ruby, dry to sweet, and aged up to ten years or more.",
  cat: "DOC, fortified (oro, ambra, rubino)", rec: "DOC 1969 (DPR 2 April 1969); rules also set by Law 851 of 1984", d: "DOC/Marsala",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grapes (Oro, Ambra)", "Grillo, Catarratto, Ansonica (Inzolia), Damaschino"], ["Grapes (Rubino)", "Perricone (Pignatello), Nero d'Avola, Nerello Mascalese, with up to 30% white grapes"], ["Zone", "The province of Trapani except Pantelleria, Favignana and Alcamo"], ["Yields", "10 t/ha white, 9 t/ha red; 12% natural"], ["Categories", "Fine (17.5%, at least 1 year), Superiore (18%, 2 years), Superiore Riserva (4 years), Vergine or Soleras (5 years, dry, no mosto cotto), Vergine Riserva or Stravecchio (10 years)"], ["Sweetness", "Secco (under 4% sugar), semisecco, dolce"]],
  place: "Flat, hot, windy vineyards around Marsala, Trapani and Mazara.", rules: "Ambra may use mosto cotto (cooked must); Vergine may not be sweetened.",
  history: "John Woodhouse shipped the first fortified Marsala to England in 1773; Ingham, Whitaker and later Florio built the trade.",
  glass: "Vergine: amber, dried fruit, walnut, salty, dry and long.",
  exam: "Oro and Ambra from white grapes, Rubino from red; Vergine = no sweetening, 5 years.",
  producers: ["Marco De Bartoli", "Florio", "Pellegrino", "Nino Barraco"]
});
APXF["it-pantelleria"] = sic({
  lede: "Zibibbo (Muscat of Alexandria) on the volcanic island of Pantelleria, nearer Tunisia than Sicily, famous for Passito di Pantelleria.",
  cat: "DOC, sweet and dry white", rec: "DOC 1971 (DPR 11 August 1971)", d: "DOC/Pantelleria",
  amended: "Text as amended by DM 26 August 2024",
  facts: [["Grape", "Zibibbo (Muscat of Alexandria)"], ["Types", "Moscato di Pantelleria, Passito di Pantelleria, Moscato spumante, Moscato dorato, Moscato liquoroso, Passito liquoroso, Zibibbo dolce, Bianco (also frizzante)"], ["Passito", "Fresh grapes fermented with sun-dried grapes added; total 20%, 14% actual; released from 1 July of the year after harvest"], ["Vineyards", "Only vines more than three years old"]],
  place: "Black volcanic terraces swept by wind, where Zibibbo is trained as low bush vines in hollows; this practice is on UNESCO's intangible heritage list (2014).",
  rules: "No enrichment except adding sun-dried grapes.", glass: "Apricot, orange peel, honey, dates, fresh acidity.", exam: "Zibibbo = Muscat of Alexandria; alberello pantesco is UNESCO heritage.", producers: ["Donnafugata (Ben Ryé)", "Marco De Bartoli (Bukkuram)", "Salvatore Murana", "Ferrandes"]
});
APXF["it-malvasia-delle-lipari"] = sic({
  lede: "Sweet Malvasia from the Aeolian Islands, chiefly Salina and Lipari, made still, passito or fortified.",
  cat: "DOC, sweet white", rec: "DOC 1973 (DPR 20 September 1973)", d: "DOC/Malvasia delle Lipari",
  facts: [["Grapes", "Malvasia di Lipari up to 95%; Corinto Nero 5 to 8%"], ["Zone", "The Aeolian Islands, province of Messina"], ["Passito", "Grape to wine 45%; released from 1 June after harvest; total 18%, at least 6% sugar"], ["Liquoroso", "Total 20%, 16% actual; 6 months refinement"]],
  place: "Volcanic islands north of Sicily.", rules: "Corinto Nero, a black grape, is required in the blend.", glass: "Apricot, fig, honey, Mediterranean herbs.", exam: "Corinto Nero is part of the blend.", producers: ["Hauner", "Caravaglio", "Fenech", "Tasca d'Almerita (Capofaro)"]
});
APXF["it-faro"] = sic({
  lede: "A rare Nerello-based red from the hills of Messina facing the Strait.",
  cat: "DOC, red", rec: "DOC 1976 (DPR 3 December 1976)", d: "DOC/Faro",
  facts: [["Grapes", "Nerello Mascalese 45 to 60%; Nerello Cappuccio 15 to 30%; Nocera 5 to 10%"], ["Zone", "The commune of Messina"], ["Ageing", "At least 1 year from 1 November, in the zone"], ["Total alcohol", "12%"]],
  place: "Steep hills above the Strait of Messina.", rules: "Grape to wine 70%.", glass: "Fragrant, fine reds.", exam: "Nocera is a required part of the blend.", producers: ["Palari"]
});
APXF["it-mamertino"] = sic({
  lede: "Wines from the hills behind Milazzo, claiming the Mamertine wine praised by Julius Caesar.",
  cat: "DOC, white, red", rec: "DOC 2004 (DM 3 September 2004)", d: "DOC/Mamertino di Milazzo o Mamertino",
  facts: [["Also labelled", "Mamertino"], ["Types", "Bianco (also riserva), Rosso (also riserva), Calabrese or Nero d'Avola (also riserva), Grillo-Ansonica"]],
  place: "North-eastern Sicily, province of Messina.", rules: "Grape to wine 70%.", glass: "Supple reds.", exam: "Minor DOC.", producers: ["Planeta"]
});
APXF["it-noto"] = sic({
  lede: "Moscato di Noto, a historic sweet white, and Nero d'Avola reds from Noto, Rosolini, Pachino and Avola.",
  cat: "DOC, sweet white and red", rec: "DOC 1974 (DPR 14 March 1974)", d: "DOC/Noto",
  facts: [["Moscato", "Moscato Bianco"], ["Noto Rosso", "Nero d'Avola at least 65%"], ["Types", "Moscato di Noto (still, spumante, liquoroso), Passito di Noto, Noto Rosso, Noto Nero d'Avola"], ["Passito", "Grape to wine 50%"]],
  place: "The baroque south-east, where Nero d'Avola is thought to originate.", rules: "Grape to wine 70%.", glass: "Nero d'Avola: ripe plum and spice.", exam: "Avola gave Nero d'Avola its name.", producers: ["Planeta", "Marabino", "Zisola"]
});
APXF["it-siracusa"] = sic({
  lede: "Moscato di Siracusa, one of Italy's oldest sweet wines, and reds from the Syracuse area.",
  cat: "DOC, sweet white, red, white", rec: "DOC 1973 (DPR 26 June 1973)", d: "DOC/Siracusa",
  facts: [["Types", "Moscato, Moscato Spumante, Passito, Nero d'Avola, Syrah, Rosso, Bianco"], ["Passito", "Grape to wine 50%; total 16.5%"]],
  place: "Limestone hills around Syracuse.", rules: "Grape to wine 70%.", glass: "Golden, apricot Moscato.", exam: "Minor DOC.", producers: ["Pupillo"]
});
APXF["it-eloro"] = sic({
  lede: "Nero d'Avola, Frappato and Pignatello reds from the south-eastern tip around Pachino.",
  cat: "DOC, red, rosé", rec: "DOC 1994 (DM 3 October 1994)", d: "DOC/Eloro",
  facts: [["Grapes", "Nero d'Avola, Frappato and Pignatello together at least 90%"], ["Subzone", "Pachino (Nero d'Avola at least 80%)"], ["Zone", "Noto, Pachino, Portopalo di Capo Passero, Rosolini (Siracusa) and Ispica (Ragusa)"], ["Riserva", "2 years from 15 October, 6 months in wood; released from 1 April after harvest for some types"]],
  place: "The coastal plain near Pachino and Portopalo.", rules: "Grape to wine 70%.", glass: "Ripe, dark reds.", exam: "Minor DOC.", producers: []
});
APXF["it-alcamo"] = sic({
  lede: "Catarratto-based whites and many varietals from the hills between Palermo and Trapani.",
  cat: "DOC, white, red, rosé, sparkling, late harvest", rec: "DOC 1972 (DPR 21 July 1972)", d: "DOC/Alcamo",
  facts: [["Classico", "For the white from the historic area"], ["Yields", "Whites 12 t/ha; reds 11; late harvest 8"], ["Riserva", "Rosso 2 years from 1 December, 6 months in wood"]],
  place: "Hills around Alcamo near the Gulf of Castellammare.", rules: "Grapes not picked before 15 September.", glass: "Fresh whites.", exam: "Catarratto country.", producers: ["Rapitalà"]
});
APXF["it-menfi"] = sic({
  lede: "Varietals and blends from the south-west coast around Menfi.",
  cat: "DOC, white, red, rosé, sparkling, sweet", rec: "DOC 1995 (DM 18 August 1995)", d: "DOC/Menfi",
  amended: "Text as amended by an EU implementing regulation",
  facts: [["Varietals", "Inzolia, Grillo, Chardonnay, Catarratto, Grecanico, Fiano, Viognier, Nero d'Avola, Syrah and others"], ["Riserva", "2 years from 1 November"]],
  place: "Coastal hills of Agrigento province.", rules: "Grape to wine 70%.", glass: "Varied.", exam: "Minor DOC.", producers: ["Planeta", "Settesoli"]
});
APXF["it-monreale"] = sic({
  lede: "Hills south of Palermo around Monreale, focused since 2024 on Catarratto, Perricone and Syrah.",
  cat: "DOC, white, red, rosé", rec: "DOC 2000 (DM 2 November 2000)", d: "DOC/Monreale",
  amended: "Text as amended by DM 25 January 2024",
  sources: [["Il Sole 24 Ore: new Monreale DOC specification (July 2024)", "https://en.ilsole24ore.com/art/a-new-specification-the-doc-monreale-territorio-centro-AFhZAS7B"]],
  facts: [["Types", "Rosso (also riserva), Rosato, Bianco, Syrah (also rosato, riserva)"], ["Main grapes", "Catarratto, Perricone, Syrah; Nero d'Avola and Insolia only as secondary blending grapes"], ["Riserva", "12.5% natural, 24 months from 1 November"]],
  place: "Hills of the Conca d'Oro behind Palermo.", rules: "The 2024 revision cut the list of grape varieties from about fifteen to three.", glass: "Peppery Syrah; textured Catarratto.", exam: "Perricone is a native Sicilian red.", producers: ["Alessandro di Camporeale", "Sallier de la Tour"]
});
APXF["it-contessa-entellina"] = sic({
  lede: "Whites and reds from the hills of Contessa Entellina in the Belice valley, home of Donnafugata's vineyards.",
  cat: "DOC, white, red, rosé, late harvest", rec: "DOC 1993 (DM 2 August 1993)", d: "DOC/Contessa Entellina",
  facts: [["Varietals", "Grecanico, Chardonnay, Sauvignon, Ansonica, Catarratto, Fiano, Viognier, Cabernet Sauvignon, Merlot, Nero d'Avola, Pinot Nero, Syrah"], ["Yield", "12 t/ha"], ["Late harvest", "Grapes picked from 1 October; 8 t/ha; grape to wine 60%; released after 18 months"]],
  place: "Inland hills of Palermo province.", rules: "Grape to wine 70%.", glass: "Clean varietals.", exam: "Minor DOC.", producers: ["Donnafugata"]
});
APXF["it-contea-di-sclafani"] = sic({
  lede: "Wines from the central Madonie hills, home of Tasca d'Almerita's Regaleali estate.",
  cat: "DOC, white, red", rec: "DOC 1996 (DM 23 September 1996)", d: "DOC/Contea di Sclafani o Valledolmo-Contea di Sclafani",
  facts: [["Also labelled", "Valledolmo-Contea di Sclafani"], ["Types", "Bianco and Rosso (also riserva, vendemmia tardiva)"], ["Riserva", "12% natural, 2 years from 1 November"], ["Late harvest", "13% natural, picked from 1 October, released after 18 months"]],
  place: "High inland hills between Palermo and Caltanissetta.", rules: "Grape to wine 70%.", glass: "Fresh, high-altitude wines.", exam: "Minor DOC.", producers: ["Tasca d'Almerita"]
});
APXF["it-delia-nivolelli"] = sic({ lede: "Varietals from the Mazara del Vallo and Marsala area in western Sicily.", cat: "DOC, white, red, sparkling", rec: "DOC 1998 (DM 10 June 1998)", d: "DOC/Delia Nivolelli", facts: [["Varietals", "Chardonnay, Damaschino, Grecanico, Grillo, Inzolia, Müller-Thurgau, Sauvignon, Nero d'Avola, Merlot, Perricone, Sangiovese, Syrah"], ["Natural alcohol", "Whites 10.5%; reds 11.5%"]], place: "Trapani province.", rules: "Grape to wine 70%.", glass: "Simple varietals.", exam: "Minor DOC.", producers: [] });
APXF["it-erice"] = sic({ lede: "Varietals, Zibibbo late harvest and sparkling wines from the hills below Erice near Trapani.", cat: "DOC, white, red, sweet, sparkling", rec: "DOC 2004 (DM 20 October 2004)", d: "DOC/Erice", facts: [["Types", "Bianco, Ansonica, Catarratto, Grecanico, Grillo, Chardonnay, Müller-Thurgau, Sauvignon, Vendemmia Tardiva Zibibbo, Moscato, Passito, Spumante, Rosso, Nero d'Avola, Frappato, Perricone, Syrah, Merlot, Cabernet Sauvignon"], ["Late harvest", "Grape to wine 60%"]], place: "Trapani province.", rules: "Grape to wine 70%.", glass: "Varied.", exam: "Minor DOC.", producers: [] });
APXF["it-salaparuta"] = sic({ lede: "Varietals and blends from Salaparuta in the Belice valley.", cat: "DOC, white, red", rec: "DOC 2006 (DM 8 February 2006)", d: "DOC/Salaparuta", facts: [["Types", "Rosso (also riserva), Bianco, Inzolia, Grillo, Chardonnay, Catarratto, Nero d'Avola, Merlot, Cabernet Sauvignon (riserva for reds)"], ["Riserva", "2 years, 6 months in wood"]], place: "Trapani province.", rules: "Grape to wine 70%.", glass: "Varied.", exam: "Minor DOC.", producers: [] });
APXF["it-sambuca-di-sicilia"] = sic({ lede: "Whites and reds from Sambuca di Sicilia near Lake Arancio.", cat: "DOC, white, red, rosé, passito", rec: "DOC 1995 (DM 14 September 1995)", d: "DOC/Sambuca di Sicilia", facts: [["Types", "Bianco, Ansonica, Chardonnay, Grecanico, Rosso, Nero d'Avola and others; passito"], ["Riserva", "24 months"], ["Passito", "Grape to wine 45%; total 16%"]], place: "Agrigento province.", rules: "Grape to wine 70%.", glass: "Varied.", exam: "Minor DOC.", producers: ["Planeta"] });
APXF["it-santa-margherita-di-belice"] = sic({ lede: "Whites and reds from the Belice valley in Agrigento province.", cat: "DOC, white, red", rec: "DOC 1996 (DM 9 January 1996)", d: "DOC/Santa Margherita di Belice", facts: [["Varietals", "Catarratto, Grecanico, Ansonica, Nero d'Avola, Sangiovese"], ["Grape to wine", "Whites 65%; reds 70%"]], place: "The Belice valley.", rules: "Grape to wine 70%.", glass: "Simple wines.", exam: "Minor DOC.", producers: [] });
APXF["it-sciacca"] = sic({ lede: "Whites and reds from the coast around Sciacca, including the oxidative white Riserva Rayana.", cat: "DOC, white, red, rosé", rec: "DOC 1998 (DM 5 June 1998)", d: "DOC/Sciacca", facts: [["Types", "Bianco, Inzolia, Grecanico, Chardonnay, Riserva Rayana, Rosso, Nero d'Avola, Cabernet Sauvignon, Merlot, Sangiovese, Rosso Riserva, Rosato"], ["Riserva Rayana", "13% natural; 2 years including 1 in cask"]], place: "Agrigento coast.", rules: "Grape to wine 70%.", glass: "Varied.", exam: "Riserva Rayana is an aged white.", producers: [] });
APXF["it-riesi"] = sic({ lede: "Nero d'Avola-based reds and Insolia whites from Riesi in the province of Caltanissetta.", cat: "DOC, white, red, rosé, sparkling, late harvest", rec: "DOC 2001 (DM 23 July 2001)", d: "DOC/Riesi", facts: [["Yields", "Rosso 11 t/ha; Superiore 9; late harvest 7"], ["Superiore", "12.5% natural; released from November of the second year after harvest"], ["Superiore Riserva", "13% natural"]], place: "Central-southern Sicily.", rules: "Late-harvest grapes not picked before 10 October.", glass: "Ripe reds.", exam: "Minor DOC.", producers: [] });
// HISTORY-PASS-START
(function(){
const IRP=`In the late nineteenth century, when phylloxera devastated France, Irpinia sold wine north, and the Avellino to Rocchetta Sant'Antonio railway, opened in 1895, carried Aglianico in whole wagons to blend in Tuscany, Piedmont and Bordeaux, the 'wine railway' of local memory; Italy's southern school of oenology opened at Avellino in 1879. The Mastroberardino family kept Irpinia's native grapes alive through the post-war decades, when most growers abandoned them.`;
const CAST=`Castel del Monte, the octagonal castle built in the 1240s by Emperor Frederick II on a hill of the Murge, is a UNESCO site.`;
const SAL=`In 1943 Leone de Castris of Salice Salentino bottled Five Roses, often cited as Italy's first bottled rosé, named in English at the request of Charles Poletti, the American general who governed the region after the Allied landings.`;
const OTR=`The Salento, the heel of Italy, was Greek, Byzantine and Norman; at Otranto in 1480 an Ottoman army took the city and killed some eight hundred inhabitants who refused to convert, later canonised as the Martyrs of Otranto.`;
const VULT=`Monte Vulture is an extinct volcano, and the poet Horace was born at its foot at Venosa in 65 BC. In the fifteenth century Albanian refugees settled villages such as Barile and dug cellars into the tuff, the 'Sheshë', where wine is still kept.`;
const NUR=`The nuraghi, stone towers built by Sardinia's Bronze Age people, number in the thousands across the island.`;
const LEOP=`The Leopard, Giuseppe Tomasi di Lampedusa's novel, modelled Donnafugata on his family's palace at Santa Margherita di Belice, destroyed in the Belice earthquake of January 1968.`;
const HX={
// Campania
"it-taurasi":[`<p>${IRP} Antonio Mastroberardino's Taurasi from the 1968 vintage showed Aglianico's ageing power, and after the 1980 Irpinia earthquake the family rebuilt its cellars. Taurasi became the first DOCG of southern Italy in 1993, and producers such as Feudi di San Gregorio, founded in 1986, and many small growers have followed.</p>`,[["Decanter: Mastroberardino Taurasi Riserva 1968", "https://www.decanter.com/learn/wine-legend-mastroberardino-taurasi-riserva-1968-299270"], ["Ferrovia Avellino-Rocchetta (Wikipedia IT)", "https://it.wikipedia.org/wiki/Ferrovia_Avellino-Rocchetta_Sant'Antonio"]]],
"it-fiano-di-avellino":[`<p>${IRP} Fiano is often linked to the Latin 'vitis apiana', the vine whose grapes attract bees, praised by Pliny. By the 1970s it had nearly disappeared, and Mastroberardino's plantings at Lapio and elsewhere saved it. The DOC dates from 1978 and the DOCG from 2003.</p>`,[]],
"it-greco-di-tufo":[`<p>${IRP} Tufo takes its name from the tuff rock, and its hills hold sulphur mines worked from the nineteenth century; the Di Marzo family, wine growers since the seventeenth century, also ran the mines. Greco became a DOC in 1970 and a DOCG in 2003.</p>`,[]],
"it-aglianico-del-taburno":[`<p>Monte Taburno, whose profile seen from Naples is called the 'Sleeping Woman', overlooks the Sannio. Its Aglianico became a DOC in 1986 and a DOCG in 2011.</p>`,[]],
"it-falanghina-del-sannio":[`<p>The Sannio was the land of the Samnites, who trapped a Roman army at the Caudine Forks in 321 BC and made it pass under a yoke of spears. Falanghina, whose name may come from the stakes (falanghe) that supported the vines, nearly vanished before its revival from the 1970s; the Falanghina del Sannio DOC dates from 2011.</p>`,[]],
"it-sannio":[`<p>The Sannio DOC, created in 1997 in the province of Benevento, brought together the wines of the old Samnite heartland.</p>`,[]],
"it-irpinia":[`<p>${IRP} The Irpinia DOC, from 2005, covers the province of Avellino.</p>`,[]],
"it-vesuvio":[`<p>The eruption of Vesuvius in AD 79 buried Pompeii, a great wine town whose amphorae travelled the Mediterranean. The name Lacryma Christi comes from a legend that Christ wept on seeing the beauty of the Bay of Naples, stolen from heaven by Lucifer, and vines grew where his tears fell. In 1996 Mastroberardino and the Pompeii archaeological authorities replanted vineyards inside the ancient city. The DOC dates from 1983.</p>`,[["Mastroberardino: Villa dei Misteri", "https://mastroberardino.com/wp-content/uploads/2015/11/Villa%20dei%20Misteri%20ITA_.pdf"]]],
"it-campi-flegrei":[`<p>The Campi Flegrei, the 'burning fields' west of Naples, are a volcanic caldera where Greek settlers founded Cuma in the eighth century BC. The sandy volcanic soils kept phylloxera away, and Piedirosso and Falanghina still grow on their own roots. The DOC dates from 1994.</p>`,[]],
"it-ischia":[`<p>Greeks from Euboea founded Pithekoussai on Ischia around 770 BC, the first Greek colony in the western Mediterranean. In 1954 archaeologists found there 'Nestor's cup', a drinking cup inscribed with one of the earliest known Greek verses, promising desire to whoever drinks from it. Ischia became one of Italy's first DOCs on 3 March 1966.</p>`,[]],
"it-capri":[`<p>Capri, where Emperor Tiberius ruled from his villa in the last years of his life, has a tiny DOC created in 1977.</p>`,[]],
"it-costa-d-amalfi":[`<p>The Amalfi Coast, home of a medieval maritime republic and a UNESCO site, grows vines on terraces above the sea at Furore, Ravello and Tramonti, where pre-phylloxera vines of Tintore survive. Marisa Cuomo's wines from Furore made the area known. The DOC dates from 1995.</p>`,[]],
"it-penisola-sorrentina":[`<p>The Sorrento peninsula is home to Gragnano, the town of dried pasta, whose lightly sparkling red is the traditional partner of Neapolitan pizza. The DOC dates from 1994.</p>`,[]],
"it-falerno-del-massico":[`<p>Falernian was the most prized wine of ancient Rome, praised by Pliny, Horace and Martial, and the Opimian vintage of 121 BC was still drunk a century later. The Ager Falernus lay on the slopes of Monte Massico. In the 1960s the lawyer Francesco Paolo Avallone, founder of Villa Matilde, set out to revive it, searching for ancient vines with the help of researchers. The DOC dates from 1989.</p>`,[["I Grandi Vini: Falerno and Avallone", "https://www.igrandivini.com/news/enoturismo/viaggio-tra-meraviglia-provincia-caserta-dove-nasce-vino"]]],
"it-galluccio":[`<p>Galluccio lies on the slopes of the extinct volcano of Roccamonfina. The DOC dates from 1997.</p>`,[]],
"it-casavecchia-di-pontelatone":[`<p>Local tradition says Casavecchia was saved from a single old vine found in the ruins of an old house (casa vecchia) at Pontelatone in the nineteenth century. The DOC dates from 2011.</p>`,[]],
"it-aversa":[`<p>Aversa was the first Norman county in Italy, granted in 1030. Its Asprinio is trained up poplars as high as 15 metres in the 'alberata aversana', a method of Etruscan origin, and pickers climb tall ladders to harvest. The DOC dates from 1993.</p>`,[]],
"it-cilento":[`<p>The Cilento holds the Greek temples of Paestum and the ruins of Velia, home of the philosopher Parmenides. The American scientist Ancel Keys lived at Pioppi and drew on the local diet in defining the Mediterranean diet. The DOC dates from 1989.</p>`,[]],
"it-castel-san-lorenzo":[`<p>Castel San Lorenzo, in the hills of the Cilento, became a DOC in 1991.</p>`,[]],
// Sicily
"it-etna":[`<p>Greeks founded Naxos below Etna in 734 BC, and the volcano's slopes are scattered with old stone presses (palmenti) where grapes were trodden. In the nineteenth century Etna shipped huge volumes of wine north and to France, but by the 1980s most of its terraces were abandoned. Etna became Sicily's first DOC in 1968. From the 1990s the Benanti family, and in the early 2000s newcomers such as Andrea Franchetti, Marc de Grazia and Frank Cornelissen, revived old Nerello Mascalese vines, and in 2011 the DOC recognised 133 named contrade, the lava flows of different ages that make each site distinct.</p>`,[["WineNews: the 133 contrade of Etna", "https://winenews.it/it/ecco-la-mappa-che-identifica-le-133-contrade-delletna-al-vertice-della-viticoltura-italiana_482334"]]],
"it-cerasuolo-di-vittoria":[`<p>Vittoria was founded in 1607 by Vittoria Colonna Henríquez, countess of Modica, who granted land to settlers on condition that they plant vines. Its blend of Nero d'Avola and Frappato was championed by COS, founded by three friends in 1980, and later by Arianna Occhipinti. It became a DOC in 1973 and in 2005 Sicily's only DOCG.</p>`,[["Consorzio Cerasuolo di Vittoria: la storia", "https://www.cerasuolovittoria.it/la-storia?lang=en"], ["COS: l'azienda", "https://www.cosvittoria.it/"]]],
"it-vittoria":[`<p>Vittoria, founded in 1607 by Vittoria Colonna Henríquez, gained its own DOC for Frappato and Nero d'Avola in 2005.</p>`,[]],
"it-sicilia":[`<p>For most of the twentieth century Sicily shipped bulk wine to blend in the north and in France. From the 1980s Diego Planeta, president of the Settesoli cooperative, and the regional institute led a turn to quality, with both international grapes and Nero d'Avola. The IGT of 1995 became the Sicilia DOC in 2011.</p>`,[]],
"it-marsala":[`<p>In 1773 the Liverpool merchant John Woodhouse shipped fortified Marsala to England, and the Royal Navy under Nelson bought it for the fleet. Benjamin Ingham, the Whitaker family and, from 1833, Vincenzo Florio built great cellars on the coast. In May 1860 Garibaldi's Thousand landed at Marsala to begin the conquest of the Kingdom of the Two Sicilies. In the twentieth century cheap cooking Marsala ruined the name; Law 851 of 1984 tightened its rules, and Marco De Bartoli revived traditional unfortified wines of the Vergine style.</p>`,[]],
"it-pantelleria":[`<p>Pantelleria, closer to Tunisia than to Sicily, was ruled by Arabs, whose word 'zabib', raisin, may have given Zibibbo, the local Muscat, its name. The island's vines are trained low in hollows against the wind, the 'alberello pantesco', which in 2014 became the first agricultural practice recognised by UNESCO as intangible heritage. Marco De Bartoli's Bukkuram and Donnafugata's Ben Ryé made its passito known. The DOC dates from 1971.</p>`,[]],
"it-malvasia-delle-lipari":[`<p>The Aeolian Islands were famous for Malvasia from the time of the Greeks, but phylloxera and emigration nearly ended it. In the 1960s and 1970s Carlo Hauner, a designer from Milan who settled on Salina, revived it. The DOC dates from 1973.</p>`,[["Hauner: history", "https://www.hauner.it/storia.php?lan=en"]]],
"it-faro":[`<p>Faro takes its name from the lighthouse at Messina. By the 1980s only a handful of hectares were left, and the architect Salvatore Geraci, founder of Palari, revived it in the 1990s, encouraged by the critic Luigi Veronelli. The DOC dates from 1976.</p>`,[]],
"it-mamertino":[`<p>According to Pliny, Julius Caesar served Mamertine wine at the banquet for his third consulship. The name comes from the Mamertines, mercenaries who seized Messina in the third century BC. The DOC dates from 2004.</p>`,[]],
"it-noto":[`<p>Noto, rebuilt in Baroque style after the earthquake of 1693, is a UNESCO site. Its sweet Moscato and its Nero d'Avola became a DOC in 1974.</p>`,[]],
"it-siracusa":[`<p>Syracuse, the greatest Greek city of Sicily, gave its name to a sweet Moscato that local tradition traces to ancient wine. By the late twentieth century it had nearly disappeared before the Pupillo family revived it. The DOC dates from 1973.</p>`,[]],
"it-eloro":[`<p>Eloro takes its name from the Greek town of Heloros near Pachino, the homeland of Nero d'Avola. The DOC dates from 1994.</p>`,[]],
"it-alcamo":[`<p>Alcamo, the town of the thirteenth-century poet Cielo d'Alcamo, is known for white wine from Catarratto. The DOC dates from 1972.</p>`,[]],
"it-menfi":[`<p>The Settesoli cooperative, founded at Menfi by 68 growers in 1958, with its first harvest in 1965, grew into one of Europe's largest; the Planeta family, whose head Diego led it, built their first winery nearby in the 1990s. The DOC dates from 1995.</p>`,[["Cantine Settesoli: timeline", "https://www.cantinesettesoli.it/timeline"]]],
"it-monreale":[`<p>Monreale, above Palermo, is famous for the cathedral built by the Norman king William II from 1174, covered in gold mosaics. The DOC dates from 2000.</p>`,[]],
"it-contessa-entellina":[`<p>Contessa Entellina was settled by Albanian refugees (Arbëreshë) in the fifteenth century, who still keep their Byzantine rite. Donnafugata, founded by the Rallo family in 1983, has its vineyards here. The DOC dates from 1993.</p>`,[]],
"it-contea-di-sclafani":[`<p>The Contea di Sclafani holds Regaleali, the estate of the Tasca d'Almerita family since 1830, whose wines helped show Sicily's potential for quality. The DOC dates from 1996.</p>`,[]],
"it-delia-nivolelli":[`<p>The Delia Nivolelli DOC, from 1998, takes its name from the Delia river and the Nivolelli plateau near Mazara del Vallo.</p>`,[]],
"it-erice":[`<p>Erice, a medieval town on a mountain above Trapani, was the site of an ancient sanctuary of Venus. The DOC dates from 2004.</p>`,[]],
"it-salaparuta":[`<p>Salaparuta was destroyed by the Belice earthquake of 1968 and rebuilt on a new site. Its name is shared with the Duca di Salaparuta wine house, founded in 1824. The DOC dates from 2006.</p>`,[]],
"it-sambuca-di-sicilia":[`<p>Sambuca di Sicilia, whose Arab quarter dates from the ninth century, became a DOC in 1995.</p>`,[]],
"it-santa-margherita-di-belice":[`<p>${LEOP} The DOC dates from 1996.</p>`,[]],
"it-sciacca":[`<p>Sciacca, known since Roman times for its thermal springs and later for its coral, became a DOC in 1998.</p>`,[]],
"it-riesi":[`<p>Riesi, in the sulphur-mining interior of Sicily, became a DOC in 2001.</p>`,[]],
// Sardinia
"it-vermentino-di-gallura":[`<p>Gallura, the granite north-east of Sardinia, grows Vermentino on poor sandy soils. It became Sardinia's only DOCG in 1996, and cooperatives such as Cantina Gallura and estates such as Capichera built its reputation.</p>`,[]],
"it-cannonau-di-sardegna":[`<p>Cannonau is Grenache, long assumed to have come from Spain during Aragonese rule (1323 to 1720), though Sardinian researchers argue for a local origin, citing grape seeds found at a Bronze Age nuraghe. The Ogliastra and Barbagia, where centenarians are unusually common, have made it for generations. The DOC dates from 1972, with the subzones Oliena (Nepente), Jerzu and Capo Ferrato.</p>`,[]],
"it-vermentino-di-sardegna":[`<p>Vermentino came to Sardinia, most sources say, from Liguria or Corsica in the nineteenth century. The island-wide DOC dates from 1988.</p>`,[]],
"it-carignano-del-sulcis":[`<p>The Sulcis, in the south-west, kept old Carignano bush vines on sand, many on their own roots. In the 1980s the Santadi cooperative, advised by Giacomo Tachis, made Terre Brune, which brought the area renown. The DOC dates from 1977.</p>`,[]],
"it-vernaccia-di-oristano":[`<p>Vernaccia di Oristano ages under a veil of yeast (flor), like sherry, in barrels not filled to the top. The Contini family, producers since 1898, are its leading name. It became Sardinia's first DOC in 1971.</p>`,[]],
"it-malvasia-di-bosa":[`<p>Bosa, a medieval town on the Temo river below the Malaspina castle, makes Malvasia aged under flor, a style kept alive by a handful of growers. The DOC dates from 1972.</p>`,[]],
"it-monica-di-sardegna":[`<p>Monica is often said to have been brought to Sardinia by monks, though its origin is unknown. The DOC dates from 1972.</p>`,[]],
"it-moscato-di-sardegna":[`<p>The island-wide Moscato DOC dates from 1979.</p>`,[]],
"it-moscato-di-sorso":[`<p>Sorso and Sennori, near Sassari, are known for sweet Moscato. The DOC dates from 1972.</p>`,[]],
"it-cagliari":[`<p>Cagliari, founded by the Phoenicians, gained a DOC in 2011 that brought together the province's traditional sweet and dry wines.</p>`,[]],
"it-giro-di-cagliari":[`<p>Giro, a red grape probably brought by the Spanish, makes sweet and fortified wines around Cagliari. The DOC dates from 1972.</p>`,[]],
"it-nasco-di-cagliari":[`<p>Nasco, an old white grape of the Campidano, may take its name from the Latin 'muscus', for its musky scent. The DOC dates from 1972.</p>`,[]],
"it-nuragus-di-cagliari":[`<p>${NUR} Nuragus, named after them, was long Sardinia's most planted white grape. The DOC dates from 1974.</p>`,[]],
"it-sardegna-semidano":[`<p>Semidano, a rare white grape of the Campidano, nearly disappeared before its DOC of 1995.</p>`,[]],
"it-mandrolisai":[`<p>The Mandrolisai, in the mountainous centre of the island, makes a red blend of Bovale, Cannonau and Monica. The DOC dates from 1981.</p>`,[]],
"it-campidano-di-terralba":[`<p>Terralba, on the plain of the Campidano near Oristano, is known for Bovale. The DOC dates from 1975.</p>`,[]],
"it-arborea":[`<p>Arborea was founded in 1928 on drained marshland under the name Mussolinia and renamed in 1944. Its name recalls the medieval Judicate of Arborea, whose ruler Eleonora issued a famous law code in 1392. The DOC dates from 1987.</p>`,[]],
"it-alghero":[`<p>Alghero was settled by Catalans after 1354, and its people still speak a form of Catalan. In 1899 Erminio Sella and Edgardo Mosca founded Sella &amp; Mosca, which grew into one of Europe's largest single estates. The DOC dates from 1995.</p>`,[]],
// Puglia
"it-primitivo-di-manduria":[`<p>Primitivo takes its name from 'primo', early, for its early ripening; a priest of Gioia del Colle, Francesco Filippo Indellicati, is credited with selecting it in the late eighteenth century, and tradition says the Countess Sabini of Altamura brought it to Manduria in 1881. In 2001 DNA research by Carole Meredith and Croatian scientists showed that Primitivo and California's Zinfandel are the same variety, originally Croatia's Crljenak Kaštelanski (Tribidrag). The DOC dates from 1974.</p>`,[]],
"it-primitivo-di-manduria-dolce-naturale":[`<p>The sweet Primitivo of Manduria, made from late-harvested grapes, became a DOCG in 2011.</p>`,[]],
"it-castel-del-monte":[`<p>${CAST} The surrounding hills grow Nero di Troia, Bombino and Aglianico, and the Rivera estate's Il Falcone helped make the name known. The DOC dates from 1971.</p>`,[]],
"it-castel-del-monte-rosso-riserva":[`<p>${CAST} The Rosso Riserva became a DOCG in 2011.</p>`,[]],
"it-castel-del-monte-nero-di-troia-riserva":[`<p>${CAST} Nero di Troia may take its name from the town of Troia or from the legend of the Greek hero Diomedes. The Riserva became a DOCG in 2011.</p>`,[]],
"it-castel-del-monte-bombino-nero":[`<p>${CAST} Bombino Nero, which ripens unevenly and is well suited to rosé, gained its own DOCG for rosé in 2011.</p>`,[]],
"it-salice-salentino":[`<p>${SAL} Salice Salentino became a DOC in 1976 and its Negroamaro reds were among the first southern Italian wines widely sold abroad.</p>`,[]],
"it-brindisi":[`<p>Brindisi, the end of the Via Appia and Rome's port for the East, became a DOC in 1979.</p>`,[]],
"it-squinzano":[`<p>${OTR} Squinzano, north of Lecce, became a DOC in 1976.</p>`,[]],
"it-copertino":[`<p>${OTR} Copertino, with its Aragonese castle and its cooperative, became a DOC in 1976.</p>`,[]],
"it-leverano":[`<p>${OTR} Leverano became a DOC in 1979.</p>`,[]],
"it-nardo":[`<p>${OTR} Nardò, with its Baroque centre, became a DOC in 1987.</p>`,[]],
"it-alezio":[`<p>${OTR} Alezio is known for Negroamaro rosé. The DOC dates from 1983.</p>`,[]],
"it-matino":[`<p>${OTR} Matino became one of the first DOCs of the Salento in 1971.</p>`,[]],
"it-galatina":[`<p>${OTR} Galatina was a centre of tarantism, the ritual dance said to cure the bite of the tarantula, and its chapel of Saint Paul drew the 'tarantate' each June. The DOC dates from 1997.</p>`,[]],
"it-negroamaro-di-terra-d-otranto":[`<p>${OTR} Negroamaro, 'black and bitter', became the subject of its own DOC in 2011.</p>`,[]],
"it-terra-d-otranto":[`<p>${OTR} The Terra d'Otranto DOC dates from 2011.</p>`,[]],
"it-lizzano":[`<p>Lizzano, near Taranto, became a DOC in 1988.</p>`,[]],
"it-colline-joniche-tarantine":[`<p>Taranto was founded around 706 BC by settlers from Sparta, the only Spartan colony. The hills along the Ionian coast became a DOC in 2008.</p>`,[]],
"it-gioia-del-colle":[`<p>Gioia del Colle, with a castle of Frederick II, is where the priest Francesco Filippo Indellicati is credited with selecting Primitivo in the late eighteenth century. The DOC dates from 1987.</p>`,[]],
"it-gravina":[`<p>Gravina in Puglia, built over a ravine with cave churches, became a DOC in 1983.</p>`,[]],
"it-locorotondo":[`<p>Locorotondo, a round village above the Valle d'Itria, the land of the conical trulli, makes white wine from Verdeca and Bianco d'Alessano; its cooperative, founded in 1932, is one of the oldest in Puglia. The DOC dates from 1969.</p>`,[]],
"it-martina":[`<p>Martina Franca, a Baroque town of the Valle d'Itria, became a DOC for white wine in 1969.</p>`,[]],
"it-ostuni":[`<p>Ostuni, the 'white city', is known for the rare Ottavianello. The DOC dates from 1972.</p>`,[]],
"it-moscato-di-trani":[`<p>Trani, a port with a Romanesque cathedral on the sea, has made sweet Moscato since the Middle Ages. The DOC dates from 1974.</p>`,[]],
"it-aleatico-di-puglia":[`<p>Aleatico, a red Muscat-scented grape, has a region-wide DOC for sweet wine, created in 1973.</p>`,[]],
"it-barletta":[`<p>Barletta is famous for the Challenge of Barletta (Disfida) of 1503, when thirteen Italian knights defeated thirteen French knights in a duel over honour. The DOC began as Rosso Barletta in 1977.</p>`,[]],
"it-rosso-di-cerignola":[`<p>At Cerignola in 1503 a Spanish army defeated the French, often called the first battle won by firearms. The DOC dates from 1974.</p>`,[]],
"it-orta-nova":[`<p>Orta Nova, on the Tavoliere plain, became a DOC in 1984.</p>`,[]],
"it-cacc-e-mmitte-di-lucera":[`<p>Cacc'e mmitte means 'drink and pour' in dialect, a name for a wine drunk quickly. Lucera was settled by Frederick II with Muslims from Sicily in the 1220s. The DOC dates from 1975.</p>`,[]],
"it-san-severo":[`<p>San Severo, on the Tavoliere plain, became one of Puglia's first DOCs in 1968.</p>`,[]],
"it-tavoliere-delle-puglie":[`<p>The Tavoliere, the great plain of northern Puglia, was the winter pasture of shepherds from the Abruzzo mountains, who followed drove roads (tratturi) for centuries. Its DOC for Nero di Troia dates from 2011.</p>`,[]],
// Basilicata
"it-aglianico-del-vulture":[`<p>${VULT} The Paternoster family began bottling in 1925, and d'Angelo and others made the wine known after the war. The DOC dates from 1971.</p>`,[]],
"it-aglianico-del-vulture-superiore":[`<p>${VULT} The Superiore, with longer ageing, became a DOCG in 2010.</p>`,[]],
"it-matera":[`<p>Matera's Sassi, cave dwellings inhabited for millennia, were evacuated in the 1950s as a national disgrace and later restored; they became a UNESCO site in 1993, and Matera was European Capital of Culture in 2019. The DOC dates from 2005.</p>`,[]],
"it-grottino-di-roccanova":[`<p>Roccanova takes the 'grottino' in its name from the caves dug into the hillside where wine was kept. The DOC dates from 2009.</p>`,[]],
"it-terre-dell-alta-val-d-agri":[`<p>The upper Val d'Agri holds the ruins of the Roman town of Grumentum and, since the 1990s, Europe's largest onshore oil field. The DOC dates from 2003.</p>`,[]],
// Calabria
"it-ciro":[`<p>Cirò claims descent from Krimisa, a wine of the Greek colonies said to have been given to victors at the Olympic Games. The Librandi family, bottling from the 1950s, made Cirò the best-known wine of Calabria, and in the 2010s a group of young growers revived traditional, unoaked Gaglioppo. The DOC dates from 1969.</p>`,[]],
"it-greco-di-bianco":[`<p>Greco di Bianco, a sweet wine from dried grapes, comes from the coast near the ruins of Locri, one of the great Greek cities of Magna Graecia. The DOC dates from 1980.</p>`,[]],
"it-terre-di-cosenza":[`<p>Cosenza, where the Visigothic king Alaric was buried in the bed of the Busento river in 410, gained a provincial DOC in 2011.</p>`,[]],
"it-melissa":[`<p>Melissa, near Cirò, became a DOC in 1979.</p>`,[]],
"it-s-anna-di-isola-capo-rizzuto":[`<p>Isola di Capo Rizzuto, with the Aragonese castle of Le Castella on the sea, became a DOC in 1979.</p>`,[]],
"it-lamezia":[`<p>Lamezia Terme, a city formed in 1968 by merging three towns, became a DOC in 1978.</p>`,[]],
"it-bivongi":[`<p>Bivongi, below the Byzantine monastery of San Giovanni Theristis, became a DOC in 1996.</p>`,[]],
"it-savuto":[`<p>The Savuto valley south of Cosenza became a DOC in 1975.</p>`,[]],
"it-scavigna":[`<p>Scavigna, near Nocera Terinese on the Tyrrhenian coast, became a DOC in 1994.</p>`,[]],
};
for(const k in HX){const e=APXF[k];if(!e)continue;const h=["History",HX[k][0]];const i=e.sections.findIndex(x=>x[0]==="History");if(i>=0)e.sections[i]=h;else{const j=e.sections.findIndex(x=>x[0]==="In the glass");e.sections.splice(j<0?e.sections.length:j,0,h);}for(const x of (HX[k][1]||[]))if(!e.sources.some(y=>y[1]===x[1]))e.sources.push(x);}
})();
// HISTORY-PASS-END
