"use client";

/**
 * Hero mockup: a screen recording of the RosterLab app, warped onto the laptop
 * screen in the stool photo.
 *
 * This replaces the DOM version (HeroStoolMockup), which built the whole app UI
 * out of a few hundred elements and warped that. It looked identical, but the
 * subtree carried a 2283x1457 3D-transformed layer, a large drop-shadow and two
 * backdrop-filters, and each of those forces its own render surface. Pinch-zoom
 * multiplies a surface's raster size, and past the 16,384px texture cap the
 * layer is dropped — which is why zooming the hero flickered to white. A video
 * is one GPU-composited layer with its own decoder, so zooming re-samples it
 * instead of re-rasterising a DOM tree.
 *
 * The geometry is unchanged from the DOM version: same photo, same measured
 * screen corners, same homography solver — only the thing being warped differs.
 *
 * This component draws ONLY the video. HeroStoolPoster supplies the laptop
 * artwork beneath it, and both fit a 1476x1141 box with `contain`, so the warp
 * lands on the same screen quad without this component fetching the photo again.
 */

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const VIDEO_SRC = "/landing/mockup/hero-screen.mp4";
const VIDEO_POSTER = "/landing/mockup/hero-screen-poster.webp";

// Natural size of the stool photo. Everything below is in these coordinates.
const PHOTO = { w: 1476, h: 1141 };

// Screen corners measured on the photo, in PHOTO coordinates.
const QUAD = {
  tl: [643.5, 186.5],
  tr: [995.0, 173.0],
  bl: [637.5, 530.5],
  br: [987.0, 575.0],
};

// The recording's own pixel dimensions. This is the CSS box the warp is solved
// for, so it must match the source's aspect ratio — NOT the encoded file's
// resolution, which is free to be smaller (the file is 1280x816).
const VIDEO = { w: 1920, h: 1224 };

/**
 * Solve the projective transform mapping a w*h rectangle onto quad `q`,
 * returned as a CSS matrix3d(). Straight Gaussian elimination on the 8
 * unknowns of the homography. Lifted from the DOM mockup so both stay in step.
 */
function solveHomography(
  w: number,
  h: number,
  q: Record<string, number[]>,
): string {
  const src = [
    [0, 0],
    [w, 0],
    [0, h],
    [w, h],
  ];
  const dst = [q.tl, q.tr, q.bl, q.br];
  const A: number[][] = [];
  const b: number[] = [];
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i];
    const [u, v] = dst[i];
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    b.push(u);
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    b.push(v);
  }
  for (let i = 0; i < 8; i++) {
    let p = i;
    for (let r = i + 1; r < 8; r++) {
      if (Math.abs(A[r][i]) > Math.abs(A[p][i])) p = r;
    }
    [A[i], A[p]] = [A[p], A[i]];
    [b[i], b[p]] = [b[p], b[i]];
    const d = A[i][i];
    for (let c = i; c < 8; c++) A[i][c] /= d;
    b[i] /= d;
    for (let r = 0; r < 8; r++) {
      if (r === i) continue;
      const f = A[r][i];
      if (!f) continue;
      for (let c = i; c < 8; c++) A[r][c] -= f * A[i][c];
      b[r] -= f * b[i];
    }
  }
  const [a, bb, c, d, e, f, g, hh] = b;
  return (
    "matrix3d(" +
    [a, d, 0, g, bb, e, 0, hh, 0, 0, 1, 0, c, f, 0, 1].join(",") +
    ")"
  );
}

const SCREEN_TF = solveHomography(VIDEO.w, VIDEO.h, QUAD);

/**
 * Fit-to-container scale, matching the poster's `object-fit: contain` so the
 * video mockup lands pixel-for-pixel where the poster was.
 */
function useContainScale(ref: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      setScale(Math.min(width / PHOTO.w, height / PHOTO.h));
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
}

/**
 * Holds the video's bytes back until the page has loaded.
 *
 * The hero image is the LCP element, and attaching src immediately puts a
 * 144KB fetch in the same contention window. The poster keeps the laptop
 * screen filled in the meantime, so the deferral costs nothing visible except
 * when the animation starts.
 */
function useDeferredSrc(enabled: boolean) {
  const [src, setSrc] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      const idle =
        (window as unknown as { requestIdleCallback?: typeof setTimeout })
          .requestIdleCallback;
      if (typeof idle === "function") idle(() => !cancelled && setSrc(VIDEO_SRC));
      else window.setTimeout(() => !cancelled && setSrc(VIDEO_SRC), 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", start);
    };
  }, [enabled]);
  return src;
}

export default function HeroStoolVideo() {
  const boxRef = useRef<HTMLDivElement>(null);
  const scale = useContainScale(boxRef);
  const reduceMotion = usePrefersReducedMotion();
  // Under reduced motion the poster is the whole story — never fetch the video.
  const src = useDeferredSrc(!reduceMotion);

  return (
    <div ref={boxRef} className="absolute inset-0" aria-hidden="true">
      {/* Centred like object-contain: the stage is a fixed photo-sized canvas
          scaled down to fit, so the warp maths stays in photo coordinates. */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          style={{
            width: PHOTO.w,
            height: PHOTO.h,
            flexShrink: 0,
            position: "relative",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
            // Nothing to show until the fit is known, otherwise the unscaled
            // canvas flashes at full size on first paint.
            visibility: scale ? "visible" : "hidden",
          }}
        >
          {/* Only the video lives here. The laptop artwork is already on screen
              from HeroStoolPoster underneath, and rendering a second copy of it
              made a 1476x1141 LCP candidate that paints after hydration —
              measured LCP jumped to 25.9s because Chrome re-assigned LCP to it.
              The poster also keeps the screen area filled until the first frame
              decodes, so the photo's green chroma plate is never visible. */}
          <video
            src={src}
            poster={VIDEO_POSTER}
            autoPlay
            loop
            muted
            playsInline
            // src is attached after load, so there is nothing to preload before
            // then and nothing to guess about afterwards.
            preload="none"
            tabIndex={-1}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: VIDEO.w,
              height: VIDEO.h,
              transformOrigin: "0 0",
              transform: SCREEN_TF,
              pointerEvents: "none",
              display: "block",
              // Tailwind's preflight sets `img, video { max-width: 100% }`,
              // which clamped this to the 1476px stage instead of the 1920px
              // the warp is solved for — the video then under-covered the
              // screen and the photo's green chroma plate showed through.
              maxWidth: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
