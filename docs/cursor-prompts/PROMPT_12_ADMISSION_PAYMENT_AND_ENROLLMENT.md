# PROMPT NUMBER: 12 — OWNER-APPROVED RESUME

## Project

Pakish Institute

Repository: `C:\Users\pakis\My-Projects\pakish-org`

Master plan: `C:\Users\pakis\My-Projects\pakish-org\docs\PAKISH_COMMERCIAL_LAUNCH_MASTER_PLAN.md`

Prompt 11 report: `C:\Users\pakis\.codex\attachments\097885a5-0a41-4c77-94d8-d6a84cb89263\Pasted text.txt`

## Owner approval and architectural decision

The owner explicitly approved this architecture on 2026-09-26:

- Canonical Academy/LMS origin: `https://academy.pakish.org`.
- `https://pakish.org/academy` becomes a permanent entry/redirect only after the native subdomain passes DNS, TLS, authentication, cookie, routing, and hardening acceptance.
- Public SEO and conversion content stays on `pakish.org`: homepage, courses, campuses, insights, admissions, fees, and payment guidance.
- Private learning operations stay on `academy.pakish.org`: login, enrolled lessons, recordings, assignments, progress, instructor operations, certificates, and future AI-tutor data.
- Authenticated Academy content must be private/noindex and must not duplicate public SEO course pages.

This approval authorizes the narrowly scoped DNS record, native Academy configuration, and hardening work described below. It does not authorize unrelated DNS changes, real-user operations, payment actions, main-site deployment, or changes to other tenants.

For every material technical decision, inspect the actual LearnHouse 1.3.6 source/configuration and current official primary documentation. Use the safest current industry-standard option that fits this deployment; do not apply generic framework assumptions or redesign beyond the approved boundary.

## Mission

First close the remaining Prompt 11 production blocker. Only after `academy.pakish.org` passes native-origin and hardening acceptance, implement a secure, auditable commercial admission -> payment review -> Academy provisioning workflow with a safe manual launch fallback.

This prompt has two strict sequential work packages:

1. Prompt 11 completion gate: DNS, TLS, native Academy proof, signup hardening, and test-course privacy.
2. Prompt 12 lifecycle: admission, payment verification, provisioning readiness, audit history, and administrator operations.

Do not begin Prompt 13 course creation/teacher setup or Prompt 14 commit/push/deploy.

## Verified handoff state

Recheck all facts before acting:

- Git branch was `master` at `78f6820`, aligned with `origin/master`.
- Prompt 10 and Prompt 11 code is intentionally uncommitted and unstaged. Preserve the full working tree.
- Prompt 10 closeout passed locally: inclusive Team copy, functional goal filters, gathering-intent preselection, lint/build/OG generation, and route checks.
- Prompt 11 production Academy changes are partial:
  - LearnHouse image reported as `ghcr.io/learnhouse/app:1.3.6`.
  - Existing `https://pakish.org/academy` path deployment remains healthy.
  - Native subdomain proxy/application configuration was prepared on `pakish-sg` (`129.150.34.133`).
  - `academy.pakish.org` remained `NXDOMAIN`; therefore native TLS, login/logout, cookie, asset, API, and prefix-leakage proof did not happen.
  - Public signup still rendered.
  - The disposable public test course was not archived/private.
  - A database backup and configuration snapshot were reported; verify them live rather than trusting the report.
- Fresh independent production check on 2026-09-26 confirmed:
  - `academy.pakish.org` still returns DNS NXDOMAIN.
  - `https://pakish.org/academy/login` still returns HTTP 200.
  - That path response sets `LH_frontend_domain=localhost:3000` and `LH_top_domain=localhost` cookies. Treat this as a configuration defect to trace across the app, SSR forwarder, and proxy; do not accept native auth until those values reflect the verified production origin.
- Main-site `/academy` 308 redirect and Academy links exist only in the uncommitted local working tree. Do not deploy them while the subdomain is unresolved.
- Current website admission storage is JSON under `.data/admissions`, mounted to persistent `pakish_org_data` in production.
- Current lifecycle is minimal: lead statuses `New`, `Contacted`, `Payment Pending`, `Payment Received`, `Enrolled`; payment statuses `Pending`, `Submitted`, `Verified`.
- Payment proof upload currently validates a data-URL prefix and size but needs stronger file verification and collision-safe storage.
- Website `lmsCourseId` values such as `lms-ai-productivity` are placeholders, not proven LearnHouse course IDs. Never treat them as live IDs.
- Current Academy has no verified six-course mapping. Prompt 13 owns real course/cohort construction.

