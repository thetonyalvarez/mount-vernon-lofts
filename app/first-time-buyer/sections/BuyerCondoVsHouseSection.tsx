const comparisonRows = [
  { factor: "Median price in Montrose", condo: "Starting in the $175Ks (studios)", house: "$701,000 (neighborhood median)" },
  { factor: "Maintenance", condo: "HOA handles exterior, roof, common areas, landscaping", house: "Owner handles everything" },
  { factor: "Monthly costs beyond mortgage", condo: "HOA ($200–$500 typical)", house: "Self-funded maintenance reserve ($200–$400/month recommended)" },
  { factor: "Insurance", condo: "HO6 — unit interior only (~$40–$80/month)", house: "Full HO1/HO3 (~$200–$400/month in Houston)" },
  { factor: "Location", condo: "Inner-loop, walkable neighborhoods", house: "Usually further out for comparable price" },
  { factor: "Outdoor space", condo: "Shared amenities, possible balcony", house: "Private yard" },
  { factor: "Monthly flexibility", condo: "Less — HOA rules apply", house: "More — owner decides" },
]

export function BuyerCondoVsHouseSection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-6">
            Condo vs. House — What First-Time Buyers Should Know
          </h2>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Most first-time buyer guides assume you want a house. But Houston buyers considering condos have different priorities — usually location over space, walkability over yards, and lower maintenance over full control. If that sounds like you, a condo may be the smarter entry point.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-8">
            The $701,000 median home price in Montrose isn&#39;t a typo. That&#39;s what single-family homes cost in this neighborhood. For a first-time buyer making $60K–$80K, a detached home in Montrose is out of reach. A condo starting in the $175Ks is not.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl">
          <div className="rounded overflow-hidden">
            <div className="grid grid-cols-3 bg-mvl-espresso text-white text-sm font-montserrat font-semibold">
              <div className="p-3 md:p-4">Factor</div>
              <div className="p-3 md:p-4">Condo</div>
              <div className="p-3 md:p-4">Single-Family Home</div>
            </div>
            {comparisonRows.map((row, i) => (
              <div
                key={row.factor}
                className={`grid grid-cols-3 text-sm ${
                  i % 2 === 0
                    ? "bg-white text-mvl-espresso/80"
                    : "bg-mvl-warm-white text-mvl-espresso/80"
                }`}
              >
                <div className="p-3 md:p-4 font-medium text-mvl-espresso">{row.factor}</div>
                <div className="p-3 md:p-4">{row.condo}</div>
                <div className="p-3 md:p-4">{row.house}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mt-8">
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            The trade-off is real: you&#39;re buying into a shared building with HOA rules, shared walls, and less private space. But in return, you get a location that would cost three times more in a house — and you don&#39;t have to worry about mowing, roofing, or exterior maintenance.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            For first-time buyers specifically, the lower maintenance burden is often undervalued. Home maintenance on a single-family property averages 1–2% of the home value per year. On a $701K house, that&#39;s $7,000–$14,000 annually that you need to budget for yourself. In a condo, your HOA covers the major shared systems — roof, exterior walls, common areas, landscaping, and building insurance.
          </p>

          <p className="text-mvl-espresso/80 leading-relaxed">
            Appreciation depends on building quality, location, HOA management, and market conditions — not simply whether you bought a condo or a house. A well-managed condo in a walkable inner-loop neighborhood can hold its value as well as or better than a house in a less desirable location.
          </p>
        </div>
      </div>
    </section>
  )
}
