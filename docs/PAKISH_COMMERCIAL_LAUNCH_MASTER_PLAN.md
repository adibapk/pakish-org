# Pakish Institute commercial launch master plan

Status: approved planning baseline; implementation has not started from this document  
Date: 2026-09-26  
Launch target: 1-3 days, subject to the gates below

## 1. Product decision

Pakish Institute is a commercial, career-focused technology training institute for students, professionals, freelancers, teams, and businesses. It is not a women-only institute, and its main website must not look like a charity or a universal free-training program.

Women’s Empowerment is a distinct Pakish Institute initiative. It may offer community gatherings, career guidance, digital-skills workshops, mentorship, professional networks, and limited need-based fee support for eligible women. Fee support is one controlled component of this initiative; it is not the default offer across the commercial course catalogue.

The public name `Fi Sabilillah Initiative` must be retired everywhere. Historical lead records may retain old internal enum values where changing them would create migration risk, but no current public UI, metadata, schema, email, OG image, manifest, or AI-readable file may expose that name.

## 2. Brand and messaging architecture

### Commercial master brand

- Brand: Pakish Institute, with `Pakish.ORG` retained as the domain and legal/digital identity where useful.
- Promise: practical, instructor-led IT and AI education built around real projects and current workplace tools.
- Audiences: students, career switchers, professionals, freelancers, founders, teams, and businesses.
- Delivery: live online, campus/cohort when scheduled, one-to-one, group, office/team, and customized workshops.
- Primary proof: Pakish Group experience since 1999, explicit curricula, named tools, projects, instructor credibility, clear fees, delivery formats, and verifiable learner outcomes when available.
- Primary CTA: `Explore Courses`.
- Secondary CTA: `Apply for Admission` or `Request Team Training`, depending on page intent.

### Women’s Empowerment initiative

- Canonical page: `/womens-empowerment`.
- Purpose: help women gain confidence, practical skills, professional networks, and pathways to digital work.
- Activities: gatherings, orientation sessions, skills workshops, mentorship, peer community, and career guidance.
- Fee support: limited, need-based, eligibility-reviewed, dependent on available seats/resources, and requested only through this initiative’s pathway.
- CTA hierarchy: `Join an Upcoming Gathering`, `Explore Skills Programs`, then `Request Fee-Support Review`.
- This page may be promoted from an Initiatives navigation item, the footer, relevant editorial articles, and selected campus/community sections. It must not replace the commercial course funnel.

### Language rules

Use:

- professional training
- practical, project-based learning
- live instructor-led classes
- need-based fee support
- subject to eligibility, available seats, and review
- women’s digital and economic empowerment

Avoid:

- Fi Sabilillah / Fee Sabilillah
- non-profit initiative
- free courses for everyone
- donate/sponsor as a primary sitewide CTA
- women-only wording for the institute as a whole
- guaranteed jobs, income, clients, certificates, or outcomes
- defensive copy such as “we are not a free organization”

## 3. Offer and information architecture

### Public marketing website: `pakish.org`

Owns SEO, brand positioning, public course discovery, course fees/quotes, admissions, payment instructions/proof, campuses, insights, privacy, and the Women’s Empowerment initiative.

Recommended top-level navigation:

1. Courses
2. Training Options
3. Campuses
4. Women’s Empowerment
5. Insights
6. Academy Login

Primary header CTA: `Apply for Admission`.

### Learning application: `academy.pakish.org`

Owns authentication, enrolled course access, lessons, recordings, assignments, progress, instructor operations, certificates, and future AI-tutor data. `pakish.org/academy` should become a permanent entry/redirect to the native subdomain after the subdomain is verified.

### Course-choice simplification

Keep all six commercial products, but group them into three decision-friendly goals:

1. AI & Productivity
2. Web, WordPress & Cloud
3. Freelancing & Digital Business

The homepage should preview these goals and route visitors to `/courses`; it should not maintain a second, conflicting three-duration curriculum catalogue.

## 4. SEO and GEO strategy

### Homepage keyword hypothesis

Primary candidate: `professional IT and AI courses in Pakistan`

Supporting intent:

- practical AI courses in Pakistan
- online IT courses in Pakistan
- professional technology training Pakistan
- AI training for professionals and businesses
- web development and freelancing courses Pakistan

This is a strategic hypothesis, not a volume claim. Before implementation, Prompt 10 must compare current Search Console data (if accessible), Keyword Planner or another authenticated source (if accessible), live SERPs, query intent, and local competitors. If authenticated volume/competition data is unavailable, the implementer must label the result as a reasoned intent/competition decision and must not invent search volume.

Provisional homepage search presentation:

- Meta title: `Professional IT & AI Courses in Pakistan | Pakish Institute`
- Meta description: `Build practical skills in AI, web development, WordPress, cloud and freelancing through live online, campus and team training at Pakish Institute.`
- H1: `Professional IT & AI Courses in Pakistan`

Women’s Empowerment page candidate:

