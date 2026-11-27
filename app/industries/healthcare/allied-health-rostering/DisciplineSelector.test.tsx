import "@testing-library/jest-dom";
import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import DisciplineSelector from "./DisciplineSelector";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    // The mock exposes image sources without Next.js loading behaviour.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));
jest.mock("@/components/analytics/tracking", () => ({
  trackButtonClick: jest.fn(),
  trackSmartButtonClick: jest.fn(),
}));

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

function advance(milliseconds: number) {
  act(() => jest.advanceTimersByTime(milliseconds));
}

test("specialties change only when the reader selects one", () => {
  render(<DisciplineSelector />);
  advance(30000);
  expect(screen.getByRole("tab", { name: "Medical imaging" })).toHaveAttribute(
    "aria-selected",
    "true",
  );

  fireEvent.click(screen.getByRole("tab", { name: "Pharmacy" }));
  advance(30000);
  expect(screen.getByRole("tab", { name: "Pharmacy" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(
    screen.queryByRole("button", { name: /automatic slideshow/i }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Show Pharmacy" })).toHaveAttribute(
    "aria-current",
    "true",
  );
});

test("slideshow dots and keyboard selection work on the US page", () => {
  render(<DisciplineSelector isUS />);
  fireEvent.click(
    screen.getByRole("button", {
      name: "Show Pathology & laboratory services",
    }),
  );
  advance(20000);
  const pathology = screen.getByRole("tab", { name: "Pathology & lab" });
  expect(pathology).toHaveAttribute("aria-selected", "true");

  fireEvent.keyDown(pathology, { key: "ArrowRight" });
  advance(20000);
  expect(screen.getByRole("tab", { name: "Anesthesia tech" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(
    screen.getByRole("button", { name: "Show Anesthesia technology" }),
  ).toHaveAttribute("aria-current", "true");
});

test.each([false, true])(
  "loads only the selected specialty image (US: %s)",
  (isUS) => {
    const { container } = render(<DisciplineSelector isUS={isUS} />);
    expect(container.querySelectorAll("img")).toHaveLength(1);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/images/industries/allied-health/discipline-medical-imaging-v14.webp",
    );

    fireEvent.click(
      screen.getByRole("tab", {
        name: "Therapy & other services",
      }),
    );
    expect(container.querySelectorAll("img")).toHaveLength(1);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `/images/industries/allied-health/${isUS ? "us-discipline-other-services-v2" : "discipline-other-services-v14"}.webp`,
    );

    fireEvent.click(screen.getByRole("tab", { name: "Medical imaging" }));
    expect(container.querySelectorAll("img")).toHaveLength(1);
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "/images/industries/allied-health/discipline-medical-imaging-v14.webp",
    );
  },
);

test("keyboard navigation wraps, moves focus and exposes the selected panel", () => {
  render(<DisciplineSelector />);
  const medicalImaging = screen.getByRole("tab", {
    name: "Medical imaging",
  });
  fireEvent.keyDown(medicalImaging, { key: "ArrowLeft" });
  const therapy = screen.getByRole("tab", {
    name: "Therapy & other services",
  });
  expect(therapy).toHaveFocus();
  expect(therapy).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tabpanel")).toHaveAccessibleName(
    "Therapy & other services",
  );

  fireEvent.keyDown(therapy, { key: "Home" });
  expect(medicalImaging).toHaveFocus();
  expect(medicalImaging).toHaveAttribute("tabindex", "0");
  expect(therapy).toHaveAttribute("tabindex", "-1");
  fireEvent.keyDown(medicalImaging, { key: "End" });
  expect(therapy).toHaveFocus();
  fireEvent.keyDown(therapy, { key: "ArrowRight" });
  expect(medicalImaging).toHaveFocus();
  expect(screen.getByRole("tabpanel")).toHaveAccessibleName("Medical imaging");
});
