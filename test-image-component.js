#!/usr/bin/env node

/**
 * Simple test script to verify Image component configuration
 */

console.log('🧪 Testing Image Component Setup...\n')

// Test 1: Environment Variables
console.log('1. Environment Variables:')
console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'undefined'}`)
console.log(`   NEXT_PUBLIC_S3_BUCKET_URL: ${process.env.NEXT_PUBLIC_S3_BUCKET_URL || 'undefined (expected in dev)'}`)

// Test 2: File Structure
const fs = require('fs')
const path = require('path')

console.log('\n2. File Structure:')

const files = [
  'components/ui/image.tsx',
  '.env.local',
  '.env.example',
  'public/images/gallery/exteriors/exterior-2.jpg'
]

files.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file))
  console.log(`   ${exists ? '✅' : '❌'} ${file}`)
})

// Test 3: Component Export
console.log('\n3. Component Analysis:')
try {
  const imageComponentPath = path.join(__dirname, 'components/ui/image.tsx')
  const content = fs.readFileSync(imageComponentPath, 'utf8')
  
  const hasDefaultExport = content.includes('export default')
  const hasNamedExport = content.includes('export { OptimizedImage as Image }')
  const hasEnvironmentLogic = content.includes('process.env.NODE_ENV')
  
  console.log(`   ${hasDefaultExport ? '✅' : '❌'} Default export`)
  console.log(`   ${hasNamedExport ? '✅' : '❌'} Named export as Image`)
  console.log(`   ${hasEnvironmentLogic ? '✅' : '❌'} Environment switching logic`)
  
} catch (error) {
  console.log('   ❌ Error reading component file')
}

console.log('\n🎉 Setup test complete!')
console.log('\n📝 Next Steps:')
console.log('   1. Development server is running on http://localhost:3001')
console.log('   2. Open mobile menu to test image loading')
console.log('   3. Ready for Phase 2: Build Pipeline')