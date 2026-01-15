import { test, expect } from '@playwright/test';

test('frontend loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/.*/);
});


test('Dieser Test soll absichtlich fehlschlagen', async ({ page }) => {
  await page.goto('/');
  const nonExistentElement = page.locator('h1');
  await expect(nonExistentElement).toHaveText('DIESER TEXT EXISTIERT NICHT', { timeout: 5000 });
});
