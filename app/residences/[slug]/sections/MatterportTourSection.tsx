"use client"

import type { UnitTypePageData } from '@/app/config/unit-type-data'

interface MatterportTourSectionProps {
  readonly unitType: UnitTypePageData
}

export function MatterportTourSection({ unitType }: MatterportTourSectionProps) {
  if (!unitType.matterportUrl) return null

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-3">
          {unitType.matterportHeader}
        </h2>
        <p className="text-mvl-espresso/70 mb-8 max-w-2xl">
          {unitType.matterportSubtext}
        </p>
        <div className="relative w-full aspect-video rounded overflow-hidden bg-mvl-beige">
          <iframe
            src={unitType.matterportUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            allow="xr-spatial-tracking"
            loading="lazy"
            title={`3D Virtual Tour — ${unitType.unitType} ${unitType.layoutName} at Mount Vernon Lofts`}
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
