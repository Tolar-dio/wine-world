"""Decode MapLibre glyph PBFs (minimal protobuf reader) and report glyph counts.

Usage: python3 -I fonts_verify.py <fonts_dir>
glyphs { repeated fontstack stacks = 1 }
fontstack { string name = 1; string range = 2; repeated glyph glyphs = 3 }
glyph { uint32 id = 1; bytes bitmap = 2; uint32 width = 3, height = 4; sint32 left = 5, top = 6; uint32 advance = 7 }
"""
import gzip
import sys
from pathlib import Path


def varint(b, i):
    r = s = 0
    while True:
        c = b[i]; i += 1
        r |= (c & 0x7F) << s
        if c < 0x80:
            return r, i
        s += 7


def fields(b):
    i = 0
    while i < len(b):
        k, i = varint(b, i)
        fn, wt = k >> 3, k & 7
        if wt == 0:
            v, i = varint(b, i)
        elif wt == 2:
            n, i = varint(b, i)
            v = b[i:i + n]; i += n
        elif wt == 5:
            v = b[i:i + 4]; i += 4
        elif wt == 1:
            v = b[i:i + 8]; i += 8
        else:
            raise ValueError(f"wire type {wt}")
        yield fn, v


def decode(path):
    b = path.read_bytes()
    if b[:2] == b"\x1f\x8b":
        b = gzip.decompress(b)
    out = []
    for fn, v in fields(b):
        if fn != 1:
            continue
        name = rng = None; glyphs = []
        for f2, v2 in fields(v):
            if f2 == 1: name = v2.decode()
            elif f2 == 2: rng = v2.decode()
            elif f2 == 3:
                g = dict(fields(v2))
                glyphs.append((g.get(1), g.get(3, 0), g.get(4, 0), len(g.get(2, b""))))
        out.append((name, rng, glyphs))
    return out


root = Path(sys.argv[1])
total_bytes = 0; nfiles = 0
for stack in sorted(p for p in root.iterdir() if p.is_dir()):
    files = sorted(stack.glob("*.pbf"), key=lambda p: int(p.stem.split("-")[0]))
    summary = []
    for f in files:
        nfiles += 1; total_bytes += f.stat().st_size
        st = decode(f)
        n = sum(len(g) for _, _, g in st)
        bad = [gid for _, _, gs in st for (gid, w, h, bl) in gs if w and h and bl != (w + 6) * (h + 6)]
        summary.append(f"{f.stem}:{n}" + (f"(BAD {len(bad)})" if bad else ""))
        if n == 0:
            print("EMPTY", f)
    print(stack.name, f"{len(files)} files", " ".join(summary))
print("total files", nfiles, "bytes", total_bytes)
