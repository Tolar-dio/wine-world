# Production rules of the appellations of France, Italy, Spain and Portugal (current to October 2026)

Output: `site/data/regs/fr.json` (506 cards), `it.json` (538), `es.json` (106), `pt.json` (79), keyed by ids from `site/data/geo/_index.json` and `_extra_points.geojson`. Every Italian, Spanish and Portuguese index id has its own card; the 727 French ids without one are premier cru climats, DGCs and Corton grand cru lieux-dits, which inherit from their parent card through the front end's chain lookup. Every card has at least one source and `verified: "2026-10"`. Build: part files in `work/regs/parts/{fr_*,it_*,es_*,pt_all}.py`, merged by `work/regs/build/assemble.py`, which adds the eAmbrosia page and the latest Official Journal (OJ) notice for each registered PDO and rejects en and em dashes.

## Method: which documents hold the binding rules in each country, and how current are they?

### Takeaway
The EU register (eAmbrosia) holds the single document for every PDO and PGI. The amendment notices published in the OJ (C series) since 2019 give the current text for most changes. The detailed national texts sit with INAO (France), MASAF (Italy), the regional governments and consejos (Spain), and IVV, IVDP and IVBAM (Portugal). For Spain and Portugal, many single documents are still the 2014 Spanish or Portuguese technical files; where national law has moved ahead of the EU register (Douro 2025, Madeira 2015), cards give the national figure and say so.

