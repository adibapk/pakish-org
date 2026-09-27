#!/usr/bin/env bash
# One-shot production Resend key rotation (run on pakish-sg only).
# Usage: RESEND_API_KEY='re_...' bash p21-update-resend-prod.sh
set -euo pipefail

if [[ -z "${RESEND_API_KEY:-}" ]]; then
  echo "RESEND_API_KEY is required" >&2
  exit 1
fi

ENV_FILE="/data/migrations/pakish/deploy/pakish-org.env"
DEPLOY_DIR="/data/migrations/pakish/deploy"
TS="$(date -u +%Y%m%dT%H%M%SZ)"

sudo cp "${ENV_FILE}" "${ENV_FILE}.bak-p21-${TS}"

if grep -q '^RESEND_API_KEY=' "${ENV_FILE}"; then
  sudo sed -i "s|^RESEND_API_KEY=.*|RESEND_API_KEY=${RESEND_API_KEY}|" "${ENV_FILE}"
else
  echo "RESEND_API_KEY=${RESEND_API_KEY}" | sudo tee -a "${ENV_FILE}" >/dev/null
fi

if grep -q '^RESEND_FROM_EMAIL=' "${ENV_FILE}"; then
  sudo sed -i 's|^RESEND_FROM_EMAIL=.*|RESEND_FROM_EMAIL=Pakish Institute <admissions@pakish.org>|' "${ENV_FILE}"
else
  echo 'RESEND_FROM_EMAIL=Pakish Institute <admissions@pakish.org>' | sudo tee -a "${ENV_FILE}" >/dev/null
fi

cd "${DEPLOY_DIR}"
sudo docker compose up -d pakish-org

echo "Resend env updated; pakish-org recreated (backup: ${ENV_FILE}.bak-p21-${TS})"
