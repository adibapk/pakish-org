#!/usr/bin/env python3
"""Finish Prompt 13 QA on existing pilot without new API tokens."""
from __future__ import annotations

import importlib.util
import json
import sys
from pathlib import Path

SPEC = importlib.util.spec_from_file_location("pilot", "/tmp/prompt13-academy-pilot.py")
pilot = importlib.util.module_from_spec(SPEC)
sys.modules["pilot"] = pilot
SPEC.loader.exec_module(pilot)

EVIDENCE = Path("/home/opc/.learnhouse/pakish/prompt13-pilot-evidence.json")
COURSE_UUID = "course_9e3c0b9c-fde6-4ac8-84b6-fa4305298d4a"
ASSIGNMENT_UUID = "assignment_402d498b-f268-4e2a-a378-a0633bef1e27"
INSTRUCTOR_ID = 9
STUDENT_ID = 10


def login_via_magic(admin: pilot.Client, user_id: int) -> pilot.Client:
    issued = admin.request(
        "POST",
        f"{pilot.API}/admin/default/auth/magic-link",
        json_body={"user_id": user_id, "ttl_seconds": 300},
    )
    token = issued["token"]
    client = pilot.Client()
    client.request("GET", f"{pilot.API}/admin/default/auth/magic/consume?token={token}", expect=(200, 302))
    return client


def main() -> int:
    env = pilot.load_env(pilot.ENV_PATH)
    admin = pilot.Client()
    admin.login(env["LEARNHOUSE_INITIAL_ADMIN_EMAIL"], env["LEARNHOUSE_INITIAL_ADMIN_PASSWORD"])

    admin.request(
        "PUT",
        f"{pilot.API}/courses/{COURSE_UUID}/contributors/{INSTRUCTOR_ID}"
        f"?authorship=CONTRIBUTOR&authorship_status=ACTIVE",
    )

    evidence = json.loads(EVIDENCE.read_text()) if EVIDENCE.exists() else {}
    tasks = admin.request("GET", f"{pilot.API}/assignments/{ASSIGNMENT_UUID}/tasks")
    task_uuid = tasks[0]["assignment_task_uuid"]
    evidence["assignment_task_uuid"] = task_uuid

    anon = pilot.Client()
    anon.request("GET", f"{pilot.API}/courses/{COURSE_UUID}", expect=(401, 403, 404))
    evidence["qa_anonymous_course_blocked"] = True

    student = login_via_magic(admin, STUDENT_ID)
    student_course = student.request("GET", f"{pilot.API}/courses/{COURSE_UUID}")
    evidence["qa_student_can_read_course"] = student_course.get("course_uuid") == COURSE_UUID
    student.request(
        "PUT",
        f"{pilot.API}/assignments/{ASSIGNMENT_UUID}/tasks/{task_uuid}/submissions",
        json_body={
            "task_submission": {"answer": "Pilot productivity automation use case for weekly reports."},
            "assignment_type": "SHORT_ANSWER",
        },
    )
    student.request("POST", f"{pilot.API}/assignments/{ASSIGNMENT_UUID}/submissions")
    evidence["qa_student_submitted_assignment"] = True

    instructor = login_via_magic(admin, INSTRUCTOR_ID)
    instructor_course = instructor.request("GET", f"{pilot.API}/courses/{COURSE_UUID}")
    evidence["qa_instructor_can_read_course"] = instructor_course.get("course_uuid") == COURSE_UUID
    org_tokens = instructor.request(
        "GET",
        f"{pilot.API}/orgs/{pilot.ORG_ID}/api-tokens",
        expect=(403, 401),
    )
    evidence["qa_instructor_api_tokens_denied"] = isinstance(org_tokens, dict) and bool(
        org_tokens.get("detail")
    )
    submissions = instructor.request("GET", f"{pilot.API}/assignments/{ASSIGNMENT_UUID}/submissions")
    evidence["qa_instructor_sees_submissions"] = isinstance(submissions, list) and len(submissions) >= 1
    grade = instructor.request(
        "POST",
        f"{pilot.API}/assignments/{ASSIGNMENT_UUID}/submissions/{STUDENT_ID}/grade",
        json_body={"overall_feedback": "Prompt 13 pilot — satisfactory checklist response."},
    )
    evidence["qa_instructor_graded_submission"] = grade is not None

    student2 = login_via_magic(admin, STUDENT_ID)
    me_sub = student2.request("GET", f"{pilot.API}/assignments/{ASSIGNMENT_UUID}/submissions/me")
    evidence["qa_student_received_feedback"] = (
        me_sub.get("submission_status") == "GRADED"
        or bool(me_sub.get("overall_feedback"))
    )
    progress = admin.request(
        "GET",
        f"{pilot.API}/admin/default/progress/{STUDENT_ID}/{COURSE_UUID}",
    )
    evidence["qa_student_progress"] = progress

    evidence["qa_finished_via"] = "prompt13-finish-qa.py"
    evidence["pilot_course_uuid"] = COURSE_UUID
    evidence["assignment_uuid"] = ASSIGNMENT_UUID
    EVIDENCE.write_text(json.dumps(evidence, indent=2))
    pilot.EVIDENCE_PATH.write_text(json.dumps(evidence, indent=2))
    print(json.dumps(evidence, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
