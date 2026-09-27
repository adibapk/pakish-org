# Pending after Prompt 21E — Academy admission return link

**Do not apply while Prompt 21E owns Academy production.**

## Intent

On Academy `/signup` (invite-required) and, where appropriate, `/login`, add a clear link:

“New student? Apply for admission” → `https://pakish.org/admission`

## Constraints from 21E

- Use the source-owned branding/customization strategy and **versioned asset fingerprints** established in Prompt 21E.
- Do not mutate bytes behind existing immutable `/_next/static/chunks/*` URLs.
- Preserve invite-only signup; this link must not open public self-registration.

## Suggested source touchpoints (LearnHouse 1.3.6)

- Auth signup invite-required panel copy (source under `/app/web` in the Academy image, applied via `scripts/ops/prompt14-academy-branding.py` after fingerprinting).
- Optional: empty public catalogue / login helper text.

## Acceptance after 21E

1. Fresh private DB backup (mode 600).
2. Overlay apply + fingerprint → new chunk URLs.
3. Hydrated browser proof on `/signup` and `/login` (desktop + 390px).
4. No React #418 / ChunkLoadError.
5. Independent verification that invite-only remains enforced.

## Offline prep status

Website Student Guide and admission copy already explain the no-invite application path. This Academy UI link is the remaining production write.

## Prompt 23 status (2026-09-27)

**BLOCKED — do not apply.** Prompt 21E branch tip `287c930` is merged into `origin/master` (`4a0ec47`), but Prompt 23 did **not** receive independent fresh-profile + previously-visited normal-cache browser acceptance or role-shell proof. Academy production overlay writes remain owned by the 21E acceptance gate. No DB backup, overlay apply, or invitation changes were performed in Prompt 23.
