import { withHreflang } from "@/components/seo/HreflangTags";

export function whyRosterLabMetadata(isUS = false) {
  const path = isUS ? "/us/why-rosterlab" : "/why-rosterlab";
  const url = `https://rosterlab.com${path}`;
  const description = isUS
    ? "See why healthcare teams choose RosterLab. Simplify complex scheduling with advanced AI that balances clinical staffing needs and staff well-being."
    : "See why healthcare teams choose RosterLab. Simplify complex rostering with advanced AI that balances clinical staffing needs and staff wellbeing.";

  const title = isUS
    ? "Why Choose RosterLab for Healthcare Scheduling?"
    : "Why Choose RosterLab for Healthcare Rostering?";

  return withHreflang(
    {
      title,
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url,
        images: [
          {
            url: "/images/og-images/why-choose-us.png",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/images/og-images/why-choose-us.png"],
      },
    },
    path,
  );
}
