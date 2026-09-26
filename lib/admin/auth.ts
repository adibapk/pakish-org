import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_SESSION_COOKIE = "pakish_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function signingSecret(): string | null {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || null;
}

function loginPassword(): string | null {
  return process.env.ADMIN_PASSWORD || process.env.ADMIN_SECRET || null;
}

export function isAdminConfigured(): boolean {
  return Boolean(signingSecret() && loginPassword());
}

function sign(payload: string): string {
  const secret = signingSecret();
  if (!secret) throw new Error("ADMIN_SECRET_MISSING");
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createAdminSessionToken(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `admin:${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token || !signingSecret()) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  try {
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }

  const exp = Number(payload.split(":")[1]);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  return true;
}

export function verifyAdminPassword(password: string): boolean {
  const expectedPassword = loginPassword();
  if (!expectedPassword) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expectedPassword);
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function requireAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return verifyAdminSessionToken(jar.get(ADMIN_SESSION_COOKIE)?.value);
}

export function adminCookieOptions(maxAgeSec = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSec,
  };
}
