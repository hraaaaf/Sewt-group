import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import assert from "node:assert/strict";

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
  assert.equal(await page.locator("#hero video").count(), 1, "La vidéo originale du Hero doit rester visible");
  assert.match((await page.locator("#hero-heading").textContent()) ?? "", /Sun\.\s*Power\./);
  await page.getByRole("link", { name: "Échanger sur votre projet" }).waitFor({ state: "visible" });
  await page.getByRole("link", { name: "Découvrir nos solutions" }).waitFor({ state: "visible" });
  assert.equal(await page.locator("#offre article").count(), 3);
  assert.equal(await page.locator("#le-groupe article").count(), 3);
  assert.equal(await page.locator("#flagship #preuve").count(), 1);
  assert.equal(await page.locator("#roi").count(), 0);
  await page.locator('header img[alt="SEWT Group"]').waitFor({ state: "visible" });

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
    await page.getByRole("dialog", { name: "Menu navigation" }).waitFor({ state: "visible" });
    await page.getByRole("dialog").getByRole("link", { name: "Contact" }).waitFor({ state: "visible" });
    await page.getByRole("button", { name: "Fermer le menu" }).click();
  }

  await page.goto(`${site}/contact`, { waitUntil: "domcontentloaded", timeout: 30_000 });
  // A light internal page must not inherit the white-on-transparent home header.
  const headerBg = await page.locator("header").evaluate((el) =>
    getComputedStyle(el).backgroundColor
  );
  assert.notEqual(headerBg, "rgba(0, 0, 0, 0)", "La navigation interne doit avoir un fond");
  assert.notEqual(headerBg, "transparent", "La navigation interne ne doit pas être transparente");
  await page.getByRole("link", { name: "Parler de mon projet" }).first().waitFor({ state: viewport.width > 768 ? "visible" : "hidden" });
  const logoFilter = await page.locator('header img[alt="SEWT Group"]').evaluate((el) =>
    getComputedStyle(el).filter
  );
  assert.ok(!logoFilter.includes("invert(1)"), "Logo blanc interdit sur fond clair de la page Contact");
  assert.match(
    (await page.getByRole("link", { name: "Nous écrire" }).getAttribute("href")) ?? "",
    /^mailto:contact@sewt-group\.ma/,
  );
  assert.equal(await page.locator("main input").count(), 0);
  assert.match((await page.locator("main").textContent()) ?? "", /Témara, Maroc/);
  await page.getByText("Comprendre vos usages").waitFor({ state: "visible" });

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
