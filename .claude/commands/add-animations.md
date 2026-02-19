# Add Animations Command

Use this command to add scroll animations to new components or sections.

## Quick Start

When adding animations to a new component:

1. **Import animation components:**
```tsx
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations"
```

2. **Wrap content with ScrollReveal:**
```tsx
<ScrollReveal>
  <YourComponent />
</ScrollReveal>
```

3. **For multiple elements, use stagger:**
```tsx
<StaggerContainer>
  <StaggerItem><h2>Title</h2></StaggerItem>
  <StaggerItem><p>Content</p></StaggerItem>
  <StaggerItem><button>CTA</button></StaggerItem>
</StaggerContainer>
```

## Component Templates

### Basic Section
```tsx
export function YourSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal>
          <h2 className="text-4xl font-montserrat">Your Title</h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="text-lg">Your content</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

### Two-Column Layout
```tsx
export function TwoColumnSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <ScrollReveal variant={slideInLeft}>
            <div>
              <h2>Content Title</h2>
              <p>Your content here</p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant={slideInRight} delay={0.2}>
            <ParallaxImage
              src="/your-image.jpg"
              alt="Description"
              width={600}
              height={400}
              className="rounded-none"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
```

### Grid Layout with Stagger
```tsx
export function GridSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <ScrollReveal className="mb-16">
          <h2 className="text-4xl font-montserrat text-center">Grid Title</h2>
        </ScrollReveal>
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <StaggerItem key={item.id}>
              <div className="bg-white p-6">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
```

### Hero Section with Split Text
```tsx
export function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.h1
          className="text-6xl font-montserrat"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SplitText letterDelay={0.04}>
            Your Hero Title
          </SplitText>
        </motion.h1>
        <ScrollReveal delay={1.5}>
          <p className="text-xl mt-6">Subtitle content</p>
        </ScrollReveal>
      </div>
    </section>
  )
}
```

## Animation Timing Guidelines

- **Hero animations**: Start immediately, 0.5-1.0s duration
- **Section headings**: 0.8s duration, 0-0.2s delay
- **Content blocks**: 0.8s duration, 0.1-0.3s delay after heading
- **Images**: 0.8s duration, often with slideIn variants
- **CTAs/Buttons**: 0.6s duration, 0.3-0.5s delay
- **Stagger delays**: 0.1s between items

## Responsive Considerations

Add responsive classes for different screen sizes:

```tsx
<ScrollReveal 
  variant={slideInLeft}
  className="md:block hidden" // Desktop only
>
  <ComplexAnimation />
</ScrollReveal>

<ScrollReveal 
  variant={fadeInUp} // Simpler for mobile
  className="md:hidden block"
>
  <SimpleAnimation />
</ScrollReveal>
```

## Testing Checklist

- [ ] Animation triggers at correct scroll position
- [ ] Respects `prefers-reduced-motion` setting
- [ ] Works on mobile devices
- [ ] Doesn't cause layout shift
- [ ] Performance is smooth (60fps)
- [ ] Content is accessible without animations