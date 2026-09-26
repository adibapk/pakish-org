#!/usr/bin/env python3
import glob
import json
import urllib.error
import urllib.request
from pathlib import Path

NEW_IP = "129.150.34.133"


def load_env(path):
    vals = {}
    try:
        text = Path(path).read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return vals
    for line in text.splitlines():
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        vals[k.strip()] = v.strip().strip("'").strip('"')
    return vals


def test_token(label, token, zone_id):
    headers = {"Authorization": f"Bearer {token}"}
    url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records?type=A&per_page=1"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.load(resp)
            print(f"{label}: read OK success={data.get('success')}")
            return True
    except urllib.error.HTTPError as exc:
        print(f"{label}: read FAIL {exc.code}")
        return False


def test_global(label, email, key, zone_name):
    headers = {"X-Auth-Email": email, "X-Auth-Key": key}
    url = f"https://api.cloudflare.com/client/v4/zones?name={zone_name}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=20) as resp:
            data = json.load(resp)
            print(f"{label}: zones OK count={len(data.get('result', []))}")
            return True
    except urllib.error.HTTPError as exc:
        print(f"{label}: zones FAIL {exc.code}")
        return False


paths = sorted(
    set(
        glob.glob("/data/migrations/pakish/**/*.env", recursive=True)
        + glob.glob("/data/coolify/services/**/.env", recursive=True)
        + glob.glob("/data/coolify/applications/**/.env", recursive=True)
        + glob.glob("/var/www/pakishnews/**/.env", recursive=True)
    )
)

seen = set()
for path in paths:
    env = load_env(path)
    token = env.get("CLOUDFLARE_API_TOKEN") or env.get("CF_API_TOKEN")
    zone_id = env.get("CLOUDFLARE_ZONE_ID")
    email = env.get("CF_AUTH_EMAIL")
    key = env.get("CF_GLOBAL_API_KEY")

    if token:
        sig = ("token", token[:8], zone_id)
        if sig not in seen and zone_id:
            seen.add(sig)
            test_token(path, token, zone_id)

    if email and key:
        sig = ("global", email, key[:8])
        if sig not in seen:
            seen.add(sig)
            for zone in ["pakish.org", "pakish.net", "pakishnews.com"]:
                test_global(f"{path} [{zone}]", email, key, zone)
