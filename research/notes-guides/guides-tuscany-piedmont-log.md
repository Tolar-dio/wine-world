# Guides log: tuscany, piedmont

Written 2026-10-30. Files: `site/data/guides/tuscany.json`, `site/data/guides/piedmont.json`.

## Validator (final)

```
site/data/guides/tuscany.json: 11 chapters, 2621 + 1510 words (~13 + 8 min at 200 wpm); 0 errors, 0 warnings
site/data/guides/piedmont.json: 11 chapters, 2299 + 1501 words (~11 + 8 min at 200 wpm); 0 errors, 0 warnings
```

Each guide has 7 intro and 4 deeper chapters, which is within the brief's limits (5–7 intro, 3–5 deeper). Every step is 60–170 words. There are no em dashes and none of the banned filler words.

## Atlas files read

- `site/data/content/it.json`: the Tuscany, Piedmont and Langhe regions, plus the profiles for Chianti, Chianti Classico, Rùfina, Brunello, Rosso di Montalcino, Vino Nobile, Bolgheri, Bolgheri Sassicaia, Vernaccia, Morellino, Maremma Toscana, Montecucco, Vin Santo, Carmignano, Suvereto, Barolo, Barbaresco, Langhe, Nebbiolo d'Alba, Barbera d'Alba and d'Asti, Dolcetto d'Alba, Dogliani, Roero, Asti, Gavi, Gattinara, Ghemme, Carema, Valtellina Superiore, Alba and Verduno Pelaverga.
- `site/data/content/it_fine.json`: all 11 Chianti Classico UGAs, all 12 Vino Nobile Pievi, and about 30 Barolo and Barbaresco MGAs. I grouped all 236 MGAs by village to build the commune highlights.
- The `site/data/vintage/_events.json` entries for it-barolo, it-barbaresco, it-brunello-di-montalcino and it-chianti-classico.
- The `site/data/ageing/vintages.json` windows. Tier shifts were computed per `_meta.window_basis`. For example, the Barbaresco 2011 normale window is 2016–2030; the cru tier adds +2 and +8, giving Gallina 2011 a window of 2018–2038, which matches the brief. The Barolo MGA 2016 window comes out at 2030–2070.
- `site/data/ageing/profiles.json`.
- Glossary, timeline and soils entries.

## Facts checked (source)

- Cosimo III: the bando of 18 July 1716 created the Congregation, and the bando of 24 September 1716 delimited Chianti, Pomino, Carmignano and Val d'Arno di Sopra. Source: wechianti.com.
- Consortium founded 14 May 1924 in Radda by 33 growers. Source: chianticlassico.com.
- Black rooster: emblem of the Lega del Chianti, painted by Vasari in the Palazzo Vecchio; in the Fascetta di Stato 2005–2013. Source: chianticlassico.com.
- Ricasoli: letter of 26 Sept 1872 to Cesare Studiati. He wrote that Malvasia could be excluded from wines for ageing, and the 70/20/10 formula is not supported by his letters. Sources: Do Bianchi, Wikipedia (Chianti).
- 1932 decree and its seven zones; the 1967 DOC required 10–30% white grapes; 100% Sangiovese allowed from 1995; Classico a DOCG of its own from 1996; white grapes banned from 2006. Source: Wikipedia (Chianti).
- 2026 Chianti DOCG rules: minimum Sangiovese down from 70% to 60%, a Terre di Vinci subzone (Vinci, Cerreto Guidi, Fucecchio, Capraia e Limite), a rosé category, published by the Ministry by June 2026, about 13,600 ha and about 75 million bottles. Sources: Wein.plus, Vinetur (16 June 2026).
- Gran Selezione:
  - 30 months, from estate fruit.
  - At least 90% Sangiovese, with native partners only, from the 2027 vintage.
  - UGAs approved in 2023. Eight are usable now; Lamole, Montefioralle and Vagliagli from January 2027, with a one-off choice of the old name.
  - Riserva 24 months; annata released from 1 October of V+1.
  - Sources: Italian Wine Central (DOCG page and zonation article).
- Brunellopoli:
  - The investigation started in September 2007; the story broke on 21 March 2008.
  - About 6.5 million litres of Brunello and 0.7 million litres of Rosso were seized.
  - The US threatened to block imports in May 2008.
  - In October 2008, only 4% of producers voted to change the 100% rule.
  - 11 people took plea bargains with small fines, and part of the wine went to IGT.
  - Sources: Wine Spectator, Jancis Robinson, Wikipedia.
- Biondi-Santi: Clemente Santi in 1865–67, the 1888 and 1891 Riservas, the 2014 vintage not made (atlas event). Source: Club Oenologique.
- Sassicaia:
  - First Cabernet vineyard planted in the early 1940s below Castiglioncello, from cuttings from the Salviati of Migliarino.
  - Bolgheri subzone in 1994; autonomous DOC in 2013. Source: Tenuta San Guido.
  - The 1968 vintage was released in 1971, and the 1972 vintage won the 1978 Decanter tasting (33 wines, 11 countries). Source: Wikipedia (Tenuta San Guido).