## Coordination and safety rules

1. Read `AGENTS.md`, the master plan, Prompt 11 report, the entire current diff, current admission/admin code, relevant Next.js 16 docs, LearnHouse source/docs/config, and production topology before editing.
2. Record `git status --short --branch`, `git log -10 --oneline --decorate`, `git diff --name-status`, `git diff --check`, and active local/server processes.
3. Preserve all Prompt 10/11 work. Never reset, clean, stash, rebase, force, checkout over files, or use broad staging.
4. Work only on `pakish-org`, `pakish-sg`, and the confirmed LearnHouse stack. Do not touch PakishNews, Pakish.NET, NamePo, GlobNIC, TND, LuraFlow, or other tenants.
5. Never print credentials, full environments, database contents, lead PII, password hashes, tokens, or private keys.
6. Do not make a real payment, verify a real payment, create/enroll a real learner, invite a real teacher, or send a real email/WhatsApp message.
7. Use clearly synthetic test records and a safe email domain such as `example.invalid`; suppress all outbound notifications for tests.

## Work package A — close Prompt 11 before lifecycle work

### A1. Reverify backup and current Academy state

- Confirm the reported database dump and configuration snapshot exist, are non-empty, and have matching checksums.
- Confirm rollback commands still match the live compose directory, container names, proxy route, and current configuration.
- Reinspect actual `.env` keys narrowly. Resolve the report/script inconsistency around `LEARNHOUSE_COOKIE_DOMAIN` (`.pakish.org` versus `academy.pakish.org`) using LearnHouse’s supported configuration and intended isolation. Do not guess.
- Trace why current production responses emit `LH_frontend_domain=localhost:3000` and `LH_top_domain=localhost`. Inspect the LearnHouse app, SSR forwarder, generated/runtime configuration, and proxy headers. Correct the supported source of truth rather than masking cookies at the proxy.
- Confirm existing `/academy` remains healthy before proceeding.

### A2. Create/repair DNS safely

- Use a valid, least-privilege Cloudflare API token or an already authenticated Cloudflare dashboard session.
- Create exactly one `A` record: `academy.pakish.org -> 129.150.34.133`.
- Preserve unrelated DNS records. Do not use or expose the invalid global-key material discovered in Prompt 11.
- Use the Cloudflare proxy mode and SSL setting supported by the verified origin/certificate plan. If certificate issuance requires a temporary DNS-only state, document the transition and finish in the approved steady state.
- Verify using at least two independent resolvers and direct origin/proxy checks where safe.
- If DNS authentication is unavailable, do not repeat failed credentials and do not immediately close the task. Pause and ask the owner for exactly one safe action: sign in to the Cloudflare dashboard for the `pakish.org` zone in the available browser session, or make a least-privilege `Zone:DNS:Edit` token available through a secure environment/secret mechanism. Never ask the owner to paste a password, MFA code, global API key, or token into chat or a repository file.
- After the owner confirms authentication, resume this same Prompt 12 from A2 and continue autonomously. Return `PROMPT 12 BLOCKED — DNS AUTHENTICATION REQUIRED` only if the owner cannot provide or explicitly declines access.

### A3. Native Academy acceptance

After propagation:

- Verify HTTPS certificate, hostname, redirect behavior, security headers, root-relative assets, API health, auth callbacks, cookies, and any websocket traffic.
- Prove `LH_frontend_domain`, `LH_top_domain`, tenancy, cookie Domain/Path/Secure/SameSite values, and generated URLs identify the real Academy origin rather than `localhost` or the retired `/academy` prefix.
- Use a fresh browser to test anonymous landing, login, authenticated safe route, direct/deep-link refresh, and logout on `https://academy.pakish.org`.
- Prove there is no `/academy` prefix leakage and no insecure-scheme redirect.
- Verify the old path deployment remains available until Prompt 14 cutover.

### A4. Finish Academy hardening

- Disable public self-registration through a supported LearnHouse admin/configuration setting. Verify anonymous `/signup` cannot create an account. Do not merely hide the navigation link.
- Identify the disposable public course using title/ID/owner and current enrollment evidence. Make it private, draft, archived, or noindex using supported operations. Do not hard-delete it.
- Verify anonymous users cannot access private course/lesson/assignment/account data and authenticated pages are not indexable.
- Keep AI disabled. Do not enable email, payments, S3/object storage, or any provider with guessed configuration.
- Preserve a verified administrator recovery route.

### A5. Prompt 11 acceptance gate

Record DNS, TLS, browser/network, signup, course-privacy, backup, rollback, and container-health evidence. Continue only if the native Academy is fully accepted.

