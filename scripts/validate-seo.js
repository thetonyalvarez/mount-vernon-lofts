#!/usr/bin/env node

/**
 * SEO Validation Script for Mount Vernon Lofts
 * Validates canonical URLs, metadata, and structured data
 * 
 * Usage: node scripts/validate-seo.js
 */

const https = require('https');
const { JSDOM } = require('jsdom');

const CANONICAL_DOMAIN = 'https://mtvernonlofts.com';

const pages = [
  '/',
  '/residences',
  '/amenities', 
  '/architecture',
  '/neighborhood',
  '/gallery',
  '/team'
];

function fetchPage(path) {
  return new Promise((resolve, reject) => {
    const url = `${CANONICAL_DOMAIN}${path}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve({ path, html: data, headers: res.headers });
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${path}`));
        }
      });
    }).on('error', reject);
  });
}

function validatePage(pageData) {
  const { path, html, headers } = pageData;
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  const results = {
    path,
    issues: [],
    warnings: [],
    passed: []
  };

  // 1. Check canonical URL
  const canonicalLink = document.querySelector('link[rel="canonical"]');
  if (canonicalLink) {
    const canonical = canonicalLink.getAttribute('href');
    if (canonical === `${CANONICAL_DOMAIN}${path}` || (path === '/' && canonical === CANONICAL_DOMAIN)) {
      results.passed.push('✅ Canonical URL is correct');
    } else {
      results.issues.push(`❌ Canonical URL mismatch: expected ${CANONICAL_DOMAIN}${path}, got ${canonical}`);
    }
  } else {
    results.issues.push('❌ Missing canonical link tag');
  }

  // 2. Check title contains required keywords
  const title = document.querySelector('title');
  if (title) {
    const titleText = title.textContent;
    if (titleText.includes('Mount Vernon Lofts') && titleText.includes('Montrose')) {
      results.passed.push('✅ Title contains required keywords');
    } else {
      results.issues.push(`❌ Title missing required keywords: ${titleText}`);
    }
  } else {
    results.issues.push('❌ Missing title tag');
  }

  // 3. Check meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    const desc = metaDesc.getAttribute('content');
    if (desc && desc.length >= 120 && desc.length <= 160) {
      results.passed.push('✅ Meta description length is optimal');
    } else {
      results.warnings.push(`⚠️ Meta description length: ${desc ? desc.length : 0} chars (optimal: 120-160)`);
    }
  } else {
    results.issues.push('❌ Missing meta description');
  }

  // 4. Check geo coordinates
  const geoPosition = document.querySelector('meta[name="geo.position"]');
  if (geoPosition) {
    const coords = geoPosition.getAttribute('content');
    if (coords && coords.includes('29.755918') && coords.includes('-95.464137')) {
      results.passed.push('✅ Geo coordinates are correct');
    } else {
      results.issues.push(`❌ Incorrect geo coordinates: ${coords}`);
    }
  } else {
    results.issues.push('❌ Missing geo coordinates');
  }

  // 5. Check Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');
  
  if (ogTitle && ogDesc && ogImage && ogUrl) {
    results.passed.push('✅ Essential Open Graph tags present');
    
    // Validate OG URL
    const ogUrlContent = ogUrl.getAttribute('content');
    if (ogUrlContent && ogUrlContent.startsWith(CANONICAL_DOMAIN)) {
      results.passed.push('✅ Open Graph URL uses canonical domain');
    } else {
      results.issues.push(`❌ Open Graph URL doesn't use canonical domain: ${ogUrlContent}`);
    }
  } else {
    results.issues.push('❌ Missing essential Open Graph tags');
  }

  // 6. Check structured data
  const structuredDataScripts = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredDataScripts.length > 0) {
    results.passed.push(`✅ Structured data found (${structuredDataScripts.length} scripts)`);
    
    // Validate JSON-LD
    let validJsonLd = 0;
    structuredDataScripts.forEach(script => {
      try {
        const data = JSON.parse(script.textContent);
        if (data['@context'] && data['@context'].includes('schema.org')) {
          validJsonLd++;
        }
      } catch (e) {
        results.issues.push(`❌ Invalid JSON-LD: ${e.message}`);
      }
    });
    
    if (validJsonLd > 0) {
      results.passed.push(`✅ Valid structured data (${validJsonLd} valid scripts)`);
    }
  } else {
    results.warnings.push('⚠️ No structured data found');
  }

  // 7. Check security headers
  const securityHeaders = ['x-content-type-options', 'x-frame-options', 'x-xss-protection'];
  securityHeaders.forEach(header => {
    if (headers[header]) {
      results.passed.push(`✅ ${header} header present`);
    } else {
      results.warnings.push(`⚠️ Missing ${header} header`);
    }
  });

  return results;
}

async function runValidation() {
  console.log('🔍 SEO Validation for Mount Vernon Lofts\n');
  console.log('=' .repeat(80));
  
  let totalIssues = 0;
  let totalWarnings = 0;
  
  for (const path of pages) {
    try {
      console.log(`\n📄 Validating: ${CANONICAL_DOMAIN}${path}`);
      console.log('-' .repeat(50));
      
      const pageData = await fetchPage(path);
      const results = validatePage(pageData);
      
      // Display results
      results.passed.forEach(msg => console.log(msg));
      results.warnings.forEach(msg => console.log(msg));
      results.issues.forEach(msg => console.log(msg));
      
      totalIssues += results.issues.length;
      totalWarnings += results.warnings.length;
      
      console.log(`\n📊 Page Score: ${results.passed.length} passed, ${results.warnings.length} warnings, ${results.issues.length} issues`);
      
    } catch (error) {
      console.log(`❌ Failed to validate ${path}: ${error.message}`);
      totalIssues++;
    }
  }
  
  console.log('\n' + '=' .repeat(80));
  console.log(`\n📊 Final Summary:`);
  console.log(`   Issues: ${totalIssues}`);
  console.log(`   Warnings: ${totalWarnings}`);
  
  if (totalIssues === 0) {
    console.log('\n🎉 Excellent! No critical SEO issues found.');
    if (totalWarnings > 0) {
      console.log(`⚠️  Consider addressing ${totalWarnings} warnings for optimal performance.`);
    }
  } else {
    console.log(`\n⚠️  Found ${totalIssues} critical issues that should be addressed.`);
  }
  
  console.log('\n🔗 Canonical Domain Strategy: https://mtvernonlofts.com (non-www preferred)');
  console.log('🗺️ Geo Coordinates: 29.755918, -95.464137 (Montrose, Houston)');
}

// Run validation if script is called directly
if (require.main === module) {
  runValidation().catch(console.error);
}

module.exports = { runValidation, validatePage };