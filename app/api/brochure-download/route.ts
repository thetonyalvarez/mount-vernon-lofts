import { NextRequest, NextResponse } from 'next/server'
import { emailFallback } from '@/lib/email-fallback'
import { CONTACT_CONFIG } from '@/app/config/contact'
import type { EnhancedBrochureFormData } from '@/app/types'
import type { WebhookPayload, SessionData, DeviceInfo, FormInteractionMetrics } from '@/lib/types/webhook'
import nodemailer from 'nodemailer'
import { validateHoneypot, validateSubmissionTime, checkRateLimit, getClientIp } from '@/lib/spam-protection'

interface BrochurePayload {
  readonly formData: EnhancedBrochureFormData
  readonly metadata: {
    readonly modalId: string
    readonly modalTriggerSource: string
    readonly siteUrl: string
    readonly submissionId: string
    readonly sessionData?: SessionData
    readonly deviceInfo?: DeviceInfo
    readonly interactionMetrics?: FormInteractionMetrics
    readonly leadScore?: number
  }
}

interface BrochureEmailNotificationData {
  readonly submissionId: string
  readonly formData: EnhancedBrochureFormData
  webhookError?: string
  readonly timestamp: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export async function POST(request: NextRequest) {
  console.log('Brochure download form submission received')

  try {
    const rawBody = await request.json()

    // --- Spam protection ---
    const clientIp = getClientIp(request)
    const rateLimit = checkRateLimit(clientIp)
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }
    const spamCheck = rawBody._spamCheck ?? {}
    if (validateHoneypot(spamCheck.website)) {
      return NextResponse.json({ success: true, message: 'Brochure request processed successfully', submissionId: `spam_${Date.now()}` })
    }
    if (spamCheck._renderTimestamp && validateSubmissionTime(spamCheck._renderTimestamp)) {
      return NextResponse.json({ success: true, message: 'Brochure request processed successfully', submissionId: `spam_${Date.now()}` })
    }

    const payload: BrochurePayload = rawBody as BrochurePayload
    const { formData, metadata } = payload

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.brochureInterest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const submissionData: BrochureEmailNotificationData = {
      submissionId: metadata.submissionId,
      formData,
      timestamp: new Date().toISOString(),
      metadata
    }

    // Try webhook first (if configured)
    let webhookSuccess = false
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL

    if (webhookUrl) {
      try {
        // Create webhook payload in the same format as contact form, with brochure extensions
        const webhookPayload: WebhookPayload & {
          brochureInterest?: string
          timeframe?: string
          formType?: string
        } = {
          contact: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message || `Brochure Request: ${formData.brochureInterest}${formData.timeframe ? ` (Timeline: ${formData.timeframe})` : ''}`,
            isBroker: formData.isBroker || '',
            preferredFloor: formData.preferredFloor || ''
          },
          metadata: {
            modalId: metadata.modalId,
            modalTriggerSource: metadata.modalTriggerSource,
            siteUrl: metadata.siteUrl,
            submissionId: metadata.submissionId,
            sessionData: metadata.sessionData || {
              pageUrl: request.headers.get('referer') || 'unknown',
              referrer: null,
              timeOnSite: 0,
              pagesVisited: 1,
              utmParams: {},
              landingPage: request.headers.get('referer') || 'unknown',
              sessionId: `session_${Date.now()}`
            },
            deviceInfo: metadata.deviceInfo || {
              userAgent: request.headers.get('user-agent') || 'unknown',
              screenWidth: 0,
              screenHeight: 0,
              viewportWidth: 0,
              viewportHeight: 0,
              language: request.headers.get('accept-language')?.split(',')[0] || 'en-US',
              timezone: 'UTC',
              platform: 'unknown',
              isMobile: /Mobile|Android|iPhone|iPad/i.test(request.headers.get('user-agent') || ''),
              isTablet: /iPad|Android(?!.*Mobile)/i.test(request.headers.get('user-agent') || ''),
              cookiesEnabled: true
            },
            geographicData: {
              anonymizedIp: 'unknown',
              timezone: 'UTC'
            },
            interactionMetrics: metadata.interactionMetrics || {
              timeToComplete: 0,
              fieldInteractionCount: 4,
              fieldFocusOrder: ['name', 'email', 'phone', 'brochureInterest'],
              hasTypingPauses: false,
              formAbandonments: 0,
              retryAttempts: 0
            },
            leadScore: metadata.leadScore || 50,
            conversionValue: 10000
          },
          // Brochure specific data at the root level
          brochureInterest: formData.brochureInterest,
          timeframe: formData.timeframe,
          formType: 'brochure_request',
          timestamp: new Date().toISOString(),
          submittedAt: new Date().toISOString(),
          processedAt: new Date().toISOString(),
          source: 'mvl_brochure_page',
          version: '1.0'
        }

        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookPayload),
          signal: AbortSignal.timeout(10000)
        })

        if (webhookResponse.ok) {
          webhookSuccess = true
          console.log(`Brochure webhook delivered successfully for submission: ${metadata.submissionId}`)
        } else {
          throw new Error(`Webhook failed with status: ${webhookResponse.status}`)
        }
      } catch (error) {
        console.error('Brochure webhook failed:', error)
        submissionData.webhookError = error instanceof Error ? error.message : 'Unknown webhook error'
      }
    }

    // Send email notifications (lead notification + PDF delivery)
    try {
      // Send lead notification to sales team
      await sendBrochureLeadNotification(submissionData)

      // Send PDF brochure to user
      await sendBrochureToUser(submissionData)

      console.log(`Brochure emails sent successfully for submission: ${metadata.submissionId}`)
    } catch (emailError) {
      console.error('Failed to send brochure emails:', emailError)

      // If webhook also failed, this is a critical failure
      if (!webhookSuccess) {
        throw new Error('Both webhook and email delivery failed')
      }
    }

    // Send webhook failure notification if needed
    if (!webhookSuccess && emailFallback.isConfigured()) {
      try {
        await emailFallback.sendWebhookFailureNotification(submissionData)
      } catch (notificationError) {
        console.error('Failed to send webhook failure notification:', notificationError)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Brochure request processed successfully',
      submissionId: metadata.submissionId
    })

  } catch (error) {
    console.error('Brochure form processing error:', error)

    return NextResponse.json(
      {
        error: 'Failed to process brochure request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

async function sendBrochureLeadNotification(data: BrochureEmailNotificationData): Promise<void> {
  if (!emailFallback.isConfigured()) {
    console.log('Email not configured, skipping brochure lead notification')
    return
  }

  // Get email configuration
  const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER
  const smtpPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD
  const fromEmail = process.env.FROM_EMAIL || smtpUser
  const fromName = process.env.FROM_NAME || 'Mount Vernon Lofts'
  const salesRecipients = process.env.EMAIL_RECIPIENTS_SALES?.split(',').map(email => email.trim()) || [smtpUser!]

  if (!smtpUser || !smtpPassword) {
    throw new Error('Email configuration not available')
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
    service: process.env.SMTP_HOST === 'smtp.gmail.com' ? 'gmail' : undefined,
  })

  const subject = CONTACT_CONFIG.subjects.brochureLead(data.formData.name)
  const htmlContent = generateBrochureLeadHTML(data)
  const textContent = generateBrochureLeadText(data)

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: salesRecipients,
    subject,
    text: textContent,
    html: htmlContent,
    replyTo: data.formData.email,
    headers: {
      'X-Priority': '2',
      'X-MSMail-Priority': 'Normal',
      'X-MVL-Lead': 'brochure-request',
      'X-Submission-ID': data.submissionId
    }
  }

  await transporter.sendMail(mailOptions)
  console.log(`Brochure lead notification sent to sales team (${salesRecipients.join(', ')}) for submission: ${data.submissionId}`)
}

async function sendBrochureToUser(data: BrochureEmailNotificationData): Promise<void> {
  if (!emailFallback.isConfigured()) {
    console.log('Email not configured, skipping brochure delivery')
    return
  }

  // Get email configuration
  const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER
  const smtpPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD
  const fromEmail = process.env.FROM_EMAIL || smtpUser
  const fromName = process.env.FROM_NAME || 'Mount Vernon Lofts'

  if (!smtpUser || !smtpPassword) {
    throw new Error('Email configuration not available')
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
    service: process.env.SMTP_HOST === 'smtp.gmail.com' ? 'gmail' : undefined,
  })

  // Note: PDF is delivered via S3 URL in email content rather than attachment
  // This provides better reliability and doesn't require local file storage

  const subject = CONTACT_CONFIG.subjects.brochureDelivery()
  const htmlContent = generateBrochureDeliveryHTML(data)
  const textContent = generateBrochureDeliveryText(data)

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: data.formData.email,
    subject,
    text: textContent,
    html: htmlContent,
    headers: {
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal',
      'X-MVL-Delivery': 'brochure',
      'X-Submission-ID': data.submissionId
    }
  }

  await transporter.sendMail(mailOptions)
  console.log(`Brochure delivered to ${data.formData.email} for submission: ${data.submissionId}`)
}

