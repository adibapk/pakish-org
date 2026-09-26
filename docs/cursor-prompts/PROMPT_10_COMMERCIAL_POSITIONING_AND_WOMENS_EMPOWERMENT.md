# PROMPT NUMBER: 10

## Project

Pakish Institute  
Repository: `C:\Users\pakis\My-Projects\pakish-org`  
Authoritative plan: `C:\Users\pakis\My-Projects\pakish-org\docs\PAKISH_COMMERCIAL_LAUNCH_MASTER_PLAN.md`

## Objective

Reposition the public website as a commercial, career-focused IT and AI institute for all relevant learners, professionals, teams, and businesses. Retire the public name `Fi Sabilillah Initiative`. Create a separate, credible Women’s Empowerment initiative and move need-based fee support into that controlled context.

## Mandatory investigation before any edit

1. Read `AGENTS.md` and the master plan completely.
2. Read the relevant Next.js 16 guides in `node_modules/next/dist/docs/` before changing framework code or metadata conventions.
3. Run `git status --short --branch`, `git log -10 --oneline`, and inspect the exact current diff. Do not touch another agent’s uncommitted files. At planning time, Coolify/infrastructure scripts and docs were uncommitted; recheck rather than assuming the list is current.
4. Inventory all public occurrences, case-insensitively, of `Fi Sabilillah`, `Sabilillah`, `non-profit`, women-only institute claims, charity/donation copy, free/subsidized seat copy, sponsor/donor copy, old three-duration programs, and all metadata/OG/schema/manifest/`llms.txt` equivalents.
5. Inspect the six canonical courses in `lib/courses/data.ts`, the homepage sections, campus data, admission form/schema/storage/notifications, insights, privacy page, sitemap, OG generator/assets, JSON-LD, and navigation/footer.
6. Determine whether current Search Console/Keyword Planner or other authenticated keyword evidence is accessible. Compare the candidate `professional IT and AI courses in Pakistan` with close variants and local/course-specific intent. Never invent search volume or keyword difficulty. If authenticated metrics are unavailable, clearly label the keyword choice as a reasoned SERP/intent hypothesis.
7. Identify any file overlap with uncommitted work. If intended edits overlap, stop before writing and report the exact files and agent work at risk.

## Product and policy decisions to implement

- Pakish Institute is a commercial institute, not a women-only or charity-first organization.
- The six entries in `lib/courses/data.ts` are the canonical commercial courses.
- Women’s Empowerment is a separate initiative at `/womens-empowerment` for gatherings, skills workshops, mentorship, community, career guidance, and limited need-based fee support for eligible women.
- Remove `Fi Sabilillah`/`Fee Sabilillah` from all current public content, metadata, schema, OG text, generated assets, emails, manifests, `llms.txt`, comments that describe current behavior, and forms.
- Do not publish defensive copy saying the institute is “not free.” Communicate value, prices/quotes, paid admission, and the separate fee-support pathway naturally.
- General course cards, homepage, campus pages, and standard admission must not promote sitewide subsidy/free-seat applications.
- General `/admission` is commercial. A fee-support request must originate from the Women’s Empowerment page and retain explicit eligibility, availability, review, and consent language.
- Preserve historical lead readability. An internal legacy enum such as `subsidy` may remain temporarily if migration is unsafe, but its public label/context must be updated and the compatibility decision documented.

## Required implementation

### 1. Homepage and information architecture

- Replace the women-only H1/metadata/default entity description with the validated commercial keyword and inclusive positioning.
- Make `Explore Courses` the primary hero CTA and `Apply for Admission` the secondary CTA.
- Replace the conflicting three-duration catalogue with a concise three-goal chooser that routes to the six canonical courses, or reuse the canonical course data directly. Do not leave two contradictory catalogues.
- Remove the generic donation/cause block. Replace it with a compact Women’s Empowerment initiative preview linking to its page.
- Remove repeated fee-support banners and duplicate course sections.
- Keep only verifiable proof; do not invent learner counts, ratings, outcomes, instructors, partnerships, or income claims.

### 2. Women’s Empowerment page and pathway

