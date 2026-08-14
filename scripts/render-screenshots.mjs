#!/usr/bin/env node
/**
 * Render each Astro mockup at phone resolution (1080×2400 logical) to PNG.
 *
 * Usage:
 *   node scripts/render-screenshots.mjs           # render all 6
 *   node scripts/render-screenshots.mjs console   # render one
 *
 * Assumes `pnpm preview` is already serving http://127.0.0.1:4321
 * (or pass --url to override).
 */

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const PHONES = [
  // name, cssW, cssH, dpr
  { name: "mate", cssW: 360, cssH: 780, dpr: 3 }, // 1080×2340
];

const SCREENS = [
  "console",
  "sessions",
  "chat",
  "approval",
  "question",
  "dark-chat",
];

const URL_BASE = process.argv.includes("--url")
  ? process.argv[process.argv.indexOf("--url") + 1]
  : "http://127.0.0.1:4321";

const OUT_DIR = process.argv.includes("--out")
  ? process.argv[process.argv.indexOf("--out") + 1]
  : join(ROOT, "out", "screens");

const ONLY = process.argv
  .filter((a, i) => i >= 2 && !a.startsWith("--"))
  .filter(Boolean);

async function renderOne(browser, screen, phone) {
  const ctx = await browser.newContext({
    viewport: { width: phone.cssW, height: phone.cssH },
    deviceScaleFactor: phone.dpr,
    colorScheme: "light",
  });
  const page = await ctx.newPage();
  await page.goto(`${URL_BASE}/screens/${screen}/`, { waitUntil: "networkidle" });
  // Wait for fonts + any async layout
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(120);

  const out = join(OUT_DIR, `${screen}@${phone.name}.png`);
  await page.screenshot({ path: out, fullPage: false });
  await ctx.close();
  return out;
}

(async () => {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  try {
    const targets = ONLY.length ? ONLY : SCREENS;
    for (const screen of targets) {
      for (const phone of PHONES) {
        const out = await renderOne(browser, screen, phone);
        console.log("✓", screen, "→", out);
      }
    }
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});