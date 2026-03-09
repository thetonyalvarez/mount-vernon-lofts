import type {
  TransitRoute,
  SubpageQuickStat,
  SubpageFAQItem,
  SubpageMVLCallout,
} from "@/app/config/neighborhood-subpage-types"

export interface MetroRailLine {
  readonly name: string
  readonly color: string
  readonly description: string
  readonly nearestStation: string
  readonly distance: string
}

export interface FareInfo {
  readonly type: string
  readonly price: string
  readonly notes: string
}

export const metroRailLines: readonly MetroRailLine[] = [
  {
    name: "Red Line",
    color: "#E31937",
    description:
      "North-south from NRG Park through Medical Center, Museum District, Midtown, and Downtown. Primary rail line.",
    nearestStation: "Museum District",
    distance: "~0.8 mi",
  },
  {
    name: "Green Line",
    color: "#00A651",
    description:
      "East-west from Magnolia Transit Center to Theater District. Transfer at Theater District from Red Line.",
    nearestStation: "Theater District (transfer)",
    distance: "Transfer from Red Line",
  },
  {
    name: "Purple Line",
    color: "#662D91",
    description:
      "Southeast from Theater District to Palm Center. Transfer at Theater District from Red Line.",
    nearestStation: "Theater District (transfer)",
    distance: "Transfer from Red Line",
  },
] as const

export const fareInfo: readonly FareInfo[] = [
  {
    type: "Local Bus / METRORail",
    price: "$1.25",
    notes: "Standard fare for all local routes and rail",
  },
  {
    type: "Reduced Fare",
    price: "$0.60",
    notes: "Seniors, students, disabled, Medicare holders",
  },
  {
    type: "Day Pass",
    price: "$3.00",
    notes: "Unlimited rides for the day",
  },
  {
    type: "Park & Ride Express",
    price: "$2.00-$4.50",
    notes: "Depends on zone",
  },
  {
    type: "Route 500 Airport Direct",
    price: "$4.50",
    notes: "One-way to IAH or HOU",
  },
] as const

export const paymentMethods: readonly string[] = [
  "RideMETRO app",
  "METRO Q Fare Card",
  "Contactless credit/debit cards",
  "Mobile wallets (Apple Pay, Google Pay)",
  "Exact cash on buses",
] as const

export const transitData = {
  slug: "transit",
  name: "Transit",
  lastUpdated: "March 2026",

  quickStats: [
    { label: "Transit Score", value: "61 (Excellent Transit)" },
    { label: "Walk Score", value: "74 (Very Walkable)" },
    { label: "Bike Score", value: "73 (Very Bikeable)" },
    { label: "Nearest bus stop", value: "~0.1 mi" },
  ] as const satisfies readonly SubpageQuickStat[],

  transitRoutes: [
    {
      name: "Route 25 Richmond",
      nearestStop: "Richmond Ave @ Mt Vernon St",
      distance: "~0.1 mi",
      walkTime: "~2 min walk",
      details:
        "Runs east-west along Richmond Ave connecting Eastwood TC to Mission Bend TC. 114 stops. Closest bus stop to MVL — at the Richmond/Mount Vernon intersection itself.",
      frequency: "Check current schedule",
    },
    {
      name: "Route 56 Airline/Montrose",
      nearestStop: "Montrose Blvd @ W Alabama St",
      distance: "~0.2 mi",
      walkTime: "~4 min walk",
      details:
        "Runs north-south on Montrose Blvd: TMC TC to Greenspoint TC. Every 20 min weekday / 30 min weekend. 105 stops, ~67 min full route. BOOST 56 upgrades underway.",
      frequency: "Every 20 min weekday / 30 min weekend",
    },
    {
      name: "Route 82 Westheimer",
      nearestStop: "Westheimer Rd @ Dunlavy St",
      distance: "~0.4 mi",
      walkTime: "~8 min walk",
      details:
        "High-frequency red route — one of METRO's busiest. Runs east-west along Westheimer. Every 15 min or better peak; every 10 min Fri-Sat, ~12-15 min Sunday.",
      frequency: "Every 10-15 min",
    },
    {
      name: "METRORail Red Line",
      nearestStop: "Museum District station",
      distance: "~0.8 mi",
      walkTime: "~15 min walk",
      details:
        "Red Line station with north-south service to Downtown, Midtown, TMC, NRG Park. Trains every 6-15 minutes during peak hours.",
      frequency: "Every 6-15 min peak",
    },
  ] as const satisfies readonly TransitRoute[],

  faqs: [
    {
      question: "What is the Transit Score for Montrose Houston?",
      answer:
        "Montrose has a Transit Score of 61 (\"Excellent Transit\"), significantly above Houston's citywide average. This reflects access to METRORail, multiple METRO bus routes, and frequent-service corridors along Westheimer and Richmond.",
    },
    {
      question: "Can I live in Montrose without a car?",
      answer:
        "It depends on your lifestyle and commute. Montrose has a Walk Score of 74 — most daily errands are walkable. METRORail connects Downtown, Midtown, Medical Center, and NRG Park. Bus routes on Westheimer and Richmond cover east-west travel. Destinations outside the inner loop typically need rideshare or a car. Many Montrose residents own a car but use it far less than in other Houston neighborhoods.",
    },
    {
      question:
        "What is the closest METRORail station to Montrose?",
      answer:
        "The Museum District station on the Red Line is approximately 0.8 miles (~15 min walk) from Mount Vernon Lofts. The Red Line runs north-south from NRG Park through Medical Center, Museum District, Midtown, and Downtown. Trains run every 6-15 minutes during peak hours.",
    },
    {
      question: "How much does METRO bus and rail cost?",
      answer:
        "Local bus and METRORail fares are $1.25 each. A Day Pass is $3.00 for unlimited rides. Park & Ride express routes cost $2.00-$4.50 depending on zone. Route 500 airport shuttle is $4.50 one-way. You can pay via the RideMETRO app, Q Fare Card, contactless credit/debit cards, mobile wallets (Apple Pay, Google Pay), or exact cash on buses.",
    },
    {
      question:
        "How do I get to the airport from Montrose by transit?",
      answer:
        "Walk or take a bus to the Museum District METRORail station, then ride the Red Line to Downtown (~10 min). Transfer to Route 500 Downtown Direct, which goes to Bush Intercontinental (IAH) or Hobby Airport (HOU). Route 500 runs every 30 minutes.",
    },
  ] as const satisfies readonly SubpageFAQItem[],

  mvlCallout: {
    icon: "\uD83D\uDE8C",
    headline: "TRANSIT-ACCESSIBLE CONDO IN MONTROSE",
    body: "Mount Vernon Lofts has a Transit Score of 61 — one of the highest for any Houston address. Three bus routes within 0.4 miles. METRORail within 0.8 miles. Walk Score 74.",
    pricingLine: "Studios from the $215Ks | 1-beds from the $250Ks",
    scoreLine: "Transit Score: 61 | Walk Score: 74 | Bike Score: 73",
  } as const satisfies SubpageMVLCallout,
} as const
