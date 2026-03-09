import { SubpageCTA } from "@/app/neighborhood/components/SubpageCTA"
import { SubpageCrossLinks } from "@/app/neighborhood/components/SubpageCrossLinks"
import { parksData } from "@/app/config/neighborhood-parks-data"

export function CTASection() {
  return (
    <>
      <SubpageCTA source="parks" />
      <SubpageCrossLinks
        links={parksData.crossLinks}
        currentSlug="parks"
      />
    </>
  )
}
