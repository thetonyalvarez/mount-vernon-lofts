/**
 * Floor Plan Data for Mount Vernon Lofts
 * Source: MVL Stacking Plan (Excel)
 *
 * 6 floor plan types across 42 total units (41 sellable, 1 under construction)
 * Building: 2 residential floors (Floor 2 and Floor 3)
 * Orientations: West, East, South
 */

export interface FloorPlanType {
  readonly id: string
  readonly name: string
  readonly label: string
  readonly type: 'studio' | '1-bedroom'
  readonly sqft: number
  readonly bedrooms: number
  readonly bathrooms: number
  readonly image: string
  readonly unitCount: number
  readonly features: ReadonlyArray<string>
}

export interface Unit {
  readonly unitNumber: string
  readonly floorPlan: string
  readonly floor: number
  readonly side: string
  readonly sqft: number
  readonly status: 'available' | 'not-yet-released' | 'under-construction' | 'occupied'
}

// Floor plan types with specifications
export const floorPlanTypes: ReadonlyArray<FloorPlanType> = [
  {
    id: 'studio-s1',
    name: 'S1',
    label: 'Studio S1',
    type: 'studio',
    sqft: 612,
    bedrooms: 0,
    bathrooms: 1,
    image: '/floor-plans/Studio S1 - 612 sq ft.jpg',
    unitCount: 32,
    features: [
      'Open-concept layout',
      'In-unit washer/dryer',
      '1 covered parking space',
      'Natural light throughout',
    ],
  },
  {
    id: 'studio-s2',
    name: 'S2',
    label: 'Studio S2',
    type: 'studio',
    sqft: 705,
    bedrooms: 0,
    bathrooms: 1,
    image: '/floor-plans/Studio S2 - 705 sq ft.jpg',
    unitCount: 2,
    features: [
      'Expanded open layout',
      'In-unit washer/dryer',
      '1 covered parking space',
      'Natural light throughout',
    ],
  },
  {
    id: '1bed-a1',
    name: 'A1',
    label: '1-Bed A1',
    type: '1-bedroom',
    sqft: 717,
    bedrooms: 1,
    bathrooms: 1,
    image: '/floor-plans/1-Bed A1 - 717 sq ft.jpg',
    unitCount: 2,
    features: [
      'Separate bedroom',
      'In-unit washer/dryer',
      '1 covered parking space',
      'Natural light throughout',
    ],
  },
  {
    id: '1bed-a2',
    name: 'A2',
    label: '1-Bed A2',
    type: '1-bedroom',
    sqft: 719,
    bedrooms: 1,
    bathrooms: 1,
    image: '/floor-plans/1-Bed A2 - 719 sq ft.jpg',
    unitCount: 2,
    features: [
      'Separate bedroom',
      'In-unit washer/dryer',
      '1 covered parking space',
      'Natural light throughout',
    ],
  },
  {
    id: '1bed-a3',
    name: 'A3',
    label: '1-Bed A3',
    type: '1-bedroom',
    sqft: 778,
    bedrooms: 1,
    bathrooms: 1,
    image: '/floor-plans/1-Bed A3 - 778 sq ft.jpg',
    unitCount: 2,
    features: [
      'Spacious 1-bedroom layout',
      'In-unit washer/dryer',
      '1 covered parking space',
      'Natural light throughout',
    ],
  },
  {
    id: '1bed-a4',
    name: 'A4',
    label: '1-Bed A4',
    type: '1-bedroom',
    sqft: 799,
    bedrooms: 1,
    bathrooms: 1,
    image: '/floor-plans/1-Bed A4 - 799 sq ft.jpg',
    unitCount: 2,
    features: [
      'Largest 1-bedroom layout',
      'In-unit washer/dryer',
      '1 covered parking space',
      'Natural light throughout',
    ],
  },
]

