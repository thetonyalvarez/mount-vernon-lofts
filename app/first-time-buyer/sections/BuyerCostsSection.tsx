const costRows = [
  { component: "Down payment (Non-QM, 10%)", amount: "$21,500", notes: "Minimum for Non-QM financing on a condo not yet warrantable" },
  { component: "Down payment (FHA, 3.5%)", amount: "$7,525", notes: "Available once building reaches warrantability threshold" },
  { component: "Down payment (Conventional, 5%)", amount: "$10,750", notes: "Available once building reaches warrantability threshold" },
  { component: "Closing costs (estimated 2–4%)", amount: "$4,300–$8,600", notes: "Title, appraisal, lender fees, insurance, escrow funding" },
  { component: "Reserves (2 months PITI)", amount: "~$3,700", notes: "Most lenders require 2 months of payment reserves in savings" },
  { component: "Move-in costs", amount: "$500–$2,000", notes: "Moving, deposits, initial supplies" },
]

const totalRows = [
  { scenario: "Total needed (Non-QM scenario)", amount: "~$30,000–$35,800", note: "Before any down payment assistance" },
  { scenario: "Total needed (FHA scenario)", amount: "~$16,025–$21,825", note: "When available — after warrantability" },
]

export function BuyerCostsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-6">
            How Much Do I Need to Buy a Condo in Houston?
          </h2>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            The most common mistake first-time buyers make is assuming the down payment is the only upfront cost. Closing costs alone can add $4,000–$8,000. Lender-required reserves mean you need additional savings beyond what you bring to the table.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-8">
            Here&#39;s a realistic breakdown based on a $175,000 condo:
          </p>
        </div>

        {/* Cost Breakdown Table */}
        <div className="max-w-4xl">
          <div className="rounded overflow-hidden">
            <div className="grid grid-cols-3 bg-mvl-espresso text-white text-sm font-montserrat font-semibold">
              <div className="p-3 md:p-4">Cost Component</div>
              <div className="p-3 md:p-4">Amount</div>
              <div className="p-3 md:p-4">Notes</div>
            </div>
            {costRows.map((row, i) => (
              <div
                key={row.component}
                className={`grid grid-cols-3 text-sm ${
                  i % 2 === 0
                    ? "bg-white text-mvl-espresso/80"
                    : "bg-mvl-warm-white text-mvl-espresso/80"
                }`}
              >
                <div className="p-3 md:p-4 font-medium text-mvl-espresso">{row.component}</div>
                <div className="p-3 md:p-4">{row.amount}</div>
                <div className="p-3 md:p-4">{row.notes}</div>
              </div>
            ))}
            {/* Total rows */}
            {totalRows.map((row) => (
              <div
                key={row.scenario}
                className="grid grid-cols-3 text-sm bg-mvl-cream font-semibold text-mvl-espresso"
              >
                <div className="p-3 md:p-4">{row.scenario}</div>
                <div className="p-3 md:p-4">{row.amount}</div>
                <div className="p-3 md:p-4">{row.note}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mt-8">
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            These numbers assume no down payment assistance. Houston buyers may qualify for programs that significantly reduce the cash needed to close. See the next section for programs that can cover part or all of your down payment.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            A common misconception: you need 20% down. Most first-time buyers do not put 20% down. The national average for first-time buyers is 6–8%. The 20% figure avoids private mortgage insurance (PMI), but PMI on a $175K condo adds roughly $50–$100 per month — often worth paying to get into the market sooner rather than spending years saving for a larger down payment while rents continue to rise.
          </p>

          <p className="text-xs text-mvl-espresso/50 mt-4">
            Amounts are approximate. Your actual costs depend on lender, loan type, and specific circumstances. The FHA and conventional scenarios are only available once the building reaches warrantability. Consult a licensed mortgage professional for guidance specific to your situation.
          </p>
        </div>
      </div>
    </section>
  )
}
