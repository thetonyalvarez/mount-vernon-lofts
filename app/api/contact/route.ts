import { NextRequest, NextResponse } from "next/server"
import ipAnonymizer from "@/lib/ip-anonymizer"
import { backupManager } from "@/lib/backup-manager"
import { emailFallback } from "@/lib/email-fallback"
import type { WebhookPayload, WebhookResponse, WebhookError, SessionData, DeviceInfo, FormInteractionMetrics } from "@/lib/types/webhook"
import type { FormContactData } from "@/lib/types/webhook"

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  let metadata: Record<string, unknown> | null = null // Move outside try block
  
  try {
    const body = await request.json()
    
    // Handle both legacy and enhanced payload formats
    let formData: FormContactData
    
    if (body.formData && body.metadata) {
      // Enhanced payload format
      const { name, email, phone, message, isBroker, preferredFloor } = body.formData
      formData = { name, email, phone, message, isBroker, preferredFloor }
      metadata = body.metadata
    } else {
      // Legacy payload format
      const { name, email, phone, message, isBroker, preferredFloor } = body
      formData = { name, email, phone, message, isBroker, preferredFloor }
    }

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Generate submission ID if not provided
    const submissionId = (metadata && typeof metadata === 'object' && 'submissionId' in metadata) ? 
                         metadata.submissionId as string : 
                         `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Store in backup system immediately (before webhook attempt)
    const backupStored = await backupManager.storeSubmission(
      submissionId,
      formData,
      'pending',
      metadata as Record<string, unknown>
    )

    if (!backupStored) {
      console.warn(`Failed to store backup for submission: ${submissionId}`)
    }

    // Get webhook URL from environment variables (with test mode support)
    const isTestMode = process.env.WEBHOOK_TEST_MODE === 'true'
    const webhookUrl = isTestMode 
      ? process.env.CONTACT_WEBHOOK_URL_TEST 
      : process.env.CONTACT_WEBHOOK_URL
    const emailConfigured = emailFallback.isConfigured()

    // Log test mode for visibility
    if (isTestMode) {
      console.log('🧪 WEBHOOK TEST MODE ENABLED - Using test endpoint for failsafe testing')
    }

    // If neither webhook nor email is configured, still accept submission but log warning
    if (!webhookUrl && !emailConfigured) {
      console.warn("Neither CONTACT_WEBHOOK_URL nor email fallback is configured")
      console.log("Submission stored in backup system only")
    }

    // Process IP and geographic data
    const timezone = (metadata && typeof metadata === 'object' && 'deviceInfo' in metadata && 
                     metadata.deviceInfo && typeof metadata.deviceInfo === 'object' && 
                     'timezone' in metadata.deviceInfo) ? 
                     metadata.deviceInfo.timezone as string : 'UTC'
    const geographicData = await ipAnonymizer.processIPForWebhook(request, timezone)
    
    // Prepare enhanced webhook payload
    const webhookPayload: WebhookPayload = {
      contact: formData,
      metadata: {
        modalId: (metadata && typeof metadata === 'object' && 'modalId' in metadata) ? 
                 metadata.modalId as string : 'contact_modal_default',
        modalTriggerSource: (metadata && typeof metadata === 'object' && 'modalTriggerSource' in metadata) ? 
                           metadata.modalTriggerSource as string : 'unknown',
        siteUrl: (metadata && typeof metadata === 'object' && 'siteUrl' in metadata) ? 
                 metadata.siteUrl as string : request.headers.get('origin') || 'unknown',
        submissionId,
        sessionData: (metadata && typeof metadata === 'object' && 'sessionData' in metadata) ? 
                     metadata.sessionData as SessionData : {
          pageUrl: request.headers.get('referer') || 'unknown',
          referrer: null,
          timeOnSite: 0,
          pagesVisited: 1,
          utmParams: {},
          landingPage: request.headers.get('referer') || 'unknown',
          sessionId: `session_${Date.now()}`
        },
        deviceInfo: (metadata && typeof metadata === 'object' && 'deviceInfo' in metadata) ? 
                    metadata.deviceInfo as DeviceInfo : {
          userAgent: request.headers.get('user-agent') || 'unknown',
          screenWidth: 0,
          screenHeight: 0,
          viewportWidth: 0,
          viewportHeight: 0,
          language: request.headers.get('accept-language')?.split(',')[0] || 'en-US',
          timezone: timezone,
          platform: 'unknown',
          isMobile: /Mobile|Android|iPhone|iPad/i.test(request.headers.get('user-agent') || ''),
          isTablet: /iPad|Android(?!.*Mobile)/i.test(request.headers.get('user-agent') || ''),
          cookiesEnabled: true
        },
        geographicData,
        interactionMetrics: (metadata && typeof metadata === 'object' && 'interactionMetrics' in metadata) ? 
                           metadata.interactionMetrics as FormInteractionMetrics : {
          timeToComplete: 0,
          fieldInteractionCount: 4,
          fieldFocusOrder: ['name', 'email', 'phone', 'message'],
          hasTypingPauses: false,
          formAbandonments: 0,
          retryAttempts: 0
        },
        leadScore: (metadata && typeof metadata === 'object' && 'leadScore' in metadata) ? 
                   metadata.leadScore as number : 50,
        conversionValue: calculateConversionValue((metadata && typeof metadata === 'object' && 'leadScore' in metadata) ? 
                                                  metadata.leadScore as number : 50)
      },
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toISOString(),
      processedAt: new Date().toISOString(),
      source: "Mount Vernon Lofts Website Contact Form",
      version: "2.0"
    }

    /**
     * Calculate estimated conversion value for sales team
     */
    function calculateConversionValue(leadScore: number): number {
      // Base conversion value calculation
      // This can be customized based on your business model
      const baseValue = 10000 // Base property value interest
      const scoreMultiplier = leadScore / 100
      
      return Math.round(baseValue * scoreMultiplier)
    }

    // Send to webhook with enhanced error handling and retry logic
    let webhookDelivered = false
    const maxRetries = 5 // Increased from 3 to 5
    let lastError: string | null = null
    let circuitBreakerTripped = false

    // Circuit breaker: Check if webhook has been failing consistently
    const recentFailures = await checkWebhookHealth()
    if (recentFailures > 10) {
      circuitBreakerTripped = true
      console.warn('Circuit breaker tripped: Webhook has too many recent failures')
    }

    if (webhookUrl && !circuitBreakerTripped) {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          const webhookResponse = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "User-Agent": "Mount Vernon Lofts Website v3.0",
              "X-Submission-ID": submissionId,
              "X-MVL-Webhook": "contact-form",
              "X-Attempt": attempt.toString(),
              "X-Has-Backup": backupStored.toString(),
            },
            body: JSON.stringify(webhookPayload),
            signal: AbortSignal.timeout(15000) // Reduced from 30s to 15s for faster failover
          })

          if (webhookResponse.ok) {
            webhookDelivered = true
            console.log(`Webhook delivered successfully on attempt ${attempt}`)
            // Update backup with success status
            await backupManager.updateWebhookStatus(submissionId, 'delivered')
            break
          } else {
            lastError = `HTTP ${webhookResponse.status}: ${webhookResponse.statusText}`
            console.warn(`Webhook attempt ${attempt} failed: ${lastError}`)
            // Update backup with attempt info
            await backupManager.updateWebhookStatus(submissionId, 'pending', lastError)
          }
        } catch (error) {
          lastError = error instanceof Error ? error.message : 'Unknown error'
          console.warn(`Webhook attempt ${attempt} failed: ${lastError}`)
          // Update backup with attempt info
          await backupManager.updateWebhookStatus(submissionId, 'pending', lastError)
        }

        // Wait before retry (exponential backoff with jitter)
        if (attempt < maxRetries) {
          const baseDelay = Math.pow(2, attempt) * 1000
          const jitter = Math.random() * 1000
          await new Promise(resolve => setTimeout(resolve, baseDelay + jitter))
        }
      }
    } else {
      console.log('Webhook skipped: URL not configured or circuit breaker tripped')
    }

    const processingTime = Date.now() - startTime

    // Handle webhook failure with email fallback
    if (!webhookDelivered) {
      console.error(`Webhook delivery failed after ${maxRetries} attempts. Last error: ${lastError}`)
      
      // Update backup status to failed
      await backupManager.updateWebhookStatus(submissionId, 'failed', lastError || 'All retry attempts failed')
      
      // Send email notification if configured
      if (emailConfigured) {
        const emailSent = await emailFallback.sendWebhookFailureNotification({
          submissionId,
          formData,
          webhookError: lastError || 'All retry attempts failed',
          timestamp: new Date().toISOString(),
          metadata: metadata as Record<string, unknown>
        })
        
        if (emailSent) {
          console.log('Webhook failure notification sent via email')
        } else {
          console.error('Failed to send webhook failure notification email')
        }
      }
      
      // Send immediate lead notification as backup
      if (emailConfigured) {
        await emailFallback.sendLeadNotification({
          submissionId,
          formData,
          timestamp: new Date().toISOString(),
          metadata: metadata as Record<string, unknown>
        })
      }
    }

    const response: WebhookResponse = {
      success: true,
      submissionId,
      message: "Inquiry submitted successfully",
      webhookDelivered,
      processingTime
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    // Ensure backup is marked as failed in case of unexpected errors
    const submissionId = (metadata && typeof metadata === 'object' && 'submissionId' in metadata) ? 
                         metadata.submissionId as string : 
                         `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    await backupManager.updateWebhookStatus(submissionId, 'failed', error instanceof Error ? error.message : 'Unexpected server error')
    const processingTime = Date.now() - startTime
    console.error("Contact form submission error:", error)
    
    const errorResponse: WebhookError = {
      error: "Internal server error",
      code: "INTERNAL_ERROR",
      retryable: true,
      details: {
        processingTime,
        timestamp: new Date().toISOString()
      }
    }
    
    return NextResponse.json(errorResponse, { status: 500 })
  }
}

/**
 * Check webhook health for circuit breaker pattern
 */
async function checkWebhookHealth(): Promise<number> {
  try {
    const summary = await backupManager.getBackupSummary(1) // Check last 24 hours
    return summary.failedWebhooks
  } catch (error) {
    console.error('Failed to check webhook health:', error)
    return 0
  }
}