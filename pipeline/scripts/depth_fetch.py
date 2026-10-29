# Robust downloader for the depth-phase boundary work (the egress proxy resets connections often).
# Usage: python3 -I scripts/depth_fetch.py OUTFILE URL [tries]
#    or: import depth_fetch; depth_fetch.fetch(url, out)
import os, sys, time, subprocess


def fetch(url, out, tries=12, timeout=180, min_bytes=1, quiet=False):
    if os.path.exists(out) and os.path.getsize(out) >= min_bytes:
        return True
    tmp = out + '.part'
    for i in range(tries):
        r = subprocess.run(['curl', '-sS', '-L', '--compressed', '-m', str(timeout), '-o', tmp,
                            '-w', '%{http_code}', url], capture_output=True, text=True)
        code = r.stdout.strip()
        if r.returncode == 0 and code.startswith('2') and os.path.exists(tmp) and os.path.getsize(tmp) >= min_bytes:
            os.replace(tmp, out)
            return True
        if code in ('404', '410', '400'):
            if not quiet:
                print(f'  {code} {url}', file=sys.stderr)
            break
        time.sleep(min(2 + i * 2, 20))
    if os.path.exists(tmp):
        os.remove(tmp)
    if not quiet:
        print(f'  FAILED {url}', file=sys.stderr)
    return False


if __name__ == '__main__':
    ok = fetch(sys.argv[2], sys.argv[1], int(sys.argv[3]) if len(sys.argv) > 3 else 12)
    sys.exit(0 if ok else 1)
