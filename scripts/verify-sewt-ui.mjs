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
  await page.waitForFunction(() => window.location.hash === "#main", null, { timeout: 5000 });
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
  assert.equal(await page.locator("#hero video").count(), 1, "Une unique vidéo de l'hôtel doit être présente dans le Hero");
  const media = page.locator("#hero video");
  assert.equal(await media.getAttribute("autoplay"), "", "Hero autoplay conservé");
  assert.equal(await media.getAttribute("muted"), "", "Hero silencieux conservé");
  assert.equal(await media.getAttribute("loop"), "", "Hero en boucle conservé");
  assert.equal(await media.getAttribute("playsinline"), "", "Hero compatible avec iOS");
  assert.match(await media.locator("source").getAttribute("src") ?? "", /\/hotel-riad-taroudant-hero\.mp4$/);
  assert.match(await media.getAttribute("poster") ?? "", /\/hotel-riad-taroudant-poster\.webp$/);
  assert.equal(await page.locator("#hero a").count(), 2, "Les deux CTA du Hero doivent être visibles");
  assert.equal((await page.locator('#hero a[href="/contact"]').textContent())?.trim(), "Échanger sur votre projet");
  assert.equal((await page.locator('#hero a[href="/#offre"]').textContent())?.trim(), "Découvrir nos solutions");
  assert.deepEqual((await page.locator("#hero-heading > span").allTextContents()).map((s) => s.trim()), ["Sun.", "Power.", "People."]);
  assert.equal(await page.locator("#hero-heading").evaluate((e) => getComputedStyle(e).textAlign), "left", "Hero title aligned left");
  // SEWT V3 p.1: les quatre rubriques restent visibles près du burger sur desktop,
  // mais elles sont cachées sur smartphone/tablette (accès via le menu burger).
  const nav = page.locator('header nav[aria-label="Navigation principale"]');
  assert.deepEqual((await nav.locator("a").allTextContents()).map((label) => label.trim()),
    ["Groupe", "Expertises", "Réalisations", "Contact"]);
  if (viewport.width < 1024) {
    assert.equal(await nav.isVisible(), false, `${name}: pas de rubriques dans l'en-tête mobile/tablette`);
  } else {
    assert.equal(await nav.isVisible(), true, `${name}: quatre rubriques visibles sur desktop`);
    const burger = page.getByRole("button", { name: "Ouvrir le menu" });
    const navBox = await nav.boundingBox();
    const burgerBox = await burger.boundingBox();
    assert.ok(navBox && burgerBox, "Navigation et burger visibles");
    assert.ok(navBox.x > viewport.width / 2, "Rubriques décalées à droite");
    assert.ok(burgerBox.x - (navBox.x + navBox.width) >= 10 && burgerBox.x - (navBox.x + navBox.width) <= 45,
      "Rubriques proches du burger, sans collision");
  }
  // SEWT V3 p.1: Sun Energy débute la deuxième ligne et reste insécable.
  const heroIntro = page.locator("#hero [data-hero-intro]");
  const firstLine = heroIntro.locator("[data-hero-intro-first]");
  const secondLine = heroIntro.locator("[data-hero-intro-second]");
  assert.equal((await firstLine.textContent())?.trim(), "Des solutions solaires conçues pour répondre à vos besoins.");
  assert.match((await secondLine.textContent())?.trim() ?? "", /^Sun Energy accompagne/);
  assert.equal(await secondLine.locator(".whitespace-nowrap").textContent(), "Sun Energy");
  const heroTextMetrics = await heroIntro.evaluate((node) => {
    const first = node.querySelector("[data-hero-intro-first]");
    const second = node.querySelector("[data-hero-intro-second]");
    const lineHeight = parseFloat(getComputedStyle(node).lineHeight);
    const firstRect = first.getBoundingClientRect();
    const secondRect = second.getBoundingClientRect();
    return {
      separate: secondRect.top >= firstRect.bottom - 1,
      firstLines: Math.round(firstRect.height / lineHeight),
      totalLines: Math.round((firstRect.height + secondRect.height) / lineHeight),
    };
  });
  assert.ok(heroTextMetrics.separate, "Sun Energy commence au début de la ligne 2");
  if (viewport.width >= 1280) {
    assert.equal(heroTextMetrics.firstLines, 1, "La phrase introductive occupe la première ligne");
    assert.equal(heroTextMetrics.totalLines, 4, "Paragraphe réparti sur quatre lignes au format desktop");
  }
  console.info(`${name}: V3 hero text metrics ${JSON.stringify(heroTextMetrics)}`);
  assert.equal(await page.locator("header a").filter({ hasText: "Impact" }).count(), 0, "Impact removed from nav");
  assert.equal(await page.locator('#impact [aria-label="Chiffres clés SEWT Group"]').count(), 0, "Word V2 removes KPI counters");
  // SEWT V3 page 2: four fully matching cards, without changing original copy.
  const benefitGrid = page.locator("#impact [data-impact-benefits]");
  const benefitCards = benefitGrid.locator("[data-impact-card]");
  assert.equal(await benefitCards.count(), 4, "Exactly four benefit cards");
  const benefitTitles = await benefitCards.locator("h3").allTextContents();
  assert.deepEqual(benefitTitles.map((t) => t.trim()), [
    "Réduction des coûts énergétiques",
    "Indépendance énergétique",
    "Baisse des émissions CO₂",
    "Performance industrielle durable",
  ]);
  const cardGeometry = await benefitCards.evaluateAll((els) => els.map((el) => {
    const rect = el.getBoundingClientRect();
    const title = el.querySelector("h3");
    const body = el.querySelector("p");
    return {
      width: rect.width,
      height: rect.height,
      padding: getComputedStyle(el).padding,
      radius: getComputedStyle(el).borderRadius,
      titleFits: Boolean(title && title.scrollHeight <= title.clientHeight + 2),
      bodyFits: Boolean(body && body.scrollHeight <= body.clientHeight + 2),
    };
  }));
  for (const card of cardGeometry) {
    assert.ok(Math.abs(card.width - cardGeometry[0].width) <= 2,
      `${name}: equal-width benefit cards ${JSON.stringify(cardGeometry)}`);
    assert.ok(Math.abs(card.height - cardGeometry[0].height) <= 2,
      `${name}: equal-height benefit cards ${JSON.stringify(cardGeometry)}`);
    assert.equal(card.padding, cardGeometry[0].padding, "Consistent inner spacing");
    assert.equal(card.radius, cardGeometry[0].radius, "Consistent card corners");
    assert.ok(card.titleFits && card.bodyFits, `${name}: no clipped title/body ${JSON.stringify(card)}`);
  }
  if (viewport.width >= 1280) {
    // Framer Motion translates the introduction by 24px until it enters view.
    // Assert visual alignment only after all five animations have settled.
    await page.locator("#impact [data-impact-intro]").scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const nodes = document.querySelectorAll("#impact [data-impact-intro], #impact [data-impact-card]");
      return nodes.length === 5 && [...nodes].every((el) =>
        Number(getComputedStyle(el).opacity) > 0.99
      );
    }, null, { timeout: 12000 });
    const balance = await page.locator("#impact").evaluate((section) => {
      const left = section.querySelector("[data-impact-intro]").getBoundingClientRect();
      const right = section.querySelector("[data-impact-benefits]").getBoundingClientRect();
      return { top: Math.abs(left.top - right.top), bottom: Math.abs(left.bottom - right.bottom) };
    });
    assert.ok(balance.top <= 3 && balance.bottom <= 3,
      `${name}: the four-card grid balances the full height of left introduction ${JSON.stringify(balance)}`);
  }
  console.info(`${name}: V3 p.2 card metrics ${JSON.stringify(cardGeometry)}`);
  assert.equal(await page.locator("#histoire ol > li").count(), 5, "Les cinq étapes de la frise sont conservées");
  assert.equal(await page.locator("#histoire ol > li").last().getByRole("heading", { level: 3 }).textContent(), "Restructuration opérationnelle", "Word V2 p.2 : nouveau titre pour 2023");
  assert.doesNotMatch((await page.locator("#hero").textContent()) ?? "", /Groupe énergétique marocain/i,
    "Hero : le micro-slogan hérité mais retiré à la demande du propriétaire doit être absent");
  // Les deux CTA sont rétablis selon la validation Word 5/32.
  assert.equal(await page.locator("#offre article").count(), 3);
  assert.equal((await page.locator("#le-groupe .section-label").first().textContent())?.trim(), "Le Groupe");
  assert.match((await page.locator("#le-groupe-heading").textContent()) ?? "", /Une direction expérimentée[.]\s*Une équipe qualifiée[.]/);
  assert.equal((await page.locator("#le-groupe-heading .text-accent").textContent())?.trim(), "qualifiée.");
  const groupContent = (await page.locator("#le-groupe").textContent()) ?? "";
  assert.doesNotMatch(groupContent, /Notre équipe terrain regroupe|Ambemar Maroc/i, "Ni l'ancien paragraphe ni le client ne doivent apparaître");
  assert.match(groupContent, /Ingénieur de l’Ecole Centrale de Paris, M[.] Ali Hajji fonde/);
  const teamImage = page.locator("#le-groupe img").first();
  assert.equal((await teamImage.getAttribute("alt"))?.includes("Ambemar"), false, "Client exclu du texte alternatif");
  const teamCrop = await teamImage.evaluate((el) => ({
    position: getComputedStyle(el).objectPosition,
    transform: getComputedStyle(el).transform,
  }));
  assert.equal(teamCrop.transform, "none", "Aucun zoom qui découpe les visages des techniciens");
  assert.match(teamCrop.position, viewport.width < 640 ? /92%/ : /78%/,
    "Recadrage responsive pour masquer l'enseigne client et garder les visages");

  const expertisesHeading = page.locator("#offre-heading");
  assert.equal((await expertisesHeading.locator(".text-accent").textContent())?.trim(), "énergétiques.");
  assert.match((await page.locator("#offre").textContent()) ?? "", /nos services se\s+complémentent pour répondre aux besoins de votre site/);
  for (const chapter of ["#offre", "#histoire"]) {
    const color = await page.locator(chapter).evaluate((node) =>
      getComputedStyle(node).backgroundColor,
    );
    assert.equal(color, "rgb(27, 47, 92)", `${chapter} : chapitre navy nécessaire en modes clair/sombre`);
  }
  assert.equal(await page.locator("#le-groupe article").count(), 3);
  // Word SEWT 2, page 5 : validated titles and project metadata.
  const flagshipCards = page.locator("#flagship article");
  assert.ok((await flagshipCards.count()) >= 3, "Three flagship projects displayed");
  const flagshipTexts = await Promise.all(
    [0, 1, 2].map((index) => flagshipCards.nth(index).textContent()),
  );
  assert.match(flagshipTexts[0] ?? "", /Site industriel/);
  assert.match(flagshipTexts[0] ?? "", /1,1 MWc/);
  assert.match(flagshipTexts[0] ?? "", /Sidi Kacem/);
  assert.match(flagshipTexts[0] ?? "", /2025/);
  assert.doesNotMatch(flagshipTexts[0] ?? "", /2023/);
  assert.match(flagshipTexts[1] ?? "", /Exploitation agricole/);
  assert.match(flagshipTexts[1] ?? "", /350 kWc/);
  assert.match(flagshipTexts[1] ?? "", /Taroudant/);
  assert.match(flagshipTexts[2] ?? "", /Secteur tertiaire/);
  assert.match(flagshipTexts[2] ?? "", /200 kWc/);
  assert.match(flagshipTexts[2] ?? "", /Casablanca/);
  // V3 Projets réalisés: une seule action claire, sans lien redondant à droite.
  assert.equal(await page.getByText("Portefeuille complet", { exact: true }).count(), 0);
  const moreProjects = page.locator("#flagship").getByRole("button", { name: "Voir plus de projets" });
  assert.equal(await moreProjects.count(), 1, "Un seul bouton pour découvrir davantage de projets");
  assert.equal(await moreProjects.getAttribute("aria-expanded"), "false");
  await moreProjects.click();
  const fewerProjects = page.locator("#flagship").getByRole("button", { name: "Voir moins de projets" });
  assert.equal(await fewerProjects.getAttribute("aria-expanded"), "true");
  assert.equal(await page.locator("#flagship article").count(), 6);
  await fewerProjects.click();
  assert.equal(await moreProjects.getAttribute("aria-expanded"), "false");
    assert.equal(await page.locator("#flagship #preuve").count(), 1);
  assert.equal(await page.locator("#preuve h3").count(), 0, "Word V2 p.6 : pas de titre Références & partenaires");
  assert.doesNotMatch((await page.locator("#preuve").textContent()) ?? "", /Références\s*(?:&|et)\s*partenaires/i);
  assert.ok(await page.locator("#preuve [data-marquee-root] img").count() >= 12, "Les logos partenaires sont préservés");
  assert.equal(await page.locator("#roi").count(), 0);
  // V3: invitation réintroduite après Projets réalisés, sans autre CTA.
  const sections = await page.locator("main > section[id]").evaluateAll((nodes) => nodes.map((node) => node.id));
  assert.ok(sections.indexOf("nous-en-parler") > sections.indexOf("flagship"),
    "Nous en parler doit suivre les projets réalisés");
  const invitation = page.locator("#nous-en-parler");
  assert.equal(await invitation.count(), 1, "La section Nous en parler doit être présente");
  assert.match((await invitation.locator("h2").textContent()) ?? "", /Parlons de votre projet énergétique/);
  const steps = [
    ["01", "Comprendre vos usages", "Nous partons des besoins énergétiques de votre entreprise, de votre exploitation ou de votre site industriel."],
    ["02", "Étudier la solution", "L’étude permet de définir un système solaire adapté à vos usages et aux caractéristiques de votre site."],
    ["03", "Installer et accompagner", "Après l’installation, l’exploitation et la maintenance contribuent au suivi de vos équipements."],
  ];
  const cards = page.locator("#nous-en-parler article");
  assert.equal(await cards.count(), 3, "The three contact steps moved to Nous en parler");
  for (let index = 0; index < steps.length; index++) {
    const [number, title, body] = steps[index];
    const card = cards.nth(index);
    assert.equal((await card.locator("p").first().textContent())?.trim(), number);
    assert.equal((await card.locator("h3").textContent())?.trim(), title);
    assert.equal((await card.locator("p").last().textContent())?.trim(), body);
  }
  const invitationLinks = invitation.locator("a, button");
  assert.equal(await invitationLinks.count(), 1, "Nous écrire est la seule action de la section");
  assert.equal((await invitationLinks.first().textContent())?.trim(), "Nous écrire");
  assert.match(await invitationLinks.first().getAttribute("href") ?? "", /^mailto:contact@sewt-group[.]ma/);

  // Footer V3 réduit au logo légèrement plus grand et aux liens légaux.
  const footer = page.locator("footer#footer");
  assert.equal(await footer.locator("img").count(), 1);
  assert.equal(await footer.locator("img").first().evaluate((img) => img.getBoundingClientRect().height >= 48), true);
  assert.deepEqual((await footer.locator("nav a").allTextContents()).map((text) => text.trim()), [
    "Confidentialité", "Mentions légales",
  ]);
  assert.equal(await footer.locator("a").count(), 3, "Seulement logo et liens légaux dans le footer");
  assert.equal(await footer.locator("p").count(), 0, "Aucun texte descriptif ni copyright dans le footer");

  await page.locator('header img[alt="SEWT Group"]').waitFor({ state: "visible" });

  for (const section of ["#impact", "#offre", "#flagship", "#preuve", "#histoire", "#le-groupe"]) {
    await page.locator(section).scrollIntoViewIfNeeded();
    await page.waitForTimeout(220);
  }
  // Full-page screenshots do not trigger every whileInView animation on narrow screens.
  // Reveal each animated card and the KPI block at its actual viewport position.
  for (const selector of [
    "#impact article",
    "#histoire ol > li",
    "#offre article",
  ]) {
    const elements = page.locator(selector);
    const count = await elements.count();
    assert.ok(count > 0, `Animated QA target missing: ${selector}`);
    for (let index = 0; index < count; index++) {
      await elements.nth(index).scrollIntoViewIfNeeded();
      await page.waitForFunction(({ selector, index }) => {
        const node = document.querySelectorAll(selector)[index];
        return node && Number(getComputedStyle(node).opacity) > 0.99;
      }, { selector, index });
    }
  }

  // Capture just the section: temporarily hide the fixed header so it does not
  // appear across the middle of element screenshots on mobile/tablet.
  const headerVisibility = await page.locator("header").evaluate((el) => {
    const previous = el.style.visibility;
    el.style.visibility = "hidden";
    return previous;
  });
  await page.locator("#impact").screenshot({
    path: `test-artifacts/${name}-impact.png`,
    animations: "disabled",
  });
  await page.locator("header").evaluate((el, previous) => {
    el.style.visibility = previous;
  }, headerVisibility);

  // These are the three exact user-supplied images extracted from Word 2 pages 4–5.
  const expertiseFiles = [
    "word2-photovoltaique.jpg",
    "word2-solaire-thermique.jpg",
    "word2-exploitation-maintenance.jpg",
  ];
  for (let index = 0; index < expertiseFiles.length; index++) {
    const img = page.locator("#offre article").nth(index).locator("img");
    const src = decodeURIComponent((await img.getAttribute("src")) ?? "");
    assert.ok(src.includes("/projects/" + expertiseFiles[index]), "Exact image Word V2 for expertise " + (index+1));
    await img.scrollIntoViewIfNeeded();
    await page.waitForFunction((i) => {
      const image = document.querySelectorAll("#offre article img")[i];
      return image?.complete && image.naturalWidth > 0;
    }, index, { timeout: 20000 });
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
    assert.equal(await page.getByRole("dialog").getByRole("link", { name: "Impact", exact: true }).count(), 0,
      "The mobile drawer must not show Impact in Word V2");
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
  assert.equal(await page.locator("header").getByRole("link", { name: "Parler de mon projet" }).count(), 0);
  assert.equal(await page.locator("header").getByRole("button", { name: /thème|theme/i }).count(), 0);
  const logoFilter = await page.locator('header img[alt="SEWT Group"]').evaluate((el) =>
    getComputedStyle(el).filter
  );
  if (theme === "light") {
    assert.ok(!logoFilter.includes("invert(1)"), "Logo blanc interdit sur fond clair de la page Contact");
  } else {
    assert.ok(logoFilter.includes("invert(1)"), "La variante claire du logo doit être visible en mode sombre");
  }
  const emailButton = page.getByRole("link", { name: "Nous écrire", exact: true });
  assert.equal(await emailButton.count(), 1, "Un unique lien Nous écrire sur la page Contact");
  assert.match((await emailButton.getAttribute("href")) ?? "", new RegExp("^mailto:contact@sewt-group[.]ma[?]subject="));
  assert.equal(await page.locator("main form, main dialog, main input, main textarea").count(), 0,
    "Aucun formulaire ni champ de saisie sur la page Contact");
  const legal = page.getByRole("link", { name: "Mentions légales" });
  const privacy = page.getByRole("link", { name: "Confidentialité", exact: true });
  assert.equal(await legal.getAttribute("href"), "/mentions-legales");
  assert.equal(await privacy.getAttribute("href"), "/confidentialite");
  const orphanAnchors = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links.filter((a) => {
      const hash = a.getAttribute("href")?.slice(1);
      return hash && !document.getElementById(decodeURIComponent(hash));
    }).map((a) => a.getAttribute("href")),
  );
  assert.deepEqual(orphanAnchors, [], "Aucune ancre morte sur la page Contact");
  // Word SEWT 2 p.6: Contact unchanged and fully conformant.
  const contactText = (await page.locator("main").textContent()) ?? "";
  assert.match(contactText, /Témara, Maroc/);
  assert.doesNotMatch(contactText, /Résidence Islah/i);
  assert.ok(contactText.includes("Chaque site a ses contraintes et ses habitudes. Nous abordons le projet à partir de vos besoins énergétiques, puis vous accompagnons de l’étude au suivi des équipements."),
    "Exact approved Contact introduction");
  assert.equal(await page.locator("#processus-heading, main section[aria-labelledby='processus-heading']").count(), 0,
    "Les trois bulles ont été déplacées hors de la page Contact");

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
    for (const route of ["/notre-histoire", "/projects/centrale-pv-carriere-industrielle", "/mentions-legales", "/confidentialite"]) {
      await page.goto(`${site}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      assert.equal(await page.locator("main#main").count(), 1, `${route}: cible skip navigation`);
      await verifySkipNavigation(page, route);
      if (route === "/mentions-legales") {
        assert.match((await page.locator("main").textContent()) ?? "", /003317571000039/);
      }
      if (route === "/confidentialite") {
        assert.match((await page.locator("main").textContent()) ?? "", /loi marocaine n° 09-08/);
      }
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
