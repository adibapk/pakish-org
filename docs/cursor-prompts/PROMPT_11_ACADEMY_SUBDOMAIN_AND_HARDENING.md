# PROMPT NUMBER: 11

## Project

Pakish Institute

Repository: `C:\Users\pakis\My-Projects\pakish-org`

Authoritative plan: `C:\Users\pakis\My-Projects\pakish-org\docs\PAKISH_COMMERCIAL_LAUNCH_MASTER_PLAN.md`

Infrastructure reference: `C:\Users\pakis\My-Projects\pakish-org\docs\infrastructure\SERVER-MIGRATION.md`

## Mission

Complete the small remaining Prompt 10 acceptance gaps, then establish the existing LearnHouse Academy on the native canonical origin `https://academy.pakish.org` and harden it for controlled course delivery.

This is one fast-track phase with two sequential work packages:

1. Prompt 10 closeout and local browser acceptance.
2. Academy native-subdomain implementation, security hardening, and production proof.

Do not start Prompt 12 admission/payment automation or Prompt 13 course migration.

## Verified handoff state

Treat this only as a starting snapshot and recheck it before acting:

- Branch was `master`, aligned to `origin/master` at commit `78f6820`.
- Prompt 10 work was intentionally uncommitted and unstaged: 36 tracked files modified plus 8 new files.
- Independent checks passed on 2026-09-26:
  - `npm run build`: passed, 33 routes, including `/womens-empowerment`.
  - `npm run lint`: 0 errors, 1 existing React Compiler warning in `components/admission/course-admission-form.tsx` at the React Hook Form `watch()` call.
  - Public retired-term scan: no `Fi Sabilillah`/`Sabilillah` matches outside documentation/history.
- Core Prompt 10 positioning is accepted, but three acceptance gaps remain:
  1. `components/layout/sections/team.tsx` still says the institute guides “the next generation of women in tech,” which conflicts with the inclusive commercial master brand.
  2. `lib/course-goals.ts` emits `/courses?goal=...`, but `app/courses/page.tsx` and `components/courses/courses-index-content.tsx` do not interpret or visibly acknowledge that filter.
  3. `Join an Upcoming Gathering` points to generic `/#contact`; the contact form has a gathering subject option but the CTA does not preselect or preserve that intent.
- Prompt 10 browser/mobile/keyboard/reduced-motion QA has not yet been performed.
- The infrastructure files previously in flight were committed in `78f6820`; nevertheless, inspect current status and do not assume no new external WIP exists.

## Non-negotiable coordination rules

1. Read `AGENTS.md`, the master plan, this prompt, the current Prompt 10 diff, and the infrastructure reference completely.
2. Read the relevant Next.js 16 documentation under `node_modules/next/dist/docs/` before changing routing, redirects, metadata, or server/client boundaries.
3. Run and record `git status --short --branch`, `git log -10 --oneline --decorate`, `git diff --name-status`, and `git diff --check`.
4. Preserve the complete Prompt 10 working tree. Never reset, clean, stash, checkout over, rebase, or broadly stage it.
5. Before touching infrastructure, identify all active agents/processes and inspect current deployments. Do not run against the old LuraFlow host, NamePo host, or another tenant by mistake.
6. Expected current Pakish production host is `pakish-sg` / `129.150.34.133` and Coolify UI is `https://coolify.adiba.pk`; verify host fingerprints, FQDNs, containers, labels, and application identity live before any mutation.
7. Do not print secrets, full environments, database dumps, tokens, private keys, password hashes, or personal data. Query allowlisted non-secret keys only.

## Work package A — Prompt 10 acceptance closeout

### A1. Fix the three verified gaps

- Make the homepage Team section inclusive and commercially accurate. Preserve the named team list; change only unsupported or women-only institute-wide positioning. Do not invent biographies, qualifications, or instructor claims.
- Make all three course-goal CTAs functional and understandable:
  - `/courses?goal=ai-productivity`
  - `/courses?goal=web-wordpress-cloud`
  - `/courses?goal=freelancing-digital-business`
