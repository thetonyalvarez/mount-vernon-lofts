import Link from 'next/link'

export function GuideCTASection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-4">
          Ready to Explore Montrose Condos?
        </h2>
        <p className="text-mvl-espresso/70 mb-8">
          Schedule a tour of Mount Vernon Lofts and see what ownership in Montrose looks like.
        </p>
        <Link
          href="/#contact"
          className="inline-block bg-mvl-coral text-white font-montserrat font-semibold px-8 py-3 rounded hover:bg-mvl-coral-dark transition-colors duration-200"
        >
          Schedule a Tour
        </Link>
      </div>
    </section>
  )
}
