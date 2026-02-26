import { NextRequest, NextResponse } from "next/server"
import { backupManager } from "@/lib/backup-manager"
import { emailFallback } from "@/lib/email-fallback"
import type { FormContactData } from "@/lib/types/webhook"
import type { OpenHouseFeedbackData, OpenHouseEventMeta } from "@/lib/types/webhook"

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const body = await request.json()
    const { formData, eventMeta } = body as {
      formData: OpenHouseFeedbackData
      eventMeta: OpenHouseEventMeta
    }

    // Validate required fields
    if (!formData.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate pricingComparison enum
    if (!["below_market", "about_right", "above_market"].includes(formData.pricingComparison)) {
      return NextResponse.json({ error: "pricingComparison must be below_market, about_right, or above_market" }, { status: 400 })
    }

    // Validate likelihoodToBring range
    if (typeof formData.likelihoodToBring !== "number" || formData.likelihoodToBring < 1 || formData.likelihoodToBring > 5) {
      return NextResponse.json({ error: "likelihoodToBring must be between 1 and 5" }, { status: 400 })
    }

    const submissionId = `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const eventLabel = eventMeta.eventType === "broker" ? "Broker" : "Public"

    // Map to FormContactData for backup compatibility
    const backupData: FormContactData = {
      name: formData.email,
      email: formData.email,
      phone: "",
      message: `[${eventLabel} Open House Feedback] Pricing: ${formData.pricingComparison}, Likelihood: ${formData.likelihoodToBring}/5, Units: ${formData.standoutUnits?.join(", ") ?? "None"}`,
    }

    await backupManager.storeSubmission(submissionId, backupData, "pending", {
      formType: eventMeta.formType,
      eventId: eventMeta.eventId,
      eventType: eventMeta.eventType,
      openHouseFeedback: formData,
    })

    // Send to webhook
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL
    let webhookDelivered = false
    let lastError: string | null = null

    if (webhookUrl) {
      const payload = {
        formType: eventMeta.formType,
        contact: backupData,
        openHouseFeedback: formData,
        eventMeta,
        timestamp: new Date().toISOString(),
        source: "Mount Vernon Lofts Open House Feedback",
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
              "X-MVL-Webhook": "open-house-feedback",
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
          metadata: { formType: eventMeta.formType, eventId: eventMeta.eventId },
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
    console.error("Open house feedback error:", error)
    return NextResponse.json(
      { error: "Internal server error", retryable: true },
      { status: 500 }
    )
  }
}
