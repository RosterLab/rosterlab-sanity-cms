import { withHreflang } from "@/components/seo/HreflangTags";
import AlliedHealthPage from "@/app/industries/healthcare/allied-health-rostering/AlliedHealthPage";

// Literal metadata lets the repository's SEO checks inspect this regional route.
export const metadata = withHreflang(
  {
    title: "Allied Health AI Scheduling Software",
    description:
      "Discover RosterLab, AI scheduling software for allied health teams. Build schedules around specialist skills and working arrangements faster, with less admin.",
    alternates: {
      canonical:
        "https://rosterlab.com/us/industries/healthcare/allied-health-scheduling",
    },
    openGraph: {
      title: "Allied Health AI Scheduling Software | RosterLab",
      description:
        "Discover RosterLab, AI scheduling software for allied health teams. Build schedules around specialist skills and working arrangements faster, with less admin.",
      type: "website",
      url: "https://rosterlab.com/us/industries/healthcare/allied-health-scheduling",
      images: [
        {
          url: "/images/industries/allied-health/physiotherapy-og.webp",
          width: 1200,
          height: 630,
          alt: "Clinician assisting a patient with resistance-band exercises",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Allied Health AI Scheduling Software | RosterLab",
      description:
        "Discover RosterLab, AI scheduling software for allied health teams. Build schedules around specialist skills and working arrangements faster, with less admin.",
      images: ["/images/industries/allied-health/physiotherapy-og.webp"],
    },
  },
  "/us/industries/healthcare/allied-health-scheduling",
);

export default function AlliedHealthSchedulingPage() {
  return <AlliedHealthPage isUS />;
}