- Create `app/womens-empowerment/page.tsx` and any focused reusable components/data needed.
- Cover purpose, who it serves, gatherings, skills, mentorship, participation, and the limited need-based fee-support process.
- Include clear CTAs for gathering interest, exploring courses, and contextual fee-support review.
- Ensure the contextual support flow is technically and semantically distinct from general paid admission.
- Update navigation/footer/internal links without making this initiative the dominant commercial CTA.

### 3. Sitewide content and policy consistency

- Update homepage, course index/details, campus pages, admission, contact, privacy, relevant insight CTAs/mentions, and global defaults.
- Keep women-focused editorial articles women-focused when that is their genuine topic. Remove only the retired initiative name and misleading institute-wide claims; do not flatten legitimate editorial intent.
- Replace or redirect old subsidy query links safely.
- Confirm actual operational donor/sponsor handling before preserving that privacy language. Remove speculative process claims.

### 4. SEO, GEO, and social presentation

- Give each indexable page a unique intent, title, description, H1, canonical, and relevant internal links.
- Add the Women’s Empowerment route to sitemap/SEO route data.
- Update Organization/WebSite/Course/FAQ/Breadcrumb schema with consistent, visible facts only.
- Update `public/llms.txt`, `public/site.webmanifest`, OG configuration/generator, and regenerate every image containing retired or women-only commercial wording.
- Provide a unique 1200x630 OG image for the new page and preserve unique OG coverage for all existing indexable pages.
- Avoid keyword stuffing and duplicate course copy.

### 5. Design and interaction

- Use restrained Next.js/Vercel-inspired hierarchy: neutral surfaces, typography, spacing, precise borders, and a controlled accent.
- Motion must be subtle, purposeful, and reduced-motion safe. No continuous decorative animation or multicolor visual noise.
- Apply Hick’s Law: three goals before six detailed choices; one dominant CTA per section.
- Preserve responsive, keyboard, focus, and contrast quality.

## Likely files to inspect/change

This is a guide, not permission to overwrite blindly:

- `app/page.tsx`
- `app/layout.tsx`
- `app/admission/page.tsx`
- `app/privacy/page.tsx`
- `app/campus/**/page.tsx`
- `app/insights/page.tsx`
- `app/womens-empowerment/page.tsx` (new)
- `components/layout/sections/*`
- `components/admission/admission-form.tsx`
- `components/campus/campus-page-content.tsx`
- `components/insights/insight-article-page.tsx`
- `components/seo/*`
- `lib/seo.ts`
- `lib/home-content.ts`
- `lib/campus-data.ts`
- `lib/curriculum-data.ts` (retire or reconcile carefully)
- `lib/courses/data.ts`
- `lib/og.ts`
- `lib/insights/articles/*`
- `public/llms.txt`
- `public/site.webmanifest`
- `scripts/generate-og.mjs`
- generated `public/og/*` assets

## Verification

1. Run a case-insensitive repository scan proving there are no current public occurrences of the retired name.
2. Run lint, type/build validation, and the OG generator/checks.
3. Verify metadata, canonical, structured data, sitemap, manifest, robots, and every OG asset.
4. Manually test desktop and mobile homepage, courses, both campuses, admission, privacy, Women’s Empowerment, insights, and all primary CTAs.
5. Test keyboard navigation and reduced-motion behavior.
6. Test normal paid admission and the contextual Women’s Empowerment fee-support route without sending real personal data or contacting real donors/students.
7. Inspect browser console/network for runtime errors and broken assets.

## Safety and completion boundary

- Do not edit current Coolify/infrastructure WIP unless this prompt explicitly requires it; it does not.
- Do not deploy, push, force, reset, clean, or broadly stage.
- Do not create real applications, payments, donor contacts, or student notifications.
- Stage no files. Leave the implementation ready for review.
- Stop after this phase. Do not start Prompt 11.

## Required final report

- Keyword evidence and final decision, with limitations.
- Before/after positioning summary.
- Exact files changed.
- Exact public occurrences removed and any internal compatibility value retained.
- Tests run and results.
- Screens/routes manually verified.
- Remaining blockers/unknowns.
- `git status --short` showing unrelated WIP remains untouched.

