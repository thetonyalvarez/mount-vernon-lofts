import Link from "next/link"
import type { SubpageCrossLink } from "@/app/config/neighborhood-subpage-types"

interface SubpageCrossLinksProps {
  readonly links: readonly SubpageCrossLink[]
  readonly currentSlug: string
}

export function SubpageCrossLinks({ links, currentSlug }: SubpageCrossLinksProps) {
  const filteredLinks = links.filter(
    (link) => !link.href.endsWith(`/${currentSlug}`)
  )

  return (
    <div className="py-12 bg-mvl-beige">
      <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p className="text-mvl-espresso/70 text-sm uppercase tracking-wider mb-4">
          Explore more of the neighborhood
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          {filteredLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-mvl-coral hover:text-mvl-coral-dark font-medium text-sm md:text-base transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
