export function OnDemandSection() {
  return (
    <section className="py-20 bg-mvl-warm-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-2 text-center uppercase tracking-wide">
          On-Demand &amp; Microtransit
        </h2>
        <p className="text-mvl-espresso/70 text-center mb-12 max-w-2xl mx-auto">
          METRO offers flexible, on-demand transit options beyond fixed routes.
        </p>

        <div className="space-y-6">
          <div className="bg-white border border-mvl-beige rounded-md p-6">
            <h3 className="font-montserrat text-lg text-mvl-espresso font-semibold mb-3">
              METRO curb2curb
            </h3>
            <p className="text-mvl-espresso/80 leading-relaxed">
              METRO curb2curb is an on-demand shared ride service that operates
              in designated zones across Houston. Instead of fixed routes and
              schedules, you request a ride through the RideMETRO app and a
              METRO vehicle picks you up at your location within the service
              zone. Fares are the same as regular METRO service. Check the
              RideMETRO app for current service zones and availability near
              Montrose.
            </p>
          </div>

          <div className="bg-white border border-mvl-beige rounded-md p-6">
            <h3 className="font-montserrat text-lg text-mvl-espresso font-semibold mb-3">
              Community Connector
            </h3>
            <p className="text-mvl-espresso/80 leading-relaxed">
              METRO Community Connector routes provide transit service to areas
              not well served by fixed-route buses. These smaller vehicles
              operate on flexible schedules and routes, often connecting
              residential areas to major transit hubs, grocery stores, and
              medical facilities. While primarily serving outer neighborhoods,
              Community Connector routes can link to the broader METRO network
              for trips originating from Montrose.
            </p>
          </div>

          <p className="text-mvl-espresso/60 text-sm text-center">
            On-demand services and zones are subject to change. Visit{" "}
            <a
              href="https://www.ridemetro.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mvl-coral hover:text-mvl-coral-dark transition-colors"
            >
              ridemetro.org
            </a>{" "}
            for current availability.
          </p>
        </div>
      </div>
    </section>
  )
}
