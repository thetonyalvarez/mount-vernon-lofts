import { describe, it, expect } from "vitest"
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

// ─── Data Model ───────────────────────────────────────────────

describe("Open house data model: eventType, featuredUnits, helpers", () => {
  it("OpenHouseEvent interface includes eventType field", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toMatch(/eventType.*'public'\s*\|\s*'broker'/)
  })

  it("OpenHouseEvent interface includes featuredUnits field", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain("featuredUnits")
  })

  it("broker-feb-2026 event has eventType 'broker'", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain("eventType: 'broker'")
  })

  it("broker-feb-2026 event has featuredUnits with unit IDs", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toMatch(/featuredUnits:\s*\[/)
    expect(source).toContain("1-8")
    expect(source).toContain("1-11")
    expect(source).toContain("1-26")
  })

  it("exports getActiveEventByType function", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toMatch(/export\s+function\s+getActiveEventByType/)
  })

  it("getActiveEventByType returns broker event", async () => {
    const { getActiveEventByType } = await import("@/app/config/open-house-data")
    const event = getActiveEventByType("broker")
    expect(event).not.toBeNull()
    expect(event!.eventType).toBe("broker")
  })

  it("getActiveEventByType returns null for type with no active events", async () => {
    const { getActiveEventByType } = await import("@/app/config/open-house-data")
    // Currently no public events configured
    expect(getActiveEventByType("public")).toBeNull()
  })
})

// ─── Webhook Types ────────────────────────────────────────────

describe("Webhook types: open house form types", () => {
  it("defines OpenHouseSignInData interface", () => {
    const source = readFile("lib/types/webhook.ts")
    expect(source).toContain("OpenHouseSignInData")
  })

  it("defines OpenHouseFeedbackData interface", () => {
    const source = readFile("lib/types/webhook.ts")
    expect(source).toContain("OpenHouseFeedbackData")
  })

  it("contains broker and public sign-in form types", () => {
    const source = readFile("lib/types/webhook.ts")
    expect(source).toContain("broker_open_house_signin")
    expect(source).toContain("public_open_house_signin")
  })

  it("contains broker and public feedback form types", () => {
    const source = readFile("lib/types/webhook.ts")
    expect(source).toContain("broker_open_house_feedback")
    expect(source).toContain("public_open_house_feedback")
  })
})

// ─── Evergreen Routes ───────────────────────────────────────────

describe("Evergreen open house routes: broker and public", () => {
  it("broker-sign-in page exists and uses getActiveEventByType", () => {
    const source = readFile("app/open-house/broker-sign-in/page.tsx")
    expect(source).toContain("getActiveEventByType")
    expect(source).toContain('"broker"')
    expect(source).toContain("notFound")
  })

  it("sign-in (public) page exists and uses getActiveEventByType", () => {
    const source = readFile("app/open-house/sign-in/page.tsx")
    expect(source).toContain("getActiveEventByType")
    expect(source).toContain('"public"')
    expect(source).toContain("notFound")
  })

  it("broker-feedback page exists and uses getActiveEventByType", () => {
    const source = readFile("app/open-house/broker-feedback/page.tsx")
    expect(source).toContain("getActiveEventByType")
    expect(source).toContain('"broker"')
  })

  it("feedback (public) page exists and uses getActiveEventByType", () => {
    const source = readFile("app/open-house/feedback/page.tsx")
    expect(source).toContain("getActiveEventByType")
    expect(source).toContain('"public"')
  })

  it("[date] dynamic segment no longer exists", () => {
    expect(fileExists("app/open-house/[date]")).toBe(false)
  })
})

// ─── Shared Components ──────────────────────────────────────────

