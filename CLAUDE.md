# Mount Vernon Lofts — Project Context

## Project Overview
This is a real estate website for Mount Vernon Lofts (MVL), a 42-unit condo conversion in Houston's Montrose neighborhood. This is an attainable urban homeownership product for first-time buyers — NOT luxury real estate. The website's job is to generate qualified leads from renters who want to own in Montrose.

## Brand Position: "Attainable Montrose Living"
MVL sits in the "masstige" sweet spot — elevated enough to signal quality, honest enough to build trust. We sell smart urban ownership to people who value design and location over square footage and prestige signaling.

**Tagline:** "Montrose ownership, finally within reach."

### What We Are / What We're Not

| We Are | We're Not |
|--------|-----------|
| Confident, direct, honest | Luxury, exclusive, bespoke |
| Modern building (2018 build) | New construction (don't call it this) |
| Attainable first home | Budget/cheap starter home |
| Montrose authenticity | Suburban generic |
| Warm and approachable | Cold minimalist luxury |

### Words to NEVER Use
exclusive, bespoke, curated, premier, prestigious, elevated, refined, sophisticated, affordable, budget-friendly, bargain, low-cost, starter home, stunning, amazing, incredible

### Words to USE
first home, attainable, within reach, modern building, Montrose, inner loop, walkable, build equity, owner-focused community

## Technical Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Carousel**: Embla Carousel
- **Image Handling**: Next.js Image Optimization

## Project Structure
```
mvl-website/
├── app/              # Next.js app directory
│   ├── home/sections/   # Homepage section components
│   ├── residences/      # Floor plans, pricing, availability
│   ├── neighborhood/    # Montrose highlights
│   ├── gallery/         # Actual photography (not renderings)
│   ├── floor-plans/     # Interactive floor plan viewer
│   ├── brochure/        # Digital brochure download
│   ├── config/          # Site configuration data
│   ├── api/             # API routes (contact, floor plans)
│   └── components/      # Shared app components
├── components/       # Reusable UI components
│   └── ui/          # Base UI primitives
├── lib/             # Utility functions
├── public/          # Static assets
│   ├── images/      # Image assets
│   └── documents/   # Downloadable docs
├── .claude/         # Claude Code agents and commands
├── .cursor/         # Cursor rules
└── CLAUDE.md        # This file
```

## Color Palette (CANONICAL — from brand-guidelines.json)

### Primary Colors
| Color | Hex | Tailwind Token | Usage |
|-------|-----|---------------|-------|
| Cream | #FFFCF7 | `mvl-cream` | Primary background |
| Warm White | #FAF9F7 | `mvl-warm-white` | Alternate background, form fields |
| Dark Espresso | #2D2B29 | `mvl-espresso` | Primary text, strong contrasts |

### Secondary Colors
| Color | Hex | Tailwind Token | Usage |
|-------|-----|---------------|-------|
| Montrose Coral | #E07A5F | `mvl-coral` | Primary accent, CTAs, energy |
| Warm Brown | #7A6248 | `mvl-brown` | Secondary accent, supporting elements |
| Warm Beige | #E8E3DB | `mvl-beige` | Tertiary backgrounds, cards, subtle divisions |

### Color Rules
- Warm, earthy, grounded palette. NO cool tones (teals, blues, grays).
- Cream/warm white as backgrounds. Dark espresso for text.
- Coral provides energy and accent. Use for CTAs and highlights.
- Warm brown and beige anchor the earthiness.
- Use color sparingly. This isn't luxury minimalism OR budget brightness.

## Typography

### Fonts
- **Headings**: Montserrat or Inter — geometric sans-serif, clean, modern, approachable
- **Body**: Inter or Public Sans — highly readable, friendly
- **Weights**: Medium (500) / Semibold (600) for headings. Regular (400) for body.

### Typography Rules
- NO serif fonts (too luxury)
- NO thin/light weights (too luxury)
- NO all-caps for headlines (reads as yelling)
- NO script or decorative fonts
- NO more than 2 font families

## Design Rules
- All section containers: full width with max-width of 1920px
- Consistent padding: `px-4 md:px-8 lg:px-12`
- Generous but not excessive white space (organized and considered, not sparse and pretentious)
- Content-forward: information always accessible, not hidden behind clicks
- Mobile-first responsive design (most leads come from social ads on mobile)
- Slight border-radius (4-8px) for approachability — NOT sharp corners (too luxury), NOT pill shapes (too casual)
- Buttons: Coral background (#E07A5F), white text, 4px border-radius, darken on hover

## Content Sections (Website Structure)
1. **Hero**: Montrose lifestyle imagery + clear value prop. NOT building exterior as hero.
2. **Why MVL**: 4 pillars (Attainable, Modern Building, Ready Now, Predictable Costs)
3. **Residences**: Unit types, pricing range, floor plans
4. **Neighborhood**: Montrose lifestyle, walkability, nearby spots
5. **Gallery**: Actual photography, not renderings
6. **Contact/Lead Capture**: Name, email, phone + optional dropdowns

### Pages NOT Needed
- No `/architecture` page (not a design-forward luxury product)
- No `/amenities` page (building amenities are minimal — covered parking, recreational lounge, outdoor common areas)
- No `/team` page unless specifically requested
- No complex multi-section scroll experiences

## Key Project Facts

```typescript
const MVL_DATA = {
  project: "Mount Vernon Lofts",
  address: "4509 Mount Vernon, Houston, TX 77006",
  neighborhood: "Montrose",
  totalUnits: 42,
  yearBuilt: 2018,  // Do NOT say "new construction" — say "modern building"
  unitTypes: {
    studios: { count: 34, sqftRange: "612-705" },
    oneBedroom: { count: 8, sqftRange: "717-799" }
  },
  pricing: "Starting in the $215Ks", // Generalized — do NOT break out per-type pricing
  hoaFee: 300, // includes water
  hoaReserves: "16.7%", // well above Fannie Mae 10% requirement
  parking: "1 covered space per unit",
  petPolicy: "Up to 2 dogs per handler in common areas. $75 registration fee per pet. Breed restrictions apply.",
  strPolicy: "Short-term rentals prohibited",
  availability: "Now — units available for immediate closing",
  closingTimeline: "30-45 days",
  propertyManager: "Equity",
  developer: "Blake Capital Group"
}
```

## Target Audience
- **Primary**: First-time buyers, ages 25-38, income $60-100K, currently renting in inner loop
- **Secondary**: Medical Center & Museum District workers
- **Tertiary**: Parents buying for university students (Rice, UH, St. Thomas)
- **Constraints**: Max 30% investor units (Fannie Mae). No STR marketing.

## Photography Direction
- Authentic lifestyle imagery. Real people, real moments.
- Montrose neighborhood shots (murals, coffee shops, restaurants)
- Actual unit interiors with natural light, realistic furnishing scale
- Warm processing — slight warm tint, natural saturation
- NO: luxury staging, models in designer clothes, empty sterile rooms, building aerials

## Form Handling
- Required: Name, Email, Phone
- Optional: "What are you looking for?" (Studio, 1-Bedroom, Not Sure), "When buying?" (ASAP, 1-3mo, 3-6mo, Just exploring)
- Honeypot field for spam protection
- Integrate with Salesforce
- GA/Meta Pixel event tracking on submission
- Success: "Thanks! We'll be in touch within 24 hours."

## SEO & Metadata
- Title pattern: `[Page Name] | Mount Vernon Lofts — Montrose Condos`
- Homepage meta: "Modern condos in Montrose, Houston starting in the $215Ks. Studios and 1-bedrooms in one of Houston's most walkable neighborhoods. Schedule a tour today."
- Target keywords: montrose condos, houston condos for sale, first-time buyer houston, montrose real estate, condos near medical center

## Disclosures (Required on Website)
- Equal Housing Opportunity logo
- "Short-term rentals (Airbnb, VRBO) prohibited per HOA Declaration."
- "All prices, features, and availability subject to change without notice."
- TREC Information About Brokerage Services link
- Consumer Protection Notice link
- "Equal Housing Opportunity. Buyer to verify all information."
- "Exterior walkways are unconditioned spaces."
- "Maximum 48% of units may be leased at any given time per HOA Declaration."
- "No grills allowed on balconies or exterior walkways per HOA rules."
- "Pet policy: Up to 2 dogs per handler in common areas. $75 registration fee per pet. Breed restrictions apply."

## TypeScript Rules
- Add `Readonly<>` to props types when appropriate
- Use nullish coalescing (`??`) instead of logical or (`||`)
- Use `null` instead of `undefined` for empty values
- Extract nested ternary operations into functions
- Never use array index as React keys — use unique identifiers

## Commands
```bash
npm run dev      # Development
npm run build    # Build
npm run start    # Production
npm run lint     # Linting
```

## Brand Source of Truth
The canonical brand guidelines live at:
`/nan-properties/developer-services/projects/mount-vernon-lofts/brand-guidelines.json`

When in doubt about any brand decision (colors, tone, messaging, audience), defer to that file.
