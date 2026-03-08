/**
 * Structured data (JSON-LD) for the Residences page
 * Includes RealEstateListing, Accommodation entries, RealEstateAgent, BreadcrumbList
 */

export function ResidencesSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mtvernonlofts.com"

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateListing",
        "@id": `${baseUrl}/residences#listing`,
        "name": "Mount Vernon Lofts — Modern Condos for Sale in Montrose, Houston",
        "description": "42 modern condos in Houston's Montrose neighborhood. Studios from $215K, 1-bedrooms from $252K. Built in 2018 with granite countertops, in-unit washer/dryer, covered parking, and low $300/month HOA. Walkable to restaurants, museums, and coffee shops in one of Houston's most desirable inner loop neighborhoods.",
        "url": `${baseUrl}/residences`,
        "datePosted": "2026-02-01",
        "image": [
          `${baseUrl}/images/gallery/exteriors/exterior-1.jpg`,
          `${baseUrl}/images/gallery/exteriors/exterior-2.jpg`
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4509 Mount Vernon Street",
          "addressLocality": "Houston",
          "addressRegion": "TX",
          "postalCode": "77006",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 29.7320975,
          "longitude": -95.3934297
        },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "215124",
          "highPrice": "278851",
          "priceCurrency": "USD",
          "offerCount": "42",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/residences`
        }
      },
      {
        "@type": "Accommodation",
        "@id": `${baseUrl}/residences#studio-s1`,
        "name": "Studio S1 — Mount Vernon Lofts",
        "accommodationCategory": "Studio Condominium",
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": "612",
          "unitCode": "FTK"
        },
        "numberOfRooms": 1,
        "numberOfBathroomsTotal": 1,
        "numberOfFullBathrooms": 1,
        "numberOfBedrooms": 0,
        "occupancy": {
          "@type": "QuantitativeValue",
          "value": "32",
          "unitText": "units of this type"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "In-Unit Washer/Dryer", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Covered Parking", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Open Floor Plan", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Individual HVAC", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Natural Light", "value": true }
        ],
        "offers": {
          "@type": "Offer",
          "price": "215124",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/residences`
        },
        "containedInPlace": {
          "@id": `${baseUrl}/#property`
        }
      },
      {
        "@type": "Accommodation",
        "@id": `${baseUrl}/residences#studio-s2`,
        "name": "Studio S2 — Mount Vernon Lofts",
        "accommodationCategory": "Studio Condominium",
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": "705",
          "unitCode": "FTK"
        },
        "numberOfRooms": 1,
        "numberOfBathroomsTotal": 1,
        "numberOfFullBathrooms": 1,
        "numberOfBedrooms": 0,
        "occupancy": {
          "@type": "QuantitativeValue",
          "value": "2",
          "unitText": "units of this type"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "In-Unit Washer/Dryer", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Covered Parking", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Expanded Open Layout", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Individual HVAC", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Natural Light", "value": true }
        ],
        "offers": {
          "@type": "Offer",
          "price": "237585",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/residences`
        },
        "containedInPlace": {
          "@id": `${baseUrl}/#property`
        }
      },
      {
        "@type": "Accommodation",
        "@id": `${baseUrl}/residences#1bed-a1`,
        "name": "1-Bedroom A1 — Mount Vernon Lofts",
        "accommodationCategory": "One-Bedroom Condominium",
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": "717",
          "unitCode": "FTK"
        },
        "numberOfRooms": 2,
        "numberOfBathroomsTotal": 1,
        "numberOfFullBathrooms": 1,
        "numberOfBedrooms": 1,
        "occupancy": {
          "@type": "QuantitativeValue",
          "value": "2",
          "unitText": "units of this type"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Separate Bedroom", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "In-Unit Washer/Dryer", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Covered Parking", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Individual HVAC", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Natural Light", "value": true }
        ],
        "offers": {
          "@type": "Offer",
          "price": "252033",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/residences`
        },
        "containedInPlace": {
          "@id": `${baseUrl}/#property`
        }
      },
      {
        "@type": "Accommodation",
        "@id": `${baseUrl}/residences#1bed-a2`,
        "name": "1-Bedroom A2 — Mount Vernon Lofts",
        "accommodationCategory": "One-Bedroom Condominium",
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": "719",
          "unitCode": "FTK"
        },
        "numberOfRooms": 2,
        "numberOfBathroomsTotal": 1,
        "numberOfFullBathrooms": 1,
        "numberOfBedrooms": 1,
        "occupancy": {
          "@type": "QuantitativeValue",
          "value": "2",
          "unitText": "units of this type"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Separate Bedroom", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "In-Unit Washer/Dryer", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Covered Parking", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Individual HVAC", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Natural Light", "value": true }
        ],
        "offers": {
          "@type": "Offer",
          "price": "252736",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/residences`
        },
        "containedInPlace": {
          "@id": `${baseUrl}/#property`
        }
      },
      {
        "@type": "Accommodation",
        "@id": `${baseUrl}/residences#1bed-a3`,
        "name": "1-Bedroom A3 — Mount Vernon Lofts",
        "accommodationCategory": "One-Bedroom Condominium",
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": "778",
          "unitCode": "FTK"
        },
        "numberOfRooms": 2,
        "numberOfBathroomsTotal": 1,
        "numberOfFullBathrooms": 1,
        "numberOfBedrooms": 1,
        "occupancy": {
          "@type": "QuantitativeValue",
          "value": "2",
          "unitText": "units of this type"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Spacious 1-Bedroom Layout", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "In-Unit Washer/Dryer", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Covered Parking", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Individual HVAC", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Natural Light", "value": true }
        ],
        "offers": {
          "@type": "Offer",
          "price": "271522",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/residences`
        },
        "containedInPlace": {
          "@id": `${baseUrl}/#property`
        }
      },
      {
        "@type": "Accommodation",
        "@id": `${baseUrl}/residences#1bed-a4`,
        "name": "1-Bedroom A4 — Mount Vernon Lofts",
        "accommodationCategory": "One-Bedroom Condominium",
        "floorSize": {
          "@type": "QuantitativeValue",
          "value": "799",
          "unitCode": "FTK"
        },
        "numberOfRooms": 2,
        "numberOfBathroomsTotal": 1,
        "numberOfFullBathrooms": 1,
        "numberOfBedrooms": 1,
        "occupancy": {
          "@type": "QuantitativeValue",
          "value": "2",
          "unitText": "units of this type"
        },
        "amenityFeature": [
          { "@type": "LocationFeatureSpecification", "name": "Largest 1-Bedroom Layout", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "In-Unit Washer/Dryer", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Covered Parking", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Individual HVAC", "value": true },
          { "@type": "LocationFeatureSpecification", "name": "Natural Light", "value": true }
        ],
        "offers": {
          "@type": "Offer",
          "price": "278851",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/residences`
        },
        "containedInPlace": {
          "@id": `${baseUrl}/#property`
        }
      },
      {
        "@type": "RealEstateAgent",
        "@id": `${baseUrl}/#agent`,
        "name": "Nan & Company Properties",
        "url": "https://nanproperties.com",
        "telephone": "+1-713-986-9929",
        "email": "info@mtvernonlofts.com"
      },
      {
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
            "name": "Residences",
            "item": `${baseUrl}/residences`
          }
        ]
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
