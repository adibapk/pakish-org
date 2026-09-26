# PROMPT NUMBER: 17

## Project

Pakish Institute

Repository: `C:\Users\pakis\My-Projects\pakish-org`

Production website: `https://pakish.org`

Production Academy: `https://academy.pakish.org`

## Mission

Perform the final evidence-driven launch closure for the commercial website and private Academy pilot. Fix all remaining non-owner-dependent defects, complete the post-Production OAuth and Academy security/branding proofs, validate the real admission lead path and its operational persistence/notification claims, close SEO/indexing handoff, reconcile launch documentation with production reality, and produce a concrete first-cohort readiness gate.

Commit, push and deploy all safe engineering corrections that pass the gates. Do not publish a real Academy cohort, invite real instructors/students, upload private recordings, create meetings, issue certificates, or claim those operations are complete without the missing owner inputs and explicit evidence.

The goal is not to generate another broad wishlist. Finish everything that can be finished safely now, distinguish website/platform completion from real-course operational readiness, and leave at most one concise owner-input packet containing only decisions/data that cannot be inferred.

## Current coordination state — reverify before acting

- Branch was reported clean at `master` after Prompt 16 and two owner-requested homepage removals.
- Latest reported commits:
  - `8ca44d7` — conversion-focused navigation, Prompt 15 closeout and deployment preflight
  - `31b74e1` — authenticated Academy OrgMenu alt fix
  - `1145208` — hide Pakish Glimpses section
  - `015901a` — hide Team / Our Core Family Mentors section
- GitHub Actions run `36236264551` for `015901a` has independently been observed as completed successfully. Verify the live deployed SHA/image rather than trusting CI alone.
- `components/layout/sections/glimpses.tsx` and `components/layout/sections/team.tsx` intentionally remain for future reuse. Do not delete them or their assets.
- Live production HTML no longer contains the Team or Glimpses sections, but still contains a footer `Team` link to `/#team`. This is a confirmed broken same-page anchor and must be fixed.
- Prompt 16 reports Google OAuth is now `In production`, but its post-publish end-to-end login was interrupted at consent. The earlier Testing-mode owner login does not prove the complete post-publish callback/session flow.
- Prompt 16 reports invite-only remains enabled and the authenticated Academy OrgMenu alt was patched. Reverify rendered production behavior after a fresh container/session.
- Prompt 14/15 left uncertainty around temporary Academy QA API tokens/accounts and overlay branding persistence after image/container recreation.
- The private pilot remains `AI Productivity & Automation`, mapped to Academy UUID `course_05275db9-cddf-4a68-825a-01e4e2714066`; it must remain private until first-cohort gates pass.
- Real instructor email/assignment, live schedule/meeting owner, recording inventory/storage, consent/attendance ownership and public-cohort approval have not been provided.

## Safety and operating rules

1. Read `AGENTS.md`, the commercial launch master plan, Prompt 10-16 prompts/reports, current git status/log/diff, deployed website/Academy state, deployment topology, backups and rollback procedures.
2. Identify any active Cursor/agent work before editing. Preserve unrelated work; never reset, clean, stash, rebase, force, broad-stage or silently discard server changes.
3. Use exact-path staging only. Never use `git add .` or `git add -A`.
4. Never expose secrets, OAuth IDs beyond a short suffix, tokens, codes, cookies, passwords, private learner data, payment proofs, recording contents or broad environment output.
5. For Google/passkey/MFA/CAPTCHA/password prompts, pause for the owner to complete the authentication factor directly, then continue.
6. No real payment, enrollment, notification, certificate, instructor invitation, learner invitation, meeting creation or public Academy publication during controlled QA.
7. Back up exact production records/configuration before any cleanup mutation. Delete/revoke only positively identified Prompt 13-16 synthetic/test artifacts; never infer that an unfamiliar account/token is disposable.

## Work package A — reconcile the latest website release

### A1. Prove exact deployment

