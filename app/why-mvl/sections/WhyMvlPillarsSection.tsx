const pillars = [
  {
    heading: "2018 Construction",
    body: "Modern building systems, concrete foundation, no deferred maintenance. Not a flip, not a renovation — built to current codes with individual HVAC, in-unit washer/dryer, and covered parking.",
  },
  {
    heading: "Own in Montrose Under $220K",
    body: "Entry point well below the neighborhood's $700K+ median home price. Build equity instead of paying someone else's mortgage — with monthly costs that can compete with rent.",
  },
  {
    heading: "Walkable Montrose Lifestyle",
    body: "Coffee shops, restaurants, Menil Collection, Buffalo Bayou Park. 15 minutes to downtown and the Medical Center. One of Houston's most walkable neighborhoods is right outside your door.",
  },
  {
    heading: "$300/Month HOA — Includes Water",
    body: "Predictable monthly costs with no surprise assessments from aging infrastructure. HOA reserves are above the Fannie Mae 10% requirement. Professional management by Equity.",
  },
  {
    heading: "Conventional Financing Ready",
    body: "42-unit building with strong owner-occupancy ratio. Qualifies for conventional loans — first-time buyers can put as little as 3% down. Close in 30-45 days.",
  },
  {
    heading: "Stop Renting, Start Building Equity",
    body: "Average Montrose 1-bed rent: $1,500+/month. MVL monthly costs can be comparable — but you're building wealth, not a landlord's. Tax deductions and appreciation work for you.",
  },
]

export function WhyMvlPillarsSection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-10">
          6 Reasons to Buy at MVL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.heading}
              className="bg-white rounded p-6 md:p-8"
            >
              <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3">
                {pillar.heading}
              </h3>
              <p className="text-mvl-espresso/75 leading-relaxed">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
