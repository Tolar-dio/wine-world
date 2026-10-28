# Wine countries of Germanic, north-western and central Europe (Vitis Mundi c7)

Deliverable: `/home/claude/winesite/data/content/c7_central_nw_europe.json` (validated with `python3 -m json.tool` and a custom checker). Totals: 13 countries, 51 regions, 142 appellations, 252 sites (62 German vineyard sites; 62 sites overall have `approx` coordinates). Part scripts, which can be re-run, are in `/home/claude/winesite/work/c7/` (`de.py`, `at.py`, `ch.py`, `nw.py`, `ce.py`, `merge_validate.py`). Each one writes a `part_*.json`, and the merge script checks em dashes, banned words, site coordinates against country bounding boxes, duplicate IDs, region and appellation links, word counts, and that every EU-registered PDO name for the covered countries appears in some `match` list. All checks passed (0 problems).

Method note: the shared WebSearch budget (200 per turn) ran out partway through. After that I used only WebFetch on URLs that had already come up, plus Wikidata SPARQL, OpenStreetMap Nominatim geocoding and the local EU PDO dataset (`raw/eupdo/PDO_EU_id.csv`, Candiago et al. 2022). PDO names, registration dates, municipality counts, yields and variety lists come from that dataset. Most site coordinates come from OSM Nominatim (named vineyard polygons or localities) or Wikidata. The rest were placed by hand from the village position and marked `approx`.

## Germany: history, law, VDP, the 13 Anbaugebiete, sites

### Takeaway
Germany has about 102,000 ha (OIV 2025) and produced 7.6 mhl in 2025, about 10% below average. The 2021 reform moves labels from a sugar-based to an origin-based pyramid. Großlagen must carry the word "Region" from the 2026 vintage, a rule a court enforced in 2025 against "Zeller Schwarze Katz". "Grosses Gewächs" and "Erstes Gewächs" have been defined in the national wine ordinance since the 2024 vintage.

