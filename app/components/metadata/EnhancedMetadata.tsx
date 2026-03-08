/**
 * Enhanced Metadata Component for Mount Vernon Lofts
 * Handles comprehensive structured data, social sharing, and SEO signals
 */

interface EnhancedMetadataProps {
  readonly title?: string;
  readonly description?: string;
  readonly canonicalUrl?: string;
  readonly imageUrl?: string;
  readonly pageType?: 'homepage' | 'residences' | 'gallery' | 'contact' | 'neighborhood' | 'floor-plans' | 'open-house';
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
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "29.7560",
          "longitude": "-95.3920"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "sales",
          "telephone": "+1-713-986-9929",
          "email": "info@mtvernonlofts.com",
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
      ...(pageType === 'homepage' ? [
        {
          "@type": "ApartmentComplex",
          "@id": `${baseUrl}/#property`,
          "name": "Mount Vernon Lofts",
          "alternateName": "MVL Montrose",
          "description": "42 modern condos for sale in Houston's Montrose neighborhood. Studios and 1-bedrooms from 612 to 799 square feet, starting at $215K. Built in 2018 with granite countertops, classic shaker cabinetry, in-unit washer/dryer, and covered parking. Low $300/month HOA includes water. Pet-friendly. Walkable to restaurants, museums, parks, and coffee shops.",
          "url": baseUrl,
          "telephone": "+1-713-986-9929",
          "email": "info@mtvernonlofts.com",
          "priceRange": "$215K\u2013$279K",
          "numberOfAccommodationUnits": 42,
          "petsAllowed": "Dogs allowed \u2014 up to 2 dogs per handler in common areas. $75 one-time registration fee per pet. Breed restrictions apply (no aggressive breeds). Vaccinations and licensing required.",
          "tourBookingPage": `${baseUrl}/#contact`,
          "image": [
            `${baseUrl}/images/gallery/exteriors/exterior-1.jpg`,
            `${baseUrl}/images/gallery/exteriors/exterior-2.jpg`
          ],
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/images/logo.png`,
            "width": 400,
            "height": 100
          },
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
          "hasMap": "https://www.google.com/maps/place/4509+Mt+Vernon+St,+Houston,+TX+77006",
          "amenityFeature": [
            { "@type": "LocationFeatureSpecification", "name": "Covered Parking", "value": true, "description": "1 covered parking space per unit included" },
            { "@type": "LocationFeatureSpecification", "name": "In-Unit Washer/Dryer", "value": true, "description": "Full-size washer and dryer in every unit" },
            { "@type": "LocationFeatureSpecification", "name": "Individual HVAC", "value": true, "description": "Individual climate control system per unit" },
            { "@type": "LocationFeatureSpecification", "name": "Granite Countertops", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Classic Shaker Cabinetry", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Open Floor Plans", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Large Windows / Natural Light", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Private Balcony", "value": true, "description": "Select units feature private balconies with neighborhood views" },
            { "@type": "LocationFeatureSpecification", "name": "Recreational Lounge", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Outdoor Common Areas", "value": true },
            { "@type": "LocationFeatureSpecification", "name": "Concrete Foundation", "value": true, "description": "2018 construction with modern building systems" },
            { "@type": "LocationFeatureSpecification", "name": "Pet-Friendly", "value": true, "description": "Dogs welcome with registration. 2 dogs per handler in common areas." }
          ],
          "additionalProperty": [
            { "@type": "PropertyValue", "name": "HOA Fee", "value": "$300/month (includes water)" },
            { "@type": "PropertyValue", "name": "Property Type", "value": "Condominium" },
            { "@type": "PropertyValue", "name": "Year Built", "value": "2018" },
            { "@type": "PropertyValue", "name": "Total Units", "value": "42" },
            { "@type": "PropertyValue", "name": "Units Currently Available", "value": "4" },
            { "@type": "PropertyValue", "name": "Unit Types", "value": "Studios (612-705 SF) and 1-Bedrooms (717-799 SF)" },
            { "@type": "PropertyValue", "name": "Residential Floors", "value": "2" },
            { "@type": "PropertyValue", "name": "Neighborhood", "value": "Montrose" },
            { "@type": "PropertyValue", "name": "Parking Type", "value": "Covered \u2014 1 space per unit" },
            { "@type": "PropertyValue", "name": "Short-Term Rentals", "value": "Not permitted. Minimum 30-day lease required." },
            { "@type": "PropertyValue", "name": "Maximum Leased Units", "value": "48% (20 of 42 units)" }
          ],
          "containsPlace": [
            {
              "@type": "Accommodation",
              "name": "Studio S1",
              "accommodationCategory": "Studio",
              "floorSize": { "@type": "QuantitativeValue", "value": "612", "unitCode": "FTK" },
              "numberOfBedrooms": 0,
              "numberOfBathroomsTotal": 1,
              "offers": { "@type": "Offer", "price": "215124", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            },
            {
              "@type": "Accommodation",
              "name": "Studio S2",
              "accommodationCategory": "Studio",
              "floorSize": { "@type": "QuantitativeValue", "value": "705", "unitCode": "FTK" },
              "numberOfBedrooms": 0,
              "numberOfBathroomsTotal": 1,
              "offers": { "@type": "Offer", "price": "237585", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            },
            {
              "@type": "Accommodation",
              "name": "1-Bedroom A1",
              "accommodationCategory": "One-Bedroom",
              "floorSize": { "@type": "QuantitativeValue", "value": "717", "unitCode": "FTK" },
              "numberOfBedrooms": 1,
              "numberOfBathroomsTotal": 1,
              "offers": { "@type": "Offer", "price": "252033", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            },
            {
              "@type": "Accommodation",
              "name": "1-Bedroom A2",
              "accommodationCategory": "One-Bedroom",
              "floorSize": { "@type": "QuantitativeValue", "value": "719", "unitCode": "FTK" },
              "numberOfBedrooms": 1,
              "numberOfBathroomsTotal": 1,
              "offers": { "@type": "Offer", "price": "252736", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            },
            {
              "@type": "Accommodation",
              "name": "1-Bedroom A3",
              "accommodationCategory": "One-Bedroom",
              "floorSize": { "@type": "QuantitativeValue", "value": "778", "unitCode": "FTK" },
              "numberOfBedrooms": 1,
              "numberOfBathroomsTotal": 1,
              "offers": { "@type": "Offer", "price": "271522", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            },
            {
              "@type": "Accommodation",
              "name": "1-Bedroom A4",
              "accommodationCategory": "One-Bedroom",
              "floorSize": { "@type": "QuantitativeValue", "value": "799", "unitCode": "FTK" },
              "numberOfBedrooms": 1,
              "numberOfBathroomsTotal": 1,
              "offers": { "@type": "Offer", "price": "278851", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
            }
          ],
          "broker": {
            "@type": "RealEstateAgent",
            "@id": `${baseUrl}/#agent`,
            "name": "Nan & Company Properties",
            "url": "https://nanproperties.com",
            "telephone": "+1-713-986-9929",
            "email": "info@mtvernonlofts.com",
            "memberOf": [
              { "@type": "Organization", "name": "Forbes Global Properties" },
              { "@type": "Organization", "name": "Leading Real Estate Companies of the World" },
              { "@type": "Organization", "name": "Luxury Portfolio International" }
            ]
          },
          "sameAs": [
            "https://www.instagram.com/mountvernonlofts/",
            "https://www.facebook.com/mtvernonlofts/",
            "https://nanproperties.com/developments/mount-vernon-lofts"
          ]
        },
        {
          "@type": "Person",
          "@id": `${baseUrl}/#sales-agent`,
          "name": "Jeffrey Winans",
          "jobTitle": "Dedicated Sales Agent, Realtor Associate",
          "telephone": "+1-713-986-9929",
          "email": "jeffrey.winans@nanproperties.com",
          "worksFor": {
            "@id": `${baseUrl}/#agent`
          }
        }
      ] : [])
    ]
  };

  const pageTitles: Record<string, string> = {
    homepage: "Home",
    residences: "Residences",
    gallery: "Gallery",
    contact: "Contact",
    neighborhood: "Neighborhood",
    "floor-plans": "Floor Plans",
    "open-house": "Open House",
  };

  const breadcrumbItems: Array<{ "@type": string; position: number; name: string; item: string }> = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Mount Vernon Lofts",
      "item": baseUrl
    }
  ];

  if (pageType !== "homepage") {
    breadcrumbItems.push({
      "@type": "ListItem",
      "position": 2,
      "name": pageTitles[pageType] ?? "Page",
      "item": finalCanonicalUrl
    });
  }

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems
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
