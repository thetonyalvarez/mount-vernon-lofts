import { restaurantsData } from "@/app/config/neighborhood-restaurants-data"
import type { SubpageVenue } from "@/app/config/neighborhood-subpage-types"

export function RestaurantsSchema() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mtvernonlofts.com"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Best Restaurants Near Montrose Houston | Local Dining Guide",
    description:
      "From James Beard winners to Michelin-starred dining — the best restaurants within walking distance of Montrose. Updated guide with hours and what to order.",
    url: `${baseUrl}/neighborhood/restaurants`,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Neighborhood",
          item: `${baseUrl}/neighborhood`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Restaurants",
          item: `${baseUrl}/neighborhood/restaurants`,
        },
      ],
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: restaurantsData.faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  }

  const allVenues: readonly SubpageVenue[] = restaurantsData.tiers.flatMap(
    (tier) => [...tier.venues]
  )

  const localBusinessSchemas = allVenues.map((venue) => ({
    "@context": "https://schema.org",
    "@type": "Restaurant" as const,
    name: venue.name,
    address: {
      "@type": "PostalAddress" as const,
      streetAddress: venue.address,
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: venue.zipCode,
    },
    ...(venue.website ? { url: venue.website } : {}),
    ...(venue.cuisine ? { servesCuisine: venue.cuisine } : {}),
  }))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {localBusinessSchemas.map((schema) => (
        <script
          key={schema.name}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
