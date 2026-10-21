"use client";

import { useEffect, useRef } from "react";

/**
 * The enterprise hero's flow animation (variant 18H): roster labels across
 * the top, each team dropping in beneath its roster with avatars and a +X
 * count, then every roster flowing down into the RosterLab card.
 *
 * Ported from the standalone rosterlab-flow-animation-18H.html. It is drawn
 * on a 900 x 440 design grid, scaled to the container's width, and designed
 * for a white background. Under reduced motion the finished diagram is shown
 * with nothing moving.
 *
 * The card uses the site's own logo file, turned white with a filter, rather
 * than the export's inlined PNG.
 */

// ----- data: [roster, colour, [[team, extra people beyond the 3 shown], ...]] -----
// Roster counts and the card total are summed from the teams (3 + extra).
type Team = [name: string, more: number];
const R: [roster: string, colour: string, teams: Team[]][] = [
  [
    "Senior medical",
    "#3B7FE8",
    [
      ["Consultants", 9],
      ["Registrars", 15],
      ["Fellows", 4],
    ],
  ],
  [
    "Junior medical",
    "#146F8F",
    [
      ["House officers", 11],
      ["RMOs", 9],
    ],
  ],
  [
    "Nursing",
    "#0A7A55",
    [
      ["Charge nurses", 5],
      ["Triage RNs", 21],
      ["Resus RNs", 17],
      ["Enrolled nurses", 12],
    ],
  ],
  [
    "Allied health",
    "#B35A00",
    [
      ["Physiotherapy", 4],
      ["Social work", 3],
      ["ED pharmacist", 2],
    ],
  ],
  [
    "Admin & support",
    "#2A3F8F",
    [
      ["Ward clerks", 6],
      ["HCAs", 13],
    ],
  ],
];
/** Word on the RosterLab card. */
const UNIT = "staff";
const INI = [
  "AK",
  "TM",
  "LW",
  "SR",
  "NB",
  "MH",
  "KO",
  "DC",
  "EH",
  "RA",
  "GV",
  "CW",
  "BL",
  "YS",
  "FT",
  "IM",
  "OS",
  "QR",
  "ZN",
  "PK",
  "UL",
  "WM",
  "VE",
  "XJ",
];
const BGS = ["#3B7FE8", "#2A3F8F", "#24A0C9", "#F67D00", "#0E9F6E"];
const PEOPLE =
  '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M18.5 14.8c1.6.8 2.7 2.5 3 5.2"/></svg>';
const LOGO = "/images/rosterlab-logo.png";
/** Seconds a line takes to draw. */
const DRAW = 1.2;
/** Design grid, and the rosters' row, teams' first row and spacing, card. */
const W = 900,
  H = 440,
  RY = 30,
  TY0 = 86,
  ROW = 46,
  HX = 450,
  HY = 384,
  HTOP = HY - 44,
  GAP = 180;
/** Loop length in seconds, and the fade between loops in ms. */
const CYCLE = 18;
const FADE = 900;

