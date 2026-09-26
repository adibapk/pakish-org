# PROMPT NUMBER: 15

## Project

Pakish Institute

Repository: `C:\Users\pakis\My-Projects\pakish-org`

Production website: `https://pakish.org`

Production Academy: `https://academy.pakish.org`

Google Cloud project: `pakish-org`

## Mission

Complete production Google sign-in for the invite-only Pakish Academy, permanently fix the broken Academy logos and remaining LearnHouse-facing auth cosmetics shown in the owner screenshots, repair the false-red deployment workflow post-step, then commit, push, deploy/apply, and prove all three outcomes without weakening registration controls or exposing credentials.

This is a production authentication task. Investigate the exact current LearnHouse 1.3.6 deployment, Google Auth Platform state, repository state, and prior Prompt 14 deployment before making changes. Do not use generic NextAuth assumptions.

## Owner authorization and interaction boundary

The owner has explicitly authorized configuration of Google sign-in in Google Cloud project `pakish-org` and the corresponding production LearnHouse secrets/configuration.

- The owner reports that Google Cloud is signed in. Confirm the selected account and project before any mutation.
- If Google requests a passkey, MFA, CAPTCHA, password, or account reauthentication, pause at that screen and ask the owner to complete it directly. Never request, read, type, record, or report those credentials.
- Creating the minimum required Google OAuth consent configuration and one production Web application client is in scope.
- Do not enable paid Google APIs, billing, broad API scopes, service accounts, domain-wide delegation, API keys, or unrelated credentials.
- Do not create an Academy account for an uninvited real user merely to test OAuth.

## Verified handoff and investigation findings — recheck them

- Prompt 14 reports the website deployed at `b7aa545`; `master` was clean and aligned with `origin/master`.
- GitHub Actions run `36232615822` reportedly built/deployed successfully but ended red because `scripts/deploy-pakish-org-prod.sh` runs `git log -1 --oneline` after changing to the non-Git deploy directory.
- Academy is LearnHouse 1.3.6 at `academy.pakish.org`; public signup is `inviteOnly`; AI is disabled; the pilot remains private.
- LearnHouse 1.3.6 source uses these server-side variables:
  - `LEARNHOUSE_GOOGLE_CLIENT_ID`
  - `LEARNHOUSE_GOOGLE_CLIENT_SECRET`
- LearnHouse constructs this exact callback:
  - `https://academy.pakish.org/auth/callback/google`
- It requests only `openid email profile` and uses the server routes `/api/auth/google/authorize` and `/api/auth/google/token`.
- The API validates the Google token audience against the configured Google client ID. Both the web/token exchange and API audience verification must receive the same client ID.
- Current broken organization logo request:
  - `https://academy.pakish.org/content/orgs/org_e3575732-8173-4b7b-bd4c-f80c0ccdb71e/logos/logo.svg`
  - returns HTTP 200 as `application/octet-stream` with `X-Content-Type-Options: nosniff`; browsers therefore refuse to render it as an image.
- The corresponding `logo.png` endpoint returns HTTP 200 with `Content-Type: image/png`. The durable fix should migrate the organization logo and thumbnail references to the supported PNG asset and update the idempotent branding script, not suppress the broken-image icon with CSS.
- Owner screenshots also show stale `LearnHouse` alt/wordmark/legal copy and misleading `Sign up` links on invite-only authentication surfaces. Treat these as part of the branding/UX correction.

## Coordination and production safety

