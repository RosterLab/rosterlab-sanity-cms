/**
 * Survey Preferences Landing Page
 * Main page for creating shift preference surveys
 */

import { Metadata } from "next";
import SurveyPreferencesClient from "./client";

export const metadata: Metadata = {
  title: "Create your Holiday Shift Preference Survey | RosterLab",
  description:
    "Create custom holiday shift preference surveys for your team. Collect availability, shift preferences, and time-off requests without login required.",
  openGraph: {
    title: "Create your Holiday Shift Preference Survey | RosterLab",
    description:
      "Create custom holiday shift preference surveys for your team. Collect availability, shift preferences, and time-off requests.",
    type: "website",
  },
};

export default function SurveyPreferencesPage() {
  return <SurveyPreferencesClient />;
}
