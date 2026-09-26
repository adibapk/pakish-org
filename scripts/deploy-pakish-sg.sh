#!/usr/bin/env bash
set -euo pipefail

MIG=/data/migrations/pakish
NEW_IP=129.150.34.133

echo "=== Create docker volumes ==="
for vol in pakishnews_mysql_data pakishnews_ghost_content_en pakishnews_ghost_content_ur pakishnews_ghost_content_ar pakishnews_frontend_article_ai_cache; do
  sudo docker volume create "$vol" >/dev/null 2>&1 || true
done

echo "=== Populate volumes ==="
sudo rsync -a "$MIG/volumes/mysql/" /var/lib/docker/volumes/pakishnews_mysql_data/_data/
sudo rsync -a "$MIG/volumes/ghost_en/" /var/lib/docker/volumes/pakishnews_ghost_content_en/_data/
sudo rsync -a "$MIG/volumes/ghost_ur/" /var/lib/docker/volumes/pakishnews_ghost_content_ur/_data/
sudo rsync -a "$MIG/volumes/ghost_ar/" /var/lib/docker/volumes/pakishnews_ghost_content_ar/_data/
sudo mkdir -p /var/lib/docker/volumes/pakishnews_frontend_article_ai_cache/_data
sudo chown -R 999:999 /var/lib/docker/volumes/pakishnews_mysql_data/_data || true

echo "=== Install service paths ==="
sudo mkdir -p /data/coolify/services/pakishnews-stack /data/coolify/services/pakishnews-stack-data/{mysql/init,mysql,ghost-theme,ghost-theme-ur,ghost-theme-ar,secrets}
sudo cp "$MIG/pakishnews/service/docker-compose.yml" /data/coolify/services/pakishnews-stack/docker-compose.yml
sudo cp "$MIG/pakishnews/service.env" /data/coolify/services/pakishnews-stack/.env
sudo cp -r "$MIG/pakishnews/service-data/"* /data/coolify/services/pakishnews-stack-data/ 2>/dev/null || true
sudo cp /var/www/pakishnews/secrets/google-sa.json /data/coolify/services/pakishnews-stack-data/secrets/google-sa.json 2>/dev/null || true

echo "=== Patch compose paths for new server ==="
sudo sed -i \
  -e 's|/data/coolify/services/i2ck4xw2n4hzyeobl325b0lf./|/data/coolify/services/pakishnews-stack-data/|g' \
  -e 's|i2ck4xw2n4hzyeobl325b0lf|pakishnews-stack|g' \
  -e 's|luraflow-net|coolify|g' \
  /data/coolify/services/pakishnews-stack/docker-compose.yml

echo "=== Build and start pakishnews stack ==="
cd /data/coolify/services/pakishnews-stack
sudo docker compose --env-file .env pull mysql 2>/dev/null || true
sudo docker compose --env-file .env up -d --build

echo "=== Clone/build pakish.org ==="
sudo mkdir -p "$MIG/apps/pakish-org"
if [ ! -d "$MIG/apps/pakish-org/.git" ]; then
  git clone https://github.com/adibapk/pakish-org.git "$MIG/apps/pakish-org"
fi
cd "$MIG/apps/pakish-org"
git fetch origin master && git checkout master && git pull --ff-only || true

echo "=== Clone/build pakish.net ==="
sudo mkdir -p "$MIG/apps/pakish-net"
if [ ! -d "$MIG/apps/pakish-net/.git" ]; then
  git clone https://github.com/adibapk/pakish-net.git "$MIG/apps/pakish-net"
fi
cd "$MIG/apps/pakish-net"
git fetch origin main && git checkout main && git pull --ff-only || true

echo "DEPLOY_PREP_DONE"
