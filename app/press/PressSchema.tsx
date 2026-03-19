import { pressArticles } from '@/app/config/press-data'

export function PressSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mtvernonlofts.com'

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/press`,
        name: 'In The Press | Mount Vernon Lofts',
        description:
          'Press coverage and media mentions of Mount Vernon Lofts, modern condos in Houston\'s Montrose neighborhood.',
        url: `${baseUrl}/press`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: pressArticles.map((article, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'NewsArticle',
              headline: article.title,
              datePublished: article.publishedDate,
              ...(article.author !== null
                ? { author: { '@type': 'Person', name: article.author } }
                : {}),
              publisher: {
                '@type': 'Organization',
                name: article.publication,
              },
              url: article.url,
              description: article.description,
              image: article.thumbnailSrc.startsWith('http')
                ? article.thumbnailSrc
                : `${baseUrl}${article.thumbnailSrc}`,
              about: {
                '@type': 'ApartmentComplex',
                '@id': `${baseUrl}/#property`,
              },
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'In The Press',
            item: `${baseUrl}/press`,
          },
        ],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
