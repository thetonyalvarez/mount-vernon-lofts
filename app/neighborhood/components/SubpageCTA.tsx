"use client"

import { useContactModal } from "@/lib/contact-modal-context"

interface SubpageCTAProps {
  readonly source: string
  readonly headline?: string
  readonly body?: string
}

export function SubpageCTA({
  source,
  headline = "Tours by Appointment",
  body = "See for yourself why Montrose is one of Houston's most walkable neighborhoods — and why Mount Vernon Lofts is the way to own here. Schedule a tour today.",
}: SubpageCTAProps) {
  const { openModal } = useContactModal()

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <h2 className="font-montserrat text-2xl md:text-3xl text-mvl-espresso mb-4 uppercase tracking-wide">
          {headline}
        </h2>
        <p className="text-lg md:text-xl text-mvl-espresso/80 leading-relaxed mb-8 max-w-3xl mx-auto">
          {body}
        </p>
        <button
          onClick={() => openModal(`${source}_cta`, `contact_modal_${source}`)}
          className="inline-flex items-center border-2 border-mvl-espresso text-mvl-espresso px-8 py-3 hover:bg-mvl-espresso hover:text-white transition-all duration-300 uppercase tracking-wider"
        >
          Schedule a Tour
          <span className="ml-2">&rarr;</span>
        </button>
      </div>
    </section>
  )
}
