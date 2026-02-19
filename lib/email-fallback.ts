import nodemailer from 'nodemailer'
import type { FormContactData } from '@/lib/types/webhook'

export interface EmailConfig {
  enabled: boolean
  smtpHost: string
  smtpPort: number
  smtpSecure: boolean
  smtpUser: string
  smtpPassword: string
  fromEmail: string
  fromName: string
  recipients: string[]
}

export interface EmailNotificationData {
  submissionId: string
  formData: FormContactData
  webhookError?: string
  timestamp: string
  metadata?: Record<string, unknown>
}

class EmailFallback {
  private config: EmailConfig | null = null
  private transporter: nodemailer.Transporter | null = null

  /**
   * Initialize email configuration from environment variables
   */
  private initializeConfig(): EmailConfig | null {
    try {
      // Check if email is enabled and properly configured
      const enabled = process.env.EMAIL_FALLBACK_ENABLED === 'true'
      const smtpUser = process.env.GMAIL_USER || process.env.SMTP_USER
      const smtpPassword = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASSWORD
      
      if (!enabled || !smtpUser || !smtpPassword) {
        console.log('Email fallback disabled or not configured')
        return null
      }

      // Default to Gmail SMTP settings, but allow override
      const config: EmailConfig = {
        enabled: true,
        smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
        smtpPort: parseInt(process.env.SMTP_PORT || '587'),
        smtpSecure: process.env.SMTP_SECURE === 'true' || false, // false for port 587
        smtpUser,
        smtpPassword,
        fromEmail: process.env.FROM_EMAIL || smtpUser,
        fromName: process.env.FROM_NAME || 'Mount Vernon Lofts',
        recipients: process.env.EMAIL_RECIPIENTS?.split(',').map(email => email.trim()) || [smtpUser]
      }

      return config
    } catch (error) {
      console.error('Failed to initialize email configuration:', error)
      return null
    }
  }

  /**
   * Create nodemailer transporter
   */
  private createTransporter(): nodemailer.Transporter | null {
    if (!this.config) {
      this.config = this.initializeConfig()
    }

    if (!this.config) {
      return null
    }

    try {
      const transporter = nodemailer.createTransport({
        host: this.config.smtpHost,
        port: this.config.smtpPort,
        secure: this.config.smtpSecure,
        auth: {
          user: this.config.smtpUser,
          pass: this.config.smtpPassword,
        },
        // Gmail specific settings
        service: this.config.smtpHost === 'smtp.gmail.com' ? 'gmail' : undefined,
      })

      return transporter
    } catch (error) {
      console.error('Failed to create email transporter:', error)
      return null
    }
  }

  /**
   * Send webhook failure notification email
   */
  async sendWebhookFailureNotification(data: EmailNotificationData): Promise<boolean> {
    try {
      if (!this.transporter) {
        this.transporter = this.createTransporter()
      }

      if (!this.transporter || !this.config) {
        console.log('Email transporter not available, skipping notification')
        return false
      }

      // Use technical recipients for webhook failure alerts
      const technicalRecipients = process.env.EMAIL_RECIPIENTS_TECHNICAL?.split(',').map(email => email.trim()) || this.config.recipients

      const subject = `🚨 MVL Contact Form - Webhook Failure Alert`
      const htmlContent = this.generateWebhookFailureHTML(data)
      const textContent = this.generateWebhookFailureText(data)

      const mailOptions = {
        from: `"${this.config.fromName}" <${this.config.fromEmail}>`,
        to: technicalRecipients,
        subject,
        text: textContent,
        html: htmlContent,
        headers: {
          'X-Priority': '1',
          'X-MSMail-Priority': 'High',
          'X-MVL-Alert': 'webhook-failure',
          'X-Submission-ID': data.submissionId
        }
      }

      await this.transporter.sendMail(mailOptions)
      console.log(`Webhook failure notification sent to technical team (${technicalRecipients.join(', ')}) for submission: ${data.submissionId}`)
      return true
    } catch (error) {
      console.error('Failed to send webhook failure notification:', error)
      return false
    }
  }

