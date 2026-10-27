"use client";

import { useEffect, useRef } from "react";
import { US_ENTERPRISE_TEAMS } from "./enterprise-copy";

/**
 * The hero's flow animation on phones (variant 21A): the four-roster mobile
 * cut of the desktop 18H diagram. Roster labels across the top, each team
 * dropping in beneath its roster (avatars roll in, then the +X), then every
 * roster flowing down into the RosterLab card.
 *
 * Ported from the standalone rosterlab-flow-animation-21A-mobile.html. Drawn
 * on a 390 x 480 design grid and scaled to the container's width (max
 * 420px), on white. Under reduced motion the finished diagram is shown with
 * nothing moving. The card uses the site's logo file, turned white with a
 * filter, rather than the export's inlined PNG.
 */

// ----- data: [roster, colour, [[team, extra people beyond the 3 shown], ...]] -----
// Roster counts are summed from the teams (3 + extra).
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
];
/** Word on the RosterLab card. */
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
  '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8"/><path d="M18.5 14.8c1.6.8 2.7 2.5 3 5.2"/></svg>';
const LOGO = "/images/rosterlab-logo.png";
/** Design grid, side margin, rosters' row, teams' first row and spacing, label width, card centre. */
const W = 390,
  H = 480,
  M = 10,
  RY = 40,
  TY0 = 112,
  ROW = 60,
  LW = 88,
  HX = 195;
const NS = "http://www.w3.org/2000/svg";
/** Loop length in seconds, and the fade between loops in ms. */
const CYCLE = 13;
const FADE = 900;

const CSS = `
.rl-21a{position:relative;width:100%;max-width:420px;margin:0 auto;aspect-ratio:390/480;font-family:inherit}
.rl-21a .rl-stage{position:absolute;left:0;top:0;width:390px;height:480px;transform-origin:0 0;opacity:1;transition:opacity .2s}
.rl-21a.rl-out .rl-stage{opacity:0;transition:opacity .8s ease-in}
.rl-21a svg.rl-lines{position:absolute;left:0;top:0;width:390px;height:480px;overflow:visible}
.rl-21a .rl-lines path{fill:none;stroke-opacity:.65;stroke-width:2;stroke-linecap:round;stroke-dasharray:1000;stroke-dashoffset:0}
.rl-21a .rl-n{position:absolute;transform:translate(var(--tx,0),-50%);box-sizing:border-box}
.rl-21a .rl-lab{width:88px;height:52px;display:flex;flex-direction:column;justify-content:center;gap:3px;padding:0 8px 0 10px;border-radius:6px;background:#fff;border:1px solid;border-left-width:3px;font-size:12.5px;font-weight:600;line-height:1.15;color:#1F2A5C}
.rl-21a .rl-lab em{font-style:normal;display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:700}
.rl-21a .rl-nm{display:flex;flex-direction:column;gap:4px;font-size:11.5px;font-weight:600;line-height:1.15;color:#1F2A5C}
.rl-21a .rl-row{display:flex;align-items:center}
.rl-21a .rl-av{display:flex}
.rl-21a .rl-av i{width:17px;height:17px;border-radius:50%;border:2px solid #fff;margin-right:-6px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:6.5px;font-weight:700;font-style:normal}
.rl-21a .rl-more{font-style:normal;font-size:11px;font-weight:700;margin-left:9px}
.rl-21a .rl-specialties{width:94px;padding:7px 10px;border:1px dashed rgba(31,42,92,.25);border-radius:12px;background:#fff;font-size:11.5px;font-weight:600;line-height:1.25;text-align:center;color:#1F2A5C}
.rl-21a .rl-hub{width:230px;background:#1F2A5C;border-radius:16px;padding:16px 20px;box-shadow:0 16px 40px rgba(31,42,92,.3);display:flex;flex-direction:column;align-items:center;gap:6px}
.rl-21a .rl-hub img{height:26px;width:auto;display:block;filter:brightness(0) invert(1)}
.rl-21a .rl-hub small{font-size:12px;font-weight:500;color:rgba(255,255,255,.8)}
.rl-21a .rl-dotp{position:absolute;left:0;top:0;width:7px;height:7px;border-radius:50%;opacity:0;offset-rotate:0deg}
.rl-21a.rl-play .rl-n{opacity:0;animation:rl-in .55s ease-out both;animation-delay:var(--d)}
.rl-21a.rl-play .rl-av i{opacity:0;animation:rl-roll .45s cubic-bezier(.2,.8,.3,1.2) both;animation-delay:var(--d)}
.rl-21a.rl-play .rl-more{opacity:0;animation:rl-pop .35s ease-out both;animation-delay:var(--d)}
.rl-21a.rl-play .rl-lines path{animation:rl-draw var(--draw) ease-in-out both;animation-delay:var(--d)}
.rl-21a.rl-play .rl-dotp{animation:rl-run var(--run) ease-in-out both;animation-delay:var(--d)}
@keyframes rl-draw{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
@keyframes rl-in{from{opacity:0;transform:translate(var(--tx,0),-50%) translateY(-6px)}to{opacity:1;transform:translate(var(--tx,0),-50%) translateY(0)}}
@keyframes rl-roll{from{opacity:0;transform:translateX(-12px) rotate(-120deg)}to{opacity:1;transform:translateX(0) rotate(0)}}
@keyframes rl-pop{from{opacity:0;transform:scale(.2)}60%{transform:scale(1.12)}to{opacity:1;transform:scale(1)}}
@keyframes rl-run{0%{offset-distance:0%;opacity:0}6%{opacity:1}88%{offset-distance:100%;opacity:1}100%{offset-distance:100%;opacity:0}}
@media (prefers-reduced-motion: reduce){
  .rl-21a.rl-play .rl-n,.rl-21a.rl-play .rl-av i,.rl-21a.rl-play .rl-more,.rl-21a.rl-play .rl-lines path{animation:none;opacity:1}
  .rl-21a.rl-play .rl-dotp{animation:none;opacity:0}
}
`;

