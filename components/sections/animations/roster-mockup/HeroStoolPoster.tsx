/* eslint-disable @next/next/no-img-element */

import ReactDOM from "react-dom";

// NOT the bare stool photo — that plate has a green chroma-key screen which
// the animated scene warps its own render over. These are frames of the scene
// flattened into the photo, captured from the real component with
// scripts/capture-hero-poster.js. Regenerate them if the mockup changes.
//
// Two frames, because the two breakpoints want different stills:
//
//  - Desktop gets frame 0. The animated scene mounts on top of this poster and
//    starts from frame 0, so the handover has nothing moving in it.
//  - Mobile gets the mid-generate frame. Below lg the scene never mounts (its
//    3D-transformed window, drop-shadow and backdrop-filters each force a
//    render surface, and at phone DPR those pass the 16,384px texture cap
//    around 3x pinch-zoom, which drops the layer and whites out the hero), so
//    this still is all a phone ever sees — and a solver mid-run with the
//    progress modal up tells the story better than an idle roster does.
//
// Capped at 1476 on purpose. The 2953px master is a 6.7MP decode, and on a
// mid-range phone that cost more than the extra bytes did — it pushed LCP out
// by roughly a second for a decorative image nobody inspects at 1:1.
const DESKTOP = {
  src: "/landing/mockup/hero-poster-1476.webp",
  srcSet: [
    "/landing/mockup/hero-poster-738.webp 738w",
    "/landing/mockup/hero-poster-1476.webp 1476w",
  ].join(", "),
  media: "(min-width: 1024px)",
};

const MOBILE = {
  src: "/landing/mockup/hero-poster-generate-1476.webp",
  srcSet: [
    "/landing/mockup/hero-poster-generate-738.webp 738w",
    "/landing/mockup/hero-poster-generate-1476.webp 1476w",
  ].join(", "),
  media: "(max-width: 1023.98px)",
};

const SIZES = "(min-width: 1024px) 55vw, 140vw";

/**
 * Static frame of the hero mockup, behind the animated scene on desktop and
 * standing in for it on mobile.
 *
 * The photo is the full Stage canvas, so `object-fit: contain` places it
 * pixel-identically to the animated <Stage>. Rendering this on the server
 * means the hero shows the real artwork in the initial HTML.
 *
 * The breakpoint switch lives in a <picture>, not in a prop, so that a device
 * only ever fetches one of the two frames — the hero lays this component out
 * twice and hides one by breakpoint, and a hidden <img> is still fetched.
 * Both copies resolving to the same URL keeps that a single request.
 */
export default function HeroStoolPoster() {
  // Hoists <link rel="preload"> into <head> so the hero art is discovered with
  // the document rather than after the markup has been parsed. Scoped by the
  // same media queries, so a phone preloads only the frame it will render.
  for (const poster of [DESKTOP, MOBILE]) {
    ReactDOM.preload(poster.src, {
      as: "image",
      fetchPriority: "high",
      imageSrcSet: poster.srcSet,
      imageSizes: SIZES,
      media: poster.media,
    });
  }

  return (
    <picture className="contents">
      <source media={MOBILE.media} srcSet={MOBILE.srcSet} sizes={SIZES} />
      <img
        src={DESKTOP.src}
        srcSet={DESKTOP.srcSet}
        sizes={SIZES}
        alt=""
        aria-hidden="true"
        width={1476}
        height={1141}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-contain"
      />
    </picture>
  );
}