- Primary topic: `women empowerment through digital skills in Pakistan`
- Meta title: `Women’s Empowerment Through Digital Skills | Pakish Institute`
- H1: `Women’s Empowerment Through Digital Skills`

### Page intent map

| Page | Commercial/initiative role | Search intent |
| --- | --- | --- |
| `/` | Commercial institute overview | Professional IT and AI courses in Pakistan |
| `/courses` | Complete catalogue | IT, AI and digital skills courses |
| `/courses/[slug]` | Individual conversion pages | Exact course + Pakistan/online intent |
| `/campus/gulshan-e-iqbal` | Local commercial landing page | IT/AI courses in Gulshan-e-Iqbal/Karachi |
| `/campus/lodhran` | Local commercial landing page | IT/AI courses in Lodhran/Dunyapur |
| `/admission` | Paid enrollment | Course admission and counseling |
| `/payment-methods` | Transaction support | Pakish Institute fee payment methods |
| `/womens-empowerment` | Separate social-impact initiative | Women empowerment through digital skills |
| `/insights` | Authority and topical discovery | Practical AI, careers, web, cloud, freelancing |
| `academy.pakish.org` | Authenticated learning | No duplicate public catalogue pages |

### GEO requirements

- Make the entity relationship explicit: Pakish Institute is backed by Pakish Group, established in 1999.
- Use crawlable answer-first HTML, consistent facts, verifiable author/instructor profiles, and route-specific schema.
- Keep course catalogue facts in one typed source and reuse them in visible pages and structured data.
- Use unique 1200x630 OG images for every indexable page; regenerate any image containing retired language.
- Update `llms.txt`, manifest, metadata defaults, JSON-LD, sitemap, canonicals, and internal links together.
- Retain women-focused insights where the article genuinely serves that topic. Remove retired program-name promotion and route relevant calls to action to `/womens-empowerment`.

## 5. Content and conversion design

### Homepage structure

1. Commercial hero with a single clear promise and two CTAs.
2. Trust strip: since 1999, project-based, live instruction, multiple delivery formats.
3. Three goal-based pathways leading to the six-course catalogue.
4. Featured commercial courses with transparent starting price or `custom quote`.
5. Training options for individuals, cohorts, and organizations.
6. How enrollment works: choose, counsel/quote, pay, receive Academy access.
7. Evidence: real instructor profiles, projects, facilities, and verified outcomes only.
8. Compact Women’s Empowerment initiative card linking to its dedicated page.
9. Focused FAQs and final admission CTA.

Remove duplicate course grids, generic donation appeals, unverified testimonials, broad subsidy banners, and the old three-duration catalogue if it conflicts with the six canonical courses.

### Behavioral-science rules

- Apply Hick’s Law: show three goals before six individual courses.
- One dominant CTA per section.
- Put price/quote expectations before the application click.
- Use progressive disclosure for curriculum and FAQs.
- Replace vague claims with concrete proof.
- Use loss aversion carefully and truthfully (for example, real cohort deadlines only).
- Never use fake scarcity, fake counters, invented reviews, or unsupported earnings claims.

### Visual direction

- Modern Next.js/Vercel-inspired restraint: strong typography, generous spacing, neutral surfaces, precise borders, and one controlled accent palette.
- Subtle motion only: 150-250 ms hover/fade/translate transitions, no continuous decorative motion, and full `prefers-reduced-motion` support.
- Avoid multicolor gradients, excessive glow, autoplay carousels, and animation that competes with course decisions.
- Mobile-first navigation, readable line lengths, visible focus, keyboard operation, and WCAG-aware contrast.

## 6. Admission and fee-support policy

- General `/admission` is a commercial course admission/counseling flow.
- General course cards and campus pages must not offer a sitewide subsidy toggle.
- Women requesting support enter through `/womens-empowerment` and a dedicated contextual pathway.
- Public terminology is `need-based fee support`; the old `subsidy` database enum may remain temporarily for backward compatibility, provided UI and notifications carry the new context.
- Eligibility, review, consent, seat/resource availability, and no-guarantee language must be clear.
- Donor/sponsor data sharing, if still operational, requires explicit separate consent and accurate privacy copy. If the business no longer uses this process, remove it rather than preserving speculative language.
- Existing historical leads must remain readable after schema/content changes.

## 7. Academy, courses, teachers, and delivery operations

### Student lifecycle

Visitor -> course selection -> counseling/quote -> admission -> payment verification -> student account -> course enrollment -> welcome/access instructions -> live/recorded learning -> assignments -> progress -> completion -> certificate.

### Course source of truth

- Public marketing facts and stable IDs/slugs: main repo typed course catalogue.
- Learning modules, lessons, recordings, assignments, and progress: Academy.
- A mapping table must connect website course ID/slug to Academy course ID without duplicating long-form SEO copy in the Academy.

### Teacher access

Use least privilege:

