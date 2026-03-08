import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { DataLayerEvent } from '@/app/components/analytics/DataLayerEvent'
import { getUnitTypeBySlug, getAllUnitSlugs } from '@/app/config/unit-type-data'
import {
  UnitHeroSection,
  MatterportTourSection,
  UnitGallerySection,
  FloorPlanSection,
  UnitFeaturesSection,
  UnitBodySection,
  BuildingSnapshotSection,
  CompareLayoutsSection,
  UnitLeadFormSection,
  UnitBreadcrumb,
  UnitSchema,
} from './sections'

interface PageProps {
  readonly params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllUnitSlugs().map((slug) => ({ slug }))
  // studio-s1, studio-s2, 1bed-a1, 1bed-a2, 1bed-a3, 1bed-a4
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const unitType = getUnitTypeBySlug(slug)
  if (!unitType) return {}

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mtvernonlofts.com'

  return {
    title: unitType.seo.title,
    description: unitType.seo.description,
    openGraph: {
      title: unitType.seo.ogTitle,
      description: unitType.seo.ogDescription,
      images: [{
        url: unitType.photos[0]?.src ?? '/images/unit-26_studio/26-1.jpg',
        width: 1200,
        height: 630,
        alt: unitType.photos[0]?.alt ?? `${unitType.unitType} ${unitType.layoutName} at Mount Vernon Lofts`,
      }],
      url: `${baseUrl}/residences/${slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/residences/${slug}`,
    },
  }
}

export default async function UnitTypePage({ params }: PageProps) {
  const { slug } = await params
  const unitType = getUnitTypeBySlug(slug)

  if (!unitType) {
    notFound()
  }

  return (
    <main>
      <UnitSchema unitType={unitType} />
      <UnitBreadcrumb unitType={unitType} />
      <DataLayerEvent
        event="view_content"
        data={{
          content_type: 'unit_type',
          content_name: unitType.slug,
          value: unitType.price,
        }}
      />
      <UnitHeroSection unitType={unitType} />
      <MatterportTourSection unitType={unitType} />
      <UnitGallerySection unitType={unitType} />
      <FloorPlanSection unitType={unitType} />
      <UnitFeaturesSection unitType={unitType} />
      <UnitBodySection unitType={unitType} />
      <BuildingSnapshotSection />
      <CompareLayoutsSection currentSlug={unitType.slug} />
      <UnitLeadFormSection unitType={unitType} />
    </main>
  )
}
