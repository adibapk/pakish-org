#!/bin/sh
set -e

# Named volumes mount as root; the app runs as nextjs and stores leads under .data/
mkdir -p /app/.data/admissions
chown -R nextjs:nodejs /app/.data

if [ "$(id -u)" = "0" ]; then
  exec su-exec nextjs "$@"
fi

exec "$@"
