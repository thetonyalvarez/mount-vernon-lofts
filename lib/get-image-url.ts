/**
 * Get the correct image URL based on environment
 * Used for CSS background images and other non-Next.js Image uses
 */
export function getImageUrl(imagePath: string): string {
  // Remove leading slash if present for consistency
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  if (process.env.NODE_ENV === 'production') {
    const s3BaseUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL;
    
    if (!s3BaseUrl) {
      console.warn('NEXT_PUBLIC_S3_BUCKET_URL is not defined. Falling back to local images.');
      return `/${cleanPath}`;
    }
    
    return `${s3BaseUrl}/${cleanPath}`;
  }
  
  // Development: Use local images
  return `/${cleanPath}`;
}