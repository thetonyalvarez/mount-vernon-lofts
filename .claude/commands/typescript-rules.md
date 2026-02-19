# TypeScript & React Coding Rules

## Props and Type Safety
- Add `Readonly<>` to the props type to prevent accidental mutations of the params object when appropriate
- Use `null` instead of `undefined` for empty values, as it is a more explicit and safer approach
- Use nullish coalescing operator (`??`) instead of logical or (`||`), as it is a safer operator

## Component Patterns

### Image Components
For images, always use:
```typescript
import { Image } from '@/components/ui/image'
```
Instead of:
```typescript
import Image from 'next/image'
```

### Ternary Operations
Extract nested ternary operations into independent statements.

**Before:**
```typescript
{isToggling ? 'Toggling...' : useMockData ? 'Use Real Data' : 'Use Mock Data'}
```

**After:**
```typescript
const getToggleButtonText = () => {
  if (isToggling) return 'Toggling...';
  return useMockData ? 'Use Real Data' : 'Use Mock Data';
};
{getToggleButtonText()}
```

### React Keys
Do not use Array index in keys. Always use unique identifiers.

**Example 1 - Skeleton Loading:**
```typescript
// Before
{Array(5).fill(0).map((_, i) => (
  <div key={i} className="rounded-lg border bg-card p-4 shadow-sm">
    <AnalyticsCardSkeleton />
  </div>
))}

// After
{['total', 'open', 'click', 'reply', 'opportunities'].map((metric) => (
  <div key={`skeleton-${metric}`} className="rounded-lg border bg-card p-4 shadow-sm">
    <AnalyticsCardSkeleton />
  </div>
))}
```

**Example 2 - Data Mapping:**
```typescript
// Before
accounts.map((account, index) => (
  <TableRow key={index}>
    {/* content */}
  </TableRow>
))

// After
accounts.map((account) => (
  <TableRow key={`account-${account.sendingAccount}`}>
    {/* content */}
  </TableRow>
))
```

## Application Scope
These rules apply to:
- **File Types:** `.ts`, `.tsx`, `.js`, `.jsx`
- **Components:** React functional components, hooks, utilities
- **Context:** Mount Vernon Lofts website project