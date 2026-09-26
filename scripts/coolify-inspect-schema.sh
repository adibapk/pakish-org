#!/usr/bin/env bash
set -euo pipefail
DB="sudo docker exec -i coolify-db psql -U coolify -d coolify"

for t in projects environments applications services servers teams; do
  echo "===== $t columns ====="
  echo "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name='$t' ORDER BY ordinal_position;" | $DB
done

echo "===== adibapk application sample ====="
echo "SELECT * FROM applications WHERE id=1 \gx" | $DB

echo "===== old server service sample (via ssh) skipped ====="
