import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/interaction/');
});

test.describe('interaction-highlight-first-option', () => {
  test('input should stay clear when opening panel', async ({ page }) => {
    await page.focus('#input3');
    await expect(page.locator('#input3')).toHaveValue('');
    await expect(page.locator('#complete3')).toBeVisible();
  });

  test('input should get second value when pressing ArrowDown', async ({
    page,
  }) => {
    await page.focus('#input3');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#input3')).toHaveValue('Two');
    await expect(page.locator('#complete3')).toBeVisible();
  });

  test('input should get first value when pressing Enter', async ({ page }) => {
    await page.focus('#input3');
    await page.keyboard.press('Enter');
    await expect(page.locator('#input3')).toHaveValue('One');
    await expect(page.locator('#complete3')).not.toBeVisible();
  });
});
