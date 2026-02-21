import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

/**
 * RED-GREEN TDD tests for:
 * 1. Nav scroll behavior — nav moves to top-0 when banner scrolls out of viewport
 * 2. Open house page hero image for visual appeal
 */

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

describe("Nav tracks banner scroll position (not just existence)", () => {
  it("OpenHouseBannerWrapper uses a ref to track the banner element", () => {
    const source = readFile("components/OpenHouseBannerWrapper.tsx")
    // Must use a ref to measure the banner's position in viewport
    expect(source).toContain("useRef")
    expect(source).toMatch(/bannerRef/)
  })

  it("OpenHouseBannerWrapper tracks whether the banner is in the viewport", () => {
    const source = readFile("components/OpenHouseBannerWrapper.tsx")
    // Should track scroll position or use IntersectionObserver
    // to know when the banner has scrolled out of view
    expect(source).toMatch(/bannerInView|isIntersecting|scrollY|getBoundingClientRect/)
  })

  it("Navigation receives bannerInView (not just bannerVisible) for scroll-aware offset", () => {
    const source = readFile("app/components/navigation/Navigation.tsx")
    // Nav should respond to whether the banner is actually in the viewport
    expect(source).toContain("bannerInView")
  })

  it("NavigationWrapper passes bannerInView to Navigation", () => {
    const source = readFile("app/components/navigation/NavigationWrapper.tsx")
    expect(source).toContain("bannerInView")
  })

  it("Navigation uses top-0 when banner is not in view", () => {
    const source = readFile("app/components/navigation/Navigation.tsx")
    // Should have conditional offset based on bannerInView
    expect(source).toMatch(/bannerInView.*top-/)
  })

  it("NavigationProps includes bannerInView", () => {
    const source = readFile("app/types/index.ts")
    expect(source).toContain("bannerInView")
  })
})

describe("Open house page has a hero image", () => {
  it("open house page contains an image element or hero section", () => {
    const source = readFile("app/open-house/page.tsx")
    // Should have an image for the hero — either Next Image or background image
    expect(source).toMatch(/Image|bg-\[url|background-image|fallbackImage/)
  })

  it("open house page references an exterior or property photo", () => {
    const source = readFile("app/open-house/page.tsx")
    // Should use the exterior building photo for the hero
    expect(source).toMatch(/exterior|gallery|images\//)
  })

  it("open house page hero has sufficient height for visual impact", () => {
    const source = readFile("app/open-house/page.tsx")
    // Hero should have meaningful height — h-[60vh], h-[50vh], min-h-, etc.
    expect(source).toMatch(/h-\[\d+vh\]|h-screen|min-h-\[/)
  })
})
