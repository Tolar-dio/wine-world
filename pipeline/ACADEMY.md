# Vitis Mundi Academy at vitismundi.app/academy/

The somm school (CMS-style Floor track, WSET-style Analyst track) lives in its own repo, **Tolar-dio/somm-school**, and is served from this site at `docs/academy/`.

- **Update it:** work in somm-school, then run `python3 -I pipeline/frontend/sync_academy.py /path/to/somm-school` and commit `docs/academy/`.
- **Deploys don't touch it:** `deploy_gh.py` lists `academy/` in `KEEP_PREFIX`.
- **The service worker skips it:** `/academy/` requests go straight to the network (rule in `pwa_assets.py`), so academy updates show up on the next load.
- **Navigation:** `frontend/src/modules/70_academy.js` adds the Academy tab (Pages build only). The academy's sidebar links back to the atlas.
- **Storage:** the academy keeps progress in localStorage under `vitis-mundi-academy-v1`, on the same origin as the atlas. The planned next step is syncing that progress through the atlas's Supabase account.
