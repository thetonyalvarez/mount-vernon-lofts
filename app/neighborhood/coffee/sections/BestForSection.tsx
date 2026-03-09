import { coffeeBestFor } from "@/app/config/neighborhood-coffee-data"

export function BestForSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-12 text-center uppercase tracking-wide">
          Best Coffee Shop For...
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coffeeBestFor.map((item) => (
            <div
              key={item.category}
              className="bg-white border border-mvl-beige rounded-md p-6 hover:shadow-md transition-shadow"
            >
              <p className="font-montserrat text-sm text-mvl-espresso/60 uppercase tracking-wider mb-1">
                {item.category}
              </p>
              <p className="font-montserrat text-lg text-mvl-coral font-semibold mb-2">
                {item.venue}
              </p>
              <p className="text-mvl-espresso/80 leading-relaxed">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
