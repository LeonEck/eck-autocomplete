import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/positioning/');
});

test.describe('positioning', () => {
  test('input at the top of the page should cause the panel to open bellow', async ({
    page,
    browserName,
  }) => {
    await page.focus('#input1');
    const boundingBoxInput = await page.locator('#input1').boundingBox();
    const boundingBoxComplete = await page.locator('#complete1').boundingBox();

    if (browserName === 'webkit' || browserName === 'firefox') {
      expect(Math.round(boundingBoxComplete!.x)).toBe(boundingBoxInput!.x);
    } else {
      expect(boundingBoxComplete!.x).toBe(boundingBoxInput!.x);
    }

    expect(boundingBoxComplete!.y).toBe(
      boundingBoxInput!.y + boundingBoxInput!.height
    );
  });

  test('input near the bottom of the page should cause the panel to open above', async ({
    page,
    browserName,
  }) => {
    await page.focus('#input2');
    const boundingBoxInput = await page.locator('#input2').boundingBox();
    const boundingBoxComplete = await page.locator('#complete2').boundingBox();

    if (browserName === 'webkit' || browserName === 'firefox') {
      expect(Math.round(boundingBoxComplete!.x)).toBe(boundingBoxInput!.x);
    } else {
      expect(boundingBoxComplete!.x).toBe(boundingBoxInput!.x);
    }

    if (browserName === 'chromium') {
      expect(Math.round(boundingBoxComplete!.y)).toBe(
        Math.round(boundingBoxInput!.y - boundingBoxComplete!.height)
      );
    } else if (browserName === 'firefox') {
      expect(boundingBoxComplete!.y).toBe(
        Math.round(boundingBoxInput!.y - boundingBoxComplete!.height)
      );
    } else {
      expect(boundingBoxComplete!.y).toBe(
        boundingBoxInput!.y - boundingBoxComplete!.height
      );
    }
  });

  test('input absolute positioned to the top right should open bellow', async ({
    page,
    browserName,
  }) => {
    await page.focus('#input3');
    const boundingBoxInput = await page.locator('#input3').boundingBox();
    const boundingBoxComplete = await page.locator('#complete3').boundingBox();

    if (browserName === 'firefox') {
      expect(Math.round(boundingBoxComplete!.x)).toBe(
        Math.round(boundingBoxInput!.x)
      );
    } else if (browserName === 'webkit') {
      // Special case for -0 should equal 0
      expect(+(Math.round(boundingBoxComplete!.x) + '')).toBe(
        Math.round(boundingBoxInput!.x)
      );
    } else {
      expect(boundingBoxComplete!.x).toBe(boundingBoxInput!.x);
    }

    expect(boundingBoxComplete!.y).toBeCloseTo(
      boundingBoxInput!.y + boundingBoxInput!.height
    );
  });

  test('input fixed positioned to the bottom right should open above', async ({
    page,
    browserName,
  }) => {
    await page.focus('#input4');
    const boundingBoxInput = await page.locator('#input4').boundingBox();
    const boundingBoxComplete = await page.locator('#complete4').boundingBox();

    if (browserName === 'webkit') {
      expect(Math.round(boundingBoxComplete!.x) + 1).toBeGreaterThanOrEqual(
        Math.round(boundingBoxInput!.x)
      );
      expect(Math.round(boundingBoxComplete!.x)).toBeLessThanOrEqual(
        Math.round(boundingBoxInput!.x)
      );
    } else {
      expect(boundingBoxComplete!.x).toBeCloseTo(boundingBoxInput!.x, 0);
    }

    if (browserName === 'chromium') {
      expect(Math.round(boundingBoxComplete!.y)).toBe(
        Math.round(boundingBoxInput!.y - boundingBoxComplete!.height)
      );
    } else if (browserName === 'firefox') {
      expect(boundingBoxComplete!.y).toBe(
        Math.round(boundingBoxInput!.y - boundingBoxComplete!.height)
      );
    } else {
      expect(boundingBoxComplete!.y).toBe(
        boundingBoxInput!.y - boundingBoxComplete!.height
      );
    }
  });

  test('absolute centered div where input is at the bottom of an overflow', async ({
    page,
  }) => {
    const divAround5 = await page.locator('#divAround5');
    await divAround5.evaluate((element) => element.scrollTo(0, 100));
    await page.focus('#input5');
    const boundingBoxInput = await page.locator('#input5').boundingBox();
    const boundingBoxComplete = await page.locator('#complete5').boundingBox();

    expect(boundingBoxComplete!.x).toBeCloseTo(boundingBoxInput!.x, 0);

    expect(
      Math.abs(
        boundingBoxComplete!.y -
          (boundingBoxInput!.y - boundingBoxComplete!.height)
      )
    ).toBeLessThanOrEqual(2);
  });

  /* TODO: Deactivated because results are way to different in CI test('overflow container with relative position', async ({
    page,
    browserName,
  }) => {
    await page.focus('#input6');
    const boundingBoxInput = await page.locator('#input6').boundingBox();
    const boundingBoxComplete = await page.locator('#complete6').boundingBox();

    if (browserName === 'webkit') {
      expect(Math.round(boundingBoxComplete!.x)).toBe(boundingBoxInput!.x);
    } else {
      expect(boundingBoxComplete!.x).toBe(boundingBoxInput!.x);
    }

    //Firefox scrolls differently and will open the panel above
    if (browserName === 'firefox') {
      expect(boundingBoxComplete!.y).toBeCloseTo(
        boundingBoxInput!.y - boundingBoxComplete!.height,
        0
      );
    } else {
      expect(boundingBoxComplete!.y).toBe(
        boundingBoxInput!.y + boundingBoxInput!.height
      );
    }
  });*/

  test("overflow container without position. Autocomplete position strategy set to 'fixed'.", async ({
    page,
    browserName,
  }) => {
    const divAround7 = await page.locator('#divAround7');
    await divAround7.evaluate((element) => element.scrollTo(0, 380));
    await page.focus('#input7');
    const boundingBoxInput = await page.locator('#input7').boundingBox();
    const boundingBoxComplete = await page.locator('#complete7').boundingBox();

    if (browserName === 'webkit' || browserName === 'firefox') {
      expect(Math.round(boundingBoxComplete!.x)).toBe(boundingBoxInput!.x);
    } else {
      expect(boundingBoxComplete!.x).toBe(boundingBoxInput!.x);
    }

    /**
     * On an iPhone it will open above
     */
    if (
      page.viewportSize()!.height === 664 &&
      page.viewportSize()!.width === 390
    ) {
      expect(boundingBoxComplete!.y).toBe(
        boundingBoxInput!.y - boundingBoxComplete!.height
      );
    } else {
      expect(boundingBoxComplete!.y).toBe(
        boundingBoxInput!.y + boundingBoxInput!.height
      );
    }
  });

  /* TODO: Deactivated because results are way to different in CI test('overflow container without position or extra settings.', async ({
    page,
    browserName,
  }) => {
    const divAround8 = await page.locator('#divAround8');
    await divAround8.evaluate((element) => element.scrollTo(0, 380));
    await page.focus('#input8');
    const boundingBoxInput = await page.locator('#input8').boundingBox();
    const boundingBoxComplete = await page.locator('#complete8').boundingBox();

    if (browserName === 'webkit' || browserName === 'firefox') {
      expect(Math.round(boundingBoxComplete!.x)).toBe(boundingBoxInput!.x);
    } else {
      expect(boundingBoxComplete!.x).toBe(boundingBoxInput!.x);
    }

    // Firefox scrolls differently and will open the panel above
    if (browserName === 'firefox') {
      expect(Math.round(boundingBoxComplete!.y)).toBeGreaterThanOrEqual(
        Math.round(boundingBoxInput!.y - boundingBoxComplete!.height)
      );
      expect(Math.round(boundingBoxComplete!.y)).toBeLessThanOrEqual(
        Math.round(boundingBoxInput!.y - boundingBoxComplete!.height) + 1
      );
    } else if (
      page.viewportSize()!.height === 834 &&
      page.viewportSize()!.width === 1194
    ) {
      // On "Mobile Safari iPad landscape" the panel will also open above
      expect(boundingBoxComplete!.y).toBe(
        boundingBoxInput!.y - boundingBoxComplete!.height
      );
    } else {
      expect(boundingBoxComplete!.y).toBe(
        boundingBoxInput!.y + boundingBoxInput!.height
      );
    }
  });*/
});
