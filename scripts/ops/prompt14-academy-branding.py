#!/usr/bin/env python3
"""
Apply Pakish branding to the LearnHouse Academy deployment on pakish-sg.
Replaces LearnHouse logos, fixes org logo PNG references, invite-only UX copy,
and disables the footer watermark. Safe to re-run after container recreate.

Run only from the checked-out repository on pakish-sg after `git pull`.
Never copy this script over the tracked deployment checkout with scp.
"""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

CONTAINER = "learnhouse-app-d1110885"
DB = "learnhouse-db-d1110885"
SCRIPT_DIR = Path(__file__).resolve().parent


def _resolve_public_dir() -> Path:
    candidates = [
        SCRIPT_DIR.parents[1] / "public",
        SCRIPT_DIR / "public",
        Path("/data/migrations/pakish/apps/pakish-org/public"),
    ]
    for candidate in candidates:
        if (candidate / "logo.svg").exists():
            return candidate
    raise FileNotFoundError(
        "Could not locate public/logo.svg; run from repo or place logo.svg beside the script."
    )


REPO_PUBLIC = _resolve_public_dir()
PAKISH_LOGO_SVG = REPO_PUBLIC / "logo.svg"
PAKISH_LOGO_PNG = SCRIPT_DIR / "pakish-logo.png"
PAKISH_FAVICON = REPO_PUBLIC / "favicon-48x48.svg"
ORG_UUID = "org_e3575732-8173-4b7b-bd4c-f80c0ccdb71e"
PRIVACY_URL = "https://pakish.org/privacy"
ADMISSION_URL = "https://pakish.org/admission"


def run(cmd: list[str], check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, check=check, capture_output=True, text=True)


def docker_cp(local: Path, remote: str) -> None:
    run(["docker", "cp", str(local), f"{CONTAINER}:{remote}"])


def docker_exec(cmd: list[str]) -> subprocess.CompletedProcess:
    return run(["docker", "exec", CONTAINER, *cmd])


