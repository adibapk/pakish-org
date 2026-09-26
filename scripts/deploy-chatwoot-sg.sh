#!/usr/bin/env bash
set -euo pipefail
cd /opt/pakish-whatsapp-platform/deploy
sudo docker load < /tmp/copilot-image.tgz
sudo tar xzf /tmp/chatwoot-storage.tgz -C /var/lib/docker/volumes/deploy_chatwoot_storage/_data
rm -f /tmp/copilot-image.tgz /tmp/chatwoot-storage.tgz
sudo docker compose -f docker-compose.yml -f docker-compose.sg.override.yml --env-file ../.env up -d
sleep 30
curl -sS -o /dev/null -w 'inbox_local: %{http_code}\n' -H 'Host: inbox.pakish.net' http://127.0.0.1/
curl -sS -o /dev/null -w 'copilot_local: %{http_code}\n' -H 'Host: copilot.pakish.net' http://127.0.0.1/
sudo docker ps --format '{{.Names}} {{.Status}}' | grep deploy-
