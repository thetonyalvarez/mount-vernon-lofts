/**
 * Spam Protection for MVL Form Submissions
 *
 * Three invisible layers — zero friction for real users:
 * 1. Honeypot: hidden field that bots fill, humans don't
 * 2. Time-based: rejects submissions faster than 3 seconds
 * 3. Rate limiting: max 5 submissions per IP per 15 minutes
 */

/** Name of the honeypot field used across all forms */
export const SPAM_FIELD_NAME = "website"

/** Minimum milliseconds a human would take to fill any form */
const MIN_SUBMISSION_TIME_MS = 3000

/** Max submissions per IP within the rate limit window */
const RATE_LIMIT_MAX = 5

/** Rate limit window: 15 minutes */
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000

/** In-memory store for rate limiting (per serverless instance) */
const rateLimitStore = new Map<string, { timestamps: number[] }>()

// ─── Layer 1: Honeypot ───────────────────────────────────────

/**
 * Returns true if the submission is spam (honeypot field was filled).
 * Bots fill all visible-looking fields; humans never see the hidden one.
 */
export function validateHoneypot(value: string | undefined | null): boolean {
  if (value === undefined || value === null) return false
  return value.length > 0
}

// ─── Layer 2: Time-Based Detection ───────────────────────────

/**
 * Returns true if the submission is spam (filled too fast or spoofed timestamp).
 * No human completes a form in under 3 seconds.
 */
export function validateSubmissionTime(renderTimestamp: number): boolean {
  const elapsed = Date.now() - renderTimestamp
  return elapsed < MIN_SUBMISSION_TIME_MS
}

// ─── Layer 3: Rate Limiting ──────────────────────────────────

/**
 * Checks whether an IP has exceeded the submission rate limit.
 * Returns { allowed, remaining }.
 */
export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()

  // Probabilistic cleanup to prevent memory leaks (~1% of calls)
  if (Math.random() < 0.01) {
    for (const [key, entry] of rateLimitStore.entries()) {
      entry.timestamps = entry.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)
      if (entry.timestamps.length === 0) {
        rateLimitStore.delete(key)
      }
    }
  }

  const entry = rateLimitStore.get(ip)

  if (!entry) {
    rateLimitStore.set(ip, { timestamps: [now] })
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }

  // Keep only timestamps within the window
  entry.timestamps = entry.timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS)

  if (entry.timestamps.length >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 }
  }

  entry.timestamps.push(now)
  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.timestamps.length }
}

// ─── IP Extraction ───────────────────────────────────────────

/**
 * Extract client IP from request headers.
 * Same header priority as lib/ip-anonymizer.ts for consistency.
 */
export function getClientIp(request: Request): string {
  const headers = [
    "cf-connecting-ip",
    "x-real-ip",
    "x-forwarded-for",
    "x-client-ip",
  ]

  for (const header of headers) {
    const value = request.headers.get(header)
    if (value) {
      // x-forwarded-for can contain multiple IPs — take the first
      return value.split(",")[0].trim()
    }
  }

  return "unknown"
}

// ─── Test Utilities ──────────────────────────────────────────

/** Reset rate limit store — for test isolation only */
export function _resetRateLimitStore(): void {
  rateLimitStore.clear()
}
