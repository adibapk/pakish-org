# PROMPT NUMBER: 16

## Project

Pakish Institute

Repository: `C:\Users\pakis\My-Projects\pakish-org`

Production website: `https://pakish.org`

Production Academy: `https://academy.pakish.org`

Google Cloud project: `pakish-org`

## Mission

Redesign the Pakish Institute global navigation into a stable, conversion-focused, accessible information architecture, then close the two remaining Prompt 15 items: publish the Google OAuth consent application to Production and remove the last authenticated Academy `LearnHouse` logo/alt trace. Clean generated repository residue, prevent recurrence of the known server dirty-tree deployment conflict, run full QA, commit exact paths, push, deploy/apply, and prove the final live outcomes.

Do not solve the navigation problem by merely shrinking all text, hiding links without preserving discoverability, or adding an unstructured `More` junk drawer. Apply Hick’s Law and responsive disclosure: keep primary choices few and clear; move secondary/support destinations into contextually correct desktop dropdowns, mobile groups and the existing footer.

## Prompt 15 coordination decision

Prompt 15 is accepted for core OAuth configuration, authorized-owner end-to-end Google login, invite-only enforcement, PNG logo migration, CI repair and deployment. It remains `PARTIAL` until:

1. Google Auth Platform publishing state changes from `Testing` to `In production`.
2. The remaining authenticated Academy navigation image no longer exposes `alt="LearnHouse"` or a LearnHouse wordmark.

Reverify all claims before mutation. Do not repeat working Prompt 15 setup or rotate the OAuth client/secret.

## Verified navbar defect — reproduce first

Current production `components/layout/navbar.tsx` renders these desktop decisions simultaneously:

- Courses
- Campuses
- Training Options
- Women’s Empowerment
- Insights
- Payment Methods
- Academy Login
- FAQ
- Apply
- theme toggle

At a measured 1536 × 639 CSS-pixel viewport with device scale 2.5:

- header client width: approximately 1139px
- header scroll width: approximately 1352px
- header height: approximately 102px
- `FAQ` wraps onto a second row
- `Apply` and the theme control render beyond the visible header boundary

Repository root causes:

- header width is constrained to `xl:w-[75%] xl:max-w-screen-xl`
- desktop navigation uses `flex-wrap`
- top-level links use `text-base` plus generous trigger padding
- long labels and too many equal-priority destinations exceed the available row

These measurements are evidence, not permanent magic numbers. Reproduce with fresh-browser screenshots and DOM geometry before editing.

## Safety and coordination

1. Read `AGENTS.md`, Prompt 15 report and committed changes, current `git status/log/diff`, installed Next.js guidance, navbar/brand/navigation-menu components, deployment scripts, Academy branding scripts, and current Google Auth Platform state.
2. Current reported repository residue is only `scripts/ops/__pycache__/`. Verify it contains generated Python bytecode only before removal. Preserve any unrelated work and never reset, clean, stash, force, rebase or broadly stage.
3. Do not expose OAuth client IDs beyond an optional short suffix, secrets, tokens, codes, cookies, passwords, learner data or broad environments.
4. Google publishing and production Academy overlay changes are separate external mutations. Verify rollback/current state before each.
5. If Google asks for passkey, MFA, CAPTCHA, password or reauthentication, pause at that screen for the owner to complete it directly; never request or handle those factors.
6. Keep Academy `signup_mode=inviteOnly`, AI disabled and the pilot private. Do not create users, publish courses, send notifications or change fees/content outside this prompt.

## Work package A — global navigation information architecture

### A1. Approved desktop information architecture

Replace the overloaded desktop row with these visible primary decisions, in this order:

1. `Courses` — dropdown
2. `Training` — dropdown
3. `Women’s Empowerment` — direct link
4. `Insights` — direct link
5. `Academy` — direct external/subdomain learner login link
6. `Apply` — visually distinct primary CTA

Keep the theme toggle as a utility control, not a content destination.

Remove these as standalone desktop top-level items:

- `Campuses`
- `Training Options`
- `Payment Methods`
- `FAQ`

Preserve their discoverability as follows:

- Karachi Campus and delivery formats belong inside the `Training` dropdown.
- Payment Methods belongs in the existing footer and contextual admission/course/enrollment surfaces; do not duplicate it in the primary desktop row.
- FAQ remains on the homepage and in the existing footer.
- Lodhran must not return to active navigation; it remains a direct-access noindex future-plan page.

Do not add an ambiguous `More` dropdown.

### A2. Courses dropdown

Create a compact, stable desktop dropdown that includes:

- `View All Courses`
- all six canonical course links sourced from `lib/courses/data.ts`

Use a two-column or otherwise viewport-safe layout at wide desktop widths so the menu does not become an excessively tall single column. Use short title plus one concise line of descriptive context; do not dump full summaries. Avoid duplicating course data manually when canonical fields already exist.

