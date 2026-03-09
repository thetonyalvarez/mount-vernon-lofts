import { metroRailLines } from "@/app/config/neighborhood-transit-data"

export function METRORailSection() {
  return (
    <section className="py-20 bg-mvl-warm-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-2 text-center uppercase tracking-wide">
          METRORail
        </h2>
        <p className="text-mvl-espresso/70 text-center mb-12 max-w-2xl mx-auto">
          Houston&apos;s light rail system connects Montrose to Downtown,
          Medical Center, NRG Park, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metroRailLines.map((line) => (
            <div
              key={line.name}
              className="bg-white border border-mvl-beige rounded-md overflow-hidden hover:shadow-md transition-shadow"
            >
              <div
                className="h-2"
                style={{ backgroundColor: line.color }}
              />
              <div className="p-6">
                <h3 className="font-montserrat text-xl text-mvl-espresso font-semibold mb-3">
                  {line.name}
                </h3>
                <p className="text-mvl-espresso/80 leading-relaxed mb-4 text-sm">
                  {line.description}
                </p>
                <div className="space-y-1 text-sm text-mvl-espresso/70">
                  <div>
                    <span className="font-medium text-mvl-espresso">
                      Nearest Station:
                    </span>{" "}
                    {line.nearestStation}
                  </div>
                  <div>
                    <span className="font-medium text-mvl-espresso">
                      Distance:
                    </span>{" "}
                    {line.distance}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
