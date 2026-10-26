import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import assert from "node:assert/strict";

const site = process.env.SEWT_UI_BASE_URL ?? "http://127.0.0.1:3100";

const browser = await chromium.launch({ headless: true });
await mkdir("test-artifacts", { recursive: true });

async function verifySkipNavigation(page, label) {
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(() => document.activeElement?.getAttribute("href"));
  assert.equal(focused, "#main", `${label}: lien d'évitement du contenu accessible au clavier`);
  await page.keyboard.press("Enter");
  assert.equal(new URL(page.url()).hash, "#main", `${label}: cible du lien d'évitement`);
  assert.equal(await page.locator("main#main").count(), 1, `${label}: main#main unique`);
}

async function screenshot(name, viewport, theme = "light") {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme: theme,
  });
  await context.addInitScript((selectedTheme) => {
    localStorage.setItem("sewt-theme-v2", selectedTheme);
  }, theme);
  const page = await context.newPage();
  page.setDefaultTimeout(12_000);

  await page.goto(site, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForFunction((value) =>
    document.documentElement.classList.contains("dark") === (value === "dark"),
    theme,
  );
  await verifySkipNavigation(page, `${name} accueil`);
  assert.equal(await page.locator("#hero video").count(), 1, "La vidéo originale du Hero doit rester visible");
  assert.match((await page.locator("#hero-heading").textContent()) ?? "", /Sun\.\s*Power\./);
  await page.getByRole("link", { name: "Échanger sur votre projet" }).waitFor({ state: "visible" });
  await page.getByRole("link", { name: "Découvrir nos solutions" }).waitFor({ state: "visible" });
  assert.equal(await page.locator("#offre article").count(), 3);
  for (const chapter of ["#offre", "#histoire"]) {
    const color = await page.locator(chapter).evaluate((node) =>
      getComputedStyle(node).backgroundColor,
    );
    assert.equal(color, "rgb(27, 47, 92)", `${chapter} : chapitre navy nécessaire en modes clair/sombre`);
  }
  assert.equal(await page.locator("#le-groupe article").count(), 3);
  assert.equal(await page.locator("#flagship #preuve").count(), 1);
  assert.equal(await page.locator("#roi").count(), 0);
  await page.locator('header img[alt="SEWT Group"]').waitFor({ state: "visible" });

  for (const section of ["#impact", "#offre", "#flagship", "#preuve", "#histoire", "#le-groupe"]) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await page.waitForTimeout(220);
  }
  // Verify each team portrait and the field photo in the actual mobile viewport.
  // A full-page screenshot alone does not trigger Framer Motion whileInView.
  await page.locator("#le-groupe-heading").scrollIntoViewIfNeeded();
  await page.waitForTimeout(220);
  const teamImages = page.locator("#le-groupe img");
  assert.equal(await teamImages.count(), 4, "La section équipe doit avoir 1 photo chantier et 3 portraits");
  for (let index = 0; index < 4; index++) {
    await teamImages.nth(index).scrollIntoViewIfNeeded();
    await page.waitForFunction((i) => {
      const img = document.querySelectorAll("#le-groupe img")[i];
      return img?.complete && img.naturalWidth > 0;
    }, index);
    await page.waitForTimeout(200);
  }

  // The partner marquee is animated only when it enters the viewport.
  // Check real image loading before the full-page snapshot so it does not look empty.
  await page.locator("#preuve").scrollIntoViewIfNeeded();
  await page.waitForFunction(() => {
    const images = [...document.querySelectorAll("#preuve [data-marquee-root] img")];
    return images.length >= 12 && images.some((img) => img.complete && img.naturalWidth > 0);
  }, { timeout: 12000 });
  const loadedPartnerLogos = await page.locator("#preuve [data-marquee-root] img").evaluateAll(
    (imgs) => imgs.filter((img) => img.complete && img.naturalWidth > 0).length,
  );
  assert.ok(loadedPartnerLogos > 0, "Le bandeau partenaires doit afficher les logos existants");
  await page.waitForTimeout(350);

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
  await page.waitForFunction((value) =>
    document.documentElement.classList.contains("dark") === (value === "dark"),
    theme,
  );
  // A light internal page must not inherit the white-on-transparent home header.
  const headerBg = await page.locator("header").evaluate((el) =>
    getComputedStyle(el).backgroundColor
  );
  assert.notEqual(headerBg, "rgba(0, 0, 0, 0)", "La navigation interne doit avoir un fond");
  assert.notEqual(headerBg, "transparent", "La navigation interne ne doit pas être transparente");
  await verifySkipNavigation(page, `${name} contact`);
  await page.getByRole("link", { name: "Parler de mon projet" }).first().waitFor({
    state: viewport.width >= 768 ? "visible" : "hidden",
  });
  const logoFilter = await page.locator('header img[alt="SEWT Group"]').evaluate((el) =>
    getComputedStyle(el).filter
  );
  if (theme === "light") {
    assert.ok(!logoFilter.includes("invert(1)"), "Logo blanc interdit sur fond clair de la page Contact");
  } else {
    assert.ok(logoFilter.includes("invert(1)"), "La variante claire du logo doit être visible en mode sombre");
  }
  await page.getByRole("button", { name: "Nous écrire" }).click();
  const contactDialog = page.getByRole("dialog", { name: "Écrire à SEWT" });
  await contactDialog.waitFor({ state: "visible" });
  await contactDialog.getByRole("textbox", { name: "Votre adresse e-mail" }).waitFor({ state: "visible" });
  await contactDialog.getByRole("textbox", { name: "Votre message" }).waitFor({ state: "visible" });
  assert.match(
    (await contactDialog.getByRole("link", { name: "Ouvrir ma messagerie à la place" }).getAttribute("href")) ?? "",
    /^mailto:contact@sewt-group\.ma/,
  );
  await contactDialog.getByRole("button", { name: "Fermer la fenêtre de message" }).click();
  await contactDialog.waitFor({ state: "hidden" });
  assert.equal(await page.locator("main input").count(), 0);
  const legal = page.getByRole("link", { name: "Demander les mentions légales" });
  const privacy = page.getByRole("link", { name: "Question sur la confidentialité" });
  assert.match((await legal.getAttribute("href")) ?? "", /^mailto:contact@sewt-group\.ma/);
  assert.match((await privacy.getAttribute("href")) ?? "", /^mailto:contact@sewt-group\.ma/);
  const orphanAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links.filter((a) => {
      const hash = a.getAttribute("href")?.slice(1);
      return hash && !document.getElementById(decodeURIComponent(hash));
    }).map((a) => a.getAttribute("href")),
  );
  assert.deepEqual(orphanAnchors, [], "Aucune ancre morte sur la page Contact");
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
  assert.ok(metrics.documentWidth <= metrics.viewportWidth + 2, `${name}: overflow horizontal sur Contact ${JSON.stringify(metrics)}`);
  console.info(`${name}: UI smoke OK; contact page widths ${JSON.stringify(metrics)}`);
  if (name === "desktop") {
    for (const route of ["/notre-histoire", "/projects/centrale-pv-carriere-industrielle"]) {
      await page.goto(`${site}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      assert.equal(await page.locator("main#main").count(), 1, `${route}: cible skip navigation`);
      await verifySkipNavigation(page, route);
    }
  }
  await context.close();
}

try {
  await screenshot("desktop", { width: 1440, height: 900 });
  await screenshot("tablet", { width: 768, height: 1024 });
  await screenshot("mobile", { width: 375, height: 812 });
  await screenshot("desktop-dark", { width: 1440, height: 900 }, "dark");
  await screenshot("mobile-dark", { width: 375, height: 812 }, "dark");
} finally {
  await browser.close();
}
