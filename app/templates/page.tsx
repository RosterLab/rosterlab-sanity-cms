import { Metadata } from "next";
import TemplatesPageContent from "./TemplatesPageContent";
import SiteLayout from "@/components/layout/SiteLayout";

export const metadata: Metadata = {
  title: "Free Workforce Management Templates - RosterLab",
  description:
    "Download free workforce management templates. Streamline your workforce management with our professionally designed Excel and Word templates.",
  alternates: {
    canonical: "https://rosterlab.com/templates",
  },
  openGraph: {
    title: "Free Workforce Management Templates - RosterLab",
    description:
      "Download free workforce management templates. Streamline your workforce management with our professionally designed Excel and Word templates.",
    type: "website",
    url: "https://rosterlab.com/templates",
    images: [
      {
        url: "/images/og-images/WFM.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Workforce Management Templates - RosterLab",
    description:
      "Download free workforce management templates. Streamline your workforce management with our professionally designed Excel and Word templates.",
    images: ["/images/og-images/WFM.png"],
  },
};

const templates = [
  {
    id: "timesheet",
    title: "Free Staff Timesheet Template",
    description:
      "Track employee hours, overtime, and manage payroll with our professionally designed Excel template.",
    href: "/templates/free-staff-timesheet-template",
    image: "/images/timesheet/timesheet-preview.png",
    format: "Excel",
    category: "Time Tracking",
  },
  {
    id: "shift-swap",
    title: "Free Shift Swap Template",
    description:
      "Streamline staff shift exchanges with our professionally designed Word template for shift swap requests.",
    href: "/templates/free-shift-swap-template",
    image: "/images/shift-swap/shift-swap-preview.png",
    format: "Word",
    category: "Shift Management",
  },
  {
    id: "roster",
    title: "Free Staff Roster Template",
    description:
      "Create and manage staff schedules efficiently with our comprehensive Excel roster template.",
    href: "/templates/free-staff-roster-template-excel",
    image: "/images/excel/excel-preview-new-1.png",
    format: "Excel",
    category: "Rostering",
  },
  {
    id: "employee-of-month",
    title: "Free Employee of the Month Certificate",
    description:
      "Recognise outstanding team members with our professionally designed, customisable Canva certificate template.",
    href: "/templates/free-employee-of-the-month-certificate",
    image:
      "/images/employee-certificate/employee-of-month-editable-certificate-preview.png",
    format: "Canva",
    category: "Recognition",
  },
];

export default function TemplatesPage() {
  return (
    <SiteLayout>
      <TemplatesPageContent templates={templates} />
    </SiteLayout>
  );
}
