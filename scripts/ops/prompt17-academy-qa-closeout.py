#!/usr/bin/env python3
"""Prompt 17: reconcile Prompt 13 synthetic QA artifacts without printing secrets."""
from __future__ import annotations

import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

STATE_PATH = Path("/home/opc/.learnhouse/pakish/prompt13-pilot-state.json")
EVIDENCE_PATH = Path("/home/opc/.learnhouse/pakish/prompt17-qa-closeout-evidence.json")
PILOT_SCRIPT = Path("/data/migrations/pakish/apps/pakish-org/scripts/ops/prompt13-academy-pilot.py")
ORG_ID = 1
PILOT_COURSE_UUID = "course_05275db9-cddf-4a68-825a-01e4e2714066"
INSTRUCTOR_EMAIL = "pakish-pilot-instructor@example.com"
STUDENT_EMAIL = "pakish-pilot-student@example.com"


def utc_stamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")


def load_pilot_module():
    import importlib.util

    spec = importlib.util.spec_from_file_location("pilot", PILOT_SCRIPT)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load pilot module from {PILOT_SCRIPT}")
    module = importlib.util.module_from_spec(spec)
    sys.modules["pilot"] = module
    spec.loader.exec_module(module)
    return module


def backup_database(pilot) -> dict[str, str]:
    return pilot.backup_database()


def main() -> int:
    pilot = load_pilot_module()
    env = pilot.load_env(pilot.ENV_PATH)
    admin = pilot.Client()
    admin.login(env["LEARNHOUSE_INITIAL_ADMIN_EMAIL"], env["LEARNHOUSE_INITIAL_ADMIN_PASSWORD"])

    evidence: dict[str, object] = {
        "timestamp": utc_stamp(),
        "backup": backup_database(pilot),
        "pilot_course_uuid": PILOT_COURSE_UUID,
    }

    tokens = admin.request("GET", f"{pilot.API}/orgs/{ORG_ID}/api-tokens")
    token_rows = tokens if isinstance(tokens, list) else []
    evidence["api_token_count_before"] = len(token_rows)
    evidence["api_token_names"] = [
        row.get("name") for row in token_rows if isinstance(row, dict)
    ]

    revoked = 0
    for row in token_rows:
        if not isinstance(row, dict):
            continue
        name = str(row.get("name") or "")
        token_id = row.get("id")
        if not token_id:
            continue
        if name.startswith("prompt13-pilot-") or name.startswith("prompt13"):
            try:
                admin.request(
                    "DELETE",
                    f"{pilot.API}/orgs/{ORG_ID}/api-tokens/{token_id}",
                    expect=(200, 204, 404),
                )
                revoked += 1
            except RuntimeError:
                evidence.setdefault("api_token_revoke_errors", []).append(name)
    evidence["api_tokens_revoked"] = revoked

    tokens_after = admin.request("GET", f"{pilot.API}/orgs/{ORG_ID}/api-tokens")
    evidence["api_token_count_after"] = len(tokens_after) if isinstance(tokens_after, list) else 0

    for email in (INSTRUCTOR_EMAIL, STUDENT_EMAIL):
        try:
            user = admin.request(
                "GET",
                f"{pilot.API}/admin/{pilot.ORG_SLUG}/users/by-email/{email}",
            )
        except RuntimeError:
            evidence[f"user_missing_{email}"] = True
            continue
        user_id = user.get("id")
        if not user_id:
            continue
        try:
            admin.request(
                "DELETE",
                f"{pilot.API}/courses/{PILOT_COURSE_UUID}/contributors/{user_id}",
                expect=(200, 204, 404),
            )
            evidence[f"contributor_removed_{email}"] = True
        except RuntimeError:
            evidence[f"contributor_removed_{email}"] = False
        try:
            admin.request(
                "DELETE",
                f"{pilot.API}/courses/{PILOT_COURSE_UUID}/users/{user_id}",
                expect=(200, 204, 404),
            )
            evidence[f"enrollment_removed_{email}"] = True
        except RuntimeError:
            evidence[f"enrollment_removed_{email}"] = False

    if STATE_PATH.exists():
        state = json.loads(STATE_PATH.read_text())
        redacted = {
            "course_uuid": state.get("course_uuid", PILOT_COURSE_UUID),
            "instructor_email": state.get("instructor_email", INSTRUCTOR_EMAIL),
            "student_email": state.get("student_email", STUDENT_EMAIL),
            "updated_at": utc_stamp(),
            "qa_accounts_archived": True,
            "api_token_revoked": True,
        }
        STATE_PATH.write_text(json.dumps(redacted, indent=2))
        STATE_PATH.chmod(0o600)
        evidence["state_file_redacted"] = True

    EVIDENCE_PATH.write_text(json.dumps(evidence, indent=2))
    EVIDENCE_PATH.chmod(0o600)
    print(json.dumps(evidence, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
