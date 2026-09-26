#!/usr/bin/env python3
"""
Purge Cloudflare cache for academy.pakish.org only.

Fail-closed helper: requires explicit least-privilege credentials in the
process environment. Does nothing when inputs or permissions are missing.

Usage (on pakish-sg or any host with outbound HTTPS):
  CF_API_TOKEN=... CF_ZONE_ID=... python3 scripts/ops/p21-purge-academy-cache.py

Dashboard alternative: Cloudflare → Caching → Custom Purge → Hostname:
  academy.pakish.org
"""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request

API = "https://api.cloudflare.com/client/v4"
ALLOWED_HOST = "academy.pakish.org"


def main() -> int:
    token = os.environ.get("CF_API_TOKEN", "").strip()
    zone_id = os.environ.get("CF_ZONE_ID", "").strip()
    if not token or not zone_id:
        print(
            "error: CF_API_TOKEN and CF_ZONE_ID must both be set; "
            "or purge academy.pakish.org manually in the Cloudflare dashboard.",
            file=sys.stderr,
        )
        return 2

    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    body = json.dumps({"hosts": [ALLOWED_HOST]}).encode()
    req = urllib.request.Request(
        f"{API}/zones/{zone_id}/purge_cache",
        data=body,
        headers=headers,
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            payload = json.load(resp)
    except urllib.error.HTTPError as error:
        print(
            f"error: Cloudflare purge failed with HTTP {error.code}; "
            "verify token scope (Cache Purge) and zone ID.",
            file=sys.stderr,
        )
        return 1

    if not payload.get("success"):
        print("error: Cloudflare purge rejected the request.", file=sys.stderr)
        return 1

    print(f"purged Cloudflare cache for hostname {ALLOWED_HOST}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
