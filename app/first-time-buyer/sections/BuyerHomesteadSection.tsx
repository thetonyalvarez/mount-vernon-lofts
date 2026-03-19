const keyData = [
  { item: "School district exemption", value: "$140,000 of appraised value", source: "Texas Comptroller; Prop 13 (Nov 2025)" },
  { item: "Harris County optional exemption", value: "20% of appraised value", source: "HCAD" },
  { item: "Combined tax rate (approximate)", value: "~1.77%", source: "HoustonProperties.com" },
  { item: "Annual appraisal cap", value: "10% max increase/year", source: "Texas Tax Code" },
]

const savingsRows = [
  { scenario: "Without homestead exemption", annual: "~$3,812", monthly: "~$318/month" },
  { scenario: "With homestead exemption", annual: "~$2,478", monthly: "~$207/month" },
  { scenario: "Annual savings", annual: "~$1,334", monthly: "~$111/month" },
]

export function BuyerHomesteadSection() {
  return (
    <section id="homestead" className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-6">
            The Homestead Exemption — Tax Savings Most Buyers Miss
          </h2>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Most first-time buyers don&#39;t know the homestead exemption exists until after they&#39;ve closed — and some miss the filing deadline entirely. If you buy a condo and make it your primary residence, Texas law exempts a significant portion of your home&#39;s value from property taxes.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-8">
            The biggest piece: $140,000 exempted from school district taxes. On a $175,000 condo, that reduces your school tax base to $35,000.
          </p>
        </div>

        {/* Key Data Table */}
        <div className="max-w-3xl mb-8">
          <div className="rounded overflow-hidden">
            <div className="grid grid-cols-3 bg-mvl-espresso text-white text-sm font-montserrat font-semibold">
              <div className="p-3 md:p-4">Item</div>
              <div className="p-3 md:p-4">Value</div>
              <div className="p-3 md:p-4">Source</div>
            </div>
            {keyData.map((row, i) => (
              <div
                key={row.item}
                className={`grid grid-cols-3 text-sm ${
                  i % 2 === 0
                    ? "bg-white text-mvl-espresso/80"
                    : "bg-mvl-warm-white text-mvl-espresso/80"
                }`}
              >
                <div className="p-3 md:p-4 font-medium text-mvl-espresso">{row.item}</div>
                <div className="p-3 md:p-4">{row.value}</div>
                <div className="p-3 md:p-4">{row.source}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Savings Table */}
        <div className="max-w-3xl mb-8">
          <p className="font-montserrat font-semibold text-mvl-espresso mb-3">
            Sample Savings on a $175,000 Condo
          </p>
          <div className="rounded overflow-hidden">
            <div className="grid grid-cols-3 bg-mvl-espresso text-white text-sm font-montserrat font-semibold">
              <div className="p-3 md:p-4">Scenario</div>
              <div className="p-3 md:p-4">Approx. Annual Tax</div>
              <div className="p-3 md:p-4">Monthly Equivalent</div>
            </div>
            {savingsRows.map((row, i) => (
              <div
                key={row.scenario}
                className={`grid grid-cols-3 text-sm ${
                  row.scenario === "Annual savings"
                    ? "bg-mvl-cream font-semibold text-mvl-coral"
                    : i % 2 === 0
                      ? "bg-white text-mvl-espresso/80"
                      : "bg-mvl-warm-white text-mvl-espresso/80"
                }`}
              >
                <div className={`p-3 md:p-4 ${row.scenario === "Annual savings" ? "text-mvl-espresso font-semibold" : "font-medium text-mvl-espresso"}`}>{row.scenario}</div>
                <div className="p-3 md:p-4">{row.annual}</div>
                <div className="p-3 md:p-4">{row.monthly}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl">
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            <span className="font-semibold text-mvl-espresso">You have to apply — it&#39;s not automatic.</span> File Form 50-114 with the Harris County Appraisal District (HCAD) between January 1 and April 30. You can file online at{" "}
            <a href="https://hcad.org" target="_blank" rel="noopener noreferrer" className="text-mvl-coral hover:underline">hcad.org</a>.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            The 10% appraisal cap is the other benefit most people miss. Once you homestead a property, its taxable value can&#39;t increase more than 10% per year — regardless of how fast the market moves. In a neighborhood like Montrose where values have appreciated significantly over the past decade, this cap protects you from runaway tax bills.
          </p>

          <p className="text-xs text-mvl-espresso/50 mt-4">
            Tax rates and exemption amounts are subject to change. The $140,000 school exemption reflects Proposition 13 (November 2025). Verify current rates at{" "}
            <a href="https://hcad.org" target="_blank" rel="noopener noreferrer" className="text-mvl-coral hover:underline">hcad.org</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
