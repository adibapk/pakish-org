#!/bin/bash
set -euo pipefail
docker exec learnhouse-db-d1110885 psql -U learnhouse -d learnhouse <<'SQL'
SELECT id, email, username FROM "user" WHERE email LIKE '%example.com%';
SELECT id, name, public, published, course_uuid FROM course ORDER BY id;
SELECT signup_mode FROM organizationconfig LIMIT 1;
SQL
