#!/usr/bin/env node

/**
 * Redirect Testing Utility for Mount Vernon Lofts
 * Tests all Search Console redirect scenarios
 * 
 * Usage: node scripts/test-redirects.js
 */

const https = require('https');
const http = require('http');

// Test URLs that should redirect to canonical https://mtvernonlofts.com
const testCases = [
  {
    name: 'Search Console Issue #1: HTTP to HTTPS',
    url: 'http://mtvernonlofts.com/',
    expectedRedirect: 'https://mtvernonlofts.com/'
  },
  {
    name: 'Search Console Issue #2: WWW to non-WWW (HTTPS)',
    url: 'https://www.mtvernonlofts.com/',
    expectedRedirect: 'https://mtvernonlofts.com/'
  },
  {
    name: 'Search Console Issue #3: WWW to non-WWW (HTTP)',
    url: 'http://www.mtvernonlofts.com/',
    expectedRedirect: 'https://mtvernonlofts.com/'
  },
  {
    name: 'Search Console Issue #4: Remove index parameter',
    url: 'https://www.mtvernonlofts.com/?index=1',
    expectedRedirect: 'https://mtvernonlofts.com/'
  },
  {
    name: 'Clean tracking parameters',
    url: 'https://mtvernonlofts.com/?fbclid=test&utm_source=facebook',
    expectedRedirect: 'https://mtvernonlofts.com/'
  },
  {
    name: 'Canonical URL (should not redirect)',
    url: 'https://mtvernonlofts.com/',
    expectedRedirect: null // No redirect expected
  }
];

function testRedirect(testCase) {
  return new Promise((resolve) => {
    const url = new URL(testCase.url);
    const client = url.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: 'HEAD',
      headers: {
        'User-Agent': 'MVL-Redirect-Tester/1.0'
      }
    };

    const req = client.request(options, (res) => {
      const result = {
        name: testCase.name,
        url: testCase.url,
        statusCode: res.statusCode,
        location: res.headers.location,
        expectedRedirect: testCase.expectedRedirect,
        passed: false,
        message: ''
      };

      if (testCase.expectedRedirect) {
        // Expecting a redirect
        if ([301, 302, 307, 308].includes(res.statusCode)) {
          if (res.headers.location === testCase.expectedRedirect) {
            result.passed = true;
            result.message = `✅ Correctly redirects (${res.statusCode})`;
          } else {
            result.message = `❌ Redirects to wrong URL: ${res.headers.location}`;
          }
        } else {
          result.message = `❌ Expected redirect but got ${res.statusCode}`;
        }
      } else {
        // Not expecting a redirect
        if (res.statusCode === 200) {
          result.passed = true;
          result.message = '✅ Correctly serves content (no redirect)';
        } else if ([301, 302, 307, 308].includes(res.statusCode)) {
          result.message = `❌ Unexpected redirect to: ${res.headers.location}`;
        } else {
          result.message = `❌ Unexpected status code: ${res.statusCode}`;
        }
      }

      resolve(result);
    });

    req.on('error', (err) => {
      resolve({
        name: testCase.name,
        url: testCase.url,
        passed: false,
        message: `❌ Request failed: ${err.message}`
      });
    });

    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        name: testCase.name,
        url: testCase.url,
        passed: false,
        message: '❌ Request timeout'
      });
    });

    req.end();
  });
}

async function runTests() {
  console.log('🏠 Testing redirects for Mount Vernon Lofts\n');
  console.log('=' .repeat(80));
  
  const results = [];
  
  for (const testCase of testCases) {
    console.log(`Testing: ${testCase.name}`);
    const result = await testRedirect(testCase);
    results.push(result);
    console.log(`${result.message}\n`);
  }
  
  console.log('=' .repeat(80));
  
  const passed = results.filter(r => r.passed).length;
  const total = results.length;
  
  console.log(`\n📊 Summary: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All redirect tests passed! Mount Vernon Lofts is ready for Search Console.');
  } else {
    console.log('⚠️  Some tests failed. Please review the redirect configuration.');
    console.log('\n📝 Failed tests:');
    results.filter(r => !r.passed).forEach(r => {
      console.log(`   • ${r.name}: ${r.message}`);
    });
  }
}

// Run the tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, testRedirect };