#!/usr/bin/env python3
import json
from pathlib import Path

path = Path("/data/coolify/proxy/acme.json")
data = json.loads(path.read_text())
certs = data.get("letsencrypt", {}).get("Certificates", [])
print("cert count:", len(certs))
for cert in certs:
    domain = cert.get("domain", {})
    print(domain.get("main"), domain.get("sans"))
