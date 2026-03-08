import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { UnitTypePageData } from '@/app/config/unit-type-data'

interface UnitBreadcrumbProps {
  readonly unitType: UnitTypePageData
}

export function UnitBreadcrumb({ unitType }: UnitBreadcrumbProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mtvernonlofts.com'

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Residences',
        item: `${baseUrl}/residences`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: unitType.schema.breadcrumbName,
        item: `${baseUrl}/residences/${unitType.slug}`,
      },
    ],
  }

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="bg-mvl-cream border-b border-mvl-beige pt-20"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-3">
          <ol className="flex items-center gap-1.5 text-sm text-mvl-espresso/60">
            <li>
              <Link href="/" className="hover:text-mvl-coral transition-colors">
                Home
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li>
              <Link href="/residences" className="hover:text-mvl-coral transition-colors">
                Residences
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5" />
            </li>
            <li className="text-mvl-espresso font-medium">
              {unitType.schema.breadcrumbName}
            </li>
          </ol>
        </div>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            ...breadcrumbSchema,
          }),
        }}
      />
    </>
  )
}
