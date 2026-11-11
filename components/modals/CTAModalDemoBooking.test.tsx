import { act, fireEvent, render, screen } from "@testing-library/react";
import CTAModalDemoBooking from "./CTAModalDemoBooking";

const push = jest.fn();
let pathname = "/";
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
  usePathname: () => pathname,
}));
jest.mock("@/components/analytics/tracking", () => ({
  analytics: { track: jest.fn() },
}));

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
});
afterEach(() => jest.useRealTimers());

test.each([
  ["/us", "/us/book-a-demo"],
  ["/us/features", "/us/book-a-demo"],
  ["/", "/book-a-demo"],
])("demo popup uses the regional booking link on %s", (path, destination) => {
  pathname = path;
  render(
    <CTAModalDemoBooking isOpen onClose={jest.fn()} onConversion={jest.fn()} />,
  );
  fireEvent.click(screen.getByRole("button", { name: "BOOK YOUR SPOT NOW" }));
  act(() => jest.advanceTimersByTime(300));
  expect(push).toHaveBeenCalledWith(
    `${destination}?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_a`,
  );
});
