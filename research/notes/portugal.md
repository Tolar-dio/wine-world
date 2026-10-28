# Portugal (with Cape Verde / Fogo): wine regions, fortified wines, sites

Deliverable: `/home/claude/winesite/data/content/pt.json` (2 countries: pt, cv; 15 regions; 79 appellation profiles; 166 sites). Built from part files `work/pt/p1..p7*.json` produced by `scripts/pt_content/p1_country.py ... p7_south_islands.py`, merged by `scripts/pt_content/merge.py` (also checks em dashes, banned words, IDs, text length). Site placement verified by `scripts/pt_content/check_sites.py` (point-in-polygon against EU PDO geometries in `raw/eupdo/EU_PDO.gpkg`, EPSG:3035 reprojected to WGS84): 0 problems. Gaia lodges are allowed outside the Douro polygon (legal entreposto for Port); 5 sites are deliberately assigned to IGPs because they lie outside the DOC parish lists (Boticas, São João de Tarouca, Mouchão, Grous, Adega Mayor). All 30 PT polygons in `site/data/geo/pt.geojson` get a profile by `id`; 49 subregion/IGP/other profiles are point-only (they carry lat/lon).

Search budget note: the shared WebSearch budget ran out twice mid-task; later verification used WebFetch of already-surfaced pages, downloaded primary documents (OIV PDFs, IVDP circular, Madeira statute), Wikidata SPARQL, Nominatim and Photon.

## Country: history, classification and current statistics

### Takeaway
Portugal had 171 kha of vineyard and produced 6.0 mhl in 2025 (both 10th in the world), its lowest harvest since 2011, while domestic consumption hit a record 5.6 mhl; exports were about 1.0 bn EUR, roughly a third of it Port.

