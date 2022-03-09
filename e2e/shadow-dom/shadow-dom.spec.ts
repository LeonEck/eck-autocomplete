import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/shadow-dom/');
});

test.describe('shadow-dom', () => {
  test('complete manually connected to input in shadow dom should work', async ({
    page,
  }) => {
    await page.focus('#input1');
    await expect(page.locator('#complete1')).toBeVisible();
  });
});
