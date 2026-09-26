# Academy course mapping (operations)

**Last updated:** 2026-09-26 (Prompt 13)  
**Source catalogue:** `lib/courses/data.ts`  
**Machine-readable mapping:** `lib/academy/course-mapping.ts`

## Summary

| Website slug | Website title | Academy status | Academy UUID | Modules | Recording | Live cohort |
|---|---|---|---:|---|---|---|
| `ai-productivity` | AI Productivity & Automation | **private pilot** | `course_05275db9-cddf-4a68-825a-01e4e2714066` | 4 | template only | SOP drafted |
| `ai-business` | AI for Business & Workplace Automation | unmapped | — | 4 | not inventoried | not ready |
| `full-stack-ai` | Full-Stack AI Development | unmapped | — | 5 | not inventoried | not ready |
| `wordpress-woocommerce` | WordPress & WooCommerce | unmapped | — | 4 | not inventoried | not ready |
| `cloud-devops` | Cloud & DevOps | unmapped | — | 4 | not inventoried | not ready |
| `ai-freelancing` | AI-Powered Freelancing | unmapped | — | 4 | not inventoried | not ready |

## Rules

1. Never copy placeholder `lms-*` IDs into production workflows.
2. Record a LearnHouse `course_uuid` only after API/DB verification on `academy.pakish.org`.
3. Pilot course remains **private** and **unpublished** until Prompt 14 owner approval.
4. Website admission leads store `academyCourseUuid` from the mapping module when mapped.

## Pilot selection scorecard (Prompt 13)

| Criterion | AI Productivity | AI Business | Full-Stack AI | WordPress | Cloud/DevOps | AI Freelancing |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Content availability | **4** | 3 | 2 | 2 | 2 | 3 |
| Instructor readiness | 2 | 2 | 2 | 2 | 2 | 3 |
| Technical setup burden | **5** | 4 | 2 | 3 | 2 | 4 |
| Live + recorded fit | **4** | 4 | 3 | 3 | 3 | 4 |
| Assignment/progress test | **5** | 4 | 3 | 3 | 3 | 4 |
| Commercial readiness | 4 | 4 | 3 | 3 | 3 | 4 |
| Privacy/media risk | **5** | 4 | 3 | 3 | 3 | 4 |
| **Total** | **29** | 25 | 18 | 19 | 17 | 25 |

**Decision:** `ai-productivity` — highest score, four-module canonical curriculum, lowest lab burden, suitable for private pilot without production recordings.

## Owner inputs still required

- Confirm real instructor name/email per course (`TEACHER_ACCESS_MATRIX.md`).
- Provide durable recording storage location before populating video references.
- Approve live-class schedule and meeting account before Prompt 14.
