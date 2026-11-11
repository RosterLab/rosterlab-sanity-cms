import { act, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import BenefitsNew from "./BenefitsNew";

jest.mock("@/lib/hooks/usePrefersReducedMotion", () => ({
  usePrefersReducedMotion: () => true,
}));
jest.mock("@/components/analytics/tracking", () => ({
  trackButtonClick: jest.fn(),
}));
jest.mock("@/components/ui/Button", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

let panelHeight = 756;
let scrollY = 0;
let observers: (() => void)[] = [];

function frame() {
  act(() => jest.advanceTimersByTime(32));
}

beforeEach(() => {
  jest.useFakeTimers();
  panelHeight = 756;
  scrollY = 0;
  observers = [];
  jest.replaceProperty(window, "innerHeight", 1000);
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    get: () => scrollY,
  });
  window.matchMedia = jest.fn().mockImplementation((query: string) => ({
    matches: query.includes("min-width: 1024px"),
  }));
  window.scrollTo = jest.fn().mockImplementation(({ top }: ScrollToOptions) => {
    scrollY = top ?? 0;
    window.dispatchEvent(new Event("scroll"));
  });
  window.ResizeObserver = class {
    constructor(callback: () => void) {
      observers.push(callback);
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver;
  jest
    .spyOn(HTMLElement.prototype, "offsetHeight", "get")
    .mockImplementation(function (this: HTMLElement) {
      return this.classList.contains("sticky")
        ? panelHeight
        : panelHeight + 3600;
    });
  jest
    .spyOn(HTMLElement.prototype, "getBoundingClientRect")
    .mockImplementation(() => ({
      top: 1000 - scrollY,
      bottom: 1000 - scrollY + panelHeight + 3600,
      height: panelHeight + 3600,
      width: 1280,
      left: 0,
      right: 1280,
      x: 0,
      y: 1000 - scrollY,
      toJSON: () => ({}),
    }));
});

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
});

test("repeated panel measurements keep one scroll subscription and do not loop", () => {
  const listen = jest.spyOn(window, "addEventListener");
  const error = jest.spyOn(console, "error");
  render(<BenefitsNew />);
  frame();
  for (let i = 0; i < 80; i++) {
    panelHeight = 756 + (i % 2);
    act(() => observers.forEach((notify) => notify()));
    frame();
  }
  expect(
    listen.mock.calls.filter(([event]) => event === "scroll"),
  ).toHaveLength(1);
  expect(error.mock.calls.flat().join(" ")).not.toContain(
    "Maximum update depth",
  );
  expect(screen.getByRole("tab", { name: "Save Time" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});

test("scrolling, resizing, and clicking keep tab selection and progress aligned", () => {
  render(<BenefitsNew />);
  frame();
  act(() => {
    scrollY = 3000;
    window.dispatchEvent(new Event("scroll"));
  });
  frame();
  expect(screen.getByRole("tab", { name: "Stay Compliant" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  act(() => {
    panelHeight = 700;
    observers.forEach((notify) => notify());
  });
  frame();
  expect(screen.getByRole("tab", { name: "Stay Compliant" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  act(() => {
    scrollY = 1000;
    window.dispatchEvent(new Event("scroll"));
  });
  frame();
  expect(screen.getByRole("tab", { name: "Save Time" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  fireEvent.click(screen.getByRole("tab", { name: "Optimise Workforce" }));
  frame();
  expect(
    screen.getByRole("tab", { name: "Optimise Workforce" }),
  ).toHaveAttribute("aria-selected", "true");
  const bars = screen.getByRole("tablist", {
    name: "Benefits",
  }).nextElementSibling!;
  const bar = bars.lastElementChild!.firstElementChild as HTMLElement;
  expect(Number(bar.style.transform.match(/scaleX\((.+)\)/)?.[1])).toBeCloseTo(
    0.1,
  );
});
