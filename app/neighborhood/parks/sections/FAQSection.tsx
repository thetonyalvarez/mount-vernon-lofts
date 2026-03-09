import { SubpageFAQ } from "@/app/neighborhood/components/SubpageFAQ"
import { parksData } from "@/app/config/neighborhood-parks-data"

export function FAQSection() {
  return <SubpageFAQ faqs={parksData.faqs} />
}
