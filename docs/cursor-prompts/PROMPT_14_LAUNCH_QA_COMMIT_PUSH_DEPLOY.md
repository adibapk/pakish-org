# PROMPT NUMBER: 14

## Objective

Perform the final cross-system launch review. Only after every required gate passes, create scoped commits, push, deploy, and prove the exact production release.

Repository: `C:\Users\pakis\My-Projects\pakish-org`  
Master plan: `C:\Users\pakis\My-Projects\pakish-org\docs\PAKISH_COMMERCIAL_LAUNCH_MASTER_PLAN.md`

Run only after Prompts 10-13 are reviewed and accepted.

## Preflight

- Read `AGENTS.md`, master plan, all phase prompts/reports, current git diff/status/log, GitHub Actions/Coolify configuration, live domains, backups, and rollback procedures.
- Reconcile every uncommitted file to an owner/phase. Stop if ownership is unknown or unrelated WIP would be included.
- Verify branch/upstream and exact deployment trigger. Do not assume pushing is harmless or that a successful CI job proves production.
- Refresh production state immediately before release.

## Required release gates

### Code and security

- Full lint, type checks, production build, relevant automated tests, dependency audit/advisory review, secrets scan, and generated-asset consistency.
- No critical/high issue may be silently ignored. Document accepted non-launch risk with rationale.

### Content, SEO, GEO

- Zero public `Fi Sabilillah`/retired-name occurrences.
- Commercial inclusive homepage; Women’s Empowerment separate and accurate.
- Six-course consistency, transparent fees/quotes, no conflicting three-duration catalogue.
- Unique title/description/H1/canonical/OG for every indexable page; schema matches visible facts; sitemap/robots/manifest/`llms.txt` valid.
- No broken internal links, false claims, invented testimonials, placeholder social links, or duplicate public Academy course copy.

### UX and accessibility

- Fresh-browser desktop/mobile checks of all public routes and main CTAs.
- Keyboard/focus/contrast/reduced-motion checks.
- Browser console/network free of launch-blocking errors.
- Forms show useful validation and success/failure recovery.

### Business flow

- Controlled non-financial test: course -> admission -> payment-proof test boundary -> admin review -> Academy handoff simulation/test environment.
- Women’s Empowerment fee-support route stays separate from standard paid admission.
- No real payment, real donor contact, or unintended real student notification.

### Academy and operations

- Native `academy.pakish.org` TLS/login/deep-link/logout works; `pakish.org/academy` entry behaves as designed.
- Public signup/indexing/module settings are correct.
- Pilot instructor/student permissions and course loop pass.
- Backups and rollback are current and restore instructions are usable.

## Commit, push, and deployment rules

- Review the complete diff before staging.
- Stage exact intended paths only; never `git add .` or `git add -A`.
- Keep unrelated agent WIP unstaged and unchanged.
- Use small professional commits grouped by concern when practical.
- Record pre-push commit SHA. Push without force only after gates pass.
- Monitor CI and the actual Coolify/provider deployment.
- Verify the deployed SHA/image, health, fresh-browser behavior, and critical flows. HTTP 200 alone is insufficient.
- If any gate fails, stop release, report the blocker, and leave production unchanged or execute the documented rollback if deployment already began.

## Final report

Report:

- Phase-by-phase completion matrix.
- Exact tests and results.
- Commits and pushed branch.
- CI/deployment identifiers and deployed SHA/image.
- Production routes and browser flows verified.
- Backup and rollback reference.
- Remaining P2 work only.
- Final `git status --short --branch` proving unrelated WIP was not included.

Do not claim “100% complete” unless every definition-of-done item in the master plan and every release gate above has direct evidence.

