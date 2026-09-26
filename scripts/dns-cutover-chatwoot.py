#!/usr/bin/env python3
"""DNS cutover for Chatwoot subdomains on pakish.net zone."""
import json
import urllib.parse
import urllib.request
from pathlib import Path

NEW_IP = "129.150.34.133"
API = "https://api.cloudflare.com/client/v4"
NET_ENV = "/data/migrations/pakish/deploy/pakish-net.env"
RECORDS = ["inbox.pakish.net", "copilot.pakish.net"]


def load_env(path: str) -> dict:
    vals = {}
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        vals[key.strip()] = value.strip().strip("'").strip('"')
    return vals


def cf(method, path, headers, data=None):
    body = None if data is None else json.dumps(data).encode()
    req = urllib.request.Request(
        f"{API}{path}",
        data=body,
        method=method,
        headers={**headers, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def upsert_a(headers, zone_id, name):
    q = urllib.parse.urlencode({"type": "A", "name": name})
    existing = cf("GET", f"/zones/{zone_id}/dns_records?{q}", headers)
    payload = {"type": "A", "name": name, "content": NEW_IP, "ttl": 300, "proxied": True}
    if existing.get("result"):
        rid = existing["result"][0]["id"]
        out = cf("PATCH", f"/zones/{zone_id}/dns_records/{rid}", headers, payload)
    else:
        out = cf("POST", f"/zones/{zone_id}/dns_records", headers, payload)
    print(f"{name}: {'OK' if out.get('success') else out}")


def main():
    env = load_env(NET_ENV)
    token = env.get("CLOUDFLARE_API_TOKEN") or env.get("CF_API_TOKEN")
    headers = {"Authorization": f"Bearer {token}"}
    zone_id = env["CLOUDFLARE_ZONE_ID"]
    verify = cf("GET", "/user/tokens/verify", headers)
    print("verify:", verify.get("success"), verify.get("result", {}).get("status"))
    for name in RECORDS:
        upsert_a(headers, zone_id, name)


if __name__ == "__main__":
    main()