- Prefer server-readable query handling or a small accessible filter that shows the selected goal, displays only or prioritizes the mapped canonical courses, provides `Show all courses`, handles invalid values safely, and retains canonical `/courses` metadata so query variants do not become duplicate indexable pages.
- Give `Join an Upcoming Gathering` a dedicated intent-preserving path. It may preselect the existing contact subject through a validated query parameter or use a focused lightweight gathering-interest form, but it must not be confused with fee-support admission. Do not add a backend/database if the current contact flow can safely carry the intent.

### A2. Verify Prompt 10 in a real browser

Start the site locally on an available port and validate, using a fresh browser context:

- `/`
- `/courses` and all three `goal` variants
- all six course detail pages
- `/admission`
- legacy `/admission?type=subsidy` redirect
- `/admission?source=womens-empowerment&support=fee-support`
- `/womens-empowerment` and its three CTAs
- both campus pages
- `/privacy`, `/payment-methods`, `/insights`, and primary article links

Check desktop and mobile layout, navigation, keyboard/focus flow, reduced-motion behavior, browser console, failed network requests, metadata/canonical/OG output, and form validation. Do not submit real personal data or send WhatsApp/email messages.

Fix only verified Prompt 10 defects. Do not redesign again.

### A3. Local acceptance gate

Run `npm run lint`, `npm run build`, `npm run og:generate`, `git diff --check`, link/metadata checks, and retired-term scans. The known React Hook Form warning may remain only if behavior is verified and it is documented as non-blocking; no errors are acceptable.

Do not continue to Work package B if the commercial site has a P0/P1 regression.

## Work package B — Academy native subdomain and hardening

### B1. Reconstruct the live architecture before changing it

Verify and document:

- Academy framework/image and exact version.
- Current containers, health, networks, proxy labels/routes, volumes, database, Redis, and restart policy.
- Current public origin(s), `/academy` path routing, internal/base URLs, auth callbacks, cookies, forwarded headers, API URLs, websocket behavior if applicable, and CORS/CSRF assumptions.
- Organization/tenant, users/roles, courses, enrollment counts, public signup, public course visibility, enabled modules, AI settings, email settings, object/media storage, and backups.
- DNS provider/zone and whether `academy.pakish.org` already exists.

Use narrow allowlisted inspection commands. Store no credentials in repository files or the report.

### B2. Backup and rollback gate

Before any production mutation:

- Create timestamped, recoverable backups of the Academy database and the exact service/configuration files required to restore it.
- Verify backup files are non-empty and structurally readable without exposing contents.
- Record absolute server paths, checksums, application/container identifiers, and exact rollback commands in a secure operational note that contains no secrets.
- Preserve the current `/academy` path route during parallel validation. Do not remove the known route until the native subdomain has passed acceptance and the main-site release is ready.
- If a safe rollback cannot be demonstrated, stop before mutation and report the blocker.

### B3. Establish `academy.pakish.org` as the canonical Academy origin

Use the existing supported Coolify/proxy/application configuration rather than a fragile manual proxy fragment.

- Create or verify the DNS record for `academy.pakish.org` against the confirmed Pakish production host.
- Configure proxy/TLS routing for the Academy service with a valid certificate and HTTP-to-HTTPS behavior.
- Configure the Academy’s supported public/base URL, auth callback URLs, generated links, cookie scope/Secure/SameSite settings, trusted proxy headers, CORS/CSRF origins, API origin, and websocket origin where applicable.
- Do not fake subpath support. The Academy must function at the root of its own origin.
- If the platform requires a restart/redeploy, perform it with health monitoring and rollback readiness.
- Keep `pakish.org/academy` operational during this phase if that avoids an outage. Implement the main-site permanent redirect locally only after the native origin passes; final public cutover/deployment belongs to Prompt 14 unless this phase can prove an independent, safely reversible deployment.

### B4. Harden launch settings

