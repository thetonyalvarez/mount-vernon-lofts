// Neighborhood subpage: Museums & Culture
// Source: brand-guidelines.json verifiedNeighborhoodVenues + museum websites
// All venues confirmed open and operating as of March 2026.
// Confirm before using in marketing — hours and admission may change.

import type {
  SubpageVenue,
  SubpageVenueTier,
  SubpageQuickStat,
  SubpageFAQItem,
  SubpageMVLCallout,
  SubpageConfig,
} from "@/app/config/neighborhood-subpage-types"
import { SUBPAGE_DISCLAIMERS, SUBPAGE_CROSS_LINKS } from "@/app/config/neighborhood-subpage-types"

// ---------------------------------------------------------------------------
// Quick Stats
// ---------------------------------------------------------------------------
export const museumsQuickStats: readonly SubpageQuickStat[] = [
  { label: "In the Museum District", value: "20+ museums" },
  { label: "Within 0.8 mi walking distance", value: "3 free museums" },
  { label: "The Menil Collection", value: "Always free" },
  { label: "Walk Score", value: "74" },
] as const

// ---------------------------------------------------------------------------
// Tier 1 — The Menil Campus
// ---------------------------------------------------------------------------
const menilCollection: SubpageVenue = {
  id: "menil",
  name: "The Menil Collection",
  address: "1533 Sul Ross St",
  zipCode: "77006",
  distance: "~0.8 mi",
  walkTime: "~16 min",
  type: "Art museum",
  admission: "Always free",
  hours: "Wed-Sun, 11am-7pm (check current hours)",
  dogFriendly: "No",
  website: "https://menil.org",
  instagram: null,
  description:
    "One of the most important private art collections in the world, housed in a Renzo Piano-designed building. The permanent collection includes more than 17,000 works spanning antiquities, Byzantine and medieval art, the modern era, and contemporary art. Always free, always worth a visit.",
} as const

const rothkoChapel: SubpageVenue = {
  id: "rothko",
  name: "Rothko Chapel",
  address: "3900 Yupon St",
  zipCode: "77006",
  distance: "~0.7 mi",
  walkTime: "~14 min",
  type: "Meditative art space",
  admission: "Free",
  hours: "Check current hours",
  dogFriendly: "No",
  website: "https://rothkochapel.org",
  instagram: null,
  description:
    "A meditative art space featuring fourteen monumental paintings by Mark Rothko. The chapel is a non-denominational sanctuary open to people of all faiths and none — a place for quiet contemplation in the heart of Montrose.",
} as const

const cyTwomblyGallery: SubpageVenue = {
  id: "cy-twombly",
  name: "Cy Twombly Gallery",
  address: "1533 Sul Ross St",
  zipCode: "77006",
  distance: "~0.8 mi",
  walkTime: "~16 min",
  type: "Art gallery",
  admission: "Always free",
  hours: "Wed-Sun, 11am-7pm",
  dogFriendly: "No",
  website: "https://menil.org",
  instagram: null,
  description:
    "A Renzo Piano-designed gallery on the Menil campus dedicated entirely to the work of Cy Twombly. Natural light filters through a layered ceiling system, creating ideal conditions for viewing Twombly's large-scale paintings, sculptures, and works on paper.",
} as const

// ---------------------------------------------------------------------------
// Tier 2 — Museum District
// ---------------------------------------------------------------------------
const camh: SubpageVenue = {
  id: "camh",
  name: "Contemporary Arts Museum Houston (CAMH)",
  address: "5216 Montrose Blvd",
  zipCode: "77006",
  distance: "~0.7 mi",
  walkTime: "~14 min",
  type: "Contemporary art museum",
  admission: "Always free",
  hours: "Check current hours",
  dogFriendly: "No",
  website: "https://camh.org",
  instagram: null,
  description:
    "Houston's leading contemporary art museum, featuring rotating exhibitions of regional, national, and international artists. The striking stainless-steel building is a Montrose landmark. Admission is always free.",
} as const

const mfah: SubpageVenue = {
  id: "mfah",
  name: "Museum of Fine Arts, Houston (MFAH)",
  address: "1001 Bissonnet St",
  zipCode: "77005",
  distance: "~1.0 mi",
  walkTime: "~20 min",
  type: "Art museum",
  admission: "Free Thursdays",
  hours: "Check current hours",
  dogFriendly: "No",
  website: "https://mfah.org",
  instagram: null,
  description:
    "One of the 10 largest art museums in the United States, with a collection spanning 6,000 years of history. The campus includes two main buildings, a sculpture garden, and the recently opened Nancy and Rich Kinder Building. Free admission on Thursdays.",
} as const

const hmns: SubpageVenue = {
  id: "hmns",
  name: "Houston Museum of Natural Science",
  address: "5555 Hermann Park Dr",
  zipCode: "77030",
  distance: "~1.3 mi",
  walkTime: "~25 min",
  type: "Natural science museum",
  admission: "Check current pricing",
  hours: "Check current hours",
  dogFriendly: "No",
  website: "https://www.hmns.org",
  instagram: null,
  description:
    "One of the most popular museums in the country, featuring permanent exhibits on paleontology, gems and minerals, ancient Egypt, and wildlife. Also home to a planetarium, butterfly center, and giant screen theatre.",
} as const

