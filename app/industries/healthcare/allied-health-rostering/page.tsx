import { withHreflang } from "@/components/seo/HreflangTags";
import AlliedHealthPage from "./AlliedHealthPage";

const TITLE = "Allied Health AI Rostering Software";
const DESCRIPTION =
  "Discover RosterLab, the AI rostering software for allied health teams. Build rosters around specialist skills and working arrangements faster, with less admin.";
const PATH = "/industries/healthcare/allied-health-rostering";
const OG_IMAGE = "/images/industries/allied-health/physiotherapy-og.webp";

export const metadata = withHreflang(
  {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `https://rosterlab.com${PATH}` },
    openGraph: {
      title: `${TITLE} | RosterLab`,
      description: DESCRIPTION,
      type: "website",
      url: `https://rosterlab.com${PATH}`,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Clinician assisting a patient with resistance-band exercises",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${TITLE} | RosterLab`,
      description: DESCRIPTION,
      images: [OG_IMAGE],
    },
  },
  PATH,
);

export default function AlliedHealthRosteringPage() {
  return <AlliedHealthPage />;
}