const CSS = `
.rl-18h{position:relative;width:100%;max-width:900px;margin:0 auto;aspect-ratio:900/440;overflow:visible;font-family:inherit}
.rl-18h .rl-stage{position:absolute;left:0;top:0;width:900px;height:440px;transform-origin:0 0;opacity:1;transition:opacity .2s}
.rl-18h.rl-out .rl-stage{opacity:0;transition:opacity .8s ease-in}
.rl-18h svg.rl-lines{position:absolute;left:0;top:0;width:900px;height:440px;overflow:visible}
.rl-18h .rl-lines path{fill:none;stroke-opacity:.6;stroke-width:1.5;stroke-dasharray:600;stroke-dashoffset:0}
.rl-18h .rl-n{position:absolute;transform:translate(var(--tx,0),-50%);white-space:nowrap;box-sizing:border-box}
.rl-18h .rl-ros{width:160px;display:flex;align-items:center;gap:8px;border-radius:6px;padding:8px 10px;font-size:12px;font-weight:600;color:#1F2A5C;background:#fff;border:1px solid;border-left-width:3px}
.rl-18h .rl-ros em{font-style:normal;margin-left:auto;display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:700}
.rl-18h .rl-team{display:flex;flex-direction:column;gap:4px;font-size:11.5px;font-weight:600;color:#1F2A5C;line-height:1.1}
.rl-18h .rl-row{display:flex;align-items:center}
.rl-18h .rl-av{display:flex}
.rl-18h .rl-av i{width:16px;height:16px;border-radius:50%;border:2px solid #fff;margin-right:-5px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:6.5px;font-weight:700;font-style:normal}
.rl-18h .rl-more{font-style:normal;font-size:9.5px;font-weight:700;margin-left:10px}
.rl-18h .rl-hub{width:220px;background:#1F2A5C;border-radius:16px;padding:16px 20px;box-shadow:0 16px 40px rgba(31,42,92,.3);display:flex;flex-direction:column;align-items:center;gap:6px}
.rl-18h .rl-hub img{height:26px;width:auto;display:block;filter:brightness(0) invert(1)}
.rl-18h .rl-hub small{font-size:10.5px;font-weight:500;color:rgba(255,255,255,.8)}
.rl-18h .rl-dotp{position:absolute;left:0;top:0;width:6px;height:6px;border-radius:50%;opacity:0;offset-rotate:0deg}
.rl-18h .rl-n,.rl-18h .rl-av i,.rl-18h .rl-more{opacity:1}
.rl-18h.rl-play .rl-n{opacity:0;animation:rl-in .6s ease-out both;animation-delay:var(--d)}
.rl-18h.rl-play .rl-av i,.rl-18h.rl-play .rl-more{opacity:0;animation:rl-pop .35s ease-out both;animation-delay:var(--d)}
.rl-18h.rl-play .rl-lines path{animation:rl-draw var(--draw) ease-in-out both;animation-delay:var(--d)}
.rl-18h.rl-play .rl-dotp{animation:rl-run var(--run) ease-in-out both;animation-delay:var(--d)}
@keyframes rl-draw{from{stroke-dashoffset:600}to{stroke-dashoffset:0}}
@keyframes rl-in{from{opacity:0;transform:translate(var(--tx,0),-50%) translateY(-6px)}to{opacity:1;transform:translate(var(--tx,0),-50%) translateY(0)}}
@keyframes rl-run{0%{offset-distance:0%;opacity:0}6%{opacity:1}86%{offset-distance:100%;opacity:1}100%{offset-distance:100%;opacity:0}}
@keyframes rl-pop{from{opacity:0;transform:scale(.2)}60%{transform:scale(1.15)}to{opacity:1;transform:scale(1)}}
@media (prefers-reduced-motion: reduce){
  .rl-18h.rl-play .rl-n,.rl-18h.rl-play .rl-av i,.rl-18h.rl-play .rl-more,.rl-18h.rl-play .rl-lines path{animation:none;opacity:1}
  .rl-18h.rl-play .rl-dotp{animation:none;opacity:0}
}
`;

