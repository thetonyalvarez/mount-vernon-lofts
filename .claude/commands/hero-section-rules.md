# HeroSection Component Rules for Mount Vernon Lofts

## Component Location and Usage

### Always Use the Reusable Component
- The HeroSection component is located at `app/components/HeroSection.tsx`
- NEVER create new HeroSection components in individual page directories
- Always import from `@/app/components/HeroSection`

### Import Pattern
```tsx
import { HeroSection } from "@/app/components/HeroSection"
```

## Props Interface Requirements

### Required Props
- `title`: string - Main heading text (sentence case for MVL brand)
- `subtitle`: string - Descriptive subheading text
- `fallbackImage`: string - Background image path (always required)

### Optional Props with Defaults
- `videoSrc?`: string - Lifestyle video or imagery background path
- `overlayImage?`: { src: string, alt: string } - Overlay image with alt text
- `showScrollIndicator?`: boolean (default: true)
- `height?`: "screen" | "large" | "medium" (default: "screen")
- `textAlignment?`: "center" | "left" | "right" (default: "center")
- `overlayPosition?`: "left" | "right" | "none" (default: "right")
- `textColor?`: "white" | "dark" (default: "white")

## Design Guidelines

### Typography Standards
- **Title**: Sentence case (NOT UPPERCASE), uses font-montserrat
- **Subtitle**: Sentence case, warm and approachable
- **Text Color**: Use "white" for most heroes, "dark" only on light backgrounds

### Layout Patterns
- **Full-screen heroes**: Use `height="screen"` for main page heroes
- **Section heroes**: Use `height="large"` or `height="medium"` for sub-sections
- **Text alignment**: Center for most cases, left/right for special layouts
- **Border radius**: All elements use 4-8px radius (NO sharp corners)

### Media Guidelines
- **Fallback images**: Always provide high-quality lifestyle imagery
- **Video backgrounds**: Optional, use for lifestyle pages (residences, neighborhood)
- **Overlay images**: Use sparingly, typically for showcasing interiors or community details

### Accessibility Requirements
- Always provide meaningful `alt` text for overlay images
- Ensure sufficient contrast between text and background
- Include scroll indicators for full-screen heroes

## Usage Examples

### Standard Page Hero
```tsx
<HeroSection
  title="Urban Condo Living"
  subtitle="Montrose ownership starting in the $215Ks. 42 modern condos for first-time buyers."
  fallbackImage="/images/residences-hero.jpg"
/>
```

### Hero with Lifestyle Imagery
```tsx
<HeroSection
  title="Welcome to Mount Vernon Lofts"
  subtitle="Warmly designed spaces in the heart of Montrose, Houston"
  fallbackImage="/images/lifestyle-hero.jpg"
  overlayImage={{
    src: "/images/interior-detail.jpg",
    alt: "Modern loft interior with warm finishes"
  }}
/>
```

### Left-Aligned Hero with Overlay
```tsx
<HeroSection
  title="Neighborhood Character"
  subtitle="Walking distance to vibrant Montrose dining, art, and culture"
  fallbackImage="/images/neighborhood-hero.jpg"
  textAlignment="left"
  overlayPosition="right"
  height="large"
/>
```

## Consistency Checks

When creating or modifying hero sections:
1. Verify the component is imported from the shared location
2. Ensure title uses sentence case (not uppercase)
3. Check that fallbackImage path is valid
4. Confirm overlay images have descriptive alt text
5. Test responsive behavior on different screen sizes
6. Validate text contrast against background
7. Verify all corners use 4-8px border-radius

## Do NOT:
- Create separate HeroSection components in page directories
- Use UPPERCASE titles (MVL brand is warm and approachable, not corporate)
- Use serif fonts (only font-montserrat for headings)
- Omit alt text for overlay images
- Use videos without fallback images
- Override component styling with custom CSS classes
- Use sharp corners (minimum 4px border-radius)