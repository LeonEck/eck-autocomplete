import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/e2e/highlight-first-option/');
});

test.describe('highlight-first-option', () => {
  test('should not highlight anything when attribute is not present', async ({
    page,
  }) => {
    await page.locator('#input1').focus();
    const attribute = await page
      .locator('#complete1 > eck-autocomplete-option')
      .first()
      .getAttribute('highlighted');
    expect(attribute).toBeNull();
  });

  test('should highlight first option when attribute is set to the string "null"', async ({
    page,
  }) => {
    await page.locator('#input2').focus();
    const attribute = await page
      .locator('#complete2 > eck-autocomplete-option')
      .first()
      .getAttribute('highlighted');
    expect(attribute).toBe('');
  });

  test('should highlight first option when attribute is set to an empty string', async ({
    page,
  }) => {
    await page.locator('#input3').focus();
    const attribute = await page
      .locator('#complete3 > eck-autocomplete-option')
      .first()
      .getAttribute('highlighted');
    expect(attribute).toBe('');
  });

  test('should not highlight first option when attribute is set to the string "false"', async ({
    page,
  }) => {
    await page.locator('#input4').focus();
    const attribute = await page
      .locator('#complete4 > eck-autocomplete-option')
      .first()
      .getAttribute('highlighted');
    expect(attribute).toBeNull();
  });

  test('should highlight first option when attribute is set to the string "true"', async ({
    page,
  }) => {
    await page.locator('#input5').focus();
    const attribute = await page
      .locator('#complete5 > eck-autocomplete-option')
      .first()
      .getAttribute('highlighted');
    expect(attribute).toBe('');
  });

  test('should highlight first option when attribute is set to an arbitrary string', async ({
    page,
  }) => {
    await page.locator('#input6').focus();
    const attribute = await page
      .locator('#complete6 > eck-autocomplete-option')
      .first()
      .getAttribute('highlighted');
    expect(attribute).toBe('');
  });

  test('should highlight first option when attribute is set as a boolean attribute', async ({
    page,
  }) => {
    await page.locator('#input7').focus();
    const attribute = await page
      .locator('#complete7 > eck-autocomplete-option')
      .first()
      .getAttribute('highlighted');
    expect(attribute).toBe('');
  });
});
