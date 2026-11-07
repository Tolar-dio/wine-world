/* Vitis Mundi v2: high-resolution 3D "depth packs" for flagship appellations.
   A pack is a small registry entry (data/depth/index.json) naming a PMTiles terrain pyramid and optional
   GeoJSON vector layers (vineyards, buildings). When the camera is inside a pack's bbox at its zoom range,
   the terrain source (vmterrain://) serves that pack's lidar/DTM tiles instead of the 30 m Terrarium, and the
   vector layers are added. Everything degrades quietly: no pack, no index, or an error -> the global 30 m
   terrain and the existing basemaps stay in place. */
(function () {
  'use strict';
  if (typeof VM === 'undefined' || typeof maplibregl === 'undefined') return;
  const GH = () => VM.mode === 'gh';
  if (!GH()) return;

  const REG = 'data/depth/index.json';
  /* data/depth/remote.json (written by .github/workflows/terrain-r2.yml) maps each terrain file to its copy on
     Cloudflare R2: { base, files: { "data/depth/<pack>/terrain.pmtiles": { key, size } } }. Files it does not
     list, or every file when it is missing, load from the site itself. */
  const REMOTE = 'data/depth/remote.json';
  let remote = null;
  const terrainURL = f => {
    const e = remote && remote.base && remote.files && remote.files[f];
    return e && e.key ? remote.base + e.key : BASE + f;
  };
  const TERRARIUM = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png';
  const TERRARIUM_MAX = 15;                 /* the global Mapzen/AWS tiles go to z15 */
  const ACTIVE_MAX = 2;                     /* at most this many packs keep their terrain + vectors live */

  const DP = {
    index: null,          /* { "<id>": { name, bbox:[w,s,e,n], zMin, zMax, terrain, vectors:[], credits } } */
    ready: false,
    active: [],           /* pack ids, most recently used last */
    readers: new Map(),   /* id -> pmtiles reader (Promise) */
    layers: new Map()     /* id -> Set(layer ids) */
  };

  /* ---------- Web Mercator / tile helpers (mirror v2_map.js) ---------- */
  function tileLat(y, z) { return Math.atan(Math.sinh(Math.PI * (1 - 2 * y / (1 << z)))) * 180 / Math.PI; }
  function tileInBbox(z, x, y, bb) {
    const n = 1 << z;
    const w = x / n * 360 - 180, e = (x + 1) / n * 360 - 180;
    const s = tileLat(y + 1, z), n2 = tileLat(y, z);
    return e > bb[0] && w < bb[2] && n2 > bb[1] && s < bb[3];
  }

  /* ---------- a minimal PMTiles v3 reader (raster tiles only) ---------- */
  function varint(u8, i) {
    let v = 0, shift = 0, start = i;
    while (i < u8.length) {
      const b = u8[i++];
      v += (b & 0x7f) * Math.pow(2, shift);
      if ((b & 0x80) === 0) break;
      shift += 7;
    }
    return [v, i - start];
  }
  /* Hilbert-curve tile id, identical to pmtiles.writer.zxy_to_tileid (must match the Python writer exactly) */
  function hilbertRotate(n, x, y, rx, ry) {
    if (ry === 0) {
      if (rx !== 0) { x = n - 1 - x; y = n - 1 - y; }
      const t = x; x = y; y = t;
    }
    return [x, y];
  }
  function zxyToTileId(z, x, y) {
    let acc = (Math.pow(4, z) - 1) / 3;
    let a = z - 1;
    while (a >= 0) {
      const s = Math.pow(2, a);
      const rx = (Math.floor(x / s) & 1) * s;
      const ry = (Math.floor(y / s) & 1) * s;
      acc += ((3 * rx) ^ ry) * Math.pow(2, a);
      const r = hilbertRotate(s, x, y, rx, ry);
      x = r[0]; y = r[1];
      a -= 1;
    }
    return acc;
  }
  async function gunzip(u8) {
    try {
      const ds = new Blob([u8]).stream().pipeThrough(new DecompressionStream('gzip'));
      return new Uint8Array(await new Response(ds).arrayBuffer());
    } catch (e) { return u8; }
  }
  /* matches pmtiles.writer.serialize_directory: entry count, then tile-id deltas, then run lengths, lengths, offsets */
  function decodeEntries(u8) {
    const out = [];
    let i = 0, v = varint(u8, i); i += v[1];
    const n = v[0];
    let lastId = 0;
    for (let k = 0; k < n; k++) { v = varint(u8, i); i += v[1]; lastId += v[0]; out.push({ tileId: lastId, offset: 0, length: 0, runLength: 0 }); }
    for (let k = 0; k < n; k++) { v = varint(u8, i); i += v[1]; out[k].runLength = v[0]; }
    for (let k = 0; k < n; k++) { v = varint(u8, i); i += v[1]; out[k].length = v[0]; }
    for (let k = 0; k < n; k++) {
      v = varint(u8, i); i += v[1];
      if (k > 0 && v[0] === 0) out[k].offset = out[k - 1].offset + out[k - 1].length;
      else out[k].offset = v[0] - 1;
    }
    return out;
  }
  function findEntry(entries, tileId) {
    let lo = 0, hi = entries.length - 1, ans = -1;
    while (lo <= hi) {
      const mid = (lo + hi) >> 1;
      if (entries[mid].tileId <= tileId) { ans = mid; lo = mid + 1; } else hi = mid - 1;
    }
    return ans;
  }
  function makeReader(url) {
    let full = null, header = null, root = null;
    const leafs = new Map();
    async function bytes(a, b) {
      if (full) return full.slice(a, b + 1);
      try {
        const res = await fetch(url, { headers: { Range: 'bytes=' + a + '-' + b } });
        if (res.status === 206) {
          const buf = await res.arrayBuffer();
          if (buf.byteLength === b - a + 1) return buf;
        } else if (res.ok) {
          full = await res.arrayBuffer();
          return full.slice(a, b + 1);
        }
        full = await (await fetch(url)).arrayBuffer();
        return full.slice(a, b + 1);
      } catch (e) { throw e; }
    }
    async function init() {
      if (header) return;
      const buf = await bytes(0, 126);
      const dv = new DataView(buf);
      if (String.fromCharCode(...new Uint8Array(buf, 0, 7)) !== 'PMTiles') throw new Error('not a PMTiles file');
      const u64 = o => dv.getUint32(o, true) + dv.getUint32(o + 4, true) * 4294967296;
      header = {
        rootOffset: u64(8), rootLen: u64(16), leafOffset: u64(40), leafLen: u64(48),
        tileOffset: u64(56), internalComp: dv.getUint8(97), tileComp: dv.getUint8(98),
        tileType: dv.getUint8(99), minZoom: dv.getUint8(100), maxZoom: dv.getUint8(101)
      };
      const rb = await bytes(header.rootOffset, header.rootOffset + header.rootLen - 1);
      root = decodeEntries(await gunzip(new Uint8Array(rb)));
    }
    return {
      async getTile(z, x, y) {
        await init();
        const id = zxyToTileId(z, x, y);
        let entry = null, offsetBase = header.tileOffset;
        let e = findEntry(root, id);
        if (e < 0) return null;
        entry = root[e];
        if (entry.runLength === 0) {                    /* leaf-directory pointer */
          const ls = header.leafOffset + entry.offset;
          let le = leafs.get(ls);
          if (!le) {
            const lb = await bytes(ls, ls + entry.length - 1);
            le = decodeEntries(await gunzip(new Uint8Array(lb)));
            leafs.set(ls, le);
          }
          e = findEntry(le, id);
          if (e < 0) return null;
          entry = le[e];
        }
        if (!entry || entry.runLength === 0) return null;
        const diff = id - entry.tileId;
        if (diff >= entry.runLength) return null;
        const off = offsetBase + entry.offset + diff * entry.length;
        return await bytes(off, off + entry.length - 1);
      },
      ready: init
    };
  }

  /* ---------- terrain protocol: pack tiles inside, Terrarium outside ---------- */
  function registerTerrainProtocol() {
    if (registerTerrainProtocol.done) return;
    registerTerrainProtocol.done = true;
    maplibregl.addProtocol('vmterrain', async (params, abort) => {
      const m = params.url.match(/^vmterrain:\/\/(\d+)\/(\d+)\/(\d+)/);
      if (!m) return { data: new ArrayBuffer(0) };
      const z = +m[1], x = +m[2], y = +m[3];
      if (DP.index) {
        for (const id of DP.active) {
          const p = DP.index[id];
          if (!p || !p.terrain || z < p.zMin || z > p.zMax || !tileInBbox(z, x, y, p.bbox)) continue;
          const chunks = DP.readers.get(id);
          if (!chunks) continue;
          for (const c of chunks) {
            if (c.bbox && !tileInBbox(z, x, y, c.bbox)) continue;
            try {
              const buf = await c.reader.getTile(z, x, y);
              if (buf && buf.byteLength) return { data: buf };
            } catch (e) { console.warn('[depth] terrain tile', id, e); }
          }
        }
      }
      /* no pack here: the 30 m Terrarium, overzoomed past its native zoom the same way MapLibre would */
      const z0 = Math.min(z, TERRARIUM_MAX);
      const s = 1 << (z - z0);
      const url = TERRARIUM.replace('{z}', z0).replace('{x}', Math.floor(x / s)).replace('{y}', Math.floor(y / s));
      try {
        const res = await fetch(url, { signal: abort && abort.signal, mode: 'cors', credentials: 'omit' });
        if (res.ok) {
          const b = await res.arrayBuffer();
          if (b.byteLength) return { data: b };
        }
      } catch (e) { if (e && e.name === 'AbortError') throw e; }
      return { data: new ArrayBuffer(0) };
    });
  }

  /* ---------- vector layers ---------- */
  async function addVectorLayers(id, p) {
    if (!p.vectors || !p.vectors.length || !map) return;
    const src = name => 'dp-' + id + '-' + name;
    const want = {};
    for (const v of p.vectors) want[v.kind] = v.src;
    const T = VM.tokens(), dark = T.dark;
    if (want.vineyard && !map.getSource(src('vineyard'))) {
      const data = await getJSON(want.vineyard);
      if (!data) return;
      map.addSource(src('vineyard'), { type: 'geojson', data });
      map.addLayer({ id: src('vineyard'), type: 'fill', source: src('vineyard'), minzoom: 13.2,
        paint: { 'fill-color': dark ? '#8fa86b' : '#6f8a4e', 'fill-opacity': 0.30, 'fill-outline-color': 'rgba(0,0,0,0)' } }, 'anchor-fill');
    }
    if (want.building && !map.getSource(src('building'))) {
      const data = await getJSON(want.building);
      if (!data) return;
      map.addSource(src('building'), { type: 'geojson', data });
      map.addLayer({ id: src('building'), type: 'fill-extrusion', source: src('building'), minzoom: 14.6,
        paint: {
          'fill-extrusion-color': dark ? '#454c5c' : '#c8ccd3',
          'fill-extrusion-opacity': 0.92,
          'fill-extrusion-height': ['coalesce', ['get', 'height'], ['*', ['coalesce', ['get', 'levels'], 2], 3]],
          'fill-extrusion-base': 0
        } }, 'anchor-points');
    }
  }
  function removeVectorLayers(id) {
    if (!map) return;
    for (const kind of ['vineyard', 'building']) {
      const l = 'dp-' + id + '-' + kind;
      if (map.getLayer(l)) map.removeLayer(l);
      if (map.getSource(l)) map.removeSource(l);
    }
  }

  /* ---------- activation ---------- */
  async function activate(id) {
    const p = DP.index[id];
    if (!p || DP.active.includes(id)) return;
    if (!p.terrain && !p.vectors) return;
    if (!DP.readers.has(id) && p.terrain) {
      const chunks = Array.isArray(p.terrain) ? p.terrain : [{ file: p.terrain, bbox: p.bbox }];
      DP.readers.set(id, chunks.map(c => ({ reader: makeReader(terrainURL(c.file)), bbox: c.bbox || p.bbox })));
    }
    addVectorLayers(id, p);
    DP.active.push(id);
    while (DP.active.length > ACTIVE_MAX) deactivate(DP.active.shift());
    VM.emit('depth', { id, active: true });
  }
  function deactivate(id) {
    const i = DP.active.indexOf(id);
    if (i >= 0) { DP.active.splice(i, 1); removeVectorLayers(id); VM.emit('depth', { id, active: false }); }
  }

  let t = 0;
  function updateActive() {
    if (!DP.index || !map) return;
    clearTimeout(t);
    t = setTimeout(() => {
      const z = map.getZoom(), b = map.getBounds();
      const bb = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()];
      for (const [id, p] of Object.entries(DP.index)) {
        const on = z >= p.zMin && z <= p.zMax + 1 &&
          bb[2] > p.bbox[0] && bb[0] < p.bbox[2] && bb[3] > p.bbox[1] && bb[1] < p.bbox[3];
        if (on) activate(id); else if (DP.active.includes(id)) deactivate(id);
      }
    }, 180);
  }

  /* ---------- boot ---------- */
  async function init() {
    registerTerrainProtocol();
    if (typeof has === 'function' && !has(REG)) return;   /* no packs shipped */
    try {
      const [idx, rem] = await Promise.all([getJSON(REG),
        fetch(BASE + REMOTE).then(r => r.ok ? r.json() : null).catch(() => null)]);
      if (!idx) return;
      remote = rem;
      DP.index = idx;
      DP.ready = true;
      map.on('moveend', updateActive);
      map.on('zoomend', updateActive);
      updateActive();
    } catch (e) { console.warn('[depth] index', e); }
  }

  VM.on('map:ready', () => { try { init(); } catch (e) { console.warn('[depth]', e); } });

  /* a one-line note in appellation profiles when a pack exists */
  try {
    VM.panel.addSection(['appellation', 'region'], (el, e) => {
      if (!DP.index || !e || !e.id || !DP.index[e.id]) return;
      const p = DP.index[e.id];
      el.innerHTML = (typeof H === 'object' && H.sec ? H.sec('3D terrain detail') : '<p class="eyebrow">3D terrain detail</p>') +
        '<p class="note">High-resolution terrain, vineyards and buildings are available for ' + esc(p.name) +
        '. Enable <b>3D terrain</b> and zoom in.</p>';
    }, { id: 'depth-pack', slot: 'end', order: 120 });
  } catch (e) { /* profile section is optional */ }
})();
