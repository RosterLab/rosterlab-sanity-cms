import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from "next";
import { createTimesheetTemplatePage } from "@/components/resources/TimesheetTemplatePage";

export const metadata: Metadata = resourceMetadata(
  {
    title: "Free Staff Timesheet Template",
    description:
      "Download our free staff timesheet template for Excel. Track employee hours, overtime, and customize our professionally designed template.",
    alternates: {
      canonical:
        "https://rosterlab.com/us/templates/free-staff-timesheet-template",
    },
    openGraph: {
      title: "Free Staff Timesheet Template - RosterLab",
      description:
        "Download our free staff timesheet template for Excel. Track employee hours, overtime, and customize our professionally designed template.",
      images: [
        {
          url: "/images/timesheet/timesheet-preview.png",
          width: 3730,
          height: 1628,
          alt: "Timesheet template preview",
        },
      ],
      type: "website",
      url: "/us/templates/free-staff-timesheet-template",
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Staff Timesheet Template - RosterLab",
      description:
        "Download our free staff timesheet template for Excel. Track employee hours, overtime, and customize our professionally designed template.",
      images: ["/images/timesheet/timesheet-preview.png"],
    },
  },
  "/us/templates/free-staff-timesheet-template",
);

const Page = createTimesheetTemplatePage(true);
export default Page;
