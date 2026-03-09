import {
  fareInfo,
  paymentMethods,
} from "@/app/config/neighborhood-transit-data"

export function FaresSection() {
  return (
    <section className="py-20 bg-mvl-warm-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-2 text-center uppercase tracking-wide">
          Fares &amp; Payment
        </h2>
        <p className="text-mvl-espresso/70 text-center mb-12 max-w-2xl mx-auto">
          METRO fares are straightforward. Most local trips cost $1.25.
        </p>

        {/* Fare table */}
        <div className="bg-white border border-mvl-beige rounded-md overflow-hidden mb-8">
          {/* Desktop */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-mvl-beige">
                  <th className="text-left py-3 px-6 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                    Service
                  </th>
                  <th className="text-left py-3 px-6 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                    Fare
                  </th>
                  <th className="text-left py-3 px-6 font-montserrat text-sm font-semibold text-mvl-espresso uppercase tracking-wide">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {fareInfo.map((fare) => (
                  <tr
                    key={fare.type}
                    className="border-b border-mvl-beige/50 hover:bg-mvl-warm-white transition-colors"
                  >
                    <td className="py-3 px-6 font-medium text-mvl-espresso text-sm">
                      {fare.type}
                    </td>
                    <td className="py-3 px-6 text-mvl-coral font-semibold text-sm">
                      {fare.price}
                    </td>
                    <td className="py-3 px-6 text-mvl-espresso/70 text-sm">
                      {fare.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="md:hidden p-4 space-y-4">
            {fareInfo.map((fare) => (
              <div
                key={fare.type}
                className="border-b border-mvl-beige/50 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-medium text-mvl-espresso text-sm">
                    {fare.type}
                  </span>
                  <span className="text-mvl-coral font-semibold text-sm">
                    {fare.price}
                  </span>
                </div>
                <p className="text-mvl-espresso/60 text-xs">{fare.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className="bg-white border border-mvl-beige rounded-md p-6">
          <h3 className="font-montserrat text-base text-mvl-espresso font-semibold mb-4">
            How to Pay
          </h3>
          <ul className="space-y-2">
            {paymentMethods.map((method) => (
              <li
                key={method}
                className="flex items-start text-sm text-mvl-espresso/80"
              >
                <span className="text-mvl-coral mr-2 mt-0.5">&#x2022;</span>
                {method}
              </li>
            ))}
          </ul>
          <p className="text-mvl-espresso/70 text-sm mt-4">
            For regular riders, download the{" "}
            <a
              href="https://www.ridemetro.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mvl-coral hover:text-mvl-coral/80 transition-colors"
            >
              RideMETRO app
            </a>{" "}
            — it handles fares, trip planning, real-time tracking, and
            curb2curb bookings in one place.
          </p>
        </div>
      </div>
    </section>
  )
}
