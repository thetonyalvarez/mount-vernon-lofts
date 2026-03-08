export function GuideMarketSection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-6">
          Montrose Condo Prices and Market Trends
        </h2>

        <div className="max-w-3xl">
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Montrose condo prices span a wide range depending on age, size, finishes, and building type. Entry-level condos — typically studios or smaller one-bedrooms in well-maintained buildings — start in the low $200Ks. Mid-range units with updated finishes and covered parking generally fall between $250K and $400K. Larger or fully renovated condos in newer buildings can reach $500K to $700K or higher.
          </p>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Several factors drive condo pricing in Montrose. Year built matters significantly — buildings constructed after 2015 tend to have modern systems, better insulation, and fewer deferred maintenance issues. Covered parking adds value in Houston&#39;s climate. Unit size, floor level, and interior finishes also affect price, as does the financial health of the HOA.
          </p>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Building type also matters. Purpose-built condos — designed and constructed as owner-occupied units from the start — tend to hold value better than apartment-to-condo conversions. Purpose-built buildings typically have higher construction standards, better sound insulation between units, and HOA structures designed for long-term ownership rather than rental management.
          </p>
          <p className="text-mvl-espresso/80 leading-relaxed mb-4">
            Compared to nearby neighborhoods, Montrose offers a strong value proposition. Museum District condos often start higher due to proximity to Hermann Park and Rice University. River Oaks condos carry a significant premium. Midtown offers competitive pricing but with less neighborhood character and walkability. The Heights has seen rapid price appreciation that has pushed many condos above $400K. For buyers who want inner loop living at an attainable price point with genuine neighborhood character, Montrose consistently delivers.
          </p>
          <p className="text-mvl-espresso/80 leading-relaxed mb-6">
            One factor worth considering: Montrose has limited room for new condo development. The neighborhood is largely built out, with remaining lots often going to townhomes or single-family builds that sell for $600K and up. That supply constraint, combined with steady demand from young professionals and Medical Center workers, supports long-term value for existing condo buildings — especially those with modern construction and healthy HOAs.
          </p>
        </div>

        {/* Callout box */}
        <div className="bg-white rounded p-6 md:p-8 max-w-3xl border-l-4 border-mvl-coral">
          <p className="font-montserrat font-semibold text-mvl-espresso mb-2">
            Montrose Condo Market at a Glance
          </p>
          <ul className="space-y-2 text-mvl-espresso/80">
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Entry-level condos: Starting in the low $200Ks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Mid-range condos: $250K–$400K</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Median single-family home in Montrose: $700K+</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
              <span>Key pricing factors: Year built, parking, HOA reserves, unit size</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
