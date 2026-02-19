// Neighborhood venues and points of interest
// Source: brand-guidelines.json verifiedNeighborhoodVenues (last verified 2026-02-18)
// All venues confirmed open and operating as of date above.
// Confirm before using in marketing — restaurants close.

export interface Venue {
  readonly name: string
  readonly address: string
  readonly distance: string
  readonly link: string | null
  readonly instagram: string | null
  readonly note: string
}

export interface VenueCategory {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly venues: readonly Venue[]
}

export const neighborhoodVenues: readonly VenueCategory[] = [
  {
    id: "coffee",
    title: "Coffee & Cafes",
    description:
      "Start your morning without getting in the car. Multiple coffee spots within walking distance of MVL.",
    venues: [
      {
        name: "Black Hole Coffee House",
        address: "4504 Graustark St",
        distance: "~0.4 mi",
        link: null,
        instagram: "https://www.instagram.com/blackholecoffee/",
        note: "Open 6:30am-midnight daily. Also wine, beer, pastries. Dog-friendly patio.",
      },
      {
        name: "Siphon Coffee",
        address: "701 W Alabama St",
        distance: "~0.5 mi",
        link: "https://www.siphoncoffee.com",
        instagram: null,
        note: "Montrose staple. Also serves food, beer, wine.",
      },
      {
        name: "Matcha Mia",
        address: "607 Richmond Ave",
        distance: "~0.3 mi",
        link: null,
        instagram: "https://www.instagram.com/hellomatchamia/",
        note: "Matcha bar + cafe. Montrose location opened 2025. Ceremonial-grade matcha, smoothies, waffles.",
      },
    ],
  },
  {
    id: "dining",
    title: "Restaurants",
    description:
      "Dozens of restaurants within walking distance — from James Beard winners to casual neighborhood spots.",
    venues: [
      {
        name: "Hugo's",
        address: "1600 Westheimer Rd",
        distance: "~0.6 mi",
        link: "https://hugosrestaurant.net",
        instagram: null,
        note: "James Beard Award-winning Mexican. In Montrose.",
      },
      {
        name: "Uchi Houston",
        address: "904 Westheimer Rd",
        distance: "~0.7 mi",
        link: "https://uchirestaurants.com/uchi/houston",
        instagram: null,
        note: "Japanese cuisine. Dinner only (4pm+). In Montrose.",
      },
      {
        name: "Niko Niko's",
        address: "2520 Montrose Blvd",
        distance: "~0.9 mi",
        link: "https://www.nikonikos.com",
        instagram: null,
        note: "Greek. Casual. On Montrose Blvd.",
      },
      {
        name: "The Pit Room",
        address: "1201 Richmond Ave",
        distance: "~0.5 mi",
        link: "https://thepitroombbq.com",
        instagram: null,
        note: "Texas BBQ. Michelin Bib Gourmand. Breakfast tacos 7-10:30am, BBQ 11am-9pm.",
      },
      {
        name: "BCN Taste & Tradition",
        address: "4210 Roseland St",
        distance: "~0.5 mi",
        link: "https://www.bcnhouston.com",
        instagram: null,
        note: "Michelin one-star Spanish. In a 1920s bungalow. Dinner only.",
      },
      {
        name: "Tourao Brazilian Churrasqueria",
        address: "4412 Montrose Blvd",
        distance: "~0.8 mi",
        link: "https://mytourao.com",
        instagram: null,
        note: "Brazilian steakhouse. Rodizio-style. On Montrose Blvd.",
      },
      {
        name: "The Toasted Coconut",
        address: "1617 Richmond Ave",
        distance: "~0.4 mi",
        link: "https://www.gettoastedhtx.com",
        instagram: null,
        note: "Tiki-inspired bar & restaurant. Closed Mondays.",
      },
      {
        name: "Handies Douzo",
        address: "4005 Montrose Blvd",
        distance: "~0.7 mi",
        link: "https://www.handiesdouzo.com",
        instagram: null,
        note: "Hand roll sushi bar. Casual, no tables. On Montrose Blvd.",
      },
      {
        name: "Clark's Oyster Bar",
        address: "3807 Montrose Blvd",
        distance: "~0.8 mi",
        link: "https://www.clarksoysterbar.com/locations/houston",
        instagram: null,
        note: "Austin-based oyster bar. Near Menil Collection. On Montrose Blvd.",
      },
    ],
  },
  {
    id: "parks",
    title: "Parks & Outdoors",
    description:
      "Green space and trails within walking distance — a rarity in Houston's inner loop.",
    venues: [
      {
        name: "Ervan Chew Dog Park",
        address: "4502 Dunlavy St",
        distance: "~0.3 mi",
        link: null,
        instagram: null,
        note: "Off-leash dog park. Fenced, ~9,000 SF. Also has splash pad, playground, basketball court.",
      },
      {
        name: "Buffalo Bayou Park",
        address: "Buffalo Bayou",
        distance: "~1 mi",
        link: "https://buffalobayou.org",
        instagram: null,
        note: "Hike-and-bike trail. Short walk or bike ride.",
      },
    ],
  },
  {
    id: "culture",
    title: "Museums & Culture",
    description:
      "The Museum District is less than a mile away — 19 world-class museums, many with free admission.",
    venues: [
      {
        name: "The Menil Collection",
        address: "1533 Sul Ross St",
        distance: "~0.8 mi",
        link: "https://menil.org",
        instagram: null,
        note: "Always free. World-class art museum.",
      },
      {
        name: "Rothko Chapel",
        address: "3900 Yupon St",
        distance: "~0.7 mi",
        link: "https://rothkochapel.org",
        instagram: null,
        note: "Free. Meditative art space.",
      },
      {
        name: "Museum of Fine Arts, Houston",
        address: "1001 Bissonnet St",
        distance: "~1 mi",
        link: "https://mfah.org",
        instagram: null,
        note: "One of the 10 largest art museums in the US.",
      },
    ],
  },
  {
    id: "nearby",
    title: "Worth the Short Drive",
    description:
      "Not walkable from MVL, but a quick drive or rideshare away.",
    venues: [
      {
        name: "Tacos A Go Go",
        address: "3704 Main St (Midtown)",
        distance: "~1.5 mi",
        link: "https://tacosagogo.com",
        instagram: null,
        note: "No Montrose location. Nearest is Midtown.",
      },
      {
        name: "Continental Club",
        address: "3700 Main St (Midtown)",
        distance: "~1.5 mi",
        link: "https://continentalclub.com/houston",
        instagram: null,
        note: "Live music venue. In Midtown, not Montrose. Short drive.",
      },
      {
        name: "Alley Theatre",
        address: "615 Texas Ave (Downtown)",
        distance: "~4 mi",
        link: "https://www.alleytheatre.org",
        instagram: null,
        note: "Professional theater. Downtown Houston. 10-15 minute drive.",
      },
    ],
  },
] as const

// Location highlights from brand guidelines
export const locationHighlights: readonly string[] = [
  "Montrose: One of Houston's most walkable, creative, and sought-after inner-loop neighborhoods.",
  "Steps from coffee shops, restaurants, bars, and boutiques on Westheimer and Montrose Blvd.",
  "10-minute commute to Texas Medical Center, Museum District, and Downtown.",
  "Museum District less than a mile away — 19+ world-class museums including the Menil Collection (always free).",
  "Bike-friendly streets and proximity to Buffalo Bayou trails.",
  "Ervan Chew Dog Park — off-leash dog park at 4502 Dunlavy St, walking distance from MVL.",
] as const
