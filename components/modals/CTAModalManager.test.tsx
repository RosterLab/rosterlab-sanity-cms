import { act, fireEvent, render, screen } from "@testing-library/react";
import CTAModalManager from "./CTAModalManager";
import { updateModalState } from "@/lib/analytics/user-behavior-tracker";

let pathname = "/";
jest.mock("next/navigation", () => ({ usePathname: () => pathname }));
jest.mock("@/components/analytics/tracking", () => ({
  analytics: { track: jest.fn() },
}));
jest.mock("@/lib/analytics/user-behavior-tracker", () => ({
  trackPageView: jest.fn(),
  shouldShowModal: () => true,
  assignVariant: () => "B",
  updateModalState: jest.fn(),
  getModalTriggerType: () => "high_intent",
}));
jest.mock("./CTAModalCaseStudy", () => ({
  __esModule: true,
  default: ({
    isUS,
    isOpen,
    onConversion,
  }: {
    isUS: boolean;
    isOpen: boolean;
    onConversion: () => void;
  }) =>
    isOpen ? (
      <button onClick={onConversion}>
        {isUS ? "US case study" : "Global case study"}
      </button>
    ) : null,
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
});
afterEach(() => jest.useRealTimers());

test.each([
  ["/us", "US case study"],
  ["/us/features", "US case study"],
  ["/", "Global case study"],
])("selects the correct case study region on %s", async (path, label) => {
  pathname = path;
  render(<CTAModalManager />);
  await act(async () => {
    jest.advanceTimersByTime(3000);
  });
  await act(async () => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.queryByText(label)).not.toBeNull();
});

test("records a case study click so that the offer is not repeated", async () => {
  pathname = "/us";
  render(<CTAModalManager />);
  await act(async () => {
    jest.advanceTimersByTime(3000);
  });
  await act(async () => {
    jest.advanceTimersByTime(1000);
  });
  fireEvent.click(screen.getByRole("button", { name: "US case study" }));
  expect(updateModalState).toHaveBeenCalledWith(
    expect.objectContaining({
      converted: true,
      caseStudyViewed: true,
    }),
  );
  expect(screen.queryByText("US case study")).toBeNull();
});

test("closes an existing case study popup when navigating to an article", async () => {
  pathname = "/us";
  const { rerender } = render(<CTAModalManager />);
  await act(async () => {
    jest.advanceTimersByTime(3000);
  });
  await act(async () => {
    jest.advanceTimersByTime(1000);
  });
  expect(screen.queryByText("US case study")).not.toBeNull();
  pathname = "/us/case-studies/other-article";
  rerender(<CTAModalManager />);
  expect(screen.queryByText("US case study")).toBeNull();
});

test.each(["/book-a-demo", "/us/book-a-demo", "/us/book-a-demo/"])(
  "does not open a popup on the booking page %s",
  async (path) => {
    pathname = path;
    render(<CTAModalManager />);
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByRole("button")).toBeNull();
    expect(updateModalState).not.toHaveBeenCalled();
  },
);

test.each(["/book-a-demo", "/us/book-a-demo"])(
  "closes an already open popup when navigating to %s",
  async (path) => {
    pathname = "/us";
    const { rerender } = render(<CTAModalManager />);
    await act(async () => {
      jest.advanceTimersByTime(3000);
    });
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.queryByText("US case study")).not.toBeNull();
    pathname = path;
    rerender(<CTAModalManager />);
    expect(screen.queryByRole("button")).toBeNull();
  },
);
