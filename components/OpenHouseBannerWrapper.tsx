"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { OpenHouseBanner } from "@/components/OpenHouseBanner";
import { NavigationWrapper } from "@/app/components/navigation/NavigationWrapper";

/**
 * Coordinates the OpenHouseBanner and NavigationWrapper so the nav
 * shifts down when the banner is visible AND in the viewport.
 * When the user scrolls past the banner, the nav smoothly transitions to top-0.
 */
export function OpenHouseBannerWrapper() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerInView, setBannerInView] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleBannerVisibilityChange = useCallback((visible: boolean) => {
    setBannerVisible(visible);
    // When banner first appears, it's in view
    if (visible) {
      setBannerInView(true);
    } else {
      setBannerInView(false);
    }
  }, []);

  // Track whether the banner is actually in the viewport via scroll position
  useEffect(() => {
    if (!bannerVisible || !bannerRef.current) return;

    const checkBannerPosition = () => {
      if (!bannerRef.current) return;
      const rect = bannerRef.current.getBoundingClientRect();
      // Banner is "in view" when its bottom edge is still visible (>= 0)
      setBannerInView(rect.bottom > 0);
    };

    window.addEventListener("scroll", checkBannerPosition, { passive: true });
    // Check initial position
    checkBannerPosition();

    return () => window.removeEventListener("scroll", checkBannerPosition);
  }, [bannerVisible]);

  return (
    <>
      <div ref={bannerRef}>
        <OpenHouseBanner onVisibilityChange={handleBannerVisibilityChange} />
      </div>
      <NavigationWrapper bannerVisible={bannerVisible} bannerInView={bannerInView} />
    </>
  );
}
