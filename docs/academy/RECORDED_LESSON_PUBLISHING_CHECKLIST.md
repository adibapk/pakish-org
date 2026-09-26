# Recorded lesson publishing checklist

Use before attaching any recording to a LearnHouse activity on Academy.

## Per-lesson checklist

- [ ] Title matches canonical curriculum lesson name
- [ ] Learning objectives stated in activity markdown
- [ ] Duration and recording date recorded
- [ ] Video stored on **approved durable storage** (not ephemeral container disk)
- [ ] File format compatible with LearnHouse (`TYPE_VIDEO` hosted or approved embed)
- [ ] Resolution and audio quality reviewed
- [ ] Language documented (Urdu/English/mixed)
- [ ] Visible learner or private data blurred or removed
- [ ] Obsolete UI/tool references flagged for re-edit
- [ ] Transcript or captions available or scheduled
- [ ] Supplementary resources linked
- [ ] Linked assignment identified
- [ ] Privacy review sign-off (owner)
- [ ] Replacement/version status recorded
- [ ] Checksum or file hash logged in ops inventory

## Storage readiness (Prompt 13)

| Item | Status |
|---|---|
| LearnHouse delivery | `filesystem` on Docker volume |
| S3-compatible / CDN | **Not configured** |
| Pilot sample upload | **Skipped** — no verified durable store |
| Egress/backup implications | Documented in `ROLE_AND_ACCESS_MODEL.md` |

## Publish gate

Do not set `published=true` on course or activities until Prompt 14 owner approval and storage decision are complete.
