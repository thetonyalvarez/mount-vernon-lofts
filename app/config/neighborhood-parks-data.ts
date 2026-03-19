import type {
  SubpageVenueTier,
  SubpageQuickStat,
  SubpageFAQItem,
  SubpageMVLCallout,
  SubpageConfig,
} from "@/app/config/neighborhood-subpage-types"
import {
  SUBPAGE_DISCLAIMERS,
  SUBPAGE_CROSS_LINKS,
} from "@/app/config/neighborhood-subpage-types"

const quickStats: readonly SubpageQuickStat[] = [
  { label: "Off-leash dog park", value: "0.3 mi" },
  { label: "Buffalo Bayou trail", value: "~1 mi" },
  { label: "Walk Score", value: "74" },
  { label: "Bike Score", value: "73" },
] as const

const venueTiers: readonly SubpageVenueTier[] = [
  {
    id: "dog-parks",
    title: "Dog Parks",
    description:
      "Off-leash dog parks near Mount Vernon Lofts, sorted by distance.",
    venues: [
      {
        id: "ervan-chew-dog-park",
        name: "Ervan Chew Dog Park",
        address: "4502 Dunlavy St",
        zipCode: "77006",
        distance: "~0.3 mi",
        walkTime: "~6 min walk",
        type: "Fenced off-leash dog park",
        dogFriendly: "Off-leash",
        fee: "Free",
        hours: "Dawn to dusk",
        website: null,
        instagram: null,
        amenities: [
          "Fenced off-leash area (~9,000 SF)",
          "Splash pad",
          "Playground",
          "Basketball court",
          "Walking path",
        ],
        description:
          "The closest off-leash dog park to Mount Vernon Lofts -- just a 6-minute walk. Ervan Chew Dog Park is fully fenced with separate areas for large and small dogs. Part of the larger Ervan Chew Park, which also includes a splash pad, playground, and basketball court.",
      },
      {
        id: "johnny-steele",
        name: "Johnny Steele Dog Park",
        address: "2929 Allen Pkwy",
        zipCode: "77019",
        distance: "~2.3 mi",
        walkTime: "~53 min walk",
        driveTime: "~10 min",
        bikeTime: "~14 min",
        type: "Off-leash dog park within Buffalo Bayou Park",
        dogFriendly: "Off-leash",
        fee: "Free",
        hours: "7am-8pm",
        website: null,
        instagram: null,
        amenities: [
          "Large fenced off-leash area",
          "Dog washing stations",
          "Drinking fountains",
          "Seating",
          "Bayou views",
        ],
        description:
          "One of Houston's most popular dog parks, located inside Buffalo Bayou Park. Johnny Steele features a large fenced off-leash area with dog washing stations, drinking fountains, and views along the bayou. About a 10-minute drive or 14-minute bike ride from MVL.",
      },
      {
        id: "levy-park",
        name: "Levy Park Dog Run",
        address: "3801 Eastside St",
        zipCode: "77098",
        distance: "~2.0 mi",
        walkTime: "~44 min walk",
        driveTime: "~7 min",
        type: "Off-leash dog park within Levy Park",
        dogFriendly: "Off-leash",
        fee: "Free",
        hours: "6am-10pm",
        website: null,
        instagram: null,
        amenities: [
          "Dual dog parks (small/large separation)",
          "Playground",
          "Event lawn",
          "Cafe",
          "Free programming",
        ],
        description:
          "Levy Park features dual fenced dog runs with separate areas for small and large dogs. The surrounding park offers a playground, event lawn, on-site cafe, and free community programming. About a 7-minute drive from MVL.",
      },
    ],
  },
  {
    id: "neighborhood-parks",
    title: "Neighborhood Parks (Walking Distance)",
    description:
      "Parks within walking distance of Mount Vernon Lofts, sorted by distance.",
    venues: [
      {
        id: "ervan-chew-park",
        name: "Ervan Chew Park (Full Park)",
        address: "4502 Dunlavy St",
        zipCode: "77006",
        distance: "~0.3 mi",
        walkTime: "~6 min walk",
        type: "Neighborhood park",
        dogFriendly: "Yes",
        fee: "Free",
        hours: "Dawn to dusk",
        website: null,
        instagram: null,
        amenities: [
          "Dog park",
          "Splash pad",
          "Playground",
          "Basketball court",
          "Walking path",
          "Open green space",
          "Picnic area",
        ],
        description:
          "The full Ervan Chew Park is the closest park to Mount Vernon Lofts. In addition to the off-leash dog area, it includes a splash pad, playground, basketball court, walking path, open green space, and picnic area. A 6-minute walk from your front door.",
      },
      {
        id: "mandell-park",
        name: "Mandell Park",
        address: "1520 Richmond Ave",
        zipCode: "77006",
        distance: "~0.4 mi",
        walkTime: "~8 min walk",
        type: "Neighborhood park",
        dogFriendly: "Check",
        fee: "Free",
        hours: "Dawn to dusk",
        website: null,
        instagram: null,
        amenities: [
          "Playground",
          "Basketball court",
          "Open green space",
        ],
        description:
          "A neighborhood park about an 8-minute walk from MVL. Mandell Park offers a playground, basketball court, and open green space in the heart of Montrose.",
      },
      {
        id: "cherryhurst",
        name: "Cherryhurst Park",
        address: "1700 Missouri St",
        zipCode: "77006",
        distance: "~0.5 mi",
        walkTime: "~10 min walk",
        type: "Neighborhood park",
        dogFriendly: "Check",
        fee: "Free",
        hours: "Dawn to dusk",
        website: null,
        instagram: null,
        amenities: [
          "Playground",
          "Dog area",
          "Basketball court",
          "Jogging trail",
          "Community center",
        ],
        description:
          "A well-used neighborhood park about a 10-minute walk from MVL. Cherryhurst Park includes a playground, dog area, basketball court, jogging trail, and the Cherryhurst Community Center.",
      },
      {
        id: "menil-park",
        name: "Menil Park",
        address: "near 1533 Sul Ross St",
        zipCode: "77006",
        distance: "~0.8 mi",
        walkTime: "~16 min walk",
        type: "Cultural green space",
        dogFriendly: "Check",
        fee: "Free",
        hours: "Dawn to dusk",
        website: null,
        instagram: null,
        amenities: [
          "Open lawn",
          "Art installations",
          "Shade trees",
          "Benches",
          "Adjacent to Menil Collection",
        ],
        description:
          "The green space surrounding the Menil Collection, about a 16-minute walk from MVL. Menil Park features open lawns, shade trees, public art installations, and benches -- a quiet spot to read or relax adjacent to one of Houston's best free museums.",
      },
    ],
  },
  {
    id: "trails-big-parks",
    title: "Trails & Big Parks",
    description:
      "Larger parks and trail systems accessible from Mount Vernon Lofts.",
    venues: [
      {
        id: "buffalo-bayou",
        name: "Buffalo Bayou Park",
        address: "Buffalo Bayou (multiple access points)",
        zipCode: "77007",
        distance: "~1.0 mi",
        walkTime: "~20 min walk",
        bikeTime: "~6 min",
        type: "Linear park / hike-and-bike trail",
        dogFriendly: "Yes",
        fee: "Free (rentals extra)",
        hours: "6am-11pm",
        website: "https://buffalobayou.org",
        instagram: null,
        amenities: [
          "160 acres",
          "Hike-and-bike trails",
          "Dog park (Johnny Steele)",
          "Kayak/paddleboard rentals",
          "Nature play area",
          "Public art",
          "Visitor center",
        ],
        description:
          "Houston's signature urban greenway, spanning 160 acres along the bayou. Buffalo Bayou Park features miles of hike-and-bike trails, the Johnny Steele Dog Park, kayak and paddleboard rentals, a nature play area, public art, and a visitor center. About a 6-minute bike ride from MVL.",
      },
    ],
  },
] as const

