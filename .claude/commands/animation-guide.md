# Animation System Guide

## Overview
This project uses Framer Motion for smooth scroll animations that enhance the browsing experience. All animations respect accessibility preferences and are optimized for performance.

## Core Animation Components

### ScrollReveal
The primary component for scroll-triggered animations.

**Usage:**
```tsx
import { ScrollReveal } from "@/components/animations"
import { fadeInUp, slideInLeft } from "@/lib/animations"

// Basic fade in up
<ScrollReveal>
  <div>Content</div>
</ScrollReveal>

// Custom variant with delay
<ScrollReveal variant={slideInLeft} delay={0.3}>
  <div>Content</div>
</ScrollReveal>
```

**Props:**
- `variant` - Animation type (fadeInUp, slideInLeft, slideInRight, scaleIn)
- `delay` - Animation delay in seconds
- `duration` - Custom duration override
- `once` - Whether animation runs once (default: true)

### ParallaxImage
Creates subtle parallax effects for images.

**Usage:**
```tsx
import { ParallaxImage } from "@/components/animations"

<ParallaxImage
  src="/path/to/image.jpg"
  alt="Description"
  fill
  offset={50} // Parallax offset in pixels
  containerClassName="relative h-96"
/>
```

### StaggerContainer & StaggerItem
For sequential animations of grouped elements.

**Usage:**
```tsx
import { StaggerContainer, StaggerItem } from "@/components/animations"

<StaggerContainer staggerDelay={0.1}>
  <StaggerItem><div>Item 1</div></StaggerItem>
  <StaggerItem><div>Item 2</div></StaggerItem>
  <StaggerItem><div>Item 3</div></StaggerItem>
</StaggerContainer>
```

### SplitText
Character-by-character text animations.

**Usage:**
```tsx
import { SplitText } from "@/components/animations"

<SplitText letterDelay={0.04}>
  Your animated headline
</SplitText>
```

## Animation Variants

Available in `@/lib/animations`:

- `fadeInUp` - Slide up with fade (primary)
- `fadeIn` - Simple opacity fade
- `scaleIn` - Scale from 95% to 100%
- `slideInLeft` - Slide in from left
- `slideInRight` - Slide in from right
- `staggerContainer` - Container for staggered items
- `staggerItem` - Individual staggered item

## Best Practices

### Performance
- Use `transform` and `opacity` only for animations
- Set `once: true` to prevent re-animations
- Use `will-change` sparingly and remove after animation

### Accessibility
- All animations respect `prefers-reduced-motion`
- Provide meaningful alt text for animated images
- Don't rely solely on animation to convey information

### Timing
- Hero animations: 0.5-1.0s
- Content reveals: 0.8s
- Stagger delays: 0.1-0.15s
- Use elegant easing: `[0.25, 0.1, 0.25, 1]`

### Mobile Considerations
- Reduce animation complexity on mobile
- Disable parallax on touch devices
- Use shorter durations (0.6s vs 0.8s)

## Common Patterns

### Section Animation
```tsx
<ScrollReveal>
  <section className="py-20">
    <StaggerContainer>
      <StaggerItem>
        <h2>Heading</h2>
      </StaggerItem>
      <StaggerItem>
        <p>Content</p>
      </StaggerItem>
    </StaggerContainer>
  </section>
</ScrollReveal>
```

### Image with Content
```tsx
<div className="grid md:grid-cols-2 gap-8">
  <ScrollReveal variant={slideInLeft}>
    <div>Content</div>
  </ScrollReveal>
  <ScrollReveal variant={slideInRight} delay={0.2}>
    <ParallaxImage src="/image.jpg" alt="Description" fill />
  </ScrollReveal>
</div>
```

### Hero Section
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <SplitText letterDelay={0.04}>
    Your Hero Headline
  </SplitText>
</motion.div>
```

## Troubleshooting

### Animation Not Triggering
- Check viewport settings in ScrollReveal
- Ensure element has enough content to scroll into view
- Verify animation variant is properly imported

### Performance Issues
- Check for excessive re-renders
- Use React DevTools Profiler
- Ensure `once: true` is set
- Reduce animation complexity on mobile

### Accessibility Issues
- Test with `prefers-reduced-motion: reduce`
- Ensure content is accessible without animations
- Use semantic HTML structure

## File Structure
```
components/animations/
├── ScrollReveal.tsx      # Main scroll animation component
├── ParallaxImage.tsx     # Parallax image effects
├── StaggerContainer.tsx  # Staggered group animations
├── SplitText.tsx        # Character-level text animations
└── index.ts             # Exports

lib/
└── animations.ts        # Animation variants and configs
```