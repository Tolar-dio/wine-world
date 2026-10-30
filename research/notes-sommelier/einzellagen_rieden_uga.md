# Fine vineyard units of Germany, Austria and Alto Adige, plus unprofiled appellations (Vitis Mundi depth phase)

Deliverables written: `data/content/depth_de_at_einzellagen.json` (546 profiles: 236 German Einzellagen, 219 Austrian Rieden, 91 Austrian Subrieden), `data/content/depth_altoadige_uga.json` (94: all 90 UGA features plus 4 DOC subzones), `data/content/depth_gap_profiles.json` (91: 69 French, 18 Swiss, 4 Uruguayan main polygons). Every profile carries the explicit fine-unit or polygon `id`. Builder: `scripts/depth_fine_profiles_build.py`; parts in `work/depth_fine_profiles/parts/`; source and geo-issue log in `work/depth-fine-profiles-log.md`. A sandboxed dry run of the integrator joined every id with no name-mismatch warnings and left no main polygon without a profile.

## German Einzellagen: slope, soil, microclimate, size, history, style, growers

### Takeaway
The German set covers every major VDP Grosse Lage of Mosel (with Saar and Ruwer), Nahe, Rheinhessen, Pfalz, Ahr and Mittelrhein that exists in the Rhineland-Palatinate vineyard register, plus famous non-VDP sites, written from expertise and anchored in register data (Grosslage, Bereich, registered vine area). The story the profiles tell: slate colour and steepness drive the Mosel, volcanic rock mixtures the Nahe, Rotliegend and limestone Rheinhessen, and basalt, limestone and sandstone the Pfalz; the Prussian (1868 Saar-Mosel) and Bavarian (1828 Palatinate) tax surveys show which sites were valued long before the VDP.

