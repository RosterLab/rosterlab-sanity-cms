import { fireEvent, render, screen } from "@testing-library/react";
import CTAModalCaseStudy from "./CTAModalCaseStudy";

const push = jest.fn();
jest.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));
jest.mock("@/components/analytics/tracking", () => ({
  analytics: { track: jest.fn() },
}));

beforeEach(() => jest.clearAllMocks());

test.each([
  [
    false,
    "/case-studies/how-plastics-department-used-roster-simulation-to-cut-in-costs",
  ],
  [
    true,
    "/us/case-studies/how-plastics-department-used-schedule-simulation-to-cut-in-costs",
  ],
])(
  "opens the public case study without collecting details (US=%s)",
  (isUS, path) => {
    const onConversion = jest.fn();
    render(
      <CTAModalCaseStudy
        isOpen
        isUS={isUS as boolean}
        onClose={jest.fn()}
        onConversion={onConversion}
      />,
    );
    expect(screen.queryByRole("textbox")).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: "Read Full Case Study" }),
    );
    expect(onConversion).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith(
      `${path}?utm_source=modal&utm_medium=popup&utm_campaign=site_offering&utm_content=var_b`,
    );
  },
);