// All 42 units from the stacking plan
export const units: ReadonlyArray<Unit> = [
  // Floor 2 (Units 1-1 through 1-21)
  { unitNumber: '1-1', floorPlan: 'studio-s1', floor: 2, side: 'West', sqft: 612, status: 'under-construction' },
  { unitNumber: '1-2', floorPlan: 'studio-s1', floor: 2, side: 'West', sqft: 612, status: 'occupied' },
  { unitNumber: '1-3', floorPlan: 'studio-s1', floor: 2, side: 'West', sqft: 612, status: 'occupied' },
  { unitNumber: '1-4', floorPlan: 'studio-s1', floor: 2, side: 'West', sqft: 612, status: 'occupied' },
  { unitNumber: '1-5', floorPlan: 'studio-s1', floor: 2, side: 'West', sqft: 612, status: 'occupied' },
  { unitNumber: '1-6', floorPlan: 'studio-s1', floor: 2, side: 'West', sqft: 612, status: 'occupied' },
  { unitNumber: '1-7', floorPlan: 'studio-s1', floor: 2, side: 'West', sqft: 612, status: 'available' },
  { unitNumber: '1-8', floorPlan: '1bed-a4', floor: 2, side: 'South', sqft: 799, status: 'available' },
  { unitNumber: '1-9', floorPlan: '1bed-a3', floor: 2, side: 'East', sqft: 778, status: 'available' },
  { unitNumber: '1-10', floorPlan: 'studio-s2', floor: 2, side: 'East', sqft: 705, status: 'not-yet-released' },
  { unitNumber: '1-11', floorPlan: '1bed-a1', floor: 2, side: 'East', sqft: 717, status: 'available' },
  { unitNumber: '1-12', floorPlan: 'studio-s1', floor: 2, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-13', floorPlan: 'studio-s1', floor: 2, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-14', floorPlan: 'studio-s1', floor: 2, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-15', floorPlan: 'studio-s1', floor: 2, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-16', floorPlan: 'studio-s1', floor: 2, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-17', floorPlan: 'studio-s1', floor: 2, side: 'East', sqft: 612, status: 'not-yet-released' },
  { unitNumber: '1-18', floorPlan: 'studio-s1', floor: 2, side: 'East', sqft: 612, status: 'not-yet-released' },
  { unitNumber: '1-19', floorPlan: '1bed-a2', floor: 2, side: 'East', sqft: 719, status: 'not-yet-released' },
  { unitNumber: '1-20', floorPlan: '1bed-a1', floor: 2, side: 'East', sqft: 717, status: 'not-yet-released' },
  { unitNumber: '1-21', floorPlan: 'studio-s2', floor: 2, side: 'East', sqft: 705, status: 'not-yet-released' },

  // Floor 3 (Units 1-22 through 1-42)
  { unitNumber: '1-22', floorPlan: 'studio-s1', floor: 3, side: 'West', sqft: 612, status: 'occupied' },
  { unitNumber: '1-23', floorPlan: 'studio-s1', floor: 3, side: 'West', sqft: 612, status: 'occupied' },
  { unitNumber: '1-24', floorPlan: 'studio-s1', floor: 3, side: 'West', sqft: 612, status: 'occupied' },
  { unitNumber: '1-25', floorPlan: 'studio-s1', floor: 3, side: 'West', sqft: 612, status: 'not-yet-released' },
  { unitNumber: '1-26', floorPlan: 'studio-s1', floor: 3, side: 'West', sqft: 612, status: 'available' },
  { unitNumber: '1-27', floorPlan: 'studio-s1', floor: 3, side: 'West', sqft: 612, status: 'occupied' },
  { unitNumber: '1-28', floorPlan: '1bed-a4', floor: 3, side: 'South', sqft: 799, status: 'not-yet-released' },
  { unitNumber: '1-29', floorPlan: '1bed-a3', floor: 3, side: 'East', sqft: 778, status: 'not-yet-released' },
  { unitNumber: '1-30', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'not-yet-released' },
  { unitNumber: '1-31', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'not-yet-released' },
  { unitNumber: '1-32', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-33', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-34', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-35', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-36', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'occupied' },
  { unitNumber: '1-37', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'not-yet-released' },
  { unitNumber: '1-38', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'not-yet-released' },
  { unitNumber: '1-39', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'available' },
  { unitNumber: '1-40', floorPlan: '1bed-a2', floor: 3, side: 'East', sqft: 719, status: 'not-yet-released' },
  { unitNumber: '1-41', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'not-yet-released' },
  { unitNumber: '1-42', floorPlan: 'studio-s1', floor: 3, side: 'East', sqft: 612, status: 'not-yet-released' },
]

// Helper functions
export function getAvailableUnits(): ReadonlyArray<Unit> {
  return units.filter(u => u.status === 'available')
}

export function getUnitsByFloorPlan(floorPlanId: string): ReadonlyArray<Unit> {
  return units.filter(u => u.floorPlan === floorPlanId)
}

export function getAvailableCountByFloorPlan(floorPlanId: string): number {
  return units.filter(u => u.floorPlan === floorPlanId && u.status === 'available').length
}

export function getFloorPlanById(id: string): FloorPlanType | undefined {
  return floorPlanTypes.find(fp => fp.id === id)
}

// Summary stats
export const floorPlanSummary = {
  totalUnits: 42,
  sellableUnits: units.filter(u => u.status !== 'under-construction').length,
  availableUnits: units.filter(u => u.status === 'available').length,
  studioCount: floorPlanTypes.filter(fp => fp.type === 'studio').reduce((sum, fp) => sum + fp.unitCount, 0),
  oneBedroomCount: floorPlanTypes.filter(fp => fp.type === '1-bedroom').reduce((sum, fp) => sum + fp.unitCount, 0),
  sqftRange: {
    min: Math.min(...floorPlanTypes.map(fp => fp.sqft)),
    max: Math.max(...floorPlanTypes.map(fp => fp.sqft)),
  },
} as const
