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

describe("Open house data model: eventType and featuredUnits", () => {
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

  it("exports getEventByDate function", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toMatch(/export\s+function\s+getEventByDate/)
  })

  it("getEventByDate returns event for known date", async () => {
    const { getEventByDate } = await import("@/app/config/open-house-data")
    const event = getEventByDate("2026-02-26")
    expect(event).not.toBeNull()
    expect(event!.id).toBe("broker-feb-2026")
  })

  it("getEventByDate returns null for unknown date", async () => {
    const { getEventByDate } = await import("@/app/config/open-house-data")
    expect(getEventByDate("2099-01-01")).toBeNull()
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

  it("contains open_house_signin form type", () => {
    const source = readFile("lib/types/webhook.ts")
    expect(source).toContain("open_house_signin")
  })

  it("contains open_house_feedback form type", () => {
    const source = readFile("lib/types/webhook.ts")
    expect(source).toContain("open_house_feedback")
  })
})

// ─── Layout ───────────────────────────────────────────────────

describe("Open house [date] layout: bare (no nav/footer)", () => {
  it("[date]/layout.tsx exists", () => {
    expect(fileExists("app/open-house/[date]/layout.tsx")).toBe(true)
  })

  it("[date]/layout.tsx does NOT import Navigation or Footer", () => {
    const source = readFile("app/open-house/[date]/layout.tsx")
    expect(source).not.toContain("Navigation")
    expect(source).not.toContain("Footer")
  })
})

// ─── Sign-In Form ─────────────────────────────────────────────

describe("Sign-in form: page and component", () => {
  it("sign-in page.tsx exists and imports getEventByDate", () => {
    const source = readFile("app/open-house/[date]/sign-in/page.tsx")
    expect(source).toContain("getEventByDate")
  })

  it("sign-in page.tsx calls notFound for missing events", () => {
    const source = readFile("app/open-house/[date]/sign-in/page.tsx")
    expect(source).toContain("notFound")
  })

  it("SignInForm.tsx exists and contains all 6 form fields", () => {
    const source = readFile("app/open-house/[date]/sign-in/SignInForm.tsx")
    expect(source).toContain("name")
    expect(source).toContain("brokerage")
    expect(source).toContain("email")
    expect(source).toContain("phone")
    expect(source).toContain("visitedBefore")
    expect(source).toContain("hasActiveBuyer")
  })

  it("SignInForm.tsx POSTs to /api/open-house/sign-in", () => {
    const source = readFile("app/open-house/[date]/sign-in/SignInForm.tsx")
    expect(source).toContain("/api/open-house/sign-in")
  })
})

// ─── Feedback Form ────────────────────────────────────────────

describe("Feedback form: page and component", () => {
  it("feedback page.tsx exists and imports getEventByDate", () => {
    const source = readFile("app/open-house/[date]/feedback/page.tsx")
    expect(source).toContain("getEventByDate")
  })

  it("FeedbackForm.tsx exists and contains all feedback fields", () => {
    const source = readFile("app/open-house/[date]/feedback/FeedbackForm.tsx")
    expect(source).toContain("standoutUnits")
    expect(source).toContain("likedMost")
    expect(source).toContain("buyerConcerns")
    expect(source).toContain("pricingComparison")
    expect(source).toContain("likelihoodToBring")
    expect(source).toContain("additionalComments")
  })

  it("FeedbackForm.tsx reads email from search params", () => {
    const source = readFile("app/open-house/[date]/feedback/FeedbackForm.tsx")
    expect(source).toMatch(/searchParams|useSearchParams/)
  })

  it("FeedbackForm.tsx POSTs to /api/open-house/feedback", () => {
    const source = readFile("app/open-house/[date]/feedback/FeedbackForm.tsx")
    expect(source).toContain("/api/open-house/feedback")
  })
})

// ─── API Routes ───────────────────────────────────────────────

describe("API routes: sign-in and feedback", () => {
  it("sign-in route.ts exists and includes formType", () => {
    const source = readFile("app/api/open-house/sign-in/route.ts")
    expect(source).toContain("open_house_signin")
  })

  it("sign-in route.ts uses CONTACT_WEBHOOK_URL", () => {
    const source = readFile("app/api/open-house/sign-in/route.ts")
    expect(source).toContain("CONTACT_WEBHOOK_URL")
  })

  it("feedback route.ts exists and includes formType", () => {
    const source = readFile("app/api/open-house/feedback/route.ts")
    expect(source).toContain("open_house_feedback")
  })

  it("feedback route.ts uses CONTACT_WEBHOOK_URL", () => {
    const source = readFile("app/api/open-house/feedback/route.ts")
    expect(source).toContain("CONTACT_WEBHOOK_URL")
  })
})