  /**
   * Send immediate lead notification email
   */
  async sendLeadNotification(data: EmailNotificationData): Promise<boolean> {
    try {
      if (!this.transporter) {
        this.transporter = this.createTransporter()
      }

      if (!this.transporter || !this.config) {
        console.log('Email transporter not available, skipping lead notification')
        return false
      }

      // Use sales recipients for lead notifications
      const salesRecipients = process.env.EMAIL_RECIPIENTS_SALES?.split(',').map(email => email.trim()) || this.config.recipients

      const subject = `✨ New MVL Inquiry - ${data.formData.name}`
      const htmlContent = this.generateLeadNotificationHTML(data)
      const textContent = this.generateLeadNotificationText(data)

      const mailOptions = {
        from: `"${this.config.fromName}" <${this.config.fromEmail}>`,
        to: salesRecipients,
        subject,
        text: textContent,
        html: htmlContent,
        replyTo: data.formData.email,
        headers: {
          'X-Priority': '2',
          'X-MSMail-Priority': 'Normal',
          'X-MVL-Lead': 'contact-form',
          'X-Submission-ID': data.submissionId
        }
      }

      await this.transporter.sendMail(mailOptions)
      console.log(`Lead notification sent to sales team (${salesRecipients.join(', ')}) for submission: ${data.submissionId}`)
      return true
    } catch (error) {
      console.error('Failed to send lead notification:', error)
      return false
    }
  }

