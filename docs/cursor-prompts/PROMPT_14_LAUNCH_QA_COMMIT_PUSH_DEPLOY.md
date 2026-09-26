# PROMPT NUMBER: 14

## Project

Pakish Institute

Repository: `C:\Users\pakis\My-Projects\pakish-org`

Master plan: `C:\Users\pakis\My-Projects\pakish-org\docs\PAKISH_COMMERCIAL_LAUNCH_MASTER_PLAN.md`

## Mission

Complete the final commercial-positioning corrections and launch cutover for Pakish Institute. Fix the public `/signup` 404, replace the homepage hero with inclusive commercial copy, remove all remaining retired free-charity positioning, reclassify Lodhran as an honest future campus plan, close the identified Academy mapping/security gaps, then perform full launch QA. Only after every mandatory gate passes, create scoped commits, push, deploy, and prove the exact production release.

This is the final release prompt. Do not claim the full plan is complete merely because tests pass or pages return HTTP 200. The website launch and the private Academy pilot have separate readiness boundaries: the commercial website may launch when its gates pass, but the Academy pilot must remain private until real instructor, schedule, meeting platform, and course-content readiness are verified.

## Owner-approved product policy

Treat these as authoritative decisions:

1. Pakish Institute is a commercial IT and AI training institute for eligible learners of all genders, plus professionals, teams, and businesses. It is not a women-only institute.
2. Normal programs are paid. Do not advertise free seats, free courses, subsidy quotas, donations, charity-first positioning, or any `Fi Sabilillah`/`Fee Sabilillah` initiative anywhere in the general commercial journey.
3. Women’s Empowerment remains one distinct initiative and page. It may explain community support and a controlled need-based fee-support pathway, but that language must not spill into the homepage, general course catalogue, ordinary admission flow, campus marketing, or commercial metadata.
4. Karachi and live online are current delivery modes. Lodhran is not an operating campus. Land is available at Chak No. 319, Dunyapur, Lodhran, and Pakish Institute is assessing a future rural digital-skills campus there. There are currently no Lodhran classes, admissions, schedules, or opening date.
5. Academy self-registration remains invite-only. Public website visitors should apply for admission; approved/enrolled learners receive Academy access. Do not restore an open public Academy signup form.
6. `academy.pakish.org` is the canonical LMS origin. `pakish.org/academy` is only a compatibility entry redirect.

## Verified handoff state — recheck before acting

The following comes from Prompt 13 evidence and independent review. Verify current state instead of trusting the report:

- Branch was `master` at `78f6820`, aligned with `origin/master`, with the cumulative Prompt 10-13 work intentionally uncommitted and unstaged.
- Prompt 13 reports 11/11 tests passing, lint with 0 errors/0 warnings, production build passing, and `git diff --check` clean apart from line-ending notices.
- Prompt 13 reports the Prompt 12 lead-concurrency gap fixed through serialized store mutation plus a passing concurrency test.
- Native Academy login, invite-only signup, private test-course behavior, and synthetic instructor/student API flows were reported as passing.
- Academy pilot course UUID: `course_05275db9-cddf-4a68-825a-01e4e2714066`; expected state is `public=false`, `published=true`, so enrolled learners can read it while it remains absent from the public catalogue.
- Academy remains a single LearnHouse 1.3.6 stack. AI is disabled. Media is on a Docker filesystem volume, not proven durable object storage. Live classes use links/embeds rather than a native meeting integration.
- A production backup was reported at `/home/opc/.learnhouse/pakish/backups/learnhouse-db-prompt13-20260926T075726Z.dump` with SHA-256 beginning `c37f870f`; verify existence, checksum, timestamp, permissions, and restore instructions.
- The public production site still serves the old women/free-positioning content because Prompt 10-13 website changes have not been committed, pushed, or deployed.
- `/signup` has no website route and currently reaches a 404. The correct fix is a permanent redirect to `/admission`, not an open signup form.
- `components/layout/sections/hero.tsx` already contains a partially corrected local hero, but it still advertises `Lodhran Campus` as active and its supporting copy is superseded by the exact copy below.
- `lib/campus-data.ts`, metadata/schema/navigation/footer/articles and other components still contain active-Lodhran claims and must be reconciled comprehensively.
- Independent review found canonical mapping errors in `lib/academy/course-mapping.ts`: at minimum the full-stack slug/title and the WordPress, cloud, and freelancing titles differ from `lib/courses/data.ts`. Correct mappings from the canonical course data; do not invent aliases or UUIDs.

