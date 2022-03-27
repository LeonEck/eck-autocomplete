import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/interaction/');
});

test.describe(
  'interaction-highlight-first-option-and-select-highlighted-option-deactivated',
  () => {
    test('input should stay clear when opening panel', async ({ page }) => {
      await page.focus('#input4');
      await expect(page.locator('#input4')).toHaveValue('');
      await expect(page.locator('#complete4')).toBeVisible();
    });

    test('input should not get second value when pressing ArrowDown', async ({
      page,
    }) => {
      await page.focus('#input4');
      await page.keyboard.press('ArrowDown');
      await expect(page.locator('#input4')).toHaveValue('');
      await expect(page.locator('#complete4')).toBeVisible();
    });

    test('input should get first value when pressing Enter', async ({
      page,
    }) => {
      await page.focus('#input4');
      await page.keyboard.press('Enter');
      await expect(page.locator('#input4')).toHaveValue('One');
      await expect(page.locator('#complete4')).not.toBeVisible();
    });
  }
);
