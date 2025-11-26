import EmployeeShiftRandomiserClient from "./client";
import SiteLayout from "@/components/layout/SiteLayout";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Employee Shift Randomiser - Assign Seasonal Shifts Fairly",
    description:
      "Randomly distribute seasonal shifts fairly among your team.. Free tool to add shifts, dates, staff preferences, and constraints, then generate.",
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Employee Shift Randomiser - Assign Seasonal Shifts Fairly",
      description:
        "Randomly distribute seasonal shifts fairly among your team.. Free tool to add shifts, dates, staff preferences, and constraints, then generate.",
      type: "website",
      url: "https://rosterlab.com/tools/employee-shift-randomiser",
      images: [
        {
          url: "/images/updated-hero/shift-randomiser.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Employee Shift Randomiser - Assign Seasonal Shifts Fairly",
      description:
        "Randomly distribute seasonal shifts fairly among your team.. Free tool to add shifts, dates, staff preferences, and constraints, then generate.",
      images: ["/images/updated-hero/shift-randomiser.jpg"],
    },
  },
  "/tools/employee-shift-randomiser",
);

export default function EmployeeShiftRandomiserPage() {
  return (
    <SiteLayout>
      <EmployeeShiftRandomiserClient />

      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Tools", url: "/tools" },
          {
            name: "Employee Shift Randomiser",
            url: "/tools/employee-shift-randomiser",
          },
        ]}
      />
    </SiteLayout>
  );
}
