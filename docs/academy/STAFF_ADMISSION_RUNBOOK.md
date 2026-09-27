# Staff admission & Academy provisioning runbook

Audience: Pakish academic/admin operators.
Not linked from public `/help`, sitemap entries beyond internal use, or `public/llms.txt`.
Last updated: 2026-09-27 (Prompt 22).

## State sequence (must match public Student Guide)

1. Application lead saved (`/admission`) — no invitation required
2. Staff triage / counseling
3. Fee quote and payment instructions confirmed
4. Learner pays and shares proof
5. Staff verifies proof (proof ≠ verification)
6. Manual Academy provisioning + invitation
7. Enrollment and welcome ownership

## Lead triage

- Prefer newest unpaid/uncontacted leads in admin UI.
- Confirm course slug matches a published website course.
- Women's Empowerment fee-support leads enter only via that pathway.

## Fee quote / approval

- Do not ask learners to treat public QR pages as an invoice before confirmation.
- Record agreed amount and channel in the lead notes/audit trail.

## Proof vs verification

- Accept screenshots via WhatsApp, billing email, or the optional on-site proof form.
- Verification is a staff action. Never auto-enroll from proof upload alone.

## Manual provisioning

- Use verified Academy course UUIDs only (`lib/academy/course-mapping.ts`).
- AI Productivity pilot UUID: `course_05275db9-cddf-4a68-825a-01e4e2714066` (private pilot).
- Other six courses remain unmapped until Prompt 21E closes and private drafts are provisioned.
- Rollback: restore DB dump; remove provisional mappings that lack real UUIDs.

## Welcome message

- Ownership: academic ops. Preview before send. No bulk mail to real applicants from ad-hoc scripts.

## Access matrix

- See `TEACHER_ACCESS_MATRIX.md` and `ROLE_AND_ACCESS_MODEL.md`.
- Instructors: least privilege on assigned courses only.

## Content / licensing approval

- Text-first drafts live under `docs/academy/content/`.
- Videos: `VIDEO_RIGHTS_REGISTER.md` — default to attributed embeds until rehosting is approved.
- Irfan Velmi / Business English materials require his editorial approval before learner release.

## Release / rollback

- Website: deploy via normal production pipeline after review; rollback to previous Coolify/deploy SHA.
- Academy: pinned LearnHouse digest + overlay; coordinate with Prompt 21E asset versioning docs.

## Backup / storage / retention

- DB dumps under `/home/opc/.learnhouse/pakish/backups/` must be mode `600`.
- Durable object/video storage is not configured; do not upload course video into the Docker volume by default.

## Security / support escalation

- Credentials never in Git.
- Learner PII stays in operational systems, not public docs.
- Escalation: admin@pakish.org / owner.

## Owner inputs still required

- Refund/cancellation policy wording for public request path (see `POLICY_DECISION_RECORD.md`).
- Instructor assignment and publish approval per course (`FIRST_COHORT_LAUNCH_GATE.md`).
- Prompt 21E acceptance before Academy write automation.
