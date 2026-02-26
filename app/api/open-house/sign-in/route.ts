import { NextRequest, NextResponse } from "next/server"
import { backupManager } from "@/lib/backup-manager"
import { emailFallback } from "@/lib/email-fallback"
import type { FormContactData } from "@/lib/types/webhook"
import type { OpenHouseSignInData, OpenHouseEventMeta } from "@/lib/types/webhook"

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const body = await request.json()
    const { formData, eventMeta } = body as {
      formData: OpenHouseSignInData
      eventMeta: OpenHouseEventMeta
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone) {
      return NextResponse.json({ error: "Name, email, and phone are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Brokerage required for broker events
    if (eventMeta.eventType === "broker" && !formData.brokerage) {
      return NextResponse.json({ error: "Brokerage is required for broker events" }, { status: 400 })
    }

    // Validate radio fields
    if (!["yes", "no"].includes(formData.visitedBefore)) {
      return NextResponse.json({ error: "visitedBefore must be yes or no" }, { status: 400 })
    }
    if (!["yes", "no", "maybe"].includes(formData.hasActiveBuyer)) {
      return NextResponse.json({ error: "hasActiveBuyer must be yes, no, or maybe" }, { status: 400 })
    }

    const submissionId = `signin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Map to FormContactData for backup compatibility
    const backupData: FormContactData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: `[Open House Sign-In] Brokerage: ${formData.brokerage || "N/A"}, Visited Before: ${formData.visitedBefore}, Active Buyer: ${formData.hasActiveBuyer}`,
    }

    await backupManager.storeSubmission(submissionId, backupData, "pending", {
      formType: "open_house_signin",
      eventId: eventMeta.eventId,
      eventType: eventMeta.eventType,
      openHouseData: formData,
    })

    // Send to webhook
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    let webhookDelivered = false
    let lastError: string | null = null

    if (webhookUrl) {
      const payload = {
        formType: "open_house_signin",
        contact: backupData,
        openHouseData: formData,
        eventMeta,
        timestamp: new Date().toISOString(),
        source: "Mount Vernon Lofts Open House Sign-In",
        version: "2.0",
      }

      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const res = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "Mount Vernon Lofts Website v3.0",
              "X-Submission-ID": submissionId,
              "X-MVL-Webhook": "open-house-signin",
              "X-Attempt": attempt.toString(),
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(15000),
          })

          if (res.ok) {
            webhookDelivered = true
            await backupManager.updateWebhookStatus(submissionId, "delivered")
            break
          } else {
            lastError = `HTTP ${res.status}: ${res.statusText}`
            await backupManager.updateWebhookStatus(submissionId, "pending", lastError)
          }
        } catch (err) {
          lastError = err instanceof Error ? err.message : "Unknown error"
          await backupManager.updateWebhookStatus(submissionId, "pending", lastError)
        }

        if (attempt < 3) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
        }
      }
    }

    // Email fallback on failure
    if (!webhookDelivered) {
      await backupManager.updateWebhookStatus(submissionId, "failed", lastError ?? "All retries failed")

      if (emailFallback.isConfigured()) {
        await emailFallback.sendLeadNotification({
          submissionId,
          formData: backupData,
          timestamp: new Date().toISOString(),
          metadata: { formType: "open_house_signin", eventId: eventMeta.eventId },
        })
      }
    }

    return NextResponse.json({
      success: true,
      submissionId,
      webhookDelivered,
      processingTime: Date.now() - startTime,
    })
  } catch (error) {
    console.error("Open house sign-in error:", error)
    return NextResponse.json(
      { error: "Internal server error", retryable: true },
      { status: 500 }
    )
  }
}
