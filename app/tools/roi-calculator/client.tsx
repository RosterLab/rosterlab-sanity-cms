"use client";

import { CalculatorBase } from "@/components/calculators";

export default function ROICalculatorClient() {
  const regionalContent = {
    title: "ROI Calculator",
    subtitle:
      "Discover how much time and money RosterLab can save your organisation with intelligent rostering automation.",
    explanation:
      "We estimated your ROI based on our experience with different specialties in healthcare and research on industry standards.",
    heroImage: {
      src: "/images/illustration/Coins-rafiki.svg",
      alt: "ROI Calculator illustration",
    },
    terminology: {
      scheduling: "rostering",
      schedules: "rosters",
      scheduler: "rosterer",
    },
    buttons: {
      pricing: "View Pricing",
      demo: "Book a Demo",
      viewPricing: "View Pricing",
      seeHowItWorks: "See How It Works",
      contactUs: "Contact Us",
      learnMore: "Learn More",
    },
    links: {
      pricing: "/pricing",
      demo: "/book-a-demo",
      productTour: "/staff-rostering-interactive-demo",
      contact: "/contact",
      solutions: "/solutions/ai-roster-generator",
    },
    industryOptions: [
      { value: "nursing", label: "Nursing" },
      { value: "acute-specialties", label: "Acute" },
      { value: "medicine-specialties", label: "Medicine" },
      { value: "allied-health", label: "Allied Health" },
      { value: "aged-care", label: "Aged care" },
      { value: "midwives", label: "Midwives" },
      { value: "veterinary", label: "Veterinary" },
      { value: "surgical", label: "Surgical" },
    ],
  };

  return (
    <CalculatorBase
      region="global"
      reportType="roi"
      regionalContent={regionalContent}
      hubspotConfig={{
        portalId: "20646833",
        formId: "d06fa4b4-4f8c-4eef-b674-47dc86ac918b",
      }}
    />
  );
}
