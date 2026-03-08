import type { UnitTypePageData } from '@/app/config/unit-type-data'

interface UnitSchemaProps {
  readonly unitType: UnitTypePageData
}

export function UnitSchema({ unitType }: UnitSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mtvernonlofts.com'
  const pageUrl = `${baseUrl}/residences/${unitType.slug}`

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Accommodation',
      '@id': `${pageUrl}#unit`,
      name: `${unitType.schema.breadcrumbName} — Mount Vernon Lofts`,
      description: `${unitType.sqft} sq ft ${unitType.unitType.toLowerCase()} condo in Montrose, Houston. ${unitType.features.unit[0]}. Schedule a tour today.`,
      url: pageUrl,
      accommodationCategory: unitType.schema.accommodationCategory,
      floorSize: {
        '@type': 'QuantitativeValue',
        value: String(unitType.sqft),
        unitCode: 'FTK',
      },
      numberOfRooms: unitType.schema.numberOfRooms,
      numberOfBathroomsTotal: unitType.bathrooms,
      numberOfBedrooms: unitType.bedrooms,
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'In-Unit Washer/Dryer', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Covered Parking', value: true },
        { '@type': 'LocationFeatureSpecification', name: unitType.bedrooms === 0 ? 'Open Floor Plan' : 'Separate Bedroom', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Individual HVAC', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Granite Countertops', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'European-Style Cabinetry', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Pet-Friendly', value: true },
      ],
      offers: {
        '@type': 'Offer',
        availability: unitType.schemaAvailability,
        url: pageUrl,
      },
      image: unitType.photos[0]?.src ? `${baseUrl}${unitType.photos[0].src}` : undefined,
      containedInPlace: {
        '@id': `${baseUrl}/#property`,
      },
    },
  ]

  // Add VirtualLocation for pages with Matterport tours
  if (unitType.matterportUrl) {
    const matterportBaseUrl = unitType.matterportUrl.split('&')[0]
    graph.push({
      '@type': 'VirtualLocation',
      name: `3D Virtual Tour — ${unitType.schema.breadcrumbName} at Mount Vernon Lofts`,
      url: matterportBaseUrl,
      description: `Interactive 3D Matterport walkthrough of the ${unitType.schema.breadcrumbName} layout at Mount Vernon Lofts in Montrose, Houston.`,
    })
  }

  // BreadcrumbList is handled by UnitBreadcrumb component to avoid duplication

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': graph,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
