# T08: Depth packs activate only after the map moves

**Bug:** opening the site directly at a packed area (or jumping there right after load) does not activate the pack; it activates after the next camera move. In `pipeline/frontend/src/modules/60_depth.js`, `init()` runs on `map:ready`, loads `index.json`, then registers `moveend`/`zoomend` and calls `updateActive()`; a camera move that happens while `index.json` is loading is missed, and `updateActive` may run before the style/terrain is ready.

**Do (branch, PR):**
1. Make activation robust: call `updateActive()` after the registry loads AND on the map's next `idle`, and also when 3D terrain is switched on (listen to `VM.on('terrain', …)`).
2. Add a test case to `pipeline/frontend/test_depth.py`: load `/#us-napa-valley`, enable 3D, wait, assert `dp-us-napa-valley-*` layers exist without any further camera move.
3. Keep the change small; no other refactors.