The dropdown must:

- open without changing header height or shifting page content
- stay within the viewport
- support pointer, keyboard and touch-compatible interaction
- expose clear focus states
- close on Escape, outside interaction and completed navigation
- not introduce hover tunnels or excessive animation

### A3. Training dropdown

Use three clear training/delivery choices:

- `Karachi Campus` -> `/campus/gulshan-e-iqbal`
- `Live Online` -> `/#learning-options`
- `Team Training` -> `/admission?training=office-team`

Use short supporting text. Do not label this menu `Campuses` while only one campus is operational. Do not advertise Lodhran as active.

### A4. Header layout and typography

Rework `components/layout/navbar.tsx` and only necessary shared navigation primitives so:

- desktop header is a single row with no wrapping
- primary nav uses `text-sm`/approximately 14px medium-weight UI typography, not undersized text and not the current `text-base` pressure
- logo, primary nav, Apply CTA and utility control have intentional flex/shrink/min-width behavior
- header uses a sensible near-full responsive width and a deliberate maximum width rather than shrinking to 70–75% while content overflows
- no header or page-level horizontal scrollbar is introduced
- sticky behavior does not obscure focused content
- dropdown positioning is absolute/overlay and causes zero layout shift
- reduced-motion preferences are respected
- current Next.js design language, dark/light themes and restrained motion remain intact

Use a content-driven breakpoint. If the full desktop row cannot fit comfortably, show the compact menu rather than allowing wrap, clipping or overflow. Do not rely solely on one monitor resolution.

### A5. Mobile/tablet navigation

Keep a single menu trigger plus visible brand and Apply CTA where space allows. Inside the sheet, use grouped navigation instead of repeating the overloaded flat desktop list:

- `Learn`: View All Courses, six course links, Training Options, Karachi Campus, Live Online, Team Training
- `Community`: Women’s Empowerment, Insights
- `Student Access`: Academy Login
- `Admissions & Support`: Apply for Admission, Payment Methods, FAQ

Requirements:

- no duplicate link in multiple groups unless it is the primary Apply CTA
- menu closes after internal navigation
- external Academy link behavior is explicit and consistent
- active/current route is programmatically indicated where practical
- tap targets meet an accessible size
- focus is trapped/restored by the existing sheet implementation
- no nested mobile dropdown maze

## Work package B — responsive, accessibility and conversion validation

### B1. Automated geometry regression

Add a focused browser regression test using the project’s existing browser-test tooling if present. If no browser framework exists, use the lightest maintainable option already available rather than adding a large test dependency solely for this task.

At minimum validate representative CSS viewport widths:

- 320
- 375
- 768
- 1024
- 1280
- 1366
- 1440
- 1536
- 1920

Also check browser text zoom/scale behavior at 125% and 200% where tooling supports it.

Assertions should include:

- no page-level horizontal overflow caused by the header
- desktop header height remains one row at desktop breakpoints
- no top-level navigation item wraps
- Apply and theme controls stay inside the header
- compact/mobile trigger appears before content becomes crowded
- dropdowns remain inside the viewport

Do not create brittle pixel-perfect screenshot tests for incidental rendering. Test behavior and containment.

### B2. Manual browser acceptance

Use fresh Chrome sessions in light and dark modes. Verify:

- desktop and mobile homepage
- a course detail page
- admission page
- Women’s Empowerment page
- Insights page
- a non-home route using hash links back to homepage sections

Test mouse, keyboard-only navigation, Tab/Shift+Tab, Enter/Space, arrow behavior supported by the Radix component, Escape, visible focus, route changes, dropdown close behavior, sticky scrolling and reduced motion.

Review browser console, hydration and failed network requests. Capture sanitized before/after screenshots at the original failing viewport and at mobile width.

## Work package C — Prompt 15 provider and Academy closeout

### C1. Publish Google OAuth application

In Google Cloud project `pakish-org`:

- confirm the existing application is `Pakish Institute Academy`
- confirm the existing client is the already configured `Pakish Academy Production` Web application
- confirm origin is `https://academy.pakish.org`
- confirm exact redirect is `https://academy.pakish.org/auth/callback/google`
- confirm requested scopes remain only `openid`, `email`, `profile`
- confirm audience remains `External`

Publish the consent application from `Testing` to `In production`. Do not create a second client, rotate the secret, enable APIs/billing, add scopes or change redirects.

If Google presents a warning/confirmation describing public availability, confirm it because publishing this already configured basic-scope OAuth application is the owner-approved remaining action. If Google instead requires domain verification, organizational approval or a new sensitive-scope verification, stop and report the exact blocker without changing scope.

After publishing:

