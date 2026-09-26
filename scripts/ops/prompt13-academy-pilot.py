#!/usr/bin/env python3
"""
Prompt 13 — private pilot course provisioning for Pakish LearnHouse Academy.
Runs on pakish-sg with credentials from /home/opc/.learnhouse/pakish/.env.
Never prints secrets. Writes evidence to prompt13-pilot-evidence.json (redacted).
"""
from __future__ import annotations

import hashlib
import json
import os
import secrets
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from http.cookiejar import CookieJar
from pathlib import Path
from typing import Any

BASE = os.environ.get("PROMPT13_ACADEMY_BASE", "https://academy.pakish.org")
API = f"{BASE.rstrip('/')}/api/v1"
ORG_ID = 1
ORG_SLUG = "default"
ENV_PATH = Path(os.environ.get("PROMPT13_ENV", "/home/opc/.learnhouse/pakish/.env"))
STATE_PATH = Path(
    os.environ.get(
        "PROMPT13_STATE",
        "/home/opc/.learnhouse/pakish/prompt13-pilot-state.json",
    )
)
EVIDENCE_PATH = Path(
    os.environ.get(
        "PROMPT13_EVIDENCE",
        "/home/opc/.learnhouse/pakish/prompt13-pilot-evidence.json",
    )
)
BACKUP_DIR = Path("/home/opc/.learnhouse/pakish/backups")

PILOT_SLUG = "ai-productivity"
# LearnHouse 1.3.6 rejects @example.invalid (Pydantic EmailStr); use RFC 2606 example.com.
INSTRUCTOR_EMAIL = "pakish-pilot-instructor@example.com"
STUDENT_EMAIL = "pakish-pilot-student@example.com"


def utc_stamp() -> str:
    return datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")


def synthetic_password() -> str:
    """Meet LearnHouse complexity: upper, lower, digit, special, 8+ chars."""
    return f"Pilot13!{secrets.token_hex(4)}"


def load_env(path: Path) -> dict[str, str]:
    out: dict[str, str] = {}
    if not path.exists():
        raise FileNotFoundError(f"Missing env file: {path}")
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        out[k.strip()] = v.strip().strip('"').strip("'")
    return out


