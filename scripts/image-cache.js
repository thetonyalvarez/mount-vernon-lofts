#!/usr/bin/env node

const fs = require('fs').promises
const fsSync = require('fs')
const path = require('path')

/**
 * Image Processing Cache Manager
 * 
 * Tracks processed images to enable intelligent incremental optimization.
 * Stores metadata about source files and their generated outputs.
 */

class ImageCache {
  constructor(cacheFilePath = null) {
    this.cacheFilePath = cacheFilePath || path.join(__dirname, '..', 'image-cache.json')
    this.cache = {
      version: '1.0',
      lastUpdated: null,
      images: {}
    }
    this.loaded = false
  }

  /**
   * Load cache from disk
   */
  async load() {
    try {
      if (fsSync.existsSync(this.cacheFilePath)) {
        const data = await fs.readFile(this.cacheFilePath, 'utf8')
        this.cache = JSON.parse(data)
        console.log(`📋 Loaded cache with ${Object.keys(this.cache.images).length} entries`)
      } else {
        console.log('📋 No existing cache found, starting fresh')
      }
    } catch (error) {
      console.log(`⚠️  Failed to load cache: ${error.message}`)
      console.log('📋 Starting with empty cache')
      this.cache = {
        version: '1.0',
        lastUpdated: null,
        images: {}
      }
    }
    this.loaded = true
  }

  /**
   * Save cache to disk
   */
  async save() {
    try {
      this.cache.lastUpdated = new Date().toISOString()
      await fs.writeFile(
        this.cacheFilePath, 
        JSON.stringify(this.cache, null, 2), 
        'utf8'
      )
    } catch (error) {
      console.error(`❌ Failed to save cache: ${error.message}`)
    }
  }

  /**
   * Check if a source image needs processing
   * @param {string} sourcePath - Absolute path to source image
   * @param {Array} expectedOutputs - Array of expected output file paths
   * @returns {boolean} - True if processing is needed
   */
  async needsProcessing(sourcePath, expectedOutputs = []) {
    if (!this.loaded) {
      await this.load()
    }

    try {
      // Get current source file stats
      const sourceStats = await fs.stat(sourcePath)
      const sourceModified = sourceStats.mtime.toISOString()
      const sourceSize = sourceStats.size

      // Check cache entry
      const cacheKey = this.getRelativePath(sourcePath)
      const cacheEntry = this.cache.images[cacheKey]

      // No cache entry = needs processing
      if (!cacheEntry) {
        return true
      }

      // Source file changed = needs processing
      if (cacheEntry.sourceModified !== sourceModified || cacheEntry.sourceSize !== sourceSize) {
        return true
      }

      // Check if all expected output files exist
      if (expectedOutputs.length > 0) {
        for (const outputPath of expectedOutputs) {
          if (!fsSync.existsSync(outputPath)) {
            console.log(`  🔍 Output missing: ${path.basename(outputPath)}`)
            return true
          }
        }
      } else if (cacheEntry.outputs) {
        // Check cached output files exist
        for (const format in cacheEntry.outputs) {
          const outputInfo = cacheEntry.outputs[format]
          if (!fsSync.existsSync(outputInfo.path)) {
            console.log(`  🔍 Cached output missing: ${path.basename(outputInfo.path)}`)
            return true
          }
        }
      }

      return false
    } catch (error) {
      // If we can't check, assume processing is needed
      console.log(`  ⚠️  Cache check failed for ${path.basename(sourcePath)}: ${error.message}`)
      return true
    }
  }

  /**
   * Update cache entry for a processed image
   * @param {string} sourcePath - Absolute path to source image
   * @param {Object} outputs - Object mapping format to output info
   */
  async updateEntry(sourcePath, outputs = {}) {
    if (!this.loaded) {
      await this.load()
    }

    try {
      const sourceStats = await fs.stat(sourcePath)
      const cacheKey = this.getRelativePath(sourcePath)

      this.cache.images[cacheKey] = {
        sourceModified: sourceStats.mtime.toISOString(),
        sourceSize: sourceStats.size,
        processed: new Date().toISOString(),
        outputs: outputs
      }
    } catch (error) {
      console.error(`❌ Failed to update cache entry for ${sourcePath}: ${error.message}`)
    }
  }

  /**
   * Remove cache entry for deleted source file
   * @param {string} sourcePath - Absolute path to source image
   */
  removeEntry(sourcePath) {
    const cacheKey = this.getRelativePath(sourcePath)
    delete this.cache.images[cacheKey]
  }

  /**
   * Clean up cache entries for files that no longer exist
   * @param {string} sourceDir - Source directory to validate against
   */
  async cleanup(sourceDir) {
    if (!this.loaded) {
      await this.load()
    }

    const keysToRemove = []
    
    for (const cacheKey in this.cache.images) {
      const fullPath = path.join(sourceDir, cacheKey)
      try {
        await fs.access(fullPath)
      } catch (error) {
        // File doesn't exist anymore
        keysToRemove.push(cacheKey)
      }
    }

    if (keysToRemove.length > 0) {
      console.log(`🧹 Removing ${keysToRemove.length} stale cache entries`)
      keysToRemove.forEach(key => delete this.cache.images[key])
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const totalEntries = Object.keys(this.cache.images).length
    const totalOutputs = Object.values(this.cache.images).reduce(
      (sum, entry) => sum + Object.keys(entry.outputs || {}).length, 
      0
    )

    return {
      totalEntries,
      totalOutputs,
      cacheVersion: this.cache.version,
      lastUpdated: this.cache.lastUpdated
    }
  }

  /**
   * Reset cache completely
   */
  reset() {
    this.cache = {
      version: '1.0',
      lastUpdated: null,
      images: {}
    }
  }

  /**
   * Convert absolute path to relative path for cache keys
   * @param {string} absolutePath 
   * @returns {string}
   */
  getRelativePath(absolutePath) {
    // Convert to relative path from public/images
    const publicImagesDir = path.join(__dirname, '..', 'public', 'images')
    return path.relative(publicImagesDir, absolutePath)
  }

  /**
   * Validate cache integrity
   * @param {string} sourceDir - Source directory to check against
   * @returns {Object} - Validation results
   */
  async validate(sourceDir) {
    if (!this.loaded) {
      await this.load()
    }

    const results = {
      valid: 0,
      missingSource: 0,
      missingOutputs: 0,
      errors: []
    }

    for (const [cacheKey, entry] of Object.entries(this.cache.images)) {
      try {
        const sourcePath = path.join(sourceDir, cacheKey)
        
        // Check source file exists
        try {
          await fs.access(sourcePath)
        } catch (error) {
          results.missingSource++
          results.errors.push(`Missing source: ${cacheKey}`)
          continue
        }

        // Check output files exist
        let missingOutputs = false
        for (const format in (entry.outputs || {})) {
          const outputInfo = entry.outputs[format]
          try {
            await fs.access(outputInfo.path)
          } catch (error) {
            missingOutputs = true
            results.errors.push(`Missing output: ${outputInfo.path}`)
          }
        }

        if (missingOutputs) {
          results.missingOutputs++
        } else {
          results.valid++
        }

      } catch (error) {
        results.errors.push(`Validation error for ${cacheKey}: ${error.message}`)
      }
    }

    return results
  }
}

module.exports = ImageCache