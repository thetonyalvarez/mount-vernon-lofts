import { promises as fs } from 'fs'
import path from 'path'
import type { FormContactData } from '@/lib/types/webhook'

export interface BackupEntry {
  id: string
  timestamp: string
  formData: FormContactData
  webhookStatus: 'pending' | 'delivered' | 'failed'
  attempts: number
  lastAttemptAt?: string
  error?: string
  metadata?: Record<string, unknown>
  nextRetryAt?: number
}

export interface BackupSummary {
  totalSubmissions: number
  pendingWebhooks: number
  failedWebhooks: number
  deliveredWebhooks: number
  oldestPending?: string
  newestSubmission?: string
}

class BackupManager {
  private readonly backupDir = '/tmp/mvl-backups'
  
  /**
   * Initialize backup directory
   */
  private async ensureBackupDir(): Promise<void> {
    try {
      await fs.mkdir(this.backupDir, { recursive: true })
    } catch (error) {
      console.error('Failed to create backup directory:', error)
    }
  }

  /**
   * Get backup file path for today
   */
  private getBackupFilePath(date?: Date): string {
    const targetDate = date || new Date()
    const dateStr = targetDate.toISOString().split('T')[0]
    return path.join(this.backupDir, `submissions_${dateStr}.json`)
  }

