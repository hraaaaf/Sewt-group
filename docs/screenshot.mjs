import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

await mkdir('C:/Users/lenovo/Documents/SEWT/docs', { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Set localStorage BEFORE navigation to skip intro
await page.addInitScript(() => {
  localStorage.setItem('sewt-intro-seen', String(Date.now() - 1000 * 60 * 60));
});

await page.goto('http://localhost:62357', { waitUntil: 'networkidle', timeout: 20000 });
await page.waitForTimeout(1500);

// Freeze animations for clean screenshots
await page.addStyleTag({
  content: `*, *::before, *::after { animation-play-state: paused !important; transition: none !important; }`
});

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
  await page.waitForTimeout(600);
  await page.screenshot({ path: `C:/Users/lenovo/Documents/SEWT/docs/section-${s.name}.png` });
  console.log(`✓ ${s.name}`);
}

await browser.close();
console.log('Done.');
