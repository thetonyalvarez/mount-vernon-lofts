/**
 * Unit Type Page Data for Mount Vernon Lofts
 * Central data source for 6 individual unit type pages
 * Extends floor-plan-data.ts with prices, body copy, SEO, photos, Matterport, PDFs
 */

// Floor plan data helpers are re-exported for use by section components
export { getFloorPlanById, getAvailableCountByFloorPlan } from './floor-plan-data'

export interface UnitPhoto {
  readonly src: string
  readonly alt: string
  readonly title: string
}

export interface UnitTypePageData {
  readonly slug: string
  readonly floorPlanId: string
  readonly layoutName: string
  readonly unitType: 'Studio' | '1-Bedroom'
  readonly sqft: number
  readonly bedrooms: number
  readonly bathrooms: number
  readonly price: number
  readonly priceFormatted: string
  readonly pricePerSF: string
  readonly unitCount: number
  readonly availabilityStatus: 'available' | 'waitlist'
  readonly availabilityText: string
  readonly floors: string
  readonly schemaAvailability: string
  readonly matterportUrl: string | null
  readonly matterportHeader: string | null
  readonly matterportSubtext: string | null
  readonly floorPlanPdfUrl: string | null
  readonly floorPlanPdfLabel: string | null
  readonly photos: ReadonlyArray<UnitPhoto>
  readonly features: {
    readonly unit: ReadonlyArray<string>
    readonly kitchenBath: ReadonlyArray<string>
  }
  readonly bodyContent: {
    readonly headline: string
    readonly paragraphs: ReadonlyArray<string>
  }
  readonly seo: {
    readonly title: string
    readonly description: string
    readonly ogTitle: string
    readonly ogDescription: string
  }
  readonly cta: {
    readonly buttonText: string
    readonly formPreFill: string
    readonly hiddenUnitType: string
  }
  readonly schema: {
    readonly accommodationCategory: string
    readonly numberOfRooms: number
    readonly breadcrumbName: string
  }
}

export const buildingSnapshot = {
  yearBuilt: 2018,
  hoa: '$300/month (includes water)',
  parking: '1 covered space per unit',
  pets: 'Dogs welcome — 2 per handler, $75 registration, breed restrictions',
  neighborhood: 'Montrose — one of Houston\'s most walkable neighborhoods',
  nearby: 'Black Hole Coffee (0.4 mi), Menil Collection (0.8 mi), Buffalo Bayou Park (1 mi)',
} as const

