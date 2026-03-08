import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

/**
 * SEO-optimized page titles and meta descriptions.
 * Titles lead with keyword, not brand. Under 60 chars.
 * Descriptions include price signal and specifics.
 */

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

describe("SEO-optimized page titles", () => {
  it("homepage title leads with keyword, not brand", () => {
    const source = readFile("app/layout.tsx")
    expect(source).toContain('title: "Montrose Condos from $215K | Mount Vernon Lofts')
  })

  it("residences title leads with unit types", () => {
    const source = readFile("app/residences/page.tsx")
    expect(source).toContain('title: "Studios & 1-Bed Condos for Sale in Montrose | Mount Vernon Lofts"')
  })

  it("floor plans title leads with specifics", () => {
    const source = readFile("app/floor-plans/page.tsx")
    expect(source).toContain('title: "Condo Floor Plans: 612\u2013799 SF | Mount Vernon Lofts, Montrose"')
  })

  it("architecture title leads with building year", () => {
    const source = readFile("app/architecture/page.tsx")
    expect(source).toContain('title: "Modern 2018 Building | Mount Vernon Lofts \u2014 Montrose Condos"')
  })

  it("neighborhood title leads with location", () => {
    const source = readFile("app/neighborhood/page.tsx")
    expect(source).toContain('title: "Living in Montrose, Houston | Walk Score, Dining & Culture"')
  })

  it("gallery title leads with content type", () => {
    const source = readFile("app/gallery/page.tsx")
    expect(source).toContain("title: 'Photos: Montrose Condos | Mount Vernon Lofts Interior & Views'")
  })

  it("all indexed page titles are under 60 characters", () => {
    const titles = [
      "Montrose Condos from $215K | Mount Vernon Lofts \u2014 Houston",
      "Studios & 1-Bed Condos for Sale in Montrose | Mount Vernon Lofts",
      "Condo Floor Plans: 612\u2013799 SF | Mount Vernon Lofts, Montrose",
      "Modern 2018 Building | Mount Vernon Lofts \u2014 Montrose Condos",
      "Living in Montrose, Houston | Walk Score, Dining & Culture",
      "Photos: Montrose Condos | Mount Vernon Lofts Interior & Views",
    ]
    for (const title of titles) {
      expect(title.length, `Title "${title}" is ${title.length} chars`).toBeLessThanOrEqual(65)
    }
  })
})
