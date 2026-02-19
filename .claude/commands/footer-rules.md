# Footer Rules for Mount Vernon Lofts

## Footer Configuration

### Centralized Footer Management
- All footer content is managed in `app/config/navigation.ts`
- This file contains:
  - Footer navigation links
  - Footer bottom links (Press, Privacy)
  - Social media links
  - Contact information (address, email, phone)
  - Legal disclaimer text
  - Copyright text

### Updating Footer Content
To modify any footer content:
1. Open `app/config/navigation.ts`
2. Update the relevant section:
   - `footerNavLinks` for main navigation
   - `footerBottomLinks` for bottom links
   - `socialLinks` for social media URLs
   - `contactInfo` for contact details
   - `legalDisclaimer` for legal text
   - `copyrightText` for copyright
3. Changes automatically reflect in Footer component

## Footer Implementation Guidelines

### Structure and Location
- The Footer component is located in `app/components/Footer.tsx`
- Site-wide footer is implemented via direct import in `app/layout.tsx`
- Footer appears at the bottom of all pages after main content

### Footer Component Structure
1. **Background**: Dark espresso background (bg-mvl-espresso) with tiled pattern overlay
2. **Main Content**: Two-column layout with navigation and contact info
3. **Logo**: Mount Vernon Lofts logo centered at the very bottom
4. **Corner radius**: All sections use 4-8px border-radius

### Footer Sections

#### Left Column - Navigation Links
- Font: Montserrat (font-montserrat)
- Size: text-lg md:text-xl
- Style: Title case, warm and approachable (NOT uppercase)
- Links include:
  - Home
  - Residences
  - Neighborhood
  - Gallery
  - Contact

#### Right Column - Contact Information
- Address: Montrose, Houston, TX
- Email: info@mountvernonlofts.com
- Phone: +1 (713) 555-0100
- Note: "We're here to answer your questions about Mount Vernon Lofts"
- Inquire button: Coral background (bg-mvl-coral), white text, 4px border-radius

#### Bottom Bar
- Legal disclaimer (centered)
- Footer links: Privacy, Terms
- Social media: Instagram
- Copyright notice
- Brand: Warm, approachable tone (NOT luxury)

### Styling Rules
- Background: bg-mvl-espresso (#2D2B29)
- Text: White with various opacity levels
- Accent: mvl-coral (#E07A5F) for CTAs and highlights
- Pattern overlay: tile.png at 25% opacity (optional)
- Padding: pt-16 pb-8 px-4
- Max width: max-w-7xl
- Min height: min-h-[500px]
- Border radius: 4-8px on all elements

### Implementation Requirements
- Always use the Footer component from app/components/Footer.tsx
- Ensure footer is included in layout.tsx after {children}
- Footer should appear on all pages
- Maintain dark espresso background with warm aesthetic
- Keep all navigation links and contact information
- Use mvl- color classes throughout

### Consistency Checks
When modifying footer:
1. Verify footer appears on all pages
2. Check that warm color palette is applied correctly
3. Ensure all links are present and functional
4. Confirm responsive layout works on mobile/desktop
5. Verify logo appears at bottom center
6. Confirm all text is sentence case (NOT uppercase)
7. Verify border-radius applied to all corners (4-8px minimum)