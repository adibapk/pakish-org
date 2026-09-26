# PROMPT NUMBER: 11

## Project and prerequisite

Repository: `C:\Users\pakis\My-Projects\pakish-org`  
Master plan: `C:\Users\pakis\My-Projects\pakish-org\docs\PAKISH_COMMERCIAL_LAUNCH_MASTER_PLAN.md`

Run only after Prompt 10 has been reviewed. Move the existing LearnHouse Academy from the fragile `/academy` path-prefix arrangement to the native `academy.pakish.org` product boundary and harden it for a controlled launch.

## Investigate first

- Read `AGENTS.md`, the master plan, Prompt 9 source if available, Prompt 10 report/diff, and current git/server state.
- Reconfirm main-site framework/deployment and the actual Academy app, version, containers, database, proxy, domains, environment, storage, email, object storage, signup, auth, modules, and backups.
- Verify DNS and TLS ownership before changing routes.
- Take and verify a recoverable pre-change backup of Academy database/configuration. Record location, timestamp, and restore command without exposing secrets.
- Treat current facts as stale until reverified. Do not assume the previous LearnHouse 1.3.6/container state remains unchanged.

## Implement

- Configure `academy.pakish.org` as the Academy’s native canonical origin with correct HTTPS, forwarded headers, redirects, cookies, callback URLs, CORS/CSRF behavior, and generated links.
- Make `pakish.org/academy` a clean permanent entry/redirect after the subdomain is proven; do not retain a proxy that breaks root-relative links or auth/API redirects.
- Update main-site Academy navigation/CTA to the verified subdomain.
- Disable inappropriate open self-registration unless the approved enrollment flow requires it.
- Disable unused public modules/features and AI/payment surfaces that are not configured for launch.
- Remove, unpublish, or noindex disposable/test courses and confirm authenticated content is not indexed.
- Keep only required roles and preserve admin recovery access.
- Do not turn on AI tutor, outbound email, S3/object storage, or payment integration with guessed credentials/settings.

## Verification

- Validate DNS, certificate chain, HTTP-to-HTTPS, canonical origin, and security headers.
- In a fresh browser, test landing/login/logout/password recovery behavior, authenticated navigation, one known course route, refresh/deep links, cookies, redirects, console, and network calls.
- Confirm `/academy` entry behavior from the main site.
- Confirm robots/indexing behavior for public vs authenticated Academy routes.
- Perform a backup restore rehearsal or non-destructive restore validation appropriate to the platform.
- Capture exact deployed container/image/version and configuration changes.

## Safety and stop boundary

- Coordinate with all current infrastructure WIP. Do not overwrite uncommitted scripts/docs or another agent’s live change.
- Never print secrets or broad environment output.
- Make no real student accounts or notifications.
- Do not start course migration or enrollment automation.
- Do not push or deploy main-repo code unless explicitly required for the verified redirect; leave scoped changes ready for final Prompt 14 review.
- Stop after reporting this phase. Do not start Prompt 12.

## Final report

Provide current architecture, backup/rollback proof, exact configuration/code changes, URL/browser evidence, security decisions, remaining blockers, and exact git status.

