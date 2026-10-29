"""Shared helpers for the vintage scripts (imported by vintage_build.py, vintage_calibrate.py)."""
import numpy as np

MDAYS = np.array([31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])
MSTART = np.concatenate([[0], np.cumsum(MDAYS)[:-1]])          # day-of-year (0-based) of month start
MMID = MSTART + MDAYS / 2.0                                     # mid-month position
BUDBURST_T = 10.0       # Winkler et al. 1974: vines start growth when mean daily temperature reaches ~10 C
FROST_T = 0.0           # screen-level Tmin <= 0 C = frost night
# Frost windows (0-based day of a 365-day year): N: budburst (clamped 1 Mar - 15 May) to 31 May.
# S: same calendar logic shifted by 6 months: budburst (clamped 1 Sep - 15 Nov) to 30 Nov.
WIN = {"n": (MSTART[2], MSTART[4] + 14, MSTART[5] - 1, 1),     # (earliest bb, latest bb, last day, first anchor month idx Feb)
       "s": (MSTART[8], MSTART[10] + 14, MSTART[11] - 1, 7)}    # Sep 1, Nov 15, Nov 30, anchors from Aug


def interp_matrix(h):
    """Matrix (ndays x 5) that linearly interpolates five monthly means (anchor months
    Feb-Jun for N, Aug-Dec for S, placed at mid-month) to every day of the frost search span
    (1 Feb - 31 May N, 1 Aug - 30 Nov S). Returns (matrix, first_day)."""
    e0, eL, last, m0 = WIN[h]
    first = MSTART[m0]                     # 1 Feb / 1 Aug: budburst search starts here
    days = np.arange(first, last + 1) + 0.5
    anchors = MMID[m0:m0 + 5]
    M = np.zeros((len(days), 5))
    for i, d in enumerate(days):
        k = np.searchsorted(anchors, d) - 1
        k = min(max(k, 0), 3)
        t = (d - anchors[k]) / (anchors[k + 1] - anchors[k])
        t = min(max(t, 0.0), 1.0) if (k > 0 and k < 3) else t   # extrapolate at the ends
        M[i, k] = 1 - t
        M[i, k + 1] = t
    return M, first


def budburst_index(tmean_norm5, h):
    """tmean_norm5: (5, ncell) normal monthly Tmean of the anchor months. Returns the index (into the
    interp_matrix rows) of the estimated normal budburst day per cell: first day the interpolated
    normal Tmean reaches BUDBURST_T, clamped to the window limits."""
    M, first = interp_matrix(h)
    e0, eL, last, m0 = WIN[h]
    daily = M @ tmean_norm5                                 # (ndays, ncell)
    ok = daily >= BUDBURST_T
    idx = np.where(ok.any(axis=0), ok.argmax(axis=0), len(M) - 1)
    lo, hi = e0 - first, eL - first
    return np.clip(idx, lo, hi)


def expected_frost_nights(tmin5, bb_idx, h, sigma):
    """tmin5: (5, ncell) monthly mean Tmin of the anchor months for one season. Expected number of
    nights with Tmin <= FROST_T between the normal budburst day and the end of the window, treating
    each day's Tmin as normal(interpolated monthly mean, sigma)."""
    from scipy.special import ndtr
    M, first = interp_matrix(h)
    daily = M @ tmin5                                        # (ndays, ncell)
    p = ndtr((FROST_T - daily) / sigma)
    rc = np.cumsum(p[::-1], axis=0)[::-1]                   # rc[i] = sum p[i:]
    return np.take_along_axis(rc, bb_idx[None, :], axis=0)[0]
