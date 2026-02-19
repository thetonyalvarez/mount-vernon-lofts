# Mount Vernon Lofts - HeroSection Component Rules

## Reusable Component Usage

### Always Use Shared Component
- Import from `@/app/components/HeroSection`
- Never create new HeroSection components in page directories
- Component is fully customizable via props

### Standard Import
```tsx
import { HeroSection } from "@/app/components/HeroSection"
```

## Required Props
- `title` - Sentence case heading text
- `subtitle` - Descriptive, warm subheading
- `fallbackImage` - Background image path

## Optional Props (with defaults)
- `videoSrc` - Lifestyle video background
- `overlayImage` - { src, alt } object
- `showScrollIndicator` - boolean (true)
- `height` - "screen" | "large" | "medium" ("screen")
- `textAlignment` - "center" | "left" | "right" ("center")
- `overlayPosition` - "left" | "right" | "none" ("right")
- `textColor` - "white" | "dark" ("white")

## Design Standards

### Typography
- Titles: Sentence case (NOT UPPERCASE), font-montserrat
- Subtitles: Sentence case, warm and approachable
- Default white text on dark backgrounds
- NO serif fonts

### Layout Patterns
- Main pages: `height="screen"`
- Sub-sections: `height="large"` or `"medium"`
- Default center alignment
- Use overlays sparingly
- All corners: 4-8px border-radius (NO sharp corners)

### Media Requirements
- Always include fallback images
- Lifestyle imagery for warmth
- Overlay images need descriptive alt text
- High-quality, welcoming images

## Common Usage Patterns

### Basic Hero
```tsx
<HeroSection
  title="Urban Condo Living"
  subtitle="Montrose ownership starting in the $215Ks"
  fallbackImage="/images/hero.jpg"
/>
```

### With Lifestyle Imagery
```tsx
<HeroSection
  title="Welcome Home"
  subtitle="Beautifully converted lofts in the heart of Montrose"
  fallbackImage="/images/hero.jpg"
  overlayImage={{
    src: "/images/interior.jpg",
    alt: "Modern loft interior with warm finishes"
  }}
/>
```

### Left-Aligned Layout
```tsx
<HeroSection
  title="Neighborhood Character"
  subtitle="Walking distance to vibrant dining and culture"
  fallbackImage="/images/neighborhood.jpg"
  textAlignment="left"
  overlayPosition="right"
/>
```

## Implementation Checklist
- [ ] Import from shared component location
- [ ] Title in sentence case (NOT uppercase)
- [ ] Fallback image provided
- [ ] Alt text for overlay images
- [ ] Appropriate height for context
- [ ] Text alignment suits content
- [ ] Test responsive behavior
- [ ] Verify border-radius (4-8px minimum)
- [ ] Font is montserrat (NOT serif)

## Do NOT
- Create separate HeroSection components
- Use UPPERCASE titles
- Use serif fonts
- Skip alt text for images
- Override component CSS
- Use videos without fallbacks
- Use sharp corners (minimum 4px border-radius)