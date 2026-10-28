# Italy (country entry) and central/southern Italy and the islands

Deliverable: `/home/claude/winesite/data/content/it_b.json` (1 country, 12 regions, 256 appellations, 195 sites). Built by scripts in `/home/claude/winesite/work/it_b/` (`build_country.py`, `build_tuscany.py`, `build_central.py`, `build_south.py`, `build_islands.py`, helpers in `common.py`), merged and validated by `/home/claude/winesite/scripts/it_b_merge.py`. Part files are in `/home/claude/winesite/work/it_b/parts/`. Region assignment and official names came from the EU PDO inventory already in `raw/eupdo` (Candiago et al. 2022), joined spatially to Natural Earth admin-1 regions (`work/it_b/it_pdo_regions.tsv`). Every EU-registered DOC/DOCG in the 12 regions (235 names) is matched by at least one appellation entry's `match` list. Two 2025 DOCGs that postdate the EU dataset (Casauria, Cirò Classico) are included without polygons, along with Chianti subzones and the Chianti Classico UGAs as text appellations.

## Italy country entry: history, law, statistics

### Takeaway
Italy was the world's largest producer in 2025 (44.4 mhl, 726 kha of vineyard, 4th by area). As of November 2025 it had 79 DOCG and 332 DOC (411 DOP); Cirò Classico and Casauria were promoted in 2025. The history timeline runs from Copper Age Sicily through Oenotria, Rome, the 1716 bando, Ricasoli 1872, phylloxera, the 1963 DOC law, the first DOCGs in 1980, the 1986 methanol scandal, IGT in 1992 and the Testo Unico in 2016.