### Cited Findings
- The VDP lists Felsenkopf (Trittenheim), Volz (Wiltingen), Goldberg (Wawern), Himmelreich (Graach), Marienburg (Pünderich), Leiterchen (Trittenheim) and Juffer (Brauneberg) as VDP.GROSSE LAGE (source: [VDP Felsenkopf](https://www.vdp.de/en/the-wines/vineyardonline/lage/4037-felsenkopf-vdpgrosse-lage); [VDP Volz](https://www.vdp.de/en/the-wines/vineyardonline/lage/4210-volz-vdpgrosse-lage); [VDP Goldberg](https://www.vdp.de/en/the-wines/vineyardonline/lage/4040-goldberg-vdpgrosse-lage); [VDP Himmelreich](https://www.vdp.de/en/the-wines/vineyardonline/lage/4052-himmelreich-vdpgrosse-lage); [VDP Marienburg](https://www.vdp.de/en/the-wines/vineyardonline/lage/4089-marienburg); [VDP Leiterchen](https://www.vdp.de/en/the-wines/vineyardonline/lage/4088-leiterchen); [VDP Juffer](https://www.vdp.de/en/the-wines/vineyardonline/lage/4066-juffer))
- The VDP Mosel page names the Scharzhofberg as its Grosse Lage example, lists 27 member estates, dates the Grosser Ring to 1908 (founded on the initiative of Trier's mayor Albert von Bruchhausen), and reports a 2003 Egon Müller Scharzhofberg TBA sold for 14,566 euros at the 2015 VDP Mosel auction (source: [VDP Mosel](https://www.vdp.de/en/the-wines/the-vdpregions/mosel))
- Clotten's "Saar und Mosel Weinbau-Karte" (1868) was a Prussian tax tool. It ranked vineyards in eight brackets of net income (1816 to 1832), shown in three colours. Scharzhofberg and the Maximin Grünhäuser Abtsberg (then labelled Herrenberg) were dark red, the top class. Kanzemer Altenberg and Saarburger Rausch were not listed, and the fourth and last edition came out in 1906 (source: [Lars Carlberg](https://www.larscarlberg.com/saar-and-mosel-map-1868/))
- The map reflects Prussia's effort to rationalise taxation after it took over the Rhineland following the Napoleonic Wars (source: [The Wine Getter](https://thewinegetter.com/2013/04/21/sunday-read-saar-and-mosel-map-1868/))
- The Weinbergsrolle files the Scharzhofberg as "Einzellagenfrei in GL Scharzberg" (Wiltingen, 28.1 ha), so it is absent from de_fine; other register values used in the profiles (e.g. Doctor 3.3 ha, Wehlener Sonnenuhr 42.6 ha, Erdener Prälat 1.5 ha, Goldtröpfchen 64.5 ha) come from the same attributes (LWK RLP / LGB-RLP, dl-de/by-2.0); local data `raw/de_rlp_lagen/lagen_attributes.json`, documented in `work/europe-geo-log.md`

### Inferences
- Classifications other than those listed above (e.g. VDP.GROSSE LAGE for Bockstein, Rausch, Kupp, Pettenthal, Kirchenstück, Saumagen) were assigned from expert knowledge of the VDP's published list; they are very likely right but were not individually re-verified this session.
- Register "Rebfläche" values sometimes read low against commonly quoted site sizes (some figures may reflect current planted area rather than the delimited site), so profiles quote them as "registered under vine".

### Gaps
- No full VDP Grosse Lage list for the six regions was fetched in one source; Erste Lage status is not recorded.
- Rheingau, Franken, Baden, Württemberg, Hessische Bergstraße, Saale-Unstrut and Sachsen have no Einzellage polygons in de_fine, so they were not profiled.
- The Bavarian 1828 Palatinate classification and the Prussian-era Nahe classification are mentioned from expert knowledge only; I found no primary source online this session.

## Austrian Rieden: ÖTW Erste Lagen and famous Rieden

### Takeaway
I wrote 219 Ried profiles covering the Wachau (about 60 features), Kamptal, Kremstal, Traisental, Wagram, Carnuntum, Thermenregion, Leithaberg/Rust, Mittelburgenland, Eisenberg and Gols, plus 91 Subrieden. The ÖTW Erste Lage (1ÖTW) label is applied only where I was confident. The Wachau sits outside the ÖTW system under Vinea Wachau and Wachau DAC rules.

### Cited Findings
- The ÖTW chose about 90 Lower Austrian Erste Lagen. The Wachau is excluded because its growers belong to Vinea Wachau, and Burgenland and Styria are excluded by definition. Heiligenstein: 35 ha, 240 to 350 m, Permian volcanic sandstone. Lamm: 25 ha of loess and loam, all Grüner Veltliner. Achleiten: 22 ha, 200 to 360 m, mica schist low and gneiss high. Kellerberg: 15 ha, sandy loess over gneiss, cooled by a side valley. Hochäcker: 14 ha, up to 380 m, iron-rich gneiss, first documented 1425, Proidl and Nigl. Preussen (Vienna): documented 1277 (source: [Decanter](https://www.decanter.com/features/in-search-of-austrias-greatest-vineyards-plus-12-wines-to-try-488098))
- The 2010 classification named 53 Erste Lagen and the 2017 one 61, in Kamptal, Kremstal, Traisental and Wagram, for dry Grüner Veltliner and Riesling only (source: [ÖTW Riedenkarte 2017](https://winewitandwisdomswe.com/wp-content/uploads/2017/04/Riedenkarte-2017.pdf))
- When Wien (12 Erste Lagen) and Carnuntum joined, the Danube regions had 60 Erste Lagen; Große Lagen were expected "within the next ten years" (source: [wein.plus](https://magazine.wein.plus/news/wien-and-carnuntum-join-the-association-of-traditional-austrian-wineries-oetw-thus-classifies-72-vineyards-as-erste-lagen))
- Erste Lagen named at the 2025 tasting include Gaisberg, Heiligenstein, Lamm, Kogl, Wachtberg, Weinzierlberg, Hinters Kirchl, Pletzengraben, Mordthal, Steinberg, Wiege, Rodauner and Mandel-Höh. Kamptal DAC requires certified organic or sustainable wines from 2025 (source: [Apron and Sneakers](https://www.apronandsneakers.com/2025/10/austria-in-layers-how-otw-defines.html))
- The ÖTW has around 90 member growers, an annual Single Vineyard Summit and plans to give the Ried classification legal force (source: [Star Wine List](https://starwinelist.com/wine-story/curious-to-re-discover-the-finest-austrian-wines-visit-the-otw-at-wine-paris))
- Ried geometry, cadastral villages and Subried names come from Lower Austria and Burgenland open data (CC BY 4.0), via `at_fine.geojson` (see `work/europe-geo-log.md`)

### Inferences
- Producer-to-Ried links (e.g. F.X. Pichler Kellerberg, Knoll Schütt, Alzinger Steinertal, Hirtzberger Singerriedel, Nikolaihof Vom Stein and Im Weingebirge, Prieler Goldberg, Weninger Dürrau, Schiefer Szapary, Heinrich Salzberg) come from expert knowledge. The Subried names in the open data (Silberbichl Vom Stein, Alte Point Im Weingebirge) back up the Nikolaihof links.
- DAC dates in the context notes (Mittelburgenland 2005, Traisental 2006, Kremstal 2007, Kamptal 2008, Eisenberg 2010, Neusiedlersee 2012, Carnuntum 2019, Wachau 2020) come from expertise and were not re-verified this session.

### Gaps
- I could not retrieve the complete current ÖTW Erste Lage list: the ÖTW site was not reached, and de.wikipedia and glossary.wein.plus were blocked by permission timeouts. Many Kamptal, Kremstal and Wagram Rieden therefore carry no 1ÖTW claim even where they may hold it.
- Wien and Steiermark Rieden are not in at_fine, so no Ried profiles exist there.
- Burgenland Subried names in the geo file are malformed ("Riedname: X | Subriedname: Y"), so I did not generate Subried profiles for them.

## Alto Adige UGAs: villages, altitude bands, varieties, producers

### Takeaway
All 90 UGA features (86 UGAs, with 4 Tramin UGAs present in both short and "Tramin-" form) and 4 subzones now have profiles. Each one gives its municipality (from a spatial join to GISCO LAU), the altitude range of the official boundary (terrain model), the permitted varieties where the consortium document is legible, and key producers. The collection reads as a tour from Lagrein on the Gries gravels, Pinot Nero at Mazon, Gewürztraminer at Söll and Kastelaz and Müller-Thurgau on the Fennberg, to the Vinschgau's Riesling and the Eisacktal's Sylvaner, Kerner and Grüner Veltliner.

### Cited Findings
- The Italian Ministry of Agriculture recognised 86 UGAs (DM 8 October 2024, published 17 October 2024), and 2024 is the first UGA vintage. Each UGA allows one to five varieties at yields up to 25 percent below the DOC maximum, and labels must show the UGA symbol. The per-UGA variety lists used in the profiles (e.g. Mazon PN only, Gries-Moritzing LG only, Graun MT only, Eppan Berg-Schulthaus PB only, Sauders GV only, Nafen KE only) come from this document (source: [Consorzio, Lagenkonzept / UGA classification](https://www.suedtirolwein.com/images/publikationen/sudt.-lagenkonzept_concetto-zonazione-aa_aa-uga-classification.pdf))
- The consortium's release (December 2024) says criteria include soil, microclimate, altitude, slope, exposure and rainfall, that historic site names came from a mid-eighteenth-century land register, and that the UGA name appears with "Alto Adige DOC" from 2024 (source: [Wine Industry Advisor](https://wineindustryadvisor.com/2024/12/20/alto-adige-wines-announces-a-new-uga-classification/))
- Region-wide figures: 5,860 ha, vineyards at 200 to 1,000 m, 20 varieties, 86 UGAs (source: [Südtirol Wein 2026 card](https://www.suedtirolwein.com/images/weinkarten-toolbox/251870_suedtirolwein_it_a01_2026.pdf))
- UGA polygons come from Provincia autonoma di Bolzano open data (CC0) in `raw/bz_uga`. Municipalities come from a spatial join with GISCO LAU 2021 (`work/depth_fine_profiles/uga_communes.json`), which corrected the PDF extraction's mislabelled municipality headings (the Kaltern UGAs had been listed under Aldein).

### Inferences
- The PDF extraction had no variety lists for the four Tramin UGAs (Söll, Rungg, Plon, St. Jacob) or for Penon-Kofl. Those profiles name the varieties grown there (Gewürztraminer first) without claiming the legal list.
- Producer-to-UGA links are expert knowledge, and most are well known: Terlano's Vorberg and Kreuth, Nals Margreid's Sirmian, San Michele Appiano's Schulthauser, Girlan's Gschleier, Kurtatsch's Hofstatt, Kofl and Graun, Hofstätter's Kolbenhof and Barthenau, Elena Walch's Kastelaz, Tiefenbrunner's Feldmarschall and Haderburg at Buchholz.

### Gaps
- I did not get an official table of UGA hectares or altitude bands. The altitudes quoted come from the polygon terrain model, not from the consortium.
- The meininger.de article on the 86 UGAs could not be fetched.

## Main appellation polygons without profiles (France, Switzerland, Uruguay)

### Takeaway
All 41 French, 18 Swiss and 4 Uruguayan polygons that the integration report flagged now have profiles. So do 28 French DGC polygons that only fell back to a parent profile, including one mis-join: Coteaux du Layon Saint-Aubin-de-Luigné had been pointed at Burgundy's Saint-Aubin. The 2023 to 2025 regulatory changes were checked against INAO and BLW: Sable de Camargue's AOP status and the current Grés de Montpellier specification.

### Cited Findings
- Sable de Camargue became an AOP when its regulation was published in the EU Official Journal on 18 October 2023, after IGP status from 2011. It covers about 3,000 ha in 14 communes of Hérault, Gard and Bouches-du-Rhône, with 89 growers and a potential of 200,000 hl. "Gris de gris" must be 100 percent Grenache Gris, and soils must be at least 80 percent sand. Psalmody abbey monks made sand wine in the seventh century, and about 95 percent of the vineyard is organic, in conversion or HVE certified (source: [INAO press release](https://inao.gouv.fr/sites/default/files/2024-10/CP_AOP-SableCamargue.pdf))
- The Grés de Montpellier specification (amended text approved 27 March 2025, homologated 18 November 2025) covers 45 Hérault communes, red wine only. Principal varieties are Grenache, Mourvèdre and Syrah (at least two, together at least 50 percent), with Carignan, Cinsault and Morrastel as accessories. Ageing runs until 15 September after the harvest. The name was recognised in 2003 as a complementary name of Coteaux du Languedoc, and Valmagne abbey dates from 1138 (source: [INAO cahier des charges](https://extranet.inao.gouv.fr/fichier/PNO2025AOPGresdeMontpellier.pdf); [Wine with Seth](https://www.winewithseth.com/winewiki/gres-de-montpellier-aoc/) gives full AOC status as 14 May 2024 and a minimum of 70 percent principal varieties, which conflicts with the INAO text's 50 percent (the profile follows INAO).)
- Swiss vineyard area in 2024: Vaud 3,747 ha; Bern 221 ha (Lac de Bienne) + 33 ha (Thunersee and the rest of the canton); Zürich 618; Basel-Landschaft 114; Basel-Stadt 5; Luzern 94; Schwyz 37; Zug 9; Jura 18; Solothurn 13; Appenzell AR + AI 5; Obwalden + Nidwalden + Uri 7; Glarus 2 (source: [BLW Weinlese 2024](https://www.newsd.admin.ch/newsd/message/attachments/91825.pdf))
- Vineyards disappeared from Flores, Río Negro and Treinta y Tres roughly between 1989 and 2007 (source: [Wikipedia, Uruguayan wine](https://en.wikipedia.org/wiki/Uruguayan_wine))
- The Corrèze AOC ODG is the Fédération des Vins de la Corrèze, and the AOC includes the Coteaux de la Vézère mention (source: [INAO product page](https://www.inao.gouv.fr/node/6769/printable/pdf))

### Inferences
- Several dates come from expert knowledge and are probably right but were not re-verified this session: Chablis Grand Cru AOC 1938, Muscadet crus communaux 2011, Fiefs Vendéens and Côtes d'Auvergne AOC 2011, Saint-Chinian Berlou and Roquebrun 2005, Côtes de Provence Sainte-Victoire 2005 and La Londe 2008, Touraine Chenonceaux and Oisly 2011, Chaume premier cru 2007, Corrèze AOC 2017, Bourgogne Côte d'Or 2017, Bourgogne Tonnerre 2006.
- Chablis grand cru climat areas (Les Clos about 26 ha, Grenouilles about 9.4 ha, and so on) are approximate figures from memory.

### Gaps
- Cerro Largo: I found no source on current vineyards (searches turned up only Rivera's Cerro Chapeu), so the profile is cautious.
- Small Swiss cantons: specific villages (Walchwil, Lutzenberg, Oberegg, Flüelen) come from expert knowledge. The BLW gives only combined areas for Appenzell and for Obwalden, Nidwalden and Uri.
- The full INAO Corrèze cahier des charges could not be fetched (server error).
