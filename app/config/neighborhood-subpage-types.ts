// Shared types for neighborhood subpages
// Used by: restaurants, parks, museums, coffee, transit

export interface SubpageVenue {
  readonly id: string
  readonly name: string
  readonly address: string
  readonly zipCode: string
  readonly distance: string
  readonly walkTime: string
  readonly driveTime?: string
  readonly bikeTime?: string
  readonly cuisine?: string
  readonly type?: string
  readonly priceRange?: string
  readonly recognition?: string
  readonly hours: string
  readonly dogFriendly: string
  readonly fee?: string
  readonly wifi?: string
  readonly website: string | null
  readonly instagram: string | null
  readonly description: string
  readonly amenities?: readonly string[]
  readonly admission?: string
}

export interface SubpageVenueTier {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly venues: readonly SubpageVenue[]
}

export interface SubpageQuickStat {
  readonly label: string
  readonly value: string
}

export interface SubpageFAQItem {
  readonly question: string
  readonly answer: string
}

export interface SubpageMVLCallout {
  readonly icon: string
  readonly headline: string
  readonly body: string
  readonly pricingLine: string
  readonly scoreLine: string
}

export interface SubpageCrossLink {
  readonly label: string
  readonly href: string
}

export interface SubpageConfig {
  readonly slug: string
  readonly name: string
  readonly lastUpdated: string
  readonly quickStats: readonly SubpageQuickStat[]
  readonly faqs: readonly SubpageFAQItem[]
  readonly mvlCallout: SubpageMVLCallout
  readonly crossLinks: readonly SubpageCrossLink[]
  readonly disclaimers: readonly string[]
}

// Transit-specific types (different from venue-based pages)
export interface TransitRoute {
  readonly name: string
  readonly nearestStop: string
  readonly distance: string
  readonly walkTime: string
  readonly details: string
  readonly frequency?: string
  readonly website?: string
}

export interface TransitSection {
  readonly id: string
  readonly title: string
  readonly content: string
  readonly routes?: readonly TransitRoute[]
}

// Standard disclaimers used across all subpages
export const SUBPAGE_DISCLAIMERS: readonly string[] = [
  "Hours, menus, admission fees, and availability are subject to change. Contact venues directly for current information.",
  "Distances are approximate walking distances from 4509 Mount Vernon St and may vary by route.",
  "Equal Housing Opportunity.",
] as const

// Standard cross-links used across all subpages
export const SUBPAGE_CROSS_LINKS: readonly SubpageCrossLink[] = [
  { label: "Restaurants", href: "/neighborhood/restaurants" },
  { label: "Parks & Dog Parks", href: "/neighborhood/parks" },
  { label: "Museums & Culture", href: "/neighborhood/museums" },
  { label: "Coffee Shops", href: "/neighborhood/coffee" },
  { label: "Getting Around", href: "/neighborhood/transit" },
] as const