const faqs: readonly SubpageFAQItem[] = [
  {
    question: "Are there off-leash dog parks in Montrose Houston?",
    answer:
      "Yes. Ervan Chew Dog Park at 4502 Dunlavy St is a fully fenced off-leash park just 0.3 miles from Mount Vernon Lofts -- about a 6-minute walk. It has separate areas for large and small dogs. Johnny Steele Dog Park at Buffalo Bayou Park is another popular off-leash option, about a 10-minute drive or 14-minute bike ride away.",
  },
  {
    question:
      "What is the closest park to Mount Vernon Street in Montrose?",
    answer:
      "Ervan Chew Park is approximately 0.3 miles from Mount Vernon Lofts, about a 6-minute walk. It includes an off-leash dog park, playground, splash pad, basketball court, walking path, and open green space.",
  },
  {
    question: "Can I bike to Buffalo Bayou Park from Montrose?",
    answer:
      "Yes. Buffalo Bayou Park is approximately 1 mile from Mount Vernon Lofts, about a 6-minute bike ride. Montrose has a Bike Score of 73, making it one of the more bikeable areas in Houston. The park features 160 acres of trails, green space, and recreational facilities.",
  },
] as const

const mvlCallout: SubpageMVLCallout = {
  icon: "\u{1F415}",
  headline: "PET-FRIENDLY CONDO, 0.3 MI FROM OFF-LEASH DOG PARK",
  body: "Mount Vernon Lofts is pet-friendly -- dogs allowed, 2 per handler in common areas. And you're a 6-minute walk from Ervan Chew Dog Park's fenced off-leash area.",
  pricingLine: "Studios from the $175Ks | 1-beds from the $250Ks",
  scoreLine: "Walk Score: 74 | Bike Score: 73",
} as const

export const parksData: SubpageConfig = {
  slug: "parks",
  name: "Parks & Dog Parks",
  lastUpdated: "March 2026",
  quickStats,
  faqs,
  mvlCallout,
  crossLinks: SUBPAGE_CROSS_LINKS,
  disclaimers: SUBPAGE_DISCLAIMERS,
} as const

export const parksVenueTiers = venueTiers
