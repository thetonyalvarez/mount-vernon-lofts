# Navigation Rules for Mount Vernon Lofts

## Navigation Configuration

### Centralized Navigation Management
- All navigation and footer links are managed in `app/config/navigation.ts`
- This file contains:
  - Main navigation links (mobile menu)
  - Footer navigation links
  - Footer bottom links (Press, Privacy)
  - Social media links
  - Contact information
  - Legal disclaimer and copyright text

### Updating Links
To modify any navigation or footer links:
1. Open `app/config/navigation.ts`
2. Update the relevant array or object
3. Changes will automatically reflect across all components
4. No need to modify individual components

## Navigation Implementation Guidelines

### Structure and Location
- The navigation components are located in `app/components/navigation/`
- Site-wide navigation is implemented via `NavigationWrapper` component in `app/layout.tsx`
- Navigation is fixed at the top of all pages with z-index 40

### Navigation Components
1. **Navigation.tsx**: Main navigation bar component
   - Fixed positioning at top
   - Contains Menu button (left) and Inquire button (right)
   - White text on transparent background
   - Uses Lucide React Menu icon
   - Logo/brand text: "Mount Vernon Lofts"

2. **MobileMenu.tsx**: Full-screen mobile menu overlay
   - Opens when Menu button is clicked
   - Dark overlay (bg-black bg-opacity-95) with z-index 50
   - Contains navigation links for main sections
   - Close button (X) in top-right corner

3. **NavigationWrapper.tsx**: Client-side wrapper component
   - Manages menu open/close state
   - Must be used in layout.tsx to ensure site-wide implementation

### Styling Rules
- Navigation text: White color, sentence case (NOT uppercase), tracked spacing
- Menu button: Flex layout with icon and "Menu" text
- Inquire button: Coral background (bg-mvl-coral), white text, 4px border-radius, smooth transitions
- Mobile menu links: White text, hover:text-mvl-coral
- All transitions should use smooth animations (transition-all duration-300)
- Border radius: 4px on all interactive elements (NO sharp corners)

### Navigation Links Structure
The mobile menu should contain these links in order:
1. Home (#home)
2. Residences (#residences)
3. Neighborhood (#neighborhood)
4. Gallery (#gallery)
5. Contact (#contact)

### Implementation Requirements
- Always use the NavigationWrapper component in layout.tsx
- Ensure navigation is visible on all pages
- Navigation should be above all content (z-40 for nav, z-50 for mobile menu)
- Menu state should be managed at the layout level
- Clicking any link in mobile menu should close the menu
- Brand text displays "Mount Vernon Lofts"
- Use mvl- color classes throughout

### Consistency Checks
When modifying navigation:
1. Verify navigation appears on all pages
2. Check that styling matches warm, approachable aesthetic
3. Ensure mobile menu opens/closes smoothly
4. Test that all navigation links work correctly
5. Confirm z-index layering is correct
6. Verify all text is sentence case (NOT uppercase)
7. Verify coral accent color (mvl-coral) on interactive elements
8. Confirm border-radius applied (4px minimum)