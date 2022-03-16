import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/positioning/');
});

test.describe('positioning', () => {
  test('input at the top of the page should cause the panel to open bellow', async ({
    page,
  }) => {
    await page.focus('#input1');
    const boundingBoxInput = await page.locator('#input1').boundingBox();
    const boundingBoxComplete = await page.locator('#complete1').boundingBox();
    expect(boundingBoxComplete.x).toBe(boundingBoxInput.x);
    expect(boundingBoxComplete.y).toBe(
      Math.round(boundingBoxInput.y + boundingBoxInput.height)
    );
  });

  test('input near the bottom of the page should cause the panel to open above', async ({
    page,
  }) => {
    await page.focus('#input2');
    const boundingBoxInput = await page.locator('#input2').boundingBox();
    const boundingBoxComplete = await page.locator('#complete2').boundingBox();
    expect(Math.round(boundingBoxComplete.x)).toBe(boundingBoxInput.x);
    const BROKEN_FLAKY_RANGE = 1; // In Firefox the value can be off by 1px
    expect(Math.round(boundingBoxComplete.y)).toBeLessThanOrEqual(
      Math.round(boundingBoxInput.y - boundingBoxComplete.height) +
        BROKEN_FLAKY_RANGE
    );
    expect(Math.round(boundingBoxComplete.y)).toBeGreaterThanOrEqual(
      Math.round(boundingBoxInput.y - boundingBoxComplete.height) -
        BROKEN_FLAKY_RANGE
    );
  });

  test('input absolute positioned to the top right should open bellow', async ({
    page,
  }) => {
    await page.focus('#input3');
    const boundingBoxInput = await page.locator('#input3').boundingBox();
    const boundingBoxComplete = await page.locator('#complete3').boundingBox();
    expect(boundingBoxComplete.x).toBe(boundingBoxInput.x);
    expect(boundingBoxComplete.y).toBe(
      Math.round(boundingBoxInput.y + boundingBoxInput.height)
    );
  });

  test('input fixed positioned to the bottom right should open above', async ({
    page,
  }) => {
    await page.focus('#input4');
    const boundingBoxInput = await page.locator('#input4').boundingBox();
    const boundingBoxComplete = await page.locator('#complete4').boundingBox();
    expect(Math.round(boundingBoxComplete.x)).toBe(
      Math.round(boundingBoxInput.x)
    );
    const BROKEN_FLAKY_RANGE = 1; // In Firefox the value can be off by 1px
    expect(Math.round(boundingBoxComplete.y)).toBeLessThanOrEqual(
      Math.round(boundingBoxInput.y - boundingBoxComplete.height) +
        BROKEN_FLAKY_RANGE
    );
    expect(Math.round(boundingBoxComplete.y)).toBeGreaterThanOrEqual(
      Math.round(boundingBoxInput.y - boundingBoxComplete.height) -
        BROKEN_FLAKY_RANGE
    );
  });

  /* TODO: Deactivated because of flaky results test('absolute centered div where input is at the bottom of an overflow', async ({
    page,
  }) => {
    const divAround5 = await page.locator('#divAround5');
    await divAround5.evaluate((element) => element.scrollTo(0, 100));
    await page.focus('#input5');
    const boundingBoxInput = await page.locator('#input5').boundingBox();
    const boundingBoxComplete = await page.locator('#complete5').boundingBox();
    expect(boundingBoxComplete.x).toBe(boundingBoxInput.x);
    expect(Math.round(boundingBoxComplete.y) - 1).toBe(
      Math.round(boundingBoxInput.y + boundingBoxInput.height)
    );
  });*/

  test('overflow container with relative position', async ({ page }) => {
    await page.focus('#input6');
    const boundingBoxInput = await page.locator('#input6').boundingBox();
    const boundingBoxComplete = await page.locator('#complete6').boundingBox();
    expect(boundingBoxComplete.x).toBe(boundingBoxInput.x);

    // Check for iPhone
    if (page.viewportSize().height === 664) {
      // Expect open above
      expect(Math.round(boundingBoxComplete.y)).toBe(
        Math.round(boundingBoxInput.y - boundingBoxComplete.height)
      );
    } else {
      // Expect open bellow
      expect(Math.round(boundingBoxComplete.y)).toBe(
        Math.round(boundingBoxInput.y + boundingBoxInput.height)
      );
    }
  });

  /* TODO: Deactivated because of flaky results test("overflow container without position. Autocomplete position strategy set to 'fixed'.", async ({
  page,
}) => {
  const divAround7 = await page.locator('#divAround7');
  await divAround7.evaluate((element) => element.scrollTo(0, 380));
  await page.focus('#input7');
  const boundingBoxInput = await page.locator('#input7').boundingBox();
  const boundingBoxComplete = await page.locator('#complete7').boundingBox();
  expect(boundingBoxComplete.x).toBe(boundingBoxInput.x);
  expect(Math.round(boundingBoxComplete.y)).toBe(
    Math.round(boundingBoxInput.y + boundingBoxInput.height)
  );
});*/

  /* TODO: Deactivated because of flaky results test('overflow container without position or extra settings. Panel position will be broken. Known limitation.', async ({
    page,
  }) => {
    const divAround8 = await page.locator('#divAround8');
    await divAround8.evaluate((element) => element.scrollTo(0, 380));
    await page.focus('#input8');
    const boundingBoxInput = await page.locator('#input8').boundingBox();
    const boundingBoxComplete = await page.locator('#complete8').boundingBox();
    expect(boundingBoxComplete.x).toBe(boundingBoxInput.x);
    const BROKEN_OFFSET = 380;
    const BROKEN_FLAKY_RANGE = 1; // In Firefox the value can be off by 1px
    expect(
      Math.round(boundingBoxComplete.y) - BROKEN_OFFSET
    ).toBeLessThanOrEqual(
      Math.round(boundingBoxInput.y + boundingBoxInput.height) +
        BROKEN_FLAKY_RANGE
    );
    expect(
      Math.round(boundingBoxComplete.y) - BROKEN_OFFSET
    ).toBeGreaterThanOrEqual(
      Math.round(boundingBoxInput.y + boundingBoxInput.height) -
        BROKEN_FLAKY_RANGE
    );
  });*/
});
