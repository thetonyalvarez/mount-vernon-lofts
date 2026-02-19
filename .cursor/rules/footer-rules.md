# Mount Vernon Lofts - Footer Rules

## Footer Configuration

### Centralized Content Management
- All footer content is managed in `app/config/navigation.ts`
- Edit this file to update content - DO NOT modify Footer component directly
- Available configurations:
  - `footerNavLinks` - Main navigation links
  - `footerBottomLinks` - Bottom links (Privacy, Terms)
  - `socialLinks` - Social media URLs
  - `contactInfo` - Address, email, phone
  - `legalDisclaimer` - Legal text
  - `copyrightText` - Copyright notice

## Footer Implementation

### Always Include Footer
- Footer is implemented site-wide via `app/components/Footer.tsx` in `app/layout.tsx`
- Never remove Footer from layout.tsx
- Footer appears after {children} in layout

### Footer Component Location
```
app/components/
└── Footer.tsx          # Main footer component
```

### Footer Structure
1. **Background Layer**
   - Dark espresso background (bg-mvl-espresso #2D2B29)
   - Tile pattern overlay at 25% opacity (optional)
   - Full width with overflow hidden
   - All corners: 4-8px border-radius

2. **Content Sections**
   - Left Column: Navigation links
   - Right Column: Contact information
   - Bottom Bar: Legal, social links
   - Logo: Mount Vernon Lofts centered at very bottom

### Footer Content Details

#### Navigation Links (Left)
- Font: Montserrat (font-montserrat)
- Size: text-lg md:text-xl
- Style: Title case with warm spacing (NOT uppercase)
- Links:
  - Home
  - Residences
  - Neighborhood
  - Gallery
  - Contact

#### Contact Info (Right)
- Address: Montrose, Houston, TX
- Email: info@mountvernonlofts.com
- Phone: +1 (713) 555-0100
- Note: "We're here to answer your questions about Mount Vernon Lofts"
- Inquire button (coral background mvl-coral, white text, 4px border-radius)

#### Bottom Section
- Legal disclaimer (centered)
- Social links (Instagram)
- Privacy, Terms links
- Copyright notice

### Footer Styling Rules
- Background: #2D2B29 (bg-mvl-espresso)
- Accent: #E07A5F (bg-mvl-coral) for CTAs
- Text: White with opacity variations
- Pattern: /images/tile.png (optional)
- Spacing: pt-16 pb-8 px-4
- Container: max-w-7xl mx-auto
- Min height: 500px
- Border radius: 4-8px on all elements
- Typography: Sentence case (NOT uppercase), warm tone

### Implementation Checklist
- [ ] Keep Footer in layout.tsx after {children}
- [ ] Maintain dark espresso background
- [ ] Preserve all navigation links
- [ ] Keep contact information accurate
- [ ] Ensure responsive layout works
- [ ] Logo stays centered at bottom
- [ ] Use mvl- color classes
- [ ] All text is sentence case (NOT uppercase)
- [ ] Border-radius applied (4px minimum)
- [ ] Warm, approachable tone throughout

### Do NOT:
- Remove footer from any page
- Use uppercase text (should be title/sentence case)
- Use serif fonts (use font-montserrat)
- Modify contact information
- Remove any navigation links
- Change footer structure or layout
- Use sharp corners (minimum 4px border-radius)