1. Read `AGENTS.md`, Prompt 14 report/current commit, `docs/academy/*`, the full current diff/status/log, `.github/workflows/deploy-production.yml`, `scripts/deploy-pakish-org-prod.sh`, `scripts/ops/prompt14-academy-branding.py`, current LearnHouse compose/env/config, and exact deployed LearnHouse 1.3.6 source before editing.
2. Verify branch/upstream and active agents. Preserve unrelated work; never reset, clean, stash, force, rebase, or use broad staging.
3. Before production mutation, verify the Academy backup and rollback target. Back up only the narrow configuration being changed: Google Auth Platform client details as provider metadata, server `.env`/compose/config files with owner-only permissions, and the relevant organization database row/config. Never include secret values in evidence.
4. Never print, echo, screenshot, commit, paste into chat/report, or leave in shell history the OAuth client secret, tokens, cookies, passwords, invite codes, private learner data, or broad environment content.
5. Store secrets only in the existing server-side secret/environment mechanism with `0600` or stricter permissions. Do not add secrets to GitHub, repository files, prompt docs, logs, command lines visible in process listings, or client-side `NEXT_PUBLIC_*` variables.
6. Use narrow service recreation/restart and confirm the real compose service/container names. A plain container restart does not inject newly added compose environment; use the supported targeted recreation path.
7. Keep `signup_mode=inviteOnly`. Google sign-in is an authentication method for existing/invited users, not a new public-registration bypass.

## Work package A — Google Auth Platform and OAuth client

### A1. Verify provider identity and current state

In the authenticated Google Cloud console:

- Confirm project ID is exactly `pakish-org`; record the project number in the private evidence report without exposing unrelated account data.
- Inspect Google Auth Platform sections: Branding, Audience, Clients, Data Access and Verification/Publishing status.
- Reuse an existing correct Pakish Academy Web client if and only if its type, redirect URI, ownership and secret are verifiably correct. Do not create duplicates blindly.
- If conflicting/legacy clients exist, inventory names and status without deleting them. Removal is out of scope unless clearly disposable and separately approved.

### A2. Configure the minimal consent application

Configure or correct the Google Auth Platform application as follows:

- App name: `Pakish Institute Academy`
- User support email: use the owner-approved Pakish support identity already selected in the console; do not substitute a personal address.
- App home page: `https://pakish.org`
- Privacy policy: `https://pakish.org/privacy`
- Authorized domain: `pakish.org`
- Developer contact: the owner-approved Pakish support identity
- Audience: `External`, because invited learners may use non-Workspace Google accounts
- Data access/scopes: only OpenID Connect `openid`, email and profile
- Do not request Gmail, Drive, Calendar, offline business-data, sensitive or restricted scopes.

Use Production publishing status when Google permits it for this basic-scope app so invited users are not limited to a temporary test-user list. Do not submit an unnecessary sensitive-scope verification request. If Google shows a genuine verification/domain-ownership blocker, capture the non-sensitive status and stop that provider step with the exact owner action required.

### A3. Create or correct one Web application client

Use application type `Web application` and name it `Pakish Academy Production`.

Authorized JavaScript origin:

- `https://academy.pakish.org`

Authorized redirect URI — exact scheme, host, path and trailing-slash state:

- `https://academy.pakish.org/auth/callback/google`

Do not add localhost, raw IPs, wildcard domains, `https://pakish.org/academy`, the main website `/signup`, or guessed callback paths to the production client.

When the client is created or opened:

- Transfer the client ID and secret directly into the authorized production server configuration without exposing them in output.
- Do not download or retain a client-secret JSON unless required. If a temporary file is unavoidable, create it with owner-only permissions outside the repository, use it once, and securely remove it after server configuration and verification.
- Clear any clipboard/temp value after use.

## Work package B — LearnHouse production configuration and OAuth proof

### B1. Configure the exact supported variables

- Inspect the actual `/home/opc/.learnhouse/pakish/.env`, `docker-compose.yml`, `learnhouse.config.json`, and deployed container environment using allowlisted variable-name/presence checks only. Do not print values.
- Add/update `LEARNHOUSE_GOOGLE_CLIENT_ID` and `LEARNHOUSE_GOOGLE_CLIENT_SECRET` in the canonical server-side source of truth used by the LearnHouse application.
- Ensure the app web server and backend/API audience check both receive the same client ID. Do not add a client secret to frontend/public build variables.
- Preserve the native-domain settings already proven for `academy.pakish.org`, invite-only signup, AI disabled state, private pilot visibility and all unrelated secrets.
- Recreate only the necessary LearnHouse service(s) through the real compose project so the new environment is injected. Verify health of all five stack services afterward.

### B2. Verify OAuth initiation before account mutation

Using a fresh browser context:

