import { mkdir } from "node:fs/promises";
import { chromium, expect } from "@playwright/test";

const site = process.env.SEWT_UI_BASE_URL ?? "http://127.0.0.1:3100";

const browser = await chromium.launch({ headless: true });
await mkdir("test-artifacts", { recursive: true });

async function screenshot(name, viewport) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme: "light",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(12_000);

  await page.goto(site, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await expect(page.locator("#hero-heading")).toContainText("Sun. Power.");
  await expect(page.getByRole("link", { name: "Échanger sur votre projet" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Découvrir nos solutions" })).toBeVisible();
  await expect(page.locator("#offre article")).toHaveCount(3);
  await expect(page.locator("#le-groupe article")).toHaveCount(3);
  await expect(page.locator("#flagship #preuve")).toHaveCount(1);
  await expect(page.locator("#roi")).toHaveCount(0);
  await expect(page.locator('header img[alt="SEWT Group"]')).toBeVisible();

  for (const section of ["#impact", "#offre", "#flagship", "#histoire", "#le-groupe"]) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await page.waitForTimeout(220);
  }
  await page.locator("#hero").scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);

  await page.screenshot({
    path: `test-artifacts/${name}-home.png`,
    fullPage: true,
    animations: "disabled",
  });

  if (viewport.width < 600) {
    await page.getByRole("button", { name: "Ouvrir le menu" }).click();
    await expect(page.getByRole("dialog", { name: "Menu navigation" })).toBeVisible();
    await expect(page.getByRole("dialog").getByRole("link", { name: "Contact" })).toBeVisible();
    await page.getByRole("button", { name: "Fermer le menu" }).click();
  }

  await page.goto(`${site}/contact`, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await expect(page.getByRole("link", { name: "Nous écrire" })).toHaveAttribute(
    "href",
    /mailto:contact@sewt-group\.ma/,
  );
  await expect(page.locator("main input")).toHaveCount(0);
  await expect(page.locator("main")).toContainText("Témara, Maroc");
  await expect(page.getByText("Comprendre vos usages")).toBeVisible();

  await page.screenshot({
    path: `test-artifacts/${name}-contact.png`,
    fullPage: true,
    animations: "disabled",
  });

  const metrics = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: window.innerWidth,
  }));
  console.info(`${name}: UI smoke OK; contact page widths ${JSON.stringify(metrics)}`);
  await context.close();
}

try {
  await screenshot("desktop", { width: 1440, height: 900 });
  await screenshot("mobile", { width: 375, height: 812 });
} finally {
  await browser.close();
}
