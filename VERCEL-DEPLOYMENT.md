# 🚀 Vercel Deployment Guide

## Environment Variables Setup

Add these environment variables in your Vercel dashboard (Settings → Environment Variables):

### Required Variables
```bash
NODE_ENV=production
NEXT_PUBLIC_S3_BUCKET_URL=https://mount-vernon-lofts.s3.amazonaws.com
S3_BUCKET_NAME=mount-vernon-lofts
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
```

### Optional Variables
```bash
NEXT_PUBLIC_FORCE_CACHE_BUST=timestamp_1234567890
```

## Deployment Flow

1. **Local Development**: Images served from `/public/images/`
2. **Production (Vercel)**: Images served from S3 bucket
3. **Build Process**: 
   - Development: Optimizes images locally
   - Production: Skips image processing, serves from S3

## How to Deploy

1. **Push to GitHub** (images excluded via .gitignore)
2. **Connect to Vercel** 
3. **Set Environment Variables** in Vercel dashboard
4. **Deploy** - Vercel will build and serve from S3

## Build Output Expected

Production build should show:
```
☁️  Production Mode: Serving images from S3
📁 No local image processing needed
🌍 Images served from: https://mount-vernon-lofts.s3.amazonaws.com
✅ Build pipeline complete - ready for deployment
```

## Troubleshooting

- **Missing env vars**: Set all variables in Vercel dashboard
- **S3 not accessible**: Apply bucket policy and CORS configuration
- **Images not loading**: Verify S3 bucket is public and images are uploaded

## Next Steps

1. Set environment variables in Vercel
2. Apply S3 bucket policy and CORS configuration  
3. Redeploy
4. Verify images load from S3