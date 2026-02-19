/**
 * IP Anonymization Service
 * Handles privacy-compliant IP address processing and geographic data extraction
 */

import type { GeographicData } from '@/lib/types/webhook'

interface IPGeolocationResponse {
  country?: string
  region?: string
  city?: string
  timezone?: string
  latitude?: number
  longitude?: number
  accuracy?: 'country' | 'region' | 'city'
}

class IPAnonymizer {
  /**
   * Anonymize IPv4 address by masking the last octet
   */
  private anonymizeIPv4(ip: string): string {
    const parts = ip.split('.')
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.XXX`
    }
    return 'XXX.XXX.XXX.XXX'
  }

  /**
   * Anonymize IPv6 address by masking the last 64 bits
   */
  private anonymizeIPv6(ip: string): string {
    const parts = ip.split(':')
    if (parts.length >= 4) {
      const anonymized = parts.slice(0, 4).join(':')
      return `${anonymized}:XXXX:XXXX:XXXX:XXXX`
    }
    return 'XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX'
  }

  /**
   * Determine if IP is IPv4 or IPv6 and anonymize accordingly
   */
  anonymizeIP(ip: string): string {
    if (!ip || ip === '::1' || ip === '127.0.0.1') {
      return 'localhost'
    }

    // IPv6 detection
    if (ip.includes(':')) {
      return this.anonymizeIPv6(ip)
    }
    
    // IPv4
    return this.anonymizeIPv4(ip)
  }

  /**
   * Extract geographic data from IP using external service
   * Note: This should be done before IP anonymization
   */
  async getGeographicData(ip: string): Promise<IPGeolocationResponse | null> {
    // Skip localhost and private IPs
    if (!ip || ip === '::1' || ip === '127.0.0.1' || this.isPrivateIP(ip)) {
      return null
    }

    try {
      // Using ipapi.co as an example - replace with your preferred service
      // Other options: ipstack.com, ipgeolocation.io, etc.
      const response = await fetch(`https://ipapi.co/${ip}/json/`)
      
      if (!response.ok) {
        console.warn(`IP geolocation lookup failed: ${response.status}`)
        return null
      }

      const data = await response.json()
      
      return {
        country: data.country_name || undefined,
        region: data.region || undefined,
        city: data.city || undefined,
        timezone: data.timezone || undefined,
        latitude: data.latitude || undefined,
        longitude: data.longitude || undefined,
        accuracy: this.determineAccuracy(data)
      }
    } catch (error) {
      console.error('Error fetching IP geolocation:', error)
      return null
    }
  }

  /**
   * Determine accuracy level of geolocation data
   */
  private determineAccuracy(data: Record<string, unknown>): 'country' | 'region' | 'city' {
    if (data.city && data.latitude && data.longitude) return 'city'
    if (data.region) return 'region'
    return 'country'
  }

  /**
   * Check if IP is in private range
   */
  private isPrivateIP(ip: string): boolean {
    // IPv4 private ranges
    const privateIPv4Ranges = [
      /^10\./,
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
      /^192\.168\./,
      /^127\./,
      /^169\.254\./
    ]

    // IPv6 private ranges
    const privateIPv6Ranges = [
      /^::1$/,
      /^fc00:/,
      /^fd00:/,
      /^fe80:/
    ]

    if (ip.includes(':')) {
      return privateIPv6Ranges.some(range => range.test(ip))
    }

    return privateIPv4Ranges.some(range => range.test(ip))
  }

  /**
   * Get client IP from request headers
   */
  extractClientIP(request: Request): string {
    // Check various headers in order of preference
    const headers = [
      'cf-connecting-ip',      // Cloudflare
      'x-real-ip',            // Nginx
      'x-forwarded-for',      // Load balancers
      'x-client-ip',          // Apache
      'x-forwarded',          // General
      'forwarded-for',        // RFC 7239
      'forwarded',            // RFC 7239
    ]

    for (const header of headers) {
      const value = request.headers.get(header)
      if (value) {
        // x-forwarded-for can contain multiple IPs, take the first one
        const ip = value.split(',')[0].trim()
        if (ip) return ip
      }
    }

    // Fallback to connection IP (not available in Next.js Edge Runtime)
    return 'unknown'
  }

  /**
   * Process IP for webhook payload
   * Extracts geographic data then anonymizes the IP
   */
  async processIPForWebhook(request: Request, timezone: string): Promise<GeographicData> {
    const clientIP = this.extractClientIP(request)
    
    // Get geographic data before anonymization
    const geoData = await this.getGeographicData(clientIP)
    
    // Anonymize the IP
    const anonymizedIP = this.anonymizeIP(clientIP)

    return {
      anonymizedIp: anonymizedIP,
      country: geoData?.country,
      region: geoData?.region,
      city: geoData?.city,
      timezone: geoData?.timezone || timezone,
      estimatedLocation: geoData?.latitude && geoData?.longitude ? {
        latitude: geoData.latitude,
        longitude: geoData.longitude,
        accuracy: geoData.accuracy || 'city'
      } : undefined
    }
  }

  /**
   * Alternative method using browser timezone as fallback
   */
  createGeographicDataFromTimezone(request: Request, timezone: string): GeographicData {
    const clientIP = this.extractClientIP(request)
    const anonymizedIP = this.anonymizeIP(clientIP)

    // Extract country from timezone if possible
    let country: string | undefined
    if (timezone) {
      const timezoneParts = timezone.split('/')
      if (timezoneParts.length > 0) {
        // Simple mapping of some common timezones to countries
        const timezoneToCountry: Record<string, string> = {
          'America': 'United States',
          'Europe': 'Europe',
          'Asia': 'Asia',
          'Australia': 'Australia',
          'Africa': 'Africa'
        }
        country = timezoneToCountry[timezoneParts[0]]
      }
    }

    return {
      anonymizedIp: anonymizedIP,
      country,
      timezone
    }
  }
}

// Create singleton instance
const ipAnonymizer = new IPAnonymizer()

export default ipAnonymizer
export { IPAnonymizer }