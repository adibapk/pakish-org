# PROMPT NUMBER: 12

## Objective

Create a reliable commercial lifecycle from the six canonical website courses through admission, payment verification, Academy account creation/enrollment, and welcome/access instructions.

Repository: `C:\Users\pakis\My-Projects\pakish-org`  
Master plan: `C:\Users\pakis\My-Projects\pakish-org\docs\PAKISH_COMMERCIAL_LAUNCH_MASTER_PLAN.md`

Run only after Prompts 10 and 11 are reviewed and their current state is understood.

## Investigate first

- Read `AGENTS.md`, master plan, prior phase reports/diffs, Next.js 16 docs, admission schemas/APIs/storage/admin UI, payment proof flow, email/WhatsApp notifications, course IDs, and live Academy API/admin capabilities.
- Inspect git and server state; protect unrelated WIP.
- Map every current lead state and stored field. Preserve backward compatibility for existing lead JSON/records.
- Identify the safest enrollment interface. Prefer documented Academy APIs/admin operations over direct database writes.
- Confirm which messages can be tested safely without emailing/WhatsApping real people.

## Implement

- Make the six website course IDs/slugs the selectable commercial catalogue.
- Remove the obsolete/conflicting three-duration admission choices.
- Define an auditable lifecycle such as `new -> contacted -> quote_sent -> payment_pending -> payment_submitted -> payment_verified -> account_created -> enrolled -> welcome_sent`, with failure/retry notes where appropriate.
- Keep payment verification an explicit authorized admin action; never auto-verify from a file upload alone.
- On verified payment, support idempotent Academy account lookup/creation and course enrollment, followed by welcome/access instructions.
- Prevent duplicate accounts/enrollments and safe-retry partial failures.
- Preserve a separate contextual Women’s Empowerment fee-support review state. It must not masquerade as verified payment or automatic enrollment.
- Apply least-privilege admin access, validation, rate limiting, secure uploads, file-type/size checks, audit timestamps, privacy retention notes, and error handling.
- Provide a documented manual fallback for launch day if Academy automation is not safely supportable.

## Verification

- Add focused tests for schema compatibility, state transitions, idempotency, duplicate handling, failure/retry behavior, authorization, and unsafe upload rejection.
- Run lint/build/type validation.
- Exercise a controlled synthetic lead through the non-financial test path; do not make a real payment or message a real student.
- Verify old records remain readable.
- Verify logs/admin UI do not expose secrets or unnecessary personal data.

## Safety and stop boundary

- No real payment, bank action, student enrollment, or outbound notification.
- No direct Academy database mutation if a supported API/admin operation exists.
- Do not push/deploy. Do not stage unrelated paths. Stop after reporting this phase.

## Final report

Provide the final state machine, source-of-truth mapping, files/services changed, tests/evidence, rollback/fallback, privacy/security decisions, blockers, and git status.

