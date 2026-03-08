const rows = [
  {
    category: "Monthly Payment",
    renting: "$1,500+/month — gone forever",
    owning: "Comparable monthly cost — builds equity",
  },
  {
    category: "Equity Built",
    renting: "$0 — your landlord keeps it",
    owning: "Every payment builds your net worth",
  },
  {
    category: "Tax Deductions",
    renting: "None",
    owning: "Mortgage interest and property tax deductions",
  },
  {
    category: "Freedom to Customize",
    renting: "Limited — landlord approval required",
    owning: "It's yours — paint, renovate, make it home",
  },
  {
    category: "Pet Policy",
    renting: "Varies — often $200+/month pet rent",
    owning: "Pet-friendly — $75 one-time registration fee",
  },
  {
    category: "Long-Term Cost",
    renting: "Rent increases every year",
    owning: "Fixed mortgage payment — predictable costs",
  },
]

export function WhyMvlComparisonSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-2">
          Rent vs. Own in Montrose
        </h2>
        <p className="text-mvl-espresso/70 mb-10">
          See how owning at Mount Vernon Lofts compares to renting
        </p>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left py-4 px-6 font-montserrat font-semibold text-mvl-espresso border-b-2 border-mvl-beige">
                  &nbsp;
                </th>
                <th className="text-left py-4 px-6 font-montserrat font-semibold text-mvl-espresso/60 border-b-2 border-mvl-beige">
                  Renting in Montrose
                </th>
                <th className="text-left py-4 px-6 font-montserrat font-semibold text-mvl-coral border-b-2 border-mvl-coral">
                  Owning at MVL
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.category} className="border-b border-mvl-beige/50">
                  <td className="py-4 px-6 font-montserrat font-medium text-mvl-espresso">
                    {row.category}
                  </td>
                  <td className="py-4 px-6 text-mvl-espresso/60">
                    {row.renting}
                  </td>
                  <td className="py-4 px-6 text-mvl-espresso">
                    {row.owning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row) => (
            <div key={row.category} className="bg-mvl-cream rounded p-4">
              <p className="font-montserrat font-medium text-mvl-espresso mb-3">
                {row.category}
              </p>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-mvl-espresso/50 uppercase tracking-wide mb-0.5">Renting</p>
                  <p className="text-sm text-mvl-espresso/60">{row.renting}</p>
                </div>
                <div>
                  <p className="text-xs text-mvl-coral uppercase tracking-wide mb-0.5">Owning at MVL</p>
                  <p className="text-sm text-mvl-espresso">{row.owning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