  /**
   * Store a form submission as backup
   */
  async storeSubmission(
    submissionId: string,
    formData: FormContactData,
    webhookStatus: 'pending' | 'delivered' | 'failed' = 'pending',
    metadata?: Record<string, unknown>
  ): Promise<boolean> {
    try {
      await this.ensureBackupDir()
      
      const backupEntry: BackupEntry = {
        id: submissionId,
        timestamp: new Date().toISOString(),
        formData,
        webhookStatus,
        attempts: 0,
        metadata
      }

      const filePath = this.getBackupFilePath()
      let existingData: BackupEntry[] = []

      // Read existing data if file exists
      try {
        const fileContent = await fs.readFile(filePath, 'utf-8')
        existingData = JSON.parse(fileContent)
      } catch {
        // File doesn't exist yet, start with empty array
      }

      // Add new entry
      existingData.push(backupEntry)

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(existingData, null, 2))
      
      console.log(`Backup stored: ${submissionId}`)
      return true
    } catch (error) {
      console.error('Failed to store backup:', error)
      return false
    }
  }

  /**
   * Update webhook status for a submission
   */
  async updateWebhookStatus(
    submissionId: string,
    status: 'pending' | 'delivered' | 'failed',
    error?: string
  ): Promise<boolean> {
    try {
      const filePath = this.getBackupFilePath()
      
      // Read existing data
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const existingData: BackupEntry[] = JSON.parse(fileContent)

      // Find and update the entry
      const entryIndex = existingData.findIndex(entry => entry.id === submissionId)
      if (entryIndex === -1) {
        console.warn(`Submission not found for update: ${submissionId}`)
        return false
      }

      existingData[entryIndex].webhookStatus = status
      existingData[entryIndex].attempts += 1
      existingData[entryIndex].lastAttemptAt = new Date().toISOString()
      
      if (error) {
        existingData[entryIndex].error = error
      }

      // Write back to file
      await fs.writeFile(filePath, JSON.stringify(existingData, null, 2))
      
      console.log(`Webhook status updated: ${submissionId} -> ${status}`)
      return true
    } catch (error) {
      console.error('Failed to update webhook status:', error)
      return false
    }
  }

  /**
   * Get submissions that need webhook retry
   */
  async getPendingWebhooks(maxAge: number = 24 * 60 * 60 * 1000): Promise<BackupEntry[]> {
    try {
      const filePath = this.getBackupFilePath()
      
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const existingData: BackupEntry[] = JSON.parse(fileContent)

      const cutoffTime = new Date(Date.now() - maxAge).toISOString()

      return existingData.filter(entry => 
        entry.webhookStatus === 'pending' || 
        (entry.webhookStatus === 'failed' && entry.timestamp > cutoffTime && entry.attempts < 5)
      )
    } catch (error) {
      console.error('Failed to get pending webhooks:', error)
      return []
    }
  }

  /**
   * Get backup summary statistics
   */
  async getBackupSummary(days: number = 7): Promise<BackupSummary> {
    try {
      const summary: BackupSummary = {
        totalSubmissions: 0,
        pendingWebhooks: 0,
        failedWebhooks: 0,
        deliveredWebhooks: 0
      }

      // Check last N days
      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        
        const filePath = this.getBackupFilePath(date)
        
        try {
          const fileContent = await fs.readFile(filePath, 'utf-8')
          const data: BackupEntry[] = JSON.parse(fileContent)
          
          summary.totalSubmissions += data.length
          
          data.forEach(entry => {
            switch (entry.webhookStatus) {
              case 'pending':
                summary.pendingWebhooks++
                if (!summary.oldestPending || entry.timestamp < summary.oldestPending) {
                  summary.oldestPending = entry.timestamp
                }
                break
              case 'failed':
                summary.failedWebhooks++
                break
              case 'delivered':
                summary.deliveredWebhooks++
                break
            }
            
            if (!summary.newestSubmission || entry.timestamp > summary.newestSubmission) {
              summary.newestSubmission = entry.timestamp
            }
          })
        } catch {
          // File doesn't exist for this date, continue
        }
      }

      return summary
    } catch (error) {
      console.error('Failed to get backup summary:', error)
      return {
        totalSubmissions: 0,
        pendingWebhooks: 0,
        failedWebhooks: 0,
        deliveredWebhooks: 0
      }
    }
  }

  /**
   * Get all submissions from backup files
   */
  async getAllSubmissions(days: number = 30): Promise<BackupEntry[]> {
    try {
      const allEntries: BackupEntry[] = []

      // Collect data from last N days
      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        
        const filePath = this.getBackupFilePath(date)
        
        try {
          const fileContent = await fs.readFile(filePath, 'utf-8')
          const data: BackupEntry[] = JSON.parse(fileContent)
          allEntries.push(...data)
        } catch {
          // File doesn't exist for this date, continue
        }
      }

      return allEntries
    } catch (error) {
      console.error('Failed to get all submissions:', error)
      return []
    }
  }

  /**
   * Export all backup data as CSV
   */
  async exportAsCSV(days: number = 30): Promise<string> {
    try {
      const allEntries: BackupEntry[] = []

      // Collect data from last N days
      for (let i = 0; i < days; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        
        const filePath = this.getBackupFilePath(date)
        
        try {
          const fileContent = await fs.readFile(filePath, 'utf-8')
          const data: BackupEntry[] = JSON.parse(fileContent)
          allEntries.push(...data)
        } catch {
          // File doesn't exist for this date, continue
        }
      }

      // Create CSV headers
      const headers = [
        'Submission ID',
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Message',
        'Is Broker',
        'Preferred Floor',
        'Webhook Status',
        'Attempts',
        'Last Attempt',
        'Error'
      ]

      // Create CSV rows
      const rows = allEntries.map(entry => [
        entry.id,
        entry.timestamp,
        entry.formData.name,
        entry.formData.email,
        entry.formData.phone,
        entry.formData.message.replace(/"/g, '""'), // Escape quotes
        entry.formData.isBroker || '',
        entry.formData.preferredFloor || '',
        entry.webhookStatus,
        entry.attempts.toString(),
        entry.lastAttemptAt || '',
        entry.error || ''
      ])

      // Combine headers and rows
      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n')

      return csvContent
    } catch (error) {
      console.error('Failed to export CSV:', error)
      return ''
    }
  }

  /**
   * Clean up old backup files
   */
  async cleanupOldBackups(retentionDays: number = 30): Promise<number> {
    try {
      await this.ensureBackupDir()
      
      const files = await fs.readdir(this.backupDir)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays)
      
      let deletedCount = 0
      
      for (const file of files) {
        if (file.startsWith('submissions_') && file.endsWith('.json')) {
          const dateStr = file.replace('submissions_', '').replace('.json', '')
          const fileDate = new Date(dateStr)
          
          if (fileDate < cutoffDate) {
            await fs.unlink(path.join(this.backupDir, file))
            deletedCount++
          }
        }
      }
      
      console.log(`Cleaned up ${deletedCount} old backup files`)
      return deletedCount
    } catch (error) {
      console.error('Failed to cleanup old backups:', error)
      return 0
    }
  }
}

// Export singleton instance
export const backupManager = new BackupManager()