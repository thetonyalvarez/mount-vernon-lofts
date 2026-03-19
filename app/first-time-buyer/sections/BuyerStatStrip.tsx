const stats = [
  { value: "$1,410/mo", label: "Average studio rent in Montrose", source: "RentCafe, March 2026" },
  { value: "Up to $50,000", label: "Down payment assistance available", source: "City of Houston HAP" },
  { value: "~$111/mo", label: "Homestead exemption savings", source: "On a $175K condo" },
]

export function BuyerStatStrip() {
  return (
    <section className="py-8 md:py-10 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center flex-1">
              <p className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-coral mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-mvl-espresso/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-mvl-espresso/50 mt-6">
          Updated March 2026
        </p>
      </div>
    </section>
  )
}
