import type { SubpageVenue } from "@/app/config/neighborhood-subpage-types"

interface SubpageVenueCardProps {
  readonly venue: SubpageVenue
}

export function SubpageVenueCard({ venue }: SubpageVenueCardProps) {
  return (
    <div className="bg-white border border-mvl-beige rounded-md p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div>
          <h3 className="font-montserrat text-xl text-mvl-espresso font-semibold">
            {venue.name}
          </h3>
          {venue.recognition && (
            <span className="inline-block mt-1 px-2 py-0.5 bg-mvl-coral/10 text-mvl-coral text-xs font-medium rounded">
              {venue.recognition}
            </span>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-mvl-espresso/70">
          <div>
            <span className="font-medium text-mvl-espresso">Distance:</span>{" "}
            {venue.distance} from MVL
          </div>
          <div>
            <span className="font-medium text-mvl-espresso">Walk:</span>{" "}
            {venue.walkTime}
          </div>
          <div className="col-span-2">
            <span className="font-medium text-mvl-espresso">Address:</span>{" "}
            {venue.address}, Houston, TX {venue.zipCode}
          </div>
          {venue.cuisine && (
            <div>
              <span className="font-medium text-mvl-espresso">Cuisine:</span>{" "}
              {venue.cuisine}
            </div>
          )}
          {venue.type && (
            <div>
              <span className="font-medium text-mvl-espresso">Type:</span>{" "}
              {venue.type}
            </div>
          )}
          {venue.priceRange && (
            <div>
              <span className="font-medium text-mvl-espresso">Price:</span>{" "}
              {venue.priceRange}
            </div>
          )}
          {venue.admission && (
            <div>
              <span className="font-medium text-mvl-espresso">Admission:</span>{" "}
              {venue.admission}
            </div>
          )}
          <div>
            <span className="font-medium text-mvl-espresso">Hours:</span>{" "}
            {venue.hours}
          </div>
          <div>
            <span className="font-medium text-mvl-espresso">Dog-friendly:</span>{" "}
            {venue.dogFriendly}
          </div>
          {venue.fee && (
            <div>
              <span className="font-medium text-mvl-espresso">Fee:</span>{" "}
              {venue.fee}
            </div>
          )}
          {venue.wifi && (
            <div>
              <span className="font-medium text-mvl-espresso">WiFi:</span>{" "}
              {venue.wifi}
            </div>
          )}
        </div>

        {/* Amenities */}
        {venue.amenities && venue.amenities.length > 0 && (
          <div className="text-sm text-mvl-espresso/70">
            <span className="font-medium text-mvl-espresso">Amenities:</span>{" "}
            {venue.amenities.join(", ")}
          </div>
        )}

        {/* Description */}
        <p className="text-mvl-espresso/80 leading-relaxed">
          {venue.description}
        </p>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          {venue.website && (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mvl-coral hover:text-mvl-coral-dark text-sm font-medium transition-colors"
            >
              Website &rarr;
            </a>
          )}
          {venue.instagram && (
            <a
              href={venue.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-mvl-coral hover:text-mvl-coral-dark text-sm font-medium transition-colors"
            >
              Instagram &rarr;
            </a>
          )}
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.address + ", Houston, TX " + venue.zipCode)}&origin=4509+Mount+Vernon+St,+Houston,+TX+77006`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mvl-coral hover:text-mvl-coral-dark text-sm font-medium transition-colors"
          >
            Directions &rarr;
          </a>
        </div>
      </div>
    </div>
  )
}
