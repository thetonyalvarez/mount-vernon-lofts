// Neighborhood timeline data configuration

export interface TimelineItem {
  time: string
  title: string
  description: string
  venues: {
    name: string
    link?: string
  }[]
  image: string
  alt: string
}

export const montroseTimeline: TimelineItem[] = [
  {
    time: "7 AM",
    title: "Morning in Montrose",
    description:
      "Start your day with a coffee run on foot. Montrose is one of Houston's most walkable neighborhoods — Black Hole Coffee is steps from your front door, or grab a cortado at Siphon Coffee down the street. Buffalo Bayou's hike-and-bike trail is a short walk away for morning runs.",
    venues: [
      { name: "BLACK HOLE COFFEE", link: "https://www.instagram.com/blackholecoffee/" },
      { name: "SIPHON COFFEE", link: "https://www.siphoncoffee.com" },
      { name: "BUFFALO BAYOU PARK", link: "https://buffalobayou.org" },
    ],
    image: "/images/neighborhood/coffee.jpg",
    alt: "Morning coffee in Montrose",
  },
  {
    time: "12 PM",
    title: "Lunch Break, Your Way",
    description:
      "Step out for lunch at one of dozens of nearby restaurants. Montrose has everything from Niko Niko's Greek on Montrose Blvd to Uchi's Japanese cuisine on Westheimer. The diversity of food within a few blocks is one of the best parts of living here.",
    venues: [
      { name: "NIKO NIKO'S", link: "https://www.nikonikos.com" },
      { name: "UCHI HOUSTON", link: "https://uchirestaurants.com/uchi/houston" },
      { name: "HUGO'S", link: "https://hugosrestaurant.net" },
    ],
    image: "/images/neighborhood/brunch.jpg",
    alt: "Lunch at a Montrose restaurant",
  },
  {
    time: "3 PM",
    title: "Afternoon Culture",
    description:
      "The Museum District is less than a mile away — 19 world-class museums including the Menil Collection (always free), MFAH, and the Rothko Chapel. Or stay in Montrose and browse the galleries, vintage shops, and bookstores that give the neighborhood its character.",
    venues: [
      { name: "THE MENIL COLLECTION", link: "https://menil.org" },
      { name: "MUSEUM OF FINE ARTS", link: "https://mfah.org" },
      { name: "ROTHKO CHAPEL", link: "https://rothkochapel.org" },
    ],
    image: "/images/neighborhood/gallery.jpg",
    alt: "Museum District near Montrose",
  },
  {
    time: "7 PM",
    title: "Montrose Evenings",
    description:
      "Dinner is a walk away. Hugo's for James Beard Award-winning Mexican, Uchi for Japanese, or Niko Niko's for something casual. After dinner, catch live music at Continental Club in Midtown or a show at the Alley Theatre downtown — both a short drive or rideshare away.",
    venues: [
      { name: "HUGO'S", link: "https://hugosrestaurant.net" },
      { name: "CONTINENTAL CLUB", link: "https://continentalclub.com/houston" },
      { name: "ALLEY THEATRE", link: "https://www.alleytheatre.org" },
    ],
    image: "/images/neighborhood/dinner.jpg",
    alt: "Evening dining in Montrose",
  },
]
