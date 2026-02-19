"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { getNextEvent, hasUpcomingEvents } from "@/app/config/open-house-data";

const BANNER_STORAGE_KEY = "mvl-open-house-banner-dismissed";

export function OpenHouseBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if there are any active events
    if (!hasUpcomingEvents()) {
      setIsVisible(false);
      setIsLoaded(true);
      // Clean up localStorage if no active events
      localStorage.removeItem(BANNER_STORAGE_KEY);
      return;
    }

    // Check if banner was previously dismissed
    const dismissed = localStorage.getItem(BANNER_STORAGE_KEY);

    if (!dismissed) {
      setIsVisible(true);
    }

    setIsLoaded(true);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage - will reappear on next visit until event expires
    localStorage.setItem(BANNER_STORAGE_KEY, new Date().toISOString());
  };

  // Don't render anything until client-side hydration is complete
  if (!isLoaded || !isVisible) {
    return null;
  }

  const nextEvent = getNextEvent();

  // Should never happen due to hasUpcomingEvents check above, but TypeScript safety
  if (!nextEvent) {
    return null;
  }

  return (
    <div className="bg-mvl-coral text-white relative z-50">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between py-2.5 md:py-3 gap-4">
          {/* Banner Content */}
          <Link
            href="/open-house"
            className="flex-1 flex items-center justify-center gap-2 md:gap-3 hover:opacity-90 transition-opacity group text-center"
          >
            {/* Mobile Layout */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 md:hidden text-center">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">OPEN HOUSE</span>
              <span className="hidden sm:inline text-white/60">|</span>
              <span className="text-xs sm:text-sm font-light">
                {nextEvent.date.replace(/,?\s*\d{4}/, "")} • {nextEvent.startTime.replace(/:00/, "")}-{nextEvent.endTime.replace(/:00/, "")}
              </span>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex md:items-center md:gap-3">
              <span className="text-sm font-bold uppercase tracking-wider">OPEN HOUSE</span>
              <span className="text-white/60">|</span>
              <span className="text-sm font-light">{nextEvent.date}</span>
              <span className="text-white/60">•</span>
              <span className="text-sm font-light">
                {nextEvent.startTime} - {nextEvent.endTime}
              </span>
              <span className="text-white/60">•</span>
              <span className="text-sm font-light">{nextEvent.location.name}</span>
            </div>

            {/* CTA */}
            <span className="hidden md:inline text-sm font-medium ml-2 underline underline-offset-4 group-hover:underline-offset-2 transition-all">
              Details →
            </span>
          </Link>

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-1 hover:bg-mvl-coral-dark rounded transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-mvl-coral"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