## Coordination and safety rules

1. Read `AGENTS.md`, the master plan, Prompts 10-13 and their evidence, the complete current diff/status/log, relevant installed Next.js documentation under `node_modules/next/dist/docs/`, deployment configuration, Academy operations docs, and rollback instructions.
2. Reconcile every changed and untracked path to Prompt 10-14 or unrelated WIP. Preserve all valid Prompt 10-13 work. Never reset, clean, stash, rebase, force-push, or broadly stage.
3. Run `git status --short --branch`, recent log, diff name/status/stat, `git diff --check`, and process/port inventory before edits. Record the exact deployment trigger rather than assuming a push deploys production.
4. Do not expose credentials, passwords, session cookies, API tokens, hashes, private learner data, broad environment files, recording content, or payment proofs in terminal output, docs, commits, screenshots, or reports.
5. No real payment, enrollment, email, WhatsApp message, certificate, meeting invitation, or public course publication during QA. Use controlled test records only and remove or safely retain them as specified below.
6. Work only in this repository and the confirmed Pakish Academy/Coolify/Cloudflare deployment. Do not touch any other project or tenant.
7. Use supported Next.js and LearnHouse behavior. No fragile middleware workaround, database-wide mutation, or temporary production-only patch.
8. If unrelated WIP, secrets, an unsafe deployment trigger, a failed mandatory test, or an unprovable production target is found, stop before commit/push and report the exact blocker.

## Work package A — final content and routing corrections

### A1. Fix the public `/signup` journey

- Add a permanent Next.js redirect from `/signup` to `/admission` in the existing redirect configuration. Preserve safe query parameters through the framework’s normal redirect behavior and verify it with the installed Next.js version.
- Do not create a public signup form and do not redirect visitors to `academy.pakish.org/signup`; Academy registration must stay invite-only.
- Search all links, buttons, metadata, generated files, and documentation for stale public `/signup` destinations. Point public acquisition CTAs to `/admission` and authenticated learner CTAs to `https://academy.pakish.org/login` where contextually correct.
- Add or refine concise admission-page guidance: Academy access is issued after admission and enrollment confirmation. Do not imply instant account creation.
- Verify both the status/location headers and the fresh-browser journey. Expected production outcome: `https://pakish.org/signup` permanently redirects to `https://pakish.org/admission`, which renders successfully with no loop.

### A2. Replace the homepage hero exactly

Use this approved structure and copy unless a tiny punctuation change is required for rendering:

- Eyebrow: `Backed by Pakish Group · Est. 1999`
- H1: `Professional IT & AI Courses in Pakistan`
- Supporting copy: `Build practical skills in Generative AI, automation, full-stack development, WordPress, cloud and AI-powered freelancing through live, instructor-led training for students, professionals, teams and businesses.`
- Primary CTA: `Explore Courses` -> `/courses`
- Secondary CTA: `Apply for Admission` -> `/admission`
- Delivery/proof indicators: `Karachi Campus`, `Live Online`, `Team Training`

Requirements:

- Remove `Lodhran Campus` from active hero indicators.
- Do not mention women-only eligibility, free/subsidized seats, charity, quotas, donations, or fee support in the hero.
- Keep one clear SEO-focused H1, concise copy, two decision-reducing CTAs, restrained Next.js-style motion, reduced-motion compliance, and current responsive composition.
- Ensure homepage title, description, OG/Twitter copy, JSON-LD, visible sections, and `llms.txt` tell the same inclusive commercial story without keyword stuffing.

### A3. Remove retired free-charity positioning without damaging Women’s Empowerment

Perform a semantic content audit, not only a literal string replacement, across source, public assets, generated metadata, JSON-LD, OG text, manifest, `llms.txt`, course/admission/campus pages, insight articles, legacy components/data, and built output.

General commercial surfaces must contain zero claims such as:

