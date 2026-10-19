"use client";

import { useEffect, useRef } from "react";

/**
 * The enterprise hero's flow animation (variant 14H): a department fanning out
 * into its roster groups, then into teams, drawn line by line on a loop.
 *
 * Ported from the standalone rosterlab-flow-animation-14H.html. It is drawn on
 * a 720 x 470 design grid and scaled to the container's width, and sits
 * transparent over the hero blue. Under reduced motion the finished diagram is
 * shown with nothing moving.
 */

// ----- data -----
const DEPT = ["Department", "212 clinicians"] as const;
const R: [title: string, colour: string, count: number, teams: string[]][] = [
  ["Senior medical", "#FFFFFF", 42, ["Consultants", "Registrars", "Fellows"]],
  ["Junior medical", "#9CE4FF", 36, ["House officers", "RMOs"]],
  [
    "Nursing",
    "#03F9BE",
    88,
    ["Charge nurses", "Triage RNs", "Resus RNs", "Enrolled nurses"],
  ],
  [
    "Allied health",
    "#FFD08A",
    22,
    ["Physiotherapy", "Social work", "ED pharmacist"],
  ],
  ["Admin & support", "#C7D2FF", 24, ["Ward clerks", "HCAs"]],
];
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
const BGS = ["#1F2A5C", "#2A3F8F", "#0E9F6E", "#F67D00", "#24A0C9"];
const MORE = [9, 4, 12, 7, 15, 6, 11, 3, 8, 14, 5, 10, 2, 13];
/** Seconds a line takes to draw. */
const DRAW = 1.1;
/** Dept, rosters and teams columns on the 720 x 470 grid. */
const X0 = 0,
  X1 = 300,
  X2 = 525;
/** Vertical centre. */
const CY = 235;
/** Loop length in seconds, and the fade between loops in ms. */
const CYCLE = 16;
const FADE = 900;

const CSS = `
.rl-flow{position:relative;width:100%;aspect-ratio:720/470;overflow:visible;font-family:inherit;
  --rl-ink:#1F2A5C;--rl-line:#FFFFFF;--rl-dot:#FFFFFF;--rl-name:#FFFFFF}
.rl-flow .rl-stage{position:absolute;left:0;top:0;width:720px;height:470px;transform-origin:0 0;opacity:1;transition:opacity .2s}
.rl-flow.rl-out .rl-stage{opacity:0;transition:opacity .8s ease-in}
.rl-flow svg{position:absolute;left:0;top:0;width:720px;height:470px;overflow:visible}
.rl-flow path{fill:none;stroke:var(--rl-line);stroke-opacity:.75;stroke-width:1.5;stroke-dasharray:600;stroke-dashoffset:0}
.rl-flow .rl-n{position:absolute;transform:translate(0,-50%);white-space:nowrap;box-sizing:border-box}
.rl-flow .rl-dept{width:220px;background:#fff;color:#2A3F8F;border-radius:14px;padding:14px 18px;font-size:15px;font-weight:700;box-shadow:0 14px 34px rgba(0,0,0,.2)}
.rl-flow .rl-dept small{display:block;font-size:10.5px;font-weight:500;opacity:.7;margin-top:3px}
.rl-flow .rl-ros{width:176px;display:flex;align-items:center;gap:8px;border-radius:999px;padding:6px 12px 6px 6px;font-size:12px;font-weight:600;color:var(--rl-ink);box-shadow:0 8px 20px rgba(0,0,0,.12)}
.rl-flow .rl-ros em{font-style:normal;background:rgba(31,42,92,.14);color:var(--rl-ink);font-size:10px;font-weight:600;border-radius:999px;padding:3px 7px}
.rl-flow .rl-team{display:flex;align-items:center;gap:8px;font-size:11.5px;font-weight:600;color:var(--rl-name)}
.rl-flow .rl-av{display:flex}
.rl-flow .rl-av i{width:18px;height:18px;border-radius:50%;border:2px solid #fff;margin-right:-6px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:7px;font-weight:700;font-style:normal}
.rl-flow .rl-more{font-style:normal;font-size:9.5px;font-weight:700;color:rgba(255,255,255,.8);margin-left:8px;margin-right:-2px}
.rl-flow .rl-dotp{position:absolute;left:0;top:0;width:6px;height:6px;border-radius:50%;background:var(--rl-dot);opacity:0;offset-rotate:0deg}
.rl-flow .rl-n,.rl-flow .rl-av i,.rl-flow .rl-more{opacity:1}
.rl-flow.rl-play .rl-n{opacity:0;animation:rl-in .5s ease-out both;animation-delay:var(--d)}
.rl-flow.rl-play .rl-av i,.rl-flow.rl-play .rl-more{opacity:0;animation:rl-pop .35s ease-out both;animation-delay:var(--d)}
.rl-flow.rl-play path{animation:rl-draw var(--draw) ease-in-out both;animation-delay:var(--d)}
.rl-flow.rl-play .rl-dotp{animation:rl-run var(--run) ease-in-out both;animation-delay:var(--d)}
@keyframes rl-draw{from{stroke-dashoffset:600}to{stroke-dashoffset:0}}
@keyframes rl-in{from{opacity:0;transform:translate(0,-50%) translateX(-8px)}to{opacity:1;transform:translate(0,-50%) translateX(0)}}
@keyframes rl-run{0%{offset-distance:0%;opacity:0}6%{opacity:1}86%{offset-distance:100%;opacity:1}100%{offset-distance:100%;opacity:0}}
@keyframes rl-pop{from{opacity:0;transform:scale(.2)}60%{transform:scale(1.15)}to{opacity:1;transform:scale(1)}}
@media (prefers-reduced-motion: reduce){
  .rl-flow.rl-play .rl-n,.rl-flow.rl-play .rl-av i,.rl-flow.rl-play .rl-more,.rl-flow.rl-play path{animation:none;opacity:1}
  .rl-flow.rl-play .rl-dotp{animation:none;opacity:0}
}
`;

