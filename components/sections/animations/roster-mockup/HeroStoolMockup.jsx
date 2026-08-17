"use client";
/* eslint-disable @next/next/no-img-element */

/**
 * Hero mockup: the RosterLab app running on a laptop screen in a photo.
 *
 * The screen is a flat 2283x1457 render (DesktopScene) warped onto the
 * photo's screen quad with a CSS matrix3d, solved from the four corners.
 */

import { Stage } from "./stage";
import { DW, DH, TL, DesktopScene } from "./scene";

// Natural size of the stool photo — the Stage canvas matches it.
const SM = { w: 1476, h: 1141 };
// Screen corners measured on the photo, in SM coordinates.
const QUAD = {
  tl: [643.5, 186.5],
  tr: [995.0, 173.0],
  bl: [637.5, 530.5],
  br: [987.0, 575.0],
};

/**
 * Solve the projective transform mapping a w*h rectangle onto quad `q`,
 * returned as a CSS matrix3d(). Straight Gaussian elimination on the 8
 * unknowns of the homography.
 */
function solveHomography(w, h, q) {
  const src = [
    [0, 0],
    [w, 0],
    [0, h],
    [w, h],
  ];
  const dst = [q.tl, q.tr, q.bl, q.br];
  const A = [];
  const b = [];
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

const SCREEN_TF = solveHomography(DW, DH, QUAD);

function StoolScene() {
  return (
    // The photo is cut out; let the hero's own background show through
    // instead of the mockup painting its own backdrop.
    <div style={{ position: "absolute", inset: 0, background: "transparent" }}>
      <img
        // Same asset the poster already fetched — served from cache.
        src="/landing/mockup/stool-photo-1476.webp"
        srcSet={[
          "/landing/mockup/stool-photo-738.webp 738w",
          "/landing/mockup/stool-photo-1476.webp 1476w",
        ].join(", ")}
        sizes="(min-width: 1024px) 55vw, 140vw"
        alt=""
        width={SM.w}
        height={SM.h}
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: SM.w,
          height: SM.h,
          display: "block",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: DW,
          height: DH,
          transformOrigin: "0 0",
          transform: SCREEN_TF,
          overflow: "hidden",
          background: "#0b3a4a",
        }}
      >
        <DesktopScene />
      </div>
    </div>
  );
}

export default function HeroStoolMockup() {
  return (
    <Stage
      width={SM.w}
      height={SM.h}
      duration={TL.end}
      background="transparent"
    >
      <StoolScene />
    </Stage>
  );
}
