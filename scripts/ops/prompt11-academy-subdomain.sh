#!/usr/bin/env bash
# Prompt 11 — Academy subdomain setup (run on pakish-sg only)
set -euo pipefail

INSTALL_DIR="/home/opc/.learnhouse/pakish"
TS="$(date -u +%Y%m%dT%H%M%SZ)"

cd "$INSTALL_DIR"

echo "=== Creating nginx subdomain config ==="
cat > extra/nginx.subdomain.conf <<'NGINX'
# Native origin: https://academy.pakish.org (no path prefix rewriting)
server {
    listen 80;
    server_name academy.pakish.org;
    client_max_body_size 6G;
    large_client_header_buffers 4 32k;
    client_body_buffer_size 32k;
    client_header_buffer_size 32k;

    location / {
        proxy_pass http://learnhouse-app:80;
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Accept-Encoding "";
        proxy_hide_header Link;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
        proxy_connect_timeout 75s;
    }
}
NGINX

echo "=== Updating docker-compose nginx volume mount ==="
python3 <<'PY'
from pathlib import Path
p = Path("docker-compose.yml")
text = p.read_text()
old = "      - ./extra/nginx.prod.conf:/etc/nginx/conf.d/default.conf:ro"
new = "      - ./extra:/etc/nginx/conf.d:ro"
if old not in text:
    raise SystemExit("compose mount pattern not found")
p.write_text(text.replace(old, new, 1))
print("compose updated")
PY

echo "=== Creating Traefik subdomain router ==="
sudo tee /data/coolify/proxy/dynamic/learnhouse-subdomain.yaml >/dev/null <<'YAML'
# Native LearnHouse origin at https://academy.pakish.org
http:
  routers:
    learnhouse-subdomain-http:
      rule: Host(`academy.pakish.org`)
      entryPoints:
        - http
      middlewares:
        - redirect-to-https
      service: learnhouse-svc
      priority: 210
    learnhouse-subdomain-https:
      rule: Host(`academy.pakish.org`)
      entryPoints:
        - https
      tls:
        certresolver: letsencrypt
      middlewares:
        - gzip
      service: learnhouse-svc
      priority: 210
YAML

echo "=== Updating LearnHouse env for subdomain canonical origin ==="
python3 <<'PY'
from pathlib import Path
p = Path(".env")
lines = p.read_text().splitlines()
updates = {
    "LEARNHOUSE_DOMAIN": "academy.pakish.org",
    "LEARNHOUSE_FRONTEND_DOMAIN": "academy.pakish.org",
    "LEARNHOUSE_COOKIE_DOMAIN": "academy.pakish.org",
    "LEARNHOUSE_ALLOWED_ORIGINS": "https://academy.pakish.org,https://pakish.org",
    "NEXTAUTH_URL": "https://academy.pakish.org",
    "NEXT_PUBLIC_LEARNHOUSE_BACKEND_URL": "https://academy.pakish.org/",
    "NEXT_PUBLIC_LEARNHOUSE_API_URL": "https://academy.pakish.org/api/v1/",
    "NEXT_PUBLIC_LEARNHOUSE_DOMAIN": "academy.pakish.org",
    "NEXT_PUBLIC_LEARNHOUSE_TOP_DOMAIN": "academy.pakish.org",
}
out = []
seen = set()
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
p.write_text("\n".join(out) + "\n")
print("env updated keys:", ", ".join(sorted(updates)))
PY

python3 <<'PY'
import json
from pathlib import Path
p = Path("learnhouse.config.json")
data = json.loads(p.read_text())
data["domain"] = "academy.pakish.org"
data["publicBasePath"] = ""
data["publicUrl"] = "https://academy.pakish.org"
p.write_text(json.dumps(data, indent=2) + "\n")
print("learnhouse.config.json updated")
PY

echo "=== Recreating nginx + app containers ==="
sudo docker compose up -d --no-deps --force-recreate nginx learnhouse-app
sudo docker compose up -d --no-deps --force-recreate ssr-fwd

echo "=== Waiting for health ==="
sleep 15
curl -fsS http://127.0.0.1:9080/api/v1/health || true

echo "PROMPT11_ACADEMY_SUBDOMAIN_APPLIED"
