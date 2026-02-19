"use client"

import NextImage, { ImageProps } from "next/image"
import { forwardRef } from "react"

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  alt: string
}

/**
 * OptimizedImage Component
 * 
 * Automatically serves images from:
 * - Development: Local /public directory
 * - Production: S3 bucket with CDN
 * 
 * Features:
 * - Environment-based URL switching
 * - Next.js Image optimization
 * - Automatic WebP/AVIF conversion (when supported)
 * - Lazy loading by default
 * - Default responsive sizes for fill images to optimize performance
 */
const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  ({ src, alt, fill, sizes, ...props }, ref) => {
    // Determine image URL based on environment
    const getImageUrl = (imageSrc: string): string => {
      // Remove leading slash if present for consistency
      const cleanSrc = imageSrc.startsWith('/') ? imageSrc.slice(1) : imageSrc
      
      if (process.env.NODE_ENV === 'production') {
        // Production: Use S3 bucket URL
        const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL
        
        if (!s3BaseUrl) {
          console.warn(
            'NEXT_PUBLIC_S3_BUCKET_URL is not defined. Falling back to local images.'
          )
          return `/${cleanSrc}`
        }
        
        return `${s3BaseUrl}/${cleanSrc}`
      }
      
      // Development: Use local images
      return `/${cleanSrc}`
    }

    const imageUrl = getImageUrl(src)
    
    // Provide default responsive sizes for fill images to optimize performance
    // This tells the browser which image size to download based on viewport width:
    // - Mobile (≤768px): Full viewport width (100vw)
    // - Tablet (≤1200px): 80% of viewport width (80vw)
    // - Desktop (>1200px): 70% of viewport width (70vw)
    // This covers most luxury real estate image layouts while maintaining performance
    const defaultSizes = fill && !sizes 
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
      : sizes

    return (
      <NextImage
        ref={ref}
        src={imageUrl}
        alt={alt}
        fill={fill}
        sizes={defaultSizes}
        unoptimized={false}
        {...props}
      />
    )
  }
)

OptimizedImage.displayName = "Image"

// Export as Image for easy drop-in replacement
export { OptimizedImage as Image }
export default OptimizedImage