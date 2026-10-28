"""Make static instances of the Literata variable fonts for glyph generation.

Usage: python3 -I fonts_instance.py <raw_gfonts_dir> <out_dir>
Literata Regular / Italic at wght=400, opsz=12 (text optical size suits small map labels).
IM FELL English SC is already static and is copied as is.
"""
import shutil
import sys
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

src = Path(sys.argv[1])
out = Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)

for name, fn in [("Literata-Regular", "Literata[opsz,wght].ttf"),
                 ("Literata-Italic", "Literata-Italic[opsz,wght].ttf")]:
    f = TTFont(src / fn)
    axes = {a.axisTag: (a.minValue, a.defaultValue, a.maxValue) for a in f["fvar"].axes}
    print(name, "axes", axes)
    loc = {"wght": 400}
    if "opsz" in axes:
        lo, _, hi = axes["opsz"]
        loc["opsz"] = min(max(12, lo), hi)
    st = instancer.instantiateVariableFont(f, loc, updateFontNames=True)
    st.save(out / f"{name}.ttf")
    print("wrote", out / f"{name}.ttf", len(st.getGlyphOrder()), "glyphs")

shutil.copy(src / "IMFeENsc28P.ttf", out / "IMFellEnglishSC-Regular.ttf")
print("copied IM Fell English SC")