def patch_built_text_branding() -> None:
    """Replace LearnHouse strings in pre-built Next.js output (no rebuild required)."""
    replacements = [
        ("https://www.learnhouse.io/terms", PRIVACY_URL),
        ("https://www.learnhouse.io/privacy", PRIVACY_URL),
        ("https://learnhouse.app/", "https://pakish.org/"),
        ("https://learnhouse.app", "https://pakish.org"),
        (
            "By continuing, you agree to LearnHouse's",
            "By continuing, you agree to Pakish Institute's",
        ),
        (
            "By continuing, you agree to Pakish Institute's Terms of Service and Privacy Policy.",
            "By continuing, you agree to Pakish Institute's Privacy Policy.",
        ),
        ("Terms of Service and Privacy Policy", "Privacy Policy"),
        ("Terms of Service", "Privacy Policy"),
        ("LearnHouse, Inc.", "Pakish Institute"),
        ("Welcome back to LearnHouse.", "Welcome back to Pakish Institute."),
        ('alt="LearnHouse"', 'alt="Pakish Institute"'),
        ('alt="Learnhouse"', 'alt="Pakish Institute"'),
        (
            "Don't have an account? Sign up",
            "Academy access is issued after admission and enrollment confirmation.",
        ),
        ("Don't have an account?", "Need Academy access?"),
        ("Sign up", "Apply for admission"),
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
    docker_cp(PAKISH_LOGO_PNG, "/app/web/public/lrn.png")
    docker_cp(PAKISH_LOGO_PNG, "/app/web/public/learnhouse_bigicon_1.png")

    if PAKISH_FAVICON.exists():
        docker_cp(PAKISH_FAVICON, "/app/web/public/favicon.ico")

    org_logo_dir = f"/app/api/content/orgs/{ORG_UUID}/logos"
    docker_cp(PAKISH_LOGO_PNG, f"{org_logo_dir}/logo.png")
    # Keep SVG asset on disk for manual use, but DB must reference PNG.
    docker_cp(PAKISH_LOGO_SVG, f"{org_logo_dir}/logo.svg")

    replace_bundled_logos()
    patch_built_text_branding()
    print("copied Pakish logos into container")


def patch_not_found() -> None:
    path = "/app/web/app/not-found.tsx"
    content = docker_exec(["cat", path]).stdout
    updated = content.replace(
        "import learnhouseIcon from 'public/black_logo.png'",
        "import pakishLogo from 'public/black_logo.png'",
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
    updated = content
    updated = updated.replace(
        "const TERMS_URL = getPlatformUrl('/terms') || 'https://www.learnhouse.io/terms'",
        f"const TERMS_URL = '{PRIVACY_URL}'",
    )
    updated = updated.replace(
        "const PRIVACY_URL = getPlatformUrl('/privacy') || 'https://www.learnhouse.io/privacy'",
        f"const PRIVACY_URL = '{PRIVACY_URL}'",
    )
    updated = updated.replace(
        "{t('auth.terms_text', { defaultValue: \"By continuing, you agree to LearnHouse's\" })}{' '}",
        "{t('auth.terms_text', { defaultValue: \"By continuing, you agree to Pakish Institute's\" })}{' '}",
    )
    updated = updated.replace(
        "{t('auth.terms_of_service', { defaultValue: 'Terms of Service' })}",
        "{t('auth.privacy_policy', { defaultValue: 'Privacy Policy' })}",
    )
    updated = updated.replace(
        " {' '}\n        {t('auth.and', { defaultValue: 'and' })}{' '}\n        <Link href={PRIVACY_URL}",
        " <Link href={PRIVACY_URL}",
    )
    updated = updated.replace(
        "{t('common.copyright', { defaultValue: '© {{year}} LearnHouse, Inc.', year })}",
        "{t('common.copyright', { defaultValue: '© {{year}} Pakish Institute', year })}",
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
        "import learnhouseIcon from 'public/learnhouse_bigicon_1.png'",
        "import pakishIcon from 'public/learnhouse_bigicon_1.png'",
    ).replace(
        "src={learnhouseIcon}\n                          alt=\"LearnHouse\"",
        "src={org?.logo_image ? getOrgLogoMediaDirectory(org.org_uuid, org.logo_image) : '/black_logo.png'}\n                          alt={org?.name || 'Pakish Institute'}",
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


def patch_login_invite_only() -> None:
    path = "/app/web/app/auth/login/login.tsx"
    content = docker_exec(["cat", path]).stdout
    invite_block = f"""              <p className="text-center text-sm text-black/60 mt-6">
                Academy access is issued after admission and enrollment confirmation.{' '}
                <a href="{ADMISSION_URL}" className="text-black font-semibold hover:underline">
                  Apply for admission
                </a>
              </p>"""
    updated = content
    marker = "{/* Sign Up Link */}"
    if marker in content and "Apply for admission" not in content:
        import re

        updated = re.sub(
            r"\{/\* Sign Up Link \*/\}\s*<p className=\"text-center text-sm text-black/35 mt-6\">.*?</p>",
            invite_block,
            content,
            count=1,
            flags=re.DOTALL,
        )
    if updated == content:
        print("login.tsx invite-only copy already patched or pattern not found")
        return
    tmp = Path("/tmp/login.tsx")
    tmp.write_text(updated, encoding="utf-8")
    docker_cp(tmp, path)
    print("patched login.tsx invite-only UX")


def patch_en_locale() -> None:
    path = "/app/web/locales/en.json"
    raw = docker_exec(["cat", path]).stdout
    locale = json.loads(raw)
    replacements = {
        ("common", "copyright"): "© {{year}} Pakish Institute",
        ("auth", "terms_text"): "By continuing, you agree to Pakish Institute's",
        ("auth", "image_title_login"): "Welcome back to Pakish Institute.",
        ("auth", "image_title_signup"): "Start learning with Pakish Institute.",
        ("footer", "powered_by"): "Powered by Pakish Institute",
    }
    changed = False
    for (section, key), value in replacements.items():
        if locale.get(section, {}).get(key) != value:
            locale.setdefault(section, {})[key] = value
            changed = True
    if not changed:
        print("en.json locale already patched")
        return
    tmp = Path("/tmp/en.json")
    tmp.write_text(json.dumps(locale, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    docker_cp(tmp, path)
    print("patched en.json auth/footer locale strings")


def patch_org_menu() -> None:
    path = "/app/web/components/Objects/Menus/OrgMenu.tsx"
    content = docker_exec(["cat", path]).stdout
    updated = content.replace(
        '                      alt="LearnHouse"\n'
        '                      style={{ width: \'auto\', height: \'100%\' }}',
        "                      alt={org?.name || 'Pakish Institute'}\n"
        "                      style={{ width: 'auto', height: '100%' }}",
    ).replace(
        '                      alt="Learnhouse"\n'
        '                      style={{ width: \'auto\', height: \'100%\' }}',
        "                      alt={org?.name || 'Pakish Institute'}\n"
        "                      style={{ width: 'auto', height: '100%' }}",
    ).replace(
        '      alt="LearnHouse logo"',
        "      alt=\"Pakish Institute logo\"",
    )
    if updated == content:
        print("OrgMenu.tsx already patched")
        return
    tmp = Path("/tmp/OrgMenu.tsx")
    tmp.write_text(updated, encoding="utf-8")
    docker_cp(tmp, path)
    print("patched OrgMenu.tsx authenticated navigation logo alt")


def patch_dash_mobile_menu() -> None:
    path = "/app/web/components/Dashboard/Menus/DashMobileMenu.tsx"
    content = docker_exec(["cat", path]).stdout
    updated = content.replace(
        '              alt="LearnHouse"',
        "              alt=\"Pakish Institute\"",
    )
    if updated == content:
        print("DashMobileMenu.tsx already patched")
        return
    tmp = Path("/tmp/DashMobileMenu.tsx")
    tmp.write_text(updated, encoding="utf-8")
    docker_cp(tmp, path)
    print("patched DashMobileMenu.tsx mobile navigation logo alt")


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
    config["signup_mode"] = "inviteOnly"
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
            "UPDATE organization SET logo_image='logo.png', thumbnail_image='logo.png' WHERE id=1;",
        ]
    )
    print("updated organization config (watermark off, logo.png references)")


def main() -> int:
    copy_logos()
    patch_not_found()
    patch_legal_footers()
    patch_en_locale()
    patch_auth_branding_panel()
    patch_login_invite_only()
    patch_org_menu()
    patch_dash_mobile_menu()
    patch_org_footer()
    update_org_config()
    run(["docker", "restart", CONTAINER], check=False)
    print("branding applied — container restarted")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
