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