export const unitTypePages: ReadonlyArray<UnitTypePageData> = [
  {
    slug: 'studio-s1',
    floorPlanId: 'studio-s1',
    layoutName: 'S1',
    unitType: 'Studio',
    sqft: 612,
    bedrooms: 0,
    bathrooms: 1,
    price: 215124,
    priceFormatted: '$215,124',
    pricePerSF: '$351/SF',
    unitCount: 32,
    availabilityStatus: 'available',
    availabilityText: 'Available — 2 units',
    floors: '2nd & 3rd',
    schemaAvailability: 'https://schema.org/InStock',
    matterportUrl: 'https://my.matterport.com/show/?m=8oRQg3EZnp8&play=1&qs=1&brand=0&title=0',
    matterportHeader: 'Walk Through This Studio in 3D',
    matterportSubtext: 'Explore the S1 layout as if you were there. Click and drag to move through the space.',
    floorPlanPdfUrl: 'https://mount-vernon-lofts.s3.us-east-2.amazonaws.com/floor-plans/Mount+Vernon+Lofts+-+Floor+Plans+(Web)_STD_S11.pdf',
    floorPlanPdfLabel: 'Download Studio S1 Floor Plan (PDF)',
    photos: [
      { src: '/images/unit-26_studio/26-1.jpg', alt: 'Open kitchen and living area in a Mount Vernon Lofts studio', title: 'Open Kitchen & Living' },
      { src: '/images/unit-26_studio/26-2.jpg', alt: 'Living area with sectional sofa in a studio unit', title: 'Living Area' },
      { src: '/images/unit-26_studio/26-4.jpg', alt: 'Kitchen with modern finishes in a studio unit', title: 'Kitchen' },
      { src: '/images/unit-26_studio/26-7.jpg', alt: 'Living room with natural light in a studio unit', title: 'Living Room' },
      { src: '/images/unit-26_studio/26-10.jpg', alt: 'Bed area with natural light in a studio unit', title: 'Bed Area' },
      { src: '/images/unit-26_studio/26-11.jpg', alt: 'Bathroom in a Mount Vernon Lofts studio', title: 'Bathroom' },
    ],
    features: {
      unit: [
        '612 square feet open floor plan',
        'Studio layout with defined sleeping area',
        'Large windows with natural light',
        'In-unit full-size washer and dryer',
        'Individual HVAC system',
        '1 covered parking space',
      ],
      kitchenBath: [
        'Granite countertops',
        'European-style cabinetry',
        'Tile backsplash',
        'Stainless steel appliances',
        'Modern bathroom with clean finishes',
      ],
    },
    bodyContent: {
      headline: 'The Studio That Makes Montrose Ownership Possible',
      paragraphs: [
        'The S1 is the most attainable entry point to homeownership in one of Houston\'s most sought-after neighborhoods. At 612 square feet with an open floor plan, this studio maximizes every inch — natural light fills the space through large windows, and the kitchen-to-living flow makes the layout feel larger than its footprint suggests. Starting at $215,124, the S1 puts Montrose ownership within reach for first-time buyers, young professionals, and anyone tired of paying rent with nothing to show for it.',
        'Every S1 comes move-in ready with granite countertops, European-style cabinetry, tile backsplash, and an in-unit washer and dryer — no shared laundry rooms, no trips to the laundromat. Each unit includes one covered parking space and its own individual HVAC system. The building was constructed in 2018 with concrete foundation and modern systems throughout, so you\'re buying into a newer building without the maintenance surprises of older Houston condos.',
        'With 32 S1 studios across two residential floors, this is the most available layout at Mount Vernon Lofts — but that availability won\'t last. At $351 per square foot, the S1 is priced below the Montrose median, and it\'s one of the only paths to ownership under $220K in this zip code. HOA fees are $300 per month and include water, keeping monthly costs predictable and low.',
      ],
    },
    seo: {
      title: 'Studio S1 — 612 SF Condo from $215K | Mount Vernon Lofts, Montrose',
      description: 'Studio condo in Montrose, Houston. 612 sq ft open floor plan starting at $215,124. 3D virtual tour available. In-unit W/D, covered parking, $300/mo HOA. Built 2018.',
      ogTitle: 'Studio S1 — 612 SF from $215K | Mount Vernon Lofts',
      ogDescription: 'Open-concept studio in Montrose. 612 SF, granite countertops, in-unit W/D, covered parking. Starting at $215K.',
    },
    cta: {
      buttonText: 'Request Studio S1 Details',
      formPreFill: 'Studio',
      hiddenUnitType: 'S1',
    },
    schema: {
      accommodationCategory: 'Studio Condominium',
      numberOfRooms: 1,
      breadcrumbName: 'Studio S1',
    },
  },
  {
    slug: 'studio-s2',
    floorPlanId: 'studio-s2',
    layoutName: 'S2',
    unitType: 'Studio',
    sqft: 705,
    bedrooms: 0,
    bathrooms: 1,
    price: 237585,
    priceFormatted: '$237,585',
    pricePerSF: '$337/SF',
    unitCount: 2,
    availabilityStatus: 'waitlist',
    availabilityText: 'Waitlist',
    floors: '2nd & 3rd',
    schemaAvailability: 'https://schema.org/PreOrder',
    matterportUrl: null,
    matterportHeader: null,
    matterportSubtext: null,
    floorPlanPdfUrl: null,
    floorPlanPdfLabel: null,
    photos: [
      { src: '/images/unit-26_studio/26-1.jpg', alt: 'Open kitchen and living area in a Mount Vernon Lofts studio', title: 'Open Kitchen & Living' },
      { src: '/images/unit-26_studio/26-2.jpg', alt: 'Living area in a studio unit', title: 'Living Area' },
      { src: '/images/unit-26_studio/26-4.jpg', alt: 'Kitchen with modern finishes in a studio unit', title: 'Kitchen' },
      { src: '/images/unit-26_studio/26-7.jpg', alt: 'Living room with natural light in a studio unit', title: 'Living Room' },
      { src: '/images/unit-26_studio/26-10.jpg', alt: 'Bed area with natural light in a studio unit', title: 'Bed Area' },
      { src: '/images/unit-26_studio/26-11.jpg', alt: 'Bathroom in a Mount Vernon Lofts studio', title: 'Bathroom' },
    ],
    features: {
      unit: [
        '705 square feet — expanded open layout',
        '15% more space than standard studio',
        'Large windows with natural light throughout',
        'In-unit full-size washer and dryer',
        'Individual HVAC system',
        '1 covered parking space',
      ],
      kitchenBath: [
        'Granite countertops',
        'European-style cabinetry',
        'Tile backsplash',
        'Stainless steel appliances',
        'Modern bathroom with clean finishes',
      ],
    },
    bodyContent: {
      headline: 'More Space, Still a Studio — The S2 Advantage',
      paragraphs: [
        'The S2 is Mount Vernon Lofts\' expanded studio layout, offering 705 square feet — 15% more living space than the standard S1. That extra room makes a real difference: more room for a dedicated workspace, a larger living area, or simply more breathing room in the open floor plan. At $237,585, the S2 delivers significantly more square footage at a lower per-square-foot cost ($337/SF vs. $351/SF for the S1), making it the value play for buyers who want studio simplicity with more elbow room.',
        'Like every unit at Mount Vernon Lofts, the S2 comes with granite countertops, European-style cabinetry, in-unit washer and dryer, one covered parking space, and individual HVAC. The building was built in 2018 with concrete foundation and modern systems — move-in ready with no renovation needed. Large windows flood the space with natural light from morning to evening.',
        'With only 2 S2 units in the entire building, this is one of the most limited layouts at Mount Vernon Lofts. Both are currently on the waitlist. If the expanded studio layout appeals to you, get on the list early — when an S2 becomes available, it won\'t stay on the market long in a neighborhood where the median home price exceeds $700K.',
      ],
    },
    seo: {
      title: 'Studio S2 — 705 SF Condo from $237K | Mount Vernon Lofts, Montrose',
      description: 'Expanded studio condo in Montrose, Houston. 705 sq ft open layout starting at $237,585. In-unit W/D, covered parking, $300/mo HOA. Built 2018. Tour by appointment.',
      ogTitle: 'Studio S2 — 705 SF from $237K | Mount Vernon Lofts',
      ogDescription: 'Expanded studio in Montrose. 705 SF with extra living space, granite countertops, in-unit W/D. Starting at $237K.',
    },
    cta: {
      buttonText: 'Join the Studio S2 Waitlist',
      formPreFill: 'Studio',
      hiddenUnitType: 'S2',
    },
    schema: {
      accommodationCategory: 'Studio Condominium',
      numberOfRooms: 1,
      breadcrumbName: 'Studio S2',
    },
  },
  {
    slug: '1bed-a1',
    floorPlanId: '1bed-a1',
    layoutName: 'A1',
    unitType: '1-Bedroom',
    sqft: 717,
    bedrooms: 1,
    bathrooms: 1,
    price: 252033,
    priceFormatted: '$252,033',
    pricePerSF: '$352/SF',
    unitCount: 2,
    availabilityStatus: 'available',
    availabilityText: 'Available — 1 unit',
    floors: '2nd & 3rd',
    schemaAvailability: 'https://schema.org/InStock',
    matterportUrl: null,
    matterportHeader: null,
    matterportSubtext: null,
    floorPlanPdfUrl: null,
    floorPlanPdfLabel: null,
    photos: [
      { src: '/images/unit-8_1-bed/8-1.jpg', alt: 'Bedroom in a 1-bedroom unit at Mount Vernon Lofts', title: 'Bedroom' },
      { src: '/images/unit-8_1-bed/8-2.jpg', alt: 'Bedroom with natural light in a 1-bedroom unit', title: 'Bedroom — Natural Light' },
      { src: '/images/unit-8_1-bed/8-4.jpg', alt: 'Living room in a 1-bedroom unit at Mount Vernon Lofts', title: 'Living Room' },
      { src: '/images/unit-8_1-bed/8-5.jpg', alt: 'Open living and kitchen area in a 1-bedroom unit', title: 'Open Living & Kitchen' },
      { src: '/images/unit-8_1-bed/8-6.jpg', alt: 'Kitchen close-up showing granite countertops', title: 'Kitchen Close-Up' },
      { src: '/images/unit-8_1-bed/8-8.jpg', alt: 'Bathroom in a 1-bedroom unit at Mount Vernon Lofts', title: 'Bathroom' },
    ],
    features: {
      unit: [
        '717 square feet with separate bedroom',
        '1 bedroom / 1 bathroom',
        'Open living area with natural light',
        'In-unit full-size washer and dryer',
        'Individual HVAC system',
        '1 covered parking space',
      ],
      kitchenBath: [
        'Granite countertops',
        'European-style cabinetry',
        'Tile backsplash',
        'Stainless steel appliances',
        'Modern bathroom with clean finishes',
      ],
    },
    bodyContent: {
      headline: 'A Separate Bedroom in the Heart of Montrose — Under $253K',
      paragraphs: [
        'The A1 is Mount Vernon Lofts\' entry-level one-bedroom layout, delivering what many Houston buyers want most: a true separate bedroom at a price that makes inner loop ownership realistic. At 717 square feet, the A1 gives you a dedicated sleeping space behind a real wall and door — a meaningful upgrade from studio living when you work from home, host guests, or simply want separation between where you sleep and where you live. Starting at $252,033, this is one of the most affordable one-bedroom condos available in Montrose.',
        'The A1 features an open living and kitchen area with granite countertops, European-style cabinetry, and tile backsplash. In-unit washer and dryer, one covered parking space, and individual HVAC come standard. Built in 2018 with concrete foundation, the building\'s modern systems mean lower maintenance costs and no surprise assessments from aging infrastructure.',
        'Only 2 A1 units exist in the building, with 1 currently available. For buyers stepping up from a studio — or stepping into their first home with the privacy of a real bedroom — the A1 is the compact one-bedroom that doesn\'t compromise on location, finishes, or monthly affordability. HOA is $300/month including water.',
      ],
    },
    seo: {
      title: '1-Bed A1 — 717 SF Condo from $252K | Mount Vernon Lofts, Montrose',
      description: '1-bedroom condo in Montrose, Houston. 717 sq ft with separate bedroom starting at $252,033. In-unit W/D, covered parking, $300/mo HOA. Built 2018. Tour by appointment.',
      ogTitle: '1-Bed A1 — 717 SF from $252K | Mount Vernon Lofts',
      ogDescription: '1-bedroom condo in Montrose. 717 SF with separate bedroom, granite countertops, in-unit W/D. From $252K.',
    },
    cta: {
      buttonText: 'Request 1-Bed A1 Details',
      formPreFill: '1-Bedroom',
      hiddenUnitType: 'A1',
    },
    schema: {
      accommodationCategory: 'One-Bedroom Condominium',
      numberOfRooms: 2,
      breadcrumbName: '1-Bed A1',
    },
  },
  {
    slug: '1bed-a2',
    floorPlanId: '1bed-a2',
    layoutName: 'A2',
    unitType: '1-Bedroom',
    sqft: 719,
    bedrooms: 1,
    bathrooms: 1,
    price: 252736,
    priceFormatted: '$252,736',
    pricePerSF: '$352/SF',
    unitCount: 2,
    availabilityStatus: 'waitlist',
    availabilityText: 'Waitlist',
    floors: '2nd & 3rd',
    schemaAvailability: 'https://schema.org/PreOrder',
    matterportUrl: null,
    matterportHeader: null,
    matterportSubtext: null,
    floorPlanPdfUrl: null,
    floorPlanPdfLabel: null,
    photos: [
      { src: '/images/unit-8_1-bed/8-1.jpg', alt: 'Bedroom in a 1-bedroom unit at Mount Vernon Lofts', title: 'Bedroom' },
      { src: '/images/unit-8_1-bed/8-2.jpg', alt: 'Bedroom with natural light in a 1-bedroom unit', title: 'Bedroom — Natural Light' },
      { src: '/images/unit-8_1-bed/8-4.jpg', alt: 'Living room in a 1-bedroom unit at Mount Vernon Lofts', title: 'Living Room' },
      { src: '/images/unit-8_1-bed/8-5.jpg', alt: 'Open living and kitchen area in a 1-bedroom unit', title: 'Open Living & Kitchen' },
      { src: '/images/unit-8_1-bed/8-6.jpg', alt: 'Kitchen close-up showing granite countertops', title: 'Kitchen Close-Up' },
      { src: '/images/unit-8_1-bed/8-8.jpg', alt: 'Bathroom in a 1-bedroom unit at Mount Vernon Lofts', title: 'Bathroom' },
    ],
    features: {
      unit: [
        '719 square feet with separate bedroom',
        '1 bedroom / 1 bathroom',
        'Alternative floor plan configuration',
        'In-unit full-size washer and dryer',
        'Individual HVAC system',
        '1 covered parking space',
      ],
      kitchenBath: [
        'Granite countertops',
        'European-style cabinetry',
        'Tile backsplash',
        'Stainless steel appliances',
        'Modern bathroom with clean finishes',
      ],
    },
    bodyContent: {
      headline: 'The A2 — A Different Perspective on One-Bedroom Living',
      paragraphs: [
        'The A2 is a 719-square-foot one-bedroom layout that shares similar dimensions with the A1 but features a different floor plan configuration. At $252,736, it\'s priced comparably to its sibling layout, giving buyers who prefer a slightly different spatial arrangement an alternative without a significant price jump. The separate bedroom, open living area, and full kitchen make this a practical home for first-time buyers and young professionals who want more than a studio without stretching their budget.',
        'The A2 includes the same premium finishes found throughout Mount Vernon Lofts: granite countertops, European-style cabinetry, tile backsplash, in-unit washer and dryer, covered parking, and individual HVAC. Built in 2018, the building\'s modern construction means you\'re investing in a home with current building codes, efficient systems, and years of useful life ahead.',
        'With only 2 A2 units in the building and both currently on the waitlist, availability is limited. If you\'re comparing one-bedroom options, the A2 is worth seeing alongside the A1 — the difference in layout may suit your lifestyle better depending on how you use your space. Register for the waitlist to be notified the moment an A2 becomes available.',
      ],
    },
    seo: {
      title: '1-Bed A2 — 719 SF Condo from $252K | Mount Vernon Lofts, Montrose',
      description: '1-bedroom condo in Montrose, Houston. 719 sq ft with separate bedroom starting at $252,736. In-unit W/D, covered parking, $300/mo HOA. Built 2018. Tour by appointment.',
      ogTitle: '1-Bed A2 — 719 SF from $252K | Mount Vernon Lofts',
      ogDescription: '1-bedroom condo in Montrose. 719 SF, separate bedroom, granite countertops, in-unit W/D. From $252K.',
    },
    cta: {
      buttonText: 'Join the 1-Bed A2 Waitlist',
      formPreFill: '1-Bedroom',
      hiddenUnitType: 'A2',
    },
    schema: {
      accommodationCategory: 'One-Bedroom Condominium',
      numberOfRooms: 2,
      breadcrumbName: '1-Bed A2',
    },
  },
  {
    slug: '1bed-a3',
    floorPlanId: '1bed-a3',
    layoutName: 'A3',
    unitType: '1-Bedroom',
    sqft: 778,
    bedrooms: 1,
    bathrooms: 1,
    price: 271522,
    priceFormatted: '$271,522',
    pricePerSF: '$349/SF',
    unitCount: 2,
    availabilityStatus: 'waitlist',
    availabilityText: 'Waitlist',
    floors: '2nd & 3rd',
    schemaAvailability: 'https://schema.org/PreOrder',
    matterportUrl: 'https://my.matterport.com/show/?m=zaDtQodnWRH&play=1&qs=1&brand=0&title=0',
    matterportHeader: 'Walk Through This 1-Bedroom in 3D',
    matterportSubtext: 'Explore the A3 layout as if you were there. Click and drag to move through the space.',
    floorPlanPdfUrl: 'https://mount-vernon-lofts.s3.us-east-2.amazonaws.com/floor-plans/Mount+Vernon+Lofts+-+Floor+Plans+(Web)_1BD_A31.pdf',
    floorPlanPdfLabel: 'Download 1-Bed A3 Floor Plan (PDF)',
    photos: [
      { src: '/images/unit-9_1-bed/9-2.jpg', alt: 'Kitchen and dining area in a 1-bedroom unit', title: 'Kitchen & Dining' },
      { src: '/images/unit-9_1-bed/9-3.jpg', alt: 'Kitchen with island in a 1-bedroom unit', title: 'Kitchen with Island' },
      { src: '/images/unit-9_1-bed/9-4.jpg', alt: 'Living and dining area in a 1-bedroom unit', title: 'Living & Dining' },
      { src: '/images/unit-9_1-bed/9-6.jpg', alt: 'Living room in a 1-bedroom unit at Mount Vernon Lofts', title: 'Living Room' },
      { src: '/images/unit-9_1-bed/9-7.jpg', alt: 'Bathroom in a 1-bedroom unit at Mount Vernon Lofts', title: 'Bathroom' },
      { src: '/images/unit-9_1-bed/9-12.jpg', alt: 'Balcony with sunset view from a 1-bedroom unit', title: 'Balcony — Sunset' },
    ],
    features: {
      unit: [
        '778 square feet — spacious 1-bedroom layout',
        '1 bedroom / 1 bathroom',
        'Generous living area and bedroom',
        'In-unit full-size washer and dryer',
        'Individual HVAC system',
        '1 covered parking space',
      ],
      kitchenBath: [
        'Granite countertops',
        'European-style cabinetry',
        'Tile backsplash',
        'Stainless steel appliances',
        'Modern bathroom with clean finishes',
      ],
    },
    bodyContent: {
      headline: 'The Spacious One-Bedroom — 778 SF of Montrose Living',
      paragraphs: [
        'The A3 is where the one-bedroom layouts at Mount Vernon Lofts start to feel genuinely spacious. At 778 square feet, it\'s 8.5% larger than the A1/A2 layouts and offers noticeably more room in both the living area and bedroom. For buyers who want a true one-bedroom home — not just a studio with a wall — the A3 delivers space that feels like a real apartment you own, not rent. Starting at $271,522, it\'s priced at $349 per square foot, the lowest per-SF cost among all one-bedroom layouts.',
        'The larger footprint means more flexibility in how you arrange your space. A dedicated home office area, a full dining setup, or a more generous living room — the A3 gives you options the smaller layouts don\'t. All the standard finishes are included: granite countertops, European-style cabinetry, in-unit washer and dryer, covered parking, and individual HVAC. The 2018 construction with concrete foundation gives you peace of mind on building quality.',
        'Only 2 A3 units exist, and both are currently on the waitlist. This layout sits in a sweet spot — meaningfully more space than the A1/A2 at only $19K\u2013$20K more, while still staying under $275K. For buyers who can stretch slightly past the $250K mark, the A3 represents the best square footage value in the one-bedroom lineup. Join the waitlist now to be first in line.',
      ],
    },
    seo: {
      title: '1-Bed A3 — 778 SF Condo from $271K | Mount Vernon Lofts, Montrose',
      description: 'Spacious 1-bedroom condo in Montrose, Houston. 778 sq ft starting at $271,522. 3D virtual tour available. In-unit W/D, covered parking, $300/mo HOA. Built 2018.',
      ogTitle: '1-Bed A3 — 778 SF from $271K | Mount Vernon Lofts',
      ogDescription: 'Spacious 1-bedroom in Montrose. 778 SF with generous bedroom, granite countertops, in-unit W/D. From $271K.',
    },
    cta: {
      buttonText: 'Join the 1-Bed A3 Waitlist',
      formPreFill: '1-Bedroom',
      hiddenUnitType: 'A3',
    },
    schema: {
      accommodationCategory: 'One-Bedroom Condominium',
      numberOfRooms: 2,
      breadcrumbName: '1-Bed A3',
    },
  },
  {
    slug: '1bed-a4',
    floorPlanId: '1bed-a4',
    layoutName: 'A4',
    unitType: '1-Bedroom',
    sqft: 799,
    bedrooms: 1,
    bathrooms: 1,
    price: 278851,
    priceFormatted: '$278,851',
    pricePerSF: '$349/SF',
    unitCount: 2,
    availabilityStatus: 'available',
    availabilityText: 'Available — 1 unit',
    floors: '2nd & 3rd',
    schemaAvailability: 'https://schema.org/InStock',
    matterportUrl: 'https://my.matterport.com/show/?m=3yQPMPJaXyN&play=1&qs=1&brand=0&title=0',
    matterportHeader: 'Walk Through This 1-Bedroom in 3D',
    matterportSubtext: 'Explore the A4 layout — our largest — as if you were there. Click and drag to move through the space.',
    floorPlanPdfUrl: 'https://mount-vernon-lofts.s3.us-east-2.amazonaws.com/floor-plans/Mount+Vernon+Lofts+-+Floor+Plans+(Web)_1BD_A41.pdf',
    floorPlanPdfLabel: 'Download 1-Bed A4 Floor Plan (PDF)',
    photos: [
      { src: '/images/unit-9_1-bed/9-2.jpg', alt: 'Kitchen and dining area in a 1-bedroom unit', title: 'Kitchen & Dining' },
      { src: '/images/unit-9_1-bed/9-3.jpg', alt: 'Kitchen with island in a 1-bedroom unit', title: 'Kitchen with Island' },
      { src: '/images/unit-9_1-bed/9-4.jpg', alt: 'Living and dining area in a 1-bedroom unit', title: 'Living & Dining' },
      { src: '/images/unit-9_1-bed/9-6.jpg', alt: 'Living room in a 1-bedroom unit at Mount Vernon Lofts', title: 'Living Room' },
      { src: '/images/unit-9_1-bed/9-7.jpg', alt: 'Bathroom in a 1-bedroom unit at Mount Vernon Lofts', title: 'Bathroom' },
      { src: '/images/unit-9_1-bed/9-12.jpg', alt: 'Balcony with sunset view from a 1-bedroom unit', title: 'Balcony — Sunset' },
    ],
    features: {
      unit: [
        '799 square feet — largest layout in the building',
        '1 bedroom / 1 bathroom',
        'Most generous living and bedroom proportions',
        'In-unit full-size washer and dryer',
        'Individual HVAC system',
        '1 covered parking space',
      ],
      kitchenBath: [
        'Granite countertops with extra counter space',
        'European-style cabinetry',
        'Tile backsplash',
        'Stainless steel appliances',
        'Modern bathroom with clean finishes',
      ],
    },
    bodyContent: {
      headline: 'The Largest Layout at Mount Vernon Lofts — 799 SF of Montrose',
      paragraphs: [
        'The A4 is the flagship layout at Mount Vernon Lofts. At 799 square feet, it\'s the largest unit in the building — and for buyers who want the most space Montrose ownership can offer under $280K, this is it. The A4 gives you a generous separate bedroom, a full open-concept living and kitchen area with room for real furniture, and the kind of natural light and proportions that make this feel like a home, not a compromise. Starting at $278,851, the A4 shares the same $349/SF pricing as the A3, meaning you get the most square footage at the building\'s best per-foot value.',
        'Finishes match the rest of the building — granite countertops, European-style cabinetry, tile backsplash, stainless steel appliances — but in the A4, you have more counter space, more cabinet space, and more room to live. In-unit washer and dryer, one covered parking space, and individual HVAC come standard. The 2018 construction means modern building systems, concrete foundation, and no deferred maintenance concerns.',
        'Only 2 A4 units exist in the entire building, and 1 is currently available. For a buyer considering the jump from studio to one-bedroom, the A4 is the top of the line — the most space, the best per-SF value, and a layout that genuinely works as a primary residence. In a neighborhood where the median home price exceeds $700K, owning 799 square feet in Montrose for under $280K is a rare opportunity. It won\'t be available forever.',
      ],
    },
    seo: {
      title: '1-Bed A4 — 799 SF Condo from $278K | Mount Vernon Lofts, Montrose',
      description: 'Largest 1-bedroom condo at Mount Vernon Lofts in Montrose, Houston. 799 sq ft starting at $278,851. 3D virtual tour available. In-unit W/D, covered parking, $300/mo HOA.',
      ogTitle: '1-Bed A4 — 799 SF from $278K | Mount Vernon Lofts',
      ogDescription: 'The largest layout at Mount Vernon Lofts. 799 SF 1-bedroom in Montrose with premium finishes. From $278K.',
    },
    cta: {
      buttonText: 'Request 1-Bed A4 Details',
      formPreFill: '1-Bedroom',
      hiddenUnitType: 'A4',
    },
    schema: {
      accommodationCategory: 'One-Bedroom Condominium',
      numberOfRooms: 2,
      breadcrumbName: '1-Bed A4',
    },
  },
]

// Helper functions
export function getUnitTypeBySlug(slug: string): UnitTypePageData | null {
  return unitTypePages.find((u) => u.slug === slug) ?? null
}

export function getAllUnitSlugs(): ReadonlyArray<string> {
  return unitTypePages.map((u) => u.slug)
}

export function getOtherUnitTypes(
  currentSlug: string
): ReadonlyArray<UnitTypePageData> {
  return unitTypePages.filter((u) => u.slug !== currentSlug)
}