describe("Shared form components: SignInForm and FeedbackForm", () => {
  it("SignInForm.tsx exists at open-house level with all fields", () => {
    const source = readFile("app/open-house/SignInForm.tsx")
    expect(source).toContain("name")
    expect(source).toContain("brokerage")
    expect(source).toContain("email")
    expect(source).toContain("phone")
    expect(source).toContain("visitedBefore")
    expect(source).toContain("hasActiveBuyer")
  })

  it("SignInForm.tsx POSTs to /api/open-house/sign-in", () => {
    const source = readFile("app/open-house/SignInForm.tsx")
    expect(source).toContain("/api/open-house/sign-in")
  })

  it("SignInForm.tsx sends audience-specific formType (broker vs public)", () => {
    const source = readFile("app/open-house/SignInForm.tsx")
    expect(source).toContain("broker_open_house_signin")
    expect(source).toContain("public_open_house_signin")
  })

  it("SignInForm.tsx conditionally shows brokerage for broker events only", () => {
    const source = readFile("app/open-house/SignInForm.tsx")
    expect(source).toContain("isBroker")
  })

  it("FeedbackForm.tsx exists at open-house level with all fields", () => {
    const source = readFile("app/open-house/FeedbackForm.tsx")
    expect(source).toContain("standoutUnits")
    expect(source).toContain("likedMost")
    expect(source).toContain("buyerConcerns")
    expect(source).toContain("pricingComparison")
    expect(source).toContain("likelihoodToBring")
    expect(source).toContain("additionalComments")
  })

  it("FeedbackForm.tsx reads email from search params", () => {
    const source = readFile("app/open-house/FeedbackForm.tsx")
    expect(source).toMatch(/searchParams|useSearchParams/)
  })

  it("FeedbackForm.tsx POSTs to /api/open-house/feedback", () => {
    const source = readFile("app/open-house/FeedbackForm.tsx")
    expect(source).toContain("/api/open-house/feedback")
  })
})

// ─── Source URL Tracking ────────────────────────────────────────

describe("Source URL: forms pass signup page URL to webhook", () => {
  it("SignInForm captures window.location.href as sourceUrl", () => {
    const source = readFile("app/open-house/SignInForm.tsx")
    expect(source).toContain("sourceUrl")
    expect(source).toMatch(/window\.location\.href/)
  })

  it("FeedbackForm captures window.location.href as sourceUrl", () => {
    const source = readFile("app/open-house/FeedbackForm.tsx")
    expect(source).toContain("sourceUrl")
    expect(source).toMatch(/window\.location\.href/)
  })

  it("sign-in API route forwards sourceUrl in webhook payload", () => {
    const source = readFile("app/api/open-house/sign-in/route.ts")
    expect(source).toContain("sourceUrl")
  })

  it("feedback API route forwards sourceUrl in webhook payload", () => {
    const source = readFile("app/api/open-house/feedback/route.ts")
    expect(source).toContain("sourceUrl")
  })
})

// ─── Bare Layout (Middleware) ───────────────────────────────────

describe("Bare layout: middleware strips chrome for form pages", () => {
  it("middleware sets x-bare-layout header for form routes", () => {
    const source = readFile("middleware.ts")
    expect(source).toContain("x-bare-layout")
    expect(source).toContain("sign-in")
    expect(source).toContain("feedback")
  })

  it("root layout checks x-bare-layout header", () => {
    const source = readFile("app/layout.tsx")
    expect(source).toContain("x-bare-layout")
    expect(source).toContain("isBareLayout")
  })
})

// ─── API Routes ───────────────────────────────────────────────

describe("API routes: sign-in and feedback", () => {
  it("sign-in route.ts exists and uses eventMeta.formType", () => {
    const source = readFile("app/api/open-house/sign-in/route.ts")
    expect(source).toContain("eventMeta.formType")
  })

  it("sign-in route.ts uses CONTACT_WEBHOOK_URL", () => {
    const source = readFile("app/api/open-house/sign-in/route.ts")
    expect(source).toContain("CONTACT_WEBHOOK_URL")
  })

  it("feedback route.ts exists and uses eventMeta.formType", () => {
    const source = readFile("app/api/open-house/feedback/route.ts")
    expect(source).toContain("eventMeta.formType")
  })

  it("feedback route.ts uses CONTACT_WEBHOOK_URL", () => {
    const source = readFile("app/api/open-house/feedback/route.ts")
    expect(source).toContain("CONTACT_WEBHOOK_URL")
  })
})