- `Fi Sabilillah`, `Fee Sabilillah`, or spelling variants
- free courses/seats or a general subsidy quota
- donation-first calls to action
- women-only admission or women-only institute positioning
- Lodhran as an operating campus

Legitimate women-focused editorial content and the dedicated `/womens-empowerment` initiative may remain, but review every occurrence for context. The Women’s Empowerment fee-support intake must remain separate from normal paid admission and must not be promoted as a general free-course offer.

Do not publish blunt defensive copy such as “we are not a charity.” Establish the commercial model through confident program, fee, admission, and delivery language.

## Work package B — Lodhran future-plan conversion

### B1. Remove Lodhran from active operations

Remove Lodhran as a current campus/delivery location from:

- homepage hero, feature/proof strips, learning options, enrollment and contact sections
- main navigation, mobile navigation, footer and active-campus lists
- general course delivery copy, FAQs, admission choices and confirmation copy
- Organization/EducationalOrganization/LocalBusiness schema, location arrays, maps, directions and visit CTAs
- active campus counts, testimonials or claims
- sitemap and any automatically generated active location feed
- `public/llms.txt`, manifest, OG copy and other machine-readable summaries

Karachi campus, live online training, office/team training, and customized workshops may remain where verified.

### B2. Keep an honest future-plan page

Retain `app/campus/lodhran/page.tsx` as a direct-access future-plan page, but redesign its data/content so it cannot be mistaken for an operating campus.

Required metadata/content intent:

- Meta title: `Planned Lodhran Digital Skills Campus | Pakish Institute`
- H1: `Our Future Plan for a Lodhran Digital Skills Campus`
- Core facts: Pakish Institute has land available at Chak No. 319, Dunyapur, Lodhran; it is planning and assessing a future digital-skills campus intended to support rural development and underserved communities in the area.
- Explicit operational status: there are no current classes, admissions, schedules, campus visits, or announced opening date at Lodhran; verified updates will be published when facilities and operations are ready.
- Primary CTA: `Explore Live Online Courses` -> `/courses`
- Secondary CTA: `Register Interest in the Future Plan` -> a non-enrollment contact route with an appropriate source parameter, if the existing form safely supports it. Do not promise admission, scholarships, jobs, or an opening date.

SEO/schema requirements:

- Set the future-plan page to `noindex, follow` while keeping a self-referencing canonical and shareable OG/Twitter metadata.
- Remove it from the XML sitemap.
- Do not emit LocalBusiness, Place, active-campus, course-offer, opening-hours, or event schema for Lodhran.
- Do not target or claim active `IT courses in Lodhran` intent until the campus is operational.
- Regenerate its OG image so the visual says `Future Plan` or `Planned Campus`; it must not imply classes are open.

Refactor shared campus types/components if necessary so an inactive future plan cannot accidentally reuse donation needs, enrollment buttons, visit/directions UI, active-course schema, or operational copy. Prefer an explicit status discriminant such as `operational` versus `planned`, or a dedicated future-plan component, over scattered conditionals.

### B3. Reconcile historical/editorial references

Review every Lodhran occurrence. Where editorial context is still useful, state that Lodhran is a future planned initiative. Where the link or statement promises current delivery, rewrite it toward live online/Karachi delivery or remove it. Do not rewrite historical facts deceptively, and do not turn the future plan into a donation campaign.

## Work package C — Prompt 13 closeout and Academy safeguards

### C1. Correct the canonical Academy mapping

- Treat `lib/courses/data.ts` as the canonical website course identity source.
- Correct every `websiteCourseId`, `websiteSlug`, `websiteTitle`, and proposed Academy title in `lib/academy/course-mapping.ts` to match the six real course records exactly.
- Known mismatches to investigate include:
  - full-stack course currently mapped as `full-stack-ai` / `Full-Stack AI Development` instead of the canonical slug/title
  - shortened WordPress/WooCommerce title
  - shortened cloud/DevOps title
  - shortened AI-freelancing title
- Add automated mapping-consistency tests that fail when a mapping is missing, duplicated, or disagrees with canonical course ID/slug/title.
- Preserve the one verified pilot UUID only on the AI Productivity course. Never assign a fake UUID to an unmapped course.
- Confirm admission lead creation still stores `academyCourseUuid` only for a genuinely mapped course.

### C2. Reverify Prompt 13 operational claims

