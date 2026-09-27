# Modern Full Stack Web Development with AI — text-first foundation

Slug: `full-stack-ai-development` · unpublished foundation · VIDEO NOT RECORDED
Readiness: Expanded text draft — not launch-ready; SME review required
Academy UUID: unmapped (do not invent)

## Prerequisites / outcomes

**Prerequisites:** HTML/CSS basics helpful; willingness to use Git and a local editor.
**Outcomes:** Build a small full-stack feature with AI-assisted coding, review diffs, and deploy with basic hygiene.

---

## Module 1 — Web foundations & tooling

### Lesson 1.1 — Repo, branches, and safe commits

**Learning objective:** Create a branch, commit with a clear message, and open a pull request description.

**Concept:** Small commits; never commit secrets; AI patches are drafts until reviewed.
**Exercise:** Initialize or clone a practice repo; make one intentional change; write a PR description.
**Self-check:** Where do `.env` files belong?
**Instructor key:** Local only / secret manager — never in Git.
**Rubric:** Git hygiene 50%; description clarity 30%; no secrets 20%.
**VIDEO NOT RECORDED**

### Lesson 1.2 — Devtools and network basics

**Learning objective:** Use browser DevTools to inspect a failed request status and response body.
**Exercise:** Capture a screenshot of a 404 or 500 from a practice page with notes on cause.
**VIDEO NOT RECORDED**

---

## Module 2 — Frontend UI with modern components

### Lesson 2.1 — Component structure and accessibility

**Learning objective:** Build a small UI component with semantic HTML and keyboard focus.
**Concept:** Labels, buttons vs divs, focus order. AI often misses accessibility — you fix it.
**Exercise:** Form with name + email + submit; verify keyboard path.
**Rubric:** Semantics 40%; keyboard 40%; styling clarity 20%.
**VIDEO NOT RECORDED**

### Lesson 2.2 — State and loading UX

**Learning objective:** Show loading and error states for a fetch without lying to the user.
**Exercise:** Mock slow/failing API; display honest status text.
**Common errors:** Empty screens; fake “success” on error.
**VIDEO NOT RECORDED**

---

## Module 3 — Backend / API basics

### Lesson 3.1 — Routes, validation, and status codes

**Learning objective:** Implement a tiny validated POST endpoint that returns correct status codes.
**Concept:** Validate input; never trust client JSON; log safely without secrets.
**Exercise:** Endpoint accepts `{ name }` and rejects empty names with 400.
**Rubric:** Validation 40%; status codes 40%; clarity 20%.
**VIDEO NOT RECORDED**

### Lesson 3.2 — Auth boundaries (conceptual)

**Learning objective:** Explain the difference between public and protected routes without implementing production auth from scratch.
**Exercise:** One-page threat note: what happens if an IDOR exists on “my leads.”
**VIDEO NOT RECORDED**

---

## Module 4 — AI-assisted coding & deployment hygiene

### Lesson 4.1 — Prompting coding assistants safely

**Learning objective:** Use an AI coding assistant without pasting secrets; review diffs before merge.
**Teach:** Prompt with file context and acceptance criteria; treat AI patches as draft.
**Exercise:** Generate a small UI component with AI, then manually fix accessibility issues.
**Formative:** List three secrets that must never enter a prompt.
**VIDEO NOT RECORDED**

### Lesson 4.2 — Deploy checklist

**Learning objective:** Deploy a practice app with env vars set outside the repo and a smoke test.
**Exercise:** Written deploy checklist + smoke URL proof (local or staging).
**Capstone:** Ship a small full-stack feature with README, tests note, and threat checklist.
**Rubric:** Feature works 30%; README 20%; threat checklist 30%; AI-assist honesty 20%.
**VIDEO NOT RECORDED**

## Gates

- SME review; no invented stack certifications.
- Mark all demos VIDEO NOT RECORDED until filmed.
