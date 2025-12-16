/**
 * Survey Preferences Landing Page
 * Main page for creating shift preference surveys
 */

import { Metadata } from "next";
import SurveyPreferencesClient from "./client";

export const metadata: Metadata = {
  title: "Holiday Shift Preferences Survey & Automated Assignment | RosterLab",
  description:
    "Collect preferences for holiday shifts this season. Then use the auto-distribution feature to fairly assignment shifts - no login required.",
  openGraph: {
    title:
      "Holiday Shift Preferences Survey & Automated Assignment | RosterLab",
    description:
      "Collect preferences for holiday shifts this season. Then use the auto-distribution feature to fairly assignment shifts - no login required.",
    type: "website",
  },
};

export default function SurveyPreferencesPage() {
  return <SurveyPreferencesClient />;
}