### Cited Findings
- Vineyard 171 kha in 2025 (-0.9%), 10th largest; production 6.0 mhl (-14.0% vs 2024), "lowest production volume since 2011 (5.6 mhl)" after record rain then heat and disease; consumption 5.6 mhl, "the highest consumption volume ever recorded"; exports 3.4 mhl (+1.1%) worth 1.0 bn EUR (-1.0%), Angola top market by volume, France by value (source: [OIV, State of the World Wine Sector in 2025 (May 2026)](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf))
- 2024: vineyard 173 kha (-5.1%), production 6.9 mhl (-8.2%); exports 3.5 mhl, 1.0 bn EUR (source: [OIV 2024 report](https://www.oiv.int/sites/default/files/2025-04/OIV-State_of_the_World_Vine-and-Wine-Sector-in-2024.pdf))
- IVV: 2025/26 campaign 5.9 mhl (-14%); Douro -34%, Alentejo -20%, Algarve -20%, Trás-os-Montes -18%, Beira Interior +2%, Azores +221%; DOP+IGP = 91% of production (source: [Forbes Portugal](https://www.forbespt.com/?p=177523))
- 2025 export value 954 M EUR (-1.2%); Port 31.5% of export value, fortified ~34% (source: [AICEP Portugal Global](https://www.portugalglobal.pt/pt/noticias/2026/fevereiro/faturacao-do-setor-do-vinho-cresce-2-em-2025/))
- Vineyard ~227,000 ha (2014) to ~171,000 ha (2024, IVV); Alentejo ~26,000 ha (only region that grew); Douro ~44,000 ha; Vinhos Verdes ~23,000 ha; Lisboa ~18,000; Tejo ~12,000; Dão 9,827; Bairrada 9,300; Trás-os-Montes 4,565 ha; crisis distillation 2024 (source: [Diário de Notícias](https://www.dn.pt/economia/portugal-perdeu-50-mil-hectares-de-vinha-numa-década-mas-os-excedentes-de-vinho-continuam-a-preocupar))
- 2026 new-planting limit 616 ha nationally (0.36% of planted area at 31 July 2025) (source: [Observador](https://observador.pt/2026/03/09/governo-fixa-maximo-de-novas-plantacoes-de-vinhas-em-616-hectares/))
- 30 PT wine PDOs in the EU register with names, registration dates (1991, 1996, 2004, 2007, 2011), varieties and parishes (source: [Candiago et al. 2022 EU PDO inventory, local copy raw/eupdo](https://doi.org/10.6084/m9.figshare.c.5877659))

### Inferences
- History items (Roman Lusitania, Treaty of Windsor 1386, Methuen 1703, Pombal 1756, Factory House, Forrester, oidium/phylloxera, Mateus 1942, EU 1986) are standard and written from expertise; specific numbers that could be stale were checked as above.

### Gaps
- No current official count of indigenous varieties found; "roughly 250" used as the common figure.
- Exact years of several lesser DOC/IPR creations (Alenquer, Arruda, Óbidos, Encostas d'Aire, Palmela) not verified; profiles state the EU registration year instead.

## Port and Douro (IVDP)

### Takeaway
The beneficio (Port quota) fell from 104,000 pipas (2023) to 75,000 (2025) and was set at 76,000 for 2026; the IVDP added 80 Years Old and Very Very Old (80+ years) Port indications in January 2025, after the 50 Years Old category of 2021/22.

### Cited Findings
- 2026 beneficio 76,000 pipas (550 L), decided unanimously 17 Jul 2026; 104k (2023), 90k (2024), 75k (2025); ~1,000 EUR per pipa to growers; Port sales -10% H1 2026 (source: [Renascença](https://rr.pt/noticia/economia/2026/07/17/douro-aumenta-producao-de-vinho-do-porto-para-as-76-mil-pipas-em-2026/478674/))
- ~18,000 growers; Port grapes 900 to 1,200 EUR/pipa vs Douro DOC 150 to 400 EUR; plot scoring on altitude, exposure, slope, varieties, age, productivity (source: [ECO](https://eco.sapo.pt/descodificador/afinal-o-que-e-o-beneficio-do-douro-vinhateiro-e-porque-gera-controversia-no-setor/))
- Points method by Álvaro Moreira da Fonseca (1947-48) using the 1937-45 Casa do Douro register; cadastro passed to IVDP in 2004; altitude tiers (<300 m best, >500 m originally ineligible) (source: [Salt of Portugal](https://saltofportugal.com/2026/08/10/the-right-to-make-port/))
- Class thresholds A >1,200; B 1,001-1,200; C 801-1,000; D 601-800; E 401-600; F 201-400; subregion vineyard areas (Baixo Corgo 13,492, Cima Corgo 17,036, Douro Superior 8,060 ha in that source) (source: [F. Morais, IVV presentation](https://evega.xunta.gal/sites/default/files/contido/relatorios/vinos_licorosos_portugal-francisco-morais.pdf); Wikipedia gives 14,000 / 19,000 / 8,700 ha ; [Wikipedia Douro DOC](https://en.wikipedia.org/wiki/Douro_DOC) (conflict noted; atlas uses the Wikipedia rounded figures))
- 43,000 ha too much vineyard; Port volume -34% since 2000; >60 million bottles of Douro DOC sold in 2024 (source: [The Drinks Business, Oct 2025](https://www.thedrinksbusiness.com/2025/10/how-a-distorted-system-is-creating-a-crisis-in-the-douro/))
- IVDP Circular 01/2025 (22 Jan 2025): creates "80 anos" indication and "Very Very Old / VVO" for 80+ years without age statement; refers to Regulamento 3/2022 (source: [IVDP](https://ivdp.pt/media/avlbjznd/circular_01_2025_signed_signed.pdf))
- 50 Year Old category unveiled July 2021 for tawny and white; Kopke first (source: [Decanter](https://www.decanter.com/wine-reviews-tastings/new-50-year-old-port-category-468981/))
- 2005 special categories rules (Vintage, LBV, Colheita 7 years, Crusted, Reserve) (source: [For the Love of Port](https://fortheloveofport.com/regulation-for-the-special-categories-of-port-wine/))
- 335 marcos placed 1758-1761, 105 located (source: [RTP](https://www.rtp.pt/noticias/pais/localizados-105-marcos-pombalinos-dos-335-colocados-no-seculo-xviii_n41501))
- UNESCO 2001, 24,600 ha core, 225,400 ha buffer, criteria iii, iv, v (source: [UNESCO](https://whc.unesco.org/en/list/1046))
- Vargellas bought 1893-1896 (Upper Vargellas from Dona Antónia's daughter), station 1886 (source: [Taylor's](https://www.taylor.pt/en/port-wine-vineyards/quinta-de-vargellas/taylor-rebuilds-estate); first single-quinta Vintage Vargellas 1958, LBV 1965, 67 ha vines, Terra Feita 61 ha, Junco 46 ha ; [Wine Anorak](https://wineanorak.com/douro/Taylor_Port.htm))
- Cruzeiro: feitoria 1761, Fonseca supply since c.1870, in Vintage since 1912, bought 1973, near Vale de Mendiz on east bank of the Pinhão; Santo António ~1 km north; Panascal in Távora valley (source: [Fonseca](https://fonseca.pt/en/vineyards-and-douro/quinta-cruzeiro), [Fonseca vineyards](https://fonseca.pt/en/vineyards-and-douro))
- Noval: 1715, Nacional ~2.5 ha ungrafted, 1931, 1981 Gaia fire (source: [Oxford Companion via ckbk](https://app.ckbk.com/reference/wine05383c17s001e020); bought Passadouro 2019 (36 ha) ; [Decanter](https://www.decanter.com/wine-news/quinta-noval-passadouro-deal-423298/))
- Quinta do Tua: Ferreira house 1834, Cockburn's, Symington 2006, 21.9 ha vines (source: [Symington](https://www.symington.com/vinha/quinta-do-tua); Symington 26 quintas, 1,024 ha vines, Vesuvio 133 ha, Fonte Souto 2017 ; [Symington](https://symington.com/our-story); 1882, 1905, 1912, 1970, 1989 dates ; [Wikipedia](https://en.wikipedia.org/wiki/Symington_Family_Estates))
- Fladgate bought Quinta do Portal (53 ha) March 2024 (source: [The Drinks Business](https://www.thedrinksbusiness.com/2024/03/taylors-port-buys-douro-table-wine-and-tourism-business/))
- Sogevinus renamed Kopke Group (2025), brands Kopke 1638, Cálem, Burmester, Barros; São Luiz (source: [The Drinks Business](https://www.thedrinksbusiness.com/2025/07/sogevinus-sheds-corporate-identity-in-kopke-group-rebrand/))
- Quinta da Leda bought 1979, Sogrape 1987, winery 2001, ~160 ha, Barca Velha 1952 (source: [Wine Detective](https://thewinedetective.co.uk/a-vertical-of-casa-ferreirinha-quinta-da-leda-word-of-barca-velha-2008/), [Agroportal](https://bo.agroportal.pt/a-quinta-da-leda-nao-pertence-a-sogrape-a-sogrape-e-que-pertence-a-quinta-da-leda))
- Moscatel do Douro: ≥85% Moscatel, ≥16.5%, ≥18 months wood, Favaios/Alijó (source: [Wines of Portugal](https://winesofportugal.com/en/portuguese-wines/wine-styles/vinho-moscatel/))

### Inferences
- Gaia lodge coordinates from OSM shop/winery nodes on the lodge streets (Fonseca, Cockburn's, Dow's/Warre's, Kopke marked approx).
- Fonseca Cruzeiro and Santo António, Terra Feita, Tua and Leda have no OSM/Wikidata point; placed from the producers' own location descriptions plus nearby OSM features (Rio Pinhão line, Rio Tua line, Almendra vineyard cluster), marked approx.

### Gaps
- Full text of Regulamento 3/2022 (age, colour, rosé rules) not retrieved; rosé Port described from general knowledge (Croft Pink 2008).
- Noval's Nacional parcel location is unpublished; site uses the quinta point (approx).
- Some quinta purchase years (Panascal 1978, Roêda 1889, Malvedos 1890, Bomfim 1896, Cavadinha 1980) come from expertise, not re-verified this session.

## Madeira (IVBAM)

### Takeaway
Madeira's 2015 statutes define estufagem (≤50 °C, ≥3 months), canteiro, age indications up to 50 and "More than 50" years, Colheita (≥5 years) and Frasqueira (≥20 years); 2025 sales were ~3.1 million litres and 20.6 M EUR.

### Cited Findings
- Portaria 39/2015 (13 Feb 2015): sweetness by Baumé (Seco <1.5°, Extra seco ≤0.5°, Meio seco 1-2.5°, Meio doce 2.5-3.5°, Doce >3.5°); Sercial dry, Verdelho medium dry, Boal medium sweet, Malvasia sweet, Terrantez medium dry/sweet; age 5, 10, 15, 20, 30, 40, 50, Mais de 50 anos; Frasqueira ≥20 yrs canteiro; Colheita ≥5 yrs; Solera rules; estufagem ≤50 °C ≥3 months, not bottled before 31 Oct of second year; Canteiro ≥2 yrs wood, ≥3 yrs before bottling; Rainwater (source: [JORAM I Série n.º 28, 2015](https://joram.madeira.gov.pt/joram/1serie/Ano%20de%202015/ISerie-028-2015-02-13sup2.pdf))
- 2025 sales ~3.1 M L, ~20.6 M EUR; France largest; bottled 77.3% (source: [DN Madeira](https://www.dnoticias.pt/2026/1/16/477589-comercializacao-do-vinho-madeira-em-2025-caiu-em-quantidade-e-valor/); Madeirense DOP sales +~24% ; [DN Madeira](https://www.dnoticias.pt/2026/2/12/481179-comercializacao-de-vinho-com-do-madeirense-cresceu-quase-24/))
- ~400 ha of vinifera, ~1,200 growers (source: [Universidade da Madeira](https://vinhomadeira.web.uma.pt/en/?p=129); older figure ~1,850 ha and Tinta Negra ~60% of grapes ; [F. Morais](https://evega.xunta.gal/sites/default/files/contido/relatorios/vinos_licorosos_portugal-francisco-morais.pdf) (conflict: atlas uses ~400 ha))
- Blandy arrived 1808, firm 1811; Madeira Wine Association 1913, Blandy's joined 1925; Symington partners 1989; Blandy control 2011; Chris Blandy (7th generation) (source: [Madeira Wine Company](https://www.madeirawinecompany.com/about-us/the-blandy-family.html))
- Justino's 1870, largest shipper, Cruz brand; H&H controlled by La Martiniquaise (source: [ckbk](https://app.ckbk.com/reference/wine05383c10s001e038))

### Gaps
- Exact current Tinta Negra share and noble-variety areas not found from IVBAM.
- Justino's premises point approximate (Cancela/Caniço industrial area).

## Other DOCs (north, centre, south, Azores) and Moscatel/Carcavelos/Colares

### Takeaway
All 30 EU-registered PT wine PDOs are profiled; fortified Carcavelos (~32 ha by Oct 2024) and Colares (~20,000 L a year) are tiny survivors; talha wine is a small (~180,000 L, 23 producers in 2021) recognised niche.

### Cited Findings
- Carcavelos: 5 ha replanted 1983 at Pombal estate, 32 ha by Oct 2024, Villa Oeiras (Ministry + Oeiras) (source: [Euronews](https://www.euronews.com/culture/2024/10/12/starting-history-again-how-the-resurrection-of-carcavelos-is-saving-a-lost-culture))
- Colares: ungrafted vines on sand, Ramisco/Malvasia, >1 M L in 1950 to ~20,000 L; Adega Regional barrels 1931; Viúva Gomes 1808 (source: [World of Fine Wine](https://worldoffinewine.com/news-features/colares-on-the-beach))
- Moscatel de Setúbal ≥85% Moscatel for the varietal name, skin contact, ≥18 months wood (source: [Wines of Portugal](https://winesofportugal.com/en/portuguese-wines/wine-styles/vinho-moscatel/))
- Alvarinho: Portaria 152/2015, Monção e Melgaço exclusivity until 2021 (source: [Agroportal](https://www.agroportal.pt/?p=721327))
- Talha: recognised 2010; 23 producers, ~181,440 L (2021); open from 11 November (source: [Agroportal](https://bo.agroportal.pt/?p=952871))
- Pico DOP single document (2014): licoroso, ≤100 m altitude parishes, currais, 50 hl/ha, Verdelho (source: [eAmbrosia](https://webgate.ec.europa.eu/eambrosia-api/api/v1/attachments/22328))
- Bucelas "Portuguese Hock", Wellington (source: [Wikipedia](https://en.wikipedia.org/wiki/Bucelas_DOC); Távora-Varosa from Varosa IPR, absorbed Encostas da Nave ; [Wikipedia](https://en.wikipedia.org/wiki/T%C3%A1vora-Varosa_DOC); Beira Interior merged Castelo Rodrigo, Pinhel, Cova da Beira ; [Wikipedia](https://en.wikipedia.org/wiki/Beiras_wine_region))

### Gaps
- Exact current rules for dry DOC Pico whites (post-2014 amendments) not confirmed; text hedges.
- Hectares per DOC for most smaller DOCs not found; left null.
- Lourinhã is a spirit GI, not in the wine PDO register (no polygon; point-only profile).

## Cape Verde (Fogo)

### Takeaway
Fogo's wine comes from the Chã das Caldeiras caldera (~1,700 m); Chã cooperative ~100,000 L/yr, Maria Chaves 25 ha (planted 2009); no appellation.

### Cited Findings
- Montrond c.1670, 2014 eruption destroyed ~75% of Portela/Bangaeira, ~1.2 km² of vines (source: [Wikipedia](https://en.wikipedia.org/wiki/Ch%C3%A3_das_Caldeiras))
- ~85 cooperative growers, ~100,000 L, bottling since 1998 (COSPE), Maria Chaves 25 ha 2009, released 2013, vineyards 800-2,100 m, sabro branco and Alfrocheiro, no DO (source: [Forbes África Lusófona, Aug 2025](https://forbesafricalusofona.com/?p=161692))
- 2019 claim of >1,500 ha and 138 producers (source: [Sábado](https://www.sabado.pt/mundo/detalhe/seca-e-erupcoes-nao-travam-produtores-de-vinho-do-vulcao-do-fogo) (conflicts with ~120 ha; atlas uses ~120 ha and flags uncertainty in stats note))

### Gaps
- No official statistics; area figure uncertain.

## Coordinates: method
- Wikidata SPARQL (P625) for named quintas, palaces, monasteries, marcos, villages; OSM Nominatim/Photon for wineries, lodges and estates; cross-checked by point-in-polygon against EU PDO parish geometry. 139 sites precise, 27 approx (listed in pt.json by coord_quality).
