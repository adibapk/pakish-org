#!/usr/bin/env bash
# Deploy pakish.org to production (pakish-sg / Oracle Singapore).
# Used by GitHub Actions and manual SSH deploys.
set -euo pipefail

APP_DIR="/data/migrations/pakish/apps/pakish-org"
DEPLOY_DIR="/data/migrations/pakish/deploy"
BRANCH="${PAKISH_ORG_BRANCH:-master}"

echo "=== Deploy pakish.org (${BRANCH}) ==="
cd "${APP_DIR}"

git fetch origin "${BRANCH}"
git checkout "${BRANCH}"
git pull --ff-only origin "${BRANCH}"

echo "=== Build image ==="
sudo docker build -t pakish-org:latest .

echo "=== Restart container ==="
cd "${DEPLOY_DIR}"
sudo docker compose up -d pakish-org

echo "=== Done ==="
sudo docker ps --filter name=pakish-org-app
git -C "${APP_DIR}" log -1 --oneline
