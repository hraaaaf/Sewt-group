const { chromium } = require('C:/Users/lenovo/AppData/Local/npm-cache/_npx/5e2e484947874241/node_modules/playwright');
const fs = require('fs');

(async () => {
  fs.mkdirSync('C:/Users/lenovo/Documents/SEWT/docs', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // Skip intro sequence via localStorage
  await page.addInitScript(() => {
    localStorage.setItem('sewt-intro-seen', String(Date.now() - 3600000));
  });

  await page.goto('http://localhost:65270', { waitUntil: 'networkidle', timeout: 20000 });
  await page.waitForTimeout(1500);

  // Pause all CSS animations
  await page.addStyleTag({
    content: '*, *::before, *::after { animation-play-state: paused !important; transition: none !important; }'
  });
  await page.waitForTimeout(300);

  const sections = [
    { id: '#hero',      name: '01-hero' },
    { id: '#le-groupe', name: '02-legroupe' },
    { id: '#histoire',  name: '03-histoire' },
    { id: '#offre',     name: '04-offre' },
    { id: '#flagship',  name: '05-flagship' },
    { id: '#preuve',    name: '06-preuve' },
    { id: '#roi',       name: '07-roi' },
  ];

  for (const s of sections) {
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, s.id);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `C:/Users/lenovo/Documents/SEWT/docs/section-${s.name}.png` });
    console.log('captured: ' + s.name);
  }

  await browser.close();
  console.log('All done.');
})().catch(e => { console.error(e.message); process.exit(1); });
