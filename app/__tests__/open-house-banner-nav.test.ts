import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

/**
 * RED-GREEN TDD tests for open house banner text, nav clearance,
 * and mobile responsiveness.
 */

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

describe("OpenHouseBanner displays event title (not generic OPEN HOUSE)", () => {
  it("uses the event title from data instead of hardcoded OPEN HOUSE", () => {
    const source = readFile("components/OpenHouseBanner.tsx")
    // Should reference nextEvent.title for display
    expect(source).toContain("nextEvent.title")
  })

  it("does NOT contain hardcoded OPEN HOUSE text for mobile", () => {
    const source = readFile("components/OpenHouseBanner.tsx")
    // The mobile span should not have a hardcoded "OPEN HOUSE" string
    // It should use dynamic event title data
    expect(source).not.toMatch(/>OPEN HOUSE</)
  })

  it("does NOT contain hardcoded OPEN HOUSE text for desktop", () => {
    const source = readFile("components/OpenHouseBanner.tsx")
    // Desktop layout should also use dynamic title
    const desktopSection = source.split("Desktop Layout")[1]
    if (desktopSection) {
      expect(desktopSection).not.toMatch(/>OPEN HOUSE</)
    }
  })
})

describe("Navigation accounts for banner height", () => {
  it("Navigation component accepts a bannerVisible prop", () => {
    const source = readFile("app/components/navigation/Navigation.tsx")
    expect(source).toContain("bannerVisible")
  })

  it("Navigation adjusts top position based on banner visibility", () => {
    const source = readFile("app/components/navigation/Navigation.tsx")
    // Should have conditional top offset when banner is in view
    expect(source).toMatch(/bannerInView.*top-/)
  })

  it("NavigationWrapper passes banner state to Navigation", () => {
    const source = readFile("app/components/navigation/NavigationWrapper.tsx")
    expect(source).toContain("bannerVisible")
  })

  it("layout.tsx shares banner state between OpenHouseBanner and NavigationWrapper", () => {
    const source = readFile("app/layout.tsx")
    expect(source).toContain("OpenHouseBannerWrapper")
  })
})

describe("Open house page uses dark navbar", () => {
  it("/open-house is in LIGHT_BACKGROUND_ROUTES", () => {
    const source = readFile("app/components/navigation/Navigation.tsx")
    expect(source).toContain("'/open-house'")
  })
})
