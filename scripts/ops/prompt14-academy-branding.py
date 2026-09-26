#!/usr/bin/env python3
"""
Apply Pakish branding to the LearnHouse Academy deployment on pakish-sg.
Replaces LearnHouse logos in the app container and disables the footer watermark.
Safe to re-run after container recreate (call from deploy hook or manually).
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

CONTAINER = "learnhouse-app-d1110885"
DB = "learnhouse-db-d1110885"
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_PUBLIC = SCRIPT_DIR.parents[1] / "public"
PAKISH_LOGO_SVG = REPO_PUBLIC / "logo.svg"
PAKISH_LOGO_PNG = SCRIPT_DIR / "pakish-logo.png"
PAKISH_FAVICON = REPO_PUBLIC / "favicon-48x48.svg"
ORG_UUID = "org_e3575732-8173-4b7b-bd4c-f80c0ccdb71e"


def run(cmd: list[str], check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=check, capture_output=True, text=True)


def docker_cp(local: Path, remote: str) -> None:
    run(["docker", "cp", str(local), f"{CONTAINER}:{remote}"])


def docker_exec(cmd: list[str]) -> subprocess.CompletedProcess:
    return run(["docker", "exec", CONTAINER, *cmd])


def patch_built_text_branding() -> None:
    """Replace LearnHouse strings in pre-built Next.js output (no rebuild required)."""
    replacements = [
        ("https://www.learnhouse.io/terms", "https://pakish.org/privacy"),
        ("https://www.learnhouse.io/privacy", "https://pakish.org/privacy"),
        ("https://learnhouse.app/", "https://pakish.org/"),
        ("https://learnhouse.app", "https://pakish.org"),
        ("LearnHouse's", "Pakish Institute's"),
        ("LearnHouse, Inc.", "Pakish Institute"),
        ("Welcome back to LearnHouse.", "Welcome back to Pakish Institute."),
        ('alt="LearnHouse"', 'alt="Pakish Institute"'),
        ("LearnHouse", "Pakish Institute"),
    ]
    proc = docker_exec(
        [
            "sh",
            "-c",
            "find /app/web/.next -type f \\( -name '*.js' -o -name '*.html' -o -name '*.json' \\) 2>/dev/null",
        ]
    )
    files = [line.strip() for line in proc.stdout.splitlines() if line.strip()]
    patched = 0
    for remote in files:
        content = docker_exec(["cat", remote]).stdout
        updated = content
        for old, new in replacements:
            updated = updated.replace(old, new)
        if updated != content:
            tmp = Path(f"/tmp/lh-brand-{patched}.bin")
            tmp.write_bytes(updated.encode("utf-8"))
            docker_cp(tmp, remote)
            patched += 1
    print(f"patched LearnHouse strings in {patched} built asset files")


def replace_bundled_logos() -> None:
    """Overwrite hashed Next.js media assets that still reference LearnHouse."""
    proc = docker_exec(
        ["sh", "-c", "find /app/web/.next/static/media -name 'black_logo*.png' 2>/dev/null || true"]
    )
    targets = [line.strip() for line in proc.stdout.splitlines() if line.strip()]
    if not targets:
        print("no bundled black_logo assets found (may be ok after rebuild)")
    for remote in targets:
        docker_cp(PAKISH_LOGO_PNG, remote)
        print(f"replaced bundled asset {remote}")


def copy_logos() -> None:
    if not PAKISH_LOGO_SVG.exists():
        raise FileNotFoundError(f"Missing {PAKISH_LOGO_SVG}")
    if not PAKISH_LOGO_PNG.exists():
        raise FileNotFoundError(
            f"Missing {PAKISH_LOGO_PNG} — run: npx sharp-cli resize 540 200 -i public/logo.svg -o scripts/ops/pakish-logo.png -f png"
        )

    docker_cp(PAKISH_LOGO_SVG, "/app/web/public/pakish-logo.svg")
    docker_cp(PAKISH_LOGO_PNG, "/app/web/public/black_logo.png")
    docker_cp(PAKISH_LOGO_SVG, "/app/web/public/lrn.svg")
    docker_cp(PAKISH_LOGO_PNG, "/app/web/public/learnhouse_bigicon_1.png")

    if PAKISH_FAVICON.exists():
        docker_cp(PAKISH_FAVICON, "/app/web/public/favicon.ico")

    org_logo_dir = f"/app/api/content/orgs/{ORG_UUID}/logos"
    docker_cp(PAKISH_LOGO_SVG, f"{org_logo_dir}/logo.svg")
    docker_cp(PAKISH_LOGO_PNG, f"{org_logo_dir}/logo.png")

    replace_bundled_logos()
    patch_built_text_branding()
    print("copied Pakish logos into container")


def patch_not_found() -> None:
    path = "/app/web/app/not-found.tsx"
    content = docker_exec(["cat", path]).stdout
    updated = content.replace(
        "import learnhouseIcon from 'public/black_logo.png'",
        "import pakishLogo from 'public/pakish-logo.svg'",
    ).replace("src={learnhouseIcon}", "src={pakishLogo}").replace(
        'alt="logo"', 'alt="Pakish Institute"'
    )
    if updated == content:
        print("not-found.tsx already patched")
        return
    tmp = Path("/tmp/not-found.tsx")
    tmp.write_text(updated, encoding="utf-8")
    docker_cp(tmp, path)
    print("patched not-found.tsx")


def patch_legal_footers() -> None:
    path = "/app/web/components/Footers/LegalFooters.tsx"
    content = docker_exec(["cat", path]).stdout
    updated = (
        content.replace(
            "const TERMS_URL = getPlatformUrl('/terms') || 'https://www.learnhouse.io/terms'",
            "const TERMS_URL = 'https://pakish.org/privacy'",
        )
        .replace(
            "const PRIVACY_URL = getPlatformUrl('/privacy') || 'https://www.learnhouse.io/privacy'",
            "const PRIVACY_URL = 'https://pakish.org/privacy'",
        )
        .replace("LearnHouse's", "Pakish Institute's")
        .replace("LearnHouse, Inc.", "Pakish Institute")
    )
    if updated == content:
        print("LegalFooters.tsx already patched")
        return
    tmp = Path("/tmp/LegalFooters.tsx")
    tmp.write_text(updated, encoding="utf-8")
    docker_cp(tmp, path)
    print("patched LegalFooters.tsx")


def patch_auth_branding_panel() -> None:
    path = "/app/web/components/Auth/AuthBrandingPanel.tsx"
    content = docker_exec(["cat", path]).stdout
    updated = content.replace(
        "href=\"https://learnhouse.app\"",
        "href=\"https://pakish.org\"",
    ).replace(
        "src={learnhouseIcon}\n                          alt=\"LearnHouse\"",
        "src={org?.logo_image ? getOrgLogoMediaDirectory(org.org_uuid, org.logo_image) : '/pakish-logo.svg'}\n                          alt={org?.name || 'Pakish Institute'}",
    ).replace(
        "<h1 className=\"font-black text-3xl tracking-tight\">{org?.name || 'LearnHouse'}</h1>",
        "<h1 className=\"font-black text-3xl tracking-tight\">{org?.name || 'Pakish Institute'}</h1>",
    )
    if updated == content:
        print("AuthBrandingPanel.tsx already patched")
        return
    tmp = Path("/tmp/AuthBrandingPanel.tsx")
    tmp.write_text(updated, encoding="utf-8")
    docker_cp(tmp, path)
    print("patched AuthBrandingPanel.tsx")


def patch_org_footer() -> None:
    path = "/app/web/app/orgs/[orgslug]/(withmenu)/layout.tsx"
    content = docker_exec(["cat", path]).stdout
    updated = content.replace(
        "const showWatermark = isFree || watermarkConfig !== false",
        "const showWatermark = false",
    ).replace(
        "href=\"https://learnhouse.app\"",
        "href=\"https://pakish.org\"",
    ).replace("LearnHouse", "Pakish Institute")
    if updated == content:
        print("org footer already patched")
        return
    tmp = Path("/tmp/org-layout.tsx")
    tmp.write_text(updated, encoding="utf-8")
    docker_cp(tmp, path)
    print("patched org footer watermark")


def update_org_config() -> None:
    proc = run(
        [
            "docker",
            "exec",
            DB,
            "psql",
            "-U",
            "learnhouse",
            "-d",
            "learnhouse",
            "-tA",
            "-c",
            "SELECT config::text FROM organizationconfig WHERE org_id=1 LIMIT 1;",
        ]
    )
    raw = proc.stdout.strip()
    if not raw:
        print("no organizationconfig row found", file=sys.stderr)
        return
    config = json.loads(raw)
    general = config.setdefault("general", {})
    customization = config.setdefault("customization", {}).setdefault("general", {})
    customization["watermark"] = False
    general["footer_text"] = "Pakish Institute — academy.pakish.org"
    config["signup_mode"] = config.get("signup_mode", "inviteOnly")
    payload = json.dumps(config).replace("'", "''")
    sql = f"UPDATE organizationconfig SET config = '{payload}'::jsonb WHERE org_id=1;"
    run(["docker", "exec", DB, "psql", "-U", "learnhouse", "-d", "learnhouse", "-c", sql])
    run(
        [
            "docker",
            "exec",
            DB,
            "psql",
            "-U",
            "learnhouse",
            "-d",
            "learnhouse",
            "-c",
            "UPDATE organization SET logo_image='logo.svg', thumbnail_image='logo.svg' WHERE id=1;",
        ]
    )
    print("updated organization config (watermark off, footer text)")


def main() -> int:
    copy_logos()
    patch_not_found()
    patch_legal_footers()
    patch_auth_branding_panel()
    patch_org_footer()
    update_org_config()
    run(["docker", "restart", CONTAINER], check=False)
    print("branding applied — container restarted")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
