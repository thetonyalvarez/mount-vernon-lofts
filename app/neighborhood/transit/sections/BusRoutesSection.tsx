import { transitData } from "@/app/config/neighborhood-transit-data"

export function BusRoutesSection() {
  // Filter to bus routes only (exclude METRORail)
  const busRoutes = transitData.transitRoutes.filter(
    (route) => !route.name.includes("METRORail")
  )

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-2 text-center uppercase tracking-wide">
          Bus Routes Near Montrose
        </h2>
        <p className="text-mvl-espresso/70 text-center mb-12 max-w-2xl mx-auto">
          Three METRO bus routes serve Mount Vernon Lofts within a short walk,
          connecting you to destinations across Houston.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {busRoutes.map((route) => (
            <div
              key={route.name}
              className="bg-white border border-mvl-beige rounded-md p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-montserrat text-lg text-mvl-espresso font-semibold">
                  {route.name}
                </h3>
                <span className="flex-shrink-0 ml-2 px-2 py-0.5 bg-mvl-coral/10 text-mvl-coral text-xs font-medium rounded">
                  {route.distance}
                </span>
              </div>

              {route.frequency && (
                <p className="text-mvl-coral text-sm font-medium mb-3">
                  {route.frequency}
                </p>
              )}

              <div className="space-y-2 text-sm text-mvl-espresso/70 mb-4">
                <div>
                  <span className="font-medium text-mvl-espresso">
                    Nearest Stop:
                  </span>{" "}
                  {route.nearestStop}
                </div>
                <div>
                  <span className="font-medium text-mvl-espresso">
                    Walk Time:
                  </span>{" "}
                  {route.walkTime}
                </div>
              </div>

              <p className="text-sm text-mvl-espresso/70 leading-relaxed">
                {route.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
