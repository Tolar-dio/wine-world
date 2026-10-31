# Guides log: mosel, pinot-noir

Files: `site/data/guides/mosel.json` (region, 11 chapters: 7 intro, 4 deeper), `site/data/guides/pinot-noir.json` (grape, 9 chapters, all intro).
Builder scripts (scratchpad, not part of the site): build_mosel.py, build_pinot.py.

Validator (final): 
- mosel.json: 11 chapters, 2701 + 1560 words; 0 errors, 0 warnings
- pinot-noir.json: 9 chapters, 3436 + 0 words; 0 errors, 0 warnings

Note: the web-search budget for the session ran out midway (after the Mosel research and some Pinot checks). Remaining Pinot facts were checked with WebFetch on Wikipedia and wine.com listings, and against the atlas's own profiles; the items marked "not freshly verified" below rest on standard references and my own knowledge.

## Mosel: facts checked and sources
- Mosel area 8,287 ha (2025 facts box) / 8,536 ha (2022/23); Riesling 5,354 ha, 62.4% (2022); Germany's fifth-largest region; six Bereiche. Deutsches Weininstitut region page (ch.deutscheweine.de/regionen/anbaugebiet/72/mosel). Guide says "roughly 8,300 ha, 2025".
- Neumagen wine ship: c. AD 220, found 1878 in a wine merchant's tomb built into the late Roman fort; original in Rheinisches Landesmuseum Trier. Wines of Germany.
- Piesport press house: found 1985 at the foot of the Goldtröpfchen, 4th century, 44 x 20 m, "biggest Roman wine press north of the Alps", 30,000–40,000 l of wine a year. Wines of Germany.
- Ausonius Mosella c. 371: atlas timeline event (consistent with standard references).
- 1787 Riesling decree of Clemens Wenzeslaus: DLR Steillagenkonzept history.
- Mosel area 12,300 ha early 1990s, decline from mid-1990s, steep slopes abandoned first: DLR history page.
- Steep slope >30%; labour 2.5–3.8x tractor sites; average steep parcel ~1,200 m2 (600 m2 in some villages); Flurbereinigung costs up to 90,000 EUR/ha on steep slopes; subsidies to 55% (90% for cable-only); about 80 monorails built on the Mosel; 300 m rail serves ~1 ha: DLR "Vermerk Steillagenweinbau" (undated PDF; I used only its structural figures, not its time-series).
- Monorack origin: Japanese orchard rails, "Monorack" name by 1966 (Wikipedia Monorackbahn).
- Calmont: DWI gives "up to 60%" gradient, up to 1,800 h/ha, monorack since the 1990s; JR says "up to 68 degrees"; Wikipedia "over 65 degrees". Guide avoids a number ("generally billed as Europe's steepest").
- Bernkasteler Doctor: Boemund II legend; Wegeler 1900 purchase at 100 gold marks per vine (wein.plus); ~3.3 ha (atlas, Schiller); 1971 enlargement contested, settled in court 1984 (Schiller's wine blog).
- Mosel Prädikat minimums for Riesling: Kab 70, Spät 76, Ausl 83, BA 110, Eiswein 110, TBA 150 Oechsle; trocken max 9 g/l with high acid, halbtrocken max 18, feinherb unregulated; A.P. number structure (Wikipedia German wine classification). Eiswein minus 7°C (Wines of Germany).
- 2015 VDP auction, Trier: Egon Müller 2003 Scharzhofberger TBA, 12,000 EUR per bottle hammer (Drinks Business; Best of Wines gives 14,994 EUR with fees and VAT).
- 2021 law, binding from 2026 vintage; from the 2026 harvest former Grosslagen and Bereiche must be labelled "Region X" in the same type; Leitgemeinde rule removed, 85% from the named unit; Einzellage wines not sold before 1 March of the following year: Regierungspräsidium Darmstadt PDF "Weinbezeichnungsrecht ab Ernte 2026" (July 2026). Jancis Robinson's "End of the Grosslage" says Grosslage names become Bereich names; I followed the newer official PDF ("Region").
- Piesporter Michelsberg could blend up to 20 villages (Jancis Robinson).
- Eiswein: 2019 first vintage with no Eiswein anywhere in Germany (The Local, quoting DWI); 2024 vintage: Mosel 7 wineries (Wines of Germany).
- Producers: Fritz Haag documented 1605, Dusemond renamed Brauneberg 1925, Oliver Haag since 2005 (estate site). Christoffel vineyards leased to Mönchhof 2001 (wein.plus). Willi Schaefer ~3 ha, Christoph and Andrea since 2001 (Wikipedia). Ernst Loosen took over 1988 (wein.plus). Clemens Busch organic 1984, biodynamic certified 2015, ~20 ha mostly Marienburg, red/grey/blue slate Ortsweine (Wine With Seth). Zilliken: Ferdinand Geltz co-founded the Grosser Ring; Dorothee took over 2016; cellar ~11°C (Wine With Seth). Egon Müller IV since 1991, ~7 of 28 ha of Scharzhofberg (Best of Wines). Heymann-Löwenstein founded 1980; sold in 2025 to Jochen Heigoldt and two family companies, Thomas Dörr managing since January 2026, Reinhard Löwenstein advising (wein.plus magazine and wine guide).
- Ageing windows: site/data/ageing/profiles.json (de-mosel tiers). Climate: site/data/vintage/de.json de-mosel normals n6190 (gst 13.6, gdd 842) and n9120 (gst 14.6, gdd 1038); 2018 gst 16.5, gdd 1398. Vintage notes: site/data/vintage/_events.json de-mosel entries.

## Mosel: prices (US retail, October 2026)
- Dr. L Riesling 2024: $10.33 sale / $16.99 list (Allendale Wine) -> "$10–17".
- Dr. Loosen Wehlener Sonnenuhr Kabinett 2023: $34.99 (Vessel Liquor) -> "$30–35".
- Dr. Loosen Wehlener Sonnenuhr Spätlese 2023: $38.99 sale / $44 (Plum Market) -> "$39–45".
- Fritz Haag Brauneberger Juffer Kabinett 2023: $26.99 (Lincoln Fine Wines) -> "$27–35".
- Selbach-Oster Zeltinger Schlossberg Kabinett 2023: $26.94 (Saratoga Wine) -> "$25–28".
- Dr. Loosen Red Slate Dry 2023: $20.99 (Flatiron SF) -> "$20–24".
- Clemens Busch vom blauen Schiefer 2022: $41.99 (Flatiron SF) -> "$38–42".
- Peter Lauer Barrel X 2024: $27.99 (Houston Wines) -> "$25–28".
- Zilliken Butterfly 2021: $19.99 (Bottle Barn) -> "$20–25".
- J.J. Prüm Wehlener Sonnenuhr Kabinett 2023: $60.99 (Bottle Barn), $56.95 (Allendale) -> "$55–65".
- Egon Müller Scharzhof 2023: $81.95 (Saratoga, case only), $110 (Leon & Son) -> "$80–110".
- Willi Schaefer Graacher Himmelreich Kabinett 2023: $54.99 (Surdyk's) -> "$45–55".
- Generic "two bottles of a Kabinett" / "cool vs warm vintage" picks: "$25–35 each", based on the Selbach, Haag and Loosen prices above.
- Wanted but no verified US price: Heymann-Löwenstein Schieferterrassen (search budget ran out), so it is not a tasting pick.

## Pinot Noir: facts checked and sources
- Pinot: Germany third behind France and US; Champagne 38% Pinot Noir; Pommard (UCD4) and Wädenswil (UCD 1A/2A) clones in Oregon; France recognises 50+ clones; Tchelistcheff "God made Cabernet Sauvignon whereas the devil made Pinot noir"; thin skins, rot, mutation (Wikipedia Pinot noir). Champagne share also matches the champagne guide (38/32/30).
- Oregon Pinot 24,729 of 44,487 acres in 2022 (Wikipedia Oregon wine). Lett planted first Willamette Pinot in 1965, Dundee land 1966 (Wikipedia David Lett). 1975 Eyrie Reserve top ten at the 1979 Wine Olympics; Drouhin rematch: second, 0.2 point behind Drouhin's 1959 Chambolle-Musigny (Wikipedia The Eyrie Vineyards). Drouhin 1987/1988, Dundee Hills 200-ft contour, Jory 15 Ma basalt, state soil 2011, Eola-Amity/Van Duzer, 11 nested AVAs: atlas profiles.
- Central Otago: southernmost commercial region; 1,956 ha (NZW 2020), Pinot >80% (Wikipedia). The new-zealand guide says "roughly three quarters"; I wrote "roughly three quarters to four fifths" to stay consistent.
- Alsace grand cru Pinot Noir from 2022 in Hengst, Kirchberg de Barr, Vorbourg: atlas profiles.
- Other region facts (Côte d'Or, Champagne, Ahr, Baden, Pfalz, California AVAs, Martinborough, Bannockburn, Marlborough, Yarra, Mornington, Tasmania, Casablanca, Hemel-en-Aarde, Calera, Hirsch, Williams Selyem): atlas profiles, which I read in full and which match what I know.
- Not freshly verified on the web (search budget exhausted), stated from standard references: Dijon clone numbers (113, 114, 115, 667, 777) and their arrival in Oregon in the 1980s; Château de Pommard as the source of the Pommard clone; Marq de Villiers' book *The Heartbreak Grape* about Josh Jensen; Marlborough having more Pinot Noir by area than Central Otago; Bollinger Special Cuvée being Pinot-led; Bernhard Huber estate (Malterdingen) run by son Julian; Friedrich Becker's vineyards across the French border; Eyrie's Paris result credited to Gault-Millau (the atlas says so too).

## Pinot Noir: prices (wine.com list pages, October 2026)
- Camus-Bruchon Bourgogne Côte d'Or 2023 $31.97 (list $36); Savigny Aux Grands Liards 2023 $44.97 ($50); Savigny 1er Aux Gravains 2023 $50.97. Louis Jadot Bourgogne 2023 $24.97.
- Wrath 115/667 2024 $32.99 ($39); Morgan Twelve Clones 2023 $29.97.
- Bollinger Special Cuvée $79.99 (list $121) -> "$80–120".
- Friedrich Becker Pfalz Pinot Noir 2021 $23.97; Meyer-Näkel Ahr 2023 $44.97 ($52).
- Cristom Willamette 2024 $32.97; Adelsheim Willamette 2023 $28.97 ($31); Elk Cove 2024 $28.97; Stoller Dundee Hills 2024 $27.97–29.97; Evening Land Eola-Amity 2025 $24.97; Bethel Heights Aeolian 2023 $47.99.
- Davis Bynum RRV 2024 $30.97; La Crema RRV 2023 $33.97; Failla Sonoma Coast 2024 $37.99; Peay West Sonoma Coast 2023 $48.99; Sandhi Sta. Rita Hills 2023 $36.97; Husch Anderson Valley 2023 $24.97; Goldeneye Anderson Valley 2023 $41.97.
- Mt Difficulty Bannockburn 2022 $38.97 ($43); Felton Road Bannockburn 2024 $58.99; Greywacke Marlborough 2023 $39.97 ($45); Dog Point 2022 $39.99; Wairau River 2023 $27.99; Craggy Range Te Muna Road 2019 $40.97 ($47).
- Yering Station Paddock Rise 2024 $26.97; Leyda Reserva 2021 $15.97; Hamilton Russell 2024 $55.97 ($63).
- No verified US price found for Ata Rangi, Newton Johnson, Casablanca-specific Pinots, Tasmanian under $50 or Alsace Pinot; none used as picks. Chile pick is Leyda (neighbour of Casablanca).

## Atlas errors / issues found (not repeated in the guides)
1. `region-de-mosel` summary calls the Mosel Germany's "third largest" region. DWI ranks it fifth (Rheinhessen, Pfalz, Baden, Württemberg are larger).
2. `de-bremm-calmont` fine profile: "gradients of up to 65 degrees". Sources disagree (DWI: up to 60%; JR: 68°; Wikipedia: over 65°), and 65 degrees, about 214%, is implausible for a planted vineyard. Probably a percent/degree mix-up; the DWI figure is 60%.
3. `region-fr-cote-de-beaune` bbox starts at lon -0.7013, so it stretches far into western France. A stray polygon or bad hull; flying to this id will frame badly.
4. `event-germany-law-reform-2021` text puts "Erste Lage and Grosse Lage at the top" of the national pyramid. Grosse Lage is a VDP term; the national law's top tier is the Einzellage (Lagenwein), with Erste Lage optional for protection associations. It also says Grosslagen must be "shown more clearly as regional": the 2026 rule is specifically the prefix "Region".
5. Minor: `site-de-wiltinger-braune-kupp` point (6.5919, 49.6597) is about 1.6 km south of the `de-wiltingen-braune-kupp` polygon (lp 6.5897, 49.6746).
6. Minor: `site-de-bernkasteler-doctor` text says "Thanisch, Lauerburg and Kesselstatt are owners" but its producers list has Wegeler instead of Kesselstatt; Kesselstatt only leases 0.06 ha from Wegeler (Schiller). Wegeler is a major owner and should be named.
7. Glossary `Prädikat`: "The concept dates from the 1971 German law". Prädikat terms such as Spätlese and Auslese were in use long before; 1971 formalised the ladder.

## Places wanted with no id
- No polygon for Gibbston, Bendigo or Cromwell sub-regions (sites only); `nz-bannockburn` and `nz-martinborough` are points, not shapes.
- No id for the Grosslage Michelsberg (understandable) or for Grosslagen in general.
- No id for Dijon or Château de Pommard; no Côte des Bar polygon beyond the Bar-sur-Seine / Bar-sur-Aube cru villages.
