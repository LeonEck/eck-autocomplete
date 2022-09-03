import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/animation/');
});

test.describe('animation', () => {
  test('input should stay clear when opening panel', async ({
    page,
    browserName,
  }) => {
    await page.focus('#input1');

    /**
     * https://stackoverflow.com/a/45853382
     */
    if (browserName === 'webkit') {
      await expect(page.locator('#errors')).not.toContainText('Script error');
    } else {
      await expect(page.locator('#errors')).not.toContainText('ResizeObserver');
    }
  });
});
