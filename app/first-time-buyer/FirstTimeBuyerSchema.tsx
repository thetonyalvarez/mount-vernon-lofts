export function FirstTimeBuyerSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mtvernonlofts.com'

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "First-Time Buyer's Guide to Buying a Condo in Houston",
    "description": "Step-by-step guide to buying your first condo in Houston. Down payment programs, financing options, rent vs. buy math, and what first-time buyers need to know.",
    "url": `${baseUrl}/first-time-buyer`,
    "datePublished": "2026-03-08",
    "dateModified": "2026-03-08",
    "author": {
      "@type": "Organization",
      "name": "Mount Vernon Lofts",
      "url": baseUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mount Vernon Lofts",
      "url": baseUrl
    },
    "isPartOf": {
      "@id": `${baseUrl}/#website`
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "First-Time Buyer Guide",
          "item": `${baseUrl}/first-time-buyer`
        }
      ]
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much do I need for a down payment on a condo in Houston?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on the loan type and the building. Non-QM loans typically require 10% down. FHA loans require 3.5%, and some conventional loans start at 3-5%. On a $175,000 condo, that ranges from approximately $6,125 to $17,500. Houston's Homebuyer Assistance Program offers up to $50,000 in forgivable assistance for qualifying buyers."
        }
      },
      {
        "@type": "Question",
        "name": "What Houston programs help first-time home buyers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The main programs include the City of Houston Homebuyer Assistance Program (up to $50,000 forgivable loan), TSAHC Home Sweet Texas (up to 5% of loan amount as a grant), TSAHC Texas Heroes (for public servants), and Harris County Down Payment Assistance. Eligibility depends on income, credit score, and property location."
        }
      },
      {
        "@type": "Question",
        "name": "Is it cheaper to buy a condo than rent in Houston?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Monthly cash outflow for condo ownership is often higher than renting when you include mortgage, HOA, taxes, and insurance. However, a portion of each mortgage payment builds equity. Over time, the total cost of ownership can be lower than renting — especially with a fixed-rate mortgage compared to rents that typically rise annually."
        }
      },
      {
        "@type": "Question",
        "name": "What's different about financing a condo vs. a house?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The biggest difference: your lender evaluates the building, not just you. Condo buildings must meet specific criteria including reserves, owner-occupancy ratios, and insurance coverage to qualify for conventional or FHA financing. Non-QM financing is available for buildings that don't yet meet these standards."
        }
      },
      {
        "@type": "Question",
        "name": "What is the homestead exemption in Texas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If you buy a home and make it your primary residence, Texas exempts $140,000 of your property's appraised value from school district taxes. At Houston's approximate 1.77% combined tax rate, this can save over $1,000 per year on a $175,000 condo. You must file Form 50-114 with HCAD between January 1 and April 30."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a real estate agent to buy a condo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You don't legally need one, but it's strongly recommended for condos. A good agent handles negotiations, reviews HOA documents, coordinates inspections, and manages closing. In Texas, the seller typically pays the buyer's agent commission, so representation usually costs you nothing out of pocket."
        }
      },
      {
        "@type": "Question",
        "name": "What should I look for in a condo HOA before buying?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Focus on the reserve fund (should be 10%+ of annual budget), pending special assessments, insurance coverage, management company reputation, and HOA rules. Request recent financial statements, meeting minutes, and governing documents before making an offer."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to buy a condo in Houston?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "From accepted offer to closing, typically 30-45 days for conventional financing. Non-QM loans can sometimes close faster. The full process from starting your search to moving in usually takes 2-4 months."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
