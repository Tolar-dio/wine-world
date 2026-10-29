# Vitis Mundi

An interactive 3D globe atlas of the world's wine places, built for people who care where wine comes from. Spin the globe and every wine-producing country is clickable. Zoom in and the real appellation boundaries appear across borders at once, so Châteauneuf-du-Pape, Barolo and the Mosel's Einzellagen sit on the same screen. Tap any shape for its story: history, terroir, permitted grapes, climate, producers and the sites inside it.

The site lives in `docs/` (static files, no build step needed to serve it). Open `docs/index.html` through any static web server, or enable GitHub Pages on the `docs/` folder.

## What's in it

| | Count |
|---|---|
| Countries with a written profile | 88 |
| Appellation boundaries (AOC/AOP, DOCG/DOC, DO/DOCa, DOP, DAC, AVA, GI, WO, DO Chile, IG Argentina...) | 2,174 |
| Finer units (Burgundy premier cru climats, Corton climats, German Einzellagen in Rheinland-Pfalz, Austrian Rieden in Lower Austria and Burgenland, Alto Adige UGAs) | 6,927 |
| Written appellation profiles | 2,508 (418 shown as points where no open boundary exists) |
| Mapped sites (crus, MGAs, estates, quintas, houses, historic and archaeological places) | 2,712 |
| Grape varieties with DNA parentage | 266 |
| Timeline events, c. 9000 BC to 2026 | 148 |
| Glossary terms / soil types / national quality systems | 204 / 33 / 22 |

Every polygon carries regional climate figures (growing-season temperature, Winkler and Huglin indices, rainfall, elevation), so the map can be coloured by climate as well as by wine style.

## v2: the full site

The GitHub Pages build (`docs/`) adds what a sandboxed page can't do:
- **Base maps:** standard, satellite (EOX Sentinel-2 cloudless plus free national aerial imagery at vine-row resolution where licences allow) and topographic (OpenTopoMap plus national topo maps), 3D terrain, hillshade and contour lines.
- **Sunlight explorer:** set a date and time and see which slopes catch the sun.
- **River journeys:** 3D fly-throughs down the Mosel, Douro, Rhône, Loire, Rhine, Wachau, Gironde and Napa Valley.
- **Terrain for every appellation, cru, Einzellage and Ried:** elevation, slope and an aspect rose from the Copernicus 30 m DEM.
- **Vintages 1950–2025:** growing-season warmth, harvest rain, frost and heat for every place (TerraClimate), annotated with researched vintage events, plus climate drift since 1961–1990 and "time-travel twins".
- **Rules cards:** about 1,450 production-rule cards (varieties, yields, ageing, labelling), verified October 2026.
- **Sommelier tools:** compare up to three places, climate twins, multi-criteria filters, study mode with spaced repetition and map quizzes, and a deductive tasting trainer.
- **Cellar journal:** bottles with structured tasting notes, label photos, notes on any place, visited and wishlist lists, and a passport of classic lists. Stored in Supabase with owner-only row-level security (schema in `pipeline/supabase/migrations/`); works locally when signed out.
- **Photos:** freely licensed Wikimedia Commons photos, credited on every profile.
- **Installable** as a phone app (PWA), with offline access to places already viewed.

## Boundary quality

Each shape says how it was drawn:
- **official**: the legally delimited line (INAO parcel delimitations for France, including every Burgundy and Alsace grand cru; TTB AVA boundaries via UC Davis; Wine Australia GIs; South Africa's Wine of Origin units; Ontario VQA; Brazil's Embrapa delimitations; Alto Adige UGAs; Austrian Rieden).
- **commune**: the union of the municipalities an EU appellation covers, fully or partly (Candiago et al. 2022). These are larger than the vineyard area itself.
- **admin**: administrative units named by the law (Chile's DO comunas, Argentine departments, Japanese prefectures).
- **approx**: best available approximation, flagged in the interface.

German Einzellagen were reconstructed from the official Weinbergsrolle map service, which publishes images rather than vectors, at about 10 m resolution.

Four errors in the EU source dataset were found and fixed: Valdeorras (carried Alicante's municipalities), Chianti Classico (carried the wider Chianti area), Novi Pazar (wrong municipality) and Darnibole (covered all of Cornwall).

## Repository layout

```
docs/                  the published site (index.html + data/ + fonts/)
pipeline/scripts/      data acquisition and processing (geodata, climate, integration)
pipeline/frontend/     page sources; build.py emits the single-file page
pipeline/*.md          the specs the build followed (SPEC, DATA_CONTRACT, briefs)
research/content/      raw research JSON per country group, before integration
research/notes/        research logs with sources, conflicts and open questions
```

Rebuild from research to site: `python3 -I pipeline/scripts/integrate.py` then `python3 -I pipeline/frontend/build.py` (paths inside the scripts assume the original working folder layout; adjust the root if you run them here).

## Sources and licences

Boundaries and base data:
- Candiago S., Tscholl S., Bassani L., Fraga H., Egarter Vigl L. (2022). A geospatial inventory of regulatory information for wine protected designations of origin in Europe. *Scientific Data* 9:394. CC BY 4.0.
- INAO, Délimitation parcellaire des AOC viticoles (data.gouv.fr). Licence Ouverte 2.0.
- UC Davis Library AVA Digitizing Project. CC0.
- Wine Australia GI boundaries (data.gov.au). CC BY 4.0.
- Autonome Provinz Bozen-Südtirol, UGA and DOC zones. CC0.
- Amt der NÖ Landesregierung and Amt der Burgenländischen Landesregierung, Weinbau Rieden. CC BY 4.0.
- Landwirtschaftskammer Rheinland-Pfalz / LGB-RLP, Weinbergsrolle Einzellagen. dl-de/by-2.0.
- swisstopo swissTLM3D and swissBOUNDARIES3D, cantonal vineyard registers. Open data with attribution.
- OMAFRA ON_VQA_Areas (Ontario Wine Appellation Authority); Brock University Map, Data & GIS Library, Niagara sub-appellations.
- geoBoundaries (William & Mary geoLab), per-country licences (CC BY 3.0 IGO, CC BY 4.0, OGL v3, ODbL).
- Eurostat GISCO LAU, © EuroGeographics.
- Natural Earth (public domain). © OpenStreetMap contributors (ODbL) for added rivers, lakes and towns.
- TerraClimate 1991–2020 climatology (Abatzoglou et al. 2018), CC0. WorldClim 2.1 elevation (Fick & Hijmans 2017).
- Fonts: Literata and IM FELL via Google Fonts, SIL Open Font License.

**Sources with no stated licence (check before wide public promotion):** VinPro/SAWIS Wine of Origin layer (South Africa), IDE Mendoza cadastral districts (Argentina), Embrapa GeoInfo (Brazil), and the BC Geographical Indication ArcGIS layer (Canada). Chile's DO comuna lists were transcribed from Spanish Wikipedia's annex, which cites the LeyChile decree texts.

Text was researched against national registers (eAmbrosia, INAO, TTB, Wine Australia, IPONZ, INV, SAG), interprofessions and consortia, OIV statistics, VIVC for grape pedigrees, and the sources listed in `research/notes/`. Coordinates marked "approx" in the data are placed on the right slope or village but not from cadastral data.
