# Cloud, Servers & DevOps Fundamentals — text-first foundation

Slug: `cloud-devops` · unpublished foundation · VIDEO NOT RECORDED
Readiness: Expanded text draft — not launch-ready; SME review required
Academy UUID: unmapped (do not invent)

## Prerequisites / outcomes

**Prerequisites:** Comfortable with a terminal; willingness to use a practice VPS (instructor-provided or learner-owned).
**Outcomes:** Secure a Linux VPS baseline, publish a static/site app with DNS/SSL, and document a deploy rollback.

---

## Module 1 — Linux & SSH foundations

### Lesson 1.1 — Keys, users, and sudo

**Learning objective:** Create an SSH key pair, disable password login on a practice host, and use a non-root sudo user.
**Concept:** Keys beat passwords; never share private keys in chat or Git.
**Exercise:** Connect notes + `authorized_keys` checklist (no private key material in submissions).
**Rubric:** Key hygiene 50%; least privilege 30%; clarity 20%.
**VIDEO NOT RECORDED**

### Lesson 1.2 — Packages and updates

**Learning objective:** Apply updates and record what changed.
**Exercise:** Update log with date and reboot decision.
**VIDEO NOT RECORDED**

---

## Module 2 — Web stack & reverse proxy

### Lesson 2.1 — Nginx (or Caddy) serving a static site

**Learning objective:** Serve an `index.html` behind a reverse proxy on a practice domain or hosts-file name.
**Exercise:** Config snippet + curl status proof.
**VIDEO NOT RECORDED**

### Lesson 2.2 — Process managers

**Learning objective:** Run a simple Node or static preview under systemd or a documented process manager.
**Exercise:** Unit/service notes + restart test.
**VIDEO NOT RECORDED**

---

## Module 3 — DNS, TLS, and email pitfalls

### Lesson 3.1 — DNS records that matter

**Learning objective:** Explain A/AAAA/CNAME/MX at a practical level and diagnose a wrong A record.
**Exercise:** DNS worksheet for a sample domain (no production changes required).
**VIDEO NOT RECORDED**

### Lesson 3.2 — TLS certificates

**Learning objective:** Obtain a practice TLS certificate and verify HTTPS.
**Exercise:** Before/after curl or browser evidence; note renewal.
**Common errors:** Forcing HTTPS before DNS propagates; leaking admin panels publicly.
**VIDEO NOT RECORDED**

---

## Module 4 — Deploy, observe, rollback

### Lesson 4.1 — Deploy runbook

**Learning objective:** Write a deploy runbook with smoke checks.
**Exercise:** Runbook for the practice site.
**VIDEO NOT RECORDED**

### Lesson 4.2 — Rollback drill

**Learning objective:** Practice one rollback and record time-to-recover.
**Capstone:** Hardened practice VPS checklist + deploy/rollback demo script (VIDEO NOT RECORDED until filmed).
**Rubric:** Security baseline 35%; DNS/TLS correctness 25%; runbook 25%; honesty 15%.
**VIDEO NOT RECORDED**

## Safety

No production Pakish secrets in learner exercises. Prefer disposable practice hosts.
