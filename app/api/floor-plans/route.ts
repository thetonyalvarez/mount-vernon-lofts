import { NextRequest, NextResponse } from 'next/server'
import { emailFallback } from '@/lib/email-fallback'
import { CONTACT_CONFIG } from '@/app/config/contact'
import type { EnhancedFloorPlanFormData } from '@/app/types'
import type { WebhookPayload, SessionData, DeviceInfo, FormInteractionMetrics } from '@/lib/types/webhook'
import nodemailer from 'nodemailer'

interface FloorPlanPayload {
  readonly formData: EnhancedFloorPlanFormData
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

interface FloorPlanEmailNotificationData {
  readonly submissionId: string
  readonly formData: EnhancedFloorPlanFormData
  webhookError?: string
  readonly timestamp: string
  readonly metadata?: Readonly<Record<string, unknown>>
}

export async function POST(request: NextRequest) {
  console.log('Floor plans form submission received')
  
  try {
    const payload: FloorPlanPayload = await request.json()
    const { formData, metadata } = payload
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.floorPlansInterest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const submissionData: FloorPlanEmailNotificationData = {
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
        // Create webhook payload in the same format as contact form, with floor plan extensions
        const webhookPayload: WebhookPayload & {
          floorPlansInterest?: string
          timeframe?: string 
          formType?: string
        } = {
          contact: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message || `Floor Plans Request: ${formData.floorPlansInterest}${formData.timeframe ? ` (Timeline: ${formData.timeframe})` : ''}`,
            isBroker: formData.isBroker || '',
            preferredFloor: formData.floorPlansInterest || ''
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
              fieldFocusOrder: ['name', 'email', 'phone', 'floorPlansInterest'],
              hasTypingPauses: false,
              formAbandonments: 0,
              retryAttempts: 0
            },
            leadScore: metadata.leadScore || 50,
            conversionValue: 10000
          },
          // Floor plan specific data at the root level
          floorPlansInterest: formData.floorPlansInterest,
          timeframe: formData.timeframe,
          formType: 'floor_plans_request',
          timestamp: new Date().toISOString(),
          submittedAt: new Date().toISOString(),
          processedAt: new Date().toISOString(),
          source: 'mvl_floor_plans_page',
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
          console.log(`Floor plans webhook delivered successfully for submission: ${metadata.submissionId}`)
        } else {
          throw new Error(`Webhook failed with status: ${webhookResponse.status}`)
        }
      } catch (error) {
        console.error('Floor plans webhook failed:', error)
        submissionData.webhookError = error instanceof Error ? error.message : 'Unknown webhook error'
      }
    }

    // Send email notifications (lead notification + PDF delivery)
    try {
      // Send lead notification to sales team
      await sendFloorPlanLeadNotification(submissionData)
      
      // Send PDF floor plans to user
      await sendFloorPlansToUser(submissionData)

      console.log(`Floor plans emails sent successfully for submission: ${metadata.submissionId}`)
    } catch (emailError) {
      console.error('Failed to send floor plans emails:', emailError)
      
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
      message: 'Floor plans request processed successfully',
      submissionId: metadata.submissionId 
    })

  } catch (error) {
    console.error('Floor plans form processing error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process floor plans request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

async function sendFloorPlanLeadNotification(data: FloorPlanEmailNotificationData): Promise<void> {
  if (!emailFallback.isConfigured()) {
    console.log('Email not configured, skipping floor plan lead notification')
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

  const subject = CONTACT_CONFIG.subjects.floorPlansLead(data.formData.name)
  const htmlContent = generateFloorPlanLeadHTML(data)
  const textContent = generateFloorPlanLeadText(data)

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
      'X-MVL-Lead': 'floor-plans-request',
      'X-Submission-ID': data.submissionId
    }
  }

  await transporter.sendMail(mailOptions)
  console.log(`Floor plan lead notification sent to sales team (${salesRecipients.join(', ')}) for submission: ${data.submissionId}`)
}

async function sendFloorPlansToUser(data: FloorPlanEmailNotificationData): Promise<void> {
  if (!emailFallback.isConfigured()) {
    console.log('Email not configured, skipping floor plans delivery')
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

  const subject = CONTACT_CONFIG.subjects.floorPlansDelivery(data.formData.floorPlansInterest)
  const htmlContent = generateFloorPlanDeliveryHTML(data)
  const textContent = generateFloorPlanDeliveryText(data)

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to: data.formData.email,
    subject,
    text: textContent,
    html: htmlContent,
    headers: {
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal',
      'X-MVL-Delivery': 'floor-plans',
      'X-Submission-ID': data.submissionId
    }
  }

  await transporter.sendMail(mailOptions)
  console.log(`Floor plans delivered to ${data.formData.email} for submission: ${data.submissionId}`)
}

function generateFloorPlanLeadHTML(data: FloorPlanEmailNotificationData): string {
  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Floor Plans Request - ${data.formData.name}</title>
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
              <h1>🏠 Floor Plans Request</h1>
              <p>Mount Vernon Lofts - High Intent Lead</p>
          </div>
          
          <div class="content">
              <div class="priority">
                  <strong>🎯 HIGH VALUE LEAD:</strong> This prospect has specifically requested floor plans, indicating serious interest and intent to purchase.
              </div>

              <h3>📋 Contact Information</h3>
              <div class="lead-data">
                  <table>
                      <tr><td>Name:</td><td><strong>${data.formData.name}</strong></td></tr>
                      <tr><td>Email:</td><td><a href="mailto:${data.formData.email}">${data.formData.email}</a></td></tr>
                      <tr><td>Phone:</td><td><a href="tel:${data.formData.phone}">${data.formData.phone}</a></td></tr>
                      <tr><td>Interest:</td><td><strong>${data.formData.floorPlansInterest === 'all_plans' ? 'All Floor Plans' : data.formData.floorPlansInterest}</strong></td></tr>
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
                      <li><strong>Lead Score:</strong> HIGH (Floor plans request = premium intent)</li>
                      <li><strong>Source:</strong> Mount Vernon Lofts Floor Plans Page</li>
                      <li><strong>Interest Level:</strong> ${data.formData.floorPlansInterest === 'all_plans' ? 'Exploring all options' : 'Specific unit interest'}</li>
                      <li><strong>Timeline:</strong> ${data.formData.timeframe ? getTimelineDescription(data.formData.timeframe) : 'Timeline not specified - follow up required'}</li>
                  </ul>
              </div>

              <div style="text-align: center; margin: 20px 0;">
                  <a href="mailto:${data.formData.email}?subject=Re: Your Mount Vernon Lofts Floor Plans Request&body=Hi ${data.formData.name},%0D%0A%0D%0AThank you for your interest in Mount Vernon Lofts floor plans..." class="button">
                      📧 Reply via Email
                  </a>
                  <a href="tel:${data.formData.phone}" class="button">
                      📞 Call Now
                  </a>
              </div>
          </div>

          <div class="footer">
              <p>Floor plans request received via the Mount Vernon Lofts website.</p>
              <p>Submission ID: <code>${data.submissionId}</code></p>
          </div>
      </div>
  </body>
  </html>
  `
}

function generateFloorPlanLeadText(data: FloorPlanEmailNotificationData): string {
  return `
🏠 MVL FLOOR PLANS REQUEST - HIGH VALUE LEAD

🎯 HIGH INTENT: This prospect requested floor plans, indicating serious purchase interest.

CONTACT INFORMATION:
Name: ${data.formData.name}
Email: ${data.formData.email}
Phone: ${data.formData.phone}
Interest: ${data.formData.floorPlansInterest === 'all_plans' ? 'All Floor Plans' : data.formData.floorPlansInterest}
Timeline: ${data.formData.timeframe || 'Not specified'}
Broker Status: ${data.formData.isBroker || 'Not specified'}
Submitted: ${new Date(data.timestamp).toLocaleString()}

${data.formData.message ? `THEIR MESSAGE:\n"${data.formData.message}"\n` : ''}

LEAD INTELLIGENCE:
- Lead Score: HIGH (Floor plans request = premium intent)
- Source: Mount Vernon Lofts Floor Plans Page
- Interest Level: ${data.formData.floorPlansInterest === 'all_plans' ? 'Exploring all options' : 'Specific unit interest'}
- Timeline: ${data.formData.timeframe ? getTimelineDescription(data.formData.timeframe) : 'Timeline not specified - follow up required'}

NEXT STEPS:
Reply to: ${data.formData.email}
Call: ${data.formData.phone}

Floor plans request received via the Mount Vernon Lofts website.
Submission ID: ${data.submissionId}
  `.trim()
}

function generateFloorPlanDeliveryHTML(data: FloorPlanEmailNotificationData): string {
  const floorPlanTitle = data.formData.floorPlansInterest === 'all_plans' 
    ? 'Complete Floor Plan Collection' 
    : `${data.formData.floorPlansInterest} Floor Plan`

  return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Mount Vernon Lofts Floor Plans</title>
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
              <h1>Your Mount Vernon Lofts Floor Plans</h1>
              <p>Unit Layouts & Specifications</p>
          </div>
          
          <div class="content">
              <h2>Dear ${data.formData.name},</h2>
              
              <p>Thank you for your interest in Mount Vernon Lofts. Your floor plans are ready for download.</p>

              <div style="text-align: center; margin: 30px 0;">
                  <a href="${CONTACT_CONFIG.floorPlansPdfUrl}" class="button" style="background: #E07A5F; color: white; padding: 15px 30px; text-decoration: none; border-radius: 6px; font-size: 18px; font-weight: 600; display: inline-block;">
                      Download Floor Plans PDF
                  </a>
                  <p style="font-size: 14px; color: #666; margin-top: 10px;">Click the button above to download your floor plans</p>
              </div>

              <div class="highlight">
                  <h3>📎 What's Included:</h3>
                  <ul>
                      <li>Detailed unit floor plans</li>
                      <li>Square footage specifications</li>
                      <li>Unit features and finishes</li>
                      <li>Building amenities overview</li>
                  </ul>
              </div>

              <p>Mount Vernon Lofts offers 42 modern condos in Houston's Montrose neighborhood — starting in the $215Ks. Built in 2018 with high ceilings, natural light, and covered parking.</p>

              ${data.formData.floorPlansInterest !== 'all_plans' ? `
              <div class="highlight">
                  <p><strong>Interested in comparing other units?</strong> We'd be happy to share additional floor plans or schedule a tour to help you find the right fit.</p>
              </div>
              ` : ''}

              <div class="cta-section">
                  <h3>Ready for the Next Step?</h3>
                  <p>Our team is available to answer questions, provide additional information, or schedule a tour.</p>
                  <a href="mailto:${CONTACT_CONFIG.email}?subject=Floor Plans Follow-up - ${data.formData.name}" class="button">Contact Our Team</a>
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

function generateFloorPlanDeliveryText(data: FloorPlanEmailNotificationData): string {
  const floorPlanTitle = data.formData.floorPlansInterest === 'all_plans' 
    ? 'Complete Floor Plan Collection' 
    : `${data.formData.floorPlansInterest} Floor Plan`

  return `
MOUNT VERNON LOFTS - YOUR FLOOR PLANS

Dear ${data.formData.name},

Thank you for your interest in Mount Vernon Lofts. Your floor plans are ready for download.

DOWNLOAD YOUR FLOOR PLANS:
${CONTACT_CONFIG.floorPlansPdfUrl}

Mount Vernon Lofts offers 42 modern condos in Houston's Montrose neighborhood — starting in the $215Ks. Built in 2018 with high ceilings, natural light, and covered parking.

${data.formData.floorPlansInterest !== 'all_plans' ? `
INTERESTED IN COMPARING? We'd be happy to share additional floor plans or schedule a tour to help you find the right fit.
` : ''}

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