"use client";

import { CalculatorBase } from "@/components/calculators";

export default function SavingsCalculatorClient() {
  const regionalContent = {
    title: "Savings Calculator",
    subtitle:
      "Discover how much time and money RosterLab can save your organization with intelligent scheduling automation.",
    explanation:
      "We estimated your savings based on our experience with different specialties in healthcare and research on industry standards.",
    terminology: {
      scheduling: "scheduling",
      schedules: "schedules",
      scheduler: "scheduler",
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
      pricing: "/us/pricing",
      demo: "/us/book-a-demo",
      productTour: "/us/product-tour",
      contact: "/us/contact",
      solutions: "/us/solutions/ai-staff-schedule-maker",
    },
    heroImage: {
      src: "/images/us-images/stock/istockphoto-1903423742-2048x2048.jpg",
      alt: "Healthcare radiography scheduling",
    },
    industryOptions: [
      { value: "nursing", label: "Nursing" },
      { value: "acute-specialties", label: "Acute Care" },
      {
        value: "medicine-specialties",
        label: "Primary Care / Family Medicine",
      },
      { value: "allied-health", label: "Therapists & Technicians" },
      { value: "aged-care", label: "Senior Care" },
      { value: "midwives", label: "Labor & Delivery" },
      { value: "veterinary", label: "Veterinary Practices & Animal Hospitals" },
      { value: "surgical", label: "Surgical Services" },
    ],
  };

  return (
    <CalculatorBase
      region="us"
      reportType="savings"
      regionalContent={regionalContent}
      hubspotConfig={{
        portalId: "20646833",
        formId: "d06fa4b4-4f8c-4eef-b674-47dc86ac918b",
      }}
    />
  );
}
