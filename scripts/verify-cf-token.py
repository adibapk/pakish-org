import json
import urllib.request

def load_env(path):
    vals = {}
    for line in open(path, encoding="utf-8"):
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        vals[k.strip()] = v.strip().strip("'").strip('"')
    return vals

for label, path in [
    ("net", "/data/migrations/pakish/deploy/pakish-net.env"),
    ("news", "/data/migrations/pakish/pakishnews/service.env"),
]:
    token = load_env(path).get("CLOUDFLARE_API_TOKEN", "")
    req = urllib.request.Request(
        "https://api.cloudflare.com/client/v4/user/tokens/verify",
        headers={"Authorization": f"Bearer {token}"},
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = json.load(resp)
    print(label, "verify", data.get("success"), "len", len(token))
