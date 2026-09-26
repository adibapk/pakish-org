# LearnHouse 1.3.6 role and access model

**Evidence:** `ghcr.io/learnhouse/app:1.3.6` on `pakish-sg`, source paths under `/app/api/src/services/setup/setup.py`, `/app/api/src/routers/admin.py`.

## Global roles (org membership)

| ID | Name | LearnHouse type | Business mapping |
|---:|---|---|---|
| 1 | Admin | `TYPE_GLOBAL` | Platform / academic administrator |
| 2 | Maintainer | `TYPE_GLOBAL` | Academic administrator (delegated) |
| 3 | Instructor | `TYPE_GLOBAL` | Course instructor (own content) |
| 4 | User | `TYPE_GLOBAL` | Student / learner |

There is **no native Teaching Assistant role** in OSS 1.3.6. Closest pattern: Instructor with course-contributor authorship on assigned courses only.

## Capability matrix (evidence-based)

| Action | Admin | Maintainer | Instructor | Student |
|---|:---:|:---:|:---:|:---:|
| Organization settings | Yes | Limited | **No** | **No** |
| API token management | Yes | If granted | **No** (verified pilot QA) | **No** |
| Create private course | Yes | Yes | Own courses | **No** |
| Enroll learner | Yes (UI + `/admin/default/enrollments/...`) | Yes | **No** | **No** |
| View private unpublished course | Yes | Yes | If contributor | If enrolled |
| Edit course content | Yes | Yes | Own / contributed | **No** |
| Grade assignments | Yes | Yes | Assigned course | **No** |
| Submit assignment | N/A | N/A | N/A | Enrolled only |
| Certificates | Yes (`/admin/default/.../certificates`) | Yes | Issue if permitted | Receive when eligible |

## Entities and identifiers

| Entity | Identifier | Notes |
|---|---|---|
| Organization | `org_id`, slug `default` | Single-tenant deployment |
| Course | `course_uuid`, numeric `id` | `public`, `published` flags |
| Chapter | `chapter_uuid`, `id` | Module equivalent |
| Activity | `activity_uuid`, `id` | Lesson types: `TYPE_DYNAMIC`, `TYPE_ASSIGNMENT`, `TYPE_VIDEO`, … |
| Assignment | `assignment_uuid` | Linked to `activity_id` |
| Enrollment | `trail` / `trailrun` | Admin API: `POST /api/v1/admin/default/enrollments/{user_id}/{course_uuid}` |
| Progress | `trail_steps` | Admin API progress endpoints |
| Certificate | `user_certification_uuid` | Supported in OSS; not issued in pilot |

## Storage (verified)

- `LEARNHOUSE_CONTENT_DELIVERY_TYPE=filesystem`
- Docker volume `learnhouse_content_d1110885` → `/app/api/content`
- External video embeds supported (`SUBTYPE_VIDEO_YOUTUBE`, external video activities)
- Hosted upload path exists; **durable object storage not configured** for production recordings
- AI tutor: `LEARNHOUSE_IS_AI_ENABLED` — remains disabled

## Residual risks

1. Instructor role can create courses org-wide (`courses.action_create_own`); restrict by process until usergroups/cohorts are defined.
2. In-memory admission lead locks are single-replica only (production confirmed one app replica for main site).
3. Assignment learner endpoints reject API tokens; automation must use user sessions or admin grading APIs appropriately.

## Supported operation paths

| Capability | Path |
|---|---|
| Provision learner | Admin UI or `POST /api/v1/admin/default/users` + enrollment (API token) |
| Private course | `POST /api/v1/courses/?org_id=1` with `public=false` |
| Headless enrollment | `POST /api/v1/admin/default/enrollments/{user_id}/{course_uuid}` with `Authorization: Bearer lh_...` |
