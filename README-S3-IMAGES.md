# 🖼️ S3 Image Integration System

## Overview
This system provides automatic image optimization and S3 integration for the Mount Vernon Lofts website, with environment-based serving and build-time optimization.

## 🏗️ Architecture

```
Development Flow:
Local Images → Optimization → Local Serving

Production Flow:  
Local Images → Optimization → S3 Upload → CDN Serving
```

## 🚀 Quick Start

### Development
```bash
# Regular development (uses local images)
npm run dev

# Optimize images for testing
npm run build:images:dev
```

### Production
```bash
# Full production build (optimize + upload + build)
npm run build

# Just optimize and upload images
npm run build:images:prod
```

## 📁 File Structure

```
mvl-website/
├── components/ui/image.tsx      # Smart Image component
├── scripts/
│   ├── optimize-images.js       # Image optimization with Sharp
│   ├── upload-to-s3.js         # S3 upload with AWS SDK v3
│   └── build-images.js         # Main pipeline orchestrator
├── public/images/              # Source images (dev only, not in git)
├── optimized-images/           # Generated optimized images
├── .env.local                  # Development environment
├── .env.production            # Production environment
└── docs/deployment-guide.md   # Detailed deployment instructions
```

## 🔧 Components

### 1. Smart Image Component (`components/ui/image.tsx`)
- **Purpose**: Drop-in replacement for Next.js Image
- **Features**: 
  - Environment-based URL switching
  - Development: serves from `/public/images/`
  - Production: serves from S3 bucket URL
  - Maintains all Next.js Image optimization features

**Usage**:
```tsx
// Before
import Image from "next/image"

// After  
import Image from "@/components/ui/image"

// No other changes needed!
<Image src="images/exterior-2.jpg" alt="..." />
```

### 2. Image Optimization Script (`scripts/optimize-images.js`)
- **Purpose**: Convert images to multiple optimized formats
- **Features**:
  - Multiple formats: JPEG, WebP, AVIF, PNG
  - Quality optimization per format
  - Maintains directory structure
  - Progress tracking and error handling

### 3. S3 Upload Script (`scripts/upload-to-s3.js`)
- **Purpose**: Upload optimized images to S3
- **Features**:
  - Checksum-based change detection
  - Batch uploads with concurrency control
  - Proper cache headers (1 year)
  - Progress tracking

### 4. Build Pipeline (`scripts/build-images.js`)
- **Purpose**: Orchestrate the complete process
- **Features**:
  - Environment-aware execution
  - Development: optimize only
  - Production: optimize + upload
  - Comprehensive logging and error handling

## 🎛️ Available Commands

```bash
# Main commands
npm run dev                    # Development server
npm run build                  # Full production build (images + next)
npm run build:next            # Next.js build only (skip images)

# Image-specific commands
npm run build:images          # Build images based on NODE_ENV
npm run build:images:dev      # Force development build (optimize only)
npm run build:images:prod     # Force production build (optimize + upload)

# Individual operations
npm run optimize:images       # Optimize images only
npm run upload:s3            # Upload to S3 only
```

## 🌍 Environment Variables

### Development (`.env.local`)
```bash
NODE_ENV=development
# No S3 variables needed
```

### Production (`.env.production` or deployment platform)
```bash
NODE_ENV=production
NEXT_PUBLIC_S3_BUCKET_URL=https://your-bucket.s3.amazonaws.com
S3_BUCKET_NAME=your-bucket
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
```

## 🔄 Migration Process

### Step 1: Update imports
```tsx
// Replace this
import Image from "next/image"

// With this
import Image from "@/components/ui/image"
```

### Step 2: Update image paths
```tsx
// Remove leading slash
<Image src="images/exterior-2.jpg" alt="..." />
```

### Step 3: Test locally
```bash
npm run dev
# Verify images load correctly
```

## 📊 Performance Benefits

- ✅ **Multiple Formats**: JPEG, WebP, AVIF for modern browsers
- ✅ **CDN Delivery**: Fast global delivery via S3/CloudFront
- ✅ **Optimized Quality**: Format-specific quality settings
- ✅ **Caching**: 1-year cache headers for optimal performance
- ✅ **Lazy Loading**: Built-in Next.js lazy loading
- ✅ **Responsive**: Automatic responsive image handling

## 🛠️ Troubleshooting

### Images not loading in development
- Check if `/public/images/` directory exists
- Verify image files are present
- Check console for 404 errors

### Images not loading in production
- Verify S3 bucket permissions (public read)
- Check `NEXT_PUBLIC_S3_BUCKET_URL` environment variable
- Confirm images were uploaded successfully

### Build failures
- Check AWS credentials are set
- Verify S3 bucket exists and is accessible
- Check console output for specific errors

## 🚀 Deployment

See `docs/deployment-guide.md` for detailed deployment instructions for:
- Vercel
- Netlify  
- Traditional servers
- AWS S3 + CloudFront setup

## 📈 Monitoring

The system provides detailed logs for:
- Image optimization progress
- S3 upload status
- Error tracking
- Performance metrics

## 🔒 Security

- AWS credentials should be set as environment variables
- S3 bucket configured for read-only public access
- No sensitive data in image metadata
- Proper CORS configuration for S3 bucket

---

**✨ Your images are now optimized, scalable, and production-ready!**