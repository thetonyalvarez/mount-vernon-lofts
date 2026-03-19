/**
 * OPEN HOUSE SCHEDULING SYSTEM
 * ============================
 *
 * This file manages two types of open house events:
 *
 * 1. RECURRING DAILY SCHEDULE (RECURRING_SCHEDULE)
 *    - Generates a public open house event for every day automatically
 *    - Currently: 12:00 PM - 5:00 PM, 7 days/week, indefinitely
 *    - To change times: update startTime/endTime in RECURRING_SCHEDULE
 *    - To end the schedule: set effectiveUntil to an ISO date string (e.g., "2026-12-31")
 *    - To pause temporarily: set effectiveUntil to today's date
 *
 * 2. SPECIAL ONE-OFF EVENTS (SPECIAL_EVENTS array)
 *    - For broker open houses, themed events, or any non-standard event
 *    - Add a new entry to the SPECIAL_EVENTS array with full event details
 *    - IMPORTANT: If a special event falls on the same date as a recurring event,
 *      the special event REPLACES the daily event for that day
 *
 * ADDING A SPECIAL EVENT:
 *    Add to SPECIAL_EVENTS array:
 *    {
 *      id: "broker-apr-2026",
 *      title: "Broker Open House at Mount Vernon Lofts",
 *      date: "Thursday, April 2nd, 2026",
 *      startTime: "12:00 PM",
 *      endTime: "2:00 PM",
 *      eventType: 'broker',
 *      featuredUnits: ['1-7', '1-8', '1-11', '1-26'],
 *      location: { ...LOCATION },
 *      startsAt: "2026-04-02T12:00:00-05:00",
 *      expiresAt: "2026-04-02T14:00:00-05:00",
 *      description: "Broker Open House at Mount Vernon Lofts...",
 *    }
 *
 * HELPER FUNCTIONS:
 *    All helper functions (getActiveEvents, getNextEvent, etc.)
 *    automatically merge recurring + special events. No changes needed
 *    in consuming components when adding/removing events.
 */

export interface OpenHouseEvent {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
  readonly eventType: 'public' | 'broker';
  readonly featuredUnits: ReadonlyArray<string>;
  readonly location: {
    readonly name: string;
    readonly address: string;
    readonly city: string;
    readonly state: string;
    readonly zip: string;
    readonly fullAddress: string;
    readonly coordinates: {
      readonly lat: number;
      readonly lng: number;
    };
  };
  readonly startsAt: string; // ISO 8601 timestamp — when the event begins
  readonly expiresAt: string; // ISO 8601 timestamp — when the event ends
  readonly description: string;
}

interface RecurringSchedule {
  readonly startTime: string;
  readonly endTime: string;
  readonly startHour: number;
  readonly startMinute: number;
  readonly endHour: number;
  readonly endMinute: number;
  readonly utcOffset: string; // e.g., "-06:00" for CST, "-05:00" for CDT
  readonly effectiveFrom: string; // ISO date string (YYYY-MM-DD)
  readonly effectiveUntil: string | null; // null = indefinite
  readonly title: string;
  readonly description: string;
  readonly featuredUnits: ReadonlyArray<string>;
}

/**
 * Shared location data for all events at Mount Vernon Lofts
 */
const LOCATION = {
  name: "Mount Vernon Lofts",
  address: "4509 Mount Vernon",
  city: "Houston",
  state: "TX",
  zip: "77006",
  fullAddress: "4509 Mount Vernon, Houston, TX 77006",
  coordinates: {
    lat: 29.7560,
    lng: -95.3920,
  },
} as const;

/**
 * Recurring daily open house schedule.
 * Generates a public open house event for every day within the effective range.
 */
export const RECURRING_SCHEDULE: RecurringSchedule = {
  startTime: "12:00 PM",
  endTime: "5:00 PM",
  startHour: 12,
  startMinute: 0,
  endHour: 17,
  endMinute: 0,
  utcOffset: "-05:00", // CDT (Central Daylight Time). Use "-06:00" for CST.
  effectiveFrom: "2026-03-19",
  effectiveUntil: null, // indefinite
  title: "Open House at Mount Vernon Lofts",
  description: "Public Open House at Mount Vernon Lofts. 42 modern condos in Montrose. Studios and 1-bedrooms available. No RSVP needed. Open daily.",
  featuredUnits: ['1-7', '1-8', '1-11', '1-26'],
};

/**
 * Special one-off events (broker open houses, themed events, etc.)
 * These REPLACE the recurring daily event on the same date.
 * Add new special events here — they will automatically appear on the site.
 */
export const SPECIAL_EVENTS: ReadonlyArray<OpenHouseEvent> = [
  // Example:
  // {
  //   id: "broker-apr-2026",
  //   title: "Broker Open House at Mount Vernon Lofts",
  //   date: "Thursday, April 2nd, 2026",
  //   startTime: "12:00 PM",
  //   endTime: "2:00 PM",
  //   eventType: 'broker',
  //   featuredUnits: ['1-7', '1-8', '1-11', '1-26'],
  //   location: LOCATION,
  //   startsAt: "2026-04-02T12:00:00-05:00",
  //   expiresAt: "2026-04-02T14:00:00-05:00",
  //   description: "Broker Open House with 4% buy-side commission...",
  // },
];