- Open `https://academy.pakish.org/login` and click `Sign in with Google`.
- Verify navigation reaches `accounts.google.com`, uses the expected non-secret client ID, exact callback URI, `openid email profile`, state/CSRF protection, and branded consent application.
- Confirm there is no `redirect_uri_mismatch`, `invalid_client`, JavaScript-origin, blocked-app, or unverified-app error.
- Inspect Academy/browser/server logs for errors without printing authorization codes or tokens.

### B3. Complete one authorized existing-user login

- Determine privately whether the Google account the owner intends to use matches an existing/invited Academy user. Query only the minimum existence/role fact; never print the email if it is not already owner-provided.
- If it matches an existing authorized Academy user, ask the owner to complete Google account selection/consent when required, then prove callback, Academy session creation, protected-page access, refresh/deep link, logout and post-logout protection.
- If it does not match, do not silently create or link a real account. Stop the end-to-end account step and report the precise invitation/account-matching action required. OAuth initiation/configuration can still be reported separately as provider-configured, not business-flow-proven.
- Verify an uninvited identity cannot bypass `inviteOnly`. Prefer source/API gate evidence or a disposable owner-approved synthetic identity; do not create an unwanted real account.
- Confirm existing password login remains functional. Do not lock the owner out and do not make Google the only login method in this phase.

## Work package C — durable Academy branding and invite-only UX

### C1. Fix organization logo MIME/reference permanently

- Update `scripts/ops/prompt14-academy-branding.py` so its idempotent database/config update sets both `logo_image` and `thumbnail_image` to `logo.png`, after verifying that the PNG exists and is a valid Pakish asset.
- Apply the same narrow update to production using the existing safe branding procedure, with before/after database-row evidence and rollback SQL/config.
- Do not keep `logo.svg` as the organization media reference while the content service serves it as `application/octet-stream` plus `nosniff`.
- Do not disable `nosniff`, weaken security headers, add a broad MIME proxy override, or hide broken images with CSS.
- Preserve `/lrn.svg` only where it is correctly served as `image/svg+xml` and genuinely contains Pakish artwork. Prefer the organization PNG for dynamic organization logos.

### C2. Remove remaining visible LearnHouse branding accurately

Inspect rendered HTML, RSC payloads, client bundles and source templates for the exact 1.3.6 deployment. Correct remaining user-visible items on home, login, signup/invite-required, logout and 404/error views:

- broken image/alt text
- LearnHouse wordmark/logo
- `LearnHouse's Terms of Service and Privacy Policy`
- external links to LearnHouse where Pakish-owned policy/navigation is intended

Because Pakish currently has a verified privacy page but no separately verified terms page, do not invent a Terms of Service URL or relabel privacy as terms. Use legally honest copy such as `By continuing, you agree to Pakish Institute's Privacy Policy.` linked to `https://pakish.org/privacy`, unless a real terms page is found.

Favor durable, idempotent source/overlay/script changes that survive container recreation. Avoid blind global binary replacement. Every replacement must be targeted and followed by a syntax/build/runtime check.

### C3. Align invite-only UI

- Keep the supported backend `inviteOnly` enforcement.
- On general login/public catalogue surfaces, hide or replace misleading `Sign up` buttons and `Don't have an account? Sign up` prompts when the organization is invite-only.
- Use concise copy such as `Academy access is issued after admission and enrollment confirmation.` with a link to `https://pakish.org/admission` where appropriate.
- Direct access to Academy `/signup` must continue to show an invitation-required boundary and must not permit open account creation.
- Google sign-in must remain visible on login because it is now an approved sign-in method for existing/invited users.

### C4. Visual acceptance criteria

Verify in fresh desktop and mobile sessions:

- top-left Academy navigation shows the Pakish logo with nonzero natural width/height
- login branding panel shows a crisp, correctly contained Pakish logo without broken-image icon, stretching or white-on-white invisibility
- login, Academy home, invite-required signup and 404/error views contain no visible LearnHouse logo/wordmark
- logo requests return 200 with a browser-renderable image MIME type
- no mixed content, CSP, CORS, hydration, console or failed-image network errors
- favicon/title remain Pakish branded

