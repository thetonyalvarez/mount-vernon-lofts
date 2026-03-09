import { parksData, parksVenueTiers } from "@/app/config/neighborhood-parks-data"

export function ParksSchema() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mtvernonlofts.com"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Parks & Dog Parks Near Montrose Houston",
    description:
      "Off-leash dog parks, hike-and-bike trails, and green spaces near Mount Vernon Lofts in Montrose, Houston.",
    url: `${baseUrl}/neighborhood/parks`,
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
          name: "Parks & Dog Parks",
          item: `${baseUrl}/neighborhood/parks`,
        },
      ],
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: parksData.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const allVenues = parksVenueTiers.flatMap((tier) => tier.venues)
  const localBusinessSchemas = allVenues.map((venue) => ({
    "@context": "https://schema.org",
    "@type": "Park",
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
