import ChristmasShiftPickerClient from "./client";
import SiteLayout from "@/components/layout/SiteLayout";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title:
      "Christmas Shift Picker - Free Festive Season Rostering Tool | RosterLab",
    description:
      "Fairly distribute Christmas and festive season shifts among your team. Free tool to collect staff preferences and automatically allocate shifts equitably.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title:
        "Christmas Shift Picker - Free Festive Season Rostering Tool | RosterLab",
      description:
        "Fairly distribute Christmas and festive season shifts among your team. Free tool to collect staff preferences and automatically allocate shifts equitably.",
      type: "website",
      url: "https://rosterlab.com/tools/christmas-shift-picker",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Christmas Shift Picker - Free Festive Season Rostering Tool | RosterLab",
      description:
        "Fairly distribute Christmas and festive season shifts among your team. Free tool to collect staff preferences and automatically allocate shifts equitably.",
    },
  },
  "/tools/christmas-shift-picker",
);

export default function ChristmasShiftPickerPage() {
  return (
    <SiteLayout>
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-green-50">
        <ChristmasShiftPickerClient />
      </section>

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          {
            name: "Christmas Shift Picker",
            url: "/tools/christmas-shift-picker",
          },
        ]}
      />
    </SiteLayout>
  );
}
