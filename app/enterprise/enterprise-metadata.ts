import { withHreflang } from "@/components/seo/HreflangTags";
import { enterpriseText } from "./enterprise-copy";

export function enterpriseMetadata(isUS = false) {
  const title = enterpriseText(
    "Enterprise Healthcare Rostering Software",
    isUS,
  );
  const description = isUS
    ? "AI-powered enterprise healthcare scheduling software. Manage your clinical workforce, control staffing costs and strengthen compliance on one secure platform."
    : "Enterprise healthcare rostering software powered by AI. Roster your entire clinical workforce on one secure platform, control staffing costs and strengthen compliance.";
  const path = isUS ? "/us/enterprise" : "/enterprise";
  const url = `https://rosterlab.com${path}`;
  return withHreflang(
    {
      title,
      description,
      alternates: { canonical: url },
      openGraph: {
        title: `${title} - RosterLab`,
        description,
        type: "website",
        url,
        images: [
          {
            url: "/images/og-images/Pricing.png",
            width: 1200,
            height: 630,
            alt: "RosterLab Enterprise",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} - RosterLab`,
        description,
        images: ["/images/og-images/Pricing.png"],
      },
    },
    path,
  );
}
