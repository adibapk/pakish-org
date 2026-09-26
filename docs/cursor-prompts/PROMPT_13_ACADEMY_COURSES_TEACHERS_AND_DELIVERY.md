# PROMPT NUMBER: 13

## Project

Pakish Institute

Repository: `C:\Users\pakis\My-Projects\pakish-org`

Master plan: `C:\Users\pakis\My-Projects\pakish-org\docs\PAKISH_COMMERCIAL_LAUNCH_MASTER_PLAN.md`

## Mission

Close the remaining Prompt 12 concurrency and authenticated-Academy proof gaps, then create a production-ready Academy operating model for canonical course mapping, least-privilege teaching access, live classes, recorded content, assignments, progress, and completion. Prove the model with one private pilot course before scaling.

Do not mass-create all six Academy courses, invite real people, publish the pilot, enable AI, or begin Prompt 14 release work until the pilot evidence passes.

## Verified handoff state

Recheck all facts before acting:

- Branch was `master` at `78f6820`, aligned to `origin/master`; Prompt 10-12 work is intentionally uncommitted and unstaged.
- `academy.pakish.org` now resolves through Cloudflare and returns HTTP 200 with valid edge TLS.
- Native response cookies independently showed `LH_frontend_domain=academy.pakish.org`, `LH_top_domain=academy.pakish.org`, and `Path=/`.
- `/api/v1/health` returned `true`; `/api/v1/instance/info` reported the correct native domain.
- Legacy `https://pakish.org/academy` remains operational for rollback until Prompt 14 cutover.
- LearnHouse is reported as `ghcr.io/learnhouse/app:1.3.6`; all five containers were healthy.
- Public signup was changed to invite-only and the disposable test course was made private/unpublished. Reverify rather than trusting the report.
- AI remains disabled. Email delivery and durable object/media storage are not yet proven configured.
- Prompt 12 lifecycle implementation uses `manual-required` Academy provisioning because no supported enrollment API and no real course UUID mapping were proven.
- Independent repository verification passed:
  - `npm run test`: 10/10 tests.
  - `npm run lint`: 0 errors, 2 warnings.
  - `npm run build`: passed, 33 routes plus admin payment-proof route.
- Remaining Prompt 12 gaps:
  1. Authenticated login/logout and a protected native Academy route were not browser-verified because credentials were intentionally not exposed.
  2. `app/api/admin/leads/[id]/route.ts` performs `getAdmissionLead()` followed by direct `saveAdmissionLead()`, bypassing the per-lead lock used by `updateAdmissionLead()`. Concurrent admin, payment-proof, or notification writes could lose fields/audit events.
  3. `lib/admission/store.ts` has an `_meta` unused-variable lint warning; the React Hook Form warning in `course-admission-form.tsx` remains.
  4. Website `lmsCourseId` strings are placeholders, not real LearnHouse course UUIDs.
  5. Real teacher identities, assignments, live-class ownership, and recorded-media locations have not been verified.

## Coordination and safety rules

1. Read `AGENTS.md`, the master plan, Prompt 12 evidence/current diff, relevant Next.js 16 docs, LearnHouse 1.3.6 source/config/schema, and current production topology.
2. Prefer current official LearnHouse documentation and actual deployed source over generic LMS assumptions. Record source paths/URLs and version-specific findings.
3. Run and record `git status --short --branch`, recent log, diff name/status, `git diff --check`, active processes, Academy container/image/health, and backup status.
4. Preserve all Prompt 10-12 work. Never reset, clean, stash, rebase, force, or broadly stage.
5. Use supported LearnHouse UI/API operations first. Direct database changes require verified schema, a fresh backup, no supported alternative, a narrow transaction, before/after evidence, and rollback SQL.
6. Never print secrets, broad environments, passwords, hashes, tokens, private learner data, or recording content.
7. No real student, teacher, payment, certificate, email, WhatsApp, meeting invitation, or external notification.
8. Work only on `pakish-org` and the confirmed Pakish LearnHouse stack. Do not touch other projects or tenants.

## Work package A — Prompt 12 closeout

### A1. Make lead mutation truly serialized

- Replace the admin route’s unlocked read-modify-write sequence with one store-level mutation function that acquires the existing per-lead lock, reloads the current record inside that lock, applies the guarded transition, atomically writes it, and returns the saved lead.
- Ensure notification updates, payment-proof submission, and admin actions cannot overwrite each other’s integration IDs, statuses, or audit events in the current single-process deployment.
- Add concurrency tests that intentionally interleave admin transition and another lead update. Prove all fields and audit events survive.
- Document the limitation that an in-memory mutex is not sufficient for multiple app replicas. Confirm production replica count is one; otherwise use an appropriate cross-process strategy before acceptance.

### A2. Clean local quality warnings where safe

- Remove the `_meta` unused-variable warning without returning meta/IP/user-agent data to the admin list.
- Evaluate the React Hook Form `watch()` warning against the installed versions and Next.js 16 guidance. If `useWatch` is a behavior-preserving fix, implement and test it; otherwise document why it remains non-blocking.
- Re-run tests, lint, build, and `git diff --check`.

