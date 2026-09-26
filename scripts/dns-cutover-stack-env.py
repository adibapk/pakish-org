#!/usr/bin/env python3
import json
import time
import urllib.parse
import urllib.error
import urllib.request
from pathlib import Path
from typing import Optional

NEW_IP = "129.150.34.133"
API = "https://api.cloudflare.com/client/v4"
ENV_PATH = "/data/coolify/services/pakishnews-stack/.env"


def load_env(path: str) -> dict:
    vals = {}
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        vals[key.strip()] = value.strip().strip("'").strip('"')
    return vals


def cf_request(method: str, path: str, headers: dict, data: Optional[dict] = None, retries: int = 5):
    body = None if data is None else json.dumps(data).encode()
    for attempt in range(retries):
        req = urllib.request.Request(
            f"{API}{path}",
            data=body,
            method=method,
            headers={**headers, "Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.load(resp)
        except urllib.error.HTTPError as exc:
            payload = exc.read().decode("utf-8", errors="replace")
            if exc.code == 429 and attempt + 1 < retries:
                time.sleep(15 * (attempt + 1))
                continue
            return {"success": False, "status": exc.code, "body": payload[:500]}


def upsert_a(headers: dict, zone_id: str, record_name: str, proxied: bool = True):
    q = urllib.parse.urlencode({"type": "A", "name": record_name})
    existing = cf_request("GET", f"/zones/{zone_id}/dns_records?{q}", headers)
    payload = {
        "type": "A",
        "name": record_name,
        "content": NEW_IP,
        "ttl": 300,
        "proxied": proxied,
    }
    if existing.get("success") and existing.get("result"):
        record_id = existing["result"][0]["id"]
        data = cf_request("PATCH", f"/zones/{zone_id}/dns_records/{record_id}", headers, payload)
    else:
        data = cf_request("POST", f"/zones/{zone_id}/dns_records", headers, payload)
    ok = data.get("success")
    print(f"{record_name}: {'OK' if ok else data}")


def zone_lookup(headers: dict, zone_name: str) -> Optional[str]:
    q = urllib.parse.urlencode({"name": zone_name})
    data = cf_request("GET", f"/zones?{q}", headers)
    if data.get("success") and data.get("result"):
        return data["result"][0]["id"]
    print(f"zone lookup failed for {zone_name}:", data)
    return None


def main():
    env = load_env(ENV_PATH)
    token = env.get("CLOUDFLARE_API_TOKEN") or env.get("CF_API_TOKEN")
    if not token:
        raise SystemExit("missing token")

    headers = {"Authorization": f"Bearer {token}"}
    verify = cf_request("GET", "/user/tokens/verify", headers)
    print("verify:", verify.get("success"), verify.get("result", {}).get("status"))

    net_env = load_env("/data/migrations/pakish/deploy/pakish-net.env")
    news_env = load_env("/data/migrations/pakish/pakishnews/service.env")

    print("=== pakish.net ===")
    upsert_a(headers, net_env["CLOUDFLARE_ZONE_ID"], "pakish.net")
    upsert_a(headers, net_env["CLOUDFLARE_ZONE_ID"], "www")

    print("=== pakishnews.com ===")
    upsert_a(headers, news_env["CLOUDFLARE_ZONE_ID"], "pakishnews.com")
    upsert_a(headers, news_env["CLOUDFLARE_ZONE_ID"], "www")
    upsert_a(headers, news_env["CLOUDFLARE_ZONE_ID"], "en-ghost")
    upsert_a(headers, news_env["CLOUDFLARE_ZONE_ID"], "ur-ghost")
    upsert_a(headers, news_env["CLOUDFLARE_ZONE_ID"], "ar-ghost")

    print("=== pakish.org ===")
    org_zone = zone_lookup(headers, "pakish.org")
    if org_zone:
        upsert_a(headers, org_zone, "pakish.org")
        upsert_a(headers, org_zone, "www")

    print("DNS_CUTOVER_DONE")


if __name__ == "__main__":
    main()
