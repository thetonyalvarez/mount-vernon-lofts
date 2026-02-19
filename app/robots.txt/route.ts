/**
 * Dynamic robots.txt generation for Mount Vernon Lofts
 * Reinforces canonical domain preference and handles indexing parameters
 */

export async function GET() {
  const baseUrl = 'https://mtvernonlofts.com';

  const robotsTxt = `# Mount Vernon Lofts - Robots Configuration
# Canonical domain: ${baseUrl}

User-agent: *
Allow: /

# High-priority pages
Allow: /residences
Allow: /floor-plans
Allow: /neighborhood
Allow: /gallery

# Block query parameters that cause duplicate content
Disallow: /*?index=*
Disallow: /*?fbclid=*
Disallow: /*?gclid=*
Disallow: /*?utm_*
Disallow: /*?ref=*
Disallow: /*?source=*

# Block admin and API paths
Disallow: /api/
Disallow: /.well-known/
Disallow: /thank-you
Disallow: /_next/
Disallow: /admin/

# Allow assets
Allow: /images/
Allow: /videos/
Allow: /fonts/
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.webp$
Allow: /*.avif$
Allow: /*.svg$

# Sitemap location (canonical domain)
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Google-specific directives
User-agent: Googlebot
Allow: /
Disallow: /*?index=*
Crawl-delay: 1

# Bing-specific directives
User-agent: Bingbot
Allow: /
Disallow: /*?index=*
Crawl-delay: 1

# Block problematic crawlers
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400'
    }
  });
}
