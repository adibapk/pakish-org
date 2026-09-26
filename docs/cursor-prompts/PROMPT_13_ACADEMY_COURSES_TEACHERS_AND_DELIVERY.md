# PROMPT NUMBER: 13

## Objective

Configure the Academy operating model for the six commercial courses, least-privilege teacher access, live classes, and recorded content. Prove the model with one pilot course before scaling.

Repository: `C:\Users\pakis\My-Projects\pakish-org`  
Master plan: `C:\Users\pakis\My-Projects\pakish-org\docs\PAKISH_COMMERCIAL_LAUNCH_MASTER_PLAN.md`

Run only after Prompts 10-12 are reviewed.

## Investigate first

- Recheck repository, Academy, backups, roles, current users/courses, and prior phase reports.
- Inventory the six website courses and build a proposed mapping to Academy course IDs.
- Inventory available recorded content without copying/uploading it: course, module, lesson, language, duration, format, resolution, owner, learner/private data, quality, last reviewed date, and update needed.
- Confirm actual teacher names/emails and assigned courses with the owner before creating or inviting real accounts. Missing identity data is an owner-only blocker; do not invent it.
- Confirm current live-class platform, account ownership, timezone, and recording policy.

## Implement

- Create a versioned course-mapping document linking website ID/slug to Academy ID and content owner.
- Define and configure roles: platform administrator, academic administrator, instructor, teaching assistant, and student, using the least permissions the Academy supports.
- Select one low-risk pilot course. Create its structure, modules, lesson template, assignment, resource area, progress rule, and completion/certificate rule.
- Create a cohort template with Pakistan time, schedule, instructor, live link field, attendance owner, replay/resource location, backup host, and reschedule procedure.
- Establish a recorded-lesson publishing checklist: audio/privacy/version review, title, summary, transcript/captions, resources, assignment, version/date, and replacement policy.
- Use durable media/object storage when configured and verified. Do not rely on ephemeral container storage or upload the entire library during the pilot.
- Create test-role accounts only, using clearly synthetic addresses and no outbound invite unless a safe mail sandbox exists.

## Verification

- As a test instructor, create/update only the assigned pilot content and grade/feedback permitted work; verify forbidden admin/billing/system actions fail.
- As a test student, access only the enrolled pilot, play permitted media/sample content, submit a test assignment, view feedback/progress, and meet completion rules.
- Verify direct/deep links, mobile layout, logout/session boundaries, and no cross-course data leakage.
- Record screenshots/evidence without exposing secrets or personal data.

## Safety and stop boundary

- No shared real teacher accounts, guessed identities, mass invitations, or mass uploads.
- No real student notification or certificate.
- No AI tutor production activation.
- Do not push/deploy unrelated work. Stop after the pilot report; do not start Prompt 14.

## Final report

Provide course mapping, role matrix, pilot structure, recorded-content inventory summary, live-class SOP, test evidence, unresolved owner inputs, rollback, and exact git status.

