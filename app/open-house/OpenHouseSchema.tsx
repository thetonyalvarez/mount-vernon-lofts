import { getActiveEvents } from "@/app/config/open-house-data"
import type { OpenHouseEvent } from "@/app/config/open-house-data"

function buildEventSchema(event: OpenHouseEvent) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mtvernonlofts.com';

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.title,
    "description": event.description,
    "startDate": event.startsAt,
    "endDate": event.expiresAt,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": event.location.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.location.address,
        "addressLocality": event.location.city,
        "addressRegion": event.location.state,
        "postalCode": event.location.zip,
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": event.location.coordinates.lat,
        "longitude": event.location.coordinates.lng
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Mount Vernon Lofts",
      "url": baseUrl
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}/open-house`
    },
    "image": `${baseUrl}/images/unit-9_1-bed/9-4.jpg`,
    "isAccessibleForFree": true
  };
}

export function OpenHouseSchema() {
  const activeEvents = getActiveEvents();
  if (activeEvents.length === 0) return null;

  return (
    <>
      {activeEvents.map((event) => (
        <script
          key={event.id}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildEventSchema(event))
          }}
        />
      ))}
    </>
  );
}
