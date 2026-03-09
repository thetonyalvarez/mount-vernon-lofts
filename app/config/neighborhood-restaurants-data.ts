import type {
  SubpageVenueTier,
  SubpageQuickStat,
  SubpageFAQItem,
  SubpageMVLCallout,
} from "@/app/config/neighborhood-subpage-types"

export const restaurantsData = {
  slug: "restaurants",
  name: "Restaurants",
  lastUpdated: "March 2026",

  quickStats: [
    { label: "Restaurants within 0.8 mi", value: "9+" },
    { label: "Michelin-recognized", value: "2" },
    { label: "James Beard Award winner", value: "1" },
    { label: "Walk Score", value: "74" },
  ] as const satisfies readonly SubpageQuickStat[],

  tiers: [
    {
      id: "walking-distance",
      title: "Walking Distance (Under 0.5 mi)",
      description:
        "The closest restaurants to Mount Vernon Lofts — all within a 10-minute walk.",
      venues: [
        {
          id: "pit-room",
          name: "The Pit Room",
          address: "1201 Richmond Ave",
          zipCode: "77006",
          distance: "~0.5 mi",
          walkTime: "~10 min walk",
          cuisine: "Texas BBQ",
          recognition: "Michelin Bib Gourmand",
          priceRange: "$$",
          hours: "Breakfast tacos 7-10:30am, BBQ 11am-9pm",
          dogFriendly: "Check",
          website: "https://thepitroombbq.com",
          instagram: null,
          description:
            "Michelin Bib Gourmand-recognized Texas BBQ right in Montrose. The Pit Room pairs oak-smoked brisket and ribs with scratch-made sides and breakfast tacos every morning. One of the most consistently praised BBQ spots in Houston — and it's a 10-minute walk from your front door.",
        },
        {
          id: "bcn",
          name: "BCN Taste & Tradition",
          address: "4210 Roseland St",
          zipCode: "77006",
          distance: "~0.5 mi",
          walkTime: "~10 min walk",
          cuisine: "Spanish fine dining",
          recognition: "Michelin one star",
          priceRange: "$$$$",
          hours: "Dinner only (check current hours)",
          dogFriendly: "No",
          website: "https://www.bcnhouston.com",
          instagram: null,
          description:
            "The only Michelin-starred restaurant within walking distance of Mount Vernon Lofts. BCN brings Barcelona-inspired fine dining to Montrose with a seasonal tasting menu that highlights Spanish technique and Gulf Coast ingredients.",
        },
        {
          id: "toasted-coconut",
          name: "The Toasted Coconut",
          address: "1617 Richmond Ave",
          zipCode: "77006",
          distance: "~0.4 mi",
          walkTime: "~8 min walk",
          cuisine: "Tiki-inspired bar & restaurant",
          priceRange: "$$",
          hours: "Closed Mondays (check current hours)",
          dogFriendly: "Check",
          website: "https://www.gettoastedhtx.com",
          instagram: null,
          description:
            "A tropical-inspired neighborhood spot serving creative cocktails and shareable plates. The Toasted Coconut is a go-to for casual dinners and weekend gatherings just an 8-minute walk from MVL.",
        },
      ],
    },
    {
      id: "short-walk",
      title: "Short Walk (0.5-1.0 mi)",
      description:
        "A comfortable walk through Montrose's tree-lined streets.",
      venues: [
        {
          id: "hugos",
          name: "Hugo's",
          address: "1600 Westheimer Rd",
          zipCode: "77006",
          distance: "~0.6 mi",
          walkTime: "~12 min walk",
          cuisine: "Regional Mexican",
          recognition: "James Beard Award",
          priceRange: "$$$",
          hours: "Check current hours",
          dogFriendly: "Check",
          website: "https://hugosrestaurant.net",
          instagram: null,
          description:
            "James Beard Award-winning chef Hugo Ortega's flagship restaurant celebrates regional Mexican cuisine with house-made moles, wood-grilled meats, and a weekend brunch that draws crowds from across Houston. A Montrose institution since 2002.",
        },
        {
          id: "uchi",
          name: "Uchi Houston",
          address: "904 Westheimer Rd",
          zipCode: "77006",
          distance: "~0.7 mi",
          walkTime: "~14 min walk",
          cuisine: "Japanese",
          priceRange: "$$$$",
          hours: "Dinner only (4pm+)",
          dogFriendly: "No",
          website: "https://uchirestaurants.com/uchi/houston",
          instagram: null,
          description:
            "Inventive Japanese cuisine in a beautifully converted Montrose bungalow. Uchi's omakase and a la carte menus showcase seasonal fish and unexpected ingredient pairings that have made it one of Houston's top dining destinations.",
        },
        {
          id: "handies-douzo",
          name: "Handies Douzo",
          address: "4005 Montrose Blvd",
          zipCode: "77006",
          distance: "~0.7 mi",
          walkTime: "~14 min walk",
          cuisine: "Hand roll sushi",
          priceRange: "$$",
          hours: "Check current hours",
          dogFriendly: "Check",
          website: "https://www.handiesdouzo.com",
          instagram: null,
          description:
            "Quick, high-quality hand roll sushi on Montrose Boulevard. Handies Douzo keeps it simple — fresh fish, warm rice, crispy nori — served counter-style for a fast but satisfying lunch or dinner.",
        },
        {
          id: "clarks",
          name: "Clark's Oyster Bar",
          address: "3807 Montrose Blvd",
          zipCode: "77006",
          distance: "~0.8 mi",
          walkTime: "~16 min walk",
          cuisine: "Seafood / oyster bar",
          priceRange: "$$$",
          hours: "Check current hours",
          dogFriendly: "Check",
          website: "https://www.clarksoysterbar.com/locations/houston",
          instagram: null,
          description:
            "A polished New England-style oyster bar on Montrose Blvd. Clark's serves Gulf and East Coast oysters, daily catch, and classic cocktails in a bright, welcoming space with patio seating.",
        },
        {
          id: "tourao",
          name: "Tourao Brazilian",
          address: "4412 Montrose Blvd",
          zipCode: "77006",
          distance: "~0.8 mi",
          walkTime: "~16 min walk",
          cuisine: "Brazilian steakhouse (rodizio)",
          priceRange: "$$$",
          hours: "Check current hours",
          dogFriendly: "No",
          website: "https://mytourao.com",
          instagram: null,
          description:
            "All-you-can-eat Brazilian rodizio on Montrose Boulevard. Tourao's passadores carve fire-roasted meats tableside while the salad bar offers fresh options. A great option for group dinners and celebrations.",
        },
        {
          id: "niko-nikos",
          name: "Niko Niko's",
          address: "2520 Montrose Blvd",
          zipCode: "77006",
          distance: "~0.9 mi",
          walkTime: "~18 min walk",
          cuisine: "Greek",
          priceRange: "$$",
          hours: "Check current hours",
          dogFriendly: "Check",
          website: "https://www.nikonikos.com",
          instagram: null,
          description:
            "A Houston institution for over 40 years. Niko Niko's serves generous portions of Greek and Mediterranean classics — gyros, moussaka, pastitsio — with a family-friendly vibe and a loyal following.",
        },
      ],
    },
    {
      id: "worth-the-drive",
      title: "Worth the Short Drive",
      description: "Not quite walkable, but worth the quick trip.",
      venues: [
        {
          id: "cuchara",
          name: "Cuchara",
          address: "214 Fairview St",
          zipCode: "77006",
          distance: "~0.7 mi",
          walkTime: "~14 min walk",
          cuisine: "Mexico City-style",
          priceRange: "$$$",
          hours: "Check current hours",
          dogFriendly: "Check",
          website: null,
          instagram: null,
          description:
            "Mexico City-inspired cuisine in a warm, art-filled Montrose setting. Cuchara's menu rotates seasonally with dishes rooted in traditional Mexican cooking — think moles, ceviches, and mezcal-forward cocktails.",
        },
        {
          id: "rosie-cannonball",
          name: "Rosie Cannonball",
          address: "1620 Westheimer Rd",
          zipCode: "77006",
          distance: "~0.6 mi",
          walkTime: "~12 min walk",
          cuisine: "Italian-inspired",
          priceRange: "$$$",
          hours: "Check current hours",
          dogFriendly: "Check",
          website: null,
          instagram: null,
          description:
            "Italian-inspired dishes and handmade pastas in a lively, eclectic atmosphere on Westheimer. Part of the Underbelly Hospitality group, Rosie Cannonball pairs approachable Italian cooking with a fun, neighborhood-bar energy.",
        },
      ],
    },
  ] as const satisfies readonly SubpageVenueTier[],

  faqs: [
    {
      question:
        "What are the best restaurants within walking distance of Montrose?",
      answer:
        "Montrose is home to some of Houston's most acclaimed dining. Within walking distance of Mount Vernon Lofts, you'll find The Pit Room (Michelin Bib Gourmand Texas BBQ), BCN Taste & Tradition (Michelin one star Spanish fine dining), Hugo's (James Beard Award-winning regional Mexican), and Uchi (inventive Japanese). These are all along Westheimer Road and Montrose Boulevard, making dinner out as easy as a short walk through the neighborhood.",
    },
    {
      question:
        "Are there Michelin-starred restaurants in Montrose Houston?",
      answer:
        "Yes. BCN Taste & Tradition on Roseland Street holds a Michelin star for its Barcelona-inspired tasting menu — and it's about a 10-minute walk from Mount Vernon Lofts. The Pit Room also earned a Michelin Bib Gourmand designation, which recognizes high-quality food at a great value. Both are in the immediate Montrose area.",
    },
    {
      question:
        "What restaurants in Montrose have outdoor or dog-friendly patios?",
      answer:
        "Several Montrose restaurants offer patio seating, including Clark's Oyster Bar, Niko Niko's, and The Toasted Coconut. Dog-friendly policies vary by restaurant and may be limited to patio areas, so it's best to check directly with each venue before bringing your pet. Most Montrose spots are welcoming, but policies change seasonally.",
    },
  ] as const satisfies readonly SubpageFAQItem[],

  mvlCallout: {
    icon: "\uD83C\uDF7D\uFE0F",
    headline: "LIVE WHERE YOU EAT",
    body: "Mount Vernon Lofts at 4509 Mount Vernon St puts you within walking distance of Michelin-recognized dining, a James Beard Award winner, and dozens of neighborhood favorites. Skip the rideshare — dinner is a short walk away.",
    pricingLine: "Studios from the $215Ks | 1-beds from the $250Ks",
    scoreLine: "Walk Score: 74 (Very Walkable)",
  } as const satisfies SubpageMVLCallout,
} as const
