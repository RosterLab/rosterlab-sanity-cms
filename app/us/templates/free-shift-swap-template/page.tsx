import { resourceMetadata } from "@/lib/localization/us-resources";
import { Metadata } from "next";
import { createShiftSwapTemplatePage } from "@/components/resources/ShiftSwapTemplatePage";

export const metadata: Metadata = resourceMetadata(
  {
    title: "Free Shift Swap Template",
    description:
      "Download our free shift swap request form template. Streamline staff shift exchanges with our professionally designed Word template.",
    alternates: {
      canonical: "https://rosterlab.com/us/templates/free-shift-swap-template",
    },
    openGraph: {
      title: "Free Shift Swap Template - RosterLab",
      description:
        "Download our free shift swap request form template. Streamline staff shift exchanges with our professionally designed Word template.",
      images: [
        {
          url: "/images/shift-swap/shift-swap-preview.png",
          width: 1200,
          height: 600,
          alt: "Shift swap template preview",
        },
      ],
      type: "website",
      url: "/us/templates/free-shift-swap-template",
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Shift Swap Template - RosterLab",
      description:
        "Download our free shift swap request form template. Streamline staff shift exchanges with our professionally designed Word template.",
      images: ["/images/shift-swap/shift-swap-preview.png"],
    },
  },
  "/us/templates/free-shift-swap-template",
);

const Page = createShiftSwapTemplatePage(true);
export default Page;
