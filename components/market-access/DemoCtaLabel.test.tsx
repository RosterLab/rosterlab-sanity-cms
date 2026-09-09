import { render, screen } from "@testing-library/react";
import DemoCtaLabel from "./DemoCtaLabel";
import Button from "@/components/ui/Button";
import {
  DEMO_LABEL_BOOK_CLASS,
  DEMO_LABEL_REQUEST_CLASS,
} from "@/lib/market-access/client-gate";

jest.mock("@/components/analytics/tracking", () => ({
  analytics: { track: jest.fn(), getDeviceId: jest.fn() },
  trackButtonClick: jest.fn(),
  trackSmartButtonClick: jest.fn(),
}));

/**
 * Which wording shows is decided in CSS from an attribute on `<html>`, because
 * the country isn't known until after first paint. So what these assert is that
 * both wordings are rendered and correctly tagged; the provider tests cover the
 * attribute, and the CSS itself is exercised in the browser.
 */
function labels(container: HTMLElement) {
  return {
    book: container.querySelector(`.${DEMO_LABEL_BOOK_CLASS}`)?.textContent,
    request: container.querySelector(`.${DEMO_LABEL_REQUEST_CLASS}`)
      ?.textContent,
  };
}

describe("demo CTA relabelling", () => {
  test("offers both wordings for a booking link", () => {
    const { container } = render(
      <DemoCtaLabel href="/book-a-demo">Book a demo</DemoCtaLabel>,
    );

    expect(labels(container)).toEqual({
      book: "Book a demo",
      request: "Request a demo",
    });
  });

  test("keeps each label's own casing", () => {
    const { container } = render(
      <DemoCtaLabel href="/us/book-a-demo">Book a Demo</DemoCtaLabel>,
    );

    expect(labels(container)).toEqual({
      book: "Book a Demo",
      request: "Request a Demo",
    });
  });

  test("leaves CTAs pointing elsewhere alone", () => {
    const { container } = render(
      <DemoCtaLabel href="/contact">Book a call</DemoCtaLabel>,
    );

    expect(labels(container)).toEqual({ book: undefined, request: undefined });
    expect(screen.getByText("Book a call")).toBeInTheDocument();
  });

  test("leaves a label with no booking verb alone", () => {
    const { container } = render(
      <DemoCtaLabel href="/book-a-demo">Talk to us</DemoCtaLabel>,
    );

    expect(labels(container)).toEqual({ book: undefined, request: undefined });
    expect(screen.getByText("Talk to us")).toBeInTheDocument();
  });

  test("gates Button CTAs without touching their other children", () => {
    const { container } = render(
      <Button href="/us/book-a-demo">
        Book a Demo
        <span>→</span>
      </Button>,
    );

    expect(labels(container)).toEqual({
      book: "Book a Demo",
      request: "Request a Demo",
    });
    expect(screen.getByText("→")).toBeInTheDocument();
  });
});
