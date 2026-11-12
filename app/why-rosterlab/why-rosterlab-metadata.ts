import { withHreflang } from "@/components/seo/HreflangTags";

export function whyRosterLabMetadata(isUS = false) {
  const path = isUS ? "/us/why-rosterlab" : "/why-rosterlab";
  const url = `https://rosterlab.com${path}`;
  const description = isUS
    ? "See why healthcare teams choose RosterLab as their AI scheduling platform. Create smarter, fairer schedules that put people first."
    : "See why healthcare teams choose RosterLab as their AI rostering platform. Create smarter, fairer schedules that put people first.";

  return withHreflang(
    {
      title: isUS
        ? "Why Teams Choose Us for Staff Scheduling"
        : "Why Teams Choose Us for Staff Rostering",
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title: "Why Choose Us - RosterLab",
        description,
        type: "website",
        url,
        images: [
          {
            url: "/images/og-images/why-choose-us.png",
            width: 1200,
            height: 630,
            alt: "Why Choose Us - RosterLab",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Why Choose Us - RosterLab",
        description,
        images: ["/images/og-images/why-choose-us.png"],
      },
    },
    path,
  );
}
