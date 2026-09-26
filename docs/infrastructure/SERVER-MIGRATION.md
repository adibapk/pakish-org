# Pakish production server migration (2026-09-25/26)

> **For Cursor agents:** Read this before SSH or deploy actions.

## Production (use this)

| SSH alias | IP | Role |
|-----------|-----|------|
| `pakish-sg` | `129.150.34.133` | **Live** — all Pakish sites |
| `pakish-org` / `pakish-oracle` | `129.150.34.133` | Same as `pakish-sg` |

**Coolify UI:** https://coolify.adiba.pk

### Live apps on `pakish-sg`

| Site | Stack path |
|------|------------|
| pakish.org | `/data/migrations/pakish/deploy/` + `/data/migrations/pakish/apps/pakish-org/` |
| pakish.net | `/data/migrations/pakish/deploy/` |
| pakishnews.com | `/data/coolify/services/pakishnews-stack/` |
| inbox.pakish.net + copilot.pakish.net | `/opt/pakish-whatsapp-platform/deploy/` |

## Retired for Pakish (do NOT deploy here)

| SSH alias | IP | Notes |
|-----------|-----|-------|
| `pakish-oracle-chatwoot` | `193.123.190.180` | Old Luraflow — Pakish removed 2026-09-26 |
| `namepo-coolify` / `namepo-oracle` | `193.123.190.180` | Same host; other tenants only |

Pakish containers, volumes, and `/var/www/pakish*` were deleted from Luraflow.
See `/home/opc/PAKISH-MIGRATED-READ-FIRST.txt` on that server.

## Deploy commands

```bash
# pakish.org
ssh pakish-sg 'bash /data/migrations/pakish/apps/pakish-org/scripts/deploy-pakish-org-prod.sh'

# pakish.net + org compose
ssh pakish-sg 'cd /data/migrations/pakish/deploy && sudo docker compose up -d'

# pakishnews
ssh pakish-sg 'cd /data/coolify/services/pakishnews-stack && sudo docker compose up -d'

# Chatwoot / WhatsApp
ssh pakish-sg 'cd /opt/pakish-whatsapp-platform/deploy && sudo docker compose -p deploy -f docker-compose.yml -f docker-compose.sg.override.yml --env-file ../.env up -d'
```
