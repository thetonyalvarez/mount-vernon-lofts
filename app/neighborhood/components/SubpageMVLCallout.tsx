"use client"

import Link from "next/link"
import { useContactModal } from "@/lib/contact-modal-context"
import type { SubpageMVLCallout as CalloutType } from "@/app/config/neighborhood-subpage-types"

interface SubpageMVLCalloutProps {
  readonly callout: CalloutType
  readonly source: string
}

export function SubpageMVLCallout({ callout, source }: SubpageMVLCalloutProps) {
  const { openModal } = useContactModal()

  return (
    <section className="py-16 bg-mvl-warm-white">
      <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-12">
        <div className="bg-white border border-mvl-beige rounded-md p-8 md:p-10 text-center">
          <p className="text-3xl mb-4">{callout.icon}</p>
          <h2 className="font-montserrat text-xl md:text-2xl text-mvl-espresso font-semibold mb-4 uppercase tracking-wide">
            {callout.headline}
          </h2>
          <p className="text-mvl-espresso/80 leading-relaxed mb-6 max-w-xl mx-auto">
            {callout.body}
          </p>
          <p className="text-mvl-espresso font-medium mb-1">
            {callout.pricingLine}
          </p>
          <p className="text-mvl-espresso/60 text-sm mb-8">
            {callout.scoreLine}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/residences"
              className="inline-flex items-center justify-center bg-mvl-coral text-white px-6 py-3 rounded hover:bg-mvl-coral-dark transition-colors font-medium"
            >
              View Residences &rarr;
            </Link>
            <button
              onClick={() => openModal(`${source}_callout`, `contact_modal_${source}`)}
              className="inline-flex items-center justify-center border-2 border-mvl-espresso text-mvl-espresso px-6 py-3 rounded hover:bg-mvl-espresso hover:text-white transition-all font-medium"
            >
              Schedule a Tour &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
