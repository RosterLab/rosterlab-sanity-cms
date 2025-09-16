"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// URL mapping between US and Global versions
const URL_MAPPING = {
  // Global -> US mappings (null means page doesn't exist on US)
  globalToUS: {
    "/roi-calculator": "/savings-calculator",
    "/book-a-demo": "/book-a-demo",
    "/pricing": "/pricing",
    "/contact": "/contact",
    "/about": "/about",
    "/blog": "/blog",
    "/solutions": null, // Only exists on global
    "/solutions/healthcare": null, // Only exists on global
    "/solutions/retail": null, // Only exists on global
    "/solutions/aged-care": null, // Only exists on global
    "/solutions/hospitality": null, // Only exists on global
    "/": "/",
  },
  // US -> Global mappings (null means page doesn't exist on global)
  usToGlobal: {
    "/savings-calculator": "/roi-calculator",
    "/book-a-demo": "/book-a-demo",
    "/pricing": "/pricing",
    "/contact": "/contact",
    "/about": "/about",
    "/blog": "/blog",
    "/": "/",
  },
  // Pages that exist only on global (no US equivalent)
  globalOnly: [
    "/solutions",
    "/solutions/healthcare",
    "/solutions/retail",
    "/solutions/aged-care",
    "/solutions/hospitality",
  ],
  // Pages that exist only on US (no global equivalent)
  usOnly: [
    // Add US-only pages here if any
  ],
};

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

          // Check if current page exists in the target version
          let shouldShowBanner = false;

          if (data.country === "US" && !isUSPath) {
            // US user on global site - check if page exists on US
            const mappedPath =
              URL_MAPPING.globalToUS[
                pathname as keyof typeof URL_MAPPING.globalToUS
              ];
            // Show banner only if page exists on US (not null and not in globalOnly)
            shouldShowBanner =
              mappedPath !== null && !URL_MAPPING.globalOnly.includes(pathname);
          } else if (data.country !== "US" && isUSPath) {
            // Non-US user on US site - always show banner to redirect to global
            shouldShowBanner = true;
          }

          console.log("🌍 Banner Logic:", {
            detectedCountry: data.country,
            isUSPath,
            pathname,
            shouldShowBanner,
          });

          // Show banner if there's a mismatch and target page exists
          if (shouldShowBanner) {
            console.log("🌍 Showing banner!");
            setShowBanner(true);
          } else {
            console.log(
              "🌍 No banner - no mismatch or target page doesn't exist",
            );
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
      // User is from US but on global site - suggest US version
      // Check if current path has a specific US mapping
      const mappedPath =
        URL_MAPPING.globalToUS[pathname as keyof typeof URL_MAPPING.globalToUS];
      if (mappedPath === null) {
        // Page doesn't exist on US - redirect to US home
        return "/us";
      }
      if (mappedPath) {
        return "/us" + mappedPath;
      }
      // For unmapped paths, just add /us prefix
      return "/us" + pathname;
    } else if (!isUSUser && isUSPath) {
      // User is not from US but on US site - suggest global version
      // Remove /us prefix first
      const pathWithoutUS =
        pathname === "/us" ? "/" : pathname.replace(/^\/us/, "");

      // Check if this US path has a specific global mapping
      const mappedPath =
        URL_MAPPING.usToGlobal[
          pathWithoutUS as keyof typeof URL_MAPPING.usToGlobal
        ];
      if (mappedPath) {
        return mappedPath;
      }
      // For unmapped paths, return without /us prefix
      return pathWithoutUS;
    }
    return pathname;
  };

  const getSuggestedVersion = () => {
    if (isUSUser && !isUSPath) {
      return "United States";
    } else if (!isUSUser && isUSPath) {
      // Check if user is from AU or NZ
      if (detectedCountry === "AU" || detectedCountry === "NZ") {
        return "Australia/New Zealand";
      }
      return "global";
    }
    return "";
  };

  console.log("🌍 Render check:", {
    showBanner,
    detectedCountry,
    currentPath: pathname,
    suggestedPath: getSuggestedPath(),
    isUSUser,
    isUSPath,
  });

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
