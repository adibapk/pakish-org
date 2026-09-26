#!/usr/bin/env bash
# Apply Pakish branding to the LearnHouse Academy stack on pakish-sg.
# Run on the server after git pull: bash scripts/ops/prompt14-academy-branding.sh
set -euo pipefail

INSTALL_DIR="/home/opc/.learnhouse/pakish"
REPO_DIR="${REPO_DIR:-/data/migrations/pakish/apps/pakish-org}"

cd "$REPO_DIR"
if [[ ! -f scripts/ops/pakish-logo.png ]]; then
  echo "Generating pakish-logo.png from public/logo.svg..."
  npx --yes sharp-cli resize 540 200 -i public/logo.svg -o scripts/ops/pakish-logo.png -f png
fi

python3 scripts/ops/prompt14-academy-branding.py
echo "Done. Verify: https://academy.pakish.org/login and a 404 URL."
