import { describe, it, expect } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

const PUBLIC_DIR = path.resolve(__dirname, '../../../../public')
const MENU_FILE = path.resolve(__dirname, '../MobileMenu.tsx')

function fileExists(publicPath: string): boolean {
  const cleanPath = publicPath.startsWith('/') ? publicPath : `/${publicPath}`
  return fs.existsSync(path.join(PUBLIC_DIR, cleanPath))
}

describe('Navigation menu image', () => {
  it('menu panel image file exists in /public', () => {
    // The image shown in the left panel of the expanded menu must exist locally
    expect(fileExists('/images/unit-9_1-bed/9-3.jpg')).toBe(true)
  })

  it('MobileMenu.tsx does NOT reference the old Beverly-era image', () => {
    const source = fs.readFileSync(MENU_FILE, 'utf-8')
    expect(source).not.toContain('middle-section-expanded')
  })

  it('MobileMenu.tsx references the correct replacement image', () => {
    const source = fs.readFileSync(MENU_FILE, 'utf-8')
    expect(source).toContain('/images/unit-9_1-bed/9-3.jpg')
  })
})