### Cited Findings
- Germany vineyard area 102 kha in 2025 (−1.3%); production 7.6 mhl in 2025 (−2.6% vs 2024, −10.4% vs 5-year average), 9th in world. Source: [OIV State of the World Wine Sector 2025](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf)
- Destatis: 7.55 mhl in 2025; Prädikatswein 29.3% (up from 16.1%); Qualitätswein 66.6%; Landwein 2.7%. Regional volumes: Rheinhessen 2.10 mhl, Pfalz 1.53, Mosel 1.27, Baden ~1.0, Württemberg 0.741, Franken 0.366, Rheingau 0.180, Ahr 38,400 hl (+71%), Sachsen 29,500 hl. Source: [Lebensmittel Praxis](https://lebensmittelpraxis.de/industrie-aktuell/48164-weinbau-2025-deutsche-winzer-erzeugen-weniger-wein-doch-die-qualitaet-steigt.html)
- 2026 harvest estimated at about 8 mhl (+5% vs 7.7 mhl in 2025, 4% below the 2020–2025 average). Source: [evangelisch.de / Destatis, 13 Oct 2026](https://www.evangelisch.de/inhalte/259974/13-10-2026/etwas-mehr-wein-gelesen-als-im-vorjahr)
- Hectares by Anbaugebiet (2023 survey, DWI): Ahr 531; Baden 15,679; Franken 6,173; Hessische Bergstraße 461; Mittelrhein 460; Mosel 8,536 (Riesling 5,330); Nahe 4,250; Pfalz 23,793; Rheingau 3,207 (Riesling 76%); Rheinhessen 27,499 (43% of German Silvaner); Saale-Unstrut 853; Sachsen 522; Württemberg 11,392 (two-thirds red). Source: [Tageskarte/DWI](https://www.tageskarte.io/industrie/detail/die-deutschen-weinbaugebiete-im-profil.html)
- 2021 law: passed Nov 2020, in force 27 Jan 2021, binding from the 2026 vintage. Pyramid of Anbaugebiet / Region / Ortswein / Lagenwein. "Region" replaces the Großlage. Gewann may be named. Prädikat kept. Source: [German Wine Society](https://germanwinesociety.org/new-german-wine-law/); [Wine Scholar Guild](https://www.winescholarguild.com/blog/wine-fundamentals/the-new-rules-of-german-wine)
- Classification of Erste/Grosse Lagen passed to the VDP and DWV after the Schutzgemeinschaften proved unable to do it. Source: [Wine Scholar Guild](https://www.winescholarguild.com/blog/wine-fundamentals/the-new-rules-of-german-wine)
- OVG Koblenz (2 July 2025, 8 A 10854/24.OVG): Zell may not rename the Großlage to "Zeller Schwarze Katz"; from the 2026 harvest it must read "Region Schwarze Katz". Source: [beck-aktuell](https://www.beck-aktuell.de/heute-im-recht/rechtsprechung/ovg-koblenz-8a1085424ovg-umbenennung-zeller-schwarze-katz-wein-grosslage-2025-07-09)
- At Hessen's request, the Bundesrat put GG and Erstes Gewächs into the Weinverordnung from the 2024 vintage. Rheingau GG is limited to about 1,100 ha on the Gütekarte, 50 hl/ha (60 on steep slopes). The VDP was reportedly looking for new names. Source: [Meininger](https://www.meininger.de/wein/politik-und-verbaende/wine-formerly-known-grosses-gewaechs)
- VDP proposed a points-based (up to 1,000) site system in 2023. Source: [Meininger 2023](https://www.meininger.de/wein/politik-und-verbaende/neues-vdp-lagensystem-kommt)
- Kloster Eberbach founded 1136; Charlemagne's 777 gift of Hammelburg to Fulda; area over 300,000 ha before the Thirty Years' War. Source: [Wikipedia de](https://de.wikipedia.org/wiki/Weinbau_in_Deutschland)
- EU PDOs: 13 Anbaugebiete (reg. 1973; Saale-Unstrut and Sachsen 1996) plus single-site PDOs Uhlen Blaufüsser Lay, Uhlen Laubach, Uhlen Roth Lay, Monzinger Niederberg (all 2018), Würzburger Stein-Berg (2020) and Bürgstadter Berg (2017), with yields and varieties. Source: [EU PDO dataset](https://doi.org/10.6084/m9.figshare.c.5877659)

### Inferences
- The history entries (Neumagen ship c. 220 AD, Speyer bottle, the 1435 Riesling mention, 1720 Johannisberg planting, 1775 Spätlese legend, 1830 Dromersheim Eiswein, 1868 Prussian map, the Ahr flood) are written from expertise, with mainstream dates. They were not individually re-checked this session.
- I left out a VDP Grosse Lage count and a member count, because I found no current figure.

### Gaps
- No 2025 national vineyard area from DWI (OIV gives 102 kha). Regional hectares are from 2023.
- I could not confirm the current VDP names that will replace "Grosses Gewächs", if any have been adopted.
- Some Lage coordinates are approximate (marked): Trittenheimer Apotheke, Westhofener Morstein, Forster Pechstein, Walporzheimer Kräuterberg, Niederhäuser Hermannshöhle, Schlossböckelheimer Kupfergrube, Grünhaus Abtsberg, Karthäuserhofberg, Wiltinger Braune Kupp. Overpass was unreachable and the Wikipedia API was rate-limited (HTTP 429).

## Austria: glycol scandal, DACs, Wachau, ÖTW, estates

### Takeaway
Austria has 44,210 ha (a quarter of it organic) and harvested 2.56 mhl in 2025, its biggest crop since 2018. There are 18 DACs: the Weinviertel came first (2002 vintage) and the Thermenregion last (2023). A 2023 ordinance set up official Erste and Große Lagen from 2025 on, decided region by region.

### Cited Findings
- 44,210 ha; organic 10,432 ha (25%); Grüner Veltliner 32.3%, Zweigelt 13.4%, Welschriesling 6.3%, Blaufränkisch 5.8%; 10,012 wine businesses; exports 60.6 m litres worth €218.9 m. Source: [Advantage Austria](https://www.advantageaustria.org/ch/zentral/branchen/wein_bier_spirituosen/zahlen-und-fakten/Zahlen_und_Fakten.de.html)
- 2025 harvest 2.56 mhl (+37%): Niederösterreich 1.70 mhl, Burgenland 582,900 hl, Steiermark 244,700 hl, Wien 30,200 hl; Weinviertel 989,300 hl. Source: [Statistik Austria](https://www.statistik.at/fileadmin/announcement/2026/02/20260220Weinernte2025.pdf); OIV gives 2.5 mhl. Source: [OIV](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf)
- State areas: NÖ 26,732 ha, Burgenland 11,538, Steiermark 5,109, Wien 588. Source: [Austrian Wine](https://www.austrianwine.com/our-wine/wine-growing-regions)
- Areas by Weinbaugebiet (2019): Wachau 1,285; Kremstal 2,242; Kamptal 3,567; Traisental 861; Wagram 2,411; Weinviertel 13,730; Carnuntum 812; Thermenregion 1,821; Neusiedlersee 5,959; Leithaberg 2,955; Rosalia 228; Mittelburgenland 2,026; Eisenberg 525; Vulkanland 1,657; Südsteiermark 2,798; Weststeiermark 655; Wien 588. Source: [Wikipedia de](https://de.wikipedia.org/wiki/Weinbau_in_Österreich)
- DAC years and rules (Weinviertel 2002, Mittelburgenland 2005, Traisental 2006, Kremstal 2007, Kamptal 2008, Leithaberg 2008 red / 2009 white, Eisenberg 2009, Neusiedlersee 2011 with sweet added 2020, WGS 2013, Rosalia 2017, the three Styrian DACs 2018, Carnuntum 2019, Wachau 2020, Ruster Ausbruch 2020, Wagram 2021, Thermenregion 2023). Source: [Wikipedia de DAC](https://de.wikipedia.org/wiki/Districtus_Austriae_Controllatus); Thermenregion 2023 vintage and varieties. Source: [Wine Industry Advisor](https://wineindustryadvisor.com/2023/06/01/austrias-thermenregion-finalises-the-dac-implementation-phase/). Note that an English wiki page gives Weinviertel as 2003 and Mittelburgenland as 2006 (approval dates rather than vintages). Source: [Wine with Seth](https://www.winewithseth.com/winewiki/dac-austria/)
- Site-classification ordinance: Erste or Große Lage only on DAC wines, hand harvest, documentation criteria, Große Lage no earlier than 5 years after Erste; first classifications not before 2025. Source: [wein.plus](https://magazine.wein.plus/news/austria-lays-the-foundations-for-official-site-classification-first-sites-for-all-wine-growing-regions-from-2025-onwards)
- Glycol: first wine analysed 27 June 1985; German warning 9 July; Japan ban 29 July; new law 29 Aug 1985; exports fell from about 45 m litres to 4.4 m litres (1986), recovering by 2001. Source: [Wikipedia](https://en.wikipedia.org/wiki/1985_diethylene_glycol_wine_scandal)
- Vinea Wachau founded 1983; Steinfeder up to 11.5%, Federspiel 11.5–12.5%, Smaragd above 12.5% (first used 1986); 200+ members owning over 85% of the area. Source: [Wikipedia](https://en.wikipedia.org/wiki/Vinea_Wachau)
- ÖTW founded 10 June 1991; 78 members (2023); "ÖTW Erste Lage" from the 2009 vintage; Große Lage still pending. Source: [Wikipedia de](https://de.wikipedia.org/wiki/Österreichische_Traditionsweingüter)
- Heuriger decree 17 Aug 1784; Kremser Sandgrube 1208; Steiner Pfaffenberg 1230; Ungeld 1359; phylloxera 1872. Source: [Wikipedia](https://en.wikipedia.org/wiki/Austrian_wine); [Heuriger](https://en.wikipedia.org/wiki/Heuriger)
- Wachau UNESCO Dec 2000, 36 km. Source: [Wikipedia](https://en.wikipedia.org/wiki/Wachau); Neusiedler See 315 km², up to 1.8 m deep, UNESCO 2001. Source: [Wikipedia](https://en.wikipedia.org/wiki/Neusiedler_See)

### Inferences
- I counted 18 DACs, matching the user's list, including Weststeiermark (Schilcherland). "Hiedler" checks out as a real Kamptal estate (OSM: Weingut Hiedler, Langenlois). Federal-state PDOs (Niederösterreich, Burgenland, Steiermark, Wien) and the Bergland PDOs (Kärnten, Oberösterreich, Salzburg, Tirol, Vorarlberg) are included because they exist in the EU register.

### Gaps
- I did not find a published list of the first official (non-ÖTW) Erste Lagen for 2025–26, and I named none.
- I removed the claim that the Ungeld paid for St. Stephen's Cathedral. Other unverified anecdotes were softened (Uhudler's legal history, Schilfwein pioneer).
- Several Wachau Rieden (Kellerberg, Steinertal, Schütt, Höhereck) and Kamptal Rieden (Heiligenstein, Gaisberg, Lamm) are placed approximately on the right slope, not from a cadastral source.

## Switzerland: Valais, Vaud, Geneva, Three Lakes, Ticino, German Switzerland

### Takeaway
Switzerland harvested 82 m litres in 2025 from 14,432 ha, about 9 m litres below the ten-year average. Appellations are cantonal; Vaud has eight AOCs, including the Grand Crus Dézaley and Calamin.

### Cited Findings
- 2025: 82 m litres (+9.3%), 14,432 ha (−52 ha); western Switzerland 64.4 m l, German-speaking 13.7 m l, Ticino plus Misox 3.4 m l (−8.1%, Japanese beetle). Source: [swissinfo/FOAG](https://www.swissinfo.ch/eng/various/2025-judged-an-excellent-year-for-swiss-wine/91028685); [blue News](https://www.bluewin.ch/en/news/thanks-to-good-weather-2025-vintage-is-of-excellent-quality-li.3124343)
- Canton areas (c. 2019): Valais ~4,600; Vaud 3,814; Geneva 1,340; Ticino 1,028; Drei-Seen-Land 945; Zürich 644; Neuchâtel ~605; Aargau <400; Thurgau ~250; St. Gallen 217. Grapes: Pinot Noir 3,949; Chasselas 3,656; Gamay 1,204; Merlot 1,181; Müller-Thurgau 453 ha. Valais introduced its quality hierarchy in 1990. The vineyard shrank from 33,000 ha (late 19th c.) to 12,500 ha (c. 1960). Source: [Wikipedia de](https://de.wikipedia.org/wiki/Weinbau_in_der_Schweiz)
- Sembrancher Celtic bottle, 2nd c. BC; six Swiss Wine Promotion regions. Source: [Wikipedia](https://en.wikipedia.org/wiki/Swiss_wine)
- Lavaux: UNESCO July 2007; 830 ha (infobox 898); 30 km; monastic terraces from the 11th c.. Source: [Wikipedia](https://en.wikipedia.org/wiki/Lavaux)
- Fête des Vignerons: since 1797; 2019 edition, 20,000-seat arena, ~6,000 performers; UNESCO 1 Dec 2016. Source: [Wikipedia](https://en.wikipedia.org/wiki/F%C3%AAte_des_Vignerons)
- OIV: Swiss consumption 2.3 mhl in 2025. Source: [OIV](https://www.oiv.int/sites/default/files/2026-05/OIV-State_of_the_World_Wine_Sector_in_2025.pdf)

### Inferences
- The Dézaley (~54 ha) and Calamin (~16 ha) areas, Merlot in Ticino from 1906, the Visperterminen altitude (over 1,100 m) and the Vaud AOC list come from expertise and are not re-cited.

### Gaps
- No source fetched for the exact founding years of individual cantonal AOCs. Dates are given as "AOC (cantonal)" or "late 1980s".
- I could not verify hectare figures for Graubünden, Schaffhausen, Bielersee or the individual Vaud AOCs other than Lavaux, Dézaley and Calamin, so those `area_ha` values are null.

## Luxembourg, UK, Belgium, Netherlands, Denmark, Sweden, Norway

### Takeaway
Each country has a small but distinct story. Luxembourg is a single AOP with origin tiers since 2014. The UK has 4,841 ha and four PDOs (English, Welsh, Darnibole, Sussex 2022). Belgium has seven PDOs plus a share of the cross-border Maasvallei Limburg, and the Netherlands has six PDOs from 2017–2020. Denmark has one PDO, Dons (2018). In this dataset Sweden, Norway and Poland have no wine PDOs.

### Cited Findings
- Luxembourg: ~1,295 ha, ~450 growers; Vinsmoselle 58%; Marque Nationale 12 Mar 1935; Crémant 4 Jan 1991; AOP reform 2014 (Lieu-dit, Coteaux de, Côtes de); IVV Remich 1925; after 1709 about 90% Elbling. Source: [Wikipedia de](https://de.wikipedia.org/wiki/Weinbau_in_Luxemburg); [Wikipedia](https://en.wikipedia.org/wiki/Luxembourg_wine)
- UK: 4,841 ha, 1,104 vineyards, 238 wineries, 10.6 m bottles (2024), 69% sparkling; Kent largest, then West Sussex, Essex, East Sussex, Hampshire. Source: [Hort News/WineGB 2025](https://hortnews.com/english-and-welsh-wine-shows-resilience-and-growth/)
- English PDO rules (220 m, 80 hl/ha, six sparkling grapes; EU reg. 29 Dec 2011, UK 2021); Sussex PDO 5 July 2022, 15 months on lees; Wales 91.4 ha; Sussex 1,132 ha; 91% traditional method. Source: [Wine with Seth](https://www.winewithseth.com/winewiki/united-kingdom/)
- Merret presented "Some Observations concerning the Ordering of Wines" on 17 Dec 1662. Source: [Wikipedia](https://en.wikipedia.org/wiki/Christopher_Merret)
- Nyetimber planted 1988; first wine 1992 Blanc de Blancs; Heerema owner since 2006; 425 ha; Cherie Spriggs; IWC Champion Sparkling 2025. Source: [Wikipedia](https://en.wikipedia.org/wiki/Nyetimber)
- Domesday: over 40 vineyards. Source: [Wikipedia](https://en.wikipedia.org/wiki/English_wine)
- Belgium: Hageland 1997, Haspengouw 2000, Côtes de Sambre et Meuse 2004, Heuvelland 2005, VMK 2005, Crémant/VMQ Wallonie 2008; Leuven 23 presses in 1411; Hoeilaart greenhouses. Source: [Wikipedia de](https://de.wikipedia.org/wiki/Weinbau_in_Belgien); [Wikipedia](https://en.wikipedia.org/wiki/Belgian_wine)
- Netherlands: 968 first mention; ~250 ha, 135 sites, 1.2 m bottles (2020); last old Maastricht vineyard closed 1946. Source: [Wikipedia de](https://de.wikipedia.org/wiki/Weinbau_in_den_Niederlanden); [Wikipedia](https://en.wikipedia.org/wiki/Dutch_wine)
- Denmark: ban lifted 1999, 2001 the first legal vintage, 173 ha and 146 vineyards (2022). Source: [Wikipedia](https://en.wikipedia.org/wiki/Danish_wine); Fyn and Jylland specifications (60 hl/ha). Source: [FVST Fyn](https://fvst.dk/Media/638206918045501058/Produktspecifikation%20Fyn%20rev.%20okt.%202013.pdf), [FVST Jylland](https://fvst.dk/Media/638206918138783228/Produktspecifikation%20Jylland%20rev.%20%20juni%202013.pdf); Skærsøgaard planted 1998, Dons the first PDO. Source: [IWC](https://www.internationalwinechallenge.com/iwc-insight/winemaker-interviews/qanda-sven-moesgaard-founder-skærsøgaard-aps.html)
- PDO registrations and municipalities (Moselle Luxembourgeoise 1973; BE PDOs; NL Mergelland 2018, Vijlen 2018, Oolde 2018, Ambt Delden 2019, Achterhoek-Winterswijk 2020, Maasvallei Limburg 2017; Dons 2018; Darnibole 2017). Source: [EU PDO dataset](https://doi.org/10.6084/m9.figshare.c.5877659)

### Inferences
- Danish Fyn, Jylland, Sjælland and Bornholm are entered as cat "PGI". The FVST specifications only say "protected designation", so the category label is my inference and is flagged in the text.
- In the UK regions, the Hambledon (1952) and Camel Valley (1989) dates come from expertise.

### Gaps
- No current Belgian or Dutch national hectare figures, and no Luxembourg production figure.
- Swedish PDO status was not confirmable because the search budget ran out. The EU dataset (2022) lists none, but a Skåne PGI or PDO may have been registered since; check eAmbrosia.
- Norway is covered only briefly (Lerkekåsa mentioned without a site, since I could not geocode it).

## Czechia, Slovakia, Poland

### Takeaway
Moravia holds about 95% of Czech vines, in four subregions, and there are 13 VOCs (2009–2019). Slovakia has about 16,000 ha in six regions, including a 908-ha Tokaj that the EU courts confirmed in 2012–13. Poland has a deep medieval and Grünberg history and a fast-growing modern scene, with no PDO.

### Cited Findings
- Czech subregions; the 13 VOCs with years; largest villages (Velké Bílovice 766 ha, etc.); Ludmila legend c. 875; Valtice wine school 1873 and the 1414 Liechtenstein register; grape shares. Source: [Wikipedia](https://en.wikipedia.org/wiki/Czech_wine)
- ~18,750 ha (2004); Bohemia ~5%; before the Thirty Years' War Bohemia ~10,000 ha and Moravia ~20,000 ha; Charles IV's support around Prague. Source: [Wikipedia de](https://de.wikipedia.org/wiki/Weinbau_in_Tschechien)
- EU PDOs Čechy, Morava, six subregions, Znojmo (2011), Šobes (2011), Novosedelské Slámové víno (2011), with varieties and yields. Source: [EU PDO dataset](https://doi.org/10.6084/m9.figshare.c.5877659)
- Slovakia ~16,000 ha (up to 57,000 ha in the early 19th c.); grape hectares (Grüner 3,695; Welschriesling 2,997; Blaufränkisch 1,787; Müller-Thurgau 1,743; St. Laurent 1,337). Source: [Wikipedia](https://en.wikipedia.org/wiki/Slovak_wine); mladé víno, archívne víno, panenská úroda. Source: [Wikipedia de](https://de.wikipedia.org/wiki/Weinbau_in_der_Slowakei)
- Slovak Tokaj: 7 villages; 908.11 ha after 1996; 175 ha in 1920; 2004 agreement on 565 ha; EU General Court Nov 2012 and Court of Justice Feb 2013 rejected Hungary; 1908 law XLVII; Tokajský výber in 3–6 puttony. Source: [Wikipedia](https://en.wikipedia.org/wiki/Tokaj_wine_region)
- Slovak PDOs including Karpatská perla (2011) and Skalický rubín (2017, Frankovka/Portugal/Svätovavrinecké). Source: [EU PDO dataset](https://doi.org/10.6084/m9.figshare.c.5877659)
- Poland: Wawel c. 1000; papal bull of 1136; Paradies c. 1250; Grünberg sparkling wine 1826 (Häusler, Förster & Grempler); ~500 ha (2011); 433 vineyards (2017); Zabór 35 ha; Srebrna Góra 28 ha; 2008 law. Source: [Wikipedia de](https://de.wikipedia.org/wiki/Weinbau_in_Polen); 151 registered wineries in 2016/17. Source: [Wikipedia](https://en.wikipedia.org/wiki/Polish_wine); vineyards from 1314; festival since 1852. Source: [Wikipedia](https://en.wikipedia.org/wiki/Zielona_G%C3%B3ra)

### Inferences
- VOCs other than Znojmo are entered with cat "VOC" and no separate polygon; they sit inside the subregion PDOs.
- The 17th-century royal-free-town dates for Modra, Svätý Jur and Pezinok are deliberately left as "seventeenth century", because I could not confirm the exact years.

### Gaps
- No current Czech or Polish vineyard area, and no Slovak production figure.
- I found no reliable source for Roman viticulture at Pavlov or Mušov. The text calls it tradition, not fact.
- Polish regulatory zones are described only loosely (Regions I to III per Wikipedia de); no PGI or PDO is entered.
