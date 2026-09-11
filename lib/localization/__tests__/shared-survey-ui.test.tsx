import { fireEvent, render, screen } from "@testing-library/react";
import SurveyPreferencesClient from "@/app/tools/survey-preferences/client";
import ResultsTable from "@/components/survey/ResultsTable";
import type { SurveyResultsResponse } from "@/lib/survey/types";

const mockResponse = Object.freeze({
  survey_id: "survey-123",
  admin_token: "a/b+c",
  staff_url: "https://preview.example/tools/survey-preferences/s/survey-123",
  admin_url:
    "https://preview.example/tools/survey-preferences/admin/survey-123?token=a%2Fb%2Bc",
});

jest.mock("@/components/survey/HolidayConfigurator", () => ({
  __esModule: true,
  default: ({ isUS, onSurveyCreated }: any) => (
    <button onClick={() => onSurveyCreated(mockResponse)}>
      {isUS ? "Create US survey" : "Create global survey"}
    </button>
  ),
}));
jest.mock("@/components/analytics/tracking", () => ({
  trackButtonClick: jest.fn(),
  trackSmartButtonClick: jest.fn(),
}));

test.each([false, true])(
  "survey creation preserves origin and token with isUS=%s",
  (isUS) => {
    render(<SurveyPreferencesClient isUS={isUS} />);
    fireEvent.click(
      screen.getByRole("button", {
        name: isUS ? "Create US survey" : "Create global survey",
      }),
    );
    const prefix = isUS ? "/us" : "";
    expect(
      screen.getByDisplayValue(
        `https://preview.example${prefix}/tools/survey-preferences/s/survey-123`,
      ),
    ).toBeTruthy();
    expect(
      screen.getByDisplayValue(
        `https://preview.example${prefix}/tools/survey-preferences/admin/survey-123?token=a%2Fb%2Bc`,
      ),
    ).toBeTruthy();
  },
);

test.each([false, true])(
  "results share the correct staff route with isUS=%s",
  (isUS) => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const results: SurveyResultsResponse = {
      survey: {
        id: "survey-123",
        title: "Holiday shifts",
        org_name: "Example",
        created_at: new Date(),
        updated_at: new Date(),
        config: {
          holidays: [
            {
              id: "holiday-1",
              name: "Holiday",
              date: "2026-12-25",
              staff_needed: 2,
            },
          ],
        },
      },
      participants: [],
      responses: [],
      stats: {
        total_participants: 0,
        total_responses: 0,
        completion_rate: 0,
        average_preferences_per_participant: 0,
        submission_dates: [],
      },
    };
    render(<ResultsTable results={results} isUS={isUS} />);
    fireEvent.click(screen.getByRole("button", { name: "Assignments" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Share the staff survey link" }),
    );
    expect(writeText).toHaveBeenCalledWith(
      `${window.location.origin}${isUS ? "/us" : ""}/tools/survey-preferences/s/survey-123`,
    );
  },
);
