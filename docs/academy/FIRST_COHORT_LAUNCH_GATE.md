# First cohort launch gate — AI Productivity & Automation

**Status:** Website and private Academy pilot are production-ready; a **real public cohort is blocked** until the owner fields below are confirmed.
**Pilot course UUID:** `course_05275db9-cddf-4a68-825a-01e4e2714066` (private, `public=false`)
**Last verified:** 2026-09-26 (Prompt 17)

This gate lists only decisions and real-world facts that cannot be inferred from the repository or verified production platform state. Recommended defaults are suggestions, not asserted facts.

## Owner-input required before enrolling real learners

| Field | Status | Recommended default (if owner agrees) |
| --- | --- | --- |
| Real instructor name | **Required** | Assign the primary Pakish AI instructor already named in marketing materials |
| Real instructor email | **Required** | `@pakish.org` work address with verified deliverability |
| Instructor role / Academy access approval | **Required** | `CONTRIBUTOR` on the pilot course only; no org API tokens |
| Cohort start date | **Required** | — |
| Cohort end date | **Required** | — |
| Class days and times | **Required** | — |
| Timezone confirmation | **Required** | `Asia/Karachi` |
| Primary Google Meet / meeting account owner | **Required** | Pakish Institute official Meet workspace |
| Backup host | **Required** | Named secondary instructor or academic coordinator |
| Learner communication channel | **Required** | WhatsApp group + email for formal notices |
| Attendance owner | **Required** | Assigned instructor or academic coordinator |
| Cancellation / reschedule owner | **Required** | Same as attendance owner |
| Recording consent decision | **Required** | Explicit opt-in policy before any session is recorded |
| Recording / media source location and ownership | **Required** | — |
| Durable object/video storage (if recordings will be published in Academy) | **Required** | Decide before publishing any recording to LearnHouse |
| Final fee / cohort size (if different from public starting-price model) | Optional | Use current public starting price unless owner overrides |
| Explicit approval to publish course publicly and enroll real learners | **Required** | Written owner sign-off |

## Verified platform readiness (does not replace owner inputs)

- Commercial website deployed with admission persistence, admin lead dashboard, and invite-only Academy boundary.
- Google OAuth published to Production for `academy.pakish.org`; signup remains invite-only.
- Private pilot structure exists with curriculum templates; **templates alone are not sufficient instructional content for a live cohort**.
- No real instructor invitation, live schedule, meeting creation, recording upload, certificate issuance, or public catalogue publication has been performed in Prompt 17.

## Explicitly out of scope until gate passes

- Publishing the pilot in the public Academy catalogue (`public=true`).
- Inviting real instructors or learners.
- Creating live meetings or distributing join links.
- Uploading private recordings without consent and storage decisions.
- Claiming the first cohort is live, full, or open for enrollment.

## Next owner action

Complete the table above and reply with approval to proceed on cohort operations. Engineering can then configure instructor access, enrollment workflow, and (if approved) catalogue visibility under a separate controlled change.
