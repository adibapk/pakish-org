#!/usr/bin/env bash
set -euo pipefail

KEY="$HOME/.ssh/luraflow_old.key"
OLD="opc@193.123.190.180"
SSH="ssh -i $KEY -o BatchMode=yes -o IdentitiesOnly=yes"

echo "=== rsync pakishnews source ==="
rsync -az --rsync-path="sudo rsync" -e "$SSH" "$OLD:/var/www/pakishnews/" /var/www/pakishnews/

echo "=== rsync service configs ==="
sudo mkdir -p /data/migrations/pakish/pakishnews/service /data/migrations/pakish/pakishnews/service-data
sudo rsync -az -e "$SSH" "$OLD:/data/coolify/services/i2ck4xw2n4hzyeobl325b0lf/" /data/migrations/pakish/pakishnews/service/
sudo rsync -az -e "$SSH" "$OLD:/data/coolify/services/i2ck4xw2n4hzyeobl325b0lf./" /data/migrations/pakish/pakishnews/service-data/

echo "=== rsync mysql volume ==="
sudo mkdir -p /data/migrations/pakish/volumes/mysql
rsync -az --rsync-path="sudo rsync" -e "$SSH" "$OLD:/var/lib/docker/volumes/pakishnews_mysql_data/_data/" /data/migrations/pakish/volumes/mysql/

echo "=== rsync ghost volumes ==="
for lang in en ur ar; do
  sudo mkdir -p "/data/migrations/pakish/volumes/ghost_${lang}"
  rsync -az --rsync-path="sudo rsync" -e "$SSH" "$OLD:/var/lib/docker/volumes/pakishnews_ghost_content_${lang}/_data/" "/data/migrations/pakish/volumes/ghost_${lang}/"
done

echo "=== rsync env files ==="
sudo mkdir -p /data/migrations/pakish/apps
sudo rsync -az -e "$SSH" "$OLD:/data/coolify/applications/kss4kwgs4w8cs8cskswosog8/.env" /data/migrations/pakish/apps/pakish-net.env
sudo rsync -az -e "$SSH" "$OLD:/data/coolify/services/i2ck4xw2n4hzyeobl325b0lf/.env" /data/migrations/pakish/pakishnews/service.env

echo "=== sizes ==="
du -sh /var/www/pakishnews /data/migrations/pakish/volumes/* /data/migrations/pakish/pakishnews
echo "DONE_RSYNC"
