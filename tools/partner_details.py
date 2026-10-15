"""Attach each partner's own details to their code, encrypted, so the partner form fills itself for them.

    python tools/partner_details.py PATH/TO/members.json

members.json lives OUTSIDE this repository (it holds names, phones and emails):
    {"IC-TRVL-2H2P": {"name": "...", "company": "...", "email": "...", "phone": "..."}, ...}

For every code that is already in CONFIG.partnerCodes (assets/js/main.js), the details are
encrypted with AES-GCM under a key made from the code itself (SHA-256 of "ick:" + code), and
stored as `d` on that code's line. Only someone who has the code can read them; the page
source shows ciphertext. A code with no details (or empty ones) loses its `d`. Then run
`python tools/build.py assets`.
"""
import base64, hashlib, io, json, os, re, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

if len(sys.argv) < 2: sys.exit(__doc__)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS = os.path.join(ROOT, 'assets', 'js', 'main.js')
norm = lambda c: re.sub(r'[^A-Z0-9]', '', c.upper())
members = json.load(open(sys.argv[1], encoding='utf-8'))
s = io.open(JS, encoding='utf-8').read()
done = 0
for code, info in members.items():
    n = norm(code)
    h = hashlib.sha256(('icp:' + n).encode()).hexdigest()
    m = re.search(r"\{ h: '" + h + r"'[^\n]*?\}", s)
    if not m: print('  not a live code, skipped:', code); continue
    line = re.sub(r", d: '[^']*'", '', m.group(0))
    info = {k: str(v).strip() for k, v in (info or {}).items() if k in ('company', 'name', 'email', 'phone') and str(v or '').strip()}
    if info:
        key = hashlib.sha256(('ick:' + n).encode()).digest()
        iv = os.urandom(12)
        blob = base64.b64encode(iv + AESGCM(key).encrypt(iv, json.dumps(info, ensure_ascii=False).encode(), None)).decode()
        line = line[:-2].rstrip() + f", d: '{blob}' }}"
        done += 1
    s = s[:m.start()] + line + s[m.end():]
io.open(JS, 'w', encoding='utf-8', newline='\n').write(s)
print(f'{done} code(s) carry encrypted details')