- Bolgheri: red DOC in 1994, the consortium in January 1995, 1,379 ha. Source: bolgheridoc.com.
- Vino Nobile Pievi: approved by the National Wine Committee on 10 Oct 2024; on the market in February 2025 with the 2021 vintage; 12 UGAs. Source: Il Sole 24 Ore.
- Produttori del Barbaresco:
  - Re-founded in 1958 by Don Fiorino Marengo with 19 growers; now more than 50 families. Source: Wine with Seth.
  - About 120 ha. Source: the Produttori site.
  - The nine Riservas are Asili, Montefico, Montestefano, Muncagota, Ovello, Pajè, Pora, Rabajà and Rio Sordo. Source: Wine Spectator's 2019 Riserva article and retailer listings. Wine with Seth lists "Moccagatta" instead of Montefico, which is wrong for current releases.
- Barbaresco: three communes plus San Rocco Seno d'Elvio, 1894 Cavazza with nine growers, 733 ha (2019), Neive 140 → 265 ha. Source: Wikipedia.
- Barolo: 11 communes, 38/62 months, Tortonian west and Helvetian/Serravallian east. Source: Wikipedia.
- Bottlings in 2024: Barolo 13.75 million, Barbaresco 4.3 million (Valoritalia data). Source: ItaliaOggi.
- Barolo Wars: Altare's chainsaw in 1983 and his father disinheriting him; the Barolo Boys; the "No Barrique, No Berlusconi" label; the convergence by the late 2000s. Source: Wine with Seth. I could not date the Mascarello label, so it is left undated.
- Tanaro capture: dated to the Pleistocene, "a few hundred thousand years". Source: CAI Scuola PDF by G. Forno. Il Sole 24 Ore wrongly prints "250 million years". The guide says only "in the Pleistocene".

## Prices (US retail, Oct 2026)

**Checked against live listings:**