- Platform administrator: infrastructure and organization settings.
- Academic administrator: courses, cohorts, enrollments, schedules, certificates.
- Instructor: assigned courses/cohorts only; lessons, resources, assignments, feedback, and live-session links.
- Teaching assistant: assigned learner support and grading, without platform settings or billing access.
- Student: enrolled content only.

No shared admin accounts. Require unique accounts, strong passwords, recovery ownership, and documented offboarding.

### Live classes

- Each cohort has timezone, start/end dates, weekly schedule, instructor, Meet/Zoom link, attendance owner, and communication channel.
- The Academy lesson or event contains the joining link and replay/resource location.
- A backup host and cancellation/reschedule procedure must exist before the first session.

### Recorded courses

- Inventory each recording by course, module, lesson, duration, language, resolution, owner, and last reviewed date.
- Do not upload raw recordings before checking audio, privacy, obsolete UI/tool versions, and learner data.
- Standardize title cards, captions/transcripts, lesson summaries, resources, assignments, and version labels.
- Store video in suitable object/video storage; do not treat the application container filesystem as permanent media storage.
- Publish one pilot course first, validate permissions and playback, then repeat.

## 8. Phases and numbered implementation prompts

### Phase 0 - coordination and freeze (inside every prompt)

- Inspect `git status`, recent commits, current branch, active services, and uncommitted work before editing.
- Do not overwrite other-agent changes. Current 2026-09-26 snapshot includes uncommitted Coolify/infrastructure files; this may drift and must be rechecked.
- Use exact-path staging only. No broad add, reset, clean, rebase, force push, or deletion.
- Each prompt ends with evidence and stops. It does not silently start the next prompt.

### Phase 1 - Prompt 10: commercial positioning and Women’s Empowerment

Implement the new messaging hierarchy, keyword decision, homepage/course/campus/admission copy, dedicated Women’s Empowerment page, metadata/schema/OG/AI-readable updates, and restrained conversion design.

Gate: zero public occurrences of the retired name; no institute-wide women-only or charity identity; commercial course flow is clear; women’s initiative remains discoverable and accurate.

### Phase 2 - Prompt 11: native Academy architecture and hardening

Move Academy to `academy.pakish.org`, replace fragile path-prefix behavior, close inappropriate public signup, disable unused modules, remove disposable course/indexing, verify cookies/redirects/TLS, backups, and rollback.

Gate: fresh-browser login and course navigation work directly on the subdomain; no root-relative path breakage; main-site Academy entry works.

### Phase 3 - Prompt 12: admission, payment, and enrollment operations

Unify the six-course selection, paid admission, payment verification, lifecycle states, Academy account/enrollment handoff, welcome email, audit trail, and privacy handling.

Gate: one controlled test lead can move through the complete non-financial test path without a real payment or real student notification.

### Phase 4 - Prompt 13: Academy course, teacher, live, and recorded-content setup

Create the six-course mapping, roles, one pilot course/cohort, lesson templates, live-class process, recorded-content inventory/import process, assignments, progress, and certificate rules.

Gate: a test instructor and test student can complete the pilot learning loop with correct permissions.

### Phase 5 - Prompt 14: full launch QA, commit, push, deploy, and production proof

Run code, security, SEO, accessibility, responsive, conversion, Academy, backup, and rollback checks. Review the exact diff; commit and push only scoped work; verify deployed SHA and production behavior in a fresh browser.

Gate: all P0/P1 launch items pass, or the release stops with explicit blockers. A local build, HTTP 200, or commit alone is not deployment proof.

## 9. Launch priority

Must finish before launch:

- Commercial repositioning and retired-name removal.
- Dedicated Women’s Empowerment page/pathway.
- Canonical six-course catalogue and clear fees/quotes.
- Academy native subdomain, secure access, and one pilot course.
- Teacher/student least-privilege accounts.
- Admission/payment-to-enrollment operating procedure.
- Privacy accuracy, backups, rollback, builds/tests, and fresh-browser proof.

Can follow after launch:

- SSO/central Pakish account.
- AI tutor production rollout.
- Full payment automation.
- Advanced certificates and analytics.
- Remaining recorded-course conversion after the pilot template is proven.

## 10. Definition of done

- The homepage clearly reads as a commercial technology institute for all relevant learner and business audiences.
- `Fi Sabilillah` has zero public/code-content occurrences except an explicitly documented historical migration note, if unavoidable.
- Women’s Empowerment has one canonical page and controlled fee-support pathway.
- Each indexable page has one clear intent, unique title/description/H1/canonical, valid structured data, and an appropriate unique OG image.
- Course options, fees/quotes, delivery modes, admission, payment, and Academy access form one coherent journey.
- Academy access is secure and native to its subdomain; disposable/test public content is removed or noindexed.
- Instructor/student roles are verified with test accounts.
- Lint, type/build, dependency/security review, link/metadata checks, mobile/desktop/reduced-motion checks, and critical flow tests pass.
- Exact commits and deployed versions are recorded; rollback is ready; no unrelated work is included.

