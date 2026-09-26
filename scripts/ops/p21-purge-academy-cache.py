#!/usr/bin/env python3
"""Purge Cloudflare cache for academy.pakish.org (run on pakish-sg)."""
from __future__ import annotations

import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

API = "https://api.cloudflare.com/client/v4"
ENV_PATH = "/data/migrations/pakish/pakishnews/service.env"


def load_env(path: str) -> dict[str, str]:
    vals: dict[str, str] = {}
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        vals[key.strip()] = value.strip().strip("'\"").strip('"')
    return vals


def main() -> int:
    news = load_env(ENV_PATH)
    headers = {
        "X-Auth-Email": news.get("CF_AUTH_EMAIL", "admin@pakish.net"),
        "X-Auth-Key": news["CF_GLOBAL_API_KEY"],
        "Content-Type": "application/json",
    }
    q = urllib.parse.urlencode({"name": "pakish.org"})
    with urllib.request.urlopen(
        urllib.request.Request(f"{API}/zones?{q}", headers=headers), timeout=30
    ) as resp:
        zone_id = json.load(resp)["result"][0]["id"]

    body = json.dumps({"hosts": ["academy.pakish.org"]}).encode()
    req = urllib.request.Request(
        f"{API}/zones/{zone_id}/purge_cache",
        data=body,
        headers=headers,
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        payload = json.load(resp)
    print(json.dumps(payload, indent=2))
    return 0 if payload.get("success") else 1


if __name__ == "__main__":
    raise SystemExit(main())
