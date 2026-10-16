/**
 * Four small squares, one at each corner of a section.
 *
 * They sit inset from the edges rather than on them, so they read as marks
 * belonging to the section rather than as decoration hanging off the rule that
 * divides it from the next one.
 *
 * Horizontally they track the container rather than the viewport, and sit in
 * its gutter — outside the content column, never over it. Pinned to the
 * viewport instead they drifted away from the content as the window widened
 * (20px from the edge against a column starting 340px in at 1920); sat on the
 * content edge they read as part of the text block rather than a frame around
 * it. Each step stays inside the gutter `Container` opens at that breakpoint,
 * so the squares clear the copy without hugging the screen edge.
 *
 * The parent must be positioned — `SectionFrame` in the page files does that.
 */

/** The three colours in the RosterLab logo mark, in the order they appear. */
export const LOGO_COLORS = ["#03FABF", "#29DEE6", "#2E3BEB"] as const;

/** Picks a logo colour per section so a run of sections cycles through the mark. */
export function logoColor(index: number) {
  return LOGO_COLORS[index % LOGO_COLORS.length];
}

/*
  Gutters most sections pass to `Container` are 16 / 24 / 48 / 80px across the
  breakpoints; these sit well inside each so the squares always land in the
  margin rather than on the copy.
*/
const X = {
  left: "left-1.5 sm:left-2.5 lg:left-4 xl:left-6",
  right: "right-1.5 sm:right-2.5 lg:right-4 xl:right-6",
};

interface SectionCornersProps {
  /** Usually from `logoColor(n)`. */
  color?: string;
  /** Distance in from the top and bottom edges. */
  inset?: string;
}

export default function SectionCorners({
  color = LOGO_COLORS[0],
  inset = "0.875rem",
}: SectionCornersProps) {
  const corners = [
    { x: X.left, y: { top: inset } },
    { x: X.right, y: { top: inset } },
    { x: X.left, y: { bottom: inset } },
    { x: X.right, y: { bottom: inset } },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10"
    >
      <div className="container relative mx-auto h-full">
        {corners.map((corner, index) => (
          <span
            key={index}
            style={{ backgroundColor: color, ...corner.y }}
            // A phone's gutter is only 16px wide, so the square steps down
            // there to keep a visible gap between it and the copy.
            className={`absolute h-1.5 w-1.5 sm:h-2 sm:w-2 ${corner.x}`}
          />
        ))}
      </div>
    </div>
  );
}
