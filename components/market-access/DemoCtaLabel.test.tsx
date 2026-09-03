import { render, screen, waitFor } from "@testing-library/react";
import { MarketAccessProvider } from "./MarketAccessProvider";
import DemoCtaLabel from "./DemoCtaLabel";
import Button from "@/components/ui/Button";

jest.mock("@/components/analytics/tracking", () => ({
  analytics: { track: jest.fn(), getDeviceId: jest.fn() },
  trackButtonClick: jest.fn(),
  trackSmartButtonClick: jest.fn(),
}));

const fetchMock = jest.fn();

function renderWithDecision(demo: string, ui: React.ReactNode) {
  fetchMock.mockReset().mockResolvedValue({
    ok: true,
    json: async () => ({
      policyVersion: "test",
      countryCode: "CN",
      freeSignup: "hide",
      demo,
      reasonCode: "below_high_income",
    }),
  });
  return render(<MarketAccessProvider>{ui}</MarketAccessProvider>);
}

describe("demo CTA relabelling", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = fetchMock as unknown as typeof fetch;
  });

  test("asks restricted countries to request a demo", async () => {
    renderWithDecision(
      "request_review",
      <DemoCtaLabel href="/book-a-demo">Book a demo</DemoCtaLabel>,
    );

    await waitFor(() => {
      expect(screen.getByText("Request a demo")).toBeInTheDocument();
    });
  });

  test("leaves the label alone where the calendar is available", async () => {
    renderWithDecision(
      "nzt_business_hours",
      <DemoCtaLabel href="/book-a-demo">Book a demo</DemoCtaLabel>,
    );

    await waitFor(() => {
      expect(screen.getByText("Book a demo")).toBeInTheDocument();
    });
  });

  test("leaves CTAs pointing elsewhere alone", async () => {
    renderWithDecision(
      "request_review",
      <DemoCtaLabel href="/contact">Book a call</DemoCtaLabel>,
    );

    await waitFor(() => {
      expect(screen.getByText("Book a call")).toBeInTheDocument();
    });
  });

  test("relabels Button CTAs without touching their other children", async () => {
    renderWithDecision(
      "request_review",
      <Button href="/us/book-a-demo">
        Book a Demo
        <span>→</span>
      </Button>,
    );

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("Request a Demo→");
    });
  });
});
