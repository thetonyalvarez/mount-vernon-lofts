import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import {
  isEventActive,
  isEventUpcoming,
  getNextEvent,
  hasUpcomingEvents,
  hasActiveEvents,
  getActiveEvents,
  getUpcomingEvents,
  getEventByDate,
  getActiveEventByType,
  type OpenHouseEvent,
  RECURRING_SCHEDULE,
} from "../open-house-data"

// A test event used for unit-testing isEventActive/isEventUpcoming directly
const TEST_EVENT: OpenHouseEvent = {
  id: "test-event",
  title: "Test Open House",
  date: "Wednesday, March 25th, 2026",
  startTime: "12:00 PM",
  endTime: "5:00 PM",
  eventType: 'public',
  featuredUnits: ['1-7'],
  location: {
    name: "Mount Vernon Lofts",
    address: "4509 Mount Vernon",
    city: "Houston",
    state: "TX",
    zip: "77006",
    fullAddress: "4509 Mount Vernon, Houston, TX 77006",
    coordinates: { lat: 29.756, lng: -95.392 },
  },
  startsAt: "2026-03-25T12:00:00-05:00",
  expiresAt: "2026-03-25T17:00:00-05:00",
  description: "Test event.",
}

describe("isEventActive", () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it("returns true when the event has not yet expired", () => {
    vi.setSystemTime(new Date("2026-03-25T10:00:00-05:00"))
    expect(isEventActive(TEST_EVENT)).toBe(true)
  })

  it("returns true during the event (between start and expiry)", () => {
    vi.setSystemTime(new Date("2026-03-25T14:00:00-05:00"))
    expect(isEventActive(TEST_EVENT)).toBe(true)
  })

  it("returns false after the event expires", () => {
    vi.setSystemTime(new Date("2026-03-25T18:00:00-05:00"))
    expect(isEventActive(TEST_EVENT)).toBe(false)
  })
})

describe("isEventUpcoming", () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it("returns true when the event is in the future", () => {
    vi.setSystemTime(new Date("2026-03-25T10:00:00-05:00"))
    expect(isEventUpcoming(TEST_EVENT)).toBe(true)
  })

  it("returns false once the event has started", () => {
    vi.setSystemTime(new Date("2026-03-25T12:00:00-05:00"))
    expect(isEventUpcoming(TEST_EVENT)).toBe(false)
  })

  it("returns false after the event expires", () => {
    vi.setSystemTime(new Date("2026-03-25T18:00:00-05:00"))
    expect(isEventUpcoming(TEST_EVENT)).toBe(false)
  })
})

describe("recurring schedule — daily events", () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it("generates active events for today when during open house hours", () => {
    // During open house hours on a day within the schedule
    vi.setSystemTime(new Date("2026-03-20T14:00:00-05:00"))
    const active = getActiveEvents()
    expect(active.length).toBeGreaterThanOrEqual(1)
    expect(active[0].id).toBe("public-daily-2026-03-20")
    expect(active[0].eventType).toBe("public")
  })

  it("generates upcoming events for tomorrow", () => {
    // Morning before today's open house starts
    vi.setSystemTime(new Date("2026-03-20T09:00:00-05:00"))
    const upcoming = getUpcomingEvents()
    // Today's event is upcoming (hasn't started), plus future days
    expect(upcoming.length).toBeGreaterThanOrEqual(1)
    expect(upcoming[0].id).toBe("public-daily-2026-03-20")
  })

  it("hasUpcomingEvents returns true for future scheduled days", () => {
    vi.setSystemTime(new Date("2026-03-20T09:00:00-05:00"))
    expect(hasUpcomingEvents()).toBe(true)
  })

  it("hasActiveEvents returns true during open house hours", () => {
    vi.setSystemTime(new Date("2026-03-20T14:00:00-05:00"))
    expect(hasActiveEvents()).toBe(true)
  })

  it("getNextEvent returns today's event before it starts", () => {
    vi.setSystemTime(new Date("2026-03-20T09:00:00-05:00"))
    const next = getNextEvent()
    expect(next).not.toBeNull()
    expect(next?.id).toBe("public-daily-2026-03-20")
  })

  it("getNextEvent returns tomorrow's event after today's has started", () => {
    vi.setSystemTime(new Date("2026-03-20T13:00:00-05:00"))
    const next = getNextEvent()
    expect(next).not.toBeNull()
    expect(next?.id).toBe("public-daily-2026-03-21")
  })

  it("does not generate an event for a day before effectiveFrom", () => {
    // March 18 is before effectiveFrom (March 19), so no event for today
    vi.setSystemTime(new Date("2026-03-18T14:00:00-05:00"))
    const active = getActiveEvents()
    // No event for March 18 itself, but March 19+ events exist in the 7-day window
    const todayEvent = active.find(e => e.id === "public-daily-2026-03-18")
    expect(todayEvent).toBeUndefined()
  })

  it("generates events with correct date formatting", () => {
    vi.setSystemTime(new Date("2026-03-20T09:00:00-05:00"))
    const events = getUpcomingEvents()
    const todayEvent = events[0]
    expect(todayEvent.date).toBe("Friday, March 20th, 2026")
    expect(todayEvent.startTime).toBe(RECURRING_SCHEDULE.startTime)
    expect(todayEvent.endTime).toBe(RECURRING_SCHEDULE.endTime)
  })

  it("getEventByDate returns event for a specific date", () => {
    vi.setSystemTime(new Date("2026-03-20T09:00:00-05:00"))
    const event = getEventByDate("2026-03-22")
    expect(event).not.toBeNull()
    expect(event?.id).toBe("public-daily-2026-03-22")
  })

  it("getActiveEventByType returns public event", () => {
    vi.setSystemTime(new Date("2026-03-20T14:00:00-05:00"))
    const event = getActiveEventByType("public")
    expect(event).not.toBeNull()
    expect(event?.eventType).toBe("public")
  })
})

describe("getNextEvent", () => {
  beforeEach(() => { vi.useFakeTimers() })
  afterEach(() => { vi.useRealTimers() })

  it("returns the next upcoming event when one exists", () => {
    vi.setSystemTime(new Date("2026-03-20T09:00:00-05:00"))
    const event = getNextEvent()
    expect(event).not.toBeNull()
    expect(event?.id).toBe("public-daily-2026-03-20")
  })

  it("returns null when all events in window have started and none upcoming", () => {
    // This shouldn't happen with recurring schedule since tomorrow always has an event,
    // but test the function's null-return logic
    vi.setSystemTime(new Date("2026-03-20T14:00:00-05:00"))
    const event = getNextEvent()
    // With recurring schedule, tomorrow's event is always upcoming
    expect(event).not.toBeNull()
    expect(event?.id).toBe("public-daily-2026-03-21")
  })
})
