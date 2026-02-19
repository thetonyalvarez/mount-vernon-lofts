import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

const PUBLIC_DIR = path.resolve(__dirname, "../../../../public")

/**
 * Verify that every image referenced in residences page components
 * actually exists in the public directory.
 */

function fileExists(publicPath: string): boolean {
  const fullPath = path.join(PUBLIC_DIR, publicPath)
  return fs.existsSync(fullPath)
}

describe("Residences page image references", () => {
  describe("page.tsx (hero + OG)", () => {
    it("hero fallback / OG image exists", () => {
      expect(fileExists("/images/unit-9_1-bed/9-3.jpg")).toBe(true)
    })
  })

  describe("TheExperienceSection", () => {
    it("kitchen image exists", () => {
      expect(fileExists("/images/unit-26_studio/26-3.jpg")).toBe(true)
    })

    it("living room image exists", () => {
      expect(fileExists("/images/unit-9_1-bed/9-4.jpg")).toBe(true)
    })
  })

  describe("FeaturesFinishesSection (via config)", () => {
    it("unit features image exists", () => {
      expect(fileExists("/images/unit-9_1-bed/9-5.jpg")).toBe(true)
    })

    it("kitchen & bath image exists", () => {
      expect(fileExists("/images/unit-8_1-bed/8-3.jpg")).toBe(true)
    })

    it("building & community image exists", () => {
      expect(fileExists("/images/unit-8_1-bed/8-7.jpg")).toBe(true)
    })
  })

  describe("PanoramicPerspectivesSection", () => {
    it("interior views image exists", () => {
      expect(fileExists("/images/unit-26_studio/26-1.jpg")).toBe(true)
    })
  })

  describe("HandcraftedLegacySection", () => {
    it("bathroom finishes image exists", () => {
      expect(fileExists("/images/unit-8_1-bed/8-10.jpg")).toBe(true)
    })

    it("closet / built-ins image exists", () => {
      expect(fileExists("/images/unit-8_1-bed/8-9.jpg")).toBe(true)
    })
  })
})
