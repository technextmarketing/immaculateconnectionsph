"""Print the CONFIG.partnerCodes line for a new B2B partner code.

    python tools/partner_code.py IC-AGENT-7K2P "Travel agency partner"

Paste the printed line into `partnerCodes` in assets/js/main.js, then run
`python tools/build.py assets`. Codes are matched without case, spaces or
dashes, so "ic agent 7k2p" works the same as "IC-AGENT-7K2P". Keep the plain
codes out of this repository (it is public); only the hash goes in main.js.
To retire a code, delete its line.
"""
import hashlib
import re
import sys

if len(sys.argv) < 2:
    sys.exit(__doc__)
code = re.sub(r"[^A-Z0-9]", "", sys.argv[1].upper())
label = sys.argv[2] if len(sys.argv) > 2 else "Partner"
h = hashlib.sha256(("icp:" + code).encode()).hexdigest()
print(f"      {{ h: '{h}', type: '{label}' }},")
