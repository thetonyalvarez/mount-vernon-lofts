import type {
  SubpageVenueTier,
  SubpageQuickStat,
  SubpageFAQItem,
  SubpageMVLCallout,
} from "@/app/config/neighborhood-subpage-types"

export interface CoffeeBestFor {
  readonly category: string
  readonly venue: string
  readonly reason: string
}

export const coffeeBestFor: readonly CoffeeBestFor[] = [
  {
    category: "Best for remote work",
    venue: "Siphon Coffee",
    reason:
      "Spacious seating, reliable WiFi, coffee + food + beer — you can set up camp.",
  },
  {
    category: "Best for a quick grab-and-go",
    venue: "Matcha Mia",
    reason:
      "Closest to MVL (0.3 mi). Matcha, smoothies, and waffles for a fast morning stop.",
  },
  {
    category: "Best late-night spot",
    venue: "Black Hole Coffee House",
    reason:
      "Open until midnight daily. Coffee, wine, and beer in a relaxed setting.",
  },
  {
    category: "Best dog-friendly patio",
    venue: "Black Hole Coffee House",
    reason:
      "Dog-friendly patio seating. Bring your pup for a morning coffee run.",
  },
  {
    category: "Best for a non-coffee drinker",
    venue: "Matcha Mia",
    reason:
      "Ceremonial-grade matcha, smoothies, and juice. No espresso required.",
  },
] as const

export const coffeeData = {
  slug: "coffee",
  name: "Coffee Shops",
  lastUpdated: "March 2026",

  quickStats: [
    { label: "Coffee shops within 0.5 mi", value: "3" },
    { label: "Closest", value: "0.3 mi (Matcha Mia)" },
    { label: "Late-night", value: "Black Hole (open until midnight)" },
    { label: "Walk Score", value: "74" },
  ] as const satisfies readonly SubpageQuickStat[],

  tiers: [
    {
      id: "walking-distance",
      title: "Walking Distance (Under 0.5 mi)",
      description:
        "The closest coffee shops to Mount Vernon Lofts — all within a 10-minute walk.",
      venues: [
        {
          id: "matcha-mia",
          name: "Matcha Mia",
          address: "607 Richmond Ave",
          zipCode: "77006",
          distance: "~0.3 mi",
          walkTime: "~6 min walk",
          type: "Matcha bar + cafe",
          hours: "Check current hours",
          dogFriendly: "Check",
          wifi: "Check",
          instagram: "https://www.instagram.com/hellomatchamia/",
          website: null,
          description:
            "Montrose's closest coffee/cafe option to MVL. Ceremonial-grade matcha, smoothies, and waffles. Opened the Montrose location in 2025. Good for a quick morning stop when you don't need a full espresso bar.",
        },
        {
          id: "black-hole",
          name: "Black Hole Coffee House",
          address: "4504 Graustark St",
          zipCode: "77006",
          distance: "~0.4 mi",
          walkTime: "~8 min walk",
          type: "Coffee house + bar",
          hours: "6:30am-midnight daily",
          dogFriendly: "Yes (patio)",
          wifi: "Check",
          instagram: "https://www.instagram.com/blackholecoffee/",
          website: null,
          description:
            "Open 6:30am to midnight daily — one of the few late-night coffee options in Montrose. Also serves wine, beer, and pastries. Dog-friendly patio. Good for evening work sessions or a casual drink.",
        },
        {
          id: "siphon-coffee",
          name: "Siphon Coffee",
          address: "701 W Alabama St",
          zipCode: "77006",
          distance: "~0.5 mi",
          walkTime: "~10 min walk",
          type: "Specialty coffee shop",
          hours: "Check current hours",
          dogFriendly: "Check",
          wifi: "Check",
          website: "https://www.siphoncoffee.com",
          instagram: null,
          description:
            "Montrose staple known for its siphon brewing method. Also serves food, beer, and wine. A community hub for the neighborhood.",
        },
      ],
    },
    {
      id: "short-drive",
      title: "Short Walk / Quick Drive",
      description:
        "A bit farther out, but worth the trip for the right cup.",
      venues: [
        {
          id: "agora",
          name: "Agora",
          address: "1602 Westheimer Rd",
          zipCode: "77006",
          distance: "~0.6 mi",
          walkTime: "~12 min walk",
          type: "Mediterranean cafe",
          hours: "Check current hours (historically late-night)",
          dogFriendly: "Check",
          wifi: "Check",
          website: null,
          instagram: null,
          description:
            "Mediterranean-inspired cafe with a sprawling patio on Westheimer. Historically one of Houston's late-night coffee spots. Good for work sessions and people-watching.",
        },
        {
          id: "campesino",
          name: "Campesino Coffee",
          address: "2602 Waugh Dr",
          zipCode: "77006",
          distance: "~1.3 mi",
          walkTime: "~25 min walk",
          driveTime: "~6 min",
          bikeTime: "~7 min",
          type: "Latin-inspired specialty coffee",
          hours: "Check current hours",
          dogFriendly: "Check",
          wifi: "Check",
          website: null,
          instagram: null,
          description:
            "Latin-inspired specialty coffee on Waugh Drive. A quick drive or bike ride from MVL. Known for its specialty drinks and community atmosphere.",
        },
      ],
    },
  ] as const satisfies readonly SubpageVenueTier[],

  faqs: [
    {
      question: "What are the best coffee shops in Montrose Houston?",
      answer:
        "Montrose has a strong independent coffee scene. Siphon Coffee on W Alabama is known for its siphon brewing method and serves food, beer, and wine. Black Hole Coffee House on Graustark is open until midnight daily and has a dog-friendly patio. Campesino Coffee on Waugh Drive offers Latin-inspired specialty drinks. Agora on Westheimer is a Mediterranean-style cafe with a large patio. Three of these are within a 10-minute walk of 4509 Mount Vernon St.",
    },
    {
      question: "Are there dog-friendly coffee shops in Montrose?",
      answer:
        "Black Hole Coffee House at 4504 Graustark St has a dog-friendly patio and is about an 8-minute walk from Mount Vernon Lofts. Other coffee shops in the area may welcome dogs on their patios — call ahead to confirm current policies.",
    },
    {
      question: "Is there a late-night coffee shop in Montrose?",
      answer:
        "Black Hole Coffee House is open 6:30am to midnight daily, serving coffee, wine, and beer. It's one of the few late-night coffee options in the Montrose area. Agora on Westheimer has historically been a late-night spot as well — check their current hours for the latest schedule.",
    },
  ] as const satisfies readonly SubpageFAQItem[],

  mvlCallout: {
    icon: "\u2615",
    headline: "YOUR MORNING COFFEE, ON FOOT",
    body: "Three coffee shops within a 10-minute walk of Mount Vernon Lofts. Start your morning without getting in the car.",
    pricingLine: "Studios from the $175Ks | 1-beds from the $250Ks",
    scoreLine: "Walk Score: 74 (Very Walkable)",
  } as const satisfies SubpageMVLCallout,
} as const
