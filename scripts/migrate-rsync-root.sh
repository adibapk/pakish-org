#!/usr/bin/env bash
set -euo pipefail

KEY="/root/.ssh/luraflow_old.key"
OLD="opc@193.123.190.180"
SSH="ssh -i ${KEY} -o BatchMode=yes -o IdentitiesOnly=yes -o StrictHostKeyChecking=accept-new"

mkdir -p /root/.ssh
if [ ! -f "${KEY}" ]; then
  cp /home/opc/.ssh/luraflow_old.key "${KEY}"
  chmod 600 "${KEY}"
fi
ssh-keyscan -H 193.123.190.180 >> /root/.ssh/known_hosts 2>/dev/null || true

mkdir -p /data/migrations/pakish/pakishnews/service /data/migrations/pakish/pakishnews/service-data /data/migrations/pakish/apps

echo "=== service configs ==="
rsync -az --rsync-path="sudo rsync" -e "${SSH}" "${OLD}:/data/coolify/services/i2ck4xw2n4hzyeobl325b0lf/" /data/migrations/pakish/pakishnews/service/
rsync -az --rsync-path="sudo rsync" -e "${SSH}" "${OLD}:/data/coolify/services/i2ck4xw2n4hzyeobl325b0lf./" /data/migrations/pakish/pakishnews/service-data/

echo "=== mysql volume ==="
mkdir -p /data/migrations/pakish/volumes/mysql
rsync -az --rsync-path="sudo rsync" -e "${SSH}" "${OLD}:/var/lib/docker/volumes/pakishnews_mysql_data/_data/" /data/migrations/pakish/volumes/mysql/

echo "=== ghost volumes ==="
for lang in en ur ar; do
  mkdir -p "/data/migrations/pakish/volumes/ghost_${lang}"
  rsync -az --rsync-path="sudo rsync" -e "${SSH}" "${OLD}:/var/lib/docker/volumes/pakishnews_ghost_content_${lang}/_data/" "/data/migrations/pakish/volumes/ghost_${lang}/"
done

echo "=== env files ==="
rsync -az --rsync-path="sudo rsync" -e "${SSH}" "${OLD}:/data/coolify/applications/kss4kwgs4w8cs8cskswosog8/.env" /data/migrations/pakish/apps/pakish-net.env
rsync -az --rsync-path="sudo rsync" -e "${SSH}" "${OLD}:/data/coolify/services/i2ck4xw2n4hzyeobl325b0lf/.env" /data/migrations/pakish/pakishnews/service.env

echo "=== sizes ==="
du -sh /var/www/pakishnews /data/migrations/pakish/volumes/* /data/migrations/pakish/pakishnews/service /data/migrations/pakish/pakishnews/service-data
echo "DONE_RSYNC"