/** Builds the stage into `root`. Returns a cleanup that stops the loop. */
function build(root: HTMLDivElement) {
  const stage = document.createElement("div");
  stage.className = "rl-stage";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  svg.setAttribute("class", "rl-lines");
  stage.appendChild(svg);

  const el = (cls: string, style: string, html: string) => {
    const d = document.createElement("div");
    d.className = cls;
    d.style.cssText = style;
    d.innerHTML = html;
    stage.appendChild(d);
    return d;
  };
  const line = (d: string, ink: string, delay: number) => {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", d);
    p.style.cssText = `stroke:${ink};--d:${delay.toFixed(2)}s;--draw:${DRAW}s`;
    svg.appendChild(p);
    el(
      "rl-dotp",
      `background:${ink};offset-path:path('${d}');--d:${delay.toFixed(2)}s;--run:${DRAW + 0.3}s`,
      "",
    );
  };

  let q = 0;
  let total = 0;
  let namesDone = 0;
  const ends: [x: number, y: number, ink: string][] = [];
  R.forEach(([t, ink, tm], i) => {
    const cx = HX + (i - (R.length - 1) / 2) * GAP;
    const sx = cx - 62;
    let n = 0;
    const chip = el(
      "rl-n rl-ros",
      `left:${cx}px;top:${RY}px;--tx:-50%;border-color:${ink}55;border-left-color:${ink};--d:${(0.25 * i).toFixed(2)}s`,
      "",
    );
    tm.forEach(([name, more], j) => {
      const ty = TY0 + j * ROW;
      const dd = 1.4 + j * 0.45;
      const ta = dd + 0.8;
      n += 3 + more;
      namesDone = Math.max(namesDone, ta + 0.6);
      line(`M${sx} ${RY + 16} V${ty} H${sx + 10}`, ink, dd);
      const av = [0, 1, 2]
        .map(
          (m) =>
            `<i style="background:${BGS[(q + m) % 5]};--d:${(ta + 0.15 * (m + 1)).toFixed(2)}s">${INI[(q + [0, 7, 13][m]) % 24]}</i>`,
        )
        .join("");
      el(
        "rl-n rl-team",
        `left:${sx + 16}px;top:${ty + 4}px;--d:${ta.toFixed(2)}s`,
        `<span>${name}</span><span class="rl-row"><span class="rl-av">${av}</span><em class="rl-more" style="color:${ink};--d:${(ta + 0.6).toFixed(2)}s">+${more}</em></span>`,
      );
      q++;
    });
    chip.innerHTML = `${t}<em style="color:${ink}">${PEOPLE}${n}</em>`;
    total += n;
    ends.push([sx, TY0 + (tm.length - 1) * ROW + 24, ink]);
  });
  const dl3 = namesDone + 0.4;
  ends.forEach(([sx, yb, ink]) => {
    const m = (yb + HTOP) / 2;
    line(`M${sx} ${yb} C ${sx} ${m}, ${HX} ${m}, ${HX} ${HTOP}`, ink, dl3);
  });
  el(
    "rl-n rl-hub",
    `left:${HX}px;top:${HY}px;--tx:-50%;--d:${(dl3 + DRAW).toFixed(2)}s`,
    `<img src="${LOGO}" alt="RosterLab"><small>${total} ${UNIT}, one platform</small>`,
  );
  root.appendChild(stage);

  // Scale the 900 x 440 stage to the container width.
  const fit = () => {
    stage.style.transform = `scale(${root.clientWidth / W})`;
  };
  fit();
  const observer = new ResizeObserver(fit);
  observer.observe(root);

  // Loop: play, fade out just before the end, restart.
  let fadeTimer = 0;
  const play = () => {
    root.classList.remove("rl-play");
    void root.offsetWidth;
    root.classList.add("rl-play");
    root.classList.remove("rl-out");
  };
  play();
  const loop = window.setInterval(() => {
    root.classList.add("rl-out");
    fadeTimer = window.setTimeout(play, FADE);
  }, CYCLE * 1000);

  return () => {
    observer.disconnect();
    window.clearInterval(loop);
    window.clearTimeout(fadeTimer);
    stage.remove();
    root.classList.remove("rl-play", "rl-out");
  };
}

export default function EnterpriseFlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Built the first time it scrolls into view, so the reader sees the
  // diagram draw from the start rather than arriving mid-loop. The box keeps
  // its aspect ratio until then, so nothing shifts when it fills in.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        cleanup = build(root);
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className={`rl-18h ${className ?? ""}`}
        aria-hidden="true"
      />
    </>
  );
}
