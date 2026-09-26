#!/usr/bin/env bash
# Apply Google OAuth credentials to LearnHouse on pakish-sg.
# Prerequisites:
#   - /home/opc/.learnhouse/pakish/google-oauth.env (chmod 600) with:
#       LEARNHOUSE_GOOGLE_CLIENT_ID=...
#       LEARNHOUSE_GOOGLE_CLIENT_SECRET=...
#   - Backup created automatically before mutation.
set -euo pipefail

INSTALL_DIR="/home/opc/.learnhouse/pakish"
ENV_FILE="${INSTALL_DIR}/.env"
OAUTH_ENV="${INSTALL_DIR}/google-oauth.env"
BACKUP_DIR="${INSTALL_DIR}/backups"
TS="$(date -u +%Y%m%dT%H%M%SZ)"

if [[ ! -f "${OAUTH_ENV}" ]]; then
  echo "Missing ${OAUTH_ENV} (expected chmod 600 with client id/secret)." >&2
  exit 1
fi

umask 077
mkdir -p "${BACKUP_DIR}"
cp -a "${ENV_FILE}" "${BACKUP_DIR}/learnhouse-env-pre-oauth-${TS}.bak"

python3 - <<'PY'
from __future__ import annotations

import re
from pathlib import Path

install = Path("/home/opc/.learnhouse/pakish")
env_path = install / ".env"
oauth_path = install / "google-oauth.env"

pairs: dict[str, str] = {}
for line in oauth_path.read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if not line or line.startswith("#") or "=" not in line:
        continue
    key, value = line.split("=", 1)
    pairs[key.strip()] = value.strip()

required = ("LEARNHOUSE_GOOGLE_CLIENT_ID", "LEARNHOUSE_GOOGLE_CLIENT_SECRET")
for key in required:
    if key not in pairs or not pairs[key]:
        raise SystemExit(f"missing {key} in google-oauth.env")

lines = env_path.read_text(encoding="utf-8").splitlines()
out: list[str] = []
seen = set()
for line in lines:
    matched = False
    for key in required:
        if line.startswith(f"{key}="):
            out.append(f"{key}={pairs[key]}")
            seen.add(key)
            matched = True
            break
    if not matched:
        out.append(line)

for key in required:
    if key not in seen:
        out.append(f"{key}={pairs[key]}")

env_path.write_text("\n".join(out) + "\n", encoding="utf-8")
print("merged Google OAuth variables into .env")
PY

cd "${INSTALL_DIR}"
docker compose up -d --force-recreate learnhouse-app

echo "waiting for learnhouse-app health..."
for _ in $(seq 1 30); do
  if docker exec learnhouse-app-d1110885 curl -fsS http://localhost/api/v1/health >/dev/null 2>&1; then
    echo "learnhouse-app healthy"
    break
  fi
  sleep 2
done

docker ps --format '{{.Names}} {{.Status}}' | grep learnhouse || true
echo "OAuth apply complete. Verify: https://academy.pakish.org/login"
