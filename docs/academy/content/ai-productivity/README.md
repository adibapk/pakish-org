# AI Productivity & Automation — text-first pilot package

Website slug: `ai-productivity`
Academy UUID: `course_05275db9-cddf-4a68-825a-01e4e2714066` (private pilot)
Readiness: **Text-first pilot draft — not a complete paid recorded course**
VIDEO: **NOT RECORDED** for all lessons below
Subject-matter review: required before learner release
Editorial gate: SME review of explanations and assessment keys before any cohort assignment

## Alignment with website promise

Four chapters match the public curriculum: Foundations → Prompting & Research → Documents & Communication → Productivity & Light Automation.

---

## Module 1 — Generative AI Foundations

### Lesson 1.1 — Introduction to Generative AI

**Learning objective:** Explain what an LLM does; list three reliable use cases and three failure modes for daily work.

**Prerequisites:** Comfortable using a browser and email; no coding required.

**Concept:** Large language models predict likely next tokens from context. They draft, summarize, and brainstorm well; they invent citations, miss private facts, and can leak sensitive prompts if misused. Productive use means clear goals, short iterations, and human verification.

**Realistic example:** A coordinator pastes “Write an agenda” and gets generic bullets. Adding role, audience, duration, and must-cover topics yields a usable draft that still needs a human fact check on dates.

**Guided practice:** Ask the same question three ways (vague → role+constraints → role+example+checklist). Compare outputs side by side.

**Self-check (learner):** Name two things the model cannot know without you providing them.
**Instructor key:** Private org facts; unverified live prices/schedules; anything not in the prompt or connected tools.

**Exercise deliverable:** One real work task with (a) a bad prompt and (b) an improved prompt with role, audience, format, and constraints.

**Grading rubric:** Task realism 25%; prompt structure 40%; failure-mode note 20%; clarity 15%.
**Common errors:** Treating the first answer as final; pasting client PII; claiming the model “knows” internal policy.

**VIDEO NOT RECORDED — storyboard:** Blank chat → vague prompt → weak answer → improved prompt → checklist output. Shot list: browser chrome, prompt text, scroll of answer, annotation callouts.

### Lesson 1.2 — ChatGPT practical usage

**Learning objective:** Configure custom instructions; run a drafting workflow with revision passes.

**Prerequisites:** Lesson 1.1; a ChatGPT (or approved org) account.

**Concept:** Separate standing guidance (role, tone, do-not-do) from task prompts. Use drafts as scaffolds. Keep confidential data out of consumer chats unless your organization approves the tool.

**Realistic example:** Custom instructions: “You are assisting a Karachi training coordinator. Prefer short bullets. Never invent cohort dates.” Then task: draft a learner follow-up email.

**Guided practice:** Write ≤120 words of custom instructions for your role; draft one email; do two revision passes (clarity, then tone).

**Self-check:** What belongs in custom instructions vs a single task prompt?
**Instructor key:** Standing preferences go in custom instructions; one-off facts and the specific ask go in the task prompt.

**Exercise deliverable:** Custom-instruction paragraph + email draft with both revision notes attached.

**Grading rubric:** Instruction quality 30%; revision evidence 40%; privacy note 20%; professionalism 10%.
**Common errors:** Putting secrets in custom instructions; skipping the second revision pass.

**VIDEO NOT RECORDED**

### Lesson 1.3 — Claude and Gemini workflows

**Learning objective:** Choose tools by strength (long documents, multimodal, ecosystem) and compare outputs for one task.

**Prerequisites:** Access to at least two approved assistants (or instructor-provided demo accounts).

**Concept:** Tools differ in context length, file handling, and workplace integrations. Selection is about fit and verification cost, not brand loyalty.

**Realistic example:** Same research brief: one tool produces a long narrative; another produces a table with sources to verify. The learner scores both and picks a default for brief-writing.

**Guided practice:** Run one research brief in two tools; score accuracy, structure, and actionable next steps (1–5 each).

**Self-check:** Name one reason to prefer a second tool for a long PDF summary.
**Instructor key:** Longer context windows, better file upload handling, or org-approved data policies — answers vary; require a stated reason.

**Exercise deliverable:** Comparison table + recommended default with rationale.
**Module 1 assignment (checklist):** Workspace setup — accounts, custom instructions, one shared prompt template file.
**Rubric:** Completeness 40%, clarity of use-case 40%, privacy note 20%.

**VIDEO NOT RECORDED**

---

## Module 2 — Prompt Engineering & AI Research

### Lesson 2.1 — Prompt engineering

**Learning objective:** Apply role, constraints, examples, and iterative refinement to reusable prompts.

**Prerequisites:** Module 1 complete.

**Concept:** Structure: Goal → Context → Constraints → Format → Examples → Critique instruction. Iteration beats one giant prompt.

**Realistic example:** Support reply prompt that includes tone rules, forbidden promises (no refund guarantees), and a required “next step” line.

**Guided practice:** Build five prompts for your role using that structure; refine one after a failed first run.

**Self-check:** Which section prevents the model from inventing policy?
**Instructor key:** Constraints / “do not invent” / “say you don’t know” instructions.

**Exercise deliverable:** Five structured prompts in a single markdown or doc file.
**Grading rubric:** Structure 40%; realism 30%; iteration note 20%; clarity 10%.
**Common errors:** Missing format; no verification step; copying marketing claims into prompts.

