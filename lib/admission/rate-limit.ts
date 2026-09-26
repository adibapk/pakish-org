/**
 * Lightweight in-memory rate limit for admission endpoints.
 * Swap for Redis / edge KV in production when needed.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000
): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  buckets.set(key, existing);
  return { allowed: true };
}
