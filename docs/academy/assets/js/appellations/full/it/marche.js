// Full encyclopedia entries: Marche. Written from each disciplinare di produzione (AIS copies).
function maSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Marche/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function ma(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [maSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-verdicchio-dei-castelli-di-jesi"] = ma({
  lede: "Verdicchio from the hills of the Esino valley inland from Ancona: Italy's most celebrated white grape on its home ground, from fresh and saline to long-lived Classico Superiore.",
  cat: "DOC, white (still, sparkling, passito)", rec: "DOC 1968 (DPR 11 August 1968)", d: "DOC/Verdicchio dei Castelli di Jesi",
  amended: "Text as amended by DM 8 April 2022",
  facts: [["Grape", "Verdicchio at least 85%"], ["Types", "Verdicchio dei Castelli di Jesi, Spumante, Passito, Classico, Classico Superiore"], ["Zone", "The Esino basin: 22 communes in the province of Ancona and 2 in Macerata"], ["Classico", "The original, older zone; the Classico Superiore must come from it"], ["Yields", "14 t/ha; Classico Superiore 11 t/ha"], ["Natural alcohol", "10.5%; Classico Superiore 11.5%"], ["Passito", "Grapes dried until 30 March, pressed from 15 October; 23% sugar; grape to wine 45%; total 15%, 12% actual"]],
  place: "Rolling hills of clay, sand and limestone on both banks of the Esino, between the Apennines and the Adriatic, 12 to 30 km from the sea.",
  rules: "Wines aged 18 months (6 in bottle) become a separate DOCG, Castelli di Jesi Verdicchio Riserva.",
  history: "The amphora-shaped bottle of the 1950s made Verdicchio Italy's best-known white abroad; quality producers later built its reputation as an ageworthy wine.",
  glass: "Lemon, green almond, fennel, saline finish, high acidity; with age honey and bitter almond.",
  exam: "Verdicchio's bitter almond finish; Classico Superiore 11 t/ha; Riserva is the DOCG.",
  producers: ["Bucci", "Umani Ronchi", "Garofoli", "Sartarelli", "Colonnara", "Fazi Battaglia", "Pievalta", "La Distesa"]
});
APXF["it-verdicchio-dei-castelli-di-jesi-classico"] = ma({
  lede: "The Classico mention of Verdicchio dei Castelli di Jesi, reserved for the original zone on the hills of the Esino; with Superiore it is the DOC's top level.",
  cat: "DOC mention (Classico, Classico Superiore)", rec: "Part of the DOC since 1968", d: "DOC/Verdicchio dei Castelli di Jesi",
  amended: "Text as amended by DM 8 April 2022",
  facts: [["Grape", "Verdicchio at least 85%"], ["Classico", "14 t/ha; 10.5% natural; total 11.5%"], ["Classico Superiore", "11 t/ha; 11.5% natural; total 12%"]],
  place: "The whole DOC zone except the land left of the Misa river and the communes of Ostra and Senigallia: in practice the hills on both banks of the Esino.",
  rules: "Most quality Verdicchio is labelled Classico Superiore.",
  glass: "Concentrated, saline, ageworthy.",
  exam: "Classico Superiore is a DOC level; Riserva is the DOCG.",
  producers: ["Bucci", "Sartarelli", "Colonnara", "Vallerosa Bonci"]
});
APXF["it-castelli-di-jesi-verdicchio-riserva"] = ma({
  lede: "The aged Verdicchio of the Castelli di Jesi, a DOCG since 2010, with a Classico version.",
  cat: "DOCG, white", rec: "Type of the DOC; DOCG 2010 (DM 18 February 2010)", d: "DOCG/Castelli di Jesi Verdicchio Riserva",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grape", "Verdicchio at least 85%"], ["Types", "Riserva; Riserva Classico (original zone)"], ["Yield", "10 t/ha; grape to wine 70%"], ["Ageing", "At least 18 months from 1 December of the harvest, including 6 in bottle"], ["Total alcohol", "12.5%"], ["Rules", "Enrichment forbidden; vinification, ageing and bottling within the zone"]],
  place: "The Esino valley hills in the provinces of Ancona and Macerata.", rules: "Bottling within the zone, with rights preserved for historic bottlers.",
  glass: "Golden, almond, beeswax, citrus peel, mineral; lasts decades.",
  exam: "Castelli di Jesi Verdicchio Riserva DOCG: 18 months, 6 in bottle.",
  producers: ["Bucci (Villa Bucci)", "Umani Ronchi (Plenio)", "Garofoli (Serra Fiorese)", "Fazi Battaglia (San Sisto)"]
});
APXF["it-verdicchio-di-matelica"] = ma({
  lede: "Verdicchio from the enclosed upland valley around Matelica, the only Marche valley running north to south, giving firmer, more acid wines than Jesi.",
  cat: "DOC, white (still, sparkling, passito)", rec: "DOC 1967 (DPR 21 July 1967)", d: "DOC/Verdicchio di Matelica",
  amended: "Text as amended by DM 8 April 2022",
  facts: [["Grape", "Verdicchio at least 85%"], ["Zone", "Parts of Matelica, Esanatoglia, Gagliole, Castelraimondo, Camerino, Pioraco (Macerata) and Cerreto d'Esi and Fabriano (Ancona)"], ["Yield", "13 t/ha; 11% natural"], ["Passito", "Grapes dried until 30 March; grape to wine 45%; released from 1 December of the year after; total 15%"]],
  place: "A high valley (around 350 to 500 m) between two Apennine ridges, cut off from sea breezes, with big day-night swings.",
  rules: "Riserva is a separate DOCG.",
  glass: "Austere, citrus, green herbs, chalky, very high acidity.",
  exam: "Matelica: continental, higher acid than Jesi.",
  producers: ["Collestefano", "Belisario", "Bisci", "La Monacesca", "Borgo Paglianetto"]
});
APXF["it-verdicchio-di-matelica-riserva"] = ma({
  lede: "The aged Verdicchio of Matelica, a DOCG since 2010.",
  cat: "DOCG, white", rec: "Riserva type of the DOC 1995; DOCG 2010 (DM 18 February 2010)", d: "DOCG/Verdicchio di Matelica Riserva",
  facts: [["Grape", "Verdicchio at least 85%"], ["Yield", "9.5 t/ha; 12.5% natural"], ["Ageing", "At least 18 months from 1 December of the harvest"], ["Total alcohol", "12.5%"]],
  place: "The Matelica upland valley.", rules: "Grape to wine 70%.", glass: "Taut, mineral, ageworthy.", exam: "18 months; DOCG.", producers: ["La Monacesca (Mirum)", "Belisario (Cambrugiano)", "Collestefano"]
});
APXF["it-conero"] = ma({
  lede: "The Riserva of Montepulciano from the limestone promontory of Monte Cònero south of Ancona, a DOCG since 2004.",
  cat: "DOCG, red", rec: "DOC 1967 (as Rosso Cònero); DOCG 2004 (DM 1 September 2004)", d: "DOCG/Conero",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grapes", "Montepulciano at least 85%; Sangiovese up to 15%"], ["Zone", "All of Ancona, Offagna, Camerano, Sirolo, Numana and part of Castelfidardo and Osimo"], ["Yield", "9 t/ha; 63 hl/ha; 12% natural"], ["Ageing", "At least 2 years from 1 November of the harvest"], ["Label", "Riserva must appear under the DOCG statement"], ["Total alcohol", "12.5%"]],
  place: "A white-limestone headland rising to 572 m straight from the Adriatic, its slopes facing the sea.", rules: "The vineyards may be registered for both Rosso Cònero and Cònero.",
  glass: "Dark, black cherry, plum, tar, firm tannin.",
  exam: "Cònero DOCG = Rosso Cònero Riserva; Montepulciano at least 85%.",
  producers: ["Umani Ronchi (Cùmaro)", "Moroder (Dorico)", "Garofoli (Grosso Agontano)", "Fattoria Le Terrazze"]
});
APXF["it-rosso-conero"] = ma({
  lede: "Montepulciano from the slopes of Monte Cònero, the unaged partner of the Cònero DOCG.",
  cat: "DOC, red", rec: "DOC 1967 (DPR 21 July 1967)", d: "DOC/Rosso Conero",
  amended: "Text as amended by DM 8 April 2022",
  facts: [["Grapes", "Montepulciano at least 85%; other non-aromatic reds up to 15%"], ["Zone", "As Cònero DOCG"], ["Yield", "13 t/ha; 11.5% natural"], ["Total alcohol", "11.5%"]],
  place: "The Cònero promontory.", rules: "The Riserva became the Cònero DOCG.", glass: "Juicy, dark fruit.", exam: "Montepulciano, not Sangiovese.", producers: ["Moroder", "Umani Ronchi", "Silvano Strologo"]
});
APXF["it-lacrima-di-morro"] = ma({
  lede: "The floral red from the rare Lacrima grape around Morro d'Alba, near Senigallia.",
  cat: "DOC, red (still, superiore, passito)", rec: "DOC 1985 (DPR 9 January 1985)", d: "DOC/Lacrima di Morro o Lacrima di Morro d'Alba",
  amended: "Text as amended by DM 6 August 2021",
  facts: [["Also labelled", "Lacrima di Morro"], ["Grape", "Lacrima at least 85%"], ["Zone", "Morro d'Alba, Monte San Vito, San Marcello, Belvedere Ostrense, Ostra and Senigallia (Ancona)"], ["Yields", "13 t/ha; Superiore 10 t/ha"], ["Release", "From 15 December of the harvest year; Superiore after 1 September of the year after; Passito from 1 December of the year after"], ["Passito", "Grape to wine 45%; total 15%, 13% actual"]],
  place: "Low hills a few kilometres from the Adriatic.", rules: "The name comes from the grape's thin skin, which splits and 'weeps'.",
  glass: "Violet, rose, strawberry, spice; intensely perfumed, soft.",
  exam: "Lacrima: aromatic red grape with a rose-violet nose.",
  producers: ["Marotti Campi", "Stefano Mancinelli", "Lucchetti"]
});
APXF["it-offida"] = ma({
  lede: "The DOCG of the southern Marche for Pecorino and Passerina whites and a Montepulciano red, around Offida in the province of Ascoli Piceno.",
  cat: "DOCG, white and red", rec: "DOC 2001; DOCG 2011 (DM 15 June 2011)", d: "DOCG/Offida",
  facts: [["Types", "Pecorino, Passerina, Rosso"], ["Whites", "Pecorino or Passerina at least 85%; 9 t/ha; 63 hl/ha; 11.5% natural"], ["Rosso", "Montepulciano at least 85%; 24 months including 12 in wood plus 3 in bottle"], ["Zone", "Parts of the provinces of Ascoli Piceno and Fermo, including Offida, Ripatransone, Acquaviva Picena and Castorano"], ["Total alcohol", "Whites 12%; Rosso 13%"]],
  place: "Hills between the Tronto and Aso rivers, with the Monti Sibillini behind and the sea 20 km away.", rules: "Whites released from 1 March after the harvest.",
  glass: "Pecorino: herbal, citrus, saline, rich acidity. Passerina: lighter, floral.",
  exam: "Pecorino and Passerina; the Marche's southern DOCG.",
  producers: ["Ciù Ciù", "Velenosi", "Tenuta Cocci Grifoni", "Aurora", "San Savino"]
});
APXF["it-terre-di-offida"] = ma({
  lede: "A small DOC for sparkling, passito and Vino Santo from Passerina around Offida.",
  cat: "DOC, white (sparkling, passito, Vino Santo)", rec: "DOC 2001 (DM 23 May 2001)", d: "DOC/Terre di Offida",
  facts: [["Grape", "Passerina at least 85%"], ["Passito", "Grapes dried and pressed from 1 December to 31 March; aged 18 months from 1 December, 12 of them in wood casks of at most 500 litres"], ["Vino Santo", "36 months from 1 December, 24 in wood; total 15.5%, 13% actual"]],
  place: "The Offida hills in Ascoli Piceno.", rules: "Spumante needs at least 6 months of elaboration.", glass: "Honeyed, citrus sweet wines.", exam: "Passerina sweet and sparkling DOC.", producers: []
});
APXF["it-falerio"] = ma({
  lede: "Blended whites from Trebbiano, Passerina and Pecorino, and a Pecorino varietal, from the provinces of Ascoli Piceno and Fermo.",
  cat: "DOC, white", rec: "DOC 1975 (DPR 28 April 1975)", d: "DOC/Falerio",
  amended: "Text as amended by DM 1 February 2024",
  facts: [["Falerio", "Trebbiano Toscano 20 to 50%; Passerina 10 to 30%; Pecorino 10 to 30%"], ["Falerio Pecorino", "Pecorino at least 85%"], ["Natural alcohol", "11%"], ["Total alcohol", "11.5% to 12%"]],
  place: "The southern Marche between the Sibillini and the sea.", rules: "New vineyards need at least 3,000 vines per hectare.", glass: "Fresh, crisp whites.", exam: "Southern Marche white blend.", producers: []
});
APXF["it-rosso-piceno"] = ma({
  lede: "Montepulciano-Sangiovese reds from much of the central and southern Marche, with a Superiore from a smaller southern zone.",
  cat: "DOC, red", rec: "DOC 1968 (DPR 11 August 1968)", d: "DOC/Rosso Piceno o Piceno",
  amended: "Text as amended by DM 1 February 2024",
  facts: [["Also labelled", "Piceno"], ["Grapes", "Montepulciano 35 to 85%; Sangiovese 15 to 50%"], ["Types", "Rosso, Superiore, Sangiovese, Novello"], ["Superiore", "From a delimited zone in the south around Ascoli Piceno; 11.5% natural; released from 1 November of the year after harvest"], ["Vineyards", "New plantings at least 2,200 vines per hectare, no tendone"]],
  place: "From the Pesaro-Ancona border to Porto d'Ascoli.", rules: "The broadest red DOC of the Marche.", glass: "Supple, cherry-fruited reds.", exam: "Montepulciano and Sangiovese blend.", producers: ["Velenosi", "Saladini Pilastri", "Boccadigabbia"]
});
APXF["it-vernaccia-di-serrapetrona"] = ma({
  lede: "A unique red sparkling wine, dry or sweet, from Vernaccia Nera partly dried, refermented three times; a style found nowhere else.",
  cat: "DOCG, red sparkling (secco, dolce)", rec: "DOC 1971; DOCG 2004 (DM 18 August 2004)", d: "DOCG/Vernaccia di Serrapetrona",
  facts: [["Grape", "Vernaccia Nera at least 85%"], ["Zone", "All of Serrapetrona and parts of Belforte del Chienti and San Severino Marche (Macerata)"], ["Yield", "10 t/ha"], ["Method", "At least 40% of the grapes, all Vernaccia Nera, are dried to give 13% potential alcohol; their must is added to the fermenting fresh wine, then the wine is made sparkling by natural refermentation"], ["Grape to wine", "58%"], ["Release", "Not before 30 June of the year after the harvest"], ["Total alcohol", "11.5%"]],
  place: "Apennine hills around Serrapetrona in the upper Chienti valley.", rules: "Up to 60% of the grapes are fresh.",
  glass: "Purple foam, blackberry, pepper, bitter finish.",
  exam: "Red DOCG spumante from partly dried Vernaccia Nera.",
  producers: ["Alberto Quacquarini", "Serboni", "Colli di Serrapetrona"]
});
APXF["it-serrapetrona"] = ma({
  lede: "The still red of Vernaccia Nera from Serrapetrona.",
  cat: "DOC, red", rec: "DOC 2004 (DM 18 August 2004)", d: "DOC/Serrapetrona",
  facts: [["Grape", "Vernaccia Nera at least 85%"], ["Yield", "10 t/ha; 10% natural"], ["Ageing", "At least 10 months from 1 December"], ["Total alcohol", "12%"]],
  place: "As Vernaccia di Serrapetrona.", rules: "Grape to wine 70%.", glass: "Peppery, dark red.", exam: "Still partner of the sparkling DOCG.", producers: []
});
APXF["it-i-terreni-di-sanseverino"] = ma({
  lede: "Vernaccia Nera-based reds around San Severino Marche, including the dried-grape Passito and 'Moro'.",
  cat: "DOC, red", rec: "DOC 2004 (DM 30 August 2004)", d: "DOC/I Terreni di Sanseverino",
  facts: [["Rosso", "Vernaccia Nera at least 50%"], ["Types", "Rosso, Rosso Superiore, Rosso Passito, Moro"], ["Ageing", "Rosso and Moro 18 months; Superiore and Passito 24, from 1 December"], ["Passito", "Grapes dried until 31 March; grape to wine 43%; total 15.5%, 12.5% actual"]],
  place: "Hills of San Severino Marche (Macerata).", rules: "Grape to wine 70% (43% for Passito).", glass: "Peppery reds.", exam: "Minor DOC.", producers: []
});
APXF["it-san-ginesio"] = ma({
  lede: "Sangiovese-based reds and a sparkling wine, dry or sweet, from the Sibillini foothills.",
  cat: "DOC, red, sparkling", rec: "DOC 2007 (DM 25 July 2007)", d: "DOC/San Ginesio",
  facts: [["Rosso", "Sangiovese at least 50%; Vernaccia Nera, Cabernets, Merlot, Ciliegiolo at least 35%"], ["Types", "Rosso; Spumante secco or dolce"], ["Yield", "11 t/ha"]],
  place: "Around San Ginesio (Macerata).", rules: "Grape to wine 70%.", glass: "Medium reds.", exam: "Minor DOC.", producers: []
});
APXF["it-colli-maceratesi"] = ma({
  lede: "The province of Macerata's DOC, chiefly for Ribona (Maceratino), a local white.",
  cat: "DOC, white, red, sparkling, passito", rec: "DOC 1975 (DPR 8 March 1975)", d: "DOC/Colli Maceratesi",
  facts: [["Bianco", "Maceratino (Ribona) at least 70%"], ["Types", "Bianco and Ribona (also passito and spumante), Rosso (also novello, riserva), Sangiovese"], ["Passito", "Drying from 15 October; pressed by 31 March; grape to wine 40%; total 15.5%, 14% actual"], ["Novello", "At least 50% carbonic maceration"]],
  place: "Hills of the province of Macerata.", rules: "Spumante at least 3 months on the lees and 6 months of elaboration.", glass: "Ribona: textured, herbal white.", exam: "Ribona = Maceratino.", producers: []
});
APXF["it-esino"] = ma({
  lede: "A broad, high-yield DOC of the Esino basin for simple whites (Verdicchio at least 50%) and reds.",
  cat: "DOC, white, red", rec: "DOC 1995 (DM 11 September 1995)", d: "DOC/Esino",
  facts: [["Bianco", "Verdicchio at least 50% (also frizzante)"], ["Types", "Bianco, Rosso, Novello"], ["Yields", "Bianco 15 t/ha; Rosso 14 t/ha"]],
  place: "The Esino valley.", rules: "Grape to wine 70%.", glass: "Light, everyday wines.", exam: "Not Verdicchio dei Castelli di Jesi.", producers: []
});
APXF["it-bianchello-del-metauro"] = ma({
  lede: "Light whites from Bianchello (Biancame) in the Metauro valley near Fano.",
  cat: "DOC, white (still, superiore, sparkling, passito)", rec: "DOC 1969 (DPR 2 April 1969)", d: "DOC/Bianchello del Metauro",
  facts: [["Grapes", "Bianchello (Biancame) at least 95%; Malvasia Bianca Lunga up to 5%"], ["Zone", "Fano, Cartoceto, Saltara, Serrungarina, Montefelcino, Isola del Piano, Fossombrone and others (Pesaro-Urbino)"], ["Superiore", "11 t/ha; 11.5% natural"], ["Passito", "Grapes dried until 30 March, pressed from 1 November; released from 1 December of the year after; total 15%, 12% actual"]],
  place: "The lower Metauro valley.", rules: "Passito ageing must take place within the vinification zone.", glass: "Fresh, citrus, light.", exam: "Biancame = Bianchello.", producers: ["Fattoria Mancini", "Claudio Morelli"]
});
APXF["it-colli-pesaresi"] = ma({
  lede: "Hills of Pesaro for Sangiovese, Biancame and Trebbiano, with subzones Focara, Roncaglia and Parco Naturale Monte San Bartolo.",
  cat: "DOC, white, red, rosé, sparkling", rec: "DOC 1972 (DPR 2 June 1972)", d: "DOC/Colli Pesaresi",
  facts: [["Types", "Bianco, Biancame, Trebbiano, Rosso, Rosato, Sangiovese (also riserva, novello), Spumante"], ["Subzones", "Focara (Rosso, Pinot Nero), Roncaglia (Bianco, Pinot Nero), Parco Naturale Monte San Bartolo (Sangiovese, Cabernet Sauvignon)"], ["Yields", "10 t/ha; Roncaglia and Focara 9"], ["Riserva", "12% natural and 18 months ageing in the zone"]],
  place: "Hills behind Pesaro, including the coastal park of Monte San Bartolo.", rules: "Grape to wine 70%.", glass: "Light Sangiovese; crisp whites.", exam: "Focara subzone allows Pinot Nero.", producers: []
});
APXF["it-pergola"] = ma({
  lede: "Aleatico-based reds, rosés and sparkling wines from Pergola, inland in the province of Pesaro-Urbino.",
  cat: "DOC, red, rosé, sparkling, passito", rec: "DOC 2005 (DM 11 July 2005)", d: "DOC/Pergola",
  facts: [["Aleatico", "Aleatico at least 85% (also superiore, riserva, spumante, passito)"], ["Rosso", "Aleatico at least 60% (also novello, superiore, riserva)"], ["Yields", "Aleatico 10 t/ha; Superiore 9; Rosso 12"], ["Riserva", "At least 24 months"], ["Passito", "Grapes to 26% sugar; grape to wine 40%; released from 1 November of the year after; total 15%"]],
  place: "The Cesano valley around Pergola.", rules: "Grape to wine 70% (40% for Passito).", glass: "Aromatic, rose-scented reds.", exam: "Dry Aleatico reds, unusual in Italy.", producers: []
});
