# Admission data backup

Lead JSON files live under `.data/admissions/` (production: Docker volume `pakish_org_data`).

Payment proof images are stored under `.data/admissions/proofs/<leadId>/` with collision-resistant server-generated filenames.

## Backup

Copy the entire `.data/admissions` directory while the app is idle or accept at-most-one in-flight write:

```bash
tar -czf admissions-backup-$(date -u +%Y%m%dT%H%M%SZ).tar.gz .data/admissions
```

## Restore

Extract the archive into the project root (or mounted volume) preserving permissions. Restart the app if running.
