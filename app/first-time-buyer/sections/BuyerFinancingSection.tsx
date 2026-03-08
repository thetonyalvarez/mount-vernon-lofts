const financingPaths = [
  { type: "Non-QM", downPayment: "Typically 10%+", buildingReq: "Fewer building restrictions", bestFor: "Buying in buildings not yet warrantable" },
  { type: "Conventional (Fannie/Freddie)", downPayment: "3–20%", buildingReq: "Building must be warrantable", bestFor: "Best rates and terms" },
  { type: "FHA", downPayment: "3.5%", buildingReq: "Building must be FHA-approved", bestFor: "First-time buyers with limited savings" },
]

export function BuyerFinancingSection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-6">
            Condo Financing — What&#39;s Different About Buying in a Building
          </h2>

          <p className="text-mvl-espresso/80 leading-relaxed mb-8">
            The thing that surprises most first-time condo buyers: your lender evaluates the building, not just you. Even if you have a strong credit score and a large down payment, your loan can be declined if the building doesn&#39;t meet the lender&#39;s requirements.
          </p>
        </div>

        {/* Financing Paths Table */}
        <div className="max-w-4xl mb-8">
          <div className="rounded overflow-hidden">
            <div className="grid grid-cols-4 bg-mvl-espresso text-white text-sm font-montserrat font-semibold">
              <div className="p-3 md:p-4">Loan Type</div>
              <div className="p-3 md:p-4">Down Payment</div>
              <div className="p-3 md:p-4">Building Requirement</div>
              <div className="p-3 md:p-4">Best For</div>
            </div>
            {financingPaths.map((path, i) => (
              <div
                key={path.type}
                className={`grid grid-cols-4 text-sm ${
                  i % 2 === 0
                    ? "bg-white text-mvl-espresso/80"
                    : "bg-mvl-warm-white text-mvl-espresso/80"
                }`}
              >
                <div className="p-3 md:p-4 font-medium text-mvl-espresso">{path.type}</div>
                <div className="p-3 md:p-4">{path.downPayment}</div>
                <div className="p-3 md:p-4">{path.buildingReq}</div>
                <div className="p-3 md:p-4">{path.bestFor}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl">
          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            What Makes a Building &quot;Warrantable&quot;
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            For a condo building to qualify for conventional (Fannie Mae/Freddie Mac) financing, it generally needs to meet these criteria:
          </p>
          <ul className="space-y-2 text-mvl-espresso/80 mb-4 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>At least 50% of units are owner-occupied (or sold/under contract)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>HOA reserves are at least 10% of the annual budget</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>No single entity owns more than 10% of the units</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>The building carries adequate insurance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>No active or pending litigation against the HOA</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>No more than 15% of units are 60+ days delinquent on HOA dues</span>
            </li>
          </ul>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            What This Means for Newer Buildings
          </h3>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Newer buildings — especially condo conversions — often aren&#39;t warrantable yet because they haven&#39;t reached the 50% owner-occupied threshold. This doesn&#39;t mean you can&#39;t buy. It means your financing path starts with Non-QM loans, which require a higher down payment (typically 10%) but have less stringent building requirements.
          </p>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            As more units sell, the building works toward warrantability. Once it crosses the threshold, conventional and FHA financing open up — which means more buyers can qualify, which supports property values.
          </p>

          <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3 mt-8">
            What to Ask Your Lender
          </h3>
          <ul className="space-y-2 text-mvl-espresso/80 mb-4 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>&quot;Is this building warrantable?&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>&quot;If not, what Non-QM options do you offer?&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>&quot;What&#39;s my estimated rate and closing costs on each loan type?&quot;</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>&quot;How long until this building is likely to qualify for conventional financing?&quot;</span>
            </li>
          </ul>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Lenders experienced with Houston condo transactions can guide you through the specifics. If you&#39;d like a recommendation, contact us — we work with lenders who specialize in condo financing.
          </p>

          <p className="text-xs text-mvl-espresso/50">
            This is general information about condo financing, not financial advice. Rates vary by lender, credit score, and loan type. Consult a licensed mortgage professional for guidance specific to your situation.
          </p>
        </div>
      </div>
    </section>
  )
}
