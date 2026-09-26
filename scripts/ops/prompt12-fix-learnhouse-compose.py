#!/usr/bin/env python3
"""Fix learnhouse docker-compose extra_hosts on pakish-sg."""
from pathlib import Path

compose_path = Path("/home/opc/.learnhouse/pakish/docker-compose.yml")
text = compose_path.read_text(encoding="utf-8")

# Repair broken sed artifact if present.
text = text.replace(
    '    extra_hosts:\\n      - " academy.pakish.org:host-gateway\n',
    "",
)
text = text.replace(
    'extra_hosts:\\n      - " academy.pakish.org:host-gateway\n',
    "",
)

block = (
    "    extra_hosts:\n"
    '      - "academy.pakish.org:host-gateway"\n'
)
if "extra_hosts:" not in text:
    text = text.replace(
        "    restart: unless-stopped\n    env_file:",
        "    restart: unless-stopped\n" + block + "    env_file:",
        1,
    )

compose_path.write_text(text, encoding="utf-8")
print("compose fixed")

env_path = Path("/home/opc/.learnhouse/pakish/.env")
lines = env_path.read_text(encoding="utf-8").splitlines()
updates = {
    "LEARNHOUSE_API_URL": "http://127.0.0.1:9000/api/v1/",
    "NEXT_PUBLIC_COLLAB_URL": "wss://academy.pakish.org/collab",
}
out, seen = [], set()
for line in lines:
    if not line or line.startswith("#") or "=" not in line:
        out.append(line)
        continue
    key = line.split("=", 1)[0]
    if key in updates:
        out.append(f"{key}={updates[key]}")
        seen.add(key)
    else:
        out.append(line)
for key, val in updates.items():
    if key not in seen:
        out.append(f"{key}={val}")
env_path.write_text("\n".join(out) + "\n", encoding="utf-8")
print("env updated")