Capture before/after screenshots without showing account details, tokens or private course data.

## Work package D — repair the false-red deployment workflow

- Reproduce/confirm the Prompt 14 failure from GitHub Actions run `36232615822` and distinguish the successful container deployment from the failing reporting command.
- Fix `scripts/deploy-pakish-org-prod.sh` so the final commit report runs against `APP_DIR`, for example with `git -C "${APP_DIR}" log -1 --oneline`, rather than executing `git log` after `cd "${DEPLOY_DIR}"`.
- Keep `set -euo pipefail`, fast-forward-only pulls, existing branch control and deployment behavior.
- Add a lightweight shell syntax/static check if the repository has an established mechanism; do not introduce a large dependency for one line.
- Ensure deployment output prints the deployed repository SHA from the correct checkout without exposing secrets.

## Work package E — validation, release and production proof

### E1. Local/repository gates

Run:

- current full tests
- lint
- production build
- `git diff --check`
- shell syntax check for changed shell scripts
- Python syntax check for changed operations scripts
- secret scan of the exact intended diff and untracked paths

Review every changed file. Stage exact paths only; never use `git add .` or `git add -A`.

### E2. Commit, push and deploy/apply

- Create focused professional commit(s) for the OAuth/branding/CI follow-up.
- Push `master` without force only after mandatory pre-deploy gates pass.
- Monitor the new GitHub Actions run and prove it reports success through the corrected post-deploy step, tied to the exact commit SHA and running production image/container.
- Apply the Academy OAuth/branding configuration through the confirmed production procedure. Repository deployment and Academy service configuration are separate evidence classes; report both.
- If the Academy change fails, restore the backed-up env/config/organization row and recreate the prior service state. If the main-site deploy fails, use the proven previous image/SHA rollback.

### E3. Final production proof

Prove separately:

1. Google provider configuration: correct project/client/type/origin/redirect/scopes/publishing state.
2. Academy configuration: required env-variable presence, healthy services, audience validation enabled, invite-only unchanged.
3. OAuth initiation: real Google authorization page opens with correct callback and no provider error.
4. OAuth business flow: completed existing-authorized-user sign-in, protected page, refresh, logout and post-logout denial — or explicitly `NOT PROVEN` if owner account matching/consent was unavailable.
5. Branding: rendered desktop/mobile screenshots and network evidence for all required auth/error surfaces.
6. CI: new workflow run green and deployment tied to exact SHA.

HTTP 200, a visible Google button, or stored env keys alone do not prove Google sign-in works.

## Definition of done

Prompt 15 is accepted only when:

- Google Auth Platform uses project `pakish-org`, minimal basic scopes and the exact Academy callback.
- OAuth secrets are stored only in the protected production server configuration and never leaked or committed.
- LearnHouse successfully initiates Google OAuth; an existing authorized user completes the full flow, unless the report explicitly stops as partial for owner account matching/consent.
- `inviteOnly` remains enforced and uninvited OAuth cannot create an Academy membership.
- Both screenshot-reported logos render correctly and remaining named LearnHouse auth/error cosmetics are removed.
- Password login and Academy health remain intact.
- the deployment workflow no longer reports failure after a successful deployment.
- exact commits, push, deployed SHA/image, service state, rollback references and final clean Git status are evidenced.

## Final evidence report

Return:

- decision: `PROMPT 15 ACCEPTED`, `PARTIAL`, or `BLOCKED`
- Google project/client configuration summary without IDs or secrets beyond a short non-sensitive suffix if necessary
- consent audience/publishing/scopes and exact redirect URI
- server variable presence matrix with values fully redacted
- OAuth initiation and end-to-end login evidence, clearly separated
- invite-only bypass test/evidence
- logo root cause and exact durable fix
- desktop/mobile routes checked and sanitized before/after screenshot paths
- local tests/build/lint/script checks and results
- commit(s), branch, GitHub Actions run, deployed SHA/image and Academy service recreation evidence
- backup and rollback references
- remaining risks/P2 items
- final `git status --short --branch`

Never include the OAuth client secret, full client ID, authorization code, access/refresh/ID token, password, cookies or private learner information in the report.
