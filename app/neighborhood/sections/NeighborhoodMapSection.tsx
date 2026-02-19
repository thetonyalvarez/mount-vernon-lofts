"use client"

import { useState } from "react"
import {
  neighborhoodVenues,
  type VenueCategory,
  type Venue,
} from "@/app/config/neighborhood-venues"
import { Coffee, UtensilsCrossed, Trees, Landmark, MapPin } from "lucide-react"

// Filter out "nearby" category — those aren't walkable from MVL
const walkableCategories = neighborhoodVenues.filter(
  (cat) => cat.id !== "nearby"
)

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  coffee: Coffee,
  dining: UtensilsCrossed,
  parks: Trees,
  culture: Landmark,
}

const CATEGORY_LABELS: Record<string, string> = {
  coffee: "Coffee",
  dining: "Restaurants",
  parks: "Parks",
  culture: "Museums",
}

// Google Maps embed centered on MVL
const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.2!2d-95.393!3d29.738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c0e474eaaaab%3A0x0!2s4509+Mount+Vernon+St%2C+Houston%2C+TX+77006!5e0!3m2!1sen!2sus!4v1"

function getVenueLink(venue: Venue): string | null {
  return venue.link ?? venue.instagram ?? null
}

function VenueCard({ venue }: Readonly<{ venue: Venue }>) {
  const href = getVenueLink(venue)

  const nameContent = href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-mvl-coral hover:text-mvl-coral-dark transition-colors font-medium"
      aria-label={venue.name}
    >
      {venue.name}
    </a>
  ) : (
    <span className="text-mvl-espresso font-medium">{venue.name}</span>
  )

  return (
    <li className="bg-white rounded-md p-4 border border-mvl-beige/60 hover:border-mvl-coral/30 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-base">{nameContent}</div>
          <p className="text-sm text-mvl-espresso/60 mt-1">{venue.address}</p>
          {venue.note ? (
            <p className="text-sm text-mvl-espresso/70 mt-2 leading-relaxed">
              {venue.note}
            </p>
          ) : null}
        </div>
        <span className="text-xs text-mvl-coral font-medium whitespace-nowrap mt-1">
          {venue.distance}
        </span>
      </div>
    </li>
  )
}

export function NeighborhoodMapSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const filteredCategories =
    activeFilter === "all"
      ? walkableCategories
      : walkableCategories.filter((cat) => cat.id === activeFilter)

  const filteredVenues = filteredCategories.flatMap((cat) => cat.venues)

  return (
    <section
      aria-label="Points of Interest"
      className="py-24 bg-mvl-cream"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-montserrat text-3xl md:text-4xl lg:text-5xl text-mvl-espresso mb-4 uppercase tracking-wide">
            Explore the Neighborhood
          </h2>
          <p className="text-lg text-mvl-espresso/70 max-w-2xl mx-auto">
            Coffee shops, restaurants, parks, and museums — all within walking
            distance of Mount Vernon Lofts.
          </p>
          <p className="text-sm text-mvl-espresso/50 mt-2">
            <MapPin className="inline-block w-4 h-4 mr-1 -mt-0.5" />
            4509 Mount Vernon St, Houston, TX 77006
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: Map */}
          <div className="order-2 lg:order-1">
            <div className="rounded-md overflow-hidden border border-mvl-beige shadow-sm aspect-[4/3]">
              <iframe
                src={MAP_EMBED_URL}
                title="Mount Vernon Lofts Neighborhood Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right: Filters + Venue List */}
          <div className="order-1 lg:order-2">
            {/* Category Filters */}
            <div
              role="group"
              aria-label="Filter venues by category"
              className="flex flex-wrap gap-2 mb-6"
            >
              <button
                onClick={() => setActiveFilter("all")}
                aria-pressed={activeFilter === "all"}
                className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                  activeFilter === "all"
                    ? "bg-mvl-coral text-white"
                    : "bg-mvl-beige/50 text-mvl-espresso/70 hover:bg-mvl-beige"
                }`}
              >
                All
              </button>
              {walkableCategories.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.id]
                const label = CATEGORY_LABELS[cat.id] ?? cat.title
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFilter(cat.id)}
                    aria-pressed={activeFilter === cat.id}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded text-sm font-medium transition-colors ${
                      activeFilter === cat.id
                        ? "bg-mvl-coral text-white"
                        : "bg-mvl-beige/50 text-mvl-espresso/70 hover:bg-mvl-beige"
                    }`}
                  >
                    {Icon ? <Icon className="w-4 h-4" /> : null}
                    {label}
                  </button>
                )
              })}
            </div>

            {/* Venue List */}
            <ul
              aria-label="Neighborhood venues"
              className="space-y-3 max-h-[500px] overflow-y-auto pr-1"
            >
              {filteredVenues.map((venue) => (
                <VenueCard key={venue.name} venue={venue} />
              ))}
            </ul>

            <p className="text-xs text-mvl-espresso/40 mt-4">
              Venues verified as of Feb 2026. Distances approximate from MVL.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
