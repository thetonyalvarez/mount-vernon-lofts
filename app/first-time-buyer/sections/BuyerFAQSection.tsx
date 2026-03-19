'use client'

import { useState } from 'react'

const faqItems = [
  {
    question: "How much do I need for a down payment on a condo in Houston?",
    answer: "It depends on the loan type and the building. Non-QM loans typically require 10% down. FHA loans require 3.5%, and some conventional loans start at 3\u20135%. On a $175,000 condo, that ranges from approximately $6,125 to $17,500. Houston buyers may also qualify for down payment assistance programs that reduce this further \u2014 the City of Houston\u2019s HAP program offers up to $50,000 in forgivable assistance.",
  },
  {
    question: "What Houston programs help first-time home buyers?",
    answer: "The main programs include: the City of Houston Homebuyer Assistance Program (up to $50,000 forgivable loan), TSAHC Home Sweet Texas (up to 5% of loan amount as a grant or forgivable loan), TSAHC Texas Heroes (for public servants), and Harris County Down Payment Assistance. Eligibility depends on income, credit score, and property location. Programs and availability change \u2014 contact each directly for current details.",
  },
  {
    question: "Is it cheaper to buy a condo than rent in Houston?",
    answer: "Monthly cash outflow for condo ownership is often higher than renting when you include mortgage, HOA, taxes, and insurance. However, a portion of each mortgage payment builds equity. Over time, the total cost of ownership can be lower than renting \u2014 especially with a fixed-rate mortgage that doesn\u2019t increase, compared to rents that typically rise. The right answer depends on your timeline, financial situation, and goals.",
  },
  {
    question: "What\u2019s different about financing a condo vs. a house?",
    answer: "The biggest difference: your lender evaluates the building, not just you. Condo buildings must meet specific criteria (reserves, owner-occupancy ratios, insurance) to qualify for conventional or FHA financing. If the building doesn\u2019t meet those standards, Non-QM financing is available but typically requires a higher down payment.",
  },
  {
    question: "What is the homestead exemption in Texas?",
    answer: "If you buy a home and make it your primary residence, Texas exempts $140,000 of your property\u2019s appraised value from school district taxes. At Houston\u2019s approximate 1.77% combined tax rate, this can save over $1,000 per year on a $175,000 condo. You must apply \u2014 file Form 50-114 with the Harris County Appraisal District between January 1 and April 30.",
  },
  {
    question: "Do I need a real estate agent to buy a condo?",
    answer: "You don\u2019t legally need one, but it\u2019s strongly recommended \u2014 especially for condos. A good agent handles negotiations, reviews HOA documents, coordinates inspections, and manages the closing process. In Texas, the seller typically pays the buyer\u2019s agent commission, so having representation usually costs you nothing out of pocket.",
  },
  {
    question: "What should I look for in a condo HOA before buying?",
    answer: "Focus on the reserve fund (should be 10%+ of annual budget), any pending special assessments, the building\u2019s insurance coverage, management company reputation, and HOA rules (pet policy, rental restrictions, noise policies). Request the most recent financial statements, meeting minutes, and the governing documents before making an offer.",
  },
  {
    question: "How long does it take to buy a condo in Houston?",
    answer: "From accepted offer to closing, typically 30\u201345 days for conventional financing. Non-QM loans can sometimes close faster. The full process \u2014 from starting your search to moving in \u2014 usually takes 2\u20134 months depending on how quickly you find the right property and any financing complexities.",
  },
]

export function BuyerFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-montserrat font-semibold text-mvl-espresso mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div key={item.question} className="border border-mvl-beige rounded overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 hover:bg-mvl-warm-white transition-colors duration-150"
                    aria-expanded={isOpen}
                  >
                    <span className="font-montserrat font-semibold text-mvl-espresso text-sm md:text-base">
                      {item.question}
                    </span>
                    <span
                      className={`text-mvl-coral text-xl flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isOpen ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <p className="px-4 md:px-5 pb-4 md:pb-5 text-mvl-espresso/75 leading-relaxed text-sm md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
