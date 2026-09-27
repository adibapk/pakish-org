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

### Written offer acceptance template (required before payment)

Copy into lead notes / email / WhatsApp and keep the learner’s reply:

```
Offer ID: ________
Offer date (Asia/Karachi): ________
Lead reference: ________
Learner name / WhatsApp / email: ________
Course title + website slug: ________
Format (live online / in-center / team): ________
Session count or schedule summary: ________
Final fee + currency + taxes if any: ________
Payment channel named in offer: ________
Policy version: 2026-09-27
Terms URL: https://pakish.org/terms
Payment & Cancellation URL: https://pakish.org/refund-policy
Core rule shown to learner: no change-of-mind refund after payment; statutory remedies preserved if Pakish fails to deliver agreed training.
Learner acceptance (channel + timestamp + quote of reply): ________
Staff issuer: ________
```

- Binding commercial step = dated written offer + explicit learner acceptance (email/WhatsApp). Admission form submission alone is not purchase acceptance.
- Do not add a deceptive “I purchased” checkbox on `/admission`.

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

- Pakistan-qualified counsel review of published Terms / Payment & Cancellation wording (`POLICY_DECISION_RECORD.md`).
- Instructor assignment and publish approval per course (`FIRST_COHORT_LAUNCH_GATE.md`).
- Prompt 21E acceptance before Academy write automation.
