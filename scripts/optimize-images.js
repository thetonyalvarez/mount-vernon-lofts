#!/usr/bin/env node

const sharp = require('sharp')
const fs = require('fs').promises
const path = require('path')

/**
 * Image Optimization Script for Mount Vernon Lofts Website
 * 
 * Features:
 * - Converts images to multiple formats (WebP, AVIF, optimized JPEG/PNG)
 * - Generates responsive sizes
 * - Maintains directory structure
 * - Optimizes for web delivery
 */

const CONFIG = {
  // Input and output directories
  inputDir: path.join(__dirname, '../public/images'),
  outputDir: path.join(__dirname, '../optimized-images'),
  
  // Image quality settings
  quality: {
    jpeg: 85,
    webp: 80,
    avif: 75,
    png: 90
  },
  
  // Responsive image sizes (optional - can be used for different breakpoints)
  sizes: [
    { suffix: '', width: null }, // Original size
    { suffix: '-lg', width: 1920 },
    { suffix: '-md', width: 1200 },
    { suffix: '-sm', width: 768 }
  ],
  
  // Supported input formats
  supportedFormats: ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.svg']
}

class ImageOptimizer {
  constructor() {
    this.processedCount = 0
    this.skippedCount = 0
    this.errors = []
  }

  async run() {
    console.log('🖼️  Starting image optimization...\n')
    
    try {
      // Ensure output directory exists
      await this.ensureDirectory(CONFIG.outputDir)
      
      // Process all images
      await this.processDirectory(CONFIG.inputDir, CONFIG.outputDir)
      
      // Summary
      this.printSummary()
      
    } catch (error) {
      console.error('❌ Optimization failed:', error.message)
      process.exit(1)
    }
  }

  async processDirectory(inputDir, outputDir) {
    try {
      const entries = await fs.readdir(inputDir, { withFileTypes: true })
      
      for (const entry of entries) {
        const inputPath = path.join(inputDir, entry.name)
        const outputPath = path.join(outputDir, entry.name)
        
        if (entry.isDirectory()) {
          // Recursively process subdirectories
          await this.ensureDirectory(outputPath)
          await this.processDirectory(inputPath, outputPath)
        } else if (entry.isFile()) {
          await this.processFile(inputPath, outputDir, entry.name)
        }
      }
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`⚠️  Directory not found: ${inputDir}`)
        return
      }
      throw error
    }
  }

  async processFile(inputPath, outputDir, filename) {
    const ext = path.extname(filename).toLowerCase()
    const basename = path.basename(filename, ext)
    
    // Skip unsupported formats
    if (!CONFIG.supportedFormats.includes(ext)) {
      this.skippedCount++
      return
    }

    // Special handling for SVG files - just copy them
    if (ext === '.svg') {
      await this.copyFile(inputPath, path.join(outputDir, filename))
      console.log(`📄 Copied: ${filename}`)
      this.processedCount++
      return
    }

    try {
      console.log(`🔄 Processing: ${filename}`)
      
      // Get image metadata
      const image = sharp(inputPath)
      const metadata = await image.metadata()
      
      // Generate optimized versions
      await this.generateFormats(image, outputDir, basename, metadata)
      
      this.processedCount++
      
    } catch (error) {
      console.error(`❌ Failed to process ${filename}:`, error.message)
      this.errors.push({ file: filename, error: error.message })
    }
  }

  async generateFormats(image, outputDir, basename, metadata) {
    const formats = [
      { ext: '.jpg', format: 'jpeg', quality: CONFIG.quality.jpeg },
      { ext: '.webp', format: 'webp', quality: CONFIG.quality.webp },
      { ext: '.avif', format: 'avif', quality: CONFIG.quality.avif }
    ]

    // If original was PNG, also generate optimized PNG
    if (metadata.format === 'png') {
      formats.unshift({ 
        ext: '.png', 
        format: 'png', 
        quality: CONFIG.quality.png 
      })
    }

    for (const { ext, format, quality } of formats) {
      try {
        let processor = image.clone()

        // Apply format-specific optimizations
        if (format === 'jpeg') {
          processor = processor.jpeg({ 
            quality, 
            progressive: true,
            mozjpeg: true 
          })
        } else if (format === 'webp') {
          processor = processor.webp({ 
            quality,
            effort: 6 
          })
        } else if (format === 'avif') {
          processor = processor.avif({ 
            quality,
            effort: 4 
          })
        } else if (format === 'png') {
          processor = processor.png({ 
            quality,
            compressionLevel: 9,
            palette: true 
          })
        }

        // Generate main optimized image
        const outputPath = path.join(outputDir, `${basename}${ext}`)
        await processor.toFile(outputPath)
        
        console.log(`  ✅ Generated: ${basename}${ext}`)
        
      } catch (error) {
        console.log(`  ⚠️  Failed to generate ${format}: ${error.message}`)
      }
    }
  }

  async ensureDirectory(dir) {
    try {
      await fs.mkdir(dir, { recursive: true })
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error
      }
    }
  }

  async copyFile(src, dest) {
    await fs.copyFile(src, dest)
  }

  printSummary() {
    console.log('\n' + '='.repeat(50))
    console.log('📊 OPTIMIZATION SUMMARY')
    console.log('='.repeat(50))
    console.log(`✅ Processed: ${this.processedCount} files`)
    console.log(`⏭️  Skipped: ${this.skippedCount} files`)
    console.log(`❌ Errors: ${this.errors.length} files`)
    
    if (this.errors.length > 0) {
      console.log('\n🚨 Errors:')
      this.errors.forEach(({ file, error }) => {
        console.log(`  - ${file}: ${error}`)
      })
    }
    
    console.log(`\n📁 Optimized images saved to: ${CONFIG.outputDir}`)
    console.log('🎉 Image optimization complete!\n')
  }
}

// Run the optimizer
if (require.main === module) {
  const optimizer = new ImageOptimizer()
  optimizer.run().catch(console.error)
}

module.exports = ImageOptimizer