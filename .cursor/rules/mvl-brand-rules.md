# Mount Vernon Lofts — Brand Rules for Development

> **CANONICAL SOURCE:** `/nan-properties/developer-services/projects/mount-vernon-lofts/brand-guidelines.json`
> When in doubt about any brand decision, defer to that file.

## Brand Position

**"Attainable Montrose Living"** — Not luxury. Not budget. Smart urban ownership for people who value quality over square footage.

**Tagline:** "Montrose ownership, finally within reach."

## Color Palette

### Primary Colors

| Color | Hex | Tailwind Token | Usage |
|-------|-----|---------------|-------|
| Cream | `#FFFCF7` | `mvl-cream` | Primary background |
| Warm White | `#FAF9F7` | `mvl-warm-white` | Alternate background, form fields |
| Dark Espresso | `#2D2B29` | `mvl-espresso` | Primary text, strong contrasts |

### Secondary Colors

| Color | Hex | Tailwind Token | Usage |
|-------|-----|---------------|-------|
| Montrose Coral | `#E07A5F` | `mvl-coral` | Primary accent, CTAs, highlights |
| Warm Brown | `#7A6248` | `mvl-brown` | Secondary accent, supporting elements |
| Warm Beige | `#E8E3DB` | `mvl-beige` | Tertiary backgrounds, cards, subtle divisions |

### Color Rules

* Warm, earthy, grounded palette
* Cream and warm white as backgrounds — dark espresso for text
* Coral provides energy and accent — use for CTAs and interactive highlights
* Warm brown and beige anchor the earthiness
* **AVOID** cool tones: teals, blues, grays, and primary colors
* **AVOID** black backgrounds (too cold, too luxury)
* **AVOID** gold accents (screams luxury, creates expectation mismatch)

## Typography

### Headings
* **Font:** Montserrat or Inter — geometric sans-serif
* **Weights:** Medium (500) to Semibold (600)
* **NO** serif fonts, thin/light weights, script fonts, or decorative fonts
* **NO** all-caps for headlines (reads as yelling)

### Body Text
* **Font:** Inter or Public Sans
* **Weight:** Regular (400)
* **Line height:** 1.6 for readability

### Formatting
* Generous spacing, but not excessive (this isn't a luxury lookbook)
* Mobile-first responsive sizing
* Headlines should be punchy and direct, not flowery
* Max 2 font families

## UI Component Standards

### Buttons
* **Primary CTA:** Coral background (#E07A5F), white text, 4px border-radius, darken to #C4654B on hover
* **Secondary CTA:** Transparent, 2px solid #7A6248 border, brown text, fill with brown at 10% opacity on hover
* **Border-radius:** 4px (slightly rounded — NOT sharp corners, NOT pill shapes)

### Forms
* Light borders (#E8E3DB)
* Warm white background (#FAF9F7) on inputs
* Coral accent on focus state
* Generous input padding (16px)
* Clear labels above inputs (not placeholders only)

### Cards
* Soft shadow or subtle border, not both
* Consistent internal padding (24px)
* 8px border-radius for approachability
* Clean typography hierarchy within

### Icons
* Lucide React only
* Line icons, not filled
* 1.5-2px stroke weight
* Consistent 24px base size

## Content Structure

### Homepage
* **Hero:** Lead with Montrose lifestyle imagery + clear value prop. NOT building exterior.
* **Key Sections:** Hero > Why MVL (4 pillars) > Residences > Neighborhood > Gallery > Contact
* **Navigation:** Simple top nav: Home | Residences | Neighborhood | Gallery | Contact

### Subpages
```
/
├── /residences (floor plans, pricing, availability)
├── /neighborhood (Montrose highlights, walkability)
├── /gallery (actual photography)
└── /contact (lead form, agent info, address)
```

### Pages NOT Needed
* No `/architecture` page
* No `/amenities` page (building amenities are minimal)
* No `/team` page unless specifically requested
* No complex multi-section scroll experiences

## Photography Direction

* **DO:** Authentic lifestyle imagery, Montrose neighborhood, actual unit interiors with natural light
* **DO:** Morning coffee on balcony, friends gathering, working from home
* **DON'T:** Luxury staging, models in designer clothes, empty sterile rooms, renderings, building aerials

### Technical
* Lazy loading for all images
* WebP format with JPEG fallback
* Responsive srcset
* Alt text required (WCAG compliance)
* Warm processing — slight warm tint, natural saturation

## Voice Guidelines

| Attribute | Do | Don't |
|-----------|-----|-------|
| **Confident** | "Modern condo in Montrose for under $220K. That's rare." | "We think this might be one of the more affordable options..." |
| **Direct** | "Starting in the $215Ks." | "We're excited to offer thoughtfully designed spaces at various price points..." |
| **Honest** | "Exterior walkways — common for Houston, not for everyone." | [Ignore limitations] |
| **Aspirational but grounded** | "Your first home in one of Houston's best neighborhoods." | "Experience unparalleled luxury in an exclusive urban oasis." |

### Words to NEVER Use
exclusive, bespoke, curated, premier, prestigious, elevated, refined, sophisticated, affordable, budget-friendly, bargain, low-cost, starter home, stunning, amazing, incredible, breathtaking

### Words to USE
first home, attainable, within reach, modern building, Montrose, inner loop, walkable, build equity, owner-focused community

## Key Project Facts

```javascript
const MVL_DATA = {
  project: "Mount Vernon Lofts",
  address: "4509 Mount Vernon, Houston, TX 77006",
  neighborhood: "Montrose",
  totalUnits: 42,
  yearBuilt: 2018,  // Say "modern building" NOT "new construction"
  unitTypes: {
    studios: { count: 34, sqftRange: "612-705" },
    oneBedroom: { count: 8, sqftRange: "717-799" }
  },
  pricing: "Starting in the $215Ks",
  hoaFee: 300,
  hoaReserves: "16.7%",
  parking: "1 covered space per unit",
  petPolicy: "Up to 2 dogs per handler in common areas. $75 registration fee per pet. Breed restrictions apply.",
  strPolicy: "Short-term rentals prohibited",
  availability: "Now — units available for immediate closing",
  propertyManager: "Equity",
  developer: "Blake Capital Group"
}
```

## SEO & Metadata
* Title pattern: `[Page Name] | Mount Vernon Lofts — Montrose Condos`
* Target keywords: montrose condos, houston condos for sale, first-time buyer houston, montrose real estate, condos near medical center
* OpenGraph: og:image for each page (lifestyle shot, not logo), og:type: website, twitter card: summary_large_image

## Accessibility
* WCAG 2.1 AA compliance
* Minimum contrast ratio 4.5:1 for body text
* All images have descriptive alt text
* Keyboard navigation for all interactive elements
* Focus states visible on all links/buttons
* Form labels properly associated with inputs

## Disclosures (Required on Website)
* Equal Housing Opportunity logo
* "Short-term rentals (Airbnb, VRBO) prohibited per HOA Declaration."
* "All prices, features, and availability subject to change without notice."
* TREC Information About Brokerage Services link
* Consumer Protection Notice link

---

**Last Updated:** February 18, 2026
**Canonical Reference:** `/nan-properties/developer-services/projects/mount-vernon-lofts/brand-guidelines.json`
