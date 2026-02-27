import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

/**
 * RED-GREEN TDD tests for Broker Open House activation (Feb 26, 2026)
 * These are source-level static analysis tests that verify the open house
 * feature is properly activated with the correct event data.
 */

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

describe("Open House event data — Broker Open House Feb 26", () => {
  it("contains event with id broker-feb-2026", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain('"broker-feb-2026"')
  })

  it("contains startsAt for Feb 26 at 12pm CST", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain("2026-02-26T12:00:00-06:00")
  })

  it("contains expiresAt for Feb 26 at 2pm CST", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain("2026-02-26T14:00:00-06:00")
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

describe("Open House event data — Public Open Houses Feb 27 & Mar 1", () => {
  it("contains public event for Feb 27, 2026", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain('"public-feb27-2026"')
    expect(source).toContain("2026-02-27T12:00:00-06:00")
    expect(source).toContain("2026-02-27T17:00:00-06:00")
  })

  it("contains public event for Mar 1, 2026", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain('"public-mar1-2026"')
    expect(source).toContain("2026-03-01T12:00:00-06:00")
    expect(source).toContain("2026-03-01T17:00:00-06:00")
  })

  it("public events have eventType 'public'", () => {
    const source = readFile("app/config/open-house-data.ts")
    expect(source).toContain("eventType: 'public'")
  })

  it("public events use same featured units as broker event", () => {
    const source = readFile("app/config/open-house-data.ts")
    // All events reference the same featured units
    const matches = source.match(/featuredUnits:\s*\['1-7',\s*'1-8',\s*'1-11',\s*'1-26'\]/g)
    expect(matches).not.toBeNull()
    expect(matches!.length).toBeGreaterThanOrEqual(3) // broker + 2 public
  })
})
