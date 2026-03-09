"use client"

import { useState } from "react"
import type { SubpageFAQItem } from "@/app/config/neighborhood-subpage-types"

interface SubpageFAQProps {
  readonly faqs: readonly SubpageFAQItem[]
  readonly title?: string
}

export function SubpageFAQ({
  faqs,
  title = "Frequently Asked Questions",
}: SubpageFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-12 text-center uppercase tracking-wide">
          {title}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="border border-mvl-beige rounded-md overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-mvl-warm-white transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-montserrat text-mvl-espresso font-medium pr-4">
                  {faq.question}
                </span>
                <span
                  className={`text-mvl-coral text-xl flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-mvl-espresso/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
