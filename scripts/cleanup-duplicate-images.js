#!/usr/bin/env node

const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')

/**
 * Cleanup Duplicate Optimized Images
 * 
 * Removes duplicate optimized images that exist in both flat structure (root)
 * and organized structure (gallery/*, design/*, lifestyle/*) keeping only 
 * the organized structure versions.
 */

const OPTIMIZED_DIR = path.join(__dirname, '..', 'optimized-images')

class DuplicateImageCleaner {
  constructor() {
    this.removedFiles = []
    this.preservedFiles = []
    this.errors = []
  }

  async run() {
    console.log('🧹 Cleaning up duplicate optimized images...')
    console.log(`📁 Directory: ${OPTIMIZED_DIR}`)
    console.log('=' .repeat(50))

    try {
      if (!fsSync.existsSync(OPTIMIZED_DIR)) {
        console.log('⚠️  Optimized images directory does not exist')
        return
      }

      // Get all files in root directory
      const rootFiles = await this.getRootFiles()
      
      // Check each root file for organized counterpart
      for (const file of rootFiles) {
        await this.processFile(file)
      }

      this.printSummary()

    } catch (error) {
      console.error('❌ Cleanup failed:', error.message)
      process.exit(1)
    }
  }

  async getRootFiles() {
    const entries = await fs.readdir(OPTIMIZED_DIR, { withFileTypes: true })
    return entries
      .filter(entry => entry.isFile())
      .map(entry => entry.name)
  }

  async processFile(filename) {
    const rootPath = path.join(OPTIMIZED_DIR, filename)
    const organizedPath = this.findOrganizedPath(filename)

    if (organizedPath && fsSync.existsSync(organizedPath)) {
      // Duplicate found - remove root version
      try {
        await fs.unlink(rootPath)
        this.removedFiles.push({
          removed: rootPath,
          kept: organizedPath
        })
        console.log(`🗑️  Removed: ${filename} (kept organized version)`)
      } catch (error) {
        this.errors.push({
          file: filename,
          error: error.message
        })
        console.error(`❌ Failed to remove ${filename}: ${error.message}`)
      }
    } else {
      // No organized version found - keep root version
      this.preservedFiles.push(rootPath)
      console.log(`✅ Preserved: ${filename} (no organized version)`)
    }
  }

  findOrganizedPath(filename) {
    const basename = path.parse(filename).name
    const ext = path.parse(filename).ext

    // Check all possible organized locations
    const possiblePaths = [
      // Gallery structure
      path.join(OPTIMIZED_DIR, 'gallery', 'exteriors', filename),
      path.join(OPTIMIZED_DIR, 'gallery', 'interiors', filename),
      path.join(OPTIMIZED_DIR, 'gallery', 'amenities', filename),
      path.join(OPTIMIZED_DIR, 'gallery', 'views', filename),
      
      // Design structure
      path.join(OPTIMIZED_DIR, 'design', filename),
      
      // Lifestyle structure
      path.join(OPTIMIZED_DIR, 'lifestyle', filename),
      
      // Alternative naming patterns
      path.join(OPTIMIZED_DIR, 'gallery', 'exteriors', `${basename}${ext}`),
      path.join(OPTIMIZED_DIR, 'gallery', 'interiors', `${basename}${ext}`),
      path.join(OPTIMIZED_DIR, 'gallery', 'amenities', `${basename}${ext}`),
      path.join(OPTIMIZED_DIR, 'gallery', 'views', `${basename}${ext}`)
    ]

    // Return first path that exists
    return possiblePaths.find(p => fsSync.existsSync(p))
  }

  printSummary() {
    console.log('\n' + '='.repeat(50))
    console.log('📊 CLEANUP SUMMARY')
    console.log('='.repeat(50))
    console.log(`🗑️  Removed duplicates: ${this.removedFiles.length}`)
    console.log(`✅ Preserved unique: ${this.preservedFiles.length}`)
    console.log(`❌ Errors: ${this.errors.length}`)

    if (this.removedFiles.length > 0) {
      console.log('\n🗑️  Removed files:')
      this.removedFiles.forEach(({ removed, kept }) => {
        const removedName = path.basename(removed)
        const keptPath = path.relative(OPTIMIZED_DIR, kept)
        console.log(`  - ${removedName} → kept ${keptPath}`)
      })
    }

    if (this.preservedFiles.length > 0) {
      console.log('\n✅ Preserved files (no organized version):')
      this.preservedFiles.forEach(filePath => {
        console.log(`  - ${path.basename(filePath)}`)
      })
    }

    if (this.errors.length > 0) {
      console.log('\n❌ Errors:')
      this.errors.forEach(({ file, error }) => {
        console.log(`  - ${file}: ${error}`)
      })
    }

    console.log('\n🎉 Duplicate cleanup complete!')
    console.log('📁 Organized structure preserved, duplicates removed')
    console.log()
  }
}

// Run the cleaner
if (require.main === module) {
  const args = process.argv.slice(2)
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🧹 Duplicate Image Cleaner

Removes duplicate optimized images that exist in both flat and organized structures.
Keeps only the organized structure versions (gallery/*, design/*, lifestyle/*).

Usage:
  node scripts/cleanup-duplicate-images.js

Examples:
  node scripts/cleanup-duplicate-images.js
  npm run cleanup:duplicates (if added to package.json)

What it does:
  - Scans optimized-images root directory for files
  - Checks if organized version exists (gallery/*/filename)
  - Removes root version if organized version found
  - Preserves root version if no organized version exists
  - Reports all actions taken

Safe to run:
  ✅ Only removes duplicates
  ✅ Preserves organized structure
  ✅ Keeps unique files
`)
    process.exit(0)
  }

  const cleaner = new DuplicateImageCleaner()
  cleaner.run().catch(console.error)
}

module.exports = DuplicateImageCleaner