### A3. Complete authenticated native-origin proof

- Use an already authorized Academy administrator account or ask the owner to sign in through the available browser session. Never request or expose the password or MFA code in chat/output.
- In a fresh browser context, prove login, one authenticated safe page, direct refresh/deep link, logout, and post-logout protection on `https://academy.pakish.org`.
- Inspect cookie Domain/Path/Secure/SameSite, redirects, assets, API calls, console, and network origins.
- Reverify anonymous signup cannot create an account and the disposable test course is not publicly accessible/indexable.
- If authenticated access cannot be obtained, continue read-only planning/inventory but do not mutate roles/courses; end as partial with the exact owner authentication action needed.

## Work package B — investigate the real Academy capabilities

### B1. Role and permission model

Inspect LearnHouse 1.3.6 source, UI, API, and database schema to identify the actual supported roles and permission boundaries. Do not invent roles the product cannot enforce.

Map supported capabilities to these business responsibilities:

- Platform administrator: infrastructure and organization settings.
- Academic administrator: courses, cohorts/enrollments, schedules, and completion operations.
- Instructor: assigned course content, learner work, and feedback only.
- Teaching assistant: assigned learner support/grading only, if the platform supports it.
- Student: enrolled content only.

Produce an evidence-based role matrix showing allowed and denied actions. If LearnHouse cannot enforce a requested boundary, document the closest safe configuration and residual risk.

### B2. Course, cohort, assignment, progress, and certificate model

Determine the real LearnHouse entities and identifiers for:

- organization
- course
- chapter/module
- activity/lesson
- assignment/submission/feedback
- collection/cohort or nearest supported equivalent
- enrollment/membership
- progress/completion
- certificate, if genuinely supported

Record exact supported operations and whether each is UI, API, or database-only. Do not equate UI labels with schema names without evidence.

### B3. Recorded-content and live-class capabilities

Determine:

- supported video/file/embed providers and upload limits
- whether storage is local, persistent volume, S3-compatible, or external embed
- privacy/access controls for media
- transcript/caption support
- live-event or meeting-link support
- replay/resource placement
- storage backup and egress implications

Do not enable or configure a provider with guessed credentials.

## Work package C — content and people inventory

### C1. Canonical six-course mapping inventory

Use `lib/courses/data.ts` as the public catalogue source. For all six courses record:

- website course ID/slug/title
- readiness status
- proposed Academy title
- actual Academy UUID only if created and proven
- curriculum/module count
- instructor owner status
- recording/content readiness
- live cohort readiness
- publication state

Create:

- `docs/academy/COURSE_MAPPING.md` for operations.
- A small typed machine-readable Academy mapping module for website provisioning.

Remove or clearly deprecate fake `lms-*` placeholder IDs. Unmapped courses must be explicitly `unmapped`, never assigned invented UUIDs.

### C2. Recorded-content inventory

- Search only the repository, owner-identified media locations, and clearly relevant Pakish workspace folders. Do not recursively scan unrelated drives or cloud accounts.
- Do not copy, move, upload, rename, transcode, or delete source recordings during inventory.
- For each item record path/reference, course/module/lesson, filename, format, duration, resolution, language, owner, recording date, visible learner/private data, audio/video quality, obsolete UI/tool risk, editing needed, transcript/caption status, and checksum where practical.
- If the recording location is unknown, ask the owner one concise question for the exact folder/service and continue all non-upload work meanwhile.
- Save a no-PII manifest at `docs/academy/RECORDED_CONTENT_INVENTORY.md`. Do not commit private local paths if they reveal personal information; use a redacted storage reference.

### C3. Teacher and live-class inputs

- Inspect current verified team data, but do not assume every named team member is a teacher.
- Prepare `docs/academy/TEACHER_ACCESS_MATRIX.md` with roles and course assignments marked `unconfirmed` until the owner confirms real name, email, course, and responsibility.
- Confirm Pakistan Standard Time (`Asia/Karachi`), primary meeting platform/account owner, recording consent policy, attendance owner, backup host, cancellation/reschedule process, and support channel.
- Never invent a meeting URL, timetable, teacher email, or availability.

## Work package D — select and build one private pilot

### D1. Pilot selection

Score the six courses on:

- complete/recent content availability
- instructor readiness
- technical setup burden
- suitability for live and recorded delivery
- assignment/progress testability
- learner demand and commercial readiness
- privacy/media risk

Use evidence to select one pilot. `AI Productivity & Automation` is the provisional default because it has a defined four-module curriculum and lower lab/setup burden, but choose another course if verified content/instructor readiness is materially stronger. Document the scorecard and decision.

### D2. Fresh Academy backup

Before course/role mutations, create and verify a fresh timestamped Academy database/config backup. Record path, size, checksum, and narrow rollback instructions without secrets.

### D3. Create a private pilot course

Using supported LearnHouse operations:

