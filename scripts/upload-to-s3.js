#!/usr/bin/env node

// Load environment variables
require('dotenv').config({ path: '.env.local' })
require('dotenv').config({ path: '.env.production' })

const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3')
const { Upload } = require('@aws-sdk/lib-storage')
const fs = require('fs').promises
const path = require('path')
const crypto = require('crypto')

/**
 * S3 Upload Script for Mount Vernon Lofts Website
 * 
 * Features:
 * - Uploads optimized images to S3
 * - Maintains directory structure
 * - Sets appropriate content types and cache headers
 * - Skips unchanged files (checksum comparison)
 * - Supports batch uploads with progress tracking
 */

const CONFIG = {
  // Directories
  inputDir: path.join(__dirname, '../optimized-images'),
  
  // AWS Configuration (from environment variables)
  region: process.env.AWS_REGION || 'us-east-1',
  bucketName: process.env.S3_BUCKET_NAME,
  
  // Upload settings
  maxConcurrentUploads: 5,
  
  // Cache settings (1 year for images)
  cacheControl: 'public, max-age=31536000, immutable',
  
  // Content type mapping
  contentTypes: {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.svg': 'image/svg+xml',
    '.gif': 'image/gif'
  }
}

class S3Uploader {
  constructor() {
    this.s3Client = null
    this.uploadedCount = 0
    this.skippedCount = 0
    this.errors = []
    this.totalFiles = 0
  }

  async run() {
    console.log('☁️  Starting S3 upload...\n')
    
    try {
      // Validate configuration
      this.validateConfig()
      
      // Initialize S3 client
      this.initializeS3Client()
      
      // Test S3 connection
      await this.testConnection()
      
      // Define directories
      const logosDir = path.join(__dirname, '../public/logos')
      
      // Count total files
      const imageFiles = await this.countFiles(CONFIG.inputDir)
      const logoFiles = await this.countFiles(logosDir)
      this.totalFiles = imageFiles + logoFiles
      console.log(`📊 Found ${this.totalFiles} files to process (${imageFiles} images, ${logoFiles} logos)\n`)
      
      // Upload all files to 'images' folder in S3
      console.log('📸 Uploading optimized images...')
      await this.uploadDirectory(CONFIG.inputDir, 'images')
      
      // Upload logos to 'logos' folder in S3
      console.log('\n🎨 Uploading logos...')
      await this.uploadDirectory(logosDir, 'logos')
      
      // Summary
      this.printSummary()
      
    } catch (error) {
      console.error('❌ Upload failed:', error.message)
      process.exit(1)
    }
  }

  validateConfig() {
    if (!CONFIG.bucketName) {
      throw new Error('S3_BUCKET_NAME environment variable is required')
    }
    
    if (!process.env.AWS_ACCESS_KEY_ID) {
      throw new Error('AWS_ACCESS_KEY_ID environment variable is required')
    }
    
    if (!process.env.AWS_SECRET_ACCESS_KEY) {
      throw new Error('AWS_SECRET_ACCESS_KEY environment variable is required')
    }
  }

  initializeS3Client() {
    this.s3Client = new S3Client({
      region: CONFIG.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      }
    })
  }

  async testConnection() {
    try {
      // Test connection by listing bucket (without actually listing)
      const command = new HeadObjectCommand({
        Bucket: CONFIG.bucketName,
        Key: 'test-connection'
      })
      
      // This will fail if bucket doesn't exist or no permissions
      await this.s3Client.send(command).catch(error => {
        if (error.name !== 'NotFound') {
          throw error
        }
      })
      
      console.log('✅ S3 connection successful')
    } catch (error) {
      throw new Error(`S3 connection failed: ${error.message}`)
    }
  }

  async countFiles(dir) {
    let count = 0
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        
        if (entry.isDirectory()) {
          count += await this.countFiles(fullPath)
        } else if (entry.isFile()) {
          count++
        }
      }
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error
      }
    }
    
    return count
  }

  async uploadDirectory(inputDir, s3Prefix = '') {
    try {
      const entries = await fs.readdir(inputDir, { withFileTypes: true })
      
      // Process files in batches to control concurrency
      const files = entries.filter(entry => entry.isFile())
      const directories = entries.filter(entry => entry.isDirectory())
      
      // Upload files in this directory
      await this.uploadBatch(files, inputDir, s3Prefix)
      
      // Recursively process subdirectories
      for (const dir of directories) {
        const newInputDir = path.join(inputDir, dir.name)
        const newS3Prefix = s3Prefix ? `${s3Prefix}/${dir.name}` : dir.name
        await this.uploadDirectory(newInputDir, newS3Prefix)
      }
      
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`⚠️  Directory not found: ${inputDir}`)
        return
      }
      throw error
    }
  }

  async uploadBatch(files, inputDir, s3Prefix) {
    // Process files in chunks to control concurrency
    for (let i = 0; i < files.length; i += CONFIG.maxConcurrentUploads) {
      const batch = files.slice(i, i + CONFIG.maxConcurrentUploads)
      const promises = batch.map(file => 
        this.uploadFile(path.join(inputDir, file.name), s3Prefix, file.name)
      )
      
      await Promise.all(promises)
    }
  }

  async uploadFile(filePath, s3Prefix, filename) {
    try {
      const s3Key = s3Prefix ? `${s3Prefix}/${filename}` : filename
      const ext = path.extname(filename).toLowerCase()
      
      // Check if file needs to be uploaded (compare checksums)
      const shouldUpload = await this.shouldUploadFile(filePath, s3Key)
      
      if (!shouldUpload) {
        this.skippedCount++
        console.log(`⏭️  Skipped (unchanged): ${s3Key}`)
        return
      }
      
      // Read file
      const fileContent = await fs.readFile(filePath)
      
      // Prepare upload parameters
      const uploadParams = {
        Bucket: CONFIG.bucketName,
        Key: s3Key,
        Body: fileContent,
        ContentType: CONFIG.contentTypes[ext] || 'application/octet-stream',
        CacheControl: CONFIG.cacheControl,
        Metadata: {
          'original-name': filename,
          'upload-date': new Date().toISOString()
        }
      }
      
      // Upload file
      const upload = new Upload({
        client: this.s3Client,
        params: uploadParams
      })
      
      await upload.done()
      
      this.uploadedCount++
      const progress = Math.round((this.uploadedCount + this.skippedCount) / this.totalFiles * 100)
      console.log(`✅ Uploaded [${progress}%]: ${s3Key}`)
      
    } catch (error) {
      console.error(`❌ Failed to upload ${filename}:`, error.message)
      this.errors.push({ file: filename, error: error.message })
    }
  }

  async shouldUploadFile(localPath, s3Key) {
    try {
      // Get local file checksum
      const localContent = await fs.readFile(localPath)
      const localChecksum = crypto.createHash('md5').update(localContent).digest('hex')
      
      // Try to get S3 object metadata
      const command = new HeadObjectCommand({
        Bucket: CONFIG.bucketName,
        Key: s3Key
      })
      
      const response = await this.s3Client.send(command)
      const s3Checksum = response.ETag?.replace(/"/g, '')
      
      // Compare checksums
      return localChecksum !== s3Checksum
      
    } catch (error) {
      if (error.name === 'NotFound') {
        // File doesn't exist in S3, should upload
        return true
      }
      
      // Other errors, assume we should upload
      console.log(`⚠️  Could not check S3 file ${s3Key}: ${error.message}`)
      return true
    }
  }

  printSummary() {
    console.log('\n' + '='.repeat(50))
    console.log('☁️  S3 UPLOAD SUMMARY')
    console.log('='.repeat(50))
    console.log(`✅ Uploaded: ${this.uploadedCount} files`)
    console.log(`⏭️  Skipped: ${this.skippedCount} files`)
    console.log(`❌ Errors: ${this.errors.length} files`)
    
    if (this.errors.length > 0) {
      console.log('\n🚨 Errors:')
      this.errors.forEach(({ file, error }) => {
        console.log(`  - ${file}: ${error}`)
      })
    }
    
    if (process.env.NEXT_PUBLIC_S3_BUCKET_URL) {
      console.log(`\n🌍 Images available at: ${process.env.NEXT_PUBLIC_S3_BUCKET_URL}`)
    }
    
    console.log('🎉 S3 upload complete!\n')
  }
}

// Run the uploader
if (require.main === module) {
  const uploader = new S3Uploader()
  uploader.run().catch(console.error)
}

module.exports = S3Uploader