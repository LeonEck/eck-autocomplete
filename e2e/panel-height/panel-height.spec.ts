import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/panel-height/');
});

test.describe('panel-height', () => {
  test('should be smaller than 256px when content is smaller than that', async ({
    page,
  }) => {
    await page.focus('#input1');
    const boundingBox = await page.locator('#complete1').boundingBox();
    expect(boundingBox?.height).toBeLessThan(256);
  });

  test('should be 256px when content is 254px', async ({ page }) => {
    await page.focus('#input2');
    const boundingBox = await page.locator('#complete2').boundingBox();
    expect(boundingBox?.height).toBe(256);
  });

  test('should be 256px when content is larger than that', async ({ page }) => {
    await page.focus('#input3');
    const boundingBox = await page.locator('#complete3').boundingBox();
    expect(boundingBox?.height).toBeCloseTo(256); // "CloseTo" has to be used since firefox returns 256.0000305175781 for the height
  });
});
