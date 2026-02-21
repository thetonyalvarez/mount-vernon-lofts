import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import {
  isEventActive,
  isEventUpcoming,
  getNextEvent,
  hasUpcomingEvents,
  type OpenHouseEvent,
} from "../open-house-data"

// A test event: Feb 26, 2026, 12pm-2pm CST (Broker Open House)
const TEST_EVENT: OpenHouseEvent = {
  id: "test-event",
  title: "Test Broker Open House",
  date: "Thursday, February 26th, 2026",
  startTime: "12:00 PM",
  endTime: "2:00 PM",
  location: {
    name: "Mount Vernon Lofts",
    address: "4509 Mount Vernon",
    city: "Houston",
    state: "TX",
    zip: "77006",
    fullAddress: "4509 Mount Vernon, Houston, TX 77006",
    coordinates: { lat: 29.756, lng: -95.392 },
  },
  startsAt: "2026-02-26T12:00:00-06:00",
  expiresAt: "2026-02-26T14:00:00-06:00",
  description: "Test event.",
}

describe("isEventActive", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns true when the event has not yet expired", () => {
    // 1 week before the event
    vi.setSystemTime(new Date("2026-02-19T10:00:00-06:00"))
    expect(isEventActive(TEST_EVENT)).toBe(true)
  })

  it("returns true during the event (between start and expiry)", () => {
    // During the event: 1pm on event day
    vi.setSystemTime(new Date("2026-02-26T13:00:00-06:00"))
    expect(isEventActive(TEST_EVENT)).toBe(true)
  })

  it("returns false after the event expires", () => {
    // After the event ends
    vi.setSystemTime(new Date("2026-02-26T15:00:00-06:00"))
    expect(isEventActive(TEST_EVENT)).toBe(false)
  })
})

describe("isEventUpcoming", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns true when the event is in the future (before start time)", () => {
    // 1 week before
    vi.setSystemTime(new Date("2026-02-19T10:00:00-06:00"))
    expect(isEventUpcoming(TEST_EVENT)).toBe(true)
  })

  it("returns true 1 hour before the event starts", () => {
    vi.setSystemTime(new Date("2026-02-26T11:00:00-06:00"))
    expect(isEventUpcoming(TEST_EVENT)).toBe(true)
  })

  it("returns false once the event has started", () => {
    // Exactly at start time
    vi.setSystemTime(new Date("2026-02-26T12:00:00-06:00"))
    expect(isEventUpcoming(TEST_EVENT)).toBe(false)
  })

  it("returns false during the event", () => {
    vi.setSystemTime(new Date("2026-02-26T13:00:00-06:00"))
    expect(isEventUpcoming(TEST_EVENT)).toBe(false)
  })

  it("returns false after the event expires", () => {
    vi.setSystemTime(new Date("2026-02-26T15:00:00-06:00"))
    expect(isEventUpcoming(TEST_EVENT)).toBe(false)
  })
})

describe("hasUpcomingEvents", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns true when there are future events", () => {
    vi.setSystemTime(new Date("2026-02-19T10:00:00-06:00"))
    expect(hasUpcomingEvents()).toBe(true)
  })

  it("returns false when the next event has already started", () => {
    // After event start time
    vi.setSystemTime(new Date("2026-02-26T12:30:00-06:00"))
    expect(hasUpcomingEvents()).toBe(false)
  })

  it("returns false when all events have expired", () => {
    vi.setSystemTime(new Date("2027-01-01T00:00:00-06:00"))
    expect(hasUpcomingEvents()).toBe(false)
  })
})

describe("getNextEvent", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("returns the next upcoming event when one exists", () => {
    vi.setSystemTime(new Date("2026-02-19T10:00:00-06:00"))
    const event = getNextEvent()
    expect(event).not.toBeNull()
    expect(event?.id).toBe("broker-feb-2026")
  })

  it("returns null when the event has already started", () => {
    vi.setSystemTime(new Date("2026-02-26T12:30:00-06:00"))
    expect(getNextEvent()).toBeNull()
  })

  it("returns null when all events have expired", () => {
    vi.setSystemTime(new Date("2027-01-01T00:00:00-06:00"))
    expect(getNextEvent()).toBeNull()
  })
})