const asiaSociety: SubpageVenue = {
  id: "asia-society",
  name: "Asia Society Texas Center",
  address: "1370 Southmore Blvd",
  zipCode: "77004",
  distance: "~1.5 mi",
  walkTime: "~30 min",
  type: "Arts and culture center",
  admission: "Check current pricing",
  hours: "Check current hours",
  dogFriendly: "No",
  website: "https://asiasociety.org/texas",
  instagram: null,
  description:
    "A Yoshio Taniguchi-designed center presenting art exhibitions, performances, lectures, and programs focused on Asia and Asian America. The building itself is a work of art, with a reflecting pool and tranquil garden.",
} as const

// ---------------------------------------------------------------------------
// Tier 3 — Galleries & Art Spaces
// ---------------------------------------------------------------------------
const diverseWorks: SubpageVenue = {
  id: "diverseworks",
  name: "DiverseWorks",
  address: "4102 Fannin St",
  zipCode: "77006",
  distance: "~1.0 mi",
  walkTime: "~20 min",
  type: "Contemporary art space",
  admission: "Free",
  hours: "Check current hours",
  dogFriendly: "No",
  website: null,
  instagram: null,
  description:
    "An experimental contemporary art space in the Montrose area that has been commissioning and presenting new work across visual art, performance, music, and literature since 1982. A vital part of Houston's arts ecosystem.",
} as const

// ---------------------------------------------------------------------------
// Tiers
// ---------------------------------------------------------------------------
export const museumsTiers: readonly SubpageVenueTier[] = [
  {
    id: "menil-campus",
    title: "The Menil Campus",
    description:
      "All free. All within walking distance. The Menil campus is one of the most remarkable cultural destinations in the country — and it is right down the street from Mount Vernon Lofts.",
    venues: [menilCollection, rothkoChapel, cyTwomblyGallery],
  },
  {
    id: "museum-district",
    title: "Museum District",
    description:
      "Houston's Museum District is one of the largest in the nation, with 20+ museums concentrated in a walkable area just south of Montrose. Many offer free or reduced admission days.",
    venues: [camh, mfah, hmns, asiaSociety],
  },
  {
    id: "galleries-art-spaces",
    title: "Galleries & Art Spaces",
    description:
      "Montrose has long been the heart of Houston's art scene. Independent galleries and project spaces are woven throughout the neighborhood.",
    venues: [diverseWorks],
  },
] as const

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------
export const museumsFAQs: readonly SubpageFAQItem[] = [
  {
    question: "What museums are near Montrose Houston?",
    answer:
      "Montrose sits adjacent to Houston's Museum District, home to 20+ museums. The Menil Collection (always free, ~0.8 mi from MVL), Rothko Chapel (free, ~0.7 mi), and the Contemporary Arts Museum Houston (always free, ~0.7 mi) are all within walking distance. The Museum of Fine Arts, Houston is about a mile away and offers free admission on Thursdays.",
  },
  {
    question: "Is the Menil Collection really free?",
    answer:
      "Yes. The Menil Collection has been free since it opened in 1987. No tickets or reservations are required for the permanent collection. It is one of the most important private art collections in the world, and it is always open to the public at no cost.",
  },
  {
    question: "How many museums are in Houston's Museum District?",
    answer:
      "Houston's Museum District includes 20+ museums as well as the Houston Zoo, all concentrated in a walkable area. The district is accessible by METRORail and borders Montrose to the south, making it easy to visit from Mount Vernon Lofts on foot or by transit.",
  },
  {
    question: "Can I walk to the Museum District from Montrose?",
    answer:
      "Yes. The Museum District borders Montrose to the south. From Mount Vernon Lofts, the Menil Collection is about a 16-minute walk, CAMH is about 14 minutes, and the Museum of Fine Arts is about 20 minutes. Many residents walk or bike to these destinations regularly.",
  },
] as const

// ---------------------------------------------------------------------------
// MVL Callout
// ---------------------------------------------------------------------------
export const museumsMVLCallout: SubpageMVLCallout = {
  icon: "\u{1F3A8}",
  headline: "LIVE STEPS FROM WORLD-CLASS ART",
  body: "Mount Vernon Lofts sits at 4509 Mount Vernon St — within walking distance of the Menil Collection, Rothko Chapel, CAMH, and 20+ museums in Houston's Museum District.",
  pricingLine: "Studios from the $175Ks | 1-beds from the $250Ks",
  scoreLine: "Walk Score: 74 (Very Walkable)",
} as const

// ---------------------------------------------------------------------------
// Combined config export
// ---------------------------------------------------------------------------
export const museumsData: SubpageConfig = {
  slug: "museums",
  name: "Museums & Culture",
  lastUpdated: "March 2026",
  quickStats: museumsQuickStats,
  faqs: museumsFAQs,
  mvlCallout: museumsMVLCallout,
  crossLinks: SUBPAGE_CROSS_LINKS,
  disclaimers: [...SUBPAGE_DISCLAIMERS],
} as const
