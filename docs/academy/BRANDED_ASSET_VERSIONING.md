# Academy branded asset versioning

## Provenance

| Item | Value |
|------|--------|
| Upstream image | `ghcr.io/learnhouse/app:1.3.6` |
| Pinned digest | `sha256:f911d7cb60680f1f99ec67f831c8f5f9fc3107f55f479e65e47e6a24c2e183f9` |
| Overlay entrypoint | `scripts/ops/prompt14-academy-branding.py` |
| Fingerprint helper | `scripts/ops/academy_asset_fingerprint.py` |
| Contract tests | `lib/ops/academy-asset-fingerprint.test.ts` |

This is a **version-pinned compatibility overlay**, not an upstream theme API. Source files under `/app/web` are patched for operator clarity, but the browser executes **prebuilt** `.next` chunks. Those chunks are served with `Cache-Control: public, max-age=31536000, immutable`.

## Why URL fingerprinting is required

HTML/RSC for auth routes is `private, no-cache, no-store`. Static chunks are immutable for one year. Mutating bytes behind `/_next/static/chunks/<same-name>.js` leaves returning browsers on stale JS (React hydration `#418`, old LearnHouse legal UI) even after a Cloudflare hostname purge.

After every content patch to `/app/web/.next/static/{chunks,media}/*`, the overlay:

1. Patches compiled JS **inside the container** (host-side per-file `docker cp` loops are too slow and previously hung applies)
2. Writes a content-addressed sibling `*-pk<sha8>.*`
3. Rewrites references across `/app/web/.next`
4. Bumps `BUILD_ID` from `learnhouse-production` to `learnhouse-production-pk<stamp>` and renames `static/<BUILD_ID>/`

Old basenames are left on disk as orphans so mid-flight tabs do not 404 harder than they already would; fresh HTML never points at them.

## Apply / rollback

```bash
# On pakish-sg, from the deployment checkout (never scp over tracked files):
cd /data/migrations/pakish/apps/pakish-org   # or current deploy path
git pull
python3 scripts/ops/prompt14-academy-branding.py
```

Backup: `learnhouse-db-prompt21-branding-<UTC>.dump` under `/home/opc/.learnhouse/pakish/backups/` with mode `600` (umask `077` during create).

Rollback:

1. Restore DB from the exact dump recorded in the apply report (`pg_restore`).
2. Recreate/restart the Academy container from the pinned digest (writable layer resets to upstream bytes).
3. Re-apply a known-good overlay commit only if needed.

## Future LearnHouse upgrades

1. Pull the new image; record tag + digest.
2. Revalidate every `COMPILED_REPLACEMENTS` hit-count gate and structural regex against the new compiled chunks.
3. Re-run the overlay so patches + fingerprinting produce **new** chunk URLs again.
4. Preserve upstream `LICENSE` / notice files; do not strip attribution artifacts outside public UI surfaces.

## What this does not do

- Does not build a Pakish-owned LearnHouse image yet (preferred long-term; overlay remains until that exists).
- Does not merge `master`, deploy `pakish.org`, or purge Cloudflare by itself.
- Does not change signup mode, OAuth, courses, or user data beyond org logo/watermark/footer config already owned by the overlay.
