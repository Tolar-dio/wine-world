# T06: Photo audit

**Input:** `docs/data/photos/*.json`: `{ "<place id>": [{file, thumb, author, license, page, caption}] }` (Wikimedia Commons). Place names and coordinates: `docs/data/geo/_index.json`, `_sites.geojson`, `_regions.geojson`.

**Do:** for every photo, fetch the Commons file page (`page` URL, or the API `action=query&prop=imageinfo|categories&iiprop=extmetadata`) and decide:
- `ok`: shows the place (vineyards, village, landscape of that appellation or site).
- `wrong_place`: the file's title, description, categories or coordinates point elsewhere (give the place it actually shows and distance in km if it has coordinates).
- `irrelevant`: not wine or landscape related (stadium, food, people, buildings unrelated to wine).
- `caption_wrong`: photo fine, our caption misleading (e.g. "Vineyards in X" on a photo with no vineyard).
- `unsure`.

**Output:** `staging/T06/audit.csv`: `place_id,file,verdict,reason,commons_coords,distance_km,suggested_caption`. Do not edit photo files.
**Pace:** max 1 request per second to Wikimedia, a descriptive User-Agent `VitisMundiResearch/1.0 (+https://vitismundi.app)`; never put an email in headers.
**Report:** counts by verdict; the worst 50.
