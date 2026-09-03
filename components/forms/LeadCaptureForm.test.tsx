import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LeadCaptureForm from "./LeadCaptureForm";
import { trackFormSubmission } from "@/lib/analytics/events/conversion-events";

jest.mock("@/lib/analytics/events/conversion-events", () => ({
  trackFormSubmission: jest.fn(),
}));

const trackFormSubmissionMock = jest.mocked(trackFormSubmission);
const fetchMock = jest.fn();

describe("LeadCaptureForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "warn").mockImplementation(() => undefined);
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    fetchMock.mockReset().mockResolvedValue({ ok: true });
    Object.defineProperty(global, "fetch", {
      configurable: true,
      value: fetchMock,
    });
    Object.defineProperty(window, "rlTracker", {
      configurable: true,
      value: {
        formStart: jest.fn(),
        formSubmit: jest.fn(),
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    delete window.rlTracker;
  });

  function submitEmailForm(onSuccess?: () => void | Promise<void>) {
    render(
      <LeadCaptureForm
        source="newsletter"
        showName={false}
        showCompany={false}
        successMessage="Subscribed"
        onSuccess={onSuccess}
      />,
    );
    fireEvent.change(screen.getByLabelText("Work email"), {
      target: { value: "person@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Submit" }));
  }

  test("shows success and runs the next action when analytics throws", async () => {
    window.rlTracker!.formSubmit = jest.fn(() => {
      throw new Error("tracker unavailable");
    });
    trackFormSubmissionMock.mockImplementation(() => {
      throw new Error("analytics unavailable");
    });
    const onSuccess = jest.fn();

    submitEmailForm(onSuccess);

    expect(await screen.findByText("Subscribed")).toBeTruthy();
    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText("We couldn't submit that. Please try again."),
    ).toBeNull();
  });

  test("retries a failed next action without resubmitting the lead", async () => {
    const onSuccess = jest
      .fn()
      .mockRejectedValueOnce(new Error("download failed"))
      .mockResolvedValueOnce(undefined);

    submitEmailForm(onSuccess);

    expect(
      await screen.findByText(
        "We received your details, but couldn't complete the next step.",
      ),
    ).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Retry next step" }));

    await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(2));
    await waitFor(() =>
      expect(
        screen.queryByText(
          "We received your details, but couldn't complete the next step.",
        ),
      ).toBeNull(),
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
