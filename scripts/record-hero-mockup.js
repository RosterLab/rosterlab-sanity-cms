/**
 * One-off recorder: turns public/landing/stool-mockup.html into a frame
 * sequence that ffmpeg encodes into the hero background loop.
 *
 * The mockup is an exported artifact bundle that ships React + ReactDOM +
 * @babel/standalone and compiles its JSX in the browser. That cost ~2 MB and
 * ~5 s of main-thread work on the homepage hero, so the animation is baked
 * into a video instead. This script exists so the video can be regenerated
 * if the mockup is ever revised.
 *
 * Usage:
 *   node scripts/record-hero-mockup.js
 *   # then encode (see scripts/encode-hero-mockup.sh)
 */

const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");
const puppeteer = require("puppeteer");

const PUBLIC_DIR = path.join(__dirname, "..", "public");
const PAGE_PATH = "/landing/stool-mockup.html";

// Scene is <Stage width={SM.w} height={SM.h} duration={TL.end}> in the bundle.
const SCENE_W = 1476;
const SCENE_H = 1141;
const DURATION = Number(process.env.DURATION || 20.8);
const FPS = Number(process.env.FPS || 30);

// Stage reserves this much vertical space for its playback bar when it
// auto-scales. Giving the viewport the extra height makes the fit scale
// resolve to exactly 1, so the scene renders 1:1 and we clip the bar off.
const PLAYBACK_BAR_H = 44;

const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const OUT_DIR =
  process.env.FRAME_DIR || path.join(os.tmpdir(), "rosterlab-hero-frames");

// Same brand blue HeroNew.tsx paints the mockup with today.
const HERO_BLUE = "#3779DD";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

// The bundle fetches its inlined resources by bare UUID relative to the page,
// so everything just resolves under /landing/. A plain static server is enough;
// a file:// origin is not (the bundle's own loader notes blob URLs get dropped).
function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const rel = decodeURIComponent(req.url.split("?")[0]);
      const file = path.join(PUBLIC_DIR, rel);
      if (!file.startsWith(PUBLIC_DIR) || !fs.existsSync(file)) {
        res.writeHead(404);
        return res.end("not found");
      }
      res.writeHead(200, {
        "Content-Type": MIME[path.extname(file)] || "application/octet-stream",
      });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

// Replaces rAF with a queue we pump by hand, so frame N always lands on
// exactly N/FPS seconds of scene time no matter how slow rendering is.
// Stage derives its delta from the timestamp argument, so controlling that
// controls the playhead.
function installDeterministicClock() {
  const realRaf = window.requestAnimationFrame.bind(window);
  window.__realRaf = realRaf;
  let queue = [];
  window.requestAnimationFrame = (cb) => queue.push(cb);
  window.cancelAnimationFrame = () => {};
  window.__tick = (ts) => {
    const due = queue;
    queue = [];
    due.forEach((cb) => {
      try {
        cb(ts);
      } catch (err) {
        console.error("rAF callback threw", err);
      }
    });
    return due.length;
  };
}

// Mirrors the runtime overrides in HeroNew.tsx so the recording bakes in the
// brand blue and drops the playback bar, instead of the component having to
// poll and restyle the iframe for 10 seconds on every page load.
function applyBrandOverrides(blue) {
  const style = document.createElement("style");
  style.textContent = `
    html, body { overflow: hidden !important; background: ${blue} !important; margin: 0 !important; }
    *::-webkit-scrollbar { display: none !important; }
    [style*="rgba(20, 20, 20, 0.92)"] { display: none !important; }
    #dc-root, #dc-root > div, #dc-root > div > div, #dc-root > div > div > div {
      background-color: ${blue} !important;
    }
  `;
  document.head.appendChild(style);

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  document.querySelectorAll("div").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width >= vw * 0.7 || r.height >= vh * 0.7) {
      const cs = getComputedStyle(el);
      const bg = cs.backgroundColor;
      if (
        bg === "rgb(255, 255, 255)" ||
        bg === "rgb(250, 249, 245)" ||
        bg === "rgb(230, 231, 232)" ||
        bg === "rgb(10, 10, 10)"
      ) {
        el.style.setProperty("background-color", blue, "important");
      }
      if (cs.boxShadow && cs.boxShadow !== "none") {
        el.style.setProperty("box-shadow", "none", "important");
      }
    }
  });
}

async function main() {
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const server = await serve();
  const { port } = server.address();
  const url = `http://127.0.0.1:${port}${PAGE_PATH}`;

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: CHROME,
    args: [
      "--no-sandbox",
      "--force-device-scale-factor=1",
      "--hide-scrollbars",
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: SCENE_W,
    height: SCENE_H + PLAYBACK_BAR_H,
    deviceScaleFactor: 1,
  });

  page.on("pageerror", (e) => console.error("  [page error]", e.message));

  await page.evaluateOnNewDocument(installDeterministicClock);

  console.log(`Loading ${url}`);
  await page.goto(url, { waitUntil: "networkidle2", timeout: 120000 });

  // The bundle gunzips its payload and swaps the whole document before
  // mounting, so wait for the mounted scene rather than any load event.
  await page.waitForFunction(
    () => {
      const root = document.getElementById("dc-root");
      return !!root && root.children.length > 0;
    },
    { timeout: 120000 },
  );
  await page.evaluate(() => document.fonts.ready);
  console.log("Scene mounted.");

  await page.evaluate(applyBrandOverrides, HERO_BLUE);

  // Drain whatever frames the loop queued during mount, then pin the playhead
  // to 0 so frame 0 is the true start of the animation.
  await page.evaluate(() => {
    window.__tick(0);
    try {
      localStorage.setItem("rosterlab-demo-stool:t", "0");
    } catch {}
  });

  const total = Math.round(DURATION * FPS);
  console.log(`Capturing ${total} frames at ${FPS}fps (${DURATION}s)...`);

  for (let i = 0; i < total; i++) {
    const ts = (i / FPS) * 1000;
    await page.evaluate((t) => window.__tick(t), ts);
    // Let React commit the state update and the compositor paint it.
    await page.evaluate(
      () => new Promise((r) => window.__realRaf(() => window.__realRaf(r))),
    );

    await page.screenshot({
      path: path.join(OUT_DIR, `frame-${String(i).padStart(5, "0")}.png`),
      clip: { x: 0, y: 0, width: SCENE_W, height: SCENE_H },
      optimizeForSpeed: true,
    });

    if (i % 60 === 0) process.stdout.write(`  ${i}/${total}\n`);
  }

  await browser.close();
  server.close();

  console.log(`\nDone. ${total} frames in ${OUT_DIR}`);
  console.log("Next: bash scripts/encode-hero-mockup.sh");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