/** Builds the stage into `root`. Returns a cleanup that stops the loop. */
function build(root: HTMLDivElement, isUS: boolean) {
  const label = (text: string) =>
    isUS ? (US_ENTERPRISE_TEAMS[text] ?? text) : text;
  const stage = document.createElement("div");
  stage.className = "rl-stage";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "rl-lines");
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  stage.appendChild(svg);

  const el = (cls: string, style: string, html: string) => {
    const d = document.createElement("div");
    d.className = cls;
    d.style.cssText = style;
    d.innerHTML = html;
    stage.appendChild(d);
    return d;
  };
  const line = (d: string, ink: string, delay: number, dur: number) => {
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d);
    p.style.cssText = `stroke:${ink};--d:${delay.toFixed(2)}s;--draw:${dur}s`;
    svg.appendChild(p);
    el(
      "rl-dotp",
      `background:${ink};offset-path:path('${d}');--d:${delay.toFixed(2)}s;--run:${dur + 0.3}s`,
      "",
    );
  };

  const CW = (W - 2 * M) / R.length;
  let q = 0;
  let namesDone = 0;
  const ends: [x: number, y: number, ink: string][] = [];
  R.forEach(([t, ink, tm], i) => {
    const cx = M + CW * (i + 0.5);
    const sx = Math.round(cx - LW / 2 + 5);
    let n = 0;
    const lab = el(
      "rl-n rl-lab",
      `left:${cx}px;top:${RY}px;--tx:-50%;border-color:${ink}55;border-left-color:${ink};--d:${(0.2 * i).toFixed(2)}s`,
      "",
    );
    tm.forEach(([name, more], j) => {
      const ty = TY0 + j * ROW;
      const dd = 1.2 + j * 0.4;
      const ta = dd + 0.7;
      n += 3 + more;
      namesDone = Math.max(namesDone, ta + 0.9);
      line(`M${sx} ${RY + 26} V${ty} H${sx + 8}`, ink, dd, 1.0);
      const av = [0, 1, 2]
        .map(
          (m) =>
            `<i style="background:${BGS[(q + m) % 5]};--d:${(ta + 0.15 + m * 0.12).toFixed(2)}s">${INI[(q + [0, 7, 13][m]) % 24]}</i>`,
        )
        .join("");
      el(
        "rl-n rl-nm",
        `left:${sx + 11}px;top:${ty + 10}px;width:${Math.round(CW - 14)}px;--d:${ta.toFixed(2)}s`,
        `<span>${label(name)}</span><span class="rl-row"><span class="rl-av">${av}</span><em class="rl-more" style="color:${ink};--d:${(ta + 0.6).toFixed(2)}s">+${more}</em></span>`,
      );
      q++;
    });
    lab.innerHTML = `${label(t)}<em style="color:${ink}">${PEOPLE}${n}</em>`;
    ends.push([sx, TY0 + (tm.length - 1) * ROW + 34, ink]);
  });
  const top = Math.max(...ends.map((e) => e[1])) + 54;
  // Keep the note beside the combined flow, clear of the individual teams.
  el(
    "rl-n rl-specialties",
    `right:${M}px;top:${top - 35}px;--d:${(namesDone + 0.2).toFixed(2)}s`,
    "+ more specialties",
  );
  const la = namesDone + 0.3;
  ends.forEach(([sx, yb, ink], i) => {
    const ex = HX + (i - (R.length - 1) / 2) * 10;
    const m = (yb + top) / 2;
    line(`M${sx} ${yb} C ${sx} ${m}, ${ex} ${m}, ${ex} ${top}`, ink, la, 1.2);
  });
  el(
    "rl-n rl-hub",
    `left:${HX}px;top:${top + 44}px;--tx:-50%;--d:${(la + 1.1).toFixed(2)}s`,
    `<img src="${LOGO}" alt="RosterLab"><small>All your staff on one platform</small>`,
  );
  root.appendChild(stage);

  // Scale the 390 x 480 stage to the container width.
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

export default function EnterpriseFlowMobile({
  className,
  fitToScreen = false,
  isUS = false,
}: {
  className?: string;
  isUS?: boolean;
  /**
   * Narrows the diagram, if it has to, so all of it sits on the first
   * screen: its width is capped at whatever its 390:480 shape allows in the
   * height left below it on load. Short phones get a slightly smaller
   * diagram rather than one cut off by the fold.
   */
  fitToScreen?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!fitToScreen || !root) return;
    const size = () => {
      const top = root.getBoundingClientRect().top + window.scrollY;
      const room = window.innerHeight - top - 12;
      root.style.maxWidth = `${Math.max(260, Math.min(420, (room * W) / H))}px`;
    };
    size();
    window.addEventListener("orientationchange", size);
    return () => window.removeEventListener("orientationchange", size);
  }, [fitToScreen]);

  // Built the first time it scrolls into view, so the reader sees it draw
  // from the start. The box keeps its aspect ratio until then.
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        cleanup = build(root, isUS);
      },
      { threshold: 0.2 },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      cleanup?.();
    };
  }, [isUS]);

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={ref}
        className={`rl-21a ${className ?? ""}`}
        aria-hidden="true"
      />
    </>
  );
}
