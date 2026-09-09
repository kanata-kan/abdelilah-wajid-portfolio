import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const locale of ['en', 'ar']) {
  for (const width of [390, 1024]) {
    test(`${locale} accessibility ${width}`, async ({ page }, info) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/`);
      await page.evaluate(() => document.fonts.ready);
      const scan = async (name: string) => {
        const result = await new AxeBuilder({ page }).analyze();
        await info.attach(name, { body: JSON.stringify(result), contentType: 'application/json' });
        expect(result.violations).toEqual([]);
      };
      await scan('closed-menu');
      if (width < 960) {
        await page.locator('.mobile-toggle').click();
        await expect(page.locator('#mobile-menu')).toBeVisible();
        await scan('open-menu');
      }
    });
  }
}
