interface SubpageDisclaimersProps {
  readonly disclaimers: readonly string[]
  readonly lastUpdated: string
}

export function SubpageDisclaimers({ disclaimers, lastUpdated }: SubpageDisclaimersProps) {
  return (
    <section className="py-12 bg-mvl-warm-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="space-y-2 text-mvl-espresso/50 text-xs leading-relaxed">
          {disclaimers.map((disclaimer) => (
            <p key={disclaimer}>{disclaimer}</p>
          ))}
          <p>
            Last updated: {lastUpdated}. Know of a correction or new addition?{" "}
            <a
              href="mailto:info@mtvernonlofts.com"
              className="text-mvl-coral hover:text-mvl-coral-dark transition-colors"
            >
              Contact us
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  )
}
