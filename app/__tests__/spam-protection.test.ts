import { describe, it, expect, beforeEach } from "vitest"
import * as fs from "fs"
import * as path from "path"

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

const fileExists = (relativePath: string): boolean => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.existsSync(filePath)
}

// ─── Spam Protection Module: Static ──────────────────────────

describe("Spam protection module: existence and exports", () => {
  it("lib/spam-protection.ts exists", () => {
    expect(fileExists("lib/spam-protection.ts")).toBe(true)
  })

  it("exports validateHoneypot function", () => {
    expect(fileExists("lib/spam-protection.ts")).toBe(true)
    const source = readFile("lib/spam-protection.ts")
    expect(source).toMatch(/export\s+function\s+validateHoneypot/)
  })

  it("exports validateSubmissionTime function", () => {
    expect(fileExists("lib/spam-protection.ts")).toBe(true)
    const source = readFile("lib/spam-protection.ts")
    expect(source).toMatch(/export\s+function\s+validateSubmissionTime/)
  })

  it("exports checkRateLimit function", () => {
    expect(fileExists("lib/spam-protection.ts")).toBe(true)
    const source = readFile("lib/spam-protection.ts")
    expect(source).toMatch(/export\s+function\s+checkRateLimit/)
  })

  it("exports getClientIp function", () => {
    expect(fileExists("lib/spam-protection.ts")).toBe(true)
    const source = readFile("lib/spam-protection.ts")
    expect(source).toMatch(/export\s+function\s+getClientIp/)
  })

  it("exports SPAM_FIELD_NAME constant", () => {
    expect(fileExists("lib/spam-protection.ts")).toBe(true)
    const source = readFile("lib/spam-protection.ts")
    expect(source).toMatch(/export\s+const\s+SPAM_FIELD_NAME/)
  })
})

// ─── Honeypot Validation Logic ───────────────────────────────

describe("Honeypot validation: detects bot-filled hidden fields", () => {
  it("returns true (spam) when value is a non-empty string", async () => {
    const { validateHoneypot } = await import("@/lib/spam-protection")
    expect(validateHoneypot("http://spam.com")).toBe(true)
  })

  it("returns false (not spam) when value is empty string", async () => {
    const { validateHoneypot } = await import("@/lib/spam-protection")
    expect(validateHoneypot("")).toBe(false)
  })

  it("returns false (not spam) when value is undefined", async () => {
    const { validateHoneypot } = await import("@/lib/spam-protection")
    expect(validateHoneypot(undefined)).toBe(false)
  })

  it("returns false (not spam) when value is null", async () => {
    const { validateHoneypot } = await import("@/lib/spam-protection")
    expect(validateHoneypot(null)).toBe(false)
  })
})

// ─── Time-Based Detection Logic ──────────────────────────────

describe("Time-based detection: catches instant bot submissions", () => {
  it("returns true (spam) when elapsed time is under 3 seconds", async () => {
    const { validateSubmissionTime } = await import("@/lib/spam-protection")
    expect(validateSubmissionTime(Date.now() - 1000)).toBe(true)
  })

  it("returns true (spam) when elapsed time is 0", async () => {
    const { validateSubmissionTime } = await import("@/lib/spam-protection")
    expect(validateSubmissionTime(Date.now())).toBe(true)
  })

  it("returns false (not spam) when elapsed time exceeds 3 seconds", async () => {
    const { validateSubmissionTime } = await import("@/lib/spam-protection")
    expect(validateSubmissionTime(Date.now() - 5000)).toBe(false)
  })

  it("returns true (spam) when timestamp is in the future", async () => {
    const { validateSubmissionTime } = await import("@/lib/spam-protection")
    expect(validateSubmissionTime(Date.now() + 60000)).toBe(true)
  })
})

// ─── Rate Limiting Logic ─────────────────────────────────────

