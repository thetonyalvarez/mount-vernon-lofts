const milestones = [
  {
    period: "Month 1",
    items: [
      "File your homestead exemption (Form 50-114 with HCAD) — don\u2019t wait",
      "Set up autopay for mortgage, HOA, and insurance",
      "Introduce yourself to building management",
      "Locate your assigned parking, storage, and mailbox",
      "Review the community manual for move-in procedures, pet registration, and quiet hours",
    ],
  },
  {
    period: "Months 2\u20133",
    items: [
      "Attend your first HOA meeting (usually quarterly or monthly). This is how you know what\u2019s happening in your building. Most owners never attend \u2014 be the exception.",
      "Set up a home maintenance fund. Even in a condo where HOA covers exterior, you\u2019re responsible for interior: HVAC filters, water heater, appliances. Budget $50\u2013$100/month.",
    ],
  },
  {
    period: "Months 4\u20136",
    items: [
      "Review your first real property tax bill. Compare it to the estimates from your closing disclosure. If you filed homestead exemption correctly, the school portion should reflect the $140K deduction.",
      "Check your mortgage statement. Confirm your escrow is aligned with actual taxes and insurance.",
    ],
  },
  {
    period: "Months 6\u201312",
    items: [
      "Get involved. Condo buildings run better when owners participate. Attend meetings, volunteer for committees, or at minimum stay informed on budget decisions.",
      "Revisit your insurance. Your HO6 policy should be reviewed annually. Make sure your coverage matches your unit\u2019s current value and your personal belongings.",
    ],
  },
]

export function BuyerFirstYearSection() {
  return (
    <section className="py-16 md:py-20 bg-mvl-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-6">
            Your First Year — What to Expect After Closing
          </h2>

          <p className="text-mvl-espresso/80 leading-relaxed mb-8">
            Congratulations — you own a home. Now what? Here&#39;s a practical timeline for your first year as a condo owner, so nothing falls through the cracks.
          </p>

          <div className="space-y-8">
            {milestones.map((milestone) => (
              <div key={milestone.period}>
                <h3 className="text-lg font-montserrat font-semibold text-mvl-espresso mb-3">
                  {milestone.period}
                </h3>
                <ul className="space-y-2 ml-4">
                  {milestone.items.map((item) => (
                    <li key={item.slice(0, 30)} className="flex items-start gap-2 text-mvl-espresso/80">
                      <span className="text-mvl-coral font-semibold mt-0.5">&#8226;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
