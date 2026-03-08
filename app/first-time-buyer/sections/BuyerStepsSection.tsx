import Link from 'next/link'

export function BuyerStepsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-6">
            Step-by-Step: How to Buy a Condo
          </h2>

          <p className="text-mvl-espresso/80 leading-relaxed mb-8">
            Buying a condo follows the same general process as buying a house, with a few important differences. Here&#39;s the 10-step walkthrough from financial readiness to picking up your keys.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 1: Check Your Financial Readiness
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Before you talk to a lender, know where you stand. Pull your credit report (free at{" "}
            <a href="https://annualcreditreport.com" target="_blank" rel="noopener noreferrer" className="text-mvl-coral hover:underline">annualcreditreport.com</a>
            ). Check your savings. Calculate your monthly debt payments. Lenders will look at your debt-to-income ratio — most want it below 45%.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 2: Get Pre-Approved (Not Just Pre-Qualified)
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Pre-qualification is an estimate. Pre-approval means a lender has verified your income, credit, and assets and will commit to lending you a specific amount. Sellers and listing agents take pre-approved buyers seriously. Start here — it also tells you exactly what you can afford.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 3: Research Down Payment Assistance
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Before you assume you need 10–20% down, check the programs listed above. Many Houston buyers leave thousands of dollars on the table because they don&#39;t apply. Some programs require a homebuyer education course — complete it early so it doesn&#39;t delay your timeline.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 4: Find a Real Estate Agent Who Knows Condos
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Condos are different from houses. Your agent should understand HOA financials, reserve funds, warrantability requirements, and condo-specific disclosure documents. Not every agent does. Ask specifically: &quot;How many condo transactions have you closed in the last 12 months?&quot;
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 5: Search and Tour Properties
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            With your budget defined and agent in place, start touring. For condos, pay attention to things house-hunters often skip: common area condition, parking situation, noise between units, building management responsiveness, and HOA rules. Visit at different times of day if possible.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 6: Make an Offer
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Your agent will help you structure a competitive offer. For condos, the offer should include contingencies for financing, inspection, and review of HOA documents (resale certificate, budget, reserve study, rules and regulations, meeting minutes). The HOA document review is unique to condos and critical — don&#39;t skip it.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 7: Complete the Option Period and Inspections
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            In Texas, the option period (typically 5–10 days) gives you an unrestricted right to terminate the contract. Use this time for a professional inspection. For condos, also review the HOA documents you requested. Red flags include low reserves, pending litigation, large special assessments, or high investor concentration.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 8: Secure Financing and Appraisal
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Your lender orders an appraisal and finalizes underwriting. For condos, the lender also evaluates the building itself — the &quot;project review.&quot; This is where warrantability matters. If the building doesn&#39;t meet Fannie Mae requirements, you may need Non-QM financing instead of conventional. See our <Link href="/montrose-condo-guide" className="text-mvl-coral hover:underline">Montrose Condo Guide</Link> for more on what lenders look for in a building.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 9: Final Walkthrough
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Walk the unit one last time before closing. Check that everything is in the condition promised. Turn on faucets, test appliances, check HVAC. For condos in a building with common areas, walk those too — make sure what you saw during tours matches what&#39;s there at closing.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            Step 10: Close and Get Your Keys
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Closing typically takes 30–60 minutes. You&#39;ll sign a stack of documents, wire your funds, and receive your keys. In Texas, the title company handles closing (not an attorney, unlike some states). Budget for title insurance, recording fees, and any remaining closing costs not covered by assistance programs.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed">
            After closing: file your homestead exemption with HCAD immediately. Don&#39;t wait — you can lose a full year of tax savings if you miss the April 30 deadline.
          </p>
        </div>
      </div>
    </section>
  )
}
