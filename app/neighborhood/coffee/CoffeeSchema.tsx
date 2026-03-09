import { coffeeData } from "@/app/config/neighborhood-coffee-data"
import type { SubpageVenue } from "@/app/config/neighborhood-subpage-types"

export function CoffeeSchema() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mtvernonlofts.com"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Best Coffee Shops in Montrose Houston | Local Guide",
    description:
      "The best coffee shops in Montrose Houston — from matcha bars to late-night spots. 3 within 0.5 miles of 4509 Mount Vernon St. Updated guide with hours.",
    url: `${baseUrl}/neighborhood/coffee`,
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
          name: "Coffee Shops",
          item: `${baseUrl}/neighborhood/coffee`,
        },
      ],
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: coffeeData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const allVenues: readonly SubpageVenue[] = coffeeData.tiers.flatMap(
    (tier) => [...tier.venues] as SubpageVenue[]
  )

  const localBusinessSchemas = allVenues.map((venue) => ({
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: venue.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: venue.address,
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: venue.zipCode,
    },
    ...(venue.website ? { url: venue.website } : {}),
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
