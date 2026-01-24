import { test, expect } from '@playwright/test';

test('Beschreibung > 255 Zeichen blockiert Submission', async ({ page }) => {
  await page.goto('http://localhost:4200/mängel/meldung');

  const descriptionField = page.locator('textarea[name="descriptionForm"]');
  await expect(descriptionField).toBeVisible();

  // Beschreibungstext mit 256 Zeichen
  const longText = 'a'.repeat(256);
  await descriptionField.fill(longText);

  // Submit-Button
  const submitButton = page.locator('#submit-btn');

  await expect(submitButton).toBeVisible();

  //Button ist deaktiviert
  await expect(submitButton).toBeDisabled();
});
