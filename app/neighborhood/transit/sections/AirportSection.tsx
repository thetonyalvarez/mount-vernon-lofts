export function AirportSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-2 text-center uppercase tracking-wide">
          Airport Connections
        </h2>
        <p className="text-mvl-espresso/70 text-center mb-12 max-w-2xl mx-auto">
          Getting to Bush Intercontinental (IAH) and Hobby Airport (HOU) from
          Montrose.
        </p>

        <div className="bg-white border border-mvl-beige rounded-md overflow-hidden mb-8">
          <div className="bg-mvl-coral/10 px-6 py-4">
            <h3 className="font-montserrat text-lg text-mvl-espresso font-semibold">
              Route 500 Downtown Direct
            </h3>
            <p className="text-mvl-espresso/70 text-sm">
              Houston&apos;s dual-airport transit connection — launched 2025,
              expanded to Hobby in February 2026.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-mvl-beige">
                  <th className="text-left py-3 px-6 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                    Detail
                  </th>
                  <th className="text-left py-3 px-6 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                    IAH (Bush Intercontinental)
                  </th>
                  <th className="text-left py-3 px-6 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                    HOU (Hobby Airport)
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-mvl-espresso/80">
                <tr className="border-b border-mvl-beige/50">
                  <td className="py-3 px-6 font-medium text-mvl-espresso">
                    Pickup
                  </td>
                  <td className="py-3 px-6">
                    Terminal C, Baggage Claim Level, West Curb, door C-104
                  </td>
                  <td className="py-3 px-6">
                    Level 1, Baggage Claim exit, Curb Zone 3
                  </td>
                </tr>
                <tr className="border-b border-mvl-beige/50">
                  <td className="py-3 px-6 font-medium text-mvl-espresso">
                    Downtown Stops
                  </td>
                  <td className="py-3 px-6" colSpan={2}>
                    George R. Brown Convention Center, Downtown Transit Center,
                    Discovery Green, Shell Energy Stadium
                  </td>
                </tr>
                <tr className="border-b border-mvl-beige/50">
                  <td className="py-3 px-6 font-medium text-mvl-espresso">
                    Frequency
                  </td>
                  <td className="py-3 px-6" colSpan={2}>
                    Every 30 minutes
                  </td>
                </tr>
                <tr className="border-b border-mvl-beige/50">
                  <td className="py-3 px-6 font-medium text-mvl-espresso">
                    Hours
                  </td>
                  <td className="py-3 px-6" colSpan={2}>
                    Daily, ~5:00am &ndash; 8:00pm
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 font-medium text-mvl-espresso">
                    Fare
                  </td>
                  <td className="py-3 px-6" colSpan={2}>
                    $4.50 one-way
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden p-6 space-y-4">
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-mvl-espresso block">
                  IAH Pickup:
                </span>
                <span className="text-mvl-espresso/70">
                  Terminal C, Baggage Claim Level, West Curb, door C-104
                </span>
              </div>
              <div>
                <span className="font-medium text-mvl-espresso block">
                  HOU Pickup:
                </span>
                <span className="text-mvl-espresso/70">
                  Level 1, Baggage Claim exit, Curb Zone 3
                </span>
              </div>
              <div>
                <span className="font-medium text-mvl-espresso block">
                  Frequency:
                </span>
                <span className="text-mvl-espresso/70">Every 30 minutes</span>
              </div>
              <div>
                <span className="font-medium text-mvl-espresso block">
                  Hours:
                </span>
                <span className="text-mvl-espresso/70">
                  Daily, ~5:00am &ndash; 8:00pm
                </span>
              </div>
              <div>
                <span className="font-medium text-mvl-espresso block">
                  Fare:
                </span>
                <span className="text-mvl-espresso/70">$4.50 one-way</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-mvl-warm-white border border-mvl-beige rounded-md p-6">
          <h3 className="font-montserrat text-base text-mvl-espresso font-semibold mb-3">
            From MVL to Either Airport by Transit
          </h3>
          <p className="text-mvl-espresso/80 text-sm leading-relaxed mb-4">
            Walk or bus to the Museum District METRORail station, take the Red
            Line to Downtown (~10 min), then transfer to Route 500. Total
            transit fare: approximately $5.75. Total time: approximately 60-90
            minutes depending on wait times.
          </p>
          <h3 className="font-montserrat text-base text-mvl-espresso font-semibold mb-3">
            Rideshare Alternative
          </h3>
          <p className="text-mvl-espresso/80 text-sm leading-relaxed">
            Uber/Lyft from Montrose to IAH: ~$30-50 (35-45 min). To Hobby:
            ~$20-35 (20-30 min). Faster but more expensive.
          </p>
          <p className="text-mvl-espresso/50 text-xs mt-3">
            Rideshare estimates based on typical non-surge pricing. Actual fares
            vary by time, demand, and route.
          </p>
        </div>
      </div>
    </section>
  )
}
