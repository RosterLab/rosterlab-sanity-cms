import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from "next";
import { createExcelTemplatePage } from "@/components/resources/ExcelTemplatePage";

export const metadata: Metadata = resourceMetadata(
  {
    title: "Free Staff Roster Template Excel",
    description:
      "Download our free staff roster template for Excel. Pre-formatted 6-week roster ready for assigning shifts and tracking workload automatically.",
    alternates: {
      canonical:
        "https://rosterlab.com/templates/free-staff-roster-template-excel",
    },
    openGraph: {
      title: "Free Staff Roster Template Excel - RosterLab",
      description:
        "Download our free staff roster template for Excel. Pre-formatted 6-week roster ready for assigning shifts and tracking workload automatically.",
      images: [
        {
          url: "/images/og-images/Excel.png",
          width: 1200,
          height: 600,
          alt: "Excel roster template preview",
        },
      ],
      type: "website",
      url: "/templates/free-staff-roster-template-excel",
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Staff Roster Template Excel - RosterLab",
      description:
        "Download our free staff roster template for Excel. Pre-formatted 6-week roster ready for assigning shifts and tracking workload automatically.",
      images: ["/images/og-images/Excel.png"],
    },
  },
  `/templates/free-staff-roster-template-excel`,
);

const Page = createExcelTemplatePage(false);
export default Page;
