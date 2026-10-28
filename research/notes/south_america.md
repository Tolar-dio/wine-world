# South America: wine regions, appellations and sites (Chile, Argentina, Uruguay, Brazil, Peru, Bolivia, Paraguay, Colombia, Venezuela, Ecuador)

Deliverable: `/home/claude/winesite/data/content/c11_south_america.json` (10 countries, 40 regions, 276 appellation profiles, 126 sites; valid JSON, no em/en dashes, no banned words). Build scripts: `/home/claude/winesite/scripts/c11/` (`cl_apps.py`, `cl.py`, `ar_apps.py`, `ar.py`, `uy.py`, `br.py`, `pe_bo.py`, `minor.py`, `merge.py`); per-country part files in `/home/claude/winesite/work/c11/parts/` (kept outside `data/content/` so the integrator does not double-load them). Rerun: `python3 -I scripts/c11/<iso>.py` then `python3 -I scripts/c11/merge.py`.

Polygon join check (simulated with the integrator's own `keys_of`/`norm` functions): all 112 Chile polygons and all 95 Argentina polygons in `site/data/geo/{cl,ar}.geojson` are matched by exactly one profile. Ambiguous Argentine names that occur twice in the INV register (Luján de Cuyo DOC and IG, San Rafael DOC and IG, San Martín, Rivadavia, San Carlos, Sarmiento in two provinces) carry explicit `id`s. Profiles with no polygon (7 in Chile, 26 in Argentina, and every Uruguay, Brazil, Peru and Bolivia profile) carry `lat`/`lon` with `coord_quality: approx`, so they map as points. Each was checked to fall inside the right parent polygon. Site coordinates come from OpenStreetMap Nominatim and Photon lookups, checked against the polygons.

Research method note: two usage-cap interruptions and two exhaustions of the shared web-search budget occurred. After the last exhaustion I relied on documents already fetched plus direct fetches of known URLs, and I removed or softened claims I could not verify (listed under Gaps).

## Chile: history, DO structure (Decree 464 and amendments), regions, estates

### Takeaway
Chile's DO map is Decree 464 of 14 Dec 1994: 6 regions, subregions, zones and commune-based areas. It was amended to add the Secano Interior special DO (País/Cinsault), the Costa / Entre Cordilleras / Andes label complements (85% rule), four 2018 DOs (Apalta, Los Lingues, Licantén, Lo Abarca), and in 2025 a Chiloé subregion and a Rapa Nui-Isla de Pascua area. In July 2026 Secano Interior was extended to seven Biobío communes. The vineyard is shrinking: 126,250 ha in 2024, down from 145,320 ha in 2020.

### Cited Findings
- Decree 464 dated Santiago 14 Dec 1994, published 26 May 1995; full list of regions (Atacama, Coquimbo, Aconcagua, Valle Central, Sur, Austral), subregions, zones (Leyda, Cachapoal, Colchagua, Teno, Lontué, Claro, Loncomilla, Tutuvén) and areas with their commune definitions; 75% origin/variety/vintage rules; quality terms (Superior, Reserva, Gran Reserva etc.) based on alcohol and oak — [SAG consolidated Decree 464](https://sag.cl/sites/default/files/decreto_ndeg_464.pdf)
- Art. 5 bis: complements "Andes", "Entre Cordilleras", "Costa" require ≥85% from areas with that condition; the list of areas for each, and Casablanca may use "Costa" — [SAG Decree 464](https://sag.cl/sites/default/files/decreto_ndeg_464.pdf)
- Art. 3 bis: Secano Interior special DO for País and Cinsault from named secano areas; País synonyms Mission and Criolla — [SAG Decree 464](https://sag.cl/sites/default/files/decreto_ndeg_464.pdf)
- Decree 4 (30 Jan 2026), published 14 Jul 2026, adds Hualqui, Nacimiento, Los Ángeles, Laja, San Rosendo, Santa Juana and Tomé to Secano Interior and allows dealcoholised wines DO mentions — [Diario Oficial 14 Jul 2026](https://www.diariooficial.interior.gob.cl/publicaciones/2026/07/14/44499/01/2835807.pdf)
- Decree 27 (14 Nov 2024), published 14 May 2025: Austral region gets subregion Chiloé (whole archipelago); new numeral 7 "Área Rapa Nui - Isla de Pascua"; justification cites climate change widening viticultural latitude — [Diario Oficial 14 May 2025](https://www.diariooficial.interior.gob.cl/publicaciones/2025/05/14/44148/01/2643653.pdf)
- July 2024 announcement of new varieties (39 or 51 reported) and the Rapanui/Chiloé DOs — [SAG news](https://www.sag.gob.cl/noticias/ministro-valenzuela-anuncia-incorporacion-de-nuevas-variedades-y-nuevas-denominaciones-de-origen-para-el-vino-chileno); [BioBioChile](https://www.biobiochile.cl/noticias/economia/actualidad-economica/2024/07/30/se-suman-al-merlot-cabernet-y-otros-gobierno-oficializa-nuevas-variedades-para-el-vino-chileno.shtml)
- 2018 DOs: Apalta 1,007 ha (Entre Cordilleras; Lapostolle, Montes, Neyen, Santa Rita, Ventisquero, Las Niñas), Los Lingues 492 ha (Andes; Koyle about 80 ha, Casa Silva, Siegel), Licantén 124 ha (Costa; La Ronciere, Idahue vineyard planted 2012, 24 km from sea), Lo Abarca 44.5 ha (Costa; Casa Marín, planted 2000, 4 km from sea); Quebrada Seca (Limarí) refused — [SevenFifty Daily](https://daily-test.sevenfifty.com/what-you-need-to-know-about-chiles-new-dos); [The Drinks Business 2018](https://www.thedrinksbusiness.com/2018/07/chile-breaks-ground-with-signing-of-four-new-dos/)
- Los Lingues DO created by Supreme Decree 56 of 2017; Supreme Court (25 June 2026, Rol 10.160-2026) rejected nullity claim by a holder of "Los Lingues" trademarks registered since 1983 — [Actualidad Jurídica DOE](https://actualidadjuridica.doe.cl/corte-suprema-confirma-rechazo-de-nulidad-contra-la-denominacion-de-origen-los-lingues/)
- Catastro 2024: 126,249.6 ha total; 116,962.2 ha wine grapes (84,768 red, 32,194 white), 9,287.4 ha pisco grapes; Maule 48,565 ha (41.5%), O'Higgins 36,026 ha, Ñuble 10,323 ha, Metropolitana 8,898 ha; total fell from 145,320.5 ha (2020) — [SAG Catastro 2024](https://www.sag.cl/sites/default/files/Informe%20ejecutivo%20Catastro%202024%20v2.0.pdf)
- 2026 production 949,476,173 L (+13.2%), of which 790.8 M L DO; Valle Central 83.7% of DO volume; Maule region about 48% of all wine; Cabernet Sauvignon 27.5%, Sauvignon Blanc 17.6%, Merlot 12.2%, Chardonnay 11.6%, Carmenère 7.8% of DO wine; Secano Interior 5.4 M L — [SAG Informe Cosecha 2026](https://www.sag.cl/sites/default/files/Informe%20Cosecha%202026.pdf)
- OIV 2025: Chile 8.4 mhl (8th), vineyard 154 kha (all grapes) — [OIV State of the World Wine Sector 2025](https://www.oiv.int/sites/default/files/2026-05/OIV_State_of_the_World_Wine_Sector_in_2025_PPT.pdf)
- Carmenère identified 24 Nov 1994 by Jean-Michel Boursiquot among "Merlot" vines at Viña Carmen, Maipo — [BioBioChile](https://www.biobiochile.cl/noticias/2014/09/30/carmenere-la-cepa-extinta-que-chile-redescubrio-y-convirtio-en-su-vino-insigne.shtml); officially recognised 1998, "Merlot Peumal" nickname — [Wikipedia Carmenère](https://en.wikipedia.org/wiki/Carm%C3%A9n%C3%A8re)
- Vines c. 1554 via Peru; Ochagavía 1851; Errázuriz 1870; phylloxera-free; Torres 1979; Berlin Tasting 2004 (Viñedo Chadwick 2000, Seña 2001); Malleco rainfall about 1,300 mm; 1795 Concepción to Lima shipment (Peru article) — [Wikipedia Chilean wine](https://en.wikipedia.org/wiki/Chilean_wine); [Wikipedia Peruvian wine](https://en.wikipedia.org/wiki/Peruvian_wine)
- 2022 controversy over opening País and Cinsault to all DOs — [Radio Agricultura](https://www.radioagricultura.cl/programas/el-agro/vinateros-del-itata-critican-modificacion-a-decreto-que-libera-cepas-pais-y-cinsault-para-todas-las-denominaciones-de-origen_20220309/)

### Inferences
- Because DO units follow municipal lines, the Costa / Entre Cordilleras / Andes complements are better stylistic guides than the valley names; the profiles state the complement each area may use.
- Region-level area figures in the JSON use SAG administrative-region numbers where the DO region matches an administrative region (Coquimbo, Aconcagua/Valparaíso, Maipo/Metropolitana, Rapel/O'Higgins). Where they do not match (Maule administrative region includes Curicó; Sur spans Ñuble, Biobío and Araucanía), I left `area_ha` out.

### Gaps
- Could not fetch the BCN/LeyChile consolidated text including the 2018 decree that created Apalta, Licantén and Lo Abarca (the SAG PDF predates it); the 2018 DOs' exact legal names and decree numbers (other than Los Lingues, D.S. 56/2017) come from trade press.
- The year of the Costa/Entre Cordilleras/Andes amendment is given as 2011 (first labels about 2012) from trade sources; I did not see the amending decree itself. The Secano Interior insertion date is not verified (stated only as an amendment).
- VIGNO rules (≥65% Carignan, dry-farmed vines over 30 years, two years ageing) are from memory; the search budget ran out before I could verify them, so they appear only as a nerd note marked as private association rules.
- Some estate details are from general knowledge and were softened where I was unsure (e.g. Viñedo Chadwick 100-point score attributed to the 2014 vintage, Cousiño Macul cellar dates). The Carmen site coordinate is approximate (Alto Jahuel), since Nominatim had no entry.

## Argentina: history, IG/DOC law and register, regions, estates

### Takeaway
Law 25.163 (1999) and Decree 57/2004 create IP, IG and DOC. INV's register held 110 IGs and 2 DOCs (Luján de Cuyo, San Rafael) in 2023, plus at least 8 IGs added since (El Hoyo 2023; Tamberías, Hilario, Sorocayense 2024; Tandil 2024; Valle de Pucará, Alto Agrelo, Valles Templados 2025). Gualtallary was still a "mención precaria" in INV statistics. Malbec: 47,064 ha of 199,946 ha total (2024). The 2026 vintage was 9.7 million hl.

### Cited Findings
- Full register list (names, provinces, resolutions) used for all IG profiles — [INV IG and DOC list](https://www.argentina.gob.ar/sites/default/files/i.g._y_d.o.c._de_la_republica_argentina.pdf_.pdf.pdf_.pdf)
- Law 25.163 categories; 110 IGs + 2 DOCs; IG use stats 2022 (Valle de Uco 41% of IG sales, 45% of exports; Paraje Altamira US$20.4/L; Gualtallary marked "mención precaria"; DOC Luján de Cuyo exports 382,866 L, domestic 511,537 L) — [INV Vinos con Denominación de Origen, July 2023](https://www.argentina.gob.ar/sites/default/files/2018/12/vinos_con_denominacion_de_origen_0.pdf)
- New IGs: Tamberías, Hilario, Sorocayense (Res. 35-37/2023, Feb 2024) — [Los Andes](https://www.losandes.com.ar/fincas/el-inv-reconocio-tres-nuevas-indicaciones-geograficas-cuales-son-y-donde-quedan); Tandil Res. 24/2024 — [Marval](https://www.marval.com/Publicacion/nueva-indicacion-geografica-para-vinos-16882?lang=en); Valle de Pucará Res. 8/2025 (Finca de los Viñedos Imposibles) — [Marval](https://www.marval.com/Publicacion/nueva-indicacion-geografica-para-vinos-17148?lang=en); Alto Agrelo Res. 27/2025 (Grupo Avinea, 232 ha organic estate) — [Marval](https://www.marval.com/Publicacion/nueva-indicacion-geografica-para-vinos-17259?lang=en), [Harpers](https://harpers.co.uk/news/fullstory.php/aid/34514/Alto_Agrelo_awarded_Geographical_Indication_status.html); Valles Templados Res. 28/2025 — [Mendoza Post](https://www.mendozapost.com/economia/valles-templados-la-nueva-indicacion-geografica-que-reconocio-el-inv/); El Hoyo Res. 25/2023 (Patagonian Wines, Bernardo Weinert, about 28 ha) — [Bichos de Campo](https://bichosdecampo.com/a-pedido-de-una-bodega-se-reconocio-a-zona-patagonica-de-el-hoyo-como-una-nueva-indicacion-geografica-protegida); El Peral Res. 1/2022 (Chandon) — [Marval](https://www.marval.com/Publicacion/se-registra-una-nueva-indicacion-geografica-para-vinos-15475?lang=en)
- INV Res. 56/2024: automatic right to departmental/provincial IG — [Marval](https://www.marval.com/Publicacion/se-simplifica-el-tramite-para-usar-una-indicacion-geografica-17032?lang=en); Mercosur wine-GI procedure, Res. SAGyP 94/2026 — [CIRA](https://www.cira.org.ar/?p=25656)
- Paraje Altamira: 2013 after 5 years and about 200 soil pits; enlarged from 4,790 ha (1,400 ha vines) to 9,290 ha (2,800 ha vines); "Paraje" prefix because Altamira is a trademark; San Pablo and Pampa El Cepillo approved 2019 on geology and climate — [South America Wine Guide](https://southamericawineguide.com/the-gis-of-argentina-argentinas-modern-appellation-system/)
- Malbec 47,064 ha at 31 Dec 2024 (23.5% of 199,946 ha; 18 provinces); Mendoza 39,856 ha of 142,785 ha; department tables (Luján 8,920/15,210; San Carlos 5,863/8,825; Tunuyán 5,679/10,197; Tupungato 5,042/10,587; San Martín 25,847 ha total vines etc.); Salta, San Juan and other provinces by department — [INV Informe Malbec 2025](https://argentina.gob.ar/sites/default/files/2018/10/informe_malbec-2025-inv.pdf)
- 2026: grapes 18,613,527 qq (−6.5%), wine 9,700,421 hl (−9.9% from 10,771,719); Mendoza 70.7% of grapes, San Juan 23.1% — [Bichos de Campo, 23 Oct 2026](https://bichosdecampo.com/cada-vez-se-brinda-menos-la-cosecha-de-uva-argentina-registro-una-de-sus-peores-campanas-y-la-produccion-de-vino-retrocedio-casi-10-en-un-ano/); harvest final report 18,391,299 qq (−8%) — [Vinetur](https://www.vinetur.com/20260520101069/argentinas-grape-harvest-falls-8.html) (the two figures differ: harvest report vs annual report)
- OIV 2025: Argentina 10.8 mhl (6th), consumption 7.5 mhl, 21.1 L per capita (15+) — [OIV 2025](https://www.oiv.int/sites/default/files/2026-05/OIV_State_of_the_World_Wine_Sector_in_2025_PPT.pdf)
- 17 April 1853: Quinta Normal project presented to the Mendoza legislature; Pouget brings Malbec; Sarmiento — [Diario de Cuyo](https://www.diariodecuyo.com.ar/sanjuan/Que-se-celebra-20140415-0084.html)
- Santiago del Estero 1557; Mendoza vines early 1560s; railway 1885 and Benegas/Trapiche; 1970s consumption near 90 L — [Wikipedia Argentine wine](https://en.wikipedia.org/wiki/Argentine_wine)
- Catena: founded 1902 (Nicola Catena, Rivadavia); Adrianna planted 1992 at 1,450 m in Gualtallary; pyramid by Pablo Sánchez Elía, late 1990s; La Pirámide 1983; Angélica (Lunlunta) 1922-24; World's Best Vineyard 2023; INV says about 89% of vineyards ungrafted — [Wikipedia Catena Zapata](https://en.wikipedia.org/wiki/Bodega_Catena_Zapata). The Argentine wine article gives 1994 for Adrianna; I used 1992.
- Colomé founded 1831; vineyards 2,300 to 3,111 m; French Malbec and Cabernet 1854 — [Colomé company PDF](https://www.bodegacolome.com/wp-content/uploads/2021/08/COLOME_en.pdf); Calchaquí altitudes, Payogasta about 3,100 m, Pucará IG 2025 — [Bichos de Campo, Valle Arriba](https://bichosdecampo.com/?p=276387)

### Inferences
- Gualtallary is profiled as an IG with an explicit caveat (provisional status). If INV has since granted definitive status, only the `created` field needs changing.
- Department IGs in eastern Mendoza and San Juan are mostly bulk-wine areas; their profiles are short by design.

### Gaps
- No access to the Boletín Oficial (robots-blocked) to confirm whether any IGs were added in 2026 or whether Gualtallary was finalised. Searches found none, but the list may be incomplete.
- Luján de Cuyo DOC creation date: sources give 1989 and 1993 for the original provincial DOC; INV registered it by Res. C.15/2005. The profile states the uncertainty.
- Exact locations of Hilario, Sorocayense, Pozo de los Algarrobos, Cordón del Cepillo and Valles Templados are approximate (locality or valley centroids); Nominatim had no entry for Hilario, Sorocayense or Pozo de los Algarrobos.
- I could not verify the producers for several small IGs (e.g. Balcarce, Villa Ventana, Trevelin); I removed or generalised names I was unsure of.

## Uruguay

### Takeaway
Uruguay has no formal DO system. Labels use the 19 departments, informally grouped into six zones (Metropolitana, Oceánica, Litoral Sur, Litoral Norte, Centro, Norte). Tannat (brought by Pascual Harriague around 1870) covers about 27% of the vineyard. INAVI's 2022 figures: about 6,000 ha in production and about 70 million litres a year.

### Cited Findings
- Harriague, Tannat from Concordia, 1870, Salto; Vidiella's first harvest at Colón on 25 Feb 1883; 1903 wine law; vineyards in 15 of 19 departments — [Wikipedia (es) Vino de Uruguay](https://es.wikipedia.org/wiki/Vino_de_Uruguay)
- VCP and VC categories; 2013 vineyard areas by department (Canelones 5,046 ha, Montevideo 1,073, Colonia 563, San José 502, Maldonado 252 etc.) — [Wikipedia Uruguayan wine](https://en.wikipedia.org/wiki/Uruguayan_wine)
- No formal DO; six informal zones; VCP decree 1993; ban on foreign place names 1993; 100% georeferenced vineyards — [Wine with Seth (secondary)](https://www.winewithseth.com/winewiki/uruguay-wine-law/)
- 1,575 ha of Tannat in 2022 (27%); Uruguay makes nearly a third of the world's Tannat; 4.8 million bottles exported in 2022 for US$18.5m — [Ámbito (INAVI, AFP)](https://www.ambito.com/uruguay/produce-casi-un-tercio-los-vinos-tannat-el-mundo-n5691260)
- About 6,000 ha in production (down from 8,000 ha 25 years earlier), about 70 M litres, 7 M litres exported — [La Mañana, Jan 2022](https://www.xn--lamaana-7za.uy/agro/inavi-prepara-los-proximos-30-anos-de-la-vitivinicultura-nacional)
- Regions narrative: Montevideo and Canelones over 4,500 ha (more than three-quarters of vines); Maldonado first planted 2001 by Alto de la Ballena; Los Cerros de San Juan 1854; Rivera red sands (Cerro Chapeu, Cerros de Oro); Durazno's El Capricho (Verdejo, Mencía) — [Decanter with INAVI, Oct 2026](https://www.decanter.com/wine/uruguay/the-wine-regions-of-uruguay/); [South America Wine Guide](https://southamericawineguide.com/uruguay-wine-regions-guide/)
- Wine declared the national drink, Decree 171/014 — [IMPO / FAOLEX](https://faolex.fao.org/docs/pdf/uru135065.pdf); INAVI structure, Law 18.462 — [FAOLEX](https://faolex.fao.org/docs/pdf/uru85191.pdf)
- 2025 H1 exports 4.04 M litres, Brazil and US 64% — [El Observador](https://www.elobservador.com.uy/agro/exportaciones-vinos-uruguayos-panorama-desafiante-y-el-64-se-embarco-dos-paises-n6008770)

### Inferences
- Uruguay's entries use `cat: "Department"` and carry point coordinates, because no legal polygons exist. If a geo agent adds department polygons, the names match administrative department names.

### Gaps
- No current (2025/2026) INAVI national vineyard or production totals found; the stats block uses 2022 figures, labelled as such.
- Bodega Garzón's opening year (2016), LEED status and Wine Enthusiast 2018 award are from general knowledge; I softened the LEED claim to "sustainability-certified".

## Brazil

### Takeaway
Brazil had 13 wine GIs as of 2025: DOs Vale dos Vinhedos (2012) and Altos de Pinto Bandeira (2022, traditional-method sparkling only), plus IPs Vale dos Vinhedos (2002), Pinto Bandeira (2010), Vales da Uva Goethe (2012), Altos Montes (2012), Monte Belo (2013), Farroupilha (2015), Campanha Gaúcha (2020), Vinhos de Altitude de Santa Catarina (2021), Bituruna (2022), Vale do São Francisco (2022) and Sul de Minas (2025). OIV 2025: 3.0 mhl (+38%).

### Cited Findings
- Sul de Minas IP (Feb 2025), winter wines by double pruning, harvest 1 Jun to 21 Sep, 10 municipalities; Brazil's 13th wine GI; list of the 11 other GIs; only two DOs — [Notícias Agrícolas / Sebrae](https://www.noticiasagricolas.com.br/noticia/394178)
- Altos de Pinto Bandeira DO 2022: 65 km², 520 to 770 m, Chardonnay/Pinot Noir/Riesling Itálico, ≤12 t/ha, traditional method, first wines 2023; Pinto Bandeira IP 2010, 7,960 ha; Vale dos Vinhedos IP Nov 2002 (first GI in Brazil), DO 2012, 11 certified wineries, Merlot and Chardonnay main grapes, red wines aged 12 months — [Jornal do Comércio, Mar 2025](https://www.jornaldocomercio.com/cadernos/empresas-e-negocios/2025/03/1192986-indicacoes-geograficas-preservam-tradicoes-e-fortalecem-a-economia.html)
- RS wine GIs and areas (Altos Montes 173.84 km², Monte Belo 56.09 km² 2013, Vale dos Vinhedos 82 km²) — [Jornal do Comércio, Apr 2026](https://www.jornaldocomercio.com/mapa-economico/regiao-serra/2026/04/1244025-confira-quais-regioes-e-produtos-gauchos-possuem-indicacao-geografica.html)
- Grant dates: Vale dos Vinhedos IP 19/11/2002, Pinto Bandeira 13/07/2010, Vales da Uva Goethe 14/02/2012, Vale dos Vinhedos DO 25/09/2012, Altos Montes 11/12/2012, Monte Belo 01/10/2013, Farroupilha 10/07/2015 — [IBGE GI map 2018](https://geoftp.ibge.gov.br/cartas_e_mapas/mapas_do_brasil/sociedade_e_economia/indicacoes_geograficas_2018.pdf)
- Vale do São Francisco IP published 1 Nov 2022 (RPI 2704), five municipalities, multiple harvests, first tropical wine GI — [Revista Cultivar](https://revistacultivar.com.br/noticias/vale-do-sao-francisco-recebe-reconhecimento-de-indicacao-geografica-para-vinhos-da-regiao)
- Campanha Gaúcha IP May 2020: 14 municipalities, 18 wineries, 36 varieties, 1,512 ha, 31% of national fine wine — [Jornal do Brasil](https://www.jb.com.br/bem_viver/gastronomia/2020/05/1024024-vinhos-do-extremo-sul-gaucho-ganham-indicacao-geografica.html)
- Vinhos de Altitude SC: 29 municipalities, ≥900 m, about 300 ha, about 1 M bottles, ≤7,000 L/ha — [Agência Sebrae](https://agenciasebrae.com.br/?p=3332)
- Bituruna IP 18 Oct 2022, casca dura wines, four wineries — [Agência Sebrae](https://agenciasebrae.com.br/cultura-empreendedora/com-vinhos-de-bituruna-parana-conquista-a-sua-11a-indicacao-geografica/)
- Farroupilha IP for Muscat products (Nov 2015 certificate) — [Revista Cultivar](https://revistacultivar.com.br/noticias/reconhecida-a-indicacao-de-procedencia-farroupilha-para-vinhos-finos-moscateis)
- 84.4 kha vines (IBGE 2025 data for 2024); RS fine-wine production fell 51% in 2024 after 2023 rains — [Embrapa Documentos 141](https://www.infoteca.cnptia.embrapa.br/infoteca/bitstream/doc/1186269/1/Documentos-141.pdf)
- Jundiahy (SP) IP application still under examination in 2026 — [INPI RPI 2883](https://revistas.inpi.gov.br/pdf/Indicacoes_Geograficas2883.pdf)

### Inferences
- Grant date of Vinhos de Altitude de Santa Catarina given as 2021 based on the Sebrae article's sequence (ninth wine GI); not confirmed against the RPI.

### Gaps
- No Brazilian GI polygons exist in the geo layer; all Brazil profiles are points at approximate centroids.
- Some producer founding details are from general knowledge and phrased cautiously (Geisse 1979, Salton 1910, Aurora 1931).

## Peru and Bolivia

### Takeaway
Peru (about 13,000 ha; 19.2 M litres in 2024) has no wine appellations, only the Pisco DO (1991). Bolivia (about 5,000 ha in Tarija) has the Singani DO (Law 1334 of 1992; "gran singani" from grapes grown above 1,600 m). Both are profiled as historic regions with point locations.

### Cited Findings
- Peru: vines in the 1540s (Carabantes), Potosí trade, 1687 earthquake, pisco 90% of grape drinks by 1764, Jesuit expulsion 1767, cotton in the 1860s — [Wikipedia Peruvian wine](https://en.wikipedia.org/wiki/Peruvian_wine); Pisco DO 1991 (Lima, Ica, Arequipa, Moquegua, Tacna valleys), Chile DO 1931 — [Wikipedia Pisco](https://en.wikipedia.org/wiki/Pisco)
- Production 19.1 M L (2023), 377 producers, exports 559,000 L — [Agraria.pe](https://agraria.pe/noticias/entre-2019-y-2023-la-produccion-nacional-de-vinos-crecio-a-u-37251); 13,000 ha, 19.2 M L in 2024, Ica over 50% — [ICEX 2025](https://www.icex.es/content/dam/icex/centros/peru/documentos/2025/estudio-mercado-vino-peru-2025-resumen.pdf)
- Tacama: Olaechea family since 1889, Peynaud consultancy, 1540s claim — [Wine with Seth (secondary)](https://www.winewithseth.com/winewiki/tacama/)
- Bolivia: 80% of the industry in Tarija; Cinti about 300 ha at 2,400 m with vines trained up molle and chañar trees; Cotagaita and Vitichi about 250 ha (2008); wineries Kohlberg, Aranjuez, Campos de Solana, Casa Vieja, Landsuá, Uvairenda — [Wikipedia Bolivian wine](https://en.wikipedia.org/wiki/Bolivian_wine); Tarija vineyards 1589/1590 records, first winery San Pedro (Camargo) 1925, Kuhlmann, national day of wine and singani since 2016 — [Wikipedia (es) Vino de Bolivia](https://es.wikipedia.org/wiki/Vino_de_Bolivia)
- Singani DO zones — [Ley 1334 (1992)](https://www.lexivox.org/norms/BO-L-1334.html); 1,600 m minimum for gran singani, Decree 25569 — [Wikipedia (es) Singani via Hispanopedia](https://es.hispanopedia.com/wiki/Singani); about 5,000 ha in Tarija — [Correo del Sur 2021](https://correodelsur.com/sociedad/20210511/vinos-de-altura-de-bolivia-suenan-con-ganar-mercados-en-el-mundo.html)

### Inferences
- "Bodega Magnus" exists in Tarija (Nominatim shows Calle Enrique Magnus); it is listed only as a producer, with no site, since I could not verify its location.

### Gaps
- No reliable national wine production figure for Bolivia; current Peruvian vineyard area for wine only (vs pisco) not found.

## Paraguay, Colombia, Venezuela, Ecuador

### Takeaway
Short entries. Paraguay: Jesuit vines, then Colonia Independencia (Guairá), about 150 ha (2016) mostly table grapes. Colombia: Boyacá highland wineries (Ain Karim 1988, Marqués de Puntalarga) and tropical Casa Grajales. Venezuela: Bodegas Pomar (Polar and Martell, 1985), Carora, about 80 ha, two harvests a year. Ecuador: three producers (Chaupi Estancia, Dos Hemisferios, Viña del Guayacán).

### Cited Findings
- Paraguay history, Carlos Voigt 1908, no exports — [Wikipedia Paraguayan wine](https://en.wikipedia.org/wiki/Paraguayan_wine); 150 ha, single winery producing about 1,200 L — [ABC Color 2016](https://www.abc.com.py/edicion-impresa/economia/analizaran-potencial-vitivinicola-del-pais-1519825.html); Independencia founded 1919/1920 — [Wikipedia](https://en.wikipedia.org/wiki/Colonia_Independencia)
- Colombia: Ain Karim est. 1988, first Sauvignon Blanc in Colombia; Puntalarga (Pinot Noir, Riesling, Nobsa); Casa Grajales about 7 M L capacity and National Grape Park — [Pelecanus 2026](https://pelecanus.com.co/en/vineyards-colombia/)
- Venezuela: Pomar from Polar + Martell (1985), El Tocuyo trials, 20 varieties tried and 6 adapted, Ecclesia communion wine — [El Diario 2023](https://eldiario.com/2023/11/24/carora-cobija-proyecto-de-vinos-en-venezuela/); 80 ha at Altagracia — [Wikipedia](https://en.wikipedia.org/wiki/Bodegas_Pomar,_C.A.)
- Ecuador: three producers, Chaupi Estancia 2,400 m at Yaruquí; Dos Hemisferios on limestone in Guayas, first wine Paradoja from the 2006 harvest; Viña del Guayacán 2017 in Zapotillo; two harvests a year, vines rarely live past 25 years — [Primicias 2022](https://primicias.ec/noticias/el-chat/tres-vinedos-mitad-mundo-vinos-ecuador)

### Inferences
- Minor countries have no appellation profiles (no legal appellations exist); their content is the country entry plus sites.

### Gaps
- No OIV or national statistics for these four countries; the Venezuelan grape list was left generic because the six adapted varieties could not be verified.
