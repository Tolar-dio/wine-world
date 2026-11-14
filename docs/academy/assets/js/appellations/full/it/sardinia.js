// Full encyclopedia entries: Sardinia. Written from each disciplinare di produzione (AIS copies).
function sarSrc(d) { return ["Disciplinare di produzione (AIS copy of the official text)", "https://aisitalia.it/Disciplinari/Sardegna/" + d.split("/").map(encodeURIComponent).join("/") + ".pdf"]; }
function sar(o) {
  const facts = [["Category", o.cat], ["Recognized", o.rec]].concat(o.facts || []);
  if (o.amended) facts.push(["Specification used", o.amended]);
  const sections = [["The place", `<p>${o.place}</p>`], ["The rules", `<p>${o.rules}</p>`]];
  if (o.history) sections.push(["History", `<p>${o.history}</p>`]);
  sections.push(["In the glass", `<p>${o.glass}</p>`]);
  if (o.exam) sections.push(["For the exam", `<p>${o.exam}</p>`]);
  const sources = o.d ? [sarSrc(o.d)].concat(o.sources || []) : (o.sources || []);
  return { lede: o.lede, facts, sections, producers: o.producers || [], sources, checked: "2026-11-14" };
}
APXF["it-vermentino-di-gallura"] = sar({
  lede: "Sardinia's only DOCG: Vermentino from the granite of Gallura in the island's north-east, fuller and more saline than Vermentino elsewhere.",
  cat: "DOCG, white (still, frizzante, spumante, passito, late harvest)", rec: "DOCG 1996 (DM 11 September 1996), previously a DOC", d: "DOCG/Vermentino di Gallura",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grape", "Vermentino at least 95%"], ["Zone", "Communes of Gallura, including Arzachena, Aggius, Aglientu, Badesi, Berchidda, Calangianus, Luras, Monti, Olbia, Palau, Tempio Pausania"], ["Types", "Vermentino di Gallura, Superiore, Frizzante, Spumante, Passito, Vendemmia tardiva"], ["Superiore", "9 t/ha; 12% natural; total 13%"], ["Passito", "15% natural after drying; grape to wine 50%; released from 1 May"], ["Late harvest", "Released from 15 January after the harvest"]],
  place: "Decomposed granite (sabbione) hills of the north-east, swept by the mistral, between Monte Limbara and the Costa Smeralda.",
  rules: "The Superiore is the quality benchmark.",
  glass: "Straw-gold, white peach, Mediterranean scrub, almond, a saline, slightly bitter finish, more body than most Vermentino.",
  exam: "Sardinia's only DOCG (1996), on granite.",
  producers: ["Capichera", "Cantina Gallura", "Vigne Surrau", "Siddura", "Cantina del Vermentino Monti", "Piero Mancini"]
});
APXF["it-cannonau-di-sardegna"] = sar({
  lede: "Sardinia's signature red, from Cannonau (Grenache), island-wide, with a Classico zone in Nuoro and Ogliastra and three subzones.",
  cat: "DOC, red, rosé, passito, fortified", rec: "DOC 1972 (DPR 21 July 1972)", d: "DOC/Cannonau di Sardegna",
  amended: "Text as amended by DM 7 March 2014",
  facts: [["Grape", "Cannonau at least 85% (Classico at least 90%)"], ["Subzones", "Oliena or Nepente di Oliena, Capo Ferrato, Jerzu"], ["Classico", "Provinces of Nuoro and Ogliastra; 9 t/ha; 2 years from 1 November, 12 months in wood"], ["Yields", "11 t/ha; 12.5% natural (Riserva 13%)"], ["Riserva", "At least 2 years from 1 November, including wood ageing"], ["Release", "Rosso from 1 April after harvest; Rosato from 1 January"], ["Passito and Liquoroso", "Passito total 15%, 50 g/l sugar; Liquoroso secco 18% actual, dolce 16%"]],
  place: "The whole island, but its heart is the mountainous east: Mamoiada, Oliena, Orgosolo, Jerzu, on granite and schist at high altitude.",
  rules: "Producers have debated territorial names such as Barbagia and Ogliastra; none was in force at the date checked.",
  history: "The Ogliastra and Barbagia, where centenarians are unusually common, have made Cannonau part of the 'Blue Zone' story.",
  glass: "Red berries, dried herbs, myrtle, pepper; traditional styles warm and high in alcohol, newer ones fresher.",
  exam: "Cannonau = Grenache (Garnacha); Nepente di Oliena subzone.",
  producers: ["Giuseppe Sedilesu", "Argiolas", "Sella & Mosca", "Antichi Poderi di Jerzu", "Giovanni Montisci", "Puddu", "Gabbas"]
});
APXF["it-vermentino-di-sardegna"] = sar({
  lede: "Island-wide Vermentino, from fresh everyday wine to fine bottlings from the south and north-west.",
  cat: "DOC, white (still, frizzante, spumante)", rec: "DOC 1988 (DPR 23 February 1988)", d: "DOC/Vermentino di Sardegna",
  facts: [["Grape", "Vermentino at least 85%"], ["Yield", "16 t/ha; 10% natural"], ["Total alcohol", "10.5% actual minimum"]],
  place: "All of Sardinia.", rules: "Much higher yields than Vermentino di Gallura.", glass: "Citrus, herbs, saline.", exam: "DOC vs Gallura DOCG.", producers: ["Argiolas", "Sella & Mosca", "Santadi"]
});
APXF["it-carignano-del-sulcis"] = sar({
  lede: "Carignano from old, often ungrafted alberello vines on the sands of the Sulcis in south-western Sardinia.",
  cat: "DOC, red, rosé, passito", rec: "DOC 1977 (DPR 1 June 1977)", d: "DOC/Carignano del Sulcis",
  facts: [["Grape", "Carignano at least 85%"], ["Types", "Rosso, Riserva, Superiore, Rosato, Novello, Passito"], ["Yield", "11 t/ha"], ["Superiore", "From alberello vines; lower yields"], ["Passito", "Grapes to 27% sugar, pressed 10 October to 31 March; total 16%, 14% actual"]],
  place: "The Sulcis and the islands of Sant'Antioco and San Pietro: sandy soils where phylloxera could not survive.", rules: "Ageing counts from 1 January after the harvest.",
  glass: "Dark, plum, black olive, myrtle, soft tannin.", exam: "Carignano = Carignan (Cariñena).", producers: ["Santadi (Terre Brune)", "Sardus Pater", "Mesa", "6Mura"]
});
APXF["it-vernaccia-di-oristano"] = sar({
  lede: "A dry, sherry-like white from Vernaccia di Oristano, aged in part-filled casks under a film of flor, from the Tirso valley.",
  cat: "DOC, fortified-style and oxidative white", rec: "DOC 1971 (DPR 11 August 1971), Sardinia's first", d: "DOC/Vernaccia di Oristano",
  facts: [["Grape", "Vernaccia di Oristano 100%"], ["Types", "Vernaccia di Oristano, Superiore, Riserva, Liquoroso"], ["Ageing", "At least 2 years in chestnut or oak casks from March after the harvest; Superiore at least 3 years; Riserva at least 4"], ["Natural alcohol", "14%; Superiore 15%"], ["Total alcohol", "15% actual; Superiore 15.5%; Riserva 16.5%"]],
  place: "The flat lower Tirso valley around Oristano, on alluvial soils.", rules: "Casks are not topped up, so a flor yeast veil forms.", glass: "Amber, almond, walnut, salt, dry and long.", exam: "Sardinia's 'sherry'; flor ageing.", producers: ["Contini", "Silvio Carta", "Columbu"]
});
APXF["it-malvasia-di-bosa"] = sar({
  lede: "Malvasia di Sardegna from Bosa on the west coast, made dry or sweet, often aged oxidatively under flor.",
  cat: "DOC, white (dry, sweet, spumante, passito)", rec: "DOC 1972 (DPR 21 July 1972)", d: "DOC/Malvasia di Bosa",
  facts: [["Grape", "Malvasia di Sardegna at least 95%"], ["Yield", "6 t/ha (spumante 8); 15% natural"], ["Riserva", "2 years from 1 November"], ["Passito", "Grape to wine 50%; total 16%, 14% actual"]],
  place: "Hills of Bosa, Suni and neighbours near the Temo river.", rules: "One of Italy's lowest permitted yields.", glass: "Almond, apricot, salt, nutty.", exam: "Minor DOC.", producers: ["Columbu", "Zarelli"]
});
APXF["it-monica-di-sardegna"] = sar({
  lede: "Light, soft reds from the Monica grape across Sardinia.",
  cat: "DOC, red (still, superiore, frizzante)", rec: "DOC 1972 (DPR 1 September 1972)", d: "DOC/Monica di Sardegna",
  facts: [["Grape", "Monica at least 85%"], ["Yield", "15 t/ha; 10.5% natural (Superiore 12%)"], ["Release", "From 31 March after harvest"]],
  place: "Mostly the south.", rules: "Grape to wine 70%.", glass: "Soft, red-fruited, easy.", exam: "Monica: widely grown Sardinian red.", producers: ["Argiolas", "Santadi"]
});
APXF["it-moscato-di-sardegna"] = sar({
  lede: "Moscato Bianco from across the island, still, passito, late harvest or sparkling, with Tempio Pausania and Gallura subzones.",
  cat: "DOC, sweet white, sparkling", rec: "DOC 1979 (DPR 13 December 1979)", d: "DOC/Moscato di Sardegna",
  facts: [["Grape", "Moscato Bianco; white grapes up to 10%"], ["Yield", "11 t/ha"], ["Natural alcohol", "Bianco 14%; Passito 16%; overripe 15%; spumante 9%"], ["Release", "Spumante from 15 October; Bianco from 1 March; Passito from 1 July"]],
  place: "All of Sardinia.", rules: "Passito grape to wine 50%.", glass: "Grapey, orange blossom.", exam: "Minor DOC.", producers: []
});
APXF["it-moscato-di-sorso"] = sar({
  lede: "Sweet Moscato from Sorso and Sennori near Sassari.",
  cat: "DOC, sweet white", rec: "DOC 1972 (DPR 31 March 1972)", d: "DOC/Moscato di Sorso-Sennori o Moscato di Sorso o Moscato di Sennori",
  facts: [["Also labelled", "Moscato di Sorso, Moscato di Sennori"], ["Types", "Bianco, Liquoroso, Passito, Spumante"], ["Yield", "9 t/ha; 14% natural"]],
  place: "Limestone hills above the Gulf of Asinara.", rules: "Passito grape to wine 50%.", glass: "Rich Moscato.", exam: "Minor DOC.", producers: []
});
APXF["it-cagliari"] = sar({
  lede: "A 2011 DOC for the province of Cagliari, uniting Malvasia, Monica, Moscato and Vermentino from the south.",
  cat: "DOC, white, red, sweet", rec: "DOC 2011 (DM 4 November 2011)", d: "DOC/Cagliari",
  facts: [["Types", "Malvasia (also spumante, riserva), Monica (also riserva), Moscato, Vermentino (also superiore)"], ["Malvasia", "Malvasia di Sardegna at least 85%"], ["Riserva", "Ageing from 1 November"]],
  place: "The Campidano and southern hills.", rules: "Grape to wine 70%.", glass: "Varied.", exam: "Minor DOC.", producers: ["Argiolas"]
});
APXF["it-giro-di-cagliari"] = sar({ lede: "Sweet or dry red from the rare Girò grape around Cagliari.", cat: "DOC, red (still, liquoroso)", rec: "DOC 1972 (DPR 21 July 1972)", d: "DOC/Giro di Cagliari", facts: [["Grape", "Girò (up to 5% other vines allowed for pollination)"], ["Yield", "12 t/ha; 13% natural"], ["Grape to wine", "60%"], ["Release", "From 1 July after harvest"]], place: "Southern Sardinia.", rules: "Grape to wine 70%.", glass: "Cherry, sweet spice.", exam: "Girò: rare red.", producers: [] });
APXF["it-nasco-di-cagliari"] = sar({ lede: "Sweet or dry white from the ancient Nasco grape around Cagliari.", cat: "DOC, white (still, liquoroso)", rec: "DOC 1972 (DPR 21 June 1972)", d: "DOC/Nasco di Cagliari", facts: [["Grape", "Nasco"], ["Yield", "10 t/ha; 13% natural"], ["Grape to wine", "65%"]], place: "Southern Sardinia.", rules: "Grape to wine 70%.", glass: "Musky, honeyed.", exam: "Nasco: ancient Sardinian white.", producers: ["Argiolas"] });
APXF["it-nuragus-di-cagliari"] = sar({ lede: "Light whites from Nuragus, an ancient Sardinian grape.", cat: "DOC, white (still, frizzante)", rec: "DOC 1974 (DPR 28 November 1974)", d: "DOC/Nuragus di Cagliari", facts: [["Grape", "Nuragus at least 85%"], ["Yield", "16 t/ha; 10% natural"]], place: "The Campidano plain.", rules: "Grape to wine 70%.", glass: "Neutral, fresh, lemony.", exam: "Nuragus: named after the nuraghe towers.", producers: ["Argiolas"] });
APXF["it-sardegna-semidano"] = sar({ lede: "Semidano, a rare Sardinian white, with a subzone at Mogoro.", cat: "DOC, white (still, superiore, passito, spumante)", rec: "DOC 1995 (DPR 28 August 1995)", d: "DOC/Sardegna Semidano", facts: [["Grape", "Semidano at least 85%"], ["Subzone", "Mogoro"], ["Yield", "13 t/ha"], ["Passito", "Grape to wine 50%; total 15%, 35 g/l sugar"]], place: "Central-western Sardinia.", rules: "Grape to wine 70%.", glass: "Aromatic, textured white.", exam: "Minor DOC.", producers: ["Cantina di Mogoro"] });
APXF["it-mandrolisai"] = sar({ lede: "A mountain red blend of Bovale Sardo, Cannonau and Monica from central Sardinia.", cat: "DOC, red, rosé", rec: "DOC 1981 (DPR 6 June 1981)", d: "DOC/Mandrolisai", facts: [["Grapes", "Bovale Sardo at least 35%; Cannonau 20 to 35%; Monica 20 to 35%"], ["Yield", "12 t/ha"], ["Superiore", "11.5% natural; 2 years, 1 in wood; total 12.5%"]], place: "Granite uplands around Sorgono and Atzara.", rules: "Grape to wine 70%.", glass: "Spicy, medium-bodied.", exam: "Bovale-led blend.", producers: [] });
APXF["it-campidano-di-terralba"] = sar({ lede: "Bovale reds from the sandy plain around Terralba near Oristano.", cat: "DOC, red", rec: "DOC 1975 (DPR 15 November 1975)", d: "DOC/Campidano di Terralba o Terralba", facts: [["Also labelled", "Terralba"], ["Grapes", "Bovale at least 85%"], ["Types", "Bovale, Bovale Riserva, Bovale Superiore"], ["Yield", "11 t/ha; 11% natural (Superiore and Riserva 12%)"], ["Riserva", "2 years from 1 November"]], place: "Sandy coastal plain.", rules: "Grape to wine 70%.", glass: "Dark, rustic reds.", exam: "Bovale.", producers: [] });
APXF["it-arborea"] = sar({ lede: "Sangiovese and Trebbiano from the reclaimed plain of Arborea.", cat: "DOC, red, rosé, white", rec: "DOC 1987 (DPR 11 May 1987)", d: "DOC/Arborea", facts: [["Types", "Sangiovese (also rosato), Trebbiano (also frizzante)"], ["Yield", "18 t/ha"]], place: "Land reclaimed in the 1920s and 1930s near Oristano.", rules: "Grape to wine 70%.", glass: "Light wines.", exam: "Minor DOC.", producers: [] });
APXF["it-alghero"] = sar({ lede: "Catalan-founded Alghero in the north-west, for Torbato, Cagnulari, blends and international varietals.", cat: "DOC, white, red, rosé, sparkling, sweet", rec: "DOC 1995 (DM 19 August 1995)", d: "DOC/Alghero", facts: [["Varietals", "Torbato (also spumante), Cagnulari, Vermentino frizzante, Sauvignon, Chardonnay, Cabernet, Merlot, Sangiovese"], ["Yields", "13 to 16 t/ha"], ["Rosso Riserva", "At least 24 months from 1 November"], ["Liquoroso", "At least 3 years"]], place: "Limestone and sandy hills around Alghero.", rules: "Passito grape to wine 50%.", glass: "Torbato: crisp, saline white.", exam: "Torbato survives almost only here.", producers: ["Sella & Mosca", "Santa Maria La Palma"] });
