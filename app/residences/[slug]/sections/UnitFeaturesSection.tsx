import type { UnitTypePageData } from '@/app/config/unit-type-data'

interface UnitFeaturesSectionProps {
  readonly unitType: UnitTypePageData
}

export function UnitFeaturesSection({ unitType }: UnitFeaturesSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-10">
          Features & Finishes
        </h2>
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-5">
              Unit Features
            </h3>
            <ul className="space-y-3">
              {unitType.features.unit.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-mvl-espresso/80">
                  <span className="w-2 h-2 rounded-full bg-mvl-coral mt-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-5">
              Kitchen & Bath
            </h3>
            <ul className="space-y-3">
              {unitType.features.kitchenBath.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-mvl-espresso/80">
                  <span className="w-2 h-2 rounded-full bg-mvl-coral mt-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