// Day names for formatting
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function formatDateString(date: Date): string {
  const dayName = DAYS[date.getDay()];
  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${dayName}, ${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
}

function toISODateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Generate a recurring open house event for a specific date.
 */
function generateEventForDate(date: Date): OpenHouseEvent {
  const dateStr = toISODateString(date);
  const { startHour, startMinute, endHour, endMinute, utcOffset } = RECURRING_SCHEDULE;

  const startsAt = `${dateStr}T${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}:00${utcOffset}`;
  const expiresAt = `${dateStr}T${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}:00${utcOffset}`;

  return {
    id: `public-daily-${dateStr}`,
    title: RECURRING_SCHEDULE.title,
    date: formatDateString(date),
    startTime: RECURRING_SCHEDULE.startTime,
    endTime: RECURRING_SCHEDULE.endTime,
    eventType: 'public',
    featuredUnits: RECURRING_SCHEDULE.featuredUnits,
    location: LOCATION,
    startsAt,
    expiresAt,
    description: RECURRING_SCHEDULE.description,
  };
}

/**
 * Check if a date falls within the recurring schedule's effective range.
 */
function isDateInScheduleRange(date: Date): boolean {
  const dateStr = toISODateString(date);
  if (dateStr < RECURRING_SCHEDULE.effectiveFrom) return false;
  if (RECURRING_SCHEDULE.effectiveUntil !== null && dateStr > RECURRING_SCHEDULE.effectiveUntil) return false;
  return true;
}

/**
 * Get the ISO date string (YYYY-MM-DD) from an event's startsAt timestamp.
 */
function getEventDateStr(event: OpenHouseEvent): string {
  return event.startsAt.split('T')[0];
}

/**
 * Generate all open house events for a rolling window of days.
 * Merges recurring daily events with special events.
 * Special events replace the recurring event on the same date.
 *
 * @param days Number of days to generate (default: 7)
 */
function getAllEvents(days: number = 7): ReadonlyArray<OpenHouseEvent> {
  const events: OpenHouseEvent[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Collect dates that have special events
  const specialEventDates = new Set(
    SPECIAL_EVENTS.map(event => getEventDateStr(event))
  );

  // Generate recurring events for the rolling window, skipping dates with special events
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const dateStr = toISODateString(date);

    // Skip if a special event exists for this date (special replaces daily)
    if (specialEventDates.has(dateStr)) continue;

    // Skip if outside the recurring schedule range
    if (!isDateInScheduleRange(date)) continue;

    events.push(generateEventForDate(date));
  }

  // Add all active special events
  const activeSpecialEvents = SPECIAL_EVENTS.filter(isEventActive);
  events.push(...activeSpecialEvents);

  // Sort by start time
  events.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  return events;
}

// --- Public API (same interface as before) ---

/**
 * Check if a specific event has not yet expired (still active in the system).
 * An event is "active" from now until its end time.
 */
export function isEventActive(event: OpenHouseEvent): boolean {
  const now = new Date();
  const expirationDate = new Date(event.expiresAt);
  return now < expirationDate;
}

/**
 * Check if a specific event is upcoming (has not yet started).
 * Used for the banner — the banner should only show before the event begins.
 */
export function isEventUpcoming(event: OpenHouseEvent): boolean {
  const now = new Date();
  const startDate = new Date(event.startsAt);
  return now < startDate;
}

/**
 * Get all upcoming (not yet started) open house events
 */
export function getUpcomingEvents(): ReadonlyArray<OpenHouseEvent> {
  return getAllEvents().filter(isEventUpcoming);
}

/**
 * Get all active events (includes currently-in-progress events)
 */
export function getActiveEvents(): ReadonlyArray<OpenHouseEvent> {
  return getAllEvents().filter(isEventActive);
}

/**
 * Get the next upcoming event (for banner display).
 * Returns null if no events are upcoming (event has started or all expired).
 */
export function getNextEvent(): OpenHouseEvent | null {
  const upcoming = getUpcomingEvents();
  return upcoming.length > 0 ? upcoming[0] : null;
}

/**
 * Check if there are any upcoming (not yet started) open house events.
 * Used by the banner to decide whether to render.
 */
export function hasUpcomingEvents(): boolean {
  return getUpcomingEvents().length > 0;
}

/**
 * Check if there are any active open house events (includes in-progress).
 * Used by the open house landing page.
 */
export function hasActiveEvents(): boolean {
  return getActiveEvents().length > 0;
}

/**
 * Format the event date for display
 */
export function formatEventDate(event: OpenHouseEvent): string {
  return `${event.date} | ${event.startTime} - ${event.endTime}`;
}

/**
 * Find an event by its date (ISO format: 2026-03-19).
 */
export function getEventByDate(dateStr: string): OpenHouseEvent | null {
  return getAllEvents(30).find(event => getEventDateStr(event) === dateStr) ?? null;
}

/**
 * Get the most recent active event by type (broker or public).
 */
export function getActiveEventByType(eventType: 'public' | 'broker'): OpenHouseEvent | null {
  return getActiveEvents().find(event => event.eventType === eventType) ?? null;
}

/**
 * Get the latest event by type regardless of active/expired status.
 * Used by form pages that should remain accessible after an event ends.
 */
export function getLatestEventByType(eventType: 'public' | 'broker'): OpenHouseEvent | null {
  if (eventType === 'public') {
    // For public events, generate today's event (always available with recurring schedule)
    const today = new Date();
    if (isDateInScheduleRange(today)) {
      return generateEventForDate(today);
    }
  }

  // For broker or if recurring schedule is inactive, check special events
  const matching = SPECIAL_EVENTS.filter(event => event.eventType === eventType);
  if (matching.length === 0) return null;
  return matching[matching.length - 1];
}

// Legacy exports for backward compatibility
export const OPEN_HOUSE_EVENTS = SPECIAL_EVENTS;
export const OPEN_HOUSE_EVENT = null;
export const isOpenHouseActive = hasActiveEvents;
