/**
 * Dynamic sitemap generation for Mount Vernon Lofts
 * Ensures all URLs use canonical https://mtvernonlofts.com domain
 */

export async function GET() {
  const baseUrl = 'https://mtvernonlofts.com';
  const currentDate = new Date().toISOString();

  const urls = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: `${baseUrl}/residences`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/floor-plans`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/neighborhood`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.map(({ url, lastModified, changeFrequency, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changeFrequency}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en-us" href="${url}" />
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
