"use client";

import { useState, useCallback } from "react";
import { OpenHouseBanner } from "@/components/OpenHouseBanner";
import { NavigationWrapper } from "@/app/components/navigation/NavigationWrapper";

/**
 * Coordinates the OpenHouseBanner and NavigationWrapper so the nav
 * shifts down when the banner is visible, preventing overlap.
 */
export function OpenHouseBannerWrapper() {
  const [bannerVisible, setBannerVisible] = useState(false);

  const handleBannerVisibilityChange = useCallback((visible: boolean) => {
    setBannerVisible(visible);
  }, []);

  return (
    <>
      <OpenHouseBanner onVisibilityChange={handleBannerVisibilityChange} />
      <NavigationWrapper bannerVisible={bannerVisible} />
    </>
  );
}
