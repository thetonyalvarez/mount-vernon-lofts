// Gallery data configuration

export interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
  title: string
  description?: string
}

export interface GalleryCategory {
  id: string
  name: string
  description: string
}

export const galleryCategories: Readonly<GalleryCategory[]> = [
  {
    id: 'all',
    name: 'All',
    description: 'View all units'
  },
  {
    id: 'studios',
    name: 'Studios',
    description: 'Studio units at Mount Vernon Lofts'
  },
  {
    id: 'one-bedrooms',
    name: '1-Bedrooms',
    description: '1-bedroom units at Mount Vernon Lofts'
  }
]

export const galleryImages: Readonly<GalleryImage[]> = [
  // ── Studios — Unit 26 ──────────────────────────────────────
  {
    id: 'studio-1',
    src: '/images/unit-26_studio/26-1.jpg',
    alt: 'Open kitchen and living area in a Mount Vernon Lofts studio',
    category: 'studios',
    title: 'Open Kitchen & Living',
    description: 'Open floor plan with kitchen island and living area'
  },
  {
    id: 'studio-2',
    src: '/images/unit-26_studio/26-2.jpg',
    alt: 'Living area with sectional sofa in a studio unit',
    category: 'studios',
    title: 'Living Area',
    description: 'Comfortable living space with natural light'
  },
  {
    id: 'studio-3',
    src: '/images/unit-26_studio/26-4.jpg',
    alt: 'Kitchen with modern finishes in a studio unit',
    category: 'studios',
    title: 'Kitchen',
    description: 'Modern kitchen with granite countertops'
  },
  {
    id: 'studio-4',
    src: '/images/unit-26_studio/26-7.jpg',
    alt: 'Living room with natural light in a studio unit',
    category: 'studios',
    title: 'Living Room',
    description: 'Bright living space with large windows'
  },
  {
    id: 'studio-5',
    src: '/images/unit-26_studio/26-10.jpg',
    alt: 'Bed area with natural light in a studio unit',
    category: 'studios',
    title: 'Bed Area with Natural Light',
    description: 'Sleeping area flooded with natural light'
  },
  {
    id: 'studio-6',
    src: '/images/unit-26_studio/26-11.jpg',
    alt: 'Bathroom in a Mount Vernon Lofts studio',
    category: 'studios',
    title: 'Bathroom',
    description: 'Modern bathroom with clean finishes'
  },
  {
    id: 'studio-7',
    src: '/images/unit-26_studio/26-12.jpg',
    alt: 'Balcony view from a studio unit at Mount Vernon Lofts',
    category: 'studios',
    title: 'Balcony View',
    description: 'Private balcony with neighborhood views'
  },
  {
    id: 'studio-8',
    src: '/images/unit-26_studio/26-13.jpg',
    alt: 'Bed area and kitchen view in a studio unit',
    category: 'studios',
    title: 'Bed Area & Kitchen',
    description: 'Open layout connecting sleeping and living areas'
  },

  // ── 1-Bedrooms — Unit 8 ───────────────────────────────────
  {
    id: '1bed-1',
    src: '/images/unit-8_1-bed/8-1.jpg',
    alt: 'Bedroom in a 1-bedroom unit at Mount Vernon Lofts',
    category: 'one-bedrooms',
    title: 'Bedroom',
    description: 'Private bedroom with ample space'
  },
  {
    id: '1bed-2',
    src: '/images/unit-8_1-bed/8-2.jpg',
    alt: 'Bedroom with natural light in a 1-bedroom unit',
    category: 'one-bedrooms',
    title: 'Bedroom — Natural Light',
    description: 'Bedroom filled with natural light'
  },
  {
    id: '1bed-3',
    src: '/images/unit-8_1-bed/8-4.jpg',
    alt: 'Living room in a 1-bedroom unit at Mount Vernon Lofts',
    category: 'one-bedrooms',
    title: 'Living Room',
    description: 'Open living area with room to relax'
  },
  {
    id: '1bed-4',
    src: '/images/unit-8_1-bed/8-5.jpg',
    alt: 'Open living and kitchen area in a 1-bedroom unit',
    category: 'one-bedrooms',
    title: 'Open Living & Kitchen',
    description: 'Connected living and kitchen space'
  },
  {
    id: '1bed-5',
    src: '/images/unit-8_1-bed/8-6.jpg',
    alt: 'Kitchen close-up showing granite countertops',
    category: 'one-bedrooms',
    title: 'Kitchen Close-Up',
    description: 'Granite countertops and European-style cabinetry'
  },
  {
    id: '1bed-6',
    src: '/images/unit-8_1-bed/8-8.jpg',
    alt: 'Bathroom in a 1-bedroom unit at Mount Vernon Lofts',
    category: 'one-bedrooms',
    title: 'Bathroom',
    description: 'Modern bathroom with quality fixtures'
  },
  {
    id: '1bed-7',
    src: '/images/unit-8_1-bed/8-12.jpg',
    alt: 'Balcony in a 1-bedroom unit at Mount Vernon Lofts',
    category: 'one-bedrooms',
    title: 'Balcony',
    description: 'Private balcony for outdoor living'
  },

  // ── 1-Bedrooms — Unit 9 ───────────────────────────────────
  {
    id: '1bed-8',
    src: '/images/unit-9_1-bed/9-2.jpg',
    alt: 'Kitchen and dining area in a 1-bedroom unit',
    category: 'one-bedrooms',
    title: 'Kitchen & Dining',
    description: 'Open kitchen with dining space'
  },
  {
    id: '1bed-9',
    src: '/images/unit-9_1-bed/9-3.jpg',
    alt: 'Kitchen with island in a 1-bedroom unit',
    category: 'one-bedrooms',
    title: 'Kitchen with Island',
    description: 'Kitchen island with modern finishes'
  },
  {
    id: '1bed-10',
    src: '/images/unit-9_1-bed/9-4.jpg',
    alt: 'Living and dining area in a 1-bedroom unit',
    category: 'one-bedrooms',
    title: 'Living & Dining',
    description: 'Open living and dining with natural light'
  },
  {
    id: '1bed-11',
    src: '/images/unit-9_1-bed/9-6.jpg',
    alt: 'Living room in a 1-bedroom unit at Mount Vernon Lofts',
    category: 'one-bedrooms',
    title: 'Living Room',
    description: 'Comfortable living space with large windows'
  },
  {
    id: '1bed-12',
    src: '/images/unit-9_1-bed/9-7.jpg',
    alt: 'Bathroom in a 1-bedroom unit at Mount Vernon Lofts',
    category: 'one-bedrooms',
    title: 'Bathroom',
    description: 'Clean, modern bathroom'
  },
  {
    id: '1bed-13',
    src: '/images/unit-9_1-bed/9-9.jpg',
    alt: 'Bathroom with subway tile in a 1-bedroom unit',
    category: 'one-bedrooms',
    title: 'Bathroom — Subway Tile',
    description: 'Bathroom with subway tile detail'
  },
  {
    id: '1bed-14',
    src: '/images/unit-9_1-bed/9-12.jpg',
    alt: 'Balcony with sunset view from a 1-bedroom unit',
    category: 'one-bedrooms',
    title: 'Balcony — Sunset',
    description: 'Balcony with views of the Houston skyline at sunset'
  }
]

export const galleryIntro = {
  title: "Mount Vernon Lofts Gallery",
  subtitle: "See Your Future Home",
  description: "Real photos of studios and 1-bedrooms at Mount Vernon Lofts in Montrose. What you see is what you get — no renderings."
}