- Verify `master`, `origin/master`, latest commits and clean/known working tree.
- Verify GitHub Actions run `36236264551`, the production container/image and the exact deployed repository SHA `015901a...` or later.
- In a fresh browser, confirm the homepage no longer renders Pakish Glimpses or Team / Our Core Family Mentors.
- Confirm the new desktop/mobile navigation geometry remains stable after the later homepage-only commits.

### A2. Remove orphaned hidden-section navigation

- Remove the public footer `Team` link to `/#team` while the Team section is hidden.
- Search source, generated output and delivered HTML for links to `#team`, `#glimpses` or any other missing same-page ID.
- Retain the hidden components for future reuse exactly as requested; add a concise code comment only if needed to explain intentional non-rendering.
- Do not replace the dead link with an unrelated destination merely to keep the number of footer links unchanged.

### A3. Add a reliable internal-route and anchor check

- Extend existing lightweight test tooling to crawl/build-check all public same-origin links and hash anchors from the generated site or route manifest.
- Detect non-existent routes, missing same-page/target-page IDs, redirect loops and retired active-Lodhran links.
- Respect intentionally external, mailto, tel and WhatsApp links without making real contact.
- Keep the check deterministic and suitable for CI; do not add a heavyweight dependency if existing Playwright/Next build tooling can perform it.

## Work package B — complete Prompt 15/16 authentication and Academy closure

### B1. Prove post-publish Google OAuth end to end

From a fresh signed-out browser session:

1. open `https://academy.pakish.org/login`
2. initiate `Sign in with Google`
3. verify the existing Pakish app, minimal `openid email profile` scopes and exact callback
4. let the owner complete Google account selection/consent if required
5. prove callback returns to Academy and creates the expected existing owner/admin session
6. open and refresh a protected page/deep link
7. sign out
8. prove the protected page is no longer available after logout

Record Google Auth Platform `In production` status separately from the actual business-flow proof. Do not create another OAuth client, rotate secrets or add scopes.

### B2. Final rendered branding scan

- Scan fresh anonymous and authenticated Academy renders, not merely source strings, on login, invite-required signup, home/catalogue, account/settings, protected course, logout and 404/error surfaces.
- Confirm there are no visible broken logos, `LearnHouse`/`Learnhouse` wordmarks, incorrect alt text or LearnHouse legal links on these reachable surfaces.
- Inspect browser console/network and image natural dimensions/MIME types.
- If a visible residual is found, patch the exact LearnHouse 1.3.6 component through the existing idempotent branding overlay, syntax-check it, apply it from the clean server repository checkout, restart/recreate only the necessary service and retest.
- Do not blindly replace dormant strings in disabled AI/Stripe/unused modules and do not fork the whole LMS solely for a cosmetic string.
- Document that the overlay must be re-applied after an Academy image upgrade until a source-owned/forked customization path is approved.

### B3. Close temporary QA credentials and accounts

- Using narrow allowlisted queries, inventory active LearnHouse API tokens and the Prompt 13 synthetic instructor/student accounts without printing values, hashes, passwords or unrelated user data.
- Correlate only artifacts recorded in `/home/opc/.learnhouse/pakish/prompt13-pilot-state.json` and Prompt 13 evidence.
- Create a fresh database backup before mutation.
- Revoke/delete temporary API tokens no longer required for operations.
- Disable/archive synthetic QA accounts using a supported reversible operation where possible. If LearnHouse lacks a safe disable/archive operation, remove their course/org access and document the residual account state rather than unsafe direct deletion.
- Preserve the real owner/admin account, OAuth client, pilot structure and any operational token that has a documented current purpose.
- Keep the state file mode `0600`; remove obsolete plaintext test passwords from it only after proving they are no longer needed and after preserving non-secret pilot IDs/evidence in the proper docs.

## Work package C — prove the real admission and lead-operation path

### C1. Persistence and backup

- Verify the production `pakish-org` container mounts the named persistent volume to `/app/.data` and that lead/payment-proof data survives a controlled container recreation. Do not use real learner data for this test.
- Verify volume ownership/permissions and that proof files are not web-public.
- Create a current encrypted or access-restricted backup of `.data/admissions`, record checksum/location/permissions, and validate the archive structure without restoring over production.
- Confirm the restore runbook uses the correct container/volume path and cannot overwrite current data without an explicit maintenance step.

