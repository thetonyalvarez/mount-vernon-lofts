"use client"

import { SubpageFAQ } from "@/app/neighborhood/components/SubpageFAQ"
import { coffeeData } from "@/app/config/neighborhood-coffee-data"

export function FAQSection() {
  return <SubpageFAQ faqs={coffeeData.faqs} />
}