## Work package B — investigate the current commercial lifecycle

Inspect at minimum:

- `lib/admission/lead.ts`
- `lib/admission/types.ts`
- `lib/admission/schema.ts`
- `lib/admission/store.ts`
- `lib/admission/notify.ts`
- `lib/admin/auth.ts`
- `app/api/admission/route.ts`
- `app/api/admission/payment-proof/route.ts`
- `app/api/admin/leads/route.ts`
- `app/api/admin/leads/[id]/route.ts`
- `components/admission/course-admission-form.tsx`
- `components/admission/admission-form.tsx`
- `components/admission/payment-proof-form.tsx`
- `components/admin/admin-leads-dashboard.tsx`
- `lib/courses/data.ts`
- production volume ownership, backup, and single/multiple replica behavior
- documented LearnHouse API/admin capabilities for user lookup/create and enrollment

Determine and document:

- Which leads are individual paid learners versus team/custom-training inquiries.
- Where email becomes mandatory for an Academy account.
- Which operations LearnHouse officially supports through API/admin UI.
- Whether any current endpoint can provision users/enrollments idempotently.
- How the Women’s Empowerment fee-support pathway is stored today; it must remain separate from payment verification and paid enrollment.
- Whether the launch should use controlled manual provisioning or a supported server-to-server adapter. Reliability is more important than pretending automation exists.

## Work package C — implement the auditable lifecycle

### C1. Backward-compatible data model

Preserve all existing JSON lead files and old fields. Add optional versioned fields rather than breaking historical records.

Model these concerns independently:

- Lead/application stage.
- Payment stage.
- Academy provisioning stage.
- Welcome/access-instructions stage.
- Application kind: commercial individual, team/custom inquiry, or Women’s Empowerment fee-support review.
- Append-only audit events with timestamp, action, safe actor label, previous state, next state, and non-sensitive note.

Use a documented transition matrix. At minimum enforce:

- A payment proof submission never verifies payment.
- Only an authenticated administrator can verify or reject payment.
- Enrollment/provisioning cannot begin before verified payment for standard commercial individual admission.
- Team/custom-training inquiries do not enter individual learner provisioning automatically.
- Women’s fee-support review does not become paid/verified/enrolled until support approval and the correct commercial enrollment prerequisites are recorded.
- `Enrolled` cannot be selected manually without an Academy enrollment identifier or an explicit documented manual-provisioning completion event.
- Invalid backward or skipped transitions return a clear `409` response rather than silently mutating state.

### C2. Storage integrity

- Make JSON writes atomic using same-directory temporary files plus rename/replacement.
- Prevent lost updates for concurrent notification/admin/payment operations using a suitable per-lead serialization or compare-and-retry mechanism for the current single-app architecture.
- Preserve current persistent volume compatibility and Windows local development.
- Add safe parsing/migration defaults for historical lead files; do not silently skip corrupt records without surfacing an administrator warning.
- Document backup/restore for `.data/admissions` and proof files.

### C3. Payment-proof security and review

- Keep file size and allowlist validation on both client and server.
- Validate decoded image content/magic metadata, not only MIME prefix or file extension. Use an existing trusted library where available; do not execute uploaded content.
- Generate collision-resistant server filenames; never use a user-provided filename as a storage path.
- Reject malformed base64, oversized decoded payloads, unsupported formats, path traversal attempts, duplicate/replay abuse, and proofs for incompatible lead states.
- Provide an authenticated admin-only way to inspect/download payment proof if operationally required. Prevent public file serving and add safe response headers.
- Payment verification must capture timestamp, safe actor, decision, and optional rejection reason. Never infer verification from upload, filename, amount text, or OCR.

### C4. Admin operations

- Replace unrestricted status dropdown behavior with guarded, explicit actions derived from the transition matrix.
- Show blockers clearly: missing email, payment not verified, no real Academy course mapping, provisioning unavailable, or fee-support approval pending.
- Show compact audit history and integration identifiers without exposing secrets.
- Add CSRF/origin protection appropriate to the existing same-origin admin session and retain `noindex` behavior.
- Do not weaken admin authentication. If touching login/session code, preserve timing-safe checks, secure cookies, expiry, and rate limiting.

### C5. Academy provisioning boundary

