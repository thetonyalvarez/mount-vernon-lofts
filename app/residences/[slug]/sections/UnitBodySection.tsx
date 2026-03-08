import type { UnitTypePageData } from '@/app/config/unit-type-data'

interface UnitBodySectionProps {
  readonly unitType: UnitTypePageData
}

export function UnitBodySection({ unitType }: UnitBodySectionProps) {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-8">
          {unitType.bodyContent.headline}
        </h2>
        <div className="space-y-6">
          {unitType.bodyContent.paragraphs.map((paragraph, index) => (
            <p
              key={`paragraph-${unitType.slug}-${index}`}
              className="text-mvl-espresso/80 leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