- capture sanitized provider evidence showing `In production`
- re-run the existing authorized-owner Google login flow through callback, protected page, refresh and logout
- preserve `inviteOnly`; do not use an uninvited real account as a test
- clearly distinguish provider publishing proof from authorized-user business-flow proof

### C2. Remove final authenticated Academy LearnHouse trace

- Use a fresh authenticated Academy session to identify the exact remaining DOM node, image source, component and built asset responsible for the authenticated main-nav `alt="LearnHouse"`/wordmark.
- Inspect the exact deployed LearnHouse 1.3.6 source before patching. Likely candidates include the authenticated organization layout/menu/home components, but do not patch every occurrence blindly.
- Extend the idempotent `scripts/ops/prompt14-academy-branding.py` overlay so the targeted authenticated navigation uses the Pakish organization PNG/logo and accurate `alt="Pakish Institute"`.
- Re-run Python syntax checks and the branding apply procedure from the checked-out repository path.
- Verify authenticated desktop/mobile Academy navigation, login, signup/invite boundary and 404/error surfaces show no visible LearnHouse wordmark or broken image.
- Do not enable currently disabled AI features merely to remove dormant LearnHouse strings from unused AI components.

### C3. Make Academy apply operations deployment-safe

The prior Prompt 15 push-triggered deployments failed because a branding script had been copied over the tracked server checkout, making `git pull --ff-only` fail. Prevent recurrence without deleting unknown server work:

- document and enforce that Academy branding/apply scripts run from the checked-out repository after a successful pull; never `scp` over a tracked script in the deployment checkout
- add a read-only server working-tree preflight that reports and aborts on unexpected tracked modifications before pull/deploy
- do not automatically run `git checkout --`, `git reset`, `git clean` or another destructive cleanup in CI
- if the current server checkout is dirty, compare the exact file to the intended commit; only reconcile a known identical/generated artifact safely, otherwise stop and report it

## Work package D — repository hygiene, tests and release

### D1. Generated Python residue

- Verify `scripts/ops/__pycache__/` contains only generated bytecode, remove that generated directory, and add appropriate Python cache patterns such as `__pycache__/` and `*.py[cod]` to `.gitignore`.
- Do not remove source scripts or unrelated untracked work.

### D2. Quality gates

Run:

- full tests
- lint
- production build
- `git diff --check`
- Python syntax checks for changed operations scripts
- shell syntax checks for changed deployment scripts
- focused navigation browser checks and geometry regression
- secret scan of exact intended changes

Review all changes and stage exact paths only. Never use `git add .` or `git add -A`.

### D3. Commit, push and production proof

- Create focused professional commit(s).
- Push `master` without force only after pre-deploy gates pass.
- Monitor the exact GitHub Actions run and tie the successful website deployment to the commit SHA/image/container.
- Apply the Academy branding overlay and Google publishing closeout through their confirmed production paths.
- In fresh production browser sessions, re-run the navbar acceptance matrix, Academy branding checks and authorized-owner Google OAuth flow.
- Keep prior website and Academy rollback references ready. If a regression occurs, roll back the affected system only and prove the restored state.

## Definition of done

Prompt 16 is accepted only when:

1. Desktop primary navigation uses the approved reduced information architecture and remains one stable row at supported desktop widths.
2. Secondary links remain discoverable through logical training/mobile/footer/context placement.
3. No header-caused horizontal overflow, wrapped FAQ, escaped Apply button or layout-shifting dropdown remains.
4. Mobile/tablet navigation is grouped, keyboard accessible and free of duplication/overflow.
5. Google Auth Platform shows `In production` with the existing minimal-scope client unchanged.
6. Authorized-owner Google login still works and invite-only enforcement remains intact.
7. Authenticated Academy navigation contains no visible LearnHouse logo/wordmark or incorrect alt text.
8. Server deployment checkout handling cannot silently overwrite or discard dirty tracked work.
9. Python cache residue is removed/ignored.
10. Tests, lint, build, browser/accessibility gates, CI deployment and exact production release are evidenced.

## Final evidence report

Return:

- decision: `PROMPT 16 ACCEPTED`, `PARTIAL`, or `BLOCKED`
- Prompt 15 closeout matrix
- before/after navigation information architecture
- exact responsive viewport/zoom results and DOM geometry at the previously failing 1536px viewport
- keyboard/accessibility checks
- sanitized before/after screenshot paths
- Google publishing status and OAuth revalidation, with all sensitive values redacted
- exact authenticated Academy component/root cause and branding fix
- server dirty-tree/preflight outcome
- repository tests/build/lint/script/secret-scan results
- commits, branch, GitHub Actions run, deployed SHA/image/container and Academy apply evidence
- rollback references
- remaining P2 risks only
- final `git status --short --branch`

Never include OAuth secrets, tokens, authorization codes, cookies, passwords, full private identifiers or learner information.
