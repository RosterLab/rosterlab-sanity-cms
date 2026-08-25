/* eslint-disable @next/next/no-img-element */

import ReactDOM from "react-dom";

// NOT the bare stool photo — that plate has a green chroma-key screen which
// the animated scene warps its own render over. This is frame 0 of the scene
// flattened into the photo, captured from the real component. Regenerate it
// if the mockup or its opening frame changes.
const SRC = "/landing/mockup/hero-poster-1476.webp";
// Capped at 1476 on purpose. The 2953px master is a 6.7MP decode, and on a
// mid-range phone that cost more than the extra bytes did — it pushed LCP out
// by roughly a second for a decorative image nobody inspects at 1:1.
const SRCSET = [
  "/landing/mockup/hero-poster-738.webp 738w",
  "/landing/mockup/hero-poster-1476.webp 1476w",
].join(", ");
const SIZES = "(min-width: 1024px) 55vw, 140vw";

/**
 * Static first frame of the hero mockup.
 *
 * The photo is the full Stage canvas, so `object-fit: contain` places it
 * pixel-identically to the animated <Stage>. Rendering this on the server
 * means the hero shows the real artwork in the initial HTML — the animated
 * scene then mounts on top of it with nothing moving.
 */
export default function HeroStoolPoster() {
  // Hoists a <link rel="preload"> into <head> so the hero art is discovered
  // with the document rather than after the markup has been parsed.
  ReactDOM.preload(SRC, {
    as: "image",
    fetchPriority: "high",
    imageSrcSet: SRCSET,
    imageSizes: SIZES,
  });

  return (
    <img
      src={SRC}
      srcSet={SRCSET}
      sizes={SIZES}
      alt=""
      aria-hidden="true"
      width={1476}
      height={1141}
      fetchPriority="high"
      className="absolute inset-0 h-full w-full object-contain"
    />
  );
}
