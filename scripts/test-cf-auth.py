#!/usr/bin/env python3
import json
import urllib.error
import urllib.request
from pathlib import Path

NET_ENV = "/data/migrations/pakish/deploy/pakish-net.env"
NEWS_ENV = "/data/migrations/pakish/pakishnews/service.env"
NEW_IP = "129.150.34.133"


def load_env(path: str) -> dict:
    vals = {}
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        vals[key.strip()] = value.strip().strip("'").strip('"')
    return vals


from typing import Optional


def req(method: str, url: str, headers: dict, body: Optional[dict] = None):
    data = None if body is None else json.dumps(body).encode()
    request = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={**headers, "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as resp:
            return resp.status, json.load(resp)
    except urllib.error.HTTPError as exc:
        payload = exc.read().decode("utf-8", errors="replace")
        return exc.code, payload[:300]


def test_auth(label: str, headers: dict, zone_id: Optional[str]):
    code, data = req("GET", "https://api.cloudflare.com/client/v4/user/tokens/verify", headers)
    if isinstance(data, dict):
        print(f"{label} verify: {code} success={data.get('success')}")
    else:
        print(f"{label} verify: {code} {data}")
        return

    if not zone_id:
        return

    code, data = req(
        "GET",
        f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records?type=A&per_page=1",
        headers,
    )
    print(f"{label} dns read: {code} success={data.get('success') if isinstance(data, dict) else 'fail'}")

    code, data = req(
        "GET",
        f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records?type=A&name=pakish.net",
        headers,
    )
    if not isinstance(data, dict) or not data.get("result"):
        print(f"{label} list record: {code} no result")
        return

    record_id = data["result"][0]["id"]
    code, data = req(
        "PATCH",
        f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records/{record_id}",
        headers,
        {"content": NEW_IP, "ttl": 300, "proxied": True},
    )
    print(f"{label} dns write: {code} success={data.get('success') if isinstance(data, dict) else data}")


def main():
    net = load_env(NET_ENV)
    news = load_env(NEWS_ENV)
    zone_id = net.get("CLOUDFLARE_ZONE_ID")

    tokens = [
        ("net CLOUDFLARE_API_TOKEN", net.get("CLOUDFLARE_API_TOKEN")),
        ("net CF_API_TOKEN", net.get("CF_API_TOKEN")),
        ("news CF_API_TOKEN", news.get("CF_API_TOKEN")),
    ]
    for label, token in tokens:
        if token:
            test_auth(label, {"Authorization": f"Bearer {token}"}, zone_id)

    if news.get("CF_GLOBAL_API_KEY"):
        test_auth(
            "global key",
            {
                "X-Auth-Email": news.get("CF_AUTH_EMAIL") or "admin@pakish.net",
                "X-Auth-Key": news["CF_GLOBAL_API_KEY"],
            },
            zone_id,
        )


if __name__ == "__main__":
    main()
