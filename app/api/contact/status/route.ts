import { NextRequest, NextResponse } from "next/server"
import { backupManager, type BackupSummary, type BackupEntry } from "@/lib/backup-manager"
import { emailFallback } from "@/lib/email-fallback"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '7')
    const includeDetails = searchParams.get('details') === 'true'
    
    // Get backup summary statistics
    const summary = await backupManager.getBackupSummary(days)
    
    // Get pending webhooks for retry queue info
    const pendingWebhooks = await backupManager.getPendingWebhooks()
    
    // Calculate system health metrics
    const totalAttempts = summary.deliveredWebhooks + summary.failedWebhooks
    const successRate = totalAttempts > 0 ? (summary.deliveredWebhooks / totalAttempts) * 100 : 100
    
    // Determine system health status
    let healthStatus: 'healthy' | 'degraded' | 'critical'
    if (successRate >= 95) {
      healthStatus = 'healthy'
    } else if (successRate >= 80) {
      healthStatus = 'degraded'
    } else {
      healthStatus = 'critical'
    }
    
    // Check email fallback configuration
    const emailConfigured = emailFallback.isConfigured()
    
    // Build response
    const response: {
      status: string
      timestamp: string
      period: {
        days: number
        from: string
        to: string
      }
      summary: {
        totalSubmissions: number
        webhookStats: {
          delivered: number
          failed: number
          pending: number
          successRate: number
        }
        systemHealth: {
          status: 'healthy' | 'degraded' | 'critical'
          webhookEndpoint: boolean
          emailFallback: boolean
          backupSystem: boolean
        }
      }
      retryQueue: {
        pendingCount: number
        oldestPending: string | null
        nextRetryDue: number | null
      }
      alerts: Array<{
        level: 'info' | 'warning' | 'critical'
        message: string
        timestamp: string
        code: string
      }>
      details?: {
        recentFailures: Array<{
          id: string
          timestamp: string
          attempts: number
          status: string
          lastError: string | undefined
          contact: {
            name: string
            email: string
            preferredFloor: string | undefined
          }
        }>
        configurationStatus: {
          webhookUrl: boolean
          emailSmtp: boolean
          backupStorage: boolean
          environment: string
        }
      }
    } = {
      status: 'operational',
      timestamp: new Date().toISOString(),
      period: {
        days,
        from: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString()
      },
      summary: {
        totalSubmissions: summary.totalSubmissions,
        webhookStats: {
          delivered: summary.deliveredWebhooks,
          failed: summary.failedWebhooks,
          pending: summary.pendingWebhooks,
          successRate: Math.round(successRate * 100) / 100
        },
        systemHealth: {
          status: healthStatus,
          webhookEndpoint: !!process.env.CONTACT_WEBHOOK_URL,
          emailFallback: emailConfigured,
          backupSystem: true
        }
      },
      retryQueue: {
        pendingCount: pendingWebhooks.length,
        oldestPending: pendingWebhooks.length > 0 ? 
          pendingWebhooks.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())[0].timestamp : null,
        nextRetryDue: pendingWebhooks
          .filter(w => w.nextRetryAt)
          .sort((a, b) => (a.nextRetryAt || 0) - (b.nextRetryAt || 0))[0]?.nextRetryAt || null
      },
      alerts: generateAlerts(summary, pendingWebhooks, successRate, emailConfigured)
    }
    
    // Include detailed submission info if requested
    if (includeDetails) {
      const recentSubmissions = pendingWebhooks.slice(0, 10).map(submission => ({
        id: submission.id,
        timestamp: submission.timestamp,
        attempts: submission.attempts,
        status: submission.webhookStatus,
        lastError: submission.error,
        contact: {
          name: submission.formData.name,
          email: submission.formData.email,
          preferredFloor: submission.formData.preferredFloor
        }
      }))
      
      response.details = {
        recentFailures: recentSubmissions,
        configurationStatus: {
          webhookUrl: !!process.env.CONTACT_WEBHOOK_URL,
          emailSmtp: emailConfigured,
          backupStorage: true,
          environment: process.env.NODE_ENV || 'development'
        }
      }
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Status endpoint error:', error)
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Failed to retrieve system status',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

/**
 * Generate system alerts based on current metrics
 */
function generateAlerts(
  summary: BackupSummary,
  pendingWebhooks: BackupEntry[],
  successRate: number,
  emailConfigured: boolean
): Array<{
  level: 'info' | 'warning' | 'critical'
  message: string
  timestamp: string
  code: string
}> {
  const alerts = []
  const timestamp = new Date().toISOString()
  
  // Critical: High failure rate
  if (successRate < 80 && summary.totalSubmissions > 5) {
    alerts.push({
      level: 'critical' as const,
      message: `Webhook success rate is ${successRate.toFixed(1)}% - immediate attention required`,
      timestamp,
      code: 'HIGH_FAILURE_RATE'
    })
  }
  
  // Warning: Degraded performance
  if (successRate < 95 && successRate >= 80 && summary.totalSubmissions > 5) {
    alerts.push({
      level: 'warning' as const,
      message: `Webhook success rate is ${successRate.toFixed(1)}% - performance degraded`,
      timestamp,
      code: 'DEGRADED_PERFORMANCE'
    })
  }
  
  // Warning: Pending webhooks building up
  if (pendingWebhooks.length > 5) {
    alerts.push({
      level: 'warning' as const,
      message: `${pendingWebhooks.length} submissions pending webhook delivery`,
      timestamp,
      code: 'PENDING_QUEUE_BUILDUP'
    })
  }
  
  // Critical: Old pending submissions
  const oldPending = pendingWebhooks.filter(w => 
    Date.now() - new Date(w.timestamp).getTime() > 2 * 60 * 60 * 1000 // 2 hours
  )
  if (oldPending.length > 0) {
    alerts.push({
      level: 'critical' as const,
      message: `${oldPending.length} submissions have been pending for over 2 hours`,
      timestamp,
      code: 'OLD_PENDING_SUBMISSIONS'
    })
  }
  
  // Warning: Webhook not configured
  if (!process.env.CONTACT_WEBHOOK_URL) {
    alerts.push({
      level: 'warning' as const,
      message: 'CONTACT_WEBHOOK_URL environment variable not configured',
      timestamp,
      code: 'WEBHOOK_NOT_CONFIGURED'
    })
  }
  
  // Info: Email fallback not configured
  if (!emailConfigured) {
    alerts.push({
      level: 'info' as const,
      message: 'Email fallback not configured - webhook failures will not trigger email notifications',
      timestamp,
      code: 'EMAIL_FALLBACK_DISABLED'
    })
  }
  
  // Info: System healthy
  if (alerts.length === 0 || alerts.every(a => a.level === 'info')) {
    alerts.push({
      level: 'info' as const,
      message: 'All systems operational',
      timestamp,
      code: 'SYSTEM_HEALTHY'
    })
  }
  
  return alerts
}

/**
 * Health check endpoint for simple uptime monitoring
 */
export async function HEAD() {
  try {
    // Quick health check - just verify backup system is accessible
    const summary = await backupManager.getBackupSummary(1)
    
    // Return 200 if healthy, 503 if degraded
    const totalAttempts = summary.deliveredWebhooks + summary.failedWebhooks
    const successRate = totalAttempts > 0 ? (summary.deliveredWebhooks / totalAttempts) * 100 : 100
    
    if (successRate < 80 && totalAttempts > 5) {
      return new NextResponse(null, { status: 503 }) // Service Unavailable
    }
    
    return new NextResponse(null, { status: 200 })
  } catch (error) {
    return new NextResponse(null, { status: 503 })
  }
}