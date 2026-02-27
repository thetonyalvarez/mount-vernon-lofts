import { Metadata } from "next"
import { Calendar, MapPin, Phone, Mail, Clock, ArrowLeft, Home, Car, DollarSign, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "@/components/ui/image"
import Link from "next/link"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations"
import { DataLayerEvent } from "@/app/components/analytics/DataLayerEvent"
import { CONTACT_CONFIG } from "@/app/config/contact"
import { getActiveEvents, hasActiveEvents } from "@/app/config/open-house-data"
import type { OpenHouseEvent } from "@/app/config/open-house-data"
import { OpenHouseSchema } from "./OpenHouseSchema"

export const metadata: Metadata = {
  title: "Open House | Mount Vernon Lofts — Montrose Condos",
  description: "Open House at Mount Vernon Lofts. 42 modern condos in Montrose starting in the $215Ks. Studios and 1-bedrooms available. No RSVP needed.",
  robots: "noindex, nofollow"
}

function getEventLabel(event: OpenHouseEvent): string {
  return event.eventType === 'broker' ? 'Broker Open House' : 'Open House'
}

function ComingSoonFallback() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-mvl-warm-white to-white">
      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-20 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-mvl-coral/10 px-4 py-2 rounded-md mb-6">
            <Calendar className="w-4 h-4 text-mvl-coral" />
            <span className="text-sm font-medium text-mvl-coral">Open Houses</span>
          </div>

          <h1 className="font-montserrat text-3xl md:text-4xl font-light text-mvl-espresso mb-4">
            Open Houses Coming Soon
          </h1>
          <p className="text-mvl-espresso/70 text-lg mb-10 max-w-xl mx-auto">
            We&apos;re planning our next open house at Mount Vernon Lofts.
            Contact us to schedule a private tour in the meantime.
          </p>

          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-medium text-mvl-espresso mb-4">
              Schedule a Tour
            </h2>
            <p className="text-mvl-espresso/70 mb-6">
              Jeffrey Winans | Nan &amp; Company Properties
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-mvl-coral hover:bg-mvl-coral-dark text-white transition-all duration-300"
              >
                <a href="tel:7139869929">
                  <Phone className="w-5 h-5 mr-2" />
                  Call 713.986.9929
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-mvl-espresso text-mvl-espresso hover:bg-mvl-espresso hover:text-white transition-all duration-300"
              >
                <a href="mailto:jeffrey.winans@nanproperties.com?subject=Tour Request - Mount Vernon Lofts">
                  <Mail className="w-5 h-5 mr-2" />
                  Email Jeffrey
                </a>
              </Button>
            </div>
          </div>

          {/* Back to Homepage */}
          <Button
            asChild
            variant="outline"
            className="border-mvl-coral text-mvl-coral hover:bg-mvl-coral hover:text-white"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export default function OpenHousePage() {
  // Show fallback when no active events — don't redirect
  if (!hasActiveEvents()) {
    return <ComingSoonFallback />
  }

  const activeEvents = getActiveEvents()
  const event = activeEvents[0]
  const label = getEventLabel(event)
  const isBroker = event.eventType === 'broker'

  return (
    <main className="min-h-screen bg-gradient-to-b from-mvl-warm-white to-white">
      <OpenHouseSchema />
      <DataLayerEvent event="open_house_view" data={{ content_type: `${event.eventType}_open_house`, content_name: `${label} ${event.date}` }} />

      {/* Hero Image Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src="images/unit-9_1-bed/9-4.jpg"
          alt="Mount Vernon Lofts 1-bedroom living area — modern condo interior in Montrose"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

        {/* Hero text overlay */}
        <div className="absolute inset-0 flex flex-col justify-end items-center z-10 px-4 pb-10 md:pb-14">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-mvl-coral px-4 py-2 rounded-md mb-4">
              <Calendar className="w-4 h-4 text-white" />
              <span className="text-sm font-medium uppercase tracking-wider text-white">{label}</span>
            </div>
            <h1 className="font-montserrat text-white text-4xl sm:text-5xl md:text-6xl font-light leading-tight tracking-wide mb-3 drop-shadow-xl">
              {event.title}
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-light mb-1 drop-shadow-lg">
              Mount Vernon Lofts
            </p>
            <p className="text-white text-lg md:text-xl font-medium drop-shadow-lg">
              {event.date} | {event.startTime} &ndash; {event.endTime}
            </p>
          </div>
        </div>
      </section>

      <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 py-12 md:py-20">
        <ScrollReveal>
          <StaggerContainer>
            <div className="max-w-4xl mx-auto">
              {/* Commission Banner — broker events only */}
              {isBroker && (
                <StaggerItem>
                  <div className="bg-mvl-espresso text-white rounded-lg p-8 mb-8 text-center">
                    <h2 className="font-montserrat text-3xl md:text-4xl font-light mb-3">
                      4% Buy-Side Commission
                    </h2>
                    <p className="text-mvl-beige text-lg">
                      On all contracts executed through March 15, 2026
                    </p>
                  </div>
                </StaggerItem>
              )}

              {/* Event Details */}
              <StaggerItem>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-medium text-mvl-espresso mb-6 text-center">
                    Event Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-mvl-coral/10 rounded-md">
                        <Calendar className="w-5 h-5 text-mvl-coral" />
                      </div>
                      <div>
                        <p className="font-medium text-mvl-espresso">{event.date}</p>
                        <p className="text-mvl-espresso/70">{event.startTime} - {event.endTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-mvl-coral/10 rounded-md">
                        <MapPin className="w-5 h-5 text-mvl-coral" />
                      </div>
                      <div>
                        <p className="font-medium text-mvl-espresso">{event.location.name}</p>
                        <p className="text-mvl-espresso/70">{event.location.fullAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-mvl-coral/10 rounded-md">
                        <Users className="w-5 h-5 text-mvl-coral" />
                      </div>
                      <div>
                        <p className="font-medium text-mvl-espresso">No RSVP Needed</p>
                        <p className="text-mvl-espresso/70">{isBroker ? 'Food & refreshments provided' : 'Walk in anytime'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-mvl-coral/10 rounded-md">
                        <Clock className="w-5 h-5 text-mvl-coral" />
                      </div>
                      <div>
                        <p className="font-medium text-mvl-espresso">Walk Through Available Units</p>
                        <p className="text-mvl-espresso/70">Studios and 1-bedrooms ready for immediate closing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Upcoming Events — show if there are more active events */}
              {activeEvents.length > 1 && (
                <StaggerItem>
                  <div className="bg-mvl-coral/5 border border-mvl-coral/20 rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-medium text-mvl-espresso mb-4 text-center">
                      Upcoming Open Houses
                    </h2>
                    <div className="space-y-3">
                      {activeEvents.slice(1).map(upcomingEvent => (
                        <div key={upcomingEvent.id} className="flex items-center gap-3 justify-center">
                          <Calendar className="w-4 h-4 text-mvl-coral flex-shrink-0" />
                          <span className="text-mvl-espresso">
                            {upcomingEvent.date} | {upcomingEvent.startTime} &ndash; {upcomingEvent.endTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              )}

              {/* Property Highlights */}
              <StaggerItem>
                <div className="bg-mvl-beige rounded-lg p-8 mb-8">
                  <h2 className="text-2xl font-medium text-mvl-espresso mb-6 text-center">
                    Property Highlights
                  </h2>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-md p-4 text-center">
                      <Home className="w-6 h-6 text-mvl-coral mx-auto mb-2" />
                      <p className="font-medium text-mvl-espresso">42 Modern Condos</p>
                      <p className="text-sm text-mvl-espresso/70">Built 2018</p>
                    </div>
                    <div className="bg-white rounded-md p-4 text-center">
                      <DollarSign className="w-6 h-6 text-mvl-coral mx-auto mb-2" />
                      <p className="font-medium text-mvl-espresso">Studios from $215K</p>
                      <p className="text-sm text-mvl-espresso/70">1-Bedrooms from $252K</p>
                    </div>
                    <div className="bg-white rounded-md p-4 text-center">
                      <Shield className="w-6 h-6 text-mvl-coral mx-auto mb-2" />
                      <p className="font-medium text-mvl-espresso">$300/mo HOA</p>
                      <p className="text-sm text-mvl-espresso/70">Includes water</p>
                    </div>
                    <div className="bg-white rounded-md p-4 text-center">
                      <Car className="w-6 h-6 text-mvl-coral mx-auto mb-2" />
                      <p className="font-medium text-mvl-espresso">Covered Parking</p>
                      <p className="text-sm text-mvl-espresso/70">1 space per unit</p>
                    </div>
                    <div className="bg-white rounded-md p-4 text-center">
                      <Home className="w-6 h-6 text-mvl-coral mx-auto mb-2" />
                      <p className="font-medium text-mvl-espresso">In-Unit W/D</p>
                      <p className="text-sm text-mvl-espresso/70">Smart thermostat</p>
                    </div>
                    <div className="bg-white rounded-md p-4 text-center">
                      <MapPin className="w-6 h-6 text-mvl-coral mx-auto mb-2" />
                      <p className="font-medium text-mvl-espresso">Walkable Montrose</p>
                      <p className="text-sm text-mvl-espresso/70">Pet-friendly</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>

              {/* Unit Features */}
              <StaggerItem>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                  <h2 className="text-2xl font-medium text-mvl-espresso mb-6 text-center">
                    Unit Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                    {[
                      "Granite countertops",
                      "European-style cabinetry",
                      "In-unit washer/dryer",
                      "Smart thermostat",
                      "Natural light throughout",
                      "Covered parking included",
                      "Controlled access entry",
                      "Financing as low as 10% down",
                    ].map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-mvl-espresso/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-mvl-coral flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>

              {/* Contact Section */}
              <StaggerItem>
                <div className="bg-mvl-espresso text-white rounded-lg p-8 mb-8">
                  <h2 className="font-montserrat text-2xl md:text-3xl font-light mb-2 text-center">
                    Contact
                  </h2>
                  <p className="text-mvl-beige text-center mb-6">
                    Jeffrey Winans | Nan & Company Properties
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <Button
                      asChild
                      size="lg"
                      className="bg-mvl-coral hover:bg-mvl-coral-dark text-white transition-all duration-300"
                    >
                      <a href="tel:7139869929">
                        <Phone className="w-5 h-5 mr-2" />
                        Call 713.986.9929
                      </a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-mvl-espresso transition-all duration-300"
                    >
                      <a href="mailto:jeffrey.winans@nanproperties.com?subject=Open House Inquiry - Mount Vernon Lofts">
                        <Mail className="w-5 h-5 mr-2" />
                        Email Jeffrey
                      </a>
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/50 text-white hover:bg-white hover:text-mvl-espresso transition-all duration-300"
                    >
                      <a
                        href={CONTACT_CONFIG.propertyAddress.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </StaggerItem>

              {/* Back to Homepage */}
              <StaggerItem>
                <div className="text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="border-mvl-coral text-mvl-coral hover:bg-mvl-coral hover:text-white"
                  >
                    <Link href="/">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Homepage
                    </Link>
                  </Button>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </ScrollReveal>
      </div>
    </main>
  )
}
