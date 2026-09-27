/**
 * Contract helpers for Pakish Academy immutable asset versioning.
 *
 * LearnHouse 1.3.6 serves `/_next/static/chunks/*` with
 * `Cache-Control: public, max-age=31536000, immutable`. Mutating bytes behind
 * an unchanged URL leaves returning browsers on stale JS for up to a year.
 * HTML remains `no-store`, so renaming patched chunks and rewriting references
 * forces every visitor (including cached profiles) onto fresh URLs.
 */
export const ASSET_FINGERPRINT_RE =
  /^(?<base>.+?)-pk(?<hash>[a-f0-9]{8})(?<ext>\.[A-Za-z0-9._-]+)$/;

export function stripAssetFingerprint(filename: string): string {
  const match = ASSET_FINGERPRINT_RE.exec(filename);
  if (!match?.groups) return filename;
  return `${match.groups.base}${match.groups.ext}`;
}

export function fingerprintedAssetName(
  filename: string,
  contentHash8: string
): string {
  if (!/^[a-f0-9]{8}$/.test(contentHash8)) {
    throw new Error(`contentHash8 must be 8 lowercase hex digits, got ${contentHash8}`);
  }
  const bare = stripAssetFingerprint(filename);
  const dot = bare.lastIndexOf(".");
  if (dot <= 0) {
    throw new Error(`expected extension in asset filename: ${filename}`);
  }
  return `${bare.slice(0, dot)}-pk${contentHash8}${bare.slice(dot)}`;
}

/** Longest-first replacement so `foo-pkold.js` wins over `foo.js`. */
export function rewriteAssetReferences(
  text: string,
  renames: Record<string, string>
): string {
  const keys = Object.keys(renames).sort((a, b) => b.length - a.length);
  let out = text;
  for (const from of keys) {
    const to = renames[from];
    if (!to || from === to) continue;
    if (!out.includes(from)) continue;
    out = out.split(from).join(to);
  }
  return out;
}

/**
 * Regression gate: patched compiled bytes must not keep the previous public URL.
 * Fails when content hash changes but the served basename does not.
 */
export function assertCompiledChangeBustsAssetUrl(input: {
  previousUrlBasename: string;
  previousContentHash8: string;
  nextUrlBasename: string;
  nextContentHash8: string;
  privacyUrlInBundle: string;
}): void {
  const {
    previousUrlBasename,
    previousContentHash8,
    nextUrlBasename,
    nextContentHash8,
    privacyUrlInBundle,
  } = input;

  if (privacyUrlInBundle !== "https://pakish.org/privacy") {
    throw new Error(
      `served client bundle must use https://pakish.org/privacy (got ${privacyUrlInBundle})`
    );
  }
  if (previousContentHash8 === nextContentHash8) {
    throw new Error("expected compiled content hash to change for this gate");
  }
  if (previousUrlBasename === nextUrlBasename) {
    throw new Error(
      `compiled bytes changed (${previousContentHash8} → ${nextContentHash8}) but asset URL basename stayed ${previousUrlBasename}`
    );
  }
  const expected = fingerprintedAssetName(
    previousUrlBasename,
    nextContentHash8
  );
  if (nextUrlBasename !== expected) {
    throw new Error(
      `expected fingerprinted basename ${expected}, got ${nextUrlBasename}`
    );
  }
}
