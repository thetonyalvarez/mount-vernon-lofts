import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

const PUBLIC_DIR = path.resolve(__dirname, "../../../../public")

/**
 * Verify that every image referenced in homepage section components
 * actually exists in the public directory.
 *
 * These are local image paths (starting with /) used in src attributes,
 * getImageUrl() calls, and ParallaxImage/Image components.
 */

function fileExists(publicPath: string): boolean {
  const fullPath = path.join(PUBLIC_DIR, publicPath)
  return fs.existsSync(fullPath)
}

describe("Homepage image references", () => {
  describe("HeroSection", () => {
    it("hero background image exists", () => {
      expect(fileExists("/images/unit-8_1-bed/8-5.jpg")).toBe(true)
    })
  })

  describe("ArchitectureSection", () => {
    it("living room image exists", () => {
      expect(fileExists("/images/unit-8_1-bed/8-4.jpg")).toBe(true)
    })
  })

  describe("AmenitiesSection", () => {
    it("kitchen image exists", () => {
      expect(fileExists("/images/unit-8_1-bed/8-6.jpg")).toBe(true)
    })
  })

  describe("ExclusivitySection", () => {
    it("kitchen image exists", () => {
      expect(fileExists("/images/unit-9_1-bed/9-3.jpg")).toBe(true)
    })

    it("bathroom image exists", () => {
      expect(fileExists("/images/unit-8_1-bed/8-8.jpg")).toBe(true)
    })
  })

  describe("LifestyleSection", () => {
    it("balcony image exists", () => {
      expect(fileExists("/images/unit-26_studio/26-12.jpg")).toBe(true)
    })
  })

  describe("Footer", () => {
    it("logo exists", () => {
      expect(fileExists("/logos/logo_v_white.svg")).toBe(true)
    })
  })
})
