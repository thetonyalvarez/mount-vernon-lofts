"use client"

import type { FormData, EnhancedFormData } from '@/app/types'

export interface QueuedSubmission {
  id: string
  timestamp: number
  formData: EnhancedFormData
  attempts: number
  lastAttemptAt?: number
  error?: string
  status: 'pending' | 'retrying' | 'failed' | 'succeeded'
  nextRetryAt?: number
}

export interface QueueStats {
  total: number
  pending: number
  retrying: number
  failed: number
  succeeded: number
  oldestPending?: number
}

class FormQueue {
  private readonly storageKey = 'mvl_form_queue'
  private readonly maxRetries = 5
  private readonly baseDelay = 1000 // 1 second
  private retryTimer: NodeJS.Timeout | null = null
  private isOnline = true
  private listeners: Array<(stats: QueueStats) => void> = []

  constructor() {
    // Only run in browser environment
    if (typeof window !== 'undefined') {
      this.initializeOnlineDetection()
      this.startRetryProcessor()
      this.cleanupOldSubmissions()
    }
  }

  /**
   * Initialize online/offline detection
   */
  private initializeOnlineDetection(): void {
    this.isOnline = navigator.onLine

    window.addEventListener('online', () => {
      console.log('Network connection restored')
      this.isOnline = true
      this.processRetryQueue()
    })

    window.addEventListener('offline', () => {
      console.log('Network connection lost')
      this.isOnline = false
    })
  }

