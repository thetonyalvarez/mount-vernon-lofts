# Animation System Rules for Mount Vernon Lofts

## Core Principles

### 1. Warm, Approachable Animations
- Use smooth, welcoming animations that enhance user experience
- Timing should feel natural and responsive (0.6-1.0s durations)
- Easing curves should be smooth and fluid: `[0.25, 0.1, 0.25, 1]`
- Avoid overly complex animations - maintain clarity and warmth

### 2. Performance First
- Only animate `transform` and `opacity` properties for GPU acceleration
- Use `once: true` for scroll animations to prevent re-triggers
- Test on mobile devices and optimize for 60fps
- Implement proper loading states for async operations

### 3. Accessibility Compliance
- ALWAYS respect `prefers-reduced-motion` setting
- Provide fallback experiences for users with vestibular disorders
- Ensure content is fully accessible without animations
- Use semantic HTML structure regardless of animation state

## Required Animation Components

### Always Use These Components
```tsx
// Import from centralized location
import { 
  ScrollReveal, 
  ParallaxImage, 
  StaggerContainer, 
  StaggerItem, 
  SplitText 
} from "@/components/animations"

// Import variants from library
import { 
  fadeInUp, 
  slideInLeft, 
  slideInRight, 
  scaleIn 
} from "@/lib/animations"
```

### Never Create Custom Animation Components
- Use the established animation system
- Extend existing components if needed
- Add new variants to `/lib/animations.ts`
- Follow the existing patterns and structure

## Code Patterns

### Section Animation Pattern
```tsx
export function YourSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <ScrollReveal>
          <StaggerContainer>
            <StaggerItem>
              <h2 className="font-montserrat text-mvl-coral text-4xl md:text-6xl">
                Section Title
              </h2>
            </StaggerItem>
            <StaggerItem>
              <p className="text-mvl-espresso text-lg md:text-xl">
                Section content
              </p>
            </StaggerItem>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

### Image + Content Pattern
```tsx
<div className="grid md:grid-cols-2 gap-8 md:gap-12">
  <ScrollReveal variant={slideInLeft}>
    <div className="space-y-6">
      <h3>Content Title</h3>
      <p>Content description</p>
    </div>
  </ScrollReveal>
  
  <ScrollReveal variant={slideInRight} delay={0.2}>
    <ParallaxImage
      src="/path/to/image.jpg"
      alt="Descriptive alt text"
      fill
      className="object-cover"
      containerClassName="relative h-72 md:h-96"
    />
  </ScrollReveal>
</div>
```

## Typography Animation Rules

### Headlines
- Use `SplitText` for hero headlines only
- Regular headlines use `ScrollReveal` with `fadeInUp`
- Never animate individual words in body text

```tsx
// Hero headline - OK
<SplitText letterDelay={0.04}>Hero Headline</SplitText>

// Section headline - OK  
<ScrollReveal>
  <h2 className="font-montserrat">Section Title</h2>
</ScrollReveal>

// Body text - DON'T animate individual letters
<ScrollReveal>
  <p>Full paragraph content</p>
</ScrollReveal>
```

## Image Animation Rules

### Always Use ParallaxImage for Large Images
```tsx
// Good - Parallax for background/hero images
<ParallaxImage
  src="/hero-image.jpg"
  alt="Description"
  fill
  offset={50}
  containerClassName="h-screen"
/>

// Good - Regular ScrollReveal for content images
<ScrollReveal variant={scaleIn}>
  <Image
    src="/content-image.jpg"
    alt="Description"
    width={400}
    height={300}
  />
</ScrollReveal>
```

### Image Performance Rules
- Always provide proper `alt` attributes
- Use appropriate `sizes` prop for responsive images
- Lazy load images below the fold
- Optimize images before implementing animations

## Mobile Animation Rules

### Simplify for Mobile
```tsx
// Use responsive variants
<ScrollReveal 
  variant={slideInLeft} // Full animation on desktop
  className="hidden md:block"
>
  <ComplexContent />
</ScrollReveal>

<ScrollReveal 
  variant={fadeInUp} // Simple fade on mobile
  className="md:hidden"
>
  <SimpleContent />
</ScrollReveal>
```

### Touch Device Considerations
- Disable parallax on touch devices (handled automatically)
- Reduce animation durations by 25% on mobile
- Use larger trigger thresholds for scroll animations

## Timing and Delays

### Standard Timing Scale
- Hero animations: `0.5s` (immediate)
- Section headings: `0.8s` 
- Content blocks: `0.8s` with `0.1-0.2s` delay
- Images: `0.8s` with `0.2-0.3s` delay
- CTAs: `0.6s` with `0.3-0.4s` delay

### Stagger Timing
- Container delay: `0.2s`
- Item stagger: `0.1s` between items
- Maximum stagger group: 6 items

## Forbidden Patterns

### Never Do These
```tsx
// DON'T - Create inline animations
<motion.div animate={{ x: 100 }}>Content</motion.div>

// DON'T - Animate layout properties
<motion.div animate={{ width: 200, height: 100 }}>Content</motion.div>

// DON'T - Use infinite animations for content
<motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity }}>

// DON'T - Animate without accessibility consideration
<div className="animate-spin">Content</div>

// DON'T - Use Tailwind animation classes
<div className="animate-bounce">Content</div>
```

### Always Do These
```tsx
// DO - Use component system
<ScrollReveal variant={fadeInUp}>Content</ScrollReveal>

// DO - Consider accessibility
<ScrollReveal once={true}>Content</ScrollReveal>

// DO - Use semantic structure
<ScrollReveal>
  <section>
    <h2>Heading</h2>
    <p>Content</p>
  </section>
</ScrollReveal>
```

## Testing Requirements

### Before Committing
- [ ] Test with `prefers-reduced-motion: reduce`
- [ ] Test on mobile devices (iOS Safari, Android Chrome)
- [ ] Verify 60fps performance with DevTools
- [ ] Check accessibility with screen reader
- [ ] Ensure animations don't break layout
- [ ] Test with slow network connections

### Browser Support
- Modern browsers with IntersectionObserver support
- Graceful degradation for older browsers
- Fallbacks for reduced motion preferences

## File Organization

### Component Structure
```
components/animations/
├── ScrollReveal.tsx      # ✅ Use this for scroll animations
├── ParallaxImage.tsx     # ✅ Use this for image parallax
├── StaggerContainer.tsx  # ✅ Use this for groups
├── SplitText.tsx        # ✅ Use this for hero text only
└── index.ts             # ✅ Centralized exports
```

### Import Rules
```tsx
// ✅ Correct - Import from animations directory
import { ScrollReveal } from "@/components/animations"

// ❌ Wrong - Don't import motion directly in components
import { motion } from "framer-motion"

// ✅ Correct - Import variants from lib
import { fadeInUp } from "@/lib/animations"
```

## Error Prevention

### Common Mistakes to Avoid
1. **Forgetting accessibility**: Always use `useReducedMotion`
2. **Animating wrong properties**: Only `transform` and `opacity`
3. **Performance issues**: Not using `once: true`
4. **Mobile problems**: Not testing on actual devices
5. **Layout shift**: Animating elements that affect document flow

### Code Review Checklist
- [ ] Uses established animation components
- [ ] Respects accessibility preferences
- [ ] Maintains 60fps performance
- [ ] Follows responsive design patterns
- [ ] Includes proper TypeScript types
- [ ] Has meaningful alt text for images
- [ ] Uses semantic HTML structure