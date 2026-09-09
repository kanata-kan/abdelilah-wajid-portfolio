import { test, expect } from '@playwright/test';
import en from '../../docs/design/v1.0/05-implementation/content/en.json' with { type: 'json' };
import ar from '../../docs/design/v1.0/05-implementation/content/ar.json' with { type: 'json' };

for (const locale of ['en', 'ar'] as const) {
  const copy = { en, ar }[locale];
  for (const width of [320, 390, 599, 600, 768, 959, 960, 1024, 1440]) {
    test(`${locale} responsive ${width}`, async ({ page }, info) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('html')).toHaveAttribute('dir', copy.direction);
      await expect(page.locator('h1')).toHaveText(copy.hero.title);
      await expect(page.locator('.hero-copy > p').last()).toHaveText(copy.hero.body);
      await expect(page.locator('.project-row')).toHaveCount(2);
      await expect(page.locator('.project-row a')).toHaveCount(0);
      await expect(page.locator('.mobile-only bdi').first()).toHaveText(copy.work.mobileEyebrow);
      await expect(page.locator('[class*="featured-status-"]:visible')).toHaveCount(1);
      await expect(page.locator('#work h2')).toHaveText(copy.work.desktopTitle + copy.work.mobileTitle);
      await expect(page.locator('#work h2 > span:visible')).toHaveText(width < 600 ? copy.work.mobileTitle : copy.work.desktopTitle);
      await expect(page.locator('.mobile-toggle')).toBeVisible({ visible: width < 960 });
      await expect(page.locator('.mobile-bridge')).toBeVisible({ visible: width < 600 });
      await expect(page.locator('#mobile-menu')).toBeHidden();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      expect(await page.locator('.brand img').evaluate((element) => getComputedStyle(element).transform)).toBe('none');
      const geometry = await page.locator('.hero-copy, .hero > figure, .featured-intro, .featured-figure, .featured-reasoning').evaluateAll((elements) => elements.map((element) => ({ x: element.getBoundingClientRect().x, y: element.getBoundingClientRect().y })));
      if (width < 960) {
        expect(geometry[0].y).toBeLessThan(geometry[1].y);
        expect(geometry[2].y).toBeLessThan(geometry[3].y);
        expect(geometry[3].y).toBeLessThan(geometry[4].y);
      } else if (locale === 'ar') expect(geometry[2].x).toBeGreaterThan(geometry[3].x);
      else expect(geometry[2].x).toBeLessThan(geometry[3].x);
      await page.screenshot({ path: info.outputPath(`${locale}-${width}.png`), fullPage: true });
      expect(errors).toEqual([]);
    });
  }
  test(`${locale} keyboard, menu, anchors and locale hash`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${locale}/`);
    await page.keyboard.press('Tab');
    await expect(page.locator('.skip-link')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main')).toBeFocused();
    const toggle = page.locator('.mobile-toggle');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Tab');
    await expect(page.locator('#mobile-menu a').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(toggle).toBeFocused();
    await expect(page.locator('#mobile-menu')).toBeHidden();
    await page.keyboard.press('Tab');
    await expect(page.locator('.hero-actions a').first()).toBeFocused();
    for (const id of ['work', 'approach', 'about', 'contact']) {
      await toggle.click();
      await page.locator(`#mobile-menu a[href="#${id}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator('#mobile-menu')).toBeHidden();
      await expect(page.locator(`#${id}`)).toBeFocused();
    }
    await page.locator('.hero-actions a').first().click();
    await expect(page).toHaveURL(/#work$/);
    await page.locator('.hero-actions a').last().click();
    await expect(page).toHaveURL(/#contact$/);
    await page.locator('.rescue a').click();
    await expect(page).toHaveURL(/#contact$/);
    await toggle.click();
    const other = locale === 'en' ? 'ar' : 'en';
    await page.locator(`#mobile-menu a[hreflang="${other}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${other}/#contact$`));
    await expect(page.locator('html')).toHaveAttribute('lang', other);
    await expect(page.locator('#mobile-menu')).toBeHidden();
    await page.locator('.brand').click();
    await expect(page).toHaveURL(new RegExp(`/${other}/$`));
    await page.locator('.mobile-toggle').click();
    await page.setViewportSize({ width: 1024, height: 900 });
    await expect(page.locator('#mobile-menu')).toBeHidden();
    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.locator('.mobile-toggle')).toHaveAttribute('aria-expanded', 'false');
  });
  test(`${locale} reduced motion and doubled text`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(`/${locale}/`);
    expect(await page.locator('.button').first().evaluate((element) => getComputedStyle(element).transitionDuration)).toBe('0s');
    await page.evaluate(() => {
      const elements = [...document.querySelectorAll<HTMLElement>('body *')].filter((element) => !element.closest('svg, script'));
      const sizes = elements.map((element) => ({ element, size: parseFloat(getComputedStyle(element).fontSize), line: parseFloat(getComputedStyle(element).lineHeight) }));
      for (const { element, size, line } of sizes) { element.style.fontSize = `${size * 2}px`; if (Number.isFinite(line)) element.style.lineHeight = `${line * 2}px`; }
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.locator('.mobile-toggle').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}