### Cited Findings
- The eAmbrosia public API returns each GI's record, publications and attachment ids (`/api/gi-applications/id/{EUGI}`, `/api/v1/attachments/{id}`, POST `/api/gi-applications/filter`). Register pages: [eAmbrosia](https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/).
- OJ C notices were read through CELLAR (`publications.europa.eu/resource/oj/{id}`, xhtml) and cited by ELI, e.g. [C/2026/565 (Rioja)](http://data.europa.eu/eli/C/2026/565/oj).
- Italian disciplinari: [MASAF consolidated archive](https://www.masaf.gov.it/flex/cm/pages/ServeBLOB.php/L/IT/IDPagina/4625) for A-N and the [AIS mirror](https://aisitalia.it/Disciplinari/) (January 2025 copies) for O-Z, both checked against later OJ notices.
- Portuguese national texts: [IVDP cadernos](https://www.ivdp.pt/pt/informacao/cadernos-de-especificacoes-das-dop-igp/), [Diario da Republica PDFs](https://files.diariodarepublica.pt/1s/2025/09/17700/0000200018.pdf) and full texts of portarias on [O Informador](https://informador.pt/legislacao/diploma/portaria-n-o-246-2014/).

### Inferences
- Where an OJ standard amendment is newer than the national text on file, the OJ summary was taken as current. Most cards use the OJ wording directly.

### Gaps
- mapa.gob.es failed TLS (self-signed chain, even with the proxy CA bundle) and was not bypassed. As a result, the full Spanish pliegos were not read; Spanish cards rest on OJ single documents (87 of 106), the 2014 Spanish SD attachments and consejo pages.
- eur-lex HTML is behind a bot check, which was not circumvented; CELLAR and ELI links were used instead.
- The Diario da Republica web app is script-rendered. Regulamento IVDP 411/2026 (the new Port categories regulation, 22 April 2026) was located but not read, so the Port categories come from the IVDP site.

## France: what changed in 2024-2026 and what the cards hold

### Takeaway
The 506 French cards cover all AOCs in the index at appellation level, from the INAO cahiers and the OJ single documents. Recent changes are concentrated in Bordeaux and Champagne: single yield figures regardless of density (Bordeaux, Bordeaux Superieur 2026), a red Entre-deux-Mers (2025), a white Medoc with adaptation varieties (2026), and Champagne's 2026 harvest yield of 8,800 kg/ha.

### Cited Findings
- Bordeaux red upper limit 68 hl/ha as a single figure since 2026 ([C/2026/2122](http://data.europa.eu/eli/C/2026/2122/oj)). Bordeaux Superieur red 58/66 hl/ha ([C/2026/2087](http://data.europa.eu/eli/C/2026/2087/oj)).
- Entre-deux-Mers red added in 2025 ([C/2025/6756](http://data.europa.eu/eli/C/2025/6756/oj)). Medoc white with Sauvignon, Semillon, Muscadelle and adaptation varieties ([C/2026/1140](http://data.europa.eu/eli/C/2026/1140/oj)). Cotes de Bordeaux yields ([C/2026/3579](http://data.europa.eu/eli/C/2026/3579/oj)).
- Champagne: pressing at most 102 l per 160 kg, at least 12 months on lees, 2026 harvest 8,800 kg/ha ([INAO Champagne](https://www.inao.gouv.fr/produit/champagne-21054); [C/2026/3119](http://data.europa.eu/eli/C/2026/3119/oj)).
- Chablis upper limits raised in 2025 to 75 hl/ha (premier cru 73) ([C/2026/744](http://data.europa.eu/eli/C/2026/744/oj)).

### Inferences
- Several 2025-2026 Bordeaux amendments add a second colour or adaptation varieties to AOCs that used to be single-colour (Medoc white, Entre-deux-Mers red). This pattern is read across the amendment texts; none of them states it as a policy.

### Gaps
- Most French cahiers on file are the 2011 homologation versions; later changes are taken from OJ summaries rather than from consolidated INAO texts (legifrance curl blocked).
- On 2026-10-29, unsourced remarks (1855 classification, AOC history) were removed from 8 cards.

## Italy: DOCG and DOC rules, and the 2024-2026 amendments

### Takeaway
The 538 Italian cards cover every DOCG and DOC in the index. They include Alto Adige's 2025 revision (86 UGAs, now individual cards), two new PDOs split from larger DOCs (Ciro Classico, Casauria) and the cancellation of the stand-alone Valtenesi PDO. Etna's DOCG was still pending in September 2026, so its card shows the DOC rules.

### Cited Findings
- Alto Adige: 86 additional geographical units and new Riserva types ([C/2025/1718](http://data.europa.eu/eli/C/2025/1718/oj)).
- Ciro Classico registered as a separate PDO ([Reg. 2025/1518](http://data.europa.eu/eli/reg_impl/2025/1518/oj); [C/2025/1933](http://data.europa.eu/eli/C/2025/1933/oj)). Casauria split from Montepulciano d'Abruzzo ([Reg. 2025/2261](http://data.europa.eu/eli/reg_impl/2025/2261/oj)).
- Valtenesi PDO cancelled ([Reg. 2026/572](http://data.europa.eu/eli/reg_impl/2026/572/oj)).
- Marsala 2026: grapes at least 13% potential, ageing ladder Fine 1 year to Vergine Riserva/Stravecchio 10 years ([C/2026/5127](http://data.europa.eu/eli/C/2026/5127/oj)).
- Verdicchio dei Castelli di Jesi 2026: Superiore outside the Classico area, Spumante Riserva, tendone banned ([C/2026/1160](http://data.europa.eu/eli/C/2026/1160/oj)).
- Vino Nobile di Montepulciano Pieve units ([C/2025/2742](http://data.europa.eu/eli/C/2025/2742/oj)). Prosecco 2025 frizzante and dosage changes ([C/2025/6773](http://data.europa.eu/eli/C/2025/6773/oj)). Spoleto ([C/2025/5875](http://data.europa.eu/eli/C/2025/5875/oj)), Orvieto ([C/2025/5376](http://data.europa.eu/eli/C/2025/5376/oj)), Suvereto ([C/2025/6754](http://data.europa.eu/eli/C/2025/6754/oj)), Monreale ([C/2024/3119](http://data.europa.eu/eli/C/2024/3119/oj)).
- Brunello di Montalcino: the Consorzio cut the 2026 harvest yield to 7 t/ha ([Vinetur](https://www.vinetur.com/en/20260526101341/brunello-di-montalcino-cuts-grape-yields-for-2026-harvest.html)). Etna DOCG application pending ([Vinous](https://v1.vinous.com/articles/mount-etna-the-juggernaut-of-italian-wine-sep-2026)).

### Inferences
- Several Consorzi (Brunello, Prosecco) now manage supply through annual yield decisions within the disciplinare ceilings. Cards give the legal ceiling first and the annual figure as a note.

### Gaps
- Vesuvio: amendment approval not confirmed. Etna: DOCG not yet in force.
- The O-Z disciplinari rest on the January 2025 AIS copies plus later OJ notices, not on MASAF consolidated texts.

## Spain: DOs, DOCa, Cava tiers, Sherry and Vinos de Pago

### Takeaway
All 106 Spanish ids have cards. Big 2024-2026 changes: Rioja lowered minimum alcohol and added municipality labelling ('Vino de', 'Vinedo en'); Cava set a single 8.5% grape minimum (2026), and its Guarda Superior tiers need organic vines at least 10 years old; Sherry and Manzanilla Fino may now be 14%; Penedes requires organic certification for all wines from the 2025 harvest. Several DOs added orange, ice and dealcoholised wines.

### Cited Findings
- Rioja: red 10% actual (Crianza 11.5%, Reserva and Gran Reserva 12%), 6,500 kg/ha red, oak chips banned, bottling in the zone (CJEU 16 May 2000), 'Vinedo en' labelling ([C/2026/565](http://data.europa.eu/eli/C/2026/565/oj); [C/2024/6466](http://data.europa.eu/eli/C/2024/6466/oj)). Ageing totals (Crianza 2 years with 1 in oak, Reserva 3, Gran Reserva 5) come from the [Consejo Regulador](https://riojawine.com/en/blog/classification-of-rioja-wines-according-to-their-ageing/).
- Ribera del Duero: Crianza 24 months (12 in oak), Reserva 36 (12), Gran Reserva 60 (24); white allowed since 2020 with at least 75% Albillo Mayor (OJ single document via eAmbrosia).
- Cava: single 8.5% grape minimum ([C/2026/241](http://data.europa.eu/eli/C/2026/241/oj)); Requena zone (code RE) added in 2024 ([C/2024/3122](http://data.europa.eu/eli/C/2024/3122/oj)); Guarda 9, Reserva 18, Gran Reserva 30, Paraje Calificado 36 months ([DO Cava](https://www.cava.wine/en/news-articles/the-boe-certifies-the-strict-new-zoning-and-segmentation-of-the-cava-do/)).
- Jerez-Xeres-Sherry: Fino 14-17% (2026), sugar classes from Pale Dry under 50 g/l to PX at least 212 g/l, 1,000 l oak casks, minimum average age 2 years, new pagos ([C/2026/4549](http://data.europa.eu/eli/C/2026/4549/oj)). Manzanilla 14% ([C/2026/4513](http://data.europa.eu/eli/C/2026/4513/oj)).
- Penedes: all wines from 2025 grapes certified organic; red minimum 11% ([C/2026/2777](http://data.europa.eu/eli/C/2026/2777/oj)).
- Priorat: Vi de Vila, Paratge, Vinya Classificada, Gran Vinya Classificada with yields down to 3,000 kg/ha ([OJ C 341, 2022](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=OJ:JOC_2022_341_R)).
- Labelling of Crianza, Reserva and Gran Reserva: no larger than the geographical name; vintage compulsory with them; not for wines made with oak chips ([RD 1363/2011](https://www.boe.es/eli/es/rd/2011/10/07/1363/con)).

### Inferences
- The national ageing definitions that used to be in Art. 3 of Ley 24/2003 were repealed, so each DO's own minimums (where its single document states them) are the operative figures.

### Gaps
- The full pliegos on mapa.gob.es could not be read (TLS). Rioja's cask size and bottle splits for Crianza, Reserva and Gran Reserva are not in the single document and were left out.
- Valtiendas, Cangas, Bullas, Terra Alta, Mondejar, Malaga, Lebrija, several Canary DOs and some pagos have only the 2014-2018 Spanish single documents.

## Portugal: Port categories, Douro after Decree-Law 106/2025, Madeira, Vinho Verde and the DOCs

### Takeaway
All 79 Portuguese ids have cards, including the nine Vinho Verde subregions, seven Dao subregions, eight Alentejo subregions, the Douro subregions and every PGI. The Douro statute was rewritten in September 2025: grape yields are now 7,500 kg/ha red and 8,864 kg/ha white, Port's alcohol range is 16.5-22% by category, Douro DOP's minimum is 10%, bottling at origin covers Duriense too, and the 75,000-litre stock rule for Port traders is gone. IVDP created the 80 anos and VVO Port age indications in January 2025.

### Cited Findings
- [DL 106/2025](https://files.diariodarepublica.pt/1s/2025/09/17700/0000200018.pdf): yields (art. 12), beneficio with grape spirit fixed in the harvest communique (art. 13), Duriense at least 10% with grapes and bottling only in the RDD (art. 18), Douro at least 10% (art. 21), Moscatel do Douro 16.5-22% from Moscatel Galego Branco or Roxo (art. 25), Douro sparkling at least 9 months (art. 27), Port 16.5-22% (art. 31), storage and bottling only in the RDD or the Gaia entreposto. Government summary: end of the 75,000 l stock rule, IGP for Douro brandy, Port wine vinegar ([portugal.gov.pt](https://portugal.gov.pt/gc25/comunicacao/comunicados/governo-aprova-novo-estatuto-das-denominacoes-de-origem-e-indicacoes-geograficas-da-regiao-demarcada-do-douro)).
- Port categories: Vintage approved January-June of the 2nd year and bottled by 30 July of the 3rd; LBV certified in the 4th year and bottled by the end of the 6th; Colheita at least 7 years in wood; Crusted 3 years in bottle; Garrafeira 4-8 years in wood then at least 15 in glass; Reserva Tawny and White at least 6 years; age indications 10-50, 80 anos and VVO ([IVDP categories](https://www.ivdp.pt/pt/vinhos/vinhos-do-porto/categorias-especiais/); [IVDP Circular 01/2025](https://www.ivdp.pt/media/avlbjznd/circular_01_2025_signed_signed.pdf)). Sugar classes Extra Seco 17.5-40 to Lagrima over 130 g/l ([Porto caderno](https://www.ivdp.pt/media/pnwe55km/pdo-pt-a1540-porto.pdf)). Stock top-ups with spirit capped at 2% a year ([IVDP Circular 05/2026](https://www.ivdp.pt/media/tdejgoiw/circular_05_2026.pdf)).
- Madeira: actual 17-22%, canteiro at least 2 years in wood with no estufagem, estufagem at most 50 C for 3 months, Colheita 5 years, Frasqueira 20 years, varietals tied to sweetness (Sercial dry to Malvasia sweet), age indications up to over 50 years, 150 hl/ha of must ([JORAM, Portarias 38-40/2015](https://joram.madeira.gov.pt/joram/1serie/Ano%20de%202015/ISerie-028-2015-02-13sup2.pdf)).
- Vinho Verde 2024: espumante category, new yield scheme (10,666 kg/ha base, 13,500 Alvarinho, 15,000 others), Alvarinho 100% if named alone or 30% with others, 'Origem do Alvarinho' for Moncao e Melgaco, cans up to 0.25 l ([C/2024/3412](http://data.europa.eu/eli/C/2024/3412/oj); [Reg. 2024/2583](http://data.europa.eu/eli/reg_impl/2024/2583/oj)).
- Dao: seven subregions, Nobre musts 13% red, 12% white, 80/100 hl/ha, reds at least 8 months ([Portaria 246/2014](https://informador.pt/legislacao/diploma/portaria-n-o-246-2014/)).
- New PGIs 2023-2024: Terras do Dao, Terras da Beira, Terras de Cister, Beira Atlantico (OJ C 109, 116, 137 and 344 of 2023; [Reg. 2024/698](http://data.europa.eu/eli/reg_impl/2024/698/oj)). Pico and Biscoitos widened to still, sparkling and overripe wines with 85% Arinto dos Acores, Verdelho and Terrantez do Pico ([C/2024/2366](http://data.europa.eu/eli/C/2024/2366/oj); [C/2024/1740](http://data.europa.eu/eli/C/2024/1740/oj)). Bairrada 2023: liqueur wine, Classico rules, new yields ([eAmbrosia Bairrada](https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/details/EUGI00000004201)).

### Inferences
- The EU-registered Porto and Douro specifications (2011) still show 55/65 hl/ha and 19-22% for Port. An EU amendment aligning them with DL 106/2025 should follow, but none had been published by October 2026.

### Gaps
- Regulamento IVDP 411/2026 (Port categories and Douro traditional terms) and 412/2026 (aguardente) were located but not read; Douro still-wine ageing for Reserva and Grande Reserva is therefore partial.
- Most Lisboa, Tejo, Alentejo and Algarve cards rest on the 2011-2017 single documents and cadernos.
