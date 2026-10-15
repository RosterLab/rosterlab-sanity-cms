"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { HiCheck, HiChevronDown, HiGlobeAlt } from "react-icons/hi";
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
 * Region dropdown for the footer. It opens upwards, centred on its button,
 * because it sits at the foot of the page: opening down put the menu below
 * the fold.
 *
 * Each option links to this page's equivalent in the other region. Not
 * every page has one, so the link is checked when picked (not on every page
 * load) and falls back to that region's home page.
 */
export default function CountrySelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, setPending] = useState<"global" | "us" | null>(null);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // Determine current locale - check both /us and /us/
  const isUSVersion = pathname === "/us" || pathname.startsWith("/us/");

  // This page's Global equivalent.
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
      label: "Global",
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
    if (option.current) {
      setOpen(false);
      return;
    }
    if (pending) return;
    setPending(option.id);
    const exists = await checkIfPageExists(option.href);
    router.push(exists ? option.href : option.home);
  };

  // Close on a click outside, or Escape (which hands focus back).
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = options.find((o) => o.current) ?? options[0];

  return (
    <div ref={rootRef} className="relative inline-block text-sm">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Region: ${current.label}. Change region`}
        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-700"
      >
        <HiGlobeAlt aria-hidden="true" className="h-4 w-4 text-gray-500" />
        {current.label}
        <HiChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          id={menuId}
          aria-label="Region"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-48 -translate-x-1/2 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-xl"
        >
          {options.map((option) => (
            <li key={option.id}>
              <Link
                href={option.href}
                prefetch={false}
                onClick={(e) => go(e, option)}
                aria-current={option.current ? "page" : undefined}
                aria-busy={pending === option.id || undefined}
                className={cn(
                  "flex items-center justify-between px-4 py-2.5 transition-colors",
                  option.current
                    ? "bg-blue-50 font-medium text-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-700",
                  pending === option.id && "opacity-60",
                )}
              >
                {option.label}
                {option.current && (
                  <HiCheck aria-hidden="true" className="h-4 w-4" />
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
