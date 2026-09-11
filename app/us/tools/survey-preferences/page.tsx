// Generated from app/tools/survey-preferences/page.tsx. Run npm run localize:resources; do not edit directly.

import { resourceMetadata } from "@/lib/localization/us-resources";
/**
 * Survey Preferences Landing Page
 * Main page for creating shift preference surveys
 */

import { Metadata } from "next";
import SurveyPreferencesClient from "@/app/tools/survey-preferences/client";

export const metadata: Metadata = resourceMetadata({
  title: "Holiday Shift Preference Survey & Assignment",
  description:
    "Collect preferences for holiday shifts this season. Then use the auto-distribution feature to fairly assignment shifts - no login required.",
  openGraph: {
    title: "Holiday Shift Preferences Survey & Automated Assignment",
    description:
      "Collect preferences for holiday shifts this season. Then use the auto-distribution feature to fairly assignment shifts - no login required.",
    type: "website",
    images: [
      {
        url: "/images/shift-preference-survey.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
}, "/us/tools/survey-preferences");

export default function SurveyPreferencesPage() {
  return <SurveyPreferencesClient isUS />;
}