### C2. Controlled lead journey

Create one clearly named synthetic commercial lead through the public production form using non-real contact data that passes validation. Prove:

- public API validation, honeypot and rate-limit behavior
- request is atomically persisted
- public response does not leak internal/sensitive fields
- lead appears in the authenticated admin dashboard
- payment proof cannot equal payment verification
- proof download requires admin authentication and is path-safe
- guarded transitions/audit events still work
- manual Academy provisioning boundary remains honest
- cleanup removes only the exact synthetic lead/proof after evidence and backup

Do not perform a real payment, real student enrollment or external notification.

### C3. Make notification copy truthful

- Inspect production notification configuration using presence-only checks.
- If a verified Resend/sender configuration exists, send at most one explicitly labelled test notification to the owner-approved Pakish administrative inbox and verify provider acceptance plus actual receipt. Never send to a learner/customer.
- If notification delivery is not configured or cannot be provider-proven, do not claim `our team is notified`. Change the admission copy to accurately say the request is saved for staff review and the applicant can continue on WhatsApp.
- Preserve graceful failure: notification outage must not lose the saved lead or break the applicant response.
- Report provider acceptance and inbox delivery as separate evidence classes.

## Work package D — final SEO, indexing and public buyer-journey proof

### D1. Technical/content closure

Run a final production crawl of every public route and verify:

- status, canonical, title, description, H1, robots and indexability intent
- schema matches visible facts
- all unique OG/Twitter images load and render correctly
- sitemap contains only intended indexable routes
- Lodhran remains noindex, outside sitemap and described only as a future plan
- `/signup` still redirects permanently to `/admission`
- no retired `Fi/Fee Sabilillah`, institute-wide women-only/free-course, donation-first or active-Lodhran claims
- no broken internal route/hash links, placeholder social links, fake ratings/testimonials, stale Team/Glimpses claims or orphaned CTAs
- `llms.txt`, manifest and robots match current production facts

Do not alter the approved homepage keyword simply because fresh post-launch performance data is sparse.

### D2. Search Console handoff

If the owner-authenticated Google session has access to the correct `pakish.org` Search Console property:

- verify ownership/property identity
- submit or re-submit `https://pakish.org/sitemap.xml`
- inspect coverage/indexing without treating absence of new data as zero traffic
- request indexing for the homepage, courses index, six course pages, Women’s Empowerment and Karachi campus page only where Search Console allows and quota is reasonable
- do not request indexing for Lodhran or Academy private/auth pages
- record provider acknowledgement separately from eventual indexing/ranking, which cannot be guaranteed immediately

If the exact property is absent or authentication requires owner action, stop only this provider substep and report the single exact action needed. Do not create or modify unrelated properties.

### D3. Buyer-journey and accessibility regression

In fresh desktop/mobile browsers, exercise:

`homepage -> course goal -> course detail -> admission -> saved request -> WhatsApp handoff boundary`

and:

`homepage -> Women’s Empowerment -> controlled fee-support pathway`

Check navigation/dropdowns, keyboard/focus/Escape, mobile sheet, forms, errors/recovery, dark/light theme, reduced motion, console/network, payment instructions, privacy links and Academy transition. Do not send a real WhatsApp message or payment proof.

## Work package E — operational truth and first-cohort readiness

### E1. Reconcile documentation

Update the master plan and Academy docs to current verified reality:

- implementation status and deployed release date/SHA
- approved current navigation
- Lodhran future-plan/noindex decision
- Glimpses and Team intentionally hidden but components retained
- Google OAuth production status and invite-only boundary
- private pilot state
- admission persistence/manual provisioning state
- completed versus deferred launch items

Remove stale statements such as `implementation has not started`, active Lodhran course intent, or a currently visible Team section. Do not rewrite historical evidence reports as if their original-time facts were false; add current status/closure notes instead.

### E2. Inspect available first-cohort assets without inventing them

- Inspect the mapped pilot, existing Academy content, repo docs and only explicitly approved server content directories for lesson/recording metadata.
- Do not broadly scan personal drives/home folders, open private recordings, or upload/copy media without owner direction.
- Record only verified filename/path metadata, duration/format if safely available, ownership status and readiness. Unknown remains unknown.
- Confirm whether the AI Productivity pilot has enough real instructional content for a live cohort. Templates alone do not count.

### E3. Produce one concise owner-input gate

Create/update `docs/academy/FIRST_COHORT_LAUNCH_GATE.md` with the recommended first cohort (`AI Productivity & Automation`) and only the unresolved fields that require owner authority or real-world information:

- real instructor name and email
- instructor role/access approval
- cohort start/end dates, days, times and Asia/Karachi timezone confirmation
- primary meeting account owner and backup host
- learner communication channel
- attendance owner and cancellation/reschedule owner
- recording consent decision
- recording/media source location and ownership
- durable object/video storage decision if recordings will be published
- final fee/cohort size only if different from the public starting-price model
- explicit approval to publish/enroll real learners

For each field provide a recommended default where technically/business appropriate, but do not convert a recommendation into an asserted fact. The file must make clear that the website and private pilot can be production-ready while a real public cohort remains blocked on these inputs.

Do not publish the pilot or invite real people in this prompt.

## Work package F — quality gates, release and final report

### F1. Automated gates

Run:

- full tests
- lint
- production build
- navigation geometry test
- new internal route/hash link check
- OG generation/consistency check
- `git diff --check`
- dependency/advisory review
- Python/shell syntax checks for changed operations files
- secret scan of exact intended diff/untracked paths

No critical/high issue may be silently ignored.

### F2. Commit and deployment

- Review every changed/untracked file.
- Stage exact paths only and create focused professional commits.
- Push `master` without force only after gates pass.
- Monitor the exact GitHub Actions run through completion.
- Prove exact deployed SHA/image/container, website health and fresh-browser behavior.
- Apply Academy overlay/cleanup separately with its own backup, service and live proof.
- If any release regresses, roll back only the affected website or Academy layer and prove restoration.

## Definition of done

Prompt 17 is accepted only when:

1. Latest homepage-removal commits are tied to a successful deployed SHA/image.
2. No public link targets the hidden Team/Glimpses sections or another missing route/anchor.
3. Google OAuth is proven end to end after Production publishing.
4. Reachable Academy anonymous/authenticated surfaces are cleanly Pakish branded.
5. Temporary Prompt 13-16 tokens/accounts are safely reconciled and invite-only/private-pilot controls remain intact.
6. Admission persistence, backup, admin visibility and lifecycle controls pass a controlled production test.
7. Admission notification language matches provider-proven reality.
8. Final crawl, SEO, link, schema, responsive, accessibility and buyer-journey checks pass.
9. Search Console sitemap/indexing handoff is provider-acknowledged or has one precise owner-only blocker.
10. Documentation matches current production.
11. The first real cohort is either genuinely ready with all verified inputs or explicitly blocked by the concise owner-input gate; it is never falsely described as live.
12. Exact commits, CI, deployment, backups, rollback and final clean Git status are evidenced.

## Final evidence report

Return:

- decision: `PROMPT 17 ACCEPTED`, `PARTIAL`, or `BLOCKED`
- phase closure matrix for Prompts 10-17
- exact live deployment SHA/image/container and CI run
- hidden-section/link correction evidence
- post-Production OAuth business-flow evidence
- Academy branding/token/account cleanup evidence without sensitive values
- admission persistence/backup/notification evidence
- public route/link/SEO/schema/OG/accessibility/buyer-journey results
- Search Console provider outcome
- files/docs materially changed
- tests/build/audits and results
- commits/push/deploy evidence
- current rollback references
- exact owner-input gate for the first real cohort
- remaining P2 work only
- final `git status --short --branch`

Do not claim `100% complete`, `all courses live`, `notification delivered`, `indexed`, or `real cohort launched` without the corresponding direct evidence.
