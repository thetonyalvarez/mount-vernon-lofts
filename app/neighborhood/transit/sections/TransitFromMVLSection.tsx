import { transitData } from "@/app/config/neighborhood-transit-data"

export function TransitFromMVLSection() {
  const routes = transitData.transitRoutes

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-2 text-center uppercase tracking-wide">
          Transit From Mount Vernon Lofts
        </h2>
        <p className="text-mvl-espresso/70 text-center mb-12 max-w-2xl mx-auto">
          Public transit options from 4509 Mount Vernon St, Houston, TX 77006
        </p>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-mvl-beige">
                <th className="text-left py-3 px-4 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                  Transit Option
                </th>
                <th className="text-left py-3 px-4 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                  Nearest Stop
                </th>
                <th className="text-left py-3 px-4 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                  Distance
                </th>
                <th className="text-left py-3 px-4 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                  Walk Time
                </th>
                <th className="text-left py-3 px-4 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr
                  key={route.name}
                  className="border-b border-mvl-beige hover:bg-mvl-warm-white transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="font-montserrat font-semibold text-mvl-espresso">
                      {route.name}
                    </span>
                    {route.frequency && (
                      <span className="block text-xs text-mvl-coral mt-1">
                        {route.frequency}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-mvl-espresso/80">
                    {route.nearestStop}
                  </td>
                  <td className="py-4 px-4 text-sm text-mvl-espresso/80">
                    {route.distance}
                  </td>
                  <td className="py-4 px-4 text-sm text-mvl-espresso/80">
                    {route.walkTime}
                  </td>
                  <td className="py-4 px-4 text-sm text-mvl-espresso/70 leading-relaxed max-w-md">
                    {route.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {routes.map((route) => (
            <div
              key={route.name}
              className="bg-white border border-mvl-beige rounded-md p-5"
            >
              <h3 className="font-montserrat text-lg text-mvl-espresso font-semibold mb-1">
                {route.name}
              </h3>
              {route.frequency && (
                <span className="inline-block px-2 py-0.5 bg-mvl-coral/10 text-mvl-coral text-xs font-medium rounded mb-3">
                  {route.frequency}
                </span>
              )}
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-mvl-espresso/70 mb-3">
                <div>
                  <span className="font-medium text-mvl-espresso">
                    Nearest Stop:
                  </span>{" "}
                  {route.nearestStop}
                </div>
                <div>
                  <span className="font-medium text-mvl-espresso">
                    Distance:
                  </span>{" "}
                  {route.distance}
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
