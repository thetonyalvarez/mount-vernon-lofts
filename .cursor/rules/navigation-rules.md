# Mount Vernon Lofts - Navigation Rules

## Navigation Configuration

### Centralized Link Management
- All navigation links are managed in `app/config/navigation.ts`
- Edit this file to update links - DO NOT modify components directly
- Available configurations:
  - `mainNavLinks` - Mobile menu links
  - `footerNavLinks` - Footer navigation
  - `footerBottomLinks` - Footer bottom links
  - `socialLinks` - Social media URLs
  - `contactInfo` - Contact details

## Navigation Implementation

### Always Include Navigation
- Navigation is implemented site-wide via `app/components/navigation/NavigationWrapper.tsx` in `app/layout.tsx`
- Never remove NavigationWrapper from layout.tsx
- Navigation components are in `app/components/navigation/` directory

### Navigation Component Structure
```
app/components/navigation/
├── Navigation.tsx       # Main navigation bar with Mount Vernon Lofts branding
├── MobileMenu.tsx      # Mobile menu overlay
├── NavigationWrapper.tsx # Client wrapper managing state
└── index.ts            # Exports
```

### Navigation Styling Rules
- Fixed positioning at top of viewport
- White text on transparent background
- Z-index: Navigation (40), Mobile Menu (50)
- Sentence case text with letter spacing (NOT uppercase)
- Smooth transitions (300ms duration)
- Coral highlight (mvl-coral) on hover/active states
- Border radius: 4px on buttons (NO sharp corners)
- Inquire button: bg-mvl-coral, white text, 4px radius

### Required Navigation Links
Mobile menu must include these sections:
- Home (#home)
- Residences (#residences)
- Neighborhood (#neighborhood)
- Gallery (#gallery)
- Contact (#contact)

### Implementation Checklist
When working with navigation:
- [ ] Keep NavigationWrapper in layout.tsx
- [ ] Maintain consistent white text styling
- [ ] Ensure mobile menu closes on link click
- [ ] Preserve fixed positioning
- [ ] Keep proper z-index layering
- [ ] Use existing Lucide React icons
- [ ] Brand text displays "Mount Vernon Lofts"
- [ ] Use mvl- color classes throughout
- [ ] All text is sentence case (NOT uppercase)
- [ ] Border-radius applied (4px minimum)

### Do NOT:
- Remove navigation from any page
- Use uppercase text (should be sentence/title case)
- Remove rounded corners (minimum 4px border-radius)
- Add extra background colors to navigation bar
- Modify z-index values
- Use sharp corners on any buttons
- Remove Mount Vernon Lofts branding