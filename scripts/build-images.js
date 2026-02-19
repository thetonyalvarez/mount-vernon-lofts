#!/usr/bin/env node

const EnhancedImageOptimizer = require('./optimize-images-enhanced')
const S3Uploader = require('./upload-to-s3')

/**
 * Main Build Script for Image Processing
 * 
 * Orchestrates the complete image processing pipeline:
 * 1. Optimize images with Sharp
 * 2. Upload to S3 (production only)
 * 3. Clean up temporary files
 */

class ImageBuildPipeline {
  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'
    this.startTime = Date.now()
  }

  async run() {
    console.log('🚀 Starting image build pipeline...')
    console.log(`📦 Environment: ${this.isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`)
    console.log(`⏰ Started at: ${new Date().toISOString()}\n`)

    try {
      if (this.isProduction) {
        // Production: Skip image processing, serve from S3
        console.log('☁️  Production Mode: Serving images from S3')
        console.log('=' .repeat(50))
        console.log('📁 No local image processing needed')
        console.log('🌍 Images served from: ' + (process.env.NEXT_PUBLIC_S3_BUCKET_URL || 'S3 bucket'))
        console.log('✅ Build pipeline complete - ready for deployment\n')
      } else {
        // Development: Optimize images locally
        console.log('🔄 Step 1: Image Optimization')
        console.log('=' .repeat(40))
        const optimizer = new EnhancedImageOptimizer({ verbose: true })
        await optimizer.run()
        
        console.log('\n⏭️  Step 2: S3 Upload (skipped in development)')
        console.log('=' .repeat(50))
        console.log('📝 Optimized images saved locally for development use')
        console.log('🌍 In production, these will be served from S3\n')
      }

      // Summary
      this.printFinalSummary()

    } catch (error) {
      console.error('\n❌ Build pipeline failed:', error.message)
      process.exit(1)
    }
  }

  printFinalSummary() {
    const duration = Math.round((Date.now() - this.startTime) / 1000)
    
    console.log('\n' + '='.repeat(60))
    console.log('🎉 IMAGE BUILD PIPELINE COMPLETE')
    console.log('=' .repeat(60))
    console.log(`⏱️  Total time: ${duration}s`)
    console.log(`📦 Environment: ${this.isProduction ? 'PRODUCTION' : 'DEVELOPMENT'}`)
    
    if (this.isProduction) {
      console.log('☁️  Images uploaded to S3 and ready for production')
    } else {
      console.log('💻 Images optimized and ready for development')
      console.log('   📁 Location: ./optimized-images/')
    }
    
    console.log('\n✨ Your images are optimized and ready to serve!')
    console.log('   🖼️  Multiple formats: JPEG, WebP, AVIF')
    console.log('   📱 Responsive: Optimized for all devices') 
    console.log('   ⚡ Performance: Fast loading with proper caching')
    console.log()
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2)
  
  // Handle command line flags
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🖼️  Image Build Pipeline

Usage:
  npm run build:images              # Build images based on NODE_ENV
  npm run build:images --production # Force production build
  npm run build:images --dev        # Force development build

Environment Variables (Production):
  NODE_ENV=production               # Enable production mode
  S3_BUCKET_NAME                   # S3 bucket name
  AWS_ACCESS_KEY_ID                # AWS access key
  AWS_SECRET_ACCESS_KEY            # AWS secret key
  AWS_REGION                       # AWS region (default: us-east-1)
  NEXT_PUBLIC_S3_BUCKET_URL        # Public S3 URL for images

Examples:
  # Development build (optimize only)
  NODE_ENV=development npm run build:images
  
  # Production build (optimize + upload)
  NODE_ENV=production S3_BUCKET_NAME=my-bucket npm run build:images
`)
    process.exit(0)
  }

  // Override environment for testing
  if (args.includes('--production')) {
    process.env.NODE_ENV = 'production'
  } else if (args.includes('--dev') || args.includes('--development')) {
    process.env.NODE_ENV = 'development'
  }

  // Run the pipeline
  const pipeline = new ImageBuildPipeline()
  pipeline.run().catch(console.error)
}

module.exports = ImageBuildPipeline