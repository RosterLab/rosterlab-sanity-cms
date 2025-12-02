/**
 * Staff Submission Page
 * Public page where staff submit their shift preferences
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import StaffSubmissionClient from "./client";
import { getDbClient } from "@/lib/db/client";
import type { Survey } from "@/lib/survey/types";

interface PageProps {
  params: Promise<{ surveyId: string }>;
}

async function getSurvey(surveyId: string): Promise<Survey | null> {
  try {
    const sql = getDbClient();
    const result = await sql`
      SELECT id, title, org_name, config, created_at, updated_at
      FROM surveys
      WHERE id = ${surveyId}
    `;

    if (!result || result.length === 0) {
      return null;
    }

    return result[0] as Survey;
  } catch (error) {
    console.error("Error fetching survey:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { surveyId } = await params;
  const survey = await getSurvey(surveyId);

  if (!survey) {
    return {
      title: "Survey Not Found | RosterLab",
    };
  }

  return {
    title: `${survey.title} | ${survey.org_name}`,
    description: `Submit your shift preferences for ${survey.title}`,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function StaffSubmissionPage({ params }: PageProps) {
  const { surveyId } = await params;
  const survey = await getSurvey(surveyId);

  if (!survey) {
    notFound();
  }

  return <StaffSubmissionClient survey={survey} />;
}
