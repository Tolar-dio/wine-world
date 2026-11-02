# T01: Move the depth packs out of git to Cloudflare R2

**Why:** `docs/data/depth/` holds ~528 MB of `.pmtiles`. GitHub Pages caps a site at 1 GB and the repo history keeps every binary forever. Packs must be served from Cloudflare R2 (free tier: 10 GB storage, free egress).

**Tolar does first:** create a Cloudflare account, an R2 bucket named `vitismundi-depth`, enable public access via an `r2.dev` URL or a custom domain `depth.vitismundi.app` (preferred: the domain's DNS is at Porkbun; add the CNAME Cloudflare gives). Give the harness `wrangler login` access.

**Do:**
1. Upload every file under `docs/data/depth/**` (keep the same relative paths) with `wrangler r2 object put`.
2. Set bucket CORS: allow GET and HEAD from `https://vitismundi.app` and `http://127.0.0.1:*`, allow header `Range`, expose `Content-Length, Content-Range, ETag, Accept-Ranges`.
3. Verify with curl: a `Range: bytes=0-16383` request on one `.pmtiles` returns 206 and the CORS headers.
4. Code (branch, PR): in `pipeline/frontend/src/modules/60_depth.js` read an optional `VM_CONFIG.depthBase` (string URL, e.g. `https://depth.vitismundi.app/`). When set, resolve every `terrain` and `vectors[].src` path in `index.json` against it; `index.json` and `credits.json` themselves stay on the site. Add `depthBase: ''` with a comment to `pipeline/frontend/src/modules/00_config.js`.
5. Write `pipeline/scripts/depth3d_upload.py` (wraps wrangler; `--name <pack>` or `--all`; skips unchanged files by size + MD5).
6. Do NOT delete the files from `docs/` or rewrite git history. Claude will flip `depthBase`, remove them from the site and decide on history cleanup.

**Report:** bucket URL, curl output for the 206 check, file count and total bytes uploaded.