/** Builds the stage into `root`. Returns a cleanup that stops the loop. */
function build(root: HTMLDivElement) {
  const stage = document.createElement("div");
  stage.className = "rl-stage";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 720 470");
  stage.appendChild(svg);

  const el = (cls: string, style: string, html?: string) => {
    const d = document.createElement("div");
    d.className = cls;
    d.style.cssText = style;
    if (html != null) d.innerHTML = html;
    stage.appendChild(d);
    return d;
  };
  const line = (d: string, delay: number) => {
    const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
    p.setAttribute("d", d);
    p.style.setProperty("--d", `${delay}s`);
    p.style.setProperty("--draw", `${DRAW}s`);
    svg.appendChild(p);
    el(
      "rl-dotp",
      `offset-path:path('${d}');--d:${delay}s;--run:${DRAW + 0.3}s`,
    );
  };

  const total = R.reduce((s, r) => s + r[3].length, 0);
  const step = 430 / total;
  let ty = 20;
  let k = 0;
  el(
    "rl-n rl-dept",
    `left:${X0}px;top:${CY}px;--d:0s`,
    `${DEPT[0]}<small>${DEPT[1]}</small>`,
  );
  R.forEach(([t, c, n, tm], i) => {
    const ry = 55 + i * 90;
    const d = 0.6 + i * 0.5;
    const y0 = CY + (i - 2) * 11;
    const mx = (X0 + 220 + X1) / 2;
    line(`M${X0 + 220} ${y0} C ${mx} ${y0}, ${mx} ${ry}, ${X1} ${ry}`, d);
    el(
      "rl-n rl-ros",
      `left:${X1}px;top:${ry}px;background:${c};--d:${(d + DRAW).toFixed(2)}s`,
      `<em>${n}</em>${t}`,
    );
    tm.forEach((name, j) => {
      ty += step;
      const y = ty;
      const dd = d + DRAW + 0.3 + j * 0.18;
      const q = k++;
      const y1 = ry + (j - (tm.length - 1) / 2) * 5;
      const mx2 = (X1 + 176 + X2) / 2;
      line(`M${X1 + 176} ${y1} C ${mx2} ${y1}, ${mx2} ${y}, ${X2} ${y}`, dd);
      const ta = dd + DRAW;
      const av = [0, 1, 2]
        .map(
          (m) =>
            `<i style="background:${BGS[(q + m) % 5]};--d:${(ta + 0.1 + m * 0.15).toFixed(2)}s">${INI[(q + [0, 7, 13][m]) % 24]}</i>`,
        )
        .join("");
      el(
        "rl-n rl-team",
        `left:${X2 + 8}px;top:${y}px;--d:${ta.toFixed(2)}s`,
        `<span class="rl-av">${av}</span><em class="rl-more" style="--d:${(ta + 0.55).toFixed(2)}s">+${MORE[q % 14]}</em>${name}`,
      );
    });
  });
  root.appendChild(stage);

  // Scale the 720 x 470 stage to the container width.
  const fit = () => {
    stage.style.transform = `scale(${root.clientWidth / 720})`;
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
      { threshold: 0.35 },
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
        className={`rl-flow ${className ?? ""}`}
        aria-hidden="true"
      />
    </>
  );
}
