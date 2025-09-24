"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HiGlobeAlt, HiChevronDown } from "react-icons/hi";
import {
  US_URL_MAPPINGS,
  REVERSE_US_MAPPINGS,
} from "@/components/seo/HreflangTags";
import { cn } from "@/lib/utils";

// Function to check if a page exists
async function checkIfPageExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      mode: "same-origin",
    });
    return response.ok;
  } catch (error) {
    console.error("Error checking page existence:", error);
    return false;
  }
}

export default function CountrySelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Determine current locale - check both /us and /us/
  const isUSVersion = pathname === "/us" || pathname.startsWith("/us/");
  const currentLocale = isUSVersion ? "US" : "AU/NZ/Global";

  // Get URLs for both versions
  const getAUNZUrl = useCallback(() => {
    // If we're on a US page, convert back to AU/NZ
    if (isUSVersion) {
      // First check if we have a specific reverse mapping
      if (REVERSE_US_MAPPINGS[pathname]) {
        return REVERSE_US_MAPPINGS[pathname];
      }

      // Handle the /us homepage
      if (pathname === "/us" || pathname === "/us/") {
        return "/";
      }

      // Otherwise, remove the /us prefix
      return pathname.replace(/^\/us\/?/, "/");
    }

    // Already on AU/NZ version
    return pathname;
  }, [isUSVersion, pathname]);

  const getUSUrl = useCallback(() => {
    // If we're on an AU/NZ page, convert to US
    if (!isUSVersion) {
      // First check if we have a specific mapping
      if (US_URL_MAPPINGS[pathname]) {
        return US_URL_MAPPINGS[pathname];
      }

      // Handle the homepage
      if (pathname === "/") {
        return "/us/";
      }

      // Otherwise, add the /us prefix
      return `/us${pathname}`;
    }

    // Already on US version
    return pathname;
  }, [isUSVersion, pathname]);

  // State for validated URLs
  const [auNzUrl, setAuNzUrl] = useState<string>("");
  const [usUrl, setUsUrl] = useState<string>("");
  const [urlsLoaded, setUrlsLoaded] = useState(false);

  // Validate and set URLs
  const validateAndSetUrls = useCallback(async () => {
    const potentialAuNzUrl = getAUNZUrl();
    const potentialUsUrl = getUSUrl();

    // Check if the AU/NZ URL exists, otherwise use homepage
    const auNzExists = await checkIfPageExists(potentialAuNzUrl);
    setAuNzUrl(auNzExists ? potentialAuNzUrl : "/");

    // Check if the US URL exists, otherwise use US homepage
    const usExists = await checkIfPageExists(potentialUsUrl);
    setUsUrl(usExists ? potentialUsUrl : "/us");

    setUrlsLoaded(true);
  }, [pathname, isUSVersion, getAUNZUrl, getUSUrl]);

  // Validate URLs when component mounts or pathname changes
  useEffect(() => {
    validateAndSetUrls();
  }, [validateAndSetUrls]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-neutral-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
        aria-label="Select country/region"
      >
        <HiGlobeAlt className="w-5 h-5" />
        <span>{currentLocale}</span>
        <HiChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && urlsLoaded && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="py-2">
            <Link
              href={auNzUrl}
              className={cn(
                "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                !isUSVersion
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600",
              )}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-between">
                <span>AU/NZ/Global</span>
                {!isUSVersion && (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </Link>
            <Link
              href={usUrl}
              className={cn(
                "block px-4 py-2 text-sm hover:bg-gray-100 transition-colors",
                isUSVersion
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-700 hover:text-blue-600",
              )}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center justify-between">
                <span>United States</span>
                {isUSVersion && (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
