const programs = [
  {
    name: "City of Houston HAP",
    assistance: "Up to $50,000",
    type: "No-interest forgivable loan (5 years)",
    requirement: "Household income \u226480% AMI",
    who: "First-time buyers in Houston city limits",
  },
  {
    name: "TSAHC Home Sweet Texas",
    assistance: "Up to 5% of loan amount",
    type: "Grant (no repayment) OR forgivable second lien (3 years)",
    requirement: "Income varies by county; 620+ credit score",
    who: "All Texas buyers (not just first-time)",
  },
  {
    name: "TSAHC Texas Heroes",
    assistance: "Up to 5% of loan amount",
    type: "Grant OR forgivable second lien (3 years)",
    requirement: "Must be eligible public servant",
    who: "Teachers, first responders, veterans, etc.",
  },
  {
    name: "Harris County DPA",
    assistance: "Varies",
    type: "Down payment assistance",
    requirement: "Household income limits apply",
    who: "Buyers in Harris County",
  },
]

export function BuyerDPASection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-6">
            Houston Down Payment Assistance Programs
          </h2>

          <p className="text-mvl-espresso/80 leading-relaxed mb-8">
            Most first-time buyers in Houston don&#39;t know these programs exist. If you qualify, they can significantly reduce the cash you need to close — in some cases by tens of thousands of dollars.
          </p>
        </div>

        {/* Program Overview Table */}
        <div className="max-w-4xl mb-10">
          <div className="rounded overflow-hidden">
            <div className="grid grid-cols-5 bg-mvl-espresso text-white text-xs md:text-sm font-montserrat font-semibold">
              <div className="p-2 md:p-4">Program</div>
              <div className="p-2 md:p-4">Assistance</div>
              <div className="p-2 md:p-4">Type</div>
              <div className="p-2 md:p-4">Key Requirement</div>
              <div className="p-2 md:p-4">Who Qualifies</div>
            </div>
            {programs.map((p, i) => (
              <div
                key={p.name}
                className={`grid grid-cols-5 text-xs md:text-sm ${
                  i % 2 === 0
                    ? "bg-white text-mvl-espresso/80"
                    : "bg-mvl-warm-white text-mvl-espresso/80"
                }`}
              >
                <div className="p-2 md:p-4 font-medium text-mvl-espresso">{p.name}</div>
                <div className="p-2 md:p-4">{p.assistance}</div>
                <div className="p-2 md:p-4">{p.type}</div>
                <div className="p-2 md:p-4">{p.requirement}</div>
                <div className="p-2 md:p-4">{p.who}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Program Descriptions */}
        <div className="max-w-3xl">
          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            City of Houston Homebuyer Assistance Program (HAP)
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-3">
            The biggest program most Houstonians don&#39;t know about. The City of Houston offers up to $50,000 in down payment and closing cost assistance through a no-interest, forgivable loan. If you live in the home for five years, you owe nothing back. If you sell or move before five years, you repay a prorated portion.
          </p>
          <p className="text-mvl-espresso/80 leading-relaxed mb-3">
            On a $215,000 condo, $50,000 in assistance would cover a 10% down payment ($21,500) plus most closing costs — potentially reducing the cash you need to close to under $10,000.
          </p>
          <p className="text-mvl-espresso/80 leading-relaxed mb-2 font-medium text-mvl-espresso">Requirements:</p>
          <ul className="space-y-1 text-mvl-espresso/80 mb-3 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Household income at or below 80% of Area Median Income</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Property must be within Houston city limits</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Buyer must contribute minimum $350 toward the transaction</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>No minimum credit score required by the City (lender requirements still apply)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Must complete HUD-approved homebuyer education course</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Front-end ratio: 33%; back-end ratio: 45%</span>
            </li>
          </ul>
          <p className="text-xs text-mvl-espresso/50 mb-6">
            Last verified: March 2026. Contact:{" "}
            <a href="https://houstontx.gov/housing/hap.html" target="_blank" rel="noopener noreferrer" className="text-mvl-coral hover:underline">
              houstontx.gov/housing/hap.html
            </a>
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            TSAHC Home Sweet Texas Home Loan Program
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-3">
            A statewide program that pairs down payment assistance with 30-year fixed-rate mortgages (FHA, VA, USDA, or Conventional). Assistance up to 5% of the loan amount — on a $215,000 purchase, that&#39;s up to $10,750. Two options: a grant with no repayment required, or a forgivable second lien that&#39;s forgiven after three years if you stay in the home.
          </p>
          <p className="text-mvl-espresso/80 leading-relaxed mb-2 font-medium text-mvl-espresso">Requirements:</p>
          <ul className="space-y-1 text-mvl-espresso/80 mb-3 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>620+ credit score</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Income within county-specific limits (typically $90,000–$130,000 depending on county and household size)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Must use a TSAHC-approved lender</span>
            </li>
          </ul>
          <p className="text-xs text-mvl-espresso/50 mb-6">
            Last verified: March 2026. Contact:{" "}
            <a href="https://tsahc.org/homebuyers-renters/home-sweet-texas-home-loan-program" target="_blank" rel="noopener noreferrer" className="text-mvl-coral hover:underline">
              tsahc.org
            </a>
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            TSAHC Texas Heroes Program
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-3">
            Same structure as Home Sweet Texas but with enhanced benefits for public servants: teachers, police officers, firefighters, EMS, corrections officers, veterans, and certain state and county employees.
          </p>
          <p className="text-xs text-mvl-espresso/50 mb-6">
            Last verified: March 2026. Contact:{" "}
            <a href="https://tsahc.org/homebuyers-renters/texas-heroes-home-loan-program" target="_blank" rel="noopener noreferrer" className="text-mvl-coral hover:underline">
              tsahc.org
            </a>
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Harris County Down Payment Assistance
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-3">
            For buyers purchasing in Harris County (which includes Houston). Assistance amounts and terms vary — contact Harris County Housing &amp; Community Development for current availability.
          </p>
          <p className="text-xs text-mvl-espresso/50">
            Last verified: March 2026. Contact:{" "}
            <a href="https://hcd.harriscountytx.gov" target="_blank" rel="noopener noreferrer" className="text-mvl-coral hover:underline">
              hcd.harriscountytx.gov
            </a>
          </p>

          <div className="bg-white rounded p-6 border-l-4 border-mvl-coral mt-8">
            <p className="text-xs text-mvl-espresso/60">
              Program availability, amounts, and requirements are subject to change. Contact each program directly for current eligibility and application information. You may qualify for one or more of these programs — eligibility depends on your income, credit, and the property location.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
