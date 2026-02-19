import { describe, it, expect } from "vitest"
import { mainNavLinks, footerNavLinks } from "@/app/config/navigation"

describe("Open House page is hidden from navigation", () => {
  it("mainNavLinks does not contain an Open House link", () => {
    const hrefs = mainNavLinks.map(link => link.href)
    expect(hrefs).not.toContain("/open-house")
  })

  it("footerNavLinks does not contain an Open House link", () => {
    const hrefs = footerNavLinks.map(link => link.href)
    expect(hrefs).not.toContain("/open-house")
  })

  it("mainNavLinks still contains the expected pages", () => {
    const hrefs = mainNavLinks.map(link => link.href)
    expect(hrefs).toContain("/residences")
    expect(hrefs).toContain("/floor-plans")
    expect(hrefs).toContain("/neighborhood")
    expect(hrefs).toContain("/gallery")
  })

  it("footerNavLinks still contains the expected pages", () => {
    const hrefs = footerNavLinks.map(link => link.href)
    expect(hrefs).toContain("/")
    expect(hrefs).toContain("/residences")
    expect(hrefs).toContain("/floor-plans")
    expect(hrefs).toContain("/neighborhood")
    expect(hrefs).toContain("/gallery")
  })
})
