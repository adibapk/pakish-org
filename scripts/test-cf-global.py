#!/usr/bin/env python3
import json
import urllib.error
import urllib.request
from pathlib import Path

paths = [
    "/data/migrations/pakish/pakishnews/service.env",
    "/data/migrations/pakish/deploy/pakish-net.env",
]


def load_env(path):
    vals = {}
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        vals[k.strip()] = v.strip().strip("'").strip('"')
    return vals


def test_global(email, key, zone_name):
    headers = {"X-Auth-Email": email, "X-Auth-Key": key}
    url = f"https://api.cloudflare.com/client/v4/zones?name={zone_name}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.load(resp)
            print(f"{zone_name}: zones success={data.get('success')} count={len(data.get('result', []))}")
            return data["result"][0]["id"] if data.get("result") else None
    except urllib.error.HTTPError as exc:
        print(f"{zone_name}: zones FAIL {exc.code} {exc.read()[:180]}")


news = load_env(paths[0])
email = news.get("CF_AUTH_EMAIL") or "admin@pakish.net"
key = news.get("CF_GLOBAL_API_KEY", "")
print("email set:", bool(email), "key set:", bool(key))
for zone in ["pakish.org", "pakish.net", "pakishnews.com"]:
    test_global(email, key, zone)