  /**
   * Generate HTML content for webhook failure notification
   */
  private generateWebhookFailureHTML(data: EmailNotificationData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>MVL Webhook Failure Alert</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; }
            .alert { background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px; padding: 15px; margin: 15px 0; }
            .lead-data { background: #f9fafb; border-radius: 6px; padding: 15px; margin: 15px 0; }
            .footer { background: #f9fafb; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            .button { display: inline-block; background: #E07A5F; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin: 10px 0; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 8px; border-bottom: 1px solid #e5e7eb; }
            td:first-child { font-weight: 600; width: 30%; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚨 Webhook Failure Alert</h1>
                <p>Mount Vernon Lofts Contact Form</p>
            </div>
            
            <div class="content">
                <div class="alert">
                    <h3>⚠️ Action Required</h3>
                    <p><strong>Webhook delivery failed for a new contact form submission.</strong></p>
                    <p>The lead data has been captured and stored in our backup system, but the webhook to your CRM/automation system failed to deliver.</p>
                </div>

                <h3>📋 Lead Information</h3>
                <div class="lead-data">
                    <table>
                        <tr><td>Name:</td><td><strong>${data.formData.name}</strong></td></tr>
                        <tr><td>Email:</td><td><a href="mailto:${data.formData.email}">${data.formData.email}</a></td></tr>
                        <tr><td>Phone:</td><td><a href="tel:${data.formData.phone}">${data.formData.phone}</a></td></tr>
                        <tr><td>Broker:</td><td>${data.formData.isBroker || 'Not specified'}</td></tr>
                        <tr><td>Floor Preference:</td><td>${data.formData.preferredFloor || 'Not specified'}</td></tr>
                        <tr><td>Submission ID:</td><td><code>${data.submissionId}</code></td></tr>
                        <tr><td>Timestamp:</td><td>${new Date(data.timestamp).toLocaleString()}</td></tr>
                    </table>
                </div>

                <h4>💬 Message:</h4>
                <div class="lead-data">
                    <p><em>"${data.formData.message}"</em></p>
                </div>

                ${data.webhookError ? `
                <h4>🔍 Error Details:</h4>
                <div class="alert">
                    <code>${data.webhookError}</code>
                </div>
                ` : ''}

                <h3>🎯 Next Steps</h3>
                <ol>
                    <li><strong>Immediate:</strong> Contact this lead directly using the provided contact information</li>
                    <li><strong>Investigation:</strong> Check your webhook/CRM system for connectivity issues</li>
                    <li><strong>Recovery:</strong> The lead data is safely stored in our backup system</li>
                    <li><strong>Prevention:</strong> Monitor system health to prevent future failures</li>
                </ol>

                <div style="text-align: center; margin: 20px 0;">
                    <a href="mailto:${data.formData.email}?subject=Re: Your Mount Vernon Lofts Inquiry&body=Hi ${data.formData.name},%0D%0A%0D%0AThank you for your interest in Mount Vernon Lofts..." class="button">
                        📧 Reply to Lead
                    </a>
                </div>
            </div>

            <div class="footer">
                <p>This is an automated alert from the Mount Vernon Lofts website failsafe system.</p>
                <p>Submission ID: <code>${data.submissionId}</code> | ${new Date(data.timestamp).toISOString()}</p>
            </div>
        </div>
    </body>
    </html>
    `
  }

  /**
   * Generate plain text content for webhook failure notification
   */
  private generateWebhookFailureText(data: EmailNotificationData): string {
    return `
🚨 MVL WEBHOOK FAILURE ALERT

ACTION REQUIRED: Webhook delivery failed for a new contact form submission.

LEAD INFORMATION:
Name: ${data.formData.name}
Email: ${data.formData.email}
Phone: ${data.formData.phone}
Broker: ${data.formData.isBroker || 'Not specified'}
Floor Preference: ${data.formData.preferredFloor || 'Not specified'}
Submission ID: ${data.submissionId}
Timestamp: ${new Date(data.timestamp).toLocaleString()}

MESSAGE:
"${data.formData.message}"

${data.webhookError ? `ERROR DETAILS:\n${data.webhookError}\n` : ''}

NEXT STEPS:
1. Contact this lead immediately using the provided information
2. Investigate webhook/CRM connectivity issues
3. Lead data is safely stored in backup system
4. Monitor system health to prevent future failures

This is an automated alert from the Mount Vernon Lofts website failsafe system.
    `.trim()
  }

  /**
   * Generate HTML content for lead notification
   */
  private generateLeadNotificationHTML(data: EmailNotificationData): string {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New MVL Inquiry</title>
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
                <h1>✨ New MVL Inquiry</h1>
                <p>Mount Vernon Lofts - Montrose Condos</p>
            </div>
            
            <div class="content">
                <h3>📋 Contact Information</h3>
                <div class="lead-data">
                    <table>
                        <tr><td>Name:</td><td><strong>${data.formData.name}</strong></td></tr>
                        <tr><td>Email:</td><td><a href="mailto:${data.formData.email}">${data.formData.email}</a></td></tr>
                        <tr><td>Phone:</td><td><a href="tel:${data.formData.phone}">${data.formData.phone}</a></td></tr>
                        <tr><td>Broker Status:</td><td>${data.formData.isBroker || 'Not specified'}</td></tr>
                        <tr><td>Floor Preference:</td><td>${data.formData.preferredFloor || 'Not specified'}</td></tr>
                        <tr><td>Submitted:</td><td>${new Date(data.timestamp).toLocaleString()}</td></tr>
                    </table>
                </div>

                <h4>💬 Their Message:</h4>
                <div class="lead-data">
                    <p><em>"${data.formData.message}"</em></p>
                </div>

                ${data.formData.preferredFloor ? `
                <div class="priority">
                    <strong>🎯 High Intent:</strong> This prospect has specified a floor preference (${data.formData.preferredFloor}), indicating serious interest.
                </div>
                ` : ''}

                <div style="text-align: center; margin: 20px 0;">
                    <a href="mailto:${data.formData.email}?subject=Re: Your Mount Vernon Lofts Inquiry&body=Hi ${data.formData.name},%0D%0A%0D%0AThank you for your interest in Mount Vernon Lofts..." class="button">
                        📧 Reply via Email
                    </a>
                    <a href="tel:${data.formData.phone}" class="button">
                        📞 Call Now
                    </a>
                </div>
            </div>

            <div class="footer">
                <p>New inquiry received via the Mount Vernon Lofts website contact form.</p>
                <p>Submission ID: <code>${data.submissionId}</code></p>
            </div>
        </div>
    </body>
    </html>
    `
  }

  /**
   * Generate plain text content for lead notification
   */
  private generateLeadNotificationText(data: EmailNotificationData): string {
    return `
✨ NEW MVL INQUIRY

CONTACT INFORMATION:
Name: ${data.formData.name}
Email: ${data.formData.email}
Phone: ${data.formData.phone}
Broker Status: ${data.formData.isBroker || 'Not specified'}
Floor Preference: ${data.formData.preferredFloor || 'Not specified'}
Submitted: ${new Date(data.timestamp).toLocaleString()}

THEIR MESSAGE:
"${data.formData.message}"

${data.formData.preferredFloor ? `HIGH INTENT: This prospect specified a floor preference (${data.formData.preferredFloor}), indicating serious interest.\n` : ''}

NEXT STEPS:
Reply to: ${data.formData.email}
Call: ${data.formData.phone}

New inquiry received via the Mount Vernon Lofts website.
Submission ID: ${data.submissionId}
    `.trim()
  }

  /**
   * Test email configuration
   */
  async testConfiguration(): Promise<boolean> {
    try {
      if (!this.transporter) {
        this.transporter = this.createTransporter()
      }

      if (!this.transporter || !this.config) {
        return false
      }

      await this.transporter.verify()
      console.log('Email configuration test successful')
      return true
    } catch (error) {
      console.error('Email configuration test failed:', error)
      return false
    }
  }

  /**
   * Check if email fallback is enabled and configured
   */
  isConfigured(): boolean {
    if (!this.config) {
      this.config = this.initializeConfig()
    }
    return this.config !== null
  }
}

// Export singleton instance
export const emailFallback = new EmailFallback()