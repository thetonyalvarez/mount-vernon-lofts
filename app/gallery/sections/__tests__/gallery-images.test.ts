import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"
import { galleryCategories, galleryImages } from "@/app/config/gallery-data"

const PUBLIC_DIR = path.resolve(__dirname, "../../../../public")

function fileExists(publicPath: string): boolean {
  const fullPath = path.join(PUBLIC_DIR, publicPath)
  return fs.existsSync(fullPath)
}

describe("Gallery page", () => {
  describe("galleryCategories", () => {
    it("has exactly 3 categories", () => {
      expect(galleryCategories).toHaveLength(3)
    })

    it("has the correct category ids: all, studios, one-bedrooms", () => {
      const ids = galleryCategories.map(c => c.id)
      expect(ids).toEqual(["all", "studios", "one-bedrooms"])
    })
  })

  describe("galleryImages", () => {
    it("every image file exists on disk", () => {
      for (const image of galleryImages) {
        expect(fileExists(image.src), `Missing: ${image.src}`).toBe(true)
      }
    })

    it("every image has a valid category (studios or one-bedrooms)", () => {
      const validCategories = ["studios", "one-bedrooms"]
      for (const image of galleryImages) {
        expect(validCategories, `Invalid category for ${image.id}: ${image.category}`).toContain(image.category)
      }
    })

    it("no images reference old /images/gallery/ paths", () => {
      for (const image of galleryImages) {
        expect(image.src).not.toContain("/images/gallery/")
      }
    })

    it("has at least 20 images", () => {
      expect(galleryImages.length).toBeGreaterThanOrEqual(20)
    })

    it("has images in both categories", () => {
      const studios = galleryImages.filter(i => i.category === "studios")
      const oneBeds = galleryImages.filter(i => i.category === "one-bedrooms")
      expect(studios.length).toBeGreaterThan(0)
      expect(oneBeds.length).toBeGreaterThan(0)
    })
  })
})
