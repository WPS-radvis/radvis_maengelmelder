import { test, expect } from '@playwright/test';

test('frontend loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/.*/);
});


// TEMPORARY – for CI artifact test
test('intentional failure', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('THIS WILL FAIL');
});
