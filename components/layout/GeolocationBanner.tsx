"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiX } from "react-icons/hi";

export default function GeolocationBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);
  const pathname = usePathname();

  const isUSPath = pathname.startsWith("/us");
  const isUSUser = detectedCountry === "US";

  useEffect(() => {
    // Check if user already made a choice
    const userChoice = localStorage.getItem("country-preference");
    if (userChoice) {
      return;
    }

    // Pass query params from current URL to geo API for testing
    const urlParams = new URLSearchParams(window.location.search);
    const geoUrl = urlParams.has("test-country")
      ? `/api/geo?test-country=${urlParams.get("test-country")}`
      : "/api/geo";

    // Fetch detected country from API endpoint
    console.log("🌍 GeolocationBanner Debug:", {
      geoUrl,
      pathname,
      isUSPath,
      userChoice: localStorage.getItem("country-preference"),
    });

    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("🌍 API Response:", data);

        if (data.country) {
          setDetectedCountry(data.country);

          const shouldShowBanner =
            (data.country === "US" && !isUSPath) ||
            (data.country !== "US" && isUSPath);

          console.log("🌍 Banner Logic:", {
            detectedCountry: data.country,
            isUSPath,
            condition1: data.country === "US" && !isUSPath,
            condition2: data.country !== "US" && isUSPath,
            shouldShowBanner,
          });

          // Show banner if there's a mismatch
          if (shouldShowBanner) {
            console.log("🌍 Showing banner!");
            setShowBanner(true);
          } else {
            console.log("🌍 No banner - no mismatch");
          }
        } else {
          console.log("🌍 No country detected");
        }
      })
      .catch((error) => {
        console.log("🌍 Geo API failed:", error);
      });
  }, [isUSPath]);

  const handleChoice = (stayOnCurrent: boolean) => {
    // Save user preference
    localStorage.setItem(
      "country-preference",
      stayOnCurrent ? "current" : "suggested",
    );
    setShowBanner(false);
  };

  const getSuggestedPath = () => {
    if (isUSUser && !isUSPath) {
      // Suggest US version
      return "/us" + pathname;
    } else if (!isUSUser && isUSPath) {
      // Suggest AU/NZ version
      return pathname.replace("/us", "");
    }
    return pathname;
  };

  const getSuggestedVersion = () => {
    if (isUSUser && !isUSPath) {
      return "United States";
    } else if (!isUSUser && isUSPath) {
      return "Australia/New Zealand";
    }
    return "";
  };

  console.log("🌍 Render check:", { showBanner, detectedCountry });

  if (!showBanner) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-primary-900 text-white py-3 px-4 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between max-w-6xl">
        <div className="flex-1 text-sm md:text-base">
          <p>
            It looks like you're visiting from{" "}
            <strong>{isUSUser ? "the United States" : "outside the US"}</strong>
            . Would you like to view our{" "}
            <strong>{getSuggestedVersion()}</strong> website?
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <Link
            href={getSuggestedPath()}
            onClick={() => handleChoice(false)}
            className="bg-white text-primary-900 px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm whitespace-nowrap"
          >
            Yes, take me there
          </Link>
          <button
            onClick={() => handleChoice(true)}
            className="text-white hover:text-gray-300 transition-colors text-sm whitespace-nowrap"
          >
            No, stay here
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="text-white hover:text-gray-300 transition-colors ml-2"
            aria-label="Close banner"
          >
            <HiX className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
