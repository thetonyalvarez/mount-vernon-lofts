import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

/**
 * Source-level static analysis tests that verify the open house feature
 * is properly wired up. Hardcoded event entries (broker-feb-2026, public
 * Feb 27 / Mar 1) were replaced by a recurring daily schedule in commit
 * f482cb2, so the assertions now target the recurring schedule shape.
 */

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

describe("Open House event data — recurring daily schedule", () => {
  it("exports RECURRING_SCHEDULE with 12 PM start and 5 PM end", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toMatch(/export\s+const\s+RECURRING_SCHEDULE/)
    expect(source).toContain('startTime: "12:00 PM"')
    expect(source).toContain('endTime: "5:00 PM"')
  })

  it("recurring schedule effective from 2026-03-19", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain('effectiveFrom: "2026-03-19"')
  })

  it("recurring schedule runs indefinitely (effectiveUntil null)", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toMatch(/effectiveUntil:\s*null/)
  })
})

describe("OpenHouseBanner is mounted in layout via wrapper", () => {
  it("layout.tsx imports OpenHouseBannerWrapper", () => {
    const source = readFile("app/layout.tsx")
    expect(source).toContain("OpenHouseBannerWrapper")
    expect(source).toMatch(/import.*OpenHouseBannerWrapper/)
  })

  it("layout.tsx renders <OpenHouseBannerWrapper", () => {
    const source = readFile("app/layout.tsx")
    expect(source).toContain("<OpenHouseBannerWrapper")
  })
})

describe("Open House page — dynamic event content", () => {
  it("uses hasActiveEvents guard with fallback UI instead of redirect", () => {
    const source = readFile("app/open-house/page.tsx")
    // Page should conditionally show fallback when no active events
    expect(source).toContain("hasActiveEvents")
    // Should show a 'coming soon' fallback instead of redirecting
    expect(source).toContain("ComingSoonFallback")
    // Should NOT redirect to homepage
    expect(source).not.toMatch(/redirect\s*\(\s*["']\/["']\s*\)/)
  })

  it("renders event details dynamically from getActiveEvents", () => {
    const source = readFile("app/open-house/page.tsx")
    expect(source).toContain("getActiveEvents")
    // Should use event data for title/date/time, not hardcoded strings
    expect(source).toContain("event.title")
    expect(source).toContain("event.date")
    expect(source).toContain("event.startTime")
    expect(source).toContain("event.endTime")
  })

  it("conditionally shows broker commission banner only for broker events", () => {
    const source = readFile("app/open-house/page.tsx")
    // Commission banner should be conditional on broker event type
    expect(source).toContain("isBroker")
    expect(source).toMatch(/4%.*[Cc]ommission/)
  })

  it("has event label helper for broker vs public", () => {
    const source = readFile("app/open-house/page.tsx")
    expect(source).toContain("Broker Open House")
    expect(source).toContain("Open House")
    expect(source).toContain("getEventLabel")
  })

  it("contains Jeffrey Winans contact", () => {
    const source = readFile("app/open-house/page.tsx")
    expect(source).toContain("Jeffrey Winans")
  })

  it("contains DataLayerEvent for tracking", () => {
    const source = readFile("app/open-house/page.tsx")
    expect(source).toContain("DataLayerEvent")
  })
})

describe("Open House event data — recurring schedule shape", () => {
  it("recurring schedule generates events with eventType 'public'", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain("eventType: 'public'")
  })

  it("recurring schedule featured units match the canonical set", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toMatch(/featuredUnits:\s*\['1-7',\s*'1-8',\s*'1-11',\s*'1-26'\]/)
  })
})
