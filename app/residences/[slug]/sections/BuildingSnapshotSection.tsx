import { Building2, DollarSign, Car, Dog, MapPin, Coffee } from 'lucide-react'
import { buildingSnapshot } from '@/app/config/unit-type-data'

const snapshotItems = [
  { icon: Building2, label: 'Year Built', value: String(buildingSnapshot.yearBuilt) },
  { icon: DollarSign, label: 'HOA', value: buildingSnapshot.hoa },
  { icon: Car, label: 'Parking', value: buildingSnapshot.parking },
  { icon: Dog, label: 'Pets', value: buildingSnapshot.pets },
  { icon: MapPin, label: 'Neighborhood', value: buildingSnapshot.neighborhood },
  { icon: Coffee, label: 'Nearby', value: buildingSnapshot.nearby },
] as const

export function BuildingSnapshotSection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-beige">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-10">
          Building & Community
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {snapshotItems.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded p-6 flex gap-4"
            >
              <item.icon className="w-5 h-5 text-mvl-coral shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-mvl-espresso mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-mvl-espresso/70">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
