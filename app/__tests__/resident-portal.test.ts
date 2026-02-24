import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

const PORTAL_URL = "https://mountvernonlofts.residentportal.com/auth"

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

describe("Resident portal link in footer", () => {
  it("footerBottomLinks includes a RESIDENT PORTAL entry", () => {
    const source = readFile("app/config/navigation.ts")
    expect(source).toMatch(/RESIDENT\s*PORTAL/i)
  })

  it("resident portal entry links to the correct URL", () => {
    const source = readFile("app/config/navigation.ts")
    expect(source).toContain(PORTAL_URL)
  })

  it("resident portal entry is marked as external", () => {
    const source = readFile("app/config/navigation.ts")
    // The portal URL and external: true should be in the same footerBottomLinks block
    const bottomLinksMatch = source.match(/footerBottomLinks[\s\S]*?(?=\nexport|\n\/\/\s*\w)/)
    expect(bottomLinksMatch).not.toBeNull()
    const bottomLinksBlock = bottomLinksMatch![0]
    expect(bottomLinksBlock).toContain(PORTAL_URL)
    expect(bottomLinksBlock).toContain("external: true")
  })

  it("Footer.tsx renders footerBottomLinks", () => {
    const source = readFile("app/components/Footer.tsx")
    expect(source).toContain("footerBottomLinks")
  })
})

describe("Resident portal link in mobile menu", () => {
  it("MobileMenu contains the resident portal URL", () => {
    const source = readFile("app/components/navigation/MobileMenu.tsx")
    expect(source).toContain(PORTAL_URL)
  })
})
