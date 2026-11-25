import { getUSPath, withHreflang } from "@/components/seo/HreflangTags";
import { ottoText } from "./otto-copy";

const globalPath = "/feature/ai-staff-rostering-assistant";
const socialImage = "/images/og-images/Otto Link Preview.png";

export function ottoMetadata(isUS = false) {
  const pathname = isUS ? (getUSPath(globalPath) ?? globalPath) : globalPath;
  const canonical = `https://rosterlab.com${pathname}`;
  const imageAlt = "The RosterLab logo and Otto’s octopus mark on a blue background";
  const title = ottoText("Personal AI Staff Rostering Assistant", isUS);
  const description = ottoText(
    "Roster smarter with Otto, RosterLab’s AI rostering assistant. Get instant answers, find solutions to staffing challenges and tackle complex tasks simply by asking.",
    isUS,
  );

  return withHreflang(
    {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        type: "website",
        url: canonical,
        title: `${title} - RosterLab`,
        description,
        images: [{ url: socialImage, width: 1200, height: 630, alt: imageAlt }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} - RosterLab`,
        description,
        images: [{ url: socialImage, alt: imageAlt }],
      },
    },
    pathname,
  );
}
