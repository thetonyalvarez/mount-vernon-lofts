import { describe, it, expect } from 'vitest'
import {
  units,
  getAvailableUnits,
  getAvailableCountByFloorPlan,
  floorPlanSummary,
} from '@/app/config/floor-plan-data'

describe('Unit availability', () => {
  const available = getAvailableUnits()

  it('exactly 4 units are available', () => {
    expect(available).toHaveLength(4)
  })

  it('available unit numbers are 1-7, 1-8, 1-11, 1-26', () => {
    const unitNumbers = available.map(u => u.unitNumber).sort()
    expect(unitNumbers).toEqual(['1-11', '1-26', '1-7', '1-8'])
  })

  it('Unit 1-7 is Studio S1 at 612 sq ft', () => {
    const unit = available.find(u => u.unitNumber === '1-7')
    expect(unit).toBeDefined()
    expect(unit!.floorPlan).toBe('studio-s1')
    expect(unit!.sqft).toBe(612)
  })

  it('Unit 1-8 is 1-Bed A4 at 799 sq ft', () => {
    const unit = available.find(u => u.unitNumber === '1-8')
    expect(unit).toBeDefined()
    expect(unit!.floorPlan).toBe('1bed-a4')
    expect(unit!.sqft).toBe(799)
  })

  it('Unit 1-11 is 1-Bed A1 at 717 sq ft', () => {
    const unit = available.find(u => u.unitNumber === '1-11')
    expect(unit).toBeDefined()
    expect(unit!.floorPlan).toBe('1bed-a1')
    expect(unit!.sqft).toBe(717)
  })

  it('Unit 1-26 is Studio S1 at 612 sq ft', () => {
    const unit = available.find(u => u.unitNumber === '1-26')
    expect(unit).toBeDefined()
    expect(unit!.floorPlan).toBe('studio-s1')
    expect(unit!.sqft).toBe(612)
  })

  it('Units 1-9 and 1-39 are NOT available', () => {
    const unit9 = units.find(u => u.unitNumber === '1-9')
    const unit39 = units.find(u => u.unitNumber === '1-39')
    expect(unit9!.status).not.toBe('available')
    expect(unit39!.status).not.toBe('available')
  })

  it('floorPlanSummary.availableUnits equals 4', () => {
    expect(floorPlanSummary.availableUnits).toBe(4)
  })
})