**VIDEO NOT RECORDED**

### Lesson 2.2 — AI research techniques

**Learning objective:** Separate model summary from primary sources; fact-check claims before sharing.

**Prerequisites:** Lesson 2.1.

**Concept:** Models summarize and invent. Treat output as a map to sources you open yourself. Prefer official docs for product features.

**Realistic example:** Model claims a feature exists; learner opens the vendor help page and finds the feature is plan-gated or renamed.

**Guided practice:** Research one tool you use; produce a one-page brief with sources you opened yourself (URLs + date accessed).

**Self-check:** What makes a source primary for a product feature?
**Instructor key:** Official documentation, release notes, or in-product UI — not a random blog paraphrase.

**Graded assignment — Prompt library starter pack:** Deliver 10 reusable prompts with title, use case, prompt body, and verification step.
**Rubric:** Coverage 30%, structure 30%, verification habits 25%, clarity 15%.
**Common errors:** No verification step; fabricated URLs; outdated feature names.

**VIDEO NOT RECORDED**

---

## Module 3 — Documents & Business Communication

### Lesson 3.1 — Structured documents with AI assist

**Learning objective:** Produce a 1–2 page structured brief that keeps your voice and correct facts.

**Prerequisites:** Modules 1–2.

**Concept:** Outline first, generate section drafts, then human-edit for accuracy and tone. Never let the model invent metrics.

**Realistic example:** Internal briefing on adopting an AI note-taker: problem, options, risks, recommendation — with blank fields where data is missing instead of invented numbers.

**Guided practice:** Outline → draft → fact-check pass → final polish.

**Self-check:** Where should unknown numbers appear?
**Instructor key:** Explicit “TBD / confirm with finance” — never invented figures.

**Exercise deliverable:** One 1–2 page brief with tracked edits or a short change log.
**Grading rubric:** Structure 30%; factual discipline 40%; voice 20%; formatting 10%.
**Common errors:** Fake statistics; generic filler sections; no owner named for next steps.

**VIDEO NOT RECORDED**

### Lesson 3.2 — Professional emails with revision passes

**Learning objective:** Write request, follow-up, and decline emails that are clear and respectful.

**Prerequisites:** Lesson 3.1.

**Concept:** Subject line states the ask; body gives context, ask, and deadline; closing names the next step. AI drafts; you own tone and commitments.

**Realistic example:** Soften a blunt “Send the file now” into a professional request with context and a reasonable deadline — without losing urgency.

**Guided practice:** Produce three emails (request, follow-up, decline) with before/after prompts attached.

**Self-check:** What must never be invented in a client email?
**Instructor key:** Fees, deadlines, legal promises, and personal data you were not given.

**Assignment — Communication pack:** Same three emails + brief from 3.1.
**Rubric:** Audience fit 35%, correctness 35%, edit quality 30%.
**Common errors:** Over-apologizing; hidden asks; AI-sounding filler.

**VIDEO NOT RECORDED**

---

## Module 4 — Productivity Tools & Workflow Automation

### Lesson 4.1 — Personal AI-assisted workflow design

**Learning objective:** Design a personal workflow that uses AI for drafting while keeping approvals human.

**Prerequisites:** Modules 1–3.

**Concept:** Prefer checklists and templates before brittle multi-step bots. Log what stays human (approvals, client facts, payments).

**Realistic example:** Intake form → AI draft reply → human approve → send → file in folder. Automation stops before “send.”

**Guided practice:** Map your current weekly task that wastes the most time; mark AI-assist vs human-must.

**Self-check:** Name one irreversible step that must stay human.
**Instructor key:** Payments, enrollment promises, deleting data, outbound mail without review.

**Exercise deliverable:** Workflow diagram or numbered checklist with AI vs human labels.
**Grading rubric:** Clarity 30%; risk awareness 40%; practicality 30%.
**Common errors:** Automating send/pay; no rollback; undocumented exceptions.

**VIDEO NOT RECORDED**

### Lesson 4.2 — Light automation with verification

**Learning objective:** Automate only stable, low-risk steps and document failure handling.

**Prerequisites:** Lesson 4.1.

**Concept:** Light automation means templates, snippets, scheduled reminders, and simple connectors — not unsupervised agents with production credentials.

**Realistic example:** A checklist template that opens when a new lead arrives; AI suggests a reply; human sends.

**Guided practice:** Propose one automation with trigger, action, human gate, and failure note.

**Capstone — Personal productivity system:** Document and demo one end-to-end workflow (intake → draft → review → send/store). Measurable criteria: time estimate before/after; error/verification checklist; privacy note; 5-minute demo script.
**Rubric:** Impact 30%, reliability 30%, verification 20%, presentation 20%.
**Common errors:** Claiming time savings without a baseline; no privacy note; demo of secrets on screen.

**VIDEO NOT RECORDED**

---

## Instructor notes / sources

- Prefer official product docs for ChatGPT, Claude, and Gemini features (verify current UI before teaching).
- Do not copy proprietary help text wholesale; paraphrase and link.
- Assessment keys must be SME-reviewed; AI-drafted keys in this package are provisional.
- Preserve private pilot UUID visibility (`public=false`); do not publish to the public catalogue from this package alone.