| Wine | Price and source | Range used |
|---|---|---|
| Fèlsina Berardenga Chianti Classico 2022 | $32.97 (wine.com), $33.99 (Flatiron SF) | $25–35 |
| Fèlsina Riserva 2021 | $40 (wine.com) | $35–45 |
| Selvapiana Chianti Rufina 2022 | $17.99 (Lisa's Liquor Barn) | $18–28 |
| Selvapiana Chianti Rufina 2024 | $23.99 sale / $28.99 (Chapel Hill) | $18–28 |
| Il Poggione Rosso di Montalcino 2023 | $32.97 (wine.com) | $25–35 |
| Il Poggione Brunello 2020 | $89.99 (wine.com), $79.99 (Millesima USA) | $60–90 |
| Boscarelli Vino Nobile 2021 | $36.97 / $42 (wine.com) | $25–42 |
| Fattoria Le Pupille Morellino 2023 | $19.97 (wine.com) | $18–22 |
| Montenidoli Vernaccia Tradizionale | $31.99 (reach.dog US shop) | $18–32 |
| Panizzi Vernaccia | CAD 22.96 (Dial a Bottle) | $18–32 |
| Tenuta San Guido Guidalberto 2023 | $90.99 (wine.com) | Too dear for a Bolgheri entry pick, so not used |
| Produttori del Barbaresco Langhe Nebbiolo 2023 | $29 (Thief, US); $26.99 (Wine Bazaar) | $25–30 |
| G.D. Vajra Langhe Nebbiolo 2023 | $24.99 (Gordon's, Boston) | $25–30 |
| Produttori del Barbaresco Barbaresco 2021 | $54.99 (Total Wine) | $50–60 |
| Vietti Barolo Castiglione 2019 | $57.99 (Total Wine) | $50–65 |
| Vietti Barbera d'Alba Tre Vigne 2021 | $29.99 (wine.com) | $22–30 |
| Produttori Riserva Montefico 2021 | $95 (Bassin's, DC) | $95–145 |
| Produttori Riserva Ovello 2016 | $144.99 (K&D) | $95–145 |

**Not checked against a 2026 listing.** The shared web-search budget for this turn ran out before I reached these. They are from general market knowledge and should be spot-checked:

- **Tuscany:**
  - Chianti Rùfina picks: Frescobaldi Nipozzano.
  - Chianti Classico producers: Castello di Volpaia, Badia a Coltibuono.
  - Gran Selezione $50–80 (Castello di Ama San Lorenzo, Fonterutoli).
  - Brunello: Col d'Orcia, Canalicchio di Sopra.
  - Vino Nobile: Avignonesi, Poliziano.
  - Bolgheri Rosso $25–40 (Le Macchiole, Il Bruciato, Grattamacco); Sassicaia $300–400.
  - Vin Santo 375 ml $40–75.
  - Three-UGA flight $28–50 each (Monteraponi, Fontodi).
  - Biondi-Santi/Poggio di Sotto Brunello $150–220.
  - Montevertine/Flaccianello/Cepparello $70–150.
  - Carmignano (Capezzana) $25–35.
  - Mature Riserva/Brunello $60–120.
- **Piedmont:**
  - Single-MGA Barolo $90–130 (Massolino Margheria, Oddero Villero, Vajra Bricco delle Viole).
  - Altare/Scavino/Sandrone Barolo $80–110.
  - Bartolo Mascarello $250–350.
  - Roero Arneis $20–25.
  - Moscato d'Asti $15–22.
  - Gattinara $40–55.
  - Valtellina $25–45.
  - Giacomo Conterno Francia $300–400.
  - Gaja Barbaresco $250–320.
  - Mature Barolo $100–200.

wine-searcher.com, wine.com search pages, klwines.com and totalwine.com search pages are blocked for the fetch tool. wine.com product pages and Total Wine product pages do fetch.

## Atlas errors and inconsistencies found (not repeated in the guides)

1. **`site/data/ageing/profiles.json` it-chianti-classico, tier `gran_selezione` label.** It says "90% Sangiovese from 2021". The rule applies from the **2027 vintage** (IWC; the atlas's own Chianti Classico profile and glossary say 2027).
2. **`it.json` region-it-tuscany `classification`.** It says all 11 UGAs are "approved together and in the rules since July 2023". Per IWC, only eight were usable from 2023; **Lamole, Montefioralle and Vagliagli take effect from January 2027**. The UGA fine profiles say "approved June 2021; effective 2023 rules", which is the same issue.
3. **Glossary `term-uga`.** "From the 2020 vintage, Gran Selezione wines may show the UGA" is unsupported. IWC says UGAs apply retroactively to GS wines still ageing (2022 and earlier) at the time the rules took effect.
4. **`it-vino-nobile-di-montepulciano` profile `created`.** It says "Pieve UGAs approved 2023". The National Wine Committee approval was **10 October 2024** (Il Sole 24 Ore), and the Pieve fine profiles say "rules published by the EU in May 2025". The region profile says "approved 2023, published 2024". These three dates should be reconciled.
5. **`it-bolgheri-sassicaia` profile.** "Cabernet cuttings (said to come from Château Lafite)": Tenuta San Guido says the first cuttings came from the **Salviati estate at Migliarino** near Pisa. The Lafite story is folklore at best.
6. **Glossary `term-super-tuscan`.** It says "Bolgheri DOC (1983)", but the it-bolgheri profile says 1984. One is wrong. I could not confirm which, so the guide uses only the 1994 red DOC.
7. **`it-barbera-d-asti` geometry index bbox.** It is [7.89, 44.52, **11.15, 45.98**], reaching into the Veneto. There is a stray polygon or bad bbox, and its parent is set to it-barbera-del-monferrato. The guide avoids highlighting or flying to it.
8. **`it-canelli`** has a zero-size bbox (a point only). That is fine for highlight, but it will not draw a shape.
9. **`it-barbaresco` profile.** It says the Produttori farm "roughly 100 hectares". Their own site says about 120 ha. Minor.
10. **`it-brunello-di-montalcino` profile.** "6.7 million litres were impounded" matches Jancis Robinson. Wine Spectator gives about 6.5 million litres of Brunello plus 0.7 million litres of Rosso. Not an error, but the two counts differ.
11. **`site/data/content/it.json` region-it-piedmont.** It says the 1511 La Morra statutes protected Nebbiolo vines. Other references commonly cite 1431. I could not verify either date and did not use it.

## Places without ids

- There are no village or commune ids for La Morra, Castiglione Falletto, Monforte, Serralunga, Neive or Treiso. I used coordinate flies and MGA groupings instead.
- Moscato d'Asti has no id of its own (it is inside it-asti).
- There is no id for the Barolo commune-level MGAs ("Barolo del Comune di …").
- There are no grape ids for Canaiolo or Trebbiano. Ugni Blanc exists, but I did not use it.

## Map choreography notes

These are the 3D shots:

| Place | Bearing | Looking |
|---|---|---|
| Panzano Conca d'Oro | 0 | North at the south-facing bowl |
| Montalcino north side | 180 | South (the centre is set north of the subject because the screen top is south) |
| Montalcino south side | 0 | North |
| Bolgheri | 90 | From the sea |
| Radda/Gaiole and Greve | 20 | |
| Barbaresco village | 45 | At the SW-facing crus |
| Serralunga | 90 | At the west flank |
| Cannubi | 315 | |
| Bussia | 80 | |
| La Morra | 320 | |
| Castiglione | 10 | |
| Ginestra | 270 | At the east-facing bowl |
| Valtellina Sassella | 0 | North |

Satellite is used for Montepulciano/San Biagio, the San Guido cypress avenue, Altare's Arborina and the Carema pergolas. The commune highlight sets are 38 (La Morra) or fewer, except the Serralunga list, which uses 13 named MGAs, not all 40. The largest highlight set is Barbaresco commune: 25 MGAs + 2 sites.
