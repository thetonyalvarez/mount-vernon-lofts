/**
 * Open House event configuration for Mount Vernon Lofts
 * Centralized event details used across banner and landing page
 */

export interface OpenHouseEvent {
  readonly id: string;
  readonly title: string;
  readonly date: string;
  readonly startTime: string;
  readonly endTime: string;
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

/**
 * List of all open house events (past and future)
 * Add new events to this array to display them on the open house page
 */
export const OPEN_HOUSE_EVENTS: ReadonlyArray<OpenHouseEvent> = [
  {
    id: "spring-2026",
    title: "Open House at Mount Vernon Lofts",
    date: "Saturday, March 7th, 2026",
    startTime: "11:00 AM",
    endTime: "2:00 PM",
    location: {
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
    },
    startsAt: "2026-03-07T11:00:00-06:00",
    expiresAt: "2026-03-07T14:00:00-06:00",
    description: "Tour Mount Vernon Lofts and see why first-time buyers are choosing Montrose. Walk through available studios and 1-bedrooms, meet our team, and learn about ownership starting in the $215Ks in one of Houston's most walkable neighborhoods.",
  },
  // Add future events here
] as const;

/**
 * Check if a specific event has not yet expired (still active in the system).
 * An event is "active" from now until its end time.
 * Used for the open house landing page (show event details even during the event).
 */
export function isEventActive(event: OpenHouseEvent): boolean {
  const now = new Date();
  const expirationDate = new Date(event.expiresAt);
  return now < expirationDate;
}

/**
 * Check if a specific event is upcoming (has not yet started).
 * Used for the banner — the banner should only show before the event begins.
 * Once the event starts, the banner disappears.
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
  return OPEN_HOUSE_EVENTS.filter(isEventUpcoming);
}

/**
 * Get all active events (includes currently-in-progress events)
 */
export function getActiveEvents(): ReadonlyArray<OpenHouseEvent> {
  return OPEN_HOUSE_EVENTS.filter(isEventActive);
}

/**
 * Get all past open house events
 */
export function getPastEvents(): ReadonlyArray<OpenHouseEvent> {
  return OPEN_HOUSE_EVENTS.filter(event => !isEventActive(event));
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

// Legacy export for backward compatibility (uses the next upcoming event)
export const OPEN_HOUSE_EVENT = OPEN_HOUSE_EVENTS[0];
export const isOpenHouseActive = hasActiveEvents;
