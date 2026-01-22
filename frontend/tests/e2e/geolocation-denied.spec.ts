import { test, expect } from '@playwright/test';

test('T8.6 geolocation denied -> fallback manual selection', async ({ page, context }) => {
  await context.clearPermissions();
  await context.grantPermissions([], { origin: 'http://localhost:4200' });

  await page.goto('/mängel');

  await page.getByRole('button', { name: /aktuellen standort verwenden/i }).click();
  await expect(page.getByText('Zugriff auf Standort wurde verweigert.')).toBeVisible();

  const mapHost = page.locator('.map-container [leaflet]').first();
  await expect(mapHost).toBeVisible();

  await mapHost.click({ position: { x: 200, y: 200 }, force: true });

  await expect(page.locator('.success-box')).toBeVisible();

  const toFormBtn = page.getByRole('button', { name: /meldung verfassen/i });
  await expect(toFormBtn).toBeEnabled();
});