describe("Rate limiting: blocks IPs exceeding 5 requests per 15 min", () => {
  beforeEach(async () => {
    const { _resetRateLimitStore } = await import("@/lib/spam-protection")
    _resetRateLimitStore()
  })

  it("allows first request from a new IP", async () => {
    const { checkRateLimit } = await import("@/lib/spam-protection")
    expect(checkRateLimit("10.0.0.1").allowed).toBe(true)
  })

  it("allows 5 requests from the same IP", async () => {
    const { checkRateLimit } = await import("@/lib/spam-protection")
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit("10.0.0.2").allowed).toBe(true)
    }
  })

  it("blocks the 6th request from the same IP", async () => {
    const { checkRateLimit } = await import("@/lib/spam-protection")
    for (let i = 0; i < 5; i++) {
      checkRateLimit("10.0.0.3")
    }
    expect(checkRateLimit("10.0.0.3").allowed).toBe(false)
  })

  it("tracks remaining count correctly", async () => {
    const { checkRateLimit } = await import("@/lib/spam-protection")
    checkRateLimit("10.0.0.4")
    checkRateLimit("10.0.0.4")
    const result = checkRateLimit("10.0.0.4")
    expect(result.remaining).toBe(2)
  })

  it("allows different IPs independently", async () => {
    const { checkRateLimit } = await import("@/lib/spam-protection")
    for (let i = 0; i < 5; i++) {
      checkRateLimit("10.0.0.5")
    }
    expect(checkRateLimit("10.0.0.5").allowed).toBe(false)
    expect(checkRateLimit("10.0.0.6").allowed).toBe(true)
  })
})

// ─── Honeypot Field in All Forms ─────────────────────────────

describe("Honeypot field: present in all 5 form components", () => {
  it("ContactFormSection includes honeypot field", () => {
    const source = readFile("app/home/sections/ContactFormSection.tsx")
    expect(source).toContain('name="website"')
  })

  it("BrochureForm includes honeypot field", () => {
    const source = readFile("app/brochure/components/BrochureForm.tsx")
    expect(source).toContain('name="website"')
  })

  it("FloorPlanForm includes honeypot field", () => {
    const source = readFile("app/floor-plans/components/FloorPlanForm.tsx")
    expect(source).toContain('name="website"')
  })

  it("SignInForm includes honeypot field", () => {
    const source = readFile("app/open-house/SignInForm.tsx")
    expect(source).toContain('name="website"')
  })

  it("FeedbackForm includes honeypot field", () => {
    const source = readFile("app/open-house/FeedbackForm.tsx")
    expect(source).toContain('name="website"')
  })
})

// ─── Render Timestamp in All Forms ───────────────────────────

describe("Render timestamp: captured in all 5 form components", () => {
  it("ContactFormSection captures _renderTimestamp", () => {
    const source = readFile("app/home/sections/ContactFormSection.tsx")
    expect(source).toContain("_renderTimestamp")
  })

  it("BrochureForm captures _renderTimestamp", () => {
    const source = readFile("app/brochure/components/BrochureForm.tsx")
    expect(source).toContain("_renderTimestamp")
  })

  it("FloorPlanForm captures _renderTimestamp", () => {
    const source = readFile("app/floor-plans/components/FloorPlanForm.tsx")
    expect(source).toContain("_renderTimestamp")
  })

  it("SignInForm captures _renderTimestamp", () => {
    const source = readFile("app/open-house/SignInForm.tsx")
    expect(source).toContain("_renderTimestamp")
  })

  it("FeedbackForm captures _renderTimestamp", () => {
    const source = readFile("app/open-house/FeedbackForm.tsx")
    expect(source).toContain("_renderTimestamp")
  })
})

// ─── API Routes Import Spam Protection ───────────────────────

