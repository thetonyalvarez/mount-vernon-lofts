import { museumsTiers, museumsFAQs } from "@/app/config/neighborhood-museums-data"

function buildMuseumLocalBusinessEntries() {
  const entries: Record<string, unknown>[] = []

  for (const tier of museumsTiers) {
    for (const venue of tier.venues) {
      entries.push({
        "@type": "Museum",
        name: venue.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: venue.address,
          addressLocality: "Houston",
          addressRegion: "TX",
          postalCode: venue.zipCode,
          addressCountry: "US",
        },
        ...(venue.website ? { url: venue.website } : {}),
      })
    }
  }

  return entries
}

export function MuseumsSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mtvernonlofts.com"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Museums Near Montrose Houston | Art & Culture Guide",
    description:
      "World-class museums and galleries within walking distance of Mount Vernon Lofts in Montrose, Houston. The Menil Collection, Rothko Chapel, CAMH, MFAH, and more.",
    url: `${siteUrl}/neighborhood/museums`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Neighborhood",
          item: `${siteUrl}/neighborhood`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Museums & Culture",
          item: `${siteUrl}/neighborhood/museums`,
        },
      ],
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: museumsFAQs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  const museumEntries = buildMuseumLocalBusinessEntries()

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
      {museumEntries.map((entry) => (
        <script
          key={entry.name as string}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", ...entry }) }}
        />
      ))}
    </>
  )
}
