interface BreadcrumbItem {
  name: string;
  url?: string;
}

// Helper to generate breadcrumb items from a URL path
export function generateBreadcrumbItems(
  pathname: string,
  isUS = false,
): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ name: "Home", url: "/" }];

  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    // Format segment name
    let name = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Special cases for better names
    const nameMap: Record<string, string> = {
      "ed-icu": "ED/ICU",
      "ai-roster-generator": "AI Roster Generator",
      "ai-staff-schedule-maker": "AI Staff Schedule Maker",
      "roi-calculator": "ROI Calculator",
      "staff-roster-mobile-app": "Staff Roster Mobile App",
      "staff-scheduling-mobile-app": "Staff Scheduling Mobile App",
      "aged-care": "Aged Care",
      "senior-care": "Senior Care",
      us: "US",
    };

    if (nameMap[segment]) {
      name = nameMap[segment];
    }

    // Skip 'us' in breadcrumb display but keep in path
    if (segment === "us" && index === 0) {
      return;
    }

    items.push({
      name,
      url: index === segments.length - 1 ? undefined : currentPath,
    });
  });

  return items;
}

// Common breadcrumb patterns
export const commonBreadcrumbs = {
  // Industries
  industriesHealthcareRadiology: [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Healthcare", url: "/industries/healthcare" },
    { name: "Radiology" },
  ],
  industriesHealthcareEdIcu: [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Healthcare", url: "/industries/healthcare" },
    { name: "ED/ICU" },
  ],
  industriesHealthcareAgedCare: [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" },
    { name: "Healthcare", url: "/industries/healthcare" },
    { name: "Aged Care" },
  ],

  // Features
  featureAutomatedRostering: [
    { name: "Home", url: "/" },
    { name: "Features", url: "/feature" },
    { name: "Automated Rostering" },
  ],
  featureShiftSwaps: [
    { name: "Home", url: "/" },
    { name: "Features", url: "/feature" },
    { name: "Shift Swaps" },
  ],

  // US versions
  usIndustriesHealthcare: [
    { name: "Home", url: "/us" },
    { name: "Industries", url: "/us/industries" },
    { name: "Healthcare" },
  ],
};