class Client:
    def __init__(self) -> None:
        self.jar = CookieJar()
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.jar))
        self.api_token: str | None = None

    def request(
        self,
        method: str,
        url: str,
        *,
        data: dict[str, Any] | None = None,
        json_body: Any | None = None,
        multipart: dict[str, str] | None = None,
        bearer: str | None = None,
        expect: int | tuple[int, ...] = 200,
    ) -> Any:
        headers: dict[str, str] = {}
        body: bytes | None = None
        if bearer:
            headers["Authorization"] = f"Bearer {bearer}"
        if json_body is not None:
            body = json.dumps(json_body).encode()
            headers["Content-Type"] = "application/json"
        elif multipart is not None:
            body = urllib.parse.urlencode(multipart).encode()
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        elif data is not None:
            body = urllib.parse.urlencode(data).encode()
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        req = urllib.request.Request(url, data=body, method=method, headers=headers)
        try:
            with self.opener.open(req, timeout=120) as resp:
                raw = resp.read().decode()
                code = resp.getcode()
        except urllib.error.HTTPError as e:
            raw = e.read().decode()
            code = e.code
            if code not in (expect if isinstance(expect, tuple) else (expect,)):
                raise RuntimeError(f"{method} {url} -> {code}: {raw[:500]}") from e
            if not raw:
                return None
            try:
                return json.loads(raw)
            except json.JSONDecodeError:
                return raw
        if code not in (expect if isinstance(expect, tuple) else (expect,)):
            raise RuntimeError(f"{method} {url} -> {code}: {raw[:500]}")
        if not raw:
            return None
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            return raw

    def login(self, email: str, password: str) -> dict[str, Any]:
        return self.request(
            "POST",
            f"{API}/auth/login",
            data={"username": email, "password": password},
        )

    def logout(self) -> None:
        try:
            self.request("POST", f"{API}/auth/logout", expect=(200, 204, 401, 405))
        except RuntimeError:
            pass
        self.jar = CookieJar()
        self.opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(self.jar))


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def cleanup_prior_pilot(client: Client, token: str) -> None:
    """Remove prior Prompt 13 pilot artifacts for idempotent re-runs."""
    # Admin API remove_user only drops org membership; delete accounts so passwords reset.
    subprocess.run(
        [
            "docker",
            "exec",
            "learnhouse-db-d1110885",
            "psql",
            "-U",
            "learnhouse",
            "-d",
            "learnhouse",
            "-c",
            (
                "DELETE FROM \"user\" WHERE email IN ("
                f"'{INSTRUCTOR_EMAIL}', '{STUDENT_EMAIL}'"
                ");"
            ),
        ],
        check=False,
        capture_output=True,
        text=True,
    )

    proc = subprocess.run(
        [
            "docker",
            "exec",
            "learnhouse-db-d1110885",
            "psql",
            "-U",
            "learnhouse",
            "-d",
            "learnhouse",
            "-tA",
            "-c",
            "SELECT course_uuid FROM course WHERE name = 'AI Productivity & Automation';",
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    for line in proc.stdout.splitlines():
        course_uuid = line.strip()
        if course_uuid:
            try:
                client.request(
                    "DELETE",
                    f"{API}/courses/{course_uuid}",
                    expect=(200, 204, 404),
                )
            except RuntimeError:
                pass


def backup_database() -> dict[str, str]:
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    stamp = utc_stamp()
    out = BACKUP_DIR / f"learnhouse-db-prompt13-{stamp}.dump"
    cmd = [
        "docker",
        "exec",
        "learnhouse-db-d1110885",
        "pg_dump",
        "-U",
        "learnhouse",
        "-Fc",
        "learnhouse",
    ]
    with out.open("wb") as f:
        subprocess.run(cmd, check=True, stdout=f)
    return {
        "path": str(out),
        "size_bytes": str(out.stat().st_size),
        "sha256": sha256_file(out),
        "rollback": f"pg_restore -U learnhouse -d learnhouse --clean --if-exists {out.name}",
    }


def load_or_create_api_token(client: Client) -> str:
    if STATE_PATH.exists():
        try:
            prior = json.loads(STATE_PATH.read_text())
            existing = prior.get("api_token")
            if existing:
                client.api_token = existing
                return existing
        except (json.JSONDecodeError, OSError):
            pass
    created = client.request(
        "POST",
        f"{API}/orgs/{ORG_ID}/api-tokens",
        json_body={
            "name": f"prompt13-pilot-{utc_stamp()}",
            "description": "Prompt 13 private pilot provisioning (revocable)",
        },
        expect=(200, 429),
    )
    if isinstance(created, dict) and created.get("token"):
        token = created["token"]
        client.api_token = token
        return token
    raise RuntimeError(
        "API token creation rate-limited and no prior token in prompt13-pilot-state.json"
    )


def provision_users(client: Client, token: str, instructor_pw: str, student_pw: str) -> dict[str, Any]:
    admin = f"{API}/admin/{ORG_SLUG}/users"
    instructor = client.request(
        "POST",
        admin,
        json_body={
            "email": INSTRUCTOR_EMAIL,
            "username": "pakish_pilot_instructor",
            "first_name": "Pilot",
            "last_name": "Instructor",
            "password": instructor_pw,
            "role_id": 3,
            "extra_metadata": {"prompt13": True, "synthetic": True},
        },
        bearer=token,
        expect=(200, 400),
    )
    student = client.request(
        "POST",
        admin,
        json_body={
            "email": STUDENT_EMAIL,
            "username": "pakish_pilot_student",
            "first_name": "Pilot",
            "last_name": "Student",
            "password": student_pw,
            "role_id": 4,
            "extra_metadata": {"prompt13": True, "synthetic": True},
        },
        bearer=token,
        expect=(200, 400),
    )
    return {"instructor": instructor, "student": student}


def create_pilot_course(client: Client) -> dict[str, Any]:
    course = client.request(
        "POST",
        f"{API}/courses/?org_id={ORG_ID}",
        multipart={
            "name": "AI Productivity & Automation",
            "description": "Private Prompt 13 pilot — practical Generative AI for productivity and workflow automation.",
            "about": "Pakish Institute pilot course mapped from the public ai-productivity catalogue. Private and unpublished.",
            "public": "false",
            "learnings": "Use ChatGPT, Claude, and Gemini for research, documents, and automation.",
            "tags": "ai-productivity,pilot,pakish",
            "extra_metadata": json.dumps(
                {
                    "websiteCourseId": "course-ai-productivity",
                    "websiteSlug": PILOT_SLUG,
                    "prompt13Pilot": True,
                }
            ),
        },
    )
    course_id = course["id"]
    course_uuid = course["course_uuid"]

    modules = [
        (
            "Generative AI Foundations",
            "ChatGPT, Claude, Gemini workflows and multi-tool setup.",
        ),
        (
            "Prompt Engineering & AI Research",
            "Structured prompting and reliable research techniques.",
        ),
        (
            "Documents & Business Communication",
            "Reports, emails, and professional communication with AI.",
        ),
        (
            "Productivity Tools & Workflow Automation",
            "Personal operating systems and light automation.",
        ),
    ]

    chapters: list[dict[str, Any]] = []
    for title, desc in modules:
        ch = client.request(
            "POST",
            f"{API}/chapters/",
            json_body={
                "name": title,
                "description": desc,
                "org_id": ORG_ID,
                "course_id": course_id,
                "lock_type": "authenticated",
            },
        )
        chapters.append(ch)

    # Representative markdown lesson in module 1
    lesson = client.request(
        "POST",
        f"{API}/activities/",
        json_body={
            "name": "Welcome — AI Productivity Pilot",
            "chapter_id": chapters[0]["id"],
            "activity_type": "TYPE_DYNAMIC",
            "activity_sub_type": "SUBTYPE_DYNAMIC_MARKDOWN",
            "published": True,
            "lock_type": "authenticated",
            "content": {
                "markdown": (
                    "# AI Productivity & Automation (Pilot)\n\n"
                    "This private pilot lesson introduces the four-module curriculum. "
                    "Complete the checklist assignment to confirm access.\n\n"
                    "**Objectives:** understand course structure, tools, and submission workflow."
                )
            },
            "details": {},
        },
    )

    # Assignment activity + assignment + short-answer task
    assign_activity = client.request(
        "POST",
        f"{API}/activities/",
        json_body={
            "name": "Pilot checklist assignment",
            "chapter_id": chapters[0]["id"],
            "activity_type": "TYPE_ASSIGNMENT",
            "activity_sub_type": "SUBTYPE_ASSIGNMENT_ANY",
            "published": True,
            "lock_type": "authenticated",
            "content": {},
            "details": {},
        },
    )
    assignment = client.request(
        "POST",
        f"{API}/assignments/",
        json_body={
            "title": "Multi-tool workspace setup (pilot)",
            "description": "Confirm you can access the pilot and describe one real work use case for AI tools.",
            "published": True,
            "grading_type": "PASS_FAIL",
            "auto_grading": False,
            "org_id": ORG_ID,
            "course_id": course_id,
            "chapter_id": chapters[0]["id"],
            "activity_id": assign_activity["id"],
        },
    )
    task = client.request(
        "POST",
        f"{API}/assignments/{assignment['assignment_uuid']}/tasks",
        json_body={
            "title": "Pilot access confirmation",
            "description": "Reply with one sentence describing your intended AI use case.",
            "hint": "Example: weekly report drafting with ChatGPT.",
            "assignment_type": "SHORT_ANSWER",
            "contents": {"correct_answers": ["pilot", "productivity", "automation"]},
            "max_grade_value": 100,
        },
    )

    # Live session information area (module 4)
    client.request(
        "POST",
        f"{API}/activities/",
        json_body={
            "name": "Live class information (Pakistan Standard Time)",
            "chapter_id": chapters[3]["id"],
            "activity_type": "TYPE_DYNAMIC",
            "activity_sub_type": "SUBTYPE_DYNAMIC_MARKDOWN",
            "published": True,
            "lock_type": "authenticated",
            "content": {
                "markdown": (
                    "## Live session template\n\n"
                    "- **Timezone:** Asia/Karachi (PKT)\n"
                    "- **Schedule:** TBD — owner to confirm before Prompt 14\n"
                    "- **Meeting link:** `[PLACEHOLDER — do not publish]`\n"
                    "- **Attendance owner:** unconfirmed\n"
                    "- **Backup host:** unconfirmed\n"
                    "- **Reschedule policy:** notify learners 24h in advance via approved channel\n"
                    "- **Replay location:** recorded-lesson template below; durable storage not yet configured"
                )
            },
            "details": {},
        },
    )

    # Recorded lesson template (module 4)
    client.request(
        "POST",
        f"{API}/activities/",
        json_body={
            "name": "Recorded lesson template",
            "chapter_id": chapters[3]["id"],
            "activity_type": "TYPE_DYNAMIC",
            "activity_sub_type": "SUBTYPE_DYNAMIC_MARKDOWN",
            "published": True,
            "lock_type": "authenticated",
            "content": {
                "markdown": (
                    "## Recorded lesson template\n\n"
                    "| Field | Value |\n"
                    "|---|---|\n"
                    "| Title | TBD |\n"
                    "| Objectives | TBD |\n"
                    "| Duration | TBD |\n"
                    "| Version/date | TBD |\n"
                    "| Video reference | **unpopulated** — durable storage not verified |\n"
                    "| Transcript/captions | not available |\n"
                    "| Resources | TBD |\n"
                    "| Assignment link | Pilot checklist (module 1) |\n"
                    "| Privacy review | required before publish |\n"
                    "| Replacement status | draft template only |"
                )
            },
            "details": {},
        },
    )

    course_uuid = course["course_uuid"]
    # Enrolled learners cannot read fully unpublished courses (LearnHouse RBAC).
    # Keep public=false (private catalogue) but publish content for enrolled QA.
    client.request(
        "PUT",
        f"{API}/courses/{course_uuid}",
        json_body={"published": True, "public": False},
    )

    return {
        "course": {**course, "published": True, "public": False},
        "chapters": chapters,
        "lesson_activity_uuid": lesson["activity_uuid"],
        "assignment_uuid": assignment["assignment_uuid"],
        "assignment_task_uuid": task["assignment_task_uuid"],
    }


def add_contributor(
    client: Client, course_uuid: str, username: str, user_id: int
) -> Any:
    added = client.request(
        "POST",
        f"{API}/courses/{course_uuid}/bulk-add-contributors",
        json_body=[username],
    )
    client.request(
        "PUT",
        f"{API}/courses/{course_uuid}/contributors/{user_id}"
        f"?authorship=CONTRIBUTOR&authorship_status=ACTIVE",
    )
    return added


def enroll_user(client: Client, token: str, user_id: int, course_uuid: str) -> Any:
    return client.request(
        "POST",
        f"{API}/admin/{ORG_SLUG}/enrollments/{user_id}/{course_uuid}",
        bearer=token,
    )


def qa_access(
    client: Client,
    evidence: dict[str, Any],
    course_uuid: str,
    instructor_pw: str,
    student_pw: str,
    student_id: int,
    assignment_uuid: str,
    task_uuid: str,
) -> None:
    anon_client = Client()
    anon_client.request("GET", f"{API}/courses/{course_uuid}", expect=(401, 403, 404))
    evidence["qa_anonymous_course_blocked"] = True

    client.login(STUDENT_EMAIL, student_pw)
    student_course = client.request("GET", f"{API}/courses/{course_uuid}")
    evidence["qa_student_can_read_course"] = student_course.get("course_uuid") == course_uuid
    client.request(
        "PUT",
        f"{API}/assignments/{assignment_uuid}/tasks/{task_uuid}/submissions",
        json_body={
            "task_submission": {"answer": "Pilot productivity automation use case for weekly reports."},
            "assignment_type": "SHORT_ANSWER",
        },
    )
    client.request("POST", f"{API}/assignments/{assignment_uuid}/submissions")
    evidence["qa_student_submitted_assignment"] = True
    client.logout()

    client.login(INSTRUCTOR_EMAIL, instructor_pw)
    instructor_course = client.request("GET", f"{API}/courses/{course_uuid}")
    evidence["qa_instructor_can_read_course"] = instructor_course.get("course_uuid") == course_uuid
    org_tokens = client.request(
        "GET",
        f"{API}/orgs/{ORG_ID}/api-tokens",
        expect=(403, 401),
    )
    evidence["qa_instructor_api_tokens_denied"] = isinstance(org_tokens, dict) and bool(
        org_tokens.get("detail")
    )
    submissions = client.request(
        "GET",
        f"{API}/assignments/{assignment_uuid}/submissions",
    )
    evidence["qa_instructor_sees_submissions"] = isinstance(submissions, list) and len(submissions) >= 1
    grade = client.request(
        "POST",
        f"{API}/assignments/{assignment_uuid}/submissions/{student_id}/grade",
        json_body={"overall_feedback": "Prompt 13 pilot — satisfactory checklist response."},
    )
    evidence["qa_instructor_graded_submission"] = grade is not None
    client.logout()

    client.login(STUDENT_EMAIL, student_pw)
    me_sub = client.request("GET", f"{API}/assignments/{assignment_uuid}/submissions/me")
    if isinstance(me_sub, list):
        me_sub = me_sub[0] if me_sub else {}
    evidence["qa_student_received_feedback"] = (
        me_sub.get("submission_status") == "GRADED"
        or me_sub.get("overall_feedback") is not None
    )
    client.logout()


def main() -> int:
    env = load_env(ENV_PATH)
    admin_email = env.get("LEARNHOUSE_INITIAL_ADMIN_EMAIL")
    admin_password = env.get("LEARNHOUSE_INITIAL_ADMIN_PASSWORD")
    if not admin_email or not admin_password:
        print("ERROR: missing LEARNHOUSE_INITIAL_ADMIN_* in env", file=sys.stderr)
        return 1

    instructor_pw = synthetic_password()
    student_pw = synthetic_password()

    evidence: dict[str, Any] = {
        "timestamp": utc_stamp(),
        "base_url": BASE,
        "backup": backup_database(),
        "pilot_website_slug": PILOT_SLUG,
        "synthetic_users": {
            "instructor_email": INSTRUCTOR_EMAIL,
            "student_email": STUDENT_EMAIL,
        },
    }

    admin_client = Client()
    admin_client.login(admin_email, admin_password)
    token = load_or_create_api_token(admin_client)
    evidence["api_token_prefix"] = token[:12] + "…"
    cleanup_prior_pilot(admin_client, token)

    users = provision_users(admin_client, token, instructor_pw, student_pw)
    def resolve_user_id(email: str) -> int | None:
        try:
            resolved = admin_client.request(
                "GET",
                f"{API}/admin/{ORG_SLUG}/users/by-email/{urllib.parse.quote(email)}",
                bearer=token,
            )
            return resolved.get("id")
        except RuntimeError:
            return None

    instructor_id = users["instructor"].get("id") or resolve_user_id(INSTRUCTOR_EMAIL)
    student_id = users["student"].get("id") or resolve_user_id(STUDENT_EMAIL)
    if not instructor_id or not student_id:
        raise RuntimeError("Failed to provision or resolve synthetic pilot users")
    evidence["instructor_id"] = instructor_id
    evidence["student_id"] = student_id

    pilot = create_pilot_course(admin_client)
    course_uuid = pilot["course"]["course_uuid"]
    evidence["pilot_course_uuid"] = course_uuid
    evidence["pilot_course_id"] = pilot["course"]["id"]
    evidence["pilot_public"] = pilot["course"].get("public")
    evidence["pilot_published"] = pilot["course"].get("published")
    evidence["chapter_count"] = len(pilot["chapters"])
    evidence["assignment_uuid"] = pilot["assignment_uuid"]

    evidence["contributor_add"] = add_contributor(
        admin_client, course_uuid, "pakish_pilot_instructor", int(instructor_id)
    )
    evidence["student_enrollment"] = enroll_user(
        admin_client, token, int(student_id), course_uuid
    )
    trail = admin_client.request(
        "GET",
        f"{API}/admin/{ORG_SLUG}/enrollments/{student_id}",
        bearer=token,
    )
    evidence["student_trail_course_count"] = len(trail.get("runs", []) if isinstance(trail, dict) else [])

    EVIDENCE_PATH.write_text(json.dumps(evidence, indent=2))
    qa_client = Client()
    qa_access(
        qa_client,
        evidence,
        course_uuid,
        instructor_pw,
        student_pw,
        int(student_id),
        pilot["assignment_uuid"],
        pilot["assignment_task_uuid"],
    )

    state = {
        "course_uuid": course_uuid,
        "instructor_email": INSTRUCTOR_EMAIL,
        "student_email": STUDENT_EMAIL,
        "instructor_password": instructor_pw,
        "student_password": student_pw,
        "api_token": token,
        "updated_at": evidence["timestamp"],
    }
    STATE_PATH.write_text(json.dumps(state, indent=2))
    EVIDENCE_PATH.write_text(json.dumps(evidence, indent=2))
    print(json.dumps(evidence, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
