"""Copy Vitis Mundi Academy (the somm school, repo Tolar-dio/somm-school) into docs/academy/.

The academy is a separate static app with no build step. Keep developing it in somm-school, then run:
    python3 -I pipeline/frontend/sync_academy.py [path/to/somm-school]     (default: ../somm-school next to this repo)
    python3 -I pipeline/frontend/sync_academy.py --dry-run
Copies index.html and assets/ only; removes files in docs/academy/ that the academy no longer has.
deploy_gh.py never deletes docs/academy/ (KEEP_PREFIX), and the service worker leaves /academy/ to the network.
"""
import filecmp
import shutil
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DEST = REPO / "docs" / "academy"


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry-run" in sys.argv
    src = Path(args[0]).resolve() if args else (REPO.parent / "somm-school")
    if not (src / "index.html").is_file() or not (src / "assets").is_dir():
        raise SystemExit(f"{src} is not a somm-school checkout (needs index.html and assets/)")
    files = {"index.html": src / "index.html"}
    for p in sorted((src / "assets").rglob("*")):
        if p.is_file() and not p.name.startswith("."):
            files[p.relative_to(src).as_posix()] = p
    copied = same = 0
    for rel, p in files.items():
        dst = DEST / rel
        if dst.is_file() and filecmp.cmp(p, dst, shallow=False):
            same += 1
            continue
        copied += 1
        if not dry:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(p, dst)
    removed = []
    if DEST.exists():
        for p in sorted(DEST.rglob("*"), reverse=True):
            rel = p.relative_to(DEST).as_posix()
            if p.is_file() and rel not in files:
                removed.append(rel)
                if not dry:
                    p.unlink()
            elif p.is_dir() and not dry and not any(p.iterdir()):
                p.rmdir()
    print(f"{'would copy' if dry else 'copied'} {copied}, unchanged {same}, {'would remove' if dry else 'removed'} {len(removed)} -> {DEST}")


if __name__ == "__main__":
    main()
