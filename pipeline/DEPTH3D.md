# Depth packs (high-resolution 3D terrain + vectors)

Lazy-loading "depth packs" that upgrade six flagship appellations inside the Vitis Mundi globe. Zooming into a
packed region serves lidar/DTM-derived terrain tiles (instead of the 30 m Terrarium), drapes the national
ortho over it, and adds vineyard and building layers. Everything is additive and fails quiet: without a pack,
the globe is exactly what it was.

## How it works

- **Front end** `pipeline/frontend/src/modules/60_depth.js` registers a `vmterrain://` MapLibre protocol and a
  minimal PMTiles v3 reader (Hilbert tile ids, gzip directories, matching `pmtiles.writer`). `dem-terrain` and
  `dem-shade` point at `vmterrain://{z}/{x}/{y}` (see `v2_map.js ensureDem`): inside a pack the protocol serves
  that pack's tiles, outside it proxies the 30 m Terrarium, so there is exactly one seamless terrain source.
- **Registry** `docs/data/depth/index.json` lists each pack: bbox, zoom range, terrain archive, vector layers,
  imagery and credits. The module activates packs by camera bbox + zoom (LRU of two), adds vineyard `fill` and
  building `fill-extrusion` layers, and notes availability in the appellation profile.
- **Pipeline** `pipeline/scripts/depth3d_terrain.py` mosaics DEM tiles, reprojects to Web Mercator, feathers the
  pack edge towards the Terrarium tiles the app falls back to (so the seam is invisible), and writes one
  terrarium-encoded PMTiles pyramid. `depth3d_vectors.py` fetches OSM vineyards/buildings (Overpass) as GeoJSON.
  `depth3d_registry.py` emits `index.json` + `credits.json`.

## Regions and status

| Region | id | Terrain | Vectors | Imagery |
|---|---|---|---|---|
| Napa Valley | `us-napa-valley` | USGS 3DEP 1/3 arc-sec (~10 m), z9â€“13 | vineyards + buildings | NAIP (`ni-us`) |
| Sonoma Valley | `us-sonoma-valley` | USGS 3DEP 1/3 arc-sec (~10 m), z9â€“13 | vineyards + buildings | NAIP (`ni-us`) |
| MÃ©doc | `fr-medoc` | IGN RGE ALTI 5 m, z9â€“14, 4 chunks | vineyards + buildings | IGN ortho (`ni-fr`) |
| Southern RhÃ´ne | `region-fr-southern-rhone` | IGN RGE ALTI (~10 m), z9â€“13 | vineyards + buildings | IGN ortho (`ni-fr`) |
| Chianti Classico | `it-chianti-classico` | TINITALY 10 m, z9â€“13 | vineyards | AGEA Toscana (`ni-it-to`) |
| Barolo | `it-barolo` | TINITALY 10 m, z9â€“13 | vineyards | â€” (Geoportale Piemonte AGEA, pending) |

## Sources and licences

- **USGS 3DEP** 1/3 arc-second DEM, `https://prd-tnm.s3.amazonaws.com/StagedProducts/Elevation/13/TIFF/current/`
  (public domain). US tiles are named by their north-west corner (`n39w122` = 38â€“39 N, 122â€“121 W).
- **NAIP** aerial imagery via USGS The National Map (`basemap.nationalmap.gov`, public domain).
- **IGN France** ortho via GÃ©oplateforme WMTS (`data.geopf.fr`, Licence Ouverte 2.0); already wired as `ni-fr`.
- **IGN RGE ALTI** elevation via GÃ©oplateforme WMS (`data.geopf.fr/wms-r`, layer
  `ELEVATION.ELEVATIONGRIDCOVERAGE.HIGHRES`, `format=image/tiff`, Licence Ouverte 2.0). Keyless. The server returns
  float32 metres without a geotransform, so `depth3d_fetch_dem.py` assigns the transform from the requested bbox.
- **INGV TINITALY** 10 m DTM via WCS (`tinitaly.pi.ingv.it/TINItaly_1_1/wcs`, coverage `tinitaly_dem`,
  `format=GeoTIFF`, CC BY). Keyless and already georeferenced.
- **Terrarium** elevation tiles (`s3.amazonaws.com/elevation-tiles-prod/terrarium`, Mapzen/AWS Open Data) used as
  the feather target and the pack fallback.
