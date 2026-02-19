import { NextRequest, NextResponse } from "next/server"
import { backupManager } from "@/lib/backup-manager"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parse query parameters
    const days = parseInt(searchParams.get('days') || '30')
    const format = searchParams.get('format') || 'csv'
    const status = searchParams.get('status') // 'pending', 'failed', 'delivered', or null for all
    const includeMetadata = searchParams.get('metadata') === 'true'
    
    // Validate parameters
    if (days < 1 || days > 365) {
      return NextResponse.json(
        { error: 'Days parameter must be between 1 and 365' },
        { status: 400 }
      )
    }
    
    if (!['csv', 'json'].includes(format)) {
      return NextResponse.json(
        { error: 'Format must be either "csv" or "json"' },
        { status: 400 }
      )
    }
    
    // Get export data based on format
    if (format === 'csv') {
      const csvData = await backupManager.exportAsCSV(days)
      
      if (!csvData) {
        return NextResponse.json(
          { error: 'Failed to generate CSV export' },
          { status: 500 }
        )
      }
      
      // Filter by status if specified
      let filteredCsv = csvData
      if (status) {
        const lines = csvData.split('\n')
        const header = lines[0]
        const statusColumnIndex = header.split(',').findIndex(col => 
          col.toLowerCase().includes('webhook status')
        )
        
        if (statusColumnIndex !== -1) {
          const filteredLines = [header, ...lines.slice(1).filter(line => {
            const columns = line.split(',')
            const statusValue = columns[statusColumnIndex]?.replace(/"/g, '').toLowerCase()
            return statusValue === status.toLowerCase()
          })]
          filteredCsv = filteredLines.join('\n')
        }
      }
      
      // Generate filename with timestamp and filters
      const timestamp = new Date().toISOString().split('T')[0]
      const statusSuffix = status ? `_${status}` : ''
      const filename = `mvl_submissions_${timestamp}_${days}days${statusSuffix}.csv`
      
      return new NextResponse(filteredCsv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Export-Count': (filteredCsv.split('\n').length - 1).toString() // Subtract header row
        }
      })
    }
    
    // JSON format
    const allSubmissions = await backupManager.getAllSubmissions()
    
    // Filter by date range
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000)
    let filteredSubmissions = allSubmissions.filter(submission => 
      new Date(submission.timestamp).getTime() > cutoffTime
    )
    
    // Filter by status if specified
    if (status) {
      filteredSubmissions = filteredSubmissions.filter(submission => 
        submission.webhookStatus.toLowerCase() === status.toLowerCase()
      )
    }
    
    // Transform data for export
    const exportData = filteredSubmissions.map(submission => {
      const baseData: {
        submissionId: string
        timestamp: string
        contact: {
          name: string
          email: string
          phone: string
          message: string
          isBroker: string | undefined
          preferredFloor: string | undefined
        }
        webhook: {
          status: string
          attempts: number
          lastAttemptAt: string | undefined
          error: string | undefined
        }
        metadata?: Record<string, unknown>
      } = {
        submissionId: submission.id,
        timestamp: submission.timestamp,
        contact: {
          name: submission.formData.name,
          email: submission.formData.email,
          phone: submission.formData.phone,
          message: submission.formData.message,
          isBroker: submission.formData.isBroker,
          preferredFloor: submission.formData.preferredFloor
        },
        webhook: {
          status: submission.webhookStatus,
          attempts: submission.attempts,
          lastAttemptAt: submission.lastAttemptAt,
          error: submission.error
        }
      }
      
      // Include metadata if requested
      if (includeMetadata && submission.metadata) {
        baseData.metadata = submission.metadata
      }
      
      return baseData
    })
    
    // Generate summary statistics
    const summary = {
      exportInfo: {
        timestamp: new Date().toISOString(),
        period: {
          days,
          from: new Date(cutoffTime).toISOString(),
          to: new Date().toISOString()
        },
        filters: {
          status: status || 'all',
          includeMetadata
        },
        totalRecords: exportData.length
      },
      statistics: {
        byStatus: {
          pending: exportData.filter(s => s.webhook.status === 'pending').length,
          delivered: exportData.filter(s => s.webhook.status === 'delivered').length,
          failed: exportData.filter(s => s.webhook.status === 'failed').length
        },
        byFloorPreference: exportData.reduce((acc, s) => {
          const floor = s.contact.preferredFloor || 'not_specified'
          acc[floor] = (acc[floor] || 0) + 1
          return acc
        }, {} as Record<string, number>),
        brokerSubmissions: exportData.filter(s => 
          s.contact.isBroker === 'yes'
        ).length
      }
    }
    
    const response = {
      summary,
      submissions: exportData
    }
    
    // Generate filename for JSON
    const timestamp = new Date().toISOString().split('T')[0]
    const statusSuffix = status ? `_${status}` : ''
    const filename = `mvl_submissions_${timestamp}_${days}days${statusSuffix}.json`
    
    return NextResponse.json(response, {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Export-Count': exportData.length.toString()
      }
    })
    
  } catch (error) {
    console.error('Export endpoint error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to export data',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

/**
 * Get submissions summary for manual recovery planning
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { submissionIds, action } = body
    
    if (!Array.isArray(submissionIds) || submissionIds.length === 0) {
      return NextResponse.json(
        { error: 'submissionIds array is required' },
        { status: 400 }
      )
    }
    
    if (!['retry', 'mark_delivered', 'get_details'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be retry, mark_delivered, or get_details' },
        { status: 400 }
      )
    }
    
    const results = []
    
    for (const submissionId of submissionIds) {
      try {
        switch (action) {
          case 'retry':
            // Mark submission for retry by updating status to pending
            await backupManager.updateWebhookStatus(submissionId, 'pending')
            results.push({ 
              submissionId, 
              success: true, 
              action: 'marked_for_retry' 
            })
            break
            
          case 'mark_delivered':
            // Mark submission as delivered manually
            await backupManager.updateWebhookStatus(submissionId, 'delivered', 'Manually marked as delivered')
            results.push({ 
              submissionId, 
              success: true, 
              action: 'marked_delivered' 
            })
            break
            
          case 'get_details':
            // Get submission details for manual processing
            const allSubmissions = await backupManager.getAllSubmissions()
            const submission = allSubmissions.find(s => s.id === submissionId)
            
            if (submission) {
              results.push({
                submissionId,
                success: true,
                action: 'details_retrieved',
                data: {
                  timestamp: submission.timestamp,
                  contact: submission.formData,
                  webhook: {
                    status: submission.webhookStatus,
                    attempts: submission.attempts,
                    error: submission.error
                  },
                  metadata: submission.metadata
                }
              })
            } else {
              results.push({
                submissionId,
                success: false,
                error: 'Submission not found'
              })
            }
            break
        }
      } catch (error) {
        results.push({
          submissionId,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }
    
    return NextResponse.json({
      action,
      results,
      summary: {
        total: submissionIds.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      },
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Export management error:', error)
    
    return NextResponse.json(
      {
        error: 'Failed to process management action',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}