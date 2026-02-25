import { describe, it, expect } from "vitest"
import * as fs from "fs"
import * as path from "path"

const NEW_EMAIL = "info@mtvernonlofts.com"

const readFile = (relativePath: string): string => {
  const filePath = path.join(process.cwd(), relativePath)
  return fs.readFileSync(filePath, "utf-8")
}

describe("Email config: mountvernonlofts@nanproperties.com → info@mtvernonlofts.com", () => {
  it("navigation.ts contactInfo.email uses info@mtvernonlofts.com", () => {
    const source = readFile("app/config/navigation.ts")
    // Match the email field specifically within contactInfo
    const emailMatch = source.match(/contactInfo[\s\S]*?email:\s*"([^"]+)"/)
    expect(emailMatch).not.toBeNull()
    expect(emailMatch![1].toLowerCase()).toBe(NEW_EMAIL)
  })

  it("contact.ts salesEmail uses info@mtvernonlofts.com", () => {
    const source = readFile("app/config/contact.ts")
    expect(source).toContain(NEW_EMAIL)
    expect(source).not.toMatch(/salesEmail.*nanproperties/i)
  })
})
