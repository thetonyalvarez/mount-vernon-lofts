import { SubpageCTA } from "@/app/neighborhood/components/SubpageCTA"
import { SubpageCrossLinks } from "@/app/neighborhood/components/SubpageCrossLinks"
import { SUBPAGE_CROSS_LINKS } from "@/app/config/neighborhood-subpage-types"

export function CTASection() {
  return (
    <>
      <SubpageCTA source="museums" />
      <SubpageCrossLinks links={SUBPAGE_CROSS_LINKS} currentSlug="museums" />
    </>
  )
}
