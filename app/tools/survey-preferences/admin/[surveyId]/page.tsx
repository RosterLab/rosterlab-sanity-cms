/**
 * Admin Dashboard Page
 * Protected page for viewing survey results (requires admin token)
 */

import { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminDashboardClient from "./client";
import { getDbClient } from "@/lib/db/client";
import type { Survey } from "@/lib/survey/types";

interface PageProps {
  params: Promise<{ surveyId: string }>;
  searchParams: Promise<{ token?: string }>;
}

async function verifySurvey(
  surveyId: string,
  token: string,
): Promise<Survey | null> {
  try {
    const sql = getDbClient();
    const result = await sql`
      SELECT id, title, org_name, config, created_at, updated_at
      FROM surveys
      WHERE id = ${surveyId} AND admin_token = ${token}
    `;

    if (!result || result.length === 0) {
      return null;
    }

    return result[0] as Survey;
  } catch (error) {
    console.error("Error verifying survey:", error);
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Survey Admin Dashboard | RosterLab",
    description: "View and manage survey responses",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminDashboardPage({
  params,
  searchParams,
}: PageProps) {
  const { surveyId } = await params;
  const { token } = await searchParams;

  // Require token
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Access Denied
          </h1>
          <p className="text-neutral-600 mb-6">
            Admin token required to access this page. Please use the admin link
            provided when you created the survey.
          </p>
        </div>
      </div>
    );
  }

  // Verify token
  const survey = await verifySurvey(surveyId, token);

  if (!survey) {
    notFound();
  }

  return <AdminDashboardClient surveyId={surveyId} token={token} />;
}