- Disable open self-registration unless an explicitly verified controlled enrollment requirement depends on it.
- Disable or hide AI, payment, public-community, marketplace, or other modules that are unconfigured or not needed for launch.
- Locate the disposable/test public course. Prefer private/draft/archive/noindex. Do not hard-delete course data.
- Ensure authenticated lessons, assignments, learner data, and account pages are not indexable.
- Preserve at least one verified administrator recovery path. Do not create shared accounts or change real user roles in this phase.
- Do not enable outbound email, password-recovery delivery, AI providers, S3/object storage, or payment integrations with guessed settings.
- Record every setting changed with before/after values, excluding secrets.

### B5. Main-site integration, locally

- Find every main-site Academy link and update it to the canonical `https://academy.pakish.org` destination.
- Add a permanent, method-safe `/academy` redirect using the supported Next.js 16 mechanism, after confirming it does not capture unrelated routes.
- Preserve UTM/query parameters where practical and avoid open-redirect behavior.
- Update sitemap/robots/`llms.txt` only if the actual architecture requires it. Do not index authenticated Academy content.
- Verify the local main-site change without pushing or triggering auto-deploy.

## Required verification

### Academy production proof

Use a fresh browser context and inspect console/network behavior:

- `https://academy.pakish.org` certificate, origin, and redirects.
- Landing/login page rendering on desktop and mobile.
- Login and logout using an authorized existing test/admin account; never expose credentials in output.
- Refresh and direct navigation to a known safe Academy route.
- Root-relative assets, API calls, auth callbacks, cookies, and redirects remain on the correct origin and HTTPS scheme.
- No `/academy` prefix leakage or 404s.
- Open registration is disabled as intended.
- Disposable/test public course is not publicly discoverable/indexable.
- Authenticated/private pages are protected from anonymous access and indexing.
- Browser console and critical network calls have no launch-blocking errors.

Do not trigger a real password-recovery email unless a safe test mailbox and configured provider are explicitly verified.

### Main-site proof

- Re-run lint/build after Academy-link and redirect changes.
- Locally verify Academy nav/CTA and `/academy` redirect target.
- Confirm Prompt 10 pages and forms still work.
- Run `git diff --check` and review the entire diff.

### Operational proof

- Capture exact Academy image/version, container health, DNS result, TLS issuer/expiry, and backup/rollback references.
- Confirm existing main-site and Academy production health after changes.
- Do not treat HTTP 200 alone as proof.

## Safety and release boundary

- No hard deletion of courses, users, files, volumes, or database records.
- No real student accounts, enrollments, payments, invitations, donor contacts, or outbound notifications.
- No direct database writes unless the platform offers no supported API/admin/configuration route, the exact schema is verified, a backup exists, and the change is narrowly documented.
- Do not modify unrelated PakishNews, Pakish.NET, NamePo, GlobNIC, TND, LuraFlow, or other-tenant services.
- Do not use broad `git add`, commit, push, merge, deploy the main website, or force any Git operation. Prompt 14 owns final main-repo commit/push/deploy.
- Stop after Prompt 11. Do not begin Prompt 12 or 13.

## Required final report

### Coordination state

- Current branch/commit and exact Prompt 10 working-tree preservation.
- Other active work/processes found and how conflicts were avoided.

### Prompt 10 closeout

- Exact fixes for Team copy, goal filtering, and gathering intent.
- Browser routes/viewports/accessibility/console/network checks.
- Lint/build/OG/scan results and remaining warning.

### Academy change record

- Before/after architecture.
- Backup paths/checksums and tested rollback procedure.
- DNS, TLS, proxy, application-origin, auth/cookie, and hardening changes.
- Setting-by-setting before/after table with secrets redacted.
- Exact production browser and network evidence.

### Repository state

- Exact files changed in Prompt 11.
- Full `git status --short --branch`.
- Explicit confirmation that nothing was staged, committed, pushed, or main-site deployed.

### Decision

End with exactly one of:

- `PROMPT 11 ACCEPTED — READY FOR PROMPT 12`
- `PROMPT 11 PARTIAL — BLOCKED: <exact blocker>`
- `PROMPT 11 ROLLED BACK — REASON: <exact reason>`
