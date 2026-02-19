/**
 * Enhanced Metadata Component for Mount Vernon Lofts
 * Handles comprehensive structured data, social sharing, and SEO signals
 */

interface EnhancedMetadataProps {
  readonly title?: string;
  readonly description?: string;
  readonly canonicalUrl?: string;
  readonly imageUrl?: string;
  readonly pageType?: 'homepage' | 'residences' | 'gallery' | 'contact' | 'neighborhood' | 'floor-plans';
}

export function EnhancedMetadata({
  title = "Mount Vernon Lofts | Modern Condos in Montrose, Houston",
  description = "Modern condos in Montrose, Houston starting in the $215Ks. Studios and 1-bedrooms in one of Houston's most walkable neighborhoods. Built 2018, pet-friendly, covered parking. Schedule a tour today.",
  canonicalUrl,
  imageUrl,
  pageType = 'homepage'
}: EnhancedMetadataProps) {

  // Use environment variable for consistent domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com';
  const finalCanonicalUrl = canonicalUrl || baseUrl;
  const finalImageUrl = imageUrl || `${baseUrl}/images/gallery/exteriors/exterior-1.jpg`;

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "Mount Vernon Lofts",
        "description": "Modern condos in Montrose, Houston starting in the $215Ks",
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "Mount Vernon Lofts",
        "alternateName": "MVL Montrose",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/images/logo.png`,
          "width": 400,
          "height": 100
        },
        "image": {
          "@type": "ImageObject",
          "url": finalImageUrl,
          "width": 1200,
          "height": 630
        },
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4509 Mount Vernon",
          "addressLocality": "Houston",
          "addressRegion": "TX",
          "postalCode": "77006",
          "addressCountry": "US",
          "neighborhood": "Montrose"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "29.7560",
          "longitude": "-95.3920"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "areaServed": "Houston",
          "availableLanguage": "English"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${finalCanonicalUrl}/#webpage`,
        "url": finalCanonicalUrl,
        "name": title,
        "description": description,
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "about": {
          "@id": `${baseUrl}/#organization`
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": finalImageUrl
        },
        "datePublished": "2024-01-01T00:00:00+00:00",
        "dateModified": new Date().toISOString()
      },
      ...(pageType === 'homepage' ? [{
        "@type": "RealEstateListing",
        "@id": `${baseUrl}/#listing`,
        "mainEntity": {
          "@type": "Residence",
          "name": "Mount Vernon Lofts",
          "description": "42 modern condos in Houston's Montrose neighborhood starting in the $215Ks.",
          "url": baseUrl,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "4509 Mount Vernon",
            "addressLocality": "Houston",
            "addressRegion": "TX",
            "postalCode": "77006",
            "addressCountry": "US",
            "neighborhood": "Montrose"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "29.7560",
            "longitude": "-95.3920"
          },
          "numberOfRooms": 42,
          "petsAllowed": true,
          "amenityFeature": [
            {
              "@type": "LocationFeatureSpecification",
              "name": "Covered Parking",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "In-Unit Washer/Dryer",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Natural Light Throughout",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Pet-Friendly (Up to 2 Dogs Per Handler, Registration Required)",
              "value": true
            }
          ],
          "priceRange": "$$$"
        },
        "offers": {
          "@type": "Offer",
          "businessFunction": "sell",
          "priceCurrency": "USD",
          "price": "215000",
          "seller": {
            "@id": `${baseUrl}/#organization`
          }
        }
      }] : [])
    ]
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Houston Condos for Sale",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Montrose Condos",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Mount Vernon Lofts",
        "item": finalCanonicalUrl
      }
    ]
  };

  return (
    <>
      {/* Enhanced Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />

      {/* Breadcrumb Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData)
        }}
      />

      {/* FAQ Schema for Homepage */}
      {pageType === 'homepage' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How much do condos cost at Mount Vernon Lofts?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Condos start in the $215Ks. HOA is $300/month and includes water. Mount Vernon Lofts is designed for first-time buyers looking for attainable ownership in Montrose."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Where is Mount Vernon Lofts located?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mount Vernon Lofts is located at 4509 Mount Vernon in Houston's Montrose neighborhood (77006). Montrose is one of Houston's most walkable neighborhoods, close to the Museum District, Medical Center, and downtown."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How many units are available at Mount Vernon Lofts?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Mount Vernon Lofts has 42 total units — 34 studios (612-705 sq ft) and 8 one-bedrooms (717-799 sq ft). Built in 2018 with concrete foundation and modern building systems."
                  }
                }
              ]
            })
          }}
        />
      )}

      {/* Additional meta tags for enhanced social sharing */}
      <meta property="og:image:secure_url" content={finalImageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta name="twitter:image:alt" content="Mount Vernon Lofts modern condos in Montrose, Houston" />

      {/* WhatsApp and messaging app optimization */}
      <meta property="og:title" content={`${title.split('|')[0].trim()}: Montrose Condos Starting in the $215Ks`} />
      <meta property="og:description" content="Modern condos in Montrose, Houston starting in the $215Ks. Schedule a tour today." />

      {/* LinkedIn optimization */}
      <meta property="og:site_name" content="Mount Vernon Lofts" />
      <meta property="article:publisher" content={baseUrl} />

      {/* Email client optimization */}
      <meta name="format-detection" content="address=no" />
      <meta name="format-detection" content="email=no" />

      {/* Mobile app linking */}
      <meta property="al:web:url" content={finalCanonicalUrl} />
      <meta property="al:web:should_fallback" content="true" />
    </>
  );
}