- **OpenStreetMap** vineyards and buildings via Overpass (ODbL).
- Fine appellation boundaries (Barolo MGA, Chianti Classico UGA, INAO parcels, TTB AVAs) are already in
  `docs/data/geo/`.

## Rebuild

```bat
python -m pip install rasterio shapely pyproj pmtiles requests pillow numpy
python -I pipeline/scripts/depth3d_terrain.py --name=us-napa-valley --bbox=-122.56,38.20,-122.24,38.64 ^
  --dem raw\usgs13\USGS_13_n39w122.tif --dem raw\usgs13\USGS_13_n39w123.tif --res=10 --zmin=9 --zmax=13 ^
  --out docs\data\depth\us-napa-valley\terrain.pmtiles
python -I pipeline/scripts/depth3d_vectors.py --name=us-napa-valley --bbox=-122.56,38.20,-122.24,38.64 ^
  --out-dir docs\data\depth\us-napa-valley --towns=-122.2869,38.2975,6 ...
python -I pipeline/scripts/depth3d_registry.py --docs docs
python -I pipeline/frontend/build.py          # with VITIS_ROOT pointing at the working tree
```

## Fetching the France / Italy DEMs

`pipeline/scripts/depth3d_fetch_dem.py` downloads the keyless elevation tiles for a bbox and writes clean
float32 GeoTIFFs that `depth3d_terrain.py` consumes:

```bat
python -I pipeline/scripts/depth3d_fetch_dem.py --service ign     --bbox=-1.0606,44.8996,-0.5889,45.4395 --res=10 --out-dir raw\depth3d\fr-medoc
python -I pipeline/scripts/depth3d_fetch_dem.py --service tinitaly --bbox=7.7493,44.5569,8.081,44.6945 --res=10 --out-dir raw\depth3d\it-barolo
```

- **France** uses RGE ALTI via WMS (the `HIGHRES` layer is the 1 m RGE ALTI, downsampled by the server to the
  `--res` you ask for). **Italy** uses TINITALY 10 m via WCS (native resolution).
- The packs are output at z9â€“13 (â‰ˆ10 m) because GitHub Pages caps files at 100 MB.

## Chunking a region for more detail

`depth3d_terrain.py --chunks N` splits one region's tile pyramid into N PMTiles files by latitude, each under the
100 MB limit, and writes a `chunks.json` manifest. The whole grid is feathered **once** at the outer boundary, so
the seams between chunks are invisible â€” the chunks are just file boundaries, not resolution changes. The
front end (60_depth.js) already reads chunked packs (an array of `{file, bbox}` in `index.json`).

```bat
python -I pipeline/scripts/depth3d_fetch_dem.py --service ign --bbox=-1.0606,44.8996,-0.5889,45.4395 --res=5 --out-dir raw\depth3d\fr-medoc-5m
python -I pipeline/scripts/depth3d_terrain.py --name=fr-medoc --bbox=-1.0606,44.8996,-0.5889,45.4395 \
  --res=5 --zmin=9 --zmax=14 --chunks=4 --out docs\data\depth\fr-medoc\terrain.pmtiles --dem raw\depth3d\fr-medoc-5m\*.tif
python -I pipeline/scripts/depth3d_registry.py --docs docs   # picks up chunks.json
```

This is the pattern for the whole catalogue: any appellation too large for one high-res file is built chunk by
chunk (a MÃ©doc commune at a time, a Chianti Classico UGA at a time), and the loader treats the chunks as one
seamless pack. The only remaining lever for Italy is a sub-10 m DEM (TINITALY is 10 m); France can go to 1 m
by fetching RGE ALTI at `--res=2` and `--zmax=16` with enough chunks.

- Italian ortho is now wired for Tuscany: `ni-it-to` (Regione Toscana Geoscopio WMS, AGEA 2016â€“2022, keyless,
  HTTPS, EPSG:3857, CORS `*`), clipped to a `cover.json` `it-to` polygon (Natural Earth province union). Piemonte
  (Barolo) has AGEA 2024 / ARPA 2015 services on the Geoportale Piemonte but they were unreachable from the build
  machine; add a `ni-it-pm` entry the same way and a `cover.json` `it-pm` polygon (already present).

## QA

`pipeline/frontend/test_depth.py` renders the gh build in headless Chrome with 3D terrain + satellite on, then
reports the map state (terrain source loaded, vineyard/building feature counts) plus console, request and HTTP
errors. The `ERR_ABORTED` requests are MapLibre cancelling stale tile fetches on the camera jump and are ignored.
