import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const NAV_FILE = path.resolve(__dirname, '../Navigation.tsx')

describe('Navbar theme on light-background pages', () => {
  const source = fs.readFileSync(NAV_FILE, 'utf-8')

  it('imports usePathname from next/navigation', () => {
    expect(source).toContain('usePathname')
    expect(source).toMatch(/from\s+['"]next\/navigation['"]/)
  })

  it('defines light-background routes including /floor-plans', () => {
    expect(source).toContain("'/floor-plans'")
  })

  it('includes all known light-background routes', () => {
    expect(source).toContain("'/floor-plans'")
    expect(source).toContain("'/thank-you'")
    expect(source).toContain("'/thank-you-floor-plans'")
    expect(source).toContain("'/thank-you-brochure'")
  })

  it('calls usePathname() to detect current route', () => {
    expect(source).toMatch(/usePathname\(\)/)
  })

  it('uses a combined condition (not isScrolled alone) for navbar styles', () => {
    // The old pattern: isScrolled ? "bg-white shadow-md" : "bg-transparent"
    // Should be replaced with showDarkNav (or equivalent combined boolean)
    expect(source).not.toMatch(/isScrolled\s*\?\s*["']bg-white/)
    expect(source).toContain('showDarkNav')
  })
})
