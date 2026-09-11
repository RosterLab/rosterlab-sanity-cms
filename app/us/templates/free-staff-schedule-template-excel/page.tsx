import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from "next";
import { createExcelTemplatePage } from "@/components/resources/ExcelTemplatePage";

export const metadata: Metadata = resourceMetadata(
  {
    title: "Free Staff Schedule Template Excel",
    description:
      "Download our free staff schedule template for Excel. Pre-formatted 6-week schedule ready for assigning shifts and tracking workload automatically.",
    alternates: {
      canonical:
        "https://rosterlab.com/us/templates/free-staff-schedule-template-excel",
    },
    openGraph: {
      title: "Free Staff Schedule Template Excel - RosterLab",
      description:
        "Download our free staff schedule template for Excel. Pre-formatted 6-week schedule ready for assigning shifts and tracking workload automatically.",
      images: [
        {
          url: "/images/og-images/Excel.png",
          width: 1200,
          height: 600,
          alt: "Excel schedule template preview",
        },
      ],
      type: "website",
      url: "/us/templates/free-staff-schedule-template-excel",
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Staff Schedule Template Excel - RosterLab",
      description:
        "Download our free staff schedule template for Excel. Pre-formatted 6-week schedule ready for assigning shifts and tracking workload automatically.",
      images: ["/images/og-images/Excel.png"],
    },
  },
  "/us/templates/free-staff-schedule-template-excel",
);

const Page = createExcelTemplatePage(true);
export default Page;