Re-run and independently prove:

- serialized lead mutation and concurrency test
- native Academy TLS, login page, cookie domain/path, health and instance info
- invite-only signup behavior
- pilot course `public=false`, `published=true`
- anonymous catalogue/deep-link denial and enrolled learner access
- instructor assignment/submission/feedback boundaries using controlled test identities only
- AI remains disabled
- no prefix leakage to the legacy path

An authenticated owner-admin browser walkthrough is preferred. If owner authentication is required, pause only at the login screen and ask the owner to sign in; never request the password or MFA code. Continue autonomously after the session is authenticated.

### C3. Clean test credentials and production QA residue

- Inspect `/home/opc/.learnhouse/pakish/prompt13-pilot-state.json` without printing its secrets. Confirm owner-only permissions (`0600` or stricter) and that it is outside the repository and backups are appropriately protected.
- Revoke/delete temporary API tokens after final QA. Do not leave an active test token merely for convenience.
- Disable/archive synthetic student and instructor accounts through a supported reversible mechanism after QA unless they are intentionally retained as named QA accounts with a documented owner-approved purpose. Never delete real users.
- Keep the pilot private. Do not publicly announce or publish it until a real instructor owner, live-class platform/schedule, recording/content source, learner support process, and completion policy are verified.
- Review one-off production scripts before commit. Do not commit secrets, invalid legacy Cloudflare global-key workflows, raw production state, disposable credential scripts, or scripts whose safe idempotency/rollback cannot be demonstrated. Commit only sanitized, reusable operations tooling and documentation.

### C4. Preserve the honest launch boundary

The marketing website can be released with applications and counseling live while the Academy pilot stays private. The final report must distinguish:

- website code committed/pushed/deployed
- Academy platform reachable and hardened
- private pilot technically validated
- real course/cohort publicly available

Do not claim the last item until actual instructor, schedule, platform, content, and owner approval exist.

## Work package D — full launch QA

### D1. Automated quality gates

Run from a cleanly understood working tree:

- the repository’s full test command
- lint
- current Next.js-compatible type checking, if separate
- production build
- `git diff --check`
- generated OG/assets command and consistency check
- dependency/advisory review appropriate to the lockfile/package manager
- secret scan of intended commit paths and history delta

No critical/high issue may be silently ignored. Record any accepted non-launch risk with evidence and rationale.

### D2. Content, SEO and GEO checks

Verify every indexable page has an intentional unique title, meta description, H1, canonical, OG/Twitter image and accurate schema. Check:

- homepage commercial keyword/copy consistency
- all six canonical course pages and course schema
- admission and payment-method boundaries
- Women’s Empowerment separation
- Karachi active-campus accuracy
- Lodhran future-plan `noindex, follow`, absence from sitemap and absence from active-location schema
- insights metadata and truthful internal links
- robots, sitemap, manifest, favicons and `llms.txt`
- unique/generated OG images render at 1200x630 with readable text and no retired claims
- no broken internal links, placeholder social links, invented testimonials, unverified statistics, fake review ratings, or duplicate/conflicting course catalogue claims

Search both source and production build output. A zero-result literal scan is not enough; manually inspect semantically sensitive occurrences of `women`, `free`, `subsid`, `support`, `donat`, `Lodhran`, and campus/delivery phrases.

### D3. Browser, responsive and accessibility checks

Use fresh browser sessions at representative desktop and mobile sizes. Cover at minimum:

- `/`
- `/courses` and all six course slugs
- `/admission`
- `/signup` redirect journey
- `/payment-methods`
- `/womens-empowerment` and its controlled fee-support route
- `/campus/gulshan-e-iqbal`
- direct `/campus/lodhran` future-plan page
- `/insights` and representative articles
- `/privacy`
- `/academy` compatibility entry and native `academy.pakish.org/login`
- sitemap and robots

Verify responsive layout, navigation, CTA destinations, form validation/recovery, keyboard order, visible focus, labels, contrast, reduced motion, image aspect ratios, browser console, network failures, hydration, and external-origin transitions. Fix launch-blocking issues and retest.

### D4. Controlled business-flow proof

Exercise a non-financial test journey:

