#!/usr/bin/env python3
"""Independent point check of the lapse-rate correction at reference stations (GHCN GSOM, NOAA NCEI).
For each station: 1991-2020 growing-season mean temperature (Apr-Oct N / Oct-Apr S) from monthly
TMAX/TMIN, versus TerraClimate 1991-2020 at the station's cell, raw and shifted to the station elevation.
Run: python3 -I scripts/climate_station_check.py"""
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
import climate_downscale as cd  # noqa: E402
import climate_lapse_calibrate as cal  # noqa: E402

ST = [("CHM00056444", "Deqin (Shangri-La county seat)", 28.45, 98.883, 3320),
      ("CHM00056651", "Lijiang (Yunnan high valley)", 26.833, 100.467, 2394),
      ("SZE00105086", "Sion (Valais)", 46.2167, 7.3331, 482),
      ("AU000011801", "Innsbruck (Inn valley)", 47.2667, 11.40, 577),
      ("ITE00155342", "Brixen/Bressanone (Eisack valley)", 46.715, 11.655, 594),
      ("FRE00104072", "Dijon-Longvic (Burgundy)", 47.2678, 5.0881, 219),
      ("FRE00104048", "Reims-Prunay (Champagne)", 49.2094, 4.1553, 95),
      ("FRE00104907", "Montelimar (Rhone)", 44.581, 4.733, 73),
      ("GME00129430", "Trier-Zewen (Mosel)", 49.7481, 6.5844, 132),
      ("GME00122698", "Geisenheim (Rheingau)", 49.9864, 7.9542, 110),
      ("USC00046074", "Napa State Hospital", 38.2777, -122.2647, 10.7),
      ("ASN00024511", "Eudunda (near Barossa)", -34.177, 139.08, 415),
      ("ASN00023013", "Parafield (Adelaide plains)", -34.796, 138.633, 9.5)]


def main():
    L = cd.lapse()
    zc_grid = cd.tc_elev()
    norm = {v: np.load(cd.CACHE / f"norm_{v}.npy", mmap_mode="r") for v in ("tmax", "tmin")}
    print(f"{'station':38s} {'z':>5s} {'z_cell':>6s} {'station':>7s} {'TC raw':>7s} {'TC corr':>7s}  (GST 1991-2020, C)")
    for sid, name, lat, lon, z in ST:
        p = cal.RAW / f"{sid}.csv"
        if not p.exists():
            continue
        S = cal.normals(sid)
        h = "n" if lat >= 0 else "s"
        m = cd.SEASON[h]
        r, c = int((90 - lat) * 24), int((lon + 180) * 24)
        tx = np.array([float(norm["tmax"][k, r, c]) * 0.1 - 73 for k in range(12)])
        tn = np.array([float(norm["tmin"][k, r, c]) * 0.1 - 73 for k in range(12)])
        zc = float(zc_grid[r, c])
        dz = np.array([(zc - z) / 1000])
        txc = tx + cd.shift(L, h, "tmax", dz)[:, 0]
        tnc = tn + cd.shift(L, h, "tmin", dz)[:, 0]
        st = np.nanmean((S[0][m] + S[1][m]) / 2) if np.isfinite(S[:, m]).all() else float("nan")
        print(f"{name:38s} {z:5.0f} {zc:6.0f} {st:7.1f} {((tx + tn) / 2)[m].mean():7.1f} {((txc + tnc) / 2)[m].mean():7.1f}")


if __name__ == "__main__":
    main()
