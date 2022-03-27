import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/interaction/');
});

test.describe('interaction-select-highlighted-option-deactivated', () => {
  test('input should stay clear when opening panel', async ({ page }) => {
    await page.focus('#input2');
    await expect(page.locator('#input2')).toHaveValue('');
    await expect(page.locator('#complete2')).toBeVisible();
  });

  test('input should not get first value when highlighting it via keyboard', async ({
    page,
  }) => {
    await page.focus('#input2');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#input2')).toHaveValue('');
    await expect(page.locator('#complete2')).toBeVisible();
  });

  test('input should get not first value when highlighting it via keyboard but have it after pressing enter', async ({
    page,
  }) => {
    await page.focus('#input2');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#input2')).toHaveValue('');
    await page.keyboard.press('Enter');
    await expect(page.locator('#input2')).toHaveValue('One');
    await expect(page.locator('#complete2')).not.toBeVisible();
  });

  test('input should should always have user input no matter if something is highlighted', async ({
    page,
  }) => {
    await page.focus('#input2');
    await page.keyboard.type('test');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#input2')).toHaveValue('test');
    await expect(page.locator('#complete2')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#input2')).toHaveValue('test');
    await expect(page.locator('#complete2')).not.toBeVisible();
  });
});
