export function RideshareSection() {
  const rideshareEstimates = [
    {
      destination: "Downtown Houston",
      time: "~10 min",
      cost: "$10-15",
    },
    {
      destination: "Texas Medical Center",
      time: "~10 min",
      cost: "$10-15",
    },
    {
      destination: "Galleria",
      time: "~15 min",
      cost: "$12-18",
    },
    {
      destination: "Bush Intercontinental (IAH)",
      time: "~35-45 min",
      cost: "$30-50",
    },
    {
      destination: "Hobby Airport (HOU)",
      time: "~20-30 min",
      cost: "$20-35",
    },
  ] as const

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-2 text-center uppercase tracking-wide">
          Rideshare &amp; Biking
        </h2>
        <p className="text-mvl-espresso/70 text-center mb-12 max-w-2xl mx-auto">
          When transit and walking don&apos;t cover it, rideshare and biking
          fill the gaps.
        </p>

        {/* Rideshare estimates */}
        <div className="mb-10">
          <h3 className="font-montserrat text-lg text-mvl-espresso font-semibold mb-4">
            Rideshare from Montrose
          </h3>
          <div className="bg-white border border-mvl-beige rounded-md overflow-hidden">
            {/* Desktop */}
            <div className="hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-mvl-beige">
                    <th className="text-left py-3 px-6 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                      Destination
                    </th>
                    <th className="text-left py-3 px-6 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                      Est. Time
                    </th>
                    <th className="text-left py-3 px-6 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                      Est. Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rideshareEstimates.map((item) => (
                    <tr
                      key={item.destination}
                      className="border-b border-mvl-beige/50 hover:bg-mvl-warm-white transition-colors"
                    >
                      <td className="py-3 px-6 font-medium text-mvl-espresso text-sm">
                        {item.destination}
                      </td>
                      <td className="py-3 px-6 text-mvl-espresso/80 text-sm">
                        {item.time}
                      </td>
                      <td className="py-3 px-6 text-mvl-coral font-semibold text-sm">
                        {item.cost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="md:hidden p-4 space-y-4">
              {rideshareEstimates.map((item) => (
                <div
                  key={item.destination}
                  className="border-b border-mvl-beige/50 pb-3 last:border-0 last:pb-0"
                >
                  <span className="font-medium text-mvl-espresso text-sm block">
                    {item.destination}
                  </span>
                  <div className="flex gap-4 text-sm mt-1">
                    <span className="text-mvl-espresso/70">{item.time}</span>
                    <span className="text-mvl-coral font-semibold">
                      {item.cost}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-mvl-espresso/50 text-xs mt-3">
            Estimates based on typical non-surge pricing. Actual fares vary by
            time of day, demand, and route.
          </p>
        </div>

        {/* Biking */}
        <div>
          <h3 className="font-montserrat text-lg text-mvl-espresso font-semibold mb-4">
            Biking in Montrose
          </h3>
          <div className="bg-mvl-warm-white border border-mvl-beige rounded-md p-6">
            <p className="text-mvl-espresso/80 text-sm leading-relaxed mb-4">
              Montrose has a Bike Score of 73 (&ldquo;Very Bikeable&rdquo;).
              Key biking infrastructure near MVL:
            </p>
            <ul className="space-y-2 text-sm text-mvl-espresso/80">
              <li className="flex items-start">
                <span className="text-mvl-coral mr-2 mt-0.5">&#x2022;</span>
                <span>
                  <span className="font-medium text-mvl-espresso">
                    Buffalo Bayou Trail
                  </span>{" "}
                  — ~1 mi from MVL. Paved hike-and-bike trail connecting west
                  toward the Energy Corridor and east to Downtown.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-mvl-coral mr-2 mt-0.5">&#x2022;</span>
                <span>
                  <span className="font-medium text-mvl-espresso">
                    Montrose Blvd
                  </span>{" "}
                  — Bike-friendly corridor connecting north-south through the
                  neighborhood.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-mvl-coral mr-2 mt-0.5">&#x2022;</span>
                <span>
                  <span className="font-medium text-mvl-espresso">
                    Dedicated bike lanes
                  </span>{" "}
                  — Limited but growing network. Heights Bike Trail accessible
                  via Buffalo Bayou.
                </span>
              </li>
            </ul>
            <p className="text-mvl-espresso/60 text-xs mt-4">
              Note: Houston does not currently have a public bike share system.
              Biking from MVL requires your own bicycle. Each unit includes one
              dedicated covered parking space.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
