#!/usr/bin/env bash
set -euo pipefail
sudo docker exec -i learnhouse-db-d1110885 psql -U learnhouse -d learnhouse <<'SQL'
\dt
SELECT column_name FROM information_schema.columns WHERE table_name='course' ORDER BY ordinal_position;
SELECT * FROM course LIMIT 10;
SQL
