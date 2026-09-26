#!/usr/bin/env python3
"""Upsert academy.pakish.org A record in Cloudflare (run on pakish-sg)."""
import json
import urllib.parse
import urllib.request
from pathlib import Path

NEW_IP = "129.150.34.133"
API = "https://api.cloudflare.com/client/v4"


def load_env(path: str) -> dict:
    vals = {}
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        vals[key.strip()] = value.strip().strip("'").strip('"')
    return vals


def main() -> None:
    news = load_env("/data/migrations/pakish/pakishnews/service.env")
    headers = {
        "X-Auth-Email": news.get("CF_AUTH_EMAIL", "admin@pakish.net"),
        "X-Auth-Key": news["CF_GLOBAL_API_KEY"],
    }
    q = urllib.parse.urlencode({"name": "pakish.org"})
    with urllib.request.urlopen(
        urllib.request.Request(f"{API}/zones?{q}", headers=headers), timeout=30
    ) as resp:
        zone_id = json.load(resp)["result"][0]["id"]

    record_name = "academy.pakish.org"
    q = urllib.parse.urlencode({"type": "A", "name": record_name})
    with urllib.request.urlopen(
        urllib.request.Request(f"{API}/zones/{zone_id}/dns_records?{q}", headers=headers),
        timeout=30,
    ) as resp:
        existing = json.load(resp)["result"]

    payload = {
        "type": "A",
        "name": record_name,
        "content": NEW_IP,
        "ttl": 300,
        "proxied": True,
    }
    if existing:
        record_id = existing[0]["id"]
        url = f"{API}/zones/{zone_id}/dns_records/{record_id}"
        method = "PATCH"
    else:
        url = f"{API}/zones/{zone_id}/dns_records"
        method = "POST"

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode(),
        method=method,
        headers={**headers, "Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.load(resp)
    print(
        "success=",
        data.get("success"),
        "name=",
        data.get("result", {}).get("name"),
        "content=",
        data.get("result", {}).get("content"),
    )


if __name__ == "__main__":
    main()
