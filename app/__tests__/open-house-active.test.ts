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

describe("OpenHouseBanner is mounted in layout", () => {
  it("layout.tsx imports OpenHouseBanner", () => {
    const source = readFile("app/layout.tsx")
    expect(source).toContain("OpenHouseBanner")
    expect(source).toMatch(/import.*OpenHouseBanner/)
  })

  it("layout.tsx renders <OpenHouseBanner", () => {
    const source = readFile("app/layout.tsx")
    expect(source).toContain("<OpenHouseBanner")
  })
})

describe("Open House page — broker content", () => {
  it("does NOT redirect to homepage", () => {
    const source = readFile("app/open-house/page.tsx")
    expect(source).not.toContain('redirect("/")')
    expect(source).not.toContain("redirect('/')")
  })

  it("contains Broker Open House title", () => {
    const source = readFile("app/open-house/page.tsx")
    expect(source).toContain("Broker Open House")
  })

  it("contains 4% buy-side commission detail", () => {
    const source = readFile("app/open-house/page.tsx")
    expect(source).toMatch(/4%.*[Cc]ommission/)
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
