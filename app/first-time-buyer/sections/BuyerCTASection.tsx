import Link from 'next/link'

export function BuyerCTASection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-4">
          Ready to Take the First Step?
        </h2>
        <p className="text-mvl-espresso/70 mb-8 max-w-2xl mx-auto">
          Mount Vernon Lofts offers studios and one-bedrooms in Montrose starting in the $175Ks — built for first-time buyers who want to own in one of Houston&#39;s most walkable neighborhoods.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <Link
            href="/residences"
            className="inline-block bg-mvl-coral text-white font-montserrat font-semibold px-8 py-3 rounded hover:bg-mvl-coral-dark transition-colors duration-200"
          >
            View Available Residences
          </Link>
          <Link
            href="/#contact"
            className="inline-block border-2 border-mvl-espresso text-mvl-espresso font-montserrat font-semibold px-8 py-3 rounded hover:bg-mvl-espresso hover:text-white transition-colors duration-200"
          >
            Schedule a Tour
          </Link>
        </div>
        <p className="text-mvl-espresso/80 font-montserrat font-semibold mb-2">
          713.986.9929
        </p>
        <p className="text-sm text-mvl-espresso/60 max-w-lg mx-auto">
          Not sure where to start? Call or text us. We&#39;ll connect you with an experienced condo lender and walk you through your options — no pressure, no commitment.
        </p>
      </div>
    </section>
  )
}