- Inspect LearnHouse source/API routes and prefer a documented supported API or admin operation.
- Introduce one server-only provisioning boundary/interface so website business logic is not coupled directly to LearnHouse database tables.
- Default to `manual-required` unless a supported API and real course mapping are both proven.
- If supported automation is genuinely available, implement idempotent lookup/create/enroll behavior with:
  - server-only credentials,
  - strict timeouts,
  - no secret/client exposure,
  - normalized email,
  - duplicate-account and already-enrolled handling,
  - stable idempotency key based on lead/course,
  - safe retry after partial failure,
  - persisted external account/enrollment IDs,
  - audit events without sensitive payloads.
- Do not use placeholder `lmsCourseId` values as real IDs.
- Do not create the six Academy courses in this phase. Prompt 13 owns real course IDs and mappings.
- Because real mappings may not yet exist, implement and document a launch-day manual provisioning checklist that an academic administrator can complete in LearnHouse and then record IDs back against the lead.

### C6. Welcome/access instructions

- Generate a previewable welcome/access message only after provisioning/enrollment is complete.
- Do not send it in tests or automatically enable outbound email.
- Message content must use `https://academy.pakish.org/login`, explain login/recovery steps accurately, identify the enrolled course, and provide support contact details.
- Track previewed/ready/sent states separately. “Sent” must require a real provider/manual confirmation event in a later authorized production operation.

### C7. Women’s Empowerment separation

- Keep fee-support requests clearly labeled and auditable.
- Do not let a fee-support request upload payment proof or enter paid enrollment states unless it has an explicit approved conversion into a commercial enrollment.
- Preserve the consent and privacy context. Do not expose sensitive need-review data in list views, logs, analytics, or public APIs.
- If the current legacy form only opens WhatsApp/email and does not persist a structured request, document that truth. Add structured persistence only if it can be done safely without expanding sensitive-data exposure; otherwise leave a clearly documented manual intake boundary for launch.

## Testing and verification

Add focused automated tests using temporary directories and synthetic data. Cover:

- Historical lead compatibility and migration defaults.
- Every allowed and rejected state transition.
- Payment upload does not equal verification.
- Atomic/concurrent updates preserve fields and audit events.
- Invalid IDs, malformed JSON/base64, MIME spoofing, oversized images, filename/path traversal, unauthorized proof access, and replay attempts.
- Admin authentication/origin/CSRF rejection.
- Missing email and missing course-map blockers.
- Manual provisioning completion requirements.
- Automated adapter idempotency only if a real supported API is implemented.
- Women’s fee-support isolation from standard payment/enrollment.
- Welcome message preview remains unsent.

Then run:

- targeted test suite
- full lint
- production build/type validation
- `git diff --check`
- retired-term scan
- secret scan limited to changed files

Use a fresh local browser to exercise one synthetic commercial lead through:

`New -> Contacted -> payment requested -> proof submitted -> payment verified -> provisioning blocked/manual-required -> manual IDs recorded -> Enrolled -> welcome preview ready`

Also test one synthetic Women’s Empowerment request and prove it cannot bypass support/payment/enrollment gates.

Do not send any real message, make a real payment, create a real Academy user, or enroll a real student.

## Stop and release boundary

- Do not stage, commit, push, merge, or deploy the main website.
- Do not remove the legacy Academy path yet.
- Do not create the six real Academy courses or teacher accounts.
- Do not enable AI tutor, payment automation, or outbound email.
- Do not claim end-to-end automatic enrollment if only manual provisioning is supported.
- Stop after Prompt 12 and do not start Prompt 13.

## Required final report

### Prompt 11 closure

- DNS record and resolver evidence.
- TLS, browser/network, login/logout, cookie/origin, signup, course privacy, and container-health evidence.
- Backup/rollback revalidation.
- Explicit decision: `PROMPT 11 ACCEPTED` or exact blocker.

### Prompt 12 implementation

- Current and final state machine/transition table.
- Source-of-truth and application-kind decisions.
- Exact files changed.
- Storage integrity and upload-security changes.
- Admin workflow and audit evidence.
- LearnHouse API capability finding.
- Automation implemented or honest manual-required boundary.
- Synthetic test evidence and all command results.
- Privacy/security decisions and remaining unknowns.

### Repository and production state

- Full `git status --short --branch`.
- Confirmation that Prompt 10/11 work remains intact.
- Confirmation that nothing was staged, committed, pushed, or main-site deployed.
- Exact Academy production mutations made in Work package A.

End with exactly one of:

- `PROMPT 12 ACCEPTED — READY FOR PROMPT 13`
- `PROMPT 12 PARTIAL — BLOCKED: <exact blocker>`
- `PROMPT 12 BLOCKED — DNS AUTHENTICATION REQUIRED`
- `PROMPT 12 ROLLED BACK — REASON: <exact reason>`