function generateBrochureLeadHTML(data: BrochureEmailNotificationData): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Brochure Request - ${data.formData.name}</title>
      <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: #E07A5F; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .lead-data { background: #f9fafb; border-radius: 6px; padding: 15px; margin: 15px 0; }
          .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #666; }
          .button { display: inline-block; background: #E07A5F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 10px 5px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
          td:first-child { font-weight: 600; width: 30%; }
          .priority { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 10px; margin: 10px 0; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>📄 Brochure Request</h1>
              <p>Mount Vernon Lofts - High Intent Lead</p>
          </div>

          <div class="content">
              <div class="priority">
                  <strong>🎯 HIGH VALUE LEAD:</strong> This prospect has specifically requested the brochure, indicating serious interest in Mount Vernon Lofts.
              </div>

              <h3>📋 Contact Information</h3>
              <div class="lead-data">
                  <table>
                      <tr><td>Name:</td><td><strong>${data.formData.name}</strong></td></tr>
                      <tr><td>Email:</td><td><a href="mailto:${data.formData.email}">${data.formData.email}</a></td></tr>
                      <tr><td>Phone:</td><td><a href="tel:${data.formData.phone}">${data.formData.phone}</a></td></tr>
                      <tr><td>Interest:</td><td><strong>${getInterestLabel(data.formData.brochureInterest)}</strong></td></tr>
                      <tr><td>Timeline:</td><td>${data.formData.timeframe || 'Not specified'}</td></tr>
                      <tr><td>Broker Status:</td><td>${data.formData.isBroker || 'Not specified'}</td></tr>
                      <tr><td>Submitted:</td><td>${new Date(data.timestamp).toLocaleString()}</td></tr>
                  </table>
              </div>

              ${data.formData.message ? `
              <h4>💬 Their Message:</h4>
              <div class="lead-data">
                  <p><em>"${data.formData.message}"</em></p>
              </div>
              ` : ''}

              <h3>🎯 Lead Intelligence</h3>
              <div class="lead-data">
                  <ul>
                      <li><strong>Lead Score:</strong> HIGH (Brochure request = premium intent)</li>
                      <li><strong>Source:</strong> Mount Vernon Lofts Brochure Page</li>
                      <li><strong>Interest Level:</strong> ${getInterestDescription(data.formData.brochureInterest)}</li>
                      <li><strong>Timeline:</strong> ${data.formData.timeframe ? getTimelineDescription(data.formData.timeframe) : 'Timeline not specified - follow up required'}</li>
                  </ul>
              </div>

              <div style="text-align: center; margin: 20px 0;">
                  <a href="mailto:${data.formData.email}?subject=Re: Your Mount Vernon Lofts Brochure Request&body=Hi ${data.formData.name},%0D%0A%0D%0AThank you for your interest in Mount Vernon Lofts..." class="button">
                      📧 Reply via Email
                  </a>
                  <a href="tel:${data.formData.phone}" class="button">
                      📞 Call Now
                  </a>
              </div>
          </div>

          <div class="footer">
              <p>Brochure request received via the Mount Vernon Lofts website.</p>
              <p>Submission ID: <code>${data.submissionId}</code></p>
          </div>
      </div>
  </body>
  </html>
  `
}

function generateBrochureLeadText(data: BrochureEmailNotificationData): string {
  return `
📄 MVL BROCHURE REQUEST - HIGH VALUE LEAD

🎯 HIGH INTENT: This prospect requested our brochure, indicating serious interest in Mount Vernon Lofts.

CONTACT INFORMATION:
Name: ${data.formData.name}
Email: ${data.formData.email}
Phone: ${data.formData.phone}
Interest: ${getInterestLabel(data.formData.brochureInterest)}
Timeline: ${data.formData.timeframe || 'Not specified'}
Broker Status: ${data.formData.isBroker || 'Not specified'}
Submitted: ${new Date(data.timestamp).toLocaleString()}

${data.formData.message ? `THEIR MESSAGE:\n"${data.formData.message}"\n` : ''}

LEAD INTELLIGENCE:
- Lead Score: HIGH (Brochure request = premium intent)
- Source: Mount Vernon Lofts Brochure Page
- Interest Level: ${getInterestDescription(data.formData.brochureInterest)}
- Timeline: ${data.formData.timeframe ? getTimelineDescription(data.formData.timeframe) : 'Timeline not specified - follow up required'}

NEXT STEPS:
Reply to: ${data.formData.email}
Call: ${data.formData.phone}

Brochure request received via the Mount Vernon Lofts website.
Submission ID: ${data.submissionId}
  `.trim()
}

function generateBrochureDeliveryHTML(data: BrochureEmailNotificationData): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Mount Vernon Lofts Brochure</title>
      <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: #E07A5F; color: white; padding: 30px 20px; text-align: center; }
          .content { padding: 30px 20px; }
          .highlight { background: #FFFCF7; border-left: 4px solid #E07A5F; padding: 15px; margin: 20px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #666; }
          .button { display: inline-block; background: #E07A5F; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 15px 10px; font-weight: 500; }
          .cta-section { text-align: center; background: #FFFCF7; padding: 20px; margin: 20px 0; border-radius: 6px; }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h1>Your Mount Vernon Lofts Brochure</h1>
              <p>Property Information & Unit Details</p>
          </div>

          <div class="content">
              <h2>Dear ${data.formData.name},</h2>

              <p>Thank you for your interest in Mount Vernon Lofts. Your brochure is ready for download.</p>

              <div style="text-align: center; margin: 30px 0;">
                  <a href="${CONTACT_CONFIG.floorPlansPdfUrl}" class="button" style="background: #E07A5F; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-size: 18px; font-weight: 600; display: inline-block;">
                      Download Brochure PDF
                  </a>
                  <p style="font-size: 14px; color: #666; margin-top: 10px;">Click the button above to download your brochure</p>
              </div>

              <div class="highlight">
                  <h3>📎 What's Included:</h3>
                  <ul>
                      <li>Unit floor plans for studios and 1-bedrooms</li>
                      <li>Unit specifications and square footage</li>
                      <li>Building features and amenities overview</li>
                      <li>Montrose neighborhood highlights</li>
                      <li>Pricing and availability information</li>
                  </ul>
              </div>

              <p>Mount Vernon Lofts offers 42 modern condos in Houston's Montrose neighborhood. Starting in the $215Ks — with high ceilings, natural light, covered parking, and walkable access to everything Montrose has to offer.</p>

              <div class="cta-section">
                  <h3>Ready for the Next Step?</h3>
                  <p>Our team is available to answer questions, provide additional information, or schedule a tour.</p>
                  <a href="mailto:${CONTACT_CONFIG.email}?subject=Brochure Follow-up - ${data.formData.name}" class="button">Contact Our Team</a>
                  <a href="tel:${CONTACT_CONFIG.phone}" class="button">Schedule a Tour</a>
              </div>

              <p>We appreciate your interest in Mount Vernon Lofts and look forward to helping you find your first home in Montrose.</p>

              <p>Best,<br>
              <strong>The Mount Vernon Lofts Team</strong></p>
          </div>

          <div class="footer">
              <p>${CONTACT_CONFIG.companyName} | ${CONTACT_CONFIG.tagline}</p>
              <p>${CONTACT_CONFIG.location}</p>
              <p>If you have trouble downloading the PDF, please <a href="mailto:${CONTACT_CONFIG.email}">contact us</a> for assistance.</p>
          </div>
      </div>
  </body>
  </html>
  `
}

function generateBrochureDeliveryText(data: BrochureEmailNotificationData): string {
  return `
MOUNT VERNON LOFTS - YOUR BROCHURE

Dear ${data.formData.name},

Thank you for your interest in Mount Vernon Lofts. Your brochure is ready for download.

DOWNLOAD YOUR BROCHURE:
${CONTACT_CONFIG.floorPlansPdfUrl}

Mount Vernon Lofts offers 42 modern condos in Houston's Montrose neighborhood. Starting in the $215Ks — with high ceilings, natural light, covered parking, and walkable access to everything Montrose has to offer.

READY FOR THE NEXT STEP?
Our team is available to answer questions, provide additional information, or schedule a tour.

Contact: ${CONTACT_CONFIG.email}
Phone: ${CONTACT_CONFIG.phone}

We appreciate your interest in Mount Vernon Lofts and look forward to helping you find your first home in Montrose.

Best,
The Mount Vernon Lofts Team

---
${CONTACT_CONFIG.companyName} | ${CONTACT_CONFIG.tagline}
${CONTACT_CONFIG.location}

If you have trouble downloading the PDF, please contact us for assistance.
  `.trim()
}

function getInterestLabel(interest: string): string {
  const labels: Record<string, string> = {
    'all': 'Complete Information Package',
    'floor_plans': 'Floor Plans & Layouts',
    'amenities': 'Amenities & Features',
    'pricing': 'Pricing & Availability',
    'investment': 'Investment Details'
  }
  return labels[interest] || interest
}

function getInterestDescription(interest: string): string {
  const descriptions: Record<string, string> = {
    'all': 'Comprehensive interest - wants complete information',
    'floor_plans': 'Focused on layouts and design',
    'amenities': 'Interested in lifestyle and features',
    'pricing': 'Serious buyer - pricing inquiry',
    'investment': 'Investment potential focus'
  }
  return descriptions[interest] || interest
}

function getTimelineDescription(timeframe: string): string {
  const descriptions: Record<string, string> = {
    'immediate': 'Ready to move immediately - HIGH PRIORITY',
    '3_months': 'Looking to move within 3 months - HIGH PRIORITY',
    '6_months': 'Planning to move within 6 months - MEDIUM PRIORITY',
    '1_year': 'Timeline within 1 year - MEDIUM PRIORITY',
    'exploring': 'Currently exploring options - NURTURE LEAD'
  }
  return descriptions[timeframe] || timeframe
}
