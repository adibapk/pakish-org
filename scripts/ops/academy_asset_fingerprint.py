#!/usr/bin/env python3
"""
Version immutable LearnHouse static assets after Pakish branding overlays.

LearnHouse 1.3.6 serves /_next/static/chunks/* with one-year immutable cache.
Patching bytes in place keeps returning visitors on stale JS. HTML is no-store,
so renaming patched assets and rewriting .next references forces fresh fetches.
"""
from __future__ import annotations

import hashlib
import json
import os
import re
from pathlib import Path

FINGERPRINT_RE = re.compile(
    r"^(?P<base>.+?)-pk(?P<hash>[a-f0-9]{8})(?P<ext>\.[A-Za-z0-9._-]+)$"
)
STATIC_ROOTS = (
    Path("/app/web/.next/static/chunks"),
    Path("/app/web/.next/static/media"),
)
REWRITE_ROOT = Path("/app/web/.next")
BUILD_ID_PATH = Path("/app/web/.next/BUILD_ID")
TEXT_SUFFIXES = {".js", ".css", ".json", ".html", ".map", ".txt", ".rsc"}


def strip_fingerprint(filename: str) -> str:
    match = FINGERPRINT_RE.match(filename)
    if not match:
        return filename
    return f"{match.group('base')}{match.group('ext')}"


def fingerprinted_name(filename: str, content_hash8: str) -> str:
    if not re.fullmatch(r"[a-f0-9]{8}", content_hash8):
        raise ValueError(f"content_hash8 must be 8 hex digits, got {content_hash8}")
    bare = strip_fingerprint(filename)
    dot = bare.rfind(".")
    if dot <= 0:
        raise ValueError(f"expected extension in asset filename: {filename}")
    return f"{bare[:dot]}-pk{content_hash8}{bare[dot:]}"


def content_hash8(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()[:8]


def rewrite_references(text: str, renames: dict[str, str]) -> str:
    out = text
    for old in sorted(renames.keys(), key=len, reverse=True):
        new = renames[old]
        if old == new or old not in out:
            continue
        out = out.replace(old, new)
    return out


def plan_renames(paths: list[Path]) -> dict[str, str]:
    """Map current basename -> fingerprinted basename for changed static files."""
    renames: dict[str, str] = {}
    for path in paths:
        if not path.is_file():
            continue
        data = path.read_bytes()
        digest = content_hash8(data)
        new_name = fingerprinted_name(path.name, digest)
        if new_name == path.name:
            continue
        renames[path.name] = new_name
    return renames


def apply_renames(renames: dict[str, str], static_dirs: tuple[Path, ...] = STATIC_ROOTS) -> dict:
    if not renames:
        return {"renamed": 0, "rewritten_files": 0, "renames": {}}

    # Copy to new names first (keep old orphans for mid-flight tabs).
    for directory in static_dirs:
        if not directory.is_dir():
            continue
        for old, new in renames.items():
            src = directory / old
            if not src.is_file():
                continue
            dst = directory / new
            if not dst.exists():
                dst.write_bytes(src.read_bytes())

    rewritten = 0
    for path in REWRITE_ROOT.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in TEXT_SUFFIXES and path.suffix != "":
            # Allow extensionless flight payloads under server/
            if "server" not in path.parts:
                continue
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        updated = rewrite_references(text, renames)
        if updated != text:
            path.write_text(updated, encoding="utf-8")
            rewritten += 1

    return {"renamed": len(renames), "rewritten_files": rewritten, "renames": renames}


def bump_build_id(stamp: str) -> str:
    """Append a Pakish stamp to BUILD_ID and rename the static build folder."""
    if not BUILD_ID_PATH.exists():
        raise FileNotFoundError(str(BUILD_ID_PATH))
    current = BUILD_ID_PATH.read_text(encoding="utf-8").strip()
    # Collapse prior pk stamps so upgrades stay readable.
    base = re.sub(r"-pk[a-z0-9]+$", "", current)
    safe_stamp = re.sub(r"[^a-z0-9]+", "", stamp.lower())[:16] or content_hash8(
        os.urandom(8)
    )
    new_id = f"{base}-pk{safe_stamp}"
    if new_id == current:
        return current

    old_dir = REWRITE_ROOT / "static" / current
    new_dir = REWRITE_ROOT / "static" / new_id
    if old_dir.is_dir() and not new_dir.exists():
        old_dir.rename(new_dir)

    BUILD_ID_PATH.write_text(new_id + "\n", encoding="utf-8")

    # Only rewrite path segments — never a bare BUILD_ID token replace.
    segment_renames = {
        f"/static/{current}/": f"/static/{new_id}/",
        f"static/{current}/": f"static/{new_id}/",
    }
    rewritten = 0
    for path in REWRITE_ROOT.rglob("*"):
        if not path.is_file():
            continue
        try:
            text = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue
        updated = rewrite_references(text, segment_renames)
        if updated != text:
            path.write_text(updated, encoding="utf-8")
            rewritten += 1
    return new_id


def fingerprint_paths(paths: list[str], stamp: str) -> dict:
    selected = [Path(p) for p in paths]
    # Only version immutable static URL files that this overlay actually wrote.
    static_files = [
        p
        for p in selected
        if p.exists()
        and any(str(p).startswith(str(root)) for root in STATIC_ROOTS)
    ]
    renames = plan_renames(static_files)
    result = apply_renames(renames)
    new_build_id = bump_build_id(stamp)
    result["build_id"] = new_build_id
    return result


if __name__ == "__main__":
    import sys

    payload = json.loads(sys.stdin.read() or "{}")
    paths = payload.get("paths") or []
    stamp = payload.get("stamp") or content_hash8(os.urandom(16))
    print(json.dumps(fingerprint_paths(paths, stamp), indent=2))
