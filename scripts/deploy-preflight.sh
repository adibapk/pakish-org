#!/usr/bin/env bash
# Read-only deployment preflight: abort on unexpected tracked modifications.
set -euo pipefail

APP_DIR="${1:-/data/migrations/pakish/apps/pakish-org}"

if [[ ! -d "${APP_DIR}/.git" ]]; then
  echo "preflight: missing git checkout at ${APP_DIR}" >&2
  exit 1
fi

cd "${APP_DIR}"

if git diff --quiet && git diff --cached --quiet; then
  echo "preflight: working tree clean"
  exit 0
fi

echo "preflight: tracked modifications detected before deploy pull" >&2
git status --short >&2

# Allow only generated Python bytecode under scripts/ops/__pycache__ (ignored after pull).
if git status --porcelain | grep -qvE '^\?\? scripts/ops/__pycache__/'; then
  modified="$(git status --porcelain | grep -vE '^\?\? scripts/ops/__pycache__/' || true)"
  if [[ -n "${modified}" ]]; then
    echo "preflight: aborting — reconcile or commit server-side changes before deploy." >&2
    echo "${modified}" >&2
    exit 1
  fi
fi

echo "preflight: only ignored cache residue present; continuing"
exit 0
