"use client";

import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { HiGlobeAlt } from "react-icons/hi";
import { getUSPath, getGlobalPath } from "@/components/seo/HreflangTags";
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

/**
 * Region switch for the footer: two options side by side, the current one
 * highlighted, so switching is one click with nothing to open — a dropdown
 * at the foot of the page opened below the fold.
 *
 * Each option links to this page's equivalent in the other region. Not
 * every page has one, so the link is checked when clicked (not on every page
 * load, as before) and falls back to that region's home page.
 */
export default function CountrySelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, setPending] = useState<"global" | "us" | null>(null);

  // Determine current locale - check both /us and /us/
  const isUSVersion = pathname === "/us" || pathname.startsWith("/us/");

  // This page's AU/NZ/Global equivalent.
  const getAUNZUrl = useCallback(() => {
    if (!isUSVersion) return pathname;
    const mapped = getGlobalPath(pathname);
    if (mapped) return mapped;
    if (pathname === "/us" || pathname === "/us/") return "/";
    return pathname.replace(/^\/us\/?/, "/");
  }, [isUSVersion, pathname]);

  // This page's US equivalent.
  const getUSUrl = useCallback(() => {
    if (isUSVersion) return pathname;
    const mapped = getUSPath(pathname);
    if (mapped) return mapped;
    if (pathname === "/") return "/us";
    return `/us${pathname}`;
  }, [isUSVersion, pathname]);

  const options = [
    {
      id: "global" as const,
      label: "AU/NZ/Global",
      href: getAUNZUrl(),
      home: "/",
      current: !isUSVersion,
    },
    {
      id: "us" as const,
      label: "United States",
      href: getUSUrl(),
      home: "/us",
      current: isUSVersion,
    },
  ];

  const go = async (
    e: React.MouseEvent<HTMLAnchorElement>,
    option: (typeof options)[number],
  ) => {
    // Let new-tab / new-window clicks through untouched.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (option.current || pending) return;
    setPending(option.id);
    const exists = await checkIfPageExists(option.href);
    router.push(exists ? option.href : option.home);
  };

  return (
    <nav
      aria-label="Region"
      className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white p-1 text-sm shadow-sm"
    >
      <HiGlobeAlt
        aria-hidden="true"
        className="ml-2 mr-1 h-4 w-4 shrink-0 text-gray-500"
      />
      {options.map((option) => (
        <Link
          key={option.id}
          href={option.href}
          prefetch={false}
          onClick={(e) => go(e, option)}
          aria-current={option.current ? "page" : undefined}
          aria-busy={pending === option.id || undefined}
          className={cn(
            "rounded-full px-3 py-1.5 font-medium transition-colors",
            option.current
              ? "bg-blue-600 text-white"
              : "text-gray-600 hover:bg-blue-50 hover:text-blue-700",
            pending === option.id && "opacity-60",
          )}
        >
          {option.label}
        </Link>
      ))}
    </nav>
  );
}
