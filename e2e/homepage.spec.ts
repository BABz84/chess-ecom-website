import { test, expect } from '@playwright/test';

test('homepage has correct title and hero section', async ({ page }) => {
  await page.goto('/');

  // Check for the main heading in the hero section
  await expect(page.getByRole('heading', { name: 'Where Legacy' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Lives in Art' })).toBeVisible();
});
