# Prompt 13 pilot acceptance report

**Date:** 2026-09-26
**Pilot:** AI Productivity & Automation
**Academy course UUID:** `course_05275db9-cddf-4a68-825a-01e4e2714066`
**State:** `public=false`, `published=true` (enrolled-learner access; not in public catalogue)

## Backup (pre-mutation)

| Field | Value |
|---|---|
| Path | `/home/opc/.learnhouse/pakish/backups/learnhouse-db-prompt13-20260926T075726Z.dump` |
| Size | 254,707 bytes |
| SHA-256 | `c37f870fad1a52ff58e7904fd22c466813f5fd6842d5d386ce4bc1a4f02794b0` |
| Rollback | `pg_restore -U learnhouse -d learnhouse --clean --if-exists learnhouse-db-prompt13-20260926T075726Z.dump` (on DB container) |

## Structure

- 4 chapters mapped from website curriculum modules
- Representative markdown lesson (module 1)
- Assignment activity with SHORT_ANSWER task (module 1)
- Live-session information template (module 4, Asia/Karachi)
- Recorded-lesson template with unpopulated video reference (module 4)

## Synthetic QA (example.com — no outbound mail)

| Check | Result |
|---|---|
| Anonymous course access blocked | Pass |
| Student enrolled read access | Pass |
| Student assignment submit | Pass |
| Instructor API tokens denied | Pass |
| Instructor views submissions | Pass |
| Instructor grades with feedback | Pass |
| Student sees graded feedback | Pass |

Synthetic accounts: `pakish-pilot-instructor@example.com`, `pakish-pilot-student@example.com` (passwords in server-only `prompt13-pilot-state.json`).

## LearnHouse findings

- Contributors added via bulk API default to **PENDING**; admin must set `authorship_status=ACTIVE` for grading.
- Fully `published=false` blocks enrolled learner course reads; pilot uses `published=true` + `public=false`.
- `@example.invalid` rejected by Pydantic `EmailStr`; RFC 2606 `example.com` used instead.
- Admin headless APIs require `Authorization: Bearer lh_...` (stored server-side only).

## Certificate / media

- Certificates supported in OSS; **not issued** in pilot.
- Video references **unpopulated** — filesystem storage only; no durable object store verified.

## Not published

Pilot remains off the public website and out of the public Academy catalogue (`public=false`). Prompt 14 owns cutover approval.
