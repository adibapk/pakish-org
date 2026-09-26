#!/usr/bin/env python3
from pathlib import Path

p = Path("/opt/pakish-whatsapp-platform/deploy/docker-compose.yml")
lines = p.read_text().splitlines()
out = [ln for ln in lines if ln.strip() != "- ../.env"]
p.write_text("\n".join(out) + "\n")
print("fixed compose")
