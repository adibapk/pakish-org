#!/usr/bin/env bash
set -euo pipefail

DB=(sudo docker exec -i coolify-db psql -U coolify -d coolify -v ON_ERROR_STOP=1 -t -A)

echo "=== Current pakish-org application ==="
"${DB[@]}" -c "SELECT a.id, a.name, a.uuid, a.git_repository, a.git_branch, a.status, s.is_auto_deploy_enabled
FROM applications a
LEFT JOIN application_settings s ON s.application_id = a.id
WHERE a.id = 2;"

echo "=== Enable auto-deploy in Coolify DB ==="
"${DB[@]}" -c "UPDATE application_settings SET is_auto_deploy_enabled = true, updated_at = NOW() WHERE application_id = 2;"
"${DB[@]}" -c "INSERT INTO application_settings (application_id, is_auto_deploy_enabled, created_at, updated_at)
SELECT 2, true, NOW(), NOW()
WHERE NOT EXISTS (SELECT 1 FROM application_settings WHERE application_id = 2);"

echo "=== Webhook URL for GitHub ==="
UUID=$("${DB[@]}" -c "SELECT uuid FROM applications WHERE id = 2;")
SECRET=$("${DB[@]}" -c "SELECT COALESCE(manual_webhook_secret_github, '') FROM applications WHERE id = 2;")
echo "App UUID: ${UUID}"
if [[ -n "${SECRET}" ]]; then
  echo "Webhook: https://coolify.adiba.pk/api/v1/deploy?uuid=${UUID}&force=false"
  echo "Secret configured: yes (not printing)"
else
  echo "No manual_webhook_secret_github set yet"
fi

echo "=== After update ==="
"${DB[@]}" -c "SELECT a.id, a.name, s.is_auto_deploy_enabled FROM applications a LEFT JOIN application_settings s ON s.application_id = a.id WHERE a.id = 2;"
