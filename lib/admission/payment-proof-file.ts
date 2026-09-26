import { createHash, randomBytes } from "crypto";
import path from "path";

const MAX_BYTES = 1.5 * 1024 * 1024;

const MAGIC: Record<string, number[][]> = {
  png: [[0x89, 0x50, 0x4e, 0x47]],
  jpg: [[0xff, 0xd8, 0xff]],
  webp: [[0x52, 0x49, 0x46, 0x46]], // RIFF header; WEBP at offset 8 checked separately
};

export interface ValidatedProofImage {
  buffer: Buffer;
  ext: "png" | "jpg" | "webp";
  mime: string;
}

function matchesMagic(buffer: Buffer, signature: number[]): boolean {
  if (buffer.length < signature.length) return false;
  return signature.every((byte, index) => buffer[index] === byte);
}

function detectImageType(buffer: Buffer): ValidatedProofImage | null {
  if (matchesMagic(buffer, MAGIC.png[0])) {
    return { buffer, ext: "png", mime: "image/png" };
  }
  if (matchesMagic(buffer, MAGIC.jpg[0])) {
    return { buffer, ext: "jpg", mime: "image/jpeg" };
  }
  if (
    matchesMagic(buffer, MAGIC.webp[0]) &&
    buffer.length >= 12 &&
    buffer.slice(8, 12).toString("ascii") === "WEBP"
  ) {
    return { buffer, ext: "webp", mime: "image/webp" };
  }
  return null;
}

export function parseProofDataUrl(dataUrl: string): ValidatedProofImage {
  const match = /^data:(image\/(?:png|jpeg|jpg|webp));base64,([A-Za-z0-9+/=\s]+)$/i.exec(
    dataUrl.trim()
  );
  if (!match) {
    throw new Error("INVALID_DATA_URL");
  }

  const base64 = match[2].replace(/\s/g, "");
  if (!base64 || base64.length % 4 !== 0) {
    throw new Error("INVALID_BASE64");
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(base64, "base64");
  } catch {
    throw new Error("INVALID_BASE64");
  }

  if (buffer.byteLength === 0 || buffer.byteLength > MAX_BYTES) {
    throw new Error("SCREENSHOT_TOO_LARGE");
  }

  const detected = detectImageType(buffer);
  if (!detected) {
    throw new Error("UNSUPPORTED_IMAGE");
  }

  return detected;
}

export function buildProofStorageName(requestId: string, ext: string): string {
  const safeId = requestId.replace(/[^a-zA-Z0-9_-]/g, "");
  const nonce = createHash("sha256")
    .update(randomBytes(16))
    .digest("hex")
    .slice(0, 16);
  return `proof_${safeId}_${nonce}.${ext}`;
}

export function assertSafeProofRelativePath(relativePath: string): string {
  const normalized = path.normalize(relativePath).replace(/\\/g, "/");
  if (
    normalized.startsWith("..") ||
    normalized.includes("/../") ||
    path.isAbsolute(normalized)
  ) {
    throw new Error("INVALID_PATH");
  }
  return normalized;
}
