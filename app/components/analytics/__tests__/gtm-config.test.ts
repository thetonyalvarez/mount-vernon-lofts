import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import * as fs from "fs"
import * as path from "path"

const EXPECTED_GTM_ID = "GTM-TR6CJ9PL"

describe("GTM configuration", () => {
  beforeEach(() => {
    // Set the env var that GTMManager reads at construction time
    vi.stubEnv("NEXT_PUBLIC_GTM_CONTAINER_ID", EXPECTED_GTM_ID)
    vi.stubEnv("NEXT_PUBLIC_GTM_ENABLED", "true")
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it("GTMManager uses the correct container ID", async () => {
    // Re-import to pick up the stubbed env
    const { gtm } = await import("@/lib/gtm")
    const config = gtm.getConfig()
    expect(config?.containerId).toBe(EXPECTED_GTM_ID)
  })

  it("getScriptUrl() contains the correct container ID", async () => {
    const { gtm } = await import("@/lib/gtm")
    const url = gtm.getScriptUrl()
    expect(url).toContain(EXPECTED_GTM_ID)
    expect(url).toContain("https://www.googletagmanager.com/gtm.js")
  })

  it("getNoScriptUrl() contains the correct container ID", async () => {
    const { gtm } = await import("@/lib/gtm")
    const url = gtm.getNoScriptUrl()
    expect(url).toContain(EXPECTED_GTM_ID)
    expect(url).toContain("https://www.googletagmanager.com/ns.html")
  })
})

describe("GTM container ID in .env.local", () => {
  it(".env.local contains the correct GTM container ID", () => {
    const envPath = path.resolve(__dirname, "../../../../.env.local")
    const envContent = fs.readFileSync(envPath, "utf-8")

    expect(envContent).toContain(`NEXT_PUBLIC_GTM_CONTAINER_ID=${EXPECTED_GTM_ID}`)
    expect(envContent).not.toContain("GTM-57T84H85")
  })
})

describe("No duplicate GTM mount", () => {
  it("DeferredScripts.tsx does not import or render GoogleTagManager", () => {
    const filePath = path.resolve(__dirname, "../../../../components/DeferredScripts.tsx")
    const source = fs.readFileSync(filePath, "utf-8")

    // Should NOT contain any GoogleTagManager reference
    expect(source).not.toContain("GoogleTagManager")
  })
})
