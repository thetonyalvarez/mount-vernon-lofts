import { SubpageFAQ } from "@/app/neighborhood/components/SubpageFAQ"
import { museumsFAQs } from "@/app/config/neighborhood-museums-data"

export function FAQSection() {
  return <SubpageFAQ faqs={museumsFAQs} />
}
