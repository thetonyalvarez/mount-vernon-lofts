/**
 * Edge Middleware for Mount Vernon Lofts
 * Handles canonical URL enforcement and redirect strategy
 * Resolves Search Console indexing issues
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  /*
   * MAINTENANCE MODE - Uncomment to take site down
   * This redirects ALL traffic to /maintenance page (a bare-bones "Site Unavailable" page)
   * To enable: uncomment the block below
   * To disable: comment it back out
   * Related files: /app/maintenance/page.tsx, /app/maintenance/layout.tsx, /app/layout.tsx (has maintenance layout check)
   */
  // if (!url.pathname.startsWith('/maintenance')) {
  //   url.pathname = '/maintenance';
  //   return NextResponse.redirect(url, 307);
  // }
  // if (url.pathname.startsWith('/maintenance')) {
  //   const requestHeaders = new Headers(request.headers);
  //   requestHeaders.set('x-maintenance-mode', 'true');
  //   return NextResponse.next({
  //     request: {
  //       headers: requestHeaders,
  //     },
  //   });
  // }

  // Bare layout for open house form pages (sign-in / feedback)
  // Strips nav, banner, footer, contact modal for fast QR-code load at the door
  const isBareFormPage = /^\/open-house\/[^/]+\/(sign-in|feedback)/.test(url.pathname)
  if (isBareFormPage) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-bare-layout', 'true')
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // Completely skip remaining middleware in development
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }
  const hostname = request.headers.get('host') ?? '';
  const protocol = request.headers.get('x-forwarded-proto') || url.protocol.replace(':', '');
  
  // Canonical domain preference: https://mtvernonlofts.com
  const canonicalHost = 'mtvernonlofts.com';
  const isWww = hostname.startsWith('www.') || hostname === 'www.mtvernonlofts.com';
  const isHttp = protocol === 'http' || url.protocol === 'http:';
  const isVercelDomain = hostname.includes('vercel.app') || hostname.endsWith('.vercel.app');
  const isLocalDomain = hostname.includes('localhost') || 
                         hostname.includes('127.0.0.1') || 
                         hostname.startsWith('192.168.') || 
                         hostname.startsWith('10.') || 
                         hostname.startsWith('172.');
  const isNonCanonicalHost = hostname !== canonicalHost && !isLocalDomain && !isVercelDomain;
  
  // First, always clean up problematic query parameters
  const searchParams = url.searchParams;
  let hasParametersToRemove = false;
  
  // Remove index parameter that's causing 404s (Search Console issue #4)
  if (searchParams.has('index')) {
    searchParams.delete('index');
    hasParametersToRemove = true;
    console.log('Removing index parameter');
  }
  
  // Clean up tracking parameters that cause duplicate content (preserve UTM parameters for analytics)
  const trackingParams = ['fbclid', 'gclid', 'ref', 'source', 'campaign_id', 'ad_id'];
  
  trackingParams.forEach(param => {
    if (searchParams.has(param)) {
      searchParams.delete(param);
      hasParametersToRemove = true;
      console.log(`Removing tracking parameter: ${param}`);
    }
  });
  
  // Determine if we need to redirect for canonical URL enforcement
  const needsCanonicalRedirect = isWww || isNonCanonicalHost || isHttp;
  
  // If we need canonical redirect, redirect to canonical URL
  if (needsCanonicalRedirect) {
    url.host = canonicalHost;
    url.protocol = 'https:';
    console.log(`Redirecting ${hostname} to canonical ${canonicalHost}`);
    return NextResponse.redirect(url, 301);
  }
  
  // If we only need parameter cleanup (and we're not redirecting to canonical), redirect to same host
  if (hasParametersToRemove) {
    console.log(`Cleaning parameters and redirecting to: ${url.toString()}`);
    return NextResponse.redirect(url, 301);
  }
  
  // Continue with request processing
  const response = NextResponse.next();
  
  // Enhanced security and SEO headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  // Add canonical preference header
  response.headers.set('Link', `<https://${canonicalHost}${url.pathname}>; rel="canonical"`);
  
  // Add domain preference for search engines
  response.headers.set('X-Robots-Tag', 'index, follow');
  
  // Cache control for static assets
  if (url.pathname.startsWith('/images/') || 
      url.pathname.startsWith('/videos/') || 
      url.pathname.startsWith('/fonts/') ||
      url.pathname.match(/\.(jpg|jpeg|png|webp|avif|svg|mp4|webm|woff|woff2)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes) 
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};