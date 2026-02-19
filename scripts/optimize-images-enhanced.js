#!/usr/bin/env node

const sharp = require('sharp')
const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')
const ImageCache = require('./image-cache')

/**
 * Enhanced Image Optimization Script for Mount Vernon Lofts Website
 * 
 * Features:
 * - Smart incremental processing (only process changed/new images)
 * - Converts images to multiple formats (WebP, AVIF, optimized JPEG/PNG)
 * - Maintains directory structure
 * - Cache-based optimization with file modification tracking
 * - Command line options for different processing modes
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

class EnhancedImageOptimizer {
  constructor(options = {}) {
    this.options = {
      force: false,         // Force reprocess all images
      clean: false,         // Clean output directory first
      check: false,         // Check cache integrity only
      verbose: false,       // Verbose logging
      ...options
    }
    
    this.processedCount = 0
    this.skippedCount = 0
    this.upToDateCount = 0
    this.errors = []
    this.totalSizeReduction = 0
    this.cache = new ImageCache()
    this.startTime = Date.now()
  }

  async run() {
    console.log('🖼️  Enhanced Image Optimization with Smart Caching')
    console.log('=' .repeat(60))
    console.log(`📦 Mode: ${this.getModeDescription()}`)
    console.log(`📁 Input: ${CONFIG.inputDir}`)
    console.log(`📁 Output: ${CONFIG.outputDir}`)
    console.log(`⏰ Started: ${new Date().toISOString()}\n`)
    
    try {
      // Load cache
      await this.cache.load()
      
      // Handle different modes
      if (this.options.check) {
        await this.checkCacheIntegrity()
        return
      }
      
      if (this.options.clean) {
        await this.cleanOutputDirectory()
      }
      
      // Ensure output directory exists
      await this.ensureDirectory(CONFIG.outputDir)
      
      // Clean up stale cache entries
      await this.cache.cleanup(CONFIG.inputDir)
      
      // Process all images
      await this.processDirectory(CONFIG.inputDir, CONFIG.outputDir)
      
      // Save cache
      await this.cache.save()
      
      // Summary
      this.printSummary()
      
    } catch (error) {
      console.error('❌ Optimization failed:', error.message)
      if (this.options.verbose) {
        console.error(error.stack)
      }
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
      if (this.options.verbose) {
        console.log(`⏭️  Skipped unsupported: ${filename}`)
      }
      return
    }

    // Special handling for SVG files - just copy them
    if (ext === '.svg') {
      const outputPath = path.join(outputDir, filename)
      if (!fsSync.existsSync(outputPath) || this.options.force) {
        await this.copyFile(inputPath, outputPath)
        console.log(`📄 Copied: ${filename}`)
        this.processedCount++
      } else {
        console.log(`✅ Up to date: ${filename}`)
        this.upToDateCount++
      }
      return
    }

    try {
      // Get expected output paths
      const expectedOutputs = this.getExpectedOutputPaths(outputDir, basename)
      
      // Check if processing is needed
      if (!this.options.force && !(await this.cache.needsProcessing(inputPath, expectedOutputs))) {
        console.log(`✅ Up to date: ${filename}`)
        this.upToDateCount++
        return
      }
      
      console.log(`🔄 Processing: ${filename}`)
      
      // Get image metadata and file size
      const image = sharp(inputPath)
      const metadata = await image.metadata()
      const sourceStats = await fs.stat(inputPath)
      const sourceSize = sourceStats.size
      
      // Generate optimized versions
      const outputs = await this.generateFormats(image, outputDir, basename, metadata, sourceSize)
      
      // Update cache
      await this.cache.updateEntry(inputPath, outputs)
      
      this.processedCount++
      
      // Calculate size reduction
      const totalOutputSize = Object.values(outputs).reduce((sum, output) => sum + output.size, 0)
      const avgOutputSize = totalOutputSize / Object.keys(outputs).length
      this.totalSizeReduction += Math.max(0, sourceSize - avgOutputSize)
      
    } catch (error) {
      console.error(`❌ Failed to process ${filename}: ${error.message}`)
      this.errors.push({ file: filename, error: error.message })
    }
  }

  async generateFormats(image, outputDir, basename, metadata, sourceSize) {
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

    const outputs = {}

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
        
        // Get output file size
        const outputStats = await fs.stat(outputPath)
        const compressionRatio = ((sourceSize - outputStats.size) / sourceSize * 100).toFixed(1)
        
        outputs[format] = {
          size: outputStats.size,
          path: outputPath,
          compressionRatio: `${compressionRatio}%`
        }
        
        console.log(`  ✅ ${format.toUpperCase()}: ${basename}${ext} (${compressionRatio}% smaller)`)
        
      } catch (error) {
        console.log(`  ⚠️  Failed to generate ${format}: ${error.message}`)
      }
    }

    return outputs
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

  async cleanOutputDirectory() {
    console.log('🧹 Cleaning output directory...')
    try {
      if (fsSync.existsSync(CONFIG.outputDir)) {
        await fs.rm(CONFIG.outputDir, { recursive: true, force: true })
        console.log(`✅ Cleaned: ${CONFIG.outputDir}`)
      }
      this.cache.reset()
      console.log('✅ Cache reset\n')
    } catch (error) {
      console.error(`❌ Failed to clean output directory: ${error.message}`)
    }
  }

  async checkCacheIntegrity() {
    console.log('🔍 Checking cache integrity...\n')
    
    const validation = await this.cache.validate(CONFIG.inputDir)
    const stats = this.cache.getStats()
    
    console.log('📊 Cache Statistics:')
    console.log(`  Total entries: ${stats.totalEntries}`)
    console.log(`  Total outputs: ${stats.totalOutputs}`)
    console.log(`  Last updated: ${stats.lastUpdated || 'Never'}`)
    console.log(`  Cache version: ${stats.cacheVersion}`)
    
    console.log('\n🔍 Validation Results:')
    console.log(`  ✅ Valid entries: ${validation.valid}`)
    console.log(`  ❌ Missing sources: ${validation.missingSource}`)
    console.log(`  ⚠️  Missing outputs: ${validation.missingOutputs}`)
    
    if (validation.errors.length > 0) {
      console.log('\n🚨 Issues found:')
      validation.errors.slice(0, 10).forEach(error => {
        console.log(`  - ${error}`)
      })
      if (validation.errors.length > 10) {
        console.log(`  ... and ${validation.errors.length - 10} more`)
      }
    }
    
    console.log('\n💡 Recommendations:')
    if (validation.missingSource > 0) {
      console.log('  - Run with --clean to remove stale cache entries')
    }
    if (validation.missingOutputs > 0) {
      console.log('  - Run optimization to regenerate missing outputs')
    }
    if (validation.valid === stats.totalEntries) {
      console.log('  - Cache is healthy! ✨')
    }
  }

  getExpectedOutputPaths(outputDir, basename) {
    const extensions = ['.jpg', '.webp', '.avif']
    return extensions.map(ext => path.join(outputDir, `${basename}${ext}`))
  }

  getModeDescription() {
    if (this.options.clean) return 'Clean & Full Rebuild'
    if (this.options.force) return 'Force Reprocess All'
    if (this.options.check) return 'Cache Integrity Check'
    return 'Smart Incremental Processing'
  }

  printSummary() {
    const duration = Math.round((Date.now() - this.startTime) / 1000)
    const totalFiles = this.processedCount + this.upToDateCount + this.skippedCount
    const cacheHitRate = totalFiles > 0 ? ((this.upToDateCount / totalFiles) * 100).toFixed(1) : 0
    
    console.log('\n' + '='.repeat(60))
    console.log('📊 OPTIMIZATION SUMMARY')
    console.log('='.repeat(60))
    console.log(`⏱️  Total time: ${duration}s`)
    console.log(`📁 Total files: ${totalFiles}`)
    console.log(`🔄 Processed: ${this.processedCount} files`)
    console.log(`✅ Up to date: ${this.upToDateCount} files`)
    console.log(`⏭️  Skipped: ${this.skippedCount} files`)
    console.log(`❌ Errors: ${this.errors.length} files`)
    console.log(`🎯 Cache hit rate: ${cacheHitRate}%`)
    
    if (this.totalSizeReduction > 0) {
      const sizeMB = (this.totalSizeReduction / 1024 / 1024).toFixed(2)
      console.log(`💾 Size reduction: ${sizeMB} MB`)
    }
    
    if (this.errors.length > 0) {
      console.log('\n🚨 Errors:')
      this.errors.forEach(({ file, error }) => {
        console.log(`  - ${file}: ${error}`)
      })
    }
    
    console.log(`\n📁 Optimized images saved to: ${CONFIG.outputDir}`)
    
    if (this.processedCount > 0) {
      console.log('🎉 New images optimized and cached!')
    } else if (this.upToDateCount > 0) {
      console.log('✨ All images are up to date!')
    }
    
    console.log(`💡 Pro tip: Use --force to reprocess all, --clean to start fresh, --check to validate cache\n`)
  }
}

// Command line interface
if (require.main === module) {
  const args = process.argv.slice(2)
  
  // Parse command line arguments
  const options = {
    force: args.includes('--force') || args.includes('-f'),
    clean: args.includes('--clean') || args.includes('-c'),
    check: args.includes('--check'),
    verbose: args.includes('--verbose') || args.includes('-v')
  }
  
  // Help
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🖼️  Enhanced Image Optimization with Smart Caching

Usage:
  npm run optimize:images [options]

Options:
  --force, -f        Force reprocess all images (ignore cache)
  --clean, -c        Clean output directory and reset cache first
  --check            Check cache integrity (no processing)
  --verbose, -v      Verbose logging
  --help, -h         Show this help

Examples:
  npm run optimize:images                 # Smart incremental processing
  npm run optimize:images -- --force      # Reprocess everything
  npm run optimize:images -- --clean      # Clean rebuild
  npm run optimize:images -- --check      # Check cache health
  npm run optimize:images -- --verbose    # Detailed logging

Features:
  ✅ Smart caching - only processes changed/new images
  📁 Preserves directory structure
  🎯 Multiple formats: JPEG, WebP, AVIF
  📊 Detailed progress reporting
  ⚡ Fast incremental builds
`)
    process.exit(0)
  }

  // Run the optimizer
  const optimizer = new EnhancedImageOptimizer(options)
  optimizer.run().catch(console.error)
}

module.exports = EnhancedImageOptimizer