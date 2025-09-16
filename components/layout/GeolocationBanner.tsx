"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative mx-auto">
        {/* Remove the close button to force user choice */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Select Your Region
          </h3>
          <p className="text-gray-600">
            It looks like you're visiting from{" "}
            <strong>{isUSUser ? "the United States" : "outside the US"}</strong>
            . Would you like to view our{" "}
            <strong>{getSuggestedVersion()}</strong> website?
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={getSuggestedPath()}
            onClick={() => handleChoice(false)}
            className="flex-1 bg-primary-600 text-white px-4 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors text-center"
          >
            Yes, take me there
          </Link>
          <button
            onClick={() => handleChoice(true)}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-md font-semibold hover:bg-gray-50 transition-colors"
          >
            No, stay here
          </button>
        </div>
      </div>
    </div>
  );
}
