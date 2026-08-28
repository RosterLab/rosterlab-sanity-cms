/**
 * Regenerates public/landing/mockup/hero-poster-generate-{738,1476}.webp — the
 * still frame HeroStoolPoster shows below lg, where the animated scene is not
 * mounted.
 *
 * It drives the real component rather than a fixture: load the homepage, let
 * the hero scene play until the generate modal's progress bar is about half
 * full, kill requestAnimationFrame to freeze the playhead there, then lift the
 * Stage canvas onto an otherwise empty transparent page so nothing behind it
 * composites in. The existing posters have alpha-0 backgrounds and take their
 * blue from the hero section, so this one has to as well.
 *
 * Usage (needs the dev server up on :3000):
 *   pnpm dev
 *   node scripts/capture-hero-poster.js /tmp/gen-frame.png
 */
const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUT_PNG = process.argv[2];
const W = 1476, H = 1141;

(async () => {
  const b = await puppeteer.launch({headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--hide-scrollbars']});
  const p = await b.newPage();
  await p.setViewport({width: 2400, height: 1600, deviceScaleFactor: 2});
  await p.goto('http://localhost:3000/', {waitUntil: 'networkidle2', timeout: 90000});
  await p.waitForFunction(() =>
    [...document.querySelectorAll('div')].some(d => d.style.width === '1476px'), {timeout: 60000});

  const state = await p.evaluate(async (W, H) => {
    const readPct = () => {
      const el = [...document.querySelectorAll('div')]
        .find(d => /^\d+%$/.test((d.textContent || '').trim()) && d.children.length === 0);
      return el ? parseInt(el.textContent, 10) : null;
    };
    let frozenAt = null;
    const deadline = Date.now() + 45000;
    while (Date.now() < deadline) {
      const v = readPct();
      if (v !== null && v >= 45 && v <= 58) {
        window.requestAnimationFrame = () => 0;
        await new Promise(r => setTimeout(r, 150));
        frozenAt = readPct();
        break;
      }
      await new Promise(r => setTimeout(r, 20));
    }
    if (frozenAt === null) return {frozenAt: null};

    const canvas = [...document.querySelectorAll('div')].find(d => d.style.width === '1476px');
    // Lift the frozen canvas onto an otherwise empty, transparent page.
    document.body.appendChild(canvas);
    window.__soloCanvas = () => {
      for (const child of [...document.body.children]) if (child !== canvas) child.remove();
    };
    window.__soloCanvas();
    Object.assign(canvas.style, {
      position: 'fixed', left: '0px', top: '0px', transform: 'none',
      zIndex: '2147483647', visibility: 'visible', background: 'transparent',
    });
    document.documentElement.style.background = 'transparent';
    document.body.style.background = 'transparent';
    document.body.style.margin = '0';

    const modal = [...document.querySelectorAll('div')]
      .find(d => /Generating (Rosters|Schedules) For You/.test(d.textContent || '') && d.children.length === 0);
    const r = canvas.getBoundingClientRect();
    return {frozenAt, modalVisible: !!modal,
            canvasAt: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]};
  }, W, H);

  console.log(JSON.stringify(state));
  if (!state.frozenAt || !state.modalVisible) { console.error('FAILED'); await b.close(); process.exit(1); }

  await new Promise(r => setTimeout(r, 500));
  // Second pass: widgets that mount late would otherwise bleed into the frame.
  await p.evaluate(() => window.__soloCanvas());
  await new Promise(r => setTimeout(r, 150));
  await p.screenshot({path: OUT_PNG, clip: {x: 0, y: 0, width: W, height: H}, omitBackground: true});
  await b.close();

  const m = await sharp(OUT_PNG).metadata();
  console.log('png', m.width + 'x' + m.height, 'alpha', m.hasAlpha);
  const dir = path.join(process.cwd(), 'public/landing/mockup');
  for (const w of [1476, 738]) {
    const out = path.join(dir, `hero-poster-generate-${w}.webp`);
    await sharp(OUT_PNG).resize({width: w}).webp({quality: 82, alphaQuality: 100}).toFile(out);
    console.log(`wrote ${path.basename(out)}  ${(fs.statSync(out).size / 1024).toFixed(1)}KB`);
  }
})();
