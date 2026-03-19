import Link from 'next/link'

const comparisonRows = [
  { label: "Monthly payment", renting: "$1,410 rent", owning: "~$1,292 mortgage" },
  { label: "HOA", renting: "Included in rent", owning: "$300" },
  { label: "Property taxes", renting: "Included in rent", owning: "~$207 (with homestead exemption)" },
  { label: "Insurance", renting: "~$15 (renters)", owning: "~$60 (condo/HO6)" },
  { label: "Monthly total", renting: "~$1,425", owning: "~$1,859" },
]

export function BuyerRentVsBuySection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-6">
            Should I Buy or Keep Renting?
          </h2>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            This is the question most first-time buyers are stuck on — and for good reason. Ownership isn&#39;t automatically better than renting. The right answer depends on your timeline, financial situation, and whether you value long-term wealth building over short-term flexibility.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-8">
            Here&#39;s what a monthly cost comparison actually looks like for a studio in Montrose:
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-3xl">
          <div className="rounded overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-mvl-espresso text-white text-sm font-montserrat font-semibold">
              <div className="p-3 md:p-4">Monthly Cost</div>
              <div className="p-3 md:p-4">Renting in Montrose</div>
              <div className="p-3 md:p-4">Owning a $175K Condo</div>
            </div>
            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 text-sm ${
                  row.label === "Monthly total"
                    ? "bg-mvl-cream font-semibold text-mvl-espresso"
                    : i % 2 === 0
                      ? "bg-white text-mvl-espresso/80"
                      : "bg-mvl-warm-white text-mvl-espresso/80"
                }`}
              >
                <div className="p-3 md:p-4 font-medium text-mvl-espresso">{row.label}</div>
                <div className="p-3 md:p-4">{row.renting}</div>
                <div className="p-3 md:p-4">{row.owning}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mt-8">
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Yes, owning costs approximately $434 more per month in cash outflow. That&#39;s the honest math. But the comparison doesn&#39;t end at the monthly payment. Three things renters usually don&#39;t factor in:
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            <span className="font-semibold text-mvl-espresso">Equity accumulation.</span> Part of every mortgage payment builds ownership. Rent builds zero equity. Over five years at current prices, a condo owner would accumulate approximately $15,000–$20,000 in equity from principal paydown alone — before any appreciation.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            <span className="font-semibold text-mvl-espresso">Rent increases.</span> Houston rents have trended upward. A mortgage payment on a fixed-rate loan stays the same for 30 years. Your HOA can change, and taxes can fluctuate, but the largest component of your payment is locked in.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            <span className="font-semibold text-mvl-espresso">Tax benefits.</span> The homestead exemption, mortgage interest deduction (if you itemize), and the 10% appraisal cap protect you from cost surprises in ways renters don&#39;t have. See our <Link href="#homestead" className="text-mvl-coral hover:underline">homestead exemption section</Link> for how this works on a $175K condo.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Some people genuinely should keep renting — if you&#39;re planning to move within two to three years, if your career situation is uncertain, or if you&#39;re saving for a different goal. Ownership makes the most financial sense when you plan to stay at least three to five years.
          </p>

          <p className="text-xs text-mvl-espresso/50 mt-6">
            Based on estimated rates as of early 2026. Non-QM financing, 10% down, ~6.5% estimated rate. Your actual rate will depend on your credit, lender, and loan type. Rates change frequently. This comparison is illustrative — run the numbers with your lender using your actual financial profile.
          </p>
        </div>
      </div>
    </section>
  )
}