- Create exactly one private/unpublished pilot course.
- Use the canonical website title, summary, and curriculum facts without copying SEO marketing paragraphs unnecessarily.
- Build modules/chapters and lessons from the canonical course curriculum.
- Include one representative text/resource lesson, one assignment, one feedback workflow, and a completion/progress rule.
- Add a clearly labeled live-session information area with timezone, schedule fields, meeting-link placeholder, attendance owner field, replay/resource location, backup host, and reschedule policy.
- Add a recorded-lesson template with title, objectives, duration, version/date, video reference, transcript/captions, resources, assignment, privacy review, and replacement status.
- Configure certificate behavior only if natively supported and testable; do not issue a real certificate.
- Keep the pilot private/unpublished until Prompt 14 release approval.

### D4. Durable media decision

- If verified durable object/video storage already exists, document the supported integration and use at most one non-sensitive pilot sample.
- If durable storage is unavailable, do not upload production recordings or rely on ephemeral container storage. Keep the pilot’s media references unpopulated and provide an exact provider-neutral readiness checklist for the owner’s later storage decision.
- Do not make purchasing, credential, or retention commitments without owner authorization.

## Work package E — least-privilege QA

Prefer synthetic test identities under `example.invalid` and suppress outbound messages. Create accounts only through supported methods and only if they can be disabled/archived safely afterward.

### Instructor test

Prove the test instructor can:

- access only the assigned private pilot
- edit permitted lessons/resources
- view/grade the permitted test assignment
- provide feedback

Prove the instructor cannot:

- change organization/system/billing settings
- access unrelated courses or private learner data
- manage platform administrators
- publish broader content unless explicitly required

### Student test

Prove the test student can:

- access only the enrolled private pilot
- open the representative lesson/resource
- submit the test assignment
- receive test feedback
- show expected progress/completion behavior

Prove anonymous and non-enrolled users cannot access the pilot, its activities, submissions, or media.

### Integration test

- Record the real pilot Academy course UUID in the typed mapping.
- Verify the Prompt 12 manual-provisioning checklist with synthetic IDs/data only.
- Confirm website placeholder IDs are not used.
- Verify direct links, refresh, mobile layout, logout/session boundaries, console/network errors, and cross-course isolation.
- Disable/archive synthetic QA accounts/artifacts through supported reversible operations after evidence capture, while preserving the private pilot.

## Work package F — operating documentation

Create concise professional-English documents under `docs/academy/`:

- `COURSE_MAPPING.md`
- `ROLE_AND_ACCESS_MODEL.md`
- `TEACHER_ACCESS_MATRIX.md`
- `LIVE_CLASS_SOP.md`
- `RECORDED_CONTENT_INVENTORY.md`
- `RECORDED_LESSON_PUBLISHING_CHECKLIST.md`
- `PILOT_ACCEPTANCE_REPORT.md`

Include ownership, prerequisites, step order, failure/backup procedure, privacy controls, and launch-day responsibilities. Do not include secrets or real credentials.

## Required verification

- Prompt 12 concurrency regression tests plus all existing tests.
- Full lint with zero errors; explain any remaining warning.
- Production build/type validation.
- `git diff --check`.
- Changed-file secret scan.
- Native Academy anonymous and authenticated browser checks.
- Role-negative tests, pilot content/assignment/progress tests, and cross-course isolation.
- Backup existence/checksum and rollback readiness.
- Exact Academy UUIDs and settings changed, with secrets redacted.

## Stop and release boundary

- Do not publish the private pilot.
- Do not create all six Academy courses.
- Do not invite real teachers or students.
- Do not send real email, WhatsApp, meeting invitation, certificate, or payment action.
- Do not enable AI tutor or unverified storage/email integrations.
- Do not remove the legacy `/academy` path yet.
- Do not stage, commit, push, merge, or deploy the main website.
- Stop after Prompt 13. Prompt 14 owns final scoped commit, push, main-site deploy, cutover, and production proof.

## Required final report

### Prompt 12 closeout

- Serialized mutation implementation and concurrency-test evidence.
- Lint-warning decision.
- Authenticated native login/deep-link/logout evidence.
- Signup and disposable-course privacy revalidation.

### Academy capability findings

- Actual LearnHouse role/entity/storage/live-class capabilities and evidence.
- Supported operation path for each capability.
- Known product limitations and safe workarounds.

### Pilot result

- Six-course readiness scorecard and selected pilot rationale.
- Pilot title/UUID/private state and exact structure.
- Assignment, progress, completion/certificate findings.
- Instructor/student allowed and denied action evidence.
- Media/storage decision and inventory summary.
- Live-class SOP readiness.

### Repository and production state

- Exact files and Academy records/settings changed.
- Backup/rollback reference.
- Full `git status --short --branch`.
- Confirmation that Prompt 10-12 work remains intact.
- Confirmation that nothing was staged, committed, pushed, published, or main-site deployed.
- Owner-only inputs still required, stated precisely.

End with exactly one of:

- `PROMPT 13 ACCEPTED — READY FOR PROMPT 14`
- `PROMPT 13 PARTIAL — OWNER INPUT REQUIRED: <exact inputs>`
- `PROMPT 13 PARTIAL — BLOCKED: <exact technical blocker>`
- `PROMPT 13 ROLLED BACK — REASON: <exact reason>`

