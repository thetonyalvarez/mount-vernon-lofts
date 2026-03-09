"use client"

import { SubpageFAQ } from "@/app/neighborhood/components/SubpageFAQ"
import { restaurantsData } from "@/app/config/neighborhood-restaurants-data"

export function FAQSection() {
  return <SubpageFAQ faqs={restaurantsData.faqs} />
}
