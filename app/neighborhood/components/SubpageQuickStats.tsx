import type { SubpageQuickStat } from "@/app/config/neighborhood-subpage-types"

interface SubpageQuickStatsProps {
  readonly stats: readonly SubpageQuickStat[]
  readonly lastUpdated: string
}

export function SubpageQuickStats({ stats, lastUpdated }: SubpageQuickStatsProps) {
  return (
    <section className="py-12 bg-mvl-beige">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-md px-6 py-4 text-center shadow-sm"
            >
              <p className="text-mvl-coral font-montserrat font-semibold text-lg md:text-xl">
                {stat.value}
              </p>
              <p className="text-mvl-espresso/70 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-mvl-espresso/50 text-xs mt-6">
          Last updated: {lastUpdated}
        </p>
      </div>
    </section>
  )
}