describe("API routes: import spam-protection module", () => {
  it("contact route imports spam-protection", () => {
    const source = readFile("app/api/contact/route.ts")
    expect(source).toMatch(/from\s+['"]@\/lib\/spam-protection['"]/)
  })

  it("brochure-download route imports spam-protection", () => {
    const source = readFile("app/api/brochure-download/route.ts")
    expect(source).toMatch(/from\s+['"]@\/lib\/spam-protection['"]/)
  })

  it("floor-plans route imports spam-protection", () => {
    const source = readFile("app/api/floor-plans/route.ts")
    expect(source).toMatch(/from\s+['"]@\/lib\/spam-protection['"]/)
  })

  it("open-house sign-in route imports spam-protection", () => {
    const source = readFile("app/api/open-house/sign-in/route.ts")
    expect(source).toMatch(/from\s+['"]@\/lib\/spam-protection['"]/)
  })

  it("open-house feedback route imports spam-protection", () => {
    const source = readFile("app/api/open-house/feedback/route.ts")
    expect(source).toMatch(/from\s+['"]@\/lib\/spam-protection['"]/)
  })
})

// ─── API Routes Call Honeypot Check ──────────────────────────

describe("API routes: call validateHoneypot before processing", () => {
  it("contact route calls validateHoneypot", () => {
    const source = readFile("app/api/contact/route.ts")
    expect(source).toContain("validateHoneypot")
  })

  it("brochure-download route calls validateHoneypot", () => {
    const source = readFile("app/api/brochure-download/route.ts")
    expect(source).toContain("validateHoneypot")
  })

  it("floor-plans route calls validateHoneypot", () => {
    const source = readFile("app/api/floor-plans/route.ts")
    expect(source).toContain("validateHoneypot")
  })

  it("open-house sign-in route calls validateHoneypot", () => {
    const source = readFile("app/api/open-house/sign-in/route.ts")
    expect(source).toContain("validateHoneypot")
  })

  it("open-house feedback route calls validateHoneypot", () => {
    const source = readFile("app/api/open-house/feedback/route.ts")
    expect(source).toContain("validateHoneypot")
  })
})

// ─── API Routes Call Time Validation ─────────────────────────

describe("API routes: call validateSubmissionTime before processing", () => {
  it("contact route calls validateSubmissionTime", () => {
    const source = readFile("app/api/contact/route.ts")
    expect(source).toContain("validateSubmissionTime")
  })

  it("brochure-download route calls validateSubmissionTime", () => {
    const source = readFile("app/api/brochure-download/route.ts")
    expect(source).toContain("validateSubmissionTime")
  })

  it("floor-plans route calls validateSubmissionTime", () => {
    const source = readFile("app/api/floor-plans/route.ts")
    expect(source).toContain("validateSubmissionTime")
  })

  it("open-house sign-in route calls validateSubmissionTime", () => {
    const source = readFile("app/api/open-house/sign-in/route.ts")
    expect(source).toContain("validateSubmissionTime")
  })

  it("open-house feedback route calls validateSubmissionTime", () => {
    const source = readFile("app/api/open-house/feedback/route.ts")
    expect(source).toContain("validateSubmissionTime")
  })
})

// ─── API Routes Call Rate Limiting ───────────────────────────

describe("API routes: call checkRateLimit before processing", () => {
  it("contact route calls checkRateLimit", () => {
    const source = readFile("app/api/contact/route.ts")
    expect(source).toContain("checkRateLimit")
  })

  it("brochure-download route calls checkRateLimit", () => {
    const source = readFile("app/api/brochure-download/route.ts")
    expect(source).toContain("checkRateLimit")
  })

  it("floor-plans route calls checkRateLimit", () => {
    const source = readFile("app/api/floor-plans/route.ts")
    expect(source).toContain("checkRateLimit")
  })

  it("open-house sign-in route calls checkRateLimit", () => {
    const source = readFile("app/api/open-house/sign-in/route.ts")
    expect(source).toContain("checkRateLimit")
  })

  it("open-house feedback route calls checkRateLimit", () => {
    const source = readFile("app/api/open-house/feedback/route.ts")
    expect(source).toContain("checkRateLimit")
  })
})
