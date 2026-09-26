#!/usr/bin/env bash
set -euo pipefail

NEW_IP="129.150.34.133"
ENV_FILE="/data/migrations/pakish/deploy/pakish-net.env"
# shellcheck disable=SC1090
source "$ENV_FILE"
TOKEN="${CLOUDFLARE_API_TOKEN:?missing token}"
API="https://api.cloudflare.com/client/v4"

update_a_record() {
  local zone_name="$1"
  local record_name="$2"
  echo "=== Updating ${record_name} in zone ${zone_name} ==="
  zone_id=$(curl -s -H "Authorization: Bearer ${TOKEN}" \
    "${API}/zones?name=${zone_name}" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d["result"][0]["id"])')
  record_id=$(curl -s -G -H "Authorization: Bearer ${TOKEN}" \
    --data-urlencode "name=${record_name}" \
    --data-urlencode "type=A" \
    "${API}/zones/${zone_id}/dns_records" | python3 -c 'import json,sys; r=json.load(sys.stdin)["result"]; print(r[0]["id"] if r else "")')
  if [ -z "$record_id" ]; then
    echo "Creating A record ${record_name}"
    curl -s -X POST -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" \
      --data "{\"type\":\"A\",\"name\":\"${record_name}\",\"content\":\"${NEW_IP}\",\"ttl\":300,\"proxied\":true}" \
      "${API}/zones/${zone_id}/dns_records" | python3 -c 'import json,sys; d=json.load(sys.stdin); print("OK" if d.get("success") else d)'
  else
    curl -s -X PATCH -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" \
      --data "{\"type\":\"A\",\"name\":\"${record_name}\",\"content\":\"${NEW_IP}\",\"ttl\":300,\"proxied\":true}" \
      "${API}/zones/${zone_id}/dns_records/${record_id}" | python3 -c 'import json,sys; d=json.load(sys.stdin); print("OK" if d.get("success") else d)'
  fi
}

# pakish.org apex may be DNS-only; still set proxied true for consistency with www
update_a_record "pakish.org" "pakish.org"
update_a_record "pakish.org" "www"
update_a_record "pakish.net" "pakish.net"
update_a_record "pakish.net" "www"
update_a_record "pakishnews.com" "pakishnews.com"
update_a_record "pakishnews.com" "www"
update_a_record "pakishnews.com" "en-ghost"
update_a_record "pakishnews.com" "ur-ghost"
update_a_record "pakishnews.com" "ar-ghost"

echo "DNS_CUTOVER_DONE"
