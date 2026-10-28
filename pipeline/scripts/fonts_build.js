#!/usr/bin/env node
// Build MapLibre SDF glyph PBFs with fontnik, writing only 256-codepoint ranges
// that actually contain glyphs (skips Private Use Area).
// Usage: node fonts_build.js <font.ttf> <outdir> [fontnikModulePath]
const path = require('path');
const fs = require('fs');
const fontnikPath = process.argv[4] || '/home/claude/winesite/work/node/node_modules/fontnik';
const fontnik = require(fontnikPath);

const [ttf, outdir] = process.argv.slice(2, 4);
if (!ttf || !outdir) { console.error('usage: fonts_build.js font.ttf outdir'); process.exit(1); }
const buf = fs.readFileSync(ttf);
fs.mkdirSync(outdir, { recursive: true });

fontnik.load(buf, (err, faces) => {
  if (err) throw err;
  const pts = new Set();
  for (const f of faces) for (const p of f.points) pts.add(p);
  console.log(path.basename(ttf), faces.map(f => `${f.family_name} ${f.style_name}`).join(', '), 'codepoints:', pts.size);
  const ranges = new Set();
  for (const p of pts) {
    if (p >= 0xE000 && p <= 0xF8FF) continue; // private use
    if (p > 0xFFFF) continue; // MapLibre glyph ranges stop at 65535
    ranges.add(Math.floor(p / 256) * 256);
  }
  const list = [...ranges].sort((a, b) => a - b);
  let i = 0;
  const next = () => {
    if (i >= list.length) { console.log('ranges:', list.map(s => `${s}-${s + 255}`).join(' ')); return; }
    const start = list[i++];
    fontnik.range({ font: buf, start, end: start + 255 }, (e, data) => {
      if (e) throw e;
      fs.writeFileSync(path.join(outdir, `${start}-${start + 255}.pbf`), data);
      next();
    });
  };
  next();
});
