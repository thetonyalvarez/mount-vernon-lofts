import { SubpageFAQ } from "@/app/neighborhood/components/SubpageFAQ"
import { transitData } from "@/app/config/neighborhood-transit-data"

export function FAQSection() {
  return <SubpageFAQ faqs={transitData.faqs} />
}
