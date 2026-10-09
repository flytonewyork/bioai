#!/usr/bin/env python3
"""Check each record's quote verbatim against its Paperclip source (whitespace-normalised)."""
import json, re, subprocess, sys, glob, os, unicodedata
PC = os.path.expanduser("~/.local/bin/paperclip")
cache = {}; raw = {}
def norm(s):
    s = unicodedata.normalize("NFKC", s)
    s = re.sub(r"^\s*L\d+[:\s]", " ", s, flags=re.M)        # drop line-number prefixes
    s = s.replace("‑", "-").replace("–", "-").replace("—", "-")
    s = re.sub(r"[‘’]", "'", s); s = re.sub(r"[“”]", '"', s)
    return re.sub(r"\s+", " ", s).strip().lower()
def text(path):
    if path not in cache:
        cmd = [PC, "head", "-n", "100000", path] if path.endswith(".lines") else [PC, "cat", path]
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        raw[path] = r.stdout if r.returncode == 0 else None
        cache[path] = norm(r.stdout) if r.returncode == 0 else None
    return cache[path]
def check(rec, quote_key="quote"):
    q, pc = rec.get(quote_key), rec.get("paperclip") if isinstance(rec.get("paperclip"), dict) else {"path": rec.get("paperclip")}
    path = pc.get("path")
    if not q or not path: return "NO-QUOTE-OR-PATH"
    if len(q.split()) > 40: return "TOO-LONG"
    cand = [path] + ([path.rsplit("/", 1)[0] + "/meta.json"] if path.endswith("content.lines") else [])
    for p in cand:
        t = text(p)
        if t is None: continue
        if norm(q) in t:
            if p.endswith(".lines"):
                from pin import locate
                got = locate(raw[p], q, norm)
                return "OK" if got == pc.get("lines") else f"OK-LINES-ARE-{got}"
            return "OK"
    return "NOT-FOUND" if any(text(p) is not None for p in cand) else "SOURCE-UNREADABLE"
bad = 0
for f in sorted(glob.glob(sys.argv[1] if len(sys.argv) > 1 else "/tmp/bioai-gfh375/*.json")):
    d = json.load(open(f))
    for r in [x for x in d.get("records", []) + d.get("seed_checks", []) if isinstance(x, dict)]:
        v = check(r) if r.get("quote") else "NO-QUOTE"
        if v != "OK": bad += 1
        print(f"{v:18} {os.path.basename(f):28} {r.get('doc_id')}  {(r.get('paperclip') or {}).get('path','') if isinstance(r.get('paperclip'), dict) else r.get('paperclip')}")
print("problems:", bad)
