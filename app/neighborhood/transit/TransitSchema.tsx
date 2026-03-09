import { transitData } from "@/app/config/neighborhood-transit-data"

export function TransitSchema() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mtvernonlofts.com"

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Public Transit Near Montrose Houston | Buses, Rail & More",
    description:
      "Getting around Montrose without a car. 3 bus routes within 0.5 mi, METRORail 0.8 mi. Transit Score 61. Full Houston METRO guide from Montrose.",
    url: `${baseUrl}/neighborhood/transit`,
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
          name: "Public Transit",
          item: `${baseUrl}/neighborhood/transit`,
        },
      ],
    },
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: transitData.faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer,
      },
    })),
  }

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
    </>
  )
}