  /**
   * Add a submission to the queue
   */
  addToQueue(
    formData: EnhancedFormData,
    metadata?: Record<string, unknown>
  ): string {
    if (typeof window === 'undefined') return ''

    const submissionId = `queue_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const queuedSubmission: QueuedSubmission = {
      id: submissionId,
      timestamp: Date.now(),
      formData: {
        ...formData,
        submissionId
      },
      attempts: 0,
      status: 'pending'
    }

    const queue = this.getQueue()
    queue.push(queuedSubmission)
    this.saveQueue(queue)
    
    console.log(`Added submission to queue: ${submissionId}`)
    this.notifyListeners()
    
    // Try to process immediately if online
    if (this.isOnline) {
      this.processSubmission(submissionId)
    }

    return submissionId
  }

  /**
   * Process a specific submission
   */
  private async processSubmission(submissionId: string): Promise<void> {
    const queue = this.getQueue()
    const submission = queue.find(s => s.id === submissionId)
    
    if (!submission || submission.status === 'succeeded') {
      return
    }

    // Check if we should wait before retrying
    if (submission.nextRetryAt && Date.now() < submission.nextRetryAt) {
      return
    }

    submission.status = 'retrying'
    submission.attempts += 1
    submission.lastAttemptAt = Date.now()
    this.saveQueue(queue)
    this.notifyListeners()

    try {
      // Prepare payload similar to ContactModal
      const payload = {
        formData: submission.formData,
        metadata: {
          modalId: submission.formData.modalId || 'contact_modal_queue',
          modalTriggerSource: submission.formData.triggerSource || 'queue_retry',
          siteUrl: window.location.origin,
          submissionId: submission.id,
          queuedAt: submission.timestamp,
          retryAttempt: submission.attempts
        }
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        // Success - remove from queue
        submission.status = 'succeeded'
        console.log(`Queue submission succeeded: ${submissionId}`)
        
        // Remove successful submissions after a delay to show user feedback
        setTimeout(() => {
          this.removeFromQueue(submissionId)
        }, 5000)
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.warn(`Queue submission failed (attempt ${submission.attempts}): ${errorMessage}`)
      
      submission.error = errorMessage
      
      if (submission.attempts >= this.maxRetries) {
        submission.status = 'failed'
        console.error(`Queue submission permanently failed: ${submissionId}`)
      } else {
        // Calculate next retry time with exponential backoff
        const delay = this.baseDelay * Math.pow(2, submission.attempts - 1)
        submission.nextRetryAt = Date.now() + delay
        submission.status = 'pending'
        console.log(`Will retry submission in ${delay}ms: ${submissionId}`)
      }
    }

    this.saveQueue(queue)
    this.notifyListeners()
  }

  /**
   * Process all pending submissions in the queue
   */
  private async processRetryQueue(): Promise<void> {
    if (!this.isOnline) {
      return
    }

    const queue = this.getQueue()
    const pendingSubmissions = queue.filter(s => 
      s.status === 'pending' && 
      (!s.nextRetryAt || Date.now() >= s.nextRetryAt)
    )

    console.log(`Processing ${pendingSubmissions.length} pending submissions`)

    // Process submissions with a delay to avoid overwhelming the server
    for (let i = 0; i < pendingSubmissions.length; i++) {
      setTimeout(() => {
        this.processSubmission(pendingSubmissions[i].id)
      }, i * 500) // 500ms delay between submissions
    }
  }

  /**
   * Start the retry processor
   */
  private startRetryProcessor(): void {
    // Process queue every 30 seconds
    this.retryTimer = setInterval(() => {
      this.processRetryQueue()
    }, 30000)
  }

  /**
   * Remove a submission from the queue
   */
  removeFromQueue(submissionId: string): void {
    if (typeof window === 'undefined') return

    const queue = this.getQueue()
    const filteredQueue = queue.filter(s => s.id !== submissionId)
    this.saveQueue(filteredQueue)
    this.notifyListeners()
    
    console.log(`Removed submission from queue: ${submissionId}`)
  }

  /**
   * Get current queue from localStorage
   */
  private getQueue(): QueuedSubmission[] {
    if (typeof window === 'undefined') return []

    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Failed to parse queue from localStorage:', error)
      return []
    }
  }

  /**
   * Save queue to localStorage
   */
  private saveQueue(queue: QueuedSubmission[]): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(queue))
    } catch (error) {
      console.error('Failed to save queue to localStorage:', error)
    }
  }

  /**
   * Get queue statistics
   */
  getStats(): QueueStats {
    const queue = this.getQueue()
    
    const stats: QueueStats = {
      total: queue.length,
      pending: 0,
      retrying: 0,
      failed: 0,
      succeeded: 0
    }

    queue.forEach(submission => {
      switch (submission.status) {
        case 'pending':
          stats.pending++
          if (!stats.oldestPending || submission.timestamp < stats.oldestPending) {
            stats.oldestPending = submission.timestamp
          }
          break
        case 'retrying':
          stats.retrying++
          break
        case 'failed':
          stats.failed++
          break
        case 'succeeded':
          stats.succeeded++
          break
      }
    })

    return stats
  }

  /**
   * Check if we're currently online
   */
  isNetworkOnline(): boolean {
    return this.isOnline
  }

  /**
   * Get all submissions (for debugging/export)
   */
  getAllSubmissions(): QueuedSubmission[] {
    return this.getQueue()
  }

  /**
   * Clear all submissions from queue
   */
  clearQueue(): void {
    if (typeof window === 'undefined') return

    localStorage.removeItem(this.storageKey)
    this.notifyListeners()
    console.log('Queue cleared')
  }

  /**
   * Clean up old successful submissions
   */
  private cleanupOldSubmissions(): void {
    const queue = this.getQueue()
    const cutoffTime = Date.now() - (24 * 60 * 60 * 1000) // 24 hours
    
    const filteredQueue = queue.filter(submission => {
      // Keep failed and pending submissions
      if (submission.status === 'failed' || submission.status === 'pending' || submission.status === 'retrying') {
        return true
      }
      
      // Remove old successful submissions
      return submission.timestamp > cutoffTime
    })

    if (filteredQueue.length < queue.length) {
      this.saveQueue(filteredQueue)
      console.log(`Cleaned up ${queue.length - filteredQueue.length} old submissions`)
    }
  }

  /**
   * Subscribe to queue statistics updates
   */
  subscribe(callback: (stats: QueueStats) => void): () => void {
    this.listeners.push(callback)
    
    // Send initial stats
    callback(this.getStats())
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback)
    }
  }

  /**
   * Notify all listeners of queue changes
   */
  private notifyListeners(): void {
    const stats = this.getStats()
    this.listeners.forEach(callback => callback(stats))
  }

  /**
   * Retry a specific failed submission
   */
  retrySubmission(submissionId: string): void {
    const queue = this.getQueue()
    const submission = queue.find(s => s.id === submissionId)
    
    if (submission && submission.status === 'failed') {
      submission.status = 'pending'
      submission.nextRetryAt = undefined
      submission.error = undefined
      this.saveQueue(queue)
      this.notifyListeners()
      
      // Try to process immediately if online
      if (this.isOnline) {
        this.processSubmission(submissionId)
      }
    }
  }

  /**
   * Cleanup when component unmounts
   */
  destroy(): void {
    if (this.retryTimer) {
      clearInterval(this.retryTimer)
      this.retryTimer = null
    }
    this.listeners = []
  }
}

// Export singleton instance
export const formQueue = new FormQueue()

// Utility function to format time ago
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`
  } else {
    return 'Just now'
  }
}

// Utility function to format next retry time
export function formatNextRetry(nextRetryAt?: number): string {
  if (!nextRetryAt) return 'Soon'
  
  const now = Date.now()
  const diff = nextRetryAt - now
  
  if (diff <= 0) return 'Now'
  
  const seconds = Math.ceil(diff / 1000)
  const minutes = Math.ceil(diff / (1000 * 60))
  
  if (minutes > 1) {
    return `in ${minutes} minutes`
  } else {
    return `in ${seconds} seconds`
  }
}