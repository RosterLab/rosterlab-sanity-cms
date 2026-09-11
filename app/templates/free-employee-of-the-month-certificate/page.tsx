import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from "next";
import { createEmployeeCertificatePage } from "@/components/resources/EmployeeCertificatePage";

export const metadata: Metadata = resourceMetadata(
  {
    title: "Free Editable Employee of the Month Template",
    description:
      "Download our free, editable Employee of the Month certificate template on Canva. Recognise outstanding team members with a professionally designed certificate.",
    alternates: {
      canonical:
        "https://rosterlab.com/templates/free-employee-of-the-month-certificate",
    },
    openGraph: {
      title: "Free Editable Employee of the Month Template",
      description:
        "Download our free, editable Employee of the Month certificate template on Canva. Recognise outstanding team members with a professionally designed certificate.",
      images: [
        {
          url: "/images/employee-certificate/employee-of-month-editable-certificate-preview.png",
          width: 1200,
          height: 600,
          alt: "Employee of the Month certificate template preview",
        },
      ],
      type: "website",
      url: "/templates/free-employee-of-the-month-certificate",
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Editable Employee of the Month Template",
      description:
        "Download our free, editable Employee of the Month certificate template on Canva. Recognise outstanding team members with a professionally designed certificate.",
      images: [
        "/images/employee-certificate/employee-of-month-editable-certificate-preview.png",
      ],
    },
  },
  `/templates/free-employee-of-the-month-certificate`,
);

const Page = createEmployeeCertificatePage(false);
export default Page;
