const checklistItems = [
  {
    heading: "Year Built and Construction Type",
    body: "Older condo conversions (pre-2000) may have outdated plumbing, electrical, and insulation. Buildings constructed after 2015 generally have modern systems, concrete foundations, and better energy efficiency. Ask when the building was built — and whether it was purpose-built as condos or converted from apartments. Purpose-built condos typically have better soundproofing, more thoughtful layouts, and infrastructure designed for individual ownership rather than rental turnover.",
  },
  {
    heading: "HOA Financial Health",
    body: "Request the HOA's reserve study and financial statements before making an offer. Healthy reserves are at least 10% of the annual budget (the Fannie Mae minimum for conventional financing). Low reserves often mean special assessments down the road — unexpected bills that can run thousands of dollars per unit. Look for professional management, a track record of consistent maintenance, and monthly dues that include utilities like water to keep your total costs predictable.",
  },
  {
    heading: "Parking Situation",
    body: "Houston's climate makes covered parking valuable — direct sun and heavy rain take a toll on vehicles. Some Montrose condos offer one covered space per unit, while others have uncovered lots or street parking only. Confirm what's included in the purchase price and whether guest parking is available. Street parking in Montrose can be limited, especially near restaurants and commercial corridors, so dedicated parking is a meaningful quality-of-life factor.",
  },
  {
    heading: "Unit Size and Layout",
    body: "Montrose condos range from compact studios around 500 square feet to larger two-bedrooms over 1,000 square feet. Consider how the layout works for your lifestyle — open floor plans feel larger, natural light matters, and in-unit washer/dryer is a significant quality-of-life upgrade over shared laundry. Pay attention to ceiling height, window size, and storage space. A well-designed 700-square-foot condo can feel more livable than a poorly laid out 900-square-foot unit.",
  },
  {
    heading: "Pet Policies and Rental Caps",
    body: "If you have pets, check breed and size restrictions before making an offer — policies vary widely between buildings. Some charge monthly pet rent, others require a one-time registration fee. Also check the building's rental cap — a high percentage of renters can affect financing options and community feel. Fannie Mae typically requires at least 50% owner-occupancy for conventional loans. Buildings with strong owner-occupancy ratios tend to be better maintained and have more stable HOA finances.",
  },
  {
    heading: "Short-Term Rental Rules",
    body: "Some Montrose condo buildings allow short-term rentals (Airbnb, VRBO) while others prohibit them entirely. If you value a quieter, owner-focused community, look for buildings with STR restrictions in their HOA declarations. This also affects resale value and lender requirements.",
  },
]

export function GuideChecklistSection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-2">
          What to Look for When Buying a Montrose Condo
        </h2>
        <p className="text-mvl-espresso/70 mb-10">
          Not all condos are created equal. Here&#39;s what experienced buyers check before making an offer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {checklistItems.map((item) => (
            <div
              key={item.heading}
              className="bg-white rounded p-6 md:p-8"
            >
              <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3">
                {item.heading}
              </h3>
              <p className="text-mvl-espresso/75 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
