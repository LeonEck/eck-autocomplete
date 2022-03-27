import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/interaction/');
});

test.describe('interaction-default', () => {
  test('input should stay clear when opening panel', async ({ page }) => {
    await page.focus('#input1');
    await expect(page.locator('#input1')).toHaveValue('');
    await expect(page.locator('#complete1')).toBeVisible();
  });

  test('input should get first value when highlighting it via keyboard', async ({
    page,
  }) => {
    await page.focus('#input1');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#input1')).toHaveValue('One');
    await expect(page.locator('#complete1')).toBeVisible();
  });

  test('input should get first value when highlighting it via keyboard and keep it after blur', async ({
    page,
  }) => {
    await page.focus('#input1');
    await page.keyboard.press('ArrowDown');
    await page.locator('#input1').evaluate((e) => e.blur());
    await expect(page.locator('#input1')).toHaveValue('One');
    await expect(page.locator('#complete1')).not.toBeVisible();
  });

  test('input should get first value when highlighting it via keyboard and pressing enter', async ({
    page,
  }) => {
    await page.focus('#input1');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.locator('#input1')).toHaveValue('One');
    await expect(page.locator('#complete1')).not.toBeVisible();
  });

  test('input should not keep auto selected value when highlighting it via keyboard and pressing ESC', async ({
    page,
  }) => {
    await page.focus('#input1');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Escape');
    await expect(page.locator('#input1')).toHaveValue('');
    await expect(page.locator('#complete1')).not.toBeVisible();
  });

  test('input should reset to user input when pressing ESC after an auto selection took place', async ({
    page,
  }) => {
    await page.focus('#input1');
    await page.keyboard.type('test');
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#input1')).toHaveValue('One');
    await expect(page.locator('#complete1')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#input1')).toHaveValue('test');
    await expect(page.locator('#complete1')).not.toBeVisible();
  });

  test('input should reopen after ESC with ArrowDown und ArrowUp', async ({
    page,
  }) => {
    await page.focus('#input1');
    await expect(page.locator('#complete1')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#complete1')).not.toBeVisible();
    await page.keyboard.press('ArrowDown');
    await expect(page.locator('#complete1')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#complete1')).not.toBeVisible();
    await page.keyboard.press('ArrowUp');
    await expect(page.locator('#complete1')).toBeVisible();
  });

  test('input should reopen after ESC with an input event', async ({
    page,
  }) => {
    await page.focus('#input1');
    await expect(page.locator('#complete1')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#complete1')).not.toBeVisible();
    await page.keyboard.type('test');
    await expect(page.locator('#complete1')).toBeVisible();
  });

  test('panel should reopen when the input is clicked while being focused', async ({
    page,
  }) => {
    await page.focus('#input1');
    await expect(page.locator('#complete1')).toBeVisible();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page.locator('#input1')).toHaveValue('One');
    await expect(page.locator('#complete1')).not.toBeVisible();
    await expect(page.locator('#input1')).toBeFocused();
    await page.click('#input1');
    await expect(page.locator('#complete1')).toBeVisible();
  });
});
