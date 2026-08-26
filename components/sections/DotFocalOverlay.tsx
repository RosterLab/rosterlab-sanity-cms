/**
 * The dot texture behind the homepage, concentrated around three focal
 * points down the page rather than blanketing every section.
 *
 * The fade is painted ON TOP of the dots in the page colour, not cut out of
 * them with `mask-image`. A masked element has to rasterise as one texture,
 * which is capped at 16,384px per side: a band that fits at 1x blows the cap
 * as soon as the page is pinch-zoomed (3,240px x 3 DPR x 2x zoom = 19,440),
 * and over the cap the layer is dropped and everything behind it paints
 * white. A plain background paints into ordinary tiles with no such cap, so
 * it survives any zoom level.
 *
 * The trade-off is that the fade has to match what is behind it — both home
 * pages put this on a `bg-white` wrapper. It is also why the three focal
 * points stay three separate bands: stacking opaque fades in one element
 * could never leave three holes open, since each fade would paint over the
 * others' dots.
 */
const PAGE_BG = "#fff";

const FOCAL_POINTS = [
  { top: "22%", height: 3240, spread: "40%" },
  { top: "55%", height: 2700, spread: "45%" },
  { top: "85%", height: 2700, spread: "40%" },
];

export default function DotFocalOverlay() {
  return (
    <>
      {FOCAL_POINTS.map(({ top, height, spread }) => (
        <div
          key={top}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 z-0"
          style={{
            top: `calc(${top} - ${height / 2}px)`,
            height,
            backgroundImage: [
              // Topmost layer: clear over the focal point, page-coloured by
              // 70% out — the same falloff the mask used to describe.
              // rgba(255,255,255,0) rather than `transparent`, which some
              // engines interpolate through grey.
              `radial-gradient(ellipse ${spread} 50% at 50% 50%, rgba(255,255,255,0) 0%, ${PAGE_BG} 70%)`,
              "radial-gradient(circle, #d4d8de 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "100% 100%, 22px 22px",
          }}
        />
      ))}
    </>
  );
}