### Cited Findings
- Italy 2025: vineyard 726 kha (4th, 10.3% of world), production 44.4 mhl (1st, 19.7%), consumption 20.2 mhl (-9.4%, 3rd), exports 21.0 mhl and EUR 7.8 bn. World production 227 mhl; France 36.1, Spain 28.7. [OIV State of the World Wine Sector in 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf)
- 79 DOCG + 332 DOC = 411 DOP as of 24 Nov 2025, with a full list by region. [Italian Wine Central DOC/DOCG list, Nov 2025](https://italianwinecentral.com/wp-content/uploads/DOCG-DOC-list-from-Italian-Wine-Central-Nov-2025.pdf)
- 77 DOCG, 330 DOC and 118 IGT as of March 2024. [Federdoc booklet 2024](https://www.federdoc.com/new/wp-content/uploads/2024/04/booklet-2024.pdf)
- Cirò Classico was registered as an EU PDO by Implementing Regulation 2025/1518 on 18 July 2025, entering into force 14 Aug 2025. [EUR-Lex 2025/1518](https://eur-lex.europa.eu/eli/reg_impl/2025/1518/oj); minister's announcement 25 July 2025 [QdS](https://www.qds.it/ciro-classico-dop-lollobrigida-vino-pilastro-made-in-italy/); rules (≥90% Gaglioppo, 3 years incl. 6 months wood) [IWC Cirò Classico](https://italianwinecentral.com/denomination/ciro-classico-docg/); 78th DOCG, Cirò + Cirò Marina, ~500 ha, 8 t/ha [Wine with Seth](https://www.winewithseth.com/winewiki/ciro-classico-docg-recently-elevated/)
- Casauria became a separate DOCG in 2025 (≥90% Montepulciano; 18/24 months; max 500 m, or 600 m facing south), with the last disciplinare change 24 Nov 2025. [IWC Casauria](https://italianwinecentral.com/denomination/casauria-docg/); background (subzone since 2006, requested 2016, Tocco and Castiglione a Casauria) [Gambero Rosso Intl 2022](https://www.gamberorossointernational.com/news/casauria-a-new-docg-in-abruzzo/)
- Cosimo III's bando of 24 Sept 1716 delimited Chianti, Pomino, Carmignano and Val d'Arno di Sopra. [Decanter, Baudains](https://www.decanter.com/premium/baudains-how-tuscany-created-europes-first-docs-552525)
- Ricasoli's letter of 26 Sept 1872 to Cesare Studiati: Sangioveto for aroma and vigour, Canaiolo to soften, Malvasia excludable from wines for ageing. [Do Bianchi](https://dobianchi.com/2020/08/05/white-grapes-tuscan-wine/)
- 1986 methanol: 19 dead, 23 blinded, over 150 poisoned; Ciravegna of Narzole named as organiser. [Dissapore](https://www.dissapore.com/bere/la-strage-del-vino-al-metanolo-dalle-prime-morti-sospette-al-tanaro-rosso/)
- 1924 decree on typical wines; DPR 930 of 12 July 1963; Law 164 of 10 Feb 1992. [it.wikipedia Viticoltura in Italia, via API]
- The 1963 DOC system, IGT in 1992, 350+ authorised varieties; Sassicaia released from the 1968 vintage in 1971; Tignanello 1971. [Wikipedia Italian wine](https://en.wikipedia.org/wiki/Italian_wine)
- Monte Kronio residues of about 4000 BC published 2017. [Wikipedia Italian wine](https://en.wikipedia.org/wiki/Italian_wine); phylloxera infested Sicily 1879 to 1880 [Wikipedia Phylloxera](https://en.wikipedia.org/wiki/Phylloxera)
- Falernian crus (Caucinian, Faustian), the Opimian vintage of 121 BC, Pliny's flammability remark. [Wikipedia Falernian](https://en.wikipedia.org/wiki/Falernian_wine)
- Regional vineyard: Sicily over 118,000 ha (17.8%), Veneto ~95,000, Puglia ~93,000, Tuscany ~53,000, Emilia-Romagna ~50,000; Italy ~693,000 ha (wine grapes). [Beverfood/Censis, Apr 2025](https://www.beverfood.com/italia-vino-superfici-costi-export-sicilia-veneto-puglia-wd-2/amp)

### Inferences
- The OIV 726 kha figure includes all grape uses, while Censis's ~693 kha is wine grapes only. I used OIV in `stats` and Censis for regional shares.
- The country history has 15 entries with coordinates (some, such as the DOC law, are placed at Rome as the seat of government).

### Gaps
- The exact 1879 first Italian phylloxera site (often given as Valmadrera/Agrate in Lombardy) is from memory, not a fetched source. The country timeline places it near Valmadrera; treat it as approximate.
- The claim that the 1986 scandal created a national anti-fraud inspectorate (ICQRF's predecessor) is from expertise; the fetched article did not cover it.

## Tuscany

### Takeaway
11 DOCGs and 41 DOCs. Chianti Classico has 7,200 ha registered, 480 members (342 bottlers) and 35 to 38 million bottles; 8 UGAs from 2023 plus Lamole, Montefioralle and Vagliagli from the 2027 vintage, Gran Selezione only, with 90% Sangiovese and native-only partners from 2027. Brunello has 2,100 ha and Rosso di Montalcino 872 ha after the Sept 2024 reallocation. Vino Nobile has 12 Pievi (first vintage 2021, released 2025). Bolgheri has 1,379 ha and 78 members. Chianti added the Terre di Vinci subzone and a rosato in 2026.

### Cited Findings
- UGA vote on 16 June 2021 ("larghissima maggioranza"); 11 names; GS 90% Sangiovese, no internationals; GS 6% of production, 154 producers. [GoNews 2021](https://www.gonews.it/2021/06/16/il-territorio-in-etichetta-al-via-il-progetto-uga-del-chianti-classico/amp/); 90% vote [Wine Spectator](https://www.winespectator.com/articles/changes-afoot-in-chianti-classico)
- 8 UGAs in 2023 and 3 in Jan 2027, with UGA boundary descriptions; GS 5% of volume and 13% of revenue. [Italian Wine Central 2023](https://italianwinecentral.com/chianti-classico-zonation-and-new-blend/); GS 2027 native list (Canaiolo, Ciliegiolo, Colorino, Foglia Tonda, Malvasia Nera, Mammolo, Pugnitello, Sanforte) and 700 m max [IWC Chianti Classico](https://italianwinecentral.com/denomination/chianti-classico-docg/)
- 70,000 ha total, 10,000 ha vines, 7,200 ha CC, 480 members, 342 bottlers, 35 to 38M bottles. [Consorzio tasting booklet 2024](https://www.chianticlassico.com/wp-content/uploads/2024/01/Chianti-Classico-tasting-booklet.pdf)
- Chianti DOCG rules June 2026: Terre di Vinci subzone, rosato (≥60% Sangiovese). [IWC Chianti](https://italianwinecentral.com/denomination/chianti-docg/); [Vinetur 15 June 2026](https://www.vinetur.com/en/amp/20260615102642/italy-approves-chianti-rose-docg-under-new-production-code.html)
- Brunello 2,100 ha, Rosso 860 ha, consorzio 1967. [Consorzio Brunello](https://consorziobrunellodimontalcino.it/en/591/); Rosso +352 ha to 872 ha in Sept 2024, Brunello ~9M bottles and Rosso ~3.6M [Decanter, Baudains, July 2025](https://www.decanter.com/premium/baudains-montalcinos-quiet-revolution-561052/); US about 30% of exports, Feb 2026 [Winenews](https://winenews.it/en/?p=583146)
- Brunellopoli: 6.7M litres impounded, 17 indicted, 11 plea bargains. [Jancis Robinson](https://jancisrobinson.com/articles/six-indicted-over-brunellogate)
- Biondi-Santi: Clemente's 1865 'Brunello', Ferruccio, 1888 and 1891, Tancredi's 1936 plot, EPI in Jan 2017, 26 ha. [Club Oenologique](https://cluboenologique.com/story/behind-the-bottle-biondi-santi-brunello-di-montalcino-wine/)
- Soldera: bought 1972, vandalism 2 to 3 Dec 2012, left the consorzio in 2013, IGT. [World of Fine Wine](https://worldoffinewine.com/news-features/soldera-the-great-outsider-4762352); Poggio di Sotto (Palmucci, ColleMassari 2011, 20 ha, 200 to 440 m) [Decanter](https://www.decanter.com/premium/poggio-di-sotto-quintessential-brunello-533818)
- Vino Nobile: ~1,200 ha, 6.73M bottles 2024, 65.5% exported, Redi 1685, DOCG decree 5 Aug 1980, Pievi rules. [Consorzio press kit 2025](https://www.consorziovinonobile.it/wp-content/uploads/2025/01/CARTELLA-STAMPA2025-ENG.pdf); final committee approval 3 Aug 2023 [Rivista di Agraria](https://www.rivistadiagraria.org/vino-e-dintorni/vino-nobile-montepulciano-pieve-ministero-approva-disciplinare/?print=pdf); 12 Pievi names [IWC Vino Nobile](https://italianwinecentral.com/denomination/vino-nobile-di-montepulciano-docg/)
- Bolgheri 1,379 ha, 78 members, consorzio Jan 1995. [Bolgheri DOC](https://bolgheridoc.com/en/the-consortium); DOC history 1984/1994/2013 [IWC Bolgheri](https://italianwinecentral.com/denomination/bolgheri-doc/); Sassicaia 1968 vintage, Decanter 1978 tasting, ~75 ha, 85/15 [Wikipedia Tenuta San Guido](https://en.wikipedia.org/wiki/Tenuta_San_Guido)
- Other DOC dates, hectares and rules: Italian Wine Central denomination pages (for example [Carmignano](https://italianwinecentral.com/denomination/carmignano-docg/), [Vernaccia](https://italianwinecentral.com/denomination/vernaccia-di-san-gimignano-docg/), [Morellino](https://italianwinecentral.com/denomination/morellino-di-scansano-docg/), [Montecucco Sangiovese](https://italianwinecentral.com/denomination/montecucco-sangiovese-docg/)).

### Inferences
- The UGAs exist only as text appellations (the `region` and `contains` of Chianti Classico) plus village sites. There are no official UGA polygons in the EU data. Pievi are sites only, and Cerliana and Sant'Ilario have no point because no reliable location was found.

### Gaps
- No hectare figures per UGA or Pieve were found.
- Montevertine, Case Basse, Poggio di Sotto, Il Poggione, Tenuta San Guido and Castello Pomino coordinates are approximate (`coord_quality: approx`).
- The claims about Masseto (first vintage 1986, own winery 2019) and Ornellaia (founded 1981, first vintage 1985) are from expertise; the search budget ran out before they could be verified.

## Umbria, Marche, Lazio, Abruzzo, Molise

### Takeaway
All 15 Umbrian, 20 Marche, 29 Lazio, 10 Abruzzo and 4 Molise denominations are covered. The key current facts are Sagrantino (374 ha, 37 months; 118 consorzio members in 2026), the 2023 Abruzzo provincial subzones, Casauria DOCG (2025), Tullum DOCG (2019), and Verdicchio dei Castelli di Jesi's 99 named places.

### Cited Findings
- Montefalco: DOCG 1992, 37 months with 12 in wood, 118 members and 66 wineries. [Consorzio Montefalco booklet 2026](https://www.consorziomontefalco.it/wp-content/uploads/2026/05/Booklet-2026-Consorzio-Tutela-Vini-Montefalco.pdf); 374 ha [IWC](https://italianwinecentral.com/denomination/montefalco-sagrantino-docg/)
- Abruzzo subzones (Colline Pescaresi, Colline Teramane, Terre di Chieti, Terre Aquilane; San Martino sulla Marrucina for Montepulciano). [IWC 2023](https://italianwinecentral.com/abruzzo-denominations-introduce-subzones/)
- Montepulciano d'Abruzzo: DOC 1968, Colline Teramane DOCG 2003, 8,718 ha and 857,500 hl in 2014. [Wikipedia](https://en.wikipedia.org/wiki/Montepulciano_d%27Abruzzo)
- Terre Tollesi/Tullum: DOC 2008, DOCG 2019. Lazio, Marche and Molise dates and hectares come from the IWC pages (fetched in bulk; the raw text is cached in `work/it_b/iwc_pages.json`).

### Inferences
- Wikipedia's Montepulciano d'Abruzzo area (2014) is old. No current consorzio figure was found, so the appellation omits `area_ha`.

### Gaps
- Valentini's coordinates are approximate (the Loreto Aprutino town centre). The San Flaviano basilica point is approximate.

## Campania, Puglia, Basilicata, Calabria

### Takeaway
Full coverage: Campania 4 DOCG and 15 DOC, Puglia 4 and 28, Basilicata 1 and 4, Calabria 1 and 9. The Pompeii vineyards are about 1.5 ha in 15 plots; the project was conceived in 1994. Cirò Classico is Calabria's first DOCG (2025).

### Cited Findings
- Pompeii: idea born in 1994, ~1.5 ha in 15 plots, Piedirosso and Sciascinoso plus Aglianico from 2007. The page states the 'first production is the 2011 vintage', which conflicts with the commonly cited 2001 first Villa dei Misteri. The JSON avoids a specific first-vintage date. [Pompeii archaeological park](https://pompeiisites.org/en/comunicati/xix-edition-of-the-harvest-in-the-pompeii-vineyards/)
- Taurasi DOC 1970, DOCG 1993, 472 ha; Fiano DOC 1978, DOCG 2003, 434 ha; Greco DOC 1970, DOCG 2003, 666 ha; Primitivo di Manduria 3,922 ha; Aglianico del Vulture 582 ha, Superiore DOCG 2010. [IWC pages](https://italianwinecentral.com/denomination/taurasi-docg/)
- Cirò: consorzio of 65 wineries and 300 growers; Cirò DOC ~1,500 ha. [Wine Scholar Guild, Dec 2025](https://www.winescholarguild.com/blog/regions-and-producers/the-wines-of-ciro-what-makes-calabrias-first-docg-so-special)

### Inferences
- The Wikipedia 'Calabrian wine' page dates a Cirò Classico 'first recognition' to 16 Nov 2023 (probably the national committee step). The JSON uses the EU registration date (18 July 2025).

### Gaps
- Five Roses (1943) and the Indellicati/Primitivo story are from expertise.
- Librandi's coordinates are the Cirò Marina town point, marked approximate.

## Sicily and Sardinia (including Etna)

### Takeaway
Etna DOC (1968) had 1,449 ha in 2025, 474 growers, ~5.8M bottles, and bottling up 13.6% in Jan to Aug 2026. Its rules list 133 contrade (142 on the 2022 consorzio map). The DOCG application was voted 10 Nov 2023, signatures were still being collected in late 2025, and per Vinous (Sept 2026) approval is 'imminent' but not granted; the JSON says pending as of October 2026. There are 30 Etna contrade sites (coordinates approximate). Marsala, Pantelleria (UNESCO 26 Nov 2014), Cerasuolo di Vittoria and all 23 Sicilian and 17 Sardinian DOCs are covered.

### Cited Findings
- Contrade list by commune from the disciplinare, Etna rules, DPR 11 Aug 1968, last amendment DM 14 Mar 2022. [AIS copy of Etna disciplinare](https://aisitalia.it/Disciplinari/Sicilia/DOC/Etna.pdf)
- 142 contrade on the 2022 map, by commune. [wein.plus](https://magazine.wein.plus/news/etna-consortium-publishes-area-map-with-new-locations-the-etna-doc-appellation-now-comprises-142-official-contrade); [Decanter, Nov 2022](https://www.decanter.com/wine-news/etna-announces-nine-new-contrade-with-map-update-492184)
- DOCG vote 10 Nov 2023; 2022 figures of 1,290.82 ha, 442 growers, 5.82M bottles. [Decanter, Nov 2023](https://www.decanter.com/wine-news/etna-docg-status-sicily-517085/); status Oct 2025 [Rivista di Agraria](https://www.rivistadiagraria.org/vino-e-dintorni/etna-docg-sprint-finale/?print=pdf); 1,347 ha in 2024, 230 members [Winenews, Sept 2025](https://winenews.it/en/?p=568909); 1,449 ha in 2025, +13.6% in 2026 [QdS, 11 Sept 2026](https://qds.it/etna-doc-vendemmia-nella-media-e-imbottigliamento-a-136/); proposed rules and 'imminent' status [Vinous, Sept 2026](https://v1.vinous.com/articles/mount-etna-the-juggernaut-of-italian-wine-sep-2026)
- Producers: Passopisciaro (2000, 26 ha, contrade C/G/P/R/S, G on the 1947 flow, S on 1600s lava) [FRW](https://frw.co.uk/producer/612ec2800600000000000b09/passopisciaro); Terre Nere (2002, 45 to 50 ha, 9 contrade, San Lorenzo coldest, Guardiola highest) [Wine with Seth](https://www.winewithseth.com/winewiki/terre-nere/); Barbabecchi (870 to 910 m, Magma) [Wine with Seth](https://www.winewithseth.com/winewiki/etna-contrada-barbabecchi/); Pietradolce (2005, Rampante, Caselle) [Wine with Seth](https://www.winewithseth.com/winewiki/pietradolce/); Cornelissen in Solicchiata [Gazzetta del Gusto](https://gazzettadelgusto.it/sicilia/vini-frank-cornelissen-intervista-e-visita-cantina/?print=pdf)
- Marsala: Woodhouse 1773, Ingham 1806, Florio 1833, DOC 1969, ageing categories. [Wikipedia Marsala](https://en.wikipedia.org/wiki/Marsala_wine); [Gazzetta del Gusto](https://gazzettadelgusto.it/vino/storia-del-marsala-e-curiosita-le-aziende-da-conoscere/?print=pdf)
- Pantelleria alberello on UNESCO's list, 26 Nov 2014. [ANSA](https://www.ansa.it/english/news/2014/11/26/zibibbo-vineyards-voted-in-unesco-world-heritage-list_455d91a8-f0a2-4853-8fce-12eff87b0edb.html)
- Vermentino di Gallura communes and Nuragic wine remains of 1400 to 1200 BC (it.wikipedia via API); Sardinian DOC dates and hectares [IWC pages](https://italianwinecentral.com/denomination/cannonau-di-sardegna-doc/)

### Inferences
- Porcaria and Chiappemacine (Passopisciaro) are absent from the 2022 official contrade list, so those wines are IGT. They are flagged as unofficial in the site `class` and excluded from Etna's `contains`.

### Gaps
- Most Etna contrade points are approximate (estimated from village and road geocodes, Via Rampante, the Calderara station and producer descriptions); there is no official contrada polygon set. Overpass/OSM queries failed through the proxy.
- The Vermentino di Gallura IWC page was blocked. The DOCG date (1996) and 'Sardinia's only DOCG' are from expertise and the IWC list.
- Regaleali, Capichera, Contini, Sa Osa and Punta Alice coordinates are approximate.
- The web search budget (200 per turn, shared) ran out mid-task, so later facts relied on direct page fetches, the IWC bulk pages and expertise.
