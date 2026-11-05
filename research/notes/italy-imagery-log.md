# Italy high-definition aerial imagery log (Vitis Mundi)

Agent: Italy imagery engineer, 5 Nov 2026. Goal: replace blurry Sentinel-2 (10 m) at vineyard zoom with openly licensed
aerial orthophotos (<= 50 cm, ideally 20 cm) for Italy's wine regions.

Files changed: `frontend/src/v2_map.js` (CREDIT, NAT, `agea()` helper, vmimg id regex), `site/data/map/cover.json`
(new `it-ag22`, `it-ag23`, `it-ag24`, `it-bz`; rebuilt `it-to`, `it-pm`), `site/data/meta.json` (sources),
`frontend/pwa_assets.py` (TILE_HOSTS). Backups of the originals: `work/italy_imagery_backup/`.
Coverage builder: `/tmp/claude-0/-home-claude/90b40977-645f-5938-93b5-ef5c99e44196/scratchpad/work/mkcover.py` (copied to
`work/italy_imagery_backup/mkcover.py`). Test: `work/italy_imagery_backup/test_italy.py`; screenshots in `work/italy_imagery_shots/`.

## Headline finding: AGEA orthophotos are now CC BY 4.0, with a public tiled service

AGEA (Agenzia per le Erogazioni in Agricoltura) flies all of Italy at 20 cm, one third of the regions per year. Until
2026 the orthos were "TUTTI I DIRITTI RISERVATI" (all rights reserved) under the AGEA-CISIS agreement, which is why
regional re-publications (Veneto, Sardegna, Emilia-Romagna, Lombardia, Puglia) carry watermarks or "restricted use"
terms. On 26 Aug 2026 AGEA launched the GeoPortale AGEA (https://geoportale.agea.gov.it) and its Note legali state:

> "Le ortofoto RGB, in formato GeoTiff, scaricabili dal GeoPortale AgEA sono messe a disposizione per il riutilizzo alle
> condizioni della licenza Creative Commons BY 4.0."
> (en: "The RGB orthophotos ... are made available for re-use under the terms of the Creative Commons Attribution 4.0
> (CC BY 4.0) licence.") Source: https://geoportale.agea.gov.it/legal-notes (text read from the site's own
> assets/i18n/it.json and en.json, key legalNotes.copyright.paragraph3).

Press coverage confirming it: GIS, BIM e Infrastrutture, 7 Sep 2026, "Ora le ortofoto AGEA sono davvero Open"
(https://www.gisinfrastrutture.it/2026/09/ora-le-ortofoto-agea-sono-davvero-open/): "la licenza CC BY 4.0 per dati e
servizi del Geoportale ... con obbligo di attribuzione ad AGEA e indicazione delle eventuali modifiche"; geocorsi.it
and servicematica.com say the same and date the change to the 26 Aug 2026 Note legali update.

The portal says it has no WMS "for direct GIS integration", but its viewer (ArcGIS Enterprise, web map
118d33c88d7e48b49d47fb515b8ad71a) reads three public, keyless, cached ImageServers:

| Service | Regions flown (Quadro_Unione FeatureServer) |
|---|---|
| `https://geoportale.agea.gov.it/image/rest/services/AgEA/Ortofoto_AgEA_2022/ImageServer` | Liguria, Puglia, Marche, Abruzzo, Toscana, Sardegna, Sicilia |
| `.../Ortofoto_AgEA_2023/ImageServer` | Umbria, Lazio, Friuli Venezia Giulia, Campania, Basilicata, Emilia-Romagna, Trentino-Alto Adige |
| `.../Ortofoto_AgEA_2024/ImageServer` | Calabria, Lombardia, Molise, Piemonte, Valle d'Aosta, Veneto |

- Tiling: WKID 102100/3857, origin -20037508.34, 256 px, GoogleMapsCompatible resolutions; cache levels 0-18
  (`maxLOD 18`), so `max: 18` (MapLibre overzooms beyond). Pixel size 0.2 m. URL `.../ImageServer/tile/{z}/{y}/{x}`.
- Format: JPEG where flown; a fully transparent 876-byte PNG (RGBA) where that year has no flight, so the per-year
  coverage polygons can overlap safely at region borders.
- CORS: echoes any Origin (`Access-Control-Allow-Origin: https://vitismundi.app`, also `http://127.0.0.1:8771`,
  with Allow-Credentials). The vmimg protocol's `fetch(mode: 'cors', credentials: 'omit')` works.
- Tiles fetched and inspected at z18: Barolo (2024), Valdobbiadene (2024), Etna (2022), Taurasi (2023): sharp,
  no watermark.
- Caveat: these ImageServers are the viewer's backend, not an advertised API. The licence covers the orthophotos
  themselves, and AGEA's own statement covers "dati e servizi". If AGEA adds tokens or blocks third-party origins, the
  layers fail quietly (vmimg returns empty tiles, Sentinel-2 shows through).

## Per-region results

| Region | Best open service found | Year / res. | 3857 | CORS | Licence | Used? |
|---|---|---|---|---|---|---|
| Piemonte | AGEA 2024 ImageServer | 2024 / 20 cm | yes | yes | CC BY 4.0 | yes (`ni-it-ag24`) |
| Piemonte (regional) | geomap.reteunitaria.piemonte.it ortoregp2018/2021 WMS | 2018/2021 | n/a | n/a | n/a | no: every connection reset (as in earlier phases) |
| Valle d'Aosta | AGEA 2024 | 2024 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Lombardia (Valtellina, Franciacorta, Oltrepò) | AGEA 2024 | 2024 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Lombardia (regional) | cartografia.servizirl.it Ortofoto2021 | 2021 (AGEA) | ? | ? | Lombardia: AGEA orthos for public bodies only | no: guessed endpoints 400; regional terms restrictive |
| Alto Adige | Provincia di Bolzano WMTS `p_bz-Orthoimagery:Aerial-2023-RGB`, `https://geoservices.buergernetz.bz.it/mapproxy/root/wmts/p_bz-Orthoimagery:Aerial-2023-RGB/EPSG_3857/{zz}/{x}/{y}.png` (matrix ids zero-padded "00".."24"; serves JPEG) | 2023 / 20 cm | yes (EPSG_3857, 25 levels) | yes (echoes origin) | Open Data Alto Adige dataset `ortofoto-2023`: licence field CC0, notes "L'utilizzo dei dati è vincolato dal rispetto delle condizioni di cui al modello di licenza Creative Commons BY 4.0" (https://data.civis.bz.it/it/dataset/ortofoto-2023). Credited as CC BY 4.0 (the stricter) | yes (`ni-it-bz`, on top of AGEA 2023; real detail at z19) |
| Trentino | AGEA 2023 | 2023 / 20 cm | yes | yes | CC BY 4.0 | yes (`ni-it-ag23`) |
| Trentino (regional) | siat.provincia.tn.it/geoserver | 2015 | | | | no: the public GeoServer only has index sheets (qu_ortofoto_2015), no ortho layer |
| Veneto | AGEA 2024 | 2024 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Veneto (regional) | idt2.regione.veneto.it | AGEA 2015-2024 | | | regione.veneto.it/web/ambiente-e-territorio/ortofoto: "ORTOFOTO 20 cm [2024] AGEA – TUTTI I DIRITTI RISERVATI", free for local authorities only | no (404 on GetCapabilities; licence closed) |
| Friuli Venezia Giulia | AGEA 2023 | 2023 / 20 cm | yes | yes | CC BY 4.0 | yes |
| FVG (regional) | `https://irdat-ortofoto.regione.fvg.it/geoserver/ows`, layers `ortofoto:trueorto_FVG_1720` (true ortho 2017-2020), `ortofoto:ortofoto2012` (20 cm) | 2020 | yes | **no ACAO header** | not stated | no: no CORS, so WebGL cannot use the tiles |
| Emilia-Romagna | AGEA 2023 | 2023 / 20 cm | yes | yes | CC BY 4.0 | yes |
| ER (regional) | `https://servizigis.regione.emilia-romagna.it/wms/agea2023_rgb` layer `Agea2023_RGB` (also agea2020_rgb) | 2023 / 20 cm | yes | yes | ER catalogue: "Utilizzo ristretto dei dati ... Il Prodotto è concesso in Licenza d'uso a Regione Emilia-Romagna ... Solo consultabili" (https://geoportale.regione.emilia-romagna.it/catalogo/dati-cartografici/cartografia-di-base/immagini/layer-16) | no: same imagery as AGEA 2023, use AGEA's own CC BY service instead |
| Toscana | Regione Toscana Geoscopio WMS `https://www502.regione.toscana.it/ows_ofc/com.rt.wms.RTmap/wms?map=owsofc_rt`, layer `rt_ofc.5k23.32bit` | 2023 / 20 cm | yes | yes (`*`) | Metadata "Regione Toscana - Ortofoto anno 2023": "I dati sono di titolarità della Regione Toscana" and "La risorsa è liberamente accessibile e usabile con licenza CC BY 4.0" (https://www502.regione.toscana.it/geonetwork/srv/api/records/r_toscan:66ca3807-815a-4bd1-b626-98ca240d72a2) | yes (`ni-it-to`, replaces the old layer, on top of AGEA 2022) |
| Toscana (old layer) | `map=owsofc`, `rt_ofc.5k22.32bit` | 2022 | | | **burned-in watermark "Ortofoto 2022 copyright AGEA - licenza d'uso concessa a Regione Toscana"**: not open | replaced |
| Toscana (2024/25) | `map=owsofc_rt`, `rt_ofc.5k24.32bit` | 2024/25 | yes | yes | region-owned | not used: leaf-off winter flight (bare vines, long shadows) and a "Fonte dei dati: Regione Toscana" watermark; 2023 summer is clearly better for vineyards |
| Umbria | AGEA 2023 | 2023 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Umbria (regional) | siat.regione.umbria.it | | | | | connection reset |
| Marche | AGEA 2022 | 2022 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Marche (regional) | wms.cartografia.marche.it | | | | | TLS certificate expired |
| Lazio | AGEA 2023 | 2023 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Lazio (regional) | geoportale.regione.lazio.it/geoserver `geonode:2023_AGEA_25833_COG` | 2023 (AGEA) | | | AGEA imagery | no: same imagery as AGEA 2023 |
| Abruzzo | AGEA 2022 | 2022 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Abruzzo (regional) | geocatalogo.regione.abruzzo.it ERDAS WMS (Ortofoto 2022 AGEA) | 2022 | | | AGEA | no: http only (mixed content on https), same imagery |
| Molise | AGEA 2024 | 2024 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Campania | AGEA 2023 | 2023 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Campania (regional) | sit2.regione.campania.it | | | | | 404 |
| Puglia | AGEA 2022 | 2022 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Puglia (regional) | webapps.sit.puglia.it Ortofoto2019 ImageServer | 2019 (AGEA) | | | unclear (OSM community thread) | no: https timed out; http only |
| Basilicata | AGEA 2023 | 2023 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Basilicata (regional) | rsdi.regione.basilicata.it | | | | | connection reset |
| Calabria | AGEA 2024 | 2024 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Calabria (regional) | geoportale.regione.calabria.it | | | | | connection reset |
| Sicilia (Etna, Pantelleria, Marsala) | AGEA 2022 | 2022 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Sicilia (regional) | map.sitr.regione.sicilia.it (ATA 2007-08, 2012-13) | old | | | not stated | no: old; guessed WMS paths 400 |
| Sardegna | AGEA 2022 | 2022 / 20 cm | yes | yes | CC BY 4.0 | yes |
| Sardegna (regional) | `https://webgis.regione.sardegna.it/geoserverraster/ows` layers `raster:Mosaico_2022_GB`, `raster:Mosaico_ortofoto_2019`, `raster:ortofoto_2016` | 2016-2022 / 20 cm | yes | yes | **all watermarked** "Ortofoto © MASAF-AGEA 2022 / © AGEA / © Consorzio TeA - Tutti i diritti riservati" | no |
| Liguria | AGEA 2022 | 2022 / 20 cm | yes | yes | CC BY 4.0 | yes |
| National PCN (Geoportale Nazionale) | `wms.pcn.minambiente.it/ogc?map=/ms_ogc/WMS_v1.3/raster/ortofoto_colore_12.map`, layers `OI.ORTOIMMAGINI.2012.32/.33` | 2012 / 50 cm | yes | | AccessConstraints "Nessuno" | no: https redirects (301) to http only, so browsers block it as mixed content on https://vitismundi.app; also 14 years old and superseded by AGEA 2022-24 |

## Layer order (v2_map.js NAT, later = on top)

`ni-it-ag22`, `ni-it-ag23`, `ni-it-ag24` (disjoint regions, transparent outside each year's flight), then
`ni-it-to` (Regione Toscana 2023, newer than AGEA 2022 for Tuscany) and `ni-it-bz` (Bolzano 2023, real detail to
z19 vs AGEA's z18 cache). AGEA stays underneath both as a fallback if a regional server fails.

## Coverage polygons (cover.json)

Built from Natural Earth 10m admin-1 (public domain; Italian provinces dissolved by their `region` field). Each
year's union is buffered outward by at least the simplification tolerance (1-2.8 km) so no flown land is cut off
(checked: 100% of the source regions inside), simplified until every ring is under 190 vertices, islands < 2e-4 deg²
dropped (Pantelleria, Salina, Elba and Lampedusa are kept). `it-to` and `it-pm` were rebuilt the same way: the old
entries were nested one level too shallow (`poly` as a list of rings instead of a list of polygons), which made
loadCover() produce NaN rings, so Tuscany's old layer was never clipped or gated correctly.

| key | polygons | max ring | vertices |
|---|---|---|---|
| it-ag22 | 19 | 158 | 455 |
| it-ag23 | 7 | 180 | 446 |
| it-ag24 | 3 | 180 | 250 |
| it-to | 6 | 179 | 238 |
| it-pm | 1 | 182 | 182 (unused by NAT, kept and fixed) |
| it-bz | 1 | 152 | 152 |

Note: `frontend/make_mapdata.py` regenerates cover.json without any Italian keys (they were added by hand). Re-running
it would drop them; port the builder into make_mapdata.py before the next run.

## Code changes in v2_map.js

- CREDIT: `rtosc` now "Ortofoto 2023 © Regione Toscana" (CC BY 4.0, link to geoscopio/ortofoto.html); new `agea`
  ("Ortofoto AGEA 2022-2024", CC BY 4.0) and `bz` ("Orthofoto 2023 © Autonome Provinz Bozen-Südtirol").
- New helper `agea(yr)`; NAT entries above.
- vmimg protocol id regex `[a-z-]+` widened to `[a-z0-9-]+` (the new ids contain digits).
- pwa_assets.py TILE_HOSTS: added `geoportale.agea.gov.it`, `geoservices.buergernetz.bz.it` (www502.regione.toscana.it
  was already there).

## Test

Build `python3 -I frontend/build.py` OK. Served with `frontend/serve.py 8771 --gh`; headless Chromium (swiftshader) through
HTTPS_PROXY, bypass 127.0.0.1; `setBase('satellite')`; `VM.map.jumpTo` per spot; screenshots in
`work/italy_imagery_shots/<spot>.png`, results in `results_10.json` (the first run crashed the page after 10 spots, a
swiftshader memory limit over one long session, so the script now opens a fresh page every 3 spots).

| Spot | z | Layer seen | Result |
|---|---|---|---|
| Barolo, La Morra 7.93,44.63 | 16, 18 | AGEA 2024 | vine rows sharp, MGA lines on top |
| Valpolicella, Fumane 10.89,45.54 | 16 | AGEA 2024 | pergola/terrace rows sharp |
| Prosecco, Valdobbiadene 12.00,45.90 | 16 | AGEA 2024 | sharp |
| Alto Adige, Tramin 11.24,46.34 | 16, 18 | Bolzano 2023 | sharp to z19 (tile checked by curl) |
| Trentino, Lavis 11.11,46.14 | 16 | AGEA 2023 | sharp |
| Franciacorta 10.00,45.62 | 16 | AGEA 2024 | vine rows sharp |
| Collio 13.47,45.97 | 16 | AGEA 2023 | sharp |
| Lambrusco, Castelvetro 10.95,44.50 | 16 | AGEA 2023 | sharp |
| Chianti, Panzano 11.31,43.54 | 16, 18 | Regione Toscana 2023 | vine rows sharp |
| Montefalco 12.65,42.89 | 16 | AGEA 2023 | sharp |
| Verdicchio, Cupramontana 13.12,43.45 | 16 | AGEA 2022 | sharp |
| Frascati 12.68,41.80 | 15 | AGEA 2023 | sharp |
| Montepulciano d'Abruzzo, Tollo 14.30,42.34 | 15 | AGEA 2022 | sharp |
| Taurasi 14.96,41.01 | 16 | AGEA 2023 | sharp |
| Aglianico del Vulture, Barile 15.67,40.95 | 15 | AGEA 2023 | sharp |
| Manduria 17.63,40.40 | 16 | AGEA 2022 | sharp |
| Cirò 17.10,39.38 | 15 | AGEA 2024 | sharp |
| Etna, Passopisciaro 15.01,37.86 | 16, 18 | AGEA 2022 | alberello/row blocks sharp |
| Cannonau, Mamoiada 9.28,40.21 | 16 | AGEA 2022 | sharp |
| Pantelleria 11.98,36.78 | 15 | AGEA 2022 | covered (small island kept in the polygon) |

Network: 546 AGEA tiles, 48 Bolzano and 48 Toscana tiles, all HTTP 200; 0 failed requests to the Italian hosts.
The attribution line switches correctly ("Ortofoto AGEA 2022-2024", plus "Orthofoto 2023 © Autonome Provinz
Bozen-Südtirol" or "Ortofoto 2023 © Regione Toscana" where those are in view). Console: no imagery errors; the only
error is a 404 for `data/depth/index.json` (the depth-pack index, not part of this work).
Note: the `sourcedata` counters in the script fire for every source whose bounds touch the view, including empty
vmimg tiles, so the screenshots are the evidence, not the counts.

## Follow-ups / caveats

- AGEA ImageServers are the GeoPortale viewer's backend, not an advertised API (licence and CORS are fine). Watch for
  token changes. A courtesy email to AGEA could secure it.
- `scripts/depth3d_registry.py` (not touched) still credits "Regione Toscana AGEA ortho" for the Chianti depth pack, and
  Barolo has `imagery: None`; it could now use `ni-it-ag24` with credit "Ortofoto AGEA 2024, CC BY 4.0".
- `frontend/make_mapdata.py` would drop the Italian cover.json keys if re-run (see above).
- `wms.pcn.minambiente.it` is still in TILE_HOSTS but nothing uses it (left as is).
- A newer Tuscany 2025 layer (`rt_ofc.5k25.32bit`) exists with partial coverage; recheck when complete, and check that
  it is a summer flight.
