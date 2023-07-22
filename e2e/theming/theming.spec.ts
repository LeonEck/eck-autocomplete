import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/theming/');
});

test.describe('theming', () => {
  test('should reflect all changed values', async ({ page }) => {
    await expect(page.locator('#complete1')).toHaveCSS('max-height', '600px');
    await expect(page.locator('#complete1')).toHaveCSS(
      'border-radius',
      '0px 0px 10px 10px',
    );
    await expect(page.locator('#complete1')).toHaveCSS(
      'background-color',
      'rgb(211, 211, 211)',
    );
    await expect(page.locator('#complete1')).toHaveCSS(
      'border',
      '3px solid rgb(0, 102, 255)',
    );

    await expect(page.locator('#option1')).toHaveCSS(
      'color',
      'rgb(190, 14, 14)',
    );
    await page.locator('#input1').focus();
    await page.locator('#option1').hover();
    await expect(page.locator('#option1')).toHaveCSS(
      'background-color',
      'rgb(144, 238, 144)',
    );
    await expect(page.locator('#option1')).toHaveCSS('padding', '10px');
  });
});
