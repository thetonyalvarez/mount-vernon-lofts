# Floor Plans — Implementation Notes

## Data Source

Floor plan data comes from `app/config/floor-plan-data.ts`, sourced from the MVL Stacking Plan spreadsheet.

## Floor Plan Types (6 layouts)

| Plan | Type | Sq Ft | Units |
|------|------|-------|-------|
| S1 | Studio | 612 | 32 |
| S2 | Studio | 705 | 2 |
| A1 | 1-Bedroom | 717 | 2 |
| A2 | 1-Bedroom | 719 | 2 |
| A3 | 1-Bedroom | 778 | 2 |
| A4 | 1-Bedroom | 799 | 2 |

**Total: 42 units** (41 sellable, 1 under construction)

## Floor Plan Images

Local: `public/floor-plans/` (6 JPG files)
Production: Will be served from S3 (`mount-vernon-lofts` bucket)

## Components

- `FloorPlanOverview.tsx` — Visual grid of all 6 layouts with lightbox viewer
- `FloorPlanSelector.tsx` — Detailed cards grouped by type with availability badges
- `FloorPlanForm.tsx` — Lead capture form with floor plan interest dropdown

## Updating Availability

Edit the `status` field in `app/config/floor-plan-data.ts` for each unit. Valid statuses:
- `available` — Currently for sale
- `not-yet-released` — Will be released later
- `under-construction` — Not yet sellable
- `occupied` — Sold/occupied

## Testing

After any floor plan changes:
1. `npm run build` — zero errors
2. `npx vitest run` — all tests pass
3. Verify floor plan images load on the page
4. Verify form dropdown options match current layouts
