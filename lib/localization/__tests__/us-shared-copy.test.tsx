/** @jest-environment node */
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AgenticAICarousel from "@/app/feature/ai-staff-rostering-assistant/AgenticAICarousel";
import TestimonialsNew from "@/components/sections/TestimonialsNew";
import FairnessAcrossYearModule from "@/components/sections/animations/FairnessAcrossYearModule";
import { TESTIMONIALS_US } from "@/app/us/landing-content";

test("US testimonials show localized healthcare titles without extra explainers", () => {
  for (const testimonial of TESTIMONIALS_US) {
    const html = renderToStaticMarkup(
      <TestimonialsNew isUS testimonials={[testimonial]} />,
    );
    expect(testimonial.roleExplanation).toBeUndefined();
    expect(html).toContain(testimonial.role.replaceAll("'", "&#x27;"));
  }
});

test("shared US sections use scheduling copy while global defaults retain original wording", () => {
  const globalCarousel = renderToStaticMarkup(<AgenticAICarousel />);
  const usCarousel = renderToStaticMarkup(<AgenticAICarousel isUS />);
  expect(globalCarousel).toContain("draft roster");
  expect(usCarousel).toContain("draft schedule");
  expect(usCarousel).toContain("schedule optimization");
  expect(usCarousel).not.toMatch(/\broster(?:ing)?\b/);
  expect(renderToStaticMarkup(<TestimonialsNew />)).toContain("rostering");
  const usTestimonials = renderToStaticMarkup(<TestimonialsNew isUS />);
  expect(usTestimonials).toContain("scheduling");
  // Customer quotes stay identical; only the surrounding introduction changes.
  expect(usTestimonials).toBe(
    renderToStaticMarkup(<TestimonialsNew />).replace(
      "other rostering leads",
      "other scheduling leads",
    ),
  );
  expect(renderToStaticMarkup(<FairnessAcrossYearModule />)).toContain(
    "Re-rostering",
  );
  expect(renderToStaticMarkup(<FairnessAcrossYearModule isUS />)).toContain(
    "Rescheduling",
  );
});
