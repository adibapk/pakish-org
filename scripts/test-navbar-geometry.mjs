#!/usr/bin/env node
/**
 * Navbar geometry regression — run against local dev server or production.
 * Usage: node scripts/test-navbar-geometry.mjs [baseUrl]
 */
import { createRequire } from "node:module";

const baseUrl = process.argv[2] ?? "http://localhost:3000";
const viewports = [320, 375, 768, 1024, 1280, 1366, 1440, 1536, 1920];

async function loadPlaywright() {
  try {
    const require = createRequire(import.meta.url);
    return require("playwright");
  } catch {
    console.error(
      "playwright is required for geometry tests. Install with: npm install -D playwright"
    );
    process.exit(1);
  }
}

async function assertHeaderGeometry(page, width) {
  await page.setViewportSize({ width, height: 720 });
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  const metrics = await page.evaluate(() => {
    const header = document.querySelector('[data-testid="site-header"]');
    const doc = document.documentElement;
    const mobileTrigger = document.querySelector('[data-testid="mobile-menu-trigger"]');
    const desktopNav = header?.querySelector('[data-radix-navigation-menu-root]');
    const apply = header?.querySelector('a[href="/admission"]');
    const headerRect = header?.getBoundingClientRect();
    const applyRect = apply?.getBoundingClientRect();
    const wrapped = header
      ? Array.from(header.querySelectorAll("a, button"))
          .filter((el) => {
            const top = el.getBoundingClientRect().top;
            return headerRect && top > headerRect.top + headerRect.height * 0.55;
          })
          .map((el) => el.textContent?.trim())
      : [];
    return {
      docScrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      headerClientWidth: header?.clientWidth ?? 0,
      headerScrollWidth: header?.scrollWidth ?? 0,
      headerHeight: headerRect?.height ?? 0,
      applyInside:
        !!applyRect &&
        !!headerRect &&
        applyRect.right <= headerRect.right + 1 &&
        applyRect.bottom <= headerRect.bottom + 1,
      mobileVisible: mobileTrigger
        ? window.getComputedStyle(mobileTrigger).display !== "none"
        : false,
      desktopVisible: desktopNav
        ? window.getComputedStyle(desktopNav.closest(".hidden") ?? desktopNav)
            .display !== "none"
        : false,
      wrappedLabels: wrapped.filter(Boolean),
      overflow: doc.scrollWidth > doc.clientWidth + 1,
    };
  });

  const isDesktop = width >= 1280;
  if (metrics.overflow) {
    throw new Error(`horizontal overflow at ${width}px`);
  }
  if (!metrics.applyInside) {
    throw new Error(`Apply CTA outside header at ${width}px`);
  }
  if (isDesktop) {
    if (metrics.wrappedLabels.length > 0) {
      throw new Error(
        `wrapped nav items at ${width}px: ${metrics.wrappedLabels.join(", ")}`
      );
    }
    if (metrics.headerScrollWidth > metrics.headerClientWidth + 2) {
      throw new Error(`header scroll overflow at ${width}px`);
    }
    if (metrics.headerHeight > 80) {
      throw new Error(`header too tall (${metrics.headerHeight}px) at ${width}px`);
    }
  } else {
    if (!metrics.mobileVisible) {
      throw new Error(`mobile menu trigger hidden at ${width}px`);
    }
  }
  console.log(`ok ${width}px — header ${metrics.headerClientWidth}px, h=${Math.round(metrics.headerHeight)}`);
}

async function main() {
  const { chromium } = await loadPlaywright();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    for (const width of viewports) {
      await assertHeaderGeometry(page, width);
    }
    await page.setViewportSize({ width: 1536, height: 639 });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    const scaled = await page.evaluate(() => {
      const header = document.querySelector('[data-testid="site-header"]');
      return {
        headerClientWidth: header?.clientWidth ?? 0,
        headerScrollWidth: header?.scrollWidth ?? 0,
        headerHeight: header?.getBoundingClientRect().height ?? 0,
      };
    });
    console.log(
      `ok 1536x639 reference — client=${scaled.headerClientWidth} scroll=${scaled.headerScrollWidth} h=${Math.round(scaled.headerHeight)}`
    );
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