`course -> admission -> lead/admin state -> payment-proof boundary -> manual Academy provisioning boundary -> welcome preview -> Academy login`

Requirements:

- payment upload never equals payment verification
- no fake payment, real notification, or real enrollment
- team/custom inquiries bypass individual payment/provisioning correctly
- Women’s Empowerment support intake stays isolated from standard commercial leads
- lifecycle guards, audit trail, proof-file access controls, CSRF/origin checks, and sensitive-field redaction behave correctly
- delete or clearly mark controlled test data after evidence is captured

## Work package E — scoped release, deployment and production proof

### E1. Pre-commit review

- Review the entire cumulative Prompt 10-14 diff and every untracked file.
- Confirm no owner data, server state, credentials, generated junk, unrelated project files, or temporary diagnostics are included.
- Check `.gitignore` coverage for admission data/proofs and local/test state without accidentally hiding required source.
- Stage exact reviewed paths only. Never use `git add .` or `git add -A`.
- Use small professional commits grouped by concern when practical, for example commercial content/SEO, Academy/lifecycle, operations/docs, and final QA fixes.
- Re-run required gates against the exact staged tree before push.

### E2. Push and deployment

- Record pre-push branch and commit SHAs.
- Push `master` to its existing upstream without force only after every mandatory pre-deploy gate passes.
- Monitor the actual CI and deployment provider. Record workflow/deployment identifiers, timestamps, target app/domain, source commit, image/release identifier, and final status.
- Do not treat a successful GitHub job, build log, or HTTP 200 as proof of correct production behavior.

### E3. Production acceptance

In a fresh browser and with targeted header checks, prove the deployed release:

- `/` shows the approved inclusive hero and no active Lodhran/free/women-only claim
- `/signup` permanently redirects to `/admission` without a loop
- admission renders and describes invitation-based Academy access accurately
- all course, payment and main CTA routes work
- Women’s Empowerment remains separate and accurate
- Karachi is the only currently presented physical campus
- Lodhran direct page clearly says future plan, emits `noindex, follow`, is absent from sitemap, and has no active-location schema
- retired-name/free-charity scan is clean in delivered HTML/metadata/assets
- robots, sitemap, canonical, schema, manifest, OG assets and `llms.txt` are correct
- `academy.pakish.org` login/health/deep links work and Academy signup remains invite-only
- `/academy` compatibility redirect reaches the native Academy origin
- browser console/network and mobile/desktop critical paths are clean

Verify the exact deployed SHA/image. If deployment partially fails or production regresses, use the documented rollback and then prove rollback state. Do not improvise destructive recovery.

## Definition of done

Prompt 14 is accepted only if all of the following are evidenced:

1. `/signup` production redirect works as specified.
2. Approved inclusive commercial hero is deployed.
3. No general free-charity or women-only commercial positioning remains.
4. Lodhran is hidden from active operations and accurately represented only as a noindex future plan.
5. Canonical Academy mappings match all six course records and tests enforce this.
6. Prompt 13 Academy claims are reverified and temporary tokens/credentials are safely handled.
7. Full automated, browser, accessibility, content/SEO and controlled business-flow gates pass.
8. Intended changes are exactly committed, pushed and tied to the proven production release.
9. Rollback evidence is current.
10. Remaining owner-only inputs are clearly separated from completed engineering work; the private pilot is not misrepresented as a live public cohort.

## Final evidence report

Return a concise but complete report containing:

- executive decision: `PROMPT 14 ACCEPTED`, `PARTIAL`, or `BLOCKED`
- phase-by-phase completion matrix for Prompts 10-14
- before/after commercial positioning and Lodhran policy
- exact files materially changed in Prompt 14
- automated commands and results
- browser routes/viewports and accessibility checks
- SEO/schema/sitemap/OG/retired-copy evidence
- controlled admission/Academy flow evidence without sensitive values
- Academy pilot state, token/test-account cleanup, backup/checksum and rollback reference
- commits, pushed branch, CI/deployment identifiers, deployed SHA/image and production proof
- exact owner-only inputs still required for a real public cohort
- remaining P2 work only
- final `git status --short --branch`, explicitly proving unrelated WIP was preserved

Do not claim `100% complete`, `live course`, or `production proven` unless the corresponding definition-of-done evidence exists